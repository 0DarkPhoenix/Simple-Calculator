import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { calculatorButtons } from "../components/CalculatorButtons";
import MathRenderer from "../components/MathRenderer";
import SplitButton from "../components/SplitButton";
import WindowWrapper from "../components/WindowWrapper";
import handleCalculatorInput from "../components/handleCalculatorInput";
import { handleKeyboardInput } from "../components/handleKeyboardInput";

export default function ScientificCalculator() {
	const [displayFormula, setDisplayFormula] = useState("0");
	const [lastOperation, setLastOperation] = useState<string | null>(null);
	const [isRadians, setIsRadians] = useState(true);
	const [cursorPosition, setCursorPosition] = useState<number>(0);

	// Add event listener for keyboard input
	useEffect(() => {
		const handleKeyPress = (event: KeyboardEvent) => {
			handleKeyboardInput({
				event,
				displayFormula,
				setDisplayFormula,
				lastOperation,
				setLastOperation,
				cursorPosition,
				setCursorPosition,
			});
		};

		window.addEventListener("keydown", handleKeyPress);
		return () => {
			window.removeEventListener("keydown", handleKeyPress);
		};
	}, [displayFormula, lastOperation, cursorPosition]);

	const buttonLayout = [
		{ button: calculatorButtons.radOrDeg, color: "secondary" },
		{ button: calculatorButtons.logBase, color: "error" },
		{ button: calculatorButtons.clear, color: "error" },
		{ button: calculatorButtons.delete, color: "error" },
		{
			button: { bottomLeft: calculatorButtons.sin, topRight: calculatorButtons.asin },
			color: "secondary",
		},
		{
			button: { bottomLeft: calculatorButtons.cos, topRight: calculatorButtons.acos },
			color: "secondary",
		},
		{
			button: { bottomLeft: calculatorButtons.tan, topRight: calculatorButtons.atan },
			color: "secondary",
		},
		{ button: calculatorButtons.factorial, color: "secondary" },
		{
			button: { bottomLeft: calculatorButtons.log, topRight: calculatorButtons.EE },
			color: "secondary",
		},
		{
			button: { bottomLeft: calculatorButtons.ln, topRight: calculatorButtons.e },
			color: "secondary",
		},
		{
			button: { bottomLeft: calculatorButtons.power, topRight: calculatorButtons.sqrt },
			color: "secondary",
		},
		{ button: calculatorButtons.pi, color: "secondary" },
		{ button: calculatorButtons.openParenthesis, color: "secondary" },
		{ button: calculatorButtons.closeParenthesis, color: "secondary" },
		{ button: calculatorButtons.remainder, color: "secondary" },
		{ button: calculatorButtons.divide, color: "secondary" },
		{ button: calculatorButtons.seven, color: "primary" },
		{ button: calculatorButtons.eight, color: "primary" },
		{ button: calculatorButtons.nine, color: "primary" },
		{ button: calculatorButtons.multiply, color: "secondary" },
		{ button: calculatorButtons.four, color: "primary" },
		{ button: calculatorButtons.five, color: "primary" },
		{ button: calculatorButtons.six, color: "primary" },
		{ button: calculatorButtons.minus, color: "secondary" },
		{ button: calculatorButtons.one, color: "primary" },
		{ button: calculatorButtons.two, color: "primary" },
		{ button: calculatorButtons.three, color: "primary" },
		{ button: calculatorButtons.plus, color: "secondary" },
		{ button: calculatorButtons.plusOrMinus, color: "secondary" },
		{ button: calculatorButtons.zero, color: "primary" },
		{ button: calculatorButtons.decimalPoint, color: "secondary" },
		{ button: calculatorButtons.equals, color: "success" },
	];

	console.log(displayFormula);

	return (
		<WindowWrapper>
			<Box sx={{ display: "flex", width: "100%" }}>
				<Paper
					elevation={3}
					sx={{
						padding: 2,
						backgroundColor: "transparent",
						flexGrow: 1,
						display: "flex",
						flexDirection: "column",
					}}
				>
					<Typography variant='h6' align='right' sx={{ padding: 1, marginBottom: 1 }}>
						{isRadians ? "RAD" : "DEG"}
					</Typography>
					<MathRenderer
						formula={displayFormula}
						cursorPosition={cursorPosition}
						lastOperation={lastOperation}
					/>
					<Grid container spacing={1} sx={{ flexGrow: 1 }}>
						{buttonLayout.map(({ button, color }) => (
							<Grid
								key={
									typeof button === "object" && "bottomLeft" in button
										? button.bottomLeft.icon
										: button.icon
								}
								item
								xs={3}
								sx={{ p: 0.5 }}
							>
								{typeof button === "object" && "bottomLeft" in button ? (
									<SplitButton
										bottomLeftText={button.bottomLeft.icon}
										topRightText={button.topRight.icon}
										onClickBottomLeft={() => {
											handleCalculatorInput({
												button: button.bottomLeft,
												displayFormula,
												setDisplayFormula,
												lastOperation,
												setLastOperation,
												cursorPosition,
												setCursorPosition,
											});
										}}
										onClickTopRight={() => {
											handleCalculatorInput({
												button: button.topRight,
												displayFormula,
												setDisplayFormula,
												lastOperation,
												setLastOperation,
												cursorPosition,
												setCursorPosition,
											});
										}}
									/>
								) : (
									<Button
										fullWidth
										variant='contained'
										color={
											color as "primary" | "secondary" | "success" | "error"
										}
										onClick={() => {
											handleCalculatorInput({
												button: button,
												displayFormula,
												setDisplayFormula,
												lastOperation,
												setLastOperation,
												cursorPosition,
												setCursorPosition,
											});
										}}
										sx={{ height: "100%" }}
									>
										<Typography
											variant='body1'
											color='white'
											sx={{ textTransform: "none" }}
										>
											{button.icon}
										</Typography>
									</Button>
								)}
							</Grid>
						))}{" "}
					</Grid>
				</Paper>
			</Box>
		</WindowWrapper>
	);
}
