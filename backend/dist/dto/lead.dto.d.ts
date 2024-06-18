import { LeadApi } from "./lead-api.dto";
import { LeadContact } from "./lead-contact.dto";
import { LeadStatus } from "./lead-status.dto";
export declare class Lead extends LeadApi {
    contact: LeadContact;
    status: LeadStatus;
}
