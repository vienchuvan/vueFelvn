<template>
    <div class="space-y-5">

        <!-- HEADER -->
        <div class="flex items-center justify-between">
            <h2 class="text-[24px] font-black text-[#0f172a]">
                Khách hàng liên hệ (Leads)
            </h2>

            <button
                class="h-[42px] px-5 rounded-xl border border-gray-300 bg-white text-[13px] font-bold text-[#0f172a] shadow-sm hover:bg-gray-50 transition"
            >
                Xuất file Excel
            </button>
        </div>

        <!-- TABLE -->
        <div
            class="overflow-hidden rounded-[18px] border border-[#e5e7eb] bg-white shadow-sm"
        >
            <div class="overflow-x-auto">
                <table class="w-full border-collapse">
                    <!-- HEAD -->
                    <thead>
                        <tr
                            class="border-b border-[#e5e7eb] bg-[#f8fafc]"
                        >
                            <th
                                class="px-4 py-4 text-left text-[13px] font-bold text-[#64748b]"
                            >
                                Khách hàng
                            </th>

                            <th
                                class="px-4 py-4 text-left text-[13px] font-bold text-[#64748b]"
                            >
                                Dịch vụ quan tâm
                            </th>

                            <th
                                class="px-4 py-4 text-left text-[13px] font-bold text-[#64748b]"
                            >
                                Ghi chú
                            </th>

                            <th
                                class="px-4 py-4 text-left text-[13px] font-bold text-[#64748b]"
                            >
                                Ngày gửi
                            </th>

                            <th
                                class="px-4 py-4 text-left text-[13px] font-bold text-[#64748b]"
                            >
                                Trạng thái
                            </th>

                            <th
                                class="px-4 py-4 text-center text-[13px] font-bold text-[#64748b]"
                            >
                                Thao tác
                            </th>
                        </tr>
                    </thead>

                    <!-- BODY -->
                    <tbody>
                        <tr
                            v-for="contact in contacts"
                            :key="contact.id"
                            class="border-b border-[#eef2f7] transition hover:bg-[#f8fbff]"
                        >
                            <!-- CUSTOMER -->
                            <td class="px-4 py-5 align-top">
                                <div>
                                    <p
                                        class="text-[16px] font-black text-[#0f172a]"
                                    >
                                        {{ contact.name }}
                                    </p>

                                    <a
                                        :href="`tel:${contact.phone}`"
                                        class="mt-1 inline-flex items-center gap-2 text-[13px] font-bold text-[#2563eb]"
                                    >
                                        <i
                                            class="fa-solid fa-phone text-[11px]"
                                        ></i>

                                        {{ contact.phone }}
                                    </a>
                                </div>
                            </td>

                            <!-- SERVICE -->
                            <td
                                class="px-4 py-5 align-top text-[13px] font-semibold text-[#334155]"
                            >
                                {{ contact.service || "---" }}
                            </td>

                            <!-- NOTE -->
                            <td
                                class="px-4 py-5 align-top text-[13px] text-[#475569] leading-[1.7] max-w-[260px]"
                            >
                                {{ contact.note || "---" }}
                            </td>

                            <!-- DATE -->
                            <td
                                class="px-4 py-5 align-top text-[13px] font-medium text-[#64748b]"
                            >
                                {{
                                    formatDate(
                                        contact.contact_date ||
                                            contact.date
                                    )
                                }}
                            </td>

                            <!-- STATUS -->
                            <td class="px-4 py-5 align-top">
                                <!-- BADGE -->
                                <div class="mb-2">
                                    <span
                                        v-if="contact.status === 'new'"
                                        class="inline-flex items-center gap-1 rounded-lg border border-red-200 bg-red-50 px-2 py-1 text-[11px] font-black text-red-600"
                                    >
                                        ⊗ Mới
                                    </span>

                                    <span
                                        v-if="contact.status === 'contacted'"
                                        class="inline-flex items-center gap-1 rounded-lg border border-yellow-200 bg-yellow-50 px-2 py-1 text-[11px] font-black text-yellow-700"
                                    >
                                        ⏳ Đang xử lý
                                    </span>

                                    <span
                                        v-if="contact.status === 'completed'"
                                        class="inline-flex items-center gap-1 rounded-lg border border-green-200 bg-green-50 px-2 py-1 text-[11px] font-black text-green-700"
                                    >
                                        ✔ Đã chốt
                                    </span>
                                </div>

                                <!-- SELECT -->
                                <select
                                    v-model="contact.status"
                                    class="h-[38px] min-w-[150px] rounded-lg border border-[#dbe2ea] bg-white px-3 text-[12px] font-bold text-[#0f172a] outline-none focus:border-[#2563eb]"
                                >
                                    <option value="new">
                                        Mới
                                    </option>

                                    <option value="contacted">
                                        Đang xử lý
                                    </option>

                                    <option value="completed">
                                        Đã chốt
                                    </option>
                                </select>
                            </td>

                            <!-- ACTION -->
                            <td class="px-4 py-5 align-top">
                                <div
                                    class="flex items-center justify-center gap-2"
                                >
                                    <!-- SAVE -->
                                    <button
                                        @click="updateContact(contact)"
                                        class="inline-flex h-[38px] items-center gap-2 rounded-lg bg-[#2563eb] px-4 text-[12px] font-black text-white transition hover:bg-[#1d4ed8]"
                                    >
                                        <i
                                            class="fa-solid fa-floppy-disk"
                                        ></i>

                                        Lưu
                                    </button>

                                    <!-- DELETE -->
                                    <button
                                        @click="deleteContact(contact.id)"
                                        class="inline-flex h-[38px] items-center gap-2 rounded-lg bg-[#ef4444] px-4 text-[12px] font-black text-white transition hover:bg-[#dc2626]"
                                    >
                                        <i
                                            class="fa-solid fa-trash"
                                        ></i>

                                        Xóa
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <!-- EMPTY -->
                <div
                    v-if="!loading && contacts.length === 0"
                    class="py-14 text-center text-[13px] font-bold text-gray-400"
                >
                    Không có dữ liệu liên hệ
                </div>

                <!-- LOADING -->
                <div
                    v-if="loading"
                    class="py-14 text-center text-[13px] font-black text-blue-600"
                >
                    Đang tải dữ liệu...
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from "axios";

