import { ref } from "vue";

export function useModal(): {
    show: ReturnType<typeof ref<boolean>>;
    title: ReturnType<typeof ref<string>>;
    width: ReturnType<typeof ref<string>>;
    showModal: () => void;
    hideModal: () => void;
    setTitle: (t: string) => void;
    setWidth: (w: string) => void;
} {
    const show = ref<boolean>(false);
    const title = ref<string>("");
    const width = ref<string>("");

    return {
        show,
        title,
        width,
        showModal: () => (show.value = true),
        hideModal: () => (show.value = false),
        setTitle: (t: string) => (title.value = t),
        setWidth: (w: string) => (width.value = w),
    };
}
