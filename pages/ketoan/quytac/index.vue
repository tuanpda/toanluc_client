<template>
  <div class="columns is-mobile">
    <div class="column is-10 is-offset-1">
      <br />
      <div class="box">
        <div class="columns">
          <div class="column is-10">
            <span style="color: #ffd257" class="icon is-small is-left">
              <i class="fas fa-calculator"></i>
            </span>
            <span style="font-weight:bold;">Quy tắc tính lương</span>
          </div>
          <div class="column">
            <button
              @click.prevent="onUpdate"
              class="button is-small is-fullwidth is-success"
            >
              <span class="icon is-small">
                <i class="fab fa-buysellads"></i>
              </span>
              <span>Cập nhật</span>
            </button>
          </div>
        </div>
        <!-- Mức đóng, thời gian công lương -->
        <div class="columns" style="border: 1px solid green;">
          <div class="column">
            <span style="color: #f14668" class="icon is-small is-left">
              <i class="fas fa-feather-alt"></i>
            </span>
            <span style="font-weight:bold;">Mức lương - mức đóng</span>
            <table
              style="margin-top: 8px;"
              class="table table is-bordered table is-narrow table is-hoverable table is-fullwidth"
            >
              <tr>
                <td>Lương tối thiểu vùng</td>
                <td>
                  <input
                    class="input is-small"
                    type="text"
                    v-model="form.luong_ttv"
                    v-mask="mask"
                  />
                </td>
              </tr>
              <tr>
                <td>Mức lương tối đa đóng BHXH, BHYT</td>
                <td>
                  <input
                    class="input is-small"
                    type="text"
                    v-model="form.luong_max_bhxh_bhyt"
                    v-mask="mask"
                  />
                </td>
              </tr>
              <tr>
                <td>Mức lương tối đa đóng BHTN</td>
                <td>
                  <input
                    class="input is-small"
                    type="text"
                    v-model="form.luong_max_bhtn"
                    v-mask="mask"
                  />
                </td>
              </tr>
            </table>
          </div>
          <div class="column">
            <span style="color: #f14668" class="icon is-small is-left">
              <i class="fas fa-calendar-alt"></i>
            </span>
            <span style="font-weight:bold;">Thời gian tính lương - công</span>
            <table
              style="margin-top:8px;"
              class="table table is-bordered table is-narrow table is-hoverable table is-fullwidth"
            >
              <tr>
                <td>Số ngày tính công trong tháng</td>
                <td>
                  <input
                    v-model="form.songay_tinhluong"
                    v-mask="mask"
                    class="input is-small"
                    type="text"
                  />
                </td>
              </tr>
              <tr>
                <td>Số giờ tính công trong ngày</td>
                <td>
                  <input
                    v-model="form.sogio_tinhluong"
                    v-mask="mask"
                    class="input is-small"
                    type="text"
                  />
                </td>
              </tr>
            </table>
          </div>
        </div>
        <!-- Làm thêm giờ -->
        <hr class="navbar-divider" />
        <div class="columns" style="border: 1px solid green;">
          <div class="column">
            <span style="color: #f14668" class="icon is-small is-left">
              <i class="	far fa-sun"></i>
            </span>
            <span style="font-weight:bold;"
              >Tỷ lệ hưởng lương làm thêm: Ban ngày</span
            >
            <table
              style="margin-top:8px;"
              class="table table is-bordered table is-narrow table is-hoverable table is-fullwidth"
            >
              <tr>
                <td>Làm thêm ngày thường (%)</td>
                <td>
                  <input
                    v-model="form.tl_lamthem_thuong_bn"
                    v-mask="mask"
                    class="input is-small"
                    type="text"
                  />
                </td>
              </tr>
              <tr>
                <td>Thứ bảy, Chủ nhật (%)</td>
                <td>
                  <input
                    v-model="form.tl_lamthem_nghi_bn"
                    v-mask="mask"
                    class="input is-small"
                    type="text"
                  />
                </td>
              </tr>
              <tr>
                <td>Nghỉ lễ, tết (%)</td>
                <td>
                  <input
                    v-model="form.tl_lamthem_le_bn"
                    v-mask="mask"
                    class="input is-small"
                    type="text"
                  />
                </td>
              </tr>
            </table>
          </div>
          <div class="column">
            <span style="color: #f14668" class="icon is-small is-left">
              <i class="fas fa-cloud-sun"></i>
            </span>
            <span style="font-weight:bold;">Ban đêm</span>
            <table
              style="margin-top:8px;"
              class="table table is-bordered table is-narrow table is-hoverable table is-fullwidth"
            >
              <tr>
                <td>Làm thêm ngày thường (%)</td>
                <td>
                  <input
                    v-model="form.tl_lamthem_thuong_bd"
                    v-mask="mask"
                    class="input is-small"
                    type="text"
                  />
                </td>
              </tr>
              <tr>
                <td>Thứ bảy, Chủ nhật (%)</td>
                <td>
                  <input
                    v-model="form.tl_lamthem_nghi_bd"
                    v-mask="mask"
                    class="input is-small"
                    type="text"
                  />
                </td>
              </tr>
              <tr>
                <td>Nghỉ lễ, tết (%)</td>
                <td>
                  <input
                    v-model="form.tl_lamthem_le_bd"
                    v-mask="mask"
                    class="input is-small"
                    type="text"
                  />
                </td>
              </tr>
            </table>
          </div>
        </div>
        <!-- Bảo hiểm xã hội -->
        <hr class="navbar-divider" />
        <div class="columns" style="border: 1px solid green;">
          <div class="column">
            <span style="color: #f14668" class="icon is-small is-left">
              <i class="fas fa-house-user"></i>
            </span>
            <span style="font-weight:bold;"
              >Bảo hiểm xã hội: Tỷ lệ công ty đóng</span
            >
            <table
              style="margin-top: 8px;"
              class="table table is-bordered table is-narrow table is-hoverable table is-fullwidth"
            >
              <tr>
                <td>Bảo hiểm xã hội (%)</td>
                <td>
                  <input
                    class="input is-small"
                    type="text"
                    v-model="form.tl_dong_bhxh_ct"
                    v-mask="mask"
                  />
                </td>
              </tr>
              <tr>
                <td>Bảo hiểm y tế (%)</td>
                <td>
                  <input
                    v-model="form.tl_dong_bhyt_ct"
                    v-mask="mask"
                    class="input is-small"
                    type="text"
                  />
                </td>
              </tr>
              <tr>
                <td>Bảo hiểm thất nghiệp (%)</td>
                <td>
                  <input
                    v-model="form.tl_dong_bhtn_ct"
                    v-mask="mask"
                    class="input is-small"
                    type="text"
                    placeholder="1"
                  />
                </td>
              </tr>
              <tr>
                <td>Kinh phí công đoàn (%)</td>
                <td>
                  <input
                    v-model="form.tl_dong_cd_ct"
                    v-mask="mask"
                    class="input is-small"
                    type="text"
                  />
                </td>
              </tr>
            </table>
          </div>
          <div class="column">
            <span style="color: #f14668" class="icon is-small is-left">
              <i class="fas fa-user-tie"></i>
            </span>
            <span style="font-weight:bold;">Tỷ lệ nhân viên đóng</span>
            <table
              style="margin-top: 8px;"
              class="table table is-bordered table is-narrow table is-hoverable table is-fullwidth"
            >
              <tr>
                <td>Bảo hiểm xã hội (%)</td>
                <td>
                  <input
                    v-model="form.tl_dong_bhxh_cn"
                    v-mask="mask"
                    class="input is-small"
                    type="text"
                  />
                </td>
              </tr>
              <tr>
                <td>Bảo hiểm y tế (%)</td>
                <td>
                  <input
                    v-model="form.tl_dong_bhyt_cn"
                    v-mask="mask"
                    class="input is-small"
                    type="text"
                  />
                </td>
              </tr>
              <tr>
                <td>Bảo hiểm thất nghiệp (%)</td>
                <td>
                  <input
                    v-model="form.tl_dong_bhtn_cn"
                    v-mask="mask"
                    class="input is-small"
                    type="text"
                  />
                </td>
              </tr>
              <tr>
                <td>Kinh phí công đoàn (%)</td>
                <td>
                  <input
                    v-model="form.tl_dong_cd_cn"
                    v-mask="mask"
                    class="input is-small"
                    type="text"
                  />
                </td>
              </tr>
            </table>
          </div>
        </div>
        <!-- Thuế thu nhập cá nhân -->
        <hr class="navbar-divider" />
        <div class="columns" style="border: 1px solid green;">
          <div class="column">
            <span style="color: #f14668" class="icon is-small is-left">
              <i class="far fa-money-bill-alt"></i>
            </span>
            <span style="font-weight:bold;">Thuế TTCN: Giảm trừ cá nhân</span>
            <table
              style="margin-top: 8px;"
              class="table table is-bordered table is-narrow table is-hoverable table is-fullwidth"
            >
              <tr>
                <td>Giảm trừ bản thân</td>
                <td>
                  <input
                    class="input is-small"
                    type="text"
                    v-model="form.thue_tncn_gtcn"
                    v-mask="mask"
                  />
                </td>
              </tr>
            </table>
          </div>
          <div class="column">
            <span style="color: #f14668" class="icon is-small is-left">
              <i class="fab fa-bitcoin"></i>
            </span>
            <span style="font-weight:bold;">Giảm trừ người thân</span>
            <table
              style="margin-top: 8px;"
              class="table table is-bordered table is-narrow table is-hoverable table is-fullwidth"
            >
              <tr>
                <td>Giảm trừ người thân</td>
                <td>
                  <input
                    class="input is-small"
                    type="text"
                    v-model="form.thue_tncn_gtnt"
                    v-mask="mask"
                  />
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
import createNumberMask from "text-mask-addons/dist/createNumberMask";
const currencyMask = createNumberMask({
  prefix: "",
  allowDecimal: true,
  includeThousandsSeparator: true,
  allowNegative: false,
});
import Swal from "sweetalert2";
export default {
  middleware: "auth",
  data() {
    return {
      qtl: {},
      get_qtl: {},
      mask: currencyMask,
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
    };
  },

  mounted() {
    this.getQTL();
  },

  methods: {
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

    onUpdate() {
      Swal.fire({
        title: "Bạn chắc chắn cập nhật quy tắc tính lương?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Chắc chắn cập nhật",
      }).then((result) => {
        if (result.isConfirmed) {
          try {
            this.$axios.$patch(
              `/api/ketoan/quytactinhluong/${this.qtl[0]._id}`,
              this.form,
              {}
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
              title: "Cập nhật thông tin thành công",
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
  max-width: 200px;
  max-height: 200px;
}
#show {
  font-weight: bold;
}
#tag-fix {
  background-color: #eff5fb;
  padding: 6px;
  padding-left: 10px;
  padding-right: 10px;
  border: 1px solid #ffd257;
  font-weight: bold;
  font-size: 14px;
  color: #f14668;
}
</style>
