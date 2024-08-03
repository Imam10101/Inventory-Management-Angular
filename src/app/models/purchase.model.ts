import { PurchaseDetail } from "./purchase-detail.model";

export interface Purchase {
    PurchaseId : number;
    VendorId : number;
    PurchaseDate:Date;
    TotalPrice:number;
    PurchasesDetails:PurchaseDetail[];
}

export { PurchaseDetail };