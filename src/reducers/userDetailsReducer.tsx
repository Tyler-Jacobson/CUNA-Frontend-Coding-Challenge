
const defaultUserDetails = {
    price: 0,
    make: "",
    model: "",
    income: 0,
    credit: 0,
    username: "",
    password: ""
}

const userDetailsReducer = (state = defaultUserDetails, action: any) => {
    switch(action.type) {
        case "SET_USER_DETAILS":
            console.log(action.payload)
            return {
                price: action.payload.price,
                make: action.payload.make,
                model: action.payload.model,
                income: action.payload.income,
                credit: action.payload.credit,
                username: action.payload.username,
                password: action.payload.password
            }
        default:
            return state
    }
}

export default userDetailsReducer