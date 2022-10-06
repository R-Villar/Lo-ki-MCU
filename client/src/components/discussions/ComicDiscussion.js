import { useState, useEffect } from 'react'
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {useParams} from "react-router-dom";
import EditPost from "./EditPost"
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import {CardActionArea} from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';




export default function ComicDiscussion({ currentUser, setUserPost, newPosts, userPost, deletePosts, updatePost}) {
    const {id} = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [ displayComic, setDisplayComic ] = useState([])
    const [formData, setFormData] = useState({like: 0});
    const [errors, setErrors] = useState([])
    const {title, thumbnail, format, number_of_posts} = displayComic

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
			.then((comicsData) => {
                setDisplayComic(comicsData)
                setUserPost(comicsData.posts)
            })
            ;
	}, [id, setUserPost]);

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
                    newPosts(comment))
			}else {
				res.json().then((json) => setErrors(json.errors))
			}
		})
        e.target.reset()
	};


    useEffect(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
    }, []);

    const displayComments = userPost?.map((post) => {

        return (
            <Box key={post.id}>
                    <EditPost
                        updatePost={updatePost}
                        deletePosts={deletePosts}
                        currentUser={currentUser}
                        post={post}
                    />
            </Box>
        )
    })

    if (isLoading) {
        return <div><CircularProgress color="secondary" /></div> 
    }
 
    return (
        <div>
            <Box justifyContent='center' key={displayComic.id}
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
                            {title}
                        </Typography>
                        <CardMedia component='img'
							height='600'
                            src={thumbnail}
                            alt={title}
                        />
                        <CardContent>
                            <Typography
                                gutterBottom
                                variant='h4'
                                component='div'
                            >
                                format {format}
                            </Typography>
                            <Typography> 
                                number of posts {number_of_posts}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Box>
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
                        color='primary'
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            flexWrap: "wrap",
                        }}
                    />
                    <Stack direction='row' 
                        justifyContent='flex-end'
                        spacing={2} sx={{m: .5}}>
                        <Button
                            type='submit'
                            disabled={disableCommentButton}
                            variant='contained'    
                        >
                            Submit
                        </Button>
                    </Stack> 
                    {errors ? <div>{errors}</div> : null}
                </Box>

            <div>
                {displayComments}
            </div>
        </div>
    )
}