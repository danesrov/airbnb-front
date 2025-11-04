import type { AxiosInstance } from "axios"
import { api } from "./axios"
import type { ReservationDto } from "@/types/reservation"

export class ReservationService {
  private server: AxiosInstance

  constructor(){
    this.server = api
  }

  async getReservationsByUserId (userId: number) {
    const {data} = await this.server.get(`/reservations/guest/${userId}`)
    return data
  }

  async createReservation(dto:ReservationDto) {
    await this.server.post('/reservations', dto)
  }
}