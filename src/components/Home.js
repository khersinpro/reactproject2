import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

export class Home extends Component {

   
    constructor(props) {
      super(props)
    
      this.state = {
        initialCountriesData: [],
        allCountriesData : [],
        FilterButton: 'Filter by Region',
        openFilter: false,
        filterChoices: ["All Regions", "Africa", "Americas", "Asia", "Europe", "Oceania"]
      }
    }
    

    componentDidMount() { 
        axios.get("https://restcountries.com/v2/all?fields=name,population,region,capital,flag,subregion,nativeName,topLevelDomain,currencies,languages,borders,alpha3Code")
        .then(res => {
          const allCountriesData = res.data
          this.setState({
            initialCountriesData: allCountriesData,
            allCountriesData: allCountriesData
          })
        })
        .catch(error => console.log(error))
    }

    countrySelector = (value) => {
      const selectedCountry = this.state.initialCountriesData.filter((country)=>country.region === value)
      this.setState({allCountriesData: selectedCountry})
    }

    filterOption = (e) =>{
      if(e.target.value === "All Regions"){
        this.setState({allCountriesData: this.state.initialCountriesData})
        this.setState({
          FilterButton: e.target.value,
          openFilter: false     
        })
      }else if(e.target.value === "menu") {
        this.setState({
          FilterButton: "Filter by Region",
          openFilter: !this.state.openFilter
        })
      }else if(!e.target.value){
        this.setState({
          openFilter: false
        })
      }else{
        this.countrySelector(e.target.value)
        this.setState({
          FilterButton: e.target.value,
          openFilter: false
        })
      }
    }
    
    filterChanges = (e) => {
      if(e.target.value.length >= 3){
        const selectedCountry = this.state.initialCountriesData.filter((country) => country.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(e.target.value))
        this.setState({allCountriesData: selectedCountry})
      }else{
        this.setState({allCountriesData: this.state.initialCountriesData})
      }
    }
  render() {

    const {colorMode} = this.props
    const colorChoices = colorMode ? 'lightElem' : "darkElem"

    return (
      <div className={`homeContainer ${colorMode ? 'light' : "dark"}`} onClick={this.filterOption} >
        
        <div className='navigation'>
          <div className={` inputContainer ${colorMode ? 'lightElem' : "darkElem"}`}>

            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className="text-xl flex-2 text-gray-400 mr-5" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
              <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 
                0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 
                99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 
                0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z">
              </path>
            </svg>

            <input 
              onChange={this.filterChanges} 
              type="text" 
              placeholder='Search for a country...' 
              className={`${colorMode ? 'lightElem' : "darkElem"}`}
            />

          </div>
 
          <div className='dropDownMenu'>

            <button 
              className={`choice ${colorChoices}`} 
              onClick={this.filterOption} 
              value="menu"
            >{this.state.FilterButton}
            <svg width="11" height="7" xmlns="http://www.w3.org/2000/svg" className={`${this.state.openFilter && "rotate"}`}>
              <path d="M1 .799l4 4 4-4" stroke={`${!colorMode ? "white" : "black"}`} strokeWidth="2.5" fill="none" fillRule="evenodd"/>
            </svg>
            </button>

            <div className='options' style={{display: `${this.state.openFilter ? "block" : "none"}`}}>
              {this.state.filterChoices.map((region, index) => (
                 <button className={colorChoices} 
                  onClick={this.filterOption} 
                  value={region} 
                  key={index}>{region}</button>
              ))}
            </div>

          </div>

        </div>

        <ul className='cardContainer'>
            {this.state.allCountriesData.map(countrie => (
                <Link to={{pathname:'/reactproject2/country'}}  state={[this.state.initialCountriesData, countrie.alpha3Code]}  key={countrie.name} className={`card ${colorMode ? 'lightElem' : "darkElem"}`}>
                  <li className={` ${colorMode ? 'lightElem' : "darkElem"}`}>                   
                      <img src={countrie.flag} />                   
                      <div className='countryInfos'>
                        <h2>{countrie.name}</h2>
                        <p><span>Population:</span> {countrie.population}</p>
                        <p><span>Region:</span> {countrie.region}</p>
                        <p><span>Capital:</span> {countrie.capital}</p>
                      </div>                     
                  </li>
                </Link>
            ))}
        </ul>

      </div>

    )
  }
}

export default Home