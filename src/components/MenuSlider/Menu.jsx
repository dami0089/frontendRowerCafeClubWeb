import { useState, useEffect } from "react";
import NavegacionDesktop from "../Shared/NavegacionDesktop";

function MenuComponent() {
	const images = [
		"/imgs/imagenesMenu/1.webp",
		"/imgs/imagenesMenu/2.webp",
		"/imgs/imagenesMenu/3.webp",
		"/imgs/imagenesMenu/4.webp",
		"/imgs/imagenesMenu/5.webp",
		"/imgs/imagenesMenu/6.webp",
		"/imgs/imagenesMenu/7.webp",
		"/imgs/imagenesMenu/8.webp",
		"/imgs/imagenesMenu/9.webp",
		"/imgs/imagenesMenu/10.webp",
		"/imgs/imagenesMenu/11.webp",
		"/imgs/imagenesMenu/12.webp",
	];
	const [currentImage, setCurrentImage] = useState(0);
	const [fade, setFade] = useState(true);

	useEffect(() => {
		const interval = setInterval(() => {
			setFade(false); // Inicia el desvanecimiento
			setTimeout(() => {
				setCurrentImage((prevImage) => (prevImage + 1) % images.length);
				setFade(true); // Vuelve a mostrar la imagen con efecto de fade
			}, 300); // Duración del desvanecimiento
		}, 4000); // Cambia de imagen cada 4 segundos
		return () => clearInterval(interval);
	}, [images.length]);

	return (
		<div className="relative h-screen bg-[#F7F3E4] text-white flex items-center justify-center">
			{/* Contenedor Principal */}
			<div className="relative lg:w-full bg-black shadow-lg  overflow-hidden">
				{/* Navbar */}
				<header className="absolute top-0 left-0 right-0 flex items-center justify-between p-6 z-10">
					<div className="flex items-center ">
						<div className="w-[250px] h-[80px] bg-[#F7F3E4]  flex items-center justify-center rounded-xl ">
							<img
								src="/imgs/logo-cafeteria.png"
								alt="Logo"
								className="w-[150px] h-[50px]"
							/>
						</div>
					</div>
					<NavegacionDesktop />
				</header>
				{/* Contenido con Imagen de Fondo */}
				<div
					className="relative flex flex-col lg:flex-row items-center justify-around lg:justify-evenly lg:pl-16 p-10 bg-cover bg-center h-screen w-full mx-auto max-w-[100%]"
					style={{ backgroundImage: "url('/imgs/MenuSeccionImage.webp')" }}
				>
					{/* Overlay */}
					<div className="absolute inset-0 bg-black bg-opacity-60"></div>

					{/* Slider de Imágenes */}
					<div className="relative z-10 lg:w-[350px] space-y-4 text-left ">
						<div className="w-full h-[450px] bg-opacity-70 rounded-lg overflow-hidden flex items-center justify-center">
							<img
								src={images[currentImage]}
								alt={`Slide ${currentImage + 1}`}
								className={`object-cover w-full h-full transition-opacity duration-500 ${
									fade ? "opacity-100" : "opacity-0"
								}`}
							/>
						</div>
					</div>

					{/* Texto y Botones */}
					<div className="relative z-10 lg:w-[600px] space-y-4 text-left">
						<h1 className="text-6xl lg:text-7xl text-sans font-bold text-[#D3BA92]">
							¡INSPIRADO POR CICLISTAS!
						</h1>
						<p className="text-sans text-sm lg:text-base text-white">
							En ROWER CAFÉ CLUB, entendemos que al igual que el ciclismo, la
							preparación del café es un arte que requiere precisión, dedicación
							y respeto por el proceso. Aquí, además de un buen café, vas a
							vivir una experiencia única, en un espacio donde la pasión por el
							ciclismo y el café se encuentran. El ambiente de nuestra cafetería
							refleja el dinamismo del ciclismo, con decoración temática,
							librería y productos en exhibición; siendo el lugar perfecto para
							relajarse después de un entrenamiento, paseo en bicicleta o para
							encontrarse con amigos.
						</p>
						<div className="flex space-x-4 mt-6 justify-center">
							<button className="px-4 font-bold py-2 bg-[#90C9CF] text-white hover:bg-[#80C9CF] rounded-xl">
								Menu
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default MenuComponent;
