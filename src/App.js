import logo from './logo.svg';
import './App.css';
import styles from './App.module.scss';
import { Header } from './components/Layout/Header/Header';
import { TeamsContainer } from './pages/Teams/TeamsContainer';


function App() {
  return (
    <div className={styles.app}>
      <Header />
      <div className={styles.app__content}>
        <TeamsContainer />
      </div>
    </div>
  );
}

export default App;
