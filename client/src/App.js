import './App.css';
import { useEffect, useState } from 'react'
import {Route, Switch} from "react-router-dom";
import Home from './components/Home';
import Signup from './components/register/Signup';
import Login from './components/register/Login';
import NavBar from './components/NavBar';
import ComicPage from './components/ComicPage';

function App() {
	const [comicData, SetComicData] = useState([]);
	const [currentUser, setCurrentUser] = useState([]);
	const [errors, setErrors] = useState([])
	const [setComic, setSelectedComic] = useState({});


	// fetch comic data
	useEffect(() => {
		fetch(`/comics`)
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

	console.log(errors)
	console.log(currentUser)
	console.log(setComic);
	

  return (
		<div className='App'>
			<>welcome {currentUser.username}</>
			<NavBar />
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
					<ComicPage currentUser={currentUser} setComic={setComic} />
				</Route>
			</Switch>
		</div>
  );
}

export default App;
