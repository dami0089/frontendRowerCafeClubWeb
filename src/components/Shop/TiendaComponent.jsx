import { useNavigate } from "react-router-dom";

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
];

function TiendaComponent() {
	const navigate = useNavigate();

	const navegarTienda = () => {
		navigate("/tienda");
	};
	return (
		<div className="relative lg:h-screen bg-[#F7F3E4] text-white flex items-center justify-center">
			{/* Contenedor Principal */}
			<div className="relative w-full lg:bg-black lg:shadow-lg overflow-hidden">
				{/* Contenido con Imagen de Fondo */}
				<div
					className="relative flex flex-col lg:flex-row items-center justify-center p-6 sm:p-10 bg-cover bg-no-repeat lg:bg-cover bg-center h-[950px] xl:min-h-screen w-full mx-auto "
					style={{ backgroundImage: "url('/imgs/fondo-tienda.jpg')" }}
				>
					{/* Catálogo de Productos */}
					<div className="relative z-10 w-full lg:w-5/6 mt-16 sm:mt-24 flex flex-col items-center lg:flex-row lg:items-center justify-between space-y-8 lg:space-y-0">
						{/* Sección izquierda: Título y letrero */}
						<div className="flex flex-col items-center lg:items-start space-y-6 text-center lg:text-left">
							<h3 className="text-4xl sm:text-6xl font-bold text-black">
								¡Visita nuestra <span className="block">tienda!</span>
							</h3>
							<div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-4 sm:space-y-0">
								<button
									onClick={navegarTienda}
									className="px-4 sm:px-6 py-2 sm:py-3 bg-[#C6D8D6] text-black font-bold rounded-lg hover:bg-[#b8cdc9] transition-all"
								>
									Ver toda la tienda
								</button>
								<div className="h-20 w-20 sm:h-28 sm:w-28 mx-auto sm:mx-0">
									<LetreroRedondoTienda />
								</div>
							</div>
						</div>

						{/* Sección derecha: Productos */}
						<div className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-2 w-full lg:w-auto">
							{products
								.slice(0, window.innerWidth < 768 ? 2 : products.length) // 1 producto en mobile
								.map((product) => (
									<div
										key={product.id}
										className="overflow-hidden transform transition duration-500 hover:scale-105"
										onClick={navegarTienda}
									>
										{/* Imagen del producto */}
										<img
											src={product.image}
											alt={product.name}
											className="w-full h-[180px] sm:h-[200px] object-cover rounded-xl"
										/>

										{/* Detalles del producto */}
										<div className="flex justify-between mt-2">
											<p className="font-bold text-gray-800">{product.name}</p>
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
