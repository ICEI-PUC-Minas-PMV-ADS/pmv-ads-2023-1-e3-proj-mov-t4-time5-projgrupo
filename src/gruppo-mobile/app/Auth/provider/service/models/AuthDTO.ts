export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  id?: string;
  access_token?: string;
  statusCode?: number;
  message?: string;
}

export interface SignupPayload {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

export interface SignupResponse {
  statusCode?: number;
  message?: string;
}
