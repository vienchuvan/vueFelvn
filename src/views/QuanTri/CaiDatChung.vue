<template>
  <div class="space-y-6 animate-in fade-in">
    <!-- HEADER -->
    <div class="flex justify-between items-center">
      <h2 class="text-2xl font-bold text-gray-800">
        Cài đặt chung
      </h2>

      <button
        class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 shadow-sm"
        @click="saveSettings"
      >
        <Save :size="18" />
        Lưu thay đổi
      </button>
    </div>

    <!-- ========================= -->
    <!-- SECTION 1 -->
    <!-- ========================= -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 class="text-lg font-bold text-gray-800 mb-4 border-b pb-2">
        1. Thông tin cơ bản (Logo & Liên hệ)
      </h3>

      <!-- TAB -->
      <div class="flex gap-2 mb-5 border-b border-gray-200 pb-2">
        <button
          @click="logoTab = 'image'"
          :class="[
            'px-4 py-2 rounded-lg text-sm font-medium transition',
            logoTab === 'image'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
          ]"
        >
          Upload Ảnh
        </button>

        <button
          @click="logoTab = 'svg'"
          :class="[
            'px-4 py-2 rounded-lg text-sm font-medium transition',
            logoTab === 'svg'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
          ]"
        >
          Mã SVG
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- LEFT -->
        <div>
          <!-- IMAGE -->
          <div v-if="logoTab === 'image'">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Upload Logo
            </label>

            <div
              class="w-full h-[204px] border-2 border-dashed border-gray-300 rounded-xl overflow-hidden bg-gray-50 relative flex items-center justify-center"
            >
              <img
  v-if="formData.imgLogoPreview"
  :src="formData.imgLogoPreview"
  class="w-full h-full object-contain p-4"
/>

<div
  v-else
  class="text-gray-400 text-sm"
>
  Chọn ảnh logo...
