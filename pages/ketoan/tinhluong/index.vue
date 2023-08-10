<template>
  <div class="column" style="margin-left: 10px; margin-right: 10px">
    <br />
    <div class="box">
      <div class="columns">
        <div class="column">
          <div class="control">
            <span class="icon is-small is-left">
              <i class="fas fa-calculator"></i>
            </span>
            Lập danh sách lương
          </div>
        </div>
      </div>
      <!-- Mức đóng, thời gian công lương -->
      <div class="columns">
        <div class="column">
          <span style="color: #f14668" class="icon is-small is-left">
            <i class="fas fa-feather-alt"></i>
          </span>
          <span style="font-weight: bold">Thời gian lập</span>
          <table
            style="margin-top: 8px"
            class="table table is-bordered table is-narrow table is-hoverable table is-fullwidth"
          >
            <tr>
              <td style="font-size: small">Tháng lập bảng lương</td>
              <td style="text-align: right; font-size: small">
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
              </td>
              <td>
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
              </td>
            </tr>
          </table>
        </div>
        <div class="column">
          <div style="text-align: right">
            <button
              @click="onReport"
              style="text-align: right"
              class="button is-small is-success"
            >
              Lập bảng lương
            </button>
          </div>
        </div>
      </div>

      <div>
        <div class="table_wrapper">
          <table
            class="table is-responsive is-bordered is-striped is-narrow is-hoverable is-fullwidth"
          >
            <tr style="">
              <td
                rowspan="2"
                style="text-align: center; font-weight: bold; font-size: small"
              >
                Chọn <br />
                <input type="checkbox" v-model="selectAll" />
              </td>
              <td
                rowspan="2"
                style="text-align: center; font-weight: bold; font-size: small"
              >
                STT
              </td>
              <td
                rowspan="2"
                style="text-align: center; font-weight: bold; font-size: small"
              >
                Họ tên
              </td>
              <td
                rowspan="2"
                style="text-align: center; font-weight: bold; font-size: small"
              >
                Phòng
              </td>
              <td
                rowspan="2"
                style="text-align: center; font-weight: bold; font-size: small"
              >
                Lương trách <br />
                nhiệm
              </td>
              <td
                rowspan="2"
                style="text-align: center; font-weight: bold; font-size: small"
              >
                Ngày công
              </td>
              <td
                rowspan="2"
                style="text-align: center; font-weight: bold; font-size: small"
              >
                Lương ngày <br />
                công
              </td>
              <td
                colspan="2"
                style="text-align: center; font-weight: bold; font-size: small"
              >
                Thưởng doanh thu
              </td>
              <td
                rowspan="2"
                style="text-align: center; font-weight: bold; font-size: small"
              >
                &nbsp; &nbsp; Phạt &nbsp; &nbsp;
              </td>
              <td
                rowspan="2"
                style="text-align: center; font-weight: bold; font-size: small"
              >
                Lương ngoài giờ
                <br />
                / Chủ nhật
              </td>
              <td
                rowspan="2"
                style="text-align: center; font-weight: bold; font-size: small"
              >
                &nbsp; &nbsp; Hỗ trợ &nbsp; &nbsp;
              </td>
              <td
                rowspan="2"
                style="text-align: center; font-weight: bold; font-size: small"
              >
                Tổng lương
              </td>
              <td
                rowspan="2"
                style="text-align: center; font-weight: bold; font-size: small"
              >
                Lương CB
              </td>
              <td
                colspan="3"
                style="text-align: center; font-weight: bold; font-size: small"
              >
                Các khoản khấu trừ
              </td>
              <!-- <td
                rowspan="2"
                style="text-align: center; font-weight: bold; font-size: small"
              >
                Trừ tạm ứng
              </td> -->
              <td
                rowspan="2"
                style="text-align: center; font-weight: bold; font-size: small"
              >
                Lương nhận
              </td>
            </tr>
            <tr style="">
              <td
                style="text-align: center; font-weight: bold; font-size: small"
              >
                &nbsp; &nbsp; Điều chỉnh &nbsp; &nbsp;
              </td>
              <td
                style="text-align: center; font-weight: bold; font-size: small"
              >
                &nbsp; &nbsp; Thưởng &nbsp; &nbsp;
              </td>

              <td
                style="text-align: center; font-weight: bold; font-size: small"
              >
                BHXH
              </td>
              <td
                style="text-align: center; font-weight: bold; font-size: small"
              >
                Công đoàn
              </td>
              <td
                style="text-align: center; font-weight: bold; font-size: small"
              >
                Tổng KT
              </td>
            </tr>
            <tr v-for="(nv, index) in dsnhanvien" :key="index">
              <td style="text-align: center">
                <input v-model="selected" :value="nv" type="checkbox" />
              </td>
              <td style="text-align: center; font-size: small">
                {{ index + 1 }}
              </td>
              <td style="font-size: small">{{ nv.tennv }}</td>
              <td style="font-size: small">
                {{ nv.tenphong }}
              </td>
              <td style="text-align: center; font-size: small">
                {{ nv.luongtrachnhiem | formatNumber }}
              </td>
              <td style="text-align: center; font-size: small">
                {{ nv.sum_ngay_lam }}
              </td>
              <td style="text-align: center; font-size: small">
                {{
                  (parseFloat(nv.luongngay) * parseInt(nv.sum_ngay_lam))
                    | formatNumber
                }}
              </td>
              <td style="text-align: center; font-size: small">
                <input
                  v-model="nv.dt_dieuchinh"
                  type="number"
                  class="input is-small"
                />
              </td>
              <td style="text-align: center; font-size: small">
                <input
                  v-model="nv.dt_thuong"
                  type="number"
                  class="input is-small"
                />
              </td>
              <td style="text-align: center; font-size: small">
                <input
                  v-model="nv.dt_phat"
                  type="number"
                  class="input is-small"
                />
              </td>
              <td
                @click="detailChamngoaigio(nv)"
                style="text-align: center; font-size: small"
              >
                {{ nv.thanhtienngoaigio | formatNumber }}
              </td>
              <td>
                <input
                  v-model="nv.thuong"
                  type="number"
                  class="input is-small"
                />
              </td>
              <td
                style="
                  text-align: center;
                  font-size: small;
                  font-weight: bold;
                  color: #f14668;
                "
              >
                {{
                  (parseFloat(nv.luongtrachnhiem) +
                    (parseFloat(nv.luongngay) * parseInt(nv.sum_ngay_lam) +
                      parseFloat(nv.dt_dieuchinh) +
                      parseFloat(nv.dt_thuong) +
                      parseFloat(nv.thuong) +
                      parseFloat(nv.thanhtienngoaigio) -
                      parseFloat(nv.dt_phat)))
                    | formatNumber
                }}
              </td>
              <td style="text-align: center; font-size: small">
                {{ nv.mucluong | formatNumber }}
              </td>
              <td style="text-align: center; font-size: small">
                {{ nv.bhxh | formatNumber }}
              </td>

              <td style="text-align: center; font-size: small">
                <input
                  type="text"
                  class="input is-small"
                  v-model="nv.congdoan"
                />
              </td>
              <td style="text-align: center; font-size: small">
                {{
                  (parseFloat(nv.bhxh) + parseFloat(nv.congdoan)) | formatNumber
                }}
              </td>
              <template>
                <td
                  style="
                    text-align: right;
                    font-size: small;
                    font-weight: bold;
                    color: #f14668;
                  "
                >
                  {{
                    (parseFloat(nv.luongtrachnhiem) +
                      (parseFloat(nv.luongngay) * parseInt(nv.sum_ngay_lam) +
                        parseFloat(nv.dt_dieuchinh) +
                        parseFloat(nv.dt_thuong) +
                        parseFloat(nv.thuong) +
                        parseFloat(nv.thanhtienngoaigio) -
                        parseFloat(nv.dt_phat)) -
                      (parseFloat(nv.bhxh) + parseFloat(nv.congdoan)))
                      | formatNumber
                  }}
                </td>
              </template>
            </tr>
            <tr>
              <td colspan="4"></td>
              <td
                style="
                  color: red;
                  font-size: small;
                  font-weight: bold;
                  text-align: center;
                "
              >
                {{ subRow_luongtrachnhiem | formatNumber }}
              </td>
              <td
                style="
                  color: red;
                  font-size: small;
                  font-weight: bold;
                  text-align: center;
                "
              >
                {{ subRow_ngaylam | formatNumber }}
              </td>
              <td
                style="
                  color: red;
                  font-size: small;
                  font-weight: bold;
                  text-align: center;
                "
              >
                {{ subRow_luongcongngay | formatNumber }}
              </td>
              <td
                style="
                  color: red;
                  font-size: small;
                  font-weight: bold;
                  text-align: center;
                "
              >
                {{ subRow_dt_dieuchinh | formatNumber }}
              </td>
              <td
                style="
                  color: red;
                  font-size: small;
                  font-weight: bold;
                  text-align: center;
                "
              >
                {{ subRow_dt_thuong | formatNumber }}
              </td>
              <td
                style="
                  color: red;
                  font-size: small;
                  font-weight: bold;
                  text-align: center;
                "
              >
                {{ subRow_phat | formatNumber }}
              </td>
              <td></td>
              <td
                style="
                  color: red;
                  font-size: small;
                  font-weight: bold;
                  text-align: center;
                "
              >
                {{ subRow_thuong | formatNumber }}
              </td>
              <td
                style="
                  color: red;
                  font-size: small;
                  font-weight: bold;
                  text-align: center;
                "
              >
                {{ subRow_tongluong | formatNumber }}
              </td>
              <td
                style="
                  color: red;
                  font-size: small;
                  font-weight: bold;
                  text-align: center;
                "
              >
                {{ subRow_mucluong | formatNumber }}
              </td>
              <td
                style="
                  color: red;
                  font-size: small;
                  font-weight: bold;
                  text-align: center;
                "
              >
                {{ subRow_bhxh | formatNumber }}
              </td>
              <td
                style="
                  color: red;
                  font-size: small;
                  font-weight: bold;
                  text-align: center;
                "
              >
                {{ subRow_congdoan | formatNumber }}
              </td>
              <td
                style="
                  color: red;
                  font-size: small;
                  font-weight: bold;
                  text-align: center;
                "
              >
                {{ subRow_tongtru | formatNumber }}
              </td>
              <td
                style="
                  color: red;
                  font-size: small;
                  font-weight: bold;
                  text-align: center;
                "
              >
                {{ subRow_luongnhan | formatNumber }}
              </td>
            </tr>
          </table>
        </div>
      </div>

      <!-- Modal 3 - detail -->
      <div class="">
        <!-- Toggle class  -->
        <div :class="{ 'is-active': isActive }" class="modal">
          <div class="modal-background"></div>
          <div class="modal-content modal-card-1">
            <header
              style="
                background-color: #3e8ed0;
                border-top-left-radius: 8px;
                border-top-right-radius: 8px;
              "
            >
              <div class="columns">
                <div class="column is-9">
                  <p
                    style="
                      font-size: small;
                      font-weight: bold;
                      color: white;
                      padding: 15px;
                    "
                  >
                    <span class="icon is-small is-left">
                      <i style="color: #ffd863ff" class="fas fa-tags"></i>
                    </span>
                    Thông tin chấm công ngoài giờ
                  </p>
                </div>
                <div class="column" style="text-align: right">
                  <a @click="isActive = false">
                    <span
                      style="color: red; padding: 20px"
                      class="icon is-small"
                    >
                      <i class="fas fa-power-off"></i>
                    </span>
                  </a>
                </div>
              </div>
            </header>
            <section class="modal-card-body">
              <table
                class="table is-responsive is-bordered is-narrow is-fullwidth"
              >
                <tr style="background-color: #fffaeb">
                  <td
                    style="
                      font-size: small;
                      font-weight: bold;
                      text-align: center;
                      width: 3%;
                    "
                  >
                    STT
                  </td>
                  <td
                    style="
                      font-size: small;
                      font-weight: bold;
                      text-align: center;
                      width: 15%;
                    "
                  >
                    Tên nhân viên
                  </td>
                  <td
                    style="
                      font-size: small;
                      font-weight: bold;
                      text-align: center;
                      width: 7%;
                    "
                  >
                    Mức tiền
                  </td>
                  <td
                    style="
                      font-size: small;
                      font-weight: bold;
                      text-align: center;
                      width: 7%;
                    "
                  >
                    Số giờ
                  </td>
                  <td
                    style="
                      font-size: small;
                      font-weight: bold;
                      text-align: center;
                      width: 7%;
                    "
                  >
                    Ngày chấm
                  </td>
                </tr>
                <tr v-for="(it, index) in dataDetailChamngoaigio">
                  <td style="font-size: small; text-align: center">
                    {{ index + 1 }}
                  </td>
                  <td style="font-size: small; text-align: center">
                    {{ it.tennv }}
                  </td>
                  <td style="font-size: small; text-align: center">
                    {{ it.muctien | formatNumber }}
                  </td>
                  <td style="font-size: small; text-align: center">
                    {{ it.sogio }}
                  </td>
                  <td style="font-size: small; text-align: center">
                    {{ it.ngaylam | formatDate }}
                  </td>
                </tr>
              </table>
            </section>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import createNumberMask from "text-mask-addons/dist/createNumberMask";
