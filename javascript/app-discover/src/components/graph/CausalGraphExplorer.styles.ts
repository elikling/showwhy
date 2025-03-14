/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import styled from 'styled-components'

import {
	colorCorrelation,
	colorNegative,
	colorNeutral,
	colorPositive,
} from '../../styles/styles.js'

export const Background = styled.div({
	position: 'absolute',
	minHeight: '100%',
	minWidth: '100%',
})

export const Container = styled.div`
	display: flex;
	flex-direction: column;
`
export const Grid = styled.div`
	display: grid;
	grid-auto-columns: 1fr 1fr 1fr;
	grid-template-columns: 1fr 1fr 1fr 1fr;
	gap: 5px 5px;
	grid-template-areas:
		'. . . .'
		'edge edge edge edge';
	justify-content: space-between;
	align-content: space-around;
	justify-items: stretch;
	align-items: stretch;
`

export const ContainerEdge = styled(Container)`
	grid-area: edge;
`

export const FlexContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: end;
	padding: 10px;
	position: absolute;
	bottom: 5px;
`

export const edgeColors = {
	positive: colorPositive,
	negative: colorNegative,
	correlation: colorCorrelation,
	pcChange: colorNeutral,
}
