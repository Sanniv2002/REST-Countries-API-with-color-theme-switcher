import { useEffect, useState } from "react"
import Nav from "./components/Nav"
import QueryBar from "./components/QuertBar"

function App() {
  const [drop, setDrop] = useState<boolean>(false)
  const [continent, setContinent] = useState<string>("")
  const [countries, setCountries] = useState<any>()
  const [query, setQuery] = useState<string>("")
  const [detailView, setDetailedView] = useState<boolean>(false)
  const [detailCountry, setDetailCountry] = useState<any>("")

  useEffect(() =>{
    async function fetchCountries(){
      const res = await fetch("https://restcountries.com/v3.1/all")
      const data = await res.json()
      const filterByContinet = continent === "" ? data : data.filter((country:any) => country.region === continent || country.continents[1] === continent)
      setCountries(query === "" ? filterByContinet : filterByContinet.filter((country:any) => (country.name.common).includes(query)))
    }
    fetchCountries()
  }, [continent, query, detailCountry])
  console.log(detailCountry)


  function countryCard(country:any){
    return <div onClick={() => {setDetailedView(!detailView); setDetailCountry(country)}} className="flex flex-col rounded-md bg-[#2b3743] shadow-xl cursor-pointer hover:shadow-2xl max-w-80">
      <img className="h-40 rounded-t-md" src={country.flags.png} alt="" />
      <h2 className="pt-6 pl-6 text-lg text-white font-bold">{country.name.common}</h2>
      <h2 className="pl-6 text-sm text-white pt-3 font-semibold">Population: <span className="font-normal text-[#acb8c4]">{country.population}</span></h2>
      <h2 className="pl-6 text-sm text-white pt-1 font-semibold">Region: <span className="font-normal text-[#acb8c4]">{country.region}</span></h2>
      <h2 className="pl-6 pb-10 text-sm text-white pt-1 font-semibold">Capital: <span className="font-normal text-[#acb8c4]">{country.capital}</span></h2>
    </div>
  }

  //Detailed View
  if(detailView){
    const curr_keys = Object.keys(detailCountry.currencies);
    const curr = curr_keys.join(', ');

    const lang_keys = Object.keys(detailCountry.languages)
    const langs = lang_keys.join(', ')
    let neighbours = []
    if(detailCountry.hasOwnProperty("borders")){
      neighbours = countries.filter((country:any) => (detailCountry.borders).includes(country.cca3))
    }
    

    return <div className="bg-[#202d36] h-screen">
      <Nav />
      <div className="bg-[#202d36] py-10 pl-14">
        <button onClick={() => setDetailedView(!detailView)} className="py-1 px-5 bg-[#2b3743] text-white font-normal rounded-md shadow-lg hover:bg-[#26313b] transition-colors duration-150">Home</button>
      </div>
      <div className="grid md:grid-cols-2 bg-[#202d36] pl-14">
        <div className="bg-[#1f2c35] p-2">
          <img className=" h-3/4" src={detailCountry.flags.svg} alt="" />
        </div>
      <div>
        <h2 className="font-bold text-white text-4xl">{detailCountry.name.common}</h2>
        <div className="grid md:grid-cols-2 gap-4 mt-8">
          <div>
            <h2 className="text-bold text-md pb-3 text-white">Native Name: <span className="text-[#b6c8d4]">{Object.keys(detailCountry.name.nativeName)[0]} </span></h2>
            <h2 className="text-bold text-md pb-3 text-white">Population: <span className="text-[#b6c8d4]">{detailCountry.population} </span></h2>
            <h2 className="text-bold text-md pb-3 text-white">Region: <span className="text-[#b6c8d4]">{detailCountry.region} </span></h2>
            <h2 className="text-bold text-md pb-3 text-white">Sub Region: <span className="text-[#b6c8d4]">{detailCountry.subregion[0]} </span></h2>
            <h2 className="text-bold text-md pb-3 text-white">Capital: <span className="text-[#b6c8d4]">{detailCountry.capital} </span></h2>
          </div>
          <div>
            <h2 className="text-bold text-md pb-3 text-white">Top Level Domain: <span className="text-[#b6c8d4]">{detailCountry.tld} </span></h2>
            <h2 className="text-bold text-md pb-3 text-white">Currencies: <span className="text-[#b6c8d4]">{curr} </span></h2>
            <h2 className="text-bold text-md pb-3 text-white">Languages: <span className="text-[#b6c8d4]">{langs} </span></h2>
          </div>
        </div>
        <div className="md:flex pt-14 pr-32">
          <h2 className="text-bold text-md text-white pr-4 pb-2 md:pb-0">Border Countries: </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 pb-10">
            {neighbours?.map((country:any) => {
              return <button onClick={() => setDetailCountry(country)} className="text-white text-sm px-4 py-1 bg-[#2b3743] rounded-md">{country.name.common}</button>
            })}
          </div>
        </div>
      </div>
      </div>
    </div>
  }

  //Home Page
  else{
    return (
      <div className={`bg-[#202d36]  pb-20 m-0 dark:bg-[#202d36] h-${query===""?"full":"screen"}`}>
        <Nav/>
        <QueryBar setQuery={setQuery} setContinent={setContinent} setDrop={setDrop} continent={continent} drop={drop} query={query} />
        <div className="bg-[#202d36] grid lg:grid-cols-4 md:grid-cols-2 gap-20 mt-12 px-14">
          {countries?.map((country: any) => countryCard(country))}
        </div>
      </div>
    )
  }
}

export default App
