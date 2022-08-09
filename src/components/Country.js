function Country({ children: country, onClickVisited = null, isVisited = false }) {
	const { flags: { png: flag }, name: { common: countryName }, capital, region, population, area } = country

	const demographicDensity = population / area

	function handleVisited() {
		onClickVisited(country.cca2)
	}

	const visitedClass = isVisited ? 'bg-green-100' : ''

	if (!country) return <div>Não foi possível renderizar o país</div>

	return (
		<div onClick={handleVisited} className={`border p-2 my-2 flex flex-row items-center rounded ${visitedClass}`}>
			<img src={flag} className="rounded" alt={countryName} style={{ maxWidth: "200px" }} />
			<ul className="ml-2">
				<li><strong>País:</strong> {countryName}</li>
				<li><strong>Capital:</strong> {capital}</li>
				<li><strong>Região:</strong> {region}</li>
				<li><strong>População:</strong> {population}</li>
				<li><strong>Área:</strong> {area}</li>
				<li><strong>Densidade demográfica:</strong> {demographicDensity}</li>
			</ul>
		</div>
	)
}

export default Country