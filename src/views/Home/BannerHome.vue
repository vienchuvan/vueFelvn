<template>
  <section
  class="relative z-0 w-full h-[320px] md:h-[420px] overflow-hidden bg-[#0a203f] animate-in fade-in duration-500 border-b border-white/10"
  >
    <!-- Banner Slides -->
    <div
      v-for="(banner, index) in banners"
      :key="banner.id"
      :class="[
        'absolute inset-0 transition-opacity duration-1000',
        index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0',
      ]"
    >
      <!-- Gradient Overlay -->
      <div
        class="absolute inset-0 bg-gradient-to-r from-black/80 to-black/30 z-10"
      ></div>

      <!-- Background Image -->
      <img
        :src="
          banner.image || (banner.img?.startsWith('https')
            ? banner.img
            : 'https://miraivietnam.com' + banner.img)
        "
        :alt="banner.title"
        class="absolute inset-0 w-full h-full object-cover"
      />

      <!-- Content -->
      <div
        class="relative z-20 h-full flex items-center max-w-7xl mx-auto px-5 md:px-8 w-full"
      >
        <div class="max-w-2xl text-left">
          <!-- Title -->
          <h1
            class="text-[24px] md:text-[34px] lg:text-[42px] font-extrabold text-white leading-tight mb-3"
          >
            <span
              v-for="(word, i) in getTitle(banner)?.split(' ') || []"
              :key="i"
              :class="highlightedWords.includes(word) ? 'text-orange-400' : ''"
            >
              {{ word }}
              <span v-if="i < (getTitle(banner)?.split(' ').length || 0) - 1">
              </span>
            </span>
          </h1>

          <!-- Description -->
          <p
            class="text-[14px] md:text-[16px] text-gray-200 leading-relaxed mb-6 max-w-xl"
          >
            {{ getDescription(banner) }}
          </p>

          <!-- CTA -->
          <button
            @click="$emit('setActiveTab', 'services')"
            class="bg-orange-500 hover:bg-orange-600 text-white text-[14px] font-semibold py-2.5 px-6 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/30 flex items-center gap-2"
          >
            {{ getButtonText() }}

            <svg
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Slider Dots -->
    <div
      class="absolute bottom-5 left-0 right-0 z-30 flex justify-center gap-2"
    >
      <button
        v-for="(_, idx) in banners"
        :key="idx"
        @click="currentSlide = idx"
        :class="[
          'rounded-full transition-all duration-300',
          idx === currentSlide
            ? 'w-6 h-2 bg-orange-500'
            : 'w-2 h-2 bg-white/50 hover:bg-white',
        ]"
      />
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted, defineProps } from 'vue';
import axios from 'axios';

const props = defineProps({
  lang: {
    type: String,
    default: 'vi',
  },
});

const banners = ref([]);
const currentSlide = ref(0);
const sliderTimer = ref(null);

const highlightedWords = ['Đầu', 'Tư', 'FDI', 'Đào', 'Tạo'];

const getTitle = (banner) => {
  if (!banner) return '';
    const lang = props.lang === 'ja' ? 'jp' : props.lang;
  return banner[`title_${lang}`] || banner.title || '';
};

const getDescription = (banner) => {
  if (!banner) return '';

  const lang = props.lang === 'ja' ? 'jp' : props.lang;

  return banner[`desc_${lang}`] || banner.description || banner.desc || '';
};

const getButtonText = () => {
  const texts = {
    vi: 'Khám phá ngay',
    en: 'Discover Now',
    ja: '今すぐ探索'
  };
  return texts[props.lang] || texts.vi;
};

// Fetch banners
const getBanners = async () => {
  try {
    const res = await axios.post('https://miraivietnam.com/api/set-banner', {
      idFun: 114,
    });

    if (res.data.success) {
      banners.value = res.data.data.map((item) => ({
        id: item.id,
        image: item.img?.startsWith('https')
          ? item.img
          : 'https://miraivietnam.com' + item.img,
        img: item.img,
        title_vi: item.title_vi,
        title_en: item.title_en,
        title_jp: item.title_jp,
        title: item.title,
        desc_vi: item.desc_vi,
        desc_en: item.desc_en,
        desc_jp: item.desc_jp,
        description: item.desc,
        desc: item.desc,
      }));
    }
  } catch (error) {
    console.error('Failed to fetch banners:', error);
  }
};

// Auto slide
const startSlider = () => {
  sliderTimer.value = setInterval(() => {
    if (banners.value.length > 0) {
      currentSlide.value =
        (currentSlide.value + 1) % banners.value.length;
    }
  }, 5000);
};

const stopSlider = () => {
  if (sliderTimer.value) {
    clearInterval(sliderTimer.value);
    sliderTimer.value = null;
  }
};

onMounted(() => {
  getBanners();
  startSlider();
});

onUnmounted(() => {
  stopSlider();
});
</script>

<style scoped>
.animate-in {
  animation: fadeIn 0.4s ease;
}

.fade-in {
  opacity: 1;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(8px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>