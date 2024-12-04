/** @type {import('tailwindcss').Config} */

// eslint-disable-next-line no-undef
module.exports = {
	content: [
		"./index.html",
		"./src/**/*.{js,jsx}", // Asegúrate de que Tailwind cubre todos los archivos de componentes en `src`
	],
	theme: {
		extend: {
			fontFamily: {
				sans: ["Inter", "sans-serif"],
			},
		},
	},
	plugins: [],
};
