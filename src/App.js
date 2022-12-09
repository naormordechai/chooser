import React from "react";
import "./App.css";
import styles from "./App.module.scss";
import { Header } from "./components/Layout/Header/Header";
import { TeamsContainer } from "./pages/Teams/TeamsContainer";
import AppProvider from "./context/AppContext.js";

function App() {
  return (
    <AppProvider>
      <div className={styles.app}>
        <Header />
        <div className={styles.app__content}>
          <TeamsContainer />
        </div>
      </div>
    </AppProvider>
  );
}

export default App;
