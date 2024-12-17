import { useEffect, useState } from "react";
import StoreHeader from "../Home/HeaderStore";
import RelatedProducts from "./RelatedProducts";
import Footer from "../Home/Footer";
import useProductos from "../../../../hooks/useProductos";
import { useParams } from "react-router-dom";
import CartDrawer from "../Carrito/CartDrawer";
import Swal from "sweetalert2";

function ProductPage() {
	const [quantity, setQuantity] = useState(1);
	const { addToCart, obtenerProducto, producto, handleCartDrawer, cartDrawer } =
		useProductos();
	const { id } = useParams();
	const [selectedImage, setSelectedImage] = useState("");
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedVariant, setSelectedVariant] = useState(null);
	const [finalPrice, setFinalPrice] = useState(0);

	useEffect(() => {
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

	useEffect(() => {
		const additionalPrice = selectedVariant?.precioAdicional || 0;
		setFinalPrice(parseInt(producto?.precio || 0) + additionalPrice);
	}, [selectedVariant, producto]);

	const agregarAlCarrito = async (e) => {
		e.preventDefault();
		if (producto.tieneVariantes && !selectedVariant) {
			Swal.fire({
				icon: "error",
				title: "Error",
				text: "Debes seleccionar una variante para agregar al carrito",
			});
			return;
		}

		const productToCart = {
			...producto,
			variante: selectedVariant,
			precio: finalPrice,
			cantidad: quantity,
		};

		await addToCart(productToCart);
		handleCartDrawer();
	};

	const incrementQuantity = () => setQuantity(quantity + 1);
	const decrementQuantity = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

	return (
		<>
			<StoreHeader />
			<div className="container mx-auto px-4 py-8">
				{/* Product Section */}
				<div className="flex flex-col lg:flex-row items-start lg:space-x-8">
					{/* Product Image */}
					<div className="flex-shrink-0 w-full lg:w-1/2 flex flex-col items-center mb-6 lg:mb-0">
						<img
							src={selectedImage || ""}
							alt={producto?.nombre || "Cargando..."}
							className="w-full max-w-[450px] h-[350px] lg:h-[550px] object-cover border border-gray-200 rounded"
							onClick={() => setIsModalOpen(true)}
						/>
						{/* Image Gallery */}
						<div className="flex mt-4 space-x-2 overflow-x-auto">
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
									onClick={() => setSelectedImage(img)}
								/>
							))}
						</div>
					</div>

					{/* Product Details */}
					<div className="w-full lg:w-1/2">
						<h1 className="text-2xl font-bold mb-2 text-center lg:text-left">
							{producto?.nombre}
						</h1>
						<p className="text-xl font-semibold text-gray-700 mb-4 text-center lg:text-left">
							$ {finalPrice}
						</p>

						<p className="mb-6 text-center lg:text-left">
							{producto?.descripcion}
						</p>

						{/* Variants Selector */}
						{producto.tieneVariantes && (
							<div className="mb-6">
								<h2 className="font-semibold text-lg mb-2 text-center lg:text-left">
									Seleccioná Variante
								</h2>
								<select
									className="w-full border rounded p-2 mb-4"
									value={selectedVariant?._id || ""}
									onChange={(e) => {
										const variant = producto.variante.find(
											(v) => v._id === e.target.value
										);
										setSelectedVariant(variant || null);
									}}
								>
									<option value="">Seleccioná un talle y color</option>
									{producto.variante.map((v) => (
										<option key={v._id} value={v._id}>
											Talle: {v.talle} - Color: {v.color}
										</option>
									))}
								</select>

								<div className="flex flex-col space-y-4">
									{selectedVariant ? (
										<div
											className={`p-4 flex border rounded ${
												selectedVariant
													? "border-gray-900 bg-gray-100"
													: "border-gray-300"
											}`}
										>
											<p className="text-sm mr-2">
												Talle: <strong>{selectedVariant.talle} -</strong>
											</p>
											<p className="text-sm">
												Color: <strong>{selectedVariant.color}</strong>
											</p>
										</div>
									) : (
										<p className="text-sm text-gray-500 text-center lg:text-left">
											Seleccioná una variante para ver los detalles.
										</p>
									)}
								</div>
							</div>
						)}

						<div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
							{/* Quantity Selector */}
							<div className="flex flex-col items-center lg:items-start">
								<label className="text-gray-700 mb-2">Cantidad</label>
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
								onClick={agregarAlCarrito}
							>
								AGREGAR AL CARRITO
							</button>
						</div>
					</div>
				</div>

				{/* Modal de Imagen Grande */}
				{isModalOpen && (
					<div
						className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
						onClick={() => setIsModalOpen(false)}
					>
						<img
							src={selectedImage || ""}
							alt="Imagen ampliada"
							className="max-w-[90%] max-h-[90%] rounded"
						/>
					</div>
				)}
			</div>
			<RelatedProducts />
			<Footer />
			{cartDrawer ? <CartDrawer /> : null}
		</>
	);
}

export default ProductPage;
