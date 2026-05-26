<template>
  <div class="news-page-bg min-h-screen flex flex-col">
    <div class="tech-glow-top"></div>
    <div class="tech-glow-bottom"></div>

    <!-- TOP NAV -->
    <TopNav
      :activeTab="activeTab"
      :lang="currentLang"
      @update:lang="handleLanguageChange"
    />
    <section class="relative w-full overflow-hidden border-b border-white/10">

      <!-- GLOW -->
      <div class="absolute top-[-120px] left-[-120px] w-[320px] h-[320px] bg-orange-500/20 blur-3xl rounded-full"></div>

      <div class="absolute bottom-[-150px] right-[-100px] w-[320px] h-[320px] bg-blue-400/20 blur-3xl rounded-full">
      </div>

      <div class="max-w-[1180px] mx-auto px-5 py-2 relative z-10">

        <div class="flex flex-col gap-5" data-aos="fade-up">

          <!-- BREADCRUMB -->
          <div class="flex items-center gap-2 text-white/70 text-[13px]">
            <span>Trang chủ</span>

            <i class="fa-solid fa-angle-right text-[10px]"></i>

            <span class="text-brand-orange font-bold">
              {{ 'Dịch vụ' }}
            </span>
          </div>

        
      

        </div>

      </div>

    </section>
    <!-- MAIN -->
    <main class="w-full max-w-[1180px] mx-auto px-5 py-6 pb-20 flex-grow" style="    font-family: system-ui;">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
        <!-- LEFT CONTENT -->
        <div class="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-7">
          <div
            v-for="(service, index) in services"
            :key="service.id"
            data-aos="zoom-in-up"
            :data-aos-delay="index * 120"
            class="group service-card"
          >
            <!-- IMAGE -->
            <div class="relative h-[170px] overflow-hidden">
              <img
                :src="service.img"
                :alt="service.title"
                class="h-full w-full object-cover transition-transform duration-[1600ms] group-hover:scale-105"
              />

              <!-- OVERLAY -->
              <div
                class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"
              ></div>

              <!-- ICON -->
              <div
                class="absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 backdrop-blur-xl border border-white/10"
              >
                <component
                  :is="service.icon"
                  :size="18"
                  class="text-white"
                />
              </div>
            </div>

            <!-- CONTENT -->
            <div class="p-5 text-left">
              <!-- TITLE -->
              <h3
                class="mb-3 line-clamp-2 text-[17px] font-extrabold leading-[1.5] text-[#1B1B4B]"
              >
                {{ service.title }}
              </h3>

              <!-- DESC -->
              <p
                class="mb-5 line-clamp-3 text-[12.5px] leading-[1.9] text-[#6B7280]"
              >
                {{ service.desc }}
              </p>

              <!-- BUTTON -->
              <a
                :href="`/bai-viet/${service.slug}`"
                target="_blank"
                class="group/link inline-flex items-center gap-2 rounded-full bg-[#EEF3FF] px-4 py-2 text-[12px] font-bold text-[#0B5FA5] transition-all duration-300 hover:bg-[#0B5FA5] hover:text-white"
              >
                Xem chi tiết

                <span
                  class="transition-transform duration-300 group-hover/link:translate-x-1"
                >
                  →
                </span>
              </a>
            </div>
          </div>
        </div>

        <!-- RIGHT SIDEBAR -->
        <aside class="lg:col-span-4">
          <div class="sticky top-5">
            <RightMenu
              :activeTab="activeTab"
              :lang="lang"
              @update:activeTab="$emit('update:activeTab', $event)"
              @update:lang="$emit('update:lang', $event)"
            />
          </div>
        </aside>
      </div>
    </main>
  </div>

  <FooterWeb />
</template>

<script>
import AOS from "aos";
import "aos/dist/aos.css";

import FooterWeb from "@/views/Home/FooterWeb.vue";
import RightMenu from "@/views/Home/RightMenu.vue";
import TopNav from "@/views/Home/TopNav.vue";

import {
  Globe,
  Briefcase,
  FileText,
} from "lucide-vue-next";

export default {
  name: "ServicesOverview",

  components: {
    Globe,
    Briefcase,
    FileText,
    TopNav,
    RightMenu,
    FooterWeb,
  },

  props: {
    activeTab: String,
    lang: String,
  },

  data() {
    return {
      services: [],
      currentLang: this.lang || "vi",
      fallbackImage: new URL(
        "@/assets/image.png",
        import.meta.url
      ).href,
    };
  },

  async mounted() {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 80,
      easing: "ease-out-cubic",
    });

    await this.fetchArticles();
  },

  watch: {
    lang() {
      this.currentLang = this.lang;
      this.fetchArticles();
    },
  },

  methods: {
    handleLanguageChange(lang) {
      this.currentLang = lang;
      this.$emit("update:lang", lang);

      this.fetchArticles();
    },

    async fetchArticles(cate = "service") {
      try {
        const response = await fetch(
          "http://192.168.51.252:3000/quantri/baiviet",
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

        if (!response.ok) {
          throw new Error(`API returned ${response.status}`);
        }

        const data = await response.json();

        const list = Array.isArray(data)
          ? data
          : data.data || data.items || [];

        this.services = list.slice(0, 6).map((item, index) => ({
          id: item.id ?? item._id ?? index,

          icon:
            index % 3 === 0
              ? "Globe"
              : index % 3 === 1
              ? "Briefcase"
              : "FileText",

          title:
            this.currentLang === "en"
              ? item.title_en || item.title_vi
              : this.currentLang === "jp"
              ? item.title_jp || item.title_vi
              : item.title_vi || "Không có tiêu đề",

          desc:
            this.currentLang === "en"
              ? item.desc_en || item.desc_vi
              : this.currentLang === "jp"
              ? item.desc_jp || item.desc_vi
              : item.desc_vi || "",

          img:
            item.thumbnail &&
            item.thumbnail.trim() !== ""
              ? item.thumbnail
              : this.fallbackImage,

          slug: item.slug,
        }));
      } catch (err) {
        console.warn("Fetch services failed:", err);
      }
    },
  },
};
</script>

<style scoped>
main {
  display: flex;
  align-items: flex-start;
}

/* SIDEBAR STICKY */
aside {
  position: -webkit-sticky;
  position: sticky;
  top: 90px;
  overflow: visible !important;
}

/* PAGE BG */
.services-page {
  min-height: 100vh;

  background:
    linear-gradient(rgba(0, 0, 0, 0.04), rgba(0, 0, 0, 0.04)),
    url("https://www.transparenttextures.com/patterns/cubes.png"),
    linear-gradient(-45deg, #072f5f, #0a4c8b, #0f3d75, #082347);

  background-size: 400% 400%;

  animation: gradientMove 16s ease infinite;

  font-family: auto;
}

/* CARD */
.service-card {
  overflow: hidden;

  border-radius: 22px;

  background: white;

  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);

  transition:
    transform 0.4s ease,
    box-shadow 0.4s ease;

  text-align: left;
}

.service-card:hover {
  transform: translateY(-6px);

  box-shadow: 0 18px 45px rgba(0, 0, 0, 0.18);
}

/* ANIMATION */
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

/* MOBILE */
@media (max-width: 768px) {
  main {
    display: block;
  }

  aside {
    position: relative;
    top: 0;
  }
}
</style>