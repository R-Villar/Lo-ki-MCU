import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import SearchBar from "./SearchBar";
import { Link as RouterLink } from 'react-router-dom';

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
						image={`${comic.thumbnail.path}/${image_size}.${comic.thumbnail.extension}`}
						alt='comic' 
					/>
					
						<Typography>{comic.format}</Typography>
						<Typography>{comic.issueNumber}</Typography>
						<Button  variant="contained"
							to='/comic-page' 
							component={RouterLink}
							onClick={onComicClick}>
							Start or Join Conversation
						</Button>
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