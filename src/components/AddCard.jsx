import React, { useContext, useRef, useState } from 'react';
import { useDetectClickOutside } from 'react-detect-click-outside';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonBase from '@mui/material/ButtonBase';
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
	const inputWrapper = useDetectClickOutside({
		disableKeys: true,
		onTriggered: (e) => {
			if (!openButton.current.contains(e.target)) {
				setOpen(false);
			}
		},
	});

	const handleOpen = async () => {
		await setOpen(true);
		const titleInput = await inputWrapper.current.querySelector('textarea');
		titleInput.focus();
		titleInput.select();
	};

	const handleClose = () => {
		setOpen(false);
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
					order: list.cards.length + 1,
				}),
			});
			await getBoard();
			setTitle('');
		}
		handleOpen();
	};

	const handleKeyUp = (e) => {
		if (e.key === 'Escape') {
			handleClose();
		} else if (e.key === 'Enter') {
			addCard();
		}
	};

	const handleChange = (e) => {
		if (!e.target.value.includes('\n')) {
			setTitle(e.target.value);
		}
	};

	return (
		<Box sx={{ height: 'min-content' }}>
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
					mt: 1,
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
					mt: 1,
				}}
			>
				<TextField
					autoFocus
					fullWidth
					multiline
					label="Card title"
					onChange={handleChange}
					onKeyUp={handleKeyUp}
					size="small"
					sx={{ backgroundColor: 'hsl(0, 0%, 11%)' }}
					value={title}
					variant="filled"
				/>
				<Box
					sx={{
						alignItems: 'center',
						display: 'flex',
						gap: 1,
						mt: 1,
					}}
				>
					<Button
						onClick={addCard}
						size="small"
						variant="contained"
					>
						Add card
					</Button>
					<ButtonBase
						disableTouchRipple
						onClick={handleClose}
					>
						<CloseIcon sx={{ color: 'grey.500', fontSize: 26 }} />
					</ButtonBase>
				</Box>
			</Paper>
		</Box>
	);
}
