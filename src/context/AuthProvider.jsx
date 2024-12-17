/* eslint-disable react/prop-types */
import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import clienteAxios from "../configs/clinteAxios";
import Swal from "sweetalert2";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const [auth, setAuth] = useState({});
	const [cargando, setCargando] = useState(false);

	const [cargandoModal, setCargandoModal] = useState(false);

	const handleCargando = () => {
		setCargandoModal((prevState) => !prevState);
	};

	const navigate = useNavigate();

	// useEffect(() => {
	// 	const autenticarUsuario = async () => {
	// 		const token = localStorage.getItem("token");
	// 		if (!token) {
	// 			setCargando(false);
	// 			return;
	// 		}
	// 		const config = {
	// 			headers: {
	// 				"Content-Type": "application/json",
	// 				Authorization: `Bearer ${token}`,
	// 			},
	// 		};
	// 		try {
	// 			const { data } = await clienteAxios(
	// 				"/usuarios-backoffice/perfil",
	// 				config
	// 			);
	// 			setAuth(data);

	// 			navigate("/inicio");
	// 			if (data._id && location.pathname === "/") {
	// 				navigate("/inicio");
	// 			}
	// 		} catch (error) {
	// 			console.log(error);

	// 			// setAuth({});
	// 		}
	// 		setCargando(false);
	// 	};
	// 	autenticarUsuario();
	// }, []);

	const cerrarSesionAuth = () => {
		Swal.fire({
			title: "Are you sure you want to log out?",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Salir",
		}).then((result) => {
			console.log(result);
			if (result.isConfirmed === true) {
				setAuth({});
				localStorage.removeItem("token");
				navigate("/");
			}
		});
	};

	const nuevaConsultaWeb = async (nombre, email, mensaje) => {
		try {
			await clienteAxios.post(`/usuarios/nueva-consulta-web/`, {
				nombre,
				email,
				mensaje,
			});
			Swal.fire({
				icon: "success",
				title: "Consulta enviada",
				text: "Gracias por contactarte con nosotros",
			});
		} catch (error) {
			console.log(error);
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Hubo un error al enviar la consulta",
			});
		}
	};

	return (
		<AuthContext.Provider
			value={{
				auth,
				setAuth,
				cargando,
				cerrarSesionAuth,
				cargandoModal,
				handleCargando,
				nuevaConsultaWeb,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export { AuthProvider };

export default AuthContext;
