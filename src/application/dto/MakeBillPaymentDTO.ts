interface billDataDTO {
  value: number;
  originalValue: number;
}

interface barCodeDTO {
  type: number;
  digitable: string;
}

export default interface MakeBillPaymentDTO {
  document: string;
  billData: billDataDTO;
  barCode: barCodeDTO;
  dueDate: string;
  transactionId: number;
}
