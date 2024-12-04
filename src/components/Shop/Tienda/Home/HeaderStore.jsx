import { FaSearch, FaUser, FaShoppingCart } from "react-icons/fa";
import useProductos from "../../../../hooks/useProductos";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function StoreHeader() {
	const { obtenerCategorias, categorias, handleCartDrawer, cart, setCart } =
		useProductos();
	const [totalProductos, setTotalProductos] = useState(0);
	const navigate = useNavigate();
	const { buscarProductos, busqueda, setBusqueda } = useProductos();

	const handleInputChange = (e) => {
		e.preventDefault();
		buscarProductos(busqueda); // Filtrar productos en tiempo real
		navigate("/buscar");
	};

	// Cargar categorías al montar el componente
	useEffect(() => {
		const cargarCategorias = async () => {
			await obtenerCategorias();
		};
		cargarCategorias();
	}, []);

	// Cargar carrito desde localStorage si `cart` está vacío y calcular total de productos
	useEffect(() => {
		const cargarCarrito = () => {
			// Cargar carrito desde localStorage si está vacío
			if (cart.length === 0) {
				const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
				setCart(storedCart); // Establecer el carrito inicial
			}
		};

		cargarCarrito();
		// Este efecto solo se ejecuta una vez al montar el componente
	}, [setCart]);

	// Calcular el total de productos en el carrito cada vez que este cambia
	useEffect(() => {
		const total = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);
		setTotalProductos(total);
	}, [cart]); // cart cambia, recalcula totalProductos

	const handleHome = () => {
		navigate("/tienda");
	};

	const handleNavigateCategoria = (categoria) => {
		navigate(`/categoria/${categoria}`);
	};

	const Profile = () => {
		navigate("/login");
	};

	const carrito = () => {
		handleCartDrawer();
	};

	return (
		<header className="flex items-center justify-between px-8 py-6 border-b border-gray-200 bg-white">
			{/* Logo */}
			<div
				className="flex items-center space-x-2 hover:cursor-pointer"
				onClick={handleHome}
			>
				<img src="/imgs/logo-cafeteria.png" alt="Logo Rower" className="h-10" />
			</div>

			{/* Categorías */}
			<nav className="flex space-x-6 text-gray-800 font-semibold">
				{categorias.map((categoria) => (
					<a
						key={categoria._id}
						className="hover:text-gray-600 hover:cursor-pointer"
						onClick={() => handleNavigateCategoria(categoria.nombre)}
					>
						{categoria.nombre.toUpperCase()}
					</a>
				))}
			</nav>

			{/* Buscador y Iconos */}
			<div className="flex items-center space-x-6">
				<div className="flex items-center border border-gray-300 rounded-full overflow-hidden">
					<input
						type="text"
						placeholder="¿QUÉ BUSCAS?"
						value={busqueda}
						className="px-4 py-1 text-gray-500 placeholder-gray-500 outline-none"
						onChange={(e) => setBusqueda(e.target.value)}
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								handleInputChange(e);
							}
						}}
					/>
					<button
						className="px-3 text-gray-500 hover:text-gray-700"
						onClick={(e) => handleInputChange(e)}
					>
						<FaSearch />
					</button>
				</div>
				{/* Iconos de usuario y carrito */}
				<button
					className="text-gray-800 hover:text-gray-600 hover:cursor-pointer"
					onClick={Profile}
				>
					<FaUser size={20} />
				</button>

				{/* Carrito con contador de productos */}
				<div className="relative">
					<button
						className="text-gray-800 hover:text-gray-600"
						onClick={() => carrito()}
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
