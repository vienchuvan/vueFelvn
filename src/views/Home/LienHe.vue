<template>
    <div class="news-page-bg min-h-screen overflow-hidden">

        <!-- TOP NAV -->
        <TopNav :activeTab="activeTab" :lang="lang" @update:activeTab="$emit('update:activeTab', $event)"
            @update:lang="$emit('update:lang', $event)" />

        <!-- HERO -->
        <section class="relative overflow-hidden border-b border-white/10" style="font-family:system-ui;">

            <!-- GRID BG -->
            <div class="absolute inset-0 opacity-[0.05]">
                <div class="wave-bg"></div>
            </div>

            <!-- ORANGE GLOW -->
            <div class="absolute -left-24 top-10 h-[320px] w-[320px] rounded-full bg-orange-500/20 blur-3xl"></div>

            <!-- BLUE GLOW -->
            <div
                class="absolute right-[-120px] bottom-[-120px] h-[350px] w-[350px] rounded-full bg-cyan-400/20 blur-3xl">
            </div>

            <div class="relative z-10 mx-auto max-w-7xl px-4 py-14">

                <!-- HEADER -->
                <div class="mx-auto mb-10 max-w-4xl text-center" data-aos="fade-up">
                    <h3 class="mb-5 text-[34px] font-black tracking-tight text-white md:text-[48px]">
                        Kết Nối Với Chúng Tôi
                    </h3>
                </div>

                <!-- CONTENT -->
                <div class="grid grid-cols-1 gap-7 lg:grid-cols-[1fr_320px]">

                    <!-- LEFT -->
                    <div data-aos="fade-up"
                        class="overflow-hidden rounded-[28px] border border-white/10 bg-white/95 backdrop-blur-xl shadow-[0_20px_70px_rgba(0,0,0,0.18)]" style="height: max-content;">

                        <div class="grid grid-cols-1 lg:grid-cols-[320px_1fr]">

                            <!-- CONTACT INFO -->
                            <div
                                class="relative overflow-hidden bg-gradient-to-br from-[#173B6C] via-[#153765] to-[#102C52] p-8 text-white">

                                <!-- DECOR -->
                                <div class="absolute -bottom-16 -left-16 h-[220px] w-[220px] rounded-full bg-white/5">
                                </div>

                                <div
                                    class="absolute top-[-60px] right-[-60px] h-[180px] w-[180px] rounded-full bg-orange-400/10 blur-2xl">
                                </div>

                                <div class="relative z-10 flex h-full flex-col">

                                    <!-- TITLE -->
                                    <div class="mb-8">

                                        <!-- LOGO -->
                                        <div v-if="settings.logo"
                                            class="mb-5 h-14 max-w-[200px] [&>svg]:h-full [&>svg]:w-full"
                                            v-html="settings.logo"></div>

                                        <h2 class="text-[28px] font-black leading-[1.4]">
                                            Thông Tin Liên Hệ
                                        </h2>

                                    </div>

                                    <!-- ITEMS -->
                                    <div class="space-y-7">

                                        <!-- ADDRESS -->
                                        <div
                                            class="group flex gap-4 rounded-2xl border border-white/5 bg-white/5 p-4 transition-all duration-300 hover:bg-white/10">

                                            <div
                                                class="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-xl">
                                                <i class="fa-solid fa-location-dot text-[20px] text-[#FF7A1A]"></i>
                                            </div>

                                            <div>

                                                <p
                                                    class="mb-2 text-[11px] font-bold uppercase tracking-[2px] text-white/50">
                                                    Trụ sở chính
                                                </p>

                                                <p class="text-[14px] font-bold leading-[1.9] text-white">
                                                    {{
                                                        currentLang.address ||
                                                        "Chưa cập nhật địa chỉ"
                                                    }}
                                                </p>

                                            </div>

                                        </div>

                                        <!-- PHONE -->
                                        <div
                                            class="group flex gap-4 rounded-2xl border border-white/5 bg-white/5 p-4 transition-all duration-300 hover:bg-white/10">

                                            <div
                                                class="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-xl">
                                                <i class="fa-solid fa-phone-volume text-[18px] text-[#FF7A1A]"></i>
                                            </div>

                                            <div>

                                                <p
                                                    class="mb-2 text-[11px] font-bold uppercase tracking-[2px] text-white/50">
                                                    Hotline tư vấn
                                                </p>

                                                <p class="text-[20px] font-black text-white">
                                                    {{
                                                        settings.hotline ||
                                                        "Chưa cập nhật hotline"
                                                    }}
                                                </p>

                                            </div>

                                        </div>

                                        <!-- EMAIL -->
                                        <div
                                            class="group flex gap-4 rounded-2xl border border-white/5 bg-white/5 p-4 transition-all duration-300 hover:bg-white/10">

                                            <div
                                                class="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-xl">
                                                <i class="fa-solid fa-envelope text-[18px] text-[#FF7A1A]"></i>
                                            </div>

                                            <div>

                                                <p
                                                    class="mb-2 text-[11px] font-bold uppercase tracking-[2px] text-white/50">
                                                    Email hỗ trợ
                                                </p>

                                                <p class="break-all text-[14px] font-bold text-white">
                                                    {{
                                                        settings.email ||
                                                        "Chưa cập nhật email"
                                                    }}
                                                </p>

                                            </div>

                                        </div>

                                    </div>

                                    <!-- FOOT -->
                                    <div class="mt-auto pt-8">

                                        <div class="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">

                                            <p
                                                class="mb-2 text-[11px] font-bold uppercase tracking-[2px] text-white/50">
                                                Giờ làm việc
                                            </p>

                                            <p class="text-[14px] font-bold leading-[1.8] text-white">
                                                <span class="text-orange-300">
                                                    {{
                                                        settings.workingHours ||
                                                        "Chưa cập nhật giờ làm việc"
                                                    }}
                                                </span>
                                            </p>

                                        </div>

                                    </div>

                                </div>

                            </div>

                            <!-- FORM -->
                            <div class="bg-white p-7 md:p-10">

                                <!-- SUCCESS -->
                                <div v-if="successMessage"
                                    class="mb-5 rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-[14px] font-bold text-green-700">
                                    {{ successMessage }}
                                </div>

                                <!-- ERROR -->
                                <div v-if="errorMessage"
                                    class="mb-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-[14px] font-bold text-red-700">
                                    {{ errorMessage }}
                                </div>

                                <!-- TITLE -->
                                <div class="mb-8">

                                    <h2 class="mb-3 text-[30px] font-black text-[#1D225C]">
                                        Gửi Yêu Cầu Tư Vấn
                                    </h2>

                                    <p class="text-[14px] leading-[1.9] text-[#6B7280]">
                                        Điền thông tin bên dưới, đội ngũ chuyên gia sẽ liên hệ hỗ trợ bạn.
                                    </p>

                                </div>

                                <!-- FORM -->
                                <form class="space-y-5" @submit.prevent="submitContact">

                                    <!-- ROW -->
                                    <div class="grid grid-cols-1 gap-5 md:grid-cols-2">

                                        <!-- NAME -->
                                        <div>

                                            <label class="mb-2 block text-[13px] font-black text-[#1D225C]">
                                                Họ và tên
                                            </label>

                                            <div class="input-wrap">

                                                <i class="fa-regular fa-user"></i>

                                                <input v-model="form.name" type="text"
                                                    placeholder="VD: Nguyễn Văn A" class="modern-input" />

                                            </div>

                                        </div>

                                        <!-- PHONE -->
                                        <div>

                                            <label class="mb-2 block text-[13px] font-black text-[#1D225C]">
                                                Số điện thoại
                                            </label>

                                            <div class="input-wrap">

                                                <i class="fa-solid fa-phone"></i>

                                                <input v-model="form.phone" type="text"
                                                    placeholder="VD: 0901234567" class="modern-input" />

                                            </div>

                                        </div>

                                    </div>

                                    <!-- SERVICE -->
                                    <div>

                                        <label class="mb-2 block text-[13px] font-black text-[#1D225C]">
                                            Dịch vụ quan tâm
                                        </label>

                                        <div class="input-wrap">

                                            <i class="fa-solid fa-briefcase"></i>

                                            <select v-model="form.service" class="modern-input">
                                                <option value="">
                                                    -- Vui lòng chọn dịch vụ --
                                                </option>

                                                <option>
                                                    Thành lập doanh nghiệp
                                                </option>

                                                <option>
                                                    Giấy phép lao động
                                                </option>

                                                <option>
                                                    Visa - Thẻ tạm trú
                                                </option>

                                                <option>
                                                    Đào tạo doanh nghiệp
                                                </option>
                                            </select>

                                        </div>

                                    </div>

                                    <!-- MESSAGE -->
                                    <div>

                                        <label class="mb-2 block text-[13px] font-black text-[#1D225C]">
                                            Nội dung chi tiết
                                        </label>

                                        <textarea v-model="form.note" rows="5"
                                            placeholder="Mô tả cụ thể vấn đề bạn cần hỗ trợ..."
                                            class="modern-textarea"></textarea>

                                    </div>

                                    <!-- BUTTON -->
                                    <button type="submit" :disabled="loading" class="submit-btn group">

                                        <span>
                                            {{
                                                loading
                                                    ? "Đang gửi..."
                                                    : "Gửi Yêu Cầu Tư Vấn"
                                            }}
                                        </span>

                                        <i
                                            class="fa-solid fa-arrow-right transition-transform duration-300 group-hover:translate-x-1"></i>

                                    </button>

                                </form>

                            </div>

                        </div>

                    </div>

                    <!-- RIGHT -->
                    <aside data-aos="fade-left" class="space-y-6">

                        <!-- MENU -->
                        <div
                            class="overflow-hidden rounded-[22px] border border-white/10 bg-[#082C5C]/95 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.35)]">

                            <RightMenu :activeTab="activeTab"
                                @update:activeTab="$emit('update:activeTab', $event)" />

                        </div>

                        <!-- SUPPORT -->
                        <div
                            class="relative overflow-hidden rounded-[22px] bg-gradient-to-br from-[#ff6600] via-[#ff7b00] to-[#ff9500] p-6 shadow-[0_20px_60px_rgba(255,102,0,0.35)]">

                            <div class="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/10 blur-2xl">
                            </div>

                            <div class="relative z-10">

                                <div
                                    class="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-xl">
                                    <i class="fa-solid fa-headset text-[22px] text-white"></i>
                                </div>

                                <h3 class="mb-3 text-[24px] font-black leading-[1.4] text-white">
                                    Hỗ trợ nhanh 24/7
                                </h3>

                                <p class="text-[13px] leading-[1.9] text-white/90">
                                    Đội ngũ
                                    {{ currentLang.companyName || "LE VIET NAM" }}
                                    luôn sẵn sàng hỗ trợ mọi vấn đề pháp lý,
                                    đầu tư và doanh nghiệp.
                                </p>

                                <a :href="`tel:${settings.hotline}`"
                                    class="mt-6 inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-[13px] font-black text-[#ff6600] transition-all duration-300 hover:scale-105">

                                    Gọi ngay

                                    <i class="fa-solid fa-phone"></i>

                                </a>

                            </div>

                        </div>

                    </aside>

                </div>

            </div>

        </section>

    </div>

    <FooterWeb />
