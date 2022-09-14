import { useContext, useEffect, useState } from 'react';
import AuthContext from '../components/AuthContext';

export default function useBoards() {
	const { authTokens, logoutUser } = useContext(AuthContext);
	const [boards, setBoards] = useState([]);

	const getBoards = async () => {
		const response = await fetch('api/boards/', {
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

	return boards;
}
