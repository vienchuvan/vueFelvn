<template>
  <div class="zalo-container">
    <!-- Nút Zalo -->
    <a
      href="https://zalo.me/0325815596"
      target="_blank"
      class="bg-[#0094FF] text-white p-4 rounded-full shadow-lg transition-transform hover:scale-110 zalo-float-btn"
    >
      <img src="@/assets/zalo-icon.png" alt="Zalo" class="w-6 h-6" />
    </a>
  </div>
</template>

<style scoped>
.zalo-container {
  position: fixed;
  bottom: 100px;
  right: 24px;
  z-index: 50;
}

@keyframes pulse-zalo {
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(0, 148, 255, 0.7);
  }
  70% {
    transform: scale(1.05);
    box-shadow: 0 0 0 10px rgba(0, 148, 255, 0);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(0, 148, 255, 0);
  }
}

.zalo-float-btn {
  animation: pulse-zalo 2s infinite;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
</style>
