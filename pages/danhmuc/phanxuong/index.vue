<template>
  <div class="columns">
    <div class="column container">
      <br />
      <div class="box" style="margin-left: 100px; margin-right: 100px;">
        <div class="columns">
          <div class="column">
            <div class="control">
              <span class="icon is-small is-left">
                <i style="color: #00d1b2" class="fas fa-gavel"></i>
              </span>
              <span style="color: #3850b7; font-size: 17px; font-weight: bold;">Danh mục phân xưởng</span>
            </div>
          </div>
        </div>

        <div class="columns">
          <div class="column is-8">
            <span>Có tất cả: </span>
            <span style="font-weight: bold">{{
              phanxuong.length | formatNumber
            }}</span>
            <span>phân xưởng</span>
          </div>
          <div class="column" style="text-align: right">
            <button @click="isActive = true" class="button is-success is-fullwidth is-small">
              <span class="icon is-small">
                <i class="fas fa-pen-fancy"></i>
              </span>
              <span>Thêm phân xưởng</span>
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
        <div class="table_wrapper">
          <table class="
                  table
                  is-bordered is-striped is-narrow is-hoverable is-fullwidth
                ">
            <thead>
              <tr style="background-color: #fffaeb;">
                <th style="text-align: center; font-weight: bold; font-size: smaller; width: 3%">STT</th>
                <th style="text-align: center; font-weight: bold; font-size: smaller; width: 5%">Sửa</th>
                <th style="text-align: center; font-weight: bold; font-size: smaller; width: 5%">Xóa</th>
                <th style="text-align: center; font-weight: bold; font-size: smaller; width: 7%">Mã phân xưởng</th>
                <th style="text-align: center; font-weight: bold; font-size: smaller; width: 50%;">Tên phân xưởng</th>
                <th style="text-align: center; font-weight: bold; font-size: smaller;">Diễn giải</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(px, index) in phanxuong" :key="index">
                <td style="text-align: center; font-size: smaller;">{{ index + 1 }}</td>
                <td style="text-align: center; color: green">
                  <nuxt-link :to="`/danhmuc/phanxuong/${px._id}/manage`">
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
                <td style="font-size: smaller;">{{ px.mapx }}</td>
                <td style="font-size: smaller;">{{ px.tenpx }}</td>
                <td style="font-size: smaller;">{{ px.diengiai }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Modal Add -->
        <div class="">
          <div :class="{ 'is-active': isActive }" class="modal">
            <div class="modal-background"></div>
            <div class="modal-content modal-card">
              <header style="background-color: #3e8ed0; border-top-left-radius: 8px; border-top-right-radius: 8px;">
                <div class="columns">
                  <div class="column is-9">
                    <p style="font-size: small; font-weight: bold; color: white; padding: 15px;">
                      <span class="icon is-small is-left">
                        <i style="color: #ffd863ff" class="fas fa-feather-alt"></i>
                      </span>
                      Thêm Phân xưởng
                    </p>
                  </div>
                  <div class="column" style="text-align:right;">
                    <a @click="isActive = false">
                      <span style="color: red; padding: 20px;" class="icon is-small">
                        <i class="fas fa-power-off"></i>
                      </span>
                    </a>
                  </div>
                </div>
              </header>
              <section class="modal-card-body">
                <div class="field">
                  <label class="label">Mã phân xưởng</label>
                  <div class="control">
                    <input v-model="form.mapx" @blur="$v.form.mapx.$touch()" class="input is-small" type="text"
                      placeholder="Nhập mã phân xưởng" />
                  </div>
                  <div v-if="$v.form.mapx.$error" class="form-error">
                    <span v-if="!$v.form.mapx.required" class="help is-danger">Yêu cầu nhập mã phân xưởng</span>
                  </div>
                </div>
                <div class="field">
                  <label class="label">Tên phân xưởng</label>
                  <div class="control">
                    <input v-model="form.tenpx" @blur="$v.form.tenpx.$touch()" class="input is-small" type="text"
                      placeholder="Nhập tên phân xưởng" />
                  </div>
                  <div v-if="$v.form.tenpx.$error" class="form-error">
                    <span v-if="!$v.form.tenpx.required" class="help is-danger">Yêu cầu nhập tên phân xưởng</span>
                  </div>
                </div>
                <div class="field">
                  <label class="label">Diễn giải thêm</label>
                  <div class="control">
                    <textarea v-model="form.ghichu" class="textarea is-small" placeholder="Ghi chú thêm ..."></textarea>
                  </div>
                </div>

                <div class="columns">
                  <div class="column">
                    <button :disabled="$v.form.$invalid" @click.prevent="onAddpx"
                      class="button is-success is-fullwidth is-small">
                      Ghi nhận
                    </button>
                  </div>
                  <div class="column">
                    <button @click="isActive = false" class="button is-danger is-light is-fullwidth is-small">
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
      phanxuong: [],
      form: {
        mapx: null,
        tenpx: null,
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
    };
  },

  validations: {
    form: {
      mapx: {
        required,
      },
      tenpx: {
        required,
      },
    },
  },

  mounted() {
    this.getDmpx();
    this.currentDateTime();
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
      this.phanxuong = await this.$axios.$get(`/api/phongban/allphanxuong`);
      if (this.phanxuong.length <= 0) {
        this.$toasted.show("Danh mục phân xưởng rỗng", {
          duration: 3000,
          theme: "bubble",
        });
      }
    },

    onAddpx() {
      Swal.fire({
        title: "Chắc chắn thêm mới phân xưởng này?",
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

            this.$axios.$post("/api/phongban/addphanxuong", this.form);
            this.getDmpx()

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
              title: "Thêm mới danh mục phân xưởng thành công",
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

    onDelete(px) {
      swal({
        title: "Bạn muốn xóa phân xưởng này?",
        text: "Phân xưởng này sẽ không lấy lại được sau khi xóa!",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          this.$axios.$delete(`/api/phongban/phanxuong/${px._id}`)
            .then(response => {
              const index = this.phanxuong.findIndex(p => p._id === px._id) // find the post index 
              if (~index) // if the post exists in array
                this.phanxuong.splice(index, 1) //delete the post
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
