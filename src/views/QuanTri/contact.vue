<template>

    <div class="flex justify-between items-center">
        <h2 class="text-2xl font-bold text-gray-800">Khách hàng liên hệ</h2>
    </div>

    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table class="w-full text-left border-collapse">
            <thead>
                <tr class="bg-gray-50 text-gray-500 text-sm border-b border-gray-200">
                    <th class="p-4">Khách hàng</th>
                    <th class="p-4">Dịch vụ</th>
                    <th class="p-4">Ngày gửi</th>
                    <th class="p-4">Trạng thái</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="contact in contacts" :key="contact.id"
                    class="border-b border-gray-100 hover:bg-blue-50/50 transition-colors">
                    <td class="p-4">
                        <p class="font-bold text-gray-800">
                            {{ contact.name }}
                        </p>

                        <p class="text-sm text-blue-600 font-medium mt-1">
                            {{ contact.phone }}
                        </p>
                    </td>

                    <td class="p-4 text-sm font-medium text-gray-700">
                        {{ contact.service }}
                    </td>

                    <td class="p-4 text-sm text-gray-500">
                        {{ contact.date }}
                    </td>

                    <td class="p-4">
                        <span v-if="contact.status === 'new'"
                            class="px-2.5 py-1 rounded-md border border-red-200 text-xs font-bold bg-red-50 text-red-600">
                            Mới
                        </span>

                        <span v-if="contact.status === 'contacted'"
                            class="px-2.5 py-1 rounded-md border border-yellow-200 text-xs font-bold bg-yellow-50 text-yellow-700">
                            Đang xử lý
                        </span>

                        <span v-if="contact.status === 'completed'"
                            class="px-2.5 py-1 rounded-md border border-green-200 text-xs font-bold bg-green-50 text-green-700">
                            Đã chốt
                        </span>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>

export default {
    name: "ContactManagement",
    data() {
        return {
            contacts: [],
            itemsPerPage: 10,
            MOCK_CONTACTS: [
                {
                    id: 1,
                    name: "Nguyễn Văn A",
                    phone: "0901234567",
                    service: "Thành lập doanh nghiệp",
                    note: "Cần tư vấn mở công ty FDI",
                    date: "2024-05-15",
                    status: "new",
                },
                {
                    id: 2,
                    name: "John Doe",
                    phone: "+123456789",
                    service: "Visa",
                    note: "Need work permit renewal",
                    date: "2024-05-14",
                    status: "contacted",
                },
            ],



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
        this.fetchContacts();
    },

    methods: {


        async fetchContacts() {
            try {
                this.loading = true;

                const response = await fetch("http://localhost:3000/quantri/contacts", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        idFun: 114,
                    }),
                });

                if (!response.ok) {
                    throw new Error(`API returned ${response.status}`);
                }

                const data = await response.json();

                this.contacts = Array.isArray(data) ? data : data.data || [];
            } catch (err) {
                console.warn(err);

                this.contacts = this.MOCK_CONTACTS;
                this.error = err.message;
            } finally {
                this.loading = false;
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


    },
};
</script>
