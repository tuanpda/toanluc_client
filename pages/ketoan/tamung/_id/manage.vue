<template>
  <div class="columns is-mobile">
    <div class="column is-three-fifths is-offset-one-fifth">
      <br />
      <div class="box">
        <div class="columns">
          <div class="column is-8">
            <nuxt-link :to="`/ketoan/tamung/`">
              <button class="button is-small is-info is-rounded">
                <span class="icon is-small">
                  <i class="fas fa-angle-double-left"></i>
                </span>
                <span>Quay lại</span>
              </button>
            </nuxt-link>
          </div>
          <div class="column" style="text-align: right">
            <span id="tag-fix">Mã phiếu ứng: {{ ungtien._id }}</span>
          </div>
        </div>
        <table class="table is-responsive is-bordered is-narrow is-fullwidth">
          <tr class="is-selected">
            <th colspan="2">Phiếu ứng</th>
          </tr>
          <tr>
            <td>Người ứng tiền: {{ this.ungtien.nguoiung }}</td>
            <td>
              <multiselect
                v-model="dm_nhanvien"
                :options="ds_nhanvien"
                :custom-label="nameWithNhanvien"
                placeholder="Sửa người ứng"
                label="maphong"
                track-by="maphong"
                style="font-size: 12px; width: 100%"
              ></multiselect>
            </td>
          </tr>
          <tr>
            <td>Số tiền đã ứng: {{ this.form.tienung }}</td>
            <td>
              <input
                @blur="$v.form.tienung.$touch()"
                v-model="form.tienung"
                v-mask="mask"
                class="input is-small"
                type="text"
                placeholder="Nhập tiền ứng"
              />
              <div v-if="$v.form.tienung.$error" class="form-error">
                <span v-if="!$v.form.tienung.required" class="help is-danger"
                  >Yêu cầu nhập tiền ứng</span
                >
              </div>
            </td>
          </tr>
          <tr>
            <td>Ngày ứng tiền: {{ this.form.ngayung }}</td>
            <td>
              <input
                v-model="form.ngayung"
                class="input is-small"
                type="date"
              />
              <div v-if="$v.form.ngayung.$error" class="form-error">
                <span v-if="!$v.form.ngayung.required" class="help is-danger"
                  >Yêu cầu nhập ngày ứng tiền</span
                >
              </div>
            </td>
          </tr>
          <tr>
            <th colspan="2">Lý do ứng: {{ this.form.noidung }}</th>
          </tr>
          <tr>
            <th colspan="2">
              <textarea
                v-model="form.noidung"
                @blur="$v.form.noidung.$touch()"
                class="textarea is-small"
                placeholder="Nhập vào lý do ứng tiền"
              ></textarea>
              <div v-if="$v.form.noidung.$error" class="form-error">
                <span v-if="!$v.form.noidung.required" class="help is-danger"
                  >Yêu cầu nhập nội dung ứng tiền</span
                >
              </div>
            </th>
          </tr>
        </table>

        <button
          @click.prevent="[getinfonv(), onUpdate()]"
          :disabled="$v.form.$invalid"
          class="button is-success is-fullwidth is-small"
        >
          Ghi lại nội dung phiếu ứng
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import { required } from "vuelidate/lib/validators";
import createNumberMask from "text-mask-addons/dist/createNumberMask";
const currencyMask = createNumberMask({
  prefix: "",
  allowDecimal: true,
  includeThousandsSeparator: true,
  allowNegative: false,
});
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.min.css";
export default {
  middleware: "auth",
  components: {
    Multiselect,
  },
  data() {
    return {
      ungtien: [],
      ds_nhanvien: [],
      dm_nhanvien: [],
      mask: currencyMask,
      form: {
        nguoiung: null,
        tienung: null,
        ngayung: null,
        noidung: null,
        createdAt: null,
        createdBy: null,
        phongban: null,
      },
      hisform: {
        tenthaotac: null,
        createdAt: null,
        createdBy: this.$auth.$state.user.username,
        ghichu: null,
      },
    };
  },

  validations: {
    form: {
      tienung: {
        required,
      },
      ngayung: {
        required,
      },
      noidung: {
        required,
      },
    },
  },

  isFormValid() {
    return !this.$v.form.$invalid;
  },

  async fetch() {
    this.ungtien = await this.$axios.$get(
      `/api/ketoan/ungtien/${this.$route.params.id}`
    );
    this.form.nguoiung = this.ungtien.nguoiung;
    this.form.tienung = this.ungtien.tienung;
    this.form.ngayung = this.ungtien.ngayung;
    this.form.noidung = this.ungtien.noidung;
    this.form.createdAt = this.ungtien.createdAt;
    this.form.createdBy = this.ungtien.createdBy;
    this.form.phongban = this.ungtien.phongban;
  },

  mounted() {
    this.currentDateTime();
    this.getnv();
  },

  methods: {
    nameWithNhanvien({ _id, tennv }) {
      return `${tennv}`;
    },

    // get select nhân viên
    async getnv() {
      this.ds_nhanvien = await this.$axios.$get(`/api/nhanvien/`);
    },

    getinfonv() {
      this.form.phongban = this.dm_nhanvien.tenphong;
      this.form.nguoiung = this.dm_nhanvien.tennv;
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
      this.form.updatedAt = date + " " + time;
      this.hisform.createdAt = date + " " + time;
    },

    onUpdate() {
      Swal.fire({
        title: "Chắc chắn cập nhật thông tin phiếu ứng?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Chắc chắn cập nhật",
      }).then((result) => {
        if (result.isConfirmed) {
          try {
            if (this.dm_nhanvien.length <= 0) {
              this.form.nguoiung = this.ungtien.nguoiung;
              this.form.phongban = this.ungtien.phongban;
            }
            this.$axios.$patch(
              `/api/ketoan/phieuungtien/${this.$route.params.id}`,
              this.form,
              {}
            );

            // save log
            this.hisform.tenthaotac = `Cập nhật phiếu ứng, mã phiếu: ${this.ungtien._id}`;
            this.hisform.ghichu = `Cập nhật phiếu ứng`;
            this.$axios.$post(`/api/logsystem/record-action`, this.hisform);
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
