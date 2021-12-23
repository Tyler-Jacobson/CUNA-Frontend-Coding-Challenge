// interface qualifiedOptions {
//     type: "qualified" | "disqualified" | "unknown"
//     q: string
// }

// type q = qualifiedOptions


// "undetermined"
const defaultQualified = {
    isQualified: "",
    message: ""
}

const qualifiedReducer = (state: any = defaultQualified, action: any) => {
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