</div>

              <input
                type="file"
                accept="image/*"
                class="absolute inset-0 opacity-0 cursor-pointer"
                @change="changeLogoImage"
              />
            </div>
          </div>

          <!-- SVG -->
          <div v-if="logoTab === 'svg'">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Mã SVG Logo
            </label>

            <textarea
              v-model="formData.logo"
              class="w-full border border-gray-300 rounded-lg p-3 text-sm h-[204px] font-mono bg-gray-50 outline-none focus:border-blue-500"
              placeholder="<svg>...</svg>"
            ></textarea>
          </div>
        </div>

        <!-- RurlIgHT -->
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1 text-left">
              Hotline tư vấn
            </label>

            <input
              v-model="formData.hotline"
              type="text"
              class="w-full border border-gray-300 rounded-lg p-2.5 text-sm outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1 text-left">
              Email liên hệ
            </label>

            <input
              v-model="formData.email"
              type="text"
              class="w-full border border-gray-300 rounded-lg p-2.5 text-sm outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1 text-left">
              Thời gian làm việc
            </label>

            <input
              v-model="formData.workingHours"
              type="text"
              class="w-full border border-gray-300 rounded-lg p-2.5 text-sm outline-none focus:border-blue-500"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- ========================= -->
    <!-- SECTION 2 -->
    <!-- ========================= -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 class="text-lg font-bold text-gray-800 mb-4 border-b pb-2">
        2. Đa ngôn ngữ
      </h3>

      <!-- LANGUAGE TAB -->
      <div class="flex gap-2 mb-6 border-b border-gray-200 pb-3">
        <button
          v-for="langOption in langs"
          :key="langOption.value"
          @click="activeLang = langOption.value"
          :class="[
            'px-4 py-2 rounded-t-lg font-medium text-sm transition-all',
            activeLang === langOption.value
              ? 'bg-blue-600 text-white border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-800',
          ]"
        >
          {{ langOption.label }}
        </button>
      </div>

      <div class="space-y-5">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1 text-left">
            Tên công ty ({{ activeLang.toUpperCase() }})
          </label>

          <input
            v-model="formData.languages[activeLang].companyName"
            type="text"
            class="w-full border border-gray-300 rounded-lg p-2.5 text-sm outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1 text-left">
            Địa chỉ trụ sở ({{ activeLang.toUpperCase() }})
          </label>

          <input
            v-model="formData.languages[activeLang].address"
            type="text"
            class="w-full border border-gray-300 rounded-lg p-2.5 text-sm outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1 text-left">
            Nội dung Footer ({{ activeLang.toUpperCase() }})
          </label>

          <textarea
            v-model="formData.languages[activeLang].footerContent"
            class="w-full border border-gray-300 rounded-lg p-3 h-24 text-sm outline-none focus:border-blue-500"
          ></textarea>
        </div>
      </div>
    </div>

    <!-- ========================= -->
    <!-- SECTION 3 -->
    <!-- ========================= -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 class="text-lg font-bold text-gray-800 mb-4 border-b pb-2">
        3. Liên kết mạng xã hội
      </h3>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1 text-left">
            Facebook
          </label>

          <input
            v-model="formData.urlFacebook"
            type="text"
            placeholder="https://facebook.com/..."
            class="w-full border border-gray-300 rounded-lg p-2.5 text-sm outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1 text-left">
            urlZalo
          </label>

          <input
            v-model="formData.urlZalo"
            type="text"
            placeholder="https://urlZalo.me/..."
            class="w-full border border-gray-300 rounded-lg p-2.5 text-sm outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1 text-left">
            Youtube
          </label>

          <input
            v-model="formData.urlYoutube"
            type="text"
            placeholder="https://youtube.com/..."
            class="w-full border border-gray-300 rounded-lg p-2.5 text-sm outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1 text-left">
            urlTiktok
          </label>

          <input
            v-model="formData.urlTiktok"
            type="text"
            placeholder="https://urlTiktok.com/..."
            class="w-full border border-gray-300 rounded-lg p-2.5 text-sm outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1 text-left">
            Instagram
          </label>

          <input
            v-model="formData.urlIg"
            type="text"
            placeholder="https://instagram.com/..."
            class="w-full border border-gray-300 rounded-lg p-2.5 text-sm outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1 text-left">
            urlLinkedin
          </label>

          <input
            v-model="formData.urlLinkedin"
            type="text"
            placeholder="https://urlLinkedin.com/..."
            class="w-full border border-gray-300 rounded-lg p-2.5 text-sm outline-none focus:border-blue-500"
          />
        </div>
      </div>
    </div>

    <!-- ========================= -->
    <!-- SECTION 4 -->
    <!-- ========================= -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div class="flex justify-between items-center mb-4 border-b pb-2">
        <h3 class="text-lg font-bold text-gray-800">
          4. Quản lý Banner Slider
        </h3>

        <button
          @click="addBanner"
          class="text-blue-600 font-medium text-sm flex items-center gap-1 hover:text-blue-800"
        >
          <Plus :size="16" />
          Thêm Banner
        </button>
      </div>

      <div class="space-y-4">
        <div
          v-for="(banner, idx) in formData.banners"
          :key="banner.id || idx"
          class="border border-gray-200 rounded-lg p-4 flex gap-4 items-center bg-gray-50"
        >
          <!-- IMAGE -->
          <div
            class="w-32 h-20 bg-gray-300 rounded overflow-hidden shrink-0 border border-gray-300 relative"
          >
            <img
              :src="banner.image"
              class="w-full h-full object-cover"
            />

            <input
              type="file"
              accept="image/*"
              class="absolute inset-0 opacity-0 cursor-pointer"
              @change="changeBannerImage($event, idx)"
            />
          </div>

          <!-- INFO -->
          <div class="flex-1 space-y-2">
            <input
              v-model="banner.title"
              type="text"
              placeholder="Tiêu đề banner"
              class="w-full border border-gray-300 rounded p-2 text-sm font-bold outline-none focus:border-blue-500"
            />

            <input
              v-model="banner.description"
              type="text"
              placeholder="Mô tả banner"
              class="w-full border border-gray-300 rounded p-2 text-sm text-gray-600 outline-none focus:border-blue-500"
            />
          </div>

          <!-- ACTION -->
          <div class="shrink-0 flex flex-col gap-2">
            <button
              @click="saveBanner(banner)"
              class="p-2 text-blue-600 hover:text-blue-800 bg-white rounded shadow-sm border"
            >
              <Save :size="16" />
            </button>

            <button
              @click="removeBanner(idx, banner)"
              class="p-2 text-red-500 hover:text-red-700 bg-white rounded shadow-sm border"
            >
              <Trash2 :size="16" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { Save, Plus, Trash2 } from "lucide-vue-next";

