<template>
  <div class="columns is-mobile">
    <div class="column is-10 is-offset-1">
      <br />
      <div class="box">
        <div class="columns">
          <div class="column">
            <div class="control">
              <span class="icon is-small is-left">
                <i class="fab fa-firstdraft"></i>
              </span>
              Báo cáo nhân sự công ty
            </div>
          </div>
        </div>

        <div class="columns">
          <div class="column is-8">
            <span>Có tất cả: </span>
            <span style="font-weight: bold">{{
              dsnhanvien.length | formatNumber
            }}</span>
            <span>thành viên</span>
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
              <tr>
                <th style="text-align: center">STT</th>
                <th style="text-align: center">Ảnh hồ sơ</th>
                <th style="text-align: center">Tên nhân viên</th>
                <th style="text-align: center">Tên phòng</th>
                <th style="text-align: center">Chức vụ</th>
                <th style="text-align: center">CCCD</th>
                <th style="text-align: center">Trình độ</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(nv, index) in dsnhanvien" :key="index">
                <td style="text-align: center">{{ index + 1 }}</td>
                <td style="text-align: center;">
                  <figure id="avatar">
                    <img :src="nv.anhdd" style="width: 30; height: 30"/>
                  </figure>
                </td>
                <td>{{ nv.tennv }}</td>
                <td>{{ nv.tenphong }}</td>
                <td>{{ nv.chucvu }}</td>
                <td style="text-align: center">{{ nv.cccd }}</td>
                <td>{{ nv.trinhdo }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import XLSX from "xlsx";
import { mapGetters } from "vuex";
// Khai báo sweet2. Nhớ khai báo trong plugin
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
  components: {
    Multiselect,
  },
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
      dmphongban: [],
      chucvu: [],
      dmchucvu: [],
      trinhdo: [],
      dmtrinhdo: [],
      exits: {},
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
        createdAt: null,
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

  computed: {
    ...mapGetters({
      user: "auth/authUser",
    }),
    isDisabled() {
      // you can  check your form is filled or not here.
      return this.checkData == false;
    },
  },

  mounted() {
    this.getDsnv();
    this.currentDateTime();
    this.get_allphongban();
    this.getmapb();
    this.get_allchuvu();
    this.getchucvu();
    this.get_alltrinhdo();
    this.gettrinhdo();
    // this.getNvccd();
  },

  isFormValid() {
    return !this.$v.form.$invalid;
  },

  methods: {
    onChangePage(pageOfitems) {
      this.pageOfitems = pageOfitems;
    },

    nameWithmadv({ maphong, tenphong }) {
      return `${tenphong}`;
    },

    nameWithCv({ _id, chucvu }) {
      return `${chucvu}`;
    },

    nameWithTd({ _id, trinhdo }) {
      return `${trinhdo}`;
    },

    getmapb() {
      this.form.tenphong = this.dmphongban.tenphong;
      this.form.mapb = this.dmphongban.maphong;
    },

    getchucvu() {
      this.form.chucvu = this.dmchucvu.chucvu;
    },

    gettrinhdo() {
      this.form.trinhdo = this.dmtrinhdo.trinhdo;
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
      this.form.createdAt = date + " " + time;
      this.hisform.createdAt = date + " " + time;
    },

    onFileChange(e) {
      this.fileName = e.target.files[0];
      this.url = URL.createObjectURL(this.fileName);
      this.fileName = e.target.files[0].name;
      this.selectedFile = e.target.files[0];
    },

    async getDsnv() {
      this.dsnhanvien = await this.$axios.$get(`/api/nhanvien/reportnhansu`);
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

    async get_allphongban() {
      const filtered = await fetch(
        "http://localhost:9999/api/phongban/allphongban"
      );
      this.phongban = await filtered.json();
    },
    async get_allchuvu() {
      const filtered = await fetch(
        "http://localhost:9999/api/chucvu/allchucvu"
      );
      this.chucvu = await filtered.json();
    },
    async get_alltrinhdo() {
      const filtered = await fetch(
        "http://localhost:9999/api/trinhdo/alltrinhdo"
      );
      this.trinhdo = await filtered.json();
    },

    onAddNhanvien() {
      Swal.fire({
        title: "Chắc chắn thêm mới nhân viên này?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Chắc chắn thêm mới",
      }).then((result) => {
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
              data.append("hesoluong", this.form.hesoluong);
              data.append("mucluong", this.form.mucluong);
              data.append("chucvu", this.form.chucvu);
              data.append("trinhdo", this.form.trinhdo);
              data.append("diachilh", this.form.diachilh);
              data.append("diengiai", this.form.diengiai);
              data.append("createdAt", this.form.createdAt);
              data.append("accadd", this.$auth.$state.user.username);

              this.$axios.$post("/api/nhanvien/addnhanvien", data);

              // save log
              this.hisform.tenthaotac = `Thêm mới nhân viên, tên: ${this.form.tennv}`;
              this.hisform.ghichu = `Thêm mới một nhân viên`;
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
                title: "Thêm nhân viên mới thành công",
              });
              this.isActive = false;
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
      });
    },

    onDelete(id, nv) {
      swal({
        title: "Bạn muốn xóa nhân viên này?",
        text: "Nhân viên này sẽ không lấy lại được sau khi xóa!",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          this.$axios.$delete(`/api/nhanvien/${id}`);
          swal("Xóa thành công nhân viên, F5 lại trang để thay đổi dữ liệu", {
            icon: "success",
          });
          // save log
          this.hisform.tenthaotac = `Thêm mới nhân viên, tên: ${nv}`;
          this.hisform.ghichu = `Thêm mới một nhân viên`;
          this.$axios.$post(`/api/logsystem/record-action`, this.hisform);
        } else {
          swal("Bạn đã hủy xóa nhân viên");
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
  height: 650px;
  display: block;
  overflow: scroll;
  width: 100%;
  position: sticky;
  top: 0;
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
#avatar {
  width: 95px;
  height: 91px;
}
#avatar img {
  max-width: 90px;
  max-height: 90px;
}
</style>
