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
			<NavLink to='/'>Home</NavLink>
			{!currentUser? (<NavLink to='/signup'>signup</NavLink>): null}
			<NavLink to='/login'>Login</NavLink>
			{/* <NavLink to='/testfornow'>Test</NavLink> */}
			<NavLink to='/discussions'>Discussions</NavLink>
			<form onClick={handleSubmit}>
				<input onChange={handleChange}/>
				<input type='submit'/>
			</form>
			<button onClick={handleLogout}>log out</button>
		</div>
	);
}