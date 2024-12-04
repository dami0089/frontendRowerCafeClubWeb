import { useNavigate } from "react-router-dom";
import Header from "../Shared/Header";

import LetreroRedondoCafecito from "../ui/letreroRedondoCafecito";

function Menu2() {
	const navigate = useNavigate();

	const handleCafeteria = () => {
		navigate("/menu");
	};

	return (
		<div
			className="relative min-h-screen flex flex-col"
			style={{
				background:
					"linear-gradient(to right, #F7F3E4 45%, #F7F3E4 35%, #D1E7E4 0%)",
				backgroundSize: "100% 100%",
				backgroundRepeat: "no-repeat",
			}}
		>
			{/* Navbar */}
			<Header />
			{/* Contenido principal */}
			<div className="flex flex-col lg:flex-row w-full mt-16 max-w-screen-xl mx-auto items-center justify-between px-8 lg:px-16 py-10 lg:py-20 relative">
				{/* Sección Derecha */}
				<div className="lg:w-3/3 relative mt-10 lg:mt-0">
					<div className="relative overflow-hidden rounded-br-[80px] rounded-tl-[80px] shadow-lg">
						<img
							src="/imgs/Captura de pantalla 2024-11-25 a la(s) 5.20.11 p. m..png"
							alt="Cafetería"
							className="object-cover w-full h-[400px] lg:h-[500px]"
						/>
					</div>

					<div className="text-xs text-gray-600 text-start mt-4">
						Cafetería de especialidad inspirada por ciclistas
					</div>
				</div>

				{/* Sección Izquierda */}
				<div className="lg:w-1/2 space-y-6 relative z-10 ml-16">
					<div className="flex justify-between">
						<h3 className="text-4xl font-bold text-black leading-tight mt-8">
							Café de <span className="block">especialidad.</span>
						</h3>
						<div className="h-28 w-28">
							<LetreroRedondoCafecito />
						</div>
					</div>

					<p className="text-lg text-gray-800 leading-relaxed">
						En ROWER CAFE CLUB, entendemos que al igual que el ciclismo, la
						preparacion del cafe es{" "}
						<span className="font-bold">
							un arte que requiere precision, dedicacion y respeto por el
							proceso
						</span>
						. Aqui ademas de un buen cafe, vas a vivir una experiencia unica en
						un{" "}
						<span className="font-bold">
							espacio donde la pacion por el ciclismo y el cafe se encuentran.
						</span>
					</p>
					<hr className="border-gray-400 w-16" />
					<p className="text-sm text-gray-600 leading-relaxed">
						El ambiente de nuestra cafetería refleja el dinamismo del ciclicsmo,
						con decoracion temática, librería y productos de exhibicion; siendo
						<span className="font-bold">
							el lugar perfecto para relajarse despues de un entrenamiento,
							paseo en bicicleta o para encontrarse con amigos.
						</span>
					</p>

					{/* Botón */}
					<button
						onClick={handleCafeteria}
						className="relative z-20 px-6 py-3 text-end bg-[#C6D8D6] text-black font-bold rounded-lg hover:bg-[#c3aa82] transition-all"
					>
						Menu
					</button>
				</div>
			</div>
		</div>
	);
}

export default Menu2;
