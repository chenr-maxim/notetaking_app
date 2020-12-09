import React from 'react';
import {HashRouter, Switch} from 'react-router-dom'
import {Authentication} from './components/authentication';
import {AuthRoute, ProtectedRoute} from './components/util/routes';
import {Home} from './components/home';
import {NoteInterface} from './components/noteInterface';
import {Profile} from './components/profile';
import './App.css';

function App() {
  return (
    <HashRouter>
      <div className="App">
        <AuthRoute exact path="/" component={Authentication}/>
        <Switch>
          <ProtectedRoute exact path="/" component={NoteInterface}/>
          <ProtectedRoute path="/profile" component={Profile} />
        </Switch>
      </div>
    </HashRouter>
  );
}

export default App;
