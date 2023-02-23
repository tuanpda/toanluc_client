<template>
    <div class="columns">
        <div class="column">
            <br />
            <div class="box" style="margin-left: 20px; margin-right: 20px;">
                <div class="columns">
                    <div class="column is-9">
                        <div class="control">
                            <span class="icon is-small is-left">
                                <i style="color: #ff55acee" class="fas fa-broom"></i>
                            </span>
                            <span style="color: #3850b7; font-size: 16px; font-weight: bold">LẬP KẾ HOẠCH</span>
                        </div>
                    </div>
                    <div class="column" style="text-align: right">
                        <button @click="onTaophieu" class="button is-success is-fullwidth is-small">
                            <span class="icon is-small">
                                <i class="fas fa-pen-fancy"></i>
                            </span>
                            <span style="font-weight:600">LẬP KẾ HOẠCH NHÀ MÁY</span>
                        </button>
                    </div>
                    <div class="column" style="text-align: right">
                        <nuxt-link :to="`/`">
                            <button class="button is-info is-fullwidth is-small">
                                <span class="icon is-small">
                                    <i class="fas fa-angle-double-left"></i>
                                </span>
                                <span>Thoát</span>
                            </button>
                        </nuxt-link>
                    </div>
                </div>

                <!-- Lập kế hoạch nhà máy -->
                <div class="columns">
                    <div class="column">
                        <table class="table is-responsive is-bordered is-narrow is-fullwidth">
                            <tr style="background-color: #fffaeb">
                                <td colspan="9" style="text-align: right; font-weight: bold; font-size: small;">

                                </td>
                                <td>
                                    <button @click="addKehoach" class="button is-success is-fullwidth is-small">
                                        <span style="font-weight:600">Thêm</span>
                                    </button>
                                </td>
                            </tr>
                            <tr style="background-color: #faf0f5">
                                <td style="text-align: center; font-weight: bold; font-size: small; width: 3%;">
                                    STT
                                </td>
                                <td style="text-align: center; font-weight: bold; font-size: small; width: 10%">
                                    Mã KẾ HOẠCH
                                </td>
                                <td style="text-align: center; font-weight: bold; font-size: small; width: 20%">
                                    Sản phẩm
                                </td>
                                <td style="text-align: center; font-weight: bold; font-size: small; width: 4%;">
                                    Thời gian bắt Đầu
                                </td>
                                <td style="text-align: center; font-weight: bold; font-size: small; width: 4%;">
                                    Thời gian kết thúc
                                </td>
                                <td style="text-align: center; font-weight: bold; font-size: small; width: 5%;">
                                    Số lượng
                                </td>
                                <td style="text-align: center; font-weight: bold; font-size: small; width: 13%;">
                                    Mô tả
                                </td>
                                <td style="text-align: center; font-weight: bold; font-size: small; width: 13%;">Ghi chú
                                </td>
                                <td style="text-align: center; font-weight: bold; font-size: small; width: 3%;">Xóa
                                </td>
                                <td style="text-align: center; font-weight: bold; font-size: small; width: 3%;">Copy
                                </td>
                            </tr>
                            <tr v-for="(item, index) in items" :key="index + 'hhjjkk'">
                                <td style="font-size: small; text-align: center; background-color: #eff1fa;">{{ index +
                                1 }}</td>
                                <td>
                                    <input @change="getSP" v-model.trim="item.makh"
                                        class="input is-fullwidth is-danger is-small" type="text" />
                                </td>
                                <td style="font-size: small;">
                                    <model-list-select :list="item.sanpham" v-model="item.masp" option-value="masp"
                                        :custom-text="codeAndNameAndDesc" placeholder="Chọn sản phẩm">
                                    </model-list-select>
                                </td>
                                <td>
                                    <input v-model.trim="item.tgbatdau" type="date" class="input is-small" />
                                </td>
                                <td>
                                    <input @change="getInfosp(item)" v-model.trim="item.tgketthuc" type="date"
                                        class="input is-small" />
                                </td>
                                <td>
                                    <input v-model.trim="item.soluong" type="text" class="input is-small" />
                                </td>
                                <td>
                                    <div class="control">
                                        <textarea rows="1" v-model.trim="item.mota" class="textarea is-small"
                                            placeholder="Mô tả ..."></textarea>
                                    </div>
                                </td>
                                <td>
                                    <div class="control">
                                        <textarea rows="1" v-model.trim="item.ghichu" class="textarea is-small"
                                            placeholder="Ghi chú ..."></textarea>
                                    </div>
                                </td>
                                <td>
                                    <button @click="deleteRow(index)" class="button is-danger is-small is-fullwidth">
                                        Xóa
                                    </button>
                                </td>
                                <td>
                                    <button @click="copyadd(item)" class="button is-warning is-small is-fullwidth">
                                        copy
                                    </button>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import Swal from "sweetalert2";
