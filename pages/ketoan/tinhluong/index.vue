<template>
  <div class="columns is-mobile">
    <div class="column is-10 is-offset-1">
      <br />
      <div class="box">
        <div class="columns">
          <div class="column">
            <div class="control">
              <span class="icon is-small is-left">
                <i class="	fas fa-calculator"></i>
              </span>
              Lập danh sách lương
            </div>
          </div>
        </div>
        <!-- Mức đóng, thời gian công lương -->
        <div class="columns" style="border: 1px solid green;">
          <div class="column">
            <span style="color: #f14668" class="icon is-small is-left">
              <i class="fas fa-feather-alt"></i>
            </span>
            <span style="font-weight:bold;">Thời gian lập</span>
            <table style="margin-top: 8px;"
              class="table table is-bordered table is-narrow table is-hoverable table is-fullwidth">
              <tr>
                <td style="font-size: small;">Tháng lập bảng lương</td>
                <td style="text-align: right; font-size: small;">
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
              <button @click="onReport" style="text-align:right;" class="button is-small is-success">
                Lập bảng lương
              </button>
            </div>
          </div>
        </div>
        <div class="columns" style="margin-top:1px;">
          <div class="table_wrapper table-height">
            <table class="
              table
              is-bordered is-striped is-narrow is-hoverable is-fullwidth
            ">
              <tr>
                <td rowspan="2" style="text-align: center; font-weight: bold; font-size: small;">
                  Chọn <br />
                  <input type="checkbox" v-model="selectAll" />
                </td>
                <td rowspan="2" style="text-align: center; font-weight: bold; font-size: small;">
                  STT
                </td>
                <td rowspan="2" style="text-align: center; font-weight: bold; font-size: small;">
                  Họ tên
                </td>
                <td rowspan="2" style="text-align: center; font-weight: bold; font-size: small;">
                  Phòng
                </td>
                <td rowspan="2" style="text-align: center; font-weight: bold; font-size: small;">
                  Lương
                </td>
                <td colspan="5" style="text-align: center; font-weight: bold; font-size: small;">
                  Các khoản khấu trừ
                </td>
                <td rowspan="2" style="text-align: center; font-weight: bold; font-size: small;">
                  Trừ tạm ứng
                </td>
                <td rowspan="2" style="text-align: center; font-weight: bold; font-size: small; width: 10%">
                  Thưởng thêm
                </td>
                <td rowspan="2" style="text-align: center; font-weight: bold; font-size: small;">
                  Lương nhận
                </td>
              </tr>
              <tr>
                <td style="text-align: center; font-weight: bold; font-size: small;">BHXH</td>
                <td style="text-align: center; font-weight: bold; font-size: small;">BHYT</td>
                <td style="text-align: center; font-weight: bold; font-size: small;">BHTN</td>
                <td style="text-align: center; font-weight: bold; font-size: small;">KPCĐ</td>
                <td style="text-align: center; font-weight: bold; font-size: small;">Tổng KT</td>
              </tr>
              <tr v-for="(nv, index) in dsnhanvien" :key="index">
                <td style="text-align: center">
                  <input v-model="selected" :value="nv" type="checkbox" />
                </td>
                <td style="text-align: center; font-size: small;">{{ index + 1 }}</td>
                <td style="font-size: small;">{{ nv.tennv }}</td>
                <td style="font-size: small;">
                  {{ nv.tenphong }}
                </td>
                <td style="text-align: center; font-size: small;">
                  {{ nv.mucluong | formatNumber }}
                </td>
                <td style="text-align: center; font-size: small;">
                  {{
                  ((parseFloat(nv.mucluong) *
  parseFloat(get_qtl.tl_dong_bhxh_cn)) /
  100)
  | formatNumber
                  }}
                </td>
                <td style="text-align: center; font-size: small;">
                  {{
                  ((parseFloat(nv.mucluong) *
  parseFloat(get_qtl.tl_dong_bhyt_cn)) /
  100)
  | formatNumber
                  }}
                </td>
                <td style="text-align: center; font-size: small;">
                  {{
                  ((parseFloat(nv.mucluong) *
  parseFloat(get_qtl.tl_dong_bhtn_cn)) /
  100)
  | formatNumber
                  }}
                </td>
                <td style="text-align: center; font-size: small;">
                  {{ get_qtl.tl_dong_cd_cn | formatNumber }}
                </td>
                <td style="text-align: center; font-size: small;">
                  {{
                  ((parseFloat(nv.mucluong) *
  parseFloat(get_qtl.tl_dong_bhxh_cn)) /
  100 +
  (parseFloat(nv.mucluong) *
    parseFloat(get_qtl.tl_dong_bhyt_cn)) /
  100 +
  (parseFloat(nv.mucluong) *
    parseFloat(get_qtl.tl_dong_bhtn_cn)) /
  100 +
  parseFloat(get_qtl.tl_dong_cd_cn))
  | formatNumber
                  }}
                </td>

                <td style="text-align: center; font-size: small;">
                  {{ nv.tong_ung | formatNumber }}
                </td>

                <td>
                  <input v-model="nv.thuong" type="text" class="input is-small" />
                </td>
                <template v-if="nv.tong_ung">
                  <td style="text-align: right; font-size: small;">
                    {{
                    (parseFloat(nv.mucluong) +
  parseFloat(nv.thuong) -
  ((parseFloat(nv.mucluong) *
    parseFloat(get_qtl.tl_dong_bhxh_cn)) /
    100 +
    (parseFloat(nv.mucluong) *
      parseFloat(get_qtl.tl_dong_bhyt_cn)) /
    100 +
    (parseFloat(nv.mucluong) *
      parseFloat(get_qtl.tl_dong_bhtn_cn)) /
    100 +
    parseFloat(get_qtl.tl_dong_cd_cn) +
    parseFloat(nv.tong_ung)))
  | formatNumber
                    }}
                  </td>
                </template>
                <template v-else>
                  <td style="text-align: right; font-size: small;">
                    {{
                    (parseFloat(nv.mucluong) +
  parseFloat(nv.thuong) -
  ((parseFloat(nv.mucluong) *
    parseFloat(get_qtl.tl_dong_bhxh_cn)) /
    100 +
    (parseFloat(nv.mucluong) *
      parseFloat(get_qtl.tl_dong_bhyt_cn)) /
    100 +
    (parseFloat(nv.mucluong) *
      parseFloat(get_qtl.tl_dong_bhtn_cn)) /
    100 +
    parseFloat(get_qtl.tl_dong_cd_cn)))
  | formatNumber
                    }}
                  </td>
                </template>
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
      console.log('id ', id);
      // console.log('name ',name );
      this.thangLapluong = id;
      // console.log(this.nam)
      // console.log(this.tennam)
    },

    onChange_Nam(e) {
      var id = e.target.value;
      // var name = e.target.options[e.target.options.selectedIndex].text;
      // console.log('id ',id );
      // console.log('name ',name );
      this.namLapluong = id;
      // console.log(this.nam)
      // console.log(this.tennam)
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
      this.dsnhanvien = await this.$axios.$get(`/api/ketoan/nhanvienbangluong`);
    },

    onReport() {
      Swal.fire({
        title: `Chắc chắn lập bảng lương tháng ${this.thangLapluong}/${this.namLapluong}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Chắc chắn lập",
      }).then((result) => {
        if (result.isConfirmed) {
          try {
            for (let i = 0; i < this.selected.length; i++) {
              // console.log(this.selected[i].tong_ung);
              if (this.selected[i].tong_ung) {
                this.tongtiennhan =
                  parseFloat(this.selected[i].mucluong) +
                  parseFloat(this.selected[i].thuong) -
                  ((parseFloat(this.selected[i].mucluong) *
                    parseFloat(this.get_qtl.tl_dong_bhxh_cn)) /
                    100 +
                    (parseFloat(this.selected[i].mucluong) *
                      parseFloat(this.get_qtl.tl_dong_bhyt_cn)) /
                    100 +
                    (parseFloat(this.selected[i].mucluong) *
                      parseFloat(this.get_qtl.tl_dong_bhtn_cn)) /
                    100 +
                    parseFloat(this.get_qtl.tl_dong_cd_cn) +
                    parseFloat(this.selected[i].tong_ung));
              } else {
                this.tongtiennhan =
                  parseFloat(this.selected[i].mucluong) +
                  parseFloat(this.selected[i].thuong) -
                  ((parseFloat(this.selected[i].mucluong) *
                    parseFloat(this.get_qtl.tl_dong_bhxh_cn)) /
                    100 +
                    (parseFloat(this.selected[i].mucluong) *
                      parseFloat(this.get_qtl.tl_dong_bhyt_cn)) /
                    100 +
                    (parseFloat(this.selected[i].mucluong) *
                      parseFloat(this.get_qtl.tl_dong_bhtn_cn)) /
                    100 +
                    parseFloat(this.get_qtl.tl_dong_cd_cn));
              }

              let data = {
                hoten: this.selected[i].tennv,
                phongban: this.selected[i].tenphong,
                luong: this.selected[i].mucluong,
                bhxh:
                  (parseFloat(this.selected[i].mucluong) *
                    parseFloat(this.get_qtl.tl_dong_bhxh_cn)) /
                  100,
                bhyt:
                  (parseFloat(this.selected[i].mucluong) *
                    parseFloat(this.get_qtl.tl_dong_bhyt_cn)) /
                  100,
                bhtn:
                  (parseFloat(this.selected[i].mucluong) *
                    parseFloat(this.get_qtl.tl_dong_bhtn_cn)) /
                  100,
                kpcd: parseFloat(this.get_qtl.tl_dong_cd_cn),
                tongkt:
                  (parseFloat(this.selected[i].mucluong) *
                    parseFloat(this.get_qtl.tl_dong_bhxh_cn)) /
                  100 +
                  (parseFloat(this.selected[i].mucluong) *
                    parseFloat(this.get_qtl.tl_dong_bhyt_cn)) /
                  100 +
                  (parseFloat(this.selected[i].mucluong) *
                    parseFloat(this.get_qtl.tl_dong_bhtn_cn)) /
                  100 +
                  parseFloat(this.get_qtl.tl_dong_cd_cn),
                trutamung: this.selected[i].tong_ung,
                thuong: this.selected[i].thuong,
                tongnhan: this.tongtiennhan,
                thang: this.thangLapluong,
                nam: this.namLapluong,
                createdAt: this.createdAt,
                createdBy: this.createdBy,
              };
              this.$axios.$post("/api/ketoan/thembangluongthang", data);

              // save log
              this.hisform.tenthaotac = `Lập bảng lương tháng ${this.thangLapluong}/${this.namLapluong}`;
              this.hisform.ghichu = `Lập bảng chi trả lương`;
              this.$axios.$post(`/api/logsystem/record-action`, this.hisform);
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
              title: "Lập bảng lương thành công",
            });
            this.isActive = false;
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
}

.table_wrapper {
  position: sticky;
  left: 0;
  background-color: whitesmoke;
}

.table-height {
  height: 750px;
  display: block;
  overflow: scroll;
  width: 100%;
  position: sticky;
  top: 0;
}

th {
  text-align: left;
  background: #feecf0;
  position: sticky;
  top: 0px;
}

.modal-content,
.modal-card {
  width: 720px;
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
