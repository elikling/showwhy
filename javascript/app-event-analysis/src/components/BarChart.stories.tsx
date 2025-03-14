/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { ComponentStory } from '@storybook/react'

import { BarChartOrientation } from '../types.js'
import { BarChart } from './BarChart.js'
import type { BarChartProps } from './BarChart.types.js'
const args = {
	inputData: [
		{
			name: 'Pennsylvania',
			value: 1.5585961156002053,
			label: -1.5585961156002053,
			color: '#f88c8d',
			opacity: 0.7,
		},
		{
			name: 'New Mexico',
			value: 2.3821554249120633,
			label: 2.3821554249120633,
			color: '#767676',
			opacity: 0.7,
		},
		{
			name: 'Wisconsin',
			value: 2.8705192268801416,
			label: 2.8705192268801416,
			color: '#767676',
			opacity: 0.7,
		},
		{
			name: 'Louisiana',
			value: 4.91842951994415,
			label: 4.91842951994415,
			color: '#767676',
			opacity: 0.7,
		},
		{
			name: 'Nebraska',
			value: 14.29442482758523,
			label: 14.29442482758523,
			color: '#767676',
			opacity: 0.7,
		},
		{
			name: 'Mississippi',
			value: 16.695025349387393,
			label: 16.695025349387393,
			color: '#767676',
			opacity: 0.7,
		},
		{
			name: 'Missouri',
			value: 19.90889241662774,
			label: 19.90889241662774,
			color: '#767676',
			opacity: 0.7,
		},
		{
			name: 'Utah',
			value: 21.470558218473055,
			label: 21.470558218473055,
			color: '#767676',
			opacity: 0.7,
		},
		{
			name: 'Illinois',
			value: 40.92206987391121,
			label: -40.92206987391121,
			color: '#f88c8d',
			opacity: 0.7,
		},
		{
			name: 'South Dakota',
			value: 41.1990979451003,
			label: 41.1990979451003,
			color: '#767676',
			opacity: 0.7,
		},
		{
			name: 'Virginia',
			value: 52.95766159765754,
			label: 52.95766159765754,
			color: '#767676',
			opacity: 0.7,
		},
		{
			name: 'California',
			value: 99.3841971543526,
			label: -99.3841971543526,
			color: '#f88c8d',
		},
	],
	dimensions: {
		width: 864,
		height: 277.29999999999995,
		margin: { top: 1, right: 100, bottom: 50, left: 100 },
	},
	orientation: 'column',
	hoverInfo: { hoverItem: null, setHoverItem: () => undefined },
	leftAxisLabel: 'Ratio',
	bottomAxisLabel: '',
	checkableUnits: [
		'Alabama',
		'Arkansas',
		'Colorado',
		'Connecticut',
		'Delaware',
		'Georgia',
		'Idaho',
		'Illinois',
		'Indiana',
		'Iowa',
		'Kansas',
		'Kentucky',
		'Louisiana',
		'Maine',
		'Minnesota',
		'Mississippi',
		'Missouri',
		'Montana',
		'Nebraska',
		'Nevada',
		'New Hampshire',
		'New Mexico',
		'North Carolina',
		'North Dakota',
		'Ohio',
		'Oklahoma',
		'Pennsylvania',
		'Rhode Island',
		'South Carolina',
		'South Dakota',
		'Tennessee',
		'Texas',
		'Utah',
		'Vermont',
		'Virginia',
		'West Virginia',
		'Wisconsin',
		'Wyoming',
	],
	treatedUnits: ['California'],
	checkedUnits: new Set([
		'Alabama',
		'Arkansas',
		'Colorado',
		'Connecticut',
		'Delaware',
		'Georgia',
		'Idaho',
		'Illinois',
		'Indiana',
		'Iowa',
		'Kansas',
		'Kentucky',
		'Louisiana',
		'Maine',
		'Minnesota',
		'Mississippi',
		'Missouri',
		'Montana',
		'Nebraska',
		'Nevada',
		'New Hampshire',
		'New Mexico',
		'North Carolina',
		'North Dakota',
		'Ohio',
		'Oklahoma',
		'Pennsylvania',
		'Rhode Island',
		'South Carolina',
		'South Dakota',
		'Tennessee',
		'Texas',
		'Utah',
		'Vermont',
		'Virginia',
		'West Virginia',
		'Wisconsin',
		'Wyoming',
		'California',
	]),
	isPlaceboSimulation: true,
}
const meta = {
	title: '@showwhy:app-event-analysis/BarChart',
	component: BarChart,
	args,
}
export default meta
const Template: ComponentStory<typeof BarChart> = (args: BarChartProps) => {
	return <BarChart {...args} />
}

export const Columns = Template.bind({})
Columns.storyName = 'Column Bar Chart'

export const Row = Template.bind({})
Row.storyName = 'Row Bar Chart'
Row.args = {
	...args,
	orientation: BarChartOrientation.row,
}
