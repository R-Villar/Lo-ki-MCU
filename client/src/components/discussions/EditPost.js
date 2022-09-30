import { useState } from 'react'

export default function EditPost({post, currentUser, setDisplayComic, deletePosts, updatePost, setUpdate, update }) {

    // console.log(selectedDiscussionComic)
    const [likes, setLikes ] = useState( post.like )
    const [isClicked, setIsClicked] = useState(false);
    const [isEditing, setIsEditing] = useState(true);
    const [formData, setFormData] = useState({ comment: post.comment });
    const [errors, setErrors] = useState([]);

    const handleCommentChange = (e) => {
        // set user input from form
        setFormData((formData) => ({
            ...formData,
            [e.target.name]: e.target.value,
        }));
    }

    // like button clicked
    const handleLikeClick = () => {
        if (isClicked) {
            setLikes(likes - 1);
        } else {
            setLikes(likes + 1);
        }
        setIsClicked(!isClicked);
    };

    // const handleUpdateLikes = () => {
    //     fetch(`/posts/${post.id}`,  {
    //         method: "PATCH",
	// 		headers: {"Content-type": "application/json"},
	// 		body: JSON.stringify(likes)
    //     })
    //     .then((response) => {
    //         if(response.ok){
    //             response.json().then(updatedLikes => {
    //                 updateDbComics(updatedLikes)
    //             }) 
    //         }else {
    //             response.json().then((json) => setErrors(json.errors))
    //         }
    //     })
    // }


   

 
    // edit post 
    const openEdit = (e) => {
        e.preventDefault()
        setIsEditing((isEditing) => !isEditing);
    }

    const saveEditComment = (e) => {
        e.preventDefault()

        console.log(formData)
        fetch(`/posts/${post.id}`, {
			method: "PATCH",
			headers: {"Content-type": "application/json"},
			body: JSON.stringify(formData)
        })
        .then((response) => {
            if(response.ok){
                response.json().then(updatedComment => {
                    updatePost(updatedComment)
                    // setUpdate(!update)
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
            {isEditing? (
                <div>
                    <p>User: {post.user.username}</p>
                    <p>{formData.comment}</p>
                    <button onClick={handleLikeClick}> {likes} likes</button>
                    <button 
                    disabled={disableButton}
                     onClick={openEdit}>edit comment</button>
                    <button 
                    disabled={disableButton}
                     onClick={deleteComment}>delete comment</button>
                </div>
            ):(
                <form>
                    <input onChange={handleCommentChange} name='comment'
                        defaultValue={post.comment}
                    />
                    <button onClick={saveEditComment} type='submit'>save</button>
                </form>
            )}
        </div>
    )
}