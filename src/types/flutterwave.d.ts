declare module "flutterwave-react-v3" {
  interface FlutterwaveTransaction {
    tx_ref: string;
    transaction_id: string;
    status: string;
    amount: number;
    charged_amount: number;
    charge_response_code: string;
    charge_response_message: string;
    created_at: string;
    currency: string;
    customer: {
      id: number;
      name: string;
      phone_number: string;
      email: string;
      created_at: string;
    };
  }

  interface FlutterwaveOptions {
    public_key: string;
    tx_ref: string;
    amount: number;
    currency: string;
    payment_options?: string;
    customer: {
      email: string;
      phonenumber: string;
      name: string;
    };
    customizations: {
      title: string;
      description: string;
      logo: string;
    };
    callback: (response: FlutterwaveTransaction) => void;
    onClose: () => void;
  }

  export const FlutterWave: React.FC<FlutterwaveOptions>;
}