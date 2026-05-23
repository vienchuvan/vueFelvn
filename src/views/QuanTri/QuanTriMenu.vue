<template>

    <!-- MENU MANAGER -->
    <div v-if="activeMenu === 'menus'" class="space-y-6 animate-in fade-in">

        <!-- HEADER -->
        <div class="flex justify-between items-center">

            <h2 class="text-2xl font-bold text-gray-800">
                Quản lý Menu & Submenu
            </h2>

            <button
                @click="saveMenu"
                :disabled="loading"
                class="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 shadow-sm transition-all"
            >

                <Save :size="18" />

                {{
                    loading
                        ? "Đang cập nhật..."
                        : "Cập nhật Menu"
                }}
            </button>
        </div>

        <!-- BODY -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">

            <!-- LANGUAGE -->
            <div class="flex gap-6 border-b border-gray-200 mb-6">

                <button
                    v-for="item in langs"
                    :key="item.value"
                    @click="lang = item.value"
                    class="pb-3 text-sm font-medium border-b-2 transition-all"
                    :class="
                        lang === item.value
                            ? 'border-blue-600 text-blue-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700'
                    "
                >

                    {{ item.label }}
                </button>
            </div>

            <!-- LOADING -->
            <div
                v-if="loading && MOCK_MENU.length === 0"
                class="text-center py-10 text-gray-500"
            >
                Đang tải menu...
            </div>

            <!-- MENUS -->
            <div class="space-y-3">

                <div
                    v-for="(item, index) in MOCK_MENU"
                    :key="item.id"
                    class="border border-gray-200 rounded-lg overflow-hidden"
                >

                    <!-- MENU -->
                    <div
                        class="bg-gray-50 p-3 flex justify-between items-center border-b border-gray-200"
                    >

                        <div class="flex items-center gap-3 w-1/2">

                            <MenuIcon
                                :size="18"
                                class="text-gray-400 cursor-move"
                            />

                            <input
                                v-model="item.name[lang]"
                                type="text"
                                class="flex-1 border border-gray-300 rounded p-2 text-sm font-bold outline-none focus:border-blue-500"
                            />
                        </div>

                        <div class="flex items-center gap-2">

                            <span
                                class="text-xs text-gray-500 bg-white px-2 py-1 rounded border"
                            >

                                Link:
                                /{{
                                    item.name.en
                                        ?.toLowerCase()
                                        ?.replaceAll(" ", "-")
                                }}
                            </span>

                            <!-- ADD SUBMENU -->
                            <button
                                @click="addSubMenu(index)"
                                class="text-blue-600 hover:bg-blue-50 p-1.5 rounded"
                            >

                                <Plus :size="16" />
                            </button>

                            <!-- DELETE -->
                            <button
                                @click="deleteMenu(index)"
                                class="text-red-500 hover:bg-red-50 p-1.5 rounded"
                            >

                                <Trash2 :size="16" />
                            </button>
                        </div>
                    </div>

                    <!-- SUBMENU -->
                    <div
                        v-if="item.children && item.children.length > 0"
                        class="bg-white p-3 pl-12 space-y-2"
                    >

                        <div
                            v-for="(child, cIndex) in item.children"
                            :key="child.id"
                            class="flex justify-between items-center"
                        >

                            <div class="flex items-center gap-3 w-1/2">

                                <ChevronRight
                                    :size="16"
                                    class="text-gray-300"
                                />

                                <input
                                    v-model="child.name[lang]"
                                    type="text"
                                    class="flex-1 border border-gray-200 rounded p-2 text-sm outline-none focus:border-blue-500"
                                />
                            </div>

                            <button
                                @click="
                                    deleteSubMenu(
                                        index,
                                        cIndex
                                    )
                                "
                                class="text-red-500 hover:bg-red-50 p-1.5 rounded"
                            >

                                <Trash2 :size="14" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- ADD MENU -->
            <button
                @click="addMenu"
                class="mt-4 border-2 border-dashed border-gray-300 w-full py-3 rounded-lg text-gray-500 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 font-medium flex items-center justify-center gap-2 transition-colors"
            >

                <Plus :size="20" />

                Thêm Menu Mới
            </button>
        </div>
    </div>
</template>

<script>

import axios from "axios";

import {
    Menu as MenuIcon,
    Plus,
    Trash2,
    ChevronRight,
    Save,
} from "lucide-vue-next";

export default {

    name: "AdminCMS",

    components: {
        MenuIcon,
        Plus,
        Trash2,
        ChevronRight,
        Save,
    },

    data() {

        return {

            activeMenu: "menus",

            lang: "vi",

            loading: false,

            langs: [
                {
                    value: "vi",
                    label: "🇻🇳 Tiếng Việt",
                },
                {
                    value: "en",
                    label: "🇬🇧 English",
                },
                {
                    value: "ja",
                    label: "🇯🇵 日本語",
                },
            ],

            // DATA TỪ API
            MOCK_MENU: [],
        };
    },

    mounted() {

        this.getMenu();
    },

    methods: {

        // =========================
        // GET MENU
        // =========================
        async getMenu() {

            try {

                this.loading = true;

                const res = await axios.post(
                    "http://localhost:3000/set-menu",
                    {
                        idFun: 100,
                    }
                );

                if (res.data.success) {

                    this.MOCK_MENU =
                        res.data.data || [];
                }

            } catch (error) {

                console.log(error);

                alert("Không tải được menu");

            } finally {

                this.loading = false;
            }
        },

        // =========================
        // SAVE MENU
        // =========================
        async saveMenu() {

            try {

                this.loading = true;

                const res = await axios.post(
                    "http://localhost:3000/set-menu",
                    {
                        idFun: 200,
                        menus: this.MOCK_MENU,
                    }
                );

                if (res.data.success) {

                    alert(
                        "Cập nhật menu thành công"
                    );

                    this.getMenu();
                }

            } catch (error) {

                console.log(error);

                alert("Có lỗi xảy ra");

            } finally {

                this.loading = false;
            }
        },

        // =========================
        // ADD MENU
        // =========================
        addMenu() {

            this.MOCK_MENU.push({

                temp: true,

                id: Date.now(),

                name: {
                    vi: "Menu mới",
                    en: "New Menu",
                    ja: "新メニュー",
                },

                children: [],
            });
        },

        // =========================
        // DELETE MENU
        // =========================
        deleteMenu(index) {

            if (
                confirm(
                    "Bạn muốn xóa menu này?"
                )
            ) {

                this.MOCK_MENU.splice(
                    index,
                    1
                );
            }
        },

        // =========================
        // ADD SUBMENU
        // =========================
        addSubMenu(menuIndex) {

            this.MOCK_MENU[
                menuIndex
            ].children.push({

                temp: true,

                id: Date.now(),

                name: {
                    vi: "Submenu mới",
                    en: "New Submenu",
                    ja: "新しいサブメニュー",
                },
            });
        },

        // =========================
        // DELETE SUBMENU
        // =========================
        deleteSubMenu(
            menuIndex,
            childIndex
        ) {

            this.MOCK_MENU[
                menuIndex
            ].children.splice(
                childIndex,
                1
            );
        },
    },
};
</script>