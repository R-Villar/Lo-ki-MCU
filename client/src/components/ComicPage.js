import { useState} from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {CardActionArea} from "@mui/material";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";



const image_size = "portrait_uncanny";
export default function ComicPage({setComic, currentUser, updateDbComics, dBFetch}) {
	const [errors, setErrors] = useState([])
	// comment form
	const [formData, setFormData] = useState({});
	// disable send comment if user is not logged in
	const disableCommentButton  = !currentUser

	console.log(setComic);

	const userInput = (e) => {
		setFormData((formData) => ({
			...formData,
			[e.target.name]: e.target.value,
		}));
	};
	// `${setComic.thumbnail.path}/${image_size}.${setComic.thumbnail.extension}`,
	const comicData = {
		title: setComic.title,
		thumbnail: `${setComic.thumbnail.path}/${image_size}.${setComic.thumbnail.extension}`,
		format: setComic.format,
		pageCount: setComic.pageCount,
	};

	const newComment = (e) => {
		e.preventDefault();

		const infoToSend = {
			...formData,
			...comicData,
		};

		fetch("/posts", {
			method: "POST",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify(infoToSend),
		})
        .then( res => {
			if(res.ok){
				res.json().then(
					updateDbComics(infoToSend),
					dBFetch())
			}else {
				res.json().then((json) => setErrors(json.errors))
			}
		})
		console.log(errors)
	};

	return (
		<div>
			<Box
				justifyContent='center'
				sx={{
					p: 1,
					display: "center",
					flexWrap: "wrap",
					gridTemplateColumns: {
						md: "1fr",
					},
					"& > :not(style)": {
						m: 3,
					},
				}}
			>
				<Card elevation={3} sx={{maxWidth: 400}}>
					<CardActionArea>
						<Typography gutterBottom variant='h5' component='div'>
							{setComic.title}
						</Typography>
						<CardMedia
							component='img'
							height='600'
							key={setComic.id}
							alt={setComic.title}
							src={`${setComic.thumbnail.path}/${image_size}.${setComic.thumbnail.extension}`}
						/>
						<CardContent>
							<Typography
								gutterBottom
								variant='h4'
								component='div'
							>
								{setComic.format}
							</Typography>
							<Typography
								gutterBottom
								variant='h6'
								component='div'
							>
								Issue number #{setComic.issueNumber}
							</Typography>
						</CardContent>
					</CardActionArea>
				</Card>
			</Box>
			{/* box container for comment textfield */}
			<Box
				onSubmit={newComment}
				component='form'
				sx={{p: 1, display: "left", gridTemplateColumns: {md: "1fr"}}}
			>
				{/* display username above comment field if user is logged in */}
				{currentUser ? (
					<Typography
						variant='subtitle2'
						display='block'
						gutterBottom
					>
						Comment as {currentUser.username}
					</Typography>
				) : null}

				<TextField
					onChange={userInput}
					id='outlined-multiline-static'
					label='What are your thoughts?'
					fullWidth
					name='comment'
					multiline
					rows={6}
					variant='filled'
					sx={{
						display: "flex",
						flexDirection: "row",
						flexWrap: "wrap",
					}}
				/>
				<Stack direction='row' justifyContent='flex-end' spacing={2}>
					<Button
						type='submit'
						disabled={disableCommentButton}
						variant='contained'
					>
						Send
					</Button>
				</Stack>
			</Box>
		</div>
	);
}
