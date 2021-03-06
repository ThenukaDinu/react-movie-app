import React, { useState, useEffect } from 'react';
import {
  Grid,
  Container,
  CardMedia,
  Card,
  CircularProgress,
  makeStyles,
} from '@material-ui/core';
import axios from 'axios';

export default function Movie({ match }) {
  const [singleMovie, setSingleMovie] = useState({});
  const [loading, setLoading] = useState(true);
  const [actors, setActors] = useState([]);

  const useStyles = makeStyles((theme) => ({
    loading: {
      'margin-top': 50,
      'margin-left': 50,
    },
  }));

  const classes = useStyles();

  const fetchMovie = async () => {
    try {
      let res = await axios.get(`&i=${match.params.id}`);
      await setSingleMovie(res.data);
      await setActors(res.data.Actors.split(','));
      await setLoading(false);
    } catch (error) {
      await setLoading(false);
      await console.log(error);
    }
  };

  useEffect(() => {
    fetchMovie();
  }, [match.params.id]);

  if (loading) {
    return (
      <div>
        <CircularProgress
          variant='indeterminate'
          size={150}
          thickness={4}
          value={100}
          className={classes.loading}
        />
      </div>
    );
  }

  return (
    <Container align='center' maxWidth='xl'>
      <br />
      <br />
      <Grid container spacing={2} direction='row' justify='center'>
        <Grid item s={12} md={4}>
          <Card>
            <CardMedia
              component='img'
              alt={singleMovie.Title}
              image={singleMovie.Poster}
              title={singleMovie.Title}
              max-height='900'
              aspect-ratio={1}
            />
          </Card>
        </Grid>

        <Grid item s={12} md={6}>
          <div>
            <h2>{singleMovie.Title}</h2>
            <div>Year: {singleMovie.Year}</div>
            <div>Type: {singleMovie.Type}</div>
            <div>IMDB: {singleMovie.imdbID}</div>
            <div>IMDB Ratings: {singleMovie.imdbRating}</div>
            <br />
            <div>
              <h3>Actors</h3>
              {actors.map((actor, index) => {
                return <p key={index}>{actor}</p>;
              })}
            </div>
            <div>
              <h3>Awards</h3>
              <p>{singleMovie.Awards}</p>
            </div>
            <br />
            <div>Director: {singleMovie.Director}</div>
            <div>Country: {singleMovie.Country}</div>
            <div>Genre: {singleMovie.Genre}</div>
            <div>Language: {singleMovie.Language}</div>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
}
