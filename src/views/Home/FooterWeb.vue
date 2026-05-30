<template>
  <!-- FOOTER -->
  <footer class="bg-[#020617] border-t border-white/10 py-16">
    <div class="max-w-[1180px] mx-auto px-5 grid grid-cols-1 md:grid-cols-3 gap-12">
      <!-- Cột 1 -->
      <div class="space-y-4">
        <div class="flex items-center space-x-3">
          <!-- LOGO -->
          <!-- <div
  v-if="settings.logo"
  class="h-12 max-w-[180px] [&>svg]:w-full [&>svg]:h-full"
  v-html="settings.logo"
></div>

<div
  v-else
  class="bg-brand-orange w-10 h-10 rounded-lg flex items-center justify-center font-bold text-white text-xl"
>
  LV
</div> -->
          <div class="flex cursor-pointer items-center transition-transform duration-300 hover:scale-105"
            @click="$router.push('/')">
            <img :src="getImage(settings.imgLogo)" alt="Mirai Vietnam" class="ml-2 h-12 w-auto object-contain">

          </div>
          <span class="font-extrabold text-lg text-white uppercase">
            {{ currentLang.companyName || "LE VIET NAM" }}
          </span>
        </div>

        <p class="text-gray-400 text-sm leading-relaxed text-left" v-html="currentLang.footerContent"></p>
      </div>

      <!-- Cột 2 -->
      <div class="space-y-4">
        <h4 class="font-bold text-white uppercase tracking-wider text-sm">
          Liên hệ
        </h4>

        <ul class="space-y-3 text-gray-400 text-sm text-left">
          <li class="flex">
            <i class="fa-solid fa-location-dot mr-2 text-brand-orange mt-1"></i>

            <span>
              {{ currentLang.address || "Chưa cập nhật địa chỉ" }}
            </span>
          </li>

          <li>
            <i class="fa-solid fa-phone mr-2 text-brand-orange"></i>

            {{ settings.hotline || "Chưa cập nhật hotline" }}
          </li>

          <li>
            <i class="fa-solid fa-envelope mr-2 text-brand-orange"></i>

            {{ settings.email || "Chưa cập nhật email" }}
          </li>

          <li>
            <i class="fa-solid fa-clock mr-2 text-brand-orange"></i>

            {{ settings.workingHours || "Chưa cập nhật giờ làm việc" }}
          </li>
        </ul>
      </div>

      <!-- Cột 3 -->
      <div class="space-y-4">
        <h4 class="font-bold text-white uppercase tracking-wider text-sm">
          Theo dõi chúng tôi
        </h4>

        <div class="flex space-x-4" style="justify-content: center;">
          <a :href="settings.urlFacebook || '#'"
            class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-orange transition">
            <i class="fa-brands fa-facebook-f"></i>
          </a>

          <a :href="settings.urlLinkedIn || '#'"
            class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-orange transition">
            <i class="fa-brands fa-linkedin-in"></i>
          </a>

          <a :href="settings.urlYouTube || '#'"
            class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-orange transition">
            <i class="fa-brands fa-youtube"></i>
          </a>
        </div>
      </div>
    </div>

    <!-- COPYRIGHT -->
    <div class="max-w-[1180px] mx-auto px-5 mt-12 pt-8 border-t border-white/5 text-center text-gray-500 text-xs">
      © 2026
      {{ currentLang.companyName || "LE VIET NAM" }}.
      Bảo lưu mọi quyền.
    </div>
  </footer>
</template>

<script>
import axios from "axios";

export default {
  props: {
    lang: {
      type: String,
      default: "vi",
    },
  },

  data() {
    return {
      settings: {
        logo: "",
        hotline: "",
        email: "",
        urlFacebook: "",
        urlLinkedIn: "",
        urlYouTube: "",
        imgLogo: "",
        urlZalo: "",

        workingHours: "",
        languages: {
          vi: {},
          en: {},
          ja: {},
        },
      },
    };
  },

  computed: {
    currentLang() {
      return this.settings?.languages?.[this.lang] || {};
    },
  },

  mounted() {
    this.getSettings();
  },

  methods: {
    async getSettings() {
      try {
        const res = await axios.post(
          "https://miraivietnam.com/api/setting-home",
          {
            idFun: 100,
          }
        );

        if (res.data.success) {
          this.settings = res.data.data;
        }
      } catch (error) {
        console.log(error);
      }
    },

    getImage(img) {

      if (!img) {
        return "/img/miraivietnam.png";
      }

      // nếu đã là http hoặc https
      if (
        img.startsWith("http://") ||
        img.startsWith("https://")
      ) {
        return img;
      }

      // ảnh local server
      return "https://miraivietnam.com" + img;
    },
  },
};
</script>