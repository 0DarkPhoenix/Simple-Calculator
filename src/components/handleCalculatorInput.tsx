import { invoke } from "@tauri-apps/api/core";
import { type CalculatorButton, calculatorButtons } from "./CalculatorButtons";

import type { Dispatch, SetStateAction } from "react";

interface HandleCalculatorInputProps {
	button: CalculatorButton;
	displayFormula: string;
	setDisplayFormula: Dispatch<SetStateAction<string>>;
	lastOperation: string | null;
	setLastOperation: Dispatch<SetStateAction<string | null>>;
	cursorPosition: number;
	setCursorPosition: Dispatch<SetStateAction<number>>;
}
export default function handleCalculatorInput({
	button,
	displayFormula,
	setDisplayFormula,
	lastOperation,
	setLastOperation,
	cursorPosition,
	setCursorPosition,
}: HandleCalculatorInputProps) {
	// Handlers
	function handleButtonClick(button: CalculatorButton) {
		// Handle equals operation
		if (button.action === calculatorButtons.equals.action) {
			handleCalculate();
			return;
		}

		// Handle clear operation
		if (button.action === calculatorButtons.clear.action) {
			setDisplayFormula("0");
			setLastOperation("");
			setCursorPosition(1); // Set cursor after the "0"
			return;
		}

		// Handle delete operation
		if (button.action === calculatorButtons.delete.action) {
			if (cursorPosition === 0) {
				return; // Nothing to delete before cursor
			}

			setDisplayFormula((prevDisplay) => {
				// If display is just a single character, reset to 0
				if (prevDisplay.length === 1) {
					setCursorPosition(1); // Position after "0"
					return "0";
				}

				// Convert cursor position to actual formula position
				const beforeCursor = prevDisplay.substring(0, cursorPosition);
				const afterCursor = prevDisplay.substring(cursorPosition);

				// Check for LaTeX functions with content inside curly braces
				const latexFunctionRegex = /(\\[a-zA-Z]+\{[^}]*\})$/;
				const match = beforeCursor.match(latexFunctionRegex);

				if (match) {
					const fullMatch = match[0]; // Full function like \sin{123}
					const functionName = fullMatch.split("{")[0]; // \sin
					const innerContent = fullMatch.substring(
						functionName.length + 1,
						fullMatch.length - 1,
					); // 123

					// If there's content inside the function, remove the last character of content
					if (innerContent.length > 0) {
						const newInnerContent = innerContent.slice(0, -1);
						// Replace the matched function with the updated content
						const newBeforeCursor = `${beforeCursor.substring(0, beforeCursor.length - fullMatch.length)}${functionName}{${newInnerContent}}`;

						setCursorPosition(newBeforeCursor.length);
						return newBeforeCursor + afterCursor;
					}
				}

				// Special handling for other LaTeX constructs
				// Check if we're deleting a LaTeX command
				const latexOperatorRegex = /\\[a-zA-Z]+$/;
				const operatorMatch = beforeCursor.match(latexOperatorRegex);
				if (operatorMatch) {
					// Remove the entire operator
					const newBeforeCursor = beforeCursor.substring(
						0,
						beforeCursor.length - operatorMatch[0].length,
					);
					setCursorPosition(newBeforeCursor.length);
					return newBeforeCursor + afterCursor;
				}

				// Default: remove character before cursor
				const newBeforeCursor = beforeCursor.slice(0, -1);
				setCursorPosition(newBeforeCursor.length);
				return newBeforeCursor + afterCursor;
			});
			return;
		}

		// Handle toggle sign operation
		if (button.action === calculatorButtons.plusOrMinus.action) {
			handleToggleSign();
			return;
		}

		// Reset after calculation if starting a new number
		if (lastOperation === calculatorButtons.equals.action) {
			if (/^[0-9]$/.test(button.action)) {
				setDisplayFormula(button.latex ?? button.action);
				setLastOperation("");
				setCursorPosition((button.latex ?? button.action).length);
				return;
			}
			setLastOperation("");
		}

		// Handle functions with parentheses (e.g. sin(), sqrt())
		if (button.action.includes("()")) {
			setDisplayFormula((prev) => {
				if (prev === "0") {
					const newFormula = button.latex ?? "";
					setCursorPosition(newFormula.indexOf("{}") + 1); // Set cursor inside the curly brackets
					return newFormula;
				}
				if (cursorPosition === prev.length) {
					// Cursor at end - wrap entire formula
					const newFormula = (button.latex ?? "").replace("{}", `{${prev}}`);
					setCursorPosition(newFormula.length);
					return newFormula;
				}
				// Insert at cursor position
				const beforeCursor = prev.substring(0, cursorPosition);
				const afterCursor = prev.substring(cursorPosition);
				const insertedText = (button.latex ?? "").replace("{}", "{}");
				const newFormula = beforeCursor + insertedText + afterCursor;
				setCursorPosition(beforeCursor.length + insertedText.indexOf("{}") + 1); // Set cursor inside the curly brackets
				return newFormula;
			});
			return;
		}

		// Default handling for regular buttons - insert at cursor position
		setDisplayFormula((prev) => {
			if (prev === "0") {
				const newText = button.latex ?? button.action;
				// Check if the text has empty curly braces for cursor positioning
				if (newText.includes("{}")) {
					setCursorPosition(newText.indexOf("{}") + 1); // Position cursor inside the braces
				} else {
					setCursorPosition(newText.length);
				}
				return newText;
			}

			const beforeCursor = prev.substring(0, cursorPosition);
			const afterCursor = prev.substring(cursorPosition);
			const insertedText = button.latex ?? button.action;
			const newFormula = beforeCursor + insertedText + afterCursor;

			// Check if inserted text has empty curly braces for cursor positioning
			if (insertedText.includes("{}")) {
				setCursorPosition(beforeCursor.length + insertedText.indexOf("{}") + 1);
			} else {
				setCursorPosition(cursorPosition + insertedText.length);
			}
			return newFormula;
		});
	}

	async function handleCalculate() {
		try {
			setLastOperation(calculatorButtons.equals.action);
			// Calculate the result
			const result: string = await invoke("calculate", { formula: displayFormula });

			// Update display formula with the result
			setDisplayFormula(result);
			setCursorPosition(result.length); // Move cursor to the end of result
		} catch (error) {
			setDisplayFormula("Error");
			setCursorPosition(5); // After "Error"
			console.error(error);
		}
	}

	function handleToggleSign() {
		setDisplayFormula((prevDisplay) => {
			if (prevDisplay === "0" || prevDisplay === "Error") {
				return prevDisplay;
			}

			if (prevDisplay.startsWith("-")) {
				setCursorPosition(Math.max(0, cursorPosition - 1)); // Adjust cursor when removing negative sign
				return prevDisplay.slice(1);
			}
			setCursorPosition(cursorPosition + 1); // Adjust cursor when adding negative sign
			return `-${prevDisplay}`;
		});
	}

	// Determine the action based on the button used
	handleButtonClick(button);
}
