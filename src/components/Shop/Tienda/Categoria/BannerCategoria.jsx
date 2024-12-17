export default function BannerCategoria() {
	return (
		// Opción 3: Posición personalizada (ajustable)
		<div
			className="w-full h-[35vh] bg-cover"
			style={{
				backgroundImage: "url('/public/imgs/quienesSomos.webp')",
				backgroundPosition: "center top 0%", // Ajusta "top 30%" según lo necesites
			}}
		></div>
	);
}
