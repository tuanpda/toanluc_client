<template>
    <div class="columns">
        <div class="column">
            <br />
            <div class="box" style="margin-left: 20px; margin-right: 20px">
                <div class="columns">
                    <div class="column is-11">
                        <div class="control">
                            <span class="icon is-small is-left">
                                <i style="color: #ff55acee" class="fas fa-calendar-alt"></i>
                            </span>
                            <span style="color: #3850b7; font-size: 17px; font-weight: bold">Chọn lô kế hoạch để sản
                                xuất</span>
                        </div>
                    </div>
                    <div class="column" style="text-align: right">
                        <button class="button is-info is-fullwidth is-small">
                            <span class="icon is-small">
                                <i class="fas fa-angle-double-left"></i>
                            </span>
                            <span>Thoát</span>
                        </button>
                    </div>
                </div>

                <div>
                    <table class="table is-responsive is-bordered is-narrow is-fullwidth">
                        <tr style="background-color: #feecf0;">
                            <td style="font-size: small; width: 14%;">
                                <div class="select-wrapper">
                                    <div class="select-header" @click="isOpen = !isOpen">
                                        {{ selectedOptions.length > 0 ? selectedOptions.join(', ') : 'Chọn Phân xưởng' }}
                                        <span class="arrow" :class="{ 'open': isOpen }"></span>
                                    </div>
                                    <div class="select-options" :class="{ 'open': isOpen }">
                                        <label v-for="option in phanxuong">
                                            <input type="checkbox" :value="option.mapx" v-model="selectedOptions">
                                            {{ option.mapx }} &nbsp;
                                        </label>
                                    </div>
                                </div>
                            </td>
                            <td style="width: 10.5%;">
                                <div class="autocomplete">
                                    <input class="input is-small is-info" type="text" v-model="multiSearch_nhomtp"
                                        @input="onInput_nhomsp" placeholder="Nhóm thành phẩm">
                                    <div class="autocomplete-items" v-if="suggestions_nhomtp.length">
                                        <div class="autocomplete-item" v-for="suggestion_nhomtp in suggestions_nhomtp"
                                            @click="selectSuggestion_nhomsp(suggestion_nhomtp)">
                                            {{ suggestion_nhomtp }}
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <!-- mã sp tạm thời thay bằng nhom tp -->
                            <td style="width: 10.5%;">
                                <div class="autocomplete">
                                    <input class="input is-small is-danger" type="text" v-model="multiSearch_matp"
                                        @input="onInput_matp" placeholder="Mã thành phẩm">
                                    <div class="autocomplete-items" v-if="suggestions_matp.length">
                                        <div class="autocomplete-item" v-for="suggestion_matp in suggestions_matp"
                                            @click="selectSuggestion_matp(suggestion_matp)">
                                            {{ suggestion_matp }}
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <!-- <td style="width: 12%;">
                                <div class="autocomplete">
                                    <input class="input is-small is-danger" type="text" v-model="multiSearch_masp"
                                        @input="onInput" placeholder="Chọn sản phẩm">
                                    <div class="autocomplete-items" v-if="suggestions.length">
                                        <div class="autocomplete-item" v-for="suggestion in suggestions"
                                            @click="selectSuggestion(suggestion)">
                                            {{ suggestion }}
                                        </div>
                                    </div>
                                </div>
                            </td> -->
                            <td style="font-size: small; width: 10%;">
                                <div class="select-wrapper">
                                    <div class="select-header" @click="isOpenst = !isOpenst">
                                        {{ Options_status.length > 0 ? Options_status.join(', ') : 'Trạng thái' }}
                                        <span class="arrow" :class="{ 'open': isOpenst }"></span>
                                    </div>
                                    <div class="select-options" :class="{ 'open': isOpenst }">
                                        <label v-for="option in statusArr">
                                            <input type="checkbox" :value="option.masta" v-model="Options_status">
                                            {{ option.tensta }} &nbsp;
                                        </label>
                                    </div>
                                </div>
                            </td>
                            <td style="width: 5%">
                                <button @click="filterData" class="button is-small is-success">Lọc dữ liệu</button>
                            </td>
                            <td style="text-align: center; width: 5%"><button @click="showAllLokhpx"
                                    class="button is-small is-danger">Refresh</button></td>
                            <td style="font-size: small; width: 6%; font-weight: 600;">
                                Số dòng
                            </td>
                            <td style="font-size: small; width: 5.45%;">
                                <input class="input is-danger is-small" type="number" id="itemsPerPage"
                                    v-model.number="itemsPerPage" min="1" max="10" />
                            </td>
                            <td style="text-align: center; width: 12.8%"><vue-excel-xlsx :data="lokehoachpx"
                                    :columns="columns" :file-name="'lokehoachphanxuong'" :file-type="'xlsx'"
                                    :sheet-name="'Lô kế hoạch phân xưởng'">
                                    Download Excel
                                </vue-excel-xlsx></td>
                            <td style="font-size: small; font-weight: bold; text-align: right;"><span>Có: <span
                                        style="color: red;">{{
                                            lokehoachpx.length }}</span> bản
                                    ghi</span></td>
                        </tr>
                    </table>
                </div>
                <div class="table_wrapper">
                    <table class="table is-responsive is-bordered is-narrow is-fullwidth">
                        <tr style="background-color: #f4f2f8">
                            <td style="font-size: small; text-align: center; font-weight: 600; width: 3%">STT</td>
                            <td @click="sortTable('makh')"
                                style="font-size: small; text-align: center; font-weight: 600; width: 5%">Mã lô nhà máy
                            </td>
                            <td @click="sortTable('mapx')"
                                style="font-size: small; text-align: center; font-weight: 600; width: 5%">Mã PX
                            </td>
                            <td @click="sortTable('makhpx')"
                                style="font-size: small; text-align: center; font-weight: 600; width: 4%">Mã kế hoạch
                                PX
                            </td>
                            <td @click="sortTable('nhomthanhpham')"
                                style="font-size: small; text-align: center; font-weight: 600; width: 4%">Nhóm TP
                            </td>
                            <td @click="sortTable('mathanhpham')"
                                style="font-size: small; text-align: center; font-weight: 600; width: 4%">Mã TP
                            </td>
                            <td @click="sortTable('nhomsp')"
                                style="font-size: small; text-align: center; font-weight: 600; width: 7%">Nhóm SP
                            </td>
                            <td @click="sortTable('maspkhpx')"
                                style="font-size: small; text-align: center; font-weight: 600; width: 7%">Mã sản phẩm
                            </td>
                            <td @click="sortTable('ngaybdkhpx')"
                                style="font-size: small; text-align: center; font-weight: 600; width: 8%;">Ngày bắt đầu
                            </td>
                            <td @click="sortTable('ngayktkhpx')"
                                style="font-size: small; text-align: center; font-weight: 600; width: 8%;">Ngày kết thúc
                            </td>
                            <td @click="sortTable('soluongkhpx')"
                                style="font-size: small; text-align: center; font-weight: 600; width: 7%;">Số lượng
                            </td>
                            <td @click="sortTable('ttqt')"
                                style="font-size: small; text-align: center; font-weight: 600; width: 7%;">TTQT
                            </td>
                            <td @click="sortTable('status')"
                                style="font-size: small; text-align: center; font-weight: 600; width: 5%;">Trạng thái
                            </td>
                            <td style="font-size: small; text-align: center; font-weight: 600; width: 7%;">Chọn Trạng thái
                            </td>
                            <td style="font-size: small; text-align: center; font-weight: 600; width: 7%;">Số lượng HT
                            </td>
                            <td style="font-size: small; text-align: center; font-weight: 600; width: 7%;">Ngày BDTT
                            </td>
                            <td style="font-size: small; text-align: center; font-weight: 600; width: 7%;">Ngày KTTT
                            </td>
                            <td style="font-size: small; text-align: center; font-weight: 600; width: 7%;">Ghi dữ liệu</td>
                        </tr>
                        <tr v-for="(item, index) in paginatedTable" :key="index + 'llllkiq'">
                            <td style="font-size: small; text-align: center; background-color: #effaf5;">{{ index + 1 }}
                            </td>
                            <td style="font-size: small;">{{ item.makh }}
                            </td>
                            <td style="font-size: small; background-color: #effaf5; text-align: center;">{{ item.mapx }}
                            </td>
                            <td style="font-size: small; background-color: #effaf5; text-align: center;">{{
                                item.makhpx
                            }}
                            </td>
                            <td style="font-size: small; background-color: #effaf5; text-align: center;">{{
                                item.nhomthanhpham
                            }}</td>
                            <td style="font-size: small; background-color: #effaf5; text-align: center;">{{
                                item.mathanhpham
                            }}</td>
                            <td style="font-size: small; background-color: #effaf5; text-align: center;">{{
                                item.nhomsp
                            }}</td>
                            <td style="font-size: small; background-color: #effaf5; text-align: center;">{{
                                item.maspkhpx
                            }}</td>
                            <td style="font-size: small; background-color: #effaf5; text-align: center;">{{
                                item.ngaybdkhpx | formatDate
                            }}</td>
                            <!-- <td style="background-color: #fffaeb;"><input class="input is-small" type="date"
                                    v-bind:value="item.ngaybdkhpx | inputDateFilter"
                                    v-on:input="item.ngaybdkhpx = getDate($event.target.value)">
                            </td> -->
                            <td style="font-size: small; text-align: center; background-color: #fffaeb;">{{
                                item.ngayktkhpx | formatDate
                            }}</td>
                            <!-- <td style="background-color: #fffaeb;"><input class="input is-small" type="date"
                                    v-bind:value="item.ngayktkhpx | inputDateFilter"
                                    v-on:input="item.ngayktkhpx = getDate($event.target.value)"></td> -->
                            <td style="font-size: small; text-align: center; background-color: #effaf5;">{{
                                item.soluongkhpx | formatNumber
                            }}</td>
                            <td style="font-size: small; text-align: center; background-color: #effaf5;">{{
                                item.ttqt
                            }}</td>
                            <template>
                                <td v-if="item.status == 1" style="font-size: small; text-align: center; "><span
                                        style="color: white; font-weight: bold; background-color: red; padding-left: 7px; padding-right: 7px;">DK</span>
                                </td>
                                <td v-else-if="item.status == 2" style="font-size: small; text-align: center;">
                                    <span
                                        style="color: red; font-weight: bold; background-color: yellow; padding-left: 7px; padding-right: 7px;">SX</span>
                                </td>
                                <td v-else-if="item.status == 3" style="font-size: small; text-align: center;">
                                    <span
                                        style="color: white; font-weight: bold; background-color: green; padding-left: 7px; padding-right: 7px;">HT</span>
                                </td>
                                <td v-else style="font-size: small; text-align: center;">
                                </td>
                            </template>

                            <td style="font-size: small; width: 10%;">
                                <div class="select is-small is-fullwidth">
                                    <select id="" @change="onChange_status($event, item)" v-model="item.status">
                                        <option value="3">HT</option>
                                        <option value="2">SX</option>
                                        <option value="1">DK</option>
                                        <option value="0">0</option>
                                    </select>
                                </div>
                            </td>
                            <td style="font-size: small; text-align: center; background-color: #effaf5;"></td>
                            <td style="font-size: small; text-align: center; background-color: #effaf5;"></td>
                            <td style="font-size: small; text-align: center; background-color: #effaf5;"></td>
                            <td><button @click="onUpdate_lokhpx(item)"
                                    class="button is-small is-success is-fullwidth">Ghi</button>
                            </td>
                        </tr>
                    </table>
                    <div class="pagination"> <button class="button is-small is-success" @click="changePage(1)"
                            :disabled="currentPage === 1">Đầu tiên</button>
                        <button class="button is-small is-info" @click="changePage(currentPage - 1)"
                            :disabled="currentPage === 1">Trước</button> <button class="button is-small"
                            v-for="page in pages" @click="changePage(page)" :class="{ active: page === currentPage }"> {{
                                page }}
                        </button> <button class="button is-small is-info" @click="changePage(currentPage + 1)"
                            :disabled="currentPage === pageCount">Sau</button>
                        <button class="button is-small is-success" @click="changePage(pageCount)"
                            :disabled="currentPage === pageCount">Cuối</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Swal from "sweetalert2";
