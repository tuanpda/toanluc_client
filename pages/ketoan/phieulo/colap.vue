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
                            <td>
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
                            <td style="width: 7.3%">
                                <button @click="showAllLokhsx"
                                    class="button is-small is-danger is-fullwidth">Refresh</button>
                            </td>
                            <td style="width: 7.3%">
                                <button class="button is-small is-success is-fullwidth">
                                    <vue-excel-xlsx :data="lokehoachsx" :columns="columns" :file-name="'lokehoachsx'"
                                        :file-type="'xlsx'" :sheet-name="'Lô sản xuất'">
                                        Download file Excel
                                    </vue-excel-xlsx>

                                </button>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="table_wrapper">
                    <table class="table is-responsive is-bordered is-narrow is-fullwidth">
                        <tr style="background-color: #f4f2f8">
                            <th style="width: 80px;"></th>
                            <th style="font-size: small; text-align: center; font-weight: 600; width: 3%">STT</th>
                            <th @click="sort('makh')"
                                style="font-size: small; text-align: center; font-weight: 600; width: 5%">Mã lô nhà máy
                            </th>
                            <th @click="sort('mapx')"
                                style="font-size: small; text-align: center; font-weight: 600; width: 5%">Mã PX
                            </th>
                            <th @click="sort('makhpx')"
                                style="font-size: small; text-align: center; font-weight: 600; width: 4%">Mã kế hoạch
                                PX
                            </th>
                            <th @click="sort('malosx')"
                                style="font-size: small; text-align: center; font-weight: 600; width: 7%">Mã lô sản xuất
                            </th>
                            <th @click="sort('masp')"
                                style="font-size: small; text-align: center; font-weight: 600; width: 7%">Mã sản phẩm
                            </th>
                            <th @click="sort('ngaybd')"
                                style="font-size: small; text-align: center; font-weight: 600; width: 8%;">Ngày bắt đầu
                            </th>
                            <th @click="sort('ngaykt')"
                                style="font-size: small; text-align: center; font-weight: 600; width: 8%;">Ngày kết thúc
                            </th>
                            <th @click="sort('soluonglsx')"
                                style="font-size: small; text-align: center; font-weight: 600; width: 7%;">Số lượng
                            </th>

                            <th style="font-size: small; text-align: center; font-weight: 600;">Cập nhật
                            </th>
                        </tr>
                        <template v-for="(item, index) in sortedsllosx">
                            <tr>
                                <td>
                                    <div
                                        style=" display: flex; gap: 10px; justify-content:space-around; align-items: center; width: 100%; height: 100%; margin-top: 5px;">
                                        <span @click="setRowSelected(item)" class="icon is-small is-left">
                                            <i v-if="rowSelected !== item" class="fa fa-plus"></i>
                                            <i v-if="rowSelected === item" class="fa fa-minus"></i>
                                        </span>
                                        <span @click="watchDetail(index)" class="icon is-small is-left">
                                            <i v-if="arrRowWatchDetail.findIndex(el => el === index) < 0"
                                                class="fa fa-eye"></i>
                                            <i v-if="arrRowWatchDetail.findIndex(el => el === index) > -1"
                                                class="fa fa-eye-slash"></i>
                                        </span>
                                    </div>
                                </td>
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

                                <td style="width: 5%"><button @click="onUpdateKehoachpx(item)"
                                        class="button is-small is-success is-fullwidth">Cập nhật</button></td>
                                <td></td>
                            </tr>
                            <!-- open row -->
                            <tr style="display: none" :style="{
                                'display': arrRowWatchDetail.findIndex(el => el === index) > -1 ? 'table-row' :
                                    'none'
                            }">
                                <td colspan="11" style="padding: 10px 20px; background: #209cee0f;">
                                    <table class="table is-responsive is-bordered is-narrow is-fullwidth">
                                        <tr>
                                            <td style="text-align: center; font-size:small; font-weight:700; width: 3%">STT
                                            </td>
                                            <td style="text-align: center; font-size:small; font-weight:700; width: 20%">Tổ
                                                / nhóm
                                            </td>
                                            <td style="text-align: center; font-size:small; font-weight:700; width: 10%">Mã
                                                Lô sản
                                                xuất</td>
                                            <td style="text-align: center; font-size:small; font-weight:700; width: 5%">Số
                                                lượng
                                            </td>
                                            <td style="text-align: center; font-size:small; font-weight:700; width: 6%">Thời
                                                gian
                                                bắt đầu</td>
                                            <td style="text-align: center; font-size:small; font-weight:700; width: 6%">Thời
                                                gian
                                                kết thúc</td>
                                        </tr>
                                        <tr>
                                            <td style="font-size: small; text-align: center">
                                                1
                                            </td>
                                            <td style="font-size: small;">
                                                Nhóm 1
                                            </td>
                                            <td style="font-size: small; text-align: center;">Mã 1</td>
                                            <td style="font-size: small; text-align: center">
                                                100
                                            </td>
                                            <td style="font-size: small; text-align: center">
                                                1/1/2023
                                            </td>
                                            <td style="font-size: small; text-align: center">
                                                1/1/2024
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="font-size: small; text-align: center">
                                                1
                                            </td>
                                            <td style="font-size: small;">
                                                Nhóm 1
                                            </td>
                                            <td style="font-size: small; text-align: center;">Mã 1</td>
                                            <td style="font-size: small; text-align: center">
                                                100
                                            </td>
                                            <td style="font-size: small; text-align: center">
                                                1/1/2023
                                            </td>
                                            <td style="font-size: small; text-align: center">
                                                1/1/2024
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </template>

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
                <!-- Phần đăng ký -->
                <br />
                <div v-if="Object.keys(rowSelected).length > 0">
                    <div class="">
                        <table class="table is-responsive is-bordered is-narrow is-fullwidth">
                            <tr style="background-color: #feecf0">
                                <td colspan="6" style="font-weight: bold; font-size: small">
                                    <span>Mã lô nhà máy: </span> <span style="color: red;">{{ rowSelected.makh }}</span>
                                    |
                                    <span>Mã phân xưởng: </span> <span style="color: red;">{{ rowSelected.mapx }}</span>
                                    |
                                    <span>Mã kế hoạch phân xưởng: </span> <span style="color: red;">{{ rowSelected.makhpx
                                    }}</span>
                                    |
                                    <span>Mã sản phẩm: </span> <span style="color: red;">{{ rowSelected.masp }}</span>
                                    |
                                    <span>Ngày bắt đầu: </span> <span style="color: red;">{{ rowSelected.ngaybd | formatDate
                                    }}</span> |
                                    <span>Ngày kết thúc: </span> <span style="color: red;">{{ rowSelected.ngaykt |
                                        formatDate }}</span> |
                                    <span>Số lượng: </span> <span style="color: red;">{{ rowSelected.soluonglsx }}</span>
                                </td>
                                <td>
                                    <button class="button is-small is-success is-fullwidth">Ghi dữ
                                        liệu
                                    </button>
                                </td>
                                <td>
                                    <button class="button is-small is-info is-fullwidth">Đăng
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
                            <!-- <tr v-for="(item, index) in losanxuat" :key="index + 'ppp'">
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
                            </tr> -->
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
            arrRowWatchDetail: [],
            rowSelected: {},
            // dữ liệu 
            lokehoachsx: [],
            phanxuong: [],

            // các biến tìm kiếm
            search_maxuong: "",
            search_tenxuong: "",
            search_timestart: "",
            search_timeend: "",

            // lọc talble
            currentSort: 'mapx',
            currentSortDir: 'asc',
            pageSize: 15,
            currentPage: 1,
            filter: '',

            // xuất execl
            columns: [
                {
                    label: "Mã lô nhà máy",
                    field: "makh",
                },
                {
                    label: "Mã kế hoạch phân xưởng",
                    field: "makhpx",
                },
                {
                    label: "Mã lô sản xuất",
                    field: "malosx",
                },
                {
                    label: "Mã phân xưởng",
                    field: "mapx",
                    /* dataFormat: this.priceFormat */
                },
                {
                    label: "Tên phân xưởng",
                    field: "tenpx",
                },
                {
                    label: "Mã tổ",
                    field: "mato",
                },
                {
                    label: "Tên tổ",
                    field: "tento",
                },
                {
                    label: "Mã sản phẩm",
                    field: "masp",
                },
                {
                    label: "Tên sản phẩm",
                    field: "tensp",
                },
                {
                    label: "Số lượng",
                    field: "soluonglsx",
                },

                {
                    label: "Ngày bắt đầu",
                    field: "ngaybd",
                },
                {
                    label: "Ngày kết thúc",
                    field: "ngaykt",
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
        watchDetail(value) {
            const indexValue = this.arrRowWatchDetail.findIndex(el => el === value)
            indexValue > -1 ? this.arrRowWatchDetail.splice(indexValue, 1) : this.arrRowWatchDetail.push(value)
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
        },

        // get all phân xưởng 
        async showAllPx() {
            this.phanxuong = await this.$axios.$get(`/api/phongban/allphanxuong`);
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

        // update lô kế hoạch phân xưởng
        async onUpdateKehoachpx(data) {
            // console.log(data)
            try {
                data.songay = parseInt(data.soluongkhpx) / parseInt(data.congsuat)
                this.$axios.$patch(
                    `/api/lokehoach/lokehoachphanxuong/${data._id}`,
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

        setRowSelected(value) {
            if (value === this.rowSelected && Object.keys(this.rowSelected).length > 0) {
                return this.rowSelected = {}
            }
            return this.rowSelected = value
        }

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
}</style>
