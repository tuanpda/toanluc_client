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
                            <span style="color: #3850b7; font-size: 17px; font-weight: bold">Lập kế hoạch phân
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
                                    <input @change="showData" v-model="search_timeend" type="date"
                                        class="input is-small">
                                    <span class="icon is-small is-left">
                                        <i style="color: #48c78e" class="fas fa-calendar-alt"></i>
                                    </span>
                                </div>
                            </td>
                            <td style="width: 7.3%">
                                <button @click="showAllLokhpx"
                                    class="button is-small is-danger is-fullwidth">Refresh</button>
                                <!-- <button @click="caculatorDay">jjjj</button> -->
                            </td>
                            <td style="width: 12%; text-align: center;">
                                <vue-excel-xlsx :data="lokehoachpx" :columns="columns" :file-name="'lokehoachpx'"
                                    :file-type="'xlsx'" :sheet-name="'Lô kế hoạch phân xưởng'">
                                    Download file Excel
                                </vue-excel-xlsx>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="table_wrapper">
                    <table class="table is-responsive is-bordered is-narrow is-fullwidth">
                        <tr style="background-color: #f4f2f8">
                            <td style="font-size: small; text-align: center; font-weight: 600; width: 3%">STT</td>
                            <td @click="sort('makh')"
                                style="font-size: small; text-align: center; font-weight: 600; width: 5%">Mã lô sản xuất
                            </td>
                            <td @click="sort('mapx')"
                                style="font-size: small; text-align: center; font-weight: 600; width: 5%">Mã PX
                            </td>
                            <td @click="sort('makhpx')"
                                style="font-size: small; text-align: center; font-weight: 600; width: 4%">Mã SP
                            </td>
                            <td @click="sort('maspkhpx')"
                                style="font-size: small; text-align: center; font-weight: 600; width: 7%">Số lượng
                            </td>
                            <!-- <td @click="sort('tensp')"
                                style="font-size: small; text-align: center; font-weight: 600; width: 7%">Ngày bắt đầu
                            </td>
                            <td @click="sort('ngaybdkhpx')"
                                style="font-size: small; text-align: center; font-weight: 600; width: 8%;">Ngày kết thúc
                            </td>
                            <td @click="sort('ngayktkhpx')"
                                style="font-size: small; text-align: center; font-weight: 600; width: 8%;">Công suất
                                tuần
                            </td> -->
                            <td @click="sort('ngayktkhpx')"
                                style="font-size: small; text-align: center; font-weight: 600; width: 5%;">Thời gian
                                tuần
                            </td>
                            <!-- <td @click="sort('soluongkhpx')"
                                style="font-size: small; text-align: center; font-weight: 600; width: 7%;">Giây chuyền
                                (Máy)
                            </td> -->
                            <td @click="sort('congsuat')"
                                style="font-size: small; text-align: center; font-weight: 600; width: 6%;">Tuần
                            </td>
                            <!-- <td @click="sort('songay')"
                                style="font-size: small; text-align: center; font-weight: 600; width: 5%;">Ngày đầu tuấn
                            </td>
                            <td @click="sort('may')"
                                style="font-size: small; text-align: center; font-weight: 600; width: 10%;">Ngày cuối
                                tuần
                            </td>
                            <td style="font-size: small; text-align: center; font-weight: 600;">Cập nhật
                            </td> -->
                        </tr>
                        <tr v-for="(item, index) in sortedsllosx" :key="index + 'llllkiq'">
                            <td style="font-size: small; text-align: center; background-color: #effaf5;">{{ index + 1 }}
                            </td>
                            <td style="font-size: small;">{{ item.malosx }}
                            </td>
                            <td style="font-size: small; background-color: #effaf5; text-align: center;">{{ item.mapx }}
                            </td>
                            <td style="font-size: small; background-color: #effaf5; text-align: center;">{{
                                item.masp
                            }}</td>
                            <td style="font-size: small; background-color: #effaf5; text-align: center;">{{
                                item.soluong
                            }}</td>
                            <!-- <td style="font-size: small; background-color: #effaf5; text-align: center;">{{
                                item.ngaybdkhpx | formatDate
                            }} -->
                            <!-- <td style="background-color: #fffaeb;"><input class="input is-small" type="date"
                                    v-bind:value="item.ngaybd | inputDateFilter"
                                    v-on:input="item.ngaybd = getDate($event.target.value)">
                            </td> -->
                            <!-- <td style="font-size: small; text-align: center; background-color: #fffaeb;">{{
                                item.ngayktkhpx | formatDate
                            }}</td> -->
                            <!-- <td style="background-color: #fffaeb;"><input class="input is-small" type="date"
                                    v-bind:value="item.ngaykt | inputDateFilter"
                                    v-on:input="item.ngaykt = getDate($event.target.value)"></td>

                            <td style="font-size: small; text-align: center; background-color: #effaf5;">{{
                                item.congsuattuan | formatNumber
                            }}</td> -->
                            <td style="font-size: small; text-align: center; background-color: #effaf5;">{{
                                item.thoigiantuan
                            }}</td>
                            <!-- <td style="font-size: small; text-align: center; background-color: #effaf5;">{{
                                item.daychuyenmay
                            }}</td> -->
                            <td style="font-size: small; text-align: center; background-color: #effaf5;">{{
                                item.tuan
                            }}</td>
                            <!-- <td style="background-color: #fffaeb;"><input class="input is-small" type="date"
                                    v-bind:value="item.ngaydautuan | inputDateFilter"
                                    v-on:input="item.ngaydautuan = getDate($event.target.value)"></td>
                            <td style="background-color: #fffaeb;"><input class="input is-small" type="date"
                                    v-bind:value="item.ngaycuoituan | inputDateFilter"
                                    v-on:input="item.ngaycuoituan = getDate($event.target.value)"></td>
                            <td style="width: 5%"><button @click="onUpdateKehoachpx(item)"
                                    class="button is-small is-success is-fullwidth">Cập nhật</button></td> -->
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
            lokehoachpx: [],
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
                    label: "Mã phân xưởng",
                    field: "mapx",
                    /* dataFormat: this.priceFormat */
                },
                {
                    label: "Tên phân xưởng",
                    field: "tenpx",
                },
                {
                    label: "Mã kế hoạch phân xưởng",
                    field: "makhpx",
                },
                {
                    label: "Mã sản phẩm",
                    field: "maspkhpx",
                },
                {
                    label: "Tên sản phẩm",
                    field: "tenspkhpx",
                },
                {
                    label: "Số lượng",
                    field: "soluongkhpx",
                },

                {
                    label: "Ngày bắt đầu",
                    field: "ngaybdkhpx",
                },
                {
                    label: "Ngày kết thúc",
                    field: "ngayktkhpx",
                },
                {
                    label: "Công suất",
                    field: "consuat",
                },
                {
                    label: "Số ngày",
                    field: "songay",
                },
                {
                    label: "Máy",
                    field: "may",
                },
                {
                    label: "Trạng thái",
                    field: "status",
                },
            ],
        };
    },

    mounted() {
        this.showAllLokhpx()
        this.showAllPx()
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

        // hàm tính toán số ngày giữa 2 ngày
        caculatorDay() {
            let signDateStr = '2023-01-01T00:00:00.000Z'
            let endDateStr = '2023-01-02T00:00:00.000Z'
            // const date1Str = new Date(signDateStr);
            // console.log(date1Str)
            // const date2Str = new Date(endDateStr);
            const diffTime = Math.abs(endDateStr - signDateStr);
            console.log(diffTime)
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            console.log(diffTime + " milliseconds");
            console.log(diffDays + " days");
            alert(diffDays);
        },

        // các hàm get dữ liệu
        // show ra danh sách tất cả các lô kế hoạch phân xưởng sắp xếp theo phân xưởng
        async showAllLokhpx() {
            this.lokehoachpx = await this.$axios.$get(
                `/api/lokehoach/gettest`
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
