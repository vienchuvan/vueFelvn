<template>
  <div class="globe-grid-bg min-h-screen flex flex-col">

    <!-- HEADER -->
    <header
      class="bg-[#0a203f] text-white border-b border-indigo-800/50 sticky top-0 z-50"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-20">

          <!-- LOGO -->
          <div
            class="flex items-center cursor-pointer"
            @click="handleLogoClick"
          >
            <LogoSVG />
          </div>

          <!-- DESKTOP -->
          <div class="hidden md:flex items-center gap-5">

            <!-- MENU -->
            <nav class="flex items-center gap-2">
              <button
                v-for="item in menuItems"
                :key="item.id"
                @click="handleMenuClick(item.id)"
                :class="[
                  'px-4 py-2 rounded-lg transition-all text-sm font-semibold',
                  activeTab === item.id
                    ? 'bg-indigo-900/60 text-orange-400'
                    : 'text-gray-300 hover:bg-indigo-800/40 hover:text-white'
                ]"
              >
                {{ getMenuLabel(item) }}
              </button>
            </nav>

            <!-- LANGUAGE -->
            <div
              class="relative group border-l border-indigo-800 pl-4"
            >
              <button
                class="flex items-center gap-2 text-gray-300 hover:text-white"
              >
                <Globe :size="18" />

                <span class="font-semibold">
                  {{ currentLangCode }}
                </span>
              </button>

              <div
                class="absolute right-0 mt-3 w-36 bg-white rounded-xl shadow-2xl hidden group-hover:block overflow-hidden"
              >
                <button
                  v-for="lang in languages"
                  :key="lang.code"
                  @click="handleLanguageChange(lang.code)"
                  :class="[
                    'w-full px-4 py-3 text-left text-sm transition-all',
                    currentLang === lang.code
                      ? 'bg-orange-50 text-orange-500 font-bold'
                      : 'hover:bg-gray-100 text-gray-700'
                  ]"
                >
                  {{ lang.label }}
                </button>
              </div>
            </div>
          </div>

          <!-- MOBILE -->
          <div class="md:hidden flex items-center gap-4">

            <button
              @click="cycleMobileLanguage"
              class="flex items-center gap-1 text-sm"
            >
              <Globe :size="18" />
              {{ currentLangCode }}
            </button>

            <button
              @click="mobileMenuOpen = !mobileMenuOpen"
            >
              <X v-if="mobileMenuOpen" :size="28" />
              <Menu v-else :size="28" />
            </button>

          </div>

        </div>
      </div>

      <!-- MOBILE MENU -->
      <div
        v-if="mobileMenuOpen"
        class="md:hidden bg-[#0f2a4a]"
      >
        <div class="p-4 space-y-2">

          <button
            v-for="item in menuItems"
            :key="item.id"
            @click="handleMobileMenuClick(item.id)"
            :class="[
              'w-full text-left px-4 py-3 rounded-xl',
              activeTab === item.id
                ? 'bg-indigo-900/60 text-orange-400'
                : 'text-gray-300 hover:bg-indigo-800/40'
            ]"
          >
            {{ getMenuLabel(item) }}
          </button>

        </div>
      </div>
    </header>

    <!-- BANNER -->
    <BannerHome
      @setActiveTab="handleMenuClick"
      :lang="currentLang"
    />

  <!-- MAIN WRAPPER -->
    <main class="w-full max-w-[1180px] mx-auto px-5 py-9 pb-20 flex-grow">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">

        <!-- CỘT TRÁI - NỘI DUNG CHÍNH -->
        <div class="lg:col-span-8 flex flex-col gap-10">

          <!-- GIỚI THIỆU (Nền trắng, bo góc, có thanh dọc cam chuẩn mẫu ảnh 1) -->
          <section class="bg-white rounded-[24px] p-8 md:p-10 shadow-xl transition-all duration-300">
            <div class="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              
              <!-- TEXT -->
              <div class="md:col-span-7 space-y-5">
                <div class="flex items-center space-x-3.5">
                  <!-- Thanh dọc màu cam chuẩn tỉ lệ -->
                  <div class="w-[3px] h-[28px] bg-brand-orange"></div>
                  <h2 class="m-0 text-[24px] font-extrabold text-[#1d2454] tracking-tight">
                    Về LE VIET NAM
                  </h2>
                </div>

                <p class="text-[#4b5563] text-[14px] md:text-[14.5px] leading-[1.9] text-justify font-normal">
                  <strong class="text-[#1d2454] font-bold">LE VIET NAM</strong> tự hào là đơn vị tư vấn chiến lược hàng đầu, chuyên cung cấp các giải pháp toàn diện về tư vấn xúc tiến đầu tư và hỗ trợ thành lập doanh nghiệp trong nước cũng như quốc tế (FDI).
                </p>

                <p class="text-[#4b5563] text-[14px] md:text-[14.5px] leading-[1.9] mt-4 text-justify font-normal">
                  Với đội ngũ chuyên gia giàu kinh nghiệm, chúng tôi cam kết đồng hành cùng doanh nghiệp từ những bước đầu tiên, giải quyết mọi thủ tục pháp lý phức tạp và nâng cao năng lực nhân sự, giúp doanh nghiệp phát triển bền vững tại thị trường Việt Nam.
                </p>

                <div class="pt-2">
                  <button class="text-brand-orange text-[14px] font-bold bg-none border-none p-0 cursor-pointer transition hover:text-orange-600 flex items-center gap-1">
                    Xem chi tiết <span class="text-[11px] font-extrabold">&gt;</span>
                  </button>
                </div>
              </div>

              <!-- IMAGE (Hai người đập tay ăn mừng vui vẻ theo đúng ảnh mẫu gốc) -->
              <div class="md:col-span-5">
                <div class="rounded-2xl overflow-hidden shadow-md">
                  <img
                    src="https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=800"
                    class="w-full h-52 md:h-60 object-cover"
                    onerror="this.src='https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800'"
                    alt="LE VIET NAM đập tay hợp tác thành công"
                  />
                </div>
              </div>

            </div>
          </section>

          <!-- DỊCH VỤ NỔI BẬT -->
          <section class="space-y-6">
            <div class="flex justify-between items-center">
              <div class="flex items-center space-x-3.5">
                <!-- Thanh dọc màu cam chuẩn mẫu -->
                <div class="w-[3px] h-[28px] bg-brand-orange"></div>
                <h2 class="text-[24px] font-extrabold text-white tracking-tight">
                  Dịch Vụ Nổi Bật
                </h2>
              </div>
              <button class="text-[#94a3b8] font-bold text-xs bg-none border-none cursor-pointer transition hover:text-white flex items-center gap-1">
                Xem tất cả <span class="text-[10px]">&gt;</span>
              </button>
            </div>

            <!-- GRID DỊCH VỤ (Không có các nút đăng ký thừa thãi, chuẩn thiết kế sạch sẽ) -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div
                v-for="service in featuredServices"
                :key="service.id"
                class="bg-white rounded-3xl overflow-hidden shadow-lg transition duration-300 hover:-translate-y-1"
              >
                <div class="h-44 overflow-hidden">
                  <img :src="service.image" class="w-full h-full object-cover" :alt="service.title" />
                </div>
                <div class="p-6">
                  <div class="flex items-center gap-2.5 mb-3.5">
                    <i :class="[service.icon, 'text-brand-orange text-lg']"></i>
                    <h3 class="text-[#1d2454] text-[16px] font-extrabold m-0 leading-tight">
                      {{ service.title }}
                    </h3>
                  </div>
                  <p class="text-[#6b7280] text-[13px] leading-[1.8] font-normal">
                    {{ service.desc }}
                  </p>
                </div>
              </div>
            </div>
          </section>

        </div>

        <!-- CỘT PHẢI - SIDEBAR (Khôi phục chuẩn lề trái và Bullet vuông cam) -->
        <aside class="lg:col-span-4">
          <div class="bg-[#09223e] rounded-[18px] overflow-hidden border border-white/5 shadow-2xl">

            <!-- DỊCH VỤ TITLE (Khối Cam nổi bật rực rỡ như ảnh 1) -->
            <div class="bg-brand-orange px-6 py-4 flex items-center justify-between">
              <span class="text-white text-[14px] font-extrabold tracking-wider uppercase">
                DỊCH VỤ
              </span>
              <i class="fa-solid fa-gears text-white/70"></i>
            </div>

            <!-- DỊCH VỤ CONTENT (Căn lề trái thẳng, dấu vuông đầu dòng chuẩn chỉnh) -->
            <div class="p-6 space-y-6">
              
              <!-- NHÓM 1 -->
              <div class="space-y-3.5">
                <div class="text-white font-bold text-[14px] text-left flex items-start gap-2">
                  <span class="text-brand-orange font-bold">&gt;</span>
                  <span>Hỗ trợ tư vấn xúc tiến đầu tư</span>
                </div>
                <!-- Toàn bộ danh sách căn lề trái thẳng, không bị lệch lề hay căn giữa -->
                <ul class="list-none p-0 m-0 pl-[18px] space-y-2.5 text-left">
                  <li v-for="item in subServices.investment" :key="item"
                      class="text-[#d1d5db] text-[12.5px] leading-relaxed cursor-pointer hover:text-brand-orange transition-colors relative pl-3.5 before:content-[''] before:w-1 before:h-1 before:bg-brand-orange before:absolute before:left-0 before:top-[8px]">
                    {{ item }}
                  </li>
                </ul>
              </div>

              <!-- NHÓM 2 -->
              <div class="space-y-3.5">
                <div class="text-white font-bold text-[14px] text-left flex items-start gap-2">
                  <span class="text-brand-orange font-bold">&gt;</span>
                  <span>Hỗ trợ thành lập doanh nghiệp</span>
                </div>
                <ul class="list-none p-0 m-0 pl-[18px] space-y-2.5 text-left">
                  <li v-for="item in subServices.setup" :key="item"
                      class="text-[#d1d5db] text-[12.5px] leading-relaxed cursor-pointer hover:text-brand-orange transition-colors relative pl-3.5 before:content-[''] before:w-1 before:h-1 before:bg-brand-orange before:absolute before:left-0 before:top-[8px]">
                    {{ item }}
                  </li>
                </ul>
              </div>

              <!-- NHÓM 3 -->
              <div class="space-y-3.5">
                <div class="text-white font-bold text-[14px] text-left flex items-start gap-2">
                  <span class="text-brand-orange font-bold">&gt;</span>
                  <span>Giấy phép lao động - Visa - Thẻ tạm trú</span>
                </div>
                <ul class="list-none p-0 m-0 pl-[18px] space-y-2.5 text-left">
                  <li v-for="item in subServices.visa" :key="item"
                      class="text-[#d1d5db] text-[12.5px] leading-relaxed cursor-pointer hover:text-brand-orange transition-colors relative pl-3.5 before:content-[''] before:w-1 before:h-1 before:bg-brand-orange before:absolute before:left-0 before:top-[8px]">
                    {{ item }}
                  </li>
                </ul>
              </div>
            </div>

            <!-- ĐÀO TẠO TITLE (Khối Cam nổi bật) -->
            <div class="bg-brand-orange px-6 py-4 border-t border-white/5 flex items-center justify-between">
              <span class="text-white text-[14px] font-extrabold tracking-wider uppercase">
                ĐÀO TẠO
              </span>
              <i class="fa-solid fa-graduation-cap text-white/70"></i>
            </div>

            <!-- ĐÀO TẠO CONTENT -->
            <div class="p-6">
              <div class="text-white font-bold text-[14px] text-left flex items-start gap-2 leading-relaxed">
                <span class="text-brand-orange font-bold">&gt;</span>
                <span class="cursor-pointer hover:text-brand-orange transition-colors">
                  Đào tạo kỹ năng giao tiếp tại nơi làm việc
                </span>
              </div>
            </div>

            <!-- LIÊN HỆ CTA (Căn giữa hoàn chỉnh, Nút Cam nổi bật đúng hình ảnh mẫu 1) -->
            <div class="bg-[#05172b] p-6 text-center border-t border-white/10 space-y-4">
              <p class="text-[#9ca3af] text-[13px] mb-2 font-medium">Cần tư vấn ngay?</p>
              <button class="w-full py-3 px-4 bg-brand-orange hover:bg-orange-600 text-white font-bold rounded-xl transition duration-300 shadow-md flex items-center justify-center gap-2 text-sm">
                <i class="fa-solid fa-phone"></i>
                Liên hệ chúng tôi
              </button>
            </div>

          </div>
        </aside>

      </div>
    </main>
  </div>
