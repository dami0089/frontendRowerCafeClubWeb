import { useState } from "react";
import Slider from "../components/Shared/Slider";
import HomeComponent from "../components/Home/HomeComponent";
import useSlider from "../hooks/useSlider";
// import MenuComponent from "../components/MenuSlider/Menu";
import AboutComponent from "../components/About/AboutComponent";
// import ShopComponent from "../components/Shop/ShopComponent";
import ContactComponent from "../components/Contact/ContactComponent";
import WhatsappButton from "../components/Shared/WhatsappButton"; // Importa el botón de WhatsApp
import Cargando from "../components/Shared/Cargando";
import Menu2 from "../components/MenuSlider/Menu2";
import TiendaComponent from "../components/Shop/TiendaComponent";

const sections = [
	{
		id: 1,
		component: <HomeComponent />,
	},
	{
		id: 2,
		component: <AboutComponent />,
	},
	{
		id: 3,
		component: <Menu2 />,
	},
	{
		id: 4,
		component: <TiendaComponent />,
	},
	{
		id: 5,
		component: <ContactComponent />,
	},
];

export default function Home() {
	const { activeSection, handleSlideChange } = useSlider();
	const [lastScrollTime, setLastScrollTime] = useState(0);

	// Detecta el desplazamiento del mouse o trackpad y cambia de sección
	const handleWheel = (e) => {
		const now = Date.now();
		if (now - lastScrollTime < 800) return; // Evita desplazamientos muy rápidos

		if (e.deltaY > 0) {
			// Desplazar hacia abajo
			changeSection(activeSection + 1);
		} else if (e.deltaY < 0) {
			// Desplazar hacia arriba
			changeSection(activeSection - 1);
		}
		setLastScrollTime(now); // Actualiza el último tiempo de desplazamiento
	};

	// Cambia la sección asegurando que no se salga del rango
	const changeSection = (newIndex) => {
		if (newIndex < 0) {
			newIndex = 0; // Evita ir antes de la primera sección
		} else if (newIndex >= sections.length) {
			newIndex = sections.length - 1; // Evita ir más allá de la última sección
		}
		handleSlideChange(newIndex);
	};

	return (
		<div
			className="relative h-screen bg-[#F7F3E4] text-white flex items-center justify-center overflow-y-auto overflow-x-hidden"
			onWheel={handleWheel} // Detecta el evento de desplazamiento con el mouse
		>
			{sections.map((section, index) => (
				<div
					key={section.id}
					className={`absolute inset-0 transition-opacity duration-1000 ${
						activeSection === index ? "opacity-100" : "opacity-0"
					}`}
				>
					{section.component}
				</div>
			))}
			<Slider />
			<WhatsappButton />

			<Cargando />
		</div>
	);
}
