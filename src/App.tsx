import { ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { useMemo, useState } from "react";
import SideMenu from "./components/SideMenu";
import AppRoutes from "./routes/AppRoutes";
import { ThemeMode, getTheme } from "./theme/Theme";

export default function App() {
	const [mode, setMode] = useState<ThemeMode>(ThemeMode.Light);

	const theme = useMemo(() => getTheme(mode), [mode]);

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<SideMenu setMode={setMode} />
			<AppRoutes />
		</ThemeProvider>
	);
}
