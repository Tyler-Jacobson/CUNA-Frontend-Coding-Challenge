import React, { useState, FormEvent, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom"
import { CombinedState } from "redux";
import { setUserDetails } from "../actions";
import { signupSchema } from "../Validations/SignupValidation";
// import validation from "../helperFunctions/validateErrors";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"

const defaultFormValues = {
    username: "",
    password: "",
    confirmPassword: ""
}

const defaultFormErrors = {
    username: "",
    password: "",
    confirmPassword: ""
}




export default function Signup() {

    const [ formValues, setFormValues ] = useState(defaultFormValues)
    const [formErrors, setFormErrors] = useState(defaultFormErrors)
    const [disabled, setDisabled] = useState(true)

    const userDetails = useSelector((state: CombinedState<any>) => state.userDetails)
    const qualified = useSelector((state: CombinedState<any>) => state.qualified)

    const dispatch = useDispatch()

    useEffect(() => {
        signupSchema.isValid(formValues)
            .then(valid => {
                setDisabled(!valid)
            })
    }, [formValues])

    if (qualified.isQualified === "") {
        return <Navigate to="/" />
    }

    const validation = function (name: any, value: any, schema: any, errors: any, setErrors: any) {
        yup.reach(schema, name)
            .validate(value)
            .then((res: any) => {
                console.log("res: ", res, "[name]", name, 'new value = ""')
                setErrors({ ...errors, [name]: "" })
            })
            .catch((err: any) => {
                console.log("err: ", err, "[name]", name, 'new value =', err.message)
                if (formValues.password === err.value && name === "confirmPassword") { setErrors({ ...errors, [name]: "" }) }
                else { setErrors({ ...errors, [name]: err.message }) }
                // console.log("HERE", formValues.password, err.value, name)
            })
    }

    function onChange(e: FormEvent<HTMLInputElement>) { 
        // console.log(e.currentTarget.name, e.currentTarget.valueAsNumber || e.currentTarget.value)
        validation(e.currentTarget.name, e.currentTarget.value, signupSchema, formErrors, setFormErrors)
        
        setFormValues({
            ...formValues,
            [e.currentTarget.name]: e.currentTarget.valueAsNumber || e.currentTarget.value
        })
    }

    function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        // console.log(formValues)
        dispatch(setUserDetails({
            ...userDetails,
            username: formValues.username,
            password: formValues.password,
        }))
        console.log("Sending all data to API to create user account")
    }


    return (
        <div>
            <h1>Sign Up Here</h1>
            <h2>{qualified.message}</h2>
            <form onSubmit={onSubmit}>
                <label>
                    Email:
                    <input name="username" type="text" placeholder="example@gmail.com" onChange={onChange} value={formValues.username} />
                    <p>{formErrors.username}</p>
                </label>
                
                <label>
                    Password:
                    <input name="password" type="text" onChange={onChange} value={formValues.password}/>
                    <p>{formErrors.password}</p>
                </label>

                <label>
                    Confirm Password:
                    <input name="confirmPassword" type="text" onChange={onChange} value={formValues.confirmPassword}/>
                    <p>{formErrors.confirmPassword}</p>
                </label>
                <button type="submit" disabled={disabled}>SUBMIT</button>
            </form>
        </div>
    )
}