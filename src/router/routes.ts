import { RouteRecordRaw } from "vue-router";
import InboxPage from "@/pages/Inbox/InboxView.vue";
import SettingsPage from "@/pages/Settings/SettingsView.vue";
import OutboxPage from "@/pages/outbox/OutboxView.vue";
import TrashPage from "@/pages/Trash/TrashView.vue";
const routes: RouteRecordRaw[] = [
    {
        path: "/",
        component: () => import("../layout/MainLayout.vue"),
        children: [
            { path: "", redirect: "/inbox" },
            { path: "inbox", component: InboxPage },
            { path: "outbox", component: OutboxPage },
            { path: "trash", component: TrashPage },
            { path: "settings", component: SettingsPage },
        ],
    },
    {
        path: "/:catchAll(.*)*",
        component: () => import("@/pages/error/ErrorView.vue"),
    },
];

export default routes;
