

export default function ComicDiscussion({selectedDiscussionComic}) {


    const {id, title, thumbnail, format, number_of_posts, posts} = selectedDiscussionComic
    console.log(posts)

    const displayComments = posts?.map((post) => {
        return (
            <div key={post.id}>
                <p>{post.user.username}</p>
                <p>{post.comment}</p>
                <p>{post.like}</p>
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

            <div>
                {displayComments}
            </div>
        </div>
    )
}