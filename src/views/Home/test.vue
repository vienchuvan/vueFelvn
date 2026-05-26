<template>
  <div class="bg-overlay flex flex-col min-h-screen text-slate-100">

    <!-- HEADER -->
    <header
      class="border-b border-white/5 bg-black/20 backdrop-blur-md sticky top-0 z-50"
    >
      <div
        class="max-w-[1180px] mx-auto px-5 h-[78px] flex items-center justify-between"
      >
        <div
          class="flex items-center space-x-3 cursor-pointer"
          @click="handleLogoClick"
        >
          <div
            class="bg-brand-orange w-10 h-10 rounded-lg flex items-center justify-center font-bold text-white text-xl"
          >
            LV
          </div>

          <div>
            <span class="font-extrabold text-lg text-white">
              LE VIET NAM
            </span>

            <span
              class="block text-[9px] text-gray-400 tracking-widest uppercase"
            >
              Tư vấn & Đầu tư
            </span>
          </div>
        </div>
      </div>
    </header>

    <!-- HERO -->
    <section
      class="w-full bg-gradient-to-r from-brand-navy to-transparent py-16 border-b border-white/10"
    >
      <div class="max-w-[1180px] mx-auto px-5">
        <h1
          class="text-4xl md:text-5xl font-extrabold text-white mb-4"
        >
          Giải Pháp Tư Vấn Chiến Lược Toàn Diện
        </h1>

        <p class="text-gray-300 text-lg max-w-2xl">
          Đồng hành cùng doanh nghiệp phát triển bền vững và
          chinh phục những thị trường quốc tế.
        </p>
      </div>
    </section>

    <!-- MAIN -->
    <main
      class="w-full max-w-[1180px] mx-auto px-5 py-12 flex-grow"
    >
      <div
        class="flex flex-col lg:flex-row gap-10 items-start"
      >

        <!-- CONTENT -->
        <div class="flex-grow space-y-8">
          <div
            class="bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-2xl text-slate-900 border border-white/10 min-h-[1200px]"
          >
            <h2
              class="text-3xl font-extrabold text-brand-orange mb-6"
            >
              Đào Tạo Kỹ Năng Giao Tiếp
            </h2>

            <p>
              Nội dung này được làm dài ra để bạn có thể
              kiểm tra khả năng cuộn trang.
            </p>
          </div>
        </div>

        <!-- SIDEBAR -->
        <aside
          class="w-full lg:w-72 flex-shrink-0 sticky-sidebar"
        >
          <div
            class="bg-[#020617]/80 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-2xl"
          >
            <h4
              class="font-bold text-white uppercase tracking-wider text-sm mb-6 border-b border-white/10 pb-4"
            >
              Danh mục dịch vụ
            </h4>

            <ul class="space-y-4">
              <li
                v-for="cat in categories"
                :key="cat"
                class="text-gray-300 hover:text-brand-orange cursor-pointer transition text-sm flex items-center"
              >
                <i
                  class="fa-solid fa-chevron-right text-[10px] mr-3"
                ></i>

                {{ cat }}
              </li>
            </ul>
          </div>
        </aside>

      </div>
    </main>

    <!-- FOOTER -->
    <footer
      class="bg-[#020617] border-t border-white/10 py-16 mt-10"
    >
      <div
        class="max-w-[1180px] mx-auto px-5 grid grid-cols-1 md:grid-cols-3 gap-12"
      >

        <div>
          <span class="font-extrabold text-lg text-white">
            LE VIET NAM
          </span>
        </div>

        <div>
          <h4
            class="font-bold text-white uppercase text-sm mb-4"
          >
            Liên hệ
          </h4>

          <p class="text-gray-400 text-sm">
            (+84) 999 999 999
          </p>
        </div>

        <div>
          <h4
            class="font-bold text-white uppercase text-sm mb-4"
          >
            Theo dõi
          </h4>

          <a
            href="#"
            class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-orange transition"
          >
            <i class="fa-brands fa-facebook-f"></i>
          </a>
        </div>

      </div>
    </footer>

  </div>
</template>

<script>
export default {
  name: "HomeTest",

  data() {
    return {
      categories: [
        "Đào tạo kỹ năng",
        "Tư vấn đầu tư",
        "Thành lập doanh nghiệp",
        "Hỗ trợ FDI",
        "Pháp lý doanh nghiệp",
      ],
    };
  },

  methods: {
    handleLogoClick() {
      window.location.reload();
    },
  },
};
</script>

<style scoped>
body {
  background-color: #050a14;
  background-image: url("https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000&auto=format&fit=crop");
  background-size: cover;
  background-position: center center;
  background-attachment: fixed;
  min-height: 100vh;
  font-family: "Inter", sans-serif;
}

.bg-overlay {
  background: linear-gradient(
    180deg,
    rgba(5, 11, 34, 0.7) 0%,
    rgba(0, 0, 0, 0.9) 100%
  );
  min-height: 100vh;
}

.sticky-sidebar {
  position: sticky;
  top: 100px;
  align-self: flex-start;
}
</style>