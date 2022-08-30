import React, { useContext, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AuthContext from '../components/AuthContext';

export default function Home() {
	const { authTokens, logoutUser, user } = useContext(AuthContext);
	const [boards, setBoards] = useState([]);

	const baseURL = 'http://127.0.0.1:8000/api/';

	const getBoards = async () => {
		const response = await fetch(`${baseURL}boards/`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${String(authTokens.access)}`,
				'Content-Type': 'application/json',
			},
		});
		const data = await response.json();

		if (response.status === 200) {
			setBoards(data);
		} else if (response.statusText === 'Unauthorized') {
			logoutUser();
		}
	};

	useEffect(() => {
		getBoards();
	}, []);

	return (
		<Box
			align="center"
			sx={{
				display: 'flex',
				flexDirection: 'column',
				gap: 1,
				height: '100vh',
				justifyContent: 'center',
			}}
		>
			<Typography variant="h2">
				hello,
				{' '}
				{user.username}
			</Typography>
			{boards.map((board) => (board.title))}
			<Button onClick={logoutUser}>Logout</Button>
		</Box>
	);
}
