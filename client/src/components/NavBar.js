import { NavLink } from "react-router-dom"
import { useEffect, useState } from 'react'



export default function NavBar({setCurrentUser, setSearch, currentUser}) {
	const [formData, setFormData] = useState('');

	const handleLogout = () => {
		fetch("/logout", {method: "DELETE"}).then((res) => {
			if (res.ok) {
				setCurrentUser('');
			}
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault()
		if(formData === ''){

		}else {
			setSearch(formData)
		}
	}

	const handleChange = (e) => {
		setFormData(e.target.value);
	}
	// console.log(formData)

	return (
		<div>
			<h1>Raters of the Galaxy</h1>
			<NavLink to='/'>Home</NavLink>
			{!currentUser? (<NavLink to='/signup'>signup</NavLink>): null}
			<NavLink to='/login'>Login</NavLink>
			{currentUser? (<NavLink to='/discussions'>Discussions</NavLink>): null}
			<form onClick={handleSubmit}>
				<input onChange={handleChange}/>
				<input type='submit'/>
			</form>	
			{currentUser? (<button onClick={handleLogout}>log out</button>): null}
		</div>
	);
}