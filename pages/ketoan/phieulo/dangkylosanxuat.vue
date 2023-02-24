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
                        <!-- tìm theo các điều kiện riêng lẻ -->
                        <tr style="background-color: #faf0f5;">
                            <td style="width: 12%; font-size: small; font-weight: bold;">
                                <div class="icon-text">
                                    <span class="icon has-text-info">
                                        <i class="fas fa-info-circle"></i>
                                    </span>
                                    <span style="color: #296fa8;">Lọc đơn lẻ</span>
                                </div>
                            </td>
                            <!-- 1. theo phân xưởng -->
                            <td style="width: 15%;">
                                <div class="control has-icons-left">
                                    <div class="select is-small is-fullwidth">
                                        <select @change="getWithPX($event)">
                                            <option selected>-- Phân xưởng --</option>
                                            <option v-for="item in phanxuong" :value="item.mapx">
                                                {{ item.mapx }} -- {{ item.tenpx }}
                                            </option>
                                        </select>
                                    </div>
                                    <span class="icon is-small is-left">
                                        <i style="color: #48c78e" class="fas fa-kaaba"></i>
                                    </span>
                                </div>
                            </td>
                            <!-- 2. theo nhóm sản phẩm -->
                            <td style="width: 15%">
                                <div class="field has-addons">
                                    <p class="control is-expanded">
                                        <input v-model="search_nhomsp" class="input is-small is-fullwidth" type="text"
                                            placeholder="Tìm theo nhóm sản phẩm">
                                    </p>
                                    <p class="control">
                                        <a @click="searhNhomsp" class="button is-small"
                                            style="color:darkblue; font-weight: 600;">
                                            Lọc
                                        </a>
                                    </p>
                                </div>
                            </td>
                            <!-- 3. theo sản phẩm -->
                            <td style="width: 15%">
                                <div class="field has-addons">
                                    <p class="control is-expanded">
                                        <input v-model="search_sanpham" class="input is-small is-fullwidth" type="text"
                                            placeholder="Tìm theo sản phẩm">
                                    </p>
                                    <p class="control">
                                        <a @click="searhSanpham" class="button is-small"
                                            style="color:darkblue; font-weight: 600;">
                                            Lọc
                                        </a>
                                    </p>
                                </div>
                            </td>
                            <!-- 4. Mã lô nhà máy -->
                            <td style="width: 15%">
                                <div class="field has-addons">
                                    <p class="control is-expanded">
                                        <input v-model="search_malonm" class="input is-small is-fullwidth" type="text"
                                            placeholder="Tìm mã lô nhà máy">
                                    </p>
                                    <p class="control">
                                        <a @click="searhMalonm" class="button is-small"
                                            style="color:darkblue; font-weight: 600;">
                                            Lọc
                                        </a>
                                    </p>
                                </div>
                            </td>
                            <!-- 5. theo thời gian kết thúc -->
                            <td style="width: 10%">
                                <div class="field has-addons">
                                    <p class="control is-expanded">
                                        <input v-model="search_timeend" type="date" class="input is-small">
                                    </p>
                                    <p class="control">
                                        <a @click="searhtgketthuc" class="button is-small"
                                            style="color:darkblue; font-weight: 600;">
                                            Lọc
                                        </a>
                                    </p>
                                </div>
                            </td>
                            <td style="width: 5%">
                                <button @click="showAllLokhpx"
                                    class="button is-small is-danger is-fullwidth">Refresh</button>
                            </td>
                            <td style="font-size: small; font-weight: bold; text-align: right;"><span>Có: <span
                                        style="color: red;">{{
                                            lokehoachpx.length }}</span> bản
                                    ghi</span></td>
                        </tr>
                        <!-- tìm theo điều kiện multi -->
                        <tr style="background-color: #eff5fb;">
                            <td style="width: 12%; font-size: small; font-weight: bold;">
                                <div class="icon-text">
                                    <span class="icon has-text-success">
                                        <i class="fas fa-check-square"></i>
                                    </span>
                                    <span style="color: #296fa8;">Lọc nhiều tiêu chí</span>
                                </div>
                            </td>
                            <td>
                                <button @click="filterMulti" class="button is-small is-fullwidth">Lọc Lô nhà máy theo
                                    TTQT</button>
                            </td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </table>
                </div>
                <div class="table_wrapper">
                    <table class="table is-responsive is-bordered is-narrow is-fullwidth">
                        <tr style="background-color: #f4f2f8">
                            <td style="font-size: small; text-align: center; font-weight: 600; width: 3%">STT</td>
                            <td @click="sort('makh')"
                                style="font-size: small; text-align: center; font-weight: 600; width: 5%">Mã lô nhà máy
                            </td>
                            <td @click="sort('mapx')"
                                style="font-size: small; text-align: center; font-weight: 600; width: 5%">Mã PX
                            </td>
                            <td @click="sort('makhpx')"
                                style="font-size: small; text-align: center; font-weight: 600; width: 4%">Mã kế hoạch
                                PX
                            </td>
                            <td @click="sort('nhomsp')"
                                style="font-size: small; text-align: center; font-weight: 600; width: 7%">Nhóm SP
                            </td>
                            <td @click="sort('maspkhpx')"
                                style="font-size: small; text-align: center; font-weight: 600; width: 7%">Mã sản phẩm
                            </td>
                            <td @click="sort('ngaybdkhpx')"
                                style="font-size: small; text-align: center; font-weight: 600; width: 8%;">Ngày bắt đầu
                            </td>
                            <td @click="sort('ngayktkhpx')"
                                style="font-size: small; text-align: center; font-weight: 600; width: 8%;">Ngày kết thúc
                            </td>
                            <td @click="sort('soluongkhpx')"
                                style="font-size: small; text-align: center; font-weight: 600; width: 7%;">Số lượng
                            </td>
                            <td @click="sort('ttqt')"
                                style="font-size: small; text-align: center; font-weight: 600; width: 7%;">TTQT
                            </td>
                            <td @click="sort('status')"
                                style="font-size: small; text-align: center; font-weight: 600; width: 5%;">Trạng thái
                            </td>
                            <td @click="sort('soluongkhpx')"
                                style="font-size: small; text-align: center; font-weight: 600; width: 7%;">Chọn Trạng thái
                            </td>
                            <td @click="sort('soluongkhpx')"
                                style="font-size: small; text-align: center; font-weight: 600; width: 7%;">Số lượng HT
                            </td>
                            <td @click="sort('soluongkhpx')"
                                style="font-size: small; text-align: center; font-weight: 600; width: 7%;">Ngày BDTT
                            </td>
                            <td @click="sort('soluongkhpx')"
                                style="font-size: small; text-align: center; font-weight: 600; width: 7%;">Ngày KTTT
                            </td>
                            <td style="font-size: small; text-align: center; font-weight: 600; width: 7%;">Ghi dữ liệu</td>
                        </tr>
                        <tr v-for="(item, index) in lokehoachpx" :key="index + 'llllkiq'"
                            @click="click_Add_Losanxuat(item)">
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
                                <td v-if="item.status == 0"
                                    style="font-size: small; text-align: center; background-color: whitesmoke;">0</td>
                                <td v-else-if="item.status == 1" style="font-size: small; text-align: center; "><span
                                        style="color: white; font-weight: bold; background-color: red; padding-left: 7px; padding-right: 7px;">DK</span>
                                </td>
                                <td v-else-if="item.status == 2" style="font-size: small; text-align: center;">
                                    <span
                                        style="color: red; font-weight: bold; background-color: yellow; padding-left: 7px; padding-right: 7px;">SX</span>
                                </td>
                                <td v-else style="font-size: small; text-align: center;">
                                    <span
                                        style="color: white; font-weight: bold; background-color: green; padding-left: 7px; padding-right: 7px;">HT</span>
                                </td>
                            </template>

                            <td style="font-size: small; width: 10%;">
                                <div class="select is-small is-fullwidth">
                                    <select id="" @change="onChange_status($event)" v-model="item.status">
                                        <option selected>-- Trạng thái --</option>
                                        <option value="3">HT</option>
                                        <option value="2">SX</option>
                                        <option value="1">DK</option>
                                        <option value="0">0</option>
                                    </select>
                                </div>
                            </td>
                            <td style="font-size: small; text-align: center; background-color: #effaf5;">111</td>
                            <td style="font-size: small; text-align: center; background-color: #effaf5;">0101</td>
                            <td style="font-size: small; text-align: center; background-color: #effaf5;">0101</td>
                            <td><button @click="onUpdate_lokhpx(item)"
                                    class="button is-small is-success is-fullwidth">Ghi</button>
                            </td>
                        </tr>
                    </table>
                    <table class="table is-responsive is-bordered is-narrow is-fullwidth">
                        <tr>
                            <td style="font-size: small; width: 13.1%;">
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
                            <td style="font-size: small; width: 9%;">Đang Sort theo: {{ currentSort }}</td>
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

                <!-- Phần đăng ký -->
                <br />
                <div v-if="checkViewRegLsx == true">
                    <div class="">
                        <table class="table is-responsive is-bordered is-narrow is-fullwidth">
                            <tr style="background-color: #feecf0">
                                <td colspan="6" style="font-weight: bold; font-size: small">
                                    <span>Mã lô nhà máy: </span> <span style="color: red;">{{
                                        showLophanxuong.makh
                                    }}</span>
                                    |
                                    <span>Mã phân xưởng: </span> <span style="color: red;">{{
                                        showLophanxuong.mapx
                                    }}</span>
                                    |
                                    <span>Mã kế hoạch phân xưởng: </span> <span style="color: red;">{{
                                        showLophanxuong.makhpx
                                    }}</span>
                                    |
                                    <span>Mã sản phẩm: </span> <span style="color: red;">{{
                                        showLophanxuong.maspkhpx
                                    }}</span>
                                    |
                                    <span>Ngày bắt đầu: </span> <span style="color: red;">{{
                                        showLophanxuong.ngaybdkhpx |
                                        formatDate
                                    }}</span> |
                                    <span>Ngày kết thúc: </span> <span style="color: red;">{{
                                        showLophanxuong.ngayktkhpx |
                                        formatDate
                                    }}</span> |
                                    <span>Số lượng: </span> <span style="color: red;">{{
                                        showLophanxuong.soluongkhpx |
                                        formatNumber
                                    }}</span>
                                </td>
                                <td>
                                    <button @click="ghidulieu" class="button is-small is-success is-fullwidth">Ghi dữ
                                        liệu
                                    </button>
                                </td>
                                <td>
                                    <button @click="addLosanxuat" class="button is-small is-info is-fullwidth">Đăng
                                        ký</button>
                                </td>
                            </tr>
                            <tr>
                                <td style="text-align: center; font-size:small; font-weight:700; width: 3%">STT</td>
                                <!-- <td style="text-align: center; font-size:small; font-weight:700; width: 15%">Phân xưởng
                                </td> -->
                                <td style="text-align: center; font-size:small; font-weight:700; width: 20%">Tổ / nhóm
                                </td>
                                <td style="text-align: center; font-size:small; font-weight:700; width: 10%">Mã Lô sản
                                    xuất</td>
                                <td style="text-align: center; font-size:small; font-weight:700; width: 5%">Số lượng
                                </td>
                                <td style="text-align: center; font-size:small; font-weight:700; width: 6%">Thời gian
                                    bắt đầu</td>
                                <td style="text-align: center; font-size:small; font-weight:700; width: 6%">Thời gian
                                    kết thúc</td>
                                <td style="text-align: center; font-size:small; font-weight:700; width: 5%">
                                    Copy / Update</td>
                                <td style="text-align: center; font-size:small; font-weight:700; width: 5%">
                                    Xóa</td>

                            </tr>
                            <!-- show ra các lô đã đăng ký -->
                            <tr v-for="(item, index) in losanxuat" :key="index + 'ppp'">
                                <td style="font-size: small; text-align: center">
                                    {{ index + 1 }}
                                </td>
                                <td style="font-size: small;">
                                    {{ item.mato }} -- {{ item.tento }}
                                </td>
                                <td style="font-size: small; text-align: center;"><input type="text" class="input is-small"
                                        v-model="item.malosx"></td>
                                <td style="font-size: small; text-align: center">
                                    <input type="text" class="input is-small" v-model="item.soluonglsx" />
                                </td>
                                <!-- <td style="font-size: small; text-align: center">
                                    {{ item.ngaybd | formatDate }}
                                </td>
                                <td style="font-size: small; text-align: center">
                                    {{ item.ngaykt | formatDate }}
                                </td> -->
                                <td><input class="input is-small" type="date" v-bind:value="item.ngaybd | inputDateFilter"
                                        v-on:input="item.ngaybd = getDate($event.target.value)"></td>
                                <td><input class="input is-small" type="date" v-bind:value="item.ngaykt | inputDateFilter"
                                        v-on:input="item.ngaykt = getDate($event.target.value)"></td>

                                <td style="text-align: center; font-size: small">
                                    <a @click="onUpdate(item)">
                                        <span style="color: green" class="icon is-small">
                                            <i class="far fa-check-circle"></i>
                                        </span>
                                    </a>
                                </td>
                                <td style="text-align: center; font-size: small">
                                    <a @click="onDeleteK(item)">
                                        <span style="color: red" class="icon is-small">
                                            <i class="fas fa-times"></i>
                                        </span>
                                    </a>
                                </td>
                            </tr>
                            <!-- add row đăng ký -->
                            <template v-if="isaddlosx == 1">
                                <tr v-for="(item, index) in items" :key="index + 'jhooplkmn'">
                                    <td style="font-size: small; text-align:center">
                                        {{ index + 1 }}
                                    </td>
                                    <td style="font-size: small;">
                                        <div class="select is-small is-fullwidth">
                                            <select @change="
                                                getWithTo($event, $event.target.selectedIndex, index)
                                            ">
                                                <option value="" selected>-- Chọn tổ --</option>
                                                <option v-for="item in tonhom" :value="item.mato">
                                                    {{ item.mato }} -- {{ item.tento }}
                                                </option>
                                            </select>
                                        </div>
                                    </td>
                                    <td><input v-model.trim="item.malosx" type="text" class="input is-small"></td>
                                    <td><input v-model.trim="item.soluonglsx" type="text" class="input is-small"></td>
                                    <td><input class="input is-small" type="date"
                                            v-bind:value="item.ngaybd | inputDateFilter"
                                            v-on:input="item.ngaybd = getDate($event.target.value)"></td>
                                    <td><input class="input is-small" type="date"
                                            v-bind:value="item.ngaykt | inputDateFilter"
                                            v-on:input="item.ngaykt = getDate($event.target.value)"></td>
                                    <td>
                                        <button @click="copyadd(item)"
                                            class="button is-small is-warning is-fullwidth">Copy</button>
                                    </td>
                                    <td><button @click="deleteRow(index)"
                                            class="button is-small is-danger is-fullwidth">Xóa</button>
                                    </td>
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
            // dữ liệu 
            lokehoachpx: [],
            phanxuong: [],
            showLophanxuong: [], // khi bấm vào lô kế hoạch phân xưởng nào đó sẽ lưu thông tin lô đó vào biến này
            losanxuat: [], // lưu lô sản xuất

            // các biến tìm kiếm
            search_maxuong: "",
            search_tenxuong: "",
            search_timeend: "",
            search_nhomsp: "",
            search_sanpham: "",
            search_status: "",
            search_malonm: "",

            search_maxuong_multi: "",
            search_tenxuong_multi: "",

            // lọc talble
            currentSort: 'mapx',
            currentSortDir: 'asc',
            pageSize: 15,
            currentPage: 1,
            filter: '',

            // gán biến status
            status: 0,

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
            nhomluong: [] // lưu nhóm lương
        };
    },

    mounted() {
        this.showAllLokhpx()
        this.showAllPx()
        this.deleteRow(0);
    },

    computed: {
        filteredsllosx() {
            return this.lokehoachpx.filter(c => {
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


    methods: {
        // các hàm phục vụ tính toán
        // hàm bind v-model input type date
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
        onChange_pageSize(e) {
            var id = e.target.value;
            // var name = e.target.options[e.target.options.selectedIndex].text;
            // console.log('id ',id );
            // console.log('name ',name );
            this.pageSize = id;
        },

        // thay đổi status
        onChange_status(e) {
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

        // các hàm get dữ liệu
        // show ra danh sách tất cả các lô kế hoạch phân xưởng sắp xếp theo phân xưởng
        async showAllLokhpx() {
            this.lokehoachpx = await this.$axios.$get(
                `/api/lokehoach/getallkehoachphanxuong`
            );
            this.search_timeend = null
            this.search_malonm = ""
            this.search_nhomsp = ""
            this.search_sanpham = ""
        },

        // get all phân xưởng 
        async showAllPx() {
            this.phanxuong = await this.$axios.$get(`/api/phongban/allphanxuong`);
        },

        // bấm vào chọn phân xưởng khi lọc khi lọc đơn
        async getWithPX(e) {
            var name = e.target.options[e.target.options.selectedIndex].text;
            // console.log(name)
            let position = name.split("--");
            let p1 = position[0].trim();
            let p2 = position[1].trim();
            this.search_maxuong = p1;
            this.search_tenxuong = p2;
            this.lokehoachpx = await this.$axios.$get(
                `/api/lokehoach/getallkehoachpxwithmapx?mapx=${this.search_maxuong}`
            );
        },

        // Lọc sắp xếp các lô nhà máy và sort theo thứ tự quy trình
        async filterMulti(e) {
            this.lokehoachpx = await this.$axios.$get(
                `/api/lokehoach/sortmalonmsortttqt`
            );
        },

        // click vào ô mã kế hoạch
        async click_Add_Losanxuat(data) {
            this.checkViewRegLsx = true;
            this.showLophanxuong = data
            // console.log(this.showLophanxuong)
            let turn = 1;
            let length = this.items.length;
            while (turn <= length) {
                this.deleteRow(this.items.length - turn);
                turn += 1;
            }
            // show ra các lô sản xuất đã đăng ký
            this.losanxuat = await this.$axios.$get(
                `/api/lokehoach/getalllsxinkhpx?makh=${this.showLophanxuong.makh}&makhpx=${this.showLophanxuong.makhpx}&mapx=${this.showLophanxuong.mapx}`
            );
            // console.log(this.losanxuat)

        },

        // xóa items
        deleteRow(index) {
            this.items.splice(index, 1);
        },

        copyadd(data) {
            this.items.push({
                kehoachnam: data.kehoachnam,
                makh: data.makh,
                makhpx: data.makhpx,
                malosx: data.malosx,
                mapx: data.mapx,
                tenpx: data.tenpx,
                mato: data.mato,
                tento: data.tento,
                masp: data.masp,
                tensp: data.tensp,
                soluong: data.soluong,
                nhomluong: data.nhomluong,
                soluonglsx: data.soluonglsx,
                ngaybd: data.ngaybd,
                ngaykt: data.ngaykt,
                tongdat: data.tongdat,
                tonghong: data.tonghong,
                ghichu: data.ghichu,
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
            });
        },

        // bấm đăng ký lô kế hoạch phân xưởng
        async addLosanxuat() {
            // lấy mã nhóm lương dựa vào mã sp và mã phân xưởng
            if (this.showLophanxuong.mapx.trim() == "PXD" || this.showLophanxuong.mapx.trim() == "AL_PXD" || this.showLophanxuong.mapx.trim() == "DV_PXD") {
                let phanxuong = "PXD";
                this.nhomluong = await this.$axios.$get(
                    `/api/lokehoach/getnhomluongtheompx?mapx=${phanxuong}&mavt=${this.showLophanxuong.maspkhpx}`
                );
                // console.log(this.nhomluong[0].nhomluong);
            } else {
                this.nhomluong = await this.$axios.$get(
                    `/api/lokehoach/getnhomluongtheompx?mapx=${this.showLophanxuong.mapx}&mavt=${this.showLophanxuong.maspkhpx}`
                );
                // console.log(this.nhomluong[0].nhomluong);
            }
            var nhom_luong
            if (this.nhomluong.length > 0) {
                // console.log(this.nhomluong[0].nhomluong)
                nhom_luong = this.nhomluong[0].nhomluong
            }
            // console.log(nhom_luong)

            // check xem xưởng này có tổ không?
            this.tonhom = await this.$axios.$get(
                `/api/phongban/alltoinxuong?mapx=${this.showLophanxuong.mapx}`
            );
            this.isaddlosx = 1;
            this.items.push({
                kehoachnam: this.showLophanxuong.kehoachnam,
                makh: this.showLophanxuong.makh,
                makhpx: this.showLophanxuong.makhpx,
                malosx: this.showLophanxuong.makhpx.trim() + '-' + '01',
                mapx: this.showLophanxuong.mapx,
                tenpx: this.showLophanxuong.tenpx,
                mato: "",
                tento: "",
                masp: this.showLophanxuong.maspkhpx,
                tensp: this.showLophanxuong.tenspkhpx,
                soluong: this.showLophanxuong.soluongkhpx,
                nhomluong: nhom_luong,
                soluonglsx: "",
                ngaybd: this.showLophanxuong.ngaybdkhpx,
                ngaykt: this.showLophanxuong.ngayktkhpx,
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
            });
            // console.log(this.items)
        },

        // Bấm vào chọn phân xưởng // Hiện đang không cần sử dụng
        async getInfoPX(e, selectedIndex, index) {
            var name = e.target.options[e.target.options.selectedIndex].text;
            // console.log(name)
            let position = name.split("-");
            let p1 = position[0].trim();
            // console.log(p1)
            this.tonhom = await this.$axios.$get(
                `/api/phongban/alltoinxuong?mapx=${p1}`
            );
            // console.log(this.tonnhom)
            if (this.tonhom.length > 0) {
                for (let i = 0; i < this.items.length; i++) {
                    if (i == index) {
                        this.items[i].nhomto = [];

                        for (let k = 0; k < this.tonhom.length; k++) {
                            let cn = {
                                maxuong: this.tonhom[k].mapx.trim(),
                                tenxuong: this.tonhom[k].tenpx.trim(),
                                tento: this.tonhom[k].tento.trim(),
                                mato: this.tonhom[k].mato.trim(),
                            };
                            this.items[i].nhomto.push(cn);
                            // console.log(cn)
                        }
                    }
                }
            }
        },

        // Bấm vào chọn tổ
        async getWithTo(e, selectedIndex, index) {
            // if (this.showLophanxuong.mapx == 'PXGC')
            var name = e.target.options[e.target.options.selectedIndex].text;
            // console.log(name)
            let position = name.split("--");
            let p1 = position[0].trim();
            let p2 = position[1].trim()
            // console.log(p1, p2)
            // this.selectedIndex = selectedIndex;
            // console.log(p1)
            for (let i = 0; i < this.items.length; i++) {
                if (i == index) {
                    this.items[i].mato = p1;
                    this.items[i].tento = p2;
                }
            }
            // console.log(this.items)

        },

        // tìm theo điều kiện đơn lẻ
        // tìm lọc số liệu lô kế hoạch phân xưởng theo nhóm sản phẩm
        async searhNhomsp() {
            this.lokehoachpx = await this.$axios.$get(
                `/api/lokehoach/searchnhomsplokhpx?nhomsp=${this.search_nhomsp}`
            );
            if (this.lokehoachpx.length <= 0) {
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
                this.showAllLokhpx()
            }
        },
        // tìm lọc số liệu lô kế hoạch phân xưởng theo sản phẩm 
        async searhSanpham() {
            this.lokehoachpx = await this.$axios.$get(
                `/api/lokehoach/searchsplokhpx?maspkhpx=${this.search_sanpham}`
            );
            if (this.lokehoachpx.length <= 0) {
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
                    title: "Không tìm thấy số liệu với sản phẩm này",
                });
                this.showAllLokhpx()
            }
        },
        // tìm lọc số liệu lô kế hoạch phân xưởng theo mã lô nhà máy
        async searhMalonm() {
            this.lokehoachpx = await this.$axios.$get(
                `/api/lokehoach/searchmalonmlokhpx?makh=${this.search_malonm}`
            );
            if (this.lokehoachpx.length <= 0) {
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
                    title: "Không tìm thấy số liệu với mã lô nhà máy này",
                });

                this.showAllLokhpx()
            }
        },

        // tìm lọc số liệu lô kế hoạch phân xưởng theo thời gian kết thúc của lô kế hoạch phân xưởng
        // tìm tất cả các lô có ngày kết thúc bé thua ngày cần tìm
        async searhtgketthuc() {
            this.lokehoachpx = await this.$axios.$get(
                `/api/lokehoach/searchlokhpxtheongaykt?ngayktkhpx=${this.search_timeend}`
            );
            if (this.lokehoachpx.length <= 0) {
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
                    title: "Không tìm thấy số liệu với thời gian này",
                });
                this.showAllLokhpx()
            }
        },

        // showdata sau khi nhóm tìm
        async showData() {
            // console.log(this.search_timestart)
            // console.log(this.search_timeend)
            if (this.search_maxuong == '' || this.search_timestart == '' || this.search_timeend == '') {
                if (this.lokehoachpx.length <= 0) {
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
                        title: "Chọn đủ thông tin lọc",
                    });
                }
            } else {
                this.lokehoachpx = await this.$axios.$get(
                    `/api/lokehoach/getallkehoachpxwithpxorderbyngaykt?mapx=${this.search_maxuong}&ngaybdkhpx=${this.search_timestart}&ngayktkhpx=${this.search_timeend}`
                );

            }
        },

        async ghidulieu() {
            // console.log(this.items)
            for (let i = 0; i < this.items.length; i++) {
                this.$axios.$post("/api/ketoan/addphieulosx", this.items[i]);

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
                    title: "Tạo phiếu lô sản xuất thành công",
                });
            }

            // show ra các lô sản xuất đã đăng ký
            this.losanxuat = await this.$axios.$get(
                `/api/lokehoach/getalllsxinkhpx?makh=${this.showLophanxuong.makh}&makhpx=${this.showLophanxuong.makhpx}&mapx=${this.showLophanxuong.mapx}`
            );

            let turn = 1;
            let length = this.items.length;
            while (turn <= length) {
                this.deleteRow(this.items.length - turn);
                turn += 1;
            }
        },


        // update lô sản xuất
        async onUpdate(data) {
            // console.log(data)
            try {
                this.$axios.$patch(
                    `/api/lokehoach/losanxuat/${data._id}`,
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

        // update lô kế hoạch phân xưởng
        async onUpdate_lokhpx(data) {
            // console.log(data)
            try {
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
