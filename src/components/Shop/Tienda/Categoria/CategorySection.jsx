import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom"; // Para query params
import useProductos from "../../../../hooks/useProductos";
import useAuth from "../../../../hooks/useAuth";
import Cargando from "../../../Shared/Cargando";
import CartDrawer from "../Carrito/CartDrawer";

const productsPerPage = 8;

export default function CategorySection() {
	const [currentPage, setCurrentPage] = useState(1);
	const [filteredProducts, setFilteredProducts] = useState([]);
	const [searchParams] = useSearchParams();
	const cate = useParams();
	const subCategoriaParam = searchParams.get("subCategoria"); // Obtenemos la subcategoría del query param
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

	useEffect(() => {
		// Filtrar por subcategoría si está activa
		if (subCategoriaParam) {
			const filtrados = productos.filter(
				(prod) => prod.subCategoria === subCategoriaParam
			);
			setFilteredProducts(filtrados);
		} else {
			setFilteredProducts(productos); // Sin filtro, mostrar todos los productos
		}
	}, [productos, subCategoriaParam]);

	const indexOfLastProduct = currentPage * productsPerPage;
	const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
	const currentProducts = filteredProducts.slice(
		indexOfFirstProduct,
		indexOfLastProduct
	);

	const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

	const paginate = (pageNumber) => setCurrentPage(pageNumber);

	const handleVerProducto = (id, nombre) => {
		navigate(`/producto/${nombre}/${id}`);
	};

	const agregarAlCarrito = async (producto) => {
		if (producto.tieneVariantes) {
			navigate(`/producto/${producto.nombre}/${producto.id}`);
			return;
		}
		await addToCart(producto);
		handleCartDrawer();
	};

	return (
		<>
			<div className="mt-4">
				<h2 className="text-4xl font-bold text-center mb-12 uppercase">
					{cate.nombre}
				</h2>

				{currentProducts.length > 0 ? (
					<>
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
										className="w-full h-48 object-contain"
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

						<div className="flex justify-center mt-8 space-x-4 mb-12">
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
					<h1 className="text-center text-gray-300">No hay productos</h1>
				)}

				<Cargando />
			</div>
			{cartDrawer ? <CartDrawer /> : null}
		</>
	);
}
