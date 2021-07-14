
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import {useDispatch} from 'react-redux'
import LoginSystem from './components/LoginSystem/Home/LoginSystem'
import Admin from './components/Admin/Home/Admin'
import Accueil from './components/Mainsite/Acceuil/Accueil'
import HorceRaceMain from './components/Games/HorseRace/Main/HorceRaceMain'
import HorseRaceGame from './components/Games/HorseRace/Main/HorseRaceGame'
import Reset from './components/LoginSystem/Forgot/Reset'
import ChangeInfo from './components/LoginSystem/ChangeInfo/ChangePhoto'
import ChangePassword from './components/LoginSystem/ChangePassword/ChangePassword'
import PaypalComp from './components/Mainsite/Paypal/PaypalComp'
import Chat from './components/Mainsite/Chat/Chat'



function App() {
  
  




  return (
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
            <Route path='/changephoto' component={ChangeInfo} />
            <Route path='/changepassword' component={ChangePassword} />
            <Route path='/paypal' component={PaypalComp} />
            <Route path="/chat" component={Chat} />

          </Switch>
      </div>
    </Router>
  );
}

export default App;
