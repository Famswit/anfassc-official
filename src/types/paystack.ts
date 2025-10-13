declare module "@paystack/inline-js" {
  export interface PaystackTransaction {
    reference: string
    status: string
    message: string
    trans: string
    transaction: string
    trxref: string
  }

  export interface PaystackOptions {
    key: string
    email: string
    amount: number
    firstname?: string
    lastname?: string
    onSuccess: (transaction: PaystackTransaction) => void
    onCancel: () => void
  }

  export default class PaystackPop {
    newTransaction(options: PaystackOptions): void
  }
}
