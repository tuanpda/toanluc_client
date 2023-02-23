<template>
  <div class="columns is-mobile">
    <div class="column is-three-fifths is-offset-one-fifth">
      <br />
      <div class="box">
        <div class="columns">
          <div class="column is-8">
            <nuxt-link :to="`/danhmuc/congnhan/`">
              <button class="button is-small is-info is-rounded">
                <span class="icon is-small">
                  <i class="fas fa-angle-double-left"></i>
                </span>
                <span>Quay lại</span>
              </button>
            </nuxt-link>
          </div>
          <div class="column" style="text-align: right">
            <span id="tag-fix">Mã công nhân: {{ congnhan.macn }}</span>
          </div>
        </div>

        <div class="table_wrapper table-height">
          <table
            class="
                    table
                    is-bordered is-striped is-narrow is-hoverable is-fullwidth
                  "
          >
            <thead>
              <tr style="background-color: #fffaeb;">
                <td
                  style="text-align: right; font-size: small; font-weight: bold;"
                  colspan="9"
                >Cập nhật thông tin</td>
              </tr>
              <tr>
                <td>
                  <div class="field">
                    <label class="label">Mã công nhân</label>
                    <div class="control">
                      <input
                        v-model.trim="form.macn"
                        @blur="$v.form.macn.$touch()"
                        class="input is-small"
                        type="text"
                        placeholder="Nhập mã công nhân"
                      />
                    </div>
                    <div v-if="$v.form.macn.$error" class="form-error">
                      <span v-if="!$v.form.macn.required" class="help is-danger"
                        >Yêu cầu nhập mã công nhân</span
                      >
                    </div>
                  </div>
                </td>
                <td>
                  <div class="field">
                    <label class="label">Tên công nhân</label>
                    <div class="control">
                      <input
                        v-model.trim="form.tencn"
                        @blur="$v.form.tencn.$touch()"
                        class="input is-small"
                        type="text"
                        placeholder="Nhập tên công nhân"
                      />
                    </div>
                    <div v-if="$v.form.tencn.$error" class="form-error">
                      <span
                        v-if="!$v.form.tencn.required"
                        class="help is-danger"
                        >Yêu cầu nhập tên công nhân</span
                      >
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div class="field">
                    <label class="label">Số điện thoại</label>
                    <div class="control">
                      <input
                        v-model="form.sdt"
                        @blur="$v.form.sdt.$touch()"
                        class="input is-small"
                        type="text"
                        placeholder="Nhập tên số điện thoại"
                      />
                    </div>
                    <div v-if="$v.form.sdt.$error" class="form-error">
                      <span v-if="!$v.form.sdt.required" class="help is-danger"
                        >Yêu cầu nhập số điện thoại</span
                      >
                    </div>
                  </div>
                </td>
                <td>
                  <div class="field">
                    <label class="label">Địa chỉ</label>
                    <div class="control">
                      <input
                        v-model="form.diachi"
                        @blur="$v.form.diachi.$touch()"
                        class="input is-small"
                        type="text"
                        placeholder="Nhập địa chỉ"
                      />
                    </div>
                    <div v-if="$v.form.diachi.$error" class="form-error">
                      <span
                        v-if="!$v.form.diachi.required"
                        class="help is-danger"
                        >Yêu cầu nhập địa chỉ</span
                      >
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div class="field">
                    <label class="label">Căn cước công dân</label>
                    <div class="control">
                      <input
                        v-model="form.cccd"
                        @blur="$v.form.cccd.$touch()"
                        class="input is-small"
                        type="text"
                        placeholder="Nhập CCCD"
                      />
                    </div>
                    <div v-if="$v.form.cccd.$error" class="form-error">
                      <span v-if="!$v.form.cccd.required" class="help is-danger"
                        >Yêu cầu nhập căn cước công dân</span
                      >
                    </div>
                  </div>
                </td>
                <td>
                  <div class="field">
                    <label class="label">Chức vụ</label>
                    <div class="control">
                      <input
                        v-model="form.chucvu"
                        class="input is-small"
                        type="text"
                        placeholder="Nhập chức vụ"
                      />
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div class="field">
                    <label class="label">Lương cơ bản</label>
                    <div class="control">
                      <input
                        v-model="form.luongcb"
                        class="input is-small"
                        type="text"
                        v-mask="mask"
                      />
                    </div>
                  </div>
                </td>
                <td>
                  <div class="field">
                    <label class="label">Người liên hệ khẩn cấp</label>
                    <div class="control">
                      <input
                        v-model="form.nguoilienhe"
                        @blur="$v.form.nguoilienhe.$touch()"
                        class="input is-small"
                        type="text"
                        placeholder="Nhập thông tin người liên hệ khi cần"
                      />
                    </div>
                    <div v-if="$v.form.nguoilienhe.$error" class="form-error">
                      <span
                        v-if="!$v.form.nguoilienhe.required"
                        class="help is-danger"
                        >Yêu cầu nhập người liên hệ khi cần gấp</span
                      >
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div class="field">
                    <label class="label">Số tài khoản</label>
                    <div class="control">
                      <input
                        v-model="form.sotknh"
                        class="input is-small"
                        type="text"
                        placeholder="Nhập thông tin số tài khoản (nếu có)"
                      />
                    </div>
                  </div>
                </td>
                <td>
                  <div class="field">
                    <label class="label">Tên ngân hàng</label>
                    <div class="control">
                      <input
                        v-model="form.tennh"
                        class="input is-small"
                        type="text"
                        placeholder="Nhập tên ngân hàng"
                      />
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  <div style="margin-bottom: 10px;">
                    <label class="checkbox">
                      <input type="checkbox" v-model="checkGhichu" />
                      <span style="font-weight: bold;">Ghi chú </span>
                    </label>
                  </div>
                  <div
                    v-if="checkGhichu == true"
                    class="field"
                    style="margin-top: 10px;"
                  >
                    <div class="control">
                      <textarea
                        v-model="form.ghichu"
                        class="textarea is-small"
                        placeholder="Ghi chú thêm ..."
                      ></textarea>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <button
                    :disabled="$v.form.$invalid"
                    @click.prevent="onUpdate"
                    class="button is-success is-fullwidth is-small"
                  >
                    Ghi nhận
                  </button>
                </td>
                <td>
                  <nuxt-link :to="`/danhmuc/congnhan/`"
                    ><button
                      class="button is-danger is-light is-fullwidth is-small"
                    >
                      Hủy bỏ
                    </button>
                  </nuxt-link>
                </td>
              </tr>
            </thead>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.min.css";
