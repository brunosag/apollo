import React, { useContext, useEffect, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
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
	const { id } = useParams();
	const [board, setBoard] = useState(null);

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

	const getList = async (listId) => {
		const response = await
		fetch(`api/lists/${listId}`, {
			method: 'GET',
			headers: { Authorization: `Bearer ${String(authTokens.access)}` },
		});
		const data = await response.json();
		return data;
	};

	useEffect(() => {
		getBoard();
	}, [id]);

	const findListIndex = (listId) => {
		let listIndex;
		for (let i = 0; i < board.lists.length; i += 1) {
			if (board.lists[i].id === listId) {
				listIndex = i;
				break;
			}
		}
		return listIndex;
	};

	const adjustIndexes = (array) => {
		const arrayCopy = array;
		for (let i = 0; i < array.length; i += 1) {
			arrayCopy[i].index = i;
		}
		return arrayCopy;
	};

	const deleteList = async (list) => {
		const lists = JSON.parse(JSON.stringify(board.lists));
		lists.splice(list.index, 1);
		setBoard({ ...board, lists });
		await fetch(`api/lists/${list.id}`, {
			method: 'DELETE',
			headers: { Authorization: `Bearer ${String(authTokens.access)}` },
		});
		adjustIndexes(lists);
		await fetch(`api/boards/${board.id}`, {
			method: 'PATCH',
			headers: {
				Authorization: `Bearer ${String(authTokens.access)}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ lists }),
		});
	};

	const deleteCard = async (card) => {
		const lists = JSON.parse(JSON.stringify(board.lists));
		const listIndex = findListIndex(card.list);
		const { cards } = lists[listIndex];
		cards.splice(card.index, 1);
		setBoard({ ...board, lists });
		await fetch(`api/cards/${card.id}`, {
			method: 'DELETE',
			headers: { Authorization: `Bearer ${String(authTokens.access)}` },
		});
		adjustIndexes(cards);
		fetch(`api/lists/${card.list}`, {
			method: 'PATCH',
			headers: {
				Authorization: `Bearer ${String(authTokens.access)}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ cards }),
		});
	};

	const handleOnDragEnd = async (result) => {
		if (!result.destination) return;
		const { source, destination } = result;
		if (source.droppableId === destination.droppableId
			&& source.index === destination.index) return;

		const lists = JSON.parse(JSON.stringify(board.lists));

		// same list
		if (source.droppableId === destination.droppableId) {
			const listIndex = findListIndex(Number(source.droppableId));
			const { cards } = lists[listIndex];
			const [movedCard] = cards.splice(source.index, 1);
			cards.splice(destination.index, 0, movedCard);
			setBoard({ ...board, lists });
			adjustIndexes(cards);

		// different list
		} else {
			const sourceIndex = findListIndex(Number(source.droppableId));
			const destinationIndex = findListIndex(Number(
				destination.droppableId,
			));
			const sourceCards = lists[sourceIndex].cards;
			const destinationCards = lists[destinationIndex].cards;
			const [movedCard] = sourceCards.splice(source.index, 1);
			destinationCards.splice(destination.index, 0, movedCard);
			setBoard({ ...board, lists });
			destinationCards[destination.index].list = Number(
				destination.droppableId,
			);
			adjustIndexes(sourceCards);
			adjustIndexes(destinationCards);
		}

		fetch(`api/boards/${board.id}`, {
			method: 'PATCH',
			headers: {
				Authorization: `Bearer ${String(authTokens.access)}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ lists }),
		});
	};

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
				<DragDropContext onDragEnd={handleOnDragEnd}>
					{board && board.lists.map((list) => (
						<List
							deleteCard={deleteCard}
							deleteList={deleteList}
							getBoard={getBoard}
							getList={getList}
							key={list.id}
							list={list}
						/>
					))}
				</DragDropContext>
				<AddList board={board} getBoard={getBoard} />
			</Container>
		</Box>
	);
}
