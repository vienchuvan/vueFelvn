<template>
  <div class="news-page-bg min-h-screen flex flex-col" style="font-family: system-ui">
    <!-- TOP NAV -->
    <TopNav :lang="currentLang" @update:lang="handleLanguageChange" />

    <!-- BANNER -->
    <div data-aos="fade-down">
      <BannerHome @setActiveTab="handleMenuClick" :lang="currentLang" />
    </div>

    <!-- MAIN -->
    <main class="w-full max-w-[1180px] mx-auto px-5 pt-[110px] pb-10">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <!-- LEFT -->
        <div class="lg:col-span-8">
          <!-- ABOUT -->
          <section
            data-aos="fade-up"
            class="bg-white rounded-[28px] p-8 md:p-10 shadow-[0_10px_60px_rgba(0,0,0,0.12)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_25px_80px_rgba(0,0,0,0.18)]"
          >
            <div class="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <!-- TEXT -->
              <div class="md:col-span-7 space-y-5" v-if="article" :key="currentLang">
                <div class="flex items-center space-x-3.5">
                  <div class="w-[4px] h-[30px] bg-brand-orange rounded-full"></div>

                  <h2 class="m-0 text-[26px] font-black text-[#1d2454] tracking-tight">
                    {{ getTitle(article) }}
                  </h2>
                </div>

                <p
                  v-if="getDescription(article)"
                  class="text-[#4b5563] text-[14px] md:text-[15px] leading-[1.9] text-justify"
                >
                  {{ getDescription(article) }}
                </p>

                <div class="pt-3">
                  <a
                    :href="`/bai-viet/${article.slug}`"
                    target="_blank"
                    class="group text-left inline-flex items-center gap-2 text-brand-orange text-[14px] font-bold hover:text-orange-600 transition-all duration-300"
                  >
                    {{ buttonText }}

                    <i
                      class="fa-solid fa-arrow-right transition-transform duration-300 group-hover:translate-x-1"
                    ></i>
                  </a>
                </div>
              </div>

              <!-- IMAGE -->
              <div class="md:col-span-5">
                <div class="rounded-3xl overflow-hidden shadow-2xl">
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
          <section class="space-y-6 mt-14">
            <!-- HEADER -->
            <div data-aos="fade-right" class="flex justify-between items-center">
              <div class="flex items-center space-x-3.5">
                <div class="w-[4px] h-[30px] bg-brand-orange rounded-full"></div>

                <h2 class="text-[26px] font-black text-white tracking-tight">
                  {{ serviceTitle }}
                </h2>
              </div>

              <a
                href="/dich-vu"
                target="_blank"
                class="group text-brand-orange text-[15px] font-bold flex items-center gap-2 hover:text-orange-300 transition-all duration-300"
              >
                {{ viewAllText }}

                <i
                  class="fa-solid fa-arrow-right transition-transform duration-300 group-hover:translate-x-1"
                ></i>
              </a>
            </div>

            <!-- SERVICES -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div
                v-for="(service, index) in featuredServices"
                :key="service.id"
                data-aos="zoom-in-up"
                :data-aos-delay="index * 120"
                class="group glow-orange bg-white rounded-[28px] overflow-hidden relative transition-all duration-500 hover:shadow-[0_25px_80px_rgba(0,0,0,0.2)]"
              >
                <!-- IMAGE -->
                <div class="h-48 overflow-hidden">
                  <img
                    :src="service.image"
                    class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    :alt="getTitle(service)"
                  />
                </div>

                <!-- CONTENT -->
                <div class="p-6 flex flex-col h-[240px]">
                  <div class="flex items-start gap-3 mb-4">
                    <div
                      class="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center shrink-0"
                    >
                      <i :class="[service.icon, 'text-brand-orange text-[16px]']"></i>
                    </div>

                    <h3
                      class="text-left text-[#1d2454] text-[14px] font-extrabold leading-[1.6] line-clamp-2"
                    >
                      {{ getTitle(service) }}
                    </h3>
                  </div>

                  <p
                    class="text-left text-[#6b7280] text-[13px] leading-[1.8] line-clamp-3 flex-1"
                  >
                    {{ getDescription(service) }}
                  </p>

                  <a
                    :href="`/bai-viet/${service.slug}`"
                    class="group/link mt-5 inline-flex items-center gap-2 text-brand-orange text-[13px] font-bold"
                  >
                    {{ buttonText }}

                    <i
                      class="fa-solid fa-arrow-right text-[11px] transition-transform duration-300 group-hover/link:translate-x-1"
                    ></i>
                  </a>
                </div>
              </div>
            </div>
          </section>

          <!-- TRAINING -->
          <section
            data-aos="fade-up"
            class="relative mt-14 overflow-hidden rounded-[32px] bg-gradient-to-br from-[#ff6600] via-[#ff7a00] to-[#ff9500] p-8 md:p-10 shadow-[0_25px_80px_rgba(255,102,0,0.35)]"
          >
            <div
              class="absolute -top-20 -right-20 w-72 h-72 bg-white/10 rounded-full blur-3xl"
            ></div>

            <div
              class="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10"
            >
              <!-- LEFT -->
              <div class="md:col-span-7">
                <div class="flex items-center gap-3 mb-5">
                  <div
                    class="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-xl flex items-center justify-center"
                  >
                    <i class="fa-solid fa-graduation-cap text-white text-[24px]"></i>
                  </div>

                  <h4 class="text-white text-[24px] md:text-[25px] font-black">
                    {{
                      currentLang === "en"
                        ? "Corporate Training"
                        : currentLang === "ja"
                        ? "企業研修"
                        : "Đào Tạo Doanh Nghiệp"
                    }}
                  </h4>
                </div>

                <p
                  class="text-white/95 text-[15px] text-left leading-[1.9] font-medium max-w-[620px]"
                >
                  <template v-if="currentLang === 'en'">
                    The
                    <span class="font-black"> "Empathic Communication & Influence" </span>
                    program helps improve workplace efficiency, overcome multicultural
                    barriers, and standardize digital communication skills.
                  </template>

                  <template v-else-if="currentLang === 'ja'">
                    <span class="font-black"> 「共感コミュニケーションと影響力」 </span>
                    プログラムは、業務効率の向上、多文化間の障壁解消、
                    デジタル時代のコミュニケーション能力向上を支援します。
                  </template>

                  <template v-else>
                    Chương trình
                    <span class="font-black"> "Giao tiếp thấu cảm & Tạo ảnh hưởng" </span>
                    giúp nâng cao hiệu quả làm việc, giải quyết rào cản đa văn hóa và
                    chuẩn hóa kỹ năng giao tiếp số trong thời đại mới.
                  </template>
                </p>

                <a
                  href="/dao-tao"
                  target="_blank"
                  class="group relative mt-7 inline-flex overflow-hidden rounded-2xl bg-white px-7 py-3 font-black text-[#ff6600] transition-all duration-500 hover:-translate-y-1 hover:scale-105"
                >
                  <span class="relative z-10 flex items-center gap-2">
                    {{
                      currentLang === "en"
                        ? "Explore Courses"
                        : currentLang === "ja"
                        ? "コースを見る"
                        : "Tìm hiểu khóa học"
                    }}

                    <i
                      class="fa-solid fa-arrow-right transition-transform duration-300 group-hover:translate-x-1"
                    ></i>
                  </span>
                </a>
              </div>

              <!-- RIGHT -->
              <div class="md:col-span-5">
                <div class="rounded-3xl overflow-hidden shadow-2xl">
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
            <div data-aos="fade-right" class="flex items-center justify-between">
              <div class="flex items-center gap-4">
                <div class="w-[4px] h-[34px] bg-brand-orange rounded-full"></div>

                <h2
                  class="text-white text-[26px] md:text-[32px] font-black tracking-tight"
                >
                  {{
                    currentLang === "en"
                      ? "News & Updates"
                      : currentLang === "ja"
                      ? "ニュースと最新情報"
                      : "Tin Tức & Cập Nhật Mới"
                  }}
                </h2>
              </div>

              <a
                href="#"
                class="group text-brand-orange text-[15px] font-bold flex items-center gap-2 hover:text-orange-300 transition"
              >
                {{
                  currentLang === "en"
                    ? "View All"
                    : currentLang === "ja"
                    ? "すべて見る"
                    : "Xem tất cả"
                }}

                <i
                  class="fa-solid fa-arrow-right transition-transform duration-300 group-hover:translate-x-1"
                ></i>
              </a>
            </div>

            <!-- GRID -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div
                v-for="(item, index) in featuredNews"
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
                    {{ getTitle(item) }}
                  </h3>

                  <p
                    class="mt-3 text-[#b9c6dc] text-left text-[13px] leading-[1.8] line-clamp-3 min-h-[72px]"
                  >
                    {{ getDescription(item) }}
                  </p>

                  <a
                    :href="`/bai-viet/${item.slug}`"
                    class="inline-flex items-center gap-2 mt-4 text-brand-orange text-[13px] font-bold"
                  >
                    {{ buttonText }}

                    <i class="fa-solid fa-arrow-right text-[11px]"></i>
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>

        <!-- RIGHT -->
        <aside class="lg:col-span-4">
          <div class="sticky top-[90px]">
            <RightMenu :subServices="subServices" :lang="currentLang" />
          </div>
        </aside>
      </div>
    </main>
