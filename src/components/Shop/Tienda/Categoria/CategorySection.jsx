import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useProductos from "../../../../hooks/useProductos";
import useAuth from "../../../../hooks/useAuth";
import Cargando from "../../../Shared/Cargando";
import Footer from "../Home/Footer";
import CartDrawer from "../Carrito/CartDrawer";

const productsPerPage = 8;

export default function CategorySection() {
	const [currentPage, setCurrentPage] = useState(1);
	const cate = useParams();
	const {
		productos,
		obtenerProductosCategoria,
		addToCart,
		handleCartDrawer,
		cartDrawer,
	} = useProductos();
	const { handleCargando } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		const obtenerData = async () => {
			handleCargando();
			await obtenerProductosCategoria(cate.nombre);
			handleCargando();
		};
		obtenerData();
	}, [cate]);

	// Cálculo de los productos a mostrar en la página actual
	const indexOfLastProduct = currentPage * productsPerPage;
	const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
	const currentProducts = productos.slice(
		indexOfFirstProduct,
		indexOfLastProduct
	);

	// Total de páginas
	const totalPages = Math.ceil(productos.length / productsPerPage);

	// Función para cambiar de página
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
			<div className="py-16 px-6">
				<h2 className="text-4xl font-bold text-center mb-12 uppercase">
					{cate.nombre}
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
										{/* Nombre del producto en la parte superior */}
										<h3 className="text-xl font-semibold mb-2">
											{product.nombre}
										</h3>

										{/* Contenedor del precio y el botón al final */}
										<div>
											<p className="text-gray-700 mb-4 text-2xl text-right font-bold">
												${product.precio}
											</p>
											<button
												className="w-full px-4 py-2 bg-[#90C9CF] text-white font-bold rounded-lg hover:bg-[#7aaeb4]"
												onClick={(e) => {
													e.stopPropagation(); // Evita que el clic se propague al contenedor padre
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
						No ha productos en esta seccion
					</h1>
				)}

				<Cargando />
			</div>
			<Footer />
			{cartDrawer ? <CartDrawer /> : null}
		</>
	);
}
