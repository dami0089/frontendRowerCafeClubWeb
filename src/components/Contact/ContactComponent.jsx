import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import NavegacionDesktop from "../Shared/NavegacionDesktop";
import Swal from "sweetalert2";

function ContactComponent() {
	const [nombre, setNombre] = useState("");
	const [email, setEmail] = useState("");
	const [mensaje, setMensaje] = useState("");
	const { nuevaConsultaWeb } = useAuth();
	const [loading, setLoading] = useState(false);

	const handleEnviarConsulta = async (e) => {
		e.preventDefault();
		console.log("Formulario ejecutado en:", window.location.pathname);
		if (nombre.trim() === "" || email.trim() === "" || mensaje.trim() === "") {
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Todos los campos son obligatorios",
			});
			return;
		}
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Por favor, ingrese un email válido",
			});
			return;
		}
		if (mensaje.trim().length < 10) {
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "El mensaje debe tener al menos 10 caracteres",
			});
			return;
		}
		try {
			setLoading(true);
			await nuevaConsultaWeb(nombre, email, mensaje);
			setLoading(false);
			setEmail("");
			setMensaje("");
			setNombre("");
		} catch (error) {
			setLoading(false);
			console.log(error);
		}
	};

	return (
		<div className="relative h-screen bg-[#F7F3E4] text-white flex items-center justify-center">
			{/* Contenedor Principal */}
			<div className="relative lg:w-full bg-black shadow-lg  overflow-hidden">
				{/* Navbar */}
				<header className="absolute top-0 left-0 right-0 flex items-center justify-between p-6 z-10">
					<div className="flex items-center ">
						{/* <div className="w-[250px] h-[80px] bg-[#F7F3E4] flex items-center justify-center rounded-xl ">
							<img
								src="/imgs/logo-cafeteria.png"
								alt="Logo"
								className="w-[150px] h-[50px]"
							/>
						</div> */}
					</div>
					<NavegacionDesktop />
				</header>

				{/* Contenido Principal */}
				<div
					className="relative flex flex-col lg:flex-row items-center justify-center lg:justify-start p-24 bg-cover bg-center  h-screen w-full mx-auto"
					style={{ backgroundImage: "url('/imgs/02 2.png')" }}
				>
					{/* Overlay */}
					<div className="absolute inset-0 bg-black bg-opacity-60"></div>

					{/* Sección de Datos de Contacto */}
					<div className="relative z-10 lg:w-1/2 text-left space-y-6 p-4">
						<h1 className="text-4xl lg:text-5xl font-bold text-[#D3BA92] mb-4">
							Contacto
						</h1>
						<p className="text-lg text-gray-300">
							<span className="text-[#D3BA92]">ROWER Café Club</span>
							<br />
							Calle 493 1827, Manuel B. Gonnet, La Plata
							<br />
							Buenos Aires, Argentina
						</p>
						<p className="text-lg text-gray-300">Tel: +54 2216796758</p>
						<p className="text-lg text-gray-300">Tel: +542216796758</p>
						<p className="text-lg text-gray-300">
							Email: info@rowercafeclub.online
						</p>
					</div>

					{/* Sección del Formulario */}
					<div className="relative z-10 lg:w-1/2 bg-[#F8F2E1] bg-opacity-90 p-8 rounded-bl-[80px] rounded-tr-[80px]  shadow-lg">
						<h2 className="text-3xl font-bold text-gray-800 mb-4">
							Envíanos un mensaje
						</h2>
						<form className="space-y-4">
							<div>
								<label className="block text-gray-700 font-semibold">
									Nombre
								</label>
								<input
									type="text"
									value={nombre}
									onChange={(e) => setNombre(e.target.value)}
									className="w-full text-black p-3 focus:outline-none border focus:ring-2 focus:ring-[#90C9CF] bg-[#F8F2E1] border-black rounded-none bg-opacity-90"
								/>
							</div>
							<div>
								<label className="block text-gray-700 font-semibold">
									Email
								</label>
								<input
									type="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									className="w-full p-3 text-black border focus:outline-none focus:ring-2 focus:ring-[#90C9CF] bg-[#F8F2E1] border-black rounded-none bg-opacity-90"
								/>
							</div>
							<div>
								<label className="block text-gray-700 font-semibold">
									Mensaje
								</label>
								<textarea
									rows="4"
									value={mensaje}
									onChange={(e) => setMensaje(e.target.value)}
									className="w-full bg-[#F8F2E1] text-black resize-none border-black rounded-none bg-opacity-90 p-3  border focus:outline-none focus:ring-2 focus:ring-[#90C9CF]"
								></textarea>
							</div>
							<button
								type="submit"
								onClick={(e) => handleEnviarConsulta(e)}
								className="w-full py-3 bg-[#060C08] font-bold text-white hover:bg-[#181918] rounded-lg flex items-center justify-center gap-2"
							>
								Enviar Mensaje
								{loading && (
									<div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-5 w-5"></div>
								)}
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ContactComponent;
