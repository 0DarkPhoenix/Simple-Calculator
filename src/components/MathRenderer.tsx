import Typography from "@mui/material/Typography";
import "katex/dist/katex.min.css";
import { styled } from "@mui/material/styles";
import { useEffect, useRef, useState } from "react";
import { InlineMath } from "react-katex";
import { calculatorButtons } from "./CalculatorButtons";

const RobotoMathContainer = styled("div")({
	// Global KaTeX container
	"& .katex": {
		fontFamily: '"Roboto", sans-serif !important',
	},
	// Core math rendering elements
	"& .katex .katex-mathml, & .katex .katex-html": {
		fontFamily: '"Roboto", sans-serif !important',
	},
	// Math symbols including pi, operators, and special characters
	"& .katex .math, & .katex .mathit, & .katex .mathnormal, & .katex .mathbf, & .katex .mathcal": {
		fontFamily: '"Roboto", sans-serif !important',
	},
	// Error messages and special text values like NaN
	"& .katex-error, & .mord, & .mord.text": {
		fontFamily: '"Roboto", sans-serif !important',
	},
	// Greek letters and other special symbols
	"& .katex .mord.mathdefault, & .katex .mord.mathit": {
		fontFamily: '"Roboto", sans-serif !important',
	},
	// Ensure all nested elements inherit the font
	"& .katex *, & .katex-display *": {
		fontFamily: '"Roboto", sans-serif !important',
	},
});

const FormulaDisplay = styled("div")({
	position: "relative",
	display: "inline-block",
});

interface MathRendererProps {
	formula: string;
	cursorPosition: number;
	lastOperation: string | null;
}

const MathRenderer = ({ formula, cursorPosition, lastOperation }: MathRendererProps) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const [showCursor, setShowCursor] = useState(true);
	const [isBlinking, setIsBlinking] = useState(false);
	const lastFormulaRef = useRef(formula);
	const lastCursorPosRef = useRef(cursorPosition);
	const activityTimerRef = useRef<number | null>(null);

	// Prepare formula for rendering
	const renderFormula = (text: string) => {
		if (!text) {
			return "0";
		}

		try {
			return <InlineMath math={text} />;
		} catch (error) {
			console.error("Error rendering formula:", error);
			return text;
		}
	};

	// Create formula with cursor
	const getFormulaWithCursor = () => {
		// Safety check for cursor position
		const safePosition = Math.min(cursorPosition, formula.length);

		// Insert pipe character at cursor position.
		// Show a phantom pipe (invisible character using the same width as the pipe) if the cursor is not at the end of the formula.
		return (
			formula.substring(0, safePosition) +
			(shouldShowCursor() ? "|" : "\\phantom{|}") +
			formula.substring(safePosition)
		);
	};

	// Detect formula changes or cursor movements to reset blinking
	useEffect(() => {
		// Check if either the formula changed OR the cursor position changed
		const formulaChanged = formula !== lastFormulaRef.current;
		const cursorMoved = cursorPosition !== lastCursorPosRef.current;

		if (formulaChanged || cursorMoved) {
			// Formula or cursor position changed - show cursor and reset blink timer
			setShowCursor(true);
			setIsBlinking(false);

			// Clear existing timer
			if (activityTimerRef.current) {
				window.clearTimeout(activityTimerRef.current);
			}

			// Start new timer - begin blinking after 0.4 seconds of inactivity
			activityTimerRef.current = window.setTimeout(() => {
				setIsBlinking(true);
			}, 400);
		}

		// Update both refs with current values
		lastFormulaRef.current = formula;
		lastCursorPosRef.current = cursorPosition;

		// Cleanup
		return () => {
			if (activityTimerRef.current) {
				window.clearTimeout(activityTimerRef.current);
			}
		};
	}, [formula, cursorPosition]);

	// Set up blinking cursor effect
	useEffect(() => {
		if (!isBlinking) {
			return;
		}

		// Toggle cursor visibility every 0.6 seconds
		const cursorInterval = setInterval(() => {
			setShowCursor((prev) => !prev);
		}, 600);

		// Clean up interval on unmount or when not blinking
		return () => clearInterval(cursorInterval);
	}, [isBlinking]);

	// Determine if cursor should be shown
	const shouldShowCursor = () => {
		// Don't show cursor if just displaying "0"
		if (formula === "0") {
			return false;
		}

		// Don't show cursor after a calculation
		if (lastOperation === calculatorButtons.equals.action) {
			return false;
		}

		// Otherwise, show cursor based on blinking state
		return isBlinking ? showCursor : true;
	};

	// Determine which formula to render
	const displayFormula = getFormulaWithCursor();

	return (
		<Typography
			variant='h4'
			align='right'
			sx={{ padding: 2, marginBottom: 2, minHeight: "60px" }}
		>
			<FormulaDisplay>
				<RobotoMathContainer ref={containerRef}>
					{renderFormula(displayFormula)}
				</RobotoMathContainer>
			</FormulaDisplay>
		</Typography>
	);
};

export default MathRenderer;
