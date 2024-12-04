import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useProductos from "../../../../hooks/useProductos";

export default function SuccessPage() {
	const navigate = useNavigate();
	const { id } = useParams();
	const { pedidoSuccess } = useProductos();

	// Función para limpiar el carrito completamente
	const clearCart = () => {
		localStorage.removeItem("cart"); // Elimina el carrito del localStorage
	};

	useEffect(() => {
		const informarEstado = async () => {
			await pedidoSuccess(id);
			clearCart(); // Limpia el carrito al completar la compra con éxito
		};
		informarEstado();
	}, [id, pedidoSuccess]);

	const handleGoHome = () => {
		navigate("/tienda"); // Redirige al inicio
	};

	return (
		<div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-white p-6 animate-fade-in">
			<div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 text-center animate-slide-in">
				<div className="flex items-center justify-center mb-6 animate-bounce">
					<div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-10 w-10 text-green-600"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							strokeWidth={2}
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M9 12l2 2 4-4m-7 8a9 9 0 100-18 9 9 0 000 18z"
							/>
						</svg>
					</div>
				</div>
				<h1 className="text-3xl font-bold text-gray-800 mb-4">
					¡Gracias por tu compra!
				</h1>
				<p className="text-gray-600 mb-6">
					Tu pedido fue procesado con éxito y está en camino. Hemos enviado un
					correo con los detalles de tu compra.
				</p>
				<p className="text-gray-500 mb-8">
					Si tenés dudas, escribinos a{" "}
					<a
						href="mailto:soporte@rowercafeclub.com.ar"
						className="text-blue-600 hover:underline"
					>
						soporte@rowercafeclub.com.ar
					</a>{" "}
					o revisá tu cuenta para más información.
				</p>
				<button
					onClick={handleGoHome}
					className="w-full bg-green-600 text-white py-3 rounded-md font-semibold hover:bg-green-700 transition"
				>
					Volver al inicio
				</button>
			</div>
		</div>
	);
}
