import { useState } from 'react'
import Chart from 'react-apexcharts'


export const StockChart = ({chartData, symbol}) => {
const {day, week, year} =chartData
const [dateFormat, setDateForamt] = useState("24h") 






const determinTimeFormat = () => {
    switch(dateFormat){
        case"24h":
        return day
        
        case"7d":
        return week
        
        case"1y":
        return year
        
        default:
            return day
        }
    }
    
    const color = determinTimeFormat()
    [determinTimeFormat().length -1].y -
     determinTimeFormat()[determinTimeFormat().length - 2].y
      > 0 ?'#26c281': '#ed3419'


    const options = {
        colors:[color],
        title: {
            text: symbol,
            align: 'center',
            style : {
                fontSize: '24px'
            }
        },
        chart: {
            id: 'stock data',
            animation: {
                speed: 1300
            }
        },
        xaxis: {
            type: 'datetime',
            labels: {
                datetimeUTC:false
            }
        },
        tooltip:{
            x: {
                format:'MMM dd HH:MM'
            }
        }

    }

    const series = [{
        name : symbol,
        data: determinTimeFormat()
    }]

    const selectedBTn = (button) => {
        const classes = ' btn m-1 '
        if (button === dateFormat){
            return classes + "btn-primary" 
        }else {
            return classes + "btn-outline-primary"
        }
    }
    
    return<div className='mt-5 p-4 shadow-sm bg-white'>
        <Chart
        options={options}
        series={series}
        type='area'
        witdth= '100%'
        />
    <div> 
        <button className={selectedBTn("24h")} onClick={()=> setDateForamt('24h')}>24H</button>
        <button className={selectedBTn("7d")} onClick={()=> setDateForamt('7d')}>7d</button>
        <button className={selectedBTn("1y")} onClick={()=> setDateForamt('1y')}>1y</button>
    </div>
    </div>
}

// now we use APEX library to make a chart out of these datas