import { NavLink } from "react-router-dom"
export default function NavBar({setCurrentUser}) {

	const handleLogout = () => {
		fetch("/logout", {method: "DELETE"}).then((res) => {
			if (res.ok) {
				setCurrentUser('');
			}
		});
	};

	return (
		<div>
			<NavLink to='/'>Home</NavLink>
			<NavLink to='/signup'>signup</NavLink>
			<NavLink to='/login'>Login</NavLink>
			{/* <NavLink to='/testfornow'>Test</NavLink> */}
			<NavLink to='/discussions'>Discussions</NavLink>
			<button onClick={handleLogout}>log out</button>
		</div>
	);
}