import { useState } from "react";
// import { auth, googleProvider, appleProvider } from "./firebaseConfig";
// import {
// 	signInWithPopup,
// 	signInWithEmailAndPassword,
// 	createUserWithEmailAndPassword,
// } from "firebase/auth";

export default function LoginComponent() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLogin, setIsLogin] = useState(true);

	const toggleAuthMode = () => setIsLogin(!isLogin);

	// Función para login con Google
	const loginWithGoogle = async () => {
		// try {
		// 	await signInWithPopup(auth, googleProvider);
		// 	alert("Inicio de sesión con Google exitoso");
		// } catch (error) {
		// 	console.error("Error al iniciar sesión con Google", error);
		// }
	};

	// Función para login o registro propio (email y contraseña)
	const handleAuth = async () => {
		try {
			// if (isLogin) {
			// 	// Iniciar sesión
			// 	await signInWithEmailAndPassword(auth, email, password);
			// 	alert("Inicio de sesión exitoso");
			// } else {
			// 	// Registrarse
			// 	await createUserWithEmailAndPassword(auth, email, password);
			// 	alert("Registro exitoso");
			// }
		} catch (error) {
			console.error("Error en la autenticación", error);
		}
	};

	return (
		<div className="flex h-screen bg-[#F7F3E4]">
			{/* Left Image Section */}
			<div className="w-1/2 h-full">
				<img
					src="/public/imgs/loginBanner.webp"
					alt="Background"
					className="w-full h-full object-cover"
				/>
			</div>

			{/* Right Login Form Section */}
			<div className="w-1/2 flex items-center justify-center">
				<div className="max-w-md mx-auto p-6 shadow-xl rounded-2xl bg-white">
					<h2 className="text-2xl font-bold text-center mb-6">
						{isLogin ? "Iniciar sesión" : "Registrarse"}
					</h2>

					{/* Email Input */}
					<input
						type="email"
						placeholder="Correo electrónico"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className="w-full p-2 mb-4 border border-gray-300 rounded"
					/>

					{/* Password Input */}
					<input
						type="password"
						placeholder="Contraseña"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className="w-full p-2 mb-6 border border-gray-300 rounded"
					/>

					{/* Login/Register Button */}
					<button
						onClick={handleAuth}
						className="w-full p-2 bg-[#90C9CF] text-white font-semibold rounded  mb-4"
					>
						{isLogin ? "Iniciar sesión" : "Registrarse"}
					</button>

					{/* Toggle between Login and Register */}
					<p className="text-center text-sm mb-4">
						{isLogin ? "¿No tienes una cuenta?" : "¿Ya tienes una cuenta?"}{" "}
						<button
							onClick={toggleAuthMode}
							className="text-blue-500 hover:underline"
						>
							{isLogin ? "Regístrate" : "Inicia sesión"}
						</button>
					</p>

					<div className="flex flex-col space-y-3">
						{/* Google Login Button */}
						<button
							onClick={loginWithGoogle}
							className="w-full p-2 border border-gray-300 rounded flex items-center justify-center space-x-2 hover:bg-gray-100"
						>
							<img
								src="/public/imgs/icons/google.png"
								alt="Google"
								className="w-5 h-5"
							/>
							<span>Iniciar sesión con Google</span>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
