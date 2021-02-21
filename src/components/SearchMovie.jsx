import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  makeStyles,
  Container,
  Grid,
  CircularProgress,
  Button,
  CardActions,
  CardContent,
  Typography,
  CardMedia,
  CardActionArea,
  Card,
} from '@material-ui/core';
import { Link } from 'react-router-dom';

export default function SearchMovie({ match }) {
  const [wholeResponse, setWholeResponse] = useState([]);
  const [loading, setLoading] = useState(true);
  const [noData, setNoData] = useState(true);

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

  const fetchData = async () => {
    try {
      const response = await axios.get(`&s=${match.params.name}`);
      if (response.data.Response === 'True') {
        await setNoData(false);
        await setWholeResponse(response.data.Search);
        await setLoading(false);
        return;
      }
      await setNoData(true);
      await setLoading(false);
    } catch (error) {
      await setLoading(false);
      await console.log(error);
    }
  };

  const redirectToIMDB = (id) => {
    window.open('https://www.imdb.com/title/' + id, '_blank');
  };

  useEffect(fetchData, [match.params.name, fetchData]);

  const renderMovies = () => {
    return wholeResponse.map((item, index) => {
      return (
        <Grid item xs={12} sm={12} md={3} lg={2} key={index}>
          <Card className={classes.root}>
            <CardActionArea className={classes.mousePointer}>
              <CardMedia
                component='img'
                alt={item.Title}
                image={item.Poster}
                title={item.Title}
                height='400'
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
              <Link
                to={`/movie/${item.imdbID}`}
                style={{ textDecoration: 'none' }}
              >
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
  } else if (noData) {
    return <h3 style={{'textAlign': 'center'}}>No movie found with name {match.params.name}</h3>;
  }

  return (
    <Container maxWidth='xl'>
      <br />
      <br />
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
