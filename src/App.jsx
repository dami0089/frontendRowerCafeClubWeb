import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Tienda from "./pages/Tienda";
import PaginaCategoria from "./pages/PaginaCategoria";
import ProductPage from "./components/Shop/Tienda/Product/ProductPage";
import Login from "./pages/Login";
import CartPage from "./components/Shop/Tienda/Carrito/CarritoPage";
import ShareSection from "./components/Shop/Tienda/Home/ShareSection";
import SuccessPage from "./components/Shop/Tienda/Carrito/SuccessPage";
import FailurePage from "./components/Shop/Tienda/Carrito/FailurePage";
import PendingPage from "./components/Shop/Tienda/Carrito/PendingPage";
import MenuCafeteria from "./components/CartaMenu/MenuCafeteria";

function App() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/login" element={<Login />} />
			<Route path="/menu" element={<MenuCafeteria />} />
			<Route path="/tienda" element={<Tienda />} />
			<Route path="/success/:id" element={<SuccessPage />} />
			<Route path="/failure/:id" element={<FailurePage />} />
			<Route path="/pending/:id" element={<PendingPage />} />
			<Route path="/categoria/:nombre" element={<PaginaCategoria />} />
			<Route path="/producto/:nombre/:id" element={<ProductPage />} />
			<Route path="/carrito" element={<CartPage />} />
			<Route path="/buscar" element={<ShareSection />} />
		</Routes>
	);
}

export default App;
