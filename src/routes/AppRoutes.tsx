import { Route, Routes } from "react-router-dom";
import Converter from "../pages/Converter";
import Graphs from "../pages/Graphs";
import ScientificCalculator from "../pages/ScientificCalculator";
import Sequences from "../pages/Sequences";
import Settings from "../pages/Settings";
import StandardCalculator from "../pages/StandardCalculator";

export default function AppRoutes() {
	return (
		<Routes>
			<Route path='/' element={<StandardCalculator />} />
			<Route path='/ScientificCalculator' element={<ScientificCalculator />} />
			<Route path='/Converter' element={<Converter />} />
			<Route path='/Graphs' element={<Graphs />} />
			<Route path='/Sequences' element={<Sequences />} />
			<Route path='/Settings' element={<Settings />} />
		</Routes>
	);
}
