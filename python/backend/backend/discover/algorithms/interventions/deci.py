import logging
from typing import Optional, Tuple

import numpy as np
import pandas as pd
import torch
from causica.models.deci.deci import DECI
from celery import uuid

from backend.discover.model.interventions import (
    InterventionResult,
    InterventionValueByColumn,
)
from backend.worker_commons.io.db import get_db_client


class DeciInterventionModel:
    def __init__(
        self,
        deci_model: DECI,
        adj_matrix: np.ndarray,
        ate_matrix: np.ndarray,
        train_data: pd.DataFrame,
        intervention_model_id: Optional[str] = None,
    ):
        self._id = intervention_model_id if intervention_model_id else uuid()
        self._deci_model = deci_model
        self._ate_matrix = ate_matrix
        self._adj_matrix = adj_matrix
        self._train_data = train_data

    @property
    def id(self):
        return self._id

    def _create_filtered_adj_matrix(
        self,
        confidence_threshold: Optional[float] = None,
        weight_threshold: Optional[float] = None,
    ) -> torch.Tensor:
        logging.info(
            f"Filtering adjacency matrix based on confidence_threshold={confidence_threshold} and weight_threshold={weight_threshold}"
        )

        adj_matrix = self._adj_matrix.copy()
        n_lines, n_cols = adj_matrix.shape

        for i in range(n_lines):
            for j in range(n_cols):
                if (
                    confidence_threshold is not None
                    and abs(self._adj_matrix[i][j]) < confidence_threshold
                ) or (
                    weight_threshold is not None
                    and abs(self._ate_matrix[i][j]) < weight_threshold
                ):
                    adj_matrix[i][j] = 0

        return torch.from_numpy(adj_matrix).float().to(self._deci_model.device)

    def _parse_raw_result(self, raw_result: np.ndarray) -> InterventionValueByColumn:
        return {
            var.name: float(raw_result[:, i].mean())
            for i, var in enumerate(self._deci_model.variables)
        }

    def _map_interventions(
        self, interventions: InterventionValueByColumn
    ) -> Tuple[torch.Tensor, torch.Tensor]:
        intervention_idxs = []
        intervention_values = []

        for name, value in interventions.items():
            idx = self._deci_model.variables.name_to_idx[name]
            if idx is not None:
                intervention_idxs.append(self._deci_model.variables.name_to_idx[name])
                intervention_values.append(value)
            else:
                logging.warning(
                    f"Intervention column {name} ignored: column name not found"
                )

        intervention_idxs = torch.tensor(
            intervention_idxs, device=self._deci_model.device
        )
        intervention_values = torch.tensor(
            intervention_values, device=self._deci_model.device
        )

        return intervention_idxs, intervention_values

    def perform_intervention(
        self,
        interventions: InterventionValueByColumn,
        confidence_threshold: Optional[float] = None,
        weight_threshold: Optional[float] = None,
    ) -> InterventionResult:
        X = torch.tensor(self._train_data.values, device=self._deci_model.device)
        W_adj = self._create_filtered_adj_matrix(confidence_threshold, weight_threshold)
        intervention_idxs, intervention_values = self._map_interventions(interventions)

        return InterventionResult(
            baseline=self._parse_raw_result(
                self._deci_model._counterfactual(
                    X=X,
                    W_adj=W_adj,
                    intervention_idxs=torch.tensor([], device=self._deci_model.device),
                    intervention_values=torch.tensor(
                        [], device=self._deci_model.device
                    ),
                ).numpy()
            ),
            intervention=self._parse_raw_result(
                self._deci_model._counterfactual(
                    X=X,
                    W_adj=W_adj,
                    intervention_idxs=intervention_idxs,
                    intervention_values=intervention_values,
                ).numpy()
            ),
        )

    def save(self):
        db_client = get_db_client()
        db_client.set_value(f"intervention_model:{self._id}", self)

    @staticmethod
    def load(intervention_model_id: str):
        db_client = get_db_client()
        return db_client.get_value(f"intervention_model:{intervention_model_id}")
