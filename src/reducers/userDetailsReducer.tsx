
const defaultUserDetails = {
    price: 0,
    make: "",
    model: "",
    income: 0,
    credit: 0,
    username: ""
}

// action should be an interface of the possible values

const userDetailsReducer = (state = defaultUserDetails, action: any) => {
    switch(action.type) {
        case "SET_USER_DETAILS":
            return {
                price: action.payload.price,
                make: action.payload.make,
                model: action.payload.model,
                income: action.payload.income,
                credit: action.payload.credit,
                username: action.payload.username
            }
        default:
            return state
    }
}

export default userDetailsReducer