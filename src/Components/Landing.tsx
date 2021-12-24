import { useSelector, useDispatch } from "react-redux"
import { CombinedState } from "redux";
import { setUserDetails, setQualified } from "../actions";
import { Navigate, useNavigate } from "react-router-dom"
import mockFetch from "../helperFunctions/mockAPI";
// import * as yup from "yup";
import { landingSchema } from "../Validations/LandingValidation";
// import validation from "../helperFunctions/validateErrors";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { DevTool } from "@hookform/devtools";

interface landingForm {
    price: number,
    make: string,
    model: string,
    income: number,
    credit: number
}

const marketingCopy = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ac nibh lobortis felis lacinia faucibus. Phasellus gravida tempus leo sed blandit. Donec diam purus, fermentum at tincidunt sit amet, dapibus sed lectus. Aenean eu laoreet dolor, eu blandit orci. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris molestie, nisl in aliquam accumsan, nisi sem fermentum dui, dictum finibus justo felis sit amet orci. Duis gravida leo vitae dui vestibulum lobortis. Ut vitae maximus turpis. Phasellus porttitor laoreet erat, vel facilisis neque mattis vitae."


function Landing() {

    const userDetails = useSelector((state: CombinedState<any>) => state.userDetails)
    const qualified = useSelector((state: CombinedState<any>) => state.qualified)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { register, handleSubmit, formState: {errors}, control } = useForm({
        resolver: yupResolver(landingSchema),
    })

    if (qualified.isQualified === "disqualified") {
        return <Navigate to="/disqualified" />
    }

    function onSubmit(data: landingForm) {
        const sanitizedData = {
            price: data.price,
            make: data.make,
            model: data.model,
            income: data.income,
            credit: data.credit
        }
        dispatch(setUserDetails({
            ...userDetails,
            sanitizedData
        }))

        mockFetch("https://cuna-backend.com/qualified", { method: "GET", body: sanitizedData })
            .then((res: any) => {
                console.log("Response received with value: " + res)
                dispatch(setQualified({
                    isQualified: res.isQualified,
                    message: res.message
                }))
                navigate("/signup")
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
            <div>
            <p>{marketingCopy}</p>
            
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>
                    Auto Purchase Price:
                    <input {...register('price')} name="price" type="number" />
                    <p>{errors.price?.message}</p>
                </label>

                <label>
                    Auto Make:
                    <input {...register('make')} name="make" type="text" />
                    <p>{errors.make?.message}</p>
                </label>

                <label>
                    Auto Model:
                    <input {...register('model')} name="model" type="text" />
                    <p>{errors.model?.message}</p>
                </label>

                <label>
                    User Estimated Yearly Income:
                    <input {...register('income')} name="income" type="number" />
                    <p>{errors.income?.message}</p>
                </label>

                <label>
                    User Estimated Credit Score:
                    <input {...register('credit')} name="credit" type="number" />
                    <p>{errors.credit?.message}</p>
                </label>

                <input type="submit" id="submit"/>
            </form>
            {
                qualified.isQualified === "bad_request" ? <p>{qualified.message}</p> : ""
            }
            </div>

            {/* <DevTool control={control} /> */}
            {/* Enable React-Hook-Form dev tools for this component by uncommenting the line above  */}
        </div>
    )
    
}




export default Landing

