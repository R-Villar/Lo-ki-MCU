import {useState} from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import {useHistory} from "react-router-dom";

export default function Login({setCurrentUser}) {
	const history = useHistory();
	const [formData, setFormData] = useState({});
	const [errors, setErrors] = useState([]);
	// user input for username and password
	const handleChange = (e) => {
		setFormData((formData) => ({
			...formData,
			[e.target.name]: e.target.value,
		}));
	};


	function onSubmit(e) {
		e.preventDefault()

		fetch("login", {
			method: "POST",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify(formData),
		}).then((res) => {
			if(res.ok) {
				res.json().then((user) => {
					setCurrentUser(user)
					history.push('/home');
				})
			}else {
				res.json().then((json) => setErrors(json.errors));
			}
		})
	}

	// cancel button sends user back to the home page
	const handleCancel = () => {
		history.push('/home')
	}

	console.log(errors)
	return (
		<Box
			onSubmit={onSubmit}
			spacing={5}
			component='form'
			noValidate
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				"& > :not(style)": {m: 5, p: 4, width: 300, height: 400},
			}}
		>
			<Paper sx={{p: 2, m: 4}}>
				<Stack sx={{m: 2}} direction='column' justifyContent='center'>
					<TextField
						id='margin-normal'
						margin='normal'
						required
						type='text'
						label='Username'
						name='username'
						onChange={handleChange}
					/>
					<TextField
						id='margin-normal'
						margin='normal'
						required
						label='password'
						type='password'
						name='password'
						onChange={handleChange}
					/>
					<Stack
						sx={{m: 2}}
						direction='row'
						justifyContent='center'
						spacing={2}
					>
						<Button
							onClick={handleCancel}
							color='secondary'
							size='small'
							variant='contained'
						>
							Cancel
						</Button>
						<Button
							size='small'
							type='submit'
							value='Log in!'
							variant='contained'
						>
							Submit
						</Button>
					</Stack>
				</Stack>
			</Paper>
		</Box>
	);
}
