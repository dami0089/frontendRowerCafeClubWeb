import { useParams } from "react-router-dom";
import StoreHeader from "../components/Shop/Tienda/Home/HeaderStore";
import { useEffect } from "react";
import BannerCategoria from "../components/Shop/Tienda/Categoria/BannerCategoria";
import CategorySection from "../components/Shop/Tienda/Categoria/CategorySection";

import useProductos from "../hooks/useProductos";
import SidebarCategorias from "../components/Shop/Tienda/Categoria/SideBarCategoria";
import Footer from "../components/Shop/Tienda/Home/Footer";

export default function PaginaCategoria() {
	const categoria = useParams();
	const { setProducto } = useProductos();

	useEffect(() => {
		setProducto([]);
	}, [categoria]);

	return (
		<>
			<StoreHeader />
			<BannerCategoria />
			<div className="flex flex-col lg:flex-row">
				<div className="w-full lg:w-1/4 p-16">
					<SidebarCategorias />
				</div>
				<div className="w-full lg:w-3/4">
					<CategorySection />
				</div>
			</div>
			<Footer />
		</>
	);
}
