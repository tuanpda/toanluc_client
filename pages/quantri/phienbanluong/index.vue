<template>
  <div class="columns is-mobile">
    <div class="column is-10 is-offset-1">
      <br />
      <div class="box" style="margin-left:10px; margin-right:10px;">
        <div class="columns">
          <div class="column">
            <div class="control">
              <span class="icon is-small is-left">
                <i class="fas fa-camera-retro"></i>
              </span>
              Thiết lập phiên bản đơn giá tiền lương công đoạn
            </div>
          </div>
        </div>

        <div class="columns">
          <div class="column">
            <label style="font-weight: bold;">Tên phiên bản: </label>
            <div class="select is-small">
              <select v-model="phienbanluong">
                <option>V1</option>
                <option>V2</option>
                <option>V3</option>
                <option>V4</option>
                <option>V5</option>
                <option>V6</option>
                <option>V7</option>
                <option>V8</option>
                <option>V9</option>
                <option>V10</option>
              </select>
            </div>
            <br />
            <div>
              <label class="checkbox">
                <input type="checkbox" v-model="checkGhichu" />
                Ghi chú
              </label>
            </div>

            <div v-if="checkGhichu == true" class="field" style="margin-top: 10px;">
              <div class="control">
                <textarea v-model="form.ghichu" class="textarea is-small"
                  placeholder="Diễn giải phiên bản lương"></textarea>
              </div>
            </div>
            <div class="columns">
              <div class="column">
                <button @click="onAddvision" class="button is-success is-fullwidth is-small">
                  <span class="icon is-small">
                    <i class="fas fa-pen-fancy"></i>
                  </span>
                  <span>Tạo phiên bản lương</span>
                </button>
              </div>
              <div class="column">
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
          </div>
        </div>
        <div class="table_wrapper table-height">
          <table class="
                  table
                  is-bordered is-striped is-narrow is-hoverable is-fullwidth
                ">
            <thead>
              <tr>
                <th style="text-align: center">STT</th>
                <th style="text-align: center">Tên</th>
                <th style="text-align: center">KHSP</th>
                <th style="text-align: center">Định mức</th>
                <th style="text-align: center">Đơn giá</th>
                <th style="text-align: center">Lý do</th>
                <th style="text-align: center">Nhóm</th>
                <th style="text-align: center">Định mức 8h</th>
                <th style="text-align: center">Diễn giải</th>
                <th style="text-align: center">Tên SP</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(tensp, index) in nguyencong" :key="index">
                <td style="text-align: center; font-size: small;">
                  {{ index + 1 }}
                </td>
                <td style="text-align: center; font-size: small;">
                  <input type="text" v-model="tensp.nc" class="input is-small" />
                </td>
                <td style="text-align: center; font-size: small;">
                  <input type="text" v-model="tensp.khsp" class="input is-small" />
                </td>
                <td style="text-align: center; font-size: small;">
                  <input type="text" v-model="tensp.dinhmuc" class="input is-small" />
                </td>
                <td style="text-align: center; font-size: small;">
                  <input type="text" v-model="tensp.dongia" class="input is-small" />
                </td>
                <td style="text-align: center; font-size: small;">
                  <input type="text" v-model="tensp.lydo" class="input is-small" />
                </td>
                <td style="text-align: center; font-size: small;">
                  <input type="text" v-model="tensp.nhom" class="input is-small" />
                </td>
                <td style="text-align: center; font-size: small;">
                  <input type="text" v-model="tensp.dinhmuc8h" class="input is-small" />
                </td>
                <td style="font-size: small;">
                  <input type="text" v-model="tensp.diengiai" class="input is-small" />
                </td>
                <td style="font-size: small;">
                  <input type="text" v-model="tensp.tensp" class="input is-small" />
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
import Swal from "sweetalert2";

import {
  required,
  email,
  minLength,
  url,
  sameAs,
} from "vuelidate/lib/validators";
export default {
  middleware: "auth-admin",
  data() {
    return {
      nguyencong: [],
      tableName: [],
      phienbanluong: "",
      phienban: [],
      arrVer: [],
      createdAt: null,
      createdBy: this.$auth.$state.user.username,
      isExits: null,
      checkGhichu: false,
      form: {
        version: "",
        ghichu: "",
        createdAt: null,
        createdBy: this.$auth.$state.user.username,
      },
    };
  },

  validations: {
    form: {
      masp: {
        required,
      },
      tensp: {
        required,
      },
    },
  },

  mounted() {
    this.getNguyencong();
    this.currentDateTime();
    this.getVersion();
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
      this.createdAt = date + " " + time;
      this.form.createdAt = date + " " + time;
    },

    async getNguyencong() {
      this.nguyencong = await this.$axios.$get(
        `/api/nguyencong/getallnguyencong`
      );
      if (this.nguyencong.length <= 0) {
        this.$toasted.show("Danh đơn giá công đoạn không có", {
          duration: 3000,
          theme: "bubble",
        });
      }
    },

    async getVersion() {
      this.phienban = await this.$axios.$get(`/api/nguyencong/getversion`);
      for (let i = 0; i < this.phienban.length; i++) {
        this.arrVer.push(this.phienban[i].version);
      }
      // console.log(this.arrVer);
    },

    onAddvision() {
      Swal.fire({
        title: "Bạn chắc chắn tạo ra phiên bản lương này?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Chắc chắn thêm mới",
      }).then((result) => {
        if (result.isConfirmed) {
          try {
            this.$v.form.$touch();

            this.tableName.push({
              tbl: this.phienbanluong,
            });

            // console.log(this.arrVer.includes(this.phienbanluong));
            this.isExits = this.arrVer.includes(this.phienbanluong);
            // console.log(this.isExits)
            if (this.isExits == false) {
              // console.log("bypass");
              this.$axios.$post(
                "/api/nguyencong/createtabledgc",
                this.tableName
              );
              for (let i = 0; i < this.nguyencong.length; i++) {
                this.nguyencong[i].createdAt = this.createdAt;
                this.nguyencong[i].createdBy = this.createdBy;
                this.nguyencong[i].tname = this.phienbanluong;
                this.$axios.$post(
                  "/api/nguyencong/adddongialuong",
                  this.nguyencong[i]
                );
              }
              this.form.version = this.phienbanluong;
              // console.log(this.form.version);
              this.$axios.$post("/api/nguyencong/addversion", this.form);
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
                title: "Thêm mới phiên bản lương thành công",
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
                title: `Đã tồn tại phiên bản ${this.phienbanluong}`,
              });
            }

            // window.location.reload()
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

.table-height {
  height: 650px;
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
