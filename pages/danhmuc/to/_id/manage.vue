<template>
  <div class="columns">
    <div class="column container">
      <br />
      <div class="box" style="margin-left: 3px; margin-right: 3px">
        <div class="columns">
          <div class="column is-8">
            <nuxt-link :to="`/danhmuc/to/`">
              <button class="button is-small is-info is-rounded">
                <span class="icon is-small">
                  <i class="fas fa-angle-double-left"></i>
                </span>
                <span>Quay lại</span>
              </button>
            </nuxt-link>
          </div>
          <div class="column" style="text-align: right">
            <span id="tag-fix">Mã Tổ: {{ tonhom.mato }}</span>
          </div>
        </div>
        <div class="columns">
          <div class="column">
            <div class="columns">
              <div class="column">
                <div class="field">
                  <label class="label">Phân xưởng</label>
                  <div class="control">
                    <input
                      v-model="form.tenpx"
                      class="input is-small"
                      type="text"
                      disabled
                    />
                  </div>
                </div>
              </div>
              <div class="column">
                <div class="field">
                  <label class="label">Thay đổi Phân xưởng</label>
                  <div class="control has-icons-left">
                    <div class="select is-small is-fullwidth">
                      <select @change="showmapx($event)">
                        <option selected>-- Đổi phân xưởng --</option>
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
              </div>
            </div>
            <div class="field">
              <label class="label">Mã Tổ</label>
              <div class="control">
                <input
                  v-model="form.mato"
                  @blur="$v.form.mato.$touch()"
                  class="input is-small"
                  type="text"
                  placeholder="Nhập mã phòng ban"
                />
              </div>
              <div v-if="$v.form.mato.$error" class="form-error">
                <span v-if="!$v.form.mato.required" class="help is-danger"
                  >Yêu cầu nhập mã Tổ</span
                >
              </div>
            </div>
            <div class="field">
              <label class="label">Tên Tổ</label>
              <div class="control">
                <input
                  v-model="form.tento"
                  @blur="$v.form.tento.$touch()"
                  class="input is-small"
                  type="text"
                  placeholder="Nhập tên phòng ban"
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
                <nuxt-link :to="`/danhmuc/phongban/`"
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
  middleware: "auth-luong",
  data() {
    return {
      tonhom: [],
      phanxuong: [],
      form: {
        mapx: "",
        tenpx: "",
        mato: "",
        tento: "",
        ghichu: "",
        updatedAt: null,
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
      mato: {
        required,
      },
      tento: {
        required,
      },
    },
  },

  isFormValid() {
    return !this.$v.form.$invalid;
  },

  async fetch() {
    this.tonhom = await this.$axios.$get(
      `/api/phongban/tonhom/${this.$route.params.id}`
    );
    this.form.mapx = this.tonhom.mapx;
    this.form.tenpx = this.tonhom.tenpx;
    this.form.mato = this.tonhom.mato;
    this.form.tento = this.tonhom.tento;
    this.form.ghichu = this.tonhom.ghichu;
    this.form.createdAt = this.tonhom.createdAt;
    this.form.createdBy = this.tonhom.createdBy;
  },

  mounted() {
    this.currentDateTime();
    this.get_phanxuong();
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
    },

    onUpdate() {
      Swal.fire({
        title: "Chắc chắn cập nhật thông tin Tổ này?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Chắc chắn cập nhật",
      }).then((result) => {
        if (result.isConfirmed) {
          try {
            this.$axios.$patch(
              `/api/phongban/tonhom/${this.$route.params.id}`,
              this.form,
              {}
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
              title: "Cập nhật thông tin thành công",
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
