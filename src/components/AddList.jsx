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

export default function AddList({ board, getBoard }) {
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

	const addList = async () => {
		if (title.trim()) {
			await fetch('api/lists/', {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${String(authTokens.access)}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					title,
					board: board.id,
					order: board.lists.length + 1,
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
			addList();
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
				color="inherit"
				onClick={handleOpen}
				ref={openButton}
				sx={{
					':hover': {
						backgroundColor: 'rgba(255, 255, 255, 0.1)',
					},
					backgroundColor: 'rgba(255, 255, 255, 0.062)',
					display: open ? 'none' : 'inline-flex',
					flexShrink: 0,
					height: 'min-content',
					justifyContent: 'start',
					p: 1,
					textTransform: 'none',
					width: 288,
				}}
			>
				<Box sx={{
					alignItems: 'center',
					display: 'flex',
					gap: 0.5,
					px: 1,
					py: 0.5,
				}}
				>
					<AddIcon
						fontSize="small"
						sx={{ color: 'grey.600' }}
					/>
					<Typography color="textSecondary">Add a list</Typography>
				</Box>
			</Button>

			<Paper
				elevation={0}
				ref={inputWrapper}
				sx={{
					backgroundColor: 'grey.900',
					display: open ? 'block' : 'none',
					flexShrink: 0,
					height: 'min-content',
					p: 1,
					width: 288,
				}}
			>
				<TextField
					autoFocus
					fullWidth
					multiline
					inputProps={{ maxLength: 128 }}
					label="List title"
					onChange={handleChange}
					onKeyUp={handleKeyUp}
					size="small"
					value={title}
					variant="outlined"
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
						onClick={addList}
						size="small"
						variant="contained"
					>
						Add list
					</Button>
					<ButtonBase
						disableTouchRipple
						onClick={handleClose}
					>
						<CloseIcon sx={{ fontSize: 26 }} />
					</ButtonBase>
				</Box>
			</Paper>
		</Box>
	);
}
