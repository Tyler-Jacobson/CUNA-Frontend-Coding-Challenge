import React, { useState, FormEvent, FC } from "react";
import { useSelector, useDispatch } from "react-redux"
import { CombinedState } from "redux";
import { setUserDetails } from "../actions";

const defaultFormValues = {
    price: "",
    make: "",
    model: "",
    income: "",
    credit: ""
}


function Landing() {
    
    const userDetails = useSelector((state: CombinedState<any>) => state.userDetails)

    const [ formValues, setFormValues ] = useState(defaultFormValues)

    
    const dispatch = useDispatch()

    function onChange(e: FormEvent<HTMLInputElement>) {
        setFormValues({
            ...formValues,
            [e.currentTarget.name]: e.currentTarget.valueAsNumber || e.currentTarget.value
        })
    }

    function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        console.log(formValues)
        dispatch(setUserDetails({
            ...userDetails,
            price: formValues.price,
            make: formValues.make,
            model: formValues.model,
            income: formValues.income,
            credit: formValues.credit
        }))
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

