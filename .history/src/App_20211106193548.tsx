import { lazy } from 'react'
import { BrowserRouter as Router, Switch,  Redirect } from 'react-router-dom'
import AccessibleNavigationAnnouncer from './components/AccessibleNavigationAnnouncer'
import AppProvider from "./hooks";
import Route from './routes/Route';
const Layout = lazy(() => import('./containers/Layout'))
const Login = lazy(() => import('./pages/Login/Login'))

function App() {
  return (
    <>
      <Router>
        <AppProvider>
        <AccessibleNavigationAnnouncer />
        <Switch>
          <Route path="/login" exact component={Login} />
          {/* <Route path="/create-account" component={CreateAccount} />
          <Route path="/forgot-password" component={ForgotPassword} /> */}

          {/* Place new routes over this */}
          <Route path="/app" component={Layout} isPrivate/>
          {/* If you have an index page, you can remothis Redirect */}
          <Redirect exact from="/" to="/login" />
        </Switch>
        </AppProvider>
     
      </Router>
    </>
  )
}

export default App
