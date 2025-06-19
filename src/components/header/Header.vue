<template>
    <div>
        <q-header
            elevated
            :class="$q.dark.isActive ? 'bg-black' : 'bg-primary'"
        >
            <q-toolbar class="flex items-center justify-between">
                <q-btn
                    flat
                    @click="emits('handleDrawer')"
                    round
                    dense
                    icon="menu"
                />
                <q-btn
                    flat
                    dense
                    round
                    :icon="$q.dark.isActive ? 'light_mode' : 'dark_mode'"
                    @click="darkMode"
                />
            </q-toolbar>
        </q-header>
    </div>
</template>

<script setup lang="ts">
const emits = defineEmits(["handleE", "handleDrawer"]);
const props = defineProps(["isOpenDrawer"]);
const darkMode = () => {
    emits("handleE");
};
</script>

<style scoped></style>
