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
		<>
			<StoreHeader />
			<Banner />
			<CyclingSteps />
			<FeaturedProducts />
			<Footer />

			{cartDrawer ? <CartDrawer /> : null}
		</>
	);
}
