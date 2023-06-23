import { StorageService } from "@lib/services/StorageService";
import axios, { AxiosInstance } from "axios";

export class IHttpService<T> {
  protected client: AxiosInstance;  
  protected token: string;  
  protected static instance: IHttpService<unknown | any>;
  
  constructor(private readonly baseURL: string) {
    this.token = String(StorageService().get("token"));
    this.client = axios.create({
      baseURL: this.baseURL,
      headers: {
        "Authorization": "Bearer " + StorageService().get("token"),
      }
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

  public get(address: string) {
    return this.client.get<T>(address, {
      headers: {
        "authorization": `Bearer ${this.token}`
      }
    });
  }

  public put(address: string, data: any) {
    return this.client.put<T>(address, data, {
      headers: {
        "authorization": `Bearer ${this.token}`
      }
    });
  }

  static getInstance(): IHttpService<unknown | any> {
    throw new Error("Implement this method in your service class.");
  }
}
