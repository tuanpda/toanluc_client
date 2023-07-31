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
                >Danh mục Nhân viên</span
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
                  colspan="10"
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
                <th style="text-align: center; font-size: small; width: 4%">
                  Sửa
                </th>
                <th style="text-align: center; font-size: small; width: 4%">
                  Xóa
                </th>
                <th style="text-align: center; font-size: small">
                  Tên nhân viên
                </th>
                <th style="text-align: center; font-size: small">Mã phòng</th>
                <th style="text-align: center; font-size: small">Tên phòng</th>
                <!-- <th style="text-align: center; font-size: small">
                  Lương cơ bản
                </th> -->
                <th style="text-align: center; font-size: small">CCCD</th>
                <th style="text-align: center; font-size: small">Ngày sinh</th>
                <th style="text-align: center; font-size: small">Giới tính</th>
                <th style="text-align: center; font-size: small">Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(nv, index) in dsnhanvien" :key="index">
                <td style="text-align: center; font-size: small">
                  {{ index + 1 }}
                </td>
                <td style="text-align: center; color: green">
                  <a @click="working(nv)">
                    <span style="color: green" class="icon is-small">
                      <i class="far fa-check-circle"></i>
                    </span>
                  </a>
                </td>
                <td style="text-align: center">
                  <a @click="onDelete(nv)">
                    <span style="color: red" class="icon is-small">
                      <i class="fas fa-times"></i>
                    </span>
                  </a>
                </td>
                <td style="font-size: small">{{ nv.tennv }}</td>
                <td style="font-size: small">{{ nv.mapb }}</td>
                <td style="font-size: small">{{ nv.tenphong }}</td>
                <!-- <td style="font-size: small">{{ nv.mucluong }}</td> -->
                <td style="text-align: center; font-size: small">
                  {{ nv.cccd }}
                </td>
                <td style="text-align: center; font-size: small">
                  {{ nv.ngaysinh | formatDate }}
                </td>
                <td style="text-align: center; font-size: small">
                  {{ nv.gioitinh }}
                </td>
                <td style="font-size: small; text-align: center">
                  <template v-if="nv.trangthai == 1">
                    <span style="color: green; font-weight: 900">Đang làm</span>
                  </template>
                  <template v-else>
                    <span style="color: #f96854; font-weight: 900"
                      >Đã nghỉ</span
                    >
                  </template>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="">
          <div :class="{ 'is-active': isActive }" class="modal">
            <div class="modal-background"></div>
            <div class="modal-content modal-card">
              <section class="modal-card-body">
                <div>
                  <div class="notification">
                    1. Chức năng này sẽ đưa nhân viên đã nghỉ việc trở lại làm
                    việc
                    <br />
                    2. Bấm xác nhận thì nhân viên này sẽ trở lại làm việc.
                  </div>
                </div>
                <div style="padding-top: 10px">
                  <textarea
                    v-model="diengiai"
                    class="textarea is-small"
                    cols="30"
                    rows="5"
                    placeholder="Viết thêm ghi chú vào đây ..."
                  ></textarea>
                </div>
                <div class="columns" style="margin-top: 10px">
                  <div class="column">
                    <button
                      @click.prevent="onDieuchuyenwork"
                      class="button is-success is-fullwidth is-small"
                    >
                      Xác nhận
                    </button>
                  </div>
                  <div class="column">
                    <button
                      @click="isActive = false"
                      class="button is-danger is-light is-fullwidth is-small"
                    >
                      Hủy bỏ
                    </button>
                  </div>
                </div>
              </section>
            </div>
          </div>
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
  middleware: "auth",
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
      _idnhanvien: null,
      diengiai: "",
      tennv: "",
      manv: "",
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
        mucluong: 0,
        lhkhancap: "",
        diachilh: "",
        sotknh: "",
        tennh: "",
        diengiai: "",
        createdAt: null,
        thuong: 0,
        dt_dieuchinh: 0,
        dt_thuong: 0,
        dt_phat: 0,
        luongngoaih: 0,
        luongngay: 0,
        bacluong: 0,
        luongtrachnhiem: 0,
        congdoan: 50000,
        trangthai: 1,
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
      this.dsnhanvien = await this.$axios.$get(
        `/api/nhanvien/allnhanviennghiviec`
      );
      if (this.dsnhanvien.length <= 0) {
        this.$toasted.show("Không có danh sách nhân viên", {
          duration: 3000,
          theme: "bubble",
        });
      }
    },

    async working(nv) {
      this.isActive = true;
      this._idnhanvien = nv._id;
      this.tennv = nv.tennv;
      this.manv = nv.manv;
    },

    async onDieuchuyenwork() {
      const result = await Swal.fire({
        title: `Bạn có chắc chắn chuyển nhân viên này trở lại làm việc không?`,
        showDenyButton: true,
        confirmButtonText: "Có, Xác nhận",
        denyButtonText: `Hủy`,
      });
      if (result.isConfirmed) {
        try {
          const data = {
            trangthai: 1,
            diengiai: this.diengiai,
          };
          await this.$axios.$patch(
            `/api/nhanvien/updatetrangthainhanvien/${this._idnhanvien}`,
            data
          );

          // save log
          const log = `Xác nhận cho nhân viên: ${this.tennv}, Mã: ${this.manv} đi làm lại`;
          const dataLog = {
            logname: log,
            createdAt: this.hisform.createdAt,
            createdBy: this.hisform.createdBy,
          };

          await this.$axios.$post(`/api/congnhan/addlognhansu`, dataLog);

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
            title: "Xác nhận đi làm lại thành công",
          });
          this.getDsnv();
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

    async checkManv() {
      // alert(this.form.manv);
      const dataNhanvien = await this.$axios.get("api/nhanvien/");
      // console.log(dataNhanvien);
      const data = dataNhanvien.data;
      const arrayManv = data.map((item) => item.manv);
      // console.log(arrayMacn);
      if (arrayManv.includes(this.form.manv)) {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 5000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });
        Toast.fire({
          icon: "error",
          title: `Mã nhân viên: ${this.form.manv} đã tồn tại trong dữ liệu, nhập vào mã mới`,
        });
        this.form.manv = "";
      }
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

    async onAddNhanvien() {
      const result = await Swal.fire({
        title: `Chắc chắn thêm nhân viên?`,
        showDenyButton: true,
        confirmButtonText: "Chắc chắn thêm",
        denyButtonText: `Hủy`,
      });
      if (result.isConfirmed) {
        try {
          this.$v.form.$touch();
          if (this.exits.length > 0) {
            Swal.fire(
              `Nhân viên có căn cước công dân số: ${this.form.cccd} đã tồn tại trong hệ thống!`
            );
            return;
          } else {
            // console.log(this.$auth.$state.user.username);
            let data = new FormData();
            data.append("manv", this.form.manv);
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
            data.append("mucluong", this.form.mucluong.replace(/,/g, ""));
            data.append("lhkhancap", this.form.lhkhancap);
            data.append("diachilh", this.form.diachilh);
            data.append("sotknh", this.form.sotknh);
            data.append("tennh", this.form.tennh);
            data.append("diengiai", this.form.diengiai);
            data.append("createdAt", this.form.createdAt);
            data.append("accadd", this.$auth.$state.user.username);
            data.append("thuong", this.form.thuong);
            data.append("dt_dieuchinh", this.form.dt_dieuchinh);
            data.append("dt_thuong", this.form.dt_thuong);
            data.append("dt_phat", this.form.dt_phat);
            data.append("luongngoaih", this.form.luongngoaih);
            data.append("luongngay", this.form.luongngay);
            data.append("bacluong", this.form.bacluong);
            data.append("luongtrachnhiem", this.form.luongtrachnhiem);
            data.append("congdoan", this.form.congdoan);
            data.append("trangthai", this.form.trangthai);
            const res = await this.$axios.$post(
              "/api/nhanvien/addnhanvien",
              data
            );

            if (res.success == true) {
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
                title: "Thêm nhân viên mới thành công",
              });
              this.getDsnv();
              this.isActive = false;
            }
          }
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
    },

    async onDelete(nv) {
      const result = await Swal.fire({
        title: `Bạn có xóa hẳn nhân viên: ${nv.tennv}?`,
        showDenyButton: true,
        confirmButtonText: "Có, Xóa",
        denyButtonText: `Hủy`,
      });
      if (result.isConfirmed) {
        try {
          await this.$axios
            .$delete(`/api/nhanvien/${nv._id}`)
            .then((response) => {
              const index = this.dsnhanvien.findIndex((p) => p._id === nv._id); // find the post index
              if (~index)
                // if the post exists in array
                this.dsnhanvien.splice(index, 1); //delete the post
            });
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
            title: "Xóa thành công",
          });
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
