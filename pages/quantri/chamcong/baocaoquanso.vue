<template>
  <div class="columns">
    <div class="column">
      <br />
      <div class="box" style="margin-left: 20px; margin-right: 20px">
        <div class="columns">
          <div class="column is-11">
            <div class="control">
              <span class="icon is-small is-left">
                <i style="color: #f14668" class="fa fa-calendar"></i>
              </span>
              Báo cáo quân số hàng ngày
            </div>
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
          <table class="table is-responsive is-bordered is-narrow is-fullwidth">
            <tr>
              <td colspan="3" style="text-align: center; font-weight: bold">
                BÁO CÁO QUÂN SỐ TOÀN CÔNG TY
              </td>
            </tr>
            <tr>
              <td style="width: 45%"></td>
              <td>
                <input
                  @blur="baocaoquanso"
                  v-model="ngaychamcong"
                  type="date"
                  class="input is-success is-small"
                />
              </td>
              <td style="width: 45%"></td>
            </tr>
          </table>
          <table class="table is-responsive is-bordered is-narrow is-fullwidth">
            <tr style="background-color: beige">
              <td
                style="
                  text-align: center;
                  font-weight: bold;
                  font-size: small;
                  width: 5%;
                "
              >
                STT
              </td>
              <td
                style="
                  text-align: center;
                  font-weight: bold;
                  font-size: small;
                  width: 10%;
                "
              >
                Mã phân xưởng
              </td>
              <!-- <td
                style="text-align: center; font-weight: bold; font-size: small"
              >
                Tên phân xưởng
              </td> -->
              <td
                style="
                  text-align: center;
                  font-weight: bold;
                  font-size: small;
                  width: 10%;
                "
              >
                Mã tổ
              </td>
              <!-- <td
                style="text-align: center; font-weight: bold; font-size: small"
              >
                Tên tổ
              </td> -->
              <td
                style="
                  text-align: center;
                  font-weight: bold;
                  font-size: small;
                  width: 7%;
                "
              >
                Tổng người
              </td>
              <td
                style="
                  text-align: center;
                  font-weight: bold;
                  font-size: small;
                  width: 6%;
                "
              >
                Ca 1 + HC
              </td>
              <td
                style="
                  text-align: center;
                  font-weight: bold;
                  font-size: small;
                  width: 6%;
                "
              >
                Ca 2 / 3
              </td>
              <td
                style="
                  text-align: center;
                  font-weight: bold;
                  font-size: small;
                  width: 5%;
                "
              >
                Nghỉ P
              </td>
              <td
                style="
                  text-align: center;
                  font-weight: bold;
                  font-size: small;
                  width: 5%;
                "
              >
                Nghỉ M
              </td>
              <td
                style="
                  text-align: center;
                  font-weight: bold;
                  font-size: small;
                  width: 5%;
                "
              >
                Nghỉ K
              </td>
              <td
                style="
                  text-align: center;
                  font-weight: bold;
                  font-size: small;
                  width: 5%;
                "
              >
                Nghỉ X
              </td>
              <td
                style="
                  text-align: center;
                  font-weight: bold;
                  font-size: small;
                  width: 5%;
                "
              >
                Nghỉ L
              </td>
              <td
                style="text-align: center; font-weight: bold; font-size: small"
              >
                Ghi chú
              </td>
              <td
                style="
                  text-align: center;
                  font-weight: bold;
                  font-size: small;
                  width: 5%;
                "
              >
                Xác nhận
              </td>
            </tr>
            <tr
              v-for="(item, index) in sortedTableData"
              :key="index + 'hfsajdhfkdsafh'"
              :class="{ highlighted: item === highlightedRow }"
              @click="[highlightRow(item), detail(item)]"
            >
              <td style="font-size: smaller">
                <input
                  type="number"
                  v-model="item.sort"
                  class="input is-small"
                  @blur="sortTable"
                />
              </td>
              <td style="font-size: smaller">{{ item.mapx }}</td>
              <!-- <td style="font-size: smaller">{{ item.tenpx }}</td> -->
              <td style="font-size: smaller">{{ item.mato }}</td>
              <!-- <td style="font-size: smaller">{{ item.tento }}</td> -->
              <td style="font-size: smaller; text-align: center">
                {{ item.tong_nguoi }}
              </td>
              <td style="font-size: smaller; text-align: center">
                {{ item.ca_1 }}
              </td>
              <td style="font-size: smaller; text-align: center">
                {{ item.ca_2_3 }}
              </td>
              <td style="font-size: smaller; text-align: center">
                {{ item.nghip }}
              </td>
              <td style="font-size: smaller; text-align: center">
                {{ item.nghim }}
              </td>
              <td style="font-size: smaller; text-align: center">
                {{ item.nghik }}
              </td>
              <td style="font-size: smaller; text-align: center">
                {{ item.nghix }}
              </td>
              <td style="font-size: smaller; text-align: center">
                {{ item.nghil }}
              </td>
              <td style="font-size: smaller; text-align: center">
                <input
                  v-model="item.ghichu"
                  type="text"
                  class="input is-small"
                />
              </td>
              <td style="font-size: smaller; text-align: center">
                <a @click="onUpdateCc(item)"
                  ><span>
                    <i style="color: red" class="fa fa-check-circle"></i> </span
                ></a>
              </td>
            </tr>
          </table>

          <table
            v-if="this.detailData.length > 0"
            class="table is-responsive is-bordered is-narrow is-fullwidth"
          >
            <tr style="background-color: beige">
              <td
                style="
                  text-align: center;
                  font-weight: bold;
                  font-size: small;
                  width: 3%;
                "
              >
                STT
              </td>
              <td
                style="
                  text-align: center;
                  font-weight: bold;
                  font-size: small;
                  width: 10%;
                "
              >
                Chấm công
              </td>
              <td
                style="
                  text-align: center;
                  font-weight: bold;
                  font-size: small;
                  width: 15%;
                "
              >
                Công nhân / Nhân viên
              </td>
              <td
                style="text-align: center; font-weight: bold; font-size: small"
              >
                Ghi chú
              </td>
            </tr>
            <tr v-for="(item, index) in detailData" :key="index + 'lkkoko'">
              <td style="font-size: small; text-align: center">
                {{ index + 1 }}
              </td>
              <td style="font-size: small">{{ item.chamcong }}</td>
              <td style="font-size: small">{{ item.tencn }}</td>
              <td style="font-size: small">{{ item.ghichu }}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
