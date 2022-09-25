import { Link } from "react-router-dom"

const image_size = "portrait_fantastic";

export default function Home({comicData, setSelectedComic}) {
	// console.log(comicData);

	const displayComics = comicData.map((comic) => {
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
					click me
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