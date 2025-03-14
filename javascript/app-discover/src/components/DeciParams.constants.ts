/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import type { ISpinButtonProps } from '@fluentui/react'

export const defaultTrainingSpinningOptions = [
	{
		label: 'Max steps auglag',
		inputProps: { name: 'max_steps_auglag' },
		step: 10,
		min: 10,
		max: 250,
	},
	{
		label: 'Max auglag inner epochs',
		inputProps: { name: 'max_auglag_inner_epochs' },
		step: 100,
		min: 100,
		max: 5000,
	},
] as ISpinButtonProps[]
