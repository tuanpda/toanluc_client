<template>
  <div class="columns">
    <div class="column container">
      <br />
      <div class="box" style="margin-left: 3px; margin-right: 3px">
        <div class="columns">
          <div class="column is-8">
            <nuxt-link :to="`/danhmuc/nhanvien/`">
              <button class="button is-small is-info is-rounded">
                <span class="icon is-small">
                  <i class="fas fa-angle-double-left"></i>
                </span>
                <span>Quay lại</span>
              </button>
            </nuxt-link>
          </div>
          <div class="column" style="text-align: right">
            <span id="tag-fix">Mã số: {{ nhanvien.manv }}</span>
          </div>
        </div>

        <div class="columns">
          <div class="column">
            <div class="field">
              <label class="label">Tên nhân viên</label>
              <div class="control">
                <input
                  v-model.trim="form.tennv"
                  @blur="$v.form.tennv.$touch()"
                  class="input is-small"
                  type="text"
                  placeholder="Nhập vào tên nhân viên"
                />
              </div>
              <div v-if="$v.form.tennv.$error" class="form-error">
                <span v-if="!$v.form.tennv.required" class="help is-danger"
                  >Yêu cầu nhập tên nhân viên</span
                >
              </div>
            </div>
          </div>
          <div class="column">
            <div class="field">
              <label class="label">Số điện thoại</label>
              <div class="control">
                <input
                  @blur="$v.form.sodienthoai.$touch()"
                  v-model.trim="form.sodienthoai"
                  class="input is-small"
                  type="text"
                  placeholder="Nhập số điện thoại"
                />
              </div>
              <div v-if="$v.form.sodienthoai.$error" class="form-error">
                <span
                  v-if="!$v.form.sodienthoai.required"
                  class="help is-danger"
                  >Yêu cầu nhập số điện thoại</span
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
                  @blur="$v.form.cccd.$touch()"
                  v-model.trim="form.cccd"
                  class="input is-small"
                  type="text"
                  placeholder="Nhập căn cước công dân"
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
              <label class="label">Giới tính</label>
              <div class="control">
                <label class="radio is-small">
                  <input
                    v-model="form.gioitinh"
                    value="Nam"
                    type="radio"
                    name="answer"
                  />
                  Nam
                </label>
                <label class="radio">
                  <input
                    v-model="form.gioitinh"
                    value="Nữ"
                    type="radio"
                    name="answer"
                  />
                  Nữ
                </label>
              </div>
            </div>
          </div>
        </div>

        <div class="columns">
          <div class="column">
            <div class="field">
              <label class="label">Địa chỉ liên hệ</label>
              <div class="control">
                <input
                  v-model="form.diachilh"
                  class="input is-small"
                  type="text"
                  placeholder="Nhập địa chỉ liên hệ"
                />
              </div>
            </div>
          </div>
          <div class="column">
            <div class="field">
              <label class="label">Liên hệ khẩn cấp</label>
              <div class="control">
                <input
                  v-model="form.lhkhancap"
                  class="input is-small"
                  type="text"
                  placeholder="Nhập địa chỉ liên hệ khẩn cấp"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="columns">
          <div class="column">
            <div class="field">
              <label class="label">Làm việc</label>
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
          </div>
          <div class="column">
            <div class="field">
              <label class="label">Phòng ban</label>
              <div class="control has-icons-left">
                <div class="select is-fullwidth is-small">
                  <select @change="showmapx($event)">
                    <option selected disabled>{{ form.tenphong }}</option>
                    <option v-for="item in phongban" :value="item.maphong">
                      {{ item.maphong }} -- {{ item.tenphong }}
                    </option>
                  </select>
                </div>
                <span class="icon is-small is-left">
                  <i style="color: #48c78e" class="fas fa-kaaba"></i>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div class="columns">
          <div class="column">
            <div class="field">
              <label class="label">Ngày sinh</label>
              <div class="control">
                <input
                  :value="formattedNgaybd(form)"
                  class="input is-small"
                  type="date"
                  @blur="updateNgaysinh($event.target.value)"
                />
              </div>
            </div>
          </div>
          <div class="column">
            <div class="field">
              <label class="label">Mức lương</label>
              <div class="control">
                <input
                  v-model="form.mucluong"
                  class="input is-small"
                  type="text"
                  placeholder="Nhập địa chỉ liên hệ khẩn cấp"
                />
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
                  placeholder="Nhập địa chỉ liên hệ khẩn cấp"
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
                  placeholder="Nhập địa chỉ liên hệ khẩn cấp"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="colums">
          <label class="label">Ghi chú</label>
          <div class="control">
            <textarea
              v-model="form.diengiai"
              class="textarea is-small"
            ></textarea>
          </div>
        </div>
        <div class="columns" style="margin-top: 5px">
          <div class="column">
            <div class="field">
              <label class="label">Sửa ảnh hồ sơ</label>
              <div class="file is-info has-name is-small">
                <label class="file-label">
                  <input
                    @change="onFileChange"
                    class="file-input"
                    type="file"
                    name="resume"
                  />
                  <span class="file-cta">
                    <span class="file-icon">
                      <i class="fas fa-upload"></i>
                    </span>
                    <span class="file-label"> Chọn ảnh </span>
                  </span>
                  <span class="file-name">
                    {{ fileName }}
                  </span>
                </label>
              </div>
            </div>
          </div>
          <div class="column">
            <div v-if="form.anhdd && !url" class="column">
              <div id="preview" class="box">
                <img :src="form.anhdd" />
              </div>
            </div>
            <div v-if="url" class="column">
              <div id="preview" class="box">
                <img :src="url" />
              </div>
            </div>
          </div>
        </div>
        <div class="columns">
          <div class="column">
            <button
              @click.prevent="onUpdate"
              class="button is-success is-fullwidth is-small"
            >
              Ghi nhận
            </button>
          </div>
          <div class="column">
            <nuxt-link :to="`/danhmuc/nhanvien/`">
              <button class="button is-danger is-light is-fullwidth is-small">
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
import {
  required,
  email,
  minLength,
  url,
  sameAs,
} from "vuelidate/lib/validators";
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.min.css";
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
      url: null,
      mask: currencyMask,
      fileName: "",
      selectedFile: null,
      file: null,
      pageOfitems: [],
      nhanvien: [],
      ngayip: new Date().toISOString().substr(0, 10),
      checkData: false,
      phongban: [],
      form: {
        tennv: null,
        mapb: null,
        tennh: null,
        tenphong: null,
        sodienthoai: null,
        cccd: null,
        anhdd: null,
        ngaysinh: null,
        gioitinh: null,
        hesoluong: 0.0,
        mucluong: 0.0,
        chucvu: null,
        trinhdo: null,
        diachilh: null,
        diengiai: null,
        trangthai: null,
        chutaikhoan: null,
      },
      hisform: {
        tenthaotac: null,
        createdAt: null,
        createdBy: this.$auth.$state.user.username,
        ghichu: null,
      },
      updated: null,

      // Modals
      isActive: false,
      isActive_update: false,
    };
  },

  validations: {
    form: {
      tennv: {
        required,
      },
      sodienthoai: {
        required,
      },
      cccd: {
        required,
      },
    },
  },

  isFormValid() {
    return !this.$v.form.$invalid;
  },

  async fetch() {
    this.nhanvien = await this.$axios.$get(
      `/api/nhanvien/${this.$route.params.id}`
    );
    this.form.id = this.nhanvien._id;
    this.form.tennv = this.nhanvien.tennv;
    this.form.mapb = this.nhanvien.mapb;
    this.form.tenphong = this.nhanvien.tenphong;
    this.form.sodienthoai = this.nhanvien.sodienthoai;
    this.form.cccd = this.nhanvien.cccd;
    this.form.anhdd = this.nhanvien.anhdd;
    this.form.ngaysinh = this.nhanvien.ngaysinh;
    this.form.gioitinh = this.nhanvien.gioitinh;
    this.form.mucluong = this.nhanvien.mucluong;
    this.form.lhkhancap = this.nhanvien.lhkhancap;
    this.form.diachilh = this.nhanvien.diachilh;
    this.form.chutaikhoan = this.nhanvien.chutaikhoan;
    this.form.sotknh = this.nhanvien.sotknh;
    this.form.tennh = this.nhanvien.tennh;
    this.form.diengiai = this.nhanvien.diengiai;
    this.form.createdAt = this.nhanvien.createdAt;
    this.form.updatedAt = this.nhanvien.updatedAt;
    this.form.accadd = this.nhanvien.accadd;
    this.form.trangthai = this.nhanvien.trangthai;
  },

  mounted() {
    this.currentDateTime();
    this.getphongban();
  },

  computed: {
    formattedNgaybd() {
      return function (form) {
        // console.log(form);
        if (!form.ngaysinh) return "";
        const date = new Date(form.ngaysinh);
        const year = date.getFullYear();
        const month = ("0" + (date.getMonth() + 1)).slice(-2);
        const day = ("0" + date.getDate()).slice(-2);
        return `${year}-${month}-${day}`;
      };
    },
  },

  methods: {
    onFileChange(e) {
      this.fileName = e.target.files[0];
      this.url = URL.createObjectURL(this.fileName);
      this.fileName = e.target.files[0].name;
      this.selectedFile = e.target.files[0];
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
      this.updated = date + " " + time;
      this.hisform.createdAt = date + " " + time;
    },

    async getphongban() {
      this.phongban = await this.$axios.$get(`/api/phongban/allphongban`);
    },

    async showmapx(e) {
      // console.log(this.mapx)
      var name = e.target.options[e.target.options.selectedIndex].text;
      // console.log(name)
      let position = name.split("--");
      this.form.mapb = position[0].trim();
      this.form.tenphong = position[1].trim();
    },

    updateNgaysinh(value) {
      // console.log(value);
      this.form.ngaysinh = value;
    },

    onUpdate() {
      Swal.fire({
        title: "Chắc chắn cập nhật thông tin nhân viên này?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Chắc chắn cập nhật",
      }).then((result) => {
        if (result.isConfirmed) {
          try {
            let data = new FormData();
            data.append("tennv", this.form.tennv);
            data.append("mapb", this.form.mapb);
            data.append("tenphong", this.form.tenphong);
            data.append("sodienthoai", this.form.sodienthoai);
            data.append("cccd", this.form.cccd);
            if (this.selectedFile) {
              data.append("anhdd", this.selectedFile, this.selectedFile.name);
            } else {
              data.append("anhdd", this.form.anhdd);
            }
            data.append("ngaysinh", this.form.ngaysinh);
            data.append("gioitinh", this.form.gioitinh);
            data.append("mucluong", this.form.mucluong);
            data.append("lhkhancap", this.form.lhkhancap);
            data.append("diachilh", this.form.diachilh);
            data.append("chutaikhoan", this.form.chutaikhoan);
            data.append("sotknh", this.form.sotknh);
            data.append("tennh", this.form.tennh);
            data.append("diengiai", this.form.diengiai);
            data.append("trangthai", this.form.trangthai);
            data.append("updatedAt", this.updated);

            this.$axios.$patch(
              `/api/nhanvien/${this.$route.params.id}`,
              data,
              {}
            );

            // save log
            this.hisform.tenthaotac = `Cập nhật nhân viên, tên: ${this.form.tennv}`;
            this.hisform.ghichu = `Cập nhật một nhân viên`;
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
  width: 120px;
  height: 120px;
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
