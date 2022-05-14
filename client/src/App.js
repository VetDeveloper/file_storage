import 'materialize-css'
import {BrowserRouter as Router} from 'react-router-dom'
import { useRoutes } from './routes';
import {useAuth} from './hooks/auth.hook'
import {Navbar} from './components/Navbar'
import {Provider} from 'react-redux'
import { getStore } from './store/store';


function App() {
  const {token, login, logout, userId, ready, expTime} = useAuth()
  const isAuthenticated = !!token && expTime > Date.now()
  
  const routes = useRoutes(isAuthenticated)

  const defState = {
    token: token, 
    login: login, 
    logout: logout, 
    userId: userId, 
    isAuthenticated: isAuthenticated
  }

  const store = getStore(defState)

  if (!ready) {
    return <p className='center'>Loading auth</p>
  }

  return (
    <Provider store={store}>
      <Router>
        {isAuthenticated && <Navbar/>}
        <div className="container">
          {routes}
        </div>
      </Router>
    </Provider>
  )
}

export default App;
