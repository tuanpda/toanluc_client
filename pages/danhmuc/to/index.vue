<template>
  <div class="columns">
    <div class="column container">
      <br />
      <div class="box">
        <div class="columns">
          <div class="column">
            <div class="control">
              <span class="icon is-small is-left">
                <i style="color: #00d1b2" class="fas fa-outdent"></i>
              </span>
              <span style="color: #3850b7; font-size: 15px; font-weight: bold"
                >Danh mục Tổ</span
              >
            </div>
          </div>
        </div>

        <div class="columns">
          <div class="column is-10">
            <span>Có tất cả: </span>
            <span style="font-weight: bold">{{
              tonhom.length | formatNumber
            }}</span>
            <span>tổ</span>
          </div>
          <div class="column" style="text-align: right">
            <button
              @click="isActive = true"
              class="button is-success is-fullwidth is-small"
            >
              <span class="icon is-small">
                <i class="fas fa-pen-fancy"></i>
              </span>
              <span>Thêm Tổ</span>
            </button>
          </div>
        </div>
        <div style="margin-bottom: 3px">
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
                    width: 10%;
                  "
                >
                  Mã tổ
                </th>
                <th
                  style="
                    text-align: center;
                    font-weight: bold;
                    font-size: smaller;
                  "
                >
                  Tên tổ
                </th>
                <th
                  style="
                    text-align: center;
                    font-weight: bold;
                    font-size: smaller;
                    width: 8%;
                  "
                >
                  Mã phân xưởng
                </th>
                <th
                  style="
                    text-align: center;
                    font-weight: bold;
                    font-size: smaller;
                  "
                >
                  Phân xưởng
                </th>
                <th
                  style="
                    text-align: center;
                    font-weight: bold;
                    font-size: smaller;
                  "
                >
                  Ghi chú
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
              </tr>
            </thead>
            <tbody>
              <tr
                style="font-size: smaller"
                v-for="(px, index) in tonhom"
                :key="index"
              >
                <td style="text-align: center">{{ index + 1 }}</td>
                <td style="text-align: center">{{ px.mato }}</td>
                <td>{{ px.tento }}</td>
                <td>{{ px.mapx }}</td>
                <td>{{ px.tenpx }}</td>
                <td>{{ px.ghichu }}</td>
                <td style="text-align: center; color: green">
                  <nuxt-link :to="`/danhmuc/to/${px._id}/manage`">
                    <span class="icon is-small">
                      <i class="far fa-check-circle"></i>
                    </span>
                  </nuxt-link>
                </td>
                <td style="text-align: center">
                  <a @click="onDelete(px)">
                    <span style="color: red" class="icon is-small">
                      <i class="fas fa-times"></i>
                    </span>
                  </a>
                </td>
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
                      Thêm Tổ
                    </p>
                  </div>
                </div>
              </header>
              <section class="modal-card-body">
                <div class="field">
                  <label class="label">Phân xưởng</label>
                  <div class="control has-icons-left">
                    <div class="select is-small is-fullwidth">
                      <select @change="showmapx($event)">
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
                </div>
                <div class="field">
                  <label class="label">Mã tổ</label>
                  <div class="control">
                    <input
                      v-model="form.mato"
                      @blur="$v.form.mato.$touch()"
                      class="input is-small"
                      type="text"
                      placeholder="Nhập mã Tổ"
                    />
                  </div>
                  <div v-if="$v.form.mato.$error" class="form-error">
                    <span v-if="!$v.form.mato.required" class="help is-danger"
                      >Yêu cầu nhập mã Tổ</span
                    >
                  </div>
                </div>
                <div class="field">
                  <label class="label">Tên tổ</label>
                  <div class="control">
                    <input
                      v-model="form.tento"
                      @blur="$v.form.tento.$touch()"
                      class="input is-small"
                      type="text"
                      placeholder="Nhập tên Tổ"
                    />
                  </div>
                  <div v-if="$v.form.tento.$error" class="form-error">
                    <span v-if="!$v.form.tento.required" class="help is-danger"
                      >Yêu cầu nhập tên Tổ</span
                    >
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
                      :disabled="$v.form.$invalid"
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
      tonhom: [],
      phanxuong: [],
      form: {
        mapx: "",
        tenpx: "",
        mato: "",
        tento: "",
        ghichu: null,
        createdAt: null,
        createdBy: this.$auth.$state.user.username,
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
    this.getDmpx();
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

    async getDmpx() {
      this.tonhom = await this.$axios.$get(`/api/phongban/allto`);
      if (this.tonhom.length <= 0) {
        this.$toasted.show("Danh mục tổ rỗng", {
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

    onAddpx() {
      Swal.fire({
        title: "Chắc chắn thêm mới Tổ này?",
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

            this.$axios.$post("/api/phongban/addto", this.form);
            this.getDmpx();

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
        title: "Bạn muốn xóa phân xưởng này?",
        text: "Phân xưởng này sẽ không lấy lại được sau khi xóa!",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          this.$axios
            .$delete(`/api/phongban/tonhom/${px._id}`)
            .then((response) => {
              const index = this.tonhom.findIndex((p) => p._id === px._id); // find the post index
              if (~index)
                // if the post exists in array
                this.tonhom.splice(index, 1); //delete the post
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
