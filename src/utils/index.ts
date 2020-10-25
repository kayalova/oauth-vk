import * as Request from "superagent"

export const makeRequest = async (url: string, queryArgs: object = {}) => {
    const response = await Request.get(url).query(queryArgs)
    console.log("response: ", response)
    console.log("response body: ", response.body)
    return response
}
