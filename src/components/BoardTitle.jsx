import React, { useContext, useEffect, useRef, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import AuthContext from './AuthContext';

export default function BoardTitle({ board, getBoard }) {
	const { getBoards } = useOutletContext();
	const { authTokens } = useContext(AuthContext);
	const [open, setOpen] = useState(false);
	const [title, setTitle] = useState(board.title);
	const [titleWidth, setTitleWidth] = useState(0);
	const titleInput = useRef();
	const titleSpan = useRef();

	useEffect(() => {
		setTitleWidth(titleSpan.current.offsetWidth);
	}, []);

	useEffect(() => {
		setTitle(board.title);
	}, [board]);

	const updateTitle = async () => {
		if (title.trim()) {
			await fetch(`api/boards/${board.id}`, {
				method: 'PATCH',
				headers: {
					Authorization: `Bearer ${String(authTokens.access)}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ title: title.trim() }),
			});
		}
		const newBoard = await getBoard();
		setTitle(newBoard.title);
		getBoards();
	};

	const handleOpen = async () => {
		await setOpen(true);
		const inputElement = titleInput.current.querySelector('input');
		inputElement.focus();
		inputElement.select();
	};

	const handleClose = () => {
		updateTitle();
		setOpen(false);
	};

	const handleKeyUp = (e) => {
		if (e.key === 'Escape' || e.key === 'Enter') {
			handleClose();
		}
	};

	const handleChange = async (e) => {
		if (!e.target.value.includes('\n')) {
			await setTitle(e.target.value);
			setTitleWidth(titleSpan.current.offsetWidth);
		}
	};

	return (
		<Box sx={{
			overflow: 'hidden',
			position: 'relative',
			width: 'calc(100% - 6rem)',
		}}
		>
			<Button
				disableRipple
				color="inherit"
				onClick={handleOpen}
				sx={{
					':hover': {
						backgroundColor: 'rgb(28, 28, 28)',
					},
					display: open ? 'none' : 'inline',
					height: '3.3125rem',
					maxWidth: '100%',
					minWidth: 'auto',
					textTransform: 'none',
				}}
			>
				<Typography
					align="center"
					sx={{ textOverflow: 'ellipsis', overflow: 'hidden' }}
					variant="h4"
				>
					{title}
				</Typography>
			</Button>
			<TextField
				onBlur={handleClose}
				onChange={handleChange}
				onKeyUp={handleKeyUp}
				ref={titleInput}
				size="small"
				value={title}
				inputProps={{
					maxLength: 128,
					sx: {
						fontSize: '2.125rem',
						height: 'auto',
						letterSpacing: '0.00735em',
						px: 1,
						py: 0.75,
					},
				}}
				sx={{
					display: open ? 'inline-flex' : 'none',
					maxWidth: '100%',
					p: 0,
					width: titleWidth,
				}}
			/>
			<Typography
				align="center"
				ref={titleSpan}
				variant="h4"
				sx={{
					opacity: 0,
					whiteSpace: 'pre-wrap',
					position: 'absolute',
					px: 1,
					py: 0.75,
				}}
			>
				{title}
			</Typography>
		</Box>
	);
}
