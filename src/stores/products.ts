import { defineStore } from "pinia";
import { request } from "@/utils/request";
import { v4 as uuidv4 } from "uuid";
import { Product } from "@/models/backend";

interface State {
    products: Product[];
    deletedData: Product[];
}

export const useProductStore = defineStore("product-store", {
    state: (): State => ({
        products: [],
        deletedData: [],
    }),

    actions: {
        async fetchProducts() {
            try {
                const res = await request.get<Product[]>("/products");
                this.products = res;
            } catch (e) {
                console.error("Something wrong !", e);
                throw e;
            }
        },

        async createProduct(product: Omit<Product, "id">) {
            try {
                const ifDuplic = this.products.some((p) => p.name.trim().toLowerCase() === product.name.trim().toLowerCase());
                if (ifDuplic) throw new Error("Product with this name already exists.");

                const params: Product = {
                    ...product,
                    id: uuidv4(),
                };

                const res = await request.post<Product>("/products", params);
                this.products.push(res);
            } catch (err) {
                console.error("Failed to add product:", err);
                throw err;
            }
        },

        async deleteProduct(id: string) {
            try {
                const getProducttoDelete = this.products.find((p) => p.id === id);
                await request.post("/deleted-data", getProducttoDelete);
                await request.delete(`/products/${id}`);
                this.products = this.products.filter((p) => p.id !== id);
            } catch (error) {
                console.error("Failed to delete product:", error);
                throw error;
            }
        },
        async getDeletedData() {
            try {
                const res = await request.get<Product[]>("/deleted-data");
                this.deletedData = res;
            } catch (e) {
                console.error("Failed to fetch deleted products", e);
                throw e;
            }
        },

        async updateProduct(product: Product) {
            try {
                const res = await request.put<Product>(`/products/${product.id}`, product);
                const index = this.products.findIndex((p) => p.id === product.id);
                if (index !== -1) this.products[index] = res;
            } catch (error) {
                console.error("SomeThing Wrong", error);
                throw error;
            }
        },
        async getOneProduct(id: string) {
            try {
                const res = await request.get<Product>(`/products/${id}`);
                return res;
            } catch (error) {
                console.error("Failed to fetch product:", error);
                throw error;
            }
        },
    },
});
