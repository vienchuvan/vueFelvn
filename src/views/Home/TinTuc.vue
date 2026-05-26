<template>
  <div class="news-page-bg min-h-screen">
<!-- GLOW --> <div class="tech-glow-top"></div> <div class="tech-glow-bottom"></div>
    <!-- TOP NAV -->
    <TopNav
      :activeTab="activeTab"
      :lang="lang"
      @update:activeTab="$emit('update:activeTab', $event)"
      @update:lang="$emit('update:lang', $event)"
    />

    <!-- HERO -->
    <section
      class="relative overflow-hidden border-b border-white/10"
      style="font-family:system-ui;text-align:left;"
    >

      <!-- BG -->
      

      <!-- GLOW -->
      <div
        class="absolute -top-20 left-[-80px] w-[280px] h-[280px] bg-orange-500/20 blur-3xl rounded-full"
      ></div>

      <div
        class="absolute bottom-[-120px] right-[-100px] w-[320px] h-[320px] bg-cyan-400/20 blur-3xl rounded-full"
      ></div>

      <div
        class="relative z-10 mx-auto max-w-7xl px-4 py-12"
      >

        <!-- HEADER -->
        <div
          data-aos="fade-up"
          class="max-w-[850px]"
        >

          <!-- BREADCRUMB -->
          <div
            class="mb-4 flex items-center gap-2 text-[13px] text-white/70"
          >
            <span>Trang chủ</span>

            <i class="fa-solid fa-angle-right text-[10px]"></i>

            <span class="font-bold text-brand-orange">
              Tin tức
            </span>
          </div>

          <!-- TITLE -->
          <h1
            class="mb-4 text-[34px] md:text-[42px] font-black leading-[1.2] tracking-tight text-white"
          >
            Tin Tức Chuyên Ngành
          </h1>

          <!-- DESC -->
          <p
            class="max-w-[720px] text-[14px] leading-[1.9] text-white/80"
          >
            Cập nhật thông tin mới nhất về pháp luật, đầu tư, doanh nghiệp,
            visa và các xu hướng phát triển dành cho nhà đầu tư trong và ngoài nước.
          </p>

        </div>

      </div>

    </section>

    <!-- MAIN -->
    <main
      class="relative z-10 mx-auto max-w-7xl px-4 py-8 pb-20" style="font-family:system-ui"
    >

      <div
        class="grid grid-cols-1 gap-7 lg:grid-cols-[1fr_320px]"
      >

        <!-- LEFT -->
        <div class="space-y-5">

          <!-- ITEM -->
          <article
            v-for="(news,index) in paginatedNews"
            :key="news.id"
            data-aos="fade-up"
            :data-aos-delay="index * 80"
            class="group overflow-hidden rounded-[22px] bg-white/95 backdrop-blur-xl border border-white/20 shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(0,0,0,0.16)]"
          >

            <div
              class="grid grid-cols-1 md:grid-cols-[180px_1fr]"
            >

              <!-- IMAGE -->
              <div
                class="relative overflow-hidden"
              >

                <!-- CATEGORY -->
                <div
                  class="absolute top-3 left-3 z-20 rounded-full bg-[#ff6600] px-3 py-1 text-[10px] font-black uppercase tracking-wide text-white shadow-lg"
                >
                  NEWS
                </div>

                <img
                  :src="news.img"
                  :alt="news.title"
                  class="h-[150px] w-full object-cover transition duration-700 group-hover:scale-105"
                />

                <!-- OVERLAY -->
                <div
                  class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-70"
                ></div>

              </div>

              <!-- CONTENT -->
              <div
                class="flex flex-col justify-center p-4 md:p-5 text-left"
              >

                <!-- DATE -->
                <div
                  class="mb-3 flex items-center gap-2 text-[11px] font-bold uppercase tracking-wide text-[#F97316]"
                >

                  <div
                    class="flex h-7 w-7 items-center justify-center rounded-full bg-orange-100"
                  >
                    <i
                      class="fa-regular fa-calendar text-[11px]"
                    ></i>
                  </div>

                  {{ formatDate(news.publish_date) }}

                </div>

                <!-- TITLE -->
                <h2
                  class="mb-3 line-clamp-2 text-left text-[16px] font-black leading-[1.5] text-[#23235B] transition duration-300 group-hover:text-[#0B5FA5]"
                >
                  {{ news.title }}
                </h2>

                <!-- DESC -->
                <p
                  class="mb-4 line-clamp-2 text-left text-[13px] leading-[1.8] text-[#5F6675]"
                >
                  {{ news.desc }}
                </p>

                <!-- FOOTER -->
                <div
                  class="flex flex-wrap items-center justify-between gap-3"
                >

                  <!-- BUTTON -->
                  <a
                    :href="`/bai-viet/${news.slug}`"
                    target="_blank"
                    class="group/link inline-flex items-center gap-2 rounded-xl bg-[#0B5FA5] px-4 py-2.5 text-[13px] font-black text-white transition-all duration-500 hover:-translate-y-1 hover:bg-[#084C86]"
                  >
                    Đọc chi tiết

                    <i
                      class="fa-solid fa-arrow-right text-[10px] transition-transform duration-300 group-hover/link:translate-x-1"
                    ></i>
                  </a>

                </div>

              </div>

            </div>

          </article>

          <!-- PAGINATION -->
          <div
            v-if="totalPages > 1"
            class="flex flex-wrap items-center justify-center gap-3 pt-4"
          >

            <!-- PREV -->
            <button
              @click="changePage(currentPage - 1)"
              :disabled="currentPage === 1"
              class="h-11 px-5 rounded-2xl bg-white/10 border border-white/10 text-white text-[13px] font-bold backdrop-blur-xl transition-all duration-300 hover:bg-white/20 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              ←
            </button>

            <!-- PAGE -->
            <button
              v-for="page in totalPages"
              :key="page"
              @click="changePage(page)"
              class="h-11 min-w-[44px] px-4 rounded-2xl text-[13px] font-black transition-all duration-300"
              :class="
                currentPage === page
                  ? 'bg-[#ff6600] text-white shadow-lg scale-105'
                  : 'bg-white/10 border border-white/10 text-white hover:bg-white/20'
              "
            >
              {{ page }}
            </button>

            <!-- NEXT -->
            <button
              @click="changePage(currentPage + 1)"
              :disabled="currentPage === totalPages"
              class="h-11 px-5 rounded-2xl bg-white/10 border border-white/10 text-white text-[13px] font-bold backdrop-blur-xl transition-all duration-300 hover:bg-white/20 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              →
            </button>

          </div>

        </div>

        <!-- RIGHT -->
        <aside
          data-aos="fade-left"
          class="space-y-6"
        >

          <div class="sticky top-5 space-y-6">

            <!-- RIGHT MENU -->
            <div
              class="overflow-hidden rounded-[22px] border border-white/10 bg-[#082C5C]/95 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
            >
              <RightMenu
                :activeTab="activeTab"
                @update:activeTab="$emit('update:activeTab', $event)"
              />
            </div>

     

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

