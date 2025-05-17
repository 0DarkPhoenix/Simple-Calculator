import InsightsIcon from "@mui/icons-material/Insights";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import functionPlot from "function-plot";
import { useEffect, useRef } from "react";
import WindowWrapper from "../components/WindowWrapper";

export default function Graphs() {
	const graphRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (graphRef.current) {
			try {
				functionPlot({
					target: graphRef.current,
					width: 800,
					height: 500,
					yAxis: { domain: [-10, 10] },
					xAxis: { domain: [-10, 10] },
					grid: true,
					data: [
						{
							fn: "x^2",
							color: "#00897B",
						},
						{
							fn: "sin(x)",
							color: "#4CAF50",
						},
					],
				});
			} catch (e) {
				console.error(e);
			}
		}
	}, []);

	return (
		<WindowWrapper>
			<Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mb: 4 }}>
				<InsightsIcon sx={{ fontSize: "3.5rem", mr: 3 }} />
				<Typography variant='h2'>Graphs</Typography>
			</Box>

			<Box
				sx={{
					width: "100%",
					display: "flex",
					justifyContent: "center",
					"& canvas": { maxWidth: "100%" },
				}}
			>
				<div ref={graphRef} />
			</Box>
		</WindowWrapper>
	);
}
