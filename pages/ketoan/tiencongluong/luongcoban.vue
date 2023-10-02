<template>
  <div class="columns">
    <div class="column container">
      <br />
      <div class="box">
        <div class="columns">
          <div class="column">
            <div class="control">
              <span class="icon is-small is-left">
                <i style="color: #00d1b2" class="fas fa-address-card"></i>
              </span>
              <span style="color: #3850b7; font-size: 17px; font-weight: bold"
                >Lương cơ bản - Lương ngày</span
              >
            </div>
          </div>
        </div>

        <div class="columns">
          <div class="column is-8">
            <span>Có tất cả: </span>
            <span style="font-weight: bold">{{
              dsnhanvien.length | formatNumber
            }}</span>
            <span>nhân viên văn phòng</span>
          </div>
          <div class="column" style="text-align: right">
            <button
              @click="isActive = true"
              class="button is-success is-fullwidth is-small"
            >
              <span class="icon is-small">
                <i class="fas fa-pen-fancy"></i>
              </span>
              <span>Thêm nhân viên</span>
            </button>
          </div>
          <div class="column" style="text-align: right">
            <button class="button is-info is-fullwidth is-small">
              <span class="icon is-small">
                <i class="fas fa-angle-double-left"></i>
              </span>
              <span>Thoát</span>
            </button>
          </div>
        </div>

        <div class="columns">
          <div class="column" style="text-align: right">
            <div class="control has-icons-left">
              <div class="select is-small">
                <select @change="getWithBp($event)">
                  <option selected>-- Xem theo phòng ban --</option>
                  <option v-for="item in phongban" :value="item.mapx">
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
        <div style="margin-bottom: 3px">
          <vue-excel-xlsx
            :data="dsnhanvien"
            :columns="columns"
            :file-name="'Danh_nhan_vien'"
            :file-type="'xlsx'"
            :sheet-name="'Danh mục nhân viên'"
          >
            Download Excel
          </vue-excel-xlsx>
        </div>
        <div class="table_wrapper table-height">
          <table
            class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth"
          >
            <thead>
              <tr style="background-color: #fffaeb">
                <td
                  style="text-align: right; font-size: small; font-weight: bold"
                  colspan="12"
                >
                  <a @click="getDsnv">
                    <span class="icon is-small is-left">
                      <i style="color: #f96854" class="fab fa-audible"></i>
                    </span>
                    Hiển thị tất cả
                  </a>
                </td>
              </tr>
              <tr style="background-color: #fffaeb">
                <th style="text-align: center; font-size: small; width: 3%">
                  STT
                </th>
                <th style="text-align: center; font-size: small">
                  Tên nhân viên
                </th>
                <th style="text-align: center; font-size: small">Mã phòng</th>
                <th style="text-align: center; font-size: small">Tên phòng</th>
                <th style="text-align: center; font-size: small; width: 10%">
                  Lương BHXH
                </th>
                <th style="text-align: center; font-size: small; width: 10%">
                  Lương Tháng
                </th>
                <!-- <th style="text-align: center; font-size: small; width: 10%">
                  Lương ngày công
                </th> -->
                <th style="text-align: center; font-size: small; width: 10%">
                  Lương trách nhiệm
                </th>
                <th style="text-align: center; font-size: small; width: 10%">
                  Bậc lương
                </th>
                <th style="text-align: center; font-size: small; width: 5%">
                  Cập nhật
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(nv, index) in dsnhanvien" :key="index">
                <td style="text-align: center; font-size: small">
                  {{ index + 1 }}
                </td>
                <td style="font-size: small">{{ nv.tennv }}</td>
                <td style="font-size: small">{{ nv.mapb }}</td>
                <td style="font-size: small">{{ nv.tenphong }}</td>
                <td style="font-size: small">
                  <!-- {{ nv.mucluong | formatNumber }} -->
                  <input
                    v-model="nv.mucluong"
                    v-mask="mask"
                    type="text"
                    class="input is-small"
                  />
                </td>
                <td style="text-align: center; font-size: small">
                  <!-- {{ nv.luongngay | formatNumber }} -->
                  <!-- 21/9/2023 sửa lại là lương tháng, nhưng tạm vẫn để luongngay -->
                  <!-- xem như nó là lương tháng để khỏi phải tạo cột dữ liệu mới -->
                  <input
                    v-model="nv.luongngay"
                    v-mask="mask"
                    type="text"
                    class="input is-small"
                  />
                </td>
                <!-- <td style="text-align: center; font-size: small">
                  {{ parseFloat(nv.luongngay) / 26 }}
                </td> -->
                <td style="text-align: center; font-size: small">
                  <input
                    v-model="nv.luongtrachnhiem"
                    v-mask="mask"
                    type="text"
                    class="input is-small"
                  />
                </td>
                <td style="text-align: center; font-size: small">
                  <input
                    v-model="nv.bacluong"
                    type="text"
                    class="input is-small"
                  />
                </td>
                <td style="text-align: center; color: green">
                  <a @click="onUpdate(nv)">
                    <span class="icon is-small">
                      <i class="far fa-check-circle"></i>
                    </span>
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// Khai báo sweet2. Nhớ khai báo trong plugin
import Swal from "sweetalert2";
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
  middleware: "auth-luong",
  data() {
    return {
      mask: currencyMask,
      url: null,
      fileName: "",
      selectedFile: null,
      file: null,
      pageOfitems: [],
      dsnhanvien: [],
      ngayip: new Date().toISOString().substr(0, 10),
      checkData: false,
      phongban: [],
      exits: {},
      checkGhichu: false,
      form: {
        manv: "",
        tennv: "",
        mapb: "",
        tenphong: "",
        sodienthoai: "",
        cccd: "",
        anhdd: "",
        ngaysinh: "",
        gioitinh: null,
        mucluong: 0.0,
        lhkhancap: "",
        diachilh: "",
        sotknh: "",
        tennh: "",
        diengiai: "",
        createdAt: null,
        thuong: 0,
        // updatedAt: new Date().toISOString().substr(0, 10),
      },
      hisform: {
        tenthaotac: null,
        createdAt: null,
        createdBy: this.$auth.$state.user.username,
        ghichu: null,
      },

      // Modals
      isActive: false,
      isActive_update: false,

      columns: [
        {
          label: "Id nhân viên",
          field: "_id",
          // dataFormat: this.trimData
        },
        {
          label: "Mã nhân viên",
          field: "manv",
          /* dataFormat: this.priceFormat */
          // dataFormat: this.trimData
        },
        {
          label: "Tên nhân viên",
          field: "tennv",
          /* dataFormat: this.priceFormat */
          // dataFormat: this.trimData
        },
        {
          label: "Mã phòng",
          field: "mapb",
          /* dataFormat: this.priceFormat */
          // dataFormat: this.trimData
        },
        {
          label: "Tên phòng",
          field: "tenphong",
          /* dataFormat: this.priceFormat */
          // dataFormat: this.trimData
        },
        {
          label: "Số điện thoại",
          field: "sdt",
        },
        {
          label: "CCCD",
          field: "cccd",
        },
        {
          label: "Ngày sinh",
          field: "ngaysinh",
          dataFormat: this.prefixformatDate,
        },
        {
          label: "Giới tính",
          field: "gioitinh",
        },
        {
          label: "Mức lương",
          field: "mucluong",
        },
        {
          label: "Liên hệ khẩn cấp",
          field: "lhkhancap",
        },
        {
          label: "Địa chỉ liên hệ",
          field: "diachilh",
        },
        {
          label: "Số tài khoản ngân hàng",
          field: "sotknh",
        },
        {
          label: "Tên ngân hàng",
          field: "tennh",
        },
        {
          label: "Phụ cấp",
          field: "phucaptn",
        },
        {
          label: "Lương phát sinh",
          field: "luongphatsinh",
        },
        {
          label: "Thưởng doanh thu",
          field: "thuongdoanhthu",
        },
        {
          label: "Ngày công",
          field: "ngaycong",
        },
        {
          label: "Lương thêm giờ",
          field: "luongthemgio",
        },
        {
          label: "Tạo ngày",
          field: "createdAt",
          dataFormat: this.prefixformatDate,
        },
        {
          label: "Tạo bởi",
          field: "accadd",
        },
        {
          label: "Cập nhật ngày",
          field: "updatedAt",
          dataFormat: this.prefixformatDate,
        },
      ],
    };
  },

  validations: {
    form: {
      manv: {
        required,
      },
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

  computed: {
    isDisabled() {
      // you can  check your form is filled or not here.
      return this.checkData == false;
    },
  },

  mounted() {
    this.getDsnv();
    this.currentDateTime();
    this.getphongban();
    // this.getNvccd();
  },

  isFormValid() {
    return !this.$v.form.$invalid;
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
      this.form.createdAt = date + " " + time;
      this.hisform.createdAt = date + " " + time;
    },

    // format date
    prefixformatDate(value) {
      if (!value) {
        return "";
      }
      value = new Date(value);
      return (
        value.getFullYear() +
        "-" +
        ("0" + (value.getMonth() + 1)).slice(-2) +
        "-" +
        ("0" + value.getDate()).slice(-2)
      );
    },

    onFileChange(e) {
      this.fileName = e.target.files[0];
      this.url = URL.createObjectURL(this.fileName);
      this.fileName = e.target.files[0].name;
      this.selectedFile = e.target.files[0];
    },

    async getDsnv() {
      this.dsnhanvien = await this.$axios.$get(`/api/nhanvien/`);
      if (this.dsnhanvien.length <= 0) {
        this.$toasted.show("Không có danh sách nhân viên", {
          duration: 3000,
          theme: "bubble",
        });
      }
    },

    async getNvccd() {
      this.exits = await this.$axios.$get(
        `/api/nhanvien/getcccd?cccd=${this.form.cccd}`
      );
      if (this.exits.length > 0) {
        Swal.fire(
          `Nhân viên có căn cước công dân số: ${this.form.cccd} đã tồn tại trong hệ thống!`
        );
      }
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

    async getWithBp(e) {
      // console.log(this.mapx)
      var name = e.target.options[e.target.options.selectedIndex].text;
      // console.log(name)
      let position = name.split("--");
      let p1 = position[0].trim();
      this.dsnhanvien = await this.$axios.$get(
        `/api/nhanvien/getallnhanvien?mapb=${p1}`
      );
    },

    async onUpdate(data) {
      const mucluong = parseInt(data.mucluong.replace(/,/g, ""));
      const luongngay = parseInt(data.luongngay.replace(/,/g, ""));
      const luongtrachnhiem = parseInt(data.luongtrachnhiem.replace(/,/g, ""));
      const data_update = {
        mucluong: mucluong,
        luongngay: luongngay,
        bacluong: data.bacluong,
        luongtrachnhiem: luongtrachnhiem,
      };
      // console.log(data_update);
      const response = await this.$axios.$patch(
        `/api/nhanvien/luongcoban/${data._id}`,
        data_update
      );
      //   console.log(response.success);
      if (response.success == true) {
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
          title: "Cập nhật thành công",
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
          title: "Có lỗi xảy ra !!!",
        });
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

.table_wrapper {
  position: sticky;
  left: 0;
  background-color: whitesmoke;
}

.table-height {
  height: 650px;
  display: block;
  overflow: scroll;
  width: 100%;
  position: sticky;
  top: 0;
}

.modal-content,
.modal-card {
  width: 920px;
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
