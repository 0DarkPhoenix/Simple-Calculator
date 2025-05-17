import BoltIcon from "@mui/icons-material/Bolt";
import DataUsageIcon from "@mui/icons-material/DataUsage";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import PowerIcon from "@mui/icons-material/Power";
import ScheduleIcon from "@mui/icons-material/Schedule";
import SpeedIcon from "@mui/icons-material/Speed";
import SquareFootIcon from "@mui/icons-material/SquareFoot";
import StraightenIcon from "@mui/icons-material/Straighten";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import ViewInArIcon from "@mui/icons-material/ViewInAr";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { invoke } from "@tauri-apps/api/core";
import { useState } from "react";
import WindowWrapper from "../components/WindowWrapper";

const unitCategories = {
	length: {
		name: "Length",
		icon: StraightenIcon,
		units: [
			{ label: "Angstroms (Å)", value: "a" },
			{ label: "Nanometers (nm)", value: "nm" },
			{ label: "Micrometers (µm)", value: "µm" },
			{ label: "Millimeters (mm)", value: "mm" },
			{ label: "Centimeters (cm)", value: "cm" },
			{ label: "Meters (m)", value: "m" },
			{ label: "Kilometers (km)", value: "km" },
			{ label: "Nautical Miles (nmi)", value: "nmi" },
			{ label: "Miles (mi)", value: "mi" },
			{ label: "Yards (yd)", value: "yd" },
			{ label: "Feet (ft)", value: "ft" },
			{ label: "Inches (in)", value: "in" },
			{ label: "Astronomical Units (au)", value: "au" },
			{ label: "Light Years (ly)", value: "ly" },
			{ label: "Parsec (pc)", value: "pc" },
		],
	},
	area: {
		name: "Area",
		icon: SquareFootIcon,
		units: [
			{ label: "Square Millimeters (mm²)", value: "mm²" },
			{ label: "Square Centimeters (cm²)", value: "cm²" },
			{ label: "Square Meters (m²)", value: "m²" },
			{ label: "Hectares (ha)", value: "ha" },
			{ label: "Square Kilometers (km²)", value: "km²" },
			{ label: "Square Inches (in²)", value: "in²" },
			{ label: "Square Feet (ft²)", value: "ft²" },
			{ label: "Square Yards (yd²)", value: "yd²" },
			{ label: "Acres (ac)", value: "ac" },
			{ label: "Square Miles (mi²)", value: "mi²" },
		],
	},
	volume: {
		name: "Volume",
		icon: ViewInArIcon,
		units: [
			{ label: "Milliliters (ml)", value: "ml" },
			{ label: "Cubic Centimeters (cm³)", value: "cm³" },
			{ label: "Liters (l)", value: "l" },
			{ label: "Cubic Meters (m³)", value: "m³" },
			{ label: "Cubic Inches (in³)", value: "in³" },
			{ label: "Cubic Feet (ft³)", value: "ft³" },
			{ label: "Gallons (gal)", value: "gal" },
			{ label: "Quarts (qt)", value: "qt" },
			{ label: "Pints (pt)", value: "pt" },
			{ label: "Fluid Ounces (fl oz)", value: "fl oz" },
		],
	},
	speed: {
		name: "Speed",
		icon: SpeedIcon,
		units: [
			{ label: "Meters per Second (m/s)", value: "m/s" },
			{ label: "Kilometers per Hour (km/h)", value: "km/h" },
			{ label: "Miles per Hour (mph)", value: "mph" },
			{ label: "Knots (kn)", value: "kn" },
			{ label: "Feet per Second (ft/s)", value: "ft/s" },
			{ label: "Mach (M)", value: "mach" },
		],
	},
	weight: {
		name: "Weight",
		icon: FitnessCenterIcon,
		units: [
			{ label: "Micrograms (µg)", value: "µg" },
			{ label: "Milligrams (mg)", value: "mg" },
			{ label: "Grams (g)", value: "g" },
			{ label: "Kilograms (kg)", value: "kg" },
			{ label: "Metric Tons (t)", value: "t" },
			{ label: "Ounces (oz)", value: "oz" },
			{ label: "Pounds (lb)", value: "lb" },
			{ label: "Stone (st)", value: "st" },
			{ label: "Short Tons (ton)", value: "ton" },
		],
	},
	time: {
		name: "Time",
		icon: ScheduleIcon,
		units: [
			{ label: "Nanoseconds (ns)", value: "ns" },
			{ label: "Microseconds (µs)", value: "µs" },
			{ label: "Milliseconds (ms)", value: "ms" },
			{ label: "Seconds (s)", value: "s" },
			{ label: "Minutes (min)", value: "min" },
			{ label: "Hours (h)", value: "h" },
			{ label: "Days (d)", value: "d" },
			{ label: "Weeks (wk)", value: "wk" },
			{ label: "Months (mo)", value: "mo" },
			{ label: "Years (yr)", value: "yr" },
		],
	},
	temperature: {
		name: "Temperature",
		icon: ThermostatIcon,
		units: [
			{ label: "Celsius (°C)", value: "celsius" },
			{ label: "Fahrenheit (°F)", value: "fahrenheit" },
			{ label: "Kelvin (K)", value: "kelvin" },
		],
	},
	energy: {
		name: "Energy",
		icon: BoltIcon,
		units: [
			{ label: "Joules (J)", value: "j" },
			{ label: "Kilojoules (kJ)", value: "kj" },
			{ label: "Calories (cal)", value: "cal" },
			{ label: "Kilocalories (kcal)", value: "kcal" },
			{ label: "Watt Hours (Wh)", value: "wh" },
			{ label: "Kilowatt Hours (kWh)", value: "kwh" },
			{ label: "Electron Volts (eV)", value: "ev" },
			{ label: "British Thermal Units (BTU)", value: "btu" },
		],
	},
	power: {
		name: "Power",
		icon: PowerIcon,
		units: [
			{ label: "Watts (W)", value: "w" },
			{ label: "Kilowatts (kW)", value: "kw" },
			{ label: "Megawatts (MW)", value: "mw" },
			{ label: "Horsepower (hp)", value: "hp" },
			{ label: "BTU per Hour (BTU/h)", value: "btu/h" },
			{ label: "Calories per Second (cal/s)", value: "cal/s" },
			{ label: "Foot-Pounds per Minute (ft⋅lb/min)", value: "ft⋅lb/min" },
		],
	},
	data: {
		name: "Data",
		icon: DataUsageIcon,
		units: [
			{ label: "Bits (b)", value: "b" },
			{ label: "Kilobits (kb)", value: "kb" },
			{ label: "Megabits (Mb)", value: "mb" },
			{ label: "Gigabits (Gb)", value: "gb" },
			{ label: "Terabits (Tb)", value: "tb" },
			{ label: "Petabits (Pb)", value: "pb" },
			{ label: "Exabits (Eb)", value: "eb" },
			{ label: "Zettabits (Zb)", value: "zb" },
			{ label: "Yottabits (Yb)", value: "yb" },

			{ label: "Bytes (B)", value: "B" },
			{ label: "Kilobytes (kB)", value: "kB" },
			{ label: "Megabytes (MB)", value: "MB" },
			{ label: "Gigabytes (GB)", value: "GB" },
			{ label: "Terabytes (TB)", value: "TB" },
			{ label: "Petabytes (PB)", value: "PB" },
			{ label: "Exabytes (EB)", value: "EB" },
			{ label: "Zettabytes (ZB)", value: "ZB" },
			{ label: "Yottabytes (YB)", value: "YB" },

			{ label: "Kibibytes (KiB)", value: "kib" },
			{ label: "Mebibytes (MiB)", value: "mib" },
			{ label: "Gibibytes (GiB)", value: "gib" },
			{ label: "Tebibytes (TiB)", value: "tib" },
			{ label: "Pebibytes (PiB)", value: "pib" },
			{ label: "Exbibytes (EiB)", value: "eib" },
			{ label: "Zebibytes (ZiB)", value: "zib" },
			{ label: "Yobibytes (YiB)", value: "yib" },
		],
	},
};

