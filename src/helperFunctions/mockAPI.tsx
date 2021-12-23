function mockAPI(url: string, data: any) {
    return new Promise((resolve, reject) => {
        const userData = data.body
        console.log("credit:", userData.credit, "income:", userData.income, "purchase price:", userData.price)
        
        if (url === "https://cuna-backend.com/qualified" && data.method === "GET") {
            if (userData.price >= 1000000) {
                reject({ isQualified: "bad_request", message: "Bad Request"})
            } else if (userData.credit >= 600 && (userData.income / 5) >= userData.price) {
                resolve({ isQualified: "qualified", message: "Congratulations! You are qualified"})
            } else {
                reject({ isQualified: "disqualified", message: "Sorry, you are not qualified"})
            }
        } else {
            reject("invalid request")
        }
        
    })
}

export default mockAPI