import { useEffect, useState } from "react";
import useProductos from "../../hooks/useProductos";
import useAuth from "../../hooks/useAuth";
import Cargando from "../Shared/Cargando";

const MenuCafeteria = () => {
	const [loading, setLoading] = useState(true);
	const [productosAgrupados, setProductosAgrupados] = useState({});
	const { productosCafeteria, obtenerProductos } = useProductos();
	const { handleCargando } = useAuth();

	useEffect(() => {
		const fetchProductos = async () => {
			handleCargando();
			await obtenerProductos("cafeteria");
			setLoading(false);
			handleCargando();
		};
		fetchProductos();
	}, []);

	useEffect(() => {
		if (productosCafeteria.length > 0) {
			const agrupados = productosCafeteria.reduce((acc, producto) => {
				const categoriaNombre = producto.categoria?.nombre || "Sin categoría";
				if (!acc[categoriaNombre]) {
					acc[categoriaNombre] = [];
				}
				acc[categoriaNombre].push(producto);
				return acc;
			}, {});
			setProductosAgrupados(agrupados);
		}
	}, [productosCafeteria]);

	if (loading) {
		return (
			<div className="flex justify-center items-center h-screen">
				<p className="text-xl font-bold text-gray-600">Cargando...</p>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-50  flex flex-col">
			<header className="bg-[#90C9CF] py-6">
				<div className="container mx-auto text-center flex justify-between items-center">
					<img
						src="/public/imgs/logo-cafeteria.png"
						className="h-16 w-52"
						alt="Logo"
					/>
					<h1 className="text-4xl font-bold text-black">Menú Cafetería</h1>
					{/* <p className="text-white mt-2">Cafetería Borcelle</p> */}
				</div>
			</header>

			<main className="container mx-auto py-12 px-4 flex-grow">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{Object.keys(productosAgrupados).map((categoria) => (
						<div key={categoria}>
							<h2 className="text-2xl font-bold text-[#90C9CF] mb-4">
								{categoria}
							</h2>
							<ul className="space-y-2">
								{productosAgrupados[categoria].map((producto) => (
									<li
										key={producto._id}
										className="flex justify-between items-start border-b border-gray-300 py-2"
									>
										<div>
											<span className="text-gray-800">{producto.nombre}</span>
											{producto.descripcion && (
												<p className="text-gray-500 italic text-sm mt-1">
													{producto.descripcion}
												</p>
											)}
										</div>
										<span className="text-gray-800 font-bold">
											$ {Number(producto.precio).toFixed(2).toLocaleString()}
										</span>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>
			</main>

			<footer className="bg-gray-800 py-4">
				<p className="text-center text-gray-300 text-sm">
					¡Gracias por elegir Rower Cafe Club!
				</p>
			</footer>
			<Cargando />
		</div>
	);
};

export default MenuCafeteria;
