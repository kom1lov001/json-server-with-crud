<template>
    <div class="q-pa-md">
        <q-btn
            label="Create Product"
            color="primary"
            class="q-mb-md"
            @click="openCreateDialog"
        />

        <q-table
            title="Product List"
            :rows="paginatedRows"
            :columns="columns"
            row-key="id"
            flat
            bordered
            v-model:pagination="pagination"
            @request="onRequest"
        >
            <template #body-cell-actions="props">
                <q-td align="center">
                    <q-btn
                        color="primary"
                        icon="edit"
                        size="sm"
                        flat
                        @click="openEditDialog(props.row.id)"
                    />
                </q-td>
            </template>
        </q-table>

        <q-dialog v-model="dialog">
            <q-card style="min-width: 350px">
                <q-card-section>
                    <div class="text-h6">
                        {{ formType === ProductFormMode.Edit ? "Edit Product" : "Create Product" }}
                    </div>
                </q-card-section>

                <q-card-section>
                    <q-input
                        v-model="ruleForm.name"
                        label="Name"
                    />
                    <q-input
                        v-model.number="ruleForm.price"
                        label="Price"
                        type="number"
                    />
                    <q-input
                        v-model.number="ruleForm.quant"
                        label="Quantity"
                        type="number"
                    />
                </q-card-section>

                <q-card-actions align="right">
                    <q-btn
                        flat
                        label="Cancel"
                        color="primary"
                        v-close-popup
                    />
                    <q-btn
                        flat
                        label="Save"
                        color="primary"
                        @click="submitForm"
                    />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </div>
</template>

<script setup lang="ts">
import { ref, Ref, reactive, onMounted, computed } from "vue";
import { useProductStore } from "@/stores/products";
import { columns } from "@/utils/constants";

interface Product {
    id?: string;
    name: string;
    price: number;
    quant: number;
}

enum ProductFormMode {
    Create = "create",
    Edit = "edit",
}

const store = useProductStore();
const products: Ref<Product[]> = ref([]);
const dialog = ref(false);
const formType = ref<ProductFormMode>(ProductFormMode.Create);
const selectedId = ref<string | null>(null);

const ruleForm = reactive<Product>({
    name: "",
    price: 0,
    quant: 0,
});

const pagination = ref({
    page: 1,
    rowsPerPage: 5,
    rowsNumber: 0,
});

const paginatedRows = computed(() => {
    const start = (pagination.value.page - 1) * pagination.value.rowsPerPage;
    const end = start + pagination.value.rowsPerPage;
    return products.value.slice(start, end);
});

const onRequest = (props: any) => {
    pagination.value = { ...pagination.value, ...props.pagination };
};

const fetchProducts = async () => {
    try {
        await store.fetchProducts();
        products.value = store.products || [];
        pagination.value.rowsNumber = products.value.length;
    } catch (e) {
        console.error("Error", e);
    }
};

const fetchProduct = async (id: string) => {
    try {
        const data = await store.getOneProduct(id);
        Object.assign(ruleForm, data);
    } catch (e) {
        console.error("Error", e);
    }
};

const openCreateDialog = () => {
    formType.value = ProductFormMode.Create;
    selectedId.value = null;
    ruleForm.name = "";
    ruleForm.price = 0;
    ruleForm.quant = 0;
    dialog.value = true;
};

const openEditDialog = async (id: string) => {
    formType.value = ProductFormMode.Edit;
    selectedId.value = id;
    await fetchProduct(id);
    dialog.value = true;
};

const submitForm = async () => {
    try {
        if (formType.value === ProductFormMode.Edit && selectedId.value) {
            await store.updateProduct({
                id: selectedId.value,
                name: ruleForm.name,
                price: ruleForm.price,
                quant: ruleForm.quant,
            });
        } else {
            await store.createProduct({
                name: ruleForm.name,
                price: ruleForm.price,
                quant: ruleForm.quant,
            });
        }

        dialog.value = false;
        await fetchProducts();
    } catch (error) {
        console.error("Error", error);
    }
};

onMounted(() => {
    fetchProducts();
});
</script>
