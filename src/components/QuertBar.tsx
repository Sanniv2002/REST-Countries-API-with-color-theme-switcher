import { Dispatch } from "react"

interface queryProps{
    setQuery: Dispatch<React.SetStateAction<string>>;
    setContinent: Dispatch<React.SetStateAction<string>>;
    setDrop: Dispatch<React.SetStateAction<boolean>>;
    continent: string;
    drop: boolean
    query: string
}

export default function QueryBar({ setQuery, setContinent, continent, drop, setDrop, query}: queryProps){
    return <div className="md:flex justify-between px-14 pt-10">
    <input defaultValue={query} onChange={(e) => setQuery((e.target.value).charAt(0).toUpperCase() + (e.target.value).slice(1))} className="text-sm text-[#c3cdd6] pl-8 py-4 rounded-md pr-52 shadow-md max-w-96 bg-[#2b3743]" type="text" placeholder="Search for a country..." />
    <div className=" rounded-xl shadow-md hover:bg-gray-100 relative my-2 md:my-0 max-w-56">
      <div onClick={() => setDrop(!drop)} className="flex bg-[#2b3743] rounded-md">
        <button className="rounded-md py-4 pl-6 pr-3 text-sm bg-[#2b3743] text-white hover:text-gray-200">{continent===""?"Filter by region":continent}</button>
        <h2 className="rounded-md py-4 pl-4 pr-5 bg-[#2b3743]">&#9660;</h2>
      </div>
      <ul className={`${drop?"absolute":"hidden"} rounded-md m-2 bg-[#2b3743] z-10 max-w-40`}>
        {continent!==""? <li onClick={() =>{ setContinent(""); setDrop(!drop) }} className="pl-8 py-2 pr-32 cursor-pointer text-white hover:text-white text-sm">All</li>:<li></li>}
        <li onClick={() =>{ continent!="Africa"? setContinent("Africa"): setContinent(""); setDrop(!drop)}} className={`pl-8 py-2 pr-32 text-${continent=="Africa"?"gray-500":""} text-white cursor-pointer hover:text-gray-200 text-sm`}>Africa</li>
        <li onClick={() =>{ continent!="Americas"? setContinent("Americas"): setContinent(""); setDrop(!drop)}} className={`pl-8 py-2 pr-32 text-${continent=="Americas"?"gray-500":""} text-white cursor-pointer hover:text-gray-200 text-sm`}>Americas</li>
        <li onClick={() =>{ continent!="Asia"? setContinent("Asia"): setContinent(""); setDrop(!drop)}} className={`pl-8 py-2 pr-32 text-${continent=="Asia"?"gray-500":""} cursor-pointer text-white hover:text-gray-200 text-sm`}>Asia</li>
        <li onClick={() =>{ continent!="Europe"? setContinent("Europe"): setContinent(""); setDrop(!drop)}} className={`pl-8 py-2 pr-32 text-${continent=="Europe"?"gray-500":""} cursor-pointer text-white hover:text-gray-200 text-sm`}>Europe</li>
        <li onClick={() =>{ continent!="Oceania"? setContinent("Oceania"): setContinent(""); setDrop(!drop)}} className={`pl-8 py-2 pr-32 text-${continent=="Ocenia"?"gray-500":""} cursor-pointer text-white hover:text-gray-200 text-sm`}>Oceania</li>
        </ul>
    </div>
  </div>

}