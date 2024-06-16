import axios from "axios"

export const axiosReq = async ({ method = 'get', body, url }) => {
    try {
        const { data: result } = await axios({
            baseURL: 'http://localhost:3000',
            method: method,
            data: body,
            url: url
        })
        return result;
    } catch (error) {
        console.error("Error fetching data: ", error?.response);
    }
}