export class CreateCandidateDTO {
  name: string;
  surname: string;
  phoneNumber: string;
  email: string;
  kvkkApproval: boolean;
  videoUrl?: string;
  status?: string;

  constructor({
    name,
    surname,
    phoneNumber,
    email,
    kvkkApproval,
    videoUrl,
    status = "pending",
  }: any) {
    this.name = name;
    this.surname = surname;
    this.phoneNumber = phoneNumber;
    this.email = email;
    this.kvkkApproval = kvkkApproval;
    this.videoUrl = videoUrl;
    this.status = status;
  }
}
