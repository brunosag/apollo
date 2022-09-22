import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import AuthContext from '../components/AuthContext';
import AddList from '../components/AddList';
import AddCard from '../components/AddCard';

export default function Board() {
	const { authTokens, logoutUser } = useContext(AuthContext);
	const [board, setBoard] = useState(null);
	const { id } = useParams();

	const getBoard = async () => {
		const response = await fetch(`api/boards/${id}`, {
			headers: { Authorization: `Bearer ${String(authTokens.access)}` },
		});
		const data = await response.json();

		if (response.status === 200) {
			setBoard(data);
		} else if (response.statusText === 'Unauthorized') {
			logoutUser();
		}
	};

	useEffect(() => {
		getBoard();
	}, [id]);

	return (
		<Container
			disableGutters
			maxWidth="false"
			sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}
		>
			<Typography
				align="center"
				sx={{ my: 4 }}
				variant="h4"
			>
				{board && board.title}
			</Typography>
			<Box
				sx={{
					display: 'flex',
					flexGrow: 1,
					gap: 1,
					overflow: 'auto',
					px: 2,
				}}
			>
				{board && board.lists.map((list) => (
					<Paper
						elevation={0}
						key={list.id}
						sx={{
							backgroundColor: 'grey.900',
							flexShrink: 0,
							height: 'min-content',
							p: 1,
							width: 288,
						}}
					>
						<Typography
							fontWeight={600}
							sx={{ px: 1, py: 0.5 }}
						>
							{list.title}
						</Typography>
						{list.cards.map((card) => (
							<Paper
								elevation={2}
								key={card.id}
								sx={{
									backgroundColor: 'grey.900',
									mt: 1,
									p: 1,
								}}
							>
								{card.title}
							</Paper>
						))}
						<AddCard getBoard={getBoard} list={list} />
					</Paper>
				))}
				<AddList board={board} getBoard={getBoard} />
			</Box>
		</Container>
	);
}
