import { supabase } from '../lib/supabase';

export interface OrderInquiry {
  id?: string;
  created_at?: string;
  customer_name: string;
  phone_number: string;
  service_type: string;
  width: number;
  height: number;
  status: 'pending' | 'counting' | 'completed';
}

export const orderService = {
  async submitInquiry(order: Omit<OrderInquiry, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('orders')
      .insert([order])
      .select();

    if (error) {
      console.error('Error submitting order:', error.message);
      throw error;
    }
    return data;
  },

  async trackOrder(orderId: string) {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('id', orderId)
      .single();

    if (error) {
      console.error('Error tracking order:', error.message);
      return null;
    }
    return data;
  }
};
