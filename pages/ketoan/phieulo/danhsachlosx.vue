<template>
    <div class="columns">
        <div class="column">
            <br />
            <div class="box" style="margin-left: 20px; margin-right: 20px">
                <div class="columns">
                    <div class="column is-11">
                        <div class="control">
                            <span class="icon is-small is-left">
                                <i style="color: #ff55acee" class="far fa-calendar-alt"></i>
                            </span>
                            <span style="color: #3850b7; font-size: 17px; font-weight: bold">Tạo danh sách lô sản
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
                        <tr style="background-color: #faf0f5;">
                            <td colspan="2" style="width: 25%;">
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

                            <td style="width: 13%">
                                <div class="control has-icons-left">
                                    <input v-model="search_timestart" type="date" class="input is-small">
                                    <span class="icon is-small is-left">
                                        <i style="color: #48c78e" class="fas fa-calendar-alt"></i>
                                    </span>
                                </div>
                            </td>
                            <td style="width: 13%">
                                <div class="control has-icons-left">
                                    <input @change="showData" v-model="search_timeend" type="date" class="input is-small">
                                    <span class="icon is-small is-left">
                                        <i style="color: #48c78e" class="fas fa-calendar-alt"></i>
                                    </span>
                                </div>
                            </td>
                            <td style="width: 5%">
                                <button @click="showAllLokhsx"
                                    class="button is-small is-danger is-fullwidth">Refresh</button>
                            </td>
                            <td style="width: 10%; text-align: center;">
                                <vue-excel-xlsx :data="lokehoachsx" :columns="columns" :file-name="'losanxuat'"
                                    :file-type="'xlsx'" :sheet-name="'Lô sản xuất'">
                                    Download Excel
                                </vue-excel-xlsx>
                            </td>
                            <td colspan="2"></td>
                        </tr>
                        <!-- tìm theo điều kiện multi -->
                        <tr style="background-color: #eff5fb;">
                            <td style="width: 12%; font-size: small; font-weight: bold;">
                                <div class="icon-text">
                                    <input type="checkbox" v-model="optionclick">
                                    <span style="color: #296fa8;">Lọc nhiều tiêu chí</span>
                                </div>
                            </td>
                            <!-- <td>
                                <button @click="filterMulti" class="button is-small is-fullwidth">Lọc Lô nhà máy theo
                                    TTQT</button>
                            </td> -->
                            <td colspan="5"></td>
                            <td colspan="2" style="font-size: small; font-weight: bold; text-align: right;"><span>Có: <span
                                        style="color: red;">{{ lokehoachsx.length
                                        }}</span> bản
                                    ghi</span></td>
                        </tr>
                        <tr v-if="optionclick == true" style="background-color: #feecf0;">
                            <td style="width: 12%; font-size: small; font-weight: bold;">
                                <div class="icon-text">
                                    <span class="icon has-text-success">
                                        <i class="fas fa-check-square"></i>
                                    </span>
                                    <span style="color: #296fa8;">Chọn các tiêu chí lọc</span>
                                </div>
                            </td>
                            <td style="font-size: x-small;">
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
                            <td><button @click="resetOp" class="button is-small is-fullwidth"> - Refresh all phân
                                    xưởng - </button></td>
                            <td>
                                <div class="control has-icons-left">
                                    <div class="select is-small is-fullwidth">
                                        <select id="selectBox" v-model="selected">
                                            <!-- <option selected>-- Mã sản phẩm --</option>  -->
                                            <option v-for="option in filteredOptions" :value="option.masp">
                                                {{ option.masp }}
                                            </option>
                                        </select>
                                    </div>
                                    <datalist id="options">
                                        <option v-for="option in filteredOptions" :value="option.masp"></option>
                                    </datalist>
                                    <span class="icon is-small is-left">
                                        <i style="color: #48c78e" class="fas fa-cog"></i>
                                    </span>
                                </div>
                            </td>
                            <td colspan="2" style="font-size: x-small;">
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
                            <td style="width: 5%"><button @click="filterData"
                                    class="button is-small is-fullwidth is-success">Lọc</button></td>
                            <td>

                            </td>
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
                            <td @click="sort('malosx')"
                                style="font-size: small; text-align: center; font-weight: 600; width: 7%">Mã lô sản xuất
                            </td>
                            <td @click="sort('masp')"
                                style="font-size: small; text-align: center; font-weight: 600; width: 7%">Mã sản phẩm
                            </td>
                            <td @click="sort('ngaybd')"
                                style="font-size: small; text-align: center; font-weight: 600; width: 8%;">Ngày bắt đầu
                            </td>
                            <td @click="sort('ngaykt')"
                                style="font-size: small; text-align: center; font-weight: 600; width: 8%;">Ngày kết thúc
                            </td>
                            <td @click="sort('soluonglsx')"
                                style="font-size: small; text-align: center; font-weight: 600; width: 7%;">Số lượng
                            </td>
                            <td @click="sort('status')"
                                style="font-size: small; text-align: center; font-weight: 600; width: 7%;">Trạng thái
                            </td>
                            <td style="font-size: small; text-align: center; font-weight: 600; width: 7%;">Chọn trạng thái
                            </td>
                            <td style="font-size: small; text-align: center; font-weight: 600; width: 7%;">Số lượng HT
                            </td>
                            <td style="font-size: small; text-align: center; font-weight: 600;">Cập nhật
                            </td>
                            <td></td>
                        </tr>
                        <tr v-for="(item, index) in sortedsllosx" :key="index + 'llllkiq'">
                            <td style="font-size: small; text-align: center; background-color: #effaf5;">{{ index + 1 }}
                            </td>
                            <td style="font-size: small;">{{ item.makh }}
                            </td>
                            <td style="font-size: small; background-color: #effaf5; text-align: center;">{{ item.mapx }}
                            </td>
                            <td style="font-size: small; background-color: #effaf5; text-align: center;">{{
                                item.makhpx
                            }}</td>
                            <td style="font-size: small; background-color: #effaf5; text-align: center;">{{
                                item.malosx
                            }}</td>
                            <td style="font-size: small; background-color: #effaf5; text-align: center;">{{
                                item.masp
                            }}</td>
                            <!-- <td style="font-size: small; background-color: #effaf5; text-align: center;">{{
                                item.ngaybdkhpx | formatDate
                            }} -->
                            <td style="background-color: #fffaeb;"><input class="input is-small" type="date"
                                    v-bind:value="item.ngaybd | inputDateFilter"
                                    v-on:input="item.ngaybd = getDate($event.target.value)">
                            </td>
                            <!-- <td style="font-size: small; text-align: center; background-color: #fffaeb;">{{
                                item.ngayktkhpx | formatDate
                            }}</td> -->
                            <td style="background-color: #fffaeb;"><input class="input is-small" type="date"
                                    v-bind:value="item.ngaykt | inputDateFilter"
                                    v-on:input="item.ngaykt = getDate($event.target.value)"></td>
                            <td style="font-size: small; text-align: center; background-color: #effaf5;">{{
                                item.soluonglsx | formatNumber
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
                                    <select id="" @change="onChange_status($event)" v-model="item.status">
                                        <option selected>-- Trạng thái --</option>
                                        <option value="3">HT</option>
                                        <option value="2">SX</option>
                                        <option value="1">DK</option>
                                        <option value="0">0</option>
                                    </select>
                                </div>
                            </td>
                            <td><input class="input is-small" type="text" v-model="item.soluongkhsx"></td>
                            <td style="width: 5%"><button @click="onUpdateLosx(item)"
                                    class="button is-small is-success is-fullwidth">Cập nhật</button></td>
                            <td></td>
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
            lokehoachsx: [],
            phanxuong: [],

            // các biến tìm kiếm
            search_maxuong: "",
            search_tenxuong: "",
            search_timestart: "",
            search_timeend: "",

            // gán biến status
            status: 0,

            // lọc talble
            currentSort: 'mapx',
            currentSortDir: 'asc',
            pageSize: 15,
            currentPage: 1,
            filter: '',

            // check nhiều phân xưởng
            optionclick: false,
            selectedOptions: [],
            Options_status: [],
            isOpen: false,
            isOpenst: false,
            statusArr: [{ masta: 1, tensta: "DK" }, { masta: 2, tensta: "SX" }, { masta: 3, tensta: "HT" }],
            multiSearch_masp: "",

            // xử lý select mã sản phẩm
            selected: '',
            search: '',
            maspinlosanxuat: [],

            // xuất execl
            columns: [
                {
                    label: "Mã lô nhà máy",
                    field: "makh",
                    dataFormat: this.trimData
                },
                {
                    label: "Mã kế hoạch phân xưởng",
                    field: "makhpx",
                    dataFormat: this.trimData
                },
                {
                    label: "Mã lô sản xuất",
                    field: "malosx",
                    dataFormat: this.trimData
                },
                {
                    label: "Mã phân xưởng",
                    field: "mapx",
                    dataFormat: this.trimData
                    /* dataFormat: this.priceFormat */
                },
                {
                    label: "Tên phân xưởng",
                    field: "tenpx",
                    dataFormat: this.trimData
                },
                {
                    label: "Mã tổ",
                    field: "mato",
                    dataFormat: this.trimData
                },
                {
                    label: "Tên tổ",
                    field: "tento",
                    dataFormat: this.trimData
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
                    field: "soluonglsx",
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
                    label: "Đã tính lương",
                    field: "datinhluong",
                },
                {
                    label: "Trạng thái",
                    field: "status",
                },
            ],
        };
    },

    mounted() {
        this.showAllLokhsx()
        this.showAllPx()
        this.maspinlsx()
    },

    computed: {
        filteredsllosx() {
            return this.lokehoachsx.filter(c => {
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
        },
        filteredOptions() {
            return this.maspinlosanxuat.filter(option =>
                option.masp.toLowerCase().includes(this.search.toLowerCase())
            );
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

        // các hàm get dữ liệu
        // show ra danh sách tất cả các lô kế hoạch phân xưởng sắp xếp theo phân xưởng
        async showAllLokhsx() {
            this.lokehoachsx = await this.$axios.$get(
                `/api/lokehoach/showalllosx`
            );
            this.search_timestart = ""
            this.search_timeend = ""
            this.multiSearch_masp = ""
            this.Options_status = []
            this.isOpen = false
            this.isOpenst = false
            this.selectedOptions = []
            this.selected = ""
        },

        // get all phân xưởng 
        async showAllPx() {
            this.phanxuong = await this.$axios.$get(`/api/phongban/allphanxuong`);
        },

        async maspinlsx() {
            this.maspinlosanxuat = await this.$axios.$get('/api/lokehoach/hmsanphamlosx')
            console.log(this.maspinlosanxuat)
        },

        // bấm vào chọn phân xưởng khi lọc
        async getWithPX(e) {
            var name = e.target.options[e.target.options.selectedIndex].text;
            // console.log(name)
            let position = name.split("--");
            let p1 = position[0].trim();
            let p2 = position[1].trim();
            this.search_maxuong = p1;
            this.search_tenxuong = p2;
        },


        // showdata sau khi nhóm tìm
        async showData() {
            // console.log(this.search_timestart)
            // console.log(this.search_timeend)
            if (this.search_maxuong == '' || this.search_timestart == '' || this.search_timeend == '') {
                if (this.lokehoachsx.length <= 0) {
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
                this.lokehoachsx = await this.$axios.$get(
                    `/api/lokehoach/getallkehoachpxwithpxorderbyngaykt?mapx=${this.search_maxuong}&ngaybdkhpx=${this.search_timestart}&ngayktkhpx=${this.search_timeend}`
                );

            }
        },

        resetOp() {
            this.selectedOptions = []
        },

        // lọc nhiều tiêu chí -- get bookmark 1
        async filterData() {
            // console.log(this.selectedOptions)
            // console.log(this.Options_status)
            // console.log(this.selected)
            this.isOpen = false
            this.isOpenst = false

            const mapxList = this.selectedOptions
            const masp = this.selected
            const status = this.Options_status


            // chọn lọc full
            if (this.selectedOptions.length > 0 && this.Options_status.length > 0 && this.selected != "") {
                this.lokehoachsx = await this.$axios.$get(
                    `/api/lokehoach/filterfulldklosanxuat`, {
                    params: {
                        mapx: mapxList, // Truyền danh sách mã phân xưởng lên server
                        masp: masp,
                        status: status,
                    },
                }
                );
                console.log(this.lokehoachsx)
            }
            // chỉ có mã px
            else if (this.selectedOptions.length > 0 && !this.Options_status.length && this.selected == "") {
                this.lokehoachsx = await this.$axios.$get(
                    `/api/lokehoach/filteronlymapxlosanxuat`, {
                    params: {
                        mapx: mapxList,
                    },
                }
                );
            }
            // chỉ có mã px và mã sp
            else if (this.selectedOptions.length > 0 && !this.Options_status.length && this.selected != "") {
                this.lokehoachsx = await this.$axios.$get(
                    `/api/lokehoach/filteronlymapxandmasplosanxuat`, {
                    params: {
                        mapx: mapxList,
                        masp: masp
                    },
                }
                );
            }
            // chỉ có mã px và status
            else if (this.selectedOptions.length > 0 && this.Options_status.length > 0 && this.selected == "") {
                this.lokehoachsx = await this.$axios.$get(
                    `/api/lokehoach/filteronlymapxandstatuslosanxuat`, {
                    params: {
                        mapx: mapxList,
                        status: status
                    },
                }
                );
            }
            // lọc mỗi trạng thái
            else if (!this.selectedOptions.length && this.Options_status.length > 0 && this.selected == "") {
                this.lokehoachsx = await this.$axios.$get(
                    `/api/lokehoach/filteronlystatuslosanxuat`, {
                    params: {
                        status: status
                    },
                }
                );
            }

            // lọc mỗi mã sản phẩm
            else if (!this.selectedOptions.length && !this.Options_status.length && this.selected != "") {
                this.lokehoachsx = await this.$axios.$get(
                    `/api/lokehoach/filteronlymasplosanxuat`, {
                    params: {
                        masp: masp
                    },
                }
                );
            }

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


        // update status, ngay bd, ngay kt của 1 lô sản xuất
        async onUpdateLosx(data) {
            // console.log(data)
            try {
                this.$axios.$patch(
                    `/api/lokehoach/losanxuat/status/${data._id}`,
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
}

.select-options.open {
    display: block;
}
</style>
