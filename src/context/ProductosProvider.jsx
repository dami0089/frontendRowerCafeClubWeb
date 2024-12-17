/* eslint-disable react/prop-types */
import { createContext, useState } from "react";
import clienteAxios from "../configs/clinteAxios";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";

const ProductosContext = createContext();

const ProductosProvider = ({ children }) => {
	const [productos, setProductos] = useState([]);
	const { auth } = useAuth();
	const [cart, setCart] = useState([]);
	const [cartDrawer, setCartDrawer] = useState(false);
	const [productosFiltrados, setProductosFiltrados] = useState([]);
	const [busqueda, setBusqueda] = useState("");
	const [nombreBusqueda, setNombreBusqueda] = useState("");
	const [correoCompra, setCorreoCompra] = useState("");
	const [nombreComprador, setNombreComprador] = useState("");
	const [apellidoComprador, setApellidoComprador] = useState("");
	const [dniComprador, setDniComprador] = useState("");
	const [telefonoComprador, setTelefonoComprador] = useState("");
	const [cuitComprador, setCuitComprador] = useState("");
	const [newsLetterPromo, setNewsLetterPromo] = useState(false);
	const [crearCuenta, setCrearCuenta] = useState(false);
	const [direccion, setDireccion] = useState("");
	const [localidad, setLocalidad] = useState("");
	const [provincia, setProvincia] = useState("");
	const [codigoPostal, setCodigoPostal] = useState("");
	const [password, setPassword] = useState("");
	const [reingresarPassword, setReingresarPassword] = useState("");
	const [idPedido, setIdPedido] = useState("");

	// const buscarProductos = (query) => {
	// 	if (!query) {
	// 		// Si la búsqueda está vacía, mostrar todos los productos
	// 		setProductosFiltrados(productos);
	// 	} else {
	// 		// Convertir la consulta a minúsculas para búsqueda insensible a mayúsculas
	// 		const queryLower = query.toLowerCase();

	// 		// Filtrar productos por nombre, descripción corta o descripción larga
	// 		const resultados = productos.filter((producto) => {
	// 			const { nombre, descripcion, descripcionLarga } = producto;

	// 			// Verificar si la consulta coincide con alguna de las propiedades
	// 			return (
	// 				nombre?.toLowerCase().includes(queryLower) ||
	// 				descripcion?.toLowerCase().includes(queryLower) ||
	// 				descripcionLarga?.toLowerCase().includes(queryLower)
	// 			);
	// 		});

	// 		setProductosFiltrados(resultados);
	// 	}
	// };

	const buscarProductos = async (busqueda) => {
		try {
			const { data } = await clienteAxios.post(`/productos/buscar-productos/`, {
				busqueda,
			});
			setNombreBusqueda(busqueda);
			setProductosFiltrados(data);
		} catch (error) {
			console.log(error);
		}
	};

	const handleCartDrawer = () => {
		setCartDrawer(!cartDrawer);
	};

	const obtenerProductosCategoria = async (categoria) => {
		try {
			const { data } = await clienteAxios(
				`/productos/obtener-productos-tienda-por-categoria/${categoria}`
			);
			console.log(data);

			setProductos(data);
		} catch (error) {
			console.log(error);
		}
	};

	const [categorias, setCategorias] = useState([]);

	const obtenerCategorias = async () => {
		try {
			const { data } = await clienteAxios(
				`/categorias/obtener-categorias-tienda`
			);
			console.log(data);

			setCategorias(data);
		} catch (error) {
			console.log(error);
		}
	};

	const addToCart = async (product) => {
		setCart((prevCart) => {
			// Verificar si ya existe el producto con la misma variante en el carrito
			const existingProductIndex = prevCart.findIndex(
				(item) =>
					item._id === product._id &&
					(item.variante?._id === product.variante?._id || !product.variante)
			);

			let updatedCart;

			if (existingProductIndex !== -1) {
				// Producto con misma variante ya existe, incrementar la cantidad
				updatedCart = [...prevCart];
				updatedCart[existingProductIndex].cantidad += product.cantidad || 1;
			} else {
				// Producto no existe o tiene una variante diferente, agregarlo al carrito
				updatedCart = [...prevCart, { ...product }];
			}

			// Guardar el carrito actualizado en localStorage
			localStorage.setItem("cart", JSON.stringify(updatedCart));
			return updatedCart;
		});
	};

	const [productosDestacados, setProductosDestacados] = useState([]);

	const obtenerProductosDestacados = async () => {
		try {
			const { data } = await clienteAxios(
				`/productos/obtener-productos-destacados/`
			);
			console.log(data);

			setProductosDestacados(data);
		} catch (error) {
			console.log(error);
		}
	};

	const [producto, setProducto] = useState([]);

	const obtenerProducto = async (id) => {
		try {
			const { data } = await clienteAxios(`/productos/obtener-producto/${id}`);
			console.log(data);

			setProducto(data);
		} catch (error) {
			console.log(error);
		}
	};

	const nuevoPedido = async (
		productos,
		total,
		cupon,
		nombreCliente,
		apellidoCliente,
		telefonoCliente,
		dniCliente,
		emailCliente,
		direccionCliente,
		localidadCliente,
		provinciaCliente,
		codigoPostalCliente,
		cuitCliente,
		password
	) => {
		try {
			const { data } = await clienteAxios.post(`/pedidos/nuevo-pedido`, {
				productos,
				total,
				cupon,
				nombreCliente,
				apellidoCliente,
				telefonoCliente,
				dniCliente,
				emailCliente,
				direccionCliente,
				localidadCliente,
				provinciaCliente,
				codigoPostalCliente,
				cuitCliente,
				password,
			});

			console.log(data.pedidoAlmacenado._id);

			return data.pedidoAlmacenado._id;
		} catch (error) {
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: `${
					error.response?.data?.msg || "Hubo un error al crear el pedido"
				}`,
			});
			return;
		}
	};

	const nuevoPago = async (items, id) => {
		try {
			const { data } = await clienteAxios.post(`/pagos/crear-pago`, {
				items,
				id,
			});
			return data;
		} catch (error) {
			console.log(error);

			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: `${
					error.response?.data?.msg || "Hubo un error al crear el pedido"
				}`,
			});
			return;
		}
	};

	const pedidoFailure = async (id) => {
		try {
			const { data } = await clienteAxios.post(`/pedidos/pedido-failure`, {
				id,
			});

			return data;
		} catch (error) {
			console.log(error);

			return;
		}
	};

	const pedidoSuccess = async (id) => {
		try {
			const { data } = await clienteAxios.post(`/pedidos/pedido-success`, {
				id,
			});

			return data;
		} catch (error) {
			console.log(error);

			return;
		}
	};

	const pedidoPending = async (id) => {
		try {
			const { data } = await clienteAxios.post(`/pedidos/pedido-pending`, {
				id,
			});

			return data;
		} catch (error) {
			console.log(error);

			return;
		}
	};

	const [productosCafeteria, setProductosCafeteria] = useState([]);

	const obtenerProductos = async (tipo) => {
		try {
			const { data } = await clienteAxios(
				`/productos/obtener-productos/${tipo}`
			);
			console.log(data);
			setProductosCafeteria(data);
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<ProductosContext.Provider
			value={{
				categorias,
				obtenerCategorias,
				productos,
				obtenerProductosCategoria,
				addToCart,
				cartDrawer,
				handleCartDrawer,
				cart,
				setCart,
				productosDestacados,
				obtenerProductosDestacados,
				producto,
				setProducto,
				obtenerProducto,
				productosFiltrados,
				buscarProductos,
				busqueda,
				setBusqueda,
				nombreBusqueda,
				correoCompra,
				setCorreoCompra,
				nombreComprador,
				setNombreComprador,
				apellidoComprador,
				setApellidoComprador,
				dniComprador,
				setDniComprador,
				telefonoComprador,
				setTelefonoComprador,
				cuitComprador,
				setCuitComprador,
				newsLetterPromo,
				setNewsLetterPromo,
				crearCuenta,
				setCrearCuenta,
				direccion,
				setDireccion,
				localidad,
				setLocalidad,
				provincia,
				setProvincia,
				codigoPostal,
				setCodigoPostal,
				password,
				setPassword,
				reingresarPassword,
				setReingresarPassword,
				nuevoPedido,
				nuevoPago,
				idPedido,
				setIdPedido,
				pedidoFailure,
				pedidoSuccess,
				pedidoPending,
				productosCafeteria,
				obtenerProductos,
			}}
		>
			{children}
		</ProductosContext.Provider>
	);
};

export { ProductosProvider };

export default ProductosContext;
