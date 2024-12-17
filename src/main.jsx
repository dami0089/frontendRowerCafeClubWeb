import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { SliderProvider } from "./context/SliderContext.jsx";
import { ProductosProvider } from "./context/ProductosProvider.jsx";
import { AuthProvider } from "./context/AuthProvider.jsx";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<BrowserRouter>
			<SliderProvider>
				<AuthProvider>
					<ProductosProvider>
						<App />
					</ProductosProvider>
				</AuthProvider>
			</SliderProvider>
		</BrowserRouter>
	</StrictMode>
);
