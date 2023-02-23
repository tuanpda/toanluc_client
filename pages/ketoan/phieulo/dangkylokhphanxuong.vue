<template>
    <div class="columns">
        <div class="column">
            <br />
            <div class="box" style="margin-left: 20px; margin-right: 20px">
                <div class="columns">
                    <div class="column is-11">
                        <div class="control">
                            <span class="icon is-small is-left">
                                <i style="color: #ff55acee" class="fas fa-broom"></i>
                            </span>
                            <span style="color: #3850b7; font-size: 17px; font-weight: bold">Đăng ký lô kế hoạch phân
                                xưởng</span>
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
                        <tr style="background-color: #faf0f5;">
                            <td style="width: 15%">
                                <div class="field has-addons">
                                    <p class="control is-expanded">
                                        <input v-model="search_nhomsp" class="input is-small is-fullwidth" type="text"
                                            placeholder="Tìm theo nhóm sản phẩm">
                                    </p>
                                    <p class="control">
                                        <a @click="searhNhomsp" class="button is-small">
                                            Lọc
                                        </a>
                                    </p>
                                </div>
                            </td>
                            <td style="width: 15%">
                                <div class="field has-addons">
                                    <p class="control is-expanded">
                                        <input v-model="search_sanpham" class="input is-small is-fullwidth" type="text"
                                            placeholder="Tìm theo nhóm sản phẩm">
                                    </p>
                                    <p class="control">
                                        <a @click="searhSanpham" class="button is-small">
                                            Lọc
                                        </a>
                                    </p>
                                </div>
                            </td>
                            <td style="width: 15%">
                                <div class="field has-addons">
                                    <p class="control is-expanded">
                                        <input v-model="search_timekt" type="date" class="input is-small">
                                    </p>
                                    <p class="control">
                                        <a @click="searhTimeketthuc" class="button is-small">
                                            Lọc
                                        </a>
                                    </p>
                                </div>
                            </td>
                            <td style="width: 9%; text-align: center;">
                                <vue-excel-xlsx :data="sllosx" :columns="columns" :file-name="'lonhamay'"
                                    :file-type="'xlsx'" :sheet-name="'Lô nhà máy'">
                                    Download Excel
                                </vue-excel-xlsx>
                            </td>
                            <td style="width: 7.3%">
                                <button @click="getAlllonhamay"
                                    class="button is-small is-danger is-fullwidth">Refresh</button>
                            </td>
                            <td></td>
                        </tr>
                    </table>
                </div>
                <div class="table_wrapper">
                    <table class="table is-responsive is-bordered is-narrow is-fullwidth">
                        <tr style="background-color: #f4f2f8">
                            <td style="font-size: small; text-align: center; font-weight: 600; width: 2%">STT</td>
                            <td @click="sort('makh')"
                                style="font-size: small; text-align: center; font-weight: 600; width: 7%">Kế hoạch năm
                            </td>
                            <td @click="sort('makhpx')"
                                style="font-size: small; text-align: center; font-weight: 600; width: 10%">Lô nhà máy
                            </td>
                            <td @click="sort('nhomsp')"
                                style="font-size: small; text-align: center; font-weight: 600; width: 6%">Nhóm thành phẩm
                            </td>
                            <td @click="sort('masp')"
                                style="font-size: small; text-align: center; font-weight: 600; width: 7%">Mã thành phẩm
                            </td>
                            <td @click="sort('tensp')"
                                style="font-size: small; text-align: center; font-weight: 600; width: 17%">Tên SP
                            </td>
                            <td @click="sort('ngaybd')"
                                style="font-size: small; text-align: center; font-weight: 600; width: 5%;">Ngày bắt đầu
                            </td>
                            <td @click="sort('ngaykt')"
                                style="font-size: small; text-align: center; font-weight: 600; width: 5%;">Ngày kết thúc
                            </td>
                            <td @click="sort('soluong')"
                                style="font-size: small; text-align: center; font-weight: 600; width: 5%;">Số lượng
                            </td>
                            <td style="font-size: small; text-align: center; font-weight: 600; width: 5%;">Trạng thái
                            </td>
                            <td style="font-size: small; text-align: center; font-weight: 600; width: 5%;">PX1
                            </td>
                            <td style="font-size: small; text-align: center; font-weight: 600; width: 5%;">PX2
                            </td>
                            <td style="font-size: small; text-align: center; font-weight: 600; width: 5%;">PX3
                            </td>
                            <td style="font-size: small; text-align: center; font-weight: 600; width: 5%;">PX4
                            </td>
                            <td style="font-size: small; text-align: center; font-weight: 600; width: 5%;">PX5
                            </td>
                        </tr>
                        <tr v-for="(item, index) in sortedsllosx" :key="index + 'llllkiq'"
                            :class="{ highlight: item._id == phieulosx }">
                            <td style="font-size: small; text-align: center; background-color: #effaf5;">{{ index + 1 }}
                            </td>
                            <td style="font-size: small; background-color: #effaf5;">{{ item.makh }}</td>
                            <td @click="getInfoLosx(item)" style="font-size: small; background-color: #fffaeb;">{{
                                item.makhpx
                            }}</td>
                            <td style="font-size: small; background-color: #effaf5; text-align: center;">{{
                                item.nhomsp
                            }}</td>
                            <td style="font-size: small; background-color: #effaf5; text-align: center;">{{ item.masp }}
                            </td>

                            <td style="font-size: small; background-color: #effaf5;">{{ item.tensp }}</td>
                            <td style="font-size: small; text-align: center; background-color: #effaf5;">{{
                                item.ngaybd | formatDate
                            }}</td>
                            <td style="font-size: small; text-align: center; background-color: #effaf5;">{{
                                item.ngaykt | formatDate
                            }}</td>
                            <td style="font-size: small; text-align: center; background-color: #effaf5;">{{
                                item.soluong
                            }}</td>
                            <td style="font-size: small; text-align: center">
                                <span v-if="item.status == false">
                                    <i style="color: #ffd863" class="fa fa-circle"></i>
                                </span>
                                <span v-else>
                                    <i style="color: #00947e" class="fa fa-circle"></i>
                                </span>
                            </td>
                        </tr>
                    </table>
                    <table class="table is-responsive is-bordered is-narrow is-fullwidth">
                        <tr>
                            <td style="font-size: small; width: 12%;">
                                <div class="select is-small is-fullwidth">
                                    <select id="" @change="onChange_pageSize($event)">
                                        <option selected>-- Số dòng hiển thị --</option>
                                        <option value="5">5 dòng dữ liệu</option>
                                        <option value="10">10 dòng dữ liệu</option>
                                        <option value="15">15 dòng dữ liệu</option>
                                        <option value="20">20 dòng dữ liệu</option>
                                        <option value="30">30 dòng dữ liệu</option>
                                        <option value="40">40 dòng dữ liệu</option>
                                        <option value="50">50 dòng dữ liệu</option>
                                    </select>
                                </div>
                            </td>
                            <td style="font-size: small; width: 6%;">Đang Sort theo: {{ currentSort }}</td>
                            <td style="font-size: small; width: 6%;">Thứ tự: {{ currentSortDir }} (asc: Tăng - desc:
                                Giảm)</td>
                            <td style="font-size: small;">Đang ở trang: {{ currentPage }}</td>
                            <td style="text-align: right;">
                                <a @click="prevPage"><span class="icon is-small">
                                        <i class="fas fa-angle-double-left"></i>
                                    </span></a>
                                {{ currentPage }}
                                <a @click="nextPage"><span class="icon is-small">
                                        <i class="fas fa-angle-double-right"></i>
                                    </span></a>
                            </td>
                        </tr>
                    </table>
                </div>
                <br />
                <div v-if="checkViewluong == true">
                    <div class="">
                        <table class="table is-responsive is-bordered is-narrow is-fullwidth">
                            <tr style="background-color: #feecf0">
                                <td colspan="9" style="font-weight: bold; font-size: small">
                                    <span>Mã lô nhà máy: </span> <span style="color: red;">{{ dataLonm.makhpx }}</span>
                                    |
                                    <span>Ngày bắt đầu: </span> <span style="color: red;">{{
                                        dataLonm.ngaybd |
                                        formatDate
                                    }}</span> |
                                    <span>Ngày kết thúc: </span> <span style="color: red;">{{
                                        dataLonm.ngaykt |
                                        formatDate
                                    }}</span> |
                                    <span>Số lượng: </span> <span style="color: red;">{{
                                        dataLonm.soluong |
                                        formatNumber
                                    }}</span>
                                </td>
                                <td>
                                    <button @click="ghidulieu" class="button is-small is-success is-fullwidth">Ghi dữ
                                        liệu
                                    </button>
                                </td>
                                <td>
                                    <button @click="addLokhpx" class="button is-small is-info is-fullwidth">Đăng
                                        ký</button>
                                </td>
                            </tr>
                            <tr>
                                <td style="text-align: center; font-size:small; font-weight:700; width: 2%">STT</td>
                                <td style="text-align: center; font-size:small; font-weight:700; width: 10%">Mã lô nhà
                                    máy</td>
                                <td style="text-align: center; font-size:small; font-weight:700; width: 15%">Phân xưởng
                                </td>
                                <td style="text-align: center; font-size:small; font-weight:700; width: 20%">Mã Sản phẩm
                                </td>
                                <td style="text-align: center; font-size:small; font-weight:700; width: 10%">Mã kế hoạch
                                    PX</td>
                                <td style="text-align: center; font-size:small; font-weight:700; width: 5%">Số lượng
                                </td>
                                <td style="text-align: center; font-size:small; font-weight:700; width: 7%">Thời gian
                                    bắt đầu</td>
                                <td style="text-align: center; font-size:small; font-weight:700; width: 7%">Thời gian
                                    kết thúc</td>
                                <td @click="sort('ttqt')"
                                    style="text-align: center; font-size:small; font-weight:700; width: 5%">TTQT
                                </td>
                                <td style="text-align: center; font-size:small; font-weight:700; width: 6%">
                                    Copy/Update</td>
                                <td style="text-align: center; font-size:small; font-weight:700; width: 5%">
                                    Xóa</td>

                            </tr>
                            <!-- show ra các lô đã đăng ký -->
                            <tr v-for="(item, index) in datakehoachpx" :key="index + 'ppp'">
                                <td style="font-size: small; text-align: center">
                                    {{ index + 1 }}
                                </td>
                                <td style="font-size: small">
                                    {{ item.malonhamay }}
                                </td>
                                <td style="font-size: small;">
                                    {{ item.tenpx }}
                                </td>
                                <td style="font-size: small">{{ item.maspkhpx }}</td>
                                <td style="font-size: small; text-align: center">
                                    <!-- <input type="text" class="input is-small" v-model="item.makhpx" /> -->
                                    {{ item.makhpx }}
                                </td>
                                <td style="font-size: small; text-align: center">
                                    <input type="text" class="input is-small" v-model="item.soluongkhpx" />
                                </td>
                                <td><input class="input is-small" type="date"
                                        v-bind:value="item.ngaybdkhpx | inputDateFilter"
                                        v-on:input="item.ngaybdkhpx = getDate($event.target.value)"></td>
                                <td><input class="input is-small" type="date"
                                        v-bind:value="item.ngayktkhpx | inputDateFilter"
                                        v-on:input="item.ngayktkhpx = getDate($event.target.value)"></td>
                                <td style="font-size: small; text-align: center"><input type="text" class="input is-small"
                                        v-model="item.ttqt"></td>
                                <td style="text-align: center; font-size: small">
                                    <a @click="onUpdateKehoachpx(item)">
                                        <span style="color: green" class="icon is-small">
                                            <i class="far fa-check-circle"></i>
                                        </span>
                                    </a>
                                </td>
                                <td style="text-align: center; font-size: small">
                                    <a @click="onDeleteKhpx(item)">
                                        <span style="color: red" class="icon is-small">
                                            <i class="fas fa-times"></i>
                                        </span>
                                    </a>
                                </td>
                            </tr>
                            <!-- add row đăng ký -->
                            <template v-if="isphanxuong == 1">
                                <tr v-for="(item, index) in items" :key="index + 'jhooplkmn'">
                                    <td style="font-size: small; text-align:center">
                                        {{ index + 1 }}
                                    </td>
                                    <td style="font-size: small;">{{ item.makh }}</td>
                                    <td>
                                        <div class="control has-icons-left">
                                            <div class="select is-fullwidth is-small">
                                                <select v-model.trim="item.mapx" @change="
                                                    getInfoPX($event, $event.target.selectedIndex, index)
                                                ">
                                                    <option v-for="(item, index) in phanxuong" :key="index + 'gf'"
                                                        :value="item.mapx">
                                                        {{ item.tenpx }}
                                                    </option>
                                                </select>
                                            </div>
                                            <span class="icon is-left">
                                                <i style="color: #48c78e" class="fas fa-dice-d6"></i>
                                            </span>
                                        </div>
                                    </td>
                                    <td style="font-size: small;">
                                        <model-list-select :list="item.sanpham" v-model="item.maspkhpx" option-value="masp"
                                            :custom-text="codeAndNameAndDesc" placeholder="Chọn sản phẩm">
                                        </model-list-select>
                                    </td>
                                    <td><input @change="getTensp(item)" v-model.trim="item.makhpx" type="text"
                                            class="input is-small"></td>
                                    <td><input v-model.trim="item.soluongkhpx" type="text" class="input is-small"></td>
                                    <td><input class="input is-small" type="date"
                                            v-bind:value="item.ngaybdkhpx | inputDateFilter"
                                            v-on:input="item.ngaybdkhpx = getDate($event.target.value)"></td>
                                    <td><input class="input is-small" type="date"
                                            v-bind:value="item.ngayktkhpx | inputDateFilter"
                                            v-on:input="item.ngayktkhpx = getDate($event.target.value)"></td>
                                    <td>
                                        <div class="select is-small is-fullwidth">
                                            <select v-model="item.ttqt">
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                                <option value="6">6</option>
                                                <option value="7">7</option>
                                            </select>
                                        </div>
                                    </td>

                                    <td><button @click="copyadd(item)"
                                            class="button is-small is-warning is-fullwidth">Copy</button></td>
                                    <td><button @click="deleteRow(index)"
                                            class="button is-small is-danger is-fullwidth">Xóa</button></td>
                                </tr>
                            </template>
                        </table>
                    </div>
                </div>
                <br />
            </div>
        </div>
    </div>
