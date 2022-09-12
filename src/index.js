import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginPage from './Page/LoginPage';
import SalesDashboard from './Page/SalesDashboard';
import SignupPage from './Page/SignupPage';
import FundingDashboard from './Page/FundingDashboard';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={SalesDashboard} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/signup" component={SignupPage} />
        <Route exact path="/funding" component={FundingDashboard} />
      </Switch>
    </Router>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
