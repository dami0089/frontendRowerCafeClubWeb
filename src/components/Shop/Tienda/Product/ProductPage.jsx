import { useEffect, useState } from "react";
import StoreHeader from "../Home/HeaderStore";
import RelatedProducts from "./RelatedProducts";
import Footer from "../Home/Footer";
import useProductos from "../../../../hooks/useProductos";
import { useParams } from "react-router-dom";
import CartDrawer from "../Carrito/CartDrawer";

function ProductPage() {
	const [quantity, setQuantity] = useState(1);
	const { addToCart, obtenerProducto, producto, handleCartDrawer, cartDrawer } =
		useProductos();
	const { id } = useParams();
	const [selectedImage, setSelectedImage] = useState("");
	const [isModalOpen, setIsModalOpen] = useState(false);

	useEffect(() => {
		// Establecemos la imagen principal como la portada por defecto
		if (producto?.imagen?.[0]) {
			setSelectedImage(producto.imagen[0]);
		}
	}, [producto]);

	useEffect(() => {
		const traerProductos = async () => {
			await obtenerProducto(id);
		};
		traerProductos();
	}, []);

	const agregarAlCarrito = async (e, producto) => {
		e.preventDefault();
		console.log(producto);
		await addToCart(producto);
		handleCartDrawer();
	};

	const incrementQuantity = () => setQuantity(quantity + 1);
	const decrementQuantity = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

	return (
		<>
			<StoreHeader />
			<div className="container mx-auto px-4 py-8">
				{/* Breadcrumb */}

				{/* Product Section */}
				<div className="flex flex-col lg:flex-row items-start">
					{/* Product Image */}
					<div className="flex-shrink-0 mb-6 lg:mb-0 lg:w-1/2 flex flex-col items-center">
						<img
							src={selectedImage || ""}
							alt={producto?.nombre || "Cargando..."}
							className="max-w-full h-[550px] object-cover border border-gray-200 rounded"
							onClick={() => setIsModalOpen(true)}
						/>
						{/* Image Gallery */}
						<div className="flex mt-4 space-x-2">
							{producto?.imagen?.map((img, index) => (
								<img
									key={index}
									src={img}
									alt={`Imagen ${index + 1}`}
									className={`w-16 h-16 object-cover border rounded cursor-pointer ${
										selectedImage === img
											? "border-gray-900"
											: "border-gray-300"
									}`}
									onClick={() => setSelectedImage(img)} // Cambiar imagen principal
								/>
							))}
						</div>
					</div>

					{/* Product Details */}
					<div className="lg:ml-8 lg:w-1/2">
						<h1 className="text-2xl font-bold mb-2">{producto.nombre}</h1>
						<p className="text-xl font-semibold text-gray-700 mb-2">
							$ {producto.precio}
						</p>

						<p className="mb-12">{producto.descripcion}</p>

						<div className="flex flex-row items-center justify-between">
							{/* Quantity Selector */}
							<div className="flex items-center ">
								<label className="text-gray-700 mr-4">Cantidad</label>
								<div className="flex items-center border border-gray-300 rounded">
									<button
										onClick={decrementQuantity}
										className="px-3 py-1 text-gray-700 hover:bg-gray-200"
									>
										-
									</button>
									<span className="px-4">{quantity}</span>
									<button
										onClick={incrementQuantity}
										className="px-3 py-1 text-gray-700 hover:bg-gray-200"
									>
										+
									</button>
								</div>
							</div>

							{/* Add to Cart Button */}
							<button
								className="w-full lg:w-auto bg-[#90C9CF] text-white py-3 px-6 rounded hover:bg-gray-900"
								onClick={(e) => agregarAlCarrito(e, producto)}
							>
								AGREGAR AL CARRITO
							</button>
						</div>
					</div>
				</div>

				{/* Product Description */}
				{producto && producto.descripcionLarga ? (
					<div className="mt-8">
						<button className="text-left w-full py-3 border-b-2 border-gray-800 font-semibold text-lg">
							DETALLES DEL PRODUCTO
						</button>
						<div className="mt-4 text-gray-600 text-sm">
							<h2 className="text-lg font-semibold mb-2">{producto.nombre}</h2>
							<div
								dangerouslySetInnerHTML={{ __html: producto.descripcionLarga }}
							></div>
						</div>
					</div>
				) : null}
			</div>
			{/* Modal de Imagen Grande */}
			{isModalOpen && (
				<div
					className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
					onClick={() => setIsModalOpen(false)} // Cerrar modal al hacer clic fuera
				>
					<img
						src={selectedImage || ""}
						alt="Imagen ampliada"
						className="max-w-[90%] max-h-[90%] rounded"
					/>
				</div>
			)}
			<RelatedProducts />
			<Footer />

			{cartDrawer ? <CartDrawer /> : null}
		</>
	);
}

export default ProductPage;
