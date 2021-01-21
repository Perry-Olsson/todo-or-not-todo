export interface SMTPMailResponse {
  accepted: string[];
  rejected: string[];
  envelopeTime: number;
  messageTime: number;
  messageSize: number;
  response: string;
  envelope: Envelope;
  messageId: string;
}

interface Envelope {
  from: string;
  to: string[];
}

export type Email = ConfirmationEmail;

export interface ConfirmationEmail {
  from: "'Friday' <friday@gmail.com>";
  to: string;
  subject: "Account confirmation";
  html: string;
}
