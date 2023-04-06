<template>
  <div>
    <!-- START NAV -->
    <nav class="navbar is-transparent is-light" role="navigation" aria-label="main navigation">
      <div class="container">
        <div class="navbar-brand">
          <a class="navbar-item" href="/">
            <img style="opacity: 0.5" src="@/assets/image/logo_toanluc.png" width="118" height="32" />
          </a>
          <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
        <div :class="{ 'is-active': isActive }" id="navbarBasicExample" class="navbar-menu">
          <div id="navbarBasicExample" class="navbar-menu">
            <div class="navbar-start">
              <div class="navbar-item has-dropdown is-hoverable">
                <!-- Danh mục dùng chung -->
                <a class="navbar-link">
                  <span style="color: #3850b7" class="icon is-small is-left">
                    <i class="fas fa-layer-group"></i>
                  </span>
                  &ensp; Danh mục
                </a>
                <div class="navbar-dropdown is-boxed">
                  <nav-link to="/danhmuc/phongban/" class="navbar-item">
                    <span style="color: #3850b7" class="icon is-small is-left">
                      <i class="fas fa-fax"></i>
                    </span>
                    &ensp; Phòng ban
                  </nav-link>
                  <nav-link to="/danhmuc/phanxuong/" class="navbar-item">
                    <span style="color: #3850b7" class="icon is-small is-left">
                      <i class="fas fa-gavel"></i>
                    </span>
                    &ensp; Phân xưởng
                  </nav-link>
                  <nav-link to="/danhmuc/to/" class="navbar-item">
                    <span style="color: #3850b7" class="icon is-small is-left">
                      <i class="fas fa-outdent"></i>
                    </span>
                    &ensp; Tổ
                  </nav-link>
                  <hr class="navbar-divider" />
                  <nav-link to="/danhmuc/nhanvien/" class="navbar-item">
                    <span style="color: #3850b7" class="icon is-small is-left">
                      <i class="far fa-address-book"></i>
                    </span>
                    &ensp; Nhân viên
                  </nav-link>
                  <nav-link to="/danhmuc/congnhan/" class="navbar-item">
                    <span style="color: #3850b7" class="icon is-small is-left">
                      <i class="fab fa-drupal"></i>
                    </span>
                    &ensp; Công nhân
                  </nav-link>
                  <hr class="navbar-divider" />
                  <!-- <nav-link to="" class="navbar-item">
                    <span style="color: #3850b7" class="icon is-small is-left">
                      <i class="fas fa-cubes"></i>
                    </span>
                    &ensp; Nhóm sản phẩm
                  </nav-link> -->
                  <nav-link to="/danhmuc/dongiacong/" class="navbar-item">
                    <span style="color: #3850b7" class="icon is-small is-left">
                      <i class="fas fa-cube"></i>
                    </span>
                    &ensp; Đơn giá công
                  </nav-link>
                  <nav-link to="/danhmuc/nguyencong/" class="navbar-item">
                    <span style="color: #3850b7" class="icon is-small is-left">
                      <i class="fa fa-linode"></i>
                    </span>
                    &ensp; Nguyên công
                  </nav-link>

                </div>
              </div>
              <!-- Tài chính -->
              <div class="navbar-item has-dropdown is-hoverable">
                <a class="navbar-link">
                  <span style="color: #f14668" class="icon is-small is-left">
                    <i class="far fa-list-alt"></i>
                  </span>
                  &ensp; Quản lý Lô phiếu
                </a>
                <div class="navbar-dropdown is-boxed">
                  <nav-link to="/ketoan/phieulo/importsolieu" class="navbar-item">
                    <span style="color: #f14668" class="icon is-small is-left">
                      <i class="far fa-arrow-alt-circle-down"></i>
                    </span>
                    &ensp; Import số liệu
                  </nav-link>
                  <nav-link to="/ketoan/phieulo/lapkehoachnam" class="navbar-item">
                    <span style="color: #f14668" class="icon is-small is-left">
                      <i class="	fas fa-box"></i>
                    </span>
                    &ensp; Lập Kế hoạch năm
                  </nav-link>
                  <nav-link to="/ketoan/phieulo/quanlylosx" class="navbar-item">
                    <span style="color: #f14668" class="icon is-small is-left">
                      <i class="fas fa-book"></i>
                    </span>
                    &ensp; Lập lô nhà máy
                  </nav-link>
                  <nav-link to="/ketoan/phieulo/dangkylokhphanxuong" class="navbar-item">
                    <span style="color: #f14668" class="icon is-small is-left">
                      <i class="fa fa-calendar-check-o"></i>
                    </span>
                    &ensp; Đăng ký kế hoạch phân xưởng
                  </nav-link>
                  <!-- <nav-link to="/ketoan/phieulo/lapkehoachlophanxuong" class="navbar-item">
                    <span style="color: #f14668" class="icon is-small is-left">
                      <i class="far fa-clipboard"></i>
                    </span>
                    &ensp; Lập kế hoạch Lô phân xưởng (Tạm thời chưa sử dụng)
                  </nav-link> -->
                  <nav-link to="/ketoan/phieulo/chonlokhpxdesanxuat" class="navbar-item">
                    <span style="color: #f14668" class="icon is-small is-left">
                      <i class="far fa-copy"></i>
                    </span>
                    &ensp; Chọn Lô kế hoạch để sản xuất
                  </nav-link>
                  <nav-link to="/ketoan/phieulo/dangkylosx" class="navbar-item">
                    <span style="color: #f14668" class="icon is-small is-left">
                      <i class="fas fa-file-contract"></i>
                    </span>
                    &ensp; Tạo Lô sản xuất
                  </nav-link>
                  <nav-link to="/ketoan/phieulo/danhsachlosx" class="navbar-item">
                    <span style="color: #f14668" class="icon is-small is-left">
                      <i class="fab fa-codepen"></i>
                    </span>
                    &ensp; Danh sách lô sản xuất
                  </nav-link>
                  <!-- <nav-link to="/ketoan/phieulo/vaoluongcongdoan" class="navbar-item">
                    <span style="color: #f14668" class="icon is-small is-left">
                      <i class="fas fa-clipboard-list"></i>
                    </span>
                    &ensp; Vào lương công đoạn sản xuất
                  </nav-link> -->
                </div>
              </div>
              <!-- Tài chính -->
              <div class="navbar-item has-dropdown is-hoverable">
                <a class="navbar-link">
                  <span style="color: #9b6dff" class="icon is-small is-left">
                    <i class="far fa-money-bill-alt"></i>
                  </span>
                  &ensp; Lương
                </a>
                <div class="navbar-dropdown is-boxed">
                  <nav-link to="/ketoan/phieulo/vaoluongcongdoan" class="navbar-item">
                    <span style="color: #9b6dff" class="icon is-small is-left">
                      <i class="fas fa-clipboard-list"></i>
                    </span>
                    &ensp; Vào lương công đoạn sản xuất
                  </nav-link>
                  <div class="nested navbar-item dropdown">
                    <div class="dropdown-trigger">
                      <button class="button" aria-haspopup="true" aria-controls="dropdown-menu">
                        <span style="color: #9b6dff" class="icon is-small is-left">
                          <i class="fas fa-calculator"></i>
                        </span>
                        &ensp; Quản lý tạm ứng
                      </button>
                    </div>
                    <div class="dropdown-menu" id="dropdown-menu" role="menu">
                      <div class="dropdown-content">
                        <nav-link to="/ketoan/tamung/" class="navbar-item">
                          <span style="color: #9b6dff" class="icon is-small is-left">
                            <i class="fas fa-closed-captioning"></i>
                          </span>
                          &ensp; Nhân viên Văn phòng
                        </nav-link>
                        <nav-link to="/ketoan/tamung/congnhan" class="navbar-item">
                          <span style="color: #9b6dff" class="icon is-small is-left">
                            <i class="far fa-closed-captioning"></i>
                          </span>
                          &ensp; Công nhân xưởng
                        </nav-link>
                      </div>
                    </div>
                  </div>
                  <div class="nested navbar-item dropdown">
                    <div class="dropdown-trigger">
                      <button class="button" aria-haspopup="true" aria-controls="dropdown-menu">
                        <span style="color: #9b6dff" class="icon is-small is-left">
                          <i class="fab fa-amazon-pay"></i>
                        </span>
                        &ensp; Chi trả lương hàng tháng
                      </button>
                    </div>
                    <div class="dropdown-menu" id="dropdown-menu" role="menu">
                      <div class="dropdown-content">
                        <nav-link to="/ketoan/tinhluong/" class="navbar-item">
                          <span style="color: #9b6dff" class="icon is-small is-left">
                            <i class="fab fa-btc"></i>
                          </span>
                          &ensp; Văn phòng
                        </nav-link>
                        <nav-link to="/ketoan/tinhluong/luongcongdoan" class="navbar-item">
                          <span style="color: #9b6dff" class="icon is-small is-left">
                            <i class="fas fa-money-bill"></i>
                          </span>
                          &ensp; Phân xưởng
                        </nav-link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- Báo cáo -->
              <div class="navbar-item has-dropdown is-hoverable">
                <a class="navbar-link">
                  <span style="color: #48c78e" class="icon is-small is-left">
                    <i class="fas fa-chart-pie"></i>
                  </span>
                  &ensp; Báo cáo
                </a>
                <div class="navbar-dropdown is-boxed">
                  <!-- <nav-link to="/report/nhansu" class="navbar-item">
                    <span style="color: #48c78e" class="icon is-small is-left">
                      <i class="fas fa-address-card"></i>
                    </span>
                    &ensp; Nhân sự
                  </nav-link> -->
                  <nav-link to="/report/bangluong" class="navbar-item">
                    <span style="color: #48c78e" class="icon is-small is-left">
                      <i class="fa fa-file-text-o"></i>
                    </span>
                    &ensp; Bảng chi trả lương
                  </nav-link>
                  <nav-link to="" class="navbar-item">
                    <span style="color: #48c78e" class="icon is-small is-left">
                      <i class="fas fa-chart-pie"></i>
                    </span>
                    &ensp; Thời gian
                  </nav-link>
                </div>
              </div>
              <!-- Hệ thống -->
              <div class="navbar-item has-dropdown is-hoverable">
                <a class="navbar-link">
                  <span style="color: #6e4dc3" class="icon is-small is-left">
                    <i class="fas fa-dharmachakra"></i>
                  </span>
                  &ensp; Hệ thống
                </a>
                <div class="navbar-dropdown is-boxed">
                  <div class="nested navbar-item dropdown">
                    <div class="dropdown-trigger">
                      <button class="button" aria-haspopup="true" aria-controls="dropdown-menu">
                        <span style="color: #6e4dc3" class="icon is-small is-left">
                          <i class="fas fa-clipboard-list"></i>
                        </span>
                        &ensp; Phiên bản lương
                      </button>
                    </div>
                    <div class="dropdown-menu" id="dropdown-menu" role="menu">
                      <div class="dropdown-content">
                        <nav-link to="/quantri/phienbanluong/" class="navbar-item">
                          <span style="color: #6e4dc3" class="icon is-small is-left">
                            <i class="fas fa-clipboard-check"></i>
                          </span>
                          &ensp; Tạo phiên bản lương
                        </nav-link>
                        <nav-link to="/quantri/phienbanluong/dsphienbanluong" class="navbar-item">
                          <span style="color: #6e4dc3" class="icon is-small is-left">
                            <i class="fas fa-clipboard"></i>
                          </span>
                          &ensp; Danh sách phiên bản
                        </nav-link>
                      </div>
                    </div>
                  </div>
                  <div class="nested navbar-item dropdown">
                    <div class="dropdown-trigger">
                      <button class="button" aria-haspopup="true" aria-controls="dropdown-menu">
                        <span style="color: #6e4dc3" class="icon is-small is-left">
                          <i class="fas fa-fingerprint"></i>
                        </span>
                        &ensp; Chấm công
                      </button>
                    </div>
                    <div class="dropdown-menu" id="dropdown-menu" role="menu">
                      <div class="dropdown-content">
                        <nav-link to="/quantri/chamcong/" class="navbar-item">
                          <span style="color: #6e4dc3" class="icon is-small is-left">
                            <i class="fas fa-id-card-alt"></i>
                          </span>
                          &ensp; Chấm công hằng ngày
                        </nav-link>
                        <nav-link to="/quantri/phienbanluong/dsphienbanluong" class="navbar-item">
                          <span style="color: #6e4dc3" class="icon is-small is-left">
                            <i class="fa fa-calendar-check-o"></i>
                          </span>
                          &ensp; Số liệu chấm công
                        </nav-link>
                      </div>
                    </div>
                  </div>
                  <nav-link to="/quantri/admin/users/admin" class="navbar-item">
                    <span style="color: #6e4dc3" class="icon is-small is-left">
                      <i class="fa fa-address-card-o"></i>
                    </span>
                    &ensp; Người dùng
                  </nav-link>
                  <nav-link to="/quantri/admin/huyluong/" class="navbar-item">
                    <span style="color: #6e4dc3" class="icon is-small is-left">
                      <i class="fas fa-check-circle"></i>
                    </span>
                    &ensp; Hủy chốt lương
                  </nav-link>
                  <nav-link to="/quantri/history/" class="navbar-item">
                    <span style="color: #6e4dc3" class="icon is-small is-left">
                      <i class="fas fa-cocktail"></i>
                    </span>
                    &ensp; Lịch sử thao tác
                  </nav-link>
                </div>
              </div>
            </div>
            <div class="navbar-end">
              <div class="navbar-item has-dropdown is-hoverable">
                <template v-if="$auth.user">
                  <a class="navbar-link"><img :src="$auth.user.avatar" alt="" width="40" height="40"
                      style="border-radius: 50%" />
                    &ensp; hi, {{ name }} !</a>
                </template>
                <template v-else>
                  <a class="navbar-link"><img alt="" width="40" height="40" style="border-radius: 50%" />
                    &ensp; Mời đăng nhập !</a></template>
                <div class="navbar-dropdown is-boxed">
                  <nav-link to="#" class="navbar-item">
                    <span class="icon is-small is-left" style="color: #3e8ed0">
                      <i class="fab fa-github-alt"></i>
                    </span>
                    &ensp; Hồ sơ cá nhân
                  </nav-link>
                  <nav-link to="#" class="navbar-item">
                    <span class="icon is-small is-left" style="color: #3e8ed0">
                      <i class="fas fa-book"></i>
                    </span>
                    &ensp; Trợ giúp
                  </nav-link>
                  <hr class="navbar-divider" />
                  <a @click="logout()" class="navbar-item">
                    <span class="icon is-small is-left" style="color: #3e8ed0">
                      <i class="fab fa-google-play"></i>
                    </span>
                    &ensp; Đăng xuất
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <!-- END NAV -->
  </div>
