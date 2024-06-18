import { LeadApi } from "./lead-api.dto";

export class LeadsResponse {
  _embedded: {
    leads: LeadApi[]
  };
}
