import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import AddList from '../components/AddList';
import AuthContext from '../components/AuthContext';
import BoardOptions from '../components/BoardActions';
import List from '../components/List';

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
		<Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
			<Container
				maxWidth
				sx={{
					alignItems: 'center',
					display: 'flex',
					justifyContent: 'space-between',
					my: 4,
				}}
			>
				<Typography
					align="center"
					variant="h4"
				>
					{board && board.title}
				</Typography>
				<BoardOptions id={id} />
			</Container>
			<Container
				maxWidth
				sx={{
					display: 'flex',
					flexGrow: 1,
					gap: 1,
					overflow: 'auto',
				}}
			>
				{board && board.lists.map((list) => (
					<List getBoard={getBoard} list={list} />
				))}
				<AddList board={board} getBoard={getBoard} />
			</Container>
		</Box>
	);
}
