import { Route, Switch } from 'react-router';
import './App.css';
import Header from './components/header'
import { HotelContextProvider } from './context/hotelsContext';
import Home from './pages/Home';
import Hotels from './pages/Hotels';
import Login from './pages/Login';
import Pagenotfound from './pages/pagenotfound';
import Reviews from './pages/Reviews';
import Signup from './pages/Signup';
import Unauthorized from './pages/unauthorized';
import UpdateHotel from './pages/UpdateHotel';


function App() {
  return (
    //wraping with the context provider
    <HotelContextProvider>
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={() => <Home />} />
          <Route path='/Login' component={() => <Login />} />
          <Route path='/Hotels' component={() => <Hotels />} />
          <Route path='/Signup' component={() => <Signup />} />
          <Route exact path='/Hotel/:hotelid/update' component={UpdateHotel} />
          <Route path='/Reviews/:hotelid' component={() => <Reviews />} />
          <Route path='/unauthorized' component={() => <Unauthorized />} />
          <Route default component={() => <Pagenotfound />} />
        </Switch>
      </div>
    </HotelContextProvider>
  )
}

export default App;
