import { Controller, Get, Query } from '@nestjs/common';
import { LeadsService } from './leads.service';

@Controller('leads')
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  // @Get()
  // getLeads() {
  //   return this.leadsService.getLeads();
  // }
  @Get()
  getLeads(@Query('query') query) {
    return this.leadsService.getLeads(query);
  }
}
