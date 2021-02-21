import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LatestMovie from './components/LatestMovie';
import Movie from './components/Movie';
import SearchMovie from './components/SearchMovie';
import Nav from './components/Nav';

function App() {
  return (
    <div className='App'>
      <Router>
        <Nav />
        <Switch>
          <Route exact path='/' component={LatestMovie} />
          <Route path='/movie/:id' component={Movie} />
          <Route path='/search/:name' component={SearchMovie} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
