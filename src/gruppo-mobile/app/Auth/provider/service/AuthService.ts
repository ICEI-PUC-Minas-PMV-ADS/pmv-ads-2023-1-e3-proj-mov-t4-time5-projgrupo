import Env from "../../../../lib/constants/Env";
import { IHttpService } from "../../../../lib/interfaces/IHttpService";
import { LoginPayload, LoginResponse, SignupPayload, SignupResponse } from './models/AuthDTO';
import { Profile } from './models/Profile';

export class AuthService extends IHttpService<AuthService> {
  constructor() {
    super(Env.API_URL);

    if (AuthService.instance) {
      throw new Error("Use AuthService.getInstance() instead of 'new AuthService()'.");
    }
  }

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance as AuthService;
  }

  public async postLogin(data: LoginPayload) {
    return this.client.post<LoginResponse>("/auth/login", data)
  }

  public async postSignup(data: SignupPayload) {
    return this.client.post<SignupResponse>("/users", data)
  }

  public async getProfile(token: string) {
    return this.client.get<Profile>("/auth/profile", {
      headers: {
        "authorization": `Bearer ${token}`
      }
    }
    )
  }

  public async putEditUser(id: string, data: any, token: string) {
    return this.client.put<Profile>(`/users/${id}`, data, {
      headers: {
        "authorization": `Bearer ${token}`
      }
    })
  }
}
