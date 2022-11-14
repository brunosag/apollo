/* eslint-disable react/jsx-no-duplicate-props */
import React, { useContext, useRef, useState } from 'react';
import { useDetectClickOutside } from 'react-detect-click-outside';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import AuthContext from './AuthContext';

export default function AddCard({ getBoard, list }) {
	const { authTokens } = useContext(AuthContext);
	const [open, setOpen] = useState(false);
	const [title, setTitle] = useState('');
	const openButton = useRef();

	const handleChange = (e) => {
		if (!e.target.value.includes('\n')) {
			setTitle(e.target.value);
		}
	};

	const addCard = async () => {
		if (title.trim()) {
			await fetch('api/cards/', {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${String(authTokens.access)}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					title,
					list: list.id,
					index: list.cards.length,
				}),
			});
			await getBoard();
			setTitle('');
		}
	};

	const handleClose = () => {
		setOpen(false);
	};

	const inputWrapper = useDetectClickOutside({
		disableKeys: true,
		onTriggered: async (e) => {
			if (!openButton.current.contains(e.target)) {
				await addCard();
				handleClose();
			}
		},
	});

	const handleOpen = async () => {
		await setOpen(true);
		const titleInput = await inputWrapper.current.querySelector('textarea');
		titleInput.focus();
		titleInput.select();
	};

	const handleConfirm = async () => {
		await addCard();
		handleOpen();
	};

	const handleKeyUp = (e) => {
		if (e.key === 'Escape') {
			handleClose();
		} else if (e.key === 'Enter') {
			handleConfirm();
		}
	};

	return (
		<Box sx={{ height: 'min-content', px: 1 }}>
			<Button
				disableRipple
				fullWidth
				color="inherit"
				onClick={handleOpen}
				ref={openButton}
				sx={{
					':hover': {
						backgroundColor: '#2a2a2a',
					},
					display: open ? 'none' : 'inline-flex',
					justifyContent: 'start',
					mb: 1,
					px: 1,
					py: 0.5,
					textTransform: 'none',
				}}
			>
				<Box sx={{
					alignItems: 'center',
					display: 'flex',
					gap: 0.5,
				}}
				>
					<AddIcon
						fontSize="small"
						sx={{ color: 'grey.600' }}
					/>
					<Typography color="textSecondary">Add a card</Typography>
				</Box>
			</Button>

			<Paper
				elevation={0}
				ref={inputWrapper}
				sx={{
					backgroundColor: 'grey.900',
					display: open ? 'block' : 'none',
					mb: 1,
				}}
			>
				<TextField
					fullWidth
					multiline
					InputProps={{ sx: { p: 0 } }}
					onChange={handleChange}
					onKeyUp={handleKeyUp}
					placeholder="Card title"
					size="small"
					value={title}
					variant="filled"
					inputProps={{
						maxLength: 128,
						sx: {
							letterSpacing: '0.02857em',
							p: 1,
						},
					}}
				/>
				<Box
					sx={{
						alignItems: 'center',
						display: 'flex',
						justifyContent: 'space-between',
						mt: 1,
					}}
				>
					<Button
						onClick={handleConfirm}
						size="small"
						variant="contained"
					>
						Add card
					</Button>
					<Button
						color="inherit"
						onClick={handleClose}
						size="small"
						sx={{
							':hover': {
								backgroundColor: '#2a2a2a',
							},
							minWidth: 0,
							padding: 0.75,
						}}
					>
						<CloseIcon
							fontSize="small"
							sx={{ color: 'grey.600' }}
						/>
					</Button>
				</Box>
			</Paper>
		</Box>
	);
}
