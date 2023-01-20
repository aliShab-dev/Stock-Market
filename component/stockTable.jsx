
import { useState , useEffect, useContext, } from "react"
import { GlobalContext, useGlobalHook } from "../context/context"

const StockTable = () => {

    const [search, setSearch]= useState('')

    const [results, setResults]= useState([])
    
    const {addStock} = useGlobalHook()

    const dropDown = () => {
        const dDClass = search? 'show':null

        return<ul 
        style={{height: "300px",
        overflowY:'scroll',
        width: "280px",
        overflowX:'hidden',
        cursor:'pointer' }} className={`dropdown-menu ${dDClass}`}>
     {
        results.map((result) => {
            return(
            <li key={result.symbol} onClick={()=>{
                addStock(result.symbol)
                setSearch('')
                }} className="dropdown-item">{result.description} 
             ({result.symbol}) </li>
            )
        })
     }
     </ul>

    }
    
    useEffect(() => {
        const fetchData = async() => {
            await fetch(`https://finnhub.io/api/v1/search?q=${search}&token=cd17apqad3ibhpvq7ee0cd17apqad3ibhpvq7eeg`)
            .then(res => res.json())
            .then(data => setResults(data.result))
            .catch(er=> console.log(er))
        }   
        if(search.length > 0){
            fetchData()
        }else{
            setResults([])
        }
        
    },[search])
    

    return<div className="w-50 p-5 rounded mx-auto">
        <div className="form-floating dropdown">
            <input id="search" className="form-control" autoComplete="off"
             style={{backgroundColor: 'rgba(145,150,171,0.1'}} type="text"
             placeholder="Search..." value={search} 
             onChange={(e)=> setSearch(e.target.value)} />

            <label htmlFor='search'>Search...</label>
            {dropDown()}
        </div>
    </div>
    
    
}
export default StockTable