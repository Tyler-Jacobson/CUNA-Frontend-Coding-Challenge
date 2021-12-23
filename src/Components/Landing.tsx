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


// const defaultFormValues = {
//     price: "",
//     make: "",
//     model: "",
//     income: "",
//     credit: ""
// }

// const defaultFormErrors = {
//     price: "",
//     make: "",
//     model: "",
//     income: "",
//     credit: ""
// }

function Landing() {

    const userDetails = useSelector((state: CombinedState<any>) => state.userDetails)
    const qualified = useSelector((state: CombinedState<any>) => state.qualified)

    // const [formValues, setFormValues] = useState(defaultFormValues)
    // const [formErrors, setFormErrors] = useState(defaultFormValues)
    // const [disabled, setDisabled] = useState(true)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { register, handleSubmit, formState: {errors}, control } = useForm({
        resolver: yupResolver(landingSchema),
    })


    // useEffect(() => {
    //     landingSchema.isValid(formValues)
    //         .then(valid => {
    //             setDisabled(!valid)
    //         })
    // }, [formValues])

    if (qualified.isQualified === "disqualified") {
        return <Navigate to="/disqualified" />
    }

    // function onChange(e: FormEvent<HTMLInputElement>) {
    //     validation(e.currentTarget.name, e.currentTarget.valueAsNumber || e.currentTarget.value, landingSchema, formErrors, setFormErrors)
    //     setFormValues({
    //         ...formValues,
    //         [e.currentTarget.name]: e.currentTarget.valueAsNumber || e.currentTarget.value
    //     })
    // }

    function onSubmit(data: any) {
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

            <DevTool control={control} />
        </div>
    )
    
}




export default Landing

