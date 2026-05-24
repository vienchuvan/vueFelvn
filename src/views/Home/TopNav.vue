<template>
  <header
    class="sticky top-0 z-50 border-b border-indigo-800/50 bg-[#0a203f] text-white" style="font-family: auto;"
  >
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-20 items-center justify-between">

        <!-- LOGO -->
        <div
          class="flex cursor-pointer items-center"
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
                'rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-300',
                $route.path === item.link
                  ? 'bg-indigo-900/60 text-orange-400 shadow-lg'
                  : 'text-gray-300 hover:bg-indigo-800/40 hover:text-white'
              ]"
            >
              {{ getMenuLabel(item) }}
            </router-link>
          </nav>

          <!-- LANGUAGE -->
          <div
            class="relative border-l border-indigo-800 pl-4"
          >
            <button
              @click="showLang = !showLang"
              class="flex items-center gap-2 text-gray-300 transition hover:text-white"
            >
              <Globe :size="18" />

              <span class="font-semibold">
                {{ currentLangCode }}
              </span>
            </button>

            <!-- dropdown -->
            <transition
              enter-active-class="transition duration-200 ease-out"
              enter-from-class="opacity-0 translate-y-2"
              enter-to-class="opacity-100 translate-y-0"
              leave-active-class="transition duration-150 ease-in"
              leave-from-class="opacity-100 translate-y-0"
              leave-to-class="opacity-0 translate-y-2"
            >
              <div
                v-if="showLang"
                class="absolute right-0 mt-3 w-40 overflow-hidden rounded-2xl bg-white shadow-2xl"
              >
                <button
                  v-for="lang in languages"
                  :key="lang.code"
                  @click="handleLanguageChange(lang.code)"
                  :class="[
                    'w-full px-4 py-3 text-left text-sm transition-all',
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
            class="flex items-center gap-1 text-sm"
          >
            <Globe :size="18" />

            {{ currentLangCode }}
          </button>

          <!-- menu -->
          <button
            @click="mobileMenuOpen = !mobileMenuOpen"
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
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-if="mobileMenuOpen"
        class="border-t border-indigo-800/50 bg-[#0f2a4a] md:hidden"
      >
        <div class="space-y-2 p-4">

          <router-link
            v-for="item in menuItems"
            :key="item.link"
            :to="item.link"
            @click="mobileMenuOpen = false"
            :class="[
              'block w-full rounded-xl px-4 py-3 text-left text-sm font-semibold transition-all',
              $route.path === item.link
                ? 'bg-indigo-900/60 text-orange-400'
                : 'text-gray-300 hover:bg-indigo-800/40 hover:text-white'
            ]"
          >
            {{ getMenuLabel(item) }}
          </router-link>

        </div>
      </div>
    </transition>
  </header>
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
          "http://localhost:3000/set-menu",
          {
            idFun: 100,
          }
        );

        if (res.data.success) {
          this.menuItems = res.data.data.map((item) => ({
            ...item,

            // fallback link
            link:
              item.link ||
              (item.id === "home"
                ? "/"
                : `/${item.id}`),
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
  },

  mounted() {
    this.fetchMenuData();

    this.initLanguageCode();

    document.addEventListener(
      "click",
      this.closeDropdown
    );
  },

  beforeUnmount() {
    document.removeEventListener(
      "click",
      this.closeDropdown
    );
  },
};
</script>

<style scoped>
.router-link-active {
  transition: all 0.3s ease;
}
</style>