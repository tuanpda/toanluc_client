<template>
  <div class="columns is-mobile">
    <div class="column is-three-fifths is-offset-one-fifth">
      <br />
      <div class="box">
        <div class="columns">
          <div class="column is-8">
            <nuxt-link :to="`/quantri/admin/users/admin`">
              <button class="button is-small is-info is-rounded">
                <span class="icon is-small">
                  <i class="fas fa-angle-double-left"></i>
                </span>
                <span>Quay lại</span>
              </button>
            </nuxt-link>
          </div>
          <div class="column" style="text-align: right">
            <span id="tag-fix">Mã User: {{ user._id }}</span>
          </div>
        </div>
        <div>
          <div class="field">
            <label class="label">Tên người dùng</label>
            <div class="control">
              <input
                v-model="form.username"
                @blur="$v.form.username.$touch()"
                class="input is-small"
                type="text"
                placeholder="Nhập tên tài khoản người dùng"
              />
            </div>
            <div v-if="$v.form.username.$error" class="form-error">
              <span v-if="!$v.form.username.required" class="help is-danger"
                >Yêu cầu nhập tên đăng nhập</span
              >
              <span v-if="!$v.form.username.minLength" class="help is-danger"
                >Tên ít nhất 3 ký tự</span
              >
            </div>
          </div>
          <div class="field">
            <label class="label">Họ tên</label>
            <div class="control">
              <input
                v-model="form.name"
                @blur="$v.form.name.$touch()"
                class="input is-small"
                type="text"
                placeholder="Nhập họ tên người dùng"
              />
            </div>
            <div v-if="$v.form.name.$error" class="form-error">
              <span v-if="!$v.form.name.required" class="help is-danger"
                >Yêu cầu nhập họ tên</span
              >
              <span v-if="!$v.form.name.minLength" class="help is-danger"
                >Họ tên ít nhất 6 ký tự</span
              >
            </div>
          </div>
          <div class="columns">
            <div class="column">
              <div class="field">
                <label class="label"
                  >Nhập mật khẩu mới (nếu cần thay đổi)</label
                >
                <div class="control">
                  <input
                    v-model="form.password"
                    @blur="$v.form.password.$touch()"
                    class="input is-small"
                    type="password"
                    placeholder="Nhập vào mật khẩu"
                  />
                </div>
                <div v-if="$v.form.password.$error" class="form-error">
                  <span v-if="!$v.form.password.required" class="help is-danger"
                    >Yêu cầu nhập mật khẩu</span
                  >
                  <span
                    v-if="!$v.form.password.minLength"
                    class="help is-danger"
                    >Mật khẩu ít nhất 6 ký tự</span
                  >
                </div>
              </div>
            </div>
            <div class="column">
              <div class="field">
                <label class="label">Nhập lại mật khẩu</label>
                <div class="control">
                  <input
                    v-model="form.passwordConfirmation"
                    @blur="$v.form.passwordConfirmation.$touch()"
                    class="input is-small"
                    type="password"
                    placeholder="Nhập lại mật khẩu"
                  />
                </div>
                <div
                  v-if="$v.form.passwordConfirmation.$error"
                  class="form-error"
                >
                  <span
                    v-if="!$v.form.passwordConfirmation.required"
                    class="help is-danger"
                    >Yêu nhập cầu xác nhận mật khẩu</span
                  >
                  <span
                    v-if="!$v.form.passwordConfirmation.sameAs"
                    class="help is-danger"
                    >Xác nhận mật khẩu phải trùng với mật khẩu đã nhập</span
                  >
                </div>
              </div>
            </div>
          </div>
          <div class="columns">
            <div class="column">
              <span>Quyền hiện tại: {{ user.role }}</span>
            </div>
            <div class="column">
              <div class="field">
                <label class="label">Gán lại quyền</label>
                <div class="field">
                  <multiselect
                    v-model="dmrole"
                    :options="role"
                    :custom-label="nameWithRole"
                    placeholder="Chọn quyền hệ thống"
                    label="quyen"
                    track-by="quyen"
                    style="font-size: 12px"
                  ></multiselect>
                </div>
              </div>
            </div>
          </div>
          <div class="columns">
            <div class="column is-8">
              <div class="field">
                <label class="label">Chọn lại ảnh hồ sơ</label>
                <div class="file is-info has-name is-small">
                  <label class="file-label">
                    <input
                      @change="onFileChange"
                      class="file-input"
                      type="file"
                      name="resume"
                    />
                    <span class="file-cta">
                      <span class="file-icon">
                        <i class="fas fa-upload"></i>
                      </span>
                      <span class="file-label"> Chọn ảnh </span>
                    </span>
                    <span class="file-name">
                      {{ fileName }}
                    </span>
                  </label>
                </div>
              </div>
            </div>
            <div class="column">
              <div v-if="form.avatar && !url" class="column">
                <div id="preview" class="box">
                  <img :src="form.avatar" />
                </div>
              </div>
              <div v-if="url" class="column">
                <div id="preview" class="box">
                  <img :src="url" />
                </div>
              </div>
            </div>
          </div>
          <div class="field">
            <label class="label">Người tạo: {{ form.createdBy }}</label>
            <label class="label">Ngày tạo: {{ form.createdAt }}</label>
            <label class="label">Cập nhật lần cuối: {{ user.updatedAt }}</label>
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
                @click.prevent="[get_role(), onUpdate()]"
                class="button is-success is-fullwidth is-small"
              >
                Ghi nhận
              </button>
            </div>
            <div class="column">
              <nuxt-link :to="`/quantri/admin/users/admin`">
                <button class="button is-danger is-light is-fullwidth is-small">
                  Quay lại
                </button>
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.min.css";
import { required, sameAs, minLength } from "vuelidate/lib/validators";
export default {
  middleware: "auth",
  data() {
    return {
      user: [],
      role: [],
      dmrole: [],
      url: null,
      fileName: "",
      selectedFile: null,
      file: null,
      form: {
        username: null,
        name: null,
        password: null,
        passwordConfirmation: null,
        role: null,
        avatar: null,
        ghichu: null,
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
      username: {
        required,
        minLength: minLength(3),
      },
      name: {
        required,
        minLength: minLength(6),
      },
      password: {
        minLength: minLength(6),
      },
      passwordConfirmation: {
        sameAs: sameAs("password"),
      },
    },
  },

  isFormValid() {
    return !this.$v.form.$invalid;
  },

  async fetch() {
    this.user = await this.$axios.$get(`/api/users/${this.$route.params.id}`);
    this.form.username = this.user.username;
    this.form.name = this.user.name;
    this.form.role = this.user.role;
    this.form.createdAt = this.user.createdAt;
    this.form.createdBy = this.user.createdBy;
    this.form.avatar = this.user.avatar;
    this.form.ghichu = this.user.ghichu;
  },

  mounted() {
    this.currentDateTime();
    this.getRole();
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

    onFileChange(e) {
      this.fileName = e.target.files[0];
      this.url = URL.createObjectURL(this.fileName);
      this.fileName = e.target.files[0].name;
      this.selectedFile = e.target.files[0];
    },

    nameWithRole({ quyen, tenquyen }) {
      return `${quyen} - ${tenquyen}`;
    },

    // get all data role
    async getRole() {
      this.role = await this.$axios.$get(`/api/users/role`);
    },

    get_role() {
      this.form.role = this.dmrole.quyen;
    },

    onUpdate() {
      Swal.fire({
        title: "Chắc chắn cập nhật thông tin nhân viên này?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Chắc chắn cập nhật",
      }).then((result) => {
        if (result.isConfirmed) {
          try {
            let data = new FormData();
            data.append("username", this.form.username);
            data.append("name", this.form.name);
            //  Nếu thay đổi mật khẩu
            if (this.form.password) {
              data.append("password", this.form.password);
            }
            if (this.dmrole.length <= 0) {
              data.append("role", this.user.role);
            } else {
              data.append("role", this.form.role);
            }
            data.append("updatedAt", this.form.updatedAt);
            /* Nếu thay đổi avatar */
            if (this.selectedFile) {
              data.append("avatar", this.selectedFile, this.selectedFile.name);
            } else {
              data.append("avatar", this.form.avatar);
            }
            data.append("ghichu", this.form.ghichu);

            this.$axios.$patch(
              `/api/users/user/${this.$route.params.id}`,
              data,
              {}
            );
            // save log
            this.hisform.tenthaotac = `Cập nhật tài khoản ngươi dùng, tên tài khoản là: ${this.user.username}`;
            this.hisform.ghichu = `Cập nhật tài khoản người dùng`;
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
  width: 90px;
  height: 90px;
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
