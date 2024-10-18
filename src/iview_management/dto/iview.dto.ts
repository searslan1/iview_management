export class CreateInterviewDTO {
  title: string;
  date: Date;
  interviewLink: string;
  uuid: string;
  candidates: string[]; // Candidate ID array

  constructor({ title, date, interviewLink, uuid, candidates }: any) {
    this.title = title;
    this.date = date;
    this.interviewLink = interviewLink;
    this.uuid = uuid;
    this.candidates = candidates;
  }
}
