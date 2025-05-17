import { createTheme } from "@mui/material";

export enum ThemeMode {
	Light = "light",
	Dark = "dark",
}

export const getTheme = (mode: ThemeMode) =>
	createTheme({
		palette: {
			mode,
			...(mode === "light"
				? {
						primary: {
							main: "#1976d2",
						},
						secondary: {
							main: "#dc004e",
						},
						background: {
							default: "#f5f5f5",
							paper: "#e6e6e6",
						},
						text: {
							primary: "#000000",
							secondary: "#555555",
						},
						success: {
							main: "#53963f",
						},
					}
				: {
						primary: {
							main: "#1976d2",
						},
						secondary: {
							main: "#dc004e",
						},
						background: {
							default: "#121212",
							paper: "#262626",
						},
						text: {
							primary: "#ffffff",
							secondary: "#b3b3b3",
						},
						success: {
							main: "#53963f",
						},
					}),
		},
		components: {
			MuiSelect: {
				styleOverrides: {
					root: ({ theme }) => ({
						backgroundColor: theme.palette.background.paper,
					}),
				},
			},
			MuiTextField: {
				styleOverrides: {
					root: ({ theme }) => ({
						backgroundColor: theme.palette.background.paper,
					}),
				},
			},
		},
	});
