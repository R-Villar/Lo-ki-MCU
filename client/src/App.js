import './App.css';
import { useEffect, useState } from 'react'
import {Route, Switch} from "react-router-dom";
import Home from './components/Home';
import Signup from './components/register/Signup';
import Login from './components/register/Login';
import NavBar from './components/NavBar';
import ComicPage from './components/ComicPage';
import DiscussionsPage from './components/discussions/DiscussionsPage';
import ComicDiscussion from './components/discussions/ComicDiscussion';

function App() {
	const [comicData, SetComicData] = useState([]);
	const [currentUser, setCurrentUser] = useState('');
	const [errors, setErrors] = useState([])
	const [setComic, setSelectedComic] = useState({});
	const [ selectedDiscussionComic, setSelectedDiscussionComic ] = useState({})
	const [ dbComicData, setDbComicData ] = useState([])
	const [ search, setSearch ] = useState('hulk')
	// console.log(selectedDiscussionComic)

	function deletePost(selected) {
		const updatedPosts = selectedDiscussionComic.posts.filter((post) => post.id !== selected) 
		console.log('to delete', selected, 'discuss', selectedDiscussionComic.posts)
		setSelectedDiscussionComic(updatedPosts)
		console.log(updatedPosts)
	}
	// deletePost()
	// fetch comic data
	useEffect(() => {
		fetch(`/api-comics`)
			.then((res) => res.json())
			.then((data) => SetComicData(data));
	}, []);

	useEffect(() => {
		fetch("/me").then((res) => {
			if (res.ok) {
				res.json().then((user) => {
					setCurrentUser(user);
				});
			}else {res.json().then((json) => setErrors(json.errors))}
		});
	}, []);

	// adds comic to discussions page.
	const updateDbComics = (addedComic) => {
		setDbComicData([...dbComicData, addedComic])
	}

	// fetch data from DB
	const dBFetch = () => {
		fetch(`/comics`)
			.then((res) => res.json())
			.then((data) => setDbComicData(data));
	} 

	useEffect(() => {
		dBFetch()
	}, []);


  	return (
		<div className='App'>
			<div>
				{currentUser? <h1>welcome {currentUser.username}</h1> : null}
			</div>
			<NavBar setSearch={setSearch} setCurrentUser={setCurrentUser} />
			<Switch>
				<Route exact path='/'>
					<Home
						setSelectedComic={setSelectedComic}
						comicData={comicData}
					/>
				</Route>
				<Route path='/signup'>
					<Signup setCurrentUser={setCurrentUser} />
				</Route>
				<Route path='/login'>
					<Login setCurrentUser={setCurrentUser} />
				</Route>
				<Route path='/comic-page'>
					<ComicPage
						dBFetch={dBFetch}
						updateDbComics={updateDbComics}
						currentUser={currentUser}
						setComic={setComic}
					/>
				</Route>

				<Route path='/discussions'>
					<DiscussionsPage
						// setDbComicData={setDbComicData}
						dbComicData={dbComicData}
						setSelectedDiscussionComic={setSelectedDiscussionComic}
					/>
				</Route>
				<Route path='/testfornow'>
					<ComicDiscussion
						dBFetch={dBFetch}
						deletePost={deletePost}
						// setUpdatedPost={setUpdatedPost}
						setDbComicData={setDbComicData}
						selectedDiscussionComic={selectedDiscussionComic}
					/>
				</Route>
			</Switch>
		</div>
  	);
}

export default App;
