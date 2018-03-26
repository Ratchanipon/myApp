export interface DailyExpenses {

    daily_expenses_id:number;
    user_id:number;
    daily_expenses_cate_id: number;
    payment_channel_id: number;
    amount: number;
    images: string;
    created: Date;
}