</template>

<script>
import Swal from "sweetalert2";
import { ModelListSelect } from "vue-search-select";
import "vue-search-select/dist/VueSearchSelect.css";
export default {
    middleware: "auth",
    components: {
        ModelListSelect,
    },
    data() {
        return {
            dm_sanpham: [],
            phanxuong: [],
            selectedIndex: 0,
            kehoach: [],
            form: {
                makh: "",
                makhpx: "",
                tenpx: "",
                mapx: "",
                masp: "",
                tensp: "",
                createdAt: "",
                createdBy: this.$auth.$state.user.username,
                updateAt: "",
                nhomluong: "",
                malosx: "",
                status: false,
                stopday_losx: "",
                tongdat: "",
                tonghong: "",
                mato: "",
                tento: "",
                id_losx: "",
            },
            // search lô nhà máy
            search_nhomsp: "",
            search_sanpham: "",
            search_timekt: null,
            isphanxuong: 0,
            phieulosx: {},
            checkViewluong: false,
            // new
            maxuong: "",
            tenxuong: "",
            mato: "",
            tento: "",
            sllosx: [],
            // lọc talble
            currentSort: 'mapx',
            currentSortDir: 'asc',
            pageSize: 10,
            currentPage: 1,
            filter: '',
            items: [
                {
                    kehoachnam: "",
                    makh: "",
                    mapx: "",
                    tenpx: "",
                    malonhamay: "",
                    soluonglonm: "",
                    ngaybdlonm: "",
                    ngayktlonm: "",
                    masplonm: "",
                    tensplonm: "",
                    makhpx: "",
                    soluongkhpx: "",
                    ngaybdkhpx: "",
                    ngayktkhpx: "",
                    maspkhpx: "",
                    tenspkhpx: "",
                    nhomluong: "",
                    ghichu: "",
                    createdAt: "",
                    createdBy: "",
                    status: 0,
                    nhomsp: "",
                    sanpham: [
                        {
                            masp: "",
                            tensp: "",
                        },
                    ],
                }
            ],
            dataLonm: [],
            datakehoachpx: [],
            // xuất execl lô nhà máy
            columns: [
                {
                    label: "Mã kế hoạch năm",
                    field: "makh",
                    dataFormat: this.trimData
                },
                {
                    label: "Mã lô sản xuất",
                    field: "makhpx",
                    /* dataFormat: this.priceFormat */
                    dataFormat: this.trimData
                },
                {
                    label: "Ngày bắt đầu",
                    field: "ngaybd",
                    dataFormat: this.prefixformatDate
                },
                {
                    label: "Ngày kết thúc",
                    field: "ngaykt",
                    dataFormat: this.prefixformatDate
                },
                {
                    label: "Mã sản phẩm",
                    field: "masp",
                    dataFormat: this.trimData
                },
                {
                    label: "Tên sản phẩm",
                    field: "tensp",
                    dataFormat: this.trimData
                },
                {
                    label: "Số lượng",
                    field: "soluong",
                    dataFormat: this.trimData
                },

                {
                    label: "Nhóm sản phẩm",
                    field: "nhomsp",
                    dataFormat: this.trimData
                },
                {
                    label: "Trạng thái",
                    field: "status",
                    // dataFormat: this.trimData
                },
            ],
        };
    },

    mounted() {
        this.currentDateTime();
        this.get_phanxuong();
        this.get_kehoach();
        this.getAlllonhamay()
        this.deleteRow(0);
    },

    computed: {
        filteredsllosx() {
            return this.sllosx.filter(c => {
                if (this.filter == '') return true;
                return c.name.toLowerCase().indexOf(this.filter.toLowerCase()) >= 0;
            })
        },
        sortedsllosx() {
            return this.filteredsllosx.sort((a, b) => {
                let modifier = 1;
                if (this.currentSortDir === 'desc') modifier = -1;
                if (a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
                if (a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
                return 0;
            }).filter((row, index) => {
                let start = (this.currentPage - 1) * this.pageSize;
                let end = this.currentPage * this.pageSize;
                if (index >= start && index < end) return true;
            });
        }
    },

    watch: {
        filter() {
            console.log('reset to p1 due to filter');
            this.currentPage = 1;
        }
    },

    // dùng để bind dữ liệu ngày tháng vào input mang kiểu date (type="date" trong thẻ input)
    filters: {
        inputDateFilter: function (date) {
            if (!date) {
                return '';
            }
            date = new Date(date);
            return date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
        },
    },

    methods: {
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

        currentDateTime() {
            const current = new Date();
            const date =
                current.getFullYear() +
                "-" +
                (current.getMonth() + 1) +
                "-" +
                current.getDate();
            const time =
                current.getHours() +
                ":" +
                current.getMinutes() +
                ":" +
                current.getSeconds();
            this.form.createdAt = date + " " + time;
            this.form.updatedAt = date + " " + time
        },

        codeAndNameAndDesc(item) {
            return `${item.masp} - ${item.tensp}`;
        },

        getDate(value) {
            if (!value) {
                return null;
            }
            return new Date(value);
        },

        // search in table
        sort: function (s) {
            //if s == current sort, reverse
            if (s === this.currentSort) {
                this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc';
            }
            this.currentSort = s;
        },

        nextPage: function () {
            if ((this.currentPage * this.pageSize) < this.filteredsllosx.length) this.currentPage++;
        },
        prevPage: function () {
            if (this.currentPage > 1) this.currentPage--;
        },

        // tìm lọc số liệu lô nhà máy theo nhóm sản phẩm
        async searhNhomsp() {
            if (this.search_nhomsp == '') {
                this.sllosx = await this.$axios.$get(
                    `/api/lokehoach/alllonhamay`
                );
            } else if (this.search_sanpham == '' && this.search_nhomsp != '') {
                this.sllosx = await this.$axios.$get(
                    `/api/lokehoach/searchnhomsp?nhomsp=${this.search_nhomsp}`
                );
                if (this.sllosx.length <= 0) {
                    const Toast = Swal.mixin({
                        toast: true,
                        position: "top-end",
                        showConfirmButton: false,
                        timer: 1000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.addEventListener("mouseenter", Swal.stopTimer);
                            toast.addEventListener("mouseleave", Swal.resumeTimer);
                        },
                    });
                    Toast.fire({
                        icon: "success",
                        title: "Không tìm thấy số liệu với nhóm này",
                    });

                    this.sllosx = await this.$axios.$get(
                        `/api/lokehoach/alllonhamay`
                    );
                }
            } else {
                this.sllosx = await this.$axios.$get(
                    `/api/lokehoach/searchsanphamandnhomsp?nhomsp=${this.search_nhomsp}&masp=${this.search_sanpham}`
                );
                if (this.sllosx.length <= 0) {
                    const Toast = Swal.mixin({
                        toast: true,
                        position: "top-end",
                        showConfirmButton: false,
                        timer: 1000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.addEventListener("mouseenter", Swal.stopTimer);
                            toast.addEventListener("mouseleave", Swal.resumeTimer);
                        },
                    });
                    Toast.fire({
                        icon: "success",
                        title: "Không tìm thấy số liệu với nhóm này",
                    });

                    this.sllosx = await this.$axios.$get(
                        `/api/lokehoach/alllonhamay`
                    );
                }
            }
        },

        // tìm lọc số liệu lô nhà máy theo sản phẩm
        async searhSanpham() {
            if (this.search_sanpham == '') {
                this.sllosx = await this.$axios.$get(
                    `/api/lokehoach/alllonhamay`
                );
            } else {
                this.sllosx = await this.$axios.$get(
                    `/api/lokehoach/searchsanpham?masp=${this.search_sanpham}`
                );
                if (this.sllosx.length <= 0) {
                    const Toast = Swal.mixin({
                        toast: true,
                        position: "top-end",
                        showConfirmButton: false,
                        timer: 1000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.addEventListener("mouseenter", Swal.stopTimer);
                            toast.addEventListener("mouseleave", Swal.resumeTimer);
                        },
                    });
                    Toast.fire({
                        icon: "success",
                        title: "Không tìm thấy số liệu với nhóm này",
                    });

                    this.sllosx = await this.$axios.$get(
                        `/api/lokehoach/alllonhamay`
                    );
                }

            }
        },

        // tìm lọc số liệu lô nhà máy theo thời gian kết thúc
        async searhTimeketthuc() {
            // console.log(this.search_timekt)
            if (this.search_timekt == '') {
                this.sllosx = await this.$axios.$get(
                    `/api/lokehoach/alllonhamay`
                );
            } else {
                this.sllosx = await this.$axios.$get(
                    `/api/lokehoach/searchtimekt?ngaykt=${this.search_timekt}`
                );
                if (this.sllosx.length <= 0) {
                    const Toast = Swal.mixin({
                        toast: true,
                        position: "top-end",
                        showConfirmButton: false,
                        timer: 1000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.addEventListener("mouseenter", Swal.stopTimer);
                            toast.addEventListener("mouseleave", Swal.resumeTimer);
                        },
                    });
                    Toast.fire({
                        icon: "success",
                        title: "Không tìm thấy số liệu với nhóm này",
                    });

                    this.sllosx = await this.$axios.$get(
                        `/api/lokehoach/alllonhamay`
                    );
                }

            }
        },

        // Show all lô sản xuất nhà máy
        async getAlllonhamay() {
            this.search_sanpham = ''
            this.search_nhomsp = ''
            this.search_timekt = null
            this.sllosx = await this.$axios.$get(
                `/api/lokehoach/alllonhamay`
            );
            if (this.sllosx.length <= 0) {
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 1000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.addEventListener("mouseenter", Swal.stopTimer);
                        toast.addEventListener("mouseleave", Swal.resumeTimer);
                    },
                });
                Toast.fire({
                    icon: "success",
                    title: "Không tìm thấy số liệu",
                });
            }
        },

        onChange_pageSize(e) {
            var id = e.target.value;
            // var name = e.target.options[e.target.options.selectedIndex].text;
            // console.log('id ',id );
            // console.log('name ',name );
            this.pageSize = id;
        },

        // get all phân xưởng
        async get_phanxuong() {
            this.phanxuong = await this.$axios.$get(`/api/phongban/allphanxuong`);
        },

        // get all kế hoạch năm
        async get_kehoach() {
            this.kehoach = await this.$axios.$get(`/api/lokehoach/getkehoach`);
        },

        // bấm đăng ký lô kế hoạch phân xưởng
        async addLokhpx() {
            this.isphanxuong = 1;
            this.items.push({
                kehoachnam: this.dataLonm.makh,
                makh: this.dataLonm.makhpx,
                mapx: "",
                tenpx: "",
                malonhamay: this.dataLonm.makhpx,
                soluonglonm: this.dataLonm.soluong,
                ngaybdlonm: this.dataLonm.ngaybd,
                ngayktlonm: this.dataLonm.ngaykt,
                masplonm: this.dataLonm.masp,
                tensplonm: this.dataLonm.tensp,
                makhpx: "",
                soluongkhpx: this.dataLonm.soluong,
                ngaybdkhpx: this.dataLonm.ngaybd,
                ngayktkhpx: this.dataLonm.ngaykt,
                maspkhpx: "",
                tenspkhpx: "",
                nhomluong: "",
                ghichu: "",
                createdAt: null,
                createdBy: "",
                status: 0,
                nhomsp: this.dataLonm.nhomsp,
                sanpham: [
                    {
                        masp: "",
                        tensp: "",
                    },
                ],
            });
        },

        // copy dữ liệu đăng ký
        async copyadd(data) {
            // tìm cách lấy tên vật tư do k có @change
            // console.log(data)
            let mapx
            let tenvt
            if (data.mapx == 'AL_PXD' || data.mapx == 'DV_PXD') {
                mapx = 'PXD'
            } else {
                mapx = data.mapx
            }
            let getsp = {}

            getsp = await this.$axios.$get(
                `/api/ketoan/gettensp?mapx=${mapx}&mavt=${data.maspkhpx}`
            );
            if (getsp.length > 0) {
                tenvt = getsp[0].tenvt
            }
            // console.log(tenvt)
            this.items.push({
                kehoachnam: data.kehoachnam,
                makh: data.makh,
                mapx: data.mapx,
                tenpx: data.tenpx,
                malonhamay: data.malonhamay,
                soluonglonm: data.soluonglonm,
                ngaybdlonm: data.ngaybdlonm,
                ngayktlonm: data.ngayktlonm,
                masplonm: data.masplonm,
                tensplonm: data.tensplonm,
                makhpx: data.makhpx,
                soluongkhpx: data.soluongkhpx,
                ngaybdkhpx: data.ngaybdkhpx,
                ngayktkhpx: data.ngayktkhpx,
                maspkhpx: data.maspkhpx,
                tenspkhpx: tenvt,
                nhomluong: data.nhomluong,
                ghichu: "",
                createdAt: data.createdAt,
                createdBy: data.createdBy,
                status: 0,
                sanpham: [
                    {
                        masp: data.maspkhpx,
                        tensp: tenvt,
                    },
                ],
            });
        },

        deleteRow(index) {
            this.items.splice(index, 1);
            if (this.items.length <= 0) {
                this.isphanxuong = 0
            }
        },

        // lấy tên sản phẩm cho phân xưởng đầu tiên
        async getTensp(data) {
            // console.log(data.maspkhpx, data.mapx)
            // get tên sản phẩm
            let getsp = {}
            let tenvt
            let mapx
            let nhom_luong
            let nl
            if (data.mapx == 'AL_PXD' || data.mapx == 'DV_PXD') {
                mapx = 'PXD'
                getsp = await this.$axios.$get(
                    `/api/ketoan/gettensp?mapx=${mapx}&mavt=${data.maspkhpx}`
                );
                nl = await this.$axios.$get(
                    `/api/ketoan/getnhomluong?mapx=${mapx}&mavt=${data.maspkhpx}`
                );
            } else {
                getsp = await this.$axios.$get(
                    `/api/ketoan/gettensp?mapx=${data.mapx}&mavt=${data.maspkhpx}`
                );
                nl = await this.$axios.$get(
                    `/api/ketoan/getnhomluong?mapx=${data.mapx}&mavt=${data.maspkhpx}`
                );
            }

            // console.log(getsp)
            if (getsp.length > 0) {
                tenvt = getsp[0].tenvt
            }
            if (nl.length > 0) {
                nhom_luong = nl[0].nhomluong
            }
            for (let i = 0; i < this.items.length; i++) {
                this.items[i].tenspkhpx = tenvt
                this.items[i].nhomluong = nhom_luong
            }
            console.log(this.items)

        },

        // bấm chọn phân xưởng
        async getInfoPX(e, selectedIndex, index) {
            this.selectedIndex = selectedIndex;
            for (let i = 0; i < this.items.length; i++) {
                if (i == index) {
                    let px;
                    this.items[i].mapx = this.phanxuong[this.selectedIndex].mapx;
                    this.items[i].tenpx = this.phanxuong[this.selectedIndex].tenpx;
                    if (
                        this.items[i].mapx == "AL_PXD" ||
                        this.items[i].mapx == "DV_PXD"
                    ) {
                        px = "PXD";
                        this.dm_sanpham = await this.$axios.$get(
                            `/api/sanpham/getallspwithmapxfromdmnc?mapx=${px}`
                        );
                    } else {
                        this.dm_sanpham = await this.$axios.$get(
                            `/api/sanpham/getallspwithmapxfromdmnc?mapx=${this.items[i].mapx}`
                        );
                    }
                    // console.log(this.dm_sanpham);
                    this.items[i].sanpham = [];

                    for (let k = 0; k < this.dm_sanpham.length; k++) {
                        let cn = {
                            masp: this.dm_sanpham[k].mavt,
                            tensp: this.dm_sanpham[k].tenvt,
                        };
                        this.items[i].sanpham.push(cn);
                        // console.log(cn)
                    }
                }
            }
        },

        // Bấm vào mã lô sản xuất sẽ ra thông tin các lô kế hoạch phân xưởng
        async getInfoLosx(data) {
            this.checkViewluong = true;
            this.dataLonm = data
            // console.log(this.dataLonm)

            this.datakehoachpx = await this.$axios.$get(
                `/api/lokehoach/showlokehoachpx?malonhamay=${this.dataLonm.makhpx}`
            );
            if (this.datakehoachpx.length <= 0) {
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 1000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.addEventListener("mouseenter", Swal.stopTimer);
                        toast.addEventListener("mouseleave", Swal.resumeTimer);
                    },
                });
                Toast.fire({
                    icon: "success",
                    title: "Không tìm thấy số liệu",
                });
            }

        },

        // ghi dữ liệu đăng ký lô kế hoạch phân xưởng
        async ghidulieu() {
            // console.log(this.items)
            if (this.items.length <= 0) {
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
                    title: "Chưa đăng ký gì !!!",
                });
            } else {
                for (let i = 0; i < this.items.length; i++) {
                    this.items[i].createdAt = this.form.createdAt
                    this.items[i].createdBy = this.form.createdBy
                    this.$axios.$post(
                        "/api/ketoan/addphieulokhpx",
                        this.items[i]
                    );
                }
                this.datakehoachpx = await this.$axios.$get(
                    `/api/lokehoach/showlokehoachpx?malonhamay=${this.dataLonm.makhpx}`
                );
                // console.log(this.dataLonm.makhpx)
                // console.log(this.datakehoachpx)

                let turn = 1;
                let length = this.items.length;
                while (turn <= length) {
                    this.deleteRow(this.items.length - turn);
                    turn += 1;
                }

                this.isphanxuong = 0
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
                    title: "Tạo thành công",
                });
            }

        },

        // update lô kế hoạch phân xưởng
        async onUpdateKehoachpx(data) {
            console.log(data)
            try {
                data.updatedAt = this.form.updatedAt
                this.$axios.$patch(
                    `/api/lokehoach/updatelokehoachpx/${data._id}`,
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

        // xóa lô kế hoạch phân xưởng
        async onDeleteKhpx(pl) {
            // lấy ra _id, mã kế hoạch, mã lô nhà máy để xác định là duy nhất
            // console.log(pl)
            let arrlosanxuat
            arrlosanxuat = await this.$axios.$get(`/api/lokehoach/predelete_lokehoachpx?kehoachnam=${pl.kehoachnam.trim()}&makh=${pl.makh.trim()}&makhpx=${pl.makhpx.trim()}&mapx=${pl.mapx}`);
            // console.log(arrlosanxuat)
            swal({
                title: "Bạn muốn xóa?",
                text: "Chỉ được xóa lô kế hoạch phân xưởng khi chưa có lô sản xuất được giao!",
                buttons: true,
                dangerMode: true,
            }).then((willDelete) => {
                if (willDelete) {
                    if (arrlosanxuat.length <= 0) {
                        this.$axios.$delete(`/api/lokehoach/kehoachphanxuong/${pl._id}`)
                            .then(response => {
                                const index = this.datakehoachpx.findIndex(khpx => khpx._id === pl._id) // find the post index 
                                if (~index) // if the post exists in array
                                    this.datakehoachpx.splice(index, 1) //delete the post
                            });
                    } else {
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
                            title: "Đã có lô kế hoạch phân xưởng phát sinh từ lô nhà máy này, không thể xóa!!!",
                        });
                    }

                } else {
                    swal("Bạn đã hủy xóa");
                }
            });
        },
    },
};
</script>

<style scoped>
.table_wrapper {
    display: block;
    overflow-x: auto;
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
</style>
