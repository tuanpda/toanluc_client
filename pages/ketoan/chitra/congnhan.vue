<template>
  <div class="columns">
    <div class="column container">
      <br />
      <div class="box" style="margin-left: 3px; margin-right: 3px">
        <div class="columns">
          <div class="column">
            <div class="control">
              <span class="icon is-small is-left">
                <i style="color: #00d1b2" class="far fa-calendar-alt"></i>
              </span>
              <span style="color: #3850b7; font-size: 15px; font-weight: bold"
                >Chi trả lương</span
              >
            </div>
          </div>
        </div>

        <div class="columns">
          <div class="column">
            <div class="select is-small is-fullwidth">
              <select id="" @change="onChange_Thang($event)">
                <option selected>-- Chọn tháng --</option>
                <option value="01">Tháng 1</option>
                <option value="02">Tháng 2</option>
                <option value="03">Tháng 3</option>
                <option value="04">Tháng 4</option>
                <option value="05">Tháng 5</option>
                <option value="06">Tháng 6</option>
                <option value="07">Tháng 7</option>
                <option value="08">Tháng 8</option>
                <option value="09">Tháng 9</option>
                <option value="10">Tháng 10</option>
                <option value="11">Tháng 11</option>
                <option value="12">Tháng 12</option>
              </select>
            </div>
          </div>
          <div class="column">
            <div class="select is-small is-fullwidth">
              <select id="" @change="onChange_Nam($event)">
                <option selected>-- Chọn năm --</option>
                <option value="2022">Tháng 2022</option>
                <option value="2023">Tháng 2023</option>
                <option value="2024">Tháng 2024</option>
                <option value="2025">Tháng 2025</option>
                <option value="2026">Tháng 2026</option>
                <option value="2027">Tháng 2027</option>
                <option value="2028">Tháng 2028</option>
                <option value="2029">Tháng 2029</option>
                <option value="2030">Tháng 2030</option>
                <option value="2031">Tháng 2031</option>
                <option value="2032">Tháng 2032</option>
                <option value="2033">Tháng 2033</option>
              </select>
            </div>
          </div>
        </div>

        <div class="columns">
          <div class="column">
            <div class="control has-icons-left">
              <div class="select is-small is-fullwidth">
                <select @change="getWithPX($event)">
                  <option selected>-- Chọn phân xưởng --</option>
                  <option v-for="item in phanxuong" :value="item.mapx">
                    {{ item.mapx }} -- {{ item.tenpx }}
                  </option>
                </select>
              </div>
              <span class="icon is-small is-left">
                <i style="color: #48c78e" class="fas fa-kaaba"></i>
              </span>
            </div>
          </div>
          <div class="column">
            <div class="select is-small is-fullwidth">
              <select id="" @change="onChange_Nam($event)">
                <option selected>-- Chọn năm --</option>
                <option value="2022">Tháng 2022</option>
                <option value="2023">Tháng 2023</option>
                <option value="2024">Tháng 2024</option>
                <option value="2025">Tháng 2025</option>
                <option value="2026">Tháng 2026</option>
                <option value="2027">Tháng 2027</option>
                <option value="2028">Tháng 2028</option>
                <option value="2029">Tháng 2029</option>
                <option value="2030">Tháng 2030</option>
                <option value="2031">Tháng 2031</option>
                <option value="2032">Tháng 2032</option>
                <option value="2033">Tháng 2033</option>
              </select>
            </div>
          </div>
        </div>

        <div class="columns">
          <div class="column">
            <button
              @click="[reportBangluong(), reportSum()]"
              class="button is-small is-success is-fullwidth"
            >
              <span class="icon is-small">
                <i class="fas fa-file-alt"></i>
              </span>
              <span>Xem bảng lương</span>
            </button>
          </div>
          <div class="column">
            <button
              @click="onSaveChitra"
              class="button is-small is-info is-fullwidth"
            >
              <span class="icon is-small">
                <i class="far fa-file-pdf"></i>
              </span>
              <span>Chi trả</span>
            </button>
          </div>
        </div>

        <div v-if="report.length > 0" class="columns" style="margin-top: 1px">
          <div class="column">
            <div class="table_wrapper">
              <table
                class="table is-responsive is-bordered is-striped is-narrow is-hoverable is-fullwidth"
              >
                <tr>
                  <td
                    style="
                      text-align: center;
                      font-weight: bold;
                      font-size: small;
                      width: 1%;
                    "
                  >
                    <input type="checkbox" v-model="selectAll" />
                  </td>
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
                      width: 12%;
                    "
                  >
                    Họ tên
                  </td>
                  <td
                    style="
                      text-align: center;
                      font-weight: bold;
                      font-size: small;
                      background-color: aliceblue;
                      width: 7%;
                    "
                  >
                    Lương nhận
                  </td>
                  <td
                    style="
                      text-align: center;
                      font-weight: bold;
                      font-size: small;
                      background-color: aliceblue;
                      width: 7%;
                    "
                  >
                    Chuyển khoản 1
                  </td>
                  <td
                    style="
                      text-align: center;
                      font-weight: bold;
                      font-size: small;
                      background-color: aliceblue;
                      width: 7%;
                    "
                  >
                    Chuyển khoản 2
                  </td>
                  <td
                    style="
                      text-align: center;
                      font-weight: bold;
                      font-size: small;
                      background-color: aliceblue;
                      width: 7%;
                    "
                  >
                    Tiền mặt
                  </td>
                  <td
                    style="
                      text-align: center;
                      font-weight: bold;
                      font-size: small;
                      background-color: aliceblue;
                      width: 10%;
                    "
                  >
                    Số tài khoản
                  </td>
                  <td
                    style="
                      text-align: center;
                      font-weight: bold;
                      font-size: small;
                      background-color: aliceblue;
                      width: 10%;
                    "
                  >
                    Tên ngân hàng
                  </td>
                  <td
                    style="
                      text-align: center;
                      font-weight: bold;
                      font-size: small;
                      background-color: aliceblue;
                      width: 10%;
                    "
                  >
                    Chủ tài khoản
                  </td>
                  <td
                    style="
                      text-align: center;
                      font-weight: bold;
                      font-size: small;
                      background-color: aliceblue;
                      width: 7%;
                    "
                  >
                    Còn lại
                  </td>
                  <td
                    style="
                      text-align: center;
                      font-weight: bold;
                      font-size: small;
                      background-color: aliceblue;
                      width: 30%;
                    "
                  >
                    Ghi chú
                  </td>
                </tr>
                <tr v-for="(nv, index) in report" :key="index">
                  <td style="text-align: center">
                    <input v-model="selected" :value="nv" type="checkbox" />
                  </td>
                  <td style="text-align: center; font-size: small">
                    {{ index + 1 }}
                  </td>
                  <td style="font-size: small">{{ nv.hotennv }}</td>
                  <td
                    style="
                      text-align: right;
                      font-size: small;
                      color: #f14668;
                      font-weight: bold;
                    "
                  >
                    {{ nv.tongnhan | formatNumber }}
                  </td>
                  <!-- gõ tiền chuyển khoản -->
                  <td style="text-align: center; font-size: small">
                    <input
                      v-model="nv.nhanl1"
                      class="input is-small"
                      type="number"
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      class="input is-small"
                      v-model="nv.nhanl2"
                    />
                  </td>

                  <!-- gõ tiền mặt -->
                  <td style="text-align: center; font-size: small">
                    <input
                      v-model="nv.nhanl3"
                      type="number"
                      class="input is-small"
                    />
                  </td>

                  <td style="text-align: center; font-size: small">
                    {{ nv.stk }}
                  </td>
                  <td style="text-align: center; font-size: small">
                    {{ nv.tennganhang }}
                  </td>
                  <td style="text-align: center; font-size: small">
                    <input
                      type="text"
                      v-model="nv.chutaikhoan"
                      class="input is-small"
                    />
                  </td>

                  <!-- còn lại -->
                  <td
                    style="
                      text-align: center;
                      font-size: small;
                      font-weight: bold;
                      color: red;
                    "
                  >
                    {{
                      (nv.tongnhan -
                        (parseFloat(nv.nhanl1) +
                          parseFloat(nv.nhanl2) +
                          parseFloat(nv.nhanl3)))
                        | formatNumber
                    }}
                  </td>
                  <td>
                    <input
                      type="text"
                      class="input is-small"
                      v-model="nv.ghichu"
                    />
                  </td>
                </tr>
                <tr>
                  <td
                    style="
                      text-align: center;
                      font-weight: bold;
                      font-size: small;
                    "
                    colspan="3"
                  >
                    Tổng
                  </td>
                  <td
                    style="
                      text-align: right;
                      font-weight: bold;
                      font-size: small;
                    "
                  >
                    {{ sumrp.sum_tongnhan | formatNumber }}
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import createNumberMask from "text-mask-addons/dist/createNumberMask";
const currencyMask = createNumberMask({
  prefix: "",
  allowDecimal: true,
  includeThousandsSeparator: true,
  allowNegative: false,
});
import Swal from "sweetalert2";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "~/assets/font/OpenSans-Light-normal";
import "~/assets/font/OpenSans-SemiBold-normal";
export default {
  middleware: "auth",
  data() {
    return {
      selected: [],
      phanxuong: [],
      tonhom: [],
      report: [],
      sumreport: [],
      sumrp: [],
      thang: null,
      nam: null,
      isPdf: false,
      maxuong: "",
      mato: "",
      tenxuong: "",
      tento: "",
      mask: currencyMask,
      form: {
        chuyenkhoan: 0,
        tienmat: 0,
      },
      createdBy: this.$auth.$state.user.username,
      createdAt: null,
      keyThangnam: null,
    };
  },

  computed: {
    selectAll: {
      get: function () {
        return this.report ? this.selected.length == this.report.length : false;
      },
      set: function (value) {
        var selected = [];

        if (value) {
          this.report.forEach(function (nv) {
            selected.push(nv);
          });
        }

        this.selected = selected;
      },
    },

    isDisabled() {
      return this.isPdf == false;
    },
  },

  mounted() {
    this.getPhanxuong();
    this.currentDateTime();
  },

  methods: {
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
      this.createdAt = date + " " + time;
      console.log(this.createdAt);
    },

    async getPhanxuong() {
      this.phanxuong = await this.$axios.$get(`/api/phongban/allphanxuong`);

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
      this.createdAt = date + " " + time;

      console.log(this.createdAt);
    },

    async getWithPX(e) {
      this.mato = "";
      this.maxuong = "";
      var name = e.target.options[e.target.options.selectedIndex].text;
      // console.log(name)
      let position = name.split("--");
      let p1 = position[0].trim();
      let p2 = position[1].trim();
      this.maxuong = p1;
      this.tenxuong = p2;
      this.tonhom = await this.$axios.$get(
        `/api/phongban/alltoinxuong?mapx=${p1}`
      );
    },

    async getWithTo(e) {
      // console.log(this.mapx)
      var name = e.target.options[e.target.options.selectedIndex].text;
      // console.log(name)
      let position = name.split("--");
      let p1 = position[0].trim();
      let p2 = position[1].trim();
      this.mato = p1;
      this.tento = p2;
    },

    async reportBangluong() {
      if (this.mato == "") {
        this.report = await this.$axios.$get(
          `/api/report/reportluongthang_px?thang=${this.thang}&nam=${this.nam}&mapb=${this.maxuong}`
        );
        if (this.report.length <= 0) {
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
            title: "Không có số liệu kỳ lương tại xưởng này",
          });
        }
      } else {
        this.report = await this.$axios.$get(
          `/api/report/reportluongthang_to?thang=${this.thang}&nam=${this.nam}&mato=${this.mato}`
        );
        if (this.report.length <= 0) {
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
            title: "Không có số liệu kỳ lương tại tổ này",
          });
        }
      }
    },

    async reportSum() {
      if (this.mato == "") {
        this.sumreport = await this.$axios.$get(
          `/api/report/reportsumluong_phanxuong?thang=${this.thang}&nam=${this.nam}&mapb=${this.maxuong}`
        );
        this.sumrp = this.sumreport[0];
      } else {
        this.sumreport = await this.$axios.$get(
          `/api/report/reportsumluongto?thang=${this.thang}&nam=${this.nam}&mato=${this.mato}`
        );
      }
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
    },

    onChange_Thang(e) {
      var id = e.target.value;
      var name = e.target.options[e.target.options.selectedIndex].text;
      // console.log('id ', id);
      // console.log('name ',name );
      this.thang = id;
      // console.log(this.nam)
      // console.log(this.tennam)
    },

    onChange_Nam(e) {
      var id = e.target.value;
      // var name = e.target.options[e.target.options.selectedIndex].text;
      // console.log('id ',id );
      // console.log('name ',name );
      this.nam = id;
      // console.log(this.nam)
      // console.log(this.tennam)
    },

    async onSaveChitra() {
      const arrkeythangnam = [];
      const listkeythangnam = await this.$axios.$get(
        `/api/ketoan/getkeythangnam_chitraluong`
      );
      // console.log(this.listkeythangnam);
      for (let i = 0; i < listkeythangnam.length; i++) {
        let ktn = listkeythangnam[i].key_thangnam.trim();
        arrkeythangnam.push(ktn);
      }
      this.keyThangnam =
        this.thang.trim() +
        this.nam.trim() +
        "-" +
        this.maxuong +
        "-" +
        this.mato;

      // console.log(this.keyThangnam);
      console.log(this.selected);
      this.isExits = arrkeythangnam.includes(this.keyThangnam.trim());
      if (this.isExits == false) {
        for (let i = 0; i < this.selected.length; i++) {
          const data = {
            mapb: this.selected[i].mapb,
            tenpb: this.selected[i].tenpb,
            mato: this.selected[i].mato,
            manv: this.selected[i].manv,
            hotennv: this.selected[i].hotennv,
            tongnhan: this.selected[i].tongnhan,
            createdAt: this.createdAt,
            createdBy: this.createdBy,
            thang: this.thang,
            nam: this.nam,
            key_thangnam: this.keyThangnam,
            status: 1,
            chutaikhoan: this.selected[i].chutaikhoan,
            tennganhang: this.selected[i].tennganhang,
            stk: this.selected[i].stk,
            chuyenkhoan:
              parseFloat(this.selected[i].nhanl1) +
              parseFloat(this.selected[i].nhanl2),
            tienmat: parseFloat(this.selected[i].nhanl3),
            ck1: parseFloat(this.selected[i].nhanl1),
            ck2: parseFloat(this.selected[i].nhanl2),
            ghichu: this.selected[i].ghichu,
            vanphong: 0,
          };

          const res = await this.$axios.post(
            `/api/ketoan/addchitraluongthang`,
            data
          );
          console.log(res);
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
          title: "Đã ghi số liệu chi trả lương",
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
          title: "Số liệu chi trả kỳ này đã có",
        });
      }

      // for (let i = 0; i < this.selected.length; i++) {
      //   // console.log(this.selected[i].chuyenkhoan.replace(/,/g, ""));
      //   // console.log(this.selected[i].tienmat.replace(/,/g, ""));
      //   if (this.selected[i].nhanl1 == 0) {
      //     if (this.selected[i].tienmat == 0) {
      //       this.selected[i].nhanl1 = this.selected[i].chuyenkhoan.replace(
      //         /,/g,
      //         ""
      //       );
      //     } else {
      //       this.selected[i].nhanl1 = this.selected[i].tienmat.replace(
      //         /,/g,
      //         ""
      //       );
      //     }
      //     await this.$axios.patch(
      //       `/api/ketoan/addchitraluongthang/${this.selected[i]._id}`,
      //       this.selected[i]
      //     );
      //   } else if (this.selected[i].nhanl2 == 0) {
      //     if (this.selected[i].tienmat == 0) {
      //       this.selected[i].nhanl2 = this.selected[i].chuyenkhoan.replace(
      //         /,/g,
      //         ""
      //       );
      //     } else {
      //       this.selected[i].nhanl2 = this.selected[i].tienmat.replace(
      //         /,/g,
      //         ""
      //       );
      //     }
      //     await this.$axios.patch(
      //       `/api/ketoan/addchitraluongthang/${this.selected[i]._id}`,
      //       this.selected[i]
      //     );
      //   } else if (this.selected[i].nhanl3 == 0) {
      //     if (this.selected[i].tienmat == 0) {
      //       this.selected[i].nhanl3 = this.selected[i].chuyenkhoan.replace(
      //         /,/g,
      //         ""
      //       );
      //     } else {
      //       this.selected[i].nhanl3 = this.selected[i].tienmat.replace(
      //         /,/g,
      //         ""
      //       );
      //     }
      //     await this.$axios.patch(
      //       `/api/ketoan/addchitraluongthang/${this.selected[i]._id}`,
      //       this.selected[i]
      //     );
      //   }
      // }
    },
  },
};
</script>

<style scoped>
/* .table_wrapper {
  display: block;
  overflow-x: auto;
  white-space: nowrap;
  position: sticky;
  left: 0;
  background-color: whitesmoke;
} */

/* @media screen and (max-width: 1199px) {
  .table_wrapper {
    display: block;
    overflow-x: auto;
    white-space: nowrap;
    position: sticky;
    left: 0;
    background-color: whitesmoke;
  }
} */

@media (max-width: 1200px) {
  .table_wrapper {
    display: block;
    overflow-x: auto;
    white-space: nowrap;
    position: sticky;
    left: 0;
    background-color: whitesmoke;
  }
}

.table-height {
  height: 750px;
  display: block;
  overflow: scroll;
  width: 100%;
  position: sticky;
  top: 0;
}
</style>
