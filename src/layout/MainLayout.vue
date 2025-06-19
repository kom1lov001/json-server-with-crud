<template>
    <q-layout
        view="hHh Lpr lff"
        container
        style="min-height: 100vh"
    >
        <q-header
            :isOpenDrawer="drawer"
            @handleDrawer="drawer = !drawer"
            @handleE="toggleDark"
        />
        <q-drawer
            v-model="drawer"
            show-if-above
            :width="200"
            :breakpoint="500"
            bordered
            :class="$q.dark.isActive ? 'bg-grey-10' : 'bg-grey-3'"
        >
            <q-scroll-area class="fit">
                <q-list v-if="getMenu.length">
                    <template
                        v-for="(menuItem, index) in getMenu"
                        :key="index"
                    >
                        <q-item
                            clickable
                            :to="menuItem.to"
                            :active="$route.path === '/' + menuItem.to"
                            v-ripple
                        >
                            <q-item-section avatar>
                                <!-- <q-icon :name="menuItem.icon" /> -->
                                <BaseIconSlot
                                    :name="menuItem.icon"
                                    size="sm"
                                />
                            </q-item-section>
                            <q-item-section>
                                {{ menuItem.label }}
                            </q-item-section>
                        </q-item>
                    </template>
                </q-list>
            </q-scroll-area>
        </q-drawer>

        <q-page-container>
            <!-- <pre>{{ getMenu }}</pre> -->
            <router-view />
        </q-page-container>
    </q-layout>
</template>

<script setup lang="ts">
import { Dark } from "quasar";
import { onMounted, ref, computed } from "vue";
import { navigationItem } from "@/models/frontend/inxex";
import { useMenuStore } from "@/stores/menu";
import BaseIconSlot from "@/composables/BaseIcon";
import QHeader from "@/components/header/Header.vue";

const store = useMenuStore();

const drawer = ref<Boolean>(false);
const getMenu = computed<navigationItem[]>(() => store.menu || []);

const toggleDark = () => {
    Dark.toggle();
    localStorage.setItem("dark-mode", (Dark.isActive as boolean) ? "true" : "false");
};

onMounted(async () => {
    await store.getMenu();
    if (localStorage.getItem("dark-mode") === "true") {
        Dark.set(true);
    }
});
</script>

<style scoped></style>
@/composables/BaseIcon
