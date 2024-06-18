import { LeadsService } from './leads.service';
export declare class LeadsController {
    private readonly leadsService;
    constructor(leadsService: LeadsService);
    getLeads(query: any): Promise<import("../dto/lead.dto").Lead[]>;
}
