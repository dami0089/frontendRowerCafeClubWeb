import { useNavigate } from "react-router-dom";
import NavegacionDesktop from "../Shared/NavegacionDesktop";

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

function ShopComponent() {
	const navigate = useNavigate();

	const navegarTienda = () => {
		navigate("/tienda");
	};
	return (
		<div className="relative h-screen bg-[#F7F3E4] text-white flex items-center justify-center">
			{/* Contenedor Principal */}
			<div className="relative lg:w-full bg-black shadow-lg  overflow-hidden">
				{/* Navbar */}
				<header className="absolute top-0 left-0 right-0 flex items-center justify-between p-6 z-10">
					<div className="flex items-center ">
						<div className="w-[250px] h-[80px] bg-[#F7F3E4] flex items-center justify-center rounded-xl ">
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
					className="relative flex flex-col items-center justify-center p-10 bg-cover bg-center h-screen w-full mx-auto"
					style={{ backgroundImage: "url('/imgs/shop.webp')" }}
				>
					{/* Overlay */}
					<div className="absolute inset-0 bg-black bg-opacity-60"></div>

					{/* Catálogo de Productos */}
					<div className="relative z-10 w-full  lg:w-3/4 mt-24">
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-2">
							{products.map((product) => (
								<div
									key={product.id}
									className="bg-opacity-60 bg-white rounded-lg overflow-hidden shadow-md transform transition duration-500 hover:scale-105"
								>
									<img
										src={product.image}
										alt={product.name}
										className="w-full h-[150px] object-cover"
									/>
									<div className="p-4 text-center text-sans">
										<h2 className="text-lg font-bold text-gray-800">
											{product.name}
										</h2>
									</div>
								</div>
							))}
						</div>

						{/* Sección de invitación a la tienda */}
						<div className="mt-8 flex text-sans flex-col items-center text-center lg:flex-row lg:justify-between lg:items-center p-4 border-t border-gray-300">
							<h1 className="text-3xl font-bold text-[#D3BA92] mb-4 lg:mb-0">
								Visita nuestro Shop
							</h1>
							<button
								onClick={navegarTienda}
								className="px-6 py-3 mb-4 text-sans bg-[#90C9CF] font-bold text-white hover:bg-[#80C9CF] rounded-xl"
							>
								Ver Todo en la Tienda
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ShopComponent;
