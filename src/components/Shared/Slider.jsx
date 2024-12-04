import useSlider from "../../hooks/useSlider";
import { useEffect, useState } from "react";

const Slider = () => {
	const { activeSection, handleSlideChange } = useSlider();
	const totalDots = 5;

	// Estado para controlar la animación de rebote de la flecha
	const [bounce, setBounce] = useState(true);

	useEffect(() => {
		// Cada 1 segundo cambia el estado de "bounce" para hacer la animación
		const interval = setInterval(() => {
			setBounce((prev) => !prev);
		}, 1000);
		return () => clearInterval(interval);
	}, []);

	const handleUp = () => {
		handleSlideChange(activeSection - 1);
	};

	const handleDown = () => {
		handleSlideChange(activeSection + 1);
	};

	return (
		<div className="fixed top-1/2 transform -translate-y-1/2 right-8 flex flex-col items-center space-y-4">
			{activeSection > 0 && activeSection < 5 ? (
				<div
					onClick={handleUp}
					className={`mt-6 w-4 h-4 border-t-2 border-l-2 border-[#90C9CF] transform rotate-45 transition-transform hover:cursor-pointer duration-500 ${
						bounce ? "translate-y-0" : "-translate-y-2"
					}`}
				></div>
			) : null}

			{Array.from({ length: totalDots }).map((_, index) => (
				<div
					key={index}
					onClick={() => handleSlideChange(index)}
					className={`w-4 h-4 rounded-full transition-colors duration-300 cursor-pointer ${
						index === activeSection ? "bg-[#90C9CF] scale-110" : "bg-gray-500"
					}`}
				></div>
			))}

			{/* Flecha de rebote invitando a scrollear */}
			{activeSection >= 0 && activeSection < 4 ? (
				<div
					onClick={handleDown}
					className={`mt-6 w-4 h-4 border-b-2 border-r-2 border-[#90C9CF] transform rotate-45 transition-transform hover:cursor-pointer duration-500 ${
						bounce ? "translate-y-0" : "translate-y-2"
					}`}
				></div>
			) : null}
		</div>
	);
};

export default Slider;
