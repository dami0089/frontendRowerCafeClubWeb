import useProductos from "../../../../hooks/useProductos";

export default function RelatedProducts() {
	const { producto, addToCart, handleCartDrawer } = useProductos();

	const agregarAlCarrito = async (e, producto) => {
		e.preventDefault();
		console.log(producto);
		await addToCart(producto);
		handleCartDrawer();
	};

	return (
		<div className="py-16">
			<h2 className="text-3xl font-bold text-center mb-10">
				Productos Relacionados
			</h2>

			{producto &&
			producto.productosRelacionados &&
			producto.productosRelacionados.length > 0 ? (
				<div className="grid gap-8 max-w-6xl mx-auto px-4 sm:grid-cols-2 lg:grid-cols-3">
					{producto?.productosRelacionados.map((product) => (
						<div
							key={product._id}
							className="bg-white shadow-lg rounded-lg overflow-hidden relative"
						>
							{/* Product Image */}
							<img
								src={product?.imagen?.[0]}
								alt={product.nombre}
								className="w-full h-48 object-cover"
							/>
							{/* Product Info */}
							<div className="p-4 flex flex-col justify-between">
								<h3 className="text-xl font-semibold mb-2 text-center">
									{product.nombre}
								</h3>

								{/* Price Section */}
								<div className="text-center mb-4">
									<p className="text-gray-700 font-bold text-2xl">
										${product.precio}
									</p>
								</div>

								{/* Action Button */}
								<button
									className={`w-full px-4 py-2 font-bold rounded-lg bg-[#90C9CF] text-white hover:bg-[#7aaeb4]`}
									onClick={(e) => agregarAlCarrito(e, product)}
								>
									AGREGAR AL CARRITO
								</button>
							</div>
						</div>
					))}
				</div>
			) : (
				<h1 className="text-center text-gray-300">
					No ha productos en esta seccion
				</h1>
			)}
		</div>
	);
}
