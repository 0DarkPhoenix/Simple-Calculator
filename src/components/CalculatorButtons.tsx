export type CalculatorButton = {
	icon: string;
	action: string;
	latex: string | null;
};

export const calculatorButtons = {
	one: {
		icon: "1",
		action: "1",
		latex: "1",
	},
	two: {
		icon: "2",
		action: "2",
		latex: "2",
	},
	three: {
		icon: "3",
		action: "3",
		latex: "3",
	},
	four: {
		icon: "4",
		action: "4",
		latex: "4",
	},
	five: {
		icon: "5",
		action: "5",
		latex: "5",
	},
	six: {
		icon: "6",
		action: "6",
		latex: "6",
	},
	seven: {
		icon: "7",
		action: "7",
		latex: "7",
	},
	eight: {
		icon: "8",
		action: "8",
		latex: "8",
	},
	nine: {
		icon: "9",
		action: "9",
		latex: "9",
	},
	zero: {
		icon: "0",
		action: "0",
		latex: "0",
	},
	plus: {
		icon: "+",
		action: "+",
		latex: "+",
	},
	minus: {
		icon: "-",
		action: "-",
		latex: "-",
	},
	multiply: {
		icon: "*",
		action: "*",
		latex: "\\times",
	},
	divide: {
		icon: "/",
		action: "/",
		latex: "\\div",
	},
	remainder: {
		icon: "%",
		action: "%",
		latex: "\\bmod",
	},
	power: {
		icon: "^",
		action: "^",
		latex: "^{}",
	},
	equals: {
		icon: "=",
		action: "=",
		latex: "=",
	},
	openParenthesis: {
		icon: "(",
		action: "(",
		latex: "(",
	},
	closeParenthesis: {
		icon: ")",
		action: ")",
		latex: ")",
	},
	decimalPoint: {
		icon: ".",
		action: ".",
		latex: ".",
	},
	plusOrMinus: {
		icon: "±",
		action: "toggle_polarity",
		latex: null,
	},
	// biome-ignore lint/style/useNamingConvention: Naming convention rule is not applicable on this item.
	EE: {
		icon: "EE",
		action: "*10^",
		latex: "\\E",
	},
	log: {
		icon: "log",
		action: "log()",
		latex: "\\log({})",
	},
	logBase: {
		icon: "logBase",
		action: "log_base()",
		latex: "\\log_{}({})",
	},
	sqrt: {
		icon: "√",
		action: "sqrt()",
		latex: "\\sqrt{}",
	},
	abs: {
		icon: "abs",
		action: "abs()",
		latex: "|{}|",
	},
	exp: {
		icon: "eᵡ",
		action: "exp()",
		latex: "e^({})",
	},
	ln: {
		icon: "ln",
		action: "ln()",
		latex: "\\ln({})",
	},
	sin: {
		icon: "sin",
		action: "sin()",
		latex: "\\sin({})",
	},
	cos: {
		icon: "cos",
		action: "cos()",
		latex: "\\cos({})",
	},
	tan: {
		icon: "tan",
		action: "tan()",
		latex: "\\tan({})",
	},
	asin: {
		icon: "asin",
		action: "asin()",
		latex: "\\arcsin({})",
	},
	acos: {
		icon: "acos",
		action: "acos()",
		latex: "\\arccos({})",
	},
	atan: {
		icon: "atan",
		action: "atan()",
		latex: "\\arctan({})",
	},
	atan2: {
		icon: "atan2",
		action: "atan2()",
		latex: "\\arctan{\\frac{y}{x}}",
	},
	sinh: {
		icon: "sinh",
		action: "sinh()",
		latex: "\\sinh({})",
	},
	cosh: {
		icon: "cosh",
		action: "cosh()",
		latex: "\\cosh({})",
	},
	tanh: {
		icon: "tanh",
		action: "tanh()",
		latex: "\\tanh({})",
	},
	asinh: {
		icon: "asinh",
		action: "asinh()",
		latex: "\\arcsinh({})",
	},
	acosh: {
		icon: "acosh",
		action: "acosh()",
		latex: "\\arccosh({})",
	},
	atanh: {
		icon: "atanh",
		action: "atanh()",
		latex: "\\arctanh({})",
	},
	floor: {
		icon: "floor",
		action: "floor()",
		latex: "\\lfloor{}\\rfloor",
	},
	ceil: {
		icon: "ceil",
		action: "ceil()",
		latex: "\\lceil{}\\rceil",
	},
	round: {
		icon: "round",
		action: "round()",
		latex: "\\lfloor{}\\rfloor",
	},
	pi: {
		icon: "π",
		action: "pi",
		latex: "\\pi",
	},
	e: {
		icon: "e",
		action: "e",
		latex: "e",
	},
	factorial: {
		icon: "!",
		action: "fact()",
		latex: "{}!",
	},
	radOrDeg: {
		icon: "RAD/DEG",
		action: "toggle_rad_deg",
		latex: null,
	},
	delete: {
		icon: "⌫",
		action: "delete",
		latex: null,
	},
	clear: {
		icon: "C",
		action: "clear",
		latex: null,
	},
};
