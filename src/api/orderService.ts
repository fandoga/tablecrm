const BASE_URL = "https://app.tablecrm.com/api/v1/docs_sales/?token=af1874616430e04cfd4bce30035789907e899fc7c3a1a4bb27254828ff304a77";

export const orderService = {
    async getOrganizations(token: string) {
        const res = await fetch(`${BASE_URL}/organizations`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return res.json();
    },

    async getWarehouses(token: string) {
        const res = await fetch(`${BASE_URL}/warehouses`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return res.json();
    },

    async getPriceTypes(token: string) {
        const res = await fetch(`${BASE_URL}/price-types`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return res.json();
    },

    async searchClientByPhone(token: string, phone: string) {
        const res = await fetch(`${BASE_URL}/clients?phone=${phone}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return res.json();
    },

    async searchGoods(token: string, query: string) {
        const res = await fetch(`${BASE_URL}/goods?search=${query}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return res.json();
    },

    async createOrder(token: string, payload: any) {
        const res = await fetch(`${BASE_URL}/orders`, {
            method: "POST",
            headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });
        return res.json();
    },
};