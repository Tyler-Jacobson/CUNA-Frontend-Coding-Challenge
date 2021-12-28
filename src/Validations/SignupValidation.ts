import * as yup from "yup";

export const signupSchema = yup.object().shape({
    username: yup.string().email("Must be a valid email").required("Username is required"),
    password: yup.string().matches(/^((?=.*[0-9])(?=.*[!@#$%^&*\-\\]))\S{1,}$/, "Needs one special character and one number").min(8, "Must be at least 8 characters").required("Field is required"),
    confirmPassword: yup.string().oneOf([yup.ref('password')], `Passwords must match`).required("Confirm Password is required")
})