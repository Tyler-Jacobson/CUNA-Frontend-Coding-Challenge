export const setUserDetails = (formData: {}) => {
    return {
        type: "SET_USER_DETAILS",
        payload: formData
    }
}
export const setQualified = (data: {}) => {
    return {
        type: "SET_QUALIFIED",
        payload: data
    }
}