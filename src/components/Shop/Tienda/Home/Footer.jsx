import { useNavigate } from "react-router-dom";
import useSlider from "../../../../hooks/useSlider";

export default function Footer() {
	const { handleSlideChange } = useSlider();
	const navigate = useNavigate();

	const handleNavigate = (e, section) => {
		e.preventDefault();
		if (section === 8) {
			window.location.href =
				"mailto:app@rowercafeclub.com.ar?subject=Quiero trabajar con ustedes";
			return;
		}
		handleSlideChange(section);
		navigate("/");
	};

	return (
		<footer className="bg-[#90C9CF] text-gray-300 py-12">
			<div className="container mx-auto px-6 md:px-12 lg:px-24">
				<div className="flex flex-col md:flex-row justify-between items-start">
					{/* Logo */}
					<div className="mb-8 md:mb-0 p-12">
						<img
							src="/imgs/logo-cafeteria.png"
							alt="Logo Rower"
							className="h-10 mb-4"
						/>
					</div>

					{/* Sección de enlaces */}
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full">
						{/* Columna Institucional */}
						<div>
							<h4 className="text-lg font-semibold text-[#F7F3E4]">
								INSTITUCIONAL
							</h4>
							<ul className="mt-4 space-y-2">
								<li onClick={(e) => handleNavigate(e, 1)}>
									<a className="hover:text-gray-100 hover:cursor-pointer">
										Quiénes somos
									</a>
								</li>
								<li>
									<a href="#menu" className="hover:text-gray-100">
										Ver Menú
									</a>
								</li>
								<li onClick={(e) => handleNavigate(e, 8)}>
									<a className="hover:text-gray-100 hover:cursor-pointer">
										Trabajá con Nosotros
									</a>
								</li>
								<li>
									<a href="#comprar" className="hover:text-gray-100">
										Cómo Comprar
									</a>
								</li>
								<li>
									<a href="#envios" className="hover:text-gray-100">
										Envíos
									</a>
								</li>
							</ul>
						</div>

						{/* Columna Legal */}
						<div>
							<h4 className="text-lg font-semibold text-[#F7F3E4]">LEGAL</h4>
							<ul className="mt-4 space-y-2">
								<li>
									<a href="#terminos" className="hover:text-gray-100">
										Términos y Condiciones
									</a>
								</li>
								<li>
									<a href="#privacidad" className="hover:text-gray-100">
										Privacidad de datos
									</a>
								</li>
								<li>
									<a href="#arrepentimiento" className="hover:text-gray-100">
										Arrepentimiento de compra
									</a>
								</li>
								<li>
									<a href="#preguntas" className="hover:text-gray-100">
										Preguntas Frecuentes
									</a>
								</li>
								<li>
									<a href="#cambios" className="hover:text-gray-100">
										Política de cambios y devoluciones
									</a>
								</li>
							</ul>
						</div>

						{/* Columna Cliente */}
						<div>
							<h4 className="text-lg font-semibold text-[#F7F3E4]">CLIENTE</h4>
							<ul className="mt-4 space-y-2">
								<li>
									<a href="#cuenta" className="hover:text-gray-100">
										Mi Cuenta
									</a>
								</li>
								<li>
									<a href="#favoritos" className="hover:text-gray-100">
										Mis Favoritos
									</a>
								</li>

								<li>
									<a href="#registrarse" className="hover:text-gray-100">
										Registrarse
									</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
