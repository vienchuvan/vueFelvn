<template>
  <div class="news-page-bg min-h-screen flex flex-col" style="font-family: system-ui">
    <!-- TOP NAV -->
    <TopNav
      :activeTab="activeTab"
      :lang="lang"
      @update:activeTab="$emit('update:activeTab', $event)"
      @update:lang="$emit('update:lang', $event)"
    />

    <!-- BREADCRUMB -->
    <section
      class="relative w-full overflow-hidden border-b border-white/10"
      style="font-family: system-ui"
    >
      <!-- GLOW -->
      <div
        class="absolute top-[-120px] left-[-120px] w-[320px] h-[320px] bg-orange-500/20 blur-3xl rounded-full"
      ></div>

      <div
        class="absolute bottom-[-150px] right-[-100px] w-[320px] h-[320px] bg-blue-400/20 blur-3xl rounded-full"
      ></div>

      <div class="max-w-[1180px] mx-auto px-5 py-3 relative z-10">
        <div class="flex flex-col gap-5" data-aos="fade-up">
          <!-- BREADCRUMB -->
          <div class="flex items-center gap-2 text-white/70 text-[12px]">
            <span> Trang chủ </span>

            <i class="fa-solid fa-angle-right text-[9px]"></i>

            <span class="text-brand-orange font-bold"> Tổng quan dịch vụ </span>
          </div>
        </div>
      </div>
    </section>

    <!-- MAIN -->
    <section
      class="relative overflow-hidden py-8 md:py-10"
      style="font-family: system-ui"
    >
      <div class="mx-auto max-w-[1180px] px-5">
        <div class="grid grid-cols-1 gap-7 lg:grid-cols-[1fr_300px]">
          <!-- LEFT -->
          <div class="grid grid-cols-1 gap-5 md:grid-cols-2">
            <!-- CARD -->
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
                  :src="
                    service.img && service.img.trim() !== ''
                      ? service.img
                      : '@/assets/image.png'
                  "
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
                  <component :is="service.icon" :size="18" class="text-white" />
                </div>
              </div>

              <!-- CONTENT -->
              <div class="p-5 text-left">
                <!-- TITLE -->
                <h3
                  class="mb-3 line-clamp-2 text-left text-[17px] font-extrabold leading-[1.5] text-[#1B1B4B]"
                >
                  {{ service.title }}
                </h3>

                <!-- DESC -->
                <p
                  class="mb-5 line-clamp-3 text-left text-[12.5px] leading-[1.9] text-[#6B7280]"
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

          <!-- RIGHT -->
          <aside data-aos="fade-left">
            <div class="sticky top-5 space-y-5">
              <!-- RIGHT MENU -->
              <div
                class="overflow-hidden rounded-[24px] border border-white/10 bg-[#082C5C]/95 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl"
              >
                <RightMenu
                  :activeTab="activeTab"
                  @update:activeTab="$emit('update:activeTab', $event)"
                />
              </div>

              <!-- CONTACT BOX -->
            
            </div>
          </aside>
        </div>
      </div>
    </section>
  </div>
  <FooterWeb />
</template>

<script>
import AOS from "aos";
import "aos/dist/aos.css";
import FooterWeb from "@/views/Home/FooterWeb.vue";
import { Globe, Briefcase, FileText } from "lucide-vue-next";

import RightMenu from "@/views/Home/RightMenu.vue";
import TopNav from "@/views/Home/TopNav.vue";

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

  methods: {
    async fetchArticles(cate = "service") {
      try {
        const response = await fetch("http://192.168.51.252:3000/quantri/baiviet", {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            idFun: 114,
            cate,
          }),
        });

        if (!response.ok) {
          throw new Error(`API returned ${response.status}`);
        }

        const data = await response.json();

        const list = Array.isArray(data) ? data : data.data || data.items || [];

        this.services = list.slice(0, 6).map((item, index) => ({
          id: item.id ?? item._id ?? index,

          icon: index % 3 === 0 ? "Globe" : index % 3 === 1 ? "Briefcase" : "FileText",

          title:
            this.lang === "en"
              ? item.title_en || item.title_vi
              : this.lang === "jp"
              ? item.title_jp || item.title_vi
              : item.title_vi || "Không có tiêu đề",

          desc:
            this.lang === "en"
              ? item.desc_en || item.desc_vi
              : this.lang === "jp"
              ? item.desc_jp || item.desc_vi
              : item.desc_vi || "",

          img: item.thumbnail?.startsWith("https") ? item.thumbnail : item.thumbnail,

          slug: item.slug,
        }));
      } catch (err) {
        console.warn(err);
      }
    },
  },
};
</script>

<style scoped>
main {
  display: flex;
  align-items: flex-start; /* Quan trọng: để aside không bị kéo dài bằng main */
}

aside {
  position: -webkit-sticky;
  position: sticky;
  top: 90px;
  /* Đảm bảo không có overflow trên thẻ aside */
  overflow: visible !important;
}
.services-page {
  min-height: 100vh;

  background: linear-gradient(rgba(0, 0, 0, 0.04), rgba(0, 0, 0, 0.04)),
    url("https://www.transparenttextures.com/patterns/cubes.png"),
    linear-gradient(-45deg, #072f5f, #0a4c8b, #0f3d75, #082347);

  background-size: 400% 400%;

  animation: gradientMove 16s ease infinite;

  font-family: auto;
}

.service-card {
  overflow: hidden;

  border-radius: 22px;

  background: white;

  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);

  transition: transform 0.4s ease, box-shadow 0.4s ease;

  text-align: left;
}

.service-card:hover {
  transform: translateY(-6px);

  box-shadow: 0 18px 45px rgba(0, 0, 0, 0.18);
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
</style>
