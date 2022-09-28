import {useState} from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";




export default function Signup({setCurrentUser}) {
	// const history = useHistory();
	const [userFormData, setUserFormData] = useState({});
	const [errors, setErrors] = useState([]);
	// form data from user input 
	const handleChange = (e) => {
		setUserFormData((formData) => ({
			...formData,
			[e.target.name]: e.target.value,
		}));
	};

	// adding avatars to users later on
	// const handleAvatarChange = (e) => {
	//     setUserFormData((formData) => ({
	// 		...formData,
	// 		avatar: e.target.files[0],
	// 	}));
	// }


	const onSubmit = (e) => {
		e.preventDefault();
		console.log(userFormData.password)
		fetch("/users", {
			method: "POST",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify(userFormData),
		})
		.then( res => {
			if(res.ok){
				res.json().then(user => {
					setCurrentUser(user);
				})
			}else {
				res.json().then((json) => setErrors(json.errors))
			}
		})
	};

	// console.log(userFormData);
	// console.log(errors);
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
						// value={formData.username}
						onChange={handleChange}
					/>
					<TextField
						id='margin-normal'
						margin='normal'
						required
						type='email'
						label='email'
						name='email'
						// value={formData.email}
						onChange={handleChange}
					/>
					<TextField
						id='margin-normal'
						margin='normal'
						required
						label='password'
						type='password'
						name='password'
						// value={formData.password}
						onChange={handleChange}
					/>
					{/* <TextField
						id='margin-normal'
						margin='normal'
						required
						label='confirm password'
						type='password'
						name='confirm password'
						// value={formData.password}
						onChange={handleChange}
					/> */}
					{/* Buttons cancel and submit  */}
					<Stack
						sx={{m: 1}}
						direction='row'
						justifyContent='center'
						spacing={2}
					>
						<Button
							// onClick={handleCancel}
							color='secondary'
							size='small'
							variant='contained'
						>
							Cancel
						</Button>
						<Button
							size='small'
							type='submit'
							value='Signup'
							variant='contained'
						>
							Sign Up
						</Button>
						{/* uploading avatar for users */}
						{/* <Button variant='contained' component='label'>
							Upload
							<input
								onChange={handleAvatarChange}
								// value={formData.avatar}
								name='avatar'
								accept='image/*'
								type='file'
							/>
						</Button> */}
					</Stack>
				</Stack>
			</Paper>
		</Box>
	);
}
