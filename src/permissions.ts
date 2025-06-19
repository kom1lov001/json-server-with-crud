import { loading } from "./utils/loading";
import router from "./router";

declare global {
    interface Window {
        existLoading?: boolean;
    }
}

router.beforeEach(async () => {
    if (!window.existLoading) {
        window.existLoading = true;
        loading.show();
    }
});

router.afterEach(() => {
    if (window.existLoading) {
        window.existLoading = false;
        loading.hide();
    }
});
