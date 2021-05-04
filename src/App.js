import { BrowserRouter, Switch, Route } from 'react-router-dom';
// Components
import Container from './component/container';
import Login from './component/auth/login';
import Signup from './component/auth/signup';
// CSS
import './App.css';
import 'antd/dist/antd.css';

function App() {
  console.log('REACT_APP_API_BASE_URL', process.env.REACT_APP_API_BASE_URL)
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/login" render={(props) => <Login {...props} />} />
          <Route path="/signup" render={(props) => <Signup {...props} />} />
          <Route path="/" render={(props) => <Container {...props} />} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
