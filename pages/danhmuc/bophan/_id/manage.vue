<template>
    <div class="columns is-mobile">
      <div class="column is-three-fifths is-offset-one-fifth">
        <br />
        <div class="box">
          <div class="columns">
            <div class="column is-8">
              <nuxt-link :to="`/danhmuc/bophan/`">
                <button class="button is-small is-info is-rounded">
                  <span class="icon is-small">
                    <i class="fas fa-angle-double-left"></i>
                  </span>
                  <span>Quay lại</span>
                </button>
              </nuxt-link>
            </div>
            <div class="column" style="text-align: right">
              <span id="tag-fix">Mã bộ phận: {{ bophan.mabp }}</span>
            </div>
          </div>
          <div class="columns">
            <div class="column">
              <div class="field">
                <label class="label">Mã bộ phận</label>
                <div class="control">
                  <input
                    v-model="form.mabp"
                    @blur="$v.form.mabp.$touch()"
                    class="input is-small"
                    type="text"
                    placeholder="Nhập mã bộ phận"
                  />
                </div>
                <div v-if="$v.form.mabp.$error" class="form-error">
                  <span v-if="!$v.form.mabp.required" class="help is-danger"
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
                  <span v-if="!$v.form.tenbp.required" class="help is-danger"
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
                    @click.prevent="onUpdate"
                    class="button is-success is-fullwidth is-small"
                  >
                    Ghi nhận
                  </button>
                </div>
                <div class="column">
                  <nuxt-link :to="`/danhmuc/chucvu/`"
                    ><button
                      class="button is-danger is-light is-fullwidth is-small"
                    >
                      Hủy bỏ
                    </button>
                  </nuxt-link>
                </div>
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
          updatedAt: null,
          createdBy: null,
        },
        hisform: {
          tenthaotac: null,
          createdAt: null,
          createdBy: this.$auth.$state.user.username,
          ghichu: null,
        },
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
  
    isFormValid() {
      return !this.$v.form.$invalid;
    },
  
    async fetch() {
      this.bophan = await this.$axios.$get(
        `/api/phongban/bophan/${this.$route.params.id}`
      );
      this.form.mabp = this.bophan.mabp;
      this.form.tenbp = this.bophan.tenbp;
      this.form.ghichu = this.bophan.ghichu;
      this.form.createdAt = this.bophan.createdAt;
      this.form.createdBy = this.bophan.createdBy;
    },
  
    mounted() {
      this.currentDateTime();
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
        this.form.updatedAt = date + " " + time;
        this.hisform.createdAt = date + " " + time;
      },
  
      onUpdate() {
        Swal.fire({
          title: "Chắc chắn cập nhật thông tin bộ phận này?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Chắc chắn cập nhật",
        }).then((result) => {
          if (result.isConfirmed) {
            try {
              this.$axios.$patch(
                `/api/phongban/bophan/${this.$route.params.id}`,
                this.form,
                {}
              );
              // save log
              this.hisform.tenthaotac = `Cập nhật danh mục bộ phận, tên: ${this.form.tenbp}`;
              this.hisform.ghichu = `Cập nhật danh mục bộ phận`;
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
                title: "Cập nhật thông tin thành công",
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
    },
  };
  </script>
  
  <style scoped>
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
    max-width: 200px;
    max-height: 200px;
  }
  #show {
    font-weight: bold;
  }
  #tag-fix {
    background-color: #eff5fb;
    padding: 6px;
    padding-left: 10px;
    padding-right: 10px;
    border: 1px solid #ffd257;
    font-weight: bold;
    font-size: 14px;
    color: #f14668;
  }
  </style>
  