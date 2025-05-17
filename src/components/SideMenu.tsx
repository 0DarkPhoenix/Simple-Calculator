import AnimationIcon from "@mui/icons-material/Animation";
import CalculateIcon from "@mui/icons-material/Calculate";
import ContrastIcon from "@mui/icons-material/Contrast";
import FunctionsIcon from "@mui/icons-material/Functions";
import InsightsIcon from "@mui/icons-material/Insights";
import SettingsIcon from "@mui/icons-material/Settings";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Link } from "react-router-dom";
import type { ThemeMode } from "../theme/Theme";
import { ThemeToggle } from "./ThemeToggle";

interface SideMenuProps {
	setMode: React.Dispatch<React.SetStateAction<ThemeMode>>;
}

export default function SideMenu({ setMode }: SideMenuProps) {
	const SideMenuList = () => {
		const menuItems = [
			{ text: "Standard", icon: <CalculateIcon />, path: "/" },
			{ text: "Scientific", icon: <FunctionsIcon />, path: "/ScientificCalculator" },
			{ text: "Graphs", icon: <InsightsIcon />, path: "/Graphs" },
			{ text: "Converter", icon: <SwapHorizIcon />, path: "/Converter" },
			{ text: "Sequences", icon: <AnimationIcon />, path: "/Sequences" },
		];

		const settingsItem = { text: "Settings", icon: <SettingsIcon />, path: "/Settings" };

		return (
			<Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
				<List>
					{menuItems.map((item) => (
						<ListItem key={item.text} disablePadding>
							<ListItemButton component={Link} to={item.path}>
								<ListItemIcon>{item.icon}</ListItemIcon>
								<ListItemText primary={item.text} />
							</ListItemButton>
						</ListItem>
					))}
				</List>
				<Box sx={{ flexGrow: 1 }} />
				<List>
					<ListItem>
						<ListItemIcon>
							<ContrastIcon />
						</ListItemIcon>
						<ListItemText primary='Theme' />
						<ThemeToggle setMode={setMode} />
					</ListItem>
					<ListItem disablePadding>
						<ListItemButton component={Link} to={settingsItem.path}>
							<ListItemIcon>{settingsItem.icon}</ListItemIcon>
							<ListItemText primary={settingsItem.text} />
						</ListItemButton>
					</ListItem>
				</List>
			</Box>
		);
	};

	return (
		<Drawer variant='permanent' anchor='left'>
			<SideMenuList />
		</Drawer>
	);
}
