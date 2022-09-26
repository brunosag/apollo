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
						label="Board title"
						margin="dense"
						name="title"
						onChange={(e) => setTitle(e.target.value)}
						variant="standard"
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button
						onClick={async () => {
							const response = await
							fetch('api/boards/', {
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
						}}
					>
						Create
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
