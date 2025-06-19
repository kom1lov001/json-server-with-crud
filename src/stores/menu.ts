import { defineStore } from "pinia";
import { request } from "@/utils/request";
import { v4 as uuidv4 } from "uuid";
import { navigationItem } from "@/models/frontend/navigation";

interface State {
    menu: navigationItem[];
}

export const useMenuStore = defineStore("menu-store", {
    state: (): State => ({
        menu: [],
    }),

    actions: {
        async getMenu() {
            try {
                const res = await request.get<navigationItem[]>("/navigation");
                this.menu = res;
            } catch (e) {
                console.error("Something wrong !", e);
            }
        },
    },
});
