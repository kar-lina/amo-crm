import { HttpService } from '@nestjs/axios';
import { Lead } from 'src/dto/lead.dto';
export declare class LeadsService {
    private readonly httpService;
    private readonly logger;
    constructor(httpService: HttpService);
    getLeads(query: string): Promise<Lead[]>;
}
