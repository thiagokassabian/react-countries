function Header({ children: title }) {
	return (
		<header>
			<div className="bg-green-300 p-4">
				<h1 className="text-center text-xl">{title}</h1>
			</div>
		</header>
	)
}

export default Header