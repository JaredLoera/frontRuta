import { Credentials } from "./credentials.interface";
import { Driver } from "./drivers.interface";
export interface Response {
    credentials: Credentials;
    driver: Driver;
}