</template>

<script>
import axios from 'axios'

import {
  Menu,
  X,
  Globe,
} from 'lucide-vue-next'

import LogoSVG from '@/components/LogoSVG.vue'
import BannerHome from './BannerHome.vue'

export default {
  name: 'TopNav',

  components: {
    Menu,
    X,
    Globe,
    LogoSVG,
    BannerHome,
  },

  props: {
    activeTab: {
      type: String,
      default: 'home',
    },

    lang: {
      type: String,
      default: 'vi',
    },
  },

  emits: ['update:activeTab', 'update:lang'],

  data() {
    return {
      mobileMenuOpen: false,

      loading: false,

      currentLang: this.lang,

      currentLangCode: 'VI',


    menuItems: [
            {
              id: 'home',
              name: {
                vi: 'Trang chủ',
                en: 'Home',
                ja: 'トップページ'
              }
            },
            {
              id: 'about',
              name: {
                vi: 'Giới thiệu',
                en: 'About',
                ja: '紹介'
              }
            },
            {
              id: 'services',
              name: {
                vi: 'Dịch vụ',
                en: 'Services',
                ja: 'サービス'
              }
            },
            {
              id: 'contact',
              name: {
                vi: 'Liên hệ',
                en: 'Contact',
                ja: '連絡先'
              }
            }
          ],
          languages: [
            { code: 'vi', label: '🇻🇳 Tiếng Việt' },
            { code: 'en', label: '🇬🇧 English' },
            { code: 'ja', label: '🇯🇵 日本語' }
          ],
          languageMap: {
            vi: 'VI',
            en: 'EN',
            ja: 'JA'
          },

       featuredServices: [
            {
              id: 1,
              title: 'Xúc Tiến Đầu Tư',
              desc: 'Hỗ trợ trọn gói các thủ tục pháp lý, tối ưu hóa thời gian và chi phí cho nhà đầu tư.',
              icon: 'fa-solid fa-earth-americas',
              image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200'
            },
            {
              id: 2,
              title: 'Thành Lập Doanh Nghiệp',
              desc: 'Hỗ trợ trọn gói các thủ tục pháp lý, tối ưu hóa thời gian và chi phí cho nhà đầu tư.',
              icon: 'fa-solid fa-briefcase',
              image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200'
            },
            {
              id: 3,
              title: 'Visa & Thẻ Tạm Trú',
              desc: 'Hỗ trợ trọn gói các thủ tục pháp lý, tối ưu hóa thời gian và chi phí cho nhà đầu tư.',
              icon: 'fa-solid fa-file-invoice',
              image: 'https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?q=80&w=1200'
            }
          ],
            subServices: {
            investment: [
              'Tư vấn điều kiện ngành nghề',
              'Lựa chọn loại hình công ty',
              'Đăng ký địa điểm, trụ sở, vốn',
              'Hướng dẫn chuẩn bị hồ sơ',
              'Soạn thảo hồ sơ thành lập',
              'Đại diện làm thủ tục tại CQNN'
            ],
            setup: [
              'Dịch vụ tư vấn thành lập Công ty/Doanh nghiệp',
              'Dịch vụ hỗ trợ thay đổi nội dung đăng ký kinh doanh'
            ],
            visa: [
              'Visa Việt Nam cho người nước ngoài',
              'Thẻ tạm trú cho người nước ngoài',
              'Giấy phép lao động cho người nước ngoài làm việc tại Việt Nam'
            ]
          }
    }
  },

  methods: {
    async fetchMenuData() {
      try {
        this.loading = true

        const res = await axios.post(
          'http://localhost:3000/set-menu',
          {
            idFun: 100,
          }
        )

        if (res.data.success) {
          this.menuItems = res.data.data
        }
      } catch (error) {
        console.log(error)

        this.menuItems = [
          {
            id: 'home',
            name: {
              vi: 'Trang chủ',
              en: 'Home',
            },
          },

          {
            id: 'about',
            name: {
              vi: 'Giới thiệu',
              en: 'About',
            },
          },

          {
            id: 'services',
            name: {
              vi: 'Dịch vụ',
              en: 'Services',
            },
          },

          {
            id: 'contact',
            name: {
              vi: 'Liên hệ',
              en: 'Contact',
            },
          },
        ]
      } finally {
        this.loading = false
      }
    },

    getMenuLabel(item) {
      if (item.name && typeof item.name === 'object') {
        return (
          item.name[this.currentLang] ||
          item.name.en ||
          ''
        )
      }

      return item.label || ''
    },

    handleMenuClick(itemId) {
      this.$emit('update:activeTab', itemId)
    },

    handleMobileMenuClick(itemId) {
      this.$emit('update:activeTab', itemId)

      this.mobileMenuOpen = false
    },

    handleLogoClick() {
      this.$emit('update:activeTab', 'home')
    },

    handleLanguageChange(langCode) {
      this.currentLang = langCode

      this.currentLangCode =
        this.languageMap[langCode]

      this.$emit('update:lang', langCode)
    },

    cycleMobileLanguage() {
      const langs = ['vi', 'en', 'ja']

      const currentIndex = langs.indexOf(
        this.currentLang
      )

      const nextIndex =
        (currentIndex + 1) % langs.length

      this.handleLanguageChange(
        langs[nextIndex]
      )
    },

    initLanguageCode() {
      this.currentLangCode =
        this.languageMap[this.currentLang]
    },
  },

  mounted() {
    this.fetchMenuData()

    this.initLanguageCode()
  },
}
</script>

<style scoped>
.globe-grid-bg {
  min-height: 100vh;

  background:
    linear-gradient(
      rgba(0, 0, 0, 0.08),
      rgba(0, 0, 0, 0.08)
    ),
    url("https://www.transparenttextures.com/patterns/cubes.png"),
    linear-gradient(
      135deg,
      #0a4c8b 0%,
      #072f5f 100%
    );
}

body {
  font-family: 'Inter', sans-serif;
}
</style>