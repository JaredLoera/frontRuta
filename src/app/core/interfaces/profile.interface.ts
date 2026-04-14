export interface Profile {
    id:          number;
    userId:      number;
    companyName: string;
    taxReason?:   string;
    taxRegimeId?: number;
    rfc?:         string;
    address?:     string;
    phoneNumber: string;
    longitude:   number;
    latitude:    number;
    createdAt:   Date;
    updatedAt:   Date;
}