import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useProductos from "../../../../hooks/useProductos";

export default function FailurePage() {
	const { id } = useParams();
	const navigate = useNavigate();
	const { pedidoFailure } = useProductos();

	useEffect(() => {
		const informarEstado = async () => {
			await pedidoFailure(id);
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
					<div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-10 w-10 text-red-600"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							strokeWidth={2}
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M12 9v3m0 4h.01M20 12a8 8 0 11-16 0 8 8 0 0116 0z"
							/>
						</svg>
					</div>
				</div>
				<h1 className="text-2xl font-bold text-gray-800 mb-4">
					Oops... algo salió mal
				</h1>
				<p className="text-gray-600 mb-6">
					Hubo un problema con tu transacción. Por favor, intentá nuevamente o
					contactate a info@rowercafeclub.online si el problema persiste.
				</p>
				<p className="text-sm text-gray-500 mb-8">
					ID de referencia:{" "}
					<span className="font-medium text-gray-700">{id}</span>
				</p>
				<button
					onClick={handleGoHome}
					className="w-full bg-red-600 text-white py-3 rounded-md font-semibold hover:bg-red-700 transition"
				>
					Volver al inicio
				</button>
			</div>
		</div>
	);
}
