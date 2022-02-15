import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Landing from './Components/LandingPage/LandingPage';
import Home from './Components/Home/Home';
import NotFound from './Components/NotFound/NotFound';
import Details from './Components/Details/Details'
import CreateDog from './Components/Form/Form';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path={'/'} element={<Landing/>}/>
          <Route exact path={'/home'} element={<Home/>} />
          <Route exact path={`/details/:id`} element={<Details/>} />
          <Route exact path={`/createDog`} element={<CreateDog/>} />
          <Route path={'/*'} element={<NotFound/>} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