</template>

<script>
import axios from "axios";

import AOS from "aos";
import "aos/dist/aos.css";

import RightMenu from "@/views/Home/RightMenu.vue";
import TopNav from "@/views/Home/TopNav.vue";
import FooterWeb from "@/views/Home/FooterWeb.vue";

export default {
    name: "ContactSection",

    components: {
        TopNav,
        RightMenu,
        FooterWeb,
    },

    props: {
        activeTab: String,

        lang: {
            type: String,
            default: "vi",
        },
    },

    data() {
        return {
            settings: {
                logo: "",
                hotline: "",
                email: "",
                workingHours: "",
                languages: {
                    vi: {},
                    en: {},
                    ja: {},
                },
            },

            loading: false,

            successMessage: "",

            errorMessage: "",

            form: {
                name: "",
                phone: "",
                service: "",
                note: "",
            },
        };
    },

    computed: {
        currentLang() {
            return this.settings.languages?.[this.lang] || {};
        },
    },

    async mounted() {
        AOS.init({
            duration: 900,
            once: true,
            easing: "ease-out-cubic",
        });

        await this.getSettings();
    },

    methods: {

        async submitContact() {

            this.successMessage = "";
            this.errorMessage = "";

            if (!this.form.name) {
                this.errorMessage = "Vui lòng nhập họ tên";
                return;
            }

            if (!this.form.phone) {
                this.errorMessage = "Vui lòng nhập số điện thoại";
                return;
            }

            this.loading = true;

            try {

                const res = await axios.post(
                    "http://192.168.51.252:3000/quantri/contacts",
                    {
                        idFun: 111,

                        name: this.form.name,
                        phone: this.form.phone,
                        service: this.form.service,
                        note: this.form.note,

                        contact_date: new Date(),
                        status: "new",
                    }
                );

                if (res.data.success) {

                    this.successMessage =
                        "Gửi yêu cầu tư vấn thành công!";

                    this.form = {
                        name: "",
                        phone: "",
                        service: "",
                        note: "",
                    };

                } else {

                    this.errorMessage =
                        res.data.message || "Có lỗi xảy ra";

                }

            } catch (error) {

                console.log(error);

                this.errorMessage =
                    error?.response?.data?.message ||
                    "Không thể gửi yêu cầu";

            } finally {

                this.loading = false;

            }

        },

        async getSettings() {

            try {

                const res = await axios.post(
                    "http://192.168.51.252:3000/setting-home",
                    {
                        idFun: 100,
                    }
                );

                if (res.data.success) {
                    this.settings = res.data.data;
                }

            } catch (error) {

                console.log(error);

            }

        },

    },
};
</script>

