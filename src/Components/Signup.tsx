import React, { useState, FormEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CombinedState } from "redux";
import { setUserDetails } from "../actions";

const defaultFormValues = {
    username: "",
    password: "",
    confirmPassword: ""
}




export default function Signup() {

    const [ formValues, setFormValues ] = useState(defaultFormValues)
    const userDetails = useSelector((state: CombinedState<any>) => state.userDetails)

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
            username: formValues.username,
            password: formValues.password,
        }))
    }


    return (
        <div>
            <h1>Sign Up Here</h1>
            <form onSubmit={onSubmit}>
                <label>
                    Email:
                    <input name="username" type="text" onChange={onChange} value={formValues.username}/> 
                </label>
                
                <label>
                    Password:
                    <input name="password" type="text" onChange={onChange} value={formValues.password}/> 
                </label>

                <label>
                    Confirm Password:
                    <input name="confirmPassword" type="text" onChange={onChange} value={formValues.confirmPassword}/> 
                </label>
                <button type="submit">SUBMIT</button>
            </form>
        </div>
    )
}