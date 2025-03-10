/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import type { Resetter, SetterOrUpdater } from 'recoil'
import {
	atom,
	useRecoilValue,
	useResetRecoilState,
	useSetRecoilState,
} from 'recoil'

import type { Definition } from '../types/experiments/Definition.js'

const definitionsState = atom<Definition[]>({
	key: 'definitions',
	default: [],
})

export function useDefinitions(): Definition[] {
	return useRecoilValue(definitionsState)
}

export function useSetDefinitions(): SetterOrUpdater<Definition[]> {
	return useSetRecoilState(definitionsState)
}

export function useResetDefinitions(): Resetter {
	return useResetRecoilState(definitionsState)
}
