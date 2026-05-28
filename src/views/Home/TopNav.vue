<template>
  <header
  class="fixed top-0 left-0 right-0 z-[99999]
  bg-[#0a203f]/95
  backdrop-blur-xl
  border-b border-white/10
  shadow-lg"
>
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div
        :class="[
          'flex items-center justify-between transition-all duration-300',
          isScrolled ? 'h-16' : 'h-20'
        ]"
      >
        <!-- LOGO -->
        <div
          class="flex cursor-pointer items-center transition-transform duration-300 hover:scale-105"
          @click="$router.push('/')"
        >
          <LogoSVG />
        </div>

        <!-- DESKTOP -->
        <div class="hidden items-center gap-5 md:flex">
          <!-- MENU -->
          <nav class="flex items-center gap-2">
            <router-link
              v-for="item in menuItems"
              :key="item.link"
              :to="item.link"
              :class="[
                'relative overflow-hidden rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-300',
                $route.path === item.link
                  ? 'bg-indigo-900/70 text-orange-400 shadow-lg shadow-indigo-900/30'
                  : 'text-gray-300 hover:bg-indigo-800/40 hover:text-white'
              ]"
            >
              <span class="relative z-10">
                {{ getMenuLabel(item) }}
              </span>

              <!-- active glow -->
              <div
                v-if="$route.path === item.link"
                class="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-indigo-500/10"
              />
            </router-link>
          </nav>

          <!-- LANGUAGE -->
          <div class="relative border-l border-indigo-800 pl-4">
            <button
              @click.stop="showLang = !showLang"
              class="flex items-center gap-2 rounded-xl px-3 py-2 text-gray-300 transition-all duration-300 hover:bg-indigo-800/40 hover:text-white"
            >
              <Globe :size="18" />

              <span class="font-semibold">
                {{ currentLangCode }}
              </span>
            </button>

            <!-- dropdown -->
            <transition
              enter-active-class="transition duration-200 ease-out"
              enter-from-class="opacity-0 translate-y-2 scale-95"
              enter-to-class="opacity-100 translate-y-0 scale-100"
              leave-active-class="transition duration-150 ease-in"
              leave-from-class="opacity-100 translate-y-0 scale-100"
              leave-to-class="opacity-0 translate-y-2 scale-95"
            >
              <div
                v-if="showLang"
                class="absolute right-0 top-full z-[100000] mt-3 w-44 overflow-hidden rounded-2xl border border-white/10 bg-white shadow-[0_20px_80px_rgba(0,0,0,0.45)]"
              >
                <button
                  v-for="lang in languages"
                  :key="lang.code"
                  @click="handleLanguageChange(lang.code)"
                  :class="[
                    'w-full px-4 py-3 text-left text-sm transition-all duration-300',
                    currentLang === lang.code
                      ? 'bg-orange-50 font-bold text-orange-500'
                      : 'text-gray-700 hover:bg-gray-100'
                  ]"
                >
                  {{ lang.label }}
                </button>
              </div>
            </transition>
          </div>
        </div>

        <!-- MOBILE -->
        <div class="flex items-center gap-4 md:hidden">
          <!-- language -->
          <button
            @click="cycleMobileLanguage"
            class="flex items-center gap-1 rounded-lg px-2 py-1 text-sm text-white transition-all hover:bg-indigo-800/40"
          >
            <Globe :size="18" />

            {{ currentLangCode }}
          </button>

          <!-- menu -->
          <button
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="rounded-lg p-2 transition-all hover:bg-indigo-800/40"
          >
            <X
              v-if="mobileMenuOpen"
              :size="28"
            />

            <Menu
              v-else
              :size="28"
            />
          </button>
        </div>
      </div>
    </div>

    <!-- MOBILE MENU -->
    <transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-3"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-3"
    >
      <div
        v-if="mobileMenuOpen"
        class="border-t border-indigo-800/50 bg-[#0f2a4a]/95 backdrop-blur-xl md:hidden"
      >
        <div class="space-y-2 p-4">
          <router-link
            v-for="item in menuItems"
            :key="item.link"
            :to="item.link"
            @click="mobileMenuOpen = false"
            :class="[
              'block w-full rounded-xl px-4 py-3 text-left text-sm font-semibold transition-all duration-300',
              $route.path === item.link
                ? 'bg-indigo-900/60 text-orange-400 shadow-lg'
                : 'text-gray-300 hover:bg-indigo-800/40 hover:text-white'
            ]"
          >
            {{ getMenuLabel(item) }}
          </router-link>
        </div>
      </div>
    </transition>
  </header>

  <!-- spacing -->
  <div :class="isScrolled ? 'h-16' : 'h-20'" />
