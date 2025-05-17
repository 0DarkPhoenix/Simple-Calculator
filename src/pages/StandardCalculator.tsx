import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { calculatorButtons } from "../components/CalculatorButtons";
import MathRenderer from "../components/MathRenderer";
import WindowWrapper from "../components/WindowWrapper";
import handleCalculatorInput from "../components/handleCalculatorInput";
import { handleKeyboardInput } from "../components/handleKeyboardInput";

export default function StandardCalculator() {
	const [displayFormula, setDisplayFormula] = useState<string>("0");
	const [lastOperation, setLastOperation] = useState<string | null>(null);
	const [cursorPosition, setCursorPosition] = useState<number>(0);

	// Event listener for keyboard input
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
		{ button: calculatorButtons.sqrt, color: "secondary" },
		{ button: calculatorButtons.power, color: "secondary" },
		{ button: calculatorButtons.clear, color: "error" },
		{ button: calculatorButtons.delete, color: "error" },
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
					<MathRenderer
						formula={displayFormula}
						cursorPosition={cursorPosition}
						lastOperation={lastOperation}
					/>
					<Grid container spacing={1} sx={{ flexGrow: 1 }}>
						{buttonLayout.map(({ button, color }) => (
							<Grid item xs={3} key={button.icon} sx={{ p: 1 }}>
								<Button
									fullWidth
									variant='contained'
									color={color as "primary" | "secondary" | "error" | "success"}
									onClick={() => {
										handleCalculatorInput({
											button,
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
							</Grid>
						))}
					</Grid>
				</Paper>
			</Box>
		</WindowWrapper>
	);
}
