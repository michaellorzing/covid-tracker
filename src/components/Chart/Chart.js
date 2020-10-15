import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line, Bar } from 'react-chartjs-2';

import styles from './styles.module.css';

const Chart = ({ data: { confirmed, recovered, deaths }, country }) => {
	const [dailyData, setDailyData] = useState('');

	useEffect(() => {
		async function getDailyData() {
			const response = await axios.get(
				'https://api.covidtracking.com/v1/us/daily.json'
			);

			setDailyData(
				response.data.map(
					({ positive, recovered, death, dateChecked: date }) => ({
						confirmed: positive,
						recovered,
						deaths: death,
						date,
					})
				)
			);
		}

		getDailyData();
	}, []);

	const barChart = confirmed ? (
		<Bar
			data={{
				labels: ['Infected', 'Recovered', 'Deaths'],
				datasets: [
					{
						label: 'People',
						backgroundColor: [
							'rgba(0, 0, 255, 0.5)',
							'rgba(0, 255, 0, 0.5)',
							'rgba(255, 0, 0, 0.5)',
						],
						data: [confirmed.value, recovered.value, deaths.value],
					},
				],
			}}
			options={{
				legend: { display: false },
				title: { display: true, text: `Current state in ${country}` },
			}}
		/>
	) : null;

	const lineChart = dailyData[0] ? (
		<Line
			data={{
				labels: dailyData.map(({ date }) =>
					new Date(date).toLocaleDateString()
				),
				datasets: [
					{
						data: dailyData.map((data) => data.confirmed),
						label: 'Infected',
						borderColor: '#3333ff',
						fill: true,
					},
					{
						data: dailyData.map((data) => data.deaths),
						label: 'Deaths',
						borderColor: 'red',
						backgroundColor: 'rgba(255, 0, 0, 0.5)',
						fill: true,
					},
					{
						data: dailyData.map((data) => data.recovered),
						label: 'Recovered',
						borderColor: 'green',
						backgroundColor: 'rgba(0, 255, 0, 0.5)',
						fill: true,
					},
				],
			}}
		/>
	) : null;

	return (
		<div className={styles.container}>{country ? barChart : lineChart}</div>
	);
};

export default Chart;
