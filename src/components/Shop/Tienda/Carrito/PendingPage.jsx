import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useProductos from "../../../../hooks/useProductos";

export default function PendingPage() {
	const navigate = useNavigate();
	const { id } = useParams();
	const { pedidoPending } = useProductos();

	const clearCart = () => {
		localStorage.removeItem("cart"); // Elimina el carrito del localStorage
	};

	useEffect(() => {
		const informarEstado = async () => {
			await pedidoPending(id);
			clearCart();
		};

		informarEstado();
	}, []);

	const handleGoHome = () => {
		navigate("/tienda");
	};

	return (
		<div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
			<div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 text-center">
				<div className="flex items-center justify-center mb-6">
					<div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-10 w-10 text-yellow-600"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							strokeWidth={2}
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M12 8v4m0 4h.01M20 12a8 8 0 11-16 0 8 8 0 0116 0z"
							/>
						</svg>
					</div>
				</div>
				<h1 className="text-2xl font-bold text-gray-800 mb-4">
					Tu compra está en proceso
				</h1>
				<p className="text-gray-600 mb-6">
					Estamos verificando tu pago. Por favor, tené paciencia. Te enviaremos
					un correo electrónico cuando tengamos una actualización.
				</p>
				<p className="text-sm text-gray-500 mb-8">
					Si tenés alguna consulta, no dudes en contactarnos a{" "}
					<a
						href="mailto:soporte@rowercafeclub.com.ar"
						className="text-blue-600 hover:underline"
					>
						soporte@rowercafeclub.com.ar
					</a>
				</p>
				<button
					onClick={handleGoHome}
					className="w-full bg-[#FFD700] text-gray-800 py-3 rounded-md font-semibold hover:bg-[#E5C200] transition"
				>
					Volver al inicio
				</button>
			</div>
		</div>
	);
}
