<template>
  <nav
    class="navbar is-transparent is-light"
    role="navigation"
    aria-label="main navigation"
  >
    <div class="container">
      <div class="navbar-brand">
        <a class="navbar-item" href="/">
          <img
            style="opacity: 0.5"
            src="@/assets/image/logo_toanluc.png"
            width="118"
            height="32"
          />
        </a>

        <a
          role="button"
          class="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarMenu"
          @click="toggleMenu"
        >
          <span></span>
          <span></span>
          <span></span>
        </a>
      </div>

      <div
        class="navbar-menu"
        :class="{ 'is-active': isMenuOpen }"
        id="navbarMenu"
      >
        <div class="navbar-start">
          <!-- Danh mục -->
          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link" @click="toggleDropdown_danhmuc">
              <span style="color: #3850b7" class="icon is-small is-left">
                <i class="fas fa-layer-group"></i>
              </span>
              &ensp; Danh mục
            </a>
            <div
              @click="toggleDropdown_danhmuc"
              class="navbar-dropdown is-boxed"
              v-show="isDropdownOpen_danhmuc"
            >
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
              <nav-link to="/danhmuc/congnhan/chonstt" class="navbar-item">
                <span style="color: #3850b7" class="icon is-small is-left">
                  <i class="fas fa-barcode"></i>
                </span>
                &ensp; Gán số thứ tự công nhân
              </nav-link>
              <nav-link to="/danhmuc/capbacluong/" class="navbar-item">
                <span style="color: #3850b7" class="icon is-small is-left">
                  <i class="fas fa-atom"></i>
                </span>
                &ensp; Cấp bậc lương
              </nav-link>
              <nav-link to="/danhmuc/chucvu/" class="navbar-item">
                <span style="color: #3850b7" class="icon is-small is-left">
                  <i class="fas fa-award"></i>
                </span>
                &ensp; Chức vụ
              </nav-link>
              <hr class="navbar-divider" />
              <nav-link to="/danhmuc/congnhan/dieuchuyen" class="navbar-item">
                <span style="color: #3850b7" class="icon is-small is-left">
                  <i class="fas fa-compress-alt"></i>
                </span>
                &ensp; Điều chuyển công nhân
              </nav-link>
              <nav-link
                to="/danhmuc/congnhan/dscongnhannghiviec"
                class="navbar-item"
              >
                <span style="color: #3850b7" class="icon is-small is-left">
                  <i class="fas fa-address-book"></i>
                </span>
                &ensp; Công nhân đã nghỉ việc
              </nav-link>
              <nav-link
                to="/danhmuc/nhanvien/nhanviendanghiviec"
                class="navbar-item"
              >
                <span style="color: #3850b7" class="icon is-small is-left">
                  <i class="far fa-angry"></i>
                </span>
                &ensp; Nhân viên đã nghỉ việc
              </nav-link>
              <nav-link to="/danhmuc/congnhan/lognhansu" class="navbar-item">
                <span style="color: #3850b7" class="icon is-small is-left">
                  <i class="fas fa-atlas"></i>
                </span>
                &ensp; Log Nhân sự
              </nav-link>
              <hr class="navbar-divider" />
              <nav-link to="/danhmuc/dongiacong/" class="navbar-item">
                <span style="color: #3850b7" class="icon is-small is-left">
                  <i class="fas fa-cube"></i>
                </span>
                &ensp; Đơn giá công
              </nav-link>
              <nav-link to="/danhmuc/nguyencong/" class="navbar-item">
                <span style="color: #3850b7" class="icon is-small is-left">
                  <i class="fas fa-funnel-dollar"></i>
                </span>
                &ensp; Sản phẩm
              </nav-link>
              <nav-link to="/danhmuc/congnhat/" class="navbar-item">
                <span style="color: #3850b7" class="icon is-small is-left">
                  <i class="fab fa-firstdraft"></i>
                </span>
                &ensp; Công nhật
              </nav-link>
            </div>
          </div>

          <!-- Kế hoạch sản xuất -->
          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link" @click="toggleDropdown_kehoach">
              <span style="color: #f14668" class="icon is-small is-left">
                <i class="far fa-list-alt"></i>
              </span>
              &ensp; Quản lý Lô phiếu
            </a>
            <div
              @click="toggleDropdown_kehoach"
              class="navbar-dropdown is-boxed"
              v-show="isDropdownOpen_kehoach"
            >
              <nav-link to="/ketoan/phieulo/importsolieu" class="navbar-item">
                <span style="color: #f14668" class="icon is-small is-left">
                  <i class="far fa-arrow-alt-circle-down"></i>
                </span>
                &ensp; Import số liệu
              </nav-link>
              <nav-link to="/ketoan/phieulo/lapkehoachnam" class="navbar-item">
                <span style="color: #f14668" class="icon is-small is-left">
                  <i class="fas fa-box"></i>
                </span>
                &ensp; Lập Kế hoạch năm
              </nav-link>
              <nav-link to="/ketoan/phieulo/quanlylosx" class="navbar-item">
                <span style="color: #f14668" class="icon is-small is-left">
                  <i class="fas fa-book"></i>
                </span>
                &ensp; Lập lô nhà máy
              </nav-link>
              <nav-link
                to="/ketoan/phieulo/dangkylokhphanxuong"
                class="navbar-item"
              >
                <span style="color: #f14668" class="icon is-small is-left">
                  <i class="far fa-calendar-alt"></i>
                </span>
                &ensp; Đăng ký kế hoạch phân xưởng
              </nav-link>
              <nav-link
                to="/ketoan/phieulo/chonlokhpxdesanxuat"
                class="navbar-item"
              >
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
              <hr class="navbar-divider" />
              <nav-link
                to="/ketoan/phieulo/vaoluongcongdoan"
                class="navbar-item"
              >
                <span style="color: #f14668" class="icon is-small is-left">
                  <i class="fas fa-clipboard-list"></i>
                </span>
                &ensp; Vào lương
              </nav-link>
            </div>
          </div>

          <!-- Tài chính kế toán -->
          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link" @click="toggleDropdown_taichinh">
              <span style="color: #9b6dff" class="icon is-small is-left">
                <i class="far fa-money-bill-alt"></i>
              </span>
              &ensp; Lương
            </a>
            <div
              @click="toggleDropdown_taichinh"
              class="navbar-dropdown is-boxed"
              v-show="isDropdownOpen_taichinh"
            >
              <nav-link
                to="/ketoan/phieulo/kiemvachotluong"
                class="navbar-item"
              >
                <span style="color: #9b6dff" class="icon is-small is-left">
                  <i class="fab fa-hornbill"></i>
                </span>
                &ensp; Kiểm và chốt lương
              </nav-link>
              <div class="nested navbar-item dropdown">
                <div class="dropdown-trigger">
                  <button
                    class="button"
                    aria-haspopup="true"
                    aria-controls="dropdown-menu"
                  >
                    <span style="color: #9b6dff" class="icon is-small is-left">
                      <i class="fas fa-calculator"></i>
                    </span>
                    &ensp; Quản lý Chi trả
                  </button>
                </div>
                <div class="dropdown-menu" id="dropdown-menu" role="menu">
                  <div class="dropdown-content">
                    <nav-link to="/ketoan/tamung/" class="navbar-item">
                      <span
                        style="color: #9b6dff"
                        class="icon is-small is-left"
                      >
                        <i class="fas fa-closed-captioning"></i>
                      </span>
                      &ensp; Văn phòng
                    </nav-link>
                    <nav-link to="/ketoan/tamung/congnhan" class="navbar-item">
                      <span
                        style="color: #9b6dff"
                        class="icon is-small is-left"
                      >
                        <i class="far fa-closed-captioning"></i>
                      </span>
                      &ensp; Công nhân xưởng
                    </nav-link>
                  </div>
                </div>
              </div>
              <div class="nested navbar-item dropdown">
                <div class="dropdown-trigger">
                  <button
                    class="button"
                    aria-haspopup="true"
                    aria-controls="dropdown-menu"
                  >
                    <span style="color: #9b6dff" class="icon is-small is-left">
                      <i class="fab fa-amazon-pay"></i>
                    </span>
                    &ensp; Chi trả lương hàng tháng
                  </button>
                </div>
                <div class="dropdown-menu" id="dropdown-menu" role="menu">
                  <div class="dropdown-content">
                    <nav-link to="/ketoan/tinhluong/" class="navbar-item">
                      <span
                        style="color: #9b6dff"
                        class="icon is-small is-left"
                      >
                        <i class="fab fa-btc"></i>
                      </span>
                      &ensp; Văn phòng
                    </nav-link>
                    <nav-link
                      to="/ketoan/tinhluong/luongcongdoan"
                      class="navbar-item"
                    >
                      <span
                        style="color: #9b6dff"
                        class="icon is-small is-left"
                      >
                        <i class="fas fa-money-bill"></i>
                      </span>
                      &ensp; Phân xưởng
                    </nav-link>
                  </div>
                </div>
              </div>
              <nav-link to="/ketoan/phieulo/exportdata" class="navbar-item">
                <span style="color: #9b6dff" class="icon is-small is-left">
                  <i class="far fa-file-excel"></i>
                </span>
                &ensp; Xuất dữ liệu
              </nav-link>
              <hr class="navbar-divider" />
              <nav-link
                to="/ketoan/tiencongluong/luongcoban"
                class="navbar-item"
              >
                <span style="color: #9b6dff" class="icon is-small is-left">
                  <i class="far fa-credit-card"></i>
                </span>
                &ensp; Lương cơ bản / Lương ngày
              </nav-link>
              <nav-link
                to="/ketoan/tiencongluong/luongmemcongnhan"
                class="navbar-item"
              >
                <span style="color: #9b6dff" class="icon is-small is-left">
                  <i class="fas fa-cash-register"></i>
                </span>
                &ensp; Lương mềm công nhân / Lương ngày
              </nav-link>
              <nav-link to="/quantri/chamcong/antrua" class="navbar-item">
                <span style="color: #9b6dff" class="icon is-small is-left">
                  <i class="fas fa-cocktail"></i>
                </span>
                &ensp; Ăn Ca
              </nav-link>
              <nav-link to="/quantri/chamcong/mucngoaigio" class="navbar-item">
                <span style="color: #9b6dff" class="icon is-small is-left">
                  <i class="fas fa-align-left"></i>
                </span>
                &ensp; Mức ngoài giờ
              </nav-link>
            </div>
          </div>

          <!-- Báo cáo -->
          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link" @click="toggleDropdown_baocao">
              <span style="color: #48c78e" class="icon is-small is-left">
                <i class="fas fa-chart-pie"></i>
              </span>
              &ensp; Báo cáo
            </a>
            <div
              @click="toggleDropdown_baocao"
              class="navbar-dropdown is-boxed"
              v-show="isDropdownOpen_baocao"
            >
              <nav-link to="/report/bangluong" class="navbar-item">
                <span style="color: #48c78e" class="icon is-small is-left">
                  <i class="fas fa-calculator"></i>
                </span>
                &ensp; Chi trả lương công nhân
              </nav-link>
              <nav-link to="/report/bangluongvp" class="navbar-item">
                <span style="color: #48c78e" class="icon is-small is-left">
                  <i class="fas fa-chart-pie"></i>
                </span>
                &ensp; Chi trả lương văn phòng
              </nav-link>
            </div>
          </div>

          <!-- Hệ thống -->
          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link" @click="toggleDropdown_hethong">
              <span style="color: #6e4dc3" class="icon is-small is-left">
                <i class="fas fa-dharmachakra"></i>
              </span>
              &ensp; Hệ thống
            </a>
            <div
              @click="toggleDropdown_hethong"
              class="navbar-dropdown is-boxed"
              v-show="isDropdownOpen_hethong"
            >
              <div class="nested navbar-item dropdown">
                <div class="dropdown-trigger">
                  <button
                    class="button"
                    aria-haspopup="true"
                    aria-controls="dropdown-menu"
                  >
                    <span style="color: #6e4dc3" class="icon is-small is-left">
                      <i class="fas fa-clipboard-list"></i>
                    </span>
                    &ensp; Phiên bản lương
                  </button>
                </div>
                <div class="dropdown-menu" id="dropdown-menu" role="menu">
                  <div class="dropdown-content">
                    <nav-link to="/quantri/phienbanluong/" class="navbar-item">
                      <span
                        style="color: #6e4dc3"
                        class="icon is-small is-left"
                      >
                        <i class="fas fa-clipboard-check"></i>
                      </span>
                      &ensp; Tạo phiên bản lương
                    </nav-link>
                    <nav-link
                      to="/quantri/phienbanluong/dsphienbanluong"
                      class="navbar-item"
                    >
                      <span
                        style="color: #6e4dc3"
                        class="icon is-small is-left"
                      >
                        <i class="fas fa-clipboard"></i>
                      </span>
                      &ensp; Danh sách phiên bản
                    </nav-link>
                  </div>
                </div>
              </div>
              <div class="nested navbar-item dropdown">
                <div class="dropdown-trigger">
                  <button
                    class="button"
                    aria-haspopup="true"
                    aria-controls="dropdown-menu"
                  >
                    <span style="color: #6e4dc3" class="icon is-small is-left">
                      <i class="fas fa-fingerprint"></i>
                    </span>
                    &ensp; Chấm công
                  </button>
                </div>
                <div class="dropdown-menu" id="dropdown-menu" role="menu">
                  <div class="dropdown-content">
                    <nav-link to="/quantri/chamcong/" class="navbar-item">
                      <span
                        style="color: #6e4dc3"
                        class="icon is-small is-left"
                      >
                        <i class="fas fa-id-card-alt"></i>
                      </span>
                      &ensp; Chấm công hằng ngày
                    </nav-link>
                    <nav-link
                      to="/quantri/chamcong/ngoaigio"
                      class="navbar-item"
                    >
                      <span
                        style="color: #6e4dc3"
                        class="icon is-small is-left"
                      >
                        <i class="far fa-clock"></i>
                      </span>
                      &ensp; Chấm công ngoài giờ
                    </nav-link>
                    <nav-link
                      to="/quantri/chamcong/baocaoquanso"
                      class="navbar-item"
                    >
                      <span
                        style="color: #6e4dc3"
                        class="icon is-small is-left"
                      >
                        <i class="fab fa-elementor"></i>
                      </span>
                      &ensp; Quân số hàng ngày
                    </nav-link>
                    <nav-link
                      to="/quantri/chamcong/solieutonghop"
                      class="navbar-item"
                    >
                      <span
                        style="color: #6e4dc3"
                        class="icon is-small is-left"
                      >
                        <i class="far fa-calendar-alt"></i>
                      </span>
                      &ensp; Số liệu tổng hợp
                    </nav-link>
                    <nav-link
                      to="/quantri/chamcong/chamcongthang"
                      class="navbar-item"
                    >
                      <span
                        style="color: #6e4dc3"
                        class="icon is-small is-left"
                      >
                        <i class="fas fa-clipboard-check"></i>
                      </span>
                      &ensp; Chi tiết chấm công
                    </nav-link>
                    <nav-link
                      to="/quantri/chamcong/xemlaibaocaohangngay"
                      class="navbar-item"
                    >
                      <span
                        style="color: #6e4dc3"
                        class="icon is-small is-left"
                      >
                        <i class="far fa-calendar"></i>
                      </span>
                      &ensp; Xem lại quân số hằng ngày
                    </nav-link>
                  </div>
                </div>
              </div>
              <div class="nested navbar-item dropdown">
                <div class="dropdown-trigger">
                  <button
                    class="button"
                    aria-haspopup="true"
                    aria-controls="dropdown-menu"
                  >
                    <span style="color: #6e4dc3" class="icon is-small is-left">
                      <i class="fas fa-candy-cane"></i>
                    </span>
                    &ensp; Hồ sơ vi phạm
                  </button>
                </div>
                <div class="dropdown-menu" id="dropdown-menu" role="menu">
                  <div class="dropdown-content">
                    <nav-link
                      to="/quantri/vipham/nhapvipham"
                      class="navbar-item"
                    >
                      <span
                        style="color: #6e4dc3"
                        class="icon is-small is-left"
                      >
                        <i class="fas fa-fire-alt"></i>
                      </span>
                      &ensp; Nhập vi phạm
                    </nav-link>
                    <nav-link
                      to="/quantri/vipham/hosovipham"
                      class="navbar-item"
                    >
                      <span
                        style="color: #6e4dc3"
                        class="icon is-small is-left"
                      >
                        <i class="fa fa-book"></i>
                      </span>
                      &ensp; Hồ sơ vi phạm
                    </nav-link>
                  </div>
                </div>
              </div>
              <nav-link to="/quantri/admin/users/admin" class="navbar-item">
                <span style="color: #6e4dc3" class="icon is-small is-left">
                  <i class="far fa-address-card"></i>
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
            <a class="navbar-link" @click="toggleDropdown_user"
              ><img
                :src="avatar"
                alt=""
                width="40"
                height="40"
                style="border-radius: 50%"
              />
              &ensp; hi, {{ name }} !</a
            >
            <div
              @click="toggleDropdown_user"
              class="navbar-dropdown is-boxed"
              v-show="isDropdownOpen_user"
            >
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
  </nav>
