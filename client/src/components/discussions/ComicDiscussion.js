import { useState, useEffect } from 'react'
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {CardActionArea} from "@mui/material";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import EditPost from "./EditPost"

export default function ComicDiscussion({selectedDiscussionComic, deletePost, updateDbComics, dBFetch, currentUser}) {
    const {id, title, thumbnail, format, number_of_posts, posts} = selectedDiscussionComic
    const [formData, setFormData] = useState({like: 0});
    const [errors, setErrors] = useState([])
    // const [selectedComicItem, setSelectedComicItem] = useState(selectedDiscussionComic);
    // setSelectedComicItem(selectedDiscussionComic)
    
    // useEffect(() => {
    //     const data = localStorage.getItem('TESTING')
    //     if (data ) setSelectedComicItem(JSON.parse(data))
    // }, [])

    // useEffect(() => {
    //     localStorage.setItem('TESTING', JSON.stringify(selectedComicItem))
    // }, [selectedComicItem]);

    // console.log(selectedComicItem)
   
    // setUpdatedPost(posts)

    // setItems(selectedDiscussionComic)

    // disable send comment if user is not logged in
	const disableCommentButton  = !currentUser

    // user input for new comment
    const userInput = (e) => {
		setFormData((formData) => ({
			...formData,
			[e.target.name]: e.target.value,
		}));
	};
    // submit new comment
    const newComment = (e) => {
		e.preventDefault();

		const infoToSend = {
			...formData,
			selectedDiscussionComic
		};

		console.log(infoToSend)

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


    const displayComments = posts?.map((post) => {        
        return (
            <div key={post.id}>
                <EditPost
                    currentUser={currentUser}
                    dBFetch={dBFetch}
                    deletePost={deletePost}
                    selectedDiscussionComic={selectedDiscussionComic}
                    updateDbComics={updateDbComics}
                    post={post}
                />
            </div>
        )
    })
 
    return (
        <div>
            <div key={id}>
                <h4>{title}</h4>
                <img src={thumbnail} alt={title} />
                <p>format {format}</p>
                <p> number of posts {number_of_posts}</p>
            </div>
                {/* new comment form */}
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

            <div>
                {displayComments}
            </div>
        </div>
    )
}