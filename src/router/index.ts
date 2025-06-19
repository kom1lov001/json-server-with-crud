import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes";

const router = createRouter({
    history: createWebHistory(),
    routes,
});
router.onError((error: any, to: any) => {
    if (error.message.includes("Failed to fetch dynamically imported module") || error.message.includes("Importing a module script failed")) {
        if (!to?.fullPath) {
            window.location.reload();
        } else {
            window.location = to.fullPath;
        }
    }
});
export default router;
