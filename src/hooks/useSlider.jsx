import { useContext } from "react";
import SliderContext from "../context/SliderContext";

const useSlider = () => {
	return useContext(SliderContext);
};

export default useSlider;
