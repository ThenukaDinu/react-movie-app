import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import {
  Container,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Grid,
  CircularProgress,
} from '@material-ui/core';
import { Link } from 'react-router-dom';

export default function LatestMovie(prop) {
  const [wholeResponse, setWholeResponse] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get('&s=harry&potter');
      await console.log(response.data.Search);
      await setWholeResponse(response.data.Search);
      await setLoading(false);
    } catch (error) {
      await console.log(error);
      await setLoading(false)
    }
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    media: {
      height: 140,
    },
    loading: {
      'margin-top': 50,
      'margin-left': 50,
    },
    mousePointer: {
      cursor: 'pointer !important',
    },
  }));

  const classes = useStyles();

  const renderMovies = () => {
    return wholeResponse.map((item, index) => {
      return (
        <Grid item xs={12} sm={6} md={3} xl={2} key={index}>
          <Card className={classes.root}>
            <CardActionArea className={classes.mousePointer}>
              <CardMedia
                component='img'
                alt='Contemplative Reptile'
                image={item.Poster}
                title='Contemplative Reptile'
                height='300'
              />
              <CardContent>
                <Typography gutterBottom variant='h6' component='h6'>
                  {item.Title}
                </Typography>
                <Typography
                  variant='body2'
                  color='textSecondary'
                  component='div'
                >
                  <h3>Year: {item.Year}</h3>
                  <h3>Type: {item.Type}</h3>
                  <h3>IMDB: {item.imdbID}</h3>
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Link to={`/movie/${item.imdbID}`} style={{'textDecoration': 'none'}}>
                <Button size='small' color='primary'>
                  View
                </Button>
              </Link>
              <Button
                size='small'
                color='primary'
                onClick={() => redirectToIMDB(item.imdbID)}
              >
                View Site
              </Button>
            </CardActions>
          </Card>
        </Grid>
      );
    });
  };

  const redirectToIMDB = (id) => {
    window.open('https://www.imdb.com/title/' + id, '_blank');
  };

  useEffect(() => fetchData(), []);

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
    <Container>
      <br/><br/>
      <Grid
        container
        spacing={3}
        direction='row'
        justify='flex-start'
        alignItems='flex-start'
      >
        {renderMovies()}
      </Grid>
    </Container>
  );
}
