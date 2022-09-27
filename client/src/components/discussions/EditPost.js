import { useState, useEffect } from 'react'

export default function EditPost({post, selectedDiscussionComic, deletePost, updateDbComics, updatedComic, dBFetch, currentUser }) {

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



    // disable the buttons if the user did not created those posts
    const disableButton = currentUser.id !== post.user.id
    // console.log(currentUser.id)
    // console.log(likes)
    // console.log(formData)
    // edit post 
    const editComment = (e) => {
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
                    updateDbComics(updatedComment)
                }, dBFetch()) 
            }else {
                response.json().then((json) => setErrors(json.errors))
            }
        })
        // close form when save button is pressed
        setIsEditing((isEditing) => !isEditing);
    }

    const deleteComment = (e) => {
        e.preventDefault()

        fetch(`/posts/${post.id}`, {
            method: "DELETE",
        })
        .then( () => {dBFetch()})
        deletePost(post.id)
    }

    return (
        <div>
            {isEditing? (
                <div>
                    <p>User: {post.user.username}</p>
                    <p>{formData.comment}</p>
                    <button onClick={handleLikeClick}> {likes} likes</button>
                    <button disabled={disableButton} onClick={editComment}>edit comment</button>
                    <button disabled={disableButton} onClick={deleteComment}>delete comment</button>
                </div>
            ):(
                <form>
                    <input onChange={handleCommentChange} name='comment'
                        defaultValue={post.comment}
                    />
                    <button onClick={editComment} type='submit'>save</button>
                </form>
            )}
        </div>
    )
}