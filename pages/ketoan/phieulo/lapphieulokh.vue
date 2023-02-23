<template>
  <div class="columns">
    <div class="column">
      <br />
      <div class="box" style="margin-left:100px; margin-right:100px;">
        <div class="columns">
          <div class="column is-9">
            <div class="control">
              <span class="icon is-small is-left">
                <i style="color: #ff55acee" class="fas fa-broom"></i>
              </span>
              <span style="color: #3850b7; font-size: 14px; font-weight: bold;"
                >Lập phiếu lô kế hoạch</span
              >
            </div>
          </div>
          <div class="column" style="text-align: right">
            <button
              @click="onTaophieu"
              class="button is-success is-fullwidth is-small"
            >
              <span class="icon is-small">
                <i class="fas fa-pen-fancy"></i>
              </span>
              <span>Tạo lô kế hoạch</span>
            </button>
          </div>
          <div class="column" style="text-align: right">
            <nuxt-link :to="`/`">
              <button class="button is-info is-fullwidth is-small">
                <span class="icon is-small">
                  <i class="fas fa-angle-double-left"></i>
                </span>
                <span>Thoát</span>
              </button>
            </nuxt-link>
          </div>
        </div>

        <div>
          <div class="columns">
            <div class="column is-3">
              <table
                class="table is-responsive is-bordered is-narrow is-fullwidth"
              >
                <tr style="background-color: #fffaeb;">
                  <td
                    style="text-align: center; font-size: small; font-weight: bold;"
                  >
                    Phân xưởng
                  </td>
                </tr>
                <tr>
                  <td style="font-size: small;">
                    <ul>
                      <li v-for="px in phanxuong">
                        <input
                          type="checkbox"
                          :id="px.tenpx"
                          :value="px"
                          v-model="selectedPhanxuong"
                        />
                        <label>{{ px.tenpx }}</label>
                      </li>
                    </ul>
                  </td>
                </tr>
              </table>
            </div>
            <div class="column">
              <div class="table_wrapper">
                <table
                  class="table is-responsive is-bordered is-narrow is-fullwidth"
                >
                  <tr style="background-color: #fffaeb;">
                    <td
                      colspan="5"
                      style="text-align: center; font-size: small; font-weight: bold;"
                    >
                      Thông tin Phiếu lô kế hoạch
                    </td>
                  </tr>
                  <tr>
                    <td
                      colspan="5"
                      style="font-size: small; font-weight: bold;"
                    >
                      Mã sản phẩm
                    </td>
                  </tr>
                  <tr>
                    <td colspan="5">
                      <div class="control has-icons-left">
                        <div class="select is-small is-fullwidth">
                          <select @change="showMalosx($event)">
                            <option selected>-- Chọn sản phẩm --</option>
                            <option
                              v-for="item in ds_sanpham"
                              :value="item.masp"
                            >
                              {{ item.masp }} -- {{ item.tensp }}
                            </option>
                          </select>
                        </div>
                        <span class="icon is-small is-left">
                          <i
                            style="color: #48c78e"
                            class="fas fa-biohazard"
                          ></i>
                        </span>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style="text-align: center; font-size: small; font-weight: bold;"
                    >
                      Mã lô kế hoạch
                    </td>
                    <td
                      style="text-align: center; font-size: small; font-weight: bold;"
                    >
                      Thời gian bắt Đầu
                    </td>
                    <td
                      style="text-align: center; font-size: small; font-weight: bold;"
                    >
                      Thời gian kết thúc
                    </td>
                    <td
                      style="text-align: center; font-size: small; font-weight: bold;"
                    >
                      Sl đặt hàng
                    </td>
                    <td
                      style="text-align: center; font-size: small; font-weight: bold;"
                    >
                      Sl sản xuất
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <input
                        v-model.trim="form.makh"
                        class="input is-small is-fullwidth is-danger"
                        type="text"
                      />
                      <span style="font-size: 12px; color: red;"
                        ><i>* Nhập mã phiếu sau dấu -</i></span
                      >
                    </td>
                    <td>
                      <input
                        v-model.trim="form.ngaybd"
                        type="date"
                        class="input is-small"
                      />
                    </td>
                    <td>
                      <input
                        v-model.trim="form.ngaykt"
                        type="date"
                        class="input is-small"
                      />
                    </td>
                    <td>
                      <input
                        v-model.trim="form.sldathang"
                        type="text"
                        class="input is-small"
                      />
                    </td>
                    <td>
                      <input
                        v-model.trim="form.slsanxuat"
                        type="text"
                        class="input is-small"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td
                      colspan="2"
                      style="text-align: center; font-size: small; font-weight: bold;"
                    >
                      Tên sản phẩm
                    </td>
                    <td
                      style="text-align: center; font-size: small; font-weight: bold;"
                    >
                      Số lượng
                    </td>
                    <td
                      style="text-align: center; font-size: small; font-weight: bold;"
                    >
                      Nhóm lương
                    </td>
                    <td
                      style="text-align: center; font-size: small; font-weight: bold;"
                    >
                      Ngày giao phiếu
                    </td>
                  </tr>
                  <tr>
                    <td
                      colspan="2"
                      style="text-align: center; font-size: small;"
                    >
                      {{ form.tensp }}
                    </td>
                    <td>
                      <input
                        v-model.trim="form.soluong"
                        class="input is-small is-fullwidth"
                        type="text"
                      />
                    </td>
                    <td style="text-align: center; font-size: small;">
                      {{ form.nhomluong }}
                    </td>
                    <td>
                      <input
                        v-model.trim="form.ngaygiaophieu"
                        type="text"
                        class="input is-small"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td colspan="5">
                      <div class="field">
                        <div class="control">
                          <textarea
                            v-model.trim="form.ghichu"
                            class="textarea is-small"
                            placeholder="Diễn giải thêm ..."
                          ></textarea>
                        </div>
                      </div>
                    </td>
                  </tr>
                </table>
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
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.min.css";
import {
  required,
  email,
  minLength,
  url,
  sameAs,
} from "vuelidate/lib/validators";
export default {
  middleware: "auth",
  components: {
    Multiselect,
  },
  data() {
    return {
      selectedPhanxuong: [],
      lokehoach: [],
      ds_sanpham: [],
      dm_sanpham: [],
      ds_lokh: [],
      dm_lokh: [],
      dmnguyencong: [],
      cong_nhan: [],
      dmcongnhan: [],
      phanxuong: [],
      nhomluong: "",
      selectedIndex: 0,
      dongia_ns: "",
      namlsx: "",
      kehoach: [],
      checkMakh: "",
      listlkh: [],
      arrLkh: [],
      isExits: null,
      form: {
        mapx: null,
        tenpx: null,
        tensp: null,
        makh: "",
        ngaybd: "",
        ngaykt: "",
        sldathang: "",
        slsanxuat: "",
        masp: "",
        soluong: "",
        nhomluong: "",
        ghichu: "",
        ngaygiaophieu: "",
        createdAt: null,
        createdBy: this.$auth.$state.user.username,
      },
    };
  },

  mounted() {
    this.currentDateTime();
    this.get_phanxuong();
    this.getDssp();
    this.getMakehoach();
  },

  watch: {
    selectedPhanxuong(newVal, oldVal) {
      // Do what you want with the selected objects:
      // console.log(newVal);
    },
  },

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
      this.namlsx = current.getFullYear();
      this.form.createdAt = date + " " + time;
    },

    async showMalosx(e) {
      var name = e.target.options[e.target.options.selectedIndex].text;
      let position = name.split("--");
      this.form.masp = position[0].trim();
      this.form.tensp = position[1].trim();
      let nn = this.namlsx.toString();
      let sx_nam = nn.substring(2, 4);
      this.form.makh = this.form.masp.trim() + "-" + sx_nam;
      // console.log(this.form.makh.length)
      this.checkMakh = this.form.makh.length;

      // get nhóm lương
      this.nhomluong = await this.$axios.$get(
        `/api/phongban/getnhomluong?masp=${this.form.masp}`
      );
      this.form.nhomluong = this.nhomluong[0].nhomluong;

      // show select nguyencong dongia
      this.dmnguyencong = await this.$axios.$get(
        `/api/phongban/getnguyencong?khsp=${this.form.nhomluong}`
      );

      var today = new Date();
      var dd = String(today.getDate()).padStart(2, "0");
      var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      var yyyy = today.getFullYear();

      today = dd + "/" + mm + "/" + yyyy;
      this.form.ngaygiaophieu = today;
      // console.log(this.selectedPhanxuong);
    },

    showmapx(e) {
      // console.log(this.mapx)
      var name = e.target.options[e.target.options.selectedIndex].text;
      // console.log(name)
      let position = name.split("--");
      this.form.mapx = position[0].trim();
      this.form.tenpx = position[1].trim();
      this.getDssp(this.form.mapx);
      // console.log(position[0].trim())
      // console.log(position[1].trim())
      // console.log(this.form.mapx);
      // console.log(this.form.tenpx);
    },

    // get all phân xưởng
    async get_phanxuong() {
      this.phanxuong = await this.$axios.$get(`/api/phongban/allphanxuong`);
    },
    // get select sản phẩm
    async getDssp() {
      this.ds_sanpham = await this.$axios.$get(`/api/phongban/getdmsp`);
      if (this.ds_sanpham.length <= 0) {
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
          title: "Không có dữ liệu sản phẩm",
        });
      }
    },

    async getMakehoach() {
      this.listlkh = await this.$axios.$get(`/api/lokehoach/getlokh`);
      // console.log(this.listlkh)
      for (let i = 0; i < this.listlkh.length; i++) {
        let mkk = this.listlkh[i].makh.trim();
        this.arrLkh.push(mkk);
      }
      // console.log(this.arrLkh);
    },

    // create phiếu
    onTaophieu() {
      // console.log(this.masp);
      Swal.fire({
        title: "Chắc chắn tạo lô sản xuất này?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Chắc chắn tạo",
      }).then((result) => {
        if (result.isConfirmed) {
          try {
            if (
              this.form.makh == "" ||
              this.form.ngaybd == "" ||
              this.form.ngaykt == "" ||
              this.form.masp == "" ||
              this.form.soluong == ""
            ) {
              // console.log(this.checkMakh)
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
                title: "Yêu cầu nhập đủ thông tin !!!",
              });
            } else {
              // console.log(this.form.makh);
              // console.log(this.arrLkh);
              this.isExits = this.arrLkh.includes(this.form.makh.trim());
              // console.log(this.isExits);
              if (this.isExits == false) {
                if (this.form.makh.length == this.checkMakh) {
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
                    title: "Nhập số hiệu mã kế hoạch",
                  });
                } else {
                  if (this.selectedPhanxuong.length <= 0) {
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
                      title: "Bạn chưa chọn phân xưởng nào cả",
                    });
                  } else {
                    for (let i = 0; i < this.selectedPhanxuong.length; i++) {
                      this.form.mapx = this.selectedPhanxuong[i].mapx;
                      this.form.tenpx = this.selectedPhanxuong[i].tenpx;
                      this.$axios.$post("/api/ketoan/addphieulokh", this.form);
                    }
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
                      title: "Tạo phiếu lô thành công",
                    });

                    window.location.reload();
                  }
                }
              } else {
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
                  title: "Mã lô kế hoạch này đã tồn tại",
                });
              }
            }
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
.table_wrapper {
  display: block;
  overflow-x: auto;
  white-space: nowrap;
  font-size: small;
}

.table_wrapper {
  position: sticky;
  left: 0;
  background-color: whitesmoke;
}

.table-height {
  height: 130px;
  display: block;
  overflow: scroll;
  width: 100%;
  position: sticky;
  top: 0;
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