import RightMenu from "@/views/Home/RightMenu.vue";
import TopNav from "@/views/Home/TopNav.vue";
import FooterWeb from "@/views/Home/FooterWeb.vue";
export default {
  name: "newssOverview",

  components: {
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

      // ALL DATA
      newss: [],

      // PAGINATION
      currentPage: 1,

      perPage: 6,
    };
  },

  computed: {

    // TOTAL PAGE
    totalPages() {

      return Math.ceil(
        this.newss.length / this.perPage
      );
    },

    // PAGINATION DATA
    paginatedNews() {

      const start =
        (this.currentPage - 1) *
        this.perPage;

      const end =
        start + this.perPage;

      return this.newss.slice(
        start,
        end
      );
    },
  },

  async mounted() {

    AOS.init({
      duration: 900,
      once: true,
      offset: 50,
      easing: "ease-out-cubic",
    });

    await this.fetchArticles();
  },

  methods: {

    // FORMAT DATE
    formatDate(dateString) {

      if (!dateString) return "";

      const date = new Date(dateString);

      return date.toLocaleDateString(
        "vi-VN"
      );
    },

    // CHANGE PAGE
    changePage(page) {

      if (
        page < 1 ||
        page > this.totalPages
      ) {
        return;
      }

      this.currentPage = page;

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },

    // FETCH ARTICLES
    async fetchArticles(
      cate = "news"
    ) {

      try {

        const body = {
          idFun: 114,
          cate,
        };

        const response = await fetch(
          "http://192.168.51.252:3000/quantri/baiviet",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify(
              body
            ),
          }
        );

        if (!response.ok) {

          throw new Error(
            `API returned ${response.status}`
          );

        }

        const data =
          await response.json();

        const list =
          Array.isArray(data)
            ? data
            : data.data ||
              data.items ||
              [];

        // LOAD ALL
        this.newss = list.map(
          (item, index) => ({
            id:
              item.id ??
              item._id ??
              index,

            title:
              this.lang === "en"
                ? item.title_en ||
                  item.title_vi
                : this.lang === "jp"
                ? item.title_jp ||
                  item.title_vi
                : item.title_vi ||
                  "Không có tiêu đề",

            desc:
              this.lang === "en"
                ? item.desc_en ||
                  item.desc_vi
                : this.lang === "jp"
                ? item.desc_jp ||
                  item.desc_vi
                : item.desc_vi || "",

            img:
              item.thumbnail?.startsWith(
                "https"
              )
                ? item.thumbnail
                : "http://192.168.51.252:3000" +
                  item.thumbnail,

            slug: item.slug,

            publish_date:
              item.publish_date,
          })
        );

      } catch (err) {

        console.warn(err);

      }
    },
  },
};
</script>

