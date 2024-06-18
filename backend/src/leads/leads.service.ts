import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { LeadsResponse } from 'src/dto/leads-response.dto';
import { Lead } from 'src/dto/lead.dto';
import { LeadStatus } from 'src/dto/lead-status.dto';
import { LeadContact } from 'src/dto/lead-contact.dto';

@Injectable()
export class LeadsService {
  private readonly logger = new Logger(LeadsService.name);
  constructor(private readonly httpService: HttpService) {}

  async getLeads(query: string): Promise<Lead[]> {
    const { data: leadsList } = await firstValueFrom(
      this.httpService.get<LeadsResponse>(`leads`).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error?.response?.data);
          throw 'An error happened!';
        }),
      ),
    );

    const leadsResult: Lead[] = [];
    for (let lead of leadsList?._embedded?.leads) {
      const leadInfo: Lead = { ...lead } as Lead;

      const { data: leadStatus } = await firstValueFrom(
        this.httpService
          .get<LeadStatus>(
            `leads/pipelines/${lead.pipeline_id}/statuses/${lead.status_id}`,
          )
          .pipe(
            catchError((error: AxiosError) => {
              this.logger.error(error?.response?.data);
              throw 'An error happened!';
            }),
          ),
      );

      const { data: leadContact } = await firstValueFrom(
        this.httpService
          .get<LeadContact>(`users/${lead.responsible_user_id}`)
          .pipe(
            catchError((error: AxiosError) => {
              this.logger.error(error?.response?.data);
              throw 'An error happened!';
            }),
          ),
      );

      leadInfo.contact = leadContact;
      leadInfo.status = leadStatus;
      leadsResult.push(leadInfo);
    }
    return leadsResult;
  }
}
