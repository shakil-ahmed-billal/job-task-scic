import axios from "axios"


const axiosPubLic = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL,
})

const useAxiosPublic = () => {
    return axiosPubLic
}

export default useAxiosPublic