<style scoped>

/* MAIN */
.news-page-bg { position: relative; min-height: 100vh; overflow-x: hidden; }

/* FIXED BACKGROUND LAYER */
.news-page-bg::before {
  content: "";

  position: fixed;
  inset: 0;

  z-index: -2;

  background:
    linear-gradient(
      135deg,
      #1b8dd6 0%,
      #0f4f87 45%,
      #0a2342 100%
    );

  pointer-events: none;
}

/* TECH OVERLAY */
.news-page-bg::after { content: ""; position: fixed; inset: 0; z-index: -1; opacity: 0.18; background-repeat: no-repeat; /* FULL WIDTH */ background-size: cover; /* CĂN CHUẨN NHƯ MẪU */ background-position: center; pointer-events: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1920 1080'%3E%3Cdefs%3E%3Cpattern id='wave' width='60' height='20' patternUnits='userSpaceOnUse'%3E%3Cpath d='M0 10 Q15 0 30 10 T60 10' fill='none' stroke='rgba(255,255,255,0.08)' stroke-width='1'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23wave)'/%3E%3Cpath d='M0 180 H320 L420 280 H720 L860 140 H1280' stroke='rgba(255,255,255,0.18)' stroke-width='2' fill='none'/%3E%3Cpath d='M0 360 H220 L320 260 H560 L700 420 H1020' stroke='rgba(255,255,255,0.18)' stroke-width='2' fill='none'/%3E%3Cpath d='M120 640 H520 L660 500 H920 L1080 700 H1480' stroke='rgba(255,255,255,0.18)' stroke-width='2' fill='none'/%3E%3Cpath d='M0 820 H420 L520 720 H860 L980 860 H1380' stroke='rgba(255,255,255,0.18)' stroke-width='2' fill='none'/%3E%3Ccircle cx='420' cy='280' r='8' fill='rgba(255,255,255,0.2)'/%3E%3Ccircle cx='660' cy='500' r='8' fill='rgba(255,255,255,0.2)'/%3E%3Ccircle cx='980' cy='860' r='8' fill='rgba(255,255,255,0.2)'/%3E%3Cg transform='translate(1560,540) scale(5)' opacity='0.55'%3E%3Ccircle cx='0' cy='0' r='52' stroke='rgba(255,255,255,0.28)' stroke-width='0.6' fill='none'/%3E%3Cellipse cx='0' cy='0' rx='20' ry='52' stroke='rgba(255,255,255,0.28)' stroke-width='0.6' fill='none'/%3E%3Cellipse cx='0' cy='0' rx='36' ry='52' stroke='rgba(255,255,255,0.18)' stroke-width='0.6' fill='none'/%3E%3Cellipse cx='0' cy='0' rx='52' ry='18' stroke='rgba(255,255,255,0.28)' stroke-width='0.6' fill='none'/%3E%3Cellipse cx='0' cy='0' rx='52' ry='34' stroke='rgba(255,255,255,0.18)' stroke-width='0.6' fill='none'/%3E%3Cline x1='-52' y1='0' x2='52' y2='0' stroke='rgba(255,255,255,0.28)' stroke-width='0.6'/%3E%3Cline x1='0' y1='-52' x2='0' y2='52' stroke='rgba(255,255,255,0.28)' stroke-width='0.6'/%3E%3C/g%3E%3C/svg%3E"); }
/* CONTENT */
.news-page-bg > * {
  position: relative;
  z-index: 2;
}


</style>