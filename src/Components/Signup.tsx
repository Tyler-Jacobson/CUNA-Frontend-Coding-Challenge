import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom"
import { CombinedState } from "redux";
import { setUserDetails } from "../actions";
import { signupSchema } from "../Validations/SignupValidation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { DevTool } from "@hookform/devtools";


export default function Signup() {

    const userDetails = useSelector((state: CombinedState<any>) => state.userDetails)
    const qualified = useSelector((state: CombinedState<any>) => state.qualified)

    const dispatch = useDispatch()

    const { register, handleSubmit, formState: {errors}, control } = useForm({
        resolver: yupResolver(signupSchema),
    })

    if (qualified.isQualified === "") {
        return <Navigate to="/" />
    }

    function onSubmit(data: any) {
        dispatch(setUserDetails({
            ...userDetails,
            username: data.username,
            password: data.confirmPassword,
        }))
        console.log("Sending all data to API to create user account")
    }

    return (
        <div>
            <h1>Sign Up Here</h1>
            <h2>{qualified.message}</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
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
            </form>

            <DevTool control={control} />
        </div>
    )
}