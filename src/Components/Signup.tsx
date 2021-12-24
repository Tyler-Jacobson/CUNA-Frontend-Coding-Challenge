import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom"
import { CombinedState } from "redux";
import { setUserDetails } from "../actions";
import { signupSchema } from "../Validations/SignupValidation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { DevTool } from "@hookform/devtools";
import { Button } from '@mui/material';
import renderInput from "../helperFunctions/renderInput"


export default function Signup() {

    const userDetails = useSelector((state: CombinedState<any>) => state.userDetails)
    const qualified = useSelector((state: CombinedState<any>) => state.qualified)

    const dispatch = useDispatch()

    const { register, handleSubmit, formState: { errors }, control } = useForm({
        resolver: yupResolver(signupSchema),
    })

    if (qualified.isQualified === "") {
        return <Navigate to="/" />
    }

    const inputGenerationData: any = [
        { labelText: "Username", placeholder: "example@gmail.com", name: "username", type: "text", registerFunction: register, errorMessages: errors },
        { labelText: "Password", placeholder: "", name: "password", type: "password", registerFunction: register, errorMessages: errors },
        { labelText: "Confirm Password", placeholder: "", name: "confirmPassword", type: "password", registerFunction: register, errorMessages: errors },
    ]

    function onSubmit(data: any) {
        dispatch(setUserDetails({
            ...userDetails,
            username: data.username,
            password: data.confirmPassword,
        }))
        console.log("Sending all data to API to create user account")
    }

    return (
        <div className="signup-page">
            <div className="signup-copy-container">
                <h1>Sign Up Here</h1>
                <h2>{qualified.message}</h2>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="signup-form">
                {/* In this situation, I've decided to loop an array of objects, which contains the values needed to generate all of the needed form inputs.
                        I also considered rendering each input individually using a function, or possibly hard coding every input.
                        I'm really not sure if this is the best solution. I'm worried that it might affect the readability of my code.*/}
                {
                    inputGenerationData.map((i: any, index: number) => {
                        console.log("I", i)
                        return renderInput(i.labelText, i.placeholder, i.name, i.type, i.errorMessages, index, register)
                    })
                }
                {
                    qualified.isQualified === "bad_request" ? <p className="error">{qualified.message}</p> : ""
                }

                <Button type="submit" name="submit" variant="contained" size="large">SUBMIT</Button>
            </form>
            {/* <form onSubmit={handleSubmit(onSubmit)}>
                <label>
                    Email:
                    <input {...register('username', { required: true })} type="text" placeholder="example@gmail.com"/>
                    <p>{errors.username?.message}</p>
                </label>
                
                <label>
                    Password:
                    <input {...register('password')} name="password" type="text"/>
                    <p>{errors.password?.message}</p>
                </label>

                <label>
                    Confirm Password:
                    <input {...register('confirmPassword')} name="confirmPassword" type="text"/>
                    <p>{errors.confirmPassword?.message}</p>
                </label>
                <input type="submit" id="submit"/>
            </form> */}

            {/* <DevTool control={control} /> */}
            {/* Enable React-Hook-Form dev tools for this component by uncommenting the line above  */}
        </div>
    )
}