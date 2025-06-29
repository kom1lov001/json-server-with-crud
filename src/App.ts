import { ref, onMounted, reactive } from "vue";
export default {
    setup() {
        const TEXT_WRITER = reactive<Record<string, string>>({
            name: "",
        });
        onMounted(() => {});

        return {
            TEXT_WRITER,
        };
    },
};
