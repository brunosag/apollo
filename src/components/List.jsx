/* eslint-disable react/jsx-no-duplicate-props */
import React, { useContext, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import AddCard from './AddCard';
import AuthContext from './AuthContext';
import Card from './Card';
import ListActions from './ListActions';

export default function List({ getBoard, list }) {
	const { authTokens } = useContext(AuthContext);
	const [open, setOpen] = useState(false);
	const [title, setTitle] = useState(list.title);
	const titleInput = useRef();
	const listActions = useRef();
	const deleteListModal = useRef();

	const updateTitle = async () => {
		if (title.trim()) {
			await fetch(`api/lists/${list.id}`, {
				method: 'PATCH',
				headers: {
					Authorization: `Bearer ${String(authTokens.access)}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ title }),
			});
		}
		const newBoard = await getBoard();
		setTitle(newBoard.lists[list.order - 1].title);
	};

	const handleOpen = async () => {
		await setOpen(true);
		const inputElement = titleInput.current.querySelector('textarea');
		inputElement.focus();
		inputElement.select();
	};

	const handleClose = () => {
		updateTitle();
		setOpen(false);
	};

	const handleKeyUp = (e) => {
		if (e.key === 'Enter' || e.key === 'Escape') {
			handleClose();
		}
	};

	const handleChange = (e) => {
		if (!e.target.value.includes('\n')) {
			setTitle(e.target.value);
		}
	};

	const handleClick = (e) => {
		if (!listActions.current.contains(e.target)
		&& !deleteListModal.current.contains(e.target)) {
			handleOpen();
		}
	};

	return (
		<Paper
			elevation={0}
			sx={{
				backgroundColor: 'grey.900',
				flexShrink: 0,
				height: 'min-content',
				width: 288,
			}}
		>
			<Box
				onClick={handleClick}
				sx={{
					cursor: 'pointer',
					display: 'flex',
					justifyContent: 'space-between',
					p: 1,
				}}
			>
				<Typography
					fontWeight={600}
					sx={{
						display: open ? 'none' : 'block',
						px: 1,
						py: 0.5,
						wordBreak: 'break-word',
					}}
				>
					{title}
				</Typography>
				<TextField
					fullWidth
					multiline
					InputProps={{ sx: { p: 0 } }}
					onBlur={handleClose}
					onChange={handleChange}
					onKeyUp={handleKeyUp}
					ref={titleInput}
					size="small"
					sx={{ display: open ? 'flex' : 'none' }}
					value={title}
					inputProps={{
						maxLength: 128,
						sx: {
							fontWeight: 600,
							lineHeight: 1.5,
							px: 1,
							py: 0.5,
						},
					}}
				/>
				<ListActions
					actionsButton={listActions}
					deleteModal={deleteListModal}
					getBoard={getBoard}
					list={list}
				/>
			</Box>
			{list.cards.map((card) => (
				<Card card={card} getBoard={getBoard} key={card.id} />
			))}
			<AddCard getBoard={getBoard} list={list} />
		</Paper>
	);
}
