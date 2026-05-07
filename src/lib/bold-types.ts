export interface BoldLinkRequest {
  amount_type: 'OPEN' | 'CLOSE';
  amount?: {
    currency: string;
    total_amount: number;
  };
  description?: string;
  callback_url: string;
  payment_methods?: string[];
  payer_email?: string;
  image_url?: string;
  expiration_date?: number;
}

export interface BoldLinkResponse {
  payload: {
    payment_link: string;
    url: string;
  };
  errors: string[];
}

export interface BoldWebhookPayload {
  reference: string;
  status: 'approved' | 'rejected' | 'pending';
  amount: number;
  currency: string;
  customerEmail: string;
  customerName: string;
  customerPhone: string;
  timestamp: string;
  signature?: string;
}

export interface CheckoutData {
  shipping: {
    fullName: string;
    phone: string;
    address: string;
    neighborhood: string;
    email: string;
  };
  items: Array<{
    id: string;
    nombre: string;
    precio: number;
    cantidad: number;
  }>;
  reference: string;
  amount: number;
  total: number;
}