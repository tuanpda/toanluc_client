<template>
  <div class="columns is-mobile">
    <div class="column is-6 is-offset-3">
      <br />
      <div class="box">
        <div class="columns" style="border: 1px solid green">
          <div class="column">
            <span style="color: #f14668" class="icon is-small is-left">
              <i class="far fa-calendar-alt"></i>
            </span>
            <span style="font-weight: bold">Xuất dữ liệu</span>
            <div class="control">
              <label class="radio">
                <input type="radio" value="0" v-model="choose" />
                Công đoạn
              </label>
              <label class="radio">
                <input type="radio" value="1" v-model="choose" />
                Công nhật
              </label>
            </div>
            <table
              style="margin-top: 8px"
              class="table table is-bordered table is-narrow table is-hoverable table is-fullwidth"
            >
              <tr>
                <td style="font-size: small; width: 50%">
                  <div class="control has-icons-left">
                    <div class="select is-small is-fullwidth">
                      <select @change="getWithPX($event)">
                        <option selected>-- Chọn phân xưởng --</option>
                        <option v-for="item in phanxuong" :value="item.mapx">
                          {{ item.mapx }} -- {{ item.tenpx }}
                        </option>
                      </select>
                    </div>
                    <span class="icon is-small is-left">
                      <i style="color: #48c78e" class="fas fa-kaaba"></i>
                    </span>
                  </div>
                </td>
                <td>
                  <div class="control has-icons-left">
                    <div class="select is-small is-fullwidth">
                      <select @change="getWithTo($event)">
                        <option selected>-- Chọn tổ --</option>
                        <option v-for="item in tonhom" :value="item.mapx">
                          {{ item.mato }} -- {{ item.tento }}
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
                <td>
                  <input v-model="from" type="date" class="input is-small" />
                </td>
                <td>
                  <input v-model="to" type="date" class="input is-small" />
                </td>
              </tr>
              <tr>
                <td>
                  <div class="columns">
                    <div class="column">
                      <button
                        style="width: 100%"
                        @click="exportData"
                        class="is-fullwidth"
                      >
                        <span>Lấy dữ liệu</span>
                      </button>
                    </div>
                    <div style="width: 100%" class="column">
                      <template v-if="data.length > 0">
                        <vue-excel-xlsx
                          :data="data"
                          :columns="columns"
                          :file-name="
                            'Lương công đoạn ' +
                            tenxuong +
                            ' ' +
                            from +
                            '_' +
                            to
                          "
                          :file-type="'xlsx'"
                          :sheet-name="'Lương công đoạn'"
                        >
                          Download Công đoạn
                        </vue-excel-xlsx>
                      </template>
                      <template v-if="data_cn.length > 0">
                        <vue-excel-xlsx
                          :data="data_cn"
                          :columns="columns_cn"
                          :file-name="'Lương công nhật'"
                          :file-type="'xlsx'"
                          :sheet-name="'Lương công nhật'"
                        >
                          Download Công nhật
                        </vue-excel-xlsx>
                      </template>
                    </div>
                  </div>
                </td>
                <td style="font-size: small; font-weight: 800">
                  <span style="color: #f14668" v-if="data.length > 0"
                    >Có: {{ data.length }} bản ghi</span
                  >
                  <span style="color: #f14668" v-if="data_cn.length > 0"
                    >Có: {{ data_cn.length }} bản ghi</span
                  >
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
import Swal from "sweetalert2";
export default {
  middleware: "auth-luong",
  data() {
    return {
      phanxuong: [],
      tonhom: [],
      maxuong: "",
      mato: "",
      tenxuong: "",
      tento: "",
      from: "",
      to: "",
      data: [],
      data_cn: [],
      choose: null,
      name_file: "abc",
      columns: [
        {
          label: "Id Lô sản xuất",
          field: "_id_losx",
          // dataFormat: this.trimData
        },
        {
          label: "Kế hoạch năm",
          field: "kehoachnam",
          /* dataFormat: this.priceFormat */
          // dataFormat: this.trimData
        },
        {
          label: "Mã kế hoạch PX",
          field: "makhpx",
          /* dataFormat: this.priceFormat */
          // dataFormat: this.trimData
        },
        {
          label: "Mã lô sản xuất",
          field: "malosx",
        },
        {
          label: "Mã phân xưởng",
          field: "mapx",
          // dataFormat: this.prefixformatDate
        },
        {
          label: "Mã tổ",
          field: "mato",
        },
        {
          label: "Mã sản phẩm",
          field: "masp",
          // dataFormat: this.prefixformatDate
        },
        {
          label: "Tên sản phẩm",
          field: "tensp",
          // dataFormat: this.prefixformatDate
        },
        {
          label: "Nguyên công",
          field: "nguyencong",
          // dataFormat: this.trimData
        },

        {
          label: "Đơn giá",
          field: "dongia",
          // dataFormat: this.trimData
        },
        {
          label: "Máy",
          field: "may",
          // dataFormat: this.trimData
        },
        {
          label: "Phân xưởng của công nhân",
          field: "phanxuong_cn",
          // dataFormat: this.trimData
        },
        {
          label: "Tổ của công nhân",
          field: "to_cn",
          // dataFormat: this.prefixformatDate
        },
        {
          label: "Mã Công nhân",
          field: "congnhan",
          // dataFormat: this.prefixformatDate
        },
        {
          label: "Tên công nhan",
          field: "tencn",
        },
        {
          label: "Số đạt",
          field: "sodat",
          // dataFormat: this.prefixformatDate
        },
        {
          label: "Số hỏng",
          field: "sohong",
          // dataFormat: this.prefixformatDate
        },
        {
          label: "Ngày thực hiện",
          field: "ngaythuchien",
          dataFormat: this.prefixformatDate,
        },
      ],
      columns_cn: [
        {
          label: "Id Lô sản xuất",
          field: "_id_losx",
          // dataFormat: this.trimData
        },
        {
          label: "Kế hoạch năm",
          field: "kehoachnam",
          /* dataFormat: this.priceFormat */
          // dataFormat: this.trimData
        },
        {
          label: "Mã lô nhà máy",
          field: "malonhamay",
          /* dataFormat: this.priceFormat */
          // dataFormat: this.trimData
        },
        {
          label: "Mã kế hoạch PX",
          field: "makhpx",
          /* dataFormat: this.priceFormat */
          // dataFormat: this.trimData
        },
        {
          label: "Mã lô sản xuất",
          field: "malosx",
        },
        {
          label: "Mã phân xưởng",
          field: "mapx",
          // dataFormat: this.prefixformatDate
        },
        // {
        //   label: "Mã tổ",
        //   field: "mato",
        // },
        {
          label: "Mã sản phẩm",
          field: "masp",
          // dataFormat: this.prefixformatDate
        },
        {
          label: "Tên sản phẩm",
          field: "tensp",
          // dataFormat: this.prefixformatDate
        },
        {
          label: "Mã công",
          field: "macongnhat",
          // dataFormat: this.trimData
        },

        {
          label: "Tên công",
          field: "tencongnhat",
          // dataFormat: this.trimData
        },
        {
          label: "Mã công nhân",
          field: "macongnhan",
          // dataFormat: this.trimData
        },
        {
          label: "Người thực hiện",
          field: "nguoithuchien",
          // dataFormat: this.trimData
        },
        {
          label: "Số giờ công",
          field: "sogiocong",
          // dataFormat: this.prefixformatDate
        },
        {
          label: "Đơn giá",
          field: "dongia",
          // dataFormat: this.prefixformatDate
        },
        {
          label: "Phân xưởng công nhân",
          field: "phanxuong_cn",
        },
        {
          label: "Tổ công nhân",
          field: "to_cn",
          // dataFormat: this.prefixformatDate
        },
        {
          label: "Ngày thực hiện",
          field: "ngaythuchien",
          dataFormat: this.prefixformatDate,
        },
        {
          label: "Ngày hoàn thành",
          field: "ngayhoanthanh",
          dataFormat: this.prefixformatDate,
        },
        {
          label: "Ghi chú",
          field: "ghichu",
          // dataFormat: this.prefixformatDate
        },
      ],
    };
  },

  mounted() {
    this.getPhanxuong();
  },

  methods: {
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

    async getPhanxuong() {
      this.phanxuong = await this.$axios.$get(`/api/phongban/allphanxuong`);
    },

    async getWithPX(e) {
      this.mato = "";
      var name = e.target.options[e.target.options.selectedIndex].text;
      // console.log(name)
      let position = name.split("--");
      let p1 = position[0].trim();
      let p2 = position[1].trim();
      this.maxuong = p1;
      this.tenxuong = p2;
      this.tonhom = await this.$axios.$get(
        `/api/phongban/alltoinxuong?mapx=${p1}`
      );
    },

    async getWithTo(e) {
      // console.log(this.mapx)
      var name = e.target.options[e.target.options.selectedIndex].text;
      // console.log(name)
      let position = name.split("--");
      let p1 = position[0].trim();
      let p2 = position[1].trim();
      this.mato = p1;
      this.tento = p2;
    },

    async exportData() {
      //   console.log(this.choose);
      let choo = parseInt(this.choose);
      if (choo === 0) {
        this.data_cn = [];
        // console.log('congdoan');
        if (
          this.maxuong !== "" &&
          this.mato === "" &&
          this.from === "" &&
          this.to === ""
        ) {
          this.data = await this.$axios.$get(
            `/api/report/execldatawithphanxuong?mapx=${this.maxuong}`
          );
          if (this.data.length <= 0) {
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
              title: "Không có số liệu",
            });
          }
        } else if (
          this.maxuong !== "" &&
          this.mato !== "" &&
          this.from === "" &&
          this.to === ""
        ) {
          this.data = await this.$axios.$get(
            `/api/report/execldatawithto?mato=${this.mato}`
          );
          if (this.data.length <= 0) {
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
              title: "Không có số liệu",
            });
          }
        } else if (
          this.maxuong !== "" &&
          this.mato === "" &&
          this.from !== "" &&
          this.to !== ""
        ) {
          console.log(this.from);
          console.log(this.to);
          this.data = await this.$axios.$get(
            `/api/report/execldatawithtimeandxuong?mapx=${this.maxuong}&tungay=${this.from}&denngay=${this.to}`
          );
          if (this.data.length <= 0) {
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
              title: "Không có số liệu",
            });
          }
        } else if (
          this.maxuong !== "" &&
          this.mato !== "" &&
          this.from !== "" &&
          this.to !== ""
        ) {
          this.data = await this.$axios.$get(
            `/api/report/execldatawithtimeandto?mato=${this.mato}&tungay=${this.from}&denngay=${this.to}`
          );
          if (this.data.length <= 0) {
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
              title: "Không có số liệu",
            });
          }
        } else if (
          this.maxuong === "" &&
          this.mato === "" &&
          this.from !== "" &&
          this.to !== ""
        ) {
          this.data = await this.$axios.$get(
            `/api/report/execldatawithtime?tungay=${this.from}&denngay=${this.to}`
          );
          if (this.data.length <= 0) {
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
              title: "Không có số liệu",
            });
          }
        }
      } else {
        this.data = [];
        if (
          this.maxuong !== "" &&
          this.mato === "" &&
          this.from === "" &&
          this.to === ""
        ) {
          this.data_cn = await this.$axios.$get(
            `/api/report/execldatawithphanxuongcongnhat?mapx=${this.maxuong}`
          );
          if (this.data.length <= 0) {
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
              title: "Không có số liệu",
            });
          }
        } else if (
          this.maxuong !== "" &&
          this.mato === "" &&
          this.from !== "" &&
          this.to !== ""
        ) {
          this.data_cn = await this.$axios.$get(
            `/api/report/execldatawithtimeandxuongcongnhat?mapx=${this.maxuong}&tungay=${this.from}&denngay=${this.to}`
          );
          if (this.data_cn.length <= 0) {
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
              title: "Không có số liệu",
            });
          }
        } else if (
          this.maxuong === "" &&
          this.mato === "" &&
          this.from !== "" &&
          this.to !== ""
        ) {
          this.data_cn = await this.$axios.$get(
            `/api/report/execldatawithtimecongnhat?tungay=${this.from}&denngay=${this.to}`
          );
          if (this.data_cn.length <= 0) {
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
              title: "Không có số liệu",
            });
          }
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
  height: 750px;
  display: block;
  overflow: scroll;
  width: 100%;
  position: sticky;
  top: 0;
}

th {
  text-align: left;
  background: #feecf0;
  position: sticky;
  top: 0px;
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
</style>
