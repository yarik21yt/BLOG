import axios from "axios";

const apiImage = axios.create({
    baseURL: "http://127.0.0.1:8000/file",
    headers: {
        "Content-Type": "multipart/form-data",
    },
    withCredentials: true
})
export default apiImage