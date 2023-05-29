import axios, { AxiosInstance } from "axios";

export abstract class IHttpService<T> {
  protected client: AxiosInstance;  
  protected static instance: IHttpService<unknown | any>;
  
  constructor(private readonly baseURL: string) {
    this.client = axios.create({
      baseURL: this.baseURL,
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

  static getInstance(): IHttpService<unknown | any> {
    throw new Error("Implement this method in your service class.");
  }
}