<style scoped>
.contact-page-bg {
    min-height: 100vh;

    background:
        linear-gradient(rgba(0, 0, 0, 0.08),
            rgba(0, 0, 0, 0.08)),
        url("https://www.transparenttextures.com/patterns/cubes.png"),
        linear-gradient(-45deg,
            #072f5f,
            #0a4c8b,
            #0f3d75,
            #082347);

    background-size: 400% 400%;

    animation:
        gradientMove 16s ease infinite;
}

.wave-bg {
    width: 100%;
    height: 100%;

    background-image:
        radial-gradient(rgba(255, 255, 255, 0.5) 1px,
            transparent 1px);

    background-size: 28px 28px;
}

.input-wrap {
    position: relative;
}

.input-wrap i {
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    color: #9ca3af;
    font-size: 14px;
}

.modern-input {
    height: 54px;
    width: 100%;
    border-radius: 16px;
    border: 1px solid #e5e7eb;
    background: #f9fafb;
    padding: 0 18px 0 46px;
    font-size: 14px;
    outline: none;
    transition: all .35s ease;
}

.modern-input:focus {
    border-color: #0B5FA5;
    background: white;
    box-shadow:
        0 0 0 4px rgba(11, 95, 165, .08);
}

.modern-textarea {
    width: 100%;
    border-radius: 18px;
    border: 1px solid #e5e7eb;
    background: #f9fafb;
    padding: 16px 18px;
    font-size: 14px;
    outline: none;
    resize: none;
    transition: all .35s ease;
}

.modern-textarea:focus {
    border-color: #0B5FA5;
    background: white;
    box-shadow:
        0 0 0 4px rgba(11, 95, 165, .08);
}

.submit-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;

    width: 100%;
    height: 56px;

    border-radius: 18px;
    border: none;

    background:
        linear-gradient(135deg,
            #ff6600,
            #ff8a00);

    color: white;

    font-size: 15px;
    font-weight: 900;

    cursor: pointer;

    transition: all .35s ease;

    box-shadow:
        0 12px 30px rgba(255, 102, 0, .25);
}

.submit-btn:hover {
    transform: translateY(-2px);

    box-shadow:
        0 18px 40px rgba(255, 102, 0, .35);
}

@keyframes gradientMove {

    0% {
        background-position: 0% 50%;
    }

    50% {
        background-position: 100% 50%;
    }

    100% {
        background-position: 0% 50%;
    }
}

body {
  font-family: system-ui;
}
</style>s