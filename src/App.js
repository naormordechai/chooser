import logo from './logo.svg';
import './App.css';
import { DisplayInfiniteTeams } from './components/DisplayInfiniteTeams/DisplayInfiniteTeams';
import teams from './resources/teams.json';


function App() {
  return (
    <div>
      <DisplayInfiniteTeams teams={teams} />
    </div>
  );
}

export default App;
