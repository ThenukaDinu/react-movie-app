import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

export default function Nav() {
  const [searchVal, setSearchVal] = useState('');
  const [dataAvailable, setDataAvailable] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if ((searchVal !== null) & (searchVal !== '')) {
      setDataAvailable(true);
      return;
    }
    setDataAvailable(false);
  }, [searchVal]);

  const searchMovie = (value) => {
    setSearchVal('');
    let conValue = value.replace(' ', '&');
    history.push(`/search/${conValue}`);
  };

  const _handleKeyDown = (e) => {
    if (e.key === 'Enter' && dataAvailable) {
      searchMovie(searchVal);
    }
  };

  return (
    <nav>
      <h2 className='nav-heading'>
        <Link to='/' style={{ textDecoration: 'none', color: 'black' }}>
          Movie Man
        </Link>
      </h2>
      <ul className='nav-items'>
        <li>
          <input
            type='text'
            className='nav-input'
            placeholder='Enter movie name'
            value={searchVal}
            onChange={(event) => setSearchVal(event.target.value)}
            onKeyDown={(e) => _handleKeyDown(e)}
          />
        </li>
        
        <li>
          <Button
            className='nav-btn'
            variant='contained'
            disabled={!dataAvailable}
            onClick={() => searchMovie(searchVal)}
          >
            Search
          </Button>
        </li>
      </ul>
    </nav>
  );
}
