
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import LoginSystem from './components/LoginSystem/Home/LoginSystem'
import Admin from './components/Admin/Home/Admin'
import Accueil from './components/Mainsite/Acceuil/Accueil'
import HorceRaceMain from './components/Games/HorseRace/Main/HorceRaceMain'
import HorseRaceGame from './components/Games/HorseRace/Main/HorseRaceGame'
import Reset from './components/LoginSystem/Forgot/Reset'
import Test from './utils/Test'
import MainBarUser from './components/Mainsite/NavBarUser/MainBarUser'

function App() {
  return (
    // <Test />
    <Router>
      <div className="App">
        <Switch>
          <Route exact path='/' component={LoginSystem} />
          <Route path='/login' component={LoginSystem} />
          <Route path='/accueil' component={Accueil} />
          <Route path="/admin" component={Admin} />
          <Route path='/horserace' component={HorceRaceMain} />
          <Route path='/horseracegame' component={HorseRaceGame} />
          <Route path='/resetpassword' component={Reset} />

        </Switch>
      </div>
    </Router>
  );
}

export default App;
