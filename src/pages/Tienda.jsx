import CartDrawer from "../components/Shop/Tienda/Carrito/CartDrawer";
import Banner from "../components/Shop/Tienda/Home/Banner";
import Footer from "../components/Shop/Tienda/Home/Footer";
import StoreHeader from "../components/Shop/Tienda/Home/HeaderStore";
import FeaturedProducts from "../components/Shop/Tienda/Home/ProductosDestacados";
import CyclingSteps from "../components/Shop/Tienda/Home/Steps";
import useProductos from "../hooks/useProductos";

export default function Tienda() {
	const { cartDrawer } = useProductos();

	return (
		<div className="flex flex-col min-h-screen w-full bg-gray-50">
			{/* Header */}
			<header className="sticky top-0 z-50 bg-white shadow-md">
				<StoreHeader />
			</header>

			{/* Contenido Principal */}
			<main className="flex-grow overflow-y-auto">
				<Banner />
				<CyclingSteps />
				<FeaturedProducts />
			</main>

			{/* Footer */}
			<footer className="flex-shrink-0">
				<Footer />
			</footer>

			{/* Drawer del Carrito */}
			{cartDrawer && <CartDrawer />}
		</div>
	);
}
