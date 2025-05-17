import Switch from "@mui/material/Switch";
import { styled } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import { useEffect } from "react";
import { ThemeMode } from "../theme/Theme";

const StyledSwitch = styled(Switch)(({ theme }) => ({
	width: 56,
	height: 28,
	padding: 7,
	"& .MuiSwitch-switchBase": {
		margin: 1,
		padding: 0,
		transform: "translateX(6px)",
		"&.Mui-checked": {
			transform: "translateX(22px)",
			"& + .MuiSwitch-track": {
				backgroundColor: "#90caf9 !important",
				opacity: 0.5,
			},
			"& .MuiSwitch-thumb": {
				backgroundColor: theme.palette.primary.main,
				"&:before": {
					backgroundSize: "75%",
					backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(
						'<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="#fff" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>',
					)}")`,
				},
			},
		},
	},
	"& .MuiSwitch-thumb": {
		backgroundColor: theme.palette.primary.main,
		width: 26,
		height: 26,
		"&:before": {
			content: "''",
			position: "absolute",
			width: "100%",
			height: "100%",
			backgroundRepeat: "no-repeat",
			backgroundPosition: "center",
			backgroundSize: "75%",
			backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(
				'<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#fff"><rect fill="none" height="24" width="24"/><path d="M12,7c-2.76,0-5,2.24-5,5s2.24,5,5,5s5-2.24,5-5S14.76,7,12,7L12,7z M2,13l2,0c0.55,0,1-0.45,1-1s-0.45-1-1-1l-2,0 c-0.55,0-1,0.45-1,1S1.45,13,2,13z M20,13l2,0c0.55,0,1-0.45,1-1s-0.45-1-1-1l-2,0c-0.55,0-1,0.45-1,1S19.45,13,20,13z M11,2v2 c0,0.55,0.45,1,1,1s1-0.45,1-1V2c0-0.55-0.45-1-1-1S11,1.45,11,2z M11,20v2c0,0.55,0.45,1,1,1s1-0.45,1-1v-2c0-0.55-0.45-1-1-1 C11.45,19,11,19.45,11,20z M5.99,4.58c-0.39-0.39-1.03-0.39-1.41,0c-0.39,0.39-0.39,1.03,0,1.41l1.06,1.06 c0.39,0.39,1.03,0.39,1.41,0s0.39-1.03,0-1.41L5.99,4.58z M18.36,16.95c-0.39-0.39-1.03-0.39-1.41,0c-0.39,0.39-0.39,1.03,0,1.41 l1.06,1.06c0.39,0.39,1.03,0.39,1.41,0c0.39-0.39,0.39-1.03,0-1.41L18.36,16.95z M19.42,5.99c0.39-0.39,0.39-1.03,0-1.41 c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06c-0.39,0.39-0.39,1.03,0,1.41s1.03,0.39,1.41,0L19.42,5.99z M7.05,18.36 c0.39-0.39,0.39-1.03,0-1.41c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06c-0.39,0.39-0.39,1.03,0,1.41s1.03,0.39,1.41,0L7.05,18.36z"/></svg>',
			)}")`,
		},
	},

	"& .MuiSwitch-track": {
		borderRadius: 10,
		backgroundColor: "#90caf9 !important",
		opacity: 0.5,
		width: "400px",
	},
}));

interface ThemeToggleProps {
	setMode: React.Dispatch<React.SetStateAction<ThemeMode>>;
}

export const ThemeToggle = ({ setMode }: ThemeToggleProps) => {
	const theme = useTheme();

	useEffect(() => {
		// Check if user has a saved preference
		const savedTheme = localStorage.getItem("theme");

		if (savedTheme) {
			// Use saved preference if available
			setMode(savedTheme as ThemeMode);
		} else {
			// Otherwise use OS preference
			const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
			const newTheme = darkModeMediaQuery.matches ? ThemeMode.Dark : ThemeMode.Light;
			setMode(newTheme);
		}
	}, [setMode]);

	const toggleTheme = () => {
		setMode((prevMode) => {
			const newMode = prevMode === ThemeMode.Light ? ThemeMode.Dark : ThemeMode.Light;
			// Save user preference to localStorage
			localStorage.setItem("theme", newMode);
			return newMode;
		});
	};

	return (
		<StyledSwitch
			checked={theme.palette.mode === ThemeMode.Dark}
			onChange={toggleTheme}
			sx={{ ml: 1, mr: -1 }}
		/>
	);
};
