import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import AuthContext from './AuthContext';

export default function CreateBoard({ getBoards }) {
	const { authTokens } = useContext(AuthContext);
	const [open, setOpen] = useState(false);
	const [title, setTitle] = useState('');
	const navigate = useNavigate();

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const createBoard = async () => {
		if (title.trim()) {
			const response = await fetch('api/boards/', {
				method: 'POST',
				headers: {
					Authorization:
						`Bearer ${String(authTokens.access)}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ title }),
			});
			const data = await response.json();
			navigate(`/${data.id}`);
			getBoards();
		}
	};

	const handleKeyUp = (e) => {
		if (e.key === 'Escape') {
			handleClose();
		} else if (e.key === 'Enter') {
			createBoard();
		}
	};

	const handleChange = async (e) => {
		if (!e.target.value.includes('\n')) {
			setTitle(e.target.value);
		}
	};

	return (
		<div>
			<Button
				disableElevation
				onClick={handleOpen}
				variant="contained"
				sx={{
					':hover': {
						backgroundColor: 'hsla(0, 0%, 100%, 0.08)',
					},
					aspectRatio: '16/9',
					backgroundColor: 'hsla(0, 0%, 100%, 0.05)',
					textTransform: 'none',
					width: '100%',
				}}
			>
				<Typography color="text.disabled" fontSize="large">
					Create new board
				</Typography>
			</Button>
			<Dialog fullWidth maxWidth="sm" onClose={handleClose} open={open}>
				<DialogTitle>Create board</DialogTitle>
				<DialogContent>
					<TextField
						autoFocus
						fullWidth
						id="title"
						inputProps={{ maxLength: 128 }}
						label="Board title"
						margin="dense"
						name="title"
						onChange={handleChange}
						onKeyUp={handleKeyUp}
						value={title}
						variant="standard"
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button onClick={createBoard}>Create</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
