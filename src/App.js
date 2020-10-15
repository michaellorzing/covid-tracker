import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cards from './components/Cards/Cards';
import Chart from './components/Chart/Chart';
import CountryPicker from './components/CountryPicker/CountryPicker';
import image from './img/image.png';
import styles from './App.module.css';

function App() {
	const [data, setData] = useState({
		bullshit: '',
		error: false,
	});
	const [country, setCountry] = useState('');

	useEffect(() => {
		async function getData() {
			let url;

			country
				? (url = `https://covid19.mathdro.id/api/countries/${country}`)
				: (url = 'https://covid19.mathdro.id/api/');
			try {
				const response = await axios.get(url);

				setData({
					bullshit: response.data,
				});
			} catch (err) {
				setData({
					bullshit: '',
					error: err,
				});
			}
		}
		getData();
	}, [country]);

	const handleCountryChange = (e) => {
		setCountry(e.target.value);
	};

	return (
		<div className='App' className={styles.container}>
			<img className={styles.image} src={image} alt='COVID-19' />
			<Cards data={data.bullshit} />
			<CountryPicker handleCountryChange={handleCountryChange} />
			<Chart data={data.bullshit} country={country} />
		</div>
	);
}

export default App;
