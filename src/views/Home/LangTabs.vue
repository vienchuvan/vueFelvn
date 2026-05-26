<template>
  <header class="bg-[#0a203f] text-white border-b border-indigo-800/50 sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-20">
        <!-- Logo -->
        <div
          class="flex-shrink-0 flex items-center cursor-pointer select-none py-2"
          @click="handleLogoClick"
        >
          <LogoSVG />
        </div>

        <!-- Desktop Menu & Lang Switcher -->
        <div class="hidden md:flex items-center space-x-1 lg:space-x-4">
          <!-- Navigation Menu -->
          <nav class="flex space-x-1 lg:space-x-2 mr-4">
            <button
              v-for="item in menuItems"
              :key="item.id"
              @click="handleMenuClick(item.id)"
              :class="[
                'px-3 py-2 rounded-md text-sm font-medium transition-colors',
                activeTab === item.id
                  ? 'bg-indigo-900/50 text-orange-400'
                  : 'text-gray-300 hover:text-white hover:bg-indigo-800/30'
              ]"
            >
              {{ getMenuLabel(item) }}
            </button>
          </nav>

          <!-- Language Switcher -->
          <div class="relative group border-l border-indigo-800 pl-4">
            <button
              class="flex items-center space-x-1 text-gray-300 hover:text-white px-2 py-1 rounded-md hover:bg-indigo-800/30 transition-colors"
            >
              <Globe :size="18" />
              <span class="text-sm font-medium">{{ currentLangCode }}</span>
            </button>
            <div
              class="absolute right-0 mt-2 w-28 bg-white rounded-lg shadow-xl hidden group-hover:block z-50 overflow-hidden border border-gray-100"
            >
              <button
                v-for="lang in languages"
                :key="lang.code"
                @click="handleLanguageChange(lang.code)"
                :class="[
                  'block w-full text-left px-4 py-2.5 text-sm transition-colors',
                  currentLang === lang.code
                    ? 'bg-orange-50 text-orange-600 font-bold'
                    : 'text-gray-700 hover:bg-gray-50'
                ]"
              >
                {{ lang.label }}
              </button>
            </div>
          </div>
        </div>

        <!-- Mobile Menu Button -->
        <div class="md:hidden flex items-center space-x-4">
          <button
            @click="cycleMobileLanguage"
            class="text-gray-300 hover:text-white flex items-center gap-1 text-sm font-bold"
          >
            <Globe :size="20" />
            {{ currentLangCode }}
          </button>
          <button
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="text-gray-300 hover:text-white"
          >
            <X v-if="mobileMenuOpen" :size="28" />
            <Menu v-else :size="28" />
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu Panel -->
    <div
      v-if="mobileMenuOpen"
      class="md:hidden bg-[#0f2a4a] border-b border-indigo-800 max-h-[80vh] overflow-y-auto"
    >
      <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        <div v-for="item in menuItems" :key="item.id">
          <button
            @click="handleMobileMenuClick(item.id)"
            :class="[
              'block w-full text-left px-3 py-4 rounded-md text-base font-medium',
              activeTab === item.id
                ? 'bg-indigo-900/50 text-orange-400'
                : 'text-gray-300 hover:text-white hover:bg-indigo-800/30'
            ]"
          >
            {{ getMenuLabel(item) }}
          </button>

          <!-- Submenu for Services -->
          <div
            v-if="item.id === 'services' && item.children && item.children.length > 0"
            class="pl-6 pb-2 space-y-1"
          >
            <div v-for="subItem in item.children" :key="subItem.id">
              <button
                @click="handleMobileMenuClick(subItem.id)"
                class="w-full flex items-start text-left py-2 text-sm text-gray-400 hover:text-white"
              >
                <ChevronRight
                  :size="16"
                  class="text-orange-500 mt-0.5 mr-1 shrink-0"
                />
                <span>{{ getMenuLabel(subItem) }}</span>
              </button>
            </div>
          </div>

          <!-- Submenu for Training -->
          <div
            v-if="item.id === 'training' && item.children && item.children.length > 0"
            class="pl-6 pb-2 space-y-1"
          >
            <button
              v-for="subItem in item.children"
              :key="subItem.id"
              @click="handleMobileMenuClick(subItem.id)"
              class="w-full flex items-start text-left py-2 text-sm text-gray-400 hover:text-white"
            >
              <ChevronRight
                :size="16"
                class="text-orange-500 mt-0.5 mr-1 shrink-0"
              />
              <span>{{ getMenuLabel(subItem) }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import {
  Menu,
  X,
  Globe,
  ChevronRight,
} from 'lucide-vue-next';
 import LogoSVG from '@/components/LogoSVG.vue';

export default {
  name: 'TopNav',
  components: {
    Menu,
    X,
    Globe,
    ChevronRight,
     LogoSVG,
  },
  emits: ['update:activeTab', 'update:lang'],
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
  setup(props, { emit }) {
    const mobileMenuOpen = ref(false);
    const menuItems = ref([]);
    const loading = ref(false);
    const currentLang = ref(props.lang);
    const currentLangCode = ref('VI');

    const languages = ref([
      { code: 'vi', label: '🇻🇳 Tiếng Việt' },
      { code: 'en', label: '🇬🇧 English' },
      { code: 'ja', label: '🇯🇵 日本語' },
    ]);

    const languageMap = {
      vi: 'VI',
      en: 'EN',
      ja: 'JA',
    };

    // Fetch menu data from API
    const fetchMenuData = async () => {
      try {
        loading.value = true;
        const res = await axios.post(
          'http://192.168.0.104:3000/set-menu',
          { idFun: 100 }
        );

        if (res.data.success && res.data.data) {
          menuItems.value = res.data.data;
        }
      } catch (error) {
        console.error('Error fetching menu:', error);
        // Fallback menu structure
        menuItems.value = [
          { id: 'home', name: { vi: 'Trang chủ', en: 'Home', ja: 'ホーム' } },
          { id: 'about', name: { vi: 'Giới thiệu', en: 'About', ja: '紹介' } },
          {
            id: 'services',
            name: { vi: 'Dịch vụ', en: 'Services', ja: 'サービス' },
            children: [],
          },
          {
            id: 'training',
            name: { vi: 'Đào tạo', en: 'Training', ja: 'トレーニング' },
            children: [],
          },
          { id: 'news', name: { vi: 'Tin tức', en: 'News', ja: 'ニュース' } },
          {
            id: 'contact',
            name: { vi: 'Liên hệ', en: 'Contact', ja: '連絡先' },
          },
        ];
      } finally {
        loading.value = false;
      }
    };

    // Get menu label based on current language
    const getMenuLabel = (item) => {
      if (item.name && typeof item.name === 'object') {
        return item.name[currentLang.value] || item.name.en || item.label || '';
      }
      return item.label || '';
    };

    // Handle menu click
    const handleMenuClick = (itemId) => {
      emit('update:activeTab', itemId);
    };

    // Handle mobile menu click
    const handleMobileMenuClick = (itemId) => {
      emit('update:activeTab', itemId);
      mobileMenuOpen.value = false;
    };

    // Handle logo click
    const handleLogoClick = () => {
      emit('update:activeTab', 'home');
    };

    // Handle language change
    const handleLanguageChange = (langCode) => {
      currentLang.value = langCode;
      currentLangCode.value = languageMap[langCode];
      emit('update:lang', langCode);
    };

    // Cycle through languages on mobile
    const cycleMobileLanguage = () => {
      const langs = ['vi', 'en', 'ja'];
      const currentIndex = langs.indexOf(currentLang.value);
      const nextIndex = (currentIndex + 1) % langs.length;
      handleLanguageChange(langs[nextIndex]);
    };

    // Initialize language code
    const initLanguageCode = () => {
      currentLangCode.value = languageMap[currentLang.value];
    };

    onMounted(() => {
      fetchMenuData();
      initLanguageCode();
    });

    return {
      mobileMenuOpen,
      menuItems,
      loading,
      currentLang,
      currentLangCode,
      languages,
      getMenuLabel,
      handleMenuClick,
      handleMobileMenuClick,
      handleLogoClick,
      handleLanguageChange,
      cycleMobileLanguage,
    };
  },
};
</script>

<style scoped>
/* Tailwind classes are applied directly in the template */
</style>
