import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import LoginSystem from './components/LoginSystem/Home/LoginSystem'


function App() {
  return (
    // <Router>
      <div className="App">
        <LoginSystem />
      </div>
    // </Router>
  );
}

export default App;
