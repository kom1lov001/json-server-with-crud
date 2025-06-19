<template>
    <div>
        <q-table
            title="Deleted Products"
            :rows="deletedProducts"
            :columns="columns"
            row-key="id"
            flat
            bordered
            color="negative"
        >
            <template #body-cell-actions="props">
                <q-td align="center">Deleted</q-td>
            </template>
        </q-table>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useProductStore } from "@/stores";
import { columns } from "@/utils/constants";
const store = useProductStore();

const deletedProducts = computed(() => store.deletedData);

onMounted(async () => {
    await store.getDeletedData();
});
</script>
