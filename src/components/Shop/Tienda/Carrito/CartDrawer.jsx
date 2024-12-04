import { useEffect } from "react";
import Modal from "react-modal";
import useProductos from "../../../../hooks/useProductos";
import { useNavigate } from "react-router-dom";

Modal.setAppElement("#root"); // Configura el elemento raíz del modal para accesibilidad

export default function CartDrawer() {
	const { cartDrawer, handleCartDrawer, cart, setCart } = useProductos();
	const navigate = useNavigate();

	// Cargar el carrito desde localStorage al abrir el modal
	useEffect(() => {
		if (cartDrawer) {
			const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
			setCart(storedCart);
		}
	}, [cartDrawer]);

	// Calcular subtotal y total con descuentos
	const subtotal = cart.reduce(
		(total, item) => total + item.precio * (item.quantity || 1),
		0
	);
	const discountAmount = 0; // Esto se puede actualizar según se aplique un descuento
	const total = subtotal - discountAmount;

	// Actualizar la cantidad de un producto en el carrito
	const updateQuantity = (productId, quantity) => {
		const updatedCart = cart.map((item) =>
			item._id === productId ? { ...item, quantity } : item
		);
		setCart(updatedCart);
		localStorage.setItem("cart", JSON.stringify(updatedCart));
	};

	const removeItem = (productId) => {
		setCart((prevCartItems) => {
			// Filtra el producto que queremos eliminar
			const updatedCart = prevCartItems.filter(
				(item) => item._id !== productId
			);

			// Actualiza el localStorage inmediatamente
			localStorage.setItem("cart", JSON.stringify(updatedCart));

			return updatedCart;
		});
	};

	const navigateCarrito = () => {
		handleCartDrawer();
		navigate("/carrito");
	};

	return (
		<Modal
			isOpen={cartDrawer}
			onRequestClose={handleCartDrawer}
			className="fixed inset-y-0 right-0 w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out flex flex-col"
			overlayClassName="fixed inset-0 bg-black bg-opacity-50"
		>
			<div className="flex justify-between items-center p-4 border-b">
				<h2 className="text-xl font-bold">Carrito</h2>
				<button onClick={handleCartDrawer}>
					<span className="text-gray-500 hover:text-gray-800 text-lg font-bold">
						X
					</span>
				</button>
			</div>

			{/* Contenido desplazable del carrito */}
			<div className="p-4 space-y-4 overflow-y-auto flex-grow">
				{cart.length > 0 ? (
					cart.map((item) => (
						<div
							key={item._id}
							className="flex items-center justify-between border-b pb-4"
						>
							<div className="flex items-center space-x-4">
								<img
									src={item.imagen}
									alt={item.nombre}
									className="w-16 h-16 object-cover rounded"
								/>
								<div>
									<h3 className="text-sm font-semibold">{item.nombre}</h3>
									{item.precioOriginal && (
										<p className="text-gray-500 text-sm line-through">
											${item.precioOriginal}
										</p>
									)}
									<p className="text-lg font-bold">${item.precio}</p>
								</div>
							</div>
							<div className="flex items-center space-x-2">
								<select
									value={item.quantity || 1}
									onChange={(e) =>
										updateQuantity(item._id, parseInt(e.target.value))
									}
									className="border rounded p-1"
								>
									{[...Array(10).keys()].map((num) => (
										<option key={num + 1} value={num + 1}>
											{num + 1}
										</option>
									))}
								</select>
								<button
									onClick={() => removeItem(item._id)}
									className="text-gray-500 hover:text-red-500"
								>
									<span className="text-lg font-bold">X</span>
								</button>
							</div>
						</div>
					))
				) : (
					<p className="text-center text-gray-500">Tu carrito está vacío.</p>
				)}
			</div>

			{/* Resumen del Pedido fijo en la parte inferior */}
			<div className="p-4 border-t">
				<div className="flex justify-between mb-2">
					<span>Subtotal:</span>
					<span>${subtotal}</span>
				</div>
				<div className="flex justify-between mb-2">
					<span>Descuentos:</span>
					<span>-${discountAmount}</span>
				</div>
				<div className="flex justify-between font-bold text-lg mb-4">
					<span>Total:</span>
					<span>${total}</span>
				</div>
				<button
					className="w-full px-4 py-2 bg-[#90C9CF] text-white rounded-lg hover:bg-[#7aaeb4]"
					onClick={navigateCarrito}
				>
					Finalizar Pedido
				</button>
			</div>
		</Modal>
	);
}
