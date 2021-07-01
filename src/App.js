import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import LoginSystem from './components/LoginSystem/Home/LoginSystem'
import SwitchRoute from './components/Mainsite/Switch/SwitchRoute'
import Deconnection from './components/Deconnection/Deconnection'


function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path='/' component={SwitchRoute} />
          <Route default component={SwitchRoute}/>
        </Switch>
      </div>
    </Router>
    // <Deconnection/>
  );
}

export default App;
