import { useState, useEffect, useRef } from "react";
import Footer from "../Home/Footer";
import CheckoutForm from "./CheckoutForm";
import useProductos from "../../../../hooks/useProductos";
import Swal from "sweetalert2";
import Cargando from "../../../Shared/Cargando";
import useAuth from "../../../../hooks/useAuth";

export default function CartPage() {
	const [cartItems, setCartItems] = useState([]);
	const [discountCode, setDiscountCode] = useState("");
	const [discountAmount, setDiscountAmount] = useState(0);
	const [isCheckout, setIsCheckout] = useState(false); // Estado para alternar entre carrito y checkout
	const isInitialLoad = useRef(true);
	const { handleCargando } = useAuth();

	const {
		nuevoPedido,
		correoCompra,
		nombreComprador,
		apellidoComprador,
		dniComprador,
		telefonoComprador,
		cuitComprador,
		direccion,
		localidad,
		provincia,
		codigoPostal,
		password,
		nuevoPago,
	} = useProductos();

	useEffect(() => {
		const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
		setCartItems(storedCart);
	}, []);

	useEffect(() => {
		if (isInitialLoad.current) {
			isInitialLoad.current = false;
			return;
		}
		localStorage.setItem("cart", JSON.stringify(cartItems));
	}, [cartItems]);

	const handleQuantityChange = (productId, newQuantity) => {
		setCartItems((prevItems) =>
			prevItems.map((item) =>
				item._id === productId ? { ...item, quantity: newQuantity } : item
			)
		);
	};

	const handleRemoveItem = (productId) => {
		setCartItems((prevItems) =>
			prevItems.filter((item) => item._id !== productId)
		);
	};

	const handleApplyDiscount = () => {
		if (discountCode === "DESCUENTO10") {
			setDiscountAmount(10000);
		} else {
			setDiscountAmount(0);
		}
	};

	const totalAmount = cartItems.reduce(
		(total, item) => total + item.precio * (item.quantity || 1),
		0
	);

	const finalTotal = totalAmount - discountAmount;

	const handlePagar = async (e) => {
		e.preventDefault();
		// TODO: No olvidarse hacer la logica de los cupones!!!! (hay una tabla creada)
		if (
			correoCompra === "" ||
			nombreComprador === "" ||
			apellidoComprador === "" ||
			dniComprador === "" ||
			telefonoComprador === "" ||
			direccion === "" ||
			localidad === "" ||
			provincia === "" ||
			codigoPostal === ""
		) {
			Swal.fire({
				icon: "error",
				title: "Error",
				text: "Por favor, complete todos los campos.",
			});
			return;
		}

		try {
			handleCargando();
			const res = await nuevoPedido(
				cartItems,
				totalAmount,
				"",
				nombreComprador,
				apellidoComprador,
				telefonoComprador,
				dniComprador,
				correoCompra,
				direccion,
				localidad,
				provincia,
				codigoPostal,
				cuitComprador,
				password
			);

			const pago = await nuevoPago(cartItems, res);

			if (pago && pago.init_point) {
				window.location.href = pago.init_point;
			}

			handleCargando();
		} catch (error) {
			handleCargando();

			console.log(error);
		}
	};

	return (
		<>
			<div className="max-w-7xl mx-auto mb-12 flex flex-col min-h-screen">
				<header className="text-center">
					<img
						src="/public/imgs/isologo.png"
						alt="Logo de la empresa"
						className="mx-auto"
					/>
				</header>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
					{/* Vista del Carrito */}
					<div
						className={`transition-all duration-500 ${
							isCheckout ? "hidden" : "block"
						}`}
					>
						<div className="lg:col-span-2 space-y-6">
							{cartItems.length > 0 ? (
								cartItems.map((item) => (
									<div
										key={item._id}
										className="flex items-center justify-between bg-white p-6 shadow-md rounded-lg"
									>
										<div className="flex items-center space-x-4">
											<img
												src={item.imagen}
												alt={item.nombre}
												className="w-24 h-24 object-cover rounded-lg"
											/>
											<div>
												<h3 className="text-lg font-semibold">{item.nombre}</h3>
												{item.variante && (
													<p className="text-gray-500 text-sm">
														Talle: <strong>{item.variante.talle}</strong>,
														Color: <strong>{item.variante.color}</strong>
													</p>
												)}
												{item.precioOriginal && (
													<p className="text-gray-500 line-through">
														${item.precioOriginal}
													</p>
												)}
												<p className="text-xl font-bold">${item.precio}</p>
											</div>
										</div>
										<div className="flex items-center space-x-4">
											<input
												type="number"
												min="1"
												value={item.quantity || 1}
												onChange={(e) =>
													handleQuantityChange(
														item._id,
														parseInt(e.target.value)
													)
												}
												className="w-16 p-1 border rounded-lg text-center"
											/>
											<button
												onClick={() => handleRemoveItem(item._id)}
												className="text-red-500 hover:text-red-700 font-bold"
											>
												Eliminar
											</button>
										</div>
									</div>
								))
							) : (
								<p className="text-center text-gray-500">
									Tu carrito está vacío.
								</p>
							)}
						</div>
					</div>

					{/* Vista del Checkout */}
					<div
						className={`transition-all duration-500 ${
							isCheckout ? "block" : "hidden"
						}`}
					>
						<div className="lg:col-span-3">
							<CheckoutForm />
						</div>
					</div>

					{/* Resumen del Pedido */}
					<div className="bg-gray-50 h-max p-6 shadow-md rounded-lg space-y-4">
						{/* <div className="space-y-2">
							<input
								type="text"
								placeholder="Código de descuento"
								value={discountCode}
								onChange={(e) => setDiscountCode(e.target.value)}
								className="w-full p-2 border rounded-lg"
							/>
							<button
								onClick={handleApplyDiscount}
								className="w-full px-4 py-2 bg-gray-900 text-white font-bold rounded-lg hover:bg-gray-700"
							>
								Añadir
							</button>
						</div> */}
						<div className="space-y-2">
							<div className="flex justify-between">
								<span>Subtotal:</span>
								<span>${totalAmount}</span>
							</div>
							<div className="flex justify-between">
								<span>Descuentos:</span>
								<span>-${discountAmount}</span>
							</div>
							<div className="flex justify-between text-xl font-semibold">
								<span>Total:</span>
								<span>${finalTotal}</span>
							</div>
						</div>
						<button
							onClick={(e) =>
								!isCheckout ? setIsCheckout(true) : handlePagar(e)
							} // Cambiar a vista de checkout
							className="w-full mt-6 px-4 py-3 bg-[#90C9CF] text-white font-bold rounded-lg hover:bg-[#80C9CF]"
						>
							Proceder al pago
						</button>
					</div>
				</div>
			</div>
			<Cargando />
			<Footer />
		</>
	);
}
