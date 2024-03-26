<template>
  <div class="columns">
    <div class="column container">
      <br />
      <div class="box" style="margin-left: 3px; margin-right: 3px">
        <div class="columns">
          <div class="column">
            <div class="control">
              <span class="icon is-small is-left">
                <i style="color: #00d1b2" class="fas fa-award"></i>
              </span>
              <span style="color: #3850b7; font-size: 15px; font-weight: bold"
                >Danh mục Chức vụ</span
              >
            </div>
          </div>
        </div>

        <div class="columns">
          <div class="column is-10">
            <span>Có tất cả: </span>
            <span style="font-weight: bold">{{
              chucvu.length | formatNumber
            }}</span>
            <span>danh mục chức vụ</span>
          </div>
          <div class="column" style="text-align: right">
            <button
              @click="isActive = true"
              class="button is-success is-fullwidth is-small"
            >
              Thêm chức vụ
            </button>
          </div>
        </div>
        <div class="table_wrapper">
          <table
            class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth"
          >
            <thead>
              <tr style="font-size: small">
                <th style="text-align: center; width: 5%">STT</th>
                <th style="text-align: center; width: 10%">Mã chức vụ</th>
                <th style="text-align: center; width: 20%">Tên chức vụ</th>
                <th style="text-align: center">Ghi chú</th>
                <th style="text-align: center; width: 7%">Sửa</th>
                <th style="text-align: center; width: 7%">Xóa</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(chucvu, index) in chucvu"
                :key="index"
                style="font-size: small"
              >
                <td style="text-align: center">{{ index + 1 }}</td>
                <td style="text-align: center">{{ chucvu.macv }}</td>
                <td>{{ chucvu.chucvu }}</td>
                <td>{{ chucvu.ghichu }}</td>
                <td style="text-align: center; color: green">
                  <nuxt-link :to="`/danhmuc/chucvu/${chucvu._id}/manage`">
                    <span class="icon is-small">
                      <i class="far fa-check-circle"></i>
                    </span>
                  </nuxt-link>
                </td>
                <td style="text-align: center">
                  <a @click="onDelete(chucvu._id, chucvu.chucvu)">
                    <span style="color: red" class="icon is-small">
                      <i class="fas fa-times"></i>
                    </span>
                  </a>
                </td>
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
              <div class="columns is-mobile">
                <div class="column">
                  <section class="modal-card-body">
                    <div class="field">
                      <label class="label">Mã chức vụ</label>
                      <div class="control">
                        <input
                          v-model="form.macv"
                          @blur="$v.form.macv.$touch()"
                          class="input is-small"
                          type="text"
                          placeholder="Nhập mã phòng ban"
                        />
                      </div>
                      <div v-if="$v.form.macv.$error" class="form-error">
                        <span
                          v-if="!$v.form.macv.required"
                          class="help is-danger"
                          >Yêu cầu nhập mã chức vụ</span
                        >
                      </div>
                    </div>
                    <div class="field">
                      <label class="label">Tên chức vụ</label>
                      <div class="control">
                        <input
                          v-model="form.chucvu"
                          @blur="$v.form.chucvu.$touch()"
                          class="input is-small"
                          type="text"
                          placeholder="Nhập tên phòng ban"
                        />
                      </div>
                      <div v-if="$v.form.chucvu.$error" class="form-error">
                        <span
                          v-if="!$v.form.chucvu.required"
                          class="help is-danger"
                          >Yêu cầu nhập tên chức vụ</span
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
                          @click.prevent="onAddchucvu"
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
  middleware: "auth-luong",
  data() {
    return {
      chucvu: [],
      form: {
        macv: null,
        chucvu: null,
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
      macv: {
        required,
      },
      chucvu: {
        required,
      },
    },
  },

  mounted() {
    this.getDspb();
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

    async getDspb() {
      this.chucvu = await this.$axios.$get(`/api/chucvu/allchucvu`);
      if (this.chucvu.length <= 0) {
        this.$toasted.show("Danh mục chức vụ rỗng", {
          duration: 3000,
          theme: "bubble",
        });
      }
    },

    onAddchucvu() {
      Swal.fire({
        title: "Chắc chắn thêm mới chức vụ này?",
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

            this.$axios.$post("/api/chucvu/addchucvu", this.form);

            // save log
            this.hisform.tenthaotac = `Thêm danh mục chức vụ, tên: ${this.form.chucvu}`;
            this.hisform.ghichu = `Thêm mới danh mục chức vụ`;
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
              title: "Thêm mới chức vụ thành công",
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

    onDelete(id, chucvu) {
      swal({
        title: "Bạn muốn xóa chức vụ ban này?",
        text: "Chức vụ này sẽ không lấy lại được sau khi xóa!",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          this.$axios.$delete(`/api/chucvu/${id}`);
          swal("Xóa thành công chức vụ, F5 lại trang để thay đổi dữ liệu", {
            icon: "success",
          });
          // save log
          this.hisform.tenthaotac = `Xóa danh mục chức vụ, tên: ${chucvu}`;
          this.hisform.ghichu = `Xóa danh mục chức vụ`;
          this.$axios.$post(`/api/logsystem/record-action`, this.hisform);
        } else {
          swal("Bạn đã hủy xóa chức vụ");
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

@media (max-width: 768px) {
  .modal-card {
    width: 90%;
    max-width: 400px;
  }
}
</style>
