


export type BookingStatus =
    | "pending_checkin"
    | "in_storage"
    | "pending_checkout"
    | "checked_out";

export interface BookingRecord {
    id: string;
    bookingCode: string;
    farmerName: string;
    phoneNumber: string;
    produce: string;
    crates: number;
    expectedDate: string; 
    expectedTime: string;
    status: BookingStatus;
}

export interface FilterOption<T extends string = string> {
    label: string;
    value: T;
}