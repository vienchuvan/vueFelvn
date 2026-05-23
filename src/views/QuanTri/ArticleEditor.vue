<template>
    <div class="space-y-6">

        <!-- HEADER -->
        <div class="flex justify-between items-center">

            <div class="flex items-center gap-3">

                <button @click="$emit('back')"
                    class="text-gray-500 hover:text-gray-800 transition-colors bg-white p-2 rounded-lg border shadow-sm">
                    <ChevronRight class="rotate-180" :size="20" />
                </button>

                <h2 class="text-2xl font-bold text-gray-800">
                    Thêm / Sửa Bài Viết
                </h2>

            </div>

            <button @click="submitArticle" :disabled="loadingSubmit"
                class="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-5 py-2.5 rounded-lg font-medium flex items-center gap-2 shadow-lg shadow-blue-500/30 transition-colors">
                <Save :size="18" />

                {{ loadingSubmit ? 'Đang đăng...' : 'Đăng bài' }}
            </button>

        </div>

        <!-- CONTENT -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">

            <!-- LEFT -->
            <div class="lg:col-span-2 space-y-6">

                <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">

                    <!-- LANG -->
                    <div class="flex border-b border-gray-200 mb-6">

                        <button @click="activeLang = 'vi'"
                            class="px-4 py-2 font-medium text-sm border-b-2 transition-colors" :class="activeLang === 'vi'
                                ? 'border-blue-600 text-blue-600'
                                : 'border-transparent text-gray-500'
                                ">
                            🇻🇳 Tiếng Việt
                        </button>

                        <button @click="activeLang = 'en'"
                            class="px-4 py-2 font-medium text-sm border-b-2 transition-colors" :class="activeLang === 'en'
                                ? 'border-blue-600 text-blue-600'
                                : 'border-transparent text-gray-500'
                                ">
                            🇬🇧 English
                        </button>
                        <button @click="activeLang = 'jp'"
                            class="px-4 py-2 font-medium text-sm border-b-2 transition-colors" :class="activeLang === 'jp'
                                ? 'border-blue-600 text-blue-600'
                                : 'border-transparent text-gray-500'
                                ">
                            🇯🇵 日本語
                        </button>
                    </div>
                    <div class="space-y-5">

                        <!-- TITLE -->
                        <div>

                            <label class="block text-sm font-semibold text-gray-700 mb-1" style="text-align: left;">
                                Tiêu đề ({{ activeLang.toUpperCase() }})
                            </label>

                            <input type="text" v-model="form.title[activeLang]"
                                class="w-full border border-gray-300 rounded-lg p-3 text-lg font-bold outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                placeholder="Nhập tiêu đề..." />

                        </div>

                        <!-- DESC -->
                        <div>

                            <label class="block text-sm font-semibold text-gray-700 mb-1" style="text-align: left;">
                                Mô tả ngắn ({{ activeLang.toUpperCase() }})
                            </label>

                            <textarea v-model="form.desc[activeLang]" rows="3"
                                class="w-full border border-gray-300 rounded-lg p-3 h-20 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                placeholder="Tóm tắt nội dung..."></textarea>

                        </div>

                        <!-- CONTENT -->
                        <div>

                            <div class="flex justify-between items-center mb-2">

                                <label class="block text-sm font-semibold text-gray-700" style="text-align: left;">
                                    Nội dung chi tiết ({{ activeLang.toUpperCase() }})
                                </label>

                                <div class="flex bg-gray-100 p-1 rounded-lg border border-gray-200">

                                    <button @click="editorMode = 'visual'"
                                        class="px-3 py-1 text-xs font-medium rounded-md flex items-center gap-1 transition-all"
                                        :class="editorMode === 'visual'
                                            ? 'bg-white shadow text-blue-600'
                                            : 'text-gray-500'
                                            ">
                                        <Eye :size="14" />
                                        Soạn thảo
                                    </button>

                                    <button @click="editorMode = 'html'"
                                        class="px-3 py-1 text-xs font-medium rounded-md flex items-center gap-1 transition-all"
                                        :class="editorMode === 'html'
                                            ? 'bg-white shadow text-blue-600'
                                            : 'text-gray-500'
                                            ">
                                        <Code :size="14" />
                                        HTML
                                    </button>
                                </div>
                            </div>
                            <!-- EDITOR -->
                            <!-- <div class="border rounded-lg overflow-hidden transition-colors" :class="editorMode === 'html'
                                    ? 'border-gray-800'
                                    : 'border-gray-300'
                                ">
                                <div v-if="editorMode === 'visual'"
                                    class="bg-gray-50 border-b border-gray-300 p-2 flex gap-2">
                                    <button class="px-2.5 py-1.5 bg-white border rounded shadow-sm text-sm font-bold">
                                        B
                                    </button>
                                    <button class="px-2.5 py-1.5 bg-white border rounded shadow-sm text-sm italic">
                                        I
                                    </button>
                                    <button class="px-2.5 py-1.5 bg-white border rounded shadow-sm text-sm underline">
                                        U
                                    </button>
                                    <button class="px-2.5 py-1.5 bg-white border rounded shadow-sm text-sm">
                                        <ImageIcon :size="16" />
                                    </button>

                                </div>

                                <textarea v-model="form.content[activeLang]"
                                    class="w-full p-4 h-[400px] outline-none text-sm transition-colors" :class="editorMode === 'html'
                                            ? 'bg-[#1e1e1e] text-[#d4d4d4] font-mono leading-relaxed'
                                            : 'bg-white text-gray-800'
                                        " :placeholder="editorMode === 'html'
                                            ? '<div>Nội dung html...</div>'
                                            : 'Bắt đầu viết nội dung...'
                                        "></textarea>
                                
                            </div> -->
                            <div class="border rounded-lg overflow-hidden transition-colors" :class="editorMode === 'html'
                                ? 'border-gray-800'
                                : 'border-gray-300'">

                                <!-- HTML MODE -->
                                <textarea v-if="editorMode === 'html'" v-model="form.content[activeLang]"
                                    class="w-full p-4 h-[500px] outline-none text-sm bg-[#1e1e1e] text-[#d4d4d4] font-mono leading-relaxed"
                                    placeholder="<div>Nội dung html...</div>"></textarea>

                                <!-- VISUAL MODE -->
                                <div v-show="editorMode === 'visual'">
                                    <textarea id="editor1"></textarea>
                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

            <!-- RIGHT -->
            <div class="lg:col-span-1 space-y-6">

                <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-24">

                    <h3 class="font-bold text-gray-800 mb-4 border-b pb-2">
                        Thuộc tính bài viết
                    </h3>

                    <div class="space-y-5">

                        <!-- CATEGORY -->
                        <div>

                            <label class="block text-sm font-medium text-gray-700 mb-1" style="text-align: left;">
                                Danh mục
                            </label>

                            <select v-model="form.cate"
                                class="w-full border border-gray-300 rounded-lg p-2.5 text-sm outline-none focus:border-blue-500">
                                <option value="service">Dịch vụ</option>
                                <option value="news">Tin tức</option>
                                <option value="training">Đào tạo</option>
                            </select>

                        </div>

                        <!-- STATUS -->
                        <div>

                            <label class="block text-sm font-medium text-gray-700 mb-1" style="text-align: left;">
                                Trạng thái
                            </label>

                            <select v-model="form.status"
                                class="w-full border border-gray-300 rounded-lg p-2.5 text-sm outline-none focus:border-blue-500">
                                <option value="published">
                                    Đã xuất bản
                                </option>

                                <option value="draft">
                                    Bản nháp
                                </option>

                            </select>

                        </div>

                        <!-- DATE -->
                        <div>

                            <label class="block text-sm font-medium text-gray-700 mb-1" style="text-align: left;">
                                Ngày đăng
                            </label>

                            <input type="date" v-model="form.publish_date"
                                class="w-full border border-gray-300 rounded-lg p-2.5 text-sm outline-none focus:border-blue-500" />

                        </div>

                        <!-- IMAGE -->
                        <div>

                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                Ảnh đại diện
                            </label>

                            <input type="file" accept="image/*" @change="handleImageUpload" class="hidden"
                                ref="thumbnailInput" />

                            <div @click="$refs.thumbnailInput.click()"
                                class="border-2 border-dashed border-gray-300 rounded-lg aspect-[3/2] flex flex-col items-center justify-center text-gray-400 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-400 cursor-pointer transition-colors relative overflow-hidden bg-gray-50">

                                <!-- PREVIEW -->
                                <img v-if="thumbnailBase64" :src="thumbnailBase64" class="w-full h-full object-cover" />

                                <!-- EMPTY -->
                                <template v-else>

                                    <ImageIcon :size="32" class="mb-2" />

                                    <span class="text-sm font-medium text-center px-4">
                                        Click hoặc kéo thả ảnh
                                    </span>

                                </template>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Save, Eye, Code, Image as ImageIcon, ChevronRight } from 'lucide-vue-next'

