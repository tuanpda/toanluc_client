<template>
  <div class="columns">
    <div class="column container">
      <br />
      <div class="box" style="margin-left: 3px; margin-right: 3px">
        <div class="columns">
          <div class="column">
            <div class="control">
              <span class="icon is-small is-left">
                <i style="color: #00d1b2" class="fab fa-firstdraft"></i>
              </span>
              <span style="color: #3850b7; font-size: 15px; font-weight: bold"
                >Danh mục Công nhật</span
              >
            </div>
          </div>
        </div>

        <div class="columns">
          <div class="column is-10">
            <span>Có tất cả: </span>
            <span style="font-weight: bold">{{
              congnhat.length | formatNumber
            }}</span>
            <span>danh mục</span>
          </div>
          <div class="column" style="text-align: right">
            <button
              @click="isActive = true"
              class="button is-success is-fullwidth is-small"
            >
              <span class="icon is-small">
                <i class="fas fa-pen-fancy"></i>
              </span>
              <span>Thêm Công</span>
            </button>
          </div>
        </div>
        <div class="table_wrapper">
          <table
            class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth"
          >
            <thead>
              <tr style="background-color: #fffaeb; font-size: small">
                <th style="text-align: center; width: 3%">STT</th>
                <th style="text-align: center; width: 10%">Mã công</th>
                <th style="text-align: center; width: 15%">Tên công</th>
                <th style="text-align: center; width: 10%">Đơn giá</th>
                <th style="text-align: center; width: 10%">Loại lương</th>
                <th style="text-align: center; width: 10%">Loại phân bổ</th>
                <th style="text-align: center">Ghi chú</th>
                <th style="text-align: center; width: 5%">Sửa</th>
                <th style="text-align: center; width: 5%">Xóa</th>
              </tr>
            </thead>
            <tbody>
              <tr
                style="font-size: small"
                v-for="(cn, index) in congnhat"
                :key="index"
              >
                <td style="text-align: center">
                  {{ index + 1 }}
                </td>
                <td>{{ cn.macn }}</td>
                <td>{{ cn.tencn }}</td>
                <td style="text-align: center">
                  {{ cn.dongia | formatNumber }}
                </td>
                <td>{{ cn.loailuong }}</td>
                <td>{{ cn.loaiphanbo }}</td>
                <td>{{ cn.ghichu }}</td>
                <td style="text-align: center; color: green">
                  <a @click="activeModelUpdate(cn)">
                    <span style="color: green" class="icon is-small">
                      <i class="far fa-check-circle"></i>
                    </span>
                  </a>
                </td>
                <td style="text-align: center">
                  <a @click="onDelete(cn)">
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
          <!-- Toggle class  -->
          <div :class="{ 'is-active': isActive }" class="modal">
            <div class="modal-background"></div>
            <div class="modal-content modal-card">
              <section class="modal-card-body">
                <div class="columns is-mobile">
                  <div class="column">
                    <div class="field">
                      <label class="label">Mã Công nhật</label>
                      <div class="control">
                        <input
                          v-model="form.macn"
                          class="input is-small"
                          type="text"
                          placeholder="Nhập mã công nhật"
                        />
                      </div>
                    </div>
                    <div class="field">
                      <label class="label">Tên Công</label>
                      <div class="control">
                        <input
                          v-model="form.tencn"
                          class="input is-small"
                          type="text"
                          placeholder="Nhập tên công nhật"
                        />
                      </div>
                    </div>
                    <div class="field">
                      <label class="label">Đơn giá</label>
                      <div class="control">
                        <input
                          v-model="form.dongia"
                          class="input is-small"
                          type="text"
                          placeholder="Đơn giá"
                        />
                      </div>
                    </div>
                    <div class="field">
                      <label class="label">Loại lương</label>
                      <div class="control">
                        <input
                          v-model="form.loailuong"
                          class="input is-small"
                          type="text"
                          placeholder="Nhập loại lương"
                        />
                      </div>
                    </div>
                    <div class="field">
                      <label class="label">Loại phân bổ</label>
                      <div class="control">
                        <input
                          v-model="form.loaiphanbo"
                          class="input is-small"
                          type="text"
                          placeholder="Nhập loại phân bổ"
                        />
                      </div>
                    </div>
                    <div class="field">
                      <label class="label">Ghi chú</label>
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
                          @click.prevent="onAddCongnhat"
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
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>

        <!-- Modal update -->
        <div class="">
          <!-- Toggle class  -->
          <div :class="{ 'is-active': isActive_update }" class="modal">
            <div class="modal-background"></div>
            <div class="modal-content modal-card">
              <section class="modal-card-body">
                <div class="columns is-mobile">
                  <div class="column">
                    <div v-if="formUpdate != null">
                      <div class="field">
                        <label class="label">Mã công</label>
                        <div class="control">
                          <input
                            v-model="formUpdate.macn"
                            class="input is-small"
                            type="text"
                          />
                        </div>
                      </div>
                      <div class="field">
                        <label class="label">Tên công</label>
                        <div class="control">
                          <input
                            v-model="formUpdate.tencn"
                            class="input is-small"
                            type="text"
                          />
                        </div>
                      </div>
                      <div class="field">
                        <label class="label">Đơn giá</label>
                        <div class="control">
                          <input
                            v-model="formUpdate.dongia"
                            class="input is-small"
                            type="text"
                          />
                        </div>
                      </div>
                      <div class="field">
                        <label class="label">Loại lương</label>
                        <div class="control">
                          <input
                            v-model="formUpdate.loailuong"
                            class="input is-small"
                            type="text"
                          />
                        </div>
                      </div>
                      <div class="field">
                        <label class="label">Loại phân bổ</label>
                        <div class="control">
                          <input
                            v-model="formUpdate.loaiphanbo"
                            class="input is-small"
                            type="text"
                          />
                        </div>
                      </div>
                      <div class="field">
                        <label class="label">Ghi chú</label>
                        <div class="control">
                          <textarea
                            v-model="formUpdate.ghichu"
                            class="textarea is-small"
                          ></textarea>
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
                    </div>
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
import { mapActions } from "vuex";
export default {
  middleware: "auth",
  data() {
    return {
      congnhat: [],
      form: {
        macn: null,
        tencn: null,
        dongia: null,
        loailuong: null,
        loaiphanbo: null,
        ghichu: null,
        createdAt: null,
        createdBy: this.$auth.$state.user.username,
      },

      formUpdate: null,
      updatedAt: null,
      updatedBy: this.$auth.$state.user.username,
      // Modals
      isActive: false,
      isActive_update: false,
    };
  },

  validations: {
    form: {
      maphong: {
        required,
      },
      tenphong: {
        required,
      },
    },
  },

  // load dữ liệu all phòng ban từ store phongban
  // fetch({ store }) {
  //   return store.dispatch("phongban/fetchPhongbans");
  // },

  mounted() {
    this.getDscn();
    this.currentDateTime();
  },

  // computed: {
  //   // load dữ liệu từ store ra DOM
  //   phongbans() {
  //     return this.$store.state.phongban.items;
  //   },
  // },

  isFormValid() {
    return !this.$v.form.$invalid;
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
      this.form.createdAt = date + " " + time;
      this.updatedAt = date + " " + time;
    },

    async getDscn() {
      this.congnhat = await this.$axios.$get(`/api/phongban/alldmcongnhat`);
      if (this.congnhat.length <= 0) {
        this.$toasted.show("Không có danh sách công nhật", {
          duration: 3000,
          theme: "bubble",
        });
      }
    },

    async onAddCongnhat() {
      const result = await Swal.fire({
        title: `Chắc chắn thêm công nhật?`,
        showDenyButton: true,
        confirmButtonText: "Có, Thêm",
        denyButtonText: `Hủy thêm`,
      });
      if (result.isConfirmed) {
        try {
          // thêm dữ liệu
          const response = await this.$axios.$post(
            `/api/phongban/addcongnhat`,
            this.form
          );
          this.getDscn();
          //   console.log(response);
          if (response.success == true) {
            this.$toasted.success("Cập nhật thành công!", {
              duration: 3000,
              theme: "bubble",
            });
          } else {
            this.$toasted.show("Có lỗi xảy ra", {
              duration: 3000,
              theme: "bubble",
            });
          }
        } catch (error) {
          this.$toasted.show("Có lỗi xảy ra", {
            duration: 3000,
            theme: "bubble",
          });
        }
      }
    },

    async activeModelUpdate(cn) {
      this.formUpdate = { ...cn };
      this.isActive_update = true;
    },

    async onUpdate() {
      this.formUpdate.updatedAt = this.updatedAt;
      this.formUpdate.updatedBy = this.updatedBy;
      const response = await this.$axios.$patch(
        `/api/phongban/congnhat/${this.formUpdate._id}`,
        this.formUpdate
      );
      this.getDscn();
      if (response.success == true) {
        this.$toasted.success("Cập nhật thành công!", {
          duration: 3000,
          theme: "bubble",
        });
      } else {
        this.$toasted.show("Có lỗi xảy ra", {
          duration: 3000,
          theme: "bubble",
        });
      }
    },

    async onDelete(cn) {
      const result = await Swal.fire({
        title: `Chắc chắn xóa công nhật?`,
        showDenyButton: true,
        confirmButtonText: "Có, Xóa",
        denyButtonText: `Hủy xóa`,
      });
      if (result.isConfirmed) {
        try {
          // thêm dữ liệu
          const response = await this.$axios.$delete(
            `/api/phongban/congnhat/${cn._id}`
          );
          this.getDscn();
          //   console.log(response);
          if (response.success == true) {
            this.$toasted.success("Xóa thành công!", {
              duration: 3000,
              theme: "bubble",
            });
          } else {
            this.$toasted.show("Có lỗi xảy ra", {
              duration: 3000,
              theme: "bubble",
            });
          }
        } catch (error) {
          this.$toasted.show("Có lỗi xảy ra", {
            duration: 3000,
            theme: "bubble",
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
  height: 350px;
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
