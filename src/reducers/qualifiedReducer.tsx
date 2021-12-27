import { qualifiedOptions, qualifiedAction } from "../common/types"

const defaultQualified = {
    isQualified: "",
    message: ""
}

const qualifiedReducer = (state: qualifiedOptions = defaultQualified, action: qualifiedAction) => {
    // let validQualifiedOption = action.payload.isQualified
    console.log("ACTION.PAYLOAD", action.payload)

    switch (action.type) {
        case "SET_QUALIFIED":
            return {
                isQualified: action.payload.isQualified,
                message: action.payload.message
            }
        default:
            return state
    }
}

export default qualifiedReducer