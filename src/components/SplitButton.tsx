import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";
import { useState } from "react";

interface SplitButtonProps {
	bottomLeftText: string;
	topRightText: string;
	onClickBottomLeft: () => void;
	onClickTopRight: () => void;
}

const StyledButton = styled(Button)(({ theme }) => ({
	position: "relative",
	overflow: "hidden",
	width: "100%",
	height: "100%",
	padding: 0,
	display: "flex",
	flexDirection: "column",
	textTransform: "none",
}));

const Triangle = styled("div")(({ theme }) => ({
	position: "absolute",
	inset: 0,
	cursor: "pointer",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	transition: "background-color 0.2s ease-in-out",
}));

interface TriangleProps {
	isHovered: boolean;
}

const BottomLeftTriangle = styled(Triangle, {
	shouldForwardProp: (prop) => prop !== "isHovered",
})<TriangleProps>(({ theme, isHovered }) => ({
	clipPath: "polygon(0 0, 0 100%, 79% 100%, 21% 0)",
	backgroundColor: isHovered ? theme.palette.primary.dark : theme.palette.primary.main,
}));

const TopRightTriangle = styled(Triangle, {
	shouldForwardProp: (prop) => prop !== "isHovered",
})<TriangleProps>(({ theme, isHovered }) => ({
	clipPath: "polygon(21% 0, 100% 0, 100% 100%, 79% 100%)",
	backgroundColor: isHovered ? theme.palette.secondary.dark : theme.palette.secondary.main,
}));

const BottomLeftText = styled(Typography)(({ theme }) => ({
	position: "absolute",
	bottom: "8%",
	left: "8%",
	color: theme.palette.primary.contrastText,
	textTransform: "none",
	transition: "transform 0.2s ease-in-out",
}));

const TopRightText = styled(Typography)(({ theme }) => ({
	position: "absolute",
	top: "8%",
	right: "8%",
	color: theme.palette.secondary.contrastText,
	textTransform: "none",
	transition: "transform 0.2s ease-in-out",
}));

const SplitButton = ({
	bottomLeftText,
	topRightText,
	onClickBottomLeft,
	onClickTopRight,
}: SplitButtonProps) => {
	const [isBottomLeftHovered, setIsBottomLeftHovered] = useState(false);
	const [isTopRightHovered, setIsTopRightHovered] = useState(false);

	return (
		<StyledButton disableRipple>
			<BottomLeftTriangle
				isHovered={isBottomLeftHovered}
				onClick={onClickBottomLeft}
				onMouseEnter={() => setIsBottomLeftHovered(true)}
				onMouseLeave={() => setIsBottomLeftHovered(false)}
			>
				<BottomLeftText variant='body1'>{bottomLeftText}</BottomLeftText>
			</BottomLeftTriangle>
			<TopRightTriangle
				isHovered={isTopRightHovered}
				onClick={onClickTopRight}
				onMouseEnter={() => setIsTopRightHovered(true)}
				onMouseLeave={() => setIsTopRightHovered(false)}
			>
				<TopRightText variant='body1'>{topRightText}</TopRightText>
			</TopRightTriangle>
		</StyledButton>
	);
};

export default SplitButton;
