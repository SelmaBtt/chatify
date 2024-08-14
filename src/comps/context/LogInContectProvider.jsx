import React, { createContext, useState } from 'react';

export const LogInContext = createContext();

const LogInContextProvider = (props) => {

    

    return(
        <LogInContext.Provider value={{ 
            
        }}>
            {props.children}
        </LogInContext.Provider>
    )
}
export default LogInContextProvider;