export default {
    middleware: "auth",
    data() {
        return {
            // dữ liệu 
            lokehoachpx: [],
            phanxuong: [],
            showLophanxuong: [], // khi bấm vào lô kế hoạch phân xưởng nào đó sẽ lưu thông tin lô đó vào biến này
            losanxuat: [], // lưu lô sản xuất

            search_maxuong_multi: "",
            search_tenxuong_multi: "",

            // lọc talble
            sortDirection: 1,
            sortKey: "ttqt",
            currentPage: 1,
            itemsPerPage: 10,

            // gán biến status
            status: 0,

            // select custom
            selectedOptions: [],
            Options_status: [],
            isOpen: false,
            isOpenst: false,
            statusArr: [{ masta: 1, tensta: "DK" }, { masta: 2, tensta: "SX" }, { masta: 3, tensta: "HT" }],
            multiSearch_masp: "",
            // lọc thay mã sp thành mã thành phẩm
            multiSearch_matp: "",
            multiSearch_nhomtp: "",

            // suggest input nhóm sản phẩm và mã sản phẩm
            suggestions: [],
            suggestions_nhomtp: [],
            suggestions_matp: [],
            maspinlokehoach: [],
            matpinlokehoach: [],
            nhomtpinlokehoach: [],

            // hiển thị đăng ký lô sản xuất
            checkViewRegLsx: false,
            isaddlosx: 0,
            // items lô sản xuất
            items: [
                {
                    kehoachnam: "",
                    makh: "",
                    makhpx: "",
                    malosx: "",
                    mapx: "",
                    tenpx: "",
                    mato: "",
                    tento: "",
                    masp: "",
                    tensp: "",
                    soluong: "",
                    nhomluong: "",
                    soluonglsx: "",
                    ngaybd: "",
                    ngaykt: "",
                    tongdat: "",
                    tonghong: "",
                    ghichu: "",
                    createdAt: null,
                    createdBy: "",
                    status: 0,
                    datinhluong: 0,
                    stopday_losx: "",
                    nhomto: [
                        {
                            maxuong: "",
                            tenxuong: "",
                            tento: "",
                            mato: "",
                        },
                    ],
                },
            ],
            tonhom: [], // lưu lại tổ nhóm
            nhomluong: [], // lưu nhóm lương

            // xuất execl lô nhà máy
            columns: [
                {
                    label: "Mã lô nhà máy",
                    field: "makh",
                    /* dataFormat: this.priceFormat */
                    dataFormat: this.trimData
                },
                {
                    label: "Mã phân xưởng",
                    field: "mapx",
                    dataFormat: this.trimData
                },
                {
                    label: "Tên phân xưởng",
                    field: "tenpx",
                    dataFormat: this.trimData
                },
                {
                    label: "Số lượng lô nhà máy",
                    field: "soluonglonm",
                    dataFormat: this.trimData
                },
                {
                    label: "Ngày bắt đầu lô nhà máy",
                    field: "ngaybdlonm",
                    dataFormat: this.prefixformatDate
                },
                {
                    label: "Ngày kết thúc lô nhà máy",
                    field: "ngayktlonm",
                    dataFormat: this.trimData
                },

                {
                    label: "Mã sản phẩm lô nhà máy (Mã thành phẩm)",
                    field: "masplonm",
                    dataFormat: this.trimData
                },
                {
                    label: "Tên sản phẩm lô nhà máy (Tên thành phẩm)",
                    field: "tensplonm",
                    dataFormat: this.trimData
                },
                {
                    label: "Mã kế hoạch PX",
                    field: "makhpx",
                    dataFormat: this.trimData
                },
                {
                    label: "Mã sản phẩm (KHPX)",
                    field: "maspkhpx",
                    dataFormat: this.trimData
                },
                {
                    label: "Tên sản phẩm (KHPX)",
                    field: "tenspkhpx",
                    dataFormat: this.trimData
                },
                {
                    label: "Số lượng KHPX",
                    field: "soluongkhpx",
                    dataFormat: this.trimData
                },
                {
                    label: "Ngày bắt đầu (KHPX)",
                    field: "ngaybdkhpx",
                    dataFormat: this.prefixformatDate
                },
                {
                    label: "Ngày kết thúc (KHPX)",
                    field: "ngayktkhpx",
                    dataFormat: this.prefixformatDate
                },
                {
                    label: "status",
                    field: "status",
                    // dataFormat: this.prefixformatDate
                },
                {
                    label: "Thứ tự QT",
                    field: "ttqt",
                },
                {
                    label: "Nhóm sản phẩm",
                    field: "nhomsp",
                    dataFormat: this.trimData
                },
            ],
        };
    },

    mounted() {
        this.showAllLokhpx()
        this.showAllPx()
        this.maspinlkh();
        this.matpinlkh();
        this.nhomtpinlkh()
    },

    computed: {
        // phân trang và sắp xếp
        sortedTable() {
            return this.lokehoachpx.sort((a, b) => {
                if (a[this.sortKey] < b[this.sortKey]) return -1 * this.sortDirection;
                if (a[this.sortKey] > b[this.sortKey]) return 1 * this.sortDirection;
                return 0;
            });
        },
        pageCount() {
            return Math.ceil(this.sortedTable.length / this.itemsPerPage);
        },
        startIndex() {
            return (this.currentPage - 1) * this.itemsPerPage;
        },
        endIndex() {
            return this.startIndex + this.itemsPerPage;
        },
        paginatedTable() {
            return this.sortedTable.slice(this.startIndex, this.endIndex);
        },
        pages() {
            const startPage = Math.max(1, this.currentPage - 2);
            const endPage = Math.min(this.pageCount, this.currentPage + 2);

            let pages = [];
            for (let i = startPage; i <= endPage; i++) {
                pages.push(i);
            }

            if (startPage > 1) {
                pages.unshift("...");
                pages.unshift(1);
            }

            if (endPage < this.pageCount) {
                pages.push("...");
                pages.push(this.pageCount);
            }

            return pages;
        },
    },


    // bind v-model input type date
    filters: {
        inputDateFilter: function (date) {
            if (!date) {
                return '';
            }
            date = new Date(date);
            return date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
        },
    },

    watch: {
        itemsPerPage() {
            this.currentPage = 1;
        },
    },


    methods: {
        // --------------------------------------------------------------------------------------
        // 1: Các hàm hỗ trợ tính toán; lọc ...
        // suggest input mã sản phẩm
        onInput() {
            if (!this.multiSearch_masp) {
                this.suggestions = [];
                return;
            }
            const MAX_SUGGESTIONS = 5; // Số lượng suggest tối đa
            this.suggestions = this.maspinlokehoach
                .map((c) => c.masp)
                .filter((masp) => masp.toLowerCase().includes(this.multiSearch_masp.toLowerCase()))
                .map((masp) => masp.trim())
                .slice(0, MAX_SUGGESTIONS);
        },
        selectSuggestion(suggestion) {
            this.multiSearch_masp = suggestion;
            this.suggestions = [];
        },
        // end suggest mã sản phẩm
        // suggest input mã thành phẩm
        onInput_matp() {
            if (!this.multiSearch_matp) {
                this.suggestions_matp = [];
                return;
            }
            const MAX_SUGGESTIONS = 5; // Số lượng suggest tối đa
            this.suggestions_matp = this.matpinlokehoach
                .map((c) => c.mathanhpham)
                .filter((mathanhpham) => mathanhpham.toLowerCase().includes(this.multiSearch_matp.toLowerCase()))
                .map((mathanhpham) => mathanhpham.trim())
                .slice(0, MAX_SUGGESTIONS);
        },
        selectSuggestion_matp(suggestion_matp) {
            this.multiSearch_matp = suggestion_matp;
            this.suggestions_matp = [];
        },
        // end suggest mã thành phẩm
        // suggest input nhóm sản phẩm
        onInput_nhomsp() {
            if (!this.multiSearch_nhomtp) {
                this.suggestions_nhomtp = [];
                return;
            }
            const MAX_SUGGESTIONS = 10; // Số lượng suggest tối đa
            this.suggestions_nhomtp = this.nhomtpinlokehoach
                .map((c) => c.nhomthanhpham)
                .filter((nhomthanhpham) => nhomthanhpham.toLowerCase().includes(this.multiSearch_nhomtp.toLowerCase()))
                .map((nhomthanhpham) => nhomthanhpham.trim())
                .slice(0, MAX_SUGGESTIONS);
        },
        selectSuggestion_nhomsp(suggestion_nhomtp) {
            this.multiSearch_nhomtp = suggestion_nhomtp;
            this.suggestions_nhomtp = [];
        },
        // end suggest nhóm sản phẩm
        // sắp xếp và phân trang
        sortTable(key) {
            if (key === this.sortKey) {
                this.sortDirection *= -1;
            } else {
                this.sortDirection = 1;
                this.sortKey = key;
            }
        },
        changePage(pageNumber) {
            if (pageNumber >= 1 && pageNumber <= this.pageCount) {
                this.currentPage = pageNumber;
            }
        },
        // format trước khi xuất execl, ở đây là trim dữ liệu trước khi mang ra
        trimData(value) {
            return value.trim();
        },
        // format date
        prefixformatDate(value) {
            if (!value) {
                return '';
            }
            value = new Date(value);
            return value.getFullYear() + '-' + ('0' + (value.getMonth() + 1)).slice(-2) + '-' + ('0' + value.getDate()).slice(-2);
        },
        // hàm bind v-model input type date
        getDate(value) {
            if (!value) {
                return null;
            }
            return new Date(value);
        },

        // --------------------------------------------------------------------------------------
        // 2: Các hàm lấy dữ liệu từ server qua API
        // Lấy danh sách tất cả các lô kế hoạch phân xưởng sắp xếp theo phân xưởng
        async showAllLokhpx() {
            this.lokehoachpx = await this.$axios.$get(
                `/api/lokehoach/getallkehoachphanxuong`
            );
            this.multiSearch_masp = ""
            this.multiSearch_matp = ""
            this.multiSearch_nhomtp = ""
            this.Options_status = []
            this.selectedOptions = []
            this.isOpen = false
            this.isOpenst = false

        },
        // lấy thông tin phân xưởng 
        async showAllPx() {
            this.phanxuong = await this.$axios.$get(`/api/phongban/allphanxuong`);
        },
        // lấy mã sản phẩm và nhóm sản phẩm trong lô kế hoạch phân xưởng
        async maspinlkh() {
            this.maspinlokehoach = await this.$axios.$get('/api/lokehoach/hmsanphamlokhpx')
        },
        // lấy mã thành phẩm, mã sp và nhóm sản phẩm trong lô kế hoạch phân xưởng
        async matpinlkh() {
            this.matpinlokehoach = await this.$axios.$get('/api/lokehoach/matpinlokhpx')
        },
        async maspinlkh() {
            this.maspinlokehoach = await this.$axios.$get('/api/lokehoach/hmsanphamlokhpx')
        },
        async nhomtpinlkh() {
            this.nhomtpinlokehoach = await this.$axios.$get('/api/lokehoach/nhomthanhphamlokhpx')
            // console.log(this.nhomtpinlokehoach)
        },

        // --------------------------------------------------------------------------------------
        // 3: Các hàm chức năng
        // Đổi trạng thái cho lô kế hoạch phân xưởng (sau này yêu cầu đổi toàn bộ lô cùng mã hiệu)
        onChange_status(e, data) {
            // console.log(data)
            // 0: chưa đk; 1: dự kiến đăng ký (DK); 2: sản xuất (SX); 3: hoàn thành (HT)
            var id = e.target.value;
            // var name = e.target.options[e.target.options.selectedIndex].text;
            // console.log('id ',id );
            // console.log('name ',name );
            // this.pageSize = id;
            let dt = id
            // console.log(dt)
            this.status = dt
        },
        // lọc nhiều tiêu chí (mã sảnphaamr)
        // async filterData() {
        //     // console.log(this.selectedOptions)
        //     // console.log(this.Options_status)
        //     this.isOpen = false
        //     this.isOpenst = false

        //     const mapxList = this.selectedOptions
        //     const masp = this.multiSearch_masp
        //     const status = this.Options_status
        //     const nhomsp = this.multiSearch_nhomtp

        //     // chọn lọc full
        //     if (this.selectedOptions.length > 0 && this.Options_status.length > 0 && this.multiSearch_masp != "" && this.multiSearch_nhomtp != '') {
        //         this.lokehoachpx = await this.$axios.$get(
        //             `/api/lokehoach/filterfulldk`, {
        //             params: {
        //                 mapx: mapxList, // Truyền danh sách mã phân xưởng lên server
        //                 masp: masp,
        //                 status: status,
        //                 nhomsp: nhomsp
        //             },
        //         }
        //         );
        //     }
        //     // chỉ có mã px
        //     else if (this.selectedOptions.length > 0 && !this.Options_status.length && this.multiSearch_masp == "" && this.multiSearch_nhomtp == '') {
        //         this.lokehoachpx = await this.$axios.$get(
        //             `/api/lokehoach/filteronlymapx`, {
        //             params: {
        //                 mapx: mapxList,
        //             },
        //         }
        //         );
        //     }
        //     // chỉ có mã px và mã sp
        //     else if (this.selectedOptions.length > 0 && !this.Options_status.length && this.multiSearch_masp != "" && this.multiSearch_nhomtp == '') {
        //         this.lokehoachpx = await this.$axios.$get(
        //             `/api/lokehoach/filteronlymapxandmasp`, {
        //             params: {
        //                 mapx: mapxList,
        //                 masp: masp
        //             },
        //         }
        //         );
        //     }
        //     // chỉ có mã px và nhomsp
        //     else if (this.selectedOptions.length > 0 && !this.Options_status.length && this.multiSearch_masp == "" && this.multiSearch_nhomtp != '') {
        //         this.lokehoachpx = await this.$axios.$get(
        //             `/api/lokehoach/filteronlymapxandnhomsp`, {
        //             params: {
        //                 mapx: mapxList,
        //                 nhomsp: nhomsp
        //             },
        //         }
        //         );
        //     }
        //     // chỉ có mã px và status
        //     else if (this.selectedOptions.length > 0 && this.Options_status.length > 0 && this.multiSearch_masp == "" && this.multiSearch_nhomtp == '') {
        //         this.lokehoachpx = await this.$axios.$get(
        //             `/api/lokehoach/filteronlymapxandstatus`, {
        //             params: {
        //                 mapx: mapxList,
        //                 status: status
        //             },
        //         }
        //         );
        //     }
        //     // lọc mỗi trạng thái
        //     else if (!this.selectedOptions.length && this.Options_status.length > 0 && this.multiSearch_masp == "" && this.multiSearch_nhomtp == '') {
        //         this.lokehoachpx = await this.$axios.$get(
        //             `/api/lokehoach/filteronlystatus`, {
        //             params: {
        //                 status: status
        //             },
        //         }
        //         );
        //     }

        //     // lọc mỗi mã sản phẩm
        //     else if (!this.selectedOptions.length && !this.Options_status.length && this.multiSearch_masp != "" && this.multiSearch_nhomtp == '') {
        //         this.lokehoachpx = await this.$axios.$get(
        //             `/api/lokehoach/filteronlymasp`, {
        //             params: {
        //                 masp: masp
        //             },
        //         }
        //         );
        //     }

        //     // lọc sản phẩm + trạng thái
        //     else if (!this.selectedOptions.length && this.Options_status.length > 0 && this.multiSearch_masp != "" && this.multiSearch_nhomtp == '') {
        //         this.lokehoachpx = await this.$axios.$get(
        //             `/api/lokehoach/filteronlymaspandstatus`, {
        //             params: {
        //                 masp: masp,
        //                 status: status
        //             },
        //         }
        //         );
        //     }

        //     // lọc mỗi nhóm px
        //     else if (!this.selectedOptions.length && !this.Options_status.length && this.multiSearch_masp == "" && this.multiSearch_nhomtp != '') {
        //         this.lokehoachpx = await this.$axios.$get(
        //             `/api/lokehoach/filteronlynhomsp`, {
        //             params: {
        //                 nhomsp: nhomsp,
        //             },
        //         }
        //         );
        //     }

        //     // lọc mỗi nhóm sp và sản phẩm
        //     else if (!this.selectedOptions.length && !this.Options_status.length && this.multiSearch_masp != "" && this.multiSearch_nhomtp != '') {
        //         this.lokehoachpx = await this.$axios.$get(
        //             `/api/lokehoach/filteronlynhomspandmasp`, {
        //             params: {
        //                 nhomsp: nhomsp,
        //                 masp: masp
        //             },
        //         }
        //         );
        //     }

        //     // lọc mỗi nhóm sp và trạng thái
        //     else if (!this.selectedOptions.length && this.Options_status.length > 0 && this.multiSearch_masp == "" && this.multiSearch_nhomtp != '') {
        //         this.lokehoachpx = await this.$axios.$get(
        //             `/api/lokehoach/filteronlynhomspandstatus`, {
        //             params: {
        //                 nhomsp: nhomsp,
        //                 status: status
        //             },
        //         }
        //         );
        //     }

        //     // lọc xưởng, nhóm sp và status
        //     else if (this.selectedOptions.length > 0 && this.Options_status.length > 0 && this.multiSearch_masp == "" && this.multiSearch_nhomtp != '') {
        //         this.lokehoachpx = await this.$axios.$get(
        //             `/api/lokehoach/filteronlypxandnhomspandstatus`, {
        //             params: {
        //                 nhomsp: nhomsp,
        //                 status: status,
        //                 mapx: mapxList,
        //             },
        //         }
        //         );
        //     }

        // },
        async filterData() {
            // console.log(this.selectedOptions)
            // console.log(this.Options_status)
            this.isOpen = false
            this.isOpenst = false

            const mapxList = this.selectedOptions
            // const masp = this.multiSearch_masp
            const matp = this.multiSearch_matp
            const status = this.Options_status
            const nhomtp = this.multiSearch_nhomtp

            // chọn lọc full
            if (this.selectedOptions.length > 0 && this.Options_status.length > 0 && this.multiSearch_matp != "" && this.multiSearch_nhomtp != '') {
                this.lokehoachpx = await this.$axios.$get(
                    `/api/lokehoach/filterfulldkmtp`, {
                    params: {
                        mapx: mapxList, // Truyền danh sách mã phân xưởng lên server
                        matp: matp,
                        status: status,
                        nhomtp: nhomtp
                    },
                }
                );
            }
            // chỉ có mã px
            else if (this.selectedOptions.length > 0 && !this.Options_status.length && this.multiSearch_matp == "" && this.multiSearch_nhomtp == '') {
                this.lokehoachpx = await this.$axios.$get(
                    `/api/lokehoach/filteronlymapx`, {
                    params: {
                        mapx: mapxList,
                    },
                }
                );
            }
            // chỉ có mã px và mã tp
            else if (this.selectedOptions.length > 0 && !this.Options_status.length && this.multiSearch_matp != "" && this.multiSearch_nhomtp == '') {
                console.log(this.selectedOptions)

                this.lokehoachpx = await this.$axios.$get(
                    `/api/lokehoach/filteronlymapxandmatp`, {
                    params: {
                        mapx: mapxList,
                        matp: matp
                    },
                }
                );
            }
            // chỉ có mã px và nhomtp
            else if (this.selectedOptions.length > 0 && !this.Options_status.length && this.multiSearch_matp == "" && this.multiSearch_nhomtp != '') {
                this.lokehoachpx = await this.$axios.$get(
                    `/api/lokehoach/filteronlymapxandnhomtp`, {
                    params: {
                        mapx: mapxList,
                        nhomtp: nhomtp
                    },
                }
                );
            }
            // chỉ có mã px và status
            else if (this.selectedOptions.length > 0 && this.Options_status.length > 0 && this.multiSearch_matp == "" && this.multiSearch_nhomtp == '') {
                this.lokehoachpx = await this.$axios.$get(
                    `/api/lokehoach/filteronlymapxandstatus`, {
                    params: {
                        mapx: mapxList,
                        status: status
                    },
                }
                );
            }
            // lọc mỗi trạng thái
            else if (!this.selectedOptions.length && this.Options_status.length > 0 && this.multiSearch_matp == "" && this.multiSearch_nhomtp == '') {
                this.lokehoachpx = await this.$axios.$get(
                    `/api/lokehoach/filteronlystatus`, {
                    params: {
                        status: status
                    },
                }
                );
            }

            // lọc mỗi mã thành phẩm
            else if (!this.selectedOptions.length && !this.Options_status.length && this.multiSearch_matp != "" && this.multiSearch_nhomtp == '') {
                this.lokehoachpx = await this.$axios.$get(
                    `/api/lokehoach/filteronlymatp`, {
                    params: {
                        matp: matp
                    },
                }
                );
            }

            // lọc thành phẩm + trạng thái
            else if (!this.selectedOptions.length && this.Options_status.length > 0 && this.multiSearch_matp != "" && this.multiSearch_nhomtp == '') {
                this.lokehoachpx = await this.$axios.$get(
                    `/api/lokehoach/filteronlymatpandstatus`, {
                    params: {
                        matp: matp,
                        status: status
                    },
                }
                );
            }

            // lọc mỗi nhóm thành phẩm
            else if (!this.selectedOptions.length && !this.Options_status.length && this.multiSearch_matp == "" && this.multiSearch_nhomtp != '') {
                this.lokehoachpx = await this.$axios.$get(
                    `/api/lokehoach/filteronlynhomtp`, {
                    params: {
                        nhomtp: nhomtp,
                    },
                }
                );
            }

            // lọc mỗi nhóm thành phẩm và mã thành phẩm
            else if (!this.selectedOptions.length && !this.Options_status.length && this.multiSearch_matp != "" && this.multiSearch_nhomtp != '') {
                this.lokehoachpx = await this.$axios.$get(
                    `/api/lokehoach/filteronlynhomtpandmatp`, {
                    params: {
                        nhomtp: nhomtp,
                        matp: matp
                    },
                }
                );
            }

            // lọc mỗi nhóm tp và trạng thái
            else if (!this.selectedOptions.length && this.Options_status.length > 0 && this.multiSearch_matp == "" && this.multiSearch_nhomtp != '') {
                this.lokehoachpx = await this.$axios.$get(
                    `/api/lokehoach/filteronlynhomtpandstatus`, {
                    params: {
                        nhomtp: nhomtp,
                        status: status
                    },
                }
                );
            }

            // lọc nhóm thành phẩm; nhóm sản phẩm và trạng thái
            else if (!this.selectedOptions.length && this.Options_status.length > 0 && this.multiSearch_matp != "" && this.multiSearch_nhomtp != '') {
                this.lokehoachpx = await this.$axios.$get(
                    `/api/lokehoach/filteronlynhomtpnhomtpstatus`, {
                    params: {
                        nhomtp: nhomtp,
                        status: status,
                        matp: matp
                    },
                }
                );
            }
            // lọc xưởng, nhóm tp và status
            else if (this.selectedOptions.length > 0 && this.Options_status.length > 0 && this.multiSearch_matp == "" && this.multiSearch_nhomtp != '') {
                this.lokehoachpx = await this.$axios.$get(
                    `/api/lokehoach/filteronlypxandnhomtpandstatus`, {
                    params: {
                        nhomtp: nhomtp,
                        status: status,
                        mapx: mapxList,
                    },
                }
                );
            }
            // lọc xưởng, nhóm tp và mã thành phẩm
            else if (this.selectedOptions.length > 0 && !this.Options_status.length && this.multiSearch_matp != "" && this.multiSearch_nhomtp != '') {
                this.lokehoachpx = await this.$axios.$get(
                    `/api/lokehoach/filteronlypxandnhomtpmatp`, {
                    params: {
                        nhomtp: nhomtp,
                        matp: matp,
                        mapx: mapxList,
                    },
                }
                );
            }

        },

        // --------------------------------------------------------------------------------------
        // 4: Các hàm CRUD
        // update lô kế hoạch phân xưởng
        async onUpdate_lokhpx(data) {
            // console.log(data)
            // Tiến hành update cho table lokehoach - tức là lô Nhà máy
            // Nếu bất kỳ phân xưởng nào trong lokehoachphanxuong có phát sinh SX hoặc ĐK thì tức là mã lô nhà máy đó thành đăng ký 
            // status = 1 (DK)
            // update theo mã lô nhà máy và _id

            try {
                this.$axios.$get(
                    `/api/lokehoach/updatestatuslonhamay?status=${data.status}&makhpx=${data.makh}`
                );
                // data.status = this.status
                this.$axios.$patch(
                    `/api/lokehoach/updatelokehoachpxatdangkylodesanxuat/${data._id}`,
                    data
                );
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.addEventListener("mouseenter", Swal.stopTimer);
                        toast.addEventListener("mouseleave", Swal.resumeTimer);
                    },
                });
                Toast.fire({
                    icon: "success",
                    title: "Đã cập nhật",
                });
            } catch (error) {
                // console.log(error);
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.addEventListener("mouseenter", Swal.stopTimer);
                        toast.addEventListener("mouseleave", Swal.resumeTimer);
                    },
                });
                Toast.fire({
                    icon: "error",
                    title: "Có lỗi xảy ra !!!",
                });
            }
        },

    },
};
</script>

