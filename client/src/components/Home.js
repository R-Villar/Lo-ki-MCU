import { Link } from "react-router-dom"

const image_size = "portrait_uncanny";

export default function Home({apiComicData, setSelectedComic}) {
	// console.log(comicData);

	// displays comics from api
	const displayComics = apiComicData.map((comic) => {
		// get comic data
		function onComicClick() {
			setSelectedComic(comic);
		}

		return (
			<div key={comic.id}>
				<h4>{comic.title}</h4>
				<img
					src={`${comic.thumbnail.path}/${image_size}.${comic.thumbnail.extension}`}
					alt='comic'
				/>
				<p>{comic.format}</p>
				<p>{comic.issueNumber}</p>
				<Link to='/comic-page' onClick={onComicClick}>
					Start or Join Conversation
				</Link>
			</div>
		);
	});

	return (
		<div>
			{displayComics}
		</div>
	);
}