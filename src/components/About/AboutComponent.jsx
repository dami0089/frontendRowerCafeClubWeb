import Header from "../Shared/Header";
import LetreroRedondo from "../ui/letreroRedondo";

function AboutComponent() {
	return (
		<div className="relative bg-[#F7F3E4] text-black min-h-screen flex flex-col  ">
			{/* Navbar */}
			<Header />
			{/* Contenido principal */}
			<div className="flex flex-col lg:flex-row w-full mt-16 max-w-screen-xl mx-auto items-center justify-between px-8 lg:px-16 py-10 lg:py-20">
				{/* Sección Izquierda */}
				<div className="lg:w-1/2 space-y-6 relative">
					<div className="flex justify-between ">
						<h3 className="text-4xl font-bold text-black leading-tight mt-8">
							Vení a <span className="block">conocernos.</span>
						</h3>
						<div className="h-28 w-28 ">
							<LetreroRedondo />
						</div>
						<div></div>
					</div>

					<p className="text-lg text-gray-800 leading-relaxed">
						Rower Café Club nació con el propósito de fomentar un estilo de vida
						activo y saludable, brindando un espacio que sirva como punto de
						encuentro, que <span className="font-bold">inspire</span> y{" "}
						<span className="font-bold">conecte</span> a las personas a través
						de su pasión por el ciclismo.
					</p>
					<hr className="border-gray-400 w-16" />
					<p className="text-sm text-gray-600 leading-relaxed">
						Desde RWR CAFÉ CLUB invitamos a todos a realizar deporte, y a
						compartir experiencias y momentos especiales en una{" "}
						<span className="font-bold">comunidad unida</span> por los mismos
						principios y valores.
					</p>
					<button className="px-6 py-3 bg-[#C6D8D6] text-black font-bold rounded-lg hover:bg-[#c3aa82] transition-all">
						Como llegar
					</button>
				</div>

				{/* Sección Derecha */}
				<div className="lg:w-1/2 relative mt-10 lg:mt-0">
					<div className="relative overflow-hidden rounded-bl-[80px] rounded-tr-[80px] shadow-lg">
						<img
							src="/imgs/shop.webp"
							alt="Cafetería"
							className="object-cover w-full h-[400px] lg:h-[500px]"
						/>
					</div>

					<div className="text-xs text-gray-600 text-end mt-4">
						Cafetería de especialidad inspirada por ciclistas
					</div>
				</div>
			</div>

			{/* <footer className="mt-auto py-4 bg-[#F7F3E4] text-center text-xs text-gray-600">
				<div className="flex items-center justify-center space-x-4">
					<button className="hover:underline">🗑️</button>
					<button className="hover:underline">😊</button>
				</div>
			</footer> */}
		</div>
	);
}

export default AboutComponent;
