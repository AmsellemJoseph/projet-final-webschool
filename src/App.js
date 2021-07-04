
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import LoginSystem from './components/LoginSystem/Home/LoginSystem'
import Admin from './components/Admin/Home/Admin'
import Accueil from './components/Mainsite/Acceuil/Accueil'
import HorceRaceMain from './components/Games/HorseRace/Main/HorceRaceMain'

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path='/' component={LoginSystem} />
          <Route path='/login' component={LoginSystem}/>
          <Route path='/accueil' component={Accueil}/>
          <Route path="/admin" component={Admin}/>
          <Route path='/horserace' component={HorceRaceMain}/>

        </Switch>
      </div>
    </Router>
  );
}

export default App;
