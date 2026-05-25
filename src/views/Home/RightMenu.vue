<template>

  <div class="relative">

    <div
      class="sticky z-[60]"
      :style="{
        top: navOffset + 'px'
      }"
    >

      <div
        class="bg-[#09223e] rounded-[18px] border border-white/5 shadow-2xl overflow-hidden"
      >

        <!-- CATEGORY -->
        <div
          v-for="(category, categoryIndex) in sidebarMenu"
          :key="categoryIndex"
        >

          <!-- TITLE -->
          <div
            class="px-6 py-4 flex items-center justify-between border-t border-white/5"
            style="background: chocolate;"
          >

            <span
              class="text-white text-[14px] font-extrabold tracking-wider uppercase"
            >
              {{ getCategoryLabel(category) }}
            </span>

            <i class="fa-solid fa-gears text-white/70"></i>

          </div>

          <!-- CONTENT -->
          <div class="p-6 space-y-6">

            <!-- ITEM -->
            <div
              v-for="(item, itemIndex) in category.items"
              :key="itemIndex"
              class="space-y-3.5"
            >

              <!-- ITEM TITLE -->
              <div
                class="text-white font-bold text-[14px] text-left flex items-start gap-2"
              >

                <span
                  class="font-bold"
                  style="color: chocolate;"
                >
                  <i class="fa-solid fa-arrow-right"></i>
                </span>

                <span>
                  {{ getItemTitle(item) }}
                </span>

              </div>

              <!-- SUB ITEMS -->
              <transition name="fade">

                <ul
                  v-show="openedItems.includes(item.id)"
                  class="list-none p-0 m-0 pl-[18px] space-y-2.5 text-left"
                >

                  <li
                    v-for="(sub, subIndex) in item.subItems"
                    :key="subIndex"
                    class="text-[#d1d5db] text-[12.5px] leading-relaxed relative pl-3.5"
                  >

                    <span
                      class="absolute left-0 top-[8px] w-1 h-1 rounded-full"
                      style="background: chocolate;"
                    ></span>

                    {{ getSubItemTitle(sub) }}

                  </li>

                </ul>

              </transition>

            </div>

          </div>

        </div>

        <!-- CONTACT -->
        <div
          class="bg-[#05172b] p-6 text-center border-t border-white/10 space-y-4"
        >

          <p class="text-[#9ca3af] text-[13px] mb-2 font-medium">
            Cần tư vấn ngay?
          </p>

          <a
            href="/lien-he"
            style="background: chocolate;"
            class="w-full py-3 px-4 hover:bg-orange-600 text-white font-bold rounded-xl transition duration-300 shadow-md flex items-center justify-center gap-2 text-sm"
          >

            <i class="fa-solid fa-phone"></i>

            Liên hệ chúng tôi

          </a>

        </div>

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

      openedItems: [],

      navOffset: 90,

    };

  },

  methods: {

    updateTopOffset() {

      const nav = document.querySelector(".top-nav");

      if (nav) {

        this.navOffset = nav.offsetHeight + 20;

      } else {

        this.navOffset = 90;

      }

    },

    getCategoryLabel(category) {

      if (category[`category_${this.lang}`]) {
        return category[`category_${this.lang}`];
      }

      return category.category || "";

    },

    getItemTitle(item) {

      if (item[`title_${this.lang}`]) {
        return item[`title_${this.lang}`];
      }

      return item.title || "";

    },

    getSubItemTitle(sub) {

      if (sub[`title_${this.lang}`]) {
        return sub[`title_${this.lang}`];
      }

      return sub.title || "";

    },

    async getSidebarMenu() {

      try {

        const response = await axios.post(
          "http://192.168.51.252:3000/sidebar-menu",
          {
            idFun: 114,
          }
        );

        if (response.data.success) {

          this.sidebarMenu = response.data.data;

          this.openedItems =
            this.sidebarMenu.flatMap(
              (category) =>
                category.items.map(
                  (item) => item.id
                )
            );

        }

      } catch (error) {

        console.error(
          "GET SIDEBAR ERROR:",
          error
        );

      }

    },

  },

  mounted() {

    this.getSidebarMenu();

    this.$nextTick(() => {

      this.updateTopOffset();

    });

    window.addEventListener(
      "resize",
      this.updateTopOffset
    );

  },

  beforeUnmount() {

    window.removeEventListener(
      "resize",
      this.updateTopOffset
    );

  },

};
</script>

<style scoped>

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

</style>