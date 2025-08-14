export interface Good {
    price: number;
    quantity: number;
    unit: number;
    discount: number;
    sum_discounted: number;
    nomenclature: number;
}

export interface OrderPayload {
    dated: number;
    operation: string;
    tax_included: boolean;
    tax_active: boolean;
    goods: Good[];
    settings: {
        date_next_created: null | string;
    };
    loyality_card_id: number | null;
    warehouse: number | null;
    contragent: number | null;
    paybox: number;
    organization: number | null;
    status: boolean;
    paid_rubles: number;
    paid_lt: number;
}