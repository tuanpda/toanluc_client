<template>
  <div class="columns">
    <div class="column container">
      <br />
      <div class="box" style="margin-left:10px; margin-right:10px;">
        <div class="columns">
          <div class="column">
            <div class="control">
              <span class="icon is-small is-left">
                <i style="color: #f14668" class="far fa-list-alt"></i>
              </span>
              <span style="color: #3850b7; font-size: 14px; font-weight: bold;"
                >Danh sách phiếu lô sản xuất</span
              >
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
          <div class="column" style="text-align: right">
            <div class="control has-icons-left">
              <div class="select is-small">
                <select @change="getPhieulo($event)">
                  <option selected>-- Chọn phân xưởng --</option>
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
        <div class="columns">
          <div class="column is-2" style="text-align: right">
            <div class="control has-icons-left">
              <input v-model="searchmlsx" type="text" class="input is-small" />
              <span class="icon is-small is-left">
                <i style="color: #48c78e" class="	fas fa-search"></i>
              </span>
            </div>
          </div>
          <div class="column is-2" style="text-align: left">
            <button @click="Timkiemmalosx" class="button is-success is-small">
              <span>Tìm kiếm</span>
            </button>
          </div>
        </div>

        <div class="table_wrapper table-height">
          <table class="table is-responsive is-bordered is-narrow is-fullwidth">
            <tr style="background-color: #fffaeb;">
              <td
                style="text-align: left; font-size: small; font-weight: bold;"
                colspan="13"
              >
                <a @click="getAllPhieulo">
                  <span class="icon is-small is-left">
                    <i style="color: #f96854" class="fab fa-audible"></i>
                  </span>
                  Hiển thị tất cả
                </a>
              </td>
            </tr>
            <tr>
              <td
                style="text-align: center; font-size: small; font-weight: bold; width: 5%;"
              >
                STT
              </td>
              <td
                style="text-align: center; font-size: small; font-weight: bold;"
              >
                Tên xưởng
              </td>
              <td
                style="text-align: center; font-size: small; font-weight: bold;"
              >
                Mã lô sản xuất
              </td>
              <td
                style="text-align: center; font-size: small; font-weight: bold;"
              >
                Số lượng
              </td>
              <td
                style="text-align: center; font-size: small; font-weight: bold;"
              >
                Ngày bắt đầu
              </td>
              <td
                style="text-align: center; font-size: small; font-weight: bold;"
              >
                Ngày kết thúc
              </td>
              <td
                style="text-align: center; font-size: small; font-weight: bold;"
              >
                Trạng thái
              </td>
              <td
                style="text-align: center; font-size: small; font-weight: bold; background-color: #fef2ec;"
              >
                Kế hoạch nhà máy
              </td>
              <td
                style="text-align: center; font-size: small; font-weight: bold; background-color: #fef2ec;"
              >
                Kế hoạch phân xưởng
              </td>
              <td
                style="text-align: center; font-size: small; font-weight: bold; background-color: #fef2ec;"
              >
                Mã sản phẩm
              </td>
            </tr>
            <tr
              v-for="(pl, index) in phieulo"
              :key="index + 'a'"
              :class="{ highlight: pl._id == phieulosx }"
              @click="getdataPhieulo(pl)"
            >
              <td style="text-align: center; font-size: small;">
                {{ index + 1 }}
              </td>
              <td style="font-size: small;">
                {{ pl.tenpx }}
              </td>
              <td style="font-size: small;">
                {{ pl.malosx }}
              </td>
              <td style="text-align: center; font-size: small;">
                {{ pl.soluong }}
              </td>
              <td style="text-align: center; font-size: small;">
                {{ pl.ngaybd }}
              </td>
              <td style="text-align: center; font-size: small;">
                {{ pl.ngaykt }}
              </td>
              <td style="font-size: small; text-align: center;">
                <span v-if="pl.status == false">
                  <i style="color: #ffd863" class="fa fa-circle"></i>
                </span>
                <span v-else
                  ><i style="color: #00947e" class="fa fa-circle"></i>
                </span>
              </td>
              <td style="font-size: small; background-color: #fef2ec;">
                {{ pl.makh }}
              </td>
              <td style="font-size: small; background-color: #fef2ec;">
                {{ pl.makhpx }}
              </td>
              <td style="font-size: small; background-color: #fef2ec;">
                {{ pl.masp }}
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
              <header
                style="background-color: #3e8ed0; border-top-left-radius: 8px; border-top-right-radius: 8px;"
              >
                <div class="columns">
                  <div class="column is-9">
                    <p
                      style="font-size: small; font-weight: bold; color: white; padding: 15px;"
                    >
                      <span class="icon is-small is-left">
                        <i style="color: #ffd863ff" class="fas fa-tags"></i>
                      </span>
                      Thông tin về lô sản xuất mã số: {{ phieulosx.malosx }}
                    </p>
                  </div>
                  <div class="column" style="text-align:right;">
                    <a @click="isActive = false">
                      <span
                        style="color: red; padding: 20px;"
                        class="icon is-small"
                      >
                        <i class="fas fa-power-off"></i>
                      </span>
                    </a>
                  </div>
                </div>
              </header>
              <section class="modal-card-body">
                <div>
                  <div class="table_wrapper">
                    <table
                      class="table is-responsive is-bordered is-narrow is-fullwidth"
                    >
                      <tr style="background-color: #fef2ec">
                        <td
                          colspan="2"
                          style="font-size: small; font-weight: bold; color: #485fc7;"
                        >
                          Thông tin lô sản xuất
                        </td>
                      </tr>
                      <tr>
                        <td style="font-size: small; width: 30%;">
                          Tên phân xưởng sản xuất
                        </td>
                        <td style="font-size: small;">
                          <span style="font-size: small; font-weight: 700;">{{
                            phieulosx.tenpx
                          }}</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="font-size: small;">
                          Số lượng kế hoạch sản xuất
                        </td>
                        <td style="font-size: small;">
                          <span style="font-size: small; font-weight: 700;">{{
                            phieulosx.soluong
                          }}</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="font-size: small;">
                          Số lượng thực tế sản xuất
                        </td>
                        <td style="font-size: small;">
                          <span style="font-size: small; font-weight: 700;">{{
                            phieulosx.slthuctetaixuong
                          }}</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="font-size: small;">
                          Ngày bắt đầu sản xuất
                        </td>
                        <td style="font-size: small;">
                          <span style="font-size: small; font-weight: 700;">{{
                            phieulosx.ngaybd
                          }}</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="font-size: small;">
                          Ngày kết thúc sản xuất
                        </td>
                        <td style="font-size: small;">
                          <span style="font-size: small; font-weight: 700;">{{
                            phieulosx.ngaykt
                          }}</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="font-size: small;">
                          Tổng số đạt
                        </td>
                        <td style="font-size: small;">
                          <span style="font-size: small; font-weight: 700;">{{
                            phieulosx.tongdat
                          }}</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="font-size: small;">
                          Tổng số hỏng
                        </td>
                        <td style="font-size: small;">
                          <span style="font-size: small; font-weight: 700;">{{
                            phieulosx.tonghong
                          }}</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="font-size: small;">
                          Trạng thái lô sản xuất
                        </td>
                        <td style="font-size: small;">
                          <!-- <span style="font-size: small; font-weight: 700;">{{
                            phieulosx.status
                          }}</span> -->
                          <span v-if="phieulosx.status == false">
                            <span style="font-size: small; font-weight: 700;"
                              >Chưa hoàn thành</span
                            >
                            &nbsp;
                            <i style="color: #ffd863" class="fa fa-circle"></i>
                          </span>
                          <span v-else>
                            <span style="font-size: small; font-weight: 700;"
                              >Đã hoàn thành</span
                            >
                            &nbsp;<i
                              style="color: #00947e"
                              class="fa fa-circle"
                            ></i>
                          </span>
                        </td>
                      </tr>
                    </table>

                    <div v-if="allluongcongdoan.length > 0">
                      <table
                        class="table is-responsive is-bordered is-narrow is-fullwidth"
                      >
                        <tr style="background-color: #feecf0">
                          <td
                            colspan="8"
                            style="font-weight: bold; font-size: small;"
                          >
                            Công đoạn đã thực hiện
                          </td>
                        </tr>
                        <tr>
                          <td
                            style="font-size: small; text-align: center; font-weight: bold; width: 5%;"
                          >
                            STT
                          </td>
                          <td
                            style="font-size: small; text-align: center; font-weight: bold; width: 25%;"
                          >
                            Nguyên công
                          </td>
                          <td
                            style="font-size: small; text-align: center; font-weight: bold; width: 15%;"
                          >
                            Đơn giá
                          </td>
                          <td
                            style="font-size: small; text-align: center; font-weight: bold;"
                          >
                            Người thực hiện
                          </td>
                          <td
                            style="font-size: small; text-align: center; font-weight: bold; width: 8%"
                          >
                            Số đạt
                          </td>
                          <td
                            style="font-size: small; text-align: center; font-weight: bold; width: 7%"
                          >
                            Số hỏng
                          </td>
                        </tr>
                        <tr
                          v-for="(item, index) in allluongcongdoan"
                          :key="index + 'ppp'"
                        >
                          <td style="font-size: small; text-align: center;">
                            {{ index + 1 }}
                          </td>
                          <td style="font-size: small;">
                            {{ item.nguyencong }}
                          </td>
                          <td style="font-size: small; text-align: center;">
                            {{ item.dongia | formatNumber }}
                          </td>
                          <td style="font-size: small;">{{ item.tencn }}</td>
                          <td style="font-size: small; text-align: center;">
                            <input
                              type="text"
                              class="input is-small"
                              v-model="item.sodat"
                            />
                          </td>
                          <td style="font-size: small; text-align: center;">
                            <input
                              type="text"
                              class="input is-small"
                              v-model="item.sohong"
                            />
                          </td>
                        </tr>
                      </table>
                    </div>

                    <div v-if="allluongcongnhat.length > 0">
                      <table
                        class="table is-responsive is-bordered is-narrow is-fullwidth"
                      >
                        <tr style="background-color: #feecf0">
                          <td
                            colspan="8"
                            style="font-weight: bold; font-size: small;"
                          >
                            Công nhật đã thực hiện
                          </td>
                        </tr>
                        <tr>
                          <td
                            style="font-size: small; text-align: center; font-weight: bold; width: 5%;"
                          >
                            STT
                          </td>
                          <td
                            style="font-size: small; text-align: center; font-weight: bold; width: 25%;"
                          >
                            Tên công nhật
                          </td>
                          <td
                            style="font-size: small; text-align: center; font-weight: bold; width: 15%;"
                          >
                            Đơn giá
                          </td>
                          <td
                            style="font-size: small; text-align: center; font-weight: bold;"
                          >
                            Người thực hiện
                          </td>
                          <td
                            style="font-size: small; text-align: center; font-weight: bold; width:16.4%"
                          >
                            Số giờ
                          </td>
                        </tr>
                        <tr
                          v-for="(item, index) in allluongcongnhat"
                          :key="index + 'ppp'"
                        >
                          <td style="font-size: small; text-align: center;">
                            {{ index + 1 }}
                          </td>
                          <td style="font-size: small;">
                            {{ item.tencongnhat }}
                          </td>
                          <td style="font-size: small; text-align: center;">
                            {{ item.dongia | formatNumber }}
                          </td>
                          <td style="font-size: small;">
                            {{ item.nguoithuchien }}
                          </td>
                          <td style="font-size: small; text-align: center;">
                            <input
                              class="input is-small"
                              v-model.trim="item.sogiocong"
                            />
                          </td>
                        </tr>
                      </table>
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
      phanxuong: [],
      phieulo: [],
      searchmlsx: "",
      form: {
        mapx: "",
      },
      phieulosx: {},
      isActive: false,
      allluongcongdoan: [],
      allluongcongnhat: [],
    };
  },

  mounted() {
    this.getPhanxuong();
    this.getAllPhieulo();
  },

  methods: {
    async getPhanxuong() {
      this.phanxuong = await this.$axios.$get(`/api/phongban/allphanxuong`);
    },

    async getAllPhieulo() {
      this.searchmlsx = "";
      this.phieulo = await this.$axios.$get(`/api/ketoan/allphieulosx`);
    },

    async Timkiemmalosx() {
      this.phieulo = await this.$axios.$get(
        `/api/lokehoach/searchlsx?malosx=${this.searchmlsx}`
      );
    },

    async getdataPhieulo(phieulo) {
      this.isActive = true;
      this.phieulosx = phieulo;
      // console.log(this.phieulosx);
      this.allluongcongdoan = await this.$axios.$get(
        `/api/ketoan/getallluongcongdoaninlsx?makh=${this.phieulosx.makh}&makhpx=${this.phieulosx.makhpx}&malosx=${this.phieulosx.malosx}`
      );
      this.allluongcongnhat = await this.$axios.$get(
        `/api/ketoan/getallluongcongnhatinlsx?makh=${this.phieulosx.makh}&makhpx=${this.phieulosx.makhpx}&malosx=${this.phieulosx.malosx}`
      );
    },

    async getPhieulo(e) {
      var name = e.target.options[e.target.options.selectedIndex].text;
      // console.log(name)
      let position = name.split("--");
      // console.log(position)
      this.form.mapx = position[0].trim();
      this.phieulo = await this.$axios.$get(
        `/api/ketoan/getallmalsxpx?mapx=${this.form.mapx}`
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

    onDelete(id) {
      swal({
        title: "Bạn muốn xóa lô sản xuất này?",
        text: "Lô sản xuất sẽ không lấy lại được sau khi xóa!",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          this.$axios.$delete(`/api/lokehoach/losanxuat/${id}`);
          swal("Xóa thành công, F5 lại trang để thay đổi dữ liệu", {
            icon: "success",
          });
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
  width: 820px;
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
