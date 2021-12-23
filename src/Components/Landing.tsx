import React, { useState, FormEvent } from "react";
import { useSelector, useDispatch } from "react-redux"
import { CombinedState } from "redux";
import { setUserDetails, setQualified } from "../actions";
import { Navigate } from "react-router-dom"
import mockFetch from "../helperFunctions/mockAPI";

const defaultFormValues = {
    price: "",
    make: "",
    model: "",
    income: "",
    credit: ""
}




function Landing() {
    
    const userDetails = useSelector((state: CombinedState<any>) => state.userDetails)
    const qualified = useSelector((state: CombinedState<any>) => state.qualified)

    const [ formValues, setFormValues ] = useState(defaultFormValues)

    const dispatch = useDispatch()

    
    // if (qualified.isQualified ==) {
    //     return <Navigate to="/" />
    // }


    function onChange(e: FormEvent<HTMLInputElement>) {
        setFormValues({
            ...formValues,
            [e.currentTarget.name]: e.currentTarget.valueAsNumber || e.currentTarget.value
        })
    }

    function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        console.log("formValues", formValues)
        dispatch(setUserDetails({
            ...userDetails,
            price: formValues.price,
            make: formValues.make,
            model: formValues.model,
            income: formValues.income,
            credit: formValues.credit
        }))

        mockFetch("https://cuna-backend.com/qualified", {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: formValues
            })
            .then((res: any) => {
                console.log("Response received with value: " + res)
                dispatch(setQualified({
                    isQualified: res.isQualified,
                    message: res.message
                }))
            })
            .catch(err => {
                dispatch(setQualified({
                    isQualified: err.isQualified,
                    message: err.message
                }))
            })
        }


    return (
        <div>
            <h1>Landing Page</h1>
            <form onSubmit={onSubmit}>
                <label>
                    Auto Purchase Price:
                    <input name="price" type="number" onChange={(e) => onChange(e)} value={formValues.price}/> 
                </label>
                
                <label>
                    Auto Make:
                    <input name="make" type="text" onChange={onChange} value={formValues.make}/> 
                </label>
                
                <label>
                    Auto Model:
                    <input name="model" type="text" onChange={onChange} value={formValues.model}/> 
                </label>

                <label>
                    User Estimated Yearly Income:
                    <input name="income" type="number" onChange={onChange} value={formValues.income}/> 
                </label>

                <label>
                    User Estimated Credit Score:
                    <input name="credit" type="number" onChange={onChange} value={formValues.credit}/> 
                </label>

                <button type="submit">SUBMIT</button>
            </form>
        </div>
    )
}




export default Landing

