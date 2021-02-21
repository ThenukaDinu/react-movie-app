import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';

export default function Nav() {
  const [searchVal, setSearchVal] = useState('');
  const [dataAvailable, setDataAvailable] = useState(false);

  useEffect(() => {
    if ((searchVal !== null) & (searchVal !== '')) {
      setDataAvailable(true);
      return;
    }
    setDataAvailable(false);
  }, [searchVal]);

  const searchMovie = (value) => {
    setSearchVal('');
  }

  return (
    <nav>
      <h2 className='nav-heading'>
        <Link to='/' style={{ textDecoration: 'none', color: 'black' }}>
          Movie Man
        </Link>
      </h2>
      <ul className='nav-items'>
        <input
          type='text'
          className='nav-input'
          placeholder='Enter movie name'
          value={searchVal}
          onChange={(event) => setSearchVal(event.target.value)}
        />
        <Button
          className='nav-btn'
          variant='contained'
          disabled={!dataAvailable}
          onClick={() => searchMovie(searchVal)}
        >
          Search
        </Button>
      </ul>
    </nav>
  );
}
