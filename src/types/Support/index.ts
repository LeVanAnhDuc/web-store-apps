export interface SupportFormValues {
  email?: string;
  subject: string;
  message: string;
}

export interface SubmitSupportResponse {
  ticketNumber: string;
}

export interface SubmitSupportPayload {
  subject: string;
  message: string;
  email?: string;
}