import _ from "lodash";
import {
    ModelSelect,
    ModelListSelect,
    MultiSelect,
    ListSelect,
    BasicSelect,
} from "vue-search-select";
import "vue-search-select/dist/VueSearchSelect.css";
export default {
    middleware: "auth",
    components: {
        ModelSelect,
        ModelListSelect,
        MultiSelect,
        ListSelect,
        BasicSelect,
    },
    data() {
        return {
            lokehoach: [],
            ds_sanpham: [],
            ds_lokh: [],
            dm_lokh: [],
            dmnguyencong: [],
            cong_nhan: [],
            dmcongnhan: [],
            phanxuong: [],
            nhomluong: "",
            dongia_ns: "",
            namlsx: "",
            kehoach: [],
            checkMakh: "",
            checkMalosx: "",
            listlkh: [],
            arrLkh: [],
            isExits: null,
            show_mota_sp: "",
            form: {
                makh: "",
                mota: "",
                soluong: "",
                tgbatdau: "",
                tgketthuc: "",
                ghichu: "",
                createdAt: "",
                createdBy: this.$auth.$state.user.username,
                status: 0,
                dt: ""
            },
            isphanxuong: 0,
            selectedIndex: 0,
            giaopx: 0,
            checkGhichu: false,
            // items này để lập kế hoạch nhà máy
            items: [
                {
                    makh: "",
                    mota: "",
                    masp: "",
                    tensp: "",
                    nhomsp: "",
                    soluong: "",
                    tgbatdau: "",
                    tgketthuc: "",
                    ghichu: "",
                    status: 0,
                    soluongmuavup1: 0,
                    soluongmuavup2: 0,
                    soluongmuavup3: 0,
                    slthang1: 0,
                    slthang2: 0,
                    slthang3: 0,
                    slthang4: 0,
                    slthang5: 0,
                    slthang6: 0,
                    slthang7: 0,
                    slthang8: 0,
                    slthang9: 0,
                    slthang10: 0,
                    slthang11: 0,
                    slthang12: 0,
                    sanpham: [{
                        mapx: "",
                        masp: "",
                        tensp: "",
                        nhomsp: "",
                    },]
                },
            ],

            stringItem: "",
            searchText: "", // If value is falsy, reset searchText & searchItem
        };
    },

    mounted() {
        this.currentDateTime();
        this.get_phanxuong();
        this.get_dmsp();
        // this.deleteRow(0);
    },

    isFormValid() {
        return !this.$v.form.$invalid;
    },

    methods: {
        codeAndNameAndDesc(item) {
            return `${item.masp} - ${item.tensp}`;
        },

        format(item) {
            return `${item.mapx} - ${item.mavt} - ${item.tenvt}`;
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
            this.namlsx = current.getFullYear();
            this.form.createdAt = date + " " + time;
        },

        // bỏ
        async showMalosx(e) {
            this.giaopx = 1;
            // var name = e.target.options[e.target.options.selectedIndex].text;
            // let position = name.split("--");
            // this.form.masp = position[0].trim();
            // this.form.tensp = position[1].trim();
            let nn = this.namlsx.toString();
            let sx_nam = nn.substring(2, 4);
            // console.log(this.form.makh.length)
            this.checkMakh = this.form.makh.length;
            // console.log(this.checkMakh)

            // get nhóm lương
            // this.nhomluong = await this.$axios.$get(
            //   `/api/phongban/getnhomluong?masp=${this.form.masp}`
            // );
            // this.form.nhomluong = this.nhomluong[0].nhomluong;

            // show select nguyencong dongia
            // this.dmnguyencong = await this.$axios.$get(
            //   `/api/phongban/getnguyencong?khsp=${this.form.nhomluong}`
            // );

            var today = new Date();
            var dd = String(today.getDate()).padStart(2, "0");
            var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
            var yyyy = today.getFullYear();

            today = dd + "/" + mm + "/" + yyyy;
            this.form.ngaygiaophieu = today;
            // console.log(this.selectedPhanxuong);
        },

        // get all phân xưởng
        async get_phanxuong() {
            this.phanxuong = await this.$axios.$get(`/api/phongban/allphanxuong`);
        },

        // Lấy ra danh mục toàn bộ sản phẩm trong bảng dmnc
        async get_dmsp() {
            this.ds_sanpham = await this.$axios.$get(
                `/api/sanpham/getallspfromdmnc`
            );
            for (let i = 0; i < this.items.length; i++) {
                this.items[i].sanpham = []
                for (let k = 0; k < this.ds_sanpham.length; k++) {
                    let cn = {
                        mapx: this.ds_sanpham[k].mapx,
                        masp: this.ds_sanpham[k].mavt,
                        tensp: this.ds_sanpham[k].tenvt,
                        nhomsp: this.ds_sanpham[k].nhomsp
                    };
                    this.items[i].sanpham.push(cn)
                    // console.log(cn)
                }
            }
            // console.log(this.items)
        },

        async addKehoach() {
            this.items.push({
                makh: "",
                mota: "",
                masp: "",
                tensp: "",
                nhomsp: "",
                soluong: "",
                tgbatdau: "",
                tgketthuc: "",
                ghichu: "",
                status: 0,
                soluongmuavup1: 0,
                soluongmuavup2: 0,
                soluongmuavup3: 0,
                slthang1: 0,
                slthang2: 0,
                slthang3: 0,
                slthang4: 0,
                slthang5: 0,
                slthang6: 0,
                slthang7: 0,
                slthang8: 0,
                slthang9: 0,
                slthang10: 0,
                slthang11: 0,
                slthang12: 0,
                createdAt: this.form.createdAt,
                createdBy: this.$auth.$state.user.username,
                sanpham: [{
                    mapx: "",
                    masp: "",
                    tensp: "",
                    nhomsp: "",
                },]
            });
        },

        async getSP() {
            for (let i = 0; i < this.items.length; i++) {
                this.items[i].sanpham = []
                for (let k = 0; k < this.ds_sanpham.length; k++) {
                    let cn = {
                        mapx: this.ds_sanpham[k].mapx,
                        masp: this.ds_sanpham[k].mavt,
                        tensp: this.ds_sanpham[k].tenvt,
                        nhomsp: this.ds_sanpham[k].nhomsp
                    };
                    this.items[i].sanpham.push(cn)
                    // console.log(cn)
                }
            }
        },

        async getInfosp(item) {
            const data = await this.$axios.$get(`/api/ketoan/gettenspkhnm?mavt=${item.masp}`)
            for (let i = 0; i < this.items.length; i++) {
                this.items[i].tensp = data[0].tenvt
                this.items[i].nhomsp = data[0].nhomsp
            }
        },

        deleteRow(index) {
            this.items.splice(index, 1);

        },

        // copy items kế hoạch nhà máy
        async copyadd(item) {
            let getsp = []
            getsp = await this.$axios.$get(
                `/api/ketoan/getinfosp?mavt=${item.masp}`
            );
            if (getsp.length > 0) {
                const tenvt = getsp[0].tenvt
                const nhomsp = getsp[0].nhomsp
                this.items.push({
                    makh: item.makh,
                    mota: item.mota,
                    masp: item.masp,
                    tensp: tenvt,
                    nhomsp: item.nhomsp,
                    soluong: item.soluong,
                    tgbatdau: item.tgbatdau,
                    tgketthuc: item.tgketthuc,
                    ghichu: item.ghichu,
                    status: item.status,
                    soluongmuavup1: 0,
                    soluongmuavup2: 0,
                    soluongmuavup3: 0,
                    slthang1: 0,
                    slthang2: 0,
                    slthang3: 0,
                    slthang4: 0,
                    slthang5: 0,
                    slthang6: 0,
                    slthang7: 0,
                    slthang8: 0,
                    slthang9: 0,
                    slthang10: 0,
                    slthang11: 0,
                    slthang12: 0,
                    createdAt: this.form.createdAt,
                    createdBy: this.$auth.$state.user.username,
                    sanpham: [{
                        mapx: "",
                        masp: item.masp,
                        tensp: tenvt,
                        nhomsp: nhomsp,
                    },]
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
                    title: "Nhập đủ thông tin trước khi copy dữ liệu xuống !!!",
                });
            }

            // console.log(this.items)
        },

        // create phiếu
        async onTaophieu() {
            // console.log(this.masp);
            Swal.fire({
                title: "Chắc chắn tạo lô sản xuất này?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Chắc chắn tạo",
            }).then((result) => {
                if (result.isConfirmed) {
                    try {
                        // console.log(this.items);
                        // Đầu tiên phải giải quyết vấn đề DUY NHẤT của Kế hoạch nhà máy
                        var strArray = []
                        var checkLength = []
                        for (let i = 0; i < this.items.length; i++) {
                            strArray.push(this.items[i].makh)
                        }
                        // console.log(strArray)
                        var alreadySeen = {};
                        strArray.forEach(function (str) {
                            if (alreadySeen[str])
                                // console.log(str);
                                checkLength.push(str);
                            else
                                alreadySeen[str] = true;
                        });

                        // console.log(checkLength)
                        if (checkLength.length <= 0) {
                            for (let i = 0; i < this.items.length; i++) {
                                if (
                                    this.items[i].makh == "" ||
                                    this.items[i].masp == "" ||
                                    this.items[i].ngaybd == "" ||
                                    this.items[i].ngaykt == "" ||
                                    this.items[i].soluong == ""
                                ) {
                                    const Toast = Swal.mixin({
                                        toast: true,
                                        position: "top-end",
                                        showConfirmButton: false,
                                        timer: 3000,
                                        timerProgressBar: true,
                                        didOpen: (toast) => {
                                            toast.addEventListener("mouseenter", Swal.stopTimer);
                                            toast.addEventListener(
                                                "mouseleave",
                                                Swal.resumeTimer
                                            );
                                        },
                                    });
                                    Toast.fire({
                                        icon: "error",
                                        title: "Nhập đủ dữ liệu",
                                    });
                                } else {
                                    for (let i = 0; i < this.items.length; i++) {
                                        this.items[i].sanpham = []
                                        this.$axios.$post(
                                            "/api/ketoan/lapkhnhamay",
                                            this.items[i]
                                        );
                                    }


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
                                        title: "Tạo KẾ HOẠCH NHÀ MÁY thành công",
                                    });

                                    let turn = 1;
                                    let length = this.items.length;
                                    while (turn <= length) {
                                        this.deleteRow(this.items.length - turn);
                                        turn += 1;
                                    }
                                }
                            }
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
                                title: "Trùng Mã Kế hoạch !!!",
                            });
                        }
                    } catch (error) {
                        console.log(error);
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
    font-size: small;
}

.table_wrapper {
    position: sticky;
    left: 0;
    background-color: whitesmoke;
}

.table-height {
    height: 130px;
    display: block;
    overflow: scroll;
    width: 100%;
    position: sticky;
    top: 0;
}

.modal-content,
.modal-card {
    width: 820px;
    height: 560px;
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
</style>
