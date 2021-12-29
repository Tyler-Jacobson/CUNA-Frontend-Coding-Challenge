import * as yup from "yup";

export const landingSchema = yup.object().shape({
    price: yup.number().transform(value => (isNaN(value) ? undefined : value)).required("Price is required"),
    make: yup.string().typeError("Must be a string").required('Make is required'),
    model: yup.string().required("Model is required"),
    income: yup.number().transform(value => (isNaN(value) ? undefined : value)).required("Income is required"),
    credit: yup.number().transform(value => (isNaN(value) ? undefined : value)).min(300, "Invalid Credit Score").max(850, "Invalid Credit Score").required("Credit is required")
})