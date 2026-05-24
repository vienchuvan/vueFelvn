<template>
  <div class="globe-grid-bg min-h-screen flex flex-col overflow-hidden" style="font-family:auto;">
    
    <TopNav />

    <!-- BANNER -->
    <div data-aos="fade-down">
      <BannerHome
        @setActiveTab="handleMenuClick"
        :lang="currentLang"
      />
    </div>

    <!-- MAIN -->
    <main class="w-full max-w-[1180px] mx-auto px-5 py-9 pb-20 flex-grow">

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">

        <!-- LEFT -->
        <div class="lg:col-span-8 flex flex-col gap-10">

          <!-- ABOUT -->
          <section
            data-aos="fade-up"
            class="bg-white rounded-[28px] p-8 md:p-10 shadow-[0_10px_60px_rgba(0,0,0,0.12)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_25px_80px_rgba(0,0,0,0.18)]"
          >

            <div class="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">

              <!-- TEXT -->
              <div
                class="md:col-span-7 space-y-5"
                v-if="article"
              >

                <div class="flex items-center space-x-3.5">
                  <div class="w-[4px] h-[30px] bg-brand-orange rounded-full"></div>

                  <h2 class="m-0 text-[26px] font-black text-[#1d2454] tracking-tight">
                    {{ article.title_vi }}
                  </h2>
                </div>

                <p
                  v-if="article.desc_vi"
                  class="text-[#4b5563] text-[14px] md:text-[15px] leading-[1.9] text-justify"
                >
                  {{ article.desc_vi }}
                </p>

                <div class="pt-3">
                  <a
                    :href="`/bai-viet/${article.slug}`"
                    target="_blank"
                    class="group inline-flex items-center gap-2 text-brand-orange text-[14px] font-bold hover:text-orange-600 transition-all duration-300"
                  >
                    Xem chi tiết

                    <i
                      class="fa-solid fa-arrow-right transition-transform duration-300 group-hover:translate-x-1"
                    ></i>
                  </a>
                </div>

              </div>

              <!-- IMAGE -->
              <div class="md:col-span-5">

                <div
                  class="rounded-3xl overflow-hidden shadow-2xl floating-animation"
                >

                  <img
                    src="https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=800"
                    class="w-full h-60 object-cover transition-transform duration-700 hover:scale-110"
                    alt=""
                  />

                </div>

              </div>

            </div>

          </section>

          <!-- FEATURED SERVICES -->
          <section class="space-y-6">

            <!-- HEADER -->
            <div
              data-aos="fade-right"
              class="flex justify-between items-center"
            >

              <div class="flex items-center space-x-3.5">
                <div class="w-[4px] h-[30px] bg-brand-orange rounded-full"></div>

                <h2 class="text-[26px] font-black text-white tracking-tight">
                  Dịch Vụ Nổi Bật
                </h2>
              </div>

              <a
                href="/dich-vu"
                target="_blank"
                class="group text-brand-orange text-[15px] font-bold flex items-center gap-2 hover:text-orange-300 transition-all duration-300"
              >
                Xem tất cả

                <i
                  class="fa-solid fa-arrow-right transition-transform duration-300 group-hover:translate-x-1"
                ></i>
              </a>

            </div>

            <!-- SERVICES -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-5">

              <div
                v-for="(service,index) in featuredServices"
                :key="service.id"
                data-aos="zoom-in-up"
                :data-aos-delay="index * 120"
                class="group glow-orange bg-white rounded-[28px] overflow-hidden relative transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_25px_80px_rgba(0,0,0,0.2)]"
              >

                <!-- IMAGE -->
                <div class="h-48 overflow-hidden">

                  <img
                    :src="service.image"
                    class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    :alt="service.title"
                  />

                </div>

                <!-- CONTENT -->
                <div class="p-6 flex flex-col h-[240px]">

                  <div class="flex items-start gap-3 mb-4">

                    <div
                      class="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center shrink-0"
                    >
                      <i
                        :class="[service.icon,'text-brand-orange text-[16px]']"
                      ></i>
                    </div>

                    <h3
                      class="text-left text-[#1d2454] text-[14px] font-extrabold leading-[1.6] line-clamp-2"
                    >
                      {{ service.title }}
                    </h3>

                  </div>

                  <p
                    class="text-left text-[#6b7280] text-[13px] leading-[1.8] line-clamp-3 flex-1"
                  >
                    {{ service.desc }}
                  </p>

                  <a
                    :href="`/bai-viet/${service.slug}`"
                    class="group/link mt-5 inline-flex items-center gap-2 text-brand-orange text-[13px] font-bold"
                  >
                    Xem chi tiết

                    <i
                      class="fa-solid fa-arrow-right text-[11px] transition-transform duration-300 group-hover/link:translate-x-1"
                    ></i>
                  </a>

                </div>

              </div>

            </div>

          </section>

        </div>

        <!-- RIGHT -->
        <aside
          class="lg:col-span-4"
          data-aos="fade-left"
        >
          <RightMenu :subServices="subServices" />
        </aside>

      </div>

      <!-- TRAINING -->
      <section
        data-aos="fade-up"
        class="relative mt-14 overflow-hidden rounded-[32px] bg-gradient-to-br from-[#ff6600] via-[#ff7a00] to-[#ff9500] p-8 md:p-10 shadow-[0_25px_80px_rgba(255,102,0,0.35)]"
      >

        <!-- GLOW -->
        <div class="absolute -top-20 -right-20 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>

        <div class="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">

          <!-- LEFT -->
          <div class="md:col-span-7">

            <div class="flex items-center gap-3 mb-5">

              <div
                class="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-xl flex items-center justify-center"
              >
                <i class="fa-solid fa-graduation-cap text-white text-[24px]"></i>
              </div>

              <h2 class="text-white text-[24px] md:text-[30px] font-black">
                Đào Tạo Doanh Nghiệp
              </h2>

            </div>

            <p
              class="text-white/95 text-[15px] leading-[1.9] font-medium max-w-[620px]"
            >
              Chương trình
              <span class="font-black">
                "Giao tiếp thấu cảm & Tạo ảnh hưởng"
              </span>
              giúp nâng cao hiệu quả làm việc, giải quyết rào cản đa văn hóa và chuẩn hóa kỹ năng giao tiếp số trong thời đại mới.
            </p>

            <a
              href="/dao-tao"
              target="_blank"
              class="group relative mt-7 inline-flex overflow-hidden rounded-2xl bg-white px-7 py-3 font-black text-[#ff6600] transition-all duration-500 hover:-translate-y-1 hover:scale-105"
            >

              <span class="relative z-10 flex items-center gap-2">
                Tìm hiểu khóa học

                <i
                  class="fa-solid fa-arrow-right transition-transform duration-300 group-hover:translate-x-1"
                ></i>
              </span>

              <div
                class="absolute inset-0 bg-gradient-to-r from-orange-100 to-white opacity-0 transition duration-500 group-hover:opacity-100"
              ></div>

            </a>

          </div>

          <!-- RIGHT -->
          <div class="md:col-span-5">

            <div class="rounded-3xl overflow-hidden shadow-2xl floating-animation">

              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200"
                class="w-full h-[260px] object-cover transition-transform duration-700 hover:scale-110"
              />

            </div>

          </div>

        </div>

      </section>

      <!-- NEWS -->
      <section class="space-y-7 mt-14">

        <!-- HEADER -->
        <div
          data-aos="fade-right"
          class="flex items-center justify-between"
        >

          <div class="flex items-center gap-4">

            <div class="w-[4px] h-[34px] bg-brand-orange rounded-full"></div>

            <h2
              class="text-white text-[26px] md:text-[32px] font-black tracking-tight"
            >
              Tin Tức & Cập Nhật Mới
            </h2>

          </div>

          <a
            href="#"
            class="group text-brand-orange text-[15px] font-bold flex items-center gap-2 hover:text-orange-300 transition"
          >
            Xem tất cả

            <i
              class="fa-solid fa-arrow-right transition-transform duration-300 group-hover:translate-x-1"
            ></i>
          </a>

        </div>

        <!-- GRID -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div
            v-for="(item,index) in featuredNews"
            :key="index"
            data-aos="fade-up"
            :data-aos-delay="index * 150"
            class="group bg-[#0f2d63]/95 backdrop-blur-xl rounded-[28px] overflow-hidden border border-white/10 shadow-[0_10px_60px_rgba(0,0,0,0.25)] hover:-translate-y-2 hover:shadow-[0_25px_80px_rgba(0,0,0,0.4)] transition-all duration-500"
          >

            <!-- IMAGE -->
            <div class="p-5 pb-0 overflow-hidden">

              <img
                :src="item.image"
                class="w-full h-[190px] rounded-2xl object-cover transition-transform duration-700 group-hover:scale-105"
              />

            </div>

            <!-- CONTENT -->
            <div class="p-5">

              <div class="flex items-center gap-2 text-brand-orange text-[12px] mb-4">
                <i class="fa-regular fa-calendar"></i>

                <span>15/10/2023</span>
              </div>

              <h3
                class="text-left text-white text-[16px] font-extrabold leading-[1.7] line-clamp-2 min-h-[58px]"
              >
                {{ item.title }}
              </h3>

              <p
                class="mt-3 text-[#b9c6dc] text-left text-[13px] leading-[1.8] line-clamp-3 min-h-[72px]"
              >
                {{ item.desc }}
              </p>

              <a
                :href="`/bai-viet/${item.slug}`"
                class="group/read mt-5 inline-flex items-center gap-2 text-brand-orange text-[14px] font-bold transition"
              >
                Đọc tiếp

                <i
                  class="fa-solid fa-arrow-right text-[11px] transition-transform duration-300 group-hover/read:translate-x-1"
                ></i>
              </a>

            </div>

          </div>

        </div>

      </section>

    </main>

    <FooterWeb />

  </div>
