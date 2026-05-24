<template>
  <aside class="lg:col-span-4">
    
    <div
      class="bg-[#09223e] rounded-[18px] overflow-hidden border border-white/5 shadow-2xl"
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
            {{ category.category }}
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
              class="text-white font-bold text-[14px] text-left flex items-start gap-2 cursor-pointer"
              @click="toggleItem(item.id)"
            >
              <span
                class="font-bold"
                style="color: chocolate;"
              >
                 <i class="fa-solid fa-arrow-right"></i>
              </span>

              <span class="hover:text-orange-300 transition-colors">
                {{ item.title }}
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
                  class="text-[#d1d5db] text-[12.5px] leading-relaxed cursor-pointer hover:text-orange-300 transition-colors relative pl-3.5 before:content-[''] before:w-1 before:h-1 before:absolute before:left-0 before:top-[8px]"
                  style="--tw-before-bg-opacity:1;"
                >
                  <span
                    class="absolute left-0 top-[8px] w-1 h-1 rounded-full"
                    style="background: chocolate;"
                  ></span>

                  {{ sub.title }}
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
        <p
          class="text-[#9ca3af] text-[13px] mb-2 font-medium"
        >
          Cần tư vấn ngay?
        </p>

        <button
          style="background: chocolate;"
          class="w-full py-3 px-4 hover:bg-orange-600 text-white font-bold rounded-xl transition duration-300 shadow-md flex items-center justify-center gap-2 text-sm"
        >
          <i class="fa-solid fa-phone"></i>
          Liên hệ chúng tôi
        </button>
      </div>

    </div>

  </aside>
</template>

<script>
import axios from "axios";

export default {
  name: "RightMenu",

  data() {
    return {
      sidebarMenu: [],
      openedItems: [],
    };
  },

  methods: {
    async getSidebarMenu() {
      try {
        const response = await axios.post(
          "http://localhost:3000/sidebar-menu",
          {
            idFun: 114,
          }
        );

        if (response.data.success) {
          this.sidebarMenu = response.data.data;

          // mở item đầu tiên
          const firstItem =
            this.sidebarMenu?.[0]?.items?.[0];

          if (firstItem) {
            this.openedItems = [firstItem.id];
          }
        }
      } catch (error) {
        console.error("GET SIDEBAR ERROR:", error);
      }
    },

    toggleItem(id) {
      if (this.openedItems.includes(id)) {
        this.openedItems = this.openedItems.filter(
          (itemId) => itemId !== id
        );
      } else {
        this.openedItems.push(id);
      }
    },
  },

  mounted() {
    this.getSidebarMenu();
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}
</style>