<template>
  <div class="columns">
    <div class="column container">
      <br />
      <div class="box">
        <div class="columns">
          <div class="column">
            <div class="control">
              <span class="icon is-small is-left">
                <i style="color: #00d1b2" class="fas fa-address-book"></i>
              </span>
              <span style="color: #3850b7; font-size: 17px; font-weight: bold"
                >Danh mục Công nhân đã nghỉ việc</span
              >
            </div>
          </div>
        </div>

        <div class="columns">
          <div class="column is-8">
            <span>Có tất cả: </span>
            <span style="font-weight: bold">{{
              congnhan.length | formatNumber
            }}</span>
            <span>công nhân</span>
          </div>
          <div class="column" style="text-align: right">
            <button
              @click="isActive = true"
              class="button is-success is-fullwidth is-small"
            >
              <span class="icon is-small">
                <i class="fas fa-pen-fancy"></i>
              </span>
              <span>Thêm công nhân</span>
            </button>
          </div>
          <div class="column" style="text-align: right">
            <nuxt-link :to="`/`">
              <button class="button is-info is-fullwidth is-small">
                <span class="icon is-small">
                  <i class="fas fa-angle-double-left"></i>
                </span>
                <span>Thoát</span>
              </button>
            </nuxt-link>
          </div>
        </div>
        <div class="columns">
          <div class="column" style="text-align: right">
            <div class="control has-icons-left">
              <div class="select is-small">
                <select @change="getWithPX($event)">
                  <option selected>-- Xem theo phân xưởng --</option>
                  <option v-for="item in phanxuong" :value="item.mapx">
                    {{ item.mapx }} -- {{ item.tenpx }}
                  </option>
                </select>
              </div>
              <span class="icon is-small is-left">
                <i style="color: #48c78e" class="fas fa-kaaba"></i>
              </span>
              <div class="select is-small">
                <select @change="getWithTo($event)">
                  <option selected>-- Xem theo tổ --</option>
                  <option v-for="item in tonhomid" :value="item.mapx">
                    {{ item.mato }} -- {{ item.tento }}
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
            :data="congnhan"
            :columns="columns"
            :file-name="'Danh_cong_nhan'"
            :file-type="'xlsx'"
            :sheet-name="'Danh mục công nhân'"
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
                  <a @click="getDmcn">
                    <span class="icon is-small is-left">
                      <i style="color: #f96854" class="fab fa-audible"></i>
                    </span>
                    Hiển thị tất cả
                  </a>
                </td>
              </tr>
              <tr style="background-color: #fffaeb">
                <th style="text-align: center; font-size: small">STT</th>
                <th style="text-align: center; font-size: small">Đi làm lại</th>
                <th style="text-align: center; font-size: small">Xóa</th>
                <th style="text-align: center; font-size: small">
                  Mã công nhân
                </th>
                <th style="text-align: center; font-size: small">
                  Tên công nhân
                </th>
                <th style="text-align: center; font-size: small">Mã tổ</th>
                <th style="text-align: center; font-size: small">Tên tổ</th>
                <th style="text-align: center; font-size: small">
                  Mã phân xưởng
                </th>
                <th style="text-align: center; font-size: small">
                  Tên phân xưởng
                </th>
                <th style="text-align: center; font-size: small">Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(px, index) in congnhan" :key="index">
                <td style="text-align: center; font-size: small">
                  {{ index + 1 }}
                </td>
                <td style="text-align: center; color: green">
                  <a @click="working(px)">
                    <span style="color: green" class="icon is-small">
                      <i class="far fa-check-circle"></i>
                    </span>
                  </a>
                </td>
                <td style="text-align: center">
                  <a @click="onDelete(px)">
                    <span style="color: red" class="icon is-small">
                      <i class="fas fa-times"></i>
                    </span>
                  </a>
                </td>
                <td style="font-size: small">{{ px.macn }}</td>
                <td style="font-size: small">{{ px.tencn }}</td>
                <td style="font-size: small">{{ px.mato }}</td>
                <td style="font-size: small">{{ px.tento }}</td>
                <td style="font-size: small">{{ px.mapx }}</td>
                <td style="font-size: small">{{ px.tenpx }}</td>
                <td style="font-size: small; text-align: center">
                  <template v-if="px.trangthai == 1">
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
                    1. Chức năng này sẽ đưa công nhân đã nghỉ việc trở lại làm
                    việc
                    <br />
                    2. Bấm xác nhận thì công nhân này sẽ trở lại làm việc đúng
                    xưởng/tổ cũ.
                  </div>
                </div>
                <div style="padding-top: 10px">
                  <textarea
                    v-model="ghichu"
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
import Swal from "sweetalert2";
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
      tonhom: [],
      tonhomid: [],
      ischoosePx: false,
      ischooseTo: false,
      _idcongnhan: null,
      ghichu: "",
      tencn: "",
      macn: "",
      form: {
        macn: "",
        tencn: "",
        mapx: "",
        tenpx: "",
        sdt: "",
        diachi: "",
        cccd: "",
        mato: "",
        tento: "",
        chucvu: "",
        chucnang: "",
        luongcb: "",
        nguoilienhe: "",
        sotknh: "",
        tennh: "",
        trangthai: 1,
        ghichu: "",
        createdAt: "",
        createdBy: this.$auth.$state.user.username,
        // updatedAt: new Date().toISOString().substr(0, 10),
      },
      checkGhichu: false,
      hisform: {
        tenthaotac: null,
        createdAt: null,
        createdBy: this.$auth.$state.user.username,
        ghichu: null,
      },

      // Modals
      isActive: false,

      columns: [
        {
          label: "Id nhân viên",
          field: "_id",
        },
        {
          label: "Mã công nhân",
          field: "macn",
        },
        {
          label: "Tên công nhân",
          field: "tencn",
        },
        {
          label: "Mã phân xưởng",
          field: "mapx",
        },
        {
          label: "Tên phân xưởng",
          field: "tenpx",
        },
        {
          label: "Mã tổ",
          field: "mato",
        },
        {
          label: "Tên tổ",
          field: "tento",
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
          label: "Chức vụ",
          field: "chucvu",
        },
        {
          label: "Lương cơ bản",
          field: "luongcb",
        },
        {
          label: "Người liên hệ",
          field: "nguoilienhe",
        },
        {
          label: "Địa chỉ",
          field: "diachi",
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
          label: "Lương QLSP",
          field: "luongqlsp",
        },
        {
          label: "Ghi chú",
          field: "ghichu",
        },
        {
          label: "Trạng thái",
          field: "trangthai",
        },
        {
          label: "Mã chấm công",
          field: "machamcong",
        },
        {
          label: "Số TT CN",
          field: "sttchon",
        },
        {
          label: "Tạo ngày",
          field: "createdAt",
          dataFormat: this.prefixformatDate,
        },
        {
          label: "Tạo bởi",
          field: "createdBy",
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

  mounted() {
    this.getDmcn();
    this.currentDateTime();
    this.getPhanxuong();
    // this.getmapx();
  },

  isFormValid() {
    return !this.$v.form.$invalid;
  },

  methods: {
    onChangePage(pageOfitems) {
      this.pageOfitems = pageOfitems;
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

    async getDmcn() {
      this.congnhan = await this.$axios.$get(
        `/api/congnhan/allcongnhannghiviec`
      );
      if (this.congnhan.length <= 0) {
        this.$toasted.show("Danh mục công nhân rỗng", {
          duration: 3000,
          theme: "bubble",
        });
      }
    },

    async getPhanxuong() {
      this.phanxuong = await this.$axios.$get(`/api/phongban/allphanxuong`);
    },

    async showmapx(e) {
      // console.log(this.mapx)
      var name = e.target.options[e.target.options.selectedIndex].text;
      // console.log(name)
      let position = name.split("--");
      this.form.mapx = position[0].trim();
      this.form.tenpx = position[1].trim();
      this.tonhom = await this.$axios.$get(
        `/api/phongban/alltoinxuong?mapx=${this.form.mapx}`
      );
      this.ischoosePx = true;
      if (this.tonhom.length <= 0) {
        this.form.mato = "";
        this.form.tento = "";
      }
    },

    async showmato(e) {
      // console.log(this.mapx)
      var name = e.target.options[e.target.options.selectedIndex].text;
      // console.log(name)
      let position = name.split("--");
      this.form.mato = position[0].trim();
      this.form.tento = position[1].trim();
      this.ischooseTo = true;
    },

    async getWithPX(e) {
      // console.log(this.mapx)
      var name = e.target.options[e.target.options.selectedIndex].text;
      // console.log(name)
      let position = name.split("--");
      let p1 = position[0].trim();
      this.congnhan = await this.$axios.$get(
        `/api/congnhan/allcongnhannghiviectheopx?mapx=${p1}`
      );
      this.tonhomid = await this.$axios.$get(
        `/api/phongban/alltoinxuong?mapx=${p1}`
      );
    },

    async getWithTo(e) {
      // console.log(this.mapx)
      var name = e.target.options[e.target.options.selectedIndex].text;
      // console.log(name)
      let position = name.split("--");
      let p1 = position[0].trim();
      this.congnhan = await this.$axios.$get(
        `/api/congnhan/allcongnhannghiviectheoto?mato=${p1}`
      );
    },

    async working(cn) {
      this.isActive = true;
      this._idcongnhan = cn._id;
      this.tencn = cn.tencn;
      this.macn = cn.macn;
    },

    async onDieuchuyenwork() {
      //   console.log(this._idcongnhan);
      //   console.log(this.ghichu);
      const result = await Swal.fire({
        title: `Bạn có chắc chắn chuyển công nhân này trở lại làm việc không?`,
        showDenyButton: true,
        confirmButtonText: "Có, Xác nhận",
        denyButtonText: `Hủy`,
      });
      if (result.isConfirmed) {
        try {
          const data = {
            trangthai: 1,
            ghichu: this.ghichu,
          };
          await this.$axios.$patch(
            `/api/congnhan/updatetrangthaicongnhan/${this._idcongnhan}`,
            data
          );

          // save log
          const log = `Xác nhận cho công nhân: ${this.tencn}, Mã: ${this.macn} đi làm lại`;
          const dataLog = {
            logname: log,
            createdAt: this.form.createdAt,
            createdBy: this.form.createdBy,
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
          this.getDmcn();
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

    async onDelete(cn) {
      const result = await Swal.fire({
        title: `Bạn có xóa hẳn công nhân: ${cn.tencn}?`,
        showDenyButton: true,
        confirmButtonText: "Có, Xóa",
        denyButtonText: `Hủy`,
      });
      if (result.isConfirmed) {
        try {
          await this.$axios
            .$delete(`/api/congnhan/${cn._id}`)
            .then((response) => {
              const index = this.congnhan.findIndex((p) => p._id === cn._id); // find the post index
              if (~index)
                // if the post exists in array
                this.congnhan.splice(index, 1); //delete the post
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
  height: 550px;
  display: block;
  overflow: scroll;
  width: 100%;
  position: sticky;
  top: 0;
}

.modal-content,
.modal-card {
  width: 620px;
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
