import './App.css';
import { useEffect, useState } from 'react'
import {Route, Switch} from "react-router-dom";
import Home from './components/Home';
import Signup from './components/register/Signup';
import Login from './components/register/Login';
import NavBar from './components/NavBar';
import ComicPage from './components/ComicPage';

function App() {
const [data, SetData] = useState([]);

  useEffect(() => {
		// let baseUrl = `${API_URL}/v1/public/comics`;
		// let ts = Date.now().toString();
		// let hash = getHash(ts, privateKey, apiKey);

		fetch(`/comics`)
			.then((res) => res.json())
			.then((data) => SetData(data));
  }, []);


  return (
		<div className='App'>
			<NavBar />
			<Switch>
				<Route exact path='/'>
					<Home data={data} />
				</Route>
				<Route path='/signup'>
					<Signup />
				</Route>
				<Route path='/login'>
					<Login />
				</Route>
				<Route path='/comic-page'>
					<ComicPage />
				</Route>
			</Switch>
		</div>
  );
}

export default App;
