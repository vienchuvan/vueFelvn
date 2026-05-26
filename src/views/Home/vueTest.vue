<template>
  <div class="bg-gray-50 text-gray-800 min-h-screen">
    <!-- Header -->
    <header
      class="bg-[#1e2a44] text-white py-4 sticky top-0 z-50 shadow-md"
    >
      <div
        class="container mx-auto px-4 flex items-center justify-between"
      >
        <div class="font-bold text-xl">
          {{ company.name }}
        </div>

        <nav class="hidden md:flex space-x-6">
          <a
            v-for="(item, index) in menus"
            :key="index"
            :href="item.link"
            class="hover:text-orange-400 transition"
          >
            {{ item.name }}
          </a>
        </nav>
      </div>
    </header>

    <!-- Banner -->
    <section
      class="relative w-full h-[400px] bg-slate-800 flex items-center justify-center text-white overflow-hidden"
    >
      <div
        class="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent z-10"
      ></div>

      <img
        :src="banner.image"
        :alt="banner.title"
        class="absolute inset-0 w-full h-full object-cover"
      />

      <div class="container mx-auto px-4 z-20 relative">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">
          {{ banner.title }}
        </h1>

        <p class="text-lg mb-8 max-w-lg">
          {{ banner.description }}
        </p>

        <button
          class="bg-[#f58220] hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-lg transition duration-300"
          @click="handleExplore"
        >
          {{ banner.button }}
        </button>
      </div>
    </section>

    <!-- Main -->
    <main
      class="container mx-auto px-4 py-12 flex flex-col lg:flex-row gap-8"
    >
      <!-- Left Content -->
      <div class="flex-1 space-y-8">
        <!-- About -->
        <div
          class="bg-white p-8 rounded-2xl shadow-sm border border-gray-100"
        >
          <div class="flex items-center gap-2 mb-6">
            <div class="w-1 h-8 bg-orange-500 rounded"></div>

            <h2 class="text-2xl font-bold">
              {{ about.title }}
            </h2>
          </div>

          <p class="text-gray-600 leading-relaxed mb-6">
            {{ about.content1 }}
          </p>

          <div
            class="bg-gray-200 h-64 rounded-xl flex items-center justify-center text-gray-500 mb-6 overflow-hidden"
          >
            <img
              :src="about.image"
              alt="Office"
              class="w-full h-full object-cover"
            />
          </div>

          <p class="text-gray-600 leading-relaxed">
            {{ about.content2 }}
          </p>
        </div>

        <!-- Projects -->
        <div
          class="bg-white p-8 rounded-2xl shadow-sm border border-gray-100"
        >
          <h2 class="text-2xl font-bold mb-4">
            Các dự án tiêu biểu
          </h2>

          <div class="space-y-4">
            <div
              v-for="(project, index) in projects"
              :key="index"
              class="h-32 bg-gray-100 rounded-lg p-4 shadow-inner flex items-center"
            >
              {{ project }}
            </div>
          </div>
        </div>
      </div>

      <!-- Sidebar -->
      <aside class="w-full lg:w-80">
        <div
          class="sticky top-[90px] bg-[#f58220] text-white rounded-xl shadow-lg p-6"
        >
          <h3 class="text-lg font-bold mb-4 uppercase">
            Dịch Vụ
          </h3>

          <div class="space-y-4 text-sm">
            <div
              v-for="(service, index) in services"
              :key="index"
              class="border-b border-orange-400 pb-2"
            >
              <p class="font-semibold">
                {{ service.title }}
              </p>

              <ul
                v-if="service.items && service.items.length"
                class="list-disc pl-4 mt-2 space-y-1 opacity-90"
              >
                <li
                  v-for="(item, i) in service.items"
                  :key="i"
                >
                  {{ item }}
                </li>
              </ul>
            </div>
          </div>

          <button
            class="w-full mt-6 bg-white text-[#f58220] font-bold py-2 rounded-lg hover:bg-gray-100 transition"
            @click="contactNow"
          >
            Liên hệ ngay
          </button>
        </div>
      </aside>
    </main>
  </div>
</template>

<script>
export default {
  name: "HomePage",

  data() {
    return {
      company: {
        name: "LE VIET NAM",
      },

      menus: [
        {
          name: "Trang Chủ",
          link: "#",
        },
        {
          name: "Giới Thiệu",
          link: "#",
        },
        {
          name: "Dịch Vụ",
          link: "#",
        },
        {
          name: "Đào Tạo",
          link: "#",
        },
        {
          name: "Tin Tức",
          link: "#",
        },
        {
          name: "Liên Hệ",
          link: "#",
        },
      ],

      banner: {
        title: "Đối tác tin cậy của doanh nghiệp",
        description:
          "Chuyên cung cấp các giải pháp toàn diện về tư vấn chiến lược và xúc tiến đầu tư.",
        button: "Khám phá ngay",
        image:
          "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
      },

      about: {
        title: "VỀ LE VIET NAM",

        content1:
          "LE VIET NAM tự hào là đơn vị tư vấn chiến lược hàng đầu, chuyên cung cấp các giải pháp toàn diện về tư vấn xúc tiến đầu tư và hỗ trợ thành lập doanh nghiệp trong nước cũng như quốc tế.",

        content2:
          "Chúng tôi giải quyết mọi thủ tục pháp lý phức tạp và nâng cao năng lực nhân sự, giúp doanh nghiệp phát triển bền vững tại thị trường Việt Nam.",

        image:
          "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80",
      },

      projects: [
        "Dự án 1: Tư vấn thành lập công ty vốn nước ngoài.",
        "Dự án 2: Hỗ trợ xin giấy phép lao động cho chuyên gia.",
        "Dự án 3: Tư vấn tái cấu trúc doanh nghiệp.",
        "Dự án 4: Đào tạo kỹ năng quản lý cho đội ngũ nhân sự.",
      ],

      services: [
        {
          title: "Hỗ trợ tư vấn đầu tư",
          items: [
            "Tư vấn điều kiện ngành nghề",
            "Lựa chọn loại hình công ty",
          ],
        },

        {
          title: "Hỗ trợ thành lập doanh nghiệp",
          items: [],
        },

        {
          title: "Giấy phép lao động - Visa",
          items: [],
        },
      ],
    };
  },

  methods: {
    handleExplore() {
      alert("Khám phá ngay!");
    },

    contactNow() {
      alert("Liên hệ ngay!");
    },
  },
};
</script>

<style scoped>
html {
  scroll-behavior: smooth;
}
</style>