import React from 'react';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

export default function Board() {
	const { id } = useParams();
	const board = {
		id,
		title: 'Board1',
		lists: [
			{
				title: 'List1',
				order: 1,
				cards: [
					{ title: 'Card1', order: 1 },
					{ title: 'Card2', order: 2 },
					{ title: 'Card3', order: 3 },
				],
			},
			{
				title: 'List2',
				order: 2,
				cards: [
					{ title: 'Card1', order: 1 },
					{ title: 'Card2', order: 2 },
				],
			},
		],
	};

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
				{board.title}
			</Typography>
			<Box
				sx={{
					display: 'flex',
					flexGrow: 1,
					overflow: 'auto',
					gap: 1,
					px: 2,
				}}
			>
				{board.lists.map((list) => (
					<Paper
						elevation={0}
						sx={{
							backgroundColor: 'grey.900',
							flexShrink: 0,
							height: 'min-content',
							p: 1,
							width: 288,
						}}
					>
						<Typography
							fontSize={16}
							fontWeight={600}
							sx={{ px: 1, py: 0.5 }}
						>
							{list.title}
						</Typography>
						{list.cards.map((card) => (
							<Paper
								elevation={2}
								sx={{
									backgroundColor: 'grey.900',
									mt: 1,
									p: 1,
								}}
							>
								{card.title}
							</Paper>
						))}
					</Paper>
				))}
			</Box>
		</Container>
	);
}
