import React, { useState, FormEvent } from "react";

const defaultFormValues = {
    username: "",
    password: "",
    confirmPassword: "",
}


export default function Signup() {

    const [ formValues, setFormValues ] = useState(defaultFormValues)

    function onChange(e: FormEvent<HTMLInputElement>) {
        setFormValues({
            ...formValues,
            [e.currentTarget.name]: e.currentTarget.valueAsNumber || e.currentTarget.value
        })
    }


    return (
        <div>
            <h1>Sign Up Here</h1>
            <form>
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
            </form>
        </div>
    )
}