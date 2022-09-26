import React, { useContext, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import AuthContext from './AuthContext';

export default function BoardOptions({ id }) {
	const { getBoards, handleSnackbarOpen } = useOutletContext();
	const { authTokens } = useContext(AuthContext);
	const [anchorEl, setAnchorEl] = useState(null);
	const [dialogOpen, setDialogOpen] = useState(false);
	const navigate = useNavigate();
	const open = Boolean(anchorEl);

	const handleClick = (e) => setAnchorEl(e.currentTarget);
	const handleClose = () => setAnchorEl(null);

	const handleDialogOpen = () => setDialogOpen(true);
	const handleDialogClose = () => setDialogOpen(false);

	const deleteBoard = async () => {
		await fetch(`api/boards/${id}`, {
			method: 'DELETE',
			headers: { Authorization: `Bearer ${String(authTokens.access)}` },
		});
		await getBoards();
		await navigate('/');
		handleSnackbarOpen();
	};

	return (
		<Box>
			<Button
				aria-controls={open ? 'board-options-menu' : undefined}
				aria-expanded={open ? 'true' : undefined}
				aria-haspopup="true"
				color="inherit"
				id="board-options-button"
				onClick={handleClick}
				size="small"
				variant="contained"
				endIcon={(
					<KeyboardArrowDownIcon
						sx={{ color: 'grey.600' }}
					/>
				)}
				sx={{
					':hover': {
						backgroundColor: 'rgba(255, 255, 255, 0.1)',
					},
					backgroundColor: 'rgba(255, 255, 255, 0.062)',
				}}
			>
				<Typography color="textSecondary">...</Typography>
			</Button>

			<Menu
				anchorEl={anchorEl}
				id="board-options-menu"
				onClose={handleClose}
				open={open}
				sx={{ mt: 1 }}
				MenuListProps={{
					'aria-labelledby': 'board-options-button',
				}}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'right',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
			>
				<Box
					sx={{
						alignItems: 'center',
						display: 'flex',
						justifyContent: 'space-between',
						px: 1,
						py: 0.125,
						width: 288,
					}}
				>
					<Box sx={{ height: 34, width: 34 }} />
					<Typography color="textSecondary">Board options</Typography>
					<IconButton
						onClick={handleClose}
						size="small"
						sx={{ color: 'text.disabled' }}
					>
						<CloseIcon />
					</IconButton>
				</Box>
				<Divider sx={{ my: 1 }} />
				<MenuItem
					onClick={handleDialogOpen}
					sx={{ color: 'error.main' }}
				>
					Delete board
				</MenuItem>
			</Menu>

			<Dialog
				aria-describedby="alert-dialog-description"
				aria-labelledby="alert-dialog-title"
				onClose={handleDialogClose}
				open={dialogOpen}
			>
				<DialogTitle id="alert-dialog-title">
					Delete board?
				</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						All lists and cards will be deleted.
						This is not reversible.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button
						color="inherit"
						onClick={handleDialogClose}
						sx={{ color: 'text.secondary' }}
					>
						Cancel
					</Button>
					<Button
						autoFocus
						color="error"
						onClick={deleteBoard}
					>
						Delete
					</Button>
				</DialogActions>
			</Dialog>
		</Box>
	);
}
