import React from 'react'
import {
    useParams
  } from "react-router-dom";


type Params = {
    fundid: string
    subfundid: string
}

const Subfund = () => {
    const { fundid, subfundid } = useParams<Params>();
    console.log(fundid)
    console.log(subfundid)
    return(
        <div>
        </div>
    )
}

export default Subfund