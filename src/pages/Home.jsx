import React from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import CreateBoard from '../components/CreateBoard';

export default function Home() {
	const { boards, getBoards } = useOutletContext();
	const navigate = useNavigate();

	return (
		<Container maxWidth="md">
			<Typography
				align="center"
				sx={{ my: 4 }}
				variant="h4"
			>
				My Boards
			</Typography>
			<Grid
				container
				spacing={2}
				sx={{ justifyContent: 'center', pb: 1 }}
			>
				{boards.map((board) => (
					<Grid key={board.id} sm={4} xs={12}>
						<Button
							color="primary"
							onClick={() => navigate(`/${board.id}`)}
							variant="contained"
							sx={{
								aspectRatio: '16/9',
								color: 'white',
								textTransform: 'none',
								width: '100%',
							}}
						>
							<Typography
								variant="h6"
								sx={{
									overflow: 'hidden',
									textOverflow: 'ellipsis',
								}}
							>
								{board.title}
							</Typography>
						</Button>
					</Grid>
				))}
				<Grid sm={4} xs={12}>
					<CreateBoard getBoards={getBoards} />
				</Grid>
			</Grid>
		</Container>
	);
}
