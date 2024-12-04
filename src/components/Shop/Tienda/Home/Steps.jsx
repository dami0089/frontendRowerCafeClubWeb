export default function CyclingSteps() {
	return (
		<div className="flex flex-col items-center justify-center w-full py-16 bg-white">
			{/* Pasos */}
			<div className="flex items-center justify-between w-full max-w-4xl px-8 space-x-4">
				{/* Paso 1 */}
				<div className="flex flex-col items-center">
					<div className="flex items-center justify-center w-16 h-16 border rounded-full border-gray-500">
						{/* SVG Icono Bicicleta */}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="1.75em"
							height="1em"
							viewBox="0 0 56 32"
						>
							<path
								fill="currentColor"
								d="M45.5 11c-1.924 0-3.723.529-5.276 1.436L33.423 2h9.599c-.013.498-.129 1.331-.699 1.986C41.736 4.659 40.787 5 39.5 5a.5.5 0 0 0 0 1c1.589 0 2.792-.456 3.576-1.356c1.163-1.336.93-3.136.919-3.212A.5.5 0 0 0 43.5 1h-11a.498.498 0 0 0-.418.774l2.831 4.344H19.048L15.965 1H21.5a.5.5 0 0 0 0-1h-9a.5.5 0 0 0 0 1h2.314c.01.023.012.048.025.07l3.412 5.662l-3.054 5.39A10.4 10.4 0 0 0 10.5 11C4.71 11 0 15.71 0 21.5S4.71 32 10.5 32c5.588 0 10.157-4.391 10.42-10H32c.029.579-.096 1.368-.644 1.989C30.764 24.66 29.803 25 28.5 25a.5.5 0 0 0 0 1c1.608 0 2.824-.457 3.614-1.358c1.142-1.304.927-3.036.918-3.109a.5.5 0 0 0-.496-.435h-3.928l7.047-13.84l3.73 5.724C36.735 14.889 35 17.992 35 21.5C35 27.29 39.71 32 45.5 32S56 27.29 56 21.5S51.29 11 45.5 11M34.605 7l-6.848 13.568L19.651 7zm-15.762.715l8.065 13.383H20.98a10.49 10.49 0 0 0-4.912-8.484zm1.137 13.383h-8.719l4.314-7.615a9.5 9.5 0 0 1 4.405 7.615M10.5 31C5.262 31 1 26.738 1 21.5S5.262 12 10.5 12c1.51 0 2.934.364 4.204.993l-4.736 8.358a.5.5 0 0 0 .003.498c.089.153.254.248.432.15h9.567C19.659 27.057 15.537 31 10.5 31m35 0c-5.238 0-9.5-4.262-9.5-9.5c0-3.157 1.554-5.952 3.932-7.68l5.247 8.051a.5.5 0 0 0 .692.146a.5.5 0 0 0 .146-.692l-5.247-8.051A9.4 9.4 0 0 1 45.5 12c5.238 0 9.5 4.262 9.5 9.5S50.738 31 45.5 31"
							/>
						</svg>
					</div>
					<h2 className="mt-4 text-center text-gray-700">
						1. Elige tu producto
					</h2>
				</div>

				{/* Línea entre los pasos */}
				<div className="flex-1 h-px bg-gray-300 mx-4"></div>

				{/* Paso 2 */}
				<div className="flex flex-col items-center">
					<div className="flex items-center justify-center w-16 h-16 border rounded-full border-gray-500">
						{/* SVG Icono Bicicleta */}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="1em"
							height="1em"
							viewBox="0 0 24 24"
							className="h-6 w-6"
						>
							<path
								fill="currentColor"
								d="M11.5 8.5v-3h-3v-1h3v-3h1v3h3v1h-3v3zM7.308 21.116q-.633 0-1.067-.434t-.433-1.066t.433-1.067q.434-.433 1.067-.433t1.066.433t.434 1.067t-.434 1.066t-1.066.434m9.384 0q-.632 0-1.066-.434t-.434-1.066t.434-1.067q.434-.433 1.066-.433t1.067.433q.433.434.433 1.067q0 .632-.433 1.066q-.434.434-1.067.434M2 3.5v-1h2.448l4.096 8.616h6.635q.173 0 .308-.087q.134-.087.23-.24L19.213 4.5h1.14l-3.784 6.835q-.217.365-.565.573t-.762.208H8.1l-1.215 2.23q-.154.231-.01.5t.433.27h10.884v1H7.308q-.875 0-1.309-.735t-.018-1.485l1.504-2.68L3.808 3.5z"
							/>
						</svg>
					</div>
					<h2 className="mt-4 text-center text-gray-700">
						2. Agrega al carrito
					</h2>
				</div>

				{/* Línea entre los pasos */}
				<div className="flex-1 h-px bg-gray-300 mx-4"></div>

				{/* Paso 3 */}
				<div className="flex flex-col items-center">
					<div className="flex items-center justify-center w-16 h-16 border rounded-full border-gray-500">
						{/* SVG Icono Bicicleta */}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="1em"
							height="1em"
							viewBox="0 0 256 256"
							className="h-6 w-6"
						>
							<path
								fill="currentColor"
								d="M224 52H32a12 12 0 0 0-12 12v128a12 12 0 0 0 12 12h192a12 12 0 0 0 12-12V64a12 12 0 0 0-12-12M32 60h192a4 4 0 0 1 4 4v28H28V64a4 4 0 0 1 4-4m192 136H32a4 4 0 0 1-4-4v-92h200v92a4 4 0 0 1-4 4m-20-28a4 4 0 0 1-4 4h-32a4 4 0 0 1 0-8h32a4 4 0 0 1 4 4m-64 0a4 4 0 0 1-4 4h-16a4 4 0 0 1 0-8h16a4 4 0 0 1 4 4"
							/>
						</svg>
					</div>
					<h2 className="mt-4 text-center text-gray-700">
						3. Finaliza la compra
					</h2>
				</div>
			</div>
		</div>
	);
}