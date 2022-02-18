import React, { useState} from 'react'
import {useLocation, NavLink} from 'react-router-dom'

const Country = ({colorMode}) => {

  let location = useLocation()

  const [locationCode, setLocationCode] = useState(location.state[1])
  const actualCountry = location.state[0].filter(country => country.alpha3Code.includes(locationCode) )
  const changeLocation = e => {
    setLocationCode(e.target.value)
  }
  const {name , population, capital, region,
  flag, nativeName, subregion, topLevelDomain,
  currencies,languages, borders} = actualCountry[0]
    
  return (
    <div className={` country ${colorMode ? "light" : "dark"}`}>

      <button className={`backBtn ${colorMode ? "lightElem" : "darkElem"}`}>
        <NavLink className="backBtn__anchor" style={{color: colorMode ? 'black' : 'white'}} to="/reactproject2/" >
          <svg fill={`${colorMode ? "black" : "white"}`} height="1.8em" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M9.375 233.4l128-128c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L109.3 224H480c17.69 0 32 14.31 32 32s-14.31 32-32 
              32H109.3l73.38 73.38c12.5 12.5 12.5 32.75 0 45.25c-12.49 12.49-32.74 12.51-45.25 0l-128-128C-3.125 266.1-3.125 245.9 9.375 233.4z">
            </path>
          </svg>  
          Back
        </NavLink>
      </button>

      <div className='countryContent'>
        <img src={flag} alt={name} />
        <div className='countryContent__info'>

          <h2>{name}</h2>

          <div className='countryContent__info--first'>

            <div className='first'>
              <p><span>Native Name: </span>{nativeName}</p>
              <p><span>Population: </span> {population}</p>
              <p><span>Region: </span> {region}</p>
              <p><span>Sub Region: </span>{subregion}</p>
              <p><span>Capital: </span> {capital}</p>
            </div>

            <div className='second'>
              <p><span>Top Level Domain: </span>{topLevelDomain}</p>
              <p><span>Currencies: </span>{currencies.length !== 0 ? ( currencies[0].name) : ("")}</p>
              <p><span>Languages: </span>{languages.map(language => language.name + " ")}</p>
            </div>

          </div>

          <div className='countryContent__info--second'>

            <p>Border Countries:</p>

            <div className='listContainer'>
              {borders.map(border => <button onClick={changeLocation} className={`${colorMode ? "lightElem" : "darkElem"}`} key={border} value={border}>{border}</button>)}
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Country