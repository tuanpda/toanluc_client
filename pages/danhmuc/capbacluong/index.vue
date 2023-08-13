<template>
  <div class="columns">
    <div class="column container">
      <br />
      <div class="box" style="margin-left: 3px; margin-right: 3px">
        <div class="columns">
          <div class="column">
            <div class="control">
              <span class="icon is-small is-left">
                <i style="color: #00d1b2" class="fas fa-outdent"></i>
              </span>
              <span style="color: #3850b7; font-size: 15px; font-weight: bold"
                >Cấp bậc lương</span
              >
            </div>
          </div>
        </div>

        <div class="columns">
          <div class="column is-10">
            <span>Có tất cả: </span>
            <span style="font-weight: bold">{{ capbacluong.length }}</span>
            <span>bản ghi</span>
          </div>
          <div class="column" style="text-align: right">
            <button
              @click="isActive = true"
              class="button is-success is-fullwidth is-small"
            >
              <span class="icon is-small">
                <i class="fas fa-pen-fancy"></i>
              </span>
              <span>Thêm cấp bậc lương</span>
            </button>
          </div>
        </div>
        <div style="margin-bottom: 3px; text-align: right">
          <vue-excel-xlsx
            :data="tonhom"
            :columns="columns"
            :file-name="'Danh_muc_to'"
            :file-type="'xlsx'"
            :sheet-name="'Danh mục tổ'"
          >
            Download Excel
          </vue-excel-xlsx>
        </div>
        <div class="table_wrapper">
          <table
            class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth"
          >
            <thead>
              <tr style="background-color: #fffaeb">
                <th
                  style="
                    text-align: center;
                    font-weight: bold;
                    font-size: smaller;
                    width: 3%;
                  "
                >
                  STT
                </th>
                <th
                  style="
                    text-align: center;
                    font-weight: bold;
                    font-size: smaller;
                    width: 5%;
                  "
                >
                  Sửa
                </th>
                <th
                  style="
                    text-align: center;
                    font-weight: bold;
                    font-size: smaller;
                    width: 5%;
                  "
                >
                  Xóa
                </th>
                <th
                  style="
                    text-align: center;
                    font-weight: bold;
                    font-size: smaller;
                    width: 10%;
                  "
                >
                  Nhóm
                </th>
                <th
                  style="
                    text-align: center;
                    font-weight: bold;
                    font-size: smaller;
                  "
                >
                  Mã số
                </th>
                <th
                  style="
                    text-align: center;
                    font-weight: bold;
                    font-size: smaller;
                    width: 8%;
                  "
                >
                  Diễn giải
                </th>
                <th
                  style="
                    text-align: center;
                    font-weight: bold;
                    font-size: smaller;
                  "
                >
                  LCB Max
                </th>
                <th
                  style="
                    text-align: center;
                    font-weight: bold;
                    font-size: smaller;
                  "
                >
                  LCB Min
                </th>
                <th
                  style="
                    text-align: center;
                    font-weight: bold;
                    font-size: smaller;
                  "
                >
                  Phụ cấp Max
                </th>
                <th
                  style="
                    text-align: center;
                    font-weight: bold;
                    font-size: smaller;
                  "
                >
                  Phụ cấp Min
                </th>
                <th
                  style="
                    text-align: center;
                    font-weight: bold;
                    font-size: smaller;
                  "
                >
                  Ghi chú 1
                </th>
                <th
                  style="
                    text-align: center;
                    font-weight: bold;
                    font-size: smaller;
                  "
                >
                  Ghi chú 2
                </th>
                <th
                  style="
                    text-align: center;
                    font-weight: bold;
                    font-size: smaller;
                  "
                >
                  Ghi chú 3
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(px, index) in capbacluong" :key="index">
                <td style="text-align: center">{{ index + 1 }}</td>
                <td style="text-align: center; color: green">
                  <a @click="update(px)">
                    <span class="icon is-small">
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
                <td style="font-size: smaller">{{ px.nhom }}</td>
                <td style="font-size: smaller">{{ px.maso }}</td>
                <td style="font-size: smaller">{{ px.diengiai }}</td>
                <td style="font-size: smaller">{{ px.lcbmax }}</td>
                <td style="font-size: smaller">{{ px.lcbmin }}</td>
                <td style="font-size: smaller">{{ px.phucapmax }}</td>
                <td style="font-size: smaller">{{ px.phucapmin }}</td>
                <td style="font-size: smaller">{{ px.ghichu1 }}</td>
                <td style="font-size: smaller">{{ px.ghichu2 }}</td>
                <td style="font-size: smaller">{{ px.ghichu3 }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Modal Add -->
        <div class="">
          <div :class="{ 'is-active': isActive }" class="modal">
            <div class="modal-background"></div>
            <div class="modal-content modal-card">
              <header
                style="
                  background-color: #3e8ed0;
                  border-top-left-radius: 8px;
                  border-top-right-radius: 8px;
                "
              >
                <div class="columns is-mobile">
                  <div class="column">
                    <p
                      style="
                        font-size: small;
                        font-weight: bold;
                        color: white;
                        padding: 15px;
                      "
                    >
                      <span class="icon is-small is-left">
                        <i
                          style="color: #ffd863ff"
                          class="fas fa-feather-alt"
                        ></i>
                      </span>
                      Thêm cấp bậc lương
                    </p>
                  </div>
                </div>
              </header>
              <section class="modal-card-body">
                <div class="field">
                  <label class="label is-small">Nhóm</label>
                  <div class="control">
                    <input
                      v-model="form.nhom"
                      type="text"
                      class="input is-small"
                    />
                  </div>
                </div>
                <div class="field">
                  <label class="label is-small">Mã số</label>
                  <div class="control">
                    <input
                      v-model="form.maso"
                      class="input is-small"
                      type="text"
                    />
                  </div>
                </div>
                <div class="field">
                  <label class="label is-small">Diễn giải thêm</label>
                  <div class="control">
                    <textarea
                      v-model="form.diengiai"
                      class="textarea is-small"
                      placeholder="Ghi chú thêm ..."
                    ></textarea>
                  </div>
                </div>
                <div class="field">
                  <label class="label is-small">Lương cơ bản Max</label>
                  <div class="control">
                    <input
                      v-model="form.lcbmax"
                      class="input is-small"
                      type="text"
                    />
                  </div>
                </div>
                <div class="field">
                  <label class="label is-small">Lương cơ bản Min</label>
                  <div class="control">
                    <input
                      v-model="form.lcbmin"
                      class="input is-small"
                      type="text"
                    />
                  </div>
                </div>
                <div class="field">
                  <label class="label is-small">Phụ cấp Max</label>
                  <div class="control">
                    <input
                      v-model="form.phucapmax"
                      class="input is-small"
                      type="text"
                    />
                  </div>
                </div>
                <div class="field">
                  <label class="label is-small">Phụ cấp Min</label>
                  <div class="control">
                    <input
                      v-model="form.phucapmin"
                      class="input is-small"
                      type="text"
                    />
                  </div>
                </div>
                <div class="field">
                  <label class="label is-small">Ghi chú 1</label>
                  <div class="control">
                    <input
                      v-model="form.ghichu1"
                      class="input is-small"
                      type="text"
                    />
                  </div>
                </div>
                <div class="field">
                  <label class="label is-small">Ghi chú 2</label>
                  <div class="control">
                    <input
                      v-model="form.ghichu2"
                      class="input is-small"
                      type="text"
                    />
                  </div>
                </div>
                <div class="field">
                  <label class="label is-small">Ghi chú 3</label>
                  <div class="control">
                    <input
                      v-model="form.ghichu3"
                      class="input is-small"
                      type="text"
                    />
                  </div>
                </div>
                <div class="columns">
                  <div class="column">
                    <button
                      @click.prevent="onAddpx"
                      class="button is-success is-fullwidth is-small"
                    >
                      Ghi nhận
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

        <!-- Modal Update -->
        <div class="">
          <div :class="{ 'is-active': isActive_update }" class="modal">
            <div class="modal-background"></div>
            <div class="modal-content modal-card">
              <header
                style="
                  background-color: #3e8ed0;
                  border-top-left-radius: 8px;
                  border-top-right-radius: 8px;
                "
              >
                <div class="columns is-moblie">
                  <div class="column">
                    <p
                      style="
                        font-size: small;
                        font-weight: bold;
                        color: white;
                        padding: 15px;
                      "
                    >
                      <span class="icon is-small is-left">
                        <i
                          style="color: #ffd863ff"
                          class="fas fa-feather-alt"
                        ></i>
                      </span>
                      Cập nhật dữ liệu
                    </p>
                  </div>
                </div>
              </header>
              <section class="modal-card-body">
                <div class="field">
                  <label class="label is-small">Nhóm</label>
                  <div class="control">
                    <input
                      v-model="data_cbl.nhom"
                      type="text"
                      class="input is-small"
                    />
                  </div>
                </div>
                <div class="field">
                  <label class="label is-small">Mã số</label>
                  <div class="control">
                    <input
                      v-model="data_cbl.maso"
                      class="input is-small"
                      type="text"
                    />
                  </div>
                </div>
                <div class="field">
                  <label class="label is-small">Diễn giải thêm</label>
                  <div class="control">
                    <textarea
                      v-model="data_cbl.diengiai"
                      class="textarea is-small"
                      placeholder="Ghi chú thêm ..."
                    ></textarea>
                  </div>
                </div>
                <div class="field">
                  <label class="label is-small">Lương cơ bản Max</label>
                  <div class="control">
                    <input
                      v-model="data_cbl.lcbmax"
                      class="input is-small"
                      type="text"
                    />
                  </div>
                </div>
                <div class="field">
                  <label class="label is-small">Lương cơ bản Min</label>
                  <div class="control">
                    <input
                      v-model="data_cbl.lcbmin"
                      class="input is-small"
                      type="text"
                    />
                  </div>
                </div>
                <div class="field">
                  <label class="label is-small">Phụ cấp Max</label>
                  <div class="control">
                    <input
                      v-model="data_cbl.phucapmax"
                      class="input is-small"
                      type="text"
                    />
                  </div>
                </div>
                <div class="field">
                  <label class="label is-small">Phụ cấp Min</label>
                  <div class="control">
                    <input
                      v-model="data_cbl.phucapmin"
                      class="input is-small"
                      type="text"
                    />
                  </div>
                </div>
                <div class="field">
                  <label class="label is-small">Ghi chú 1</label>
                  <div class="control">
                    <input
                      v-model="data_cbl.ghichu1"
                      class="input is-small"
                      type="text"
                    />
                  </div>
                </div>
                <div class="field">
                  <label class="label is-small">Ghi chú 2</label>
                  <div class="control">
                    <input
                      v-model="data_cbl.ghichu2"
                      class="input is-small"
                      type="text"
                    />
                  </div>
                </div>
                <div class="field">
                  <label class="label is-small">Ghi chú 3</label>
                  <div class="control">
                    <input
                      v-model="data_cbl.ghichu3"
                      class="input is-small"
                      type="text"
                    />
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
                    <button
                      @click="isActive_update = false"
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
      capbacluong: [],
      data_cbl: [],
      tonhom: [],
      phanxuong: [],
      form: {
        nhom: "",
        maso: "",
        diengiai: "",
        lcbmax: "",
        lcbmin: "",
        phucapmax: "",
        phucapmin: "",
        ghichu1: "",
        ghichu2: "",
        ghichu3: "",
        createdBy: this.$auth.$state.user.username,
        // updatedAt: new Date().toISOString().substr(0, 10),
        createdAt: "",
      },

      hisform: {
        tenthaotac: null,
        createdAt: null,
        createdBy: this.$auth.$state.user.username,
        ghichu: null,
      },

      // Modals add
      isActive: false,
      // Modals update
      isActive_update: false,

      columns: [
        {
          label: "Id tổ",
          field: "_id",
          // dataFormat: this.trimData
        },
        {
          label: "Mã phân xưởng",
          field: "mapx",
          /* dataFormat: this.priceFormat */
          // dataFormat: this.trimData
        },
        {
          label: "Tên tổ",
          field: "tento",
          /* dataFormat: this.priceFormat */
          // dataFormat: this.trimData
        },
        {
          label: "Mã tổ",
          field: "mato",
          /* dataFormat: this.priceFormat */
          // dataFormat: this.trimData
        },
        {
          label: "Tên phân xưởng",
          field: "tenpx",
          /* dataFormat: this.priceFormat */
          // dataFormat: this.trimData
        },
        {
          label: "Ghi chú",
          field: "ghichu",
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
      mato: {
        required,
      },
      tento: {
        required,
      },
    },
  },

  mounted() {
    this.getCapbacluong();
    this.currentDateTime();
    this.get_phanxuong();
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

    async getCapbacluong() {
      this.capbacluong = await this.$axios.$get(
        `/api/ketoan/getallcapbacluong`
      );
      if (this.capbacluong.length <= 0) {
        this.$toasted.show("Cấp bậc lương rỗng", {
          duration: 3000,
          theme: "bubble",
        });
      }
    },

    // get all phân xưởng
    async get_phanxuong() {
      this.phanxuong = await this.$axios.$get(`/api/phongban/allphanxuong`);
    },

    async showmapx(e) {
      // console.log(this.mapx)
      var name = e.target.options[e.target.options.selectedIndex].text;
      // console.log(name)
      let position = name.split("--");
      this.form.mapx = position[0].trim();
      this.form.tenpx = position[1].trim();
      //   this.ds_lokh = await this.$axios.$get(
      //     `/api/ketoan/getallmalkhpx?mapx=${this.form.mapx}`
      //   );
    },

    async update(data) {
      this.data_cbl = [];
      this.isActive_update = true;
      this.data_cbl = { ...data };
      //   console.log(this.data_cbl);
    },

    async onUpdate() {
      await this.$axios.$patch(
        `/api/ketoan/updatecapbacluong/${this.data_cbl._id}`,
        this.data_cbl
      );
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
    },

    onAddpx() {
      Swal.fire({
        title: "Chắc chắn thêm mới?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Chắc chắn thêm mới",
      }).then((result) => {
        if (result.isConfirmed) {
          try {
            this.$v.form.$touch();
            // console.log(this.$auth.$state.user.username);
            // console.log(this.form);

            this.$axios.$post("/api/phongban/addcapbacluong", this.form);
            this.getCapbacluong();

            this.isActive = false;

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
              title: "Thêm mới thành công",
            });
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

    onDelete(px) {
      swal({
        title: "Chắc chắn xóa?",
        text: "Dữ liệu sẽ không lấy lại được sau khi xóa!",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          this.$axios
            .$delete(`/api/ketoan/capbacluong/${px._id}`)
            .then((response) => {
              const index = this.capbacluong.findIndex((p) => p._id === px._id); // find the post index
              if (~index)
                // if the post exists in array
                this.capbacluong.splice(index, 1); //delete the post
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
        } else {
          swal("Bạn đã hủy xóa");
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
  height: 550px;
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

@media (max-width: 768px) {
  .modal-card {
    width: 90%;
    max-width: 400px;
  }
}
</style>
