import { calculatorButtons } from "./CalculatorButtons";
import handleCalculatorInput from "./handleCalculatorInput";

import type { Dispatch, SetStateAction } from "react";

interface HandleKeyboardInputProps {
	event: KeyboardEvent;
	displayFormula: string;
	setDisplayFormula: Dispatch<SetStateAction<string>>;
	lastOperation: string | null;
	setLastOperation: Dispatch<SetStateAction<string | null>>;
	cursorPosition: number;
	setCursorPosition: Dispatch<SetStateAction<number>>;
}

const navigateLatexSpecial = (
	formula: string,
	position: number,
	direction: "left" | "right",
): number => {
	let newPosition = position;
	const latexFunctionRegex =
		/\\[a-zA-Z]+\({|}\)|\\[a-zA-Z]+{|}\\[a-zA-Z]+|\\[a-zA-Z]+{|}|\^{|}|\\[a-zA-Z]+(?![({])|{|}!/g;
	let matches: RegExpExecArray | null;
	const matchPositions: { start: number; end: number }[] = [];

	// Find all matches and their positions
	while ((matches = latexFunctionRegex.exec(formula)) !== null) {
		matchPositions.push({
			start: matches.index,
			end: matches.index + matches[0].length,
		});
	}

	if (direction === "left") {
		// Move cursor to the left
		if (position > 0) {
			newPosition = position - 1;
		}

		// Check if the cursor needs to skip over a LaTeX function
		for (const match of matchPositions) {
			// If cursor is inside a LaTeX function and not at the very beginning
			if (position > match.start && position <= match.end) {
				// Skip to the beginning of the LaTeX function
				newPosition = match.start;
				break;
			}
		}
	} else if (direction === "right") {
		// Move cursor to the right
		if (position < formula.length) {
			newPosition = position + 1;
		}

		// Check if the cursor needs to skip over a LaTeX function
		for (const match of matchPositions) {
			// If cursor is inside a LaTeX function and not at the very end
			if (position >= match.start && position < match.end) {
				// Skip to the end of the LaTeX function
				newPosition = match.end;
				break;
			}
		}
	}

	return newPosition;
};

export const handleKeyboardInput = ({
	event,
	displayFormula,
	setDisplayFormula,
	lastOperation,
	setLastOperation,
	cursorPosition,
	setCursorPosition,
}: HandleKeyboardInputProps) => {
	const key = event.key;

	// Handle arrow keys for cursor navigation
	if (key === "ArrowLeft" || key === "ArrowRight") {
		event.preventDefault();
		if (key === "ArrowLeft") {
			setCursorPosition(navigateLatexSpecial(displayFormula, cursorPosition, "left"));
		} else {
			setCursorPosition(navigateLatexSpecial(displayFormula, cursorPosition, "right"));
		}
		return;
	}

	// Handle Home and End keys
	if (key === "Home") {
		event.preventDefault();
		setCursorPosition(0);
		return;
	}

	if (key === "End") {
		event.preventDefault();
		setCursorPosition(displayFormula.length);
		return;
	}

	let button = "";

	if (/^[0-9.+\-*/()%^]$/.test(key)) {
		button = key;
	}

	if (key === "Enter") {
		button = calculatorButtons.equals.icon;
	}

	if (key === "Backspace") {
		button = calculatorButtons.delete.icon;
	}

	if (key === "Delete") {
		button = calculatorButtons.clear.icon;
	}

	if (button) {
		// Handle special key combinations
		const specialCombinations = [
			{
				endsWith: calculatorButtons.divide.latex,
				currentKey: "/",
				newButton: calculatorButtons.remainder,
			},
			{
				endsWith: calculatorButtons.multiply.latex,
				currentKey: "*",
				newButton: calculatorButtons.power,
			},
			{
				endsWith: calculatorButtons.divide.latex,
				currentKey: "*",
				newButton: calculatorButtons.sqrt,
			},
		];

		// Check if this is a special combination where the cursor is at the end
		const matchedCombination =
			cursorPosition === displayFormula.length &&
			specialCombinations.find(
				(combo) => displayFormula.endsWith(combo.endsWith) && button === combo.currentKey,
			);

		if (matchedCombination) {
			// Remove the last LaTeX symbol from displayFormula
			const symbolIndex = displayFormula.lastIndexOf(matchedCombination.endsWith);
			const newDisplayFormula = displayFormula.substring(0, symbolIndex);

			setDisplayFormula(newDisplayFormula);

			handleCalculatorInput({
				button: matchedCombination.newButton,
				displayFormula: newDisplayFormula,
				setDisplayFormula,
				lastOperation,
				setLastOperation,
				cursorPosition: newDisplayFormula.length,
				setCursorPosition,
			});
		} else {
			const matchingButton = Object.values(calculatorButtons).find(
				(calculatorButton) => calculatorButton.icon === button,
			);

			if (matchingButton) {
				handleCalculatorInput({
					button: matchingButton,
					displayFormula,
					setDisplayFormula,
					lastOperation,
					setLastOperation,
					cursorPosition,
					setCursorPosition,
				});
			}
		}
	}
};
