import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import useProductos from "../../../../hooks/useProductos";

export default function StoreHeader() {
	const { obtenerCategorias, categorias, handleCartDrawer, cart, setCart } =
		useProductos();
	const [totalProductos, setTotalProductos] = useState(0);
	const [menuOpen, setMenuOpen] = useState(false);
	const [openCategory, setOpenCategory] = useState(null); // Para mobile
	const navigate = useNavigate();
	const { buscarProductos, busqueda, setBusqueda } = useProductos();

	useEffect(() => {
		const cargarCategorias = async () => {
			await obtenerCategorias();
		};
		cargarCategorias();
	}, []);

	useEffect(() => {
		const cargarCarrito = () => {
			if (cart.length === 0) {
				const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
				setCart(storedCart);
			}
		};
		cargarCarrito();
	}, [setCart]);

	useEffect(() => {
		const total = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);
		setTotalProductos(total);
	}, [cart]);

	const handleNavigateCategoria = (categoria) => {
		navigate(`/categoria/${categoria}`);
	};

	const handleNavigateSubCategoria = (categoria, subCategoria) => {
		console.log(subCategoria);

		navigate(`/categoria/${categoria}?subCategoria=${subCategoria}`);
	};

	return (
		<header className="sticky top-0 z-50 bg-white shadow-md border-b border-gray-200 flex items-center justify-between px-4 sm:px-8 py-4">
			{/* Logo */}
			<div
				className="flex items-center space-x-2 hover:cursor-pointer"
				onClick={() => navigate("/tienda")}
			>
				<img
					src="/imgs/logo-cafeteria.png"
					alt="Logo Rower"
					className="h-8 sm:h-10"
				/>
			</div>

			{/* Categorías Desktop (Mejorado) */}
			<div className="relative hidden sm:flex space-x-6">
				{categorias.map((categoria) => (
					<div key={categoria._id} className="relative group">
						<button
							className="text-gray-800 font-semibold hover:text-gray-600 focus:outline-none"
							onClick={() => handleNavigateCategoria(categoria.nombre)}
						>
							{categoria.nombre.toUpperCase()}
						</button>
						{/* Subcategorías (Desktop) */}
						{categoria.subCategorias.length > 0 && (
							<div className="absolute left-0 top-full mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50 opacity-0 scale-95 transform transition-all duration-200 ease-in-out group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0">
								<ul className="flex flex-col space-y-2">
									{categoria.subCategorias.map((subCategoria) => (
										<li
											key={subCategoria._id}
											onClick={() =>
												handleNavigateSubCategoria(
													categoria.nombre,
													subCategoria._id
												)
											}
											className="text-gray-800 p-4 hover:text-gray-600 cursor-pointer transition-colors duration-200 hover:bg-[#90C9CF]"
										>
											{subCategoria.nombre}
										</li>
									))}
								</ul>
							</div>
						)}
					</div>
				))}
			</div>

			{/* Categorías Mobile */}
			<div className="relative sm:hidden">
				<button
					id="menu-categorias"
					onClick={() => setMenuOpen((prev) => !prev)}
					className="text-gray-800 font-semibold hover:text-gray-600 focus:outline-none"
				>
					Categorías
				</button>
				{menuOpen && (
					<div className="absolute left-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
						<ul className="flex flex-col space-y-2 p-4">
							{categorias.map((categoria) => (
								<li key={categoria._id} className="relative">
									<div
										className="text-gray-800 hover:text-gray-600 cursor-pointer flex justify-between items-center"
										onClick={() => {
											setOpenCategory((prev) =>
												prev === categoria._id ? null : categoria._id
											);
											handleNavigateCategoria(categoria.nombre);
										}}
									>
										{categoria.nombre.toUpperCase()}
										{categoria.subCategorias.length > 0 && (
											<span className="text-gray-400 text-sm ml-2">
												{openCategory === categoria._id ? "-" : "+"}
											</span>
										)}
									</div>
									{openCategory === categoria._id &&
										categoria.subCategorias.length > 0 && (
											<ul className="pl-4 mt-2 space-y-1">
												{categoria.subCategorias.map((subCategoria) => (
													<li
														key={subCategoria._id}
														onClick={() =>
															handleNavigateSubCategoria(
																categoria.nombre,
																subCategoria._id
															)
														}
														className="text-gray-800 p-4 hover:text-gray-600 cursor-pointer transition-colors duration-200 hover:bg-[#90C9CF]"
													>
														{subCategoria.nombre}
													</li>
												))}
											</ul>
										)}
								</li>
							))}
						</ul>
					</div>
				)}
			</div>

			{/* Buscador y Iconos */}
			<div className="flex items-center space-x-4 sm:space-x-6">
				<div className="hidden sm:flex items-center border border-gray-300 rounded-full overflow-hidden">
					<input
						type="text"
						placeholder="¿QUÉ BUSCAS?"
						value={busqueda}
						className="px-4 py-1 text-gray-500 placeholder-gray-500 outline-none"
						onChange={(e) => setBusqueda(e.target.value)}
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								buscarProductos(busqueda);
								navigate("/buscar");
							}
						}}
					/>
					<button
						className="px-3 text-gray-500 hover:text-gray-700"
						onClick={() => {
							buscarProductos(busqueda);
							navigate("/buscar");
						}}
					>
						<FaSearch />
					</button>
				</div>

				{/* Iconos de usuario y carrito */}
				{/* <button
					className="text-gray-800 hover:text-gray-600 hover:cursor-pointer"
					onClick={() => navigate("/login")}
				>
					<FaUser size={20} />
				</button> */}

				<div className="relative">
					<button
						className="text-gray-800 hover:text-gray-600"
						onClick={handleCartDrawer}
					>
						<FaShoppingCart size={20} />
					</button>
					{totalProductos > 0 && (
						<span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
							{totalProductos}
						</span>
					)}
				</div>
			</div>
		</header>
	);
}
