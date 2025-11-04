import {api} from "@/services/axios"
import type { Listing, ListingWithUser } from "@/types/listing"
import type { AxiosInstance } from "axios"

export class ListingService {
  private server: AxiosInstance

  constructor(){
    this.server = api
  }

  async list() {
    const {data} = await this.server.get<Listing[]>('/listings')
    return data
  }

  async getMoreReserved() {
    const {data} = await this.server.get<ListingWithUser>('/listings/more/reserved')
    return data
  }
}