<style scoped>
.table_wrapper {
    white-space: nowrap;
}

.table_wrapper {
    position: sticky;
    left: 0;
    background-color: whitesmoke;
}


.modal-content,
.modal-card {
    width: 1320px;
    height: 800px;
}

#preview {
    display: flex;
    justify-content: center;
    align-items: center;
}

#preview img {
    max-width: 90px;
    max-height: 90px;
}

.highlight {
    background-color: #eff5fb;
}

tr:hover {
    cursor: pointer;
    background-color: #fffaeb;
}

.select-wrapper {
    position: relative;
    width: 200px;
}

.select-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    background-color: #f2f2f2;
    border: 1px solid #ddd;
    cursor: pointer;
    height: 29px;
    text-align: center;
    color: #cb4b10;
    font-weight: 700;
}

.arrow {
    border-style: solid;
    border-width: 0.15em 0.15em 0 0;
    content: '';
    display: inline-block;
    height: 0.45em;
    left: 0.25em;
    position: relative;
    top: 0.25em;
    transform: rotate(-45deg);
    vertical-align: top;
    width: 0.45em;
}

.arrow.open {
    transform: rotate(135deg);
}

.select-options {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: #fff;
    border: 1px solid #ddd;
    z-index: 1;
    padding-top: 5px;
    padding-left: 5px;
    padding-bottom: 5px;
    text-align: left;
}

.select-options.open {
    display: block;
}

.pagination {
    display: flex;
    justify-content: center;
    margin-top: 5px;
    padding-bottom: 10px;
}

.pagination button {
    margin: 0 5px;
    padding: 5px 10px;
    border: none;
    background-color: #ccc;
    color: #fff;
    cursor: pointer;
}

.pagination button.active {
    background-color: #cb4b10;
}

.autocomplete {
    position: relative;
}

.autocomplete-items {
    position: absolute;
    background-color: white;
    border: 1px solid #d4d4d4;
    border-bottom: none;
    border-top: none;
    z-index: 99;
    top: 100%;
    left: 0;
    right: 0;
}

.autocomplete-item {
    padding: 4px;
    cursor: pointer;
    border-bottom: 1px solid #d4d4d4;
    font-size: small;
}

.autocomplete-item:hover {
    background-color: #fffaeb;
}
</style>
