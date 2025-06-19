<template>
    <q-form
        ref="ruleFormRef"
        @submit="submitForm"
        @reset="onReset"
        class="q-gutter-md"
    >
        <q-input
            v-model="ruleForm.name"
            label="Name"
            :rules="rules.name"
        />
        <q-input
            v-model.number="ruleForm.price"
            label="Price"
            type="number"
            :rules="rules.price"
        />
        <q-input
            v-model.number="ruleForm.quant"
            label="Quantity"
            type="number"
            :rules="rules.quant"
        />
        <q-btn
            type="submit"
            label="Save"
            color="primary"
        />
        <q-btn
            type="reset"
            label="Reset"
            color="grey"
            flat
        />
    </q-form>
</template>

<script setup lang="ts">
import { reactive, ref, nextTick } from "vue";
import { useQuasar } from "quasar";
import { useProductStore } from "@/stores/products";
import { Product } from "@/models/backend";

const store = useProductStore();
const $q = useQuasar();

const emits = defineEmits(["loading"]);
const ruleFormRef = ref();

const ruleForm = reactive<Omit<Product, "id">>({
    name: "",
    price: 0,
    quant: 0,
});
const rules = {
    name: [(val: string) => (val && val.length > 0) || "Please type something"],
    price: [(val: number) => val > 0 || "Price must be number or greater than 0"],
    quant: [(val: number) => val >= 0 || "No negative quantity"],
};

const onReset = async () => {
    ruleForm.name = "";
    ruleForm.price = null;
    ruleForm.quant = null;
    await nextTick();
    ruleFormRef.value.resetValidation();
};

const submitForm = async () => {
    try {
        emits("loading", true);
        // ruleFormRef.value.validate().then(async (valid: boolean) => {
        // if (valid) {
        // $q.notify({
        //     type: "positive",
        //     message: "Product created successfully!",
        // });
        // await store.createProduct(ruleForm);
        // } else {
        // $q.notify({
        //     type: "negative",
        //     message: "Please correct the errors in the form.",
        // });
        // }
        // });
        await store.createProduct(ruleForm);
    } catch (err: any) {
        console.error("Error", err);
    } finally {
        setTimeout(() => {
            emits("loading", false);
        }, 1000);
        await onReset();
    }
};
</script>
