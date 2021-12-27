import { qualifiedOptions, qualifiedAction } from "../common/types"

const defaultQualified = {
    isQualified: "",
    message: ""
}

const qualifiedReducer = (state: qualifiedOptions = defaultQualified, action: qualifiedAction) => {
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