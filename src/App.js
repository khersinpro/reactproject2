import React, {useState, Fragment} from 'react';
import Nav from './components/Nav';
import Home from './components/Home';
import Country from './components/Country';
import NotFound from './components/NotFound';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import './Styles/main.scss'

function App() {

  const [blackOrWhite, setBlackOrWhite] = useState(true)
  const colorChoice = () => {
    setBlackOrWhite(!blackOrWhite)
  }

  return (
    <BrowserRouter>
      <Fragment>
        <Nav blackOrWhite={colorChoice} colorMode={blackOrWhite} />
        <Routes>
          <Route path='/reactproject2/' element={<Home colorMode={blackOrWhite} />}  />
          <Route path='/reactproject2/country' element={<Country  colorMode={blackOrWhite}/>} />
          <Route path='/*' element={ <NotFound colorMode={blackOrWhite}  />} />
        </Routes>
        
      </Fragment>   
    </BrowserRouter>

  );
}

export default App;
