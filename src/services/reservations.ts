import type { AxiosInstance } from "axios"
import { api } from "./axios"

export class ReservationService {
  private server: AxiosInstance

  constructor(){
    this.server = api
  }

  async getReservationsByUserId (userId: number) {
    const {data} = await this.server.get(`/reservations/guest/${userId}`)
    return data
  }
}