const currencyMask = createNumberMask({
  prefix: "",
  allowDecimal: true,
  includeThousandsSeparator: true,
  allowNegative: false,
});
export default {
  middleware: "auth",
  data() {
    return {
      dataDetailChamngoaigio: [],
      dsnhanvien: [],
      qtl: [],
      get_qtl: {},
      form: {},
      mask: currencyMask,
      hisform: {
        tenthaotac: null,
        createdAt: null,
        createdBy: this.$auth.$state.user.username,
        ghichu: null,
      },
      thuong: null,
      keyThangnam: "",
      isExits: null,
      //   các tiêu chí hệ số lương
      form: {
        luong_ttv: null,
        luong_max_bhxh_bhyt: null,
        luong_max_bhtn: null,
        songay_tinhluong: null,
        sogio_tinhluong: null,
        tl_lamthem_thuong_bn: null,
        tl_lamthem_nghi_bn: null,
        tl_lamthem_le_bn: null,
        tl_lamthem_thuong_bd: null,
        tl_lamthem_nghi_bd: null,
        tl_lamthem_le_bd: null,
        tl_dong_bhxh_ct: null,
        tl_dong_bhyt_ct: null,
        tl_dong_bhtn_ct: null,
        tl_dong_cd_ct: null,
        tl_dong_bhxh_cn: null,
        tl_dong_bhyt_cn: null,
        tl_dong_bhtn_cn: null,
        tl_dong_cd_cn: null,
        thue_tncn_gtcn: null,
        thue_tncn_gtnt: null,
      },
      tongtiennhan: null,
      selected: [],
      //   các số liệu tính lương
      getDayinmon: null,
      thangLapluong: null,
      namLapluong: null,
      createdAt: null,
      createdBy: this.$auth.$state.user.username,
      // Modals
      isActive: false,
    };
  },

  computed: {
    selectAll: {
      get: function () {
        return this.dsnhanvien
          ? this.selected.length == this.dsnhanvien.length
          : false;
      },
      set: function (value) {
        var selected = [];

        if (value) {
          this.dsnhanvien.forEach(function (nv) {
            selected.push(nv);
          });
        }

        this.selected = selected;
      },
    },

    // sum lương trách nhiệm
    subRow_luongtrachnhiem() {
      return this.dsnhanvien.reduce(
        (total, item) => total + parseFloat(item.luongtrachnhiem),
        0
      );
    },
    // sum lương trách nhiệm
    subRow_ngaylam() {
      return this.dsnhanvien.reduce(
        (total, item) => total + parseFloat(item.sum_ngay_lam),
        0
      );
    },
    // sum ngày công
    subRow_luongcongngay() {
      return this.dsnhanvien.reduce(
        (total, item) =>
          total + parseFloat(item.luongngay) * parseInt(item.sum_ngay_lam),
        0
      );
    },
    // sum doanh thu điều chỉnh
    subRow_dt_dieuchinh() {
      return this.dsnhanvien.reduce(
        (total, item) => total + parseFloat(item.dt_dieuchinh),
        0
      );
    },
    // sum doanh thu thưởng
    subRow_dt_thuong() {
      return this.dsnhanvien.reduce(
        (total, item) => total + parseFloat(item.dt_thuong),
        0
      );
    },
    // sum phat
    subRow_phat() {
      return this.dsnhanvien.reduce(
        (total, item) => total + parseFloat(item.dt_phat),
        0
      );
    },
    // sum thưởng
    subRow_thuong() {
      return this.dsnhanvien.reduce(
        (total, item) => total + parseFloat(item.thuong),
        0
      );
    },
    // sum tong luong nhan
    subRow_tongluong() {
      return this.dsnhanvien.reduce(
        (total, item) =>
          total +
          (parseFloat(item.luongtrachnhiem) +
            parseFloat(item.luongngay) * parseInt(item.sum_ngay_lam) +
            parseFloat(item.dt_dieuchinh) +
            parseFloat(item.dt_thuong) +
            parseFloat(item.thuong) +
            parseFloat(item.thanhtienngoaigio) -
            parseFloat(item.dt_phat)),
        0
      );
    },
    // sum luong cb
    subRow_mucluong() {
      return this.dsnhanvien.reduce(
        (total, item) => total + parseFloat(item.mucluong),
        0
      );
    },
    // sum bhxh
    subRow_bhxh() {
      return this.dsnhanvien.reduce(
        (total, item) => total + parseFloat(item.bhxh),
        0
      );
    },
    // sum cong doan
    subRow_congdoan() {
      return this.dsnhanvien.reduce(
        (total, item) => total + parseFloat(item.congdoan),
        0
      );
    },
    // sum tong tru
    subRow_tongtru() {
      return this.dsnhanvien.reduce(
        (total, item) =>
          total + (parseFloat(item.bhxh) + parseFloat(item.congdoan)),
        0
      );
    },
    // sum luong nhan
    subRow_luongnhan() {
      return this.dsnhanvien.reduce(
        (total, item) =>
          total +
          (parseFloat(item.luongtrachnhiem) +
            (parseFloat(item.luongngay) * parseInt(item.sum_ngay_lam) +
              parseFloat(item.dt_dieuchinh) +
              parseFloat(item.dt_thuong) +
              parseFloat(item.thuong) +
              parseFloat(item.thanhtienngoaigio) -
              parseFloat(item.dt_phat)) -
            (parseFloat(item.bhxh) + parseFloat(item.congdoan))),
        0
      );
    },
  },

  mounted() {
    this.getDsnv();
    this.currentDateTime();
    this.getDay();
    this.getQTL();
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
      this.hisform.createdAt = date + " " + time;
    },

    onChange_Thang(e) {
      var id = e.target.value;
      var name = e.target.options[e.target.options.selectedIndex].text;
      // console.log('id ', id);
      // console.log('name ',name );
      this.thangLapluong = id;
      // console.log(this.nam)
      // console.log(this.tennam)
    },

    async onChange_Nam(e) {
      var id = e.target.value;
      // var name = e.target.options[e.target.options.selectedIndex].text;
      // console.log('id ',id );
      // console.log('name ',name );
      this.namLapluong = id;
      // console.log(this.nam)
      // console.log(this.tennam)
      // console.log(this.thangLapluong);
      // this.dsnhanvien = await this.$axios.$get(`/api/ketoan/loadluongchamcong`);

      this.dsnhanvien = await this.$axios.$get(
        `/api/ketoan/loadluongchamcong?month=${this.thangLapluong}&year=${this.namLapluong}`
      );
      // console.log(this.dsnhanvien);
    },

    // Lấy tháng ngày và đếm số ngày trong tháng hiện tại
    get_day_of_month(year, month) {
      return new Date(year, month, 0).getDate();
    },
    getDay() {
      this.getDayinmon = this.get_day_of_month(
        this.namLapluong,
        this.thangLapluong
      );
    },

    async detailChamngoaigio(item) {
      this.isActive = true;
      this.dataDetailChamngoaigio = await this.$axios.$get(
        `/api/ketoan/detailchamngoaigio?manv=${item.manv}&nam=${this.namLapluong}&thang=${this.thangLapluong}`
      );
    },

    // lấy số liệu quy tắc lương
    async getQTL() {
      this.qtl = await this.$axios.$get(`/api/ketoan/quytactinhluong`);
      this.get_qtl = this.qtl[0];
      this.form.luong_ttv = this.qtl[0].luong_ttv;
      this.form.luong_max_bhxh_bhyt = this.qtl[0].luong_max_bhxh_bhyt;
      this.form.luong_max_bhtn = this.qtl[0].luong_max_bhtn;
      this.form.songay_tinhluong = this.qtl[0].songay_tinhluong;
      this.form.sogio_tinhluong = this.qtl[0].sogio_tinhluong;
      this.form.tl_lamthem_thuong_bn = this.qtl[0].tl_lamthem_thuong_bn;
      this.form.tl_lamthem_nghi_bn = this.qtl[0].tl_lamthem_nghi_bn;
      this.form.tl_lamthem_le_bn = this.qtl[0].tl_lamthem_le_bn;
      this.form.tl_lamthem_thuong_bd = this.qtl[0].tl_lamthem_thuong_bd;
      this.form.tl_lamthem_nghi_bd = this.qtl[0].tl_lamthem_nghi_bd;
      this.form.tl_lamthem_le_bd = this.qtl[0].tl_lamthem_le_bd;
      this.form.tl_dong_bhxh_ct = this.qtl[0].tl_dong_bhxh_ct;
      this.form.tl_dong_bhyt_ct = this.qtl[0].tl_dong_bhyt_ct;
      this.form.tl_dong_bhtn_ct = this.qtl[0].tl_dong_bhtn_ct;
      this.form.tl_dong_cd_ct = this.qtl[0].tl_dong_cd_ct;
      this.form.tl_dong_bhxh_cn = this.qtl[0].tl_dong_bhxh_cn;
      this.form.tl_dong_bhyt_cn = this.qtl[0].tl_dong_bhyt_cn;
      this.form.tl_dong_bhtn_cn = this.qtl[0].tl_dong_bhtn_cn;
      this.form.tl_dong_cd_cn = this.qtl[0].tl_dong_cd_cn;
      this.form.thue_tncn_gtcn = this.qtl[0].thue_tncn_gtcn;
      this.form.thue_tncn_gtnt = this.qtl[0].thue_tncn_gtnt;
    },

    async getDsnv() {
      // this.dsnhanvien = await this.$axios.$get(`/api/ketoan/nhanvienbangluong`);
    },

    // onReport() {
    //   Swal.fire({
    //     title: `Chắc chắn lập bảng lương tháng ${this.thangLapluong}/${this.namLapluong}?`,
    //     icon: "warning",
    //     showCancelButton: true,
    //     confirmButtonColor: "#3085d6",
    //     cancelButtonColor: "#d33",
    //     confirmButtonText: "Chắc chắn lập",
    //   }).then((result) => {
    //     if (result.isConfirmed) {
    //       try {
    //         for (let i = 0; i < this.selected.length; i++) {
    //           // console.log(this.selected[i].tong_ung);
    //           if (this.selected[i].tong_ung) {
    //             this.tongtiennhan =
    //               parseFloat(this.selected[i].mucluong) +
    //               parseFloat(this.selected[i].thuong) -
    //               ((parseFloat(this.selected[i].mucluong) *
    //                 parseFloat(this.get_qtl.tl_dong_bhxh_cn)) /
    //                 100 +
    //                 (parseFloat(this.selected[i].mucluong) *
    //                   parseFloat(this.get_qtl.tl_dong_bhyt_cn)) /
    //                   100 +
    //                 (parseFloat(this.selected[i].mucluong) *
    //                   parseFloat(this.get_qtl.tl_dong_bhtn_cn)) /
    //                   100 +
    //                 parseFloat(this.get_qtl.tl_dong_cd_cn) +
    //                 parseFloat(this.selected[i].tong_ung));
    //           } else {
    //             this.tongtiennhan =
    //               parseFloat(this.selected[i].mucluong) +
    //               parseFloat(this.selected[i].thuong) -
    //               ((parseFloat(this.selected[i].mucluong) *
    //                 parseFloat(this.get_qtl.tl_dong_bhxh_cn)) /
    //                 100 +
    //                 (parseFloat(this.selected[i].mucluong) *
    //                   parseFloat(this.get_qtl.tl_dong_bhyt_cn)) /
    //                   100 +
    //                 (parseFloat(this.selected[i].mucluong) *
    //                   parseFloat(this.get_qtl.tl_dong_bhtn_cn)) /
    //                   100 +
    //                 parseFloat(this.get_qtl.tl_dong_cd_cn));
    //           }

    //           let data = {
    //             hoten: this.selected[i].tennv,
    //             phongban: this.selected[i].tenphong,
    //             luong: this.selected[i].mucluong,
    //             bhxh:
    //               (parseFloat(this.selected[i].mucluong) *
    //                 parseFloat(this.get_qtl.tl_dong_bhxh_cn)) /
    //               100,
    //             bhyt:
    //               (parseFloat(this.selected[i].mucluong) *
    //                 parseFloat(this.get_qtl.tl_dong_bhyt_cn)) /
    //               100,
    //             bhtn:
    //               (parseFloat(this.selected[i].mucluong) *
    //                 parseFloat(this.get_qtl.tl_dong_bhtn_cn)) /
    //               100,
    //             kpcd: parseFloat(this.get_qtl.tl_dong_cd_cn),
    //             tongkt:
    //               (parseFloat(this.selected[i].mucluong) *
    //                 parseFloat(this.get_qtl.tl_dong_bhxh_cn)) /
    //                 100 +
    //               (parseFloat(this.selected[i].mucluong) *
    //                 parseFloat(this.get_qtl.tl_dong_bhyt_cn)) /
    //                 100 +
    //               (parseFloat(this.selected[i].mucluong) *
    //                 parseFloat(this.get_qtl.tl_dong_bhtn_cn)) /
    //                 100 +
    //               parseFloat(this.get_qtl.tl_dong_cd_cn),
    //             trutamung: this.selected[i].tong_ung,
    //             thuong: this.selected[i].thuong,
    //             tongnhan: this.tongtiennhan,
    //             thang: this.thangLapluong,
    //             nam: this.namLapluong,
    //             createdAt: this.createdAt,
    //             createdBy: this.createdBy,
    //           };
    //           this.$axios.$post("/api/ketoan/thembangluongthang", data);

    //           // save log
    //           this.hisform.tenthaotac = `Lập bảng lương tháng ${this.thangLapluong}/${this.namLapluong}`;
    //           this.hisform.ghichu = `Lập bảng chi trả lương`;
    //           this.$axios.$post(`/api/logsystem/record-action`, this.hisform);
    //         }

    //         const Toast = Swal.mixin({
    //           toast: true,
    //           position: "top-end",
    //           showConfirmButton: false,
    //           timer: 3000,
    //           timerProgressBar: true,
    //           didOpen: (toast) => {
    //             toast.addEventListener("mouseenter", Swal.stopTimer);
    //             toast.addEventListener("mouseleave", Swal.resumeTimer);
    //           },
    //         });
    //         Toast.fire({
    //           icon: "success",
    //           title: "Lập bảng lương thành công",
    //         });
    //       } catch (error) {
    //         console.log(error);
    //         const Toast = Swal.mixin({
    //           toast: true,
    //           position: "top-end",
    //           showConfirmButton: false,
    //           timer: 3000,
    //           timerProgressBar: true,
    //           didOpen: (toast) => {
    //             toast.addEventListener("mouseenter", Swal.stopTimer);
    //             toast.addEventListener("mouseleave", Swal.resumeTimer);
    //           },
    //         });
    //         Toast.fire({
    //           icon: "error",
    //           title: "Có lỗi xảy ra !!!",
    //         });
    //       }
    //     }
    //   });
    // },

    async onReport() {
      const result = await Swal.fire({
        title: `Bạn chắc chắn tạo lương tại kỳ: ${this.thangLapluong}/${this.namLapluong}`,
        showDenyButton: true,
        confirmButtonText: "Chắc chắn",
        denyButtonText: `Hủy`,
      });
      if (result.isConfirmed) {
        try {
          if (this.selected.length <= 0) {
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
              title:
                "Chưa lấy số liệu lương hoặc chưa tích chọn người cần vào lương !!!",
            });
          } else {
            const arrkeythangnam = [];
            const listkeythangnam = await this.$axios.$get(
              `/api/ketoan/getkeythangnam`
            );
            // console.log(listkeythangnam);
            for (let i = 0; i < listkeythangnam.length; i++) {
              let ktn = listkeythangnam[i].key_thangnam.trim();
              arrkeythangnam.push(ktn);
            }
            // console.log(arrkeythangnam);
            this.keyThangnam =
              this.thangLapluong.trim() +
              this.namLapluong.trim() +
              "-" +
              "VanPhong";

            // console.log(this.keyThangnam);
            this.isExits = arrkeythangnam.includes(this.keyThangnam.trim());
            // console.log(this.isExits);
            if (this.isExits == false) {
              console.log(this.selected);
              for (let i = 0; i < this.selected.length; i++) {
                // console.log(this.selected[i]);
                let data = {
                  mapb: this.selected[0].mapb,
                  tenpb: this.selected[0].tenphong,
                  mato: "",
                  manv: this.selected[i].macn,
                  hotennv: this.selected[i].tencongnhan,
                  chucvu: this.selected[i].chucvu,
                  luongcb: this.selected[i].luongcb,
                  luongmem: this.selected[i].luongmem,
                  luongqlsp: this.selected[i].luongqlsp,
                  luongcd: this.selected[i].luongcd,
                  luongps: this.selected[i].luongcn,
                  tongluong:
                    parseFloat(this.selected[i].luongqlsp) +
                    this.selected[i].luongcd +
                    this.selected[i].luongcn +
                    parseFloat(this.selected[i].ngayhotro) *
                      parseFloat(this.selected[i].luongmem),
                  antrua: this.selected[i].thanhtien,
                  songaycong: this.selected[i].songaylam,
                  ngayhotro: parseFloat(this.selected[i].ngayhotro),
                  tienhotro:
                    parseFloat(this.selected[i].ngayhotro) *
                    parseFloat(this.selected[i].luongmem),
                  bhxh: this.selected[i].bhxh,
                  congdoan: this.selected[i].congdoan,
                  tamung: this.selected[i].tienung,
                  tongtru:
                    parseFloat(this.selected[i].congdoan) +
                    this.selected[i].bhxh +
                    parseFloat(this.selected[i].antrua),
                  tongnhan:
                    parseFloat(this.selected[i].luongqlsp) +
                    this.selected[i].luongcd +
                    this.selected[i].luongcn +
                    this.selected[i].thanhtien +
                    parseFloat(this.selected[i].ngayhotro) *
                      parseFloat(this.selected[i].luongmem) -
                    (this.selected[i].bhxh +
                      parseFloat(this.selected[i].congdoan) +
                      parseFloat(this.selected[i].antrua)),
                  tienphat: this.selected[i].antrua,
                  createdAt: this.createdAt,
                  createdBy: this.createdBy,
                  thang: this.thang,
                  nam: this.nam,
                  key_thangnam: this.keyThangnam,
                  status: true,
                  stk: this.selected[i].stk,
                  nhanl1: 0,
                  nhanl2: 0,
                  nhanl3: 0,
                  nhanl4: 0,
                  nhanl5: 0,
                  nhanl6: 0,
                  sttchon: this.selected[i].sttchon,
                };
                // console.log(data);
                const res = this.$axios.$post(
                  "/api/ketoan/themluongthang",
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
                  title: "Tạo số liệu lương thành công",
                });
              }
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
}

.table_wrapper td:first-child {
  position: sticky;
  left: 0;
  background-color: #fff;
}
.table_wrapper td:first-child,
.table_wrapper th:first-child {
  position: sticky;
  left: 0;
  z-index: 1;
  background-color: white;
}
.table_wrapper td:nth-child(2),
.table_wrapper th:nth-child(2) {
  position: sticky;
  left: 43px;
  z-index: 1;
  background-color: white;
}
.table_wrapper td:nth-child(3),
.table_wrapper th:nth-child(3) {
  position: sticky;
  left: 43px;
  z-index: 1;
  background-color: whitesmoke;
}
</style>
