import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

export default function WindowWrapper({ children }: { children: React.ReactNode }) {
	return (
		<Box
			display='flex'
			sx={{
				height: "100dvh",
				overflow: "hidden",
				position: "fixed",
				width: "100%",
				top: 0,
				left: 0,
			}}
		>
			<Box
				component='main'
				sx={{
					flexGrow: 1,
					p: { xs: 1, sm: 2 },
					marginLeft: "200px",
					width: "100%",
					transition: "margin-left 0.3s ease",
					overflowY: "auto",
				}}
			>
				<Container
					maxWidth='xl'
					sx={{
						height: "100%",
						display: "flex",
						flexDirection: "column",
					}}
				>
					{children}
				</Container>
			</Box>
		</Box>
	);
}
