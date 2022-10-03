import { Link } from "react-router-dom"
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import SearchBar from "./SearchBar";

const image_size = "portrait_uncanny";
export default function Home({apiComicData, setSelectedComic, setSearch}) {

	// displays comics from api
	const displayComics = apiComicData.map((comic) => {
		// get comic data
		function onComicClick() {
			setSelectedComic(comic);
		}

		return (
			<Box key={comic.id}>
				<Card sx={{ width: 300,
					height: 650, }}>
					<CardContent>
					<Typography variant="h6" >{comic.title}</Typography>
					<CardMedia 
						component="img"
						// height="400"
						// width='450'
						image={`${comic.thumbnail.path}/${image_size}.${comic.thumbnail.extension}`}
						alt='comic' />
					
						<Typography>{comic.format}</Typography>
						<Typography>{comic.issueNumber}</Typography>
						<Link
							to='/comic-page' 
							onClick={onComicClick}>
							Start or Join Conversation
						</Link>
						{/* <Button  variant="contained"
							href='/comic-page' 
							onClick={onComicClick}>
							Start or Join Conversation
						</Button> */}
					</CardContent>
				</Card>
			</Box>
		);
	});

	return (
		<>
			<SearchBar setSearch={setSearch} />
			<Box sx={{
				p: 2,
				display: "grid",
				flexWrap: "wrap",
				gridTemplateColumns: {
					sm: ".5fr",
					md: ".5fr .5fr",
					lg: ".5fr .5fr .5fr",
					xl: ".5fr .5fr .5fr .5fr"
				},
				"& > :not(style)": {
					m: 2,
				},
			}}>
				{displayComics}
			</Box>
		</>
	);
}