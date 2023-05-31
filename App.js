import { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAction } from './redux/actions/accountActions';
import './styles/App.css';
import AuthPage from './components/AuthPage/AuthPage';
import EmailPage from './components/EmailPage/EmailPage';

function App() {
  const dispatch = useDispatch();
  const { isLoggedIn, token } = useSelector((state) => state.userReducer);


  useEffect(() => {
    if (token) {
      dispatch(getUserAction());
    }
  }, [token, dispatch]);

  return (
    <Router>
      <div className='App'>
        <Switch>
          <Route exact path='/'>
            {!isLoggedIn ? <Redirect to='/account' /> : <Redirect to='/email/inbox' />}
          </Route>

          <Route exact path='/account'>
            {!isLoggedIn ? <AuthPage /> : <Redirect to='/email/inbox' />}
          </Route>

          <Route path='/email'>
            {isLoggedIn ? <EmailPage /> : <Redirect to='/account' />}
          </Route>

        </Switch>
      </div>
    </Router>
  );
}

export default App;
