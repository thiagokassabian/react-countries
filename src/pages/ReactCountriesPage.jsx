import { useState, useEffect } from 'react';

import Countries from '../components/Countries';
import Country from '../components/Country';
import Header from '../components/Header';
import Input from '../components/Input';
import Main from '../components/Main';

function ReactCountriesPage() {
	const [data, setData] = useState([]);
	const [countryFilter, setCountryFilter] = useState('');
	const [filteredCountries, setFilteredCountries] = useState([]);
	const [visitedCountries, setVisitedCountries] = useState([]);

	useEffect(() => {
		fetch('https://restcountries.com/v3.1/all')
			.then(response => {
				if (response.ok) return response.json();
				throw response;
			})
			.then(data => {
				setData(data);
				setFilteredCountries(data);
			})
			.catch(error => {
				console.log('Error fetching data:', error);
			})
			.finally(() => {
				loadingContent();
			});
	}, []);

	function handleCountryFilterChange(newCountry) {
		setCountryFilter(newCountry);
		if (newCountry.trim().length >= 3) filterDataCountries(newCountry);
		else setFilteredCountries(data);
	}

	function filterDataCountries(newCountry) {
		const filtered = data.filter(({ name: { common } }) =>
			common.toLowerCase().includes(newCountry.trim().toLowerCase())
		);
		console.log(filtered);
		setFilteredCountries(filtered);
	}

	function loadingContent() {
		document.querySelector('.loading').style.display = 'none';
	}

	function toggleVisited(visitedCountryId) {
		let newVisitedCountries = [...visitedCountries];

		const isCountryVisited = newVisitedCountries.indexOf(visitedCountryId) !== -1;

		if (!isCountryVisited) newVisitedCountries.push(visitedCountryId);
		else newVisitedCountries = newVisitedCountries.filter(countryId => countryId !== visitedCountryId);

		setVisitedCountries(newVisitedCountries);
	}

	return (
		<>
			<Header>react-countries</Header>
			<Main>
				<div className="container mx-auto">
					<div className="text-right">
						<Input
							id="inputCountry"
							label="Nome do país"
							value={countryFilter}
							onInputChange={handleCountryFilterChange}
						/>
					</div>
					<Countries>
						<h2 className="text-lg font-semibold text-right">{filteredCountries.length} país(es)</h2>
						<h3 className="text-right">{visitedCountries.length} país(es) visitado(s)</h3>
						{filteredCountries.map(country => {
							const isVisited = visitedCountries.indexOf(country.cca2) !== -1;
							return (
								<Country isVisited={isVisited} onClickVisited={toggleVisited} key={country.cca2}>
									{country}
								</Country>
							);
						})}
					</Countries>
					<div className="loading text-center">Carregando...</div>
				</div>
			</Main>
		</>
	);
}

export default ReactCountriesPage;