</template>

<script>
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";

import RightMenu from "./RightMenu.vue";
import BannerHome from "./BannerHome.vue";
import TopNav from "./TopNav.vue";
import FooterWeb from "./FooterWeb.vue";

export default {
  name: "TrangChu",

  components: {
    BannerHome,
    TopNav,
    RightMenu,
    FooterWeb,
  },

  props: {
    activeTab: {
      type: String,
      default: "home",
    },

    lang: {
      type: String,
      default: "vi",
    },
  },

  data() {
    return {
      currentLang: this.lang,

      article: null,

      featuredServices: [],

      featuredNews: [],

      sidebarMenu: [],

      subServices: {
        investment: [],
        setup: [],
        visa: [],
      },
    };
  },

  methods: {

    async fetchArticles(cate = "service") {
      try {
        const response = await fetch(
          "http://localhost:3000/quantri/baiviet",
          {
            method: "POST",

            headers: {
              "Content-Type": "application/json",
            },

            body: JSON.stringify({
              idFun: 114,
              cate,
            }),
          }
        );

        const data = await response.json();

        const list = Array.isArray(data)
          ? data
          : data.data || [];

        this.featuredServices = list
          .slice(0, 3)
          .map((item, index) => ({
            id: item.id || index,

            icon:
              index % 3 === 0
                ? "fa-solid fa-earth-americas"
                : index % 3 === 1
                  ? "fa-solid fa-briefcase"
                  : "fa-solid fa-file-invoice",

            title: item.title_vi,

            desc: item.desc_vi,

            image: item.thumbnail?.startsWith("https")
              ? item.thumbnail
              : "http://localhost:3000" + item.thumbnail,

            slug: item.slug,
          }));

      } catch (err) {
        console.log(err);
      }
    },

    async fetchArticlesNews(cate = "news") {
      try {
        const response = await fetch(
          "http://localhost:3000/quantri/baiviet",
          {
            method: "POST",

            headers: {
              "Content-Type": "application/json",
            },

            body: JSON.stringify({
              idFun: 114,
              cate,
            }),
          }
        );

        const data = await response.json();

        const list = Array.isArray(data)
          ? data
          : data.data || [];

        this.featuredNews = list
          .slice(0, 3)
          .map((item, index) => ({
            id: item.id || index,

            title: item.title_vi,

            desc: item.desc_vi,

            image: item.thumbnail?.startsWith("https")
              ? item.thumbnail
              : "http://localhost:3000" + item.thumbnail,

            slug: item.slug,
          }));

      } catch (err) {
        console.log(err);
      }
    },

    async fetchSidebarMenu() {
      try {
        const res = await axios.get(
          "http://localhost:3000/sidebar-menu",
          {
            params: {
              idFun: 114,
            },
          }
        );

        if (res.data.success) {
          this.sidebarMenu = res.data.data;

          this.parseSidebarMenu();
        }

      } catch (err) {
        console.log(err);
      }
    },

    parseSidebarMenu() {
      this.subServices = {
        investment: [],
        setup: [],
        visa: [],
      };

      this.sidebarMenu.forEach((category) => {

        const categoryName =
          String(category.category).toLowerCase();

        category.items?.forEach((item) => {

          const subItemTitles =
            item.subItems?.map(sub => sub.title) || [];

          if (
            categoryName.includes("đầu tư") ||
            categoryName.includes("investment")
          ) {
            this.subServices.investment.push(...subItemTitles);

          } else if (
            categoryName.includes("doanh nghiệp") ||
            categoryName.includes("setup")
          ) {
            this.subServices.setup.push(...subItemTitles);

          } else if (
            categoryName.includes("visa")
          ) {
            this.subServices.visa.push(...subItemTitles);
          }

        });

      });
    },

    async fetchArticle() {
      try {
        const res = await axios.post(
          "http://localhost:3000/quantri/baiviet",
          {
            idFun: 115,
            slug: "ve-le-viet-nam",
          }
        );

        if (res.data.success) {
          this.article = res.data.data;
        }

      } catch (error) {
        console.log(error);
      }
    },

    handleMenuClick(itemId) {
      this.$emit("update:activeTab", itemId);
    },
  },

  mounted() {

    AOS.init({
      duration: 1000,
      once: true,
      offset: 80,
      easing: "ease-out-cubic",
    });

    this.fetchSidebarMenu();

    this.fetchArticle();

    this.fetchArticles();

    this.fetchArticlesNews();
  },
};
</script>

