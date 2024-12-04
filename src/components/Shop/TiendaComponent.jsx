import { useNavigate } from "react-router-dom";
import Header from "../Shared/Header";

import LetreroRedondoTienda from "../ui/letreroRedondoTienda";

const products = [
	{
		id: 1,
		image: "/imgs/shop/1.webp",
		name: "Tazas Bici",
	},
	{
		id: 2,
		image: "/imgs/shop/2.webp",
		name: "Calza Ciclismo",
	},
	{
		id: 3,
		image: "/imgs/shop/3.webp",
		name: "Caramañola Rower",
	},
	{
		id: 4,
		image: "/imgs/shop/4.webp",
		name: "Short Tricolor",
	},
	{
		id: 5,
		image: "/imgs/shop/5.webp",
		name: "Campera Rompeviento",
	},
	{
		id: 6,
		image: "/imgs/shop/6.webp",
		name: "Remera Tour",
	},
	// Añade más productos aquí si es necesario
];

function TiendaComponent() {
	const navigate = useNavigate();

	const navegarTienda = () => {
		navigate("/tienda");
	};
	return (
		<div className="relative h-screen bg-[#F7F3E4] text-white flex items-center justify-center">
			{/* Contenedor Principal */}
			<div className="relative lg:w-full bg-black shadow-lg  overflow-hidden">
				{/* Navbar */}
				<Header />

				{/* Contenido con Imagen de Fondo */}
				<div
					className="relative flex flex-row items-center justify-center p-10 bg-cover bg-center h-screen w-full mx-auto"
					style={{ backgroundImage: "url('/imgs/fondo-tienda.jpg')" }}
				>
					{/* Catálogo de Productos */}
					<div className="relative z-10 w-full lg:w-5/6 mt-24 flex flex-col lg:flex-row items-start lg:items-center justify-between">
						{/* Sección izquierda: Título y letrero */}
						<div className="flex flex-col items-start space-y-6">
							<h3 className="text-6xl font-bold text-black">
								¡Visita nuestra <span className="block">tienda!</span>
							</h3>
							<div className="flex items-center space-x-6">
								<button
									onClick={navegarTienda}
									className="px-6 py-3 bg-[#C6D8D6] text-black font-bold rounded-lg hover:bg-[#b8cdc9] transition-all"
								>
									Ver toda la tienda
								</button>
								<div className="h-28 w-28">
									<LetreroRedondoTienda />
								</div>
							</div>
						</div>

						{/* Sección derecha: Productos */}
						<div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-2">
							{products.map((product) => (
								<div
									key={product.id}
									className="overflow-hidden transform transition duration-500 hover:scale-105"
								>
									{/* Imagen del producto */}
									<img
										src={product.image}
										alt={product.name}
										className="w-full h-[200px] object-cover  rounded-xl"
									/>

									{/* Detalles del producto */}
									<div className="flex justify-between mt-2">
										<p className=" font-bold text-gray-800">{product.name}</p>
										<span className="text-xl text-gray-800 font-bold">→</span>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default TiendaComponent;
