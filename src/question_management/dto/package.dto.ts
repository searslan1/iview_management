export interface AddRelationDto {
    questionId: string;
    packageName: string;
  }
  
  export interface UpdateRelationDto {
    questionId: string;
    newPackageName: string;
  }
  
  export interface DeleteRelationDto {
    questionId: string;
    packageName: string;
  }
  