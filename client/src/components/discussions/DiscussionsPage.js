import { Link } from "react-router-dom";
import { useState, useEffect } from 'react'
import ComicDiscussion from "./ComicDiscussion";


export default function DiscussionsPage({dbComicData}) {


    const displayDbComics =  dbComicData?.map((comic) => {
        

        return (
            <div key={comic.id}>
                <h4>{comic.title}</h4>
                <img src={comic.thumbnail} alt={comic.title}/>
                <p>format {comic.format}</p>
                <p> number of posts {comic.number_of_posts}</p>
                <Link to={`/comics/${comic.id}`}>Join discussion</Link>
            </div>
        )
    })

	return(
        <div>
            {displayDbComics}
        </div>
    ) 
}
