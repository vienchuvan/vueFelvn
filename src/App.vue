<template>
  <router-view
    :lang="lang"
    @update:lang="lang = $event"
  />
</template>

<script>
export default {
  data() {
    return {
      lang: localStorage.getItem("lang") || "vi",
    };
  },

  watch: {
    lang(val) {
      localStorage.setItem("lang", val);
    },
  },
};
</script>

<style>
#app {
  font-family: "Be Vietnam Pro", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;

}
h2{
  color: #fff !important;
}
body {
  font-family: "Be Vietnam Pro", sans-serif;
}

/* MAIN */
.news-page-bg {
position: relative; 
  min-height: 100vh;
  /* Đảm bảo không có overflow: auto hoặc hidden ở đây */
  overflow: visible !important;
}

/* FIXED BACKGROUND LAYER */
.news-page-bg::before {
  content: "";

  position: fixed;
  inset: 0;
  z-index: -2;
  background: linear-gradient(135deg, #1b8dd6 0%, #0f4f87 45%, #0a2342 100%);
  pointer-events: none;
}

/* TECH OVERLAY */
.news-page-bg::after {
  content: "";
  position: fixed;
  inset: 0;
  z-index: -1;
  opacity: 0.18;
  background-repeat: no-repeat; /* FULL WIDTH */
  background-size: cover; /* CĂN CHUẨN NHƯ MẪU */
  background-position: center;
  pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1920 1080'%3E%3Cdefs%3E%3Cpattern id='wave' width='60' height='20' patternUnits='userSpaceOnUse'%3E%3Cpath d='M0 10 Q15 0 30 10 T60 10' fill='none' stroke='rgba(255,255,255,0.08)' stroke-width='1'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23wave)'/%3E%3Cpath d='M0 180 H320 L420 280 H720 L860 140 H1280' stroke='rgba(255,255,255,0.18)' stroke-width='2' fill='none'/%3E%3Cpath d='M0 360 H220 L320 260 H560 L700 420 H1020' stroke='rgba(255,255,255,0.18)' stroke-width='2' fill='none'/%3E%3Cpath d='M120 640 H520 L660 500 H920 L1080 700 H1480' stroke='rgba(255,255,255,0.18)' stroke-width='2' fill='none'/%3E%3Cpath d='M0 820 H420 L520 720 H860 L980 860 H1380' stroke='rgba(255,255,255,0.18)' stroke-width='2' fill='none'/%3E%3Ccircle cx='420' cy='280' r='8' fill='rgba(255,255,255,0.2)'/%3E%3Ccircle cx='660' cy='500' r='8' fill='rgba(255,255,255,0.2)'/%3E%3Ccircle cx='980' cy='860' r='8' fill='rgba(255,255,255,0.2)'/%3E%3Cg transform='translate(1560,540) scale(5)' opacity='0.55'%3E%3Ccircle cx='0' cy='0' r='52' stroke='rgba(255,255,255,0.28)' stroke-width='0.6' fill='none'/%3E%3Cellipse cx='0' cy='0' rx='20' ry='52' stroke='rgba(255,255,255,0.28)' stroke-width='0.6' fill='none'/%3E%3Cellipse cx='0' cy='0' rx='36' ry='52' stroke='rgba(255,255,255,0.18)' stroke-width='0.6' fill='none'/%3E%3Cellipse cx='0' cy='0' rx='52' ry='18' stroke='rgba(255,255,255,0.28)' stroke-width='0.6' fill='none'/%3E%3Cellipse cx='0' cy='0' rx='52' ry='34' stroke='rgba(255,255,255,0.18)' stroke-width='0.6' fill='none'/%3E%3Cline x1='-52' y1='0' x2='52' y2='0' stroke='rgba(255,255,255,0.28)' stroke-width='0.6'/%3E%3Cline x1='0' y1='-52' x2='0' y2='52' stroke='rgba(255,255,255,0.28)' stroke-width='0.6'/%3E%3C/g%3E%3C/svg%3E");
}
/* CONTENT */
.news-page-bg > * {
  position: relative;
}

</style>
