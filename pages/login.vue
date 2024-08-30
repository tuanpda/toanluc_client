<template>
  <section class="hero is-success is-fullheight">
    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="column is-4 is-offset-4">
          <div class="box" style="margin-top: 10px">
            <p class="subtitle is-4">Đăng nhập vào hệ thống</p>
            <br />
            <form>
              <div class="field">
                <div class="control has-icons-left has-icons-right">
                  <input
                    class="input is-normal is-primary"
                    type="username"
                    placeholder="Tên đăng nhập"
                    v-model="form.username"
                    @blur="$v.form.username.$touch()"
                    autofocus=""
                  />
                  <div v-if="$v.form.username.$error" class="form-error">
                    <span
                      v-if="!$v.form.username.required"
                      class="help is-danger"
                      >Yêu cầu nhập tên đăng nhập</span
                    >
                  </div>
                  <span class="icon is-medium is-left">
                    <i class="fas fa-user"></i>
                  </span>
                  <span class="icon is-medium is-right">
                    <i class="fas fa-check"></i>
                  </span>
                </div>
              </div>
              <div class="field" style="padding-top: 10px">
                <div class="control has-icons-left">
                  <input
                    v-model="form.password"
                    @blur="$v.form.password.$touch()"
                    class="input is-normal is-primary"
                    type="password"
                    placeholder="Mật khẩu"
                    autocomplete="current-password"
                  />
                  <div v-if="$v.form.password.$error" class="form-error">
                    <span
                      v-if="!$v.form.password.required"
                      class="help is-danger"
                      >Yêu cầu nhập mật khẩu</span
                    >
                  </div>
                  <span class="icon is-small is-left">
                    <i class="fas fa-lock"></i>
                  </span>
                </div>
              </div>
              <div class="field" style="padding-top: 10px">
                <button
                  @click.prevent="login"
                  :disabled="$v.form.$invalid"
                  class="button is-block is-info is-normal is-fullwidth"
                >
                  Đăng nhập
                </button>
              </div>
              <br />
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { required, username } from "vuelidate/lib/validators";
import Swal from "sweetalert2";
export default {
  layout: "none",
  auth: "guest",
  data() {
    return {
      form: {
        username: null,
        password: null,
      },
      hisform: {
        tenthaotac: null,
        createdAt: null,
        ghichu: null,
      },
    };
  },
  validations: {
    form: {
      username: {
        required,
      },
      password: {
        required,
      },
    },
  },
  mounted() {
    this.currentDateTime();
  },
  computed: {
    isFormValid() {
      return !this.$v.$invalid;
    },
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
      this.hisform.createdAt = date + " " + time;
    },

    // async login() {
    //   try {
    //     this.$v.form.$touch();
    //     if (this.isFormValid) {
    //       const response = await this.$axios.post(
    //         `/api/users/auth/login`,
    //         this.form
    //       );
    //       // console.log(response.data);
    //       if (response.data.success == 1) {
    //         this.$toasted.error("Đăng nhập thất bại! Tài khoản không tồn tại", {
    //           duration: 3000,
    //         });
    //       } else if (response.data.success == 2) {
    //         this.$toasted.error("Đăng nhập thất bại! Tài khoản đã bị khóa", {
    //           duration: 3000,
    //         });
    //       } else if (response.data.success == 3) {
    //         this.$auth.loginWith("local", {
    //           data: {
    //             username: this.form.username,
    //             password: this.form.password,
    //           },
    //         });
    //         // save log
    //         this.hisform.tenthaotac = `${this.form.username} đăng nhập`;
    //         this.hisform.ghichu = `Đăng nhập lúc: ${this.hisform.createdAt}`;
    //         this.$axios.$post(`/api/logsystem/record-action`, this.hisform);
    //       } else {
    //         this.$toasted.error("Đăng nhập thất bại! Sai mật khẩu", {
    //           duration: 3000,
    //         });
    //       }
    //     }
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },

    async login() {
      try {
        await this.$auth.loginWith("custom", {
          data: {
            username: this.form.username,
            password: this.form.password,
          },
        });
      } catch (error) {
        // console.log('login error: ' + error);
        // Xử lý lỗi khi đăng nhập không thành công
        console.error("Đăng nhập thất bại:", error);
        Swal.fire({
          title: "Đăng nhập thất bại",
          text: "Sai thông tin đăng nhập  !!!",
          icon: "error",
        });
      }
    },
  },
};
</script>

<style scoped>
.hero.is-success {
  background: #f2f6fa;
  background-image: url("../assets/image/login100.jpg");
  background-size: cover;
}
.hero .nav,
.hero.is-success .nav {
  -webkit-box-shadow: none;
  box-shadow: none;
}
.box {
  margin-top: 5rem;
  background-color: transparent;
  border: 1px solid white;
}
.avatar {
  margin-top: -70px;
  padding-bottom: 20px;
}
.avatar img {
  height: 128px;
  width: 128px;
  padding: 5px;
  background: #fff;
  border-radius: 50%;
  -webkit-box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1),
    0 0 0 1px rgba(10, 10, 10, 0.1);
  box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
}
p.subtitle {
  padding-top: 1rem;
}
</style>