</template>

<script>
import axios from "axios";

import {
  Menu,
  X,
  Globe,
} from "lucide-vue-next";

import LogoSVG from "@/components/LogoSVG.vue";

export default {
  name: "TopNav",

  components: {
    Menu,
    X,
    Globe,
    LogoSVG,
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

      showLang: false,

      loading: false,

      isScrolled: false,

      currentLang: this.lang,

      currentLangCode: "VI",

      menuItems: [
        {
          id: "home",
          link: "/",
          name: {
            vi: "Trang chủ",
            en: "Home",
            ja: "トップページ",
          },
        },

        {
          id: "about",
          link: "/about",
          name: {
            vi: "Giới thiệu",
            en: "About",
            ja: "紹介",
          },
        },

        {
          id: "services",
          link: "/services",
          name: {
            vi: "Dịch vụ",
            en: "Services",
            ja: "サービス",
          },
        },

        {
          id: "contact",
          link: "/contact",
          name: {
            vi: "Liên hệ",
            en: "Contact",
            ja: "連絡先",
          },
        },
      ],

      languages: [
        {
          code: "vi",
          label: "🇻🇳 Tiếng Việt",
        },

        {
          code: "en",
          label: "🇬🇧 English",
        },

        {
          code: "ja",
          label: "🇯🇵 日本語",
        },
      ],

      languageMap: {
        vi: "VI",
        en: "EN",
        ja: "JA",
      },
    };
  },

  methods: {
    async fetchMenuData() {
      try {
        this.loading = true;

        const res = await axios.post(
          "https://miraivietnam.com/api/set-menu",
          {
            idFun: 100,
          }
        );

        if (res.data.success) {
          console.log("Menu data:", res.data.data);
        this.menuItems = res.data.data.map((item) => ({
  ...item,

  link:
    item.link === "/" || item.link === ""
      ? "/"
      : ["tin-tuc", "dich-vu", "lien-he"].includes(
          item.link.replace("/", "")
        )
      ? item.link
      : `/bai-viet${item.link}`,
}));
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },

    getMenuLabel(item) {
      if (
        item.name &&
        typeof item.name === "object"
      ) {
        return (
          item.name[this.currentLang] ||
          item.name.en ||
          item.name.vi ||
          ""
        );
      }

      return item.label || "";
    },

    handleLanguageChange(langCode) {
      this.currentLang = langCode;

      this.currentLangCode =
        this.languageMap[langCode];

      this.showLang = false;

      this.$emit("update:lang", langCode);
    },

    cycleMobileLanguage() {
      const langs = ["vi", "en", "ja"];

      const currentIndex = langs.indexOf(
        this.currentLang
      );

      const nextIndex =
        (currentIndex + 1) % langs.length;

      this.handleLanguageChange(
        langs[nextIndex]
      );
    },

    initLanguageCode() {
      this.currentLangCode =
        this.languageMap[this.currentLang];
    },

    closeDropdown(e) {
      if (!this.$el.contains(e.target)) {
        this.showLang = false;
      }
    },

    handleScroll() {
      this.isScrolled = window.scrollY > 20;
    },
  },

  mounted() {
    this.fetchMenuData();

    this.initLanguageCode();

    document.addEventListener(
      "click",
      this.closeDropdown
    );

    window.addEventListener(
      "scroll",
      this.handleScroll
    );

    this.handleScroll();
  },

  beforeUnmount() {
    document.removeEventListener(
      "click",
      this.closeDropdown
    );

    window.removeEventListener(
      "scroll",
      this.handleScroll
    );
  },
};
</script>

<style scoped>
header {
  position: fixed !important;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 999999 !important;
}

.router-link-active {
  transition: all 0.3s ease;
}
</style>