export default {
    name: "ContactManagement",

    data() {
        return {
            contacts: [],
            loading: false,
        };
    },

    mounted() {
        this.fetchContacts();
    },

    methods: {
        formatDate(date) {
            if (!date) return "---";

            return new Date(date).toLocaleDateString("vi-VN");
        },

        async fetchContacts() {
            try {
                this.loading = true;

                const response = await axios.post(
                    "https://miraivietnam.com/api/quantri/contacts",
                    {
                        idFun: 114,
                    }
                );

                this.contacts = Array.isArray(response.data)
                    ? response.data
                    : response.data.data || [];
            } catch (error) {
                console.log(error);
            } finally {
                this.loading = false;
            }
        },

        // UPDATE
        async updateContact(contact) {
            try {
                const response = await axios.post(
                    "https://miraivietnam.com/api/quantri/contacts",
                    {
                        idFun: 112,

                        id: contact.id,
                        service: contact.service,
                        note: contact.note,
                        status: contact.status,
                    }
                );

                if (response.data.success) {
                    alert("Cập nhật thành công");
                } else {
                    alert("Cập nhật thất bại");
                }
            } catch (error) {
                console.log(error);

                alert("Không thể cập nhật");
            }
        },

        // DELETE
        async deleteContact(id) {
            const confirmDelete = confirm(
                "Bạn có chắc muốn xóa liên hệ này?"
            );

            if (!confirmDelete) return;

            try {
                const response = await axios.post(
                    "https://miraivietnam.com/api/quantri/contacts",
                    {
                        idFun: 113,
                        id,
                    }
                );

                if (response.data.success) {
                    this.contacts = this.contacts.filter(
                        (item) => item.id !== id
                    );

                    alert("Xóa thành công");
                } else {
                    alert("Xóa thất bại");
                }
            } catch (error) {
                console.log(error);

                alert("Không thể xóa");
            }
        },
    },
};
</script>