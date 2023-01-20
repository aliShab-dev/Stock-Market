import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { StockChart } from "./stockChart"
import { StockData } from "./sockData"



const formatData = (data) => {
return data.t.map((el, index)=> {
    return {
        x:el * 1000,
        y:Math.floor(data.c[index])
    }
})
  

}

const DetailPage = () => {

    const {symbol} = useParams()

    const [chartData, setChartData] = useState() 

    const pramData= ''
    
    useEffect(() => {
     const fetchData = async () => {
        const date = new Date()
        const currentTime = Math.floor(date.getTime()/1000)
        let oneDay;
        if(date.getDay() === 6){
            oneDay =currentTime - 2*24*60*60
        }else if(date.getDay() === 0){
            oneDay =currentTime - 3*24*60*60
        }else {
            oneDay =currentTime - 24*60*60
        }
        const oneWeek = currentTime - 7*24*60*60 
        
        const oneYear = currentTime - 365*24*60*60


        const responses = await Promise.all([fetch(`https://finnhub.io/api/v1/stock/candle?symbol=${symbol}&resolution=30&from=${oneDay}&to=${currentTime}&token=cd17apqad3ibhpvq7ee0cd17apqad3ibhpvq7eeg`)
                .then(res => res.json()),
                
                 fetch(`https://finnhub.io/api/v1/stock/candle?symbol=${symbol}&resolution=60&from=${oneWeek}&to=${currentTime}&token=cd17apqad3ibhpvq7ee0cd17apqad3ibhpvq7eeg`)
                .then(res => res.json()),
                
                 fetch(`https://finnhub.io/api/v1/stock/candle?symbol=${symbol}&resolution=W&from=${oneYear}&to=${currentTime}&token=cd17apqad3ibhpvq7ee0cd17apqad3ibhpvq7eeg`)
                .then(res => res.json())

        ])
            // console.log(responses[0].t)
            setChartData({
                day: formatData(responses[0]),
                week:formatData(responses[1]),
                year:formatData(responses[2])
            }) 
        }
  
     fetchData() 

    },[symbol])

    return <div>


        {chartData && (
        <div>
           <StockChart chartData ={chartData} symbol={symbol}/>
           <StockData symbol={symbol}/>
        </div>
        )}
        
    </div>

}

export default DetailPage