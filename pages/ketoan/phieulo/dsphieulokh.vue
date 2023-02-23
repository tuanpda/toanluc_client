<template>
  <div class="columns">
    <div class="column container">
      <br />
      <div class="box" style="margin-left:10px; margin-right:10px;">
        <div class="columns">
          <div class="column">
            <div class="control">
              <span class="icon is-small is-left">
                <i style="color: #f14668" class="fa fa-newspaper-o"></i>
              </span>
              <span style="color: #3850b7; font-size: 14px; font-weight: bold;">Danh sách phiếu lô kế hoạch</span>
            </div>
          </div>
          <div class="column" style="text-align: right">
            <nuxt-link :to="`/`">
              <button class="button is-info is-small">
                <span class="icon is-small">
                  <i class="fas fa-angle-double-left"></i>
                </span>
                <span>Thoát</span>
              </button>
            </nuxt-link>
          </div>
        </div>
        <div class="columns">
          <div class="column is-2" style="text-align: right">
            <div class="control has-icons-left">
              <input v-model="searchmkh" type="text" class="input is-small" />
              <span class="icon is-small is-left">
                <i style="color: #48c78e" class="	fas fa-search"></i>
              </span>
            </div>
          </div>
          <div class="column is-2" style="text-align: left">
            <button @click="Timkiemmakh" class="button is-success is-small">
              <span>Tìm kiếm</span>
            </button>
          </div>
        </div>

        <div class="table_wrapper table-height">
          <table class="table is-responsive is-bordered is-narrow is-fullwidth">
            <tr style="background-color: #fffaeb;">
              <td style="text-align: right; font-size: small; font-weight: bold;" colspan="8">
                <a @click="getAllPhieulo">
                  <span class="icon is-small is-left">
                    <i style="color: #f96854" class="fab fa-audible"></i>
                  </span>
                  Hiển thị tất cả
                </a>
              </td>
            </tr>
            <tr>
              <td style="text-align: center; font-size: small; font-weight: bold;">
                STT
              </td>
              <td style="text-align: center; font-size: small; font-weight: bold;">
                Mã KẾ HOẠCH
              </td>
              <td style="text-align: center; font-size: small; font-weight: bold;">
                Mô tả
              </td>
              <td style="text-align: center; font-size: small; font-weight: bold;">
                Ngày bắt đầu
              </td>
              <td style="text-align: center; font-size: small; font-weight: bold;">
                Ngày kết thúc
              </td>
              <td style="text-align: center; font-size: small; font-weight: bold;">
                Số lượng
              </td>
              <td style="text-align: center; font-size: small; font-weight: bold;">
                Trạng thái
              </td>
            </tr>
            <tr v-for="(pl, index) in phieulo" :key="index + 'a'" :class="{ highlight: pl._id == phieulokh }"
              @click="getdataPhieulo(pl)">
              <td style="text-align: center; font-size: small;">
                {{ index + 1 }}
              </td>
              <td style="font-size: small;">
                {{ pl.makh }}
              </td>
              <td style="font-size: small;">
                {{ pl.mota }}
              </td>
              <td style="text-align: center; font-size: small;">
                {{ pl.tgbatdau | formatDate }}
              </td>
              <td style="text-align: center; font-size: small;">
                {{ pl.tgketthuc | formatDate }}
              </td>
              <td style="text-align: center; font-size: small;">
                {{ pl.soluong }}
              </td>
              <td style="font-size: small; text-align: center;">
                <span v-if="pl.status == false">
                  <i style="color: #ffd863" class="fa fa-circle"></i>
                </span>
                <span v-else><i style="color: #00947e" class="fa fa-circle"></i>
                </span>
              </td>
            </tr>
          </table>
        </div>

        <!-- Modal -->
        <div class="">
          <!-- Toggle class  -->
          <div :class="{ 'is-active': isActive }" class="modal">
            <div class="modal-background"></div>
            <div class="modal-content modal-card">
              <header style="background-color: #3e8ed0; border-top-left-radius: 8px; border-top-right-radius: 8px;">
                <div class="columns">
                  <div class="column is-9">
                    <p style="font-size: small; font-weight: bold; color: white; padding: 15px;">
                      <span class="icon is-small is-left">
                        <i style="color: #ffd863ff" class="fas fa-tags"></i>
                      </span>
                      Cập nhật thông tin mã lô kế hoạch số: {{ phieulokh.makh }}
                    </p>
                  </div>
                  <div class="column" style="text-align:right;">
                    <a @click="isActive = false">
                      <span style="color: red; padding: 20px;" class="icon is-small">
                        <i class="fas fa-power-off"></i>
                      </span>
                    </a>
                  </div>
                </div>
              </header>
              <section class="modal-card-body">
                <div>
                  <div class="table_wrapper">
                    <table class="table is-responsive is-bordered is-narrow is-fullwidth">
                      <tr style="background-color: #fef2ec">
                        <td colspan="2" style="font-size: small; font-weight: bold; color: #485fc7;">
                          Thông tin lô kế hoạch
                        </td>
                      </tr>
                      <tr>
                        <td style="font-size: small; width: 50%;">
                          Mô tả:
                          <span style="font-weight: bold;">{{
    phieulokh.mota
}}</span>
                        </td>
                        <td style="font-size: small; width: 50%;font-weight: bold;">
                          Thay đổi thông tin
                        </td>
                      </tr>
                      <tr>
                        <td style="font-size: small;">
                          Ngày bắt đầu:
                          <span style="font-weight: bold;">{{
    phieulokh.tgbatdau | formatDate
}}</span>
                        </td>
                        <td style="font-size: small;">
                          <input v-model.trim="form.tgbatdau" type="date" class="input is-small" />
                        </td>
                      </tr>
                      <tr>
                        <td style="font-size: small;">
                          Ngày kết thúc:
                          <span style="font-weight: bold;">{{
    phieulokh.tgketthuc | formatDate
}}</span>
                        </td>
                        <td style="font-size: small;">
                          <input v-model.trim="form.tgketthuc" type="date" class="input is-small" />
                        </td>
                      </tr>
                      <tr>
                        <td style="font-size: small;">
                          Số lượng:
                          <span style="font-weight: bold;">{{
    phieulokh.soluong
}}</span>
                        </td>
                        <td>
                          <input v-model.trim="form.soluong" type="text" class="input is-small" />
                        </td>
                      </tr>
                      <tr>
                        <td style="font-size: small;">
                          Trạng thái:
                          <span v-if="phieulokh.status == false">
                            <i style="color: #ffd863" class="fa fa-circle"></i>
                          </span>
                          <span v-else><i style="color: #00947e" class="fa fa-circle"></i>
                          </span>
                        </td>
                        <!-- @change="check($event)" -->
                        <td style="font-size: small; font-weight: 600;">
                          <label class="checkbox is-small">
                            <input type="checkbox" v-model="form.status" />
                            Chốt lô kế hoạch
                          </label>
                        </td>
                      </tr>
                    </table>

                    <table class="table is-responsive is-bordered is-narrow is-fullwidth">
                      <tr>
                        <td colspan="6"
                          style="font-size: small; font-weight: bold; color: #485fc7; background-color: #fffaeb;">
                          Các phân xưởng tham gia sản xuất
                        </td>
                      </tr>
                      <tr>
                        <td style="font-size: small; text-align: center; width: 10%; font-weight: bold;">
                          STT
                        </td>
                        <td style="font-size: small; text-align: center; font-weight: bold;">
                          Mã Kế hoạch tại phân xưởng
                        </td>
                        <td style="font-size: small; text-align: center; font-weight: bold;">
                          Tên phân xưởng
                        </td>
                        <td style="font-size: small; text-align: center; font-weight: bold;">
                          Ngày bắt đầu
                        </td>
                        <td style="font-size: small; text-align: center; font-weight: bold;">
                          Ngày kết thúc
                        </td>
                        <td style="font-size: small; text-align: center; font-weight: bold;">
                          Số lượng
                        </td>
                      </tr>
                      <tr v-for="(px, index) in tenphanxuong" :key="index + 'vvv'" @click="getInfoPhieulsx(px)">
                        <td style="font-size: small; text-align: center; width: 10%;">
                          {{ index + 1 }}
                        </td>
                        <td style="font-size: small; font-weight: 500;">
                          {{ px.makhpx }}
                        </td>
                        <td style="font-size: small; font-weight: 500;">
                          {{ px.tenpx }}
                        </td>
                        <td style="font-size: small; font-weight: 500; text-align: center;">
                          {{ px.ngaybd | formatDate }}
                        </td>
                        <td style="font-size: small; font-weight: 500; text-align: center;">
                          {{ px.ngaykt | formatDate }}
                        </td>
                        <td style="font-size: small; font-weight: 500; text-align: center;">
                          {{ px.soluong }}
                        </td>
                      </tr>
                      <tr>
                        <td colspan="6">
                          <table class="table is-responsive is-bordered is-narrow is-fullwidth">
                            <tr>
                              <td colspan="5" style="font-size: small; font-weight: 600; background-color: whitesmoke;">
                                Thông tin lô sản xuất
                              </td>
                            </tr>
                            <tr>
                              <td style="font-size: small; text-align: center; font-weight: 600; width: 10%;">
                                STT
                              </td>
                              <td style="font-size: small; text-align: center; font-weight: 600;">
                                Mã lô SX
                              </td>
                              <td style="font-size: small; text-align: center; font-weight: 600;">
                                Số lượng SX
                              </td>
                              <td style="font-size: small; text-align: center; font-weight: 600;">
                                TG bắt đầu
                              </td>
                              <td style="font-size: small; text-align: center; font-weight: 600;">
                                TG kết thúc
                              </td>
                            </tr>
                            <tr v-for="(losx, index) in infoLosx" :key="index + 'f'">
                              <td style="font-size: small; text-align: center;">
                                {{ index + 1 }}
                              </td>
                              <td style="font-size: small;">
                                {{ losx.malosx }}
                              </td>
                              <td style="font-size: small; text-align: center;">
                                {{ losx.soluong }}
                              </td>
                              <td style="font-size: small; text-align: center;">
                                {{ losx.ngaybd }}
                              </td>
                              <td style="font-size: small; text-align: center;">
                                {{ losx.ngaykt }}
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>

                    <table class="table is-responsive is-bordered is-narrow is-fullwidth">
                      <tr>
                        <td style="width: 50%">
                          <button class="button is-success is-small is-fullwidth" @click="onUpdate">
                            <span class="icon is-small">
                              <i class="fas fa-check-double"></i>
                            </span>
                            <span>Ghi dữ liệu</span>
                          </button>
                        </td>
                        <td>
                          <a @click="onDelete(phieulokh.makh)">
                            <button class="button is-danger is-small is-fullwidth">
                              <span class="icon is-small">
                                <i class="fas fa-angle-double-left"></i>
                              </span>
                              <span>Xóa</span>
                            </button>
                          </a>
                        </td>
                      </tr>
                    </table>
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
      phieulo: [],
      phanxuong: [],
      tenphanxuong: [],
      infoLosx: [],
      searchmkh: "",
      form: {
        mapx: "",
        tgbatdau: "",
        tgketthuc: "",
        soluong: "",
        updatedAt: null,
        status: false,
      },
      phieulokh: {},
      phieulosx: {},
      isActive: false,
      listlkh: [],
      arrLkh: [],
    };
  },

  mounted() {
    this.currentDateTime();
    this.getPhanxuong();
    this.getAllPhieulo();
    // this.getmalokh()
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
    },

    async getPhanxuong() {
      this.phanxuong = await this.$axios.$get(`/api/phongban/allphanxuong`);
    },

    async getAllPhieulo() {
      this.searchmkh = "";
      this.phieulo = await this.$axios.$get(`/api/ketoan/allphieulokh`);
    },

    async getdataPhieulo(phieulo) {
      this.getmalokh();
      this.isActive = true;
      this.phieulokh = phieulo;
      // console.log(this.phieulokh.makh);
      this.tenphanxuong = await this.$axios.$get(
        `/api/lokehoach/getallpxinmalkh?makh=${this.phieulokh.makh}`
      );
    },

    async getInfoPhieulsx(plsx) {
      this.phieulosx = plsx;
      // console.log(this.phieulosx.mapx);
      this.infoLosx = await this.$axios.$get(
        `/api/lokehoach/getalllsxinlkh?makh=${this.phieulokh.makh}&mapx=${this.phieulosx.mapx}`
      );
    },

    async getPhieulo(e) {
      var name = e.target.options[e.target.options.selectedIndex].text;
      // console.log(name)
      let position = name.split("--");
      // console.log(position)
      this.form.mapx = position[0].trim();
      this.phieulo = await this.$axios.$get(
        `/api/ketoan/allphieulopx?mapx=${this.form.mapx}`
      );
      if (this.phieulo.length <= 0) {
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
          title: "Không có dữ liệu",
        });
      }
    },

    async getmalokh() {
      this.listlkh = await this.$axios.$get(`/api/lokehoach/getlokhinlsx`);
      // console.log(this.listlkh)
      for (let i = 0; i < this.listlkh.length; i++) {
        let mkk = this.listlkh[i].makh.trim();
        this.arrLkh.push(mkk);
      }
      // console.log(this.arrLkh);
    },

    async Timkiemmakh() {
      this.phieulo = await this.$axios.$get(
        `/api/lokehoach/searchmkh?makh=${this.searchmkh}`
      );
    },

    // check(e) {
    //   this.$nextTick(() => {
    //     console.log(this.form.status, e);
    //   });
    // },

    onUpdate() {
      // console.log(this.masp);
      Swal.fire({
        title: "Chắc chắn cập nhật?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Chắc chắn",
      }).then((result) => {
        if (result.isConfirmed) {
          try {
            if (this.form.tgbatdau == "") {
              this.form.tgbatdau = this.phieulokh.tgbatdau;
              // console.log(this.form.ngaybd)
            } else {
              this.form.tgbatdau = this.form.tgbatdau;
              // console.log(this.form.ngaybd)
            }
            if (this.form.tgketthuc == "") {
              this.form.tgketthuc = this.phieulokh.tgketthuc;
            } else {
              this.form.tgketthuc = this.form.tgketthuc;
            }
            if (this.form.soluong == "") {
              this.form.soluong = this.phieulokh.soluong;
            } else {
              this.form.soluong = this.form.soluong;
            }
            if (this.form.status == "") {
              this.form.status = this.phieulokh.status;
            } else {
              this.form.status = this.form.status;
            }
            this.$axios.$patch(
              `/api/lokehoach/phieulo/${this.phieulokh.makh}`,
              this.form
            );
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

    onDelete(makh) {
      swal({
        title: "Bạn muốn xóa lô kế hoạch này?",
        text: "Lô kế hoạch sẽ không lấy lại được sau khi xóa!",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          this.isExits = this.arrLkh.includes(this.phieulokh.makh.trim());
          // console.log(this.isExits)
          if (this.isExits == false) {
            this.$axios.$delete(`/api/lokehoach/dellkhnhamay/${makh}`);
            this.$axios.$delete(`/api/lokehoach/dellokh/${makh}`);
            swal("Xóa thành công", {
              icon: "success",
            });
            // window.location.reload();
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
              title: "Đã có lô sản xuất với kế hoạch này, không thể xóa!",
            });
          }
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

.modal-content,
.modal-card {
  width: 1020px;
  height: 760px;
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

.highlight {
  background-color: #eff5fb;
}

tr:hover {
  cursor: pointer;
  background-color: #ebfffc;
}
</style>
