<template>
  <div class="columns">
    <div class="column container">
      <br />
      <div class="box" style="margin-left: 3px; margin-right: 3px">
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
            <span id="tag-fix">Mã số: {{ congnhan.macn }}</span>
          </div>
        </div>

        <div class="columns">
          <div class="column">
            <div class="field">
              <label class="label">Mã công nhân</label>
              <div class="control">
                <input
                  v-model.trim="form.macn"
                  @blur="$v.form.macn.$touch()"
                  class="input is-small"
                  type="text"
                  disabled
                />
              </div>
              <div v-if="$v.form.macn.$error" class="form-error">
                <span v-if="!$v.form.macn.required" class="help is-danger"
                  >Yêu cầu nhập mã công nhân</span
                >
              </div>
            </div>
          </div>
          <div class="column">
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
                <span v-if="!$v.form.tencn.required" class="help is-danger"
                  >Yêu cầu nhập tên công nhân</span
                >
              </div>
            </div>
          </div>
        </div>

        <div class="columns">
          <div class="column">
            <template v-if="form.trangthai == true">
              <span style="font-weight: bold; font-size: small; color: green"
                >Đang làm</span
              >
            </template>
            <template v-else>
              <span style="font-weight: bold; font-size: small; color: red"
                >Đã nghỉ</span
              >
            </template>
            &nbsp;
            <label class="switch" style="vertical-align: middle">
              <input v-model="form.trangthai" type="checkbox" />
              <span class="slider"></span>
            </label>
          </div>
          <div class="column"></div>
        </div>

        <div class="columns">
          <div class="column">
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
          </div>
          <div class="column">
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
                <span v-if="!$v.form.diachi.required" class="help is-danger"
                  >Yêu cầu nhập địa chỉ</span
                >
              </div>
            </div>
          </div>
        </div>

        <div class="columns">
          <div class="column">
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
          </div>
          <div class="column">
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
          </div>
        </div>

        <div class="columns">
          <div class="column">
            <div class="field">
              <label class="label">Lương cơ bản</label>
              <div class="control">
                <input
                  v-model="form.luongcb"
                  class="input is-small"
                  type="text"
                />
              </div>
            </div>
          </div>
          <div class="column">
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
          </div>
        </div>

        <div class="columns">
          <div class="column">
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
          </div>
          <div class="column">
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
          </div>
        </div>

        <div class="columns">
          <div class="column">
            <label class="label">Chủ tài khoản</label>
            <div class="control">
              <input
                v-model.trim="form.chutaikhoan"
                class="input is-small"
                type="text"
                placeholder="Nhập tên ngân hàng"
              />
            </div>
          </div>
          <div class="column">
            <div class="field">
              <label class="checkbox">
                <input type="checkbox" v-model="checkGhichu" />
                <span style="font-weight: bold">Ghi chú </span>
              </label>
            </div>
            <div
              v-if="checkGhichu == true"
              class="field"
              style="margin-top: 10px"
            >
              <div class="control">
                <textarea
                  v-model="form.ghichu"
                  class="textarea is-small"
                  placeholder="Ghi chú thêm ..."
                ></textarea>
              </div>
            </div>
          </div>
        </div>

        <div class="columns" style="margin-top: 10px">
          <div class="column">
            <button
              :disabled="$v.form.$invalid"
              @click.prevent="onUpdate"
              class="button is-success is-fullwidth is-small"
            >
              Ghi nhận
            </button>
          </div>
          <div class="column">
            <nuxt-link :to="`/danhmuc/congnhan/`"
              ><button class="button is-danger is-light is-fullwidth is-small">
                Hủy bỏ
              </button>
            </nuxt-link>
          </div>
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
        trangthai: null,
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
    this.form = { ...this.congnhan };
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

    async onUpdate_bk() {
      const result = await Swal.fire({
        title: `Cập nhật thông tin công nhân?`,
        showDenyButton: true,
        confirmButtonText: "Có, Cập nhật",
        denyButtonText: `Hủy`,
      });
      if (result.isConfirmed) {
        // tìm mã công nhân trong bảng công nhân
        const allmacn = await this.$axios.get("/api/congnhan/showallmacn");
        const dscn = allmacn.data;
        // console.log(dscn);
        const arrayMacn = dscn.map((item) => item.macn);
        // console.log(arrayMacn);
        if (arrayMacn.includes(this.form.macn)) {
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
            title: `Mã công nhân: ${this.form.macn} đã tồn tại trong dữ liệu, nhập vào mã mới`,
          });
        }
      }
    },
    async onUpdate() {
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
            const log = `Cập nhật thông tin cho công nhân: ${this.form.tencn}, Mã: ${this.form.macn}, Trạng thái: ${this.form.trangthai}`;
            const dataLog = {
              logname: log,
              createdAt: this.form.updatedAt,
              createdBy: this.hisform.createdBy,
            };
            this.$axios.$post(`/api/congnhan/addlognhansu`, dataLog);

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

.switch {
  position: relative;
  display: inline-block;
  width: 40px;
  height: 15px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #f14668;
  -webkit-transition: 0.4s;
  transition: 0.4s;
  border-radius: 34px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 7px;
  width: 7px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: green;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196f3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}
</style>
