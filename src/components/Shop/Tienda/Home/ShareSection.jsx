import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useProductos from "../../../../hooks/useProductos";

import Cargando from "../../../Shared/Cargando";
import Footer from "./Footer";
import CartDrawer from "../Carrito/CartDrawer";
import StoreHeader from "./HeaderStore";

const productsPerPage = 8;

export default function ShareSection() {
	const [currentPage, setCurrentPage] = useState(1);
	const {
		productosFiltrados, // Cambiado de "productos" a "productosFiltrados"
		addToCart,
		handleCartDrawer,
		cartDrawer,
		nombreBusqueda,
	} = useProductos();

	const navigate = useNavigate();

	// Cálculo de los productos a mostrar en la página actual
	const indexOfLastProduct = currentPage * productsPerPage;
	const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
	const currentProducts = productosFiltrados.slice(
		indexOfFirstProduct,
		indexOfLastProduct
	);

	// Total de páginas
	const totalPages = Math.ceil(productosFiltrados.length / productsPerPage);

	const paginate = (pageNumber) => setCurrentPage(pageNumber);

	const handleVerProducto = (id, nombre) => {
		navigate(`/producto/${nombre}/${id}`);
	};

	const agregarAlCarrito = async (producto) => {
		await addToCart(producto);
		handleCartDrawer();
	};

	return (
		<>
			<StoreHeader />
			<div className="py-16 px-6">
				<h2 className="text-4xl font-bold text-center mb-12 uppercase">
					Resultados de Búsqueda {nombreBusqueda}
				</h2>

				{currentProducts.length > 0 ? (
					<>
						{/* Grid de Productos */}
						<div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
							{currentProducts.map((product) => (
								<div
									key={product._id}
									className="bg-white hover:cursor-pointer shadow-lg rounded-lg overflow-hidden flex flex-col h-full"
									onClick={() => handleVerProducto(product._id, product.nombre)}
								>
									<img
										src={product.imagen}
										alt={product.nombre}
										className="w-full h-48 object-cover"
									/>
									<div className="p-4 flex flex-col flex-grow justify-between">
										<h3 className="text-xl font-semibold mb-2">
											{product.nombre}
										</h3>
										<div>
											<p className="text-gray-700 mb-4 text-2xl text-right font-bold">
												${product.precio}
											</p>
											<button
												className="w-full px-4 py-2 bg-[#90C9CF] text-white font-bold rounded-lg hover:bg-[#7aaeb4]"
												onClick={(e) => {
													e.stopPropagation();
													agregarAlCarrito(product);
												}}
											>
												Agregar al carrito
											</button>
										</div>
									</div>
								</div>
							))}
						</div>

						{/* Paginación */}
						<div className="flex justify-center mt-8 space-x-4">
							{Array.from({ length: totalPages }, (_, index) => (
								<button
									key={index + 1}
									onClick={() => paginate(index + 1)}
									className={`px-4 py-2 rounded-lg ${
										currentPage === index + 1
											? "bg-[#90C9CF] text-white"
											: "bg-gray-200 text-gray-700 hover:bg-gray-300"
									}`}
								>
									{index + 1}
								</button>
							))}
						</div>
					</>
				) : (
					<h1 className="text-center text-gray-300">
						No hay productos que coincidan.
					</h1>
				)}

				<Cargando />
			</div>
			<Footer />
			{cartDrawer ? <CartDrawer /> : null}
		</>
	);
}
