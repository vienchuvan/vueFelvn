<template>
  <section
    class="relative w-full h-[380px] md:h-[480px] overflow-hidden bg-[#0a203f] animate-in fade-in duration-500 border-b border-white/10"
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
        class="absolute inset-0 bg-gradient-to-r from-black/80 to-black/20 z-10"
      ></div>

      <!-- Background Image -->
      <img
        :src="
          banner.image || (banner.img?.startsWith('https') ? banner.img : 'http://localhost:3000' + banner.img)
        "
        :alt="banner.title"
        class="absolute inset-0 w-full h-full object-cover"
      />

      <!-- Content -->
      <div
        class="relative z-20 h-full flex flex-col justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full"
      >
        <div class="max-w-3xl">
          <!-- Title with highlighted words -->
          <h1
            class="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-4"
          >
            <span
              v-for="(word, i) in banner.title?.split(' ') || []"
              :key="i"
              :class="
                highlightedWords.includes(word)
                  ? 'text-orange-500'
                  : ''
              "
            >
              {{ word }}
              <span v-if="i < (banner.title?.split(' ').length || 0) - 1"> </span>
            </span>
          </h1>

          <!-- Description -->
          <p
            class="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed max-w-2xl"
          >
            {{ banner.description || banner.desc }}
          </p>

          <!-- CTA Button -->
          <div>
            <button
              @click="$emit('setActiveTab', 'services')"
              class="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full transition-all hover:shadow-lg hover:shadow-orange-500/30 flex items-center gap-2 w-fit"
            >
              Khám phá ngay
              <svg
                class="w-5 h-5"
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
    </div>

    <!-- Slider Controls (Dots) -->
    <div class="absolute bottom-6 left-0 right-0 z-30 flex justify-center space-x-2">
      <button
        v-for="(_, idx) in banners"
        :key="idx"
        @click="currentSlide = idx"
        :class="[
          'w-3 h-3 rounded-full transition-all',
          idx === currentSlide
            ? 'bg-orange-500 scale-125'
            : 'bg-white/50 hover:bg-white',
        ]"
      />
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import axios from 'axios';

// defineEmits(['setActiveTab']);

const banners = ref([]);
const currentSlide = ref(0);
const sliderTimer = ref(null);

const highlightedWords = ['Đầu', 'Tư', 'FDI', 'Đào', 'Tạo'];

// Fetch banners from API
const getBanners = async () => {
  try {
    const res = await axios.post('http://localhost:3000/set-banner', {
      idFun: 114,
    });

    if (res.data.success) {
      banners.value = res.data.data.map((item) => ({
        id: item.id,
        image: item.img?.startsWith('https')
          ? item.img
          : 'http://localhost:3000' + item.img,
        img: item.img,
        title: item.title,
        description: item.desc,
      }));
    }
  } catch (error) {
    console.error('Failed to fetch banners:', error);
  }
};

// Auto-slide banners
const startSlider = () => {
  sliderTimer.value = setInterval(() => {
    if (banners.value.length > 0) {
      currentSlide.value = (currentSlide.value + 1) % banners.value.length;
    }
  }, 5000);
};

// Stop auto-slide
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
