<template>
  <div class="sticky top-[90px] z-30" :key="lang">
    <div
      class="bg-[#0f2a4a]/95 backdrop-blur-md rounded-[18px] border border-indigo-800/50 shadow-2xl overflow-hidden"
    >
      <!-- CATEGORY -->
      <div
        v-for="(section, idx) in sidebarMenu"
        :key="idx"
        class="mb-2"
      >
        <!-- TITLE -->
        <div class="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-3">
          <h3
            class="text-base font-bold text-white uppercase tracking-wide text-left"
          >
            {{ getCategoryLabel(section) }}
          </h3>
        </div>

        <!-- CONTENT -->
        <div class="p-2">
          <ul class="space-y-1">
            <li
              v-for="(item, itemIdx) in section.items"
              :key="itemIdx"
            >
              <!-- ITEM -->
              <a
                :href="`/bai-viet/${getItemId(item)}`"
                class="w-full flex items-start text-left p-2.5 rounded-lg hover:bg-indigo-900/50 transition-colors group"
              >
                <i
                  class="fa-solid fa-chevron-right text-orange-500 text-[12px] mt-1 mr-2 shrink-0 group-hover:text-orange-400"
                ></i>

                <span
                  class="text-gray-200 text-sm font-medium flex-1 group-hover:text-white transition-colors"
                >
                  {{ getItemTitle(item) }}
                </span>
              </a>

              <!-- SUB -->
              <ul
                v-if="item.subItems && item.subItems.length"
                class="pl-8 pr-2 py-1 space-y-1 border-l border-indigo-800/30 ml-4 mb-2"
              >
                <li
                  v-for="(subItem, subIdx) in item.subItems"
                  :key="subIdx"
                >
                  <button
                    class="w-full flex items-start text-left py-1.5 px-2 rounded-md hover:bg-indigo-900/50 transition-colors group"
                  >
                    <div
                      class="w-1 h-1 rounded-full bg-orange-600 mt-2 mr-2 shrink-0 group-hover:bg-orange-400"
                    ></div>

                    <span
                      class="text-gray-400 text-xs hover:text-white transition-colors leading-snug"
                    >
                      {{ getSubItemTitle(subItem) }}
                    </span>
                  </button>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>

      <!-- CONTACT -->
      <div
        class="p-6 bg-[#0a203f]/90 text-center border-t border-indigo-800/50"
      >
        <p class="text-sm text-gray-400 mb-4">
          {{
            lang === "en"
              ? "Need consultation now?"
              : lang === "ja"
              ? "今すぐ相談が必要ですか？"
              : "Cần tư vấn ngay?"
          }}
        </p>

        <a
          href="/lien-he"
          class="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <i class="fa-solid fa-phone"></i>

          {{
            lang === "en"
              ? "Contact Us"
              : lang === "ja"
              ? "お問い合わせ"
              : "Liên hệ chúng tôi"
          }}
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "RightMenu",

  props: {
    subServices: {
      type: Object,
      default: () => ({}),
    },

    lang: {
      type: String,
      default: "vi",
    },
  },

  data() {
    return {
      sidebarMenu: [],
    };
  },

  methods: {
    normalizeLang(lang) {
      if (lang === "jp") return "jp";
      if (lang === "ja") return "jp";

      return lang;
    },

    getCategoryLabel(category) {
      const lang = this.normalizeLang(this.lang);

      return (
        category[`category_${lang}`] ||
        category.category_vi ||
        category.category ||
        ""
      );
    },

    getItemTitle(item) {
      const lang = this.normalizeLang(this.lang);

      return (
        item[`title_${lang}`] ||
        item.title_vi ||
        item.title ||
        ""
      );
    },

    getItemId(item) {
      return item.id || "";
    },

    getSubItemTitle(sub) {
      const lang = this.normalizeLang(this.lang);

      return (
        sub[`title_${lang}`] ||
        sub.title_vi ||
        sub.title ||
        ""
      );
    },

    async getSidebarMenu() {
      try {
        const response = await axios.post(
          "https://miraivietnam.com/api/sidebar-menu",
          {
            idFun: 114,
          }
        );

        if (response.data.success) {
          this.sidebarMenu = response.data.data;

          console.log("sidebarMenu:", this.sidebarMenu);
        }
      } catch (error) {
        console.error("GET SIDEBAR ERROR:", error);
      }
    },
  },

  watch: {
    lang: {
      immediate: true,

      handler(newLang) {
        console.log("LANG CHANGED:", newLang);
      },
    },
  },

  mounted() {
    this.getSidebarMenu();
  },
};
</script>

<style scoped></style>