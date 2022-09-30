import { useState, useEffect } from 'react'
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {useParams} from "react-router-dom";
import EditPost from "./EditPost"

export default function ComicDiscussion({ currentUser, setUserPost, newPosts, userPost, deletePosts, updatePost}) {
    const {id} = useParams();
    const [ displayComic, setDisplayComic ] = useState([])
    const [formData, setFormData] = useState({like: 0});
    const [ update, setUpdate ] = useState(false)
    const [errors, setErrors] = useState([])
    const {title, thumbnail, format, number_of_posts, posts} = displayComic
    setUserPost(posts)
    // const [userPost, setUserPost ] = useState()


    // disable send comment if user is not logged in
	const disableCommentButton  = !currentUser

    // user input for new comment
    const userInput = (e) => {
		setFormData((formData) => ({
			...formData,
			[e.target.name]: e.target.value,
		}));
	};

    // individual comic fetch
    useEffect(() => {
		fetch(`/comics/${id}`)
			.then((res) => res.json())
			.then((comicsData) => setDisplayComic(comicsData));
	}, [id, setUserPost,   update]);

    // submit new comment
    const newComment = (e) => {
		e.preventDefault();

		const infoToSend = {
			...formData,
			...displayComic
		};

		fetch("/posts", {
			method: "POST",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify(infoToSend),
		})
        .then( res => {
			if(res.ok){
				res.json().then((comment) =>
                    newPosts(comment), setUpdate(!update))
			}else {
				res.json().then((json) => setErrors(json.errors))
			}
		})
	};


    const displayComments = userPost?.map((post) => {

        return (
            <div key={post.id}>
                <EditPost
                    updatePost={updatePost}
                    deletePosts={deletePosts}
                    setUpdate={setUpdate}
                    update={update}
                    setDisplayComic={setDisplayComic}
                    currentUser={currentUser}
                    post={post}
                />
            </div>
        )
    })
 
    return (
        <div>
            <div key={displayComic.id}>
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