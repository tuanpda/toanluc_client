<template>
  <div class="columns is-mobile">
    <div class="column is-10 is-offset-1">
      <br />
      <div class="box">
        <div class="columns">
          <div class="column">
            <div class="control">
              <span class="icon is-small is-left">
                <i class="fa fa-expeditedssl"></i>
              </span>
              Quản trị người dùng
            </div>
          </div>
        </div>
        <div class="columns">
          <div class="column is-8">
            <span>Có tất cả: </span>
            <span style="font-weight: bold">{{
              taikhoan.length | formatNumber
            }}</span>
            <span>tài khoản</span>
          </div>
          <div class="column" style="text-align: right">
            <button @click="isActive = true" class="button is-success is-fullwidth is-small">
              Thêm mới người dùng
            </button>
          </div>
          <div class="column" style="text-align: right">
            <nuxt-link :to="`/`">
              <button class="button is-info is-fullwidth is-small">
                Thoát
              </button>
            </nuxt-link>
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
                <th style="text-align: center">Sửa</th>
                <th style="text-align: center">Xóa</th>
                <th style="text-align: center">Tên đăng nhập</th>
                <th style="text-align: center">Họ tên</th>
                <th style="text-align: center">Quyền</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(nv, index) in taikhoan" :key="index">
                <td style="text-align: center">{{ index + 1 }}</td>
                <td style="text-align: center; color: green">
                  <nuxt-link :to="`/quantri/admin/users/${nv._id}/manage`">
                    <span class="icon is-small">
                      <i class="far fa-check-circle"></i>
                    </span>
                  </nuxt-link>
                </td>
                <td style="text-align: center">
                  <a @click="onDelete(nv._id, nv.username)">
                    <span style="color: red" class="icon is-small">
                      <i class="fas fa-times"></i>
                    </span>
                  </a>
                </td>
                <td>{{ nv.username }}</td>
                <td>{{ nv.name }}</td>
                <td style="text-align: center">{{ nv.role }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- Modal thêm tài khoản -->
        <div class="">
          <!-- Toggle class  -->
          <div :class="{ 'is-active': isActive }" class="modal">
            <div class="modal-background"></div>
            <div class="modal-content modal-card">
              <header class="modal-card-head" style="background-color: #ebfffc">
                <p class="modal-card-title" style="font-size: 15px; font-weight: bold; color: red">
                  Thêm mới tài khoản người dùng
                </p>
                <!-- close modal -->
                <button @click="isActive = false" class="delete" aria-label="close"></button>
              </header>
              <section class="modal-card-body">
                <div class="field">
                  <label class="label">Tên người dùng</label>
                  <div class="control">
                    <input v-model="form.username" @blur="$v.form.username.$touch()" class="input is-small" type="text"
                      placeholder="Nhập tên tài khoản người dùng" />
                  </div>
                  <div v-if="$v.form.username.$error" class="form-error">
                    <span v-if="!$v.form.username.required" class="help is-danger">Yêu cầu nhập tên đăng nhập</span>
                    <span v-if="!$v.form.username.minLength" class="help is-danger">Tên ít nhất 3 ký tự</span>
                  </div>
                </div>
                <div class="field">
                  <label class="label">Chọn xưởng</label>
                  <div class="control">
                    <div class="control has-icons-left">
                      <div class="select is-small is-fullwidth">
                        <select @change="showmapx($event)">
                          <option selected>-- Chọn phân xưởng --</option>
                          <option v-for="item in phanxuong" :value="item.tenpx">
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
                <div class="field">
                  <label class="label">Họ tên</label>
                  <div class="control">
                    <input v-model="form.name" @blur="$v.form.name.$touch()" class="input is-small" type="text"
                      placeholder="Nhập họ tên người dùng" />
                  </div>
                  <div v-if="$v.form.name.$error" class="form-error">
                    <span v-if="!$v.form.name.required" class="help is-danger">Yêu cầu nhập họ tên</span>
                    <span v-if="!$v.form.name.minLength" class="help is-danger">Họ tên ít nhất 6 ký tự</span>
                  </div>
                </div>
                <div class="columns">
                  <div class="column">
                    <div class="field">
                      <label class="label">Mật khẩu</label>
                      <div class="control">
                        <input v-model="form.password" @blur="$v.form.password.$touch()" class="input is-small"
                          type="password" placeholder="Nhập vào mật khẩu" />
                      </div>
                      <div v-if="$v.form.password.$error" class="form-error">
                        <span v-if="!$v.form.password.required" class="help is-danger">Yêu cầu nhập mật khẩu</span>
                        <span v-if="!$v.form.password.minLength" class="help is-danger">Mật khẩu ít nhất 6 ký tự</span>
                      </div>
                    </div>
                  </div>
                  <div class="column">
                    <div class="field">
                      <label class="label">Nhập lại mật khẩu</label>
                      <div class="control">
                        <input v-model="form.passwordConfirmation" @blur="$v.form.passwordConfirmation.$touch()"
                          class="input is-small" type="password" placeholder="Nhập lại mật khẩu" />
                      </div>
                      <div v-if="$v.form.passwordConfirmation.$error" class="form-error">
                        <span v-if="!$v.form.passwordConfirmation.required" class="help is-danger">Yêu nhập cầu xác nhận
                          mật khẩu</span>
                        <span v-if="!$v.form.passwordConfirmation.sameAs" class="help is-danger">Xác nhận mật khẩu phải
                          trùng với mật khẩu đã
                          nhập</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="columns">
                  <div class="column">
                    <div class="field">
                      <label class="label">Phân quyền</label>
                      <div class="field">
                        <multiselect v-model="dmrole" :options="role" :custom-label="nameWithRole"
                          placeholder="Chọn quyền hệ thống" label="quyen" track-by="quyen" style="font-size:12px;">
                        </multiselect>
                      </div>
                    </div>
                  </div>
                  <div class="column"></div>
                </div>
                <div class="columns">
                  <div class="column is-8">
                    <div class="field">
                      <label class="label">Chọn ảnh hồ sơ</label>
                      <div class="file is-info has-name is-small">
                        <label class="file-label">
                          <input @change="onFileChange" class="file-input" type="file" name="resume" />
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
                    <div v-if="url" class="column">
                      <div id="preview" class="box">
                        <img :src="url" />
                      </div>
                    </div>
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
                    <button :disabled="$v.form.$invalid" @click.prevent="[get_role(), onAddUser()]"
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
              <footer class="modal-card-foot">
                <!-- close modal -->
                <button @click="isActive = false" class="button is-outlined is-info is-small">
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
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.min.css";
import { required, sameAs, minLength } from "vuelidate/lib/validators";
export default {
  middleware: "auth-admin",
  data() {
    return {
      phanxuong: [],
      taikhoan: [],
      ds_congnhan: [],
      role: [],
      dmrole: [],
      isActive: false,
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
        createdAt: null,
        maxuong: "",
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
        required,
        minLength: minLength(6),
      },
      passwordConfirmation: {
        required,
        sameAs: sameAs("password"),
      },
    },
  },

  mounted() {
    this.get_users();
    this.currentDateTime();
    this.getRole();
    this.getPhanxuong()
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
      this.hisform.createdAt = date + " " + time;
    },

    async getPhanxuong() {
      this.phanxuong = await this.$axios.$get(`/api/phongban/allphanxuong`);
    },

    async showmapx(e) {
      var name = e.target.options[e.target.options.selectedIndex].text;
      let position = name.split("--");
      // console.log(position)
      this.form.maxuong = position[0].trim();
      // console.log(position[0].trim())
      // console.log(position[1].trim())
      // console.log(this.form)

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

    // get all data
    async get_users() {
      this.taikhoan = await this.$axios.$get(`/api/users/`);
    },

    // get all data role
    async getRole() {
      this.role = await this.$axios.$get(`/api/users/role`);
    },

    get_role() {
      this.form.role = this.dmrole.quyen;
    },

    onAddUser() {
      Swal.fire({
        title: "Chắc chắn thêm mới user này?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Chắc chắn thêm mới",
      }).then((result) => {
        if (result.isConfirmed) {
          try {
            this.$v.form.$touch();
            let data = new FormData();
            data.append("username", this.form.username);
            data.append("name", this.form.name);
            data.append("password", this.form.password);
            data.append("role", this.form.role);
            data.append("createdAt", this.form.createdAt);
            data.append("createdBy", this.$auth.$state.user.username);
            if (this.selectedFile) {
              data.append("avatar", this.selectedFile, this.selectedFile.name);
            } else {
              data.append("avatar", this.form.avatar);
            }
            data.append("ghichu", this.form.ghichu);
            data.append("maxuong", this.form.maxuong)
            let user = {
              username: this.form.username,
              name: this.form.name,
              password: this.form.password,
              role: this.form.role,
              createdAt: this.form.createdAt,
              createdBy: this.$auth.$state.user.username,
              ghichu: this.form.ghichu,
              maxuong: this.form.maxuong
            }
            this.$axios.$post("/api/users/account", data)
              .then(response => {
                this.get_users();
              });
            // console.log(this.taikhoan)

            // save log
            this.hisform.tenthaotac = `Thêm tài khoản sử dụng phần mềm, tên tài khoản là: ${this.form.username}`;
            this.hisform.ghichu = `Thêm mới một tài khoản người dùng`;
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
              title: "Thêm mới người dùng thành công",
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

    onDelete(id, user) {
      swal({
        title: `Bạn muốn xóa user ${user}?`,
        text: "User này sẽ không lấy lại được sau khi xóa!",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          this.$axios.$delete(`/api/users/${id}`)
            .then(response => {
              const index = this.taikhoan.findIndex(acc => acc._id === id) // find the post index 
              if (~index) // if the post exists in array
                this.taikhoan.splice(index, 1) //delete the post
            });
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 1000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener("mouseenter", Swal.stopTimer);
              toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
          });
          Toast.fire({
            icon: "success",
            title: `Đã xóa user: ${user}`,
          });
          // save log
          this.hisform.tenthaotac = `Xóa tài khoản sử dụng phần mềm, tên tài khoản là: ${user}`;
          this.hisform.ghichu = `Xóa tài khoản người dùng`;
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
  width: 820px;
  height: 560px;
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
