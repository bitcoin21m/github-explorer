import { createContext, useState } from 'react';
import './App.css';
import Header from './Header/Header';
import Main from './Main/Main';
import Loader from './ComponentLibrary/Loader/Loader';

// establish context
export const ctx = createContext();

const App = () => {
  // states
  const [loader, setLoader] = useState(false);

  // initialize context data
  const ctxData = {
    loader,
    setLoader,
  };
  
  return (
    <>
      <ctx.Provider value={ctxData}>
        { loader && <Loader /> }
        <Header />
        <Main />
      </ctx.Provider>
    </>
  );
};

export default App;