export default {
  middleware: "auth-admin",
  data() {
    return {
      phanxuong: [],
      chamcong: [],
      detailData: [],
      ngaychamcong: "",
      isActive: false,
      // hightligh
      highlightedRow: null,
      form: {
        mapx: "",
      },
      tento: "",
      tenpx: "",
      form_data: {
        ngaychamcong: "",
        mapx: "",
        tenpx: "",
        mato: "",
        tento: "",
        tongnguoi: "",
        ca1hc: "",
        ca23: "",
        nghip: "",
        nghim: "",
        nghik: "",
        nghix: "",
        nghil: "",
        tongnghi: "",
        ghichu: "",
        createdAt: "",
        createdBy: this.$auth.$state.user.username,
      },
    };
  },

  computed: {
    sortedTableData() {
      return [...this.chamcong];
    },
  },

  mounted() {
    this.getPhanxuong();
    this.currentDateTime();
  },

  methods: {
    sortTable() {
      this.chamcong.sort((a, b) => a.sort - b.sort);
    },
    // hàm highlight để đánh dấu row nào được chọn
    highlightRow(row) {
      this.highlightedRow = row;
    },

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
      this.form_data.createdAt = date + " " + time;
    },

    async getPhanxuong() {
      this.phanxuong = await this.$axios.$get(`/api/phongban/allphanxuong`);
    },

    async baocaoquanso() {
      // console.log(this.ngaychamcong);
      this.detailData = [];
      this.chamcong = await this.$axios.$get(
        `/api/congnhan/baocaoquanso?ngaychamcong=${this.ngaychamcong}`
      );
      if (this.chamcong.length < 0) {
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
          title: "Không có số liệu",
        });
      }
    },

    async detail(data) {
      // console.log(data);
      const tongnghi =
        data.nghip + data.nghim + data.nghik + data.nghix + data.nghil;
      (this.form_data.ngaychamcong = data.ngaychamcong),
        (this.form_data.mapx = data.mapx),
        (this.form_data.tenpx = data.tenpx),
        (this.form_data.mato = data.mato),
        (this.form_data.tento = data.tento),
        (this.form_data.tongnguoi = data.tong_nguoi),
        (this.form_data.ca1hc = data.ca_1),
        (this.form_data.ca23 = data.ca_2_3),
        (this.form_data.nghip = data.nghip),
        (this.form_data.nghim = data.nghim),
        (this.form_data.nghik = data.nghik),
        (this.form_data.nghix = data.nghix),
        (this.form_data.nghil = data.nghil),
        (this.form_data.tongnghi = tongnghi),
        (this.form_data.ghichu = data.ghichu),
        // console.log(data.ghichu);

        (this.tento = data.tento);
      this.tenpx = data.tenpx;
      if (data.mato === "") {
        this.detailData = await this.$axios.$get(
          `/api/congnhan/detailquansowithdonvi?ngaychamcong=${this.ngaychamcong}&mapx=${data.mapx}`
        );
      } else {
        this.detailData = await this.$axios.$get(
          `/api/congnhan/detailquansowithdonvito?ngaychamcong=${this.ngaychamcong}&mato=${data.mato}`
        );
      }
      // console.log(this.detailData);
    },

    async onUpdateCc(item) {
      // console.log(this.form_data);
      this.form_data.ghichu = item.ghichu;
      const viewData = await this.$axios.$get(
        `/api/congnhan/xemlaibaocaoquanso?ngaychamcong=${this.ngaychamcong}`
      );
      // console.log(viewData);
      const exits = viewData.find(
        (item) =>
          item.ngaychamcong.substring(0, 10) === this.ngaychamcong &&
          item.mapx === this.form_data.mapx
      );
      // console.log(exits);
      if (exits) {
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
          title: "Ngày chấm công này đã được xác nhận rồi",
        });
      } else {
        const reponse = await this.$axios.$post(
          `/api/congnhan/addchamcongphanxuong`,
          this.form_data
        );
        // console.log(reponse);
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
          title: "Updated!",
        });
      }
    },
  },
};
</script>

<style scoped>
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

.highlighted {
  background-color: lightblue;
}
</style>
