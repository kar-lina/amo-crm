export type Contact = {
	fullName: string;
	tel: string;
	email: string;
};
export enum LeadStatus {
	CLOSED_NOT_FINISHED = 'Закрыто и не реализовано',
	CLOSED_FINISHED = 'Закрыто и реализовано',
	PEREGOVORY = 'Переговоры',
	PROCESSING = 'Принимаем решение',
}
export type Lead = {
	name: string;
	budget: number;
	status: LeadStatus;
	responsible: string;
	date: Date;
	contact: Contact;
};
