import { useState, useEffect } from "react";

function HomeComponent() {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		// Función para detectar el tamaño de la pantalla
		const handleResize = () => {
			setIsMobile(window.innerWidth < 768); // Tailwind usa md: como breakpoint para 768px
		};

		// Ejecutar la función inicialmente y agregar el listener
		handleResize();
		window.addEventListener("resize", handleResize);

		// Limpiar el listener al desmontar el componente
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return (
		<div className="relative h-screen bg-[#F7F3E4] text-white flex items-center justify-center overflow-hidden">
			{/* Contenedor Principal */}
			<div className="relative w-full lg:w-full bg-black shadow-lg overflow-hidden">
				{/* Navbar */}
				{/* <Header /> */}

				{/* Contenido con Fondo Dinámico */}
				<div
					className={`relative flex flex-col lg:flex-row items-center justify-center lg:justify-start lg:pl-32 p-6 md:p-10 bg-cover bg-center h-screen w-full mx-auto`}
					style={{
						backgroundImage: isMobile
							? `url('/public/imgs/mobile ok.jpg')`
							: `url('/imgs/heroImage.jpg')`,
					}}
				>
					{/* Overlay */}
					<div className="absolute inset-0 bg-black bg-opacity-10"></div>
				</div>
			</div>
		</div>
	);
}

export default HomeComponent;