</template>
<script>
import Swal from "sweetalert2";
export default {
  middleware: "auth",
  components: {},
  data() {
    return {
      isActive: false,
      form: {
        email: "",
        username: "",
        name: "",
        password: "",
        role: "",
        updatedAt: new Date().toISOString().substr(0, 10),
        avatar: "",
        fileName: "",
        selectedFile: null,
        url: null,
      },
      name: null,
      avatar: null,
    };
  },
  computed: {},
  mounted() {
    if (this.$auth.$state.user) {
      this.name = this.$auth.$state.user.username;
      this.avatar = this.$auth.$state.user.avatar;
    } else {
      this.name = null;
      this.avatar = null;
    }
    // console.log(this.$auth.$state.loggedIn)
    // console.log(this.$auth.$state.user.success)
    if (this.$auth.$state.loggedIn == true && this.$auth.$state.user.success == false) {
      // alert('hết phiên')
      this.$router.push('/notAuthenticated')
      this.$auth.$state.loggedIn = false
    } else if (this.$auth.$state.loggedIn == false && this.$auth.$state.user == false) {
      this.$router.push('/notAuthenticated')
      this.$auth.$state.loggedIn = false
    }
  },
  methods: {
    /* Lấy tên file */
    logout() {
      // console.log('logout')
      // console.log(this.$auth.$state.loggedIn)
      this.$auth.$state.loggedIn = false
    },

    async updateProfile() {
      try {
        var data = new FormData();
        data.append("email", this.form.email);
        data.append("username", this.form.username);
        data.append("name", this.form.name);
        data.append("password", this.form.password);
        data.append("updatedAt", this.form.updatedAt);

        if (this.form.selectedFile) {
          data.append(
            "avatar",
            this.form.selectedFile,
            this.form.selectedFile.name
          );
        } else {
          data.append("avatar", this.form.avatar);
        }

        let response = await this.$axios.$put(`/api/users/auth/user`, data, {});

        this.$toasted.success("Biên bản đã được cập nhật !", {
          duration: 3000,
        });

        /* let response = await this.$axios.$patch(
          "/api/users/auth/user",
          this.form
        ); */

        if (response) {
          this.form.email = "";
          this.form.username = "";
          this.form.name = "";
          this.form.password = "";
          await this.$auth.fetchUser();
        }
        //console.log(response)
        //this.$toasted.success("Đã cập nhật thông tin !", { duration: 3000 });
      } catch (error) {
        console.log(error);
      }
    },

    checkAdmin() {
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
        title: "Bạn không phải Administrator !",
      });
    },

    checkTht() {
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
        title: "Bạn không phải Tổng hợp thu !",
      });
    },

    checkHoso() {
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
        title: "Bạn không có quyền import hồ sơ 1 lần",
      });
    },

    checkcbthu() {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        erProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: "error",
        title: "Bạn không có quyền",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.brand-title {
  font-size: 35px;
  font-weight: bold;
}

.navbar-brand {
  padding-right: 30px;
}

.avatar {
  margin-right: 5px;
}

.preview {
  display: flex;
  justify-content: center;
  align-items: center;
}

.preview img {
  max-width: 100%;
  max-height: 500px;
}

.navbar {
  min-height: 5rem !important;
}

.nested.dropdown {
  &:hover>.dropdown-menu {
    display: block;
  }

  .dropdown-menu {
    top: -15px;
    margin-left: 100%;
  }

  .dropdown-trigger {
    button::after {
      //content: " ⦠";
    }

    button {
      padding: 0px 0px;
      border: 0px;
      font-size: 14px;
      font-weight: 400;
      height: 2em;
    }
  }
}
</style>
