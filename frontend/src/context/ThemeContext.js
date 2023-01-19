import React, { createContext, useState,useEffect } from "react";
const ThemeContext=createContext()
export default ThemeContext;

export const ThemeProvider=({children})=>{
    const [theme,setTheme]=useState('light')
    const toggleTheme=()=>{
        if(theme==='light'){setTheme('dark')}
        else setTheme('light')
    }
    const [myStyle, setMyStyle] = useState({
        background: 'white',
        color: '#181818',
    })

    const [inputStyle,setInputStyle]=useState({})

    useEffect(() => {
        if (theme === 'dark') {
            setMyStyle({
                background: '#121212',
                color: 'white'
            })
            setInputStyle({
                background:'#404040',
                color:"rgb(10 229 245)"
            })
        }
        else {
            setMyStyle({
                background: 'white',
                color: '#181818'
            })
            setInputStyle({
                background:"white",
                color:"rgba(1, 90, 72, 0.822)"
            })
        }
    }, [theme])


    return(
        <ThemeContext.Provider value={{theme,toggleTheme,myStyle,inputStyle}}>  
            {children}
        </ThemeContext.Provider>
    )
}