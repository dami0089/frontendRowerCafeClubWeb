import LetreroRedondo from "../ui/letreroRedondo";

function AboutComponent() {
	return (
		<div className="relative bg-[#F7F3E4] text-black max-h-screen flex flex-col ">
			{/* Contenido principal */}
			<div className="relative bg-[#F7F3E4] text-black min-h-screen flex items-center justify-center">
				<div className="flex flex-col lg:flex-row w-full max-w-screen-xl mx-auto items-center justify-between px-4 sm:px-8 lg:px-16 py-6 sm:py-10 lg:py-20">
					{/* Sección Izquierda */}
					<div className="w-full lg:w-1/2 lg:space-y-8 space-y-4 relative lg:mr-12">
						<div className="flex flex-row sm:items-start justify-between">
							<h3 className="text-3xl sm:text-4xl font-bold text-black leading-tight mt-4 sm:mt-8">
								Vení a <span className="block">conocernos.</span>
							</h3>
							<div className="h-20 w-20 sm:h-28 sm:w-28 mt-4 sm:mt-0">
								<LetreroRedondo />
							</div>
						</div>

						<p className="text-base sm:text-lg text-gray-800 leading-relaxed">
							Rower Café Club nació con el propósito de fomentar un estilo de
							vida activo y saludable, brindando un espacio que sirva como punto
							de encuentro, que <span className="font-bold">inspire</span> y{" "}
							<span className="font-bold">conecte</span> a las personas a través
							de su pasión por el ciclismo.
						</p>
						<hr className="border-gray-400 w-12 sm:w-16" />
						<p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
							Desde RWR CAFÉ CLUB invitamos a todos a realizar deporte, y a
							compartir experiencias y momentos especiales en una{" "}
							<span className="font-bold">comunidad unida</span> por los mismos
							principios y valores.
						</p>
						{/* <button className="px-4 sm:px-6 py-2 sm:py-3 bg-[#C6D8D6] text-black font-bold rounded-lg hover:bg-[#c3aa82] transition-all">
							Como llegar
						</button> */}
					</div>

					{/* Sección Derecha */}
					<div className="w-full lg:w-1/2 relative mt-8 lg:mt-0">
						<div className="relative overflow-hidden rounded-bl-[60px] rounded-tr-[60px] shadow-lg">
							<img
								src="/imgs/shop.webp"
								alt="Cafetería"
								className="object-cover w-full h-[250px] sm:h-[300px] lg:h-[500px]"
							/>
						</div>

						<div className="text-xs sm:text-sm text-gray-600 text-center sm:text-end mt-2 sm:mt-4">
							Cafetería de especialidad inspirada por ciclistas
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default AboutComponent;
