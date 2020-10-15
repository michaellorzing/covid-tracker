import React, { useState, useEffect } from 'react';
import { NativeSelect, FormControl } from '@material-ui/core';
import axios from 'axios';
import PropTypes from 'prop-types';

import styles from './styles.module.css';

const CountryPicker = ({ handleCountryChange }) => {
	const [data, setData] = useState('');

	useEffect(() => {
		async function getCountries() {
			const response = await axios.get(
				'https://covid19.mathdro.id/api/countries'
			);

			setData(response.data.countries.map((country) => country.name));
		}

		getCountries();
	}, []);

	return (
		data && (
			<FormControl
				className={styles.formControl}
				style={{ marginBottom: '30px' }}
			>
				<NativeSelect onChange={(e) => handleCountryChange(e)}>
					<option value=''>Global</option>
					{data.map((data, index) => (
						<option key={index} value={data}>
							{data}
						</option>
					))}
				</NativeSelect>
			</FormControl>
		)
	);
};

CountryPicker.propTypes = {};

export default CountryPicker;
