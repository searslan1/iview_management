export class CreateInterviewDTO {
  title: string;
  date: Date;
  questions: string[];
  status: string;  // Status alanını ekliyoruz

  constructor({ title, date, questions, status }: any) {
    this.title = title;
    this.date = date;
    this.questions = questions;
    this.status = status;  // Status parametresi burada ekleniyor
  }
}
