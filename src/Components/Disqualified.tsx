import React from "react";
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import { CombinedState } from "redux";


export default function Disqualified() {
    const qualified = useSelector((state: CombinedState<any>) => state.qualified)

    if (qualified.isQualified === "") {
        return <Navigate to="/" />
    }
    
    return (
        <div>
            <h1>Disqualified</h1>
            <h2>{qualified.message}</h2>
            <p>Please contact us at (123) 456-7890 for more information</p>
        </div>
    )
}