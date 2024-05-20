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
                >Chi trả lương Công nhân</span
              >
            </div>
          </div>
        </div>
        <div class="box">
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
                <select @change="getWithTo($event)">
                  <option selected>-- Chọn tổ --</option>
                  <option v-for="item in tonhom" :value="item.mapx">
                    {{ item.mato }} -- {{ item.tento }}
                  </option>
                </select>
              </div>
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
              :disabled="!isSaveChitra"
              @click="onSaveChitra"
              class="button is-small is-info is-fullwidth"
            >
              <span class="icon is-small">
                <i class="far fa-file-pdf"></i>
              </span>
              <span>Chi trả</span>
            </button>
          </div>
          <div class="column">
            <button
              :disabled="!isUpdateBank"
              @click="preShowUpdate"
              class="button is-small is-danger is-fullwidth"
            >
              <span class="icon is-small">
                <i class="far fa-file-pdf"></i>
              </span>
              <span>Cập nhật thông tin ngân hàng</span>
            </button>
          </div>
        </div>

        <div v-if="report.length > 0" class="table_wrapper">
          <table
            class="table is-responsive is-bordered is-striped is-narrow is-hoverable is-fullwidth"
          >
            <tr style="background-color: blanchedalmond">
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
                style="text-align: center; font-weight: bold; font-size: small"
              >
                Họ tên
              </td>
              <td
                style="text-align: center; font-weight: bold; font-size: small"
              >
                Lương nhận
              </td>
              <td
                style="text-align: center; font-weight: bold; font-size: small"
              >
                Chuyển khoản 1
              </td>
              <td
                style="text-align: center; font-weight: bold; font-size: small"
              >
                Chuyển khoản 2
              </td>
              <td
                style="
                  text-align: center;
                  font-weight: bold;
                  font-size: small;
                  width: 10%;
                "
              >
                Tiền mặt
              </td>
              <td
                style="text-align: center; font-weight: bold; font-size: small"
              >
                Số tài khoản
              </td>
              <td
                style="text-align: center; font-weight: bold; font-size: small"
              >
                Tên ngân hàng
              </td>
              <td
                style="text-align: center; font-weight: bold; font-size: small"
              >
                Chủ tài khoản
              </td>
              <td
                style="
                  text-align: center;
                  font-weight: bold;
                  font-size: small;
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
                  type="text"
                  v-mask="mask"
                  @blur="updateNhanl2(nv)"
                />
              </td>

              <template v-if="nv.stk != ''">
                <td
                  style="font-size: small; text-align: right; font-weight: bold"
                >
                  <!-- <input
                    type="text"
                    class="input is-small"
                    v-model="nv.tongnhan"
                    v-mask="mask"
                  /> -->
                  {{ computedNhanl2(nv) | formatNumber }}
                </td>
              </template>
              <template v-else>
                <td>
                  <!-- <input
                    type="number"
                    class="input is-small"
                    v-model="nv.nhanl2"
                  /> -->
                </td>
              </template>

              <!-- gõ tiền mặt -->
              <template v-if="nv.stk == ''">
                <td
                  style="text-align: right; font-size: small; font-weight: bold"
                >
                  <!-- <input
                    v-model="nv.tongnhan"
                    type="text"
                    class="input is-small"
                    v-mask="mask"
                  /> -->
                  {{ nv.tongnhan | formatNumber }}
                </td>
              </template>
              <template v-else>
                <td style="text-align: center; font-size: small">
                  <!-- <input
                    v-model="nv.tienmat"
                    type="text"
                    class="input is-small"
                    v-mask="mask"
                  /> -->
                </td>
              </template>

              <td style="text-align: center; font-size: small">
                {{ nv.stk }}
              </td>
              <td style="text-align: center; font-size: small">
                {{ nv.tennganhang }}
              </td>
              <td style="font-size: small; font-weight: 700">
                {{ nv.chutaikhoan }}
              </td>

              <td>
                <input type="text" class="input is-small" v-model="nv.ghichu" />
              </td>
            </tr>
            <tr>
              <td
                style="text-align: center; font-weight: bold; font-size: small"
                colspan="3"
              >
                Tổng
              </td>
              <td
                style="text-align: right; font-weight: bold; font-size: small"
              >
                {{ sumrp.sum_tongnhan | formatNumber }}
              </td>
            </tr>
          </table>
        </div>
      </div>
      <!-- Modal update-->
      <div class="">
        <div :class="{ 'is-active': isActive }" class="modal">
          <div class="modal-background"></div>
          <div class="modal-content modal-card">
            <section class="modal-card-body">
              <div>
                <div class="columns">
                  <div class="column">
                    <span
                      style="font-size: small; font-weight: bold; color: red"
                      >I. Có tất cả {{ show_needupudate.length }} công nhân cần
                      cập nhật thông tin ngân hàng.
                    </span>
                    <div
                      class="table_wrapper table-height"
                      style="margin-top: 5px"
                    >
                      <table
                        class="table is-responsive is-bordered is-striped is-narrow is-hoverable is-fullwidth"
                      >
                        <tr style="font-size: small; font-weight: bold">
                          <td style="text-align: center">STT</td>
                          <td style="text-align: center">Mã CN</td>
                          <td style="text-align: center">Tên CN</td>
                          <td style="text-align: center">Chủ tài khoản</td>
                          <td style="text-align: center">Tên ngân hàng</td>
                          <td style="text-align: center">Số tài khoản</td>
                        </tr>
                        <tr
                          v-for="(item, index) in show_needupudate"
                          style="font-size: small"
                        >
                          <td style="text-align: center">{{ index + 1 }}</td>
                          <td>{{ item.manv }}</td>
                          <td>{{ item.hotennv }}</td>
                          <td>{{ item.chutaikhoan }}</td>
                          <td>{{ item.tennganhang }}</td>
                          <td>{{ item.stk }}</td>
                        </tr>
                      </table>
                    </div>
                  </div>
                </div>
                <div class="columns">
                  <div class="column">
                    <span
                      style="font-size: small; font-weight: bold; color: red"
                      >II. Bấm nút cập nhật ngay bên dưới để cập nhật lại tất cả
                      thông tin về tài khoản ngân hàng cho công nhân.
                    </span>
                  </div>
                </div>
                <div class="columns">
                  <div class="column">
                    <button
                      @click="onUpdateInfoBank"
                      class="button is-success is-small is-fullwidth"
                    >
                      Cập nhật thông tin ngân hàng
                    </button>
                  </div>
                  <div class="column">
                    <button
                      @click="isActive = false"
                      class="button is-info is-small is-fullwidth"
                    >
                      Đóng
                    </button>
                  </div>
                </div>
                <div class="columns">
                  <div class="column">
                    <div v-show="isshow == true">
                      <div style="text-align: center">
                        <span
                          style="
                            font-size: small;
                            font-weight: bold;
                            color: red;
                          "
                          >{{ showcount }} / {{ showsuccess }} Công nhân cần cập
                          nhật</span
                        >
                      </div>
                      <div>
                        <progress
                          id="progress-bar"
                          class="progress is-success"
                        ></progress>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
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
  middleware: "auth-luong",
  data() {
    return {
      chitra: {},
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

      // modal update
      isActive: false,
      show_needupudate: [],
      show_datasave: [],

      // progress
      showcount: 0,
      showsuccess: 0,
      isshow: false,
      isUpdateBank: false,
      isSaveChitra: false,
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

    computedNhanl2() {
      return (nv) => {
        return nv.nhanl2;
      };
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
      // console.log(this.createdAt);
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

      // console.log(this.createdAt);
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

    updateNhanl2(nv) {
      // console.log(nv.nhanl1);
      const number = parseInt(nv.nhanl1.replace(/,/g, ""), 10);
      // console.log(number);
      nv.nhanl2 = nv.tongnhan - number;
    },

    async reportBangluong() {
      if (this.mato == "") {
        this.report = await this.$axios.$get(
          `/api/report/reportluongthang_px?thang=${this.thang}&nam=${this.nam}&mapb=${this.maxuong}`
        );
        // Làm tròn cột "tongnhan"
        this.report.forEach((item) => {
          item.tongnhan = Math.round(item.tongnhan);
          item.nhanl2 = item.tongnhan - item.nhanl1;
          if (item.stk == "") {
            item.tienmat = item.tongnhan;
          } else {
            item.tienmat = 0;
          }
        });
        this.isUpdateBank = true;
        this.isSaveChitra = true;
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
          this.isUpdateBank = false;
          this.isSaveChitra = false;
        }
      } else {
        this.report = await this.$axios.$get(
          `/api/report/reportluongthang_to?thang=${this.thang}&nam=${this.nam}&mato=${this.mato}`
        );
        // Làm tròn cột "tongnhan"
        this.report.forEach((item) => {
          item.tongnhan = Math.round(item.tongnhan);
          item.nhanl2 = item.tongnhan - item.nhanl1;
          if (item.stk == "") {
            item.tienmat = item.tongnhan;
          } else {
            item.tienmat = 0;
          }
        });
        this.isUpdateBank = true;
        this.isSaveChitra = true;
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
          this.isUpdateBank = false;
          this.isSaveChitra = false;
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

    async preShowUpdate() {
      this.show_needupudate = [];
      this.show_datasave = [];
      // console.log(this.report);
      // tìm thông tin của toàn bộ công nhân trong danh mục công nhân
      // console.log(this.maxuong);
      // console.log(this.mato);
      const arrCn = [];
      for (let i = 0; i < this.report.length; i++) {
        arrCn.push(this.report[i].manv);
      }
      // console.log(arrCn);
      let listcn = [];
      const res = await this.$axios.$get(
        `/api/congnhan/showallcongnhanwitharrmacn`,
        {
          params: {
            macn: arrCn,
          },
        }
      );
      listcn = res.data;
      // console.log(keytn);
      // console.log(listcn);
      // tiến hành cập nhật thông tin tài khoản ngân hàng vào bảng luongthang
      // đầu tiên xem mã công nhân trong mảng arrCn có những mã nào. ứng với từng mã sẽ cập nhật
      // mã đó theo thông tin ngân hàng

      for (let i = 0; i < listcn.length; i++) {
        this.show_datasave.push({
          manv: listcn[i].macn,
          chutaikhoan: listcn[i].chutaikhoan,
          tennganhang: listcn[i].tennh,
          stk: listcn[i].sotknh,
        });
      }

      // console.log(this.show_datasave);

      // tìm xem công nhân nào chưa có thông tin đầy đủ về tài khoản ngân hàng
      // tìm xong đẩy vào mảng show_needupudate
      // console.log(this.report);
      for (let i = 0; i < this.report.length; i++) {
        if (
          this.report[i].stk == "" ||
          this.report[i].chutaikhoan == "" ||
          this.report[i].tennganhang == ""
        ) {
          this.show_needupudate.push({
            _id: this.report[i]._id,
            manv: this.report[i].manv,
            hotennv: this.report[i].hotennv,
            chutaikhoan: this.report[i].chutaikhoan,
            tennganhang: this.report[i].tennganhang,
            stk: this.report[i].stk,
          });
        }
      }
      // console.log(this.show_needupudate);
      // console.log(this.show_datasave);
      this.isActive = true;
    },

    async onUpdateInfoBank() {
      const result = await Swal.fire({
        title: `Bạn chắc chắn cập nhật thông tin cho các công nhân trên?`,
        showDenyButton: true,
        confirmButtonText: "Chắc chắn",
        denyButtonText: `Hủy`,
      });
      if (result.isConfirmed) {
        try {
          let keytn =
            this.thang.trim() +
            this.nam.trim() +
            "-" +
            this.maxuong +
            "-" +
            this.mato;
          // console.log(keytn);
          const lengtData = this.show_needupudate.length;
          // console.log(lengtData);
          this.showsuccess = lengtData;
          this.isshow = true;
          const progressBar = document.getElementById("progress-bar");
          progressBar.value = this.showcount;
          progressBar.max = this.showsuccess;

          // chạy vòng lặp để cập nhật
          for (let i = 0; i < this.show_needupudate.length; i++) {
            for (let j = 0; j < this.show_datasave.length; j++) {
              if (this.show_needupudate[i].manv == this.show_datasave[j].manv) {
                // console.log(data_update);
                // console.log(this.show_needupudate[i].manv);
                // console.log(this.show_needupudate[i]._id);
                // update
                const res = await this.$axios.$get(
                  `/api/congnhan/updatethongtinbank`,
                  {
                    params: {
                      _id: this.show_needupudate[i]._id,
                      manv: this.show_needupudate[i].manv,
                      key_thangnam: keytn,
                      chutaikhoan: this.show_datasave[j].chutaikhoan,
                      tennganhang: this.show_datasave[j].tennganhang,
                      stk: this.show_datasave[j].stk,
                    },
                  }
                );
                // console.log(res);
                if (res.success) {
                  this.showcount++;
                  progressBar.value = this.showcount;
                }
              }
            }

            //update luongthang set chutaikhoan='', tennganhang='', stk=''
            // where _id=_id and manv=manv and key_thangnam=keytn
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
            title:
              "Cập nhật thành công. Bạn bấm lại nút Xem bảng lương để hiển thị lại dữ liệu!!",
          });
          this.isshow = false;
          this.showcount = 0;
          this.showsuccess = 0;
        } catch (error) {
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener("mouseenter", Swal.stopTimer);
              toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
          });
          Toast.fire({
            icon: "error",
            title: `Có lỗi xảy ra`,
          });
        }
      }
    },

    async onSaveChitra() {
      const result = await Swal.fire({
        title: `Bạn chắc chắn ghi dữ liệu Chi trả?`,
        showDenyButton: true,
        confirmButtonText: "Chắc chắn",
        denyButtonText: `Hủy`,
      });
      if (result.isConfirmed) {
        try {
          if (this.selected.length < 1) {
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
              title: "Không có phiếu nào được tích chọn",
            });
            return;
          } else {
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
            // console.log(this.selected);
            this.isExits = arrkeythangnam.includes(this.keyThangnam.trim());
            if (this.isExits == false) {
              for (let i = 0; i < this.selected.length; i++) {
                if (this.selected[i].tienmat == 0) {
                  this.chitra = {
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
                      parseInt(this.selected[i].nhanl1.replace(/,/g, ""), 10) +
                      parseFloat(this.selected[i].nhanl2),
                    tienmat: 0,
                    ck1: parseInt(
                      this.selected[i].nhanl1.replace(/,/g, ""),
                      10
                    ),
                    ck2: parseFloat(this.selected[i].nhanl2),
                    ghichu: this.selected[i].ghichu,
                    vanphong: 0,
                    sttchon: this.selected[i].sttchon,
                    makhoi: "",
                  };
                } else {
                  this.chitra = {
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
                    chuyenkhoan: 0,
                    tienmat: parseFloat(this.selected[i].tienmat),
                    ck1: 0,
                    ck2: 0,
                    ghichu: this.selected[i].ghichu,
                    vanphong: 0,
                    sttchon: this.selected[i].sttchon,
                    makhoi: "",
                  };
                }

                const res = await this.$axios.post(
                  `/api/ketoan/addchitraluongthang`,
                  this.chitra
                );
                // console.log(res);
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
          }
        } catch (error) {
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener("mouseenter", Swal.stopTimer);
              toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
          });
          Toast.fire({
            icon: "error",
            title: `Có lỗi xảy ra`,
          });
        }
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
  position: sticky;
  left: 0;
  background-color: whitesmoke;
}

.table-height {
  height: 200px;
  display: block;
  overflow: scroll;
  width: 100%;
  position: sticky;
  top: 0;
}

@media (max-width: 1200px) {
  .table_wrapper {
    display: block;
    overflow-x: auto;
    white-space: nowrap;
    position: sticky;
    left: 0;
    background-color: whitesmoke;
  }

  .input.is-small {
    width: 100%;
    min-width: 150px;
  }

  .modal-card {
    width: 1320px;
    height: 800px;
  }
}
</style>
