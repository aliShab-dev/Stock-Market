
import { useEffect, useState } from "react"
import {BiDownArrow} from 'react-icons/bi'
import {BiUpArrow} from 'react-icons/bi'
import { IconName } from "react-icons/bs"
import watchList from "./mainTrack"
import { useGlobalHook } from "../context/context"
import { useNavigate } from "react-router-dom"

 const StockList = () => {
    // const [watchList, setWatchList] = useState(['AMZN','MSFT','GOOGL', 'TSLA'])

    const {watchList, setWatchList, deleteStock } = useGlobalHook()
    
    const [stocks, setStocks] = useState([])
    
    const navigate = useNavigate()
    
    useEffect(()=>{
        let isMounted = true
        
        const fetchData= async () =>{
        const responses = await Promise.all(
            watchList.map((item)=>{
                return fetch(`https://finnhub.io/api/v1/quote?symbol=${item}&token=cd17apqad3ibhpvq7ee0cd17apqad3ibhpvq7eeg`)         
                .then(res => res.json())
                .then(data=> data={...data,name:item})
             })
             
        )
     
        console.log(responses)
        setStocks(responses) 
        

        }

        fetchData()

        return () =>( isMounted = false )
     },[watchList])
     

     const handleStockSelected = (name) => {
        navigate(`detail/${name}`) 
     }

    return<table className="table hover mt-5">
        <thead style={{color:" rgb(79,89,102)"}}>
            <tr>
                <th scope="col">Name</th>
                <th scope="col">Last</th>
                <th scope="col">Change</th>
                <th scope="col">Change%</th>
                <th scope="col">High</th>
                <th scope="col">Low</th>
                <th scope="col">Open</th>
                <th scope="col">Pricclose</th>
            </tr>
        </thead>
        <tbody>
            {
                stocks.map((item)=> {
                    return(
                    <tr style={{cursor:'pointer'}} key={item.name} className="table-row" onClick={()=>{
                         handleStockSelected(item.name)}}>
                        <th>{item.name}</th>
                        <td>{item.c}</td> 
                        <td className={item.d > 0? 'text-success':'text-danger'}>{item.d} <i>{item.d <0?<BiDownArrow/>:<BiUpArrow/>}</i> </td>
                        <td className={item.dp > 0? 'text-success':'text-danger'}>{item.dp} <i>{item.dp <0?<BiDownArrow/>:<BiUpArrow/>}</i></td>
                        <td>{item.h}</td>
                        <td>{item.l}</td>
                        <td>{item.o}</td>
                        <td>{item.pc} <button className="btn btn-danger btn-sm ms-3 delete-button"
                        onClick={(e)=>{
                            e.stopPropagation()
                            deleteStock(item.name)}}
                            >Delete</button></td>
                        
                    </tr>
                    )
                })
            }
        </tbody>

    </table>
    

}
 
export default StockList