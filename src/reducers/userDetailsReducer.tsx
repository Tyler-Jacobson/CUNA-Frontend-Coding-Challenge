
const defaultUserDetails = {
    price: 0,
    make: "",
    model: "",
    income: 0,
    credit: 0
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
                credit: action.payload.credit
            }
        default:
            return state
    }
}

export default userDetailsReducer