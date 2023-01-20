import StockList from "./autoFill"
import StockTable from './stockTable'
import { useState } from "react"
import { ReactIcon } from "./reactIcon"

const MainPage = () => {

    const [watchList, setWatchList] = useState(['AMZN','MSFT','GOOGL', 'TSLA'])
    
    
    
    return <div className="container">

        <ReactIcon/>

        <StockTable/>
        
        <StockList/>
        
    </div>
}

export default MainPage