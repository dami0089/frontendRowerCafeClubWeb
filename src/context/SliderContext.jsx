/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

const SliderContext = createContext();

const SliderProvider = ({ children }) => {
	const [activeSection, setActiveSection] = useState(0);

	const handleSlideChange = (newIndex) => {
		setActiveSection(newIndex);
	};

	return (
		<SliderContext.Provider value={{ activeSection, handleSlideChange }}>
			{children}
		</SliderContext.Provider>
	);
};

export { SliderProvider };

export default SliderContext;
