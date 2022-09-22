import { NavLink } from "react-router-dom"
export default function NavBar() {

    return (
		<div>
			<NavLink to='/'>Home</NavLink>
			<NavLink to='/signup'>signup</NavLink>
			<NavLink to='/login'>Login</NavLink>
			<NavLink to='/comic-page'>Comic</NavLink>
		</div>
	);
}