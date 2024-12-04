import useSlider from "../../hooks/useSlider";

const NavegacionDesktop = () => {
	const { activeSection, handleSlideChange } = useSlider();

	return (
		<nav className="flex space-x-8 text-sm">
			<button
				onClick={() => handleSlideChange(0)}
				className={`hover:underline text-sans ${
					activeSection === 0 ? "text-[#90C9CF]" : "text-[#FCF7E9]"
				}`}
			>
				Inicio
			</button>
			<button
				onClick={() => handleSlideChange(1)}
				className={`hover:underline text-sans ${
					activeSection === 1 ? "text-[#90C9CF]" : "text-[#FCF7E9]"
				}`}
			>
				Quienes Somos
			</button>
			<button
				onClick={() => handleSlideChange(2)}
				className={`hover:underline text-sans ${
					activeSection === 2 ? "text-[#90C9CF]" : "text-[#FCF7E9]"
				}`}
			>
				Menu
			</button>
			<button
				onClick={() => handleSlideChange(3)}
				className={`hover:underline text-sans ${
					activeSection === 3 ? "text-[#90C9CF]" : "text-[#FCF7E9]"
				}`}
			>
				Tienda
			</button>
			<button
				onClick={() => handleSlideChange(4)}
				className={`hover:underline text-sans ${
					activeSection === 4 ? "text-[#90C9CF]" : "text-[#FCF7E9]"
				}`}
			>
				Contacto
			</button>
		</nav>
	);
};

export default NavegacionDesktop;
