import {useEffect, useState} from "react";
import {Route, Switch, Link,  useHistory} from "react-router-dom";
import ComicDiscussion from "./ComicDiscussion";



export default function ComicsWithPosts({setSelectedDiscussionComic}) {
    const [ dbComicData, setDbComicData ] = useState([])
    // const [ selectedDiscussionComic, setSelectedDiscussionComic ] = useState('')
    // fetch data from DB
    useEffect(() => {
		fetch(`/comics`)
			.then((res) => res.json())
			.then((data) => setDbComicData(data));
	}, []);



    const displayDbComics = dbComicData.map((comic) => {

        function onComicClick() {
            setSelectedDiscussionComic(comic)
            
        }


        return (
            <div key={comic.id}>
                <h4>{comic.title}</h4>
                <img src={comic.thumbnail} alt={comic.title} />
                <p>format {comic.format}</p>
                <p> number of posts {comic.number_of_posts}</p>
                <Link to='/testfornow' onClick={onComicClick}>Join discussion</Link>
            </div>
        )
    })

    // console.log(selectedDiscussionComic)


	return(
        <div>
            {displayDbComics}
        </div>
    ) 
}
