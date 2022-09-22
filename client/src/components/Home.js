
const image_size = "portrait_fantastic";

export default function Home({comicData}) {
	// console.log(comicData);

	const displayComics = comicData.map((comic) => {
		return (
			<div key={comic.id}>
				<h4>{comic.title}</h4>
				<img
					src={`${comic.thumbnail.path}/${image_size}.${comic.thumbnail.extension}`}
					alt='comic'
				/>
				<p>{comic.format}</p>
				<p>{comic.issueNumber}</p>
			</div>
		);
	});

	return <div>{displayComics}</div>;
}