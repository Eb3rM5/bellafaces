import React from 'react';

import Routes from './routes';

import { BrowserRouter } from 'react-router-dom';
import GlobalStyle from './styles/global';

import Header from './components/Header';

function App() {
  return (
    <>
        <BrowserRouter>
            <Header />
            <Routes />
            <GlobalStyle />
        </BrowserRouter>
    </>);
}

export default App;
