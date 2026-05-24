<template>
  <div
    class="min-h-screen bg-slate-50 flex font-sans text-gray-900 selection:bg-blue-500 selection:text-white"
  >
    <!-- LOGIN -->
    <div
      v-if="!isAuthenticated"
      class="min-h-screen w-full bg-slate-100 flex items-center justify-center p-4 relative overflow-hidden"
    >
      <div
        class="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none bg-gradient-to-br from-[#1b8dd6] to-[#0a2342]"
      ></div>

      <div
        class="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 md:p-10 relative z-10 border border-gray-100"
      >
        <div class="text-center mb-8">
          <div
            class="inline-block bg-[#0a203f] text-white font-black px-4 py-2 rounded-lg text-2xl tracking-widest mb-4"
          >
            LE VIET NAM
          </div>

          <h1 class="text-xl font-bold text-gray-800">Đăng Nhập CMS</h1>

          <p class="text-gray-500 text-sm mt-2">Hệ thống quản trị nội dung website</p>
        </div>

        <form @submit.prevent="login" class="space-y-5">
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-1">
              Tài khoản (Email)
            </label>

            <input
              type="text"
              required
              value="admin@levietnam.com.vn"
              class="w-full border border-gray-300 rounded-xl p-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-sm"
            />
          </div>

          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-1">
              Mật khẩu
            </label>

            <input
              type="password"
              required
              value="admin123"
              class="w-full border border-gray-300 rounded-xl p-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-sm"
            />
          </div>

          <button
            type="submit"
            class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all"
          >
            Vào Trang Quản Trị
          </button>
        </form>
      </div>
    </div>

    <!-- MAIN -->
    <template v-else>
      <!-- SIDEBAR -->
      <aside
        class="w-64 bg-[#0a203f] text-gray-300 flex flex-col fixed h-full z-20 shadow-2xl"
      >
        <div
          class="h-16 flex items-center justify-center border-b border-white/10 shrink-0"
        >
          <span class="text-white font-black tracking-widest text-xl">
            LE VIET NAM
            <span class="text-orange-500">CMS</span>
          </span>
        </div>

        <div class="flex-1 overflow-y-auto py-6 px-4 space-y-1">
          <template v-for="(item, idx) in SIDEBAR_ITEMS" :key="idx">
            <div v-if="item.type === 'divider'" class="h-px bg-white/10 my-4 mx-2"></div>

            <button
              v-else
              @click="setMenu(item.id)"
              class="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-medium text-sm"
              :class="
                activeMenu === item.id
                  ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20'
                  : 'hover:bg-white/10 hover:text-white'
              "
            >
              <component
                :is="item.icon"
                size="18"
                :class="activeMenu === item.id ? 'text-white' : 'text-gray-400'"
              />

              {{ item.label }}
            </button>
          </template>
        </div>

        <div
          class="p-4 border-t border-white/10 text-xs text-center text-gray-500 shrink-0"
        >
          Hệ thống quản trị v1.0
        </div>
      </aside>

      <!-- RIGHT -->
      <div class="flex-1 ml-64 flex flex-col min-w-0">
        <!-- HEADER -->
        <header
          class="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-10 shrink-0"
        >
          <div class="font-medium text-gray-500 flex items-center gap-2">
            Admin Panel

            <ChevronRight size="14" />

            <span class="text-gray-900 font-bold">
              {{ getMenuLabel() }}
            </span>
          </div>

          <div class="flex items-center gap-4">
            <button
              class="relative p-2 text-gray-400 hover:text-blue-600 transition-colors"
            >
              <Bell size="20" />

              <span
                class="absolute top-1 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"
              ></span>
            </button>

            <div
              class="flex items-center gap-2 pl-4 border-l border-gray-200 cursor-pointer"
            >
              <div
                class="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm"
              >
                AD
              </div>

              <span class="text-sm font-bold text-gray-700"> Administrator </span>

              <ChevronDown size="14" class="text-gray-400" />
            </div>

            <button
              @click="logout"
              class="ml-2 flex items-center gap-1 text-sm text-red-500 hover:text-red-700 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors font-medium"
            >
              <LogOut size="16" />
              Đăng xuất
            </button>
          </div>
        </header>

        <!-- CONTENT -->
        <main class="flex-1 p-8 overflow-x-hidden">
          <!-- DASHBOARD -->
          <div v-if="activeMenu === 'dashboard'" class="space-y-6" style="display: none" >
            <h2 class="text-2xl font-bold text-gray-800">Tổng quan hệ thống</h2>

            <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div class="flex items-center gap-4">
                  <div class="p-4 rounded-lg bg-orange-100 text-orange-500">
                    <Mail size="24" />
                  </div>

                  <div>
                    <p class="text-sm text-gray-500 font-medium">Yêu cầu liên hệ mới</p>

                    <p class="text-2xl font-bold text-gray-800">12</p>
                  </div>
                </div>
              </div>

              <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div class="flex items-center gap-4">
                  <div class="p-4 rounded-lg bg-blue-100 text-blue-500">
                    <FileText size="24" />
                  </div>

                  <div>
                    <p class="text-sm text-gray-500 font-medium">Bài viết đang có</p>

                    <p class="text-2xl font-bold text-gray-800">86</p>
                  </div>
                </div>
              </div>

              <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div class="flex items-center gap-4">
                  <div class="p-4 rounded-lg bg-green-100 text-green-500">
                    <Users size="24" />
                  </div>

                  <div>
                    <p class="text-sm text-gray-500 font-medium">Lượt truy cập</p>

                    <p class="text-2xl font-bold text-gray-800">12.4K</p>
                  </div>
                </div>
              </div>

              <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div class="flex items-center gap-4">
                  <div class="p-4 rounded-lg bg-purple-100 text-purple-500">
                    <Briefcase size="24" />
                  </div>

                  <div>
                    <p class="text-sm text-gray-500 font-medium">Dịch vụ đang chạy</p>

                    <p class="text-2xl font-bold text-gray-800">8</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- CONTACTS -->
          <div v-if="activeMenu === 'contacts'" class="space-y-6">
            <Contact />
          </div>

          <!-- ARTICLES -->
          <div
            v-if="
              activeMenu === 'news' ||
              activeMenu === 'page_about' ||
              activeMenu === 'page_services' ||
              activeMenu === 'page_training'
            "
            class="space-y-6"
          >
            <!-- Editor View -->

            <ArticleEditor
              v-if="showEditor"
              :article="editingArticle"
              :title="editingTitle"
              :category="getCategoryFromMenu()"
              @back="showEditor = false"
              @save="saveArticle"
            />

            <!-- List View -->
            <template v-else>
              <div class="flex justify-between items-center">
                <h2 class="text-2xl font-bold text-gray-800">Quản lý bài viết</h2>

                <button
                  @click="addNewArticle"
                  class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg font-medium flex items-center gap-2"
                >
                  <Plus :size="18" />
                  Thêm bài viết
                </button>
              </div>

              <div
                class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
              >
                <table class="w-full text-left border-collapse">
                  <thead>
                    <tr class="bg-gray-50 text-gray-500 text-sm border-b border-gray-200">
                      <th class="p-4">Ảnh</th>
                      <th class="p-4">Tiêu đề</th>
                      <th class="p-4">Trạng thái</th>
                      <th class="p-4">Ngày đăng</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr
                      v-for="news in currentItems"
                      :key="news.id"
                      class="border-b border-gray-50 hover:bg-blue-50/30 transition-colors"
                    >
                      <td class="p-4">
                        <img :src="news.img" class="w-16 h-10 rounded object-cover" />
                      </td>

                      <td class="p-4">
                        <p class="font-bold text-gray-800">
                          {{ news.title?.vi }}
                        </p>

                        <p class="text-xs text-gray-400 mt-1">
                          EN:
                          {{ news.title?.en }}
                        </p>
                      </td>

                      <td class="p-4">
                        <span
                          class="px-2.5 py-1 rounded-md text-xs font-bold"
                          :class="
                            news.status === 'published'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-gray-100 text-gray-600'
                          "
                        >
                          {{ news.status === "published" ? "Đã đăng" : "Bản nháp" }}
                        </span>
                      </td>

                      <td class="p-4 text-sm text-gray-600">
                        {{ news.date }}
                      </td>

                      <td class="p-4 flex justify-end gap-2 items-center h-full">
                        <button
                          @click="editArticle(news)"
                          class="p-1.5 text-blue-600 hover:bg-blue-100 rounded border border-transparent hover:border-blue-200 transition-all"
                        >
                          <Edit :size="18" />
                        </button>
                        <button
                          @click="deleteArticle(news)"
                          class="p-1.5 text-red-500 hover:bg-red-50 rounded border border-transparent hover:border-red-200 transition-all"
                        >
                          <Trash2 :size="18" />
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <!-- PAGINATION -->
                <div
                  class="p-4 border-t border-gray-100 flex items-center justify-between"
                >
                  <p class="text-sm text-gray-500">
                    Trang {{ currentPage }} /
                    {{ totalPages }}
                  </p>

                  <div class="flex gap-2">
                    <button @click="prevPage" class="px-3 py-1 border rounded">
                      Trước
                    </button>

                    <button @click="nextPage" class="px-3 py-1 border rounded">
                      Sau
                    </button>
                  </div>
                </div>
              </div>
            </template>
          </div>

          <!-- MENU MANAGER -->
          <div v-if="activeMenu === 'menus'" class="space-y-6 animate-in fade-in">
            <QuanTriMenu> </QuanTriMenu>
          </div>
          <div v-if="activeMenu === 'settings'" class="space-y-6 animate-in fade-in">
            <CaiDatChung />
          </div>
        </main>
      </div>
    </template>
  </div>
