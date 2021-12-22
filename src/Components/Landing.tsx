import React, { useState, FormEvent, FC } from "react";

const defaultFormValues = {
    price: "",
    make: "",
    model: "",
    income: "",
    credit: ""
}


function Landing() {

    const [ formValues, setFormValues ] = useState(defaultFormValues)

    function onChange(e: FormEvent<HTMLInputElement>) {
        setFormValues({
            ...formValues,
            [e.currentTarget.name]: e.currentTarget.valueAsNumber || e.currentTarget.value
        })
    }


    return (
        <div>
            <h1>Landing Page</h1>
            <form>
                <label>
                    Auto Purchase Price:
                    <input name="price" type="number" onChange={onChange} value={formValues.price}/> 
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
            </form>
        </div>
    )
}




export default Landing

