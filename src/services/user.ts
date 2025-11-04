import type { AxiosInstance } from "axios";
import {api} from "@/services/axios"
import type { User, UserLogin } from "@/types/user";

export class UserService {
  private server: AxiosInstance

  constructor() {
    this.server = api
  }

  async login(dataLogin: UserLogin) {
    try {
      const {data} = await this.server.post<User>('/users/login', dataLogin)
      return data
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
}