<FloatingZalo> </FloatingZalo>
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
import FloatingZalo from "./FloattingZalo.vue";
export default {
  name: "TrangChu",

  components: {
    BannerHome,
    TopNav,
    RightMenu,
    FooterWeb,
    FloatingZalo,
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
      // FIX LANGUAGE
      currentLang: this.getLangKey(this.lang),

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

  // FIX AUTO UPDATE LANGUAGE
  watch: {
    lang(newLang) {
      this.currentLang = this.getLangKey(newLang);
    },
  },

  computed: {
    buttonText() {
      const text = {
        vi: "Xem chi tiết",
        en: "View Details",
        ja: "詳細を見る",
      };

      return text[this.currentLang] || text.vi;
    },

    viewAllText() {
      const text = {
        vi: "Xem tất cả",
        en: "View All",
        ja: "すべて見る",
      };

      return text[this.currentLang] || text.vi;
    },

    serviceTitle() {
      const text = {
        vi: "Dịch Vụ Nổi Bật",
        en: "Featured Services",
        ja: "注目サービス",
      };

      return text[this.currentLang] || text.vi;
    },
  },

  methods: {
    // FIX LANG
    getLangKey(lang) {
      if (!lang) return "vi";

      const lower = String(lang).toLowerCase();

      if (lower === "jp") return "ja";

      return lower;
    },

    getTitle(item) {
      if (!item) return "";

      const lang = this.getLangKey(this.currentLang);

      return item[`title_${lang}`] || item.title_vi || "";
    },

    getDescription(item) {
      if (!item) return "";

      const lang = this.getLangKey(this.currentLang);

      return item[`desc_${lang}`] || item.desc_vi || "";
    },

    handleLanguageChange(newLang) {
      this.currentLang = this.getLangKey(newLang);

      this.$emit("update:lang", this.currentLang);
    },

    async fetchArticles(cate = "service") {
      try {
        const response = await fetch(
          "https://miraivietnam.com/api/quantri/baiviet",
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

        const list = Array.isArray(data) ? data : data.data || [];

        this.featuredServices = list.slice(0, 3).map((item, index) => ({
          id: item.id || index,

          icon:
            index % 3 === 0
              ? "fa-solid fa-earth-americas"
              : index % 3 === 1
              ? "fa-solid fa-briefcase"
              : "fa-solid fa-file-invoice",

          title_vi: item.title_vi,
          title_en: item.title_en,
          title_ja: item.title_ja || item.title_jp,

          desc_vi: item.desc_vi,
          desc_en: item.desc_en,
          desc_ja: item.desc_ja || item.desc_jp,

          image: item.thumbnail?.startsWith("https")
            ? item.thumbnail
            : "https://miraivietnam.com/" + item.thumbnail,

          slug: item.slug,
        }));
      } catch (err) {
        console.log(err);
      }
    },

    async fetchArticlesNews(cate = "news") {
      try {
        const response = await fetch(
          "https://miraivietnam.com/api/quantri/baiviet",
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

        const list = Array.isArray(data) ? data : data.data || [];

        this.featuredNews = list.slice(0, 3).map((item, index) => ({
          id: item.id || index,

          title_vi: item.title_vi,
          title_en: item.title_en,
          title_ja: item.title_ja || item.title_jp,

          desc_vi: item.desc_vi,
          desc_en: item.desc_en,
          desc_ja: item.desc_ja || item.desc_jp,

          image: item.thumbnail?.startsWith("https")
            ? item.thumbnail
            : "https://miraivietnam.com/" + item.thumbnail,

          slug: item.slug,
        }));
      } catch (err) {
        console.log(err);
      }
    },

    async fetchSidebarMenu() {
      try {
        const res = await axios.get(
          "https://miraivietnam.com/api/sidebar-menu",
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
        const categoryName = String(category.category).toLowerCase();

        category.items?.forEach((item) => {
          const subItemTitles =
            item.subItems?.map((sub) => sub.title) || [];

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
          } else if (categoryName.includes("visa")) {
            this.subServices.visa.push(...subItemTitles);
          }
        });
      });
    },

    async fetchArticle() {
      try {
        const res = await axios.post(
          "https://miraivietnam.com/api/quantri/baiviet",
          {
            idFun: 115,
            slug: "ve-le-viet-nam",
          }
        );

        if (res.data.success) {
          const item = res.data.data;

          this.article = {
            ...item,

            title_ja: item.title_ja || item.title_jp || "",
            desc_ja: item.desc_ja || item.desc_jp || "",

            title_en: item.title_en || "",
            desc_en: item.desc_en || "",

            title_vi: item.title_vi || "",
            desc_vi: item.desc_vi || "",
          };
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
```


<style scoped>
main {
  display: flex;
  align-items: flex-start;
}

aside {
  position: -webkit-sticky;
  position: sticky;
  top: 90px;
  overflow: visible !important;
}
</style>
