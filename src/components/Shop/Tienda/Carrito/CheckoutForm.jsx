import { useEffect, useState } from "react";
import useProductos from "../../../../hooks/useProductos";

export default function CheckoutForm() {
	const [step, setStep] = useState(1);

	const {
		correoCompra,
		setCorreoCompra,
		nombreComprador,
		setNombreComprador,
		apellidoComprador,
		setApellidoComprador,
		dniComprador,
		setDniComprador,
		telefonoComprador,
		setTelefonoComprador,
		cuitComprador,
		setCuitComprador,
		newsLetterPromo,
		setNewsLetterPromo,
		direccion,
		setDireccion,
		localidad,
		setLocalidad,
		provincia,
		setProvincia,
		codigoPostal,
		setCodigoPostal,
		password,
		setPassword,
		reingresarPassword,
		setReingresarPassword,
	} = useProductos();
	const [isFacturaAVisible, setIsFacturaAVisible] = useState(false);
	const [isCrearCuentaVisible, setIsCrearCuentaVisible] = useState(false);
	const [cartItems, setCartItems] = useState([]);
	const handleNextStep = () => setStep((prev) => prev + 1);
	const handlePreviousStep = () => setStep((prev) => prev - 1);

	useEffect(() => {
		const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
		setCartItems(storedCart);
	}, []);

	const handleDesplegarCombinados = (e, campo) => {
		e.preventDefault();

		if (campo === "factura") {
			if (isFacturaAVisible) {
				setIsFacturaAVisible(false);
			} else {
				setIsFacturaAVisible(true);
				setIsCrearCuentaVisible(false);
			}
			return;
		}
		if (campo === "cuenta") {
			if (isCrearCuentaVisible) {
				setIsCrearCuentaVisible(false);
			} else {
				setIsCrearCuentaVisible(true);
				setIsFacturaAVisible(false);
			}
			return;
		}
	};

	return (
		<div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg overflow-hidden relative">
			{/* Paso 1: Identificación */}
			{step === 1 && (
				<div className="mb-6 animate-slide-in-left">
					<h2 className="text-lg font-bold text-gray-800 flex items-center mb-2">
						<span className="bg-[#00293B] text-white w-6 h-6 flex items-center justify-center rounded-full mr-2">
							1
						</span>
						Identificación
					</h2>
					<p className="text-sm text-gray-600 mb-4">
						Solicitamos únicamente la información esencial para la finalización
						de la compra.
					</p>
					<form>
						<div className="mb-4">
							<label
								htmlFor="email"
								className="block text-sm font-medium text-gray-700"
							>
								Correo
							</label>
							<input
								type="email"
								id="email"
								value={correoCompra}
								onChange={(e) => setCorreoCompra(e.target.value)}
								className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
								placeholder="Ingresá tu correo"
							/>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
							<div>
								<label
									htmlFor="nombre"
									className="block text-sm font-medium text-gray-700"
								>
									Nombre
								</label>
								<input
									type="text"
									id="nombre"
									value={nombreComprador}
									onChange={(e) => setNombreComprador(e.target.value)}
									className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
									placeholder="Tu nombre"
								/>
							</div>
							<div>
								<label
									htmlFor="apellidos"
									className="block text-sm font-medium text-gray-700"
								>
									Apellidos
								</label>
								<input
									type="text"
									id="apellidos"
									value={apellidoComprador}
									onChange={(e) => setApellidoComprador(e.target.value)}
									className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
									placeholder="Tus apellidos"
								/>
							</div>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
							<div>
								<label
									htmlFor="dni"
									className="block text-sm font-medium text-gray-700"
								>
									DNI
								</label>
								<input
									type="text"
									id="dni"
									value={dniComprador}
									onChange={(e) => setDniComprador(e.target.value)}
									className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
									placeholder="99999999"
								/>
							</div>
							<div>
								<label
									htmlFor="telefono"
									className="block text-sm font-medium text-gray-700"
								>
									Teléfono / Celular
								</label>
								<input
									type="text"
									id="telefono"
									value={telefonoComprador}
									onChange={(e) => setTelefonoComprador(e.target.value)}
									className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
									placeholder="Código de área sin el 0"
								/>
							</div>
						</div>
						<div className="flex justify-between">
							<button
								type="button"
								onClick={(e) => handleDesplegarCombinados(e, "factura")}
								className="text-[#00293B] text-sm font-semibold"
							>
								+ QUIERO FACTURA A
							</button>
							<button
								type="button"
								onClick={(e) => handleDesplegarCombinados(e, "cuenta")}
								className="text-[#00293B] text-sm font-semibold"
							>
								+ QUIERO CREARME UNA CUENTA
							</button>
						</div>

						{isFacturaAVisible && !isCrearCuentaVisible && (
							<div className="mt-4">
								<label
									htmlFor="factura"
									className="block text-sm font-medium text-gray-700"
								>
									CUIT / Razón Social
								</label>
								<input
									type="text"
									id="factura"
									value={cuitComprador}
									onChange={(e) => setCuitComprador(e.target.value)}
									className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
									placeholder="Ingresá tu CUIT o razón social"
								/>
							</div>
						)}
						{isCrearCuentaVisible && !isFacturaAVisible && (
							<>
								<div className="mt-4 relative">
									<label
										htmlFor="password"
										className="block text-sm font-medium text-gray-700"
									>
										Ingresa una password
									</label>
									<input
										type="password"
										id="password"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
										placeholder="Ingresá tu Password"
									/>
									<button
										type="button"
										onClick={() => {
											const passwordInput = document.getElementById("password");
											passwordInput.type =
												passwordInput.type === "password" ? "text" : "password";
										}}
										className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="1em"
											height="1em"
											viewBox="0 0 24 24"
											className="h-6 w-6 mt-4"
										>
											<g
												fill="none"
												stroke="currentColor"
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="1.5"
											>
												<path d="M3 13c3.6-8 14.4-8 18 0" />
												<path d="M12 17a3 3 0 1 1 0-6a3 3 0 0 1 0 6" />
											</g>
										</svg>
									</button>
								</div>
								<div className="mt-4 relative">
									<label
										htmlFor="confirmPassword"
										className="block text-sm font-medium text-gray-700"
									>
										Reingresa la password
									</label>
									<input
										type="password"
										id="confirmPassword"
										value={reingresarPassword}
										onChange={(e) => setReingresarPassword(e.target.value)}
										className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
										placeholder="Reingresa tu password"
									/>
									<button
										type="button"
										onClick={() => {
											const confirmPasswordInput =
												document.getElementById("confirmPassword");
											confirmPasswordInput.type =
												confirmPasswordInput.type === "password"
													? "text"
													: "password";
										}}
										className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="1em"
											height="1em"
											viewBox="0 0 24 24"
											className="h-6 w-6 mt-4"
										>
											<g
												fill="none"
												stroke="currentColor"
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="1.5"
											>
												<path d="M3 13c3.6-8 14.4-8 18 0" />
												<path d="M12 17a3 3 0 1 1 0-6a3 3 0 0 1 0 6" />
											</g>
										</svg>
									</button>
								</div>
							</>
						)}
						<div className="mt-6">
							<button
								type="button"
								onClick={handleNextStep}
								className="w-full bg-[#00293B] text-white py-3 rounded-md font-semibold hover:bg-[#001f2b]"
							>
								Continuar - Datos de entrega
							</button>
						</div>
						<div className="mt-4 flex items-center">
							<input
								type="checkbox"
								id="newsletter"
								checked={newsLetterPromo}
								onChange={() => setNewsLetterPromo(!newsLetterPromo)}
								className="mr-2"
							/>
							<label
								htmlFor="newsletter"
								className="text-sm text-gray-600 select-none"
							>
								Quiero recibir el newsletter con promociones.
							</label>
						</div>
					</form>
				</div>
			)}
			{step === 2 && (
				<div className="mb-6 animate-slide-in-left">
					<div className="flex items-center mb-2">
						<button
							onClick={handlePreviousStep}
							className="text-[#00293B] hover:text-[#001f2b] mr-4"
						>
							←
						</button>
						<h2 className="text-lg font-bold text-gray-800 flex items-center">
							<span className="bg-[#00293B] text-white w-6 h-6 flex items-center justify-center rounded-full mr-2">
								2
							</span>
							Envío
						</h2>
					</div>
					<p className="text-sm text-gray-600 mb-4">
						Completá los datos para el envío.
					</p>
					<form>
						<div className="mb-4">
							<label
								htmlFor="address"
								className="block text-sm font-medium text-gray-700"
							>
								Dirección
							</label>
							<input
								type="text"
								id="address"
								value={direccion}
								onChange={(e) => setDireccion(e.target.value)}
								className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
								placeholder="Ingresá tu dirección"
							/>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-1 gap-4 mb-4">
							<div>
								<label
									htmlFor="city"
									className="block text-sm font-medium text-gray-700"
								>
									Ciudad
								</label>
								<input
									type="text"
									id="city"
									value={localidad}
									onChange={(e) => setLocalidad(e.target.value)}
									className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
									placeholder="Tu ciudad"
								/>
							</div>
							<div>
								<label
									htmlFor="Provincia"
									className="block text-sm font-medium text-gray-700"
								>
									Provincia
								</label>
								<input
									type="text"
									id="Provincia"
									value={provincia}
									onChange={(e) => setProvincia(e.target.value)}
									className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
									placeholder="Tu Provincia"
								/>
							</div>
							<div>
								<label
									htmlFor="zip"
									className="block text-sm font-medium text-gray-700"
								>
									Código Postal
								</label>
								<input
									type="text"
									id="zip"
									value={codigoPostal}
									onChange={(e) => setCodigoPostal(e.target.value)}
									className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
									placeholder="1234"
								/>
							</div>
						</div>
						<div className="mt-6">
							<button
								type="button"
								onClick={handleNextStep}
								className="w-full bg-[#00293B] text-white py-3 rounded-md font-semibold hover:bg-[#001f2b]"
							>
								Confirmar datos
							</button>
						</div>
					</form>
				</div>
			)}

			{/* Paso 3: Confirmación */}
			{step === 3 && (
				<div className="mb-6 animate-slide-in-left">
					<div className="flex items-center mb-2">
						<button
							onClick={handlePreviousStep}
							className="text-[#00293B] hover:text-[#001f2b] mr-4"
						>
							←
						</button>
						<h2 className="text-lg font-bold text-gray-800 flex items-center">
							<span className="bg-[#00293B] text-white w-6 h-6 flex items-center justify-center rounded-full mr-2">
								3
							</span>
							Confirma que todo está correcto
						</h2>
					</div>
					<p className="text-sm text-gray-600 mb-4">
						Revisá los datos ingresados antes de continuar.
					</p>
					<div className="mb-4">
						<p className="text-gray-700 mb-4">
							<strong>Correo:</strong> {correoCompra}
						</p>
						<p className="text-gray-700 mb-4">
							<strong>Nombre:</strong> {nombreComprador}
						</p>
						<p className="text-gray-700 mb-4">
							<strong>Apellidos:</strong> {apellidoComprador}
						</p>
						<p className="text-gray-700 mb-4">
							<strong>DNI:</strong> {dniComprador}
						</p>
						<p className="text-gray-700 mb-4">
							<strong>Teléfono:</strong> {telefonoComprador}
						</p>
						<p className="text-gray-700 mb-4">
							<strong>Dirección:</strong> {direccion}
						</p>
						<p className="text-gray-700 mb-4">
							<strong>Ciudad:</strong> {localidad}
						</p>
						<p className="text-gray-700 mb-4">
							<strong>Provincia:</strong> {provincia}
						</p>
						<p className="text-gray-700 mb-4">
							<strong>Código Postal:</strong> {codigoPostal}
						</p>

						{cuitComprador !== "" ? (
							<p className="text-gray-700 mb-4">
								<strong>Cuit Factura A:</strong> {cuitComprador}
							</p>
						) : null}

						{password !== "" && reingresarPassword !== "" ? (
							<p className="text-gray-400 uppercase mb-4 text-center">
								<strong>
									Crearemos una cuenta con email y la password que ingresaste
								</strong>
							</p>
						) : null}
					</div>

					<h3 className="mb-4 font-bold">Productos que compraras:</h3>
					{cartItems.map((item) => (
						<div
							key={item._id}
							className=" bg-white p-6 shadow-md rounded-lg mb-4"
						>
							<div className="flex   justify-between">
								<img
									src={item.imagen}
									alt={item.nombre}
									className="w-24 h-24 object-cover rounded-lg"
								/>
								<div className="text-end">
									<div className="flex">
										<h3 className="text-lg font-semibold mr-2">
											{item.nombre}
										</h3>
										<p className="text-xl font-bold text-[#90C9CF]">
											{" x "} {item.quantity}
										</p>
									</div>

									<p className="text-xl font-bold">${item.precio}</p>
								</div>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
