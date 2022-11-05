import {useState} from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import {useHistory} from "react-router-dom";

export default function Signup({setCurrentUser}) {
	const history = useHistory();
	// remove userFormData after fixing email validation
	const [userFormData, setUserFormData] = useState({});
	const [errors, setErrors] = useState([]);
	const [emailError, setEmailError] = useState(false);
	const [avatar, setAvatar] = useState(null)
	const [userName, setUserName] = useState('')
	const [passWord, setPassWord] = useState('')
	const [passWordConfirmation, setPassWordConfirmation] = useState('')
	const [email, setEmail] = useState('')
	console.log(errors)

	// validating email
	const isValidEmail = (email) => {
		return /\S+@\S+\.\S+/.test(email);
	}

	// fix email validation
	// form data from user input 
	const handleChange = (e) => {
		setUserFormData((formData) => ({
			...formData,
			[e.target.name]: e.target.value,
		}));
		if (!isValidEmail(userFormData.email)) {
			setEmailError('Email is invalid')
		}else {
			setEmailError(false)
		}
	};
	
	// adding avatars to users later on
	// const handleAvatarChange = (e) => {
	//     setUserFormData((formData) => ({
	// 		...formData,
	// 		[e.target.name]: e.target.files[0],
	// 	}));
	// }

	const onSubmit = (e) => {
		e.preventDefault();
		const formData = new FormData()
		formData.append('avatar', avatar)
		formData.append('username', userName)
		formData.append('password', passWord)
		formData.append('email', email)


		if(passWord !== passWordConfirmation){
			alert("passwords don't match")
		}else {
			fetch("/users", {
				method: "POST",
				body: formData,
			})
			.then( res => {
				if(res.ok){
					res.json().then(user => {
						setCurrentUser(user);
						history.push('/home');
					})
				}else {
					res.json().then((json) => setErrors(json.errors))
				}
			})
		}
	};

	// cancel button sends user back to the home page
	const handleCancel = () => {
		history.push('/home')
	}


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
				"& > :not(style)": {m: 5, p: 4, width: 500, height: 400},
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
						onChange={(e) => setUserName(e.target.value)}
					/>
					<TextField
						id='margin-normal'
						margin='normal'
						required
						type='email'
						label='email'
						name='email'
						error={emailError? true : false }
						helperText={emailError}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<TextField
						id='margin-normal'
						margin='normal'
						required
						label='password'
						type='password'
						name='password'
						onChange={(e) => setPassWord(e.target.value)}
					/>
					<TextField
                    id='margin-normal'
                    margin='normal'
                    required
                    type='password'
                    label='Confirm Password'
                    name='passwordConfirmation'
                    onChange={(e) => setPassWordConfirmation(e.target.value)}
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
							value='Signup'
							variant='contained'
							onClick={onSubmit}
						>
							Sign Up
						</Button>
						{/* uploading avatar for users */}
						<Button variant='contained' component='label'>
							Upload
							<input
								onChange={(e) => setAvatar(e.target.files[0])}
								// value={formData.avatar}
								name='avatar'
								accept='image/*'
								type='file'
							/>
						</Button>
					</Stack>
				</Stack>
			</Paper>
		</Box>
	);
}
