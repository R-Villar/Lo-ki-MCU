import { useState, useEffect } from 'react'
import EditPost from "./EditPost"

export default function ComicDiscussion({selectedDiscussionComic, deletePost, updatedComic, setDbComicData, setUpdatedPost, dBFetch}) {
    
    const [selectedComicItem, setSelectedComicItem] = useState(selectedDiscussionComic);

    useEffect(() => {
        const data = window.localStorage.getItem('DISCUSSION_COMIC')
        if (data !== null ) setSelectedComicItem(JSON.parse(data))
    }, [])

    useEffect(() => {
        window.localStorage.setItem('DISCUSSION_COMIC', JSON.stringify(selectedComicItem))
      }, [selectedComicItem]);

    console.log(selectedComicItem)
    const {id, title, thumbnail, format, number_of_posts, posts} = selectedComicItem
    // setUpdatedPost(posts)

    // setItems(selectedDiscussionComic)
 
    const displayComments = posts?.map((post) => {
        return (
            <div key={post.id}>
                <EditPost
                    dBFetch={dBFetch}
                    deletePost={deletePost}
                    selectedDiscussionComic={selectedDiscussionComic}
                    setDbComicData={setDbComicData}
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

            <div>
                {displayComments}
            </div>
        </div>
    )
}