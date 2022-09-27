import { Link } from "react-router-dom";


export default function DiscussionsPage({setSelectedDiscussionComic, dbComicData}) {

    const displayDbComics =  dbComicData?.map((comic) => {

        function onComicClick() {
            setSelectedDiscussionComic(comic)
        }

        return (
            <div key={comic.id}>
                <h4>{comic.title}</h4>
                <img src={comic.thumbnail} alt={comic.title} />
                <p>format {comic.format}</p>
                <p> number of posts {comic.number_of_posts}</p>
                {/* <button onClick={onComicClick}>Join discussion</button> */}
                <Link to={'/comments'} onClick={onComicClick}>Join discussion</Link>
            </div>
        )
    })

	return(
        <div>
            {displayDbComics}
        </div>
    ) 
}