import createNumberMask from "text-mask-addons/dist/createNumberMask";
const currencyMask = createNumberMask({
  prefix: "",
  allowDecimal: true,
  includeThousandsSeparator: true,
  allowNegative: false,
});
import {
  required,
  email,
  minLength,
  url,
  sameAs,
} from "vuelidate/lib/validators";
export default {
  middleware: "auth",
  data() {
    return {
      congnhan: [],
      phanxuong: [],
      mask: currencyMask,
      checkGhichu: false,
      form: {
        macn: null,
        tencn: null,
        mapx: null,
        tenpx: null,
        sdt: null,
        diachi: null,
        cccd: null,
        tento: null,
        tennhom: null,
        chucvu: null,
        chucnang: null,
        luongcb: null,
        nguoilienhe: null,
        sotknh: null,
        tennh: null,
        ghichu: null,
        updatedAt: null,
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
      macn: {
        required,
      },
      tencn: {
        required,
      },
      sdt: {
        required,
      },
      diachi: {
        required,
      },
      cccd: {
        required,
      },
      nguoilienhe: {
        required,
      },
    },
  },

  isFormValid() {
    return !this.$v.form.$invalid;
  },

  async fetch() {
    this.congnhan = await this.$axios.$get(
      `/api/congnhan/${this.$route.params.id}`
    );
    this.form.macn = this.congnhan.macn;
    this.form.tencn = this.congnhan.tencn;
    this.form.mapx = this.congnhan.mapx;
    this.form.tenpx = this.congnhan.tenpx;
    this.form.sdt = this.congnhan.sdt;
    this.form.diachi = this.congnhan.diachi;
    this.form.cccd = this.congnhan.cccd;
    this.form.mato = this.congnhan.mato;
    this.form.tento = this.congnhan.tento;
    this.form.chucvu = this.congnhan.chucvu;
    this.form.luongcb = this.congnhan.luongcb;
    this.form.nguoilienhe = this.congnhan.nguoilienhe;
    this.form.sotknh = this.congnhan.sotknh;
    this.form.tennh = this.congnhan.tennh;
    this.form.ghichu = this.congnhan.ghichu;
  },

  mounted() {
    this.currentDateTime();
    this.getPhanxuong();
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
      this.form.updatedAt = date + " " + time;
      this.hisform.createdAt = date + " " + time;
    },


    async getPhanxuong() {
      this.phanxuong = await this.$axios.$get(`/api/phongban/allphanxuong`);
    },

    onUpdate() {
      Swal.fire({
        title: "Chắc chắn cập nhật thông tin?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Chắc chắn cập nhật",
      }).then((result) => {
        if (result.isConfirmed) {
          try {
            this.$axios.$patch(
              `/api/congnhan/${this.$route.params.id}`,
              this.form,
              {}
            );
            // save log
            this.hisform.tenthaotac = `Cập nhật công nhân, tên: ${this.form.tencn}`;
            this.hisform.ghichu = `Cập nhật công nhân`;
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
