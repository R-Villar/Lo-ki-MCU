import "./App.css";
import {useEffect, useState} from "react";
import {Route, Switch, useHistory} from "react-router-dom";
import Home from "./components/Home";
import Signup from "./components/register/Signup";
import Login from "./components/register/Login";
import NavBar from "./components/NavBar";
import ComicPageForm from "./components/ComicPageForm";
import DiscussionsPage from "./components/discussions/DiscussionsPage";
import ComicDiscussion from "./components/discussions/ComicDiscussion";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PropTypes from "prop-types";
import Toolbar from "@mui/material/Toolbar";
import Zoom from "@mui/material/Zoom";
import {Typography} from "@mui/material";

// scroll to the top of the page.
function ScrollTop(props) {
	const {children} = props;

	const trigger = useScrollTrigger({
		disableHysteresis: true,
		threshold: 100,
	});

	const handleClick = (event) => {
		const anchor = (event.target.ownerDocument || document).querySelector(
			"#back-to-top-anchor"
		);

		if (anchor) {
			anchor.scrollIntoView({
				behavior: "smooth",
				block: "center",
			});
		}
	};

	ScrollTop.propTypes = {
		children: PropTypes.element.isRequired,
	};

	return (
		<Zoom in={trigger}>
			<Box
				onClick={handleClick}
				role='presentation'
				sx={{position: "fixed", bottom: 16, right: 16}}
			>
				{children}
			</Box>
		</Zoom>
	);
}

function App(props) {
	const [apiComicData, SetApiComicData] = useState([]);
	const [currentUser, setCurrentUser] = useState("");
	const [change, setChange] = useState(false);
	const [errors, setErrors] = useState([]);
	const [selectedComic, setSelectedComic] = useState({});
	const [dbComicData, setDbComicData] = useState([]);
	const [userPost, setUserPost] = useState([]);
	const [page, setPage] = useState(1);
	const [search, setSearch] = useState("thor");
	const history = useHistory();

	// We start with an empty list of items.
	const [currentItems, setCurrentItems] = useState(null);
	const [pageCount, setPageCount] = useState(0);
	// Here we use item offsets; we could also use page offsets
	// following the API or data you're working with.
	const [itemOffset, setItemOffset] = useState(0);

	const itemsPerPage = 25;

	// search api
	useEffect(() => {
		fetch(`/api-search/${search}`)
			.then((res) => res.json())
			.then((data) => {
				SetApiComicData(data);
			});
	}, [search]);

	useEffect(() => {
		const endOffset = itemOffset + itemsPerPage;
		setCurrentItems(apiComicData.slice(itemOffset, endOffset));
		setPageCount(Math.ceil(apiComicData.length / itemsPerPage));
	}, [apiComicData, itemOffset]);

	// Invoke when user click to request another page.
	const handlePageClick = (e) => {
		const newOffset = (page * itemsPerPage) % apiComicData.length;
		setPage(e.currentTarget.textContent);
		setItemOffset(newOffset);
	};

	// fetch data from DB
	useEffect(() => {
		fetch(`/comics`).then((res) => {
			if (res.ok) {
				res.json().then(setDbComicData);
			} else {
				res.json().then((json) => setErrors(json.errors));
			}
		});
	}, [change]);

	// fetch user data
	useEffect(() => {
		fetch("/me").then((res) => {
			if (res.ok) {
				res.json().then((user) => {
					setCurrentUser(user);
				});
			} else {
				res.json().then((json) => setErrors(json.errors));
			}
		});
	}, []);
	console.log(errors);
	// prevents unregistered users from using routes
	useEffect(() => {
		if (!currentUser) {
			fetch("/me").then((res) => {
				if (!res.ok) {
					history.push("/login");
				}
			});
		}
	}, [currentUser, history]);

	// adds comic to discussions page.
	const updateDbComics = (addedComic) => {
		setDbComicData([...dbComicData, addedComic]);
	};

	// new posts
	const newPosts = (newPost) => {
		setUserPost([...userPost, newPost]);
	};

	// remove post
	const deletePosts = (postToDelete) => {
		const updatedPosts = userPost.filter(
			(post) => post.id !== postToDelete.id
		);
		setUserPost(updatedPosts);
	};

	// update post
	const updatePost = (postToUpdate) => {
		const updatedPost = userPost.map((post) =>
			post.id === postToUpdate.id ? postToUpdate : post
		);
		setUserPost(updatedPost);
	};

	return (
		<div className='App'>
			<NavBar currentUser={currentUser} setCurrentUser={setCurrentUser} />
			{/* <div> */}
			{currentUser ? (
				<Typography> Welcome, {currentUser.username}</Typography>
			) : null}
			<Toolbar id='back-to-top-anchor' />
			{/* </div> */}
			<Switch>
				<Route exact path='/home'>
					<Home
						handlePageClick={handlePageClick}
						pageCount={pageCount}
						setSearch={setSearch}
						setSelectedComic={setSelectedComic}
						apiComicData={currentItems}
					/>
				</Route>
				<Route path='/signup'>
					<Signup setCurrentUser={setCurrentUser} />
				</Route>
				<Route path='/login'>
					<Login setCurrentUser={setCurrentUser} />
				</Route>
				<Route path='/comic-page'>
					<ComicPageForm
						change={change}
						setChange={setChange}
						updateDbComics={updateDbComics}
						currentUser={currentUser}
						selectedComic={selectedComic}
					/>
				</Route>
				<Route path='/Discussions'>
					<DiscussionsPage dbComicData={dbComicData} />
				</Route>
				<Route path='/comics/:id'>
					<ComicDiscussion
						userPost={userPost}
						newPosts={newPosts}
						setUserPost={setUserPost}
						currentUser={currentUser}
						deletePosts={deletePosts}
						updatePost={updatePost}
					/>
				</Route>
			</Switch>
			<ScrollTop {...props}>
				<Fab
					color='secondary'
					size='small'
					aria-label='scroll back to top'
				>
					<KeyboardArrowUpIcon />
				</Fab>
			</ScrollTop>
		</div>
	);
}

export default App;
