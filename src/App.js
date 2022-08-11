import './assets/styles/App.css';
import Animal from './pages/AnimalPage/Animal';
import LogIn from './pages/login/LogIn';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useSelector } from 'react-redux';

function App() {
  const { isLogIn } = useSelector(state => state.users)

  return (
    <Router>
      <Switch>
        <Route path="/login" >
          <LogIn />
        </Route>
        <Route path="/animals" render={() => {
          return isLogIn === true ? <Animal /> : <Redirect to='/login' />
        }}>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
