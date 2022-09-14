import React from 'react';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import useBoards from '../utils/useBoards';

export default function Home() {
	const boards = useBoards();

	return (
		<Container maxWidth="md">
			<Typography
				align="center"
				color="grey.800"
				sx={{ my: 4 }}
				variant="h4"
			>
				My Boards
			</Typography>
			<Grid container spacing={2} sx={{ justifyContent: 'center', pb: 1 }}>
				{boards.map((board) => (
					<Grid key={board.id} sm={4} xs={12}>
						<Button
							color="primary"
							href={`/${board.id}`}
							variant="contained"
							sx={{
								aspectRatio: '16/9',
								color: 'white',
								textTransform: 'none',
								width: '100%',
							}}
						>
							<Typography variant="h6">
								{board.title}
							</Typography>
						</Button>
					</Grid>
				))}
				<Grid sm={4} xs={12}>
					<Button
						disableElevation
						color="inherit"
						variant="contained"
						sx={{
							':hover': {
								backgroundColor: 'hsl(0, 0%, 88%)',
							},
							aspectRatio: '16/9',
							backgroundColor: 'grey.200',
							textTransform: 'none',
							width: '100%',
						}}
					>
						<Typography color="text.disabled" fontSize="large">
							Create new board
						</Typography>
					</Button>
				</Grid>
			</Grid>
		</Container>
	);
}
