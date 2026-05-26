<template>
    <div class="space-y-6 animate-in fade-in">
        <!-- Header -->
        <div class="flex justify-between items-center">
            <h2 class="text-2xl font-bold text-gray-800">Cài đặt chung</h2>
            <button
                class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 shadow-sm"
                @click="saveSettings">
                <Save :size="18" /> Lưu thay đổi
            </button>
        </div>

        <!-- Section 1: Basic Info -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 class="text-lg font-bold text-gray-800 mb-4 border-b pb-2">
                1. Thông tin cơ bản (Logo & Liên hệ)
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Mã SVG Logo</label>
                    <textarea v-model="formData.logo"
                        class="w-full border border-gray-300 rounded-lg p-3 text-sm h-[204px] font-mono bg-gray-50 outline-none focus:border-blue-500"
                        placeholder="<svg>...</svg>"></textarea>
                </div>
                <div class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1" style="text-align: left;">Hotline tư vấn</label>
                        <input v-model="formData.hotline" type="text"
                            class="w-full border border-gray-300 rounded-lg p-2.5 text-sm outline-none focus:border-blue-500" />
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1" style="text-align: left;">Email liên hệ</label>
                        <input v-model="formData.email" type="text"
                            class="w-full border border-gray-300 rounded-lg p-2.5 text-sm outline-none focus:border-blue-500" />
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1" style="text-align: left;">Thời gian làm việc</label>
                        <input v-model="formData.workingHours" type="text"
                            class="w-full border border-gray-300 rounded-lg p-2.5 text-sm outline-none focus:border-blue-500" />
                    </div>
                </div>
            </div>
        </div>

        <!-- Section 2: Multi-language -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 class="text-lg font-bold text-gray-800 mb-4 border-b pb-2">

            </h3>

            <!-- Language Tabs -->
            <div class="flex gap-2 mb-6 border-b border-gray-200 pb-3">
                <button v-for="langOption in langs" :key="langOption.value" @click="activeLang = langOption.value"
                    :class="[
                        'px-4 py-2 rounded-t-lg font-medium text-sm transition-all',
                        activeLang === langOption.value
                            ? 'bg-blue-600 text-white border-b-2 border-blue-600'
                            : 'text-gray-600 hover:text-gray-800',
                    ]">
                    {{ langOption.label }}
                </button>
            </div>

            <div class="space-y-5">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1" style="text-align: left;">
                        Tên công ty ({{ activeLang.toUpperCase() }})
                    </label>
                    <input v-model="formData.languages[activeLang].companyName" type="text"
                        class="w-full border border-gray-300 rounded-lg p-2.5 text-sm outline-none focus:border-blue-500"
                        :placeholder="`Nhập tên công ty bằng tiếng ${activeLang}...`" />
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1" style="text-align: left;">
                        Địa chỉ trụ sở ({{ activeLang.toUpperCase() }})
                    </label>
                    <input v-model="formData.languages[activeLang].address" type="text"
                        class="w-full border border-gray-300 rounded-lg p-2.5 text-sm outline-none focus:border-blue-500"
                        :placeholder="`Nhập địa chỉ bằng tiếng ${activeLang}...`" />
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1" style="text-align: left;">
                        Nội dung Footer ({{ activeLang.toUpperCase() }})
                    </label>
                    <textarea v-model="formData.languages[activeLang].footerContent"
                        class="w-full border border-gray-300 rounded-lg p-3 h-24 text-sm outline-none focus:border-blue-500"
                        placeholder="Chuyên cung cấp giải pháp..."></textarea>
                </div>
            </div>
        </div>

        <!-- Section 3: Banner Slider -->
        <!-- ========================= -->
        <!-- SECTION 3 -->
        <!-- ========================= -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">

            <div class="flex justify-between items-center mb-4 border-b pb-2">

                <h3 class="text-lg font-bold text-gray-800">
                    3. Quản lý Banner Slider (Trang chủ)
                </h3>

                <button @click="addBanner"
                    class="text-blue-600 font-medium text-sm flex items-center gap-1 hover:text-blue-800">

                    <Plus :size="16" />

                    Thêm Banner
                </button>
            </div>

            <div class="space-y-4">

                <div v-for="(banner, idx) in formData.banners" :key="banner.id || idx"
                    class="border border-gray-200 rounded-lg p-4 flex gap-4 items-center bg-gray-50">

                    <!-- IMAGE -->
                    <div class="w-32 h-20 bg-gray-300 rounded overflow-hidden shrink-0 border border-gray-300 relative">

                        <img :src="banner.image" class="w-full h-full object-cover" alt="banner" />

                        <input type="file" accept="image/*" class="absolute inset-0 opacity-0 cursor-pointer" @change="
                            changeBannerImage(
                                $event,
                                idx
                            )
                            " />
                    </div>

                    <!-- INFO -->
                    <div class="flex-1 space-y-2">

                        <input v-model="banner.title" type="text" placeholder="Tiêu đề banner"
                            class="w-full border border-gray-300 rounded p-2 text-sm font-bold outline-none focus:border-blue-500" />

                        <input v-model="banner.description" type="text" placeholder="Mô tả banner"
                            class="w-full border border-gray-300 rounded p-2 text-sm text-gray-600 outline-none focus:border-blue-500" />
                    </div>

                    <!-- ACTION -->
                    <div class="shrink-0 flex flex-col gap-2">

                        <!-- SAVE -->
                        <button @click="saveBanner(banner)"
                            class="p-2 text-blue-600 hover:text-blue-800 bg-white rounded shadow-sm border">

                            <Save :size="16" />
                        </button>

                        <!-- DELETE -->
                        <button @click="
                            removeBanner(
                                idx,
                                banner
                            )
                            " class="p-2 text-red-500 hover:text-red-700 bg-white rounded shadow-sm border">

                            <Trash2 :size="16" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Save, Plus, Trash2 } from "lucide-vue-next";
