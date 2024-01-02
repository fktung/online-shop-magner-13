export interface IPayment {
  fee_flat: number;
  fee_percentage: number;
  group: string;
  id: number;
  img: string | null;
  max_amount: number;
  min_amount: number;
  name: string;
}
