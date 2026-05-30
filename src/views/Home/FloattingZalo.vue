<template>
  <div class="contact-floating">

    <!-- EMAIL -->
    <a
      :href="`mailto:${settings.email || 'info@miraivietnam.com'}`"
      class="contact-btn email"
      title="Email"
    >
      <div class="contact-label">
       {{settings.email || "Chưa cập nhật email"}}
      </div>

        <img
        src="@/assets/mail.png"  style="border-radius: 50%; width: 35px; height: 35px;"
        alt="Email"
      />
    </a>

    <!-- PHONE -->
    <a
      :href="`tel:${settings.hotline || '0325815596'}`"
      class="contact-btn phone" 
      title="Gọi điện"
    >
      <div class="contact-label">
        📞 {{ settings.hotline || "0325 815 596" }}
      </div>

       <img
        src="@/assets/phone.png" style="border-radius: 50%; width: 35px; height: 35px;"
        alt="Phone"
      />
    </a>

    <!-- ZALO -->
    <a
      :href="`${settings.urlZalo || '0325815596'}`"
      target="_blank"
      class="contact-btn zalo"
      title="Chat Zalo"
    >
      <div class="contact-label">
        Zalo: {{ settings.hotline || "0325 815 596" }}
      </div>

      <img
        src="@/assets/zalo-icon.png"
        alt="Zalo"
      />
    </a>

  </div>
</template>
<script>
import axios from "axios";

export default {
  props: {
    lang: {
      type: String,
      default: "vi",
    },
  },

  data() {
    return {
      settings: {
        logo: "",
        hotline: "",
        email: "",
        workingHours: "",
        languages: {
          vi: {},
          en: {},
          ja: {},
        },
      },
    };
  },

  computed: {
    currentLang() {
      return (
        this.settings.languages?.[this.lang] || {}
      );
    },
  },

  mounted() {
    this.getSettings();
  },

  methods: {
    async getSettings() {
      try {
        const res = await axios.post(
          "https://miraivietnam.com/api/setting-home",
          {
            idFun: 100,
          }
        );

        if (res.data.success) {
          this.settings = res.data.data;
        }
      } catch (error) {
        console.log(error);
      }
    },

    getImage(img) {
      if (!img) {
        return "/default-logo.png";
      }

      // nếu đã là http hoặc https
      if (
        img.startsWith("http://") ||
        img.startsWith("https://")
      ) {
        return img;
      }

      // ảnh local server
      return "https://miraivietnam.com" + img;
    },
  },
};
</script>
<style scoped>
/* =========================
   CONTAINER
========================= */
.contact-floating {
  position: fixed;
  right: 24px;
  bottom: 110px;
  z-index: 99999;

  display: flex;
  flex-direction: column;
  gap: 14px;

  animation: fadeUp 0.8s ease;
}

/* =========================
   BUTTON
========================= */
.contact-btn {
  position: relative;

  width: 62px;
  height: 62px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 18px;

  text-decoration: none;

  color: white;

  backdrop-filter: blur(12px);

  box-shadow:
    0 10px 30px rgba(0, 0, 0, 0.18);

  transition: all 0.35s ease;

  overflow: visible;
}

/* Glow */
.contact-btn::before {
  content: "";

  position: absolute;
  inset: 0;

  border-radius: inherit;

  background: rgba(255, 255, 255, 0.15);

  opacity: 0;

  transition: .35s;
}

.contact-btn:hover::before {
  opacity: 1;
}

.contact-btn:hover {
  transform: translateY(-6px) scale(1.08);

  box-shadow:
    0 18px 40px rgba(0, 0, 0, 0.25);
}

/* =========================
   ICON
========================= */
.contact-btn i {
  font-size: 24px;
  transition: .35s;
}

.contact-btn:hover i {
  transform: rotate(-10deg) scale(1.15);
}

.zalo img {
  width: 30px;
  height: 30px;
  transition: .35s;
}

.contact-btn:hover img {
  transform: scale(1.15);
}

/* =========================
   COLORS
========================= */

.email {
  background: linear-gradient(
    135deg,
    #ff7a18,
    #ff512f
  );
}

.phone {
  background: linear-gradient(
    135deg,
    #00c853,
    #00e676
  );
}

.zalo {
  background: linear-gradient(
    135deg,
    #0088ff,
    #00b8ff
  );
}

/* =========================
   FLOATING ANIMATION
========================= */

.contact-btn {
  animation: floating 4s ease-in-out infinite;
}

.contact-btn:nth-child(2) {
  animation-delay: .3s;
}

.contact-btn:nth-child(3) {
  animation-delay: .6s;
}

/* =========================
   PULSE
========================= */

.phone::after,
.zalo::after {
  content: "";

  position: absolute;

  width: 100%;
  height: 100%;

  border-radius: inherit;

  border: 2px solid rgba(255,255,255,.5);

  animation: pulse 2s infinite;
}

/* =========================
   LABEL
========================= */

.contact-label {
  position: absolute;

  right: 78px;
  top: 50%;

  transform:
    translateY(-50%)
    translateX(20px);

  background: #fff;

  color: #111827;

  padding: 12px 18px;

  border-radius: 14px;

  font-size: 14px;
  font-weight: 600;

  white-space: nowrap;

  opacity: 0;
  visibility: hidden;

  transition: all .35s ease;

  box-shadow:
    0 10px 30px rgba(0,0,0,.15);
}

/* Mũi tên */

.contact-label::after {
  content: "";

  position: absolute;

  right: -8px;
  top: 50%;

  transform: translateY(-50%);

  border-left: 8px solid white;
  border-top: 8px solid transparent;
  border-bottom: 8px solid transparent;
}

.contact-btn:hover .contact-label {
  opacity: 1;
  visibility: visible;

  transform:
    translateY(-50%)
    translateX(0);
}

/* =========================
   KEYFRAMES
========================= */

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: .8;
  }

  70% {
    transform: scale(1.7);
    opacity: 0;
  }

  100% {
    opacity: 0;
  }
}

@keyframes floating {
  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-8px);
  }
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* =========================
   MOBILE
========================= */

@media (max-width: 768px) {

  .contact-floating {
    right: 15px;
    bottom: 90px;
  }

  .contact-btn {
    width: 54px;
    height: 54px;
    border-radius: 16px;
  }

  .contact-btn i {
    font-size: 20px;
  }

  .zalo img {
    width: 26px;
    height: 26px;
  }

  /* Mobile không hiện label */
  .contact-label {
    display: none;
  }
}
</style>