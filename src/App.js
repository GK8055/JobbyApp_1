import './App.css'
import {Route, Switch,Redirect} from 'react-router-dom'
import Home from './components/Home'
import Header from './components/Header'
import Login from './components/Login'
import Jobs from './components/Jobs'
import NotFound from './components/NotFound'

import JobCardDetails from './components/JobCardDetails'

import ProtectedRoute from './components/ProtectedRoute'

const App = () => (
  <div>
    <div className="app_container">
      <Header />
      <Switch>
        <Route exact path="/login" component={Login} />
        <ProtectedRoute exact path="/" component={Home} />
        <ProtectedRoute exact path="/jobs" component={Jobs} />
        <ProtectedRoute exact path="/jobs/:id" component={JobCardDetails} />
        <Route exact path="/not-found" component={NotFound} />
        <Redirect to='not-found'/>
      </Switch>
    </div>
  </div>
)

export default App
