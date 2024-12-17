import { useState } from "react";
import Slider from "../components/Shared/Slider";
import HomeComponent from "../components/Home/HomeComponent";
import useSlider from "../hooks/useSlider";
import AboutComponent from "../components/About/AboutComponent";
import ContactComponent from "../components/Contact/ContactComponent";
import WhatsappButton from "../components/Shared/WhatsappButton";
import Cargando from "../components/Shared/Cargando";
import Menu2 from "../components/MenuSlider/Menu2";
import TiendaComponent from "../components/Shop/TiendaComponent";
import Header from "../components/Shared/Header";

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
	const [menuOpen, setMenuOpen] = useState(false); // Estado para controlar el menú móvil

	// Detecta el desplazamiento del mouse o trackpad y cambia de sección
	const handleWheel = (e) => {
		const now = Date.now();
		if (now - lastScrollTime < 800) return;

		if (e.deltaY > 0) {
			changeSection(activeSection + 1);
		} else if (e.deltaY < 0) {
			changeSection(activeSection - 1);
		}
		setLastScrollTime(now);
	};

	const changeSection = (newIndex) => {
		if (newIndex < 0) {
			newIndex = 0;
		} else if (newIndex >= sections.length) {
			newIndex = sections.length - 1;
		}
		handleSlideChange(newIndex);
	};

	// Cierra el menú al hacer clic fuera del área
	const handleClickOutside = () => {
		if (menuOpen) {
			setMenuOpen(false);
		}
	};

	return (
		<div
			className="relative h-screen w-screen bg-[#F7F3E4] text-white overflow-hidden"
			onWheel={handleWheel}
			onClick={handleClickOutside} // Detecta clics en cualquier parte
		>
			<div className="z-50 absolute top-0 left-0 right-0">
				<Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
			</div>

			{sections.map((section, index) => (
				<div
					key={section.id}
					className={`absolute inset-0 transition-opacity duration-1000 ${
						activeSection === index ? "opacity-100 z-20" : "opacity-0 z-0"
					}`}
				>
					{section.component}
				</div>
			))}

			<div className="hidden md:block z-30 absolute top-0 left-0 right-0">
				<Slider />
			</div>

			<div className="z-30 absolute top-0 left-0 right-0">
				<WhatsappButton />
			</div>

			<div className="z-40 absolute top-0 left-0 right-0">
				<Cargando />
			</div>
		</div>
	);
}