</template>

<script>
export default {
  data() {
    return {
      isMenuOpen: false,
      isDropdownOpen_danhmuc: false,
      isDropdownOpen_kehoach: false,
      isDropdownOpen_taichinh: false,
      isDropdownOpen_baocao: false,
      isDropdownOpen_hethong: false,
      isDropdownOpen_user: false,
      activeMenu: "", // Thêm thuộc tính activeMenu để lưu trạng thái menu đang được sử dụng

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
    if (
      this.$auth.$state.loggedIn == true &&
      this.$auth.$state.user.success == false
    ) {
      // alert('hết phiên')
      this.$router.push("/notAuthenticated");
      this.$auth.$state.loggedIn = false;
    } else if (
      this.$auth.$state.loggedIn == false &&
      this.$auth.$state.user == false
    ) {
      this.$router.push("/notAuthenticated");
      this.$auth.$state.loggedIn = false;
    }
  },

  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },

    toggleDropdown_danhmuc() {
      this.isDropdownOpen_danhmuc = !this.isDropdownOpen_danhmuc;
    },

    toggleDropdown_kehoach() {
      this.isDropdownOpen_kehoach = !this.isDropdownOpen_kehoach;
    },

    toggleDropdown_taichinh() {
      this.isDropdownOpen_taichinh = !this.isDropdownOpen_taichinh;
    },

    toggleDropdown_baocao() {
      this.isDropdownOpen_baocao = !this.isDropdownOpen_baocao;
    },

    toggleDropdown_hethong() {
      this.isDropdownOpen_hethong = !this.isDropdownOpen_hethong;
    },

    toggleDropdown_user() {
      this.isDropdownOpen_user = !this.isDropdownOpen_user;
    },

    logout() {
      // console.log('logout')
      // console.log(this.$auth.$state.loggedIn)
      this.$auth.$state.loggedIn = false;
    },

    // closeNavbar(num) {
    //   console.log(num);
    //   this.$refs[`navbarDropDown-${num}`].style.display = "none";
    //   console.log(this.$refs[`navbarDropDown-${num}`].style.display);
    //   setTimeout(() => {
    //     this.$refs[`navbarDropDown-${num}`].style.display = "block";
    //   }, 300);
    // },
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
  &:hover > .dropdown-menu {
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