</template>
<script>
import {
  LayoutDashboard,
  Settings,
  FileText,
  Users,
  Mail,
  Menu as MenuIcon,
  Image as ImageIcon,
  Plus,
  Edit,
  Trash2,
  Search,
  Bell,
  ChevronDown,
  Save,
  Globe,
  ChevronRight,
  CheckCircle,
  XCircle,
  Briefcase,
  Phone,
  Code,
  Eye,
  LogOut,
  GraduationCap,
} from "lucide-vue-next";
import Contact from "./QuanTri/contact.vue";
import ArticleEditor from "./QuanTri/ArticleEditor.vue";
import QuanTriMenu from "./QuanTri/QuanTriMenu.vue";
import CaiDatChung from "./QuanTri/CaiDatChung.vue";

export default {
  name: "AdminApp",

  components: {
    Contact,
    ArticleEditor,
    QuanTriMenu,
    CaiDatChung,
    LayoutDashboard,
    Settings,
    FileText,
    Users,
    Mail,
    MenuIcon,
    ImageIcon,
    Plus,
    Edit,
    Trash2,
    Search,
    Bell,
    ChevronDown,
    Save,
    Globe,
    ChevronRight,
    CheckCircle,
    XCircle,
    Briefcase,
    Phone,
    Code,
    Eye,
    LogOut,
    GraduationCap,
  },

  data() {
    return {
      activeMenu: "contacts",
      isAuthenticated: false,

      lang: "vi",
      editorMode: "visual",
      currentPage: 1,
      view: "list",

      loading: false,
      error: null,

      itemsPerPage: 10,

      // Editor state
      showEditor: false,
      editingArticle: null,
      editingTitle: "Bài viết",

      SIDEBAR_ITEMS: [
        // { id: "dashboard", label: "Tổng quan", icon: "LayoutDashboard" },
        { id: "contacts", label: "Quản lý Liên hệ", icon: "Mail" },
        { type: "divider" },
        { id: "page_about", label: "Trang Giới thiệu", icon: "FileText" },
        { id: "page_services", label: "Trang Dịch vụ", icon: "Briefcase" },
        { id: "page_training", label: "Trang Đào tạo", icon: "GraduationCap" },
        { id: "news", label: "Trang Tin tức", icon: "Edit" },
        { type: "divider" },
        { id: "menus", label: "Cấu trúc Menu", icon: "MenuIcon" },
        { id: "settings", label: "Cài đặt chung", icon: "Settings" },
      ],
      langs: [
        { value: "vi", label: "🇻🇳 Tiếng Việt" },
        { value: "en", label: "🇬🇧 English" },
        { value: "ja", label: "🇯🇵 日本語" },
      ],

      articles: [],
    };
  },

  computed: {
    currentItems() {
      const indexOfLastItem = this.currentPage * this.itemsPerPage;
      const indexOfFirstItem = indexOfLastItem - this.itemsPerPage;

      return this.articles.slice(indexOfFirstItem, indexOfLastItem);
    },

    totalPages() {
      return Math.max(1, Math.ceil(this.articles.length / this.itemsPerPage));
    },
  },

  mounted() {
    this.loadLoginInfo();
    this.fetchArticles();
  },

  methods: {
    login() {
      const email =
        document.querySelector('input[type="text"]')?.value || "admin@levietnam.com.vn";
      const password =
        document.querySelector('input[type="password"]')?.value || "admin123";

      this.isAuthenticated = true;
      this.saveLoginInfo(email, password);
    },

    logout() {
      this.isAuthenticated = false;
      this.clearLoginInfo();
    },

    saveLoginInfo(email, password) {
      localStorage.setItem("adminEmail", email);
      localStorage.setItem("adminPassword", password);
      localStorage.setItem("isAdminLogged", "true");
    },

    clearLoginInfo() {
      localStorage.removeItem("adminEmail");
      localStorage.removeItem("adminPassword");
      localStorage.removeItem("isAdminLogged");
    },

    loadLoginInfo() {
      const isLogged = localStorage.getItem("isAdminLogged") === "true";
      if (isLogged) {
        this.isAuthenticated = true;
      }
    },

    setMenu(menu) {
      this.activeMenu = menu;

      const category = this.getCategoryFromMenu();
      this.fetchArticles(category, "");
      console.log("Menu changed to:", menu, "Category:", category);
    },

    async fetchArticles(cate = "service", title = "Tin tức") {
      try {
        const body = {
          idFun: 114,
          cate,
        };

        const response = await fetch("http://localhost:3000/quantri/baiviet", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });

        if (!response.ok) {
          throw new Error(`API returned ${response.status}`);
        }

        const data = await response.json();
        console.log("data", data);

        const list = Array.isArray(data) ? data : data.data || data.items || [];
        this.articles = list.map((item) => ({
          id: item.id ?? item._id ?? Math.random(),

          title:
            typeof item.title_vi === "string"
              ? {
                  vi: item.title_vi,
                  en: item.title_en,
                  jp: item.title_jp,
                }
              : item.title ?? {
                  vi: "Tiêu đề không xác định",
                  en: "Untitled",
                  jp: "タイトル未定",
                },

          desc:
            typeof item.desc_vi === "string"
              ? {
                  vi: item.desc_vi,
                  en: item.desc_en,
                  jp: item.desc_jp,
                }
              : item.desc ?? {
                  vi: "Tiêu đề không xác định",
                  en: "Untitled",
                  jp: "タイトル未定",
                },

          content:
            typeof item.content_vi === "string"
              ? {
                  vi: item.content_vi,
                  en: item.content_en,
                  jp: item.content_jp,
                }
              : item.content ?? {
                  vi: "Tiêu đề không xác định",
                  en: "Untitled",
                  jp: "タイトル未定",
                },

          views: item.views ?? 0,
          status: item.status ?? "draft",
          date: item.created_at ?? item.created_at ?? "",

          img: item.thumbnail
            ? item.thumbnail.startsWith("http://") ||
              item.thumbnail.startsWith("https://")
              ? item.thumbnail
              : "http://localhost:3000" + item.thumbnail
            : require("@/assets/image.png"),
        }));
        console.log("Fetched articles:", this.articles);

        this.currentPage = 1;
      } catch (err) {
        console.warn(err);

        this.articles = Array.from({ length: 45 }).map((_, i) => ({
          id: i + 1,

          title: {
            vi: `[${title}] - Nội dung mẫu bài viết số ${45 - i}`,
            en: `[${title}] - Sample Content ${45 - i}`,
          },

          views: 100 + i * 5,

          status: i % 4 === 0 ? "draft" : "published",

          date: "15/05/2024",

          img:
            "https://images.unsplash.com/photo-1497366216548-37526070297c?w=100&q=80&auto=format&fit=crop",
        }));
      }
    },

    prevPage() {
      this.currentPage = Math.max(1, this.currentPage - 1);
    },

    nextPage() {
      this.currentPage = Math.min(this.totalPages, this.currentPage + 1);
    },

    gotoPage(page) {
      this.currentPage = page;
    },

    changeView(view) {
      this.view = view;
    },

    changeEditorMode(mode) {
      this.editorMode = mode;
    },

    changeLang(lang) {
      this.lang = lang;
    },

    addNewArticle() {
      this.editingArticle = null;
      this.editingTitle = this.getMenuLabel();
      this.showEditor = true;
      const category = this.getCategoryFromMenu();
      console.log("Adding new article for category:", category);
    },

    editArticle(article) {
      this.editingArticle = article;
      this.editingTitle = this.getMenuLabel();
      this.showEditor = true;
    },
    getCategoryFromMenu() {
      const menuToCategoryMap = {
        page_about: "about",
        page_services: "service",
        page_training: "training",
        news: "news",
      };
      return menuToCategoryMap[this.activeMenu] || "service";
    },
    saveArticle(formData) {
      console.log("Saving:", formData);
      // TODO: Send to API
      this.showEditor = false;
    },

    async deleteArticle(article) {
      const confirmed = confirm(
        `❓ Bạn chắc chắn muốn xóa bài viết:\n"${
          article.title?.vi || "Không xác định"
        }"\n\nHành động này không thể hoàn tác!`
      );

      if (!confirmed) return;

      try {
        const payload = {
          idFun: 113,
          id: article.id,
        };

        const response = await fetch("http://localhost:3000/quantri/baiviet", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        const data = await response.json();
        console.log(data);

        if (!response.ok) {
          throw new Error(data.message || "Xóa bài viết thất bại");
        }

        alert("✅ Xóa bài viết thành công");
        // Refresh danh sách
        const category = this.getCategoryFromMenu();
        this.fetchArticles(category, "");
      } catch (err) {
        console.error(err);
        alert("❌ " + err.message);
      }
    },

    getMenuLabel() {
      const found = this.SIDEBAR_ITEMS.find((i) => i.id === this.activeMenu);

      return found?.label || "Tổng quan";
    },
  },
};
</script>
