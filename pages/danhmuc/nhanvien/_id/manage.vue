<template>
  <div class="columns">
    <div class="column container">
      <br />
      <div class="box">
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
            <span id="tag-fix">Nhân viên mã số: {{ nhanvien.manv }}</span>
          </div>
        </div>

        <div class="columns">
          <div class="column">
            <div class="table_wrappert">
              <table
                class="table is-responsive is-bordered is-narrow is-fullwidth"
              >
                <tr style="background-color: #fffaeb;">
                  <td
                    colspan="6"
                    style="font-size: small; font-weight: bold; text-align: right;"
                  >
                    Thông tin nhân viên
                  </td>
                </tr>
                <tr>
                  <td style="font-weight: bold; width: 20%;">
                    Tên nhân viên
                  </td>
                  <td style="text-align: center; font-weight: bold;">
                    Giới tính
                  </td>
                  <td
                    style="text-align: center; font-weight: bold; width: 12%;"
                  >
                    Số điện thoại
                  </td>
                  <td
                    style="text-align: center; font-weight: bold; width: 12%;"
                  >
                    CCCD
                  </td>
                  <td style="text-align: center; font-weight: bold;">
                    Địa chỉ liên hệ
                  </td>
                  <td style="text-align: center; font-weight: bold;">
                    Địa chỉ liên hệ khẩn cấp
                  </td>
                </tr>
                <tr>
                  <td>
                    <div class="control">
                      <input
                        v-model.trim="form.tennv"
                        @blur="$v.form.tennv.$touch()"
                        class="input"
                        type="text"
                        placeholder="Nhập vào tên nhân viên"
                      />
                    </div>
                    <div v-if="$v.form.tennv.$error" class="form-error">
                      <span
                        v-if="!$v.form.tennv.required"
                        class="help is-danger"
                        >Yêu cầu nhập tên nhân viên</span
                      >
                    </div>
                  </td>
                  <td>
                    <div style="text-align: center;" class="control">
                      <label class="radio">
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
                  </td>
                  <td>
                    <div class="control">
                      <input
                        @blur="$v.form.sodienthoai.$touch()"
                        v-model.trim="form.sodienthoai"
                        class="input"
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
                  </td>
                  <td>
                    <div class="control">
                      <input
                        @blur="$v.form.cccd.$touch()"
                        v-model.trim="form.cccd"
                        class="input"
                        type="text"
                        placeholder="Nhập căn cước công dân"
                      />
                    </div>
                    <div v-if="$v.form.cccd.$error" class="form-error">
                      <span v-if="!$v.form.cccd.required" class="help is-danger"
                        >Yêu cầu nhập căn cước công dân</span
                      >
                    </div>
                  </td>
                  <td>
                    <div class="control">
                      <input
                        v-model="form.diachilh"
                        class="input"
                        type="text"
                        placeholder="Nhập địa chỉ liên hệ"
                      />
                    </div>
                  </td>
                  <td>
                    <div class="control">
                      <input
                        v-model="form.lhkhancap"
                        class="input"
                        type="text"
                        placeholder="Nhập địa chỉ liên hệ khẩn cấp"
                      />
                    </div>
                  </td>
                </tr>
              </table>

              <table
                class="table is-responsive is-bordered is-narrow is-fullwidth"
              >
                <tr style="background-color: #fffaeb;">
                  <td
                    style="font-size: small; font-weight: bold; text-align: center;"
                  >
                    Thông tin đã lưu
                  </td>
                  <td
                    style="font-size: small; font-weight: bold; text-align: center;"
                  >
                    Hiệu chỉnh thông tin
                  </td>
                </tr>
                <tr>
                  <td>Phòng ban: {{ nhanvien.tenphong }}</td>
                  <td>
                    <div class="control has-icons-left">
                      <div class="select is-fullwidth">
                        <select @change="showmapx($event)">
                          <option selected>-- Chọn phòng ban --</option>
                          <option
                            v-for="item in phongban"
                            :value="item.maphong"
                          >
                            {{ item.maphong }} -- {{ item.tenphong }}
                          </option>
                        </select>
                      </div>
                      <span class="icon is-small is-left">
                        <i style="color: #48c78e" class="fas fa-kaaba"></i>
                      </span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>Ngày sinh: {{ nhanvien.ngaysinh | formatDate }}</td>
                  <td>
                    <input v-model="form.ngaysinh" class="input" type="date" />
                  </td>
                </tr>
                <tr>
                  <td>Mức lương: {{ nhanvien.mucluong }}</td>
                  <td>
                    <input
                      v-model="form.mucluong"
                      class="input"
                      type="text"
                      placeholder="Nhập mức lương"
                    />
                  </td>
                </tr>
                <tr>
                  <td>Số tài khoản: {{ nhanvien.sotknh }}</td>
                  <td>
                    <input
                      v-model="form.sotknh"
                      class="input"
                      type="text"
                      placeholder="Nhập số tài khoản ngân hàng"
                    />
                  </td>
                </tr>
                <tr>
                  <td>Tên ngân hàng: {{ nhanvien.tennh }}</td>
                  <td>
                    <input
                      v-model="form.tennh"
                      class="input"
                      type="text"
                      placeholder="Nhập tên ngân hàng"
                    />
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>

        <div style="border: 1px solid #48c78e; padding: 10px">
          <div class="columns">
            <div class="column is-8">
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
          <div class="field">
            <label class="label">Diễn giải thêm</label>
            <div class="control">
              <textarea
                v-model="form.diengiai"
                class="textarea is-small"
                placeholder="Ghi chú thêm ..."
              ></textarea>
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
    this.form.sotknh = this.nhanvien.sotknh;
    this.form.tennh = this.nhanvien.tennh;
    this.form.diengiai = this.nhanvien.diengiai;
    this.form.createdAt = this.nhanvien.createdAt;
    this.form.updatedAt = this.nhanvien.updatedAt;
    this.form.accadd = this.nhanvien.accadd;
  },

  mounted() {
    this.currentDateTime();
    this.getphongban()
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
            data.append("sotknh", this.form.sotknh);
            data.append("tennh", this.form.tennh);
            data.append("diengiai", this.form.diengiai);
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
</style>
