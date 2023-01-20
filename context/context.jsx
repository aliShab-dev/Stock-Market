import { createContext, useState, useContext,useEffect} from "react";

export const GlobalContext = createContext()

export const GlobalContextProvider= ({children}) => {

    const [watchList, setWatchList] = useState(
        JSON.parse(localStorage.getItem('watchList')) || ['AMZN','MSFT','GOOGL', 'TSLA']
    )


useEffect(()=>{
localStorage.setItem('watchList',JSON.stringify(watchList))
},[watchList])



    
        const addStock = (stock) => {
            if (watchList.indexOf(stock) === -1) {
                setWatchList([...watchList, stock])
                
            }
    
        }
    
        const deleteStock = (stock) => {
          setWatchList(watchList.filter(item=> item !== stock))
            
        }
    
    
    
    
    
    

return <GlobalContext.Provider value={{watchList , setWatchList, addStock, deleteStock}}>
            {children}
        </GlobalContext.Provider>
}


export const useGlobalHook = () => {
    return useContext(GlobalContext)
}