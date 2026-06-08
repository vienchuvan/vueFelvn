<template>
  <div class="news-page-bg min-h-screen flex flex-col" style="font-family:system-ui">

    <!-- TOP NAV -->
   <TopNav
  :activeTab="activeTab"
  :lang="lang"
  @update:lang="$emit('update:lang', $event)"
/>

    <!-- HERO -->
    <section class="relative w-full overflow-hidden border-b border-white/10">

      <!-- GLOW -->
      <div class="absolute top-[-120px] left-[-120px] w-[320px] h-[320px] bg-orange-500/20 blur-3xl rounded-full"></div>

      <div class="absolute bottom-[-150px] right-[-100px] w-[320px] h-[320px] bg-blue-400/20 blur-3xl rounded-full">
      </div>

      <div class="max-w-[1180px] mx-auto px-5 py-2 relative z-10">

        <div class="flex flex-col gap-5" data-aos="fade-up">

          <!-- BREADCRUMB -->
          <div class="flex items-center gap-2 text-white/70 text-[13px]">
            <span>{{ translations[currentLang]?.home }}</span>

            <i class="fa-solid fa-angle-right text-[10px]"></i>

            <span class="text-brand-orange font-bold">
              {{ article?.title || translations[currentLang]?.articleDetail }}
            </span>
          </div>

        
      

        </div>

      </div>

    </section>

    <!-- MAIN -->
    <main class="w-full max-w-[1180px] mx-auto px-5 py-8 pb-20 flex-grow">

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">

        <!-- LEFT -->
        <div class="lg:col-span-8 flex flex-col gap-8">

          <!-- ARTICLE -->
          <section v-if="article" data-aos="fade-up"
            class="bg-white rounded-[30px] overflow-hidden shadow-[0_15px_60px_rgba(0,0,0,0.12)]">

            <!-- IMAGE -->
            <div v-if="article.img" class="overflow-hidden">

              <img :src="article.img" :alt="article.title"
                class="w-full h-[260px] md:h-[420px] object-cover transition-transform duration-[2000ms] hover:scale-105" />

            </div>

            <!-- CONTENT -->
          

              <!-- TITLE -->
                <h2 class="text-[26px] md:text-[34px] font-black text-[#1d2454] leading-[1.3]">
                  {{ article.title }}
                </h2>

            
              <!-- DESC -->
              <p v-if="article.desc" class="text-[#4b5563] text-[15px] leading-[2] text-justify mb-8 font-medium">
                {{ article.desc }}
              </p>

              <!-- CONTENT -->
            <div
  v-if="getArticleContent()"
  class="article-content"
  :style="isGioiThieu
    ? {
        paddingLeft: '20px',
        paddingRight: '20px',
        textAlign: 'start',
        lineHeight: '1.6'
      }
    : {}"
  v-html="getArticleContent()"
></div>
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

  </div>
  
    <FloattingZalo />
       <FooterWeb :subServices="subServices" :lang="currentLang" />

</template>

<script>
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import FloattingZalo from "./FloattingZalo.vue";
import RightMenu from "./RightMenu.vue";
import TopNav from "./TopNav.vue";
import FooterWeb from "./FooterWeb.vue";

export default {
  name: "BaiVietChiTiet",

  components: {
    TopNav,
    RightMenu,  FloattingZalo, FooterWeb
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

  emits: [
    "update:activeTab",
    "update:lang",
  ],

  data() {
    return {
      article: null,
      currentLang: this.lang,
      translations: {
        vi: {
          home: "Trang chủ",
          articleDetail: "Chi tiết bài viết",
        },
        en: {
          home: "Home",
          articleDetail: "Article Detail",
        },
        ja: {
          home: "ホーム",
          articleDetail: "記事詳細",
        },
      },
    };
  },
computed: {
  isGioiThieu() {
    const slug = this.getSlugFromUrl();
    return slug === "gioi-thieu";
  }
},
  watch: {
    lang(newLang) {
      this.currentLang = newLang;
    },
  },

  methods: {

    getSlugFromUrl() {

      if (this.$route?.params?.slug) {
        return this.$route.params.slug;
      }

      try {

        const url = new URL(window.location.href);

        const pathSlug =
          url.pathname
            .split("/")
            .filter(Boolean)
            .pop();

        return pathSlug;

      } catch (error) {
        return null;
      }
    },

    async fetchArticle() {

      try {

        const slug =
          this.getSlugFromUrl();

        const res =
          await axios.post(
            "https://miraivietnam.com/api/quantri/baiviet",
            {
              idFun: 115,
              slug,
            }
          );

        if (res.data.success) {
          this.article = res.data.data;
          this.$forceUpdate();
        }

      } catch (error) {

        console.log(error);

        alert("Không tải được bài viết");

      }
    },

    getArticleContent() {
  if (!this.article) return "";

  const lang = this.currentLang === "ja" ? "jp" : this.currentLang;
  const contentKey = `content_${lang}`;

  console.log("Trying to get article content with key:", contentKey);

  return this.article[contentKey] || this.article.content_vi || "";
}
  },

  mounted() {

    AOS.init({
      duration: 1000,
      once: true,
      offset: 80,
      easing: "ease-out-cubic",
    });

    this.fetchArticle();
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
h4{
  color: white !important;
}
.globe-grid-bg {
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

.article-content {
  color: #374151;

  font-size: 15px;

  line-height: 2;
}

.article-content :deep(h1),
.article-content :deep(h2),
.article-content :deep(h3),
.article-content :deep(h4) {
  color: #1d2454;

  font-weight: 900;

  margin-top: 32px;

  margin-bottom: 16px;

  line-height: 1.4;
}

.article-content :deep(h2) {
  font-size: 28px;
}

.article-content :deep(h3) {
  font-size: 22px;
}

.article-content :deep(p) {
  margin-bottom: 18px;

  text-align: justify;
}

.article-content :deep(img) {
  width: 100%;

  border-radius: 22px;

  margin: 28px 0;

  box-shadow:
    0 10px 40px rgba(0, 0, 0, 0.12);

  transition: 0.7s;
}

.article-content :deep(img:hover) {
  transform: scale(1.02);
}

.article-content :deep(ul),
.article-content :deep(ol) {
  padding-left: 24px;

  margin-bottom: 20px;
}

.article-content :deep(li) {
  margin-bottom: 10px;
}

.article-content :deep(blockquote) {
  border-left: 4px solid #ff6600;

  background: #fff7ed;

  padding: 18px 22px;

  border-radius: 16px;

  margin: 24px 0;

  color: #7c2d12;

  font-style: italic;
}

body {
  font-family: "Inter", sans-serif;
}
</style>