<template>
    <div class="q-pa-xl">
        <div
            v-if="loading"
            class="overlay"
        ></div>
        <ProductForm @loading="loadingFn" />

        <q-spinner
            v-if="loading"
            color="primary"
            size="50px"
            class="q-my-md spinner-center"
        />

        <q-table
            v-if="!loading && getProduct.length"
            title="Products of List"
            :rows="getProduct"
            :columns="columns"
            row-key="id"
            flat
            bordered
            class="q-mt-lg"
        >
            <template #body-cell-actions="props">
                <q-td align="center">
                    <q-btn
                        flat
                        color="negative"
                        icon="delete"
                        size="sm"
                        @click="deleteTheProduct(props.row.id)"
                    />
                </q-td>
            </template>
        </q-table>

        <div
            v-else-if="!loading && !getProduct.length"
            class="text-center q-pa-md"
        >
            <p>No products found.</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useProductStore } from "@/stores";
import { columns } from "@/utils/constants";
import ProductForm from "./ProductForm.vue";

const store = useProductStore();

const loading = ref(false);
const getProduct = computed(() => store.products);

const loadingFn = async (type: boolean) => {
    loading.value = type;
    if (type) {
        await store.fetchProducts();
    }
};

const deleteTheProduct = async (id: string) => {
    try {
        loading.value = true;
        await store.deleteProduct(id);
        // Mahsulot o'chirilgandan so'ng yana yangilab olish
        await store.fetchProducts();
    } catch (error) {
        console.error("Error deleting product:", error);
    } finally {
        setTimeout(() => {
            loading.value = false;
        }, 400);
    }
};

onMounted(async () => {
    loading.value = true;
    await store.fetchProducts();
    loading.value = false;
});
</script>

<style scoped lang="scss">
.spinner-center {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
.overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(150, 136, 136, 0.3);
    z-index: 9999;
}
</style>
