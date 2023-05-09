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
              <span style="color: #3850b7; font-size: 16px; font-weight: bold"
                >LẬP KẾ HOẠCH NĂM</span
              >
            </div>
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
            <table
              class="table is-responsive is-bordered is-narrow is-fullwidth"
            >
              <tr style="background-color: #fffaeb">
                <td
                  colspan="11"
                  style="text-align: right; font-weight: bold; font-size: small"
                ></td>
                <td>
                  <button
                    @click="onTaophieu"
                    class="button is-danger is-fullwidth is-small"
                  >
                    <span style="font-weight: 600">Ghi dữ liệu</span>
                  </button>
                </td>
                <td>
                  <button
                    @click="addKehoach"
                    class="button is-success is-fullwidth is-small"
                  >
                    <span style="font-weight: 600">Thêm</span>
                  </button>
                </td>
              </tr>
              <tr style="background-color: #faf0f5">
                <td
                  style="
                    text-align: center;
                    font-weight: bold;
                    font-size: small;
                    width: 3%;
                  "
                >
                  STT
                </td>
                <td
                  style="
                    text-align: center;
                    font-weight: bold;
                    font-size: small;
                    width: 7%;
                  "
                >
                  Mã KẾ HOẠCH
                </td>
                <td
                  style="
                    text-align: center;
                    font-weight: bold;
                    font-size: small;
                    width: 7%;
                  "
                >
                  Mã thành phẩm
                </td>
                <td
                  style="
                    text-align: center;
                    font-weight: bold;
                    font-size: small;
                    width: 10%;
                  "
                >
                  Tên thành phẩm
                </td>
                <td
                  style="
                    text-align: center;
                    font-weight: bold;
                    font-size: small;
                    width: 6%;
                  "
                >
                  Nhóm TP
                </td>
                <td
                  style="
                    text-align: center;
                    font-weight: bold;
                    font-size: small;
                    width: 3%;
                  "
                >
                  Thời gian bắt Đầu
                </td>
                <td
                  style="
                    text-align: center;
                    font-weight: bold;
                    font-size: small;
                    width: 3%;
                  "
                >
                  Thời gian kết thúc
                </td>
                <td
                  style="
                    text-align: center;
                    font-weight: bold;
                    font-size: small;
                    width: 5%;
                  "
                >
                  Số lượng
                </td>
                <td
                  style="
                    text-align: center;
                    font-weight: bold;
                    font-size: small;
                    width: 7%;
                  "
                >
                  Mã khách hàng
                </td>
                <td
                  style="
                    text-align: center;
                    font-weight: bold;
                    font-size: small;
                    width: 10%;
                  "
                >
                  Tên khách hàng
                </td>
                <td
                  style="
                    text-align: center;
                    font-weight: bold;
                    font-size: small;
                    width: 13%;
                  "
                >
                  Ghi chú
                </td>
                <td
                  style="
                    text-align: center;
                    font-weight: bold;
                    font-size: small;
                    width: 3%;
                  "
                >
                  Xóa
                </td>
                <td
                  style="
                    text-align: center;
                    font-weight: bold;
                    font-size: small;
                    width: 3%;
                  "
                >
                  Copy
                </td>
              </tr>
              <tr v-for="(item, index) in items" :key="index + 'hhjjkk'">
                <td
                  style="
                    font-size: small;
                    text-align: center;
                    background-color: #eff1fa;
                  "
                >
                  {{ index + 1 }}
                </td>
                <td>
                  <input
                    v-model.trim="item.makh"
                    class="input is-fullwidth is-danger is-small"
                    type="text"
                    style="vertical-align: middle;"
                  />
                </td>
                <td style="font-size: small">
                  <input
                    v-model.trim="item.mathanhpham"
                    class="input is-fullwidth is-danger is-small"
                    type="text"
                    style="vertical-align: middle;"
                  />
                </td>
                <td>
                  <input
                    v-model.trim="item.tenthanhpham"
                    type="text"
                    class="input is-small"
                    style="vertical-align: middle;"
                  />
                </td>
                <td>
                  <input
                    v-model.trim="item.nhomthanhpham"
                    type="text"
                    class="input is-small"
                    style="vertical-align: middle;"
                  />
                </td>

                <td>
                  <input
                    v-model.trim="item.tgbatdau"
                    type="date"
                    class="input is-small"
                    style="vertical-align: middle;"
                  />
                </td>
                <td>
                  <input
                    v-model.trim="item.tgketthuc"
                    type="date"
                    class="input is-small"
                    style="vertical-align: middle;"
                  />
                </td>
                <td>
                  <input
                    v-model.trim="item.soluong"
                    type="number"
                    class="input is-small"
                    style="vertical-align: middle;"
                  />
                </td>
                <td>
                  <input
                    v-model.trim="item.makhachhang"
                    type="text"
                    class="input is-small"
                    style="vertical-align: middle;"
                  />
                </td>
                <td>
                  <input
                    v-model.trim="item.khachhang"
                    type="text"
                    class="input is-small"
                    style="vertical-align: middle;"
                  />
                </td>
                <td>
                  <div class="control">
                    <textarea
                      rows="1"
                      v-model.trim="item.ghichu"
                      class="textarea is-small"
                      placeholder="Ghi chú ..."
                      style="vertical-align: middle;"
                    ></textarea>
                  </div>
                </td>
                <td>
                  <button
                    @click="deleteRow(index)"
                    class="button is-danger is-small is-fullwidth"
                  >
                    Xóa
                  </button>
                </td>
                <td>
                  <button
                    @click="copyadd(item)"
                    class="button is-warning is-small is-fullwidth"
                  >
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
        dt: "",
      },
      isphanxuong: 0,
      selectedIndex: 0,
      giaopx: 0,
      checkGhichu: false,
      // làm suggest
      banthanpham: [],
      // searchThanhpham: '',
      // suggestions_thanhpham: [],
      // items này để lập kế hoạch nhà máy
      items: [
        {
          makh: "",
          mathanhpham: "",
          tenthanhpham: "",
          nhomthanhpham: "",
          soluong: "",
          soluongmuavup1: 0,
          soluongmuavup2: 0,
          soluongmuavup3: 0,
          tgbatdau: "",
          tgketthuc: "",
          makhachhang: "",
          khachhang: "",
          ghichu: "",
          status: 0,
          createdAt: "",
          createdBy: "",
          updatedAt: "",
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
          suggestions_thanhpham: [],
        },
      ],

      stringItem: "",
      searchText: "", // If value is falsy, reset searchText & searchItem
    };
  },

  mounted() {
    this.currentDateTime();
    this.get_phanxuong();
    // this.get_dmsp();
    // this.deleteRow(0);
    this.get_banthanhpham();
  },

  isFormValid() {
    return !this.$v.form.$invalid;
  },

  methods: {
    codeAndNameAndDesc(item) {
      return `${item.masp} - ${item.tensp}`;
    },

    // suggest input thành phẩm
    onInput(index) {
      const item = this.items[index];
      if (!item.mathanhpham) {
        item.mathanhpham = [];
        return;
      }
      const MAX_SUGGESTIONS = 5; // Số lượng suggest tối đa
      item.suggestions_thanhpham = this.banthanpham
        .map((c) => c.mathanhpham)
        .filter((mathanhpham) =>
          mathanhpham.toLowerCase().includes(item.mathanhpham.toLowerCase())
        )
        .map((mathanhpham) => mathanhpham)
        .slice(0, MAX_SUGGESTIONS);
    },
    selectSuggestion(index, suggestion) {
      // this.searchThanhpham = suggestion;
      // this.suggestions_thanhpham = [];
      this.items[index].mathanhpham = suggestion;
      this.items[index].suggestions_thanhpham = [];
    },
    // end suggest thành phẩm phẩm

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

    // get all phân xưởng
    async get_phanxuong() {
      this.phanxuong = await this.$axios.$get(`/api/phongban/allphanxuong`);
    },
    // get all bán thành phẩm
    async get_banthanhpham() {
      this.banthanpham = await this.$axios.$get(
        `/api/lokehoach/getallthanhpham`
      );
      // console.log(this.banthanhpham)
    },

    async addKehoach() {
      this.items.push({
        makh: "",
        mathanhpham: "",
        tenthanhpham: "",
        nhomthanhpham: "",
        soluong: "",
        soluongmuavup1: 0,
        soluongmuavup2: 0,
        soluongmuavup3: 0,
        tgbatdau: "",
        tgketthuc: "",
        makhachhang: "",
        khachhang: "",
        ghichu: "",
        status: 0,
        createdAt: this.form.createdAt,
        createdBy: this.$auth.$state.user.username,
        updatedAt: "",
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
        suggestions_thanhpham: [],
      });
    },

    async getInfosp(item) {
      const data = await this.$axios.$get(
        `/api/ketoan/gettenspkhnm?mavt=${item.masp}`
      );
      for (let i = 0; i < this.items.length; i++) {
        this.items[i].tensp = data[0].tenvt;
        this.items[i].nhomsp = data[0].nhomsp;
      }
    },

    deleteRow(index) {
      this.items.splice(index, 1);
    },

    // copy items kế hoạch nhà máy
    async copyadd(item) {
      this.items.push({
        makh: item.makh,
        mathanhpham: item.mathanhpham,
        tenthanhpham: item.tenthanhpham,
        nhomthanhpham: item.nhomthanhpham,
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
        makhachhang: item.makhachhang,
        khachhang: item.khachhang,
        createdAt: this.form.createdAt,
        createdBy: this.$auth.$state.user.username,
        suggestions_thanhpham: [],
      });

      // console.log(this.items)
    },

    // create phiếu
    async onTaophieu() {
      // console.log(this.masp);

      try {
        // console.log(this.items);
        // Đầu tiên phải giải quyết vấn đề DUY NHẤT của Kế hoạch nhà máy
        var strArray = [];
        var checkLength = [];
        for (let i = 0; i < this.items.length; i++) {
          strArray.push(this.items[i].makh);
        }
        // console.log(strArray)
        var alreadySeen = {};
        strArray.forEach(function (str) {
          if (alreadySeen[str])
            // console.log(str);
            checkLength.push(str);
          else alreadySeen[str] = true;
        });
        // console.log(this.items)
        // console.log(checkLength)
        if (checkLength.length <= 0) {
          for (let i = 0; i < this.items.length; i++) {
            if (
              this.items[i].makh == "" ||
              this.items[i].mathanhpham == "" ||
              this.items[i].tgbatdau == "" ||
              this.items[i].tgketthuc == "" ||
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
                  toast.addEventListener("mouseleave", Swal.resumeTimer);
                },
              });
              Toast.fire({
                icon: "error",
                title: "Nhập đủ dữ liệu",
              });
            } else {
              for (let i = 0; i < this.items.length; i++) {
                // lấy thêm thông tin tên thành phẩm và nhóm thành phẩm
                // đoạn này tạm bỏ qua để cho tự nhập đã
                // const tp = await this.$axios.$get(
                //     `/api/lokehoach/getallthanhphamwithmtp?mathanhpham=${this.items[i].mathanhpham}`
                // );
                // this.items[i].tenthanhpham = tp[0].tenthanhpham
                // this.items[i].nhomthanhpham = tp[0].nhomthanhpham

                this.$axios.$post("/api/ketoan/lapkhnhamay", this.items[i]);
              }
              // console.log(this.items)

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
              this.addKehoach;
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
