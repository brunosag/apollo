import React, { useContext, useState } from 'react';
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

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	return (
		<div>
			<Button
				disableElevation
				color="inherit"
				onClick={handleOpen}
				variant="contained"
				sx={{
					':hover': {
						backgroundColor: 'hsl(0, 0%, 88%)',
					},
					aspectRatio: '16/9',
					backgroundColor: 'grey.200',
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
							await fetch('api/boards/', {
								method: 'POST',
								headers: {
									Authorization:
										`Bearer ${String(authTokens.access)}`,
									'Content-Type': 'application/json',
								},
								body: JSON.stringify({ title }),
							});
							getBoards();
							handleClose();
						}}
					>
						Create
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