<style scoped>
.globe-grid-bg {
  min-height: 100vh;

  background:
    linear-gradient(rgba(0, 0, 0, 0.08),
      rgba(0, 0, 0, 0.08)),
    url("https://www.transparenttextures.com/patterns/cubes.png"),
    linear-gradient(
      -45deg,
      #072f5f,
      #0a4c8b,
      #0f3d75,
      #082347
    );

  background-size: 400% 400%;

  animation: gradientMove 16s ease infinite;
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

@keyframes floating {

  0% {
    transform: translateY(0px);
  }

  50% {
    transform: translateY(-10px);
  }

  100% {
    transform: translateY(0px);
  }
}

.floating-animation {
  animation: floating 5s ease-in-out infinite;
}

.glow-orange {
  position: relative;
  z-index: 1;
}

.glow-orange::before {
  content: "";

  position: absolute;

  inset: -2px;

  border-radius: inherit;

  background:
    linear-gradient(
      135deg,
      rgba(255, 102, 0, 0.35),
      rgba(255, 166, 0, 0.08)
    );

  filter: blur(22px);

  opacity: 0;

  transition: 0.5s;

  z-index: -1;
}

.glow-orange:hover::before {
  opacity: 1;
}

body {
  font-family: "Inter", sans-serif;
}
</style>