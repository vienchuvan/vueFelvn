<template>
  <div class="news-page-bg min-h-screen flex flex-col">
    <div class="tech-glow-top"></div>
    <div class="tech-glow-bottom"></div>
    <TopNav
      :activeTab="activeTab"
      :lang="currentLang"
      @update:lang="handleLanguageChange"
    >
    </TopNav>

    <!-- MAIN WRAPPER -->
    <main class="w-full max-w-[1180px] mx-auto px-5 py-6 pb-20 flex-grow">
      <!-- Slogan mờ phía trên góc trái giống hệt ảnh mẫu -->

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
        <!-- CỘT TRÁI - NỘI DUNG CHÍNH (Động dựa trên Tab hoạt động) -->
        <div class="lg:col-span-8 flex flex-col gap-10">
          <!-- TAB 1: GIỚI THIỆU - "CÂU CHUYỆN CỦA CHÚNG TÔI" (Mặc định mở để hiển thị ảnh mẫu mới) -->
          <div
            class="space-y-6"
            v-if="article"
            style="
              text-align: left;
              font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI',
                Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
                sans-serif;
            "
          >
            <h2 class="text-[25px] font-extrabold text-brand-orange tracking-tight">
              {{ getTitle(article) }}
            </h2>

            <!-- ảnh -->
            <img
              v-if="article.img"
              :src="article.img"
              :alt="getTitle(article)"
              class="w-full rounded-2xl object-cover shadow-lg"
            />

            <!-- mô tả ngắn -->
            <p
              v-if="getDescription(article)"
              class="text-[#374151] text-[14.5px] leading-[1.8] text-justify font-normal"
            >
              {{ getDescription(article) }}
            </p>

            <!-- nội dung html -->
            <div
              v-if="getContent(article)"
              class="article-content text-[#374151] text-[14.5px] leading-[1.9]"
              v-html="getContent(article)"
            ></div>
          </div>
        </div>

        <!-- CỘT PHẢI - SIDEBAR (Khôi phục chuẩn lề trái và Bullet vuông cam) -->
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
  <FooterWeb :subServices="subServices" :lang="currentLang" />
</template>

