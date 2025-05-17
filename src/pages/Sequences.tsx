import AnimationIcon from "@mui/icons-material/Animation";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Select, { type SelectChangeEvent } from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { invoke } from "@tauri-apps/api/core";
import { useEffect, useState } from "react";
import WindowWrapper from "../components/WindowWrapper";

type SequenceResponse = {
	result: string;
	duration: string;
};

export default function Sequences() {
	const [sequence, setSequence] = useState("fibonacci");
	const [inputValue, setInputValue] = useState<string | null>(null);
	const [result, setResult] = useState<string | null>(null);
	const [duration, setDuration] = useState<string | null>(null);

	const copyResult = async () => {
		await invoke("copy_to_clipboard");
	};

	const handleSequenceChange = (event: SelectChangeEvent) => {
		setSequence(event.target.value as string);
		setResult("");
	};

	const calculateSequence = async () => {
		if (!inputValue) {
			return;
		}

		try {
			const response: SequenceResponse = await invoke("select_sequence", {
				sequenceType: sequence,
				inputValue: Number.parseFloat(inputValue),
			});
			setResult(response.result);
			setDuration(response.duration);
		} catch (error) {
			console.error("Error calculating sequence:", error);
		}
	};

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(event.target.value as string);
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies(calculateSequence): <explanation>
	useEffect(() => {
		if (inputValue) {
			calculateSequence();
		} else {
			setResult("");
		}
	}, [inputValue]);

	return (
		<WindowWrapper>
			<Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mb: 4 }}>
				<AnimationIcon sx={{ fontSize: "3.5rem", mr: 3 }} />
				<Typography variant='h2'>Sequences</Typography>
			</Box>

			<Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
				<FormControl sx={{ minWidth: 200 }}>
					<Select
						value={sequence}
						onChange={handleSequenceChange}
						sx={{
							"& .MuiSelect-select": {
								py: 1,
							},
						}}
					>
						<MenuItem value='factorial'>Factorial</MenuItem>
						<MenuItem value='fibonacci'>Fibonacci Sequence</MenuItem>
						<MenuItem value='prime'>Prime Number</MenuItem>
					</Select>
				</FormControl>

				<Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
					<TextField
						label='Enter value'
						type='number'
						value={inputValue}
						onChange={handleInputChange}
						sx={{
							borderRadius: 1,
							"& .MuiOutlinedInput-root": {
								"& fieldset": {
									borderColor: "transparent",
								},
							},
						}}
					/>
					{
						<Typography variant='caption' sx={{ color: "rgba(255,255,255,0.6)" }}>
							{duration}
						</Typography>
					}
				</Box>

				{result && (
					<Box display={"flex"} alignItems={"center"} sx={{ gap: 2 }}>
						<Typography variant='h6' style={{ whiteSpace: "pre-line" }}>
							Result: {result}
						</Typography>

						{sequence !== "prime" && (
							<Tooltip title='Copy raw result to clipboard'>
								<IconButton onClick={copyResult} color='primary'>
									<ContentCopyIcon />
								</IconButton>
							</Tooltip>
						)}
					</Box>
				)}
			</Box>
		</WindowWrapper>
	);
}
