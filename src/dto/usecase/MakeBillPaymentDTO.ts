interface billDataDTO {
  value: number;
  originalValue: number;
}

interface barCodeDTO {
  type: number;
  digitable: string;
}

export default interface MakeBillPaymentDTO {
  billData: billDataDTO;
  barCode: barCodeDTO;
  dueDate: string;
  transactionId: number;
}