import axios from "axios";
export default {
    name: "GeneralSettings",
    components: {
        Save,
        Plus,
        Trash2,
    },
    data() {
        return {
            activeLang: "vi",
            langs: [
                { value: "vi", label: "🇻🇳 Tiếng Việt" },
                { value: "en", label: "🇬🇧 English" },
                { value: "ja", label: "🇯🇵 日本語" },
            ],
            formData: {
                logo: "<svg>...</svg>",
                hotline: "0909 123 456",
                email: "contact@levietnam.com.vn",
                workingHours: "Thứ 2 - Thứ 6 (8:00 - 17:30)",
                languages: {
                    vi: {
                        companyName: "",
                        address: "",
                        footerContent: "",
                    },
                    en: {
                        companyName: "",
                        address: "",
                        footerContent: "",
                    },
                    ja: {
                        companyName: "",
                        address: "",
                        footerContent: "",
                    },
                },

                formData: {

                    banners: [
                        {
                            image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400",
                            title: "Đối Tác Tin Cậy Trong Xúc Tiến Đầu Tư & Pháp Lý",
                            description: "Giải pháp toàn diện về đầu tư...",
                        },
                    ],
                }

            },
        };
    },
    mounted() {
        this.getSettings();
        this.getBanners();
    },
    methods: {

        async getSettings() {

            try {

                const res = await axios.post(
                    "http://192.168.0.104:3000/setting-home",
                    {
                        idFun: 100
                    }
                );

                if (res.data.success) {

                    this.formData = {
                        ...this.formData,
                        ...res.data.data
                    };
                }

            } catch (error) {

                console.log(error);

            }
        },
        async saveSettings() {

            try {

                const payload = {

                    idFun: 200,

                    logo: this.formData.logo,

                    hotline: this.formData.hotline,

                    email: this.formData.email,

                    workingHours:
                        this.formData.workingHours,

                    languages:
                        this.formData.languages,
                };

                const res = await axios.post(
                    "http://192.168.0.104:3000/setting-home",
                    payload
                );

                if (res.data.success) {

                    alert(
                        "Lưu cài đặt thành công"
                    );
                }

            } catch (error) {

                console.log(error);

                alert("Có lỗi xảy ra");
            }
        },
        // addBanner() {
        //     this.formData.banners.push({
        //         image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400",
        //         title: "",
        //         description: "",
        //     });
        // },
        // removeBanner(idx) {
        //     this.formData.banners.splice(idx, 1);
        // },
        async getBanners() {

            try {

                const res = await axios.post(
                    "http://192.168.0.104:3000/set-banner",
                    {
                        idFun: 114
                    }
                );

                if (res.data.success) {

                    this.formData.banners =    res.data.data.map(   item => ({
                                id: item.id,
                               
                                 image: item.img?.startsWith('https') ? item.img : "http://192.168.0.104:3000" + item.img,
                                img: item.img,
                                title:   item.title,
                                description:  item.desc,
                                file: null,
                            })
                        );
                }

            } catch (error) {

                console.log(error);

                alert(  "Không tải được banner"
                );
            }
        },

        // =========================
        // ADD BANNER
        // =========================
        addBanner() {
            this.formData.banners.push({
                temp: true,
                id: Date.now(),
                image:    "https://placehold.co/600x400?text=Banner",
                img: "",
                title: "",
                description: "",
                file: null,
            });
        },

        // =========================
        // CHANGE IMAGE
        // =========================
        changeBannerImage(    event,   index   ) {
            const file =   event.target.files[0];
            if (!file) return
            this.formData.banners[  index  ].file = file;
            this.formData.banners[   index     ].image =  URL.createObjectURL(file);
        },

        // =========================
        // SAVE BANNER
        // =========================
        async saveBanner(banner) {

            try {
                const formData =
                    new FormData();
                formData.append("idFun", banner.temp ? 111 : 112);
                formData.append("id", banner.id);
                formData.append("title", banner.title);
                formData.append("desc", banner.description);
                // upload file
                if (banner.file) {
                    formData.append("banner_image", banner.file);
                }
                // giữ ảnh cũ
                else {
                    formData.append("img", banner.img || "");
                }
                const res = await axios.post(
                    "http://192.168.0.104:3000/set-banner",
                    formData,
                    {
                        headers: {
                            "Content-Type":
                                "multipart/form-data",
                        },
                    }
                );
                if (res.data.success) {
                    alert(banner.temp ? "Thêm banner thành công" : "Cập nhật banner thành công");
                    banner.temp = false
                    banner.img = res.data.img;
                    banner.image = "http://192.168.0.104:3000" + res.data.img;
                    banner.file = null;
                }
            } catch (error) {
                console.log(error);
                alert("Có lỗi xảy ra");
            }
        },

        // =========================
        // DELETE BANNER
        // =========================
        async removeBanner(idx, banner) {
            try {
                if (!confirm("Bạn muốn xóa banner?")) {
                    return;
                }
                // banner mới chưa save
                if (banner.temp) {
                    this.formData.banners.splice(idx, 1);
                    return;
                }
                const res = await axios.post(
                    "http://192.168.0.104:3000/api/banner",
                    {
                        idFun: 113,
                        id: banner.id,
                    }
                );
                if (res.data.success) {
                    this.formData.banners.splice(idx, 1);
                    alert("Xóa banner thành công");
                }
            } catch (error) {
                console.log(error);
                alert("Có lỗi xảy ra");
            }
        },
    },
};
</script>

<style scoped>
.animate-in {
    animation: fadeIn 0.3s ease-in;
}

.fade-in {
    opacity: 1;
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}
</style>