export default {
    name: 'ArticleEditor',
    components: {
        Save,
        Eye,
        Code,
        ImageIcon,
        ChevronRight,
    },
    props: {
        article: {
            type: Object,
            default: null
        },
        title: {
            type: String,
            default: 'Bài viết'
        },
        category: {
            type: String,
            default: ''
        }
    },
    emits: ['back', 'save'],
    data() {
        return {
            ckEditor: null,
            view: 'edit',
            activeLang: 'vi',
            editorMode: 'visual',
            loadingSubmit: false,
            thumbnailBase64: '',

            form: {
                cate: '',
                title: {
                    vi: '',
                    en: '',
                    jp: ''
                },
                desc: {
                    vi: '',
                    en: '',
                    jp: ''
                },
                content: {
                    vi: '',
                    en: '',
                    jp: ''
                },
                thumbnail: '',
                views: 0,
                status: 'published',
                publish_date: '',
                slug: ''
            }
        }
    },
    mounted() {
        // Gán category từ prop khi component mount
        this.form.cate = this.category
        console.log("this.form.cate ", this.form.cate);
        this.$nextTick(() => {
            this.initCKEditor()
        })

    },
    beforeUnmount() {

        if (this.ckEditor) {
            this.ckEditor.destroy()
        }

    },
    watch: {
        article: {
            handler(newArticle) {
                if (newArticle) {
                    this.loadArticleData(newArticle)
                } else {
                    // Reset form khi tạo bài viết mới
                    this.form.cate = this.category
                }

            },
            immediate: true
        },
        category: {
            handler(newCategory) {
                // Update category khi menu thay đổi
                console.log("Category prop received:", this.category);
                console.log("Category watcher triggered:", newCategory);
                if (!this.article) {
                    const catValue = newCategory || this.category || 'service'
                    this.form.cate = catValue
                    console.log("Updated form.cate to:", this.form.cate);
                }
            },
            immediate: true  // Gọi ngay khi component khởi tạo
        },
        activeLang() {
            this.updateEditorContent()
        },

        editorMode(newMode) {
            if (newMode === 'visual') {
                this.$nextTick(() => {
                    this.initCKEditor()
                })
            }
        }
    },
    methods: {
        loadArticleData(article) {
            if (!article) return

            this.form = {
                cate: article.cate || 'service',
                title: article.title || {
                    vi: '',
                    en: '',
                    jp: ''
                },
                desc: article.desc || {
                    vi: '',
                    en: '',
                    jp: ''
                },

                content: article.content || {
                    vi: '',
                    en: '',
                    jp: ''
                },
                thumbnail: article.img || article.thumbnail || '',
                views: article.views || 0,
                status: article.status || 'published',
                publish_date: article.publish_date || article.date || '',
                slug: article.slug || ''
            }

            // Set thumbnail preview
            if (article.img || article.thumbnail) {
                this.thumbnailBase64 = article.img || article.thumbnail
            }
        },

        // IMAGE -> BASE64
        handleImageUpload(event) {
            const file = event.target.files[0]
            if (!file) return
            const reader = new FileReader()
            reader.onload = (e) => {
                this.thumbnailBase64 = e.target.result
                this.form.thumbnail = e.target.result
            }
            reader.readAsDataURL(file)
        },
        // SLUG
        slugify(text) {
            return text
                .toString()
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .toLowerCase()
                .trim()
                .replace(/\s+/g, '-')
            // .replace(/[^\w\-]+/g, '')
            // .replace(/\-\-+/g, '-')
        },

        initCKEditor() {

            // destroy editor cũ
            if (this.ckEditor) {
                this.ckEditor.destroy()
                this.ckEditor = null
            }

            // kiểm tra tồn tại
            const editorEl = document.getElementById('editor1')

            if (!editorEl) return

            this.ckEditor = window.CKEDITOR.replace('editor1', {

                height: 500,

                removePlugins: 'elementspath',

                resize_enabled: false,

                toolbar: [
                    {
                        name: 'clipboard',
                        items: ['Undo', 'Redo']
                    },
                    {
                        name: 'styles',
                        items: ['Format']
                    },
                    {
                        name: 'basicstyles',
                        items: [
                            'Bold',
                            'Italic',
                            'Underline',
                            'Strike'
                        ]
                    },
                    {
                        name: 'paragraph',
                        items: [
                            'NumberedList',
                            'BulletedList',
                            '-',
                            'Outdent',
                            'Indent',
                            '-',
                            'Blockquote'
                        ]
                    },
                    {
                        name: 'links',
                        items: ['Link', 'Unlink']
                    },
                    {
                        name: 'insert',
                        items: [
                            'Image',
                            'Table',
                            'HorizontalRule'
                        ]
                    },
                    {
                        name: 'tools',
                        items: ['Maximize']
                    },
                    {
                        name: 'document',
                        items: ['Source']
                    }
                ]
            })

            // set data
            this.ckEditor.setData(
                this.form.content[this.activeLang] || ''
            )

            // sync realtime
            this.ckEditor.on('change', () => {

                this.form.content[this.activeLang] =
                    this.ckEditor.getData()

            })
        },

        updateEditorContent() {

            if (
                this.ckEditor &&
                this.editorMode === 'visual'
            ) {

                this.ckEditor.setData(
                    this.form.content[this.activeLang] || ''
                )

            }

        },


        // SUBMIT
        async submitArticle() {
            try {
                this.loadingSubmit = true

                // VALIDATION - Check rỗng
                if (!this.form.title.vi.trim()) {
                    alert('❌ Vui lòng nhập tiêu đề Tiếng Việt')
                    this.loadingSubmit = false
                    return
                }
                if (!this.form.desc.vi.trim()) {
                    alert('❌ Vui lòng nhập mô tả Tiếng Việt')
                    this.loadingSubmit = false
                    return
                }
                if (!this.form.content.vi.trim()) {
                    alert('❌ Vui lòng nhập nội dung Tiếng Việt')
                    this.loadingSubmit = false
                    return
                }
                // if (!this.form.thumbnail) {
                //     alert('❌ Vui lòng chọn ảnh đại diện')
                //     this.loadingSubmit = false
                //     return
                // }

                // AUTO SLUG
                this.form.slug = this.slugify(
                    this.form.title.vi
                )
                // AUTO DATE
                if (!this.form.publish_date) {
                    this.form.publish_date = new Date()
                        .toISOString()
                        .split('T')[0]
                }

                // BODY
                const payload = {
                    idFun: 111,
                    cate: this.form.cate,
                    title_vi: this.form.title.vi,
                    title_en: this.form.title.en,
                    title_jp: this.form.title.jp,
                    desc_vi: this.form.desc.vi,
                    desc_en: this.form.desc.en,
                    desc_jp: this.form.desc.jp,
                    content_vi: this.form.content.vi,
                    content_en: this.form.content.en,
                    content_jp: this.form.content.jp,
                    thumbnail: this.form.thumbnail,
                    views: 0,
                    status: this.form.status,
                    publish_date: this.form.publish_date,
                    slug: this.form.slug
                }
                console.log(payload)
                const response = await fetch(
                    'http://localhost:3000/quantri/baiviet',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(payload)
                    }
                )

                const data = await response.json()
                console.log(data)
                if (!response.ok) {
                    throw new Error(
                        data.message || 'Đăng bài thất bại'
                    )
                }

                alert('Đăng bài thành công')
                // RESET
                this.resetForm();
                this.$emit('back');

            } catch (err) {
                console.log(err)
                alert(err.message)

            } finally {
                this.loadingSubmit = false
            }
        },



        // RESET
        resetForm() {

            this.form = {
                cate: 'service',
                title: {
                    vi: '',
                    en: '',
                    jp: ''
                },

                desc: {
                    vi: '',
                    en: '',
                    jp: ''
                },

                content: {
                    vi: '',
                    en: '',
                    jp: ''
                },

                thumbnail: '',
                views: 0,
                status: 'published',
                publish_date: '',
                slug: ''
            }

            this.thumbnailBase64 = ''
        }
    }
}
</script>