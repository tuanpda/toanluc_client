<template>
    <div class="columns is-mobile">
      <div class="column is-10 is-offset-1">
        <br />
        <div class="box">
          <div class="columns">
            <div class="column">
              <div class="control">
                <span class="icon is-small is-left">
                  <i class="fa fa-cubes"></i>
                </span>
                Danh mục bộ phận
              </div>
            </div>
          </div>
  
          <div class="columns">
            <div class="column is-8">
              <span>Có tất cả: </span>
              <span style="font-weight: bold">{{
                bophan.length | formatNumber
              }}</span>
              <span>Bộ phận</span>
            </div>
            <div class="column" style="text-align: right">
              <button
                @click="isActive = true"
                class="button is-success is-fullwidth is-small"
              >
                <span class="icon is-small">
                  <i class="fas fa-pen-fancy"></i>
                </span>
                <span>Thêm bộ phận</span>
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
                  <th style="text-align: center">Sửa</th>
                  <th style="text-align: center">Xóa</th>
                  <th style="text-align: center">Mã bộ phận</th>
                  <th style="text-align: center">Tên bộ phận</th>
                  <th style="text-align: center">Ghi chú</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(phong, index) in bophan" :key="index">
                  <td style="text-align: center">{{ index + 1 }}</td>
                  <td style="text-align: center; color: green">
                    <nuxt-link :to="`/danhmuc/bophan/${phong._id}/manage`">
                      <span class="icon is-small">
                        <i class="far fa-check-circle"></i>
                      </span>
                    </nuxt-link>
                  </td>
                  <td style="text-align: center">
                    <a @click="onDelete(phong._id, phong.tenbp)">
                      <span style="color: red" class="icon is-small">
                        <i class="fas fa-times"></i>
                      </span>
                    </a>
                  </td>
                  <td style="text-align: center">{{ phong.mabp }}</td>
                  <td>{{ phong.tenbp }}</td>
                  <td>{{ phong.ghichu }}</td>
                </tr>
              </tbody>
            </table>
          </div>
  
          <!-- Modal Add nhân viên -->
          <div class="">
            <!-- Toggle class  -->
            <div :class="{ 'is-active': isActive }" class="modal">
              <div class="modal-background"></div>
              <div class="modal-content modal-card">
                <header class="modal-card-head" style="background-color: #ebfffc">
                  <p
                    class="modal-card-title"
                    style="font-size: 15px; font-weight: bold; color: red"
                  >
                    Thêm mới bộ phận
                  </p>
                  <!-- close modal -->
                  <button
                    @click="isActive = false"
                    class="delete"
                    aria-label="close"
                  ></button>
                </header>
                <section class="modal-card-body">
                  <div class="field">
                    <label class="label">Mã bộ phận</label>
                    <div class="control">
                      <input
                        v-model="form.mabp"
                        @blur="$v.form.mabp.$touch()"
                        class="input is-small"
                        type="text"
                        placeholder="Nhập mã phòng ban"
                      />
                    </div>
                    <div v-if="$v.form.mabp.$error" class="form-error">
                      <span
                        v-if="!$v.form.mabp.required"
                        class="help is-danger"
                        >Yêu cầu nhập mã bộ phận</span
                      >
                    </div>
                  </div>
                  <div class="field">
                    <label class="label">Tên bộ phận</label>
                    <div class="control">
                      <input
                        v-model="form.tenbp"
                        @blur="$v.form.tenbp.$touch()"
                        class="input is-small"
                        type="text"
                        placeholder="Nhập tên phòng ban"
                      />
                    </div>
                    <div v-if="$v.form.tenbp.$error" class="form-error">
                      <span
                        v-if="!$v.form.tenbp.required"
                        class="help is-danger"
                        >Yêu cầu nhập tên bộ phận</span
                      >
                    </div>
                  </div>
                  <div class="field">
                    <label class="label">Diễn giải thêm</label>
                    <div class="control">
                      <textarea
                        v-model="form.ghichu"
                        class="textarea is-small"
                        placeholder="Ghi chú thêm ..."
                      ></textarea>
                    </div>
                  </div>
  
                  <div class="columns">
                    <div class="column">
                      <button
                        :disabled="$v.form.$invalid"
                        @click.prevent="onAddPhongban"
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
                <footer class="modal-card-foot">
                  <!-- close modal -->
                  <button
                    @click="isActive = false"
                    class="button is-outlined is-info is-small"
                  >
                    Đóng
                  </button>
                </footer>
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
        bophan: [],
        form: {
          mabp: null,
          tenbp: null,
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
        mabp: {
          required,
        },
        tenbp: {
          required,
        },
      },
    },
  
    mounted() {
      this.getDsbp();
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
  
      async getDsbp() {
        this.bophan = await this.$axios.$get(`/api/phongban/allbophan`);
        if (this.bophan.length <= 0) {
          this.$toasted.show("Không có danh sách bộ phận", {
            duration: 3000,
            theme: "bubble",
          });
        }
      },
  
      onAddPhongban() {
        Swal.fire({
          title: "Chắc chắn thêm mới bộ phận này?",
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
  
              this.$axios.$post("/api/phongban/addbophan", this.form);
  
              // save log
              this.hisform.tenthaotac = `Thêm danh mục bộ phận, tên: ${this.form.tenbp}`;
              this.hisform.ghichu = `Thêm danh mục bộ phận`;
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
                title: "Thêm mới phòng ban thành công",
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
  
      onDelete(id, tenbp) {
        swal({
          title: "Bạn muốn xóa bộ phận này?",
          text: "Bộ phận này sẽ không lấy lại được sau khi xóa!",
          buttons: true,
          dangerMode: true,
        }).then((willDelete) => {
          if (willDelete) {
            this.$axios.$delete(`/api/phongban/bophan/${id}`);
            swal("Xóa thành công phòng ban, F5 lại trang để thay đổi dữ liệu", {
              icon: "success",
            });
  
            // save log
            this.hisform.tenthaotac = `Xóa danh mục bộ phận, tên: ${tenbp}`;
            this.hisform.ghichu = `Xóa danh mục bộ phận`;
            this.$axios.$post(`/api/logsystem/record-action`, this.hisform);
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
    height: 350px;
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
  