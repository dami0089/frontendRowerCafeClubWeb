import { useEffect } from "react";
import useProductos from "../../../../hooks/useProductos";
import { useNavigate } from "react-router-dom";

export default function FeaturedProducts() {
	const {
		productosDestacados,
		obtenerProductosDestacados,
		addToCart,
		handleCartDrawer,
	} = useProductos();

	const navigate = useNavigate();

	useEffect(() => {
		const cargarProductosDestacados = async () => {
			await obtenerProductosDestacados();
		};
		cargarProductosDestacados();
	}, []);

	const agregarAlCarrito = async (e, producto) => {
		e.preventDefault();
		if (producto.tieneVariantes) {
			navigate(`/producto/${producto.nombre}/${producto.id}`);
			return;
		}
		await addToCart(producto);
		handleCartDrawer();
	};

	const handleVerProducto = (id, nombre) => {
		navigate(`/producto/${nombre}/${id}`);
	};

	return (
		<div className="py-16 bg-gray-50">
			<h2 className="text-3xl font-bold text-center mb-10">
				Productos Destacados
			</h2>

			<div className="grid gap-8 max-w-6xl mx-auto px-4 sm:grid-cols-2 lg:grid-cols-3">
				{productosDestacados.map((product) => (
					<div
						key={product.id}
						className="bg-white shadow-lg rounded-lg overflow-hidden hover:cursor-pointer"
						onClick={() => handleVerProducto(product._id, product.nombre)}
					>
						<img
							src={product.imagen}
							alt={product.nombre}
							className="w-full h-48 object-contain"
						/>

						<div className="p-4 flex flex-col flex-grow justify-between">
							{/* Nombre del producto en la parte superior */}
							<h3 className="text-xl font-semibold mb-2">{product.nombre}</h3>

							{/* Contenedor del precio y el botón al final */}
							<div>
								<p className="text-gray-700 mb-4 text-2xl text-left font-bold">
									$ {product.precio}
								</p>
								<button
									onClick={(e) => {
										e.stopPropagation(); // Evita que el clic se propague al contenedor padre
										agregarAlCarrito(e, product);
									}}
									className="w-full px-4 py-2 bg-[#90C9CF] text-white font-bold rounded-lg hover:bg-[#90C9CF]]"
								>
									Agregar al carrito
								</button>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
