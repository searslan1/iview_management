export interface AddRelationDto {
    questionId: string;
    packageName: string;
  }
  
  export interface UpdateRelationDto {
    questionId: string;
    newQuestionId?: string; // Opsiyonel olarak yeni questionId
    newDuration?: number;   // Opsiyonel olarak yeni duration
  }
  
  export interface DeleteRelationDto {
    questionId: string;
    packageName: string;
  }
  