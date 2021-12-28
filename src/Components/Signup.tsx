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
import { formCreation, signupData } from "../common/types";


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

    const inputGenerationData: formCreation[] = [
        { labelText: "Username", placeholder: "example@gmail.com", name: "username", type: "text", registerFunction: register, errorMessages: errors },
        { labelText: "Password", placeholder: "", name: "password", type: "password", registerFunction: register, errorMessages: errors },
        { labelText: "Confirm Password", placeholder: "", name: "confirmPassword", type: "password", registerFunction: register, errorMessages: errors },
    ]

    function onSubmit(data: signupData) {
        dispatch(setUserDetails({
            ...userDetails,
            username: data.username
        }))

        console.log("Sending this data to API to create user account")
        console.log({
            ...userDetails,
            username: data.username,
            password: data.password
        })
    }

    return (
        <div className="signup-page" data-testid="signup-rendered">
            <div className="signup-copy-container">
                <h1>Sign Up Here</h1>
                <h2>{qualified.message}</h2>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="signup-form">
                {
                    inputGenerationData.map((i: formCreation, index: number) => {
                        return renderInput(i.labelText, i.placeholder, i.name, i.type, i.errorMessages, index, register)
                    })
                }
                <Button type="submit" name="submit" variant="contained" size="large">SUBMIT</Button>
            </form>

            {/* <DevTool control={control} /> */}
            {/* Enable React-Hook-Form dev tools for this component by uncommenting the line above  */}
        </div>
    )
}