export default {
  name: "GeneralSettings",

  components: {
    Save,
    Plus,
    Trash2,
  },

  data() {
  return {
    activeLang: "vi",

    logoTab: "image",

    langs: [
      { value: "vi", label: "🇻🇳 Tiếng Việt" },
      { value: "en", label: "🇬🇧 English" },
      { value: "ja", label: "🇯🇵 日本語" },
    ],

    formData: {
      logo: "",

      // upload image
      imgLogo: "",
      imgLogoFile: null,
      imgLogoPreview: "",

      hotline: "",
      email: "",
      workingHours: "",

      // socials
      urlFacebook: "",
      urlYoutube: "",
      urlZalo: "",
      urlTiktok: "",
      urlIg: "",
      urlLinkedin: "",

      languages: {
        vi: {
          companyName: "",
          address: "",
          footerContent: "",
        },

        en: {
          companyName: "",
          address: "",
          footerContent: "",
        },

        ja: {
          companyName: "",
          address: "",
          footerContent: "",
        },
      },

      banners: [],
    },
  };
},

  mounted() {
    this.getSettings();
    this.getBanners();
  },

  methods: {
    // =========================
    // GET SETTINGS
    // =========================
  async getSettings() {
  try {
    const res = await axios.post(
      // "https://miraivietnam.com/api/setting-home",
       "http://localhost:3000/api/setting-home",
      {
        idFun: 100,
      }
    );

    if (res.data.success) {
      const data = res.data.data || {};

      this.formData.logo =
        data.logo || "";

      this.formData.imgLogo =
        data.imgLogo || "";

      this.formData.hotline =
        data.hotline || "";

      this.formData.email =
        data.email || "";

      this.formData.workingHours =
        data.workingHours || "";

      this.formData.urlFacebook =
        data.urlFacebook || "";

      this.formData.urlYoutube =
        data.urlYoutube || "";

      this.formData.urlZalo =
        data.urlZalo || "";

      this.formData.urlTiktok =
        data.urlTiktok || "";

      this.formData.urlIg =
        data.urlIg || "";

      this.formData.urlLinkedin =
        data.urlLinkedin || "";

      this.formData.languages =
        data.languages ||
        this.formData.languages;

      if (data.imgLogo) {
        this.formData.imgLogoPreview =
          data.imgLogo.startsWith("http")
            ? data.imgLogo
            : "https://miraivietnam.com" +
              data.imgLogo;
      }
    }
  } catch (error) {
    console.log(error);
  }
},


changeLogoImage(event) {
  const file = event.target.files[0];

  if (!file) return;

  this.formData.imgLogoFile = file;

  const reader = new FileReader();

  reader.onload = e => {
    this.formData.imgLogoPreview =
      e.target.result;
  };

  reader.readAsDataURL(file);

  console.log(
    "preview:",
    this.formData.imgLogoPreview
  );
},

async saveSettings() {
  try {
    const formData = new FormData();

    formData.append("idFun", 200);

    // svg logo
    formData.append(
      "logo",
      this.formData.logo || ""
    );

    // image logo
    if (this.formData.imgLogoFile) {
      formData.append(
        "imgLogo",
        this.formData.imgLogoFile
      );
    }

    // contact
    formData.append(
      "hotline",
      this.formData.hotline || ""
    );

    formData.append(
      "email",
      this.formData.email || ""
    );

    formData.append(
      "workingHours",
      this.formData.workingHours || ""
    );

    // socials
    formData.append(
      "urlFacebook",
      this.formData.urlFacebook || ""
    );

    formData.append(
      "urlYoutube",
      this.formData.urlYoutube || ""
    );

    formData.append(
      "urlZalo",
      this.formData.urlZalo || ""
    );

    formData.append(
      "urlTiktok",
      this.formData.urlTiktok || ""
    );

    formData.append(
      "urlIg",
      this.formData.urlIg || ""
    );

    formData.append(
      "urlLinkedin",
      this.formData.urlLinkedin || ""
    );

    // language
    formData.append(
      "languages",
      JSON.stringify(
        this.formData.languages
      )
    );
//  "https://miraivietnam.com/api/setting-home",  
    const res = await axios.post(
     
      "http://localhost:3000/api/setting-home",
      formData,
      {
        headers: {
          "Content-Type":
            "multipart/form-data",
        },
      }
    );

    if (res.data.success) {
      alert(
        "Lưu cài đặt thành công"
      );

      if (res.data.imgLogo) {
        this.formData.imgLogo =
          res.data.imgLogo;

        this.formData.imgLogoPreview =
          "https://miraivietnam.com" +
          res.data.imgLogo;
      }
    }
  } catch (error) {
    console.log(error);

    alert("Có lỗi xảy ra");
  }
},

    // =========================
    // GET BANNERS
    // =========================
    async getBanners() {
      try {
        const res = await axios.post(
          "https://miraivietnam.com/api/set-banner",
          {
            idFun: 114,
          }
        );

        if (res.data.success) {
          this.formData.banners =
            res.data.data.map((item) => ({
              id: item.id,

              image: item.img?.startsWith("https")
                ? item.img
                : "https://miraivietnam.com/" +
                  item.img,

              img: item.img,

              title: item.title,

              description: item.desc,

              file: null,
            }));
        }
      } catch (error) {
        console.log(error);

        alert("Không tải được banner");
      }
    },

    // =========================
    // ADD BANNER
    // =========================
    addBanner() {
      this.formData.banners.push({
        temp: true,

        id: Date.now(),

        image:
          "https://placehold.co/600x400?text=Banner",

        img: "",

        title: "",

        description: "",

        file: null,
      });
    },

    // =========================
    // CHANGE IMAGE
    // =========================
    changeBannerImage(event, index) {
      const file = event.target.files[0];

      if (!file) return;

      this.formData.banners[index].file =
        file;

      this.formData.banners[index].image =
        URL.createObjectURL(file);
    },

    // =========================
    // SAVE BANNER
    // =========================
    async saveBanner(banner) {
      try {
        const formData = new FormData();

        formData.append(
          "idFun",
          banner.temp ? 111 : 112
        );

        formData.append("id", banner.id);

        formData.append("title", banner.title);

        formData.append(
          "desc",
          banner.description
        );

        if (banner.file) {
          formData.append(
            "banner_image",
            banner.file
          );
        } else {
          formData.append(
            "img",
            banner.img || ""
          );
        }

        const res = await axios.post(
          "https://miraivietnam.com/api/set-banner",
          formData,
          {
            headers: {
              "Content-Type":
                "multipart/form-data",
            },
          }
        );

        if (res.data.success) {
          alert(
            banner.temp
              ? "Thêm banner thành công"
              : "Cập nhật banner thành công"
          );

          banner.temp = false;

          banner.img = res.data.img;

          banner.image =
            "https://miraivietnam.com/" +
            res.data.img;

          banner.file = null;
        }
      } catch (error) {
        console.log(error);

        alert("Có lỗi xảy ra");
      }
    },

    // =========================
    // DELETE BANNER
    // =========================
    async removeBanner(idx, banner) {
      try {
        if (!confirm("Bạn muốn xóa banner?")) {
          return;
        }

        if (banner.temp) {
          this.formData.banners.splice(
            idx,
            1
          );

          return;
        }

        const res = await axios.post(
          "https://miraivietnam.com/api/api/banner",
          {
            idFun: 113,

            id: banner.id,
          }
        );

        if (res.data.success) {
          this.formData.banners.splice(
            idx,
            1
          );

          alert("Xóa banner thành công");
        }
      } catch (error) {
        console.log(error);

        alert("Có lỗi xảy ra");
      }
    },
  },
};
</script>

<style scoped>
.animate-in {
  animation: fadeIn 0.3s ease-in;
}

.fade-in {
  opacity: 1;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}
</style>