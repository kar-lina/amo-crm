"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var LeadsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeadsService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
let LeadsService = LeadsService_1 = class LeadsService {
    constructor(httpService) {
        this.httpService = httpService;
        this.logger = new common_1.Logger(LeadsService_1.name);
    }
    async getLeads(query) {
        const { data: leadsList } = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`leads`).pipe((0, rxjs_1.catchError)((error) => {
            this.logger.error(error?.response?.data);
            throw 'An error happened!';
        })));
        const leadsResult = [];
        for (let lead of leadsList?._embedded?.leads) {
            const leadInfo = { ...lead };
            const { data: leadStatus } = await (0, rxjs_1.firstValueFrom)(this.httpService
                .get(`leads/pipelines/${lead.pipeline_id}/statuses/${lead.status_id}`)
                .pipe((0, rxjs_1.catchError)((error) => {
                this.logger.error(error?.response?.data);
                throw 'An error happened!';
            })));
            const { data: leadContact } = await (0, rxjs_1.firstValueFrom)(this.httpService
                .get(`users/${lead.responsible_user_id}`)
                .pipe((0, rxjs_1.catchError)((error) => {
                this.logger.error(error?.response?.data);
                throw 'An error happened!';
            })));
            leadInfo.contact = leadContact;
            leadInfo.status = leadStatus;
            leadsResult.push(leadInfo);
        }
        return leadsResult;
    }
};
exports.LeadsService = LeadsService;
exports.LeadsService = LeadsService = LeadsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], LeadsService);
//# sourceMappingURL=leads.service.js.map