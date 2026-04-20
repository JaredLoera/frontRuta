export interface DealerShip {
    id?:               string;
    name:             string;
    businessName:     string;
    taxId:            string;
    address:          string;
    phone:            string;
    concessionNumber: string;
    ownerEmail:       string;
    isActive?:         boolean;
    temporaryPassword?: string;
}