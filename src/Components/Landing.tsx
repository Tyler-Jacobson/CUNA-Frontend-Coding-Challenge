import { useSelector, useDispatch } from "react-redux"
import { CombinedState } from "redux";
import { setUserDetails, setQualified } from "../actions";
import { Navigate, useNavigate } from "react-router-dom"
import mockFetch from "../helperFunctions/mockAPI";
import renderInput from "../helperFunctions/renderInput"
import { landingSchema } from "../Validations/LandingValidation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { DevTool } from "@hookform/devtools";
import { Button } from '@mui/material';
import { userData, formCreation } from "../common/types";

const marketingCopy = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ac nibh lobortis felis lacinia faucibus. Phasellus gravida tempus leo sed blandit. Donec diam purus, fermentum at tincidunt sit amet, dapibus sed lectus. Aenean eu laoreet dolor, eu blandit orci. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris molestie, nisl in aliquam accumsan, nisi sem fermentum dui, dictum finibus justo felis sit amet orci. Duis gravida leo vitae dui vestibulum lobortis. Ut vitae maximus turpis. Phasellus porttitor laoreet erat, vel facilisis neque mattis vitae."

interface AppProps { testClick?: any; };

function Landing({ testClick }: AppProps) {

    const userDetails = useSelector((state: CombinedState<any>) => state.userDetails)
    const qualified = useSelector((state: CombinedState<any>) => state.qualified)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors }, control } = useForm({
        resolver: yupResolver(landingSchema),
    })

    if (qualified.isQualified === "disqualified") {
        return <Navigate to="/disqualified" />
    }

    // Want this to be of same interface type as what's used in renderInput
    const inputGenerationData: formCreation[] = [
        { labelText: "Auto Purchase Price", placeholder: "$", name: "price", type: "number", registerFunction: register, errorMessages: errors },
        { labelText: "Auto Make", placeholder: "", name: "make", type: "text", registerFunction: register, errorMessages: errors },
        { labelText: "Auto Model", placeholder: "", name: "model", type: "text", registerFunction: register, errorMessages: errors },
        { labelText: "Income", placeholder: "$", name: "income", type: "number", registerFunction: register, errorMessages: errors },
        { labelText: "Credit", placeholder: "300-850", name: "credit", type: "number", registerFunction: register, errorMessages: errors },
    ]

    function onSubmit(data: userData) {
        dispatch(setUserDetails({
            ...userDetails,
            price: data.price,
            make: data.make,
            model: data.model,
            credit: data.credit,
            income: data.income
        }))

        mockFetch("https://cuna-backend.com/qualified", { method: "GET", body: data })
            .then((res: any) => {
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
        <div className="landing-page">
            <div className="landing-copy-container">
                <h1>Landing Page</h1>
                <p>{marketingCopy}</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="landing-form">
                {/* In this situation, I've decided to loop an array of objects, which contains the values needed to generate all of the needed form inputs.
                        I also considered rendering each input individually using a function, or possibly hard coding every input.
                        I'm not sure if this is the best possible solution. I'm worried that it might affect the readability of my code.*/}
                {
                    inputGenerationData.map((i: formCreation, index: number) => {
                        return renderInput(i.labelText, i.placeholder, i.name, i.type, i.errorMessages, index, register)
                    })
                }
                {
                    qualified.isQualified === "bad_request" ? <p className="error">{qualified.message}</p> : ""
                }

                <Button type="submit" name="submit" variant="contained" size="large">SUBMIT</Button>
            </form>

            {/* <DevTool control={control} /> */}
            {/* Enable React-Hook-Form dev tools for this component by uncommenting the line above  */}
        </div>
    )
}

export default Landing