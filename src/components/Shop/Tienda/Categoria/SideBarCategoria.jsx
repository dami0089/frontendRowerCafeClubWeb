import { useParams, useNavigate, useLocation } from "react-router-dom";
import useProductos from "../../../../hooks/useProductos";

const SidebarCategorias = () => {
	const { nombre } = useParams();
	const navigate = useNavigate();
	const { categorias } = useProductos();
	const location = useLocation(); // Para leer el query param actual

	// Filtrar la categoría actual
	const categoriaActual = categorias.find((cat) => cat.nombre === nombre);

	// Obtener las subcategorías de la categoría actual
	const subcategorias = categoriaActual?.subCategorias || [];

	// Obtener subcategoría seleccionada del query param
	const queryParams = new URLSearchParams(location.search);
	const selectedSubCategoria = queryParams.get("subCategoria");

	// Función para navegar a la subcategoría
	const handleNavigateSubCategoria = (subCategoria) => {
		navigate(`/categoria/${nombre}?subCategoria=${subCategoria}`);
	};

	return (
		<aside className="hidden lg:block w-64 bg-white shadow-lg p-6 rounded-lg">
			<h3 className="text-2xl font-semibold mb-4">Subcategorías</h3>
			<ul className="space-y-4 w-full">
				{subcategorias.length > 0 ? (
					subcategorias.map((subcat) => (
						<li key={subcat._id} className="cursor-pointer">
							<button
								onClick={() => handleNavigateSubCategoria(subcat._id)} // Llama a la misma función de navegación
								className={`text-gray-800 font-medium transition ${
									selectedSubCategoria === subcat._id
										? "bg-[#90C9CF] text-white rounded-lg p-2"
										: "hover:text-[#90C9CF]"
								}`}
							>
								{subcat.nombre}
							</button>
						</li>
					))
				) : (
					<li className="text-gray-400">No hay subcategorías disponibles</li>
				)}
			</ul>
		</aside>
	);
};

export default SidebarCategorias;
