export  type Project = {
  id: string ;
  name?: string ;
  userId?: string ;
  user? : User ;
  productName?: string ;
  productDescription?: string ;
  aspectRatio?: string ;
  userPrompt?: string ;
  targetLength?: number ;
  generatedImage?: string ;
  generatedVideo?: string ;
  isGenereating?: boolean ;
  isPublished?: boolean ;
  error?: string ;
  createdAt:string | Date;
  updatedAt?:string | Date;
  uploadedImages : string[];

};

export type User ={
  id?: string;
  name?: string ;
  email?: string ;
}