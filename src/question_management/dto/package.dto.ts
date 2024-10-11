export interface AddRelationDto {
    questionText: string;
    packageName: string;
  }
  
  export interface UpdateRelationDto {
    questionText: string;
    newQuestionText?: string; // Opsiyonel olarak yeni questionText
    newDuration?: number;   // Opsiyonel olarak yeni duration
  }
  
  export interface DeleteRelationDto {
    questionText: string;
    packageName: string;
  }
  