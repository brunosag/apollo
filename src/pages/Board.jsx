import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import AddList from '../components/AddList';
import AuthContext from '../components/AuthContext';
import BoardOptions from '../components/BoardActions';
import BoardTitle from '../components/BoardTitle';
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
			return data;
		} if (response.statusText === 'Unauthorized') {
			logoutUser();
		}
		return null;
	};

	useEffect(() => {
		getBoard();
	}, [id]);

	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
			<Container
				maxWidth="false"
				sx={{
					alignItems: 'center',
					display: 'flex',
					gap: 4,
					justifyContent: 'space-between',
					py: 4,
				}}
			>
				{board && <BoardTitle board={board} getBoard={getBoard} />}
				<BoardOptions id={id} />
			</Container>
			<Container
				maxWidth="false"
				sx={{
					display: 'flex',
					flexGrow: 1,
					gap: 1,
					overflow: 'auto',
					pb: 2,
				}}
			>
				{board && board.lists.map((list) => (
					<List
						board={board}
						getBoard={getBoard}
						key={list.id}
						list={list}
					/>
				))}
				<AddList board={board} getBoard={getBoard} />
			</Container>
		</Box>
	);
}
