export type Address = {
  id: number;
  user_id: string;
  full_name: string;
  phone: string;
  line1: string;
  line2: string | null;
  city: string;
  district: string | null;
  postal_code: string | null;
  country: string;
  is_default: boolean;
  created_at: string;
};