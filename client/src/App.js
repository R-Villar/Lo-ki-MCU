import './App.css';
import { useEffect, useState } from 'react'
import {Route, Switch} from "react-router-dom";
import Home from './components/Home';
import Signup from './components/register/Signup';
import Login from './components/register/Login';
import NavBar from './components/NavBar';
import ComicPageForm from './components/ComicPageForm';
import DiscussionsPage from './components/discussions/DiscussionsPage';
import ComicDiscussion from './components/discussions/ComicDiscussion';
import {useHistory} from "react-router-dom";


function App() {
	const [apiComicData, SetApiComicData] = useState([]);
	const [currentUser, setCurrentUser] = useState('');
	const [ change, setChange ] =useState(false)
	const [errors, setErrors] = useState([])
	const [selectedComic, setSelectedComic] = useState({});
	const [ dbComicData, setDbComicData ] = useState([])
	const [userPost, setUserPost ] = useState([])
	const [ search, setSearch ] = useState('thor')
	const history = useHistory();

	console.log(errors)
	// search api
	useEffect(() => {
		fetch(`/api-search/${search}`)
			.then((res) => res.json())
			.then((data) => SetApiComicData(data));
	}, [search]);

	// fetch data from DB
	useEffect(() => {
		fetch(`/comics`)
			.then((res) => {
				if(res.ok) {
					res.json().then(setDbComicData)
				}else {
					res.json().then((json) => setErrors(json.errors))
				}
			})
	}, [change]);

	// fetch user data
	useEffect(() => {
		fetch("/me").then((res) => {
			if (res.ok) {
				res.json().then((user) => {
					setCurrentUser(user);
				});
			}else {res.json().then((json) => setErrors(json.errors))}
		});
	}, []);

	// prevents unregistered users from using routes
	useEffect(() => {
		if (!currentUser) {
			fetch('/me')
			.then(res => {
				if (!res.ok){
					history.push('/login');
				}
			})
		}
	}, [currentUser])

	// adds comic to discussions page.
	const updateDbComics = (addedComic) => {
		setDbComicData([...dbComicData, addedComic])
	}

	// new posts
	const newPosts = (newPost) => {
        setUserPost([...userPost, newPost])
    }

	// remove post
    const deletePosts = (postToDelete) => {
        const updatedPosts = userPost.filter((post) => post.id !== postToDelete.id)
		setUserPost(updatedPosts)
    }

	// update post
	const updatePost = (postToUpdate) => {
		const updatedPost = userPost.map((post) => 
		post.id === postToUpdate.id ? postToUpdate : post
		)
		setUserPost(updatedPost)
	}

  	return (
		<div className='App'>
			<NavBar currentUser={currentUser} setSearch={setSearch} setCurrentUser={setCurrentUser}/>
			<div>
				{currentUser? <h4>Welcome, {currentUser.username}</h4> : null}
			</div>
			{/* {errors ? <div>{errors}</div> : null} */}
			<Switch>
				<Route exact path='/home'>
					<Home
						setSelectedComic={setSelectedComic}
						apiComicData={apiComicData}
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
					<DiscussionsPage
						dbComicData={dbComicData}
					/>
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
		</div>
  	);
}

export default App;