type ConverterUnit = {
	label: string;
	value: string;
	category: string;
};

type CategoryInfo = {
	name: string;
	icon: React.ElementType;
	units: Array<Omit<ConverterUnit, "category">>;
};

const converterUnitsObject = Object.values(unitCategories).flatMap((category) =>
	category.units.map((unit) => ({
		...unit,
		category: category.name,
	})),
);

export default function Converter() {
	const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
	const [inputValue, setInputValue] = useState<string | null>(null);
	const [inputUnit, setInputUnit] = useState<ConverterUnit | null>(null);
	const [outputUnit, setOutputUnit] = useState<ConverterUnit | null>(null);
	const [result, setResult] = useState<string | null>(null);

	const handleSwapUnits = () => {
		// Store current units
		const tempInputUnit = inputUnit;
		const tempOutputUnit = outputUnit;

		// Swap the units in state
		setInputUnit(tempOutputUnit);
		setOutputUnit(tempInputUnit);

		// Call convert with the swapped units
		if (inputValue && tempOutputUnit && tempInputUnit) {
			convert(inputValue, tempOutputUnit, tempInputUnit);
		}
	};

	const getAvailableOutputUnits = () => {
		if (!inputUnit) {
			return [];
		}
		return converterUnitsObject.filter((unit) => unit.category === inputUnit.category);
	};
	// Get all available unit categories
	const categoryOptions = Object.values(unitCategories).map((category) => category.name);

	// Get available units for the selected category
	const getUnitsForCategory = (categoryName: string | null) => {
		if (!categoryName) {
			return [];
		}

		const category = Object.values(unitCategories).find((cat) => cat.name === categoryName);
		if (!category) {
			return [];
		}

		return category.units.map((unit) => ({
			...unit,
			category: categoryName,
		}));
	};

	// Handle category change
	const handleCategoryChange = (newCategory: string | null) => {
		setSelectedCategory(newCategory);
		setInputUnit(null);
		setOutputUnit(null);
		setResult(null);
	};

	const handleDirectUnitSelection = (selectedUnit: ConverterUnit | null) => {
		if (selectedUnit) {
			setInputUnit(selectedUnit);
			setSelectedCategory(selectedUnit.category);
			// Clear output unit to ensure compatibility
			setOutputUnit(null);
			// Only attempt conversion if there's a value and output unit
			if (inputValue && outputUnit && outputUnit.category === selectedUnit.category) {
				convert(inputValue, selectedUnit, outputUnit);
			} else {
				setResult(null);
			}
		} else {
			setInputUnit(null);
			// Don't clear category to maintain the current view
		}
	};

	const convert = async (
		value: string | null,
		fromUnit: ConverterUnit | null,
		toUnit: ConverterUnit | null,
	) => {
		if (!value || !fromUnit || !toUnit) {
			setResult(null);
			return;
		}

		const currentValueAsFloat = Number.parseFloat(value);
		if (Number.isNaN(currentValueAsFloat)) {
			setResult("Invalid input");
			return;
		}

		try {
			const convertedValue: string = await invoke("converter", {
				inputValue: currentValueAsFloat,
				inputUnit: fromUnit.value,
				outputUnit: toUnit.value,
				category: fromUnit.category,
			});
			setResult(convertedValue);
		} catch (error: unknown) {
			setResult(error as string);
		}
	};

	return (
		<WindowWrapper>
			<Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
				<SwapHorizIcon sx={{ fontSize: "3.5rem", mr: 3 }} />
				<Typography variant='h2'>Converter</Typography>
			</Box>
			<Box sx={{ width: "100%", maxWidth: 800, margin: "auto" }}>
				<Stack spacing={3}>
					<Autocomplete
						value={selectedCategory}
						onChange={(event, newValue) => handleCategoryChange(newValue)}
						options={categoryOptions}
						renderInput={(params) => {
							// Find the icon for the selected category
							const categoryKey = selectedCategory
								? Object.keys(unitCategories).find(
										(key) =>
											unitCategories[key as keyof typeof unitCategories]
												.name === selectedCategory,
									)
								: null;

							const IconComponent = categoryKey
								? unitCategories[categoryKey as keyof typeof unitCategories].icon
								: null;

							return (
								<TextField
									{...params}
									label='Select Category'
									sx={{ bgcolor: "background.paper" }}
									InputProps={{
										...params.InputProps,
										startAdornment: (
											<>
												{IconComponent && (
													<Box
														component='span'
														sx={{
															mr: 0.5,
															display: "flex",
															alignItems: "center",
														}}
													>
														<IconComponent />
													</Box>
												)}
												{params.InputProps.startAdornment}
											</>
										),
									}}
								/>
							);
						}}
						renderOption={(props, option) => {
							const categoryKey = Object.keys(unitCategories).find(
								(key) =>
									unitCategories[key as keyof typeof unitCategories].name ===
									option,
							);
							const IconComponent =
								unitCategories[categoryKey as keyof typeof unitCategories].icon;
							return (
								<li {...props}>
									{IconComponent && (
										<Box
											component='span'
											sx={{ mr: 1.5, display: "flex", alignItems: "center" }}
										>
											<IconComponent />
										</Box>
									)}
									{option}
								</li>
							);
						}}
						fullWidth
						autoHighlight
						openOnFocus
						selectOnFocus
					/>

					<Stack direction='row' spacing={2} alignItems='center'>
						<Autocomplete
							value={inputUnit}
							onChange={(event, newValue) => {
								if (newValue) {
									// If category changes, reset output unit
									if (
										!selectedCategory ||
										newValue.category !== selectedCategory
									) {
										setSelectedCategory(newValue.category);
										setOutputUnit(null);
									} else {
										// Keep output unit if in same category
										setInputUnit(newValue);
										convert(inputValue, newValue, outputUnit);
									}
								} else {
									setInputUnit(null);
								}
								setInputUnit(newValue);
								convert(inputValue, newValue, outputUnit);
							}}
							options={
								selectedCategory
									? getUnitsForCategory(selectedCategory)
									: converterUnitsObject
							}
							getOptionLabel={(option) => option.label}
							renderInput={(params) => (
								<TextField
									{...params}
									label='From'
									sx={{ bgcolor: "background.paper" }}
								/>
							)}
							fullWidth
							autoHighlight
							openOnFocus
							selectOnFocus
							// Now always enabled
						/>
						<IconButton
							onClick={handleSwapUnits}
							color='primary'
							sx={{
								border: 1,
								borderRadius: "50%",
								p: 1,
							}}
							disabled={!inputUnit || !outputUnit}
						>
							<SwapHorizIcon />
						</IconButton>

						<Autocomplete
							value={outputUnit}
							onChange={(event, newValue) => {
								setOutputUnit(newValue);
								convert(inputValue, inputUnit, newValue);
							}}
							options={getAvailableOutputUnits()}
							getOptionLabel={(option) => option.label}
							renderInput={(params) => (
								<TextField
									{...params}
									label='To'
									sx={{ bgcolor: "background.paper" }}
								/>
							)}
							fullWidth
							autoHighlight
							openOnFocus
							selectOnFocus
							disabled={!inputUnit}
						/>
					</Stack>
					<Stack direction='row' spacing={2} alignItems='center'>
						<TextField
							label='Value'
							value={inputValue}
							onChange={(e) => {
								const currentValue = e.target.value;
								setInputValue(currentValue);
								if (inputUnit && outputUnit) {
									convert(currentValue, inputUnit, outputUnit);
								}
							}}
							type='number'
							fullWidth
							sx={{ bgcolor: "background.paper" }}
						/>

						<TextField
							label='Result'
							value={result === null ? "" : result}
							inputProps={{
								readOnly: true,
							}}
							InputLabelProps={{
								shrink: result != null,
							}}
							fullWidth
							sx={{ bgcolor: "background.paper" }}
						/>
					</Stack>
				</Stack>
			</Box>
		</WindowWrapper>
	);
}
