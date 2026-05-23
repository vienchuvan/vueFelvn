<template>
  <div class="globe-grid-bg min-h-screen flex flex-col">
 <header class="bg-[#0a203f] text-white border-b border-[#21456f] sticky top-0 z-50">
      <div class="max-w-[1180px] mx-auto px-5">
        <div class="h-[78px] flex items-center justify-between">

          <!-- LOGO -->
          <div class="cursor-pointer" @click="handleLogoClick">
            <div class="flex items-center space-x-3">
              <div class="bg-brand-orange w-10 h-10 rounded-lg flex items-center justify-center font-bold text-white text-xl shadow-md">
                LV
              </div>
              <div>
                <span class="font-extrabold text-lg tracking-wider text-white">LE VIET NAM</span>
                <span class="block text-[9px] text-gray-400 tracking-widest uppercase">Tư vấn & Đầu tư</span>
              </div>
            </div>
          </div>

          <!-- DESKTOP MENU -->
          <div class="hidden lg:flex items-center gap-[30px]">
            <nav class="flex gap-1.5">
              <button
                v-for="item in menuItems"
                :key="item.id"
                @click="handleMenuClick(item.id)"
                :class="[
                  'border-none bg-transparent text-[#d8e0ea] text-sm font-semibold py-2.5 px-4 rounded-xl transition duration-300 hover:bg-white/10',
                  activeTab === item.id ? 'bg-white/10 text-[#ff7b19]' : ''
                ]"
              >
                {{ getMenuLabel(item) }}
              </button>
            </nav>

            <!-- LANG SELECTION -->
            <div class="relative group">
              <button class="flex items-center gap-2 text-white text-sm font-medium focus:outline-none">
                <i class="fa-solid fa-earth-asia text-base"></i>
                <span>{{ currentLangCode }}</span>
              </button>
              <div class="absolute top-[42px] right-0 w-[160px] bg-white rounded-2xl overflow-hidden shadow-2xl hidden group-hover:block border border-gray-100">
                <button
                  v-for="lang in languages"
                  :key="lang.code"
                  @click="handleLanguageChange(lang.code)"
                  :class="[
                    'w-full text-left py-3 px-4 bg-white hover:bg-orange-50 border-none text-slate-800 text-sm transition',
                    currentLang === lang.code ? 'bg-[#fff3ea] text-[#ff6a00] font-bold' : ''
                  ]"
                >
                  {{ lang.label }}
                </button>
              </div>
            </div>
          </div>

          <!-- MOBILE LANG & MENU ICON -->
          <div class="flex lg:hidden items-center gap-3.5">
            <button @click="cycleMobileLanguage" class="flex items-center gap-1.5 text-white text-sm">
              <i class="fa-solid fa-earth-asia text-sm"></i>
              {{ currentLangCode }}
            </button>
            <button @click="mobileMenuOpen = !mobileMenuOpen" class="text-white focus:outline-none">
              <i v-if="mobileMenuOpen" class="fa-solid fa-xmark text-2xl"></i>
              <i v-else class="fa-solid fa-bars text-2xl"></i>
            </button>
          </div>

        </div>
      </div>

      <!-- MOBILE MENU DROPDOWN -->
      <div v-if="mobileMenuOpen" class="lg:hidden p-4 bg-[#0a2a52] space-y-2 border-t border-[#21456f]">
        <button
          v-for="item in menuItems"
          :key="item.id"
          @click="handleMobileMenuClick(item.id)"
          class="w-full text-left text-white bg-white/5 border-none py-3.5 px-4 rounded-xl text-sm"
        >
          {{ getMenuLabel(item) }}
        </button>
      </div>
    </header>

    <!-- MAIN WRAPPER -->
    <main class="w-full max-w-[1180px] mx-auto px-5 py-6 pb-20 flex-grow">
      
      <!-- Slogan mờ phía trên góc trái giống hệt ảnh mẫu -->
      <div class="text-left text-[#94a3b8] text-[13.5px] font-normal mb-4 tracking-wide">
        Đối tác tin cậy vững bước thành công cùng doanh nghiệp.
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">

        <!-- CỘT TRÁI - NỘI DUNG CHÍNH (Động dựa trên Tab hoạt động) -->
        <div class="lg:col-span-8 flex flex-col gap-10">

          <!-- TAB 1: GIỚI THIỆU - "CÂU CHUYỆN CỦA CHÚNG TÔI" (Mặc định mở để hiển thị ảnh mẫu mới) -->
          <div class="space-y-6" v-if="article">

  <h2
    class="text-[25px] font-extrabold text-brand-orange tracking-tight"
  >
    {{ article.title }}
  </h2>

  <!-- ảnh -->
  <img
    v-if="article.img"
    :src="article.img"
    :alt="article.title"
    class="w-full rounded-2xl object-cover shadow-lg"
  />

  <!-- mô tả ngắn -->
  <p
    v-if="article.desc"
    class="text-[#374151] text-[14.5px] leading-[1.8] text-justify font-normal"
  >
    {{ article.desc }}
  </p>

  <!-- nội dung html -->
  <div
    v-if="article.content_vi"
    class="article-content text-[#374151] text-[14.5px] leading-[1.9]"
    v-html="article.content_vi"
  ></div>

</div>
        
   

        </div>

        <!-- CỘT PHẢI - SIDEBAR (Khôi phục chuẩn lề trái và Bullet vuông cam) -->
        <aside class="lg:col-span-4">
          <div class="bg-[#09223e] rounded-[18px] overflow-hidden border border-white/5 shadow-2xl">

            <!-- DỊCH VỤ TITLE -->
            <div class="bg-brand-orange px-6 py-4 flex items-center justify-between">
              <span class="text-white text-[14px] font-extrabold tracking-wider uppercase">
                DỊCH VỤ
              </span>
              <i class="fa-solid fa-gears text-white/70"></i>
            </div>

            <!-- DỊCH VỤ CONTENT -->
            <div class="p-6 space-y-6">
              
              <!-- NHÓM 1 -->
              <div class="space-y-3.5">
                <div class="text-white font-bold text-[14px] text-left flex items-start gap-2">
                  <span class="text-brand-orange font-bold">&gt;</span>
                  <span>Hỗ trợ tư vấn xúc tiến đầu tư</span>
                </div>
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

            <!-- ĐÀO TẠO TITLE -->
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

            <!-- LIÊN HỆ CTA -->
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


export default {
  name: 'TopNav',

  components: {
   
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
article: null,

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
    async fetchArticle() {
  try {
    const res = await axios.post(
      'http://localhost:3000/quantri/baiviet',
      {
        idFun: 115,
        slug: 've-le-viet-nam',
      }
    )

    if (res.data.success) {
      this.article = res.data.data
    }
  } catch (error) {
    console.log('Fetch article error:', error)
  }
},
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
  this.fetchArticle()
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