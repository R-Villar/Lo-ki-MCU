import { NavLink, useHistory } from "react-router-dom"
import { useState } from 'react'
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';



export default function NavBar({setCurrentUser, currentUser}) {
	const history = useHistory();
	const [anchorElNav, setAnchorElNav] = useState(null);
	const [anchorElUser, setAnchorElUser] = useState(null);
	const pages = currentUser ? ["home", "Discussions"] : ["home"] 

	const settings = currentUser
	? ["SignOut"]
	: ["SignUp", "LogIn"]; 

	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	const handleLogout = () => {
		fetch("/logout", {method: "DELETE"}).then((res) => {
			if (res.ok) {
				setCurrentUser('');
				history.push('/home');
			}
		});
	};

	return (
		<AppBar position='sticky'>
			<Container maxWidth='xl'>
				<Toolbar disableGutters>
					<LocalLibraryIcon 
						sx={{display: {xs: "none", md: "flex"}, mr: 1}}
					/>
					<Typography
							variant='h4'
							noWrap
							as={NavLink}
							to='/home'
							sx={{
								mr: 2,
								display: {xs: "none", md: "flex"},
								fontFamily: "monospace",
								fontWeight: 700,
								letterSpacing: ".3rem",
								color: "inherit",
								textDecoration: "none",
							}}
					>
							Lo-ki MCU
					</Typography>
					{/* Menu for mobile screens */}
					<Box sx={{flexGrow: 1, display: {xs: "flex", md: "none"}}}>
						<IconButton
							size='large'
							aria-label='account of current user'
							aria-controls='menu-appbar'
							aria-haspopup='true'
							onClick={handleOpenNavMenu}
							color='inherit'
						>
							<MenuIcon />
						</IconButton>
						<Menu
							id='menu-appbar'
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: "bottom",
								horizontal: "left",
							}}
							keepMounted
							transformOrigin={{
								vertical: "top",
								horizontal: "left",
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{
								display: {xs: "block", md: "none"},
							}}
						>
							{pages.map((page) => (
								<MenuItem
									key={page}
									onClick={handleCloseNavMenu}
								>
									<Typography
										as={NavLink}
										to={`/${page}`}
										textAlign='center'
									>
										{page}
									</Typography>
								</MenuItem>
							))}
						</Menu>
					</Box>
					{/* Menu for desktop screens */}
					<Typography
						variant='h5'
						noWrap
						component='a'
						as={NavLink}
						to='/home'
						sx={{
							mr: 2,
							display: {xs: "flex", md: "none"},
							flexGrow: 1,
							fontFamily: "monospace",
							fontWeight: 700,
							letterSpacing: ".3rem",
							color: "inherit",
							textDecoration: "none",
						}}
					>
						Lo-ki MCU
					</Typography>
					<Box sx={{flexGrow: 1, display: {xs: "none", md: "flex"}}}>
						{pages.map((page) => (
							<Button key={page}>
								<Typography
									as={NavLink}
									to={`/${page}`}
									key={page}
									onClick={handleCloseNavMenu}
									sx={{
										my: 2,
										color: "white",
										display: "block",
										textDecoration: "none"
									}}
								>
									{page}
								</Typography>
							</Button>
						))}
					</Box>
					{/* Login user */}
					<Box sx={{flexGrow: 0}}>
						<Tooltip title='Open settings'>
							<IconButton
								onClick={handleOpenUserMenu}
								sx={{p: 0}}
							>
								{/* Avatar for User */}
								<Avatar
									alt=''
									src={ currentUser ? (currentUser.icon) : ('/static/images/avatar/2.jpg')}
								/>
							</IconButton>
						</Tooltip>
						<Menu
							sx={{mt: "45px"}}
							id='menu-appbar'
							anchorEl={anchorElUser}
							anchorOrigin={{
								vertical: "top",
								horizontal: "right",
							}}
							keepMounted
							transformOrigin={{
								vertical: "top",
								horizontal: "right",
							}}
							open={Boolean(anchorElUser)}
							onClose={handleCloseUserMenu}
						>
							{settings.map((setting) => (
								<MenuItem
									key={setting}
									onClick={handleCloseUserMenu}
								>
										<Typography
											onClick={handleLogout}
											as={NavLink}
											to={`/${setting}`}
											textAlign='center'
											sx={{textDecoration: "none"}}
										>
											{setting}
										</Typography>
								</MenuItem>
							))}
						</Menu>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
}