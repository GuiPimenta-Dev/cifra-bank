interface DocumentInfoDTO {
  type: string;
  number: string;
  state: string;
}

export default interface RegisterAdditionalInfoDTO {
  document: string;
  motherName: string;
  maritalStatus: number;
  gender: string;
  birthDate: string;
  nationalityState: string;
  nationality: string;
  documentInfo: DocumentInfoDTO;
}
