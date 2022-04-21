/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import type { Definition, DefinitionType, Maybe } from '@showwhy/types'
import { CausalityLevel } from '@showwhy/types'

export function updateListTypes(
	definitions: Maybe<Definition[]>,
	type: Maybe<DefinitionType>,
): Definition[] {
	const isPrimary = definitions?.find(
		d => d.type === type && d.level === CausalityLevel.Primary,
	)

	let result = definitions ? [...definitions] : []
	if (isPrimary) {
		result = result.map(d => {
			if (d.id === isPrimary.id) {
				return { ...d, level: CausalityLevel.Secondary }
			}
			return d
		})
	}
	return result
}
