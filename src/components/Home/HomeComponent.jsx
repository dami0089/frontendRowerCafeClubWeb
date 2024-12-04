import Header from "../Shared/Header";

function HomeComponent() {
	return (
		<div className="relative h-screen bg-[#F7F3E4] text-white flex items-center justify-center">
			{/* Contenedor Principal */}
			<div className="relative w-full lg:w-full bg-black shadow-lg overflow-hidden">
				{/* Navbar */}
				<Header />

				{/* Contenido con Imagen de Fondo */}
				<div
					className="relative flex flex-col lg:flex-row items-center justify-center lg:justify-start lg:pl-32 p-6 md:p-10 bg-cover bg-center h-screen w-full mx-auto"
					style={{ backgroundImage: "url('/imgs/heroImage.jpg')" }}
				>
					{/* Overlay */}
					<div className="absolute inset-0 bg-black bg-opacity-10"></div>

					{/* Texto y Botones */}
					{/* <div className="relative z-10 w-full lg:w-1/2 space-y-4 text-center lg:text-left">
						<h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-[#D3BA92]">
							Mas que café, un estilo de vida
						</h1>
						<p className="text-gray-500 text-sm md:text-base">
							Cafetería de especialidad inspirada por ciclistas
						</p>
						<div className="flex justify-center lg:justify-start space-x-4 mt-6">
							<button className="px-4 py-2 bg-gray-800 font-bold text-white hover:bg-gray-700 rounded-xl">
								Contacto
							</button>
							<button
								onClick={navegarTienda}
								className="px-4 py-2 bg-[#90C9CF] font-bold text-white hover:bg-[#80C9CF] rounded-xl"
							>
								Tienda
							</button>
						</div>
					</div> */}
				</div>
			</div>
		</div>
	);
}

export default HomeComponent;
