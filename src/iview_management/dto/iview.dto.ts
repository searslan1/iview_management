export class CreateInterviewDTO {
  title: string;
  date: Date;
  questions: string[];  // Soruların ID'leri

  constructor({ title, date, questions }: any) {
    this.title = title;
    this.date = date;
    this.questions = questions;  // Soruların ID'leri
  }
}
