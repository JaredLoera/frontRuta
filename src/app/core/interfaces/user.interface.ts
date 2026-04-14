export interface User<T> {
    id: number;
    email: string;
    role: number; // 2: Admin, 1: User
    dealershipProfile?: T;
}