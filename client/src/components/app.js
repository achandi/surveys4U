import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Landing from './page/landing';
import Dashboard from './page/dashboard';
import NewSurvey from './page/newSurvey';
import Header from './UI/header';

const App = (props) => {
  return (
    <BrowserRouter>
      <React.Fragment>
        <Header />
        <Route exact path="/" component={Landing}></Route>
        <Route exact path="/surveys" component={Dashboard}></Route>
        <Route path="/surveys/new" component={NewSurvey}></Route>
      </React.Fragment>
    </BrowserRouter>
  );
};

export default App;
