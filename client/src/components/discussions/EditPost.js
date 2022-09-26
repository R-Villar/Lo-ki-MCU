import { useState } from 'react'

export default function EditPost({post, selectedDiscussionComic, deletePost, setDbComicData, updatedComic, dBFetch }) {

    // console.log(selectedDiscussionComic)
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
   
    // edit post 
    const editComment = (e) => {
        e.preventDefault()
        // console.log(formData)
        // console.log(post)
        fetch(`/posts/${post.id}`, {
			method: "PATCH",
			headers: {"Content-type": "application/json"},
			body: JSON.stringify(formData)
        })
        .then((response) => {
            if(response.ok){
                response.json().then(updatedComment => {
                    setDbComicData(updatedComment)
                })
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
        deletePost(post.id)
        
    }

    return (
        <div>
            {isEditing? (
                <div>
                    <p>{post.user.username}</p>
                    <p>{post.comment}</p>
                    <p>{post.like}</p>
                    <button onClick={editComment}>edit comment</button>
                    <button onClick={deleteComment}>delete comment</button>
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