function Input({ id, type = 'text', label = 'Label', value = 'Text', onInputChange = null }) {

	function handleChange({ currentTarget }) {
		if (!onInputChange) return
		const newValue = currentTarget.value
		onInputChange(newValue)
	}

	return (
		<div className="py-2">
			<label htmlFor={id}>{label}</label><br />
			<input id={id} className="border rounded p-1" type={type} value={value} onChange={handleChange} />
		</div>
	)
}

export default Input