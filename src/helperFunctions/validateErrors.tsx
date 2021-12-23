import * as yup from "yup";

const validation = function (name: any, value: any, schema: any, errors: any, setErrors: any) {
    yup.reach(schema, name)
        .validate(value)
        .then((res: any) => {
            setErrors({ ...errors, [name]: "" })
        })
        .catch((err: any) => {
            console.log(err)
            setErrors({ ...errors, [name]: err.message })
        })
}

export default validation