import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';

export default function DiscussionsPage({dbComicData}) {


    const displayDbComics =  dbComicData?.map((comic) => {
        

        return (
            <Box key={comic.id}>
                <Card sx={{ width: 300,
					height: 650, }}>
                    <CardContent>
                    <Typography variant="h6" >{comic.title}</Typography>
                    <CardMedia 
                        component="img" 
                        image={comic.thumbnail}
                        alt={comic.title}
                    />
                        <Typography>{comic.format}</Typography>
                        <Typography> number of posts {comic.number_of_posts}</Typography>
                        <Button  variant="contained" href={`/comics/${comic.id}`}>Join discussion</Button>
                    </CardContent>
                </Card>
            </Box>
        )
    })

	return(
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
            {displayDbComics}
        </Box>
    ) 
}
