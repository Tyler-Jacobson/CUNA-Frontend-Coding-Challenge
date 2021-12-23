import * as yup from "yup";

export const signupSchema = yup.object().shape({
    username: yup.string().email("Must be a valid email").required(),
    password: yup.string().min(8, "Must be at least 8 characters").required(),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], `Passwords must match`)
})
// console.log(yup.ref('password'))
// console.log(yup.ref('confirmPassword'))


// .matches(/^(?=.*[a-z])((?=.*[0-9])(?=.*[!@#$%^&*\-\\]))\S{1,}$/, "Must contain at least one special character and one number")

// ^(?=.*[a-z])((?=.*[0-9])|(?=.*[!@#$%^&*\-\\]))\S{8,}$

// ^[0-9A-Za-z]*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?][0-9a-zA-Z]*.*[0-9].*$

// /^(?=.*[a-z])(?=.*d)(?=.*[@$!%*#?&])[A-Za-zd@$!%*#?&]{8,}$/