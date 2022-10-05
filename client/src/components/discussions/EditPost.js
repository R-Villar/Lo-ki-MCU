import { Card } from '@mui/material';
import { useState } from 'react'
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button"
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import TextField from "@mui/material/TextField";
import Zoom from '@mui/material/Zoom';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import CardActions from '@mui/material/CardActions';


export default function EditPost({post, currentUser, deletePosts, updatePost }) {

    const [likes, setLikes ] = useState( post.like )
    const [isClicked, setIsClicked] = useState(false);
    const [isEditing, setIsEditing] = useState(true);
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState([]);

    const handleCommentChange = (e) => {
        // set user input from form
        setFormData((formData) => ({
            ...formData,
            [e.target.name]: e.target.value,
        }));
    }

    const handleUpdateLikes = () => {

        // update like state
        if (isClicked) {
            setLikes(likes - 1);
        } else {
            setLikes(likes + 1);
        }
        setIsClicked(!isClicked);

        const likeObj = {
            like: post.like + 1
        }

        fetch(`/posts/${post.id}`,  {
            method: "PATCH",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify(likeObj)
        })
        .then((response) => {
            if(response.ok){
                response.json().then(updatedLikes => {
                    updatePost(updatedLikes)
                }) 
            }else {
                response.json().then((json) => setErrors(json.errors))
            }
        })
    }

    // edit post 
    const openEdit = (e) => {
        e.preventDefault()
        setIsEditing((isEditing) => !isEditing);
    }

    const saveEditComment = (e) => {
        e.preventDefault()

        fetch(`/posts/${post.id}`, {
			method: "PATCH",
			headers: {"Content-type": "application/json"},
			body: JSON.stringify(formData)
        })
        .then((response) => {
            if(response.ok){
                response.json().then(updatedComment => {
                    updatePost(updatedComment)
                }) 
            }else {
                response.json().then((json) => setErrors(json.errors))
            }
        })
        // close form when save button is pressed
        setIsEditing((isEditing) => !isEditing);
    }

    // user deletes their post
    const deleteComment = (e) => {
        e.preventDefault()
        fetch(`/posts/${post.id}`, {
            method: "DELETE",
        })
        deletePosts(post)

    }

    // disable the buttons if the user did not created those posts
    const disableButton = currentUser.id !== post.user.id

    return (
        <div>
            {errors ? <div>{errors}</div> : null}
            {isEditing? (
                 <Card sx={{m: 1}}>
                    <Stack  sx={{m: 1}} direction="row" spacing={1}>
                        <Avatar>{post.user.username[0]}</Avatar>
                        <Typography 
                            variant="button"
                            display="block"
                            mt={1}
                            sx={{fontWeight: 700}}
                        >
                            {post.user.username}
                        </Typography>
                    </Stack>
                    <Typography>{post.comment}</Typography>
                    <CardActions sx={{ justifyContent: 'center' }}  disableSpacing>
                        <Tooltip TransitionComponent={Zoom} arrow title="Like">
                            <IconButton
                                size="small"
                                onClick={handleUpdateLikes}
                            >
                                {likes} <FavoriteIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip TransitionComponent={Zoom} arrow title="Edit">
                            <IconButton
                                size="small" 
                                disabled={disableButton}
                                onClick={openEdit}
                            > 
                            <EditIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip TransitionComponent={Zoom} arrow title="Delete">
                            <IconButton 
                                size="small"
                                disabled={disableButton}
                                onClick={deleteComment}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                    </CardActions>
                </Card>
            ):(
                <Card sx={{m: 1}}>
                    <Stack  sx={{m: 1}} direction="row" spacing={1}>
                        <Avatar>{post.user.username[0]}</Avatar>
                        <Typography 
                            variant="button"
                            display="block"
                            mt={1}
                            sx={{fontWeight: 700}}
                        >
                            {post.user.username}
                        </Typography>
                    </Stack>
                    <TextField
                        variant='standard'
                        rows={3}
                        multiline
                        onChange={handleCommentChange} 
                        name='comment'
                        defaultValue={post.comment}
                    />
    
                    <Button onClick={saveEditComment} type='submit'>save</Button>
                </Card>
            )}
        </div>
    )
}