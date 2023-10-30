import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import Big from 'big.js';
import 'fomantic-ui-css/semantic.min.css';
import 'react-toastify/dist/ReactToastify.css';

import './index.css';
import store from './store';

import Header from './components/header';
import MainPage from './pages/main-page';
import InvoicesPage from './pages/invoices-page';

Big.DP = 4;
Big.RM = Big.roundHalfEven;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <ToastContainer />
        <Header />
        <Routes>
          <Route path='/' Component={MainPage} />
          <Route path='/invoices/:state' Component={InvoicesPage} />
        </Routes>
      </HashRouter>
    </Provider>
  </React.StrictMode>
);
