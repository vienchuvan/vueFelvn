<template>
  <div class="globe-grid-bg min-h-screen flex flex-col">
  <TopNav
      :activeTab="activeTab"> </TopNav>

    <!-- MAIN WRAPPER -->
    <main class="w-full max-w-[1180px] mx-auto px-5 py-6 pb-20 flex-grow">

      <!-- Slogan mờ phía trên góc trái giống hệt ảnh mẫu -->


      <div class="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">

        <!-- CỘT TRÁI - NỘI DUNG CHÍNH (Động dựa trên Tab hoạt động) -->
        <div class="lg:col-span-8 flex flex-col gap-10">

          <!-- TAB 1: GIỚI THIỆU - "CÂU CHUYỆN CỦA CHÚNG TÔI" (Mặc định mở để hiển thị ảnh mẫu mới) -->
          <div class="space-y-6" v-if="article" style="    text-align: left;
    font-family: auto;">

            <h2 class="text-[25px] font-extrabold text-brand-orange tracking-tight">
              {{ article.title }}
            </h2>

            <!-- ảnh -->
            <img v-if="article.img" :src="article.img" :alt="article.title"
              class="w-full rounded-2xl object-cover shadow-lg" />

            <!-- mô tả ngắn -->
            <p v-if="article.desc" class="text-[#374151] text-[14.5px] leading-[1.8] text-justify font-normal">
              {{ article.desc }}
            </p>

            <!-- nội dung html -->
            <div v-if="article.content_vi" class="article-content text-[#374151] text-[14.5px] leading-[1.9]"
              v-html="article.content_vi"></div>

          </div>



        </div>

        <!-- CỘT PHẢI - SIDEBAR (Khôi phục chuẩn lề trái và Bullet vuông cam) -->
        <aside class="lg:col-span-4">
          <RightMenu
            :activeTab="activeTab"
            :lang="lang"
            @update:activeTab="$emit('update:activeTab', $event)"
            @update:lang="$emit('update:lang', $event)"
          />
        </aside>

      </div>
    </main>

  </div>
   <FooterWeb />
</template>

<script>
import axios from 'axios'
import RightMenu from './RightMenu.vue'
import TopNav from './TopNav.vue'
import FooterWeb from "@/views/Home/FooterWeb.vue";
export default {
  name: 'GioiThieu',

components: {
    TopNav,
    RightMenu,
    FooterWeb,
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
    getSlugFromUrl() {
      if (this.$route) {
        if (this.$route.params && this.$route.params.slug) {
          return this.$route.params.slug
        }

        if (this.$route.query) {
          if (this.$route.query.slug) {
            return this.$route.query.slug
          }

          if (this.$route.query.href) {
            try {
              const url = new URL(this.$route.query.href, window.location.origin)
              const hrefSlug = url.pathname.split('/').filter(Boolean).pop()
              return hrefSlug || this.$route.query.href
            } catch (err) {
              return this.$route.query.href
            }
          }
        }

        const pathSlug = (this.$route.path || '').split('/').filter(Boolean).pop()
        if (pathSlug) {
          return pathSlug
        }
      }

      try {
        const url = new URL(window.location.href)
        const querySlug = url.searchParams.get('slug') || url.searchParams.get('href')
        if (querySlug) {
          if (querySlug.includes('/')) {
            try {
              const parsedUrl = new URL(querySlug, window.location.origin)
              const hrefSlug = parsedUrl.pathname.split('/').filter(Boolean).pop()
              return hrefSlug || querySlug
            } catch (err) {
              return querySlug
            }
          }

          return querySlug
        }

        const pathSlug = url.pathname.split('/').filter(Boolean).pop()
        if (pathSlug) {
          return pathSlug
        }
      } catch (error) {
        return null
      }

      return null
    },
    async fetchArticle() {
      try {
     

        const res = await axios.post(
          'http://localhost:3000/quantri/baiviet',
          {
            idFun: 115,
            slug:"gioi-thieu",
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
    linear-gradient(rgba(0, 0, 0, 0.08),
      rgba(0, 0, 0, 0.08)),
    url("https://www.transparenttextures.com/patterns/cubes.png"),
    linear-gradient(135deg,
      #0a4c8b 0%,
      #072f5f 100%);
}

body {
  font-family: 'Inter', sans-serif;
}
</style>