import { useParams } from "react-router-dom";
import StoreHeader from "../components/Shop/Tienda/Home/HeaderStore";
import { useEffect } from "react";
import BannerCategoria from "../components/Shop/Tienda/Categoria/BannerCategoria";
import CategorySection from "../components/Shop/Tienda/Categoria/CategorySection";
import useProductos from "../hooks/useProductos";

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
			<CategorySection />
		</>
	);
}
