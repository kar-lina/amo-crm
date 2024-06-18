export type Contact = {
	id: number;
	name: string;
  phone?: number; 
	email: string;
};
export type LeadStatus = {
	color: string;
	id: number;
	name: string;
}
export type Lead = {
	id: number;
	name: string;
	price: number;
	status: LeadStatus;
	created_at: number;
	contact: Contact;
};