<script>
import axios from "axios";
import RightMenu from "./RightMenu.vue";
import TopNav from "./TopNav.vue";
import FooterWeb from "@/views/Home/FooterWeb.vue";
export default {
  name: "GioiThieu",

  components: {
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

  emits: ["update:activeTab", "update:lang"],

  data() {
    return {
      mobileMenuOpen: false,

      loading: false,

      currentLang: this.lang,

      currentLangCode: "VI",
      article: null,

      menuItems: [
        {
          id: "home",
          name: {
            vi: "Trang chủ",
            en: "Home",
            ja: "トップページ",
          },
        },
        {
          id: "about",
          name: {
            vi: "Giới thiệu",
            en: "About",
            ja: "紹介",
          },
        },
        {
          id: "services",
          name: {
            vi: "Dịch vụ",
            en: "Services",
            ja: "サービス",
          },
        },
        {
          id: "contact",
          name: {
            vi: "Liên hệ",
            en: "Contact",
            ja: "連絡先",
          },
        },
      ],
      languages: [
        { code: "vi", label: "🇻🇳 Tiếng Việt" },
        { code: "en", label: "🇬🇧 English" },
        { code: "ja", label: "🇯🇵 日本語" },
      ],
      languageMap: {
        vi: "VI",
        en: "EN",
        ja: "JA",
      },

      featuredServices: [
        {
          id: 1,
          title: "Xúc Tiến Đầu Tư",
          desc:
            "Hỗ trợ trọn gói các thủ tục pháp lý, tối ưu hóa thời gian và chi phí cho nhà đầu tư.",
          icon: "fa-solid fa-earth-americas",
          image:
            "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200",
        },
        {
          id: 2,
          title: "Thành Lập Doanh Nghiệp",
          desc:
            "Hỗ trợ trọn gói các thủ tục pháp lý, tối ưu hóa thời gian và chi phí cho nhà đầu tư.",
          icon: "fa-solid fa-briefcase",
          image:
            "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200",
        },
        {
          id: 3,
          title: "Visa & Thẻ Tạm Trú",
          desc:
            "Hỗ trợ trọn gói các thủ tục pháp lý, tối ưu hóa thời gian và chi phí cho nhà đầu tư.",
          icon: "fa-solid fa-file-invoice",
          image:
            "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?q=80&w=1200",
        },
      ],
      subServices: {
        investment: [
          "Tư vấn điều kiện ngành nghề",
          "Lựa chọn loại hình công ty",
          "Đăng ký địa điểm, trụ sở, vốn",
          "Hướng dẫn chuẩn bị hồ sơ",
          "Soạn thảo hồ sơ thành lập",
          "Đại diện làm thủ tục tại CQNN",
        ],
        setup: [
          "Dịch vụ tư vấn thành lập Công ty/Doanh nghiệp",
          "Dịch vụ hỗ trợ thay đổi nội dung đăng ký kinh doanh",
        ],
        visa: [
          "Visa Việt Nam cho người nước ngoài",
          "Thẻ tạm trú cho người nước ngoài",
          "Giấy phép lao động cho người nước ngoài làm việc tại Việt Nam",
        ],
      },
    };
  },

  methods: {
    getTitle(item) {
      if (!item) return "";
      return item[`title_${this.currentLang}`] || item.title || "";
    },

    getDescription(item) {
      if (!item) return "";
      return item[`desc_${this.currentLang}`] || item.desc || "";
    },

    getContent(item) {
      if (!item) return "";
      return item[`content_${this.currentLang}`] || item.content_vi || "";
    },

    getSlugFromUrl() {
      if (this.$route) {
        if (this.$route.params && this.$route.params.slug) {
          return this.$route.params.slug;
        }

        if (this.$route.query) {
          if (this.$route.query.slug) {
            return this.$route.query.slug;
          }

          if (this.$route.query.href) {
            try {
              const url = new URL(this.$route.query.href, window.location.origin);
              const hrefSlug = url.pathname.split("/").filter(Boolean).pop();
              return hrefSlug || this.$route.query.href;
            } catch (err) {
              return this.$route.query.href;
            }
          }
        }

        const pathSlug = (this.$route.path || "").split("/").filter(Boolean).pop();
        if (pathSlug) {
          return pathSlug;
        }
      }

      try {
        const url = new URL(window.location.href);
        const querySlug = url.searchParams.get("slug") || url.searchParams.get("href");
        if (querySlug) {
          if (querySlug.includes("/")) {
            try {
              const parsedUrl = new URL(querySlug, window.location.origin);
              const hrefSlug = parsedUrl.pathname.split("/").filter(Boolean).pop();
              return hrefSlug || querySlug;
            } catch (err) {
              return querySlug;
            }
          }

          return querySlug;
        }

        const pathSlug = url.pathname.split("/").filter(Boolean).pop();
        if (pathSlug) {
          return pathSlug;
        }
      } catch (error) {
        return null;
      }

      return null;
    },
    async fetchArticle() {
      try {
        const res = await axios.post("https://miraivietnam.com/quantri/baiviet", {
          idFun: 115,
          slug: "gioi-thieu",
        });

        if (res.data.success) {
          this.article = res.data.data;
        }
      } catch (error) {
        console.log("Fetch article error:", error);
      }
    },
    async fetchMenuData() {
      try {
        this.loading = true;

        const res = await axios.post("https://miraivietnam.com/set-menu", {
          idFun: 100,
        });

        if (res.data.success) {
          this.menuItems = res.data.data;
        }
      } catch (error) {
        console.log(error);

        this.menuItems = [
          {
            id: "home",
            name: {
              vi: "Trang chủ",
              en: "Home",
            },
          },

          {
            id: "about",
            name: {
              vi: "Giới thiệu",
              en: "About",
            },
          },

          {
            id: "services",
            name: {
              vi: "Dịch vụ",
              en: "Services",
            },
          },

          {
            id: "contact",
            name: {
              vi: "Liên hệ",
              en: "Contact",
            },
          },
        ];
      } finally {
        this.loading = false;
      }
    },

    getMenuLabel(item) {
      if (item.name && typeof item.name === "object") {
        return item.name[this.currentLang] || item.name.en || "";
      }

      return item.label || "";
    },

    handleMenuClick(itemId) {
      this.$emit("update:activeTab", itemId);
    },

    handleMobileMenuClick(itemId) {
      this.$emit("update:activeTab", itemId);

      this.mobileMenuOpen = false;
    },

    handleLogoClick() {
      this.$emit("update:activeTab", "home");
    },

    handleLanguageChange(langCode) {
      this.currentLang = langCode;

      this.currentLangCode = this.languageMap[langCode];

      this.$emit("update:lang", langCode);
    },

    cycleMobileLanguage() {
      const langs = ["vi", "en", "ja"];

      const currentIndex = langs.indexOf(this.currentLang);

      const nextIndex = (currentIndex + 1) % langs.length;

      this.handleLanguageChange(langs[nextIndex]);
    },

    initLanguageCode() {
      this.currentLangCode = this.languageMap[this.currentLang];
    },
  },

  mounted() {
    this.fetchMenuData();
    this.fetchArticle();
    this.initLanguageCode();
  },
};
</script>
