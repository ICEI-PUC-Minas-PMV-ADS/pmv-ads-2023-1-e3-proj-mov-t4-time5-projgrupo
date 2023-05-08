import axios, {AxiosInstance} from "axios";

export class AxiosClient{
    private readonly baseURL: string;
    private client: AxiosInstance;
    constructor() {
        this.baseURL = "http://192.168.15.6:3000/api/v1"
        this.client = axios.create({
            baseURL: this.baseURL
        })

        axios.interceptors.request.use(request => {
            console.log('Starting Request', JSON.stringify(request, null, 2))
            return request
        })

        axios.interceptors.response.use(response => {
            console.log('Response:', JSON.stringify(response, null, 2))
            return response
        })
    }

    async postLogin(data: any){
        return this.client.post("/auth/login", data)
    }

    async postSignup(data: any){
        return this.client.post("/users", data)
    }

    async getProfile(token: string){
        return this.client.get("/auth/profile", {
                headers: {
                    "authorization": `bearer ${token}`
                }
            }
        )
    }

    async putEditUser(id: string,data: any, token: string){
        return this.client.put(`/users/${id}`, data, {
            headers: {
                "authorization": `bearer ${token}`
            }
        })
    }
}
