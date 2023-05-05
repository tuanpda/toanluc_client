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
                style="text-align: center; font-weight: bold; font-size: small"
              >
                Mã phân xưởng
              </td>
              <td
                style="text-align: center; font-weight: bold; font-size: small"
              >
                Tên phân xưởng
              </td>
              <td
                style="text-align: center; font-weight: bold; font-size: small"
              >
                Mã tổ
              </td>
              <td
                style="text-align: center; font-weight: bold; font-size: small"
              >
                Tên tổ
              </td>
              <td
                style="text-align: center; font-weight: bold; font-size: small"
              >
                Tổng người
              </td>
              <td
                style="text-align: center; font-weight: bold; font-size: small"
              >
                Ca 1 + HC
              </td>
              <td
                style="text-align: center; font-weight: bold; font-size: small"
              >
                Ca 2 / 3
              </td>
              <td
                style="text-align: center; font-weight: bold; font-size: small"
              >
                Nghỉ P
              </td>
              <td
                style="text-align: center; font-weight: bold; font-size: small"
              >
                Nghỉ M
              </td>
              <td
                style="text-align: center; font-weight: bold; font-size: small"
              >
                Nghỉ K
              </td>
              <td
                style="text-align: center; font-weight: bold; font-size: small"
              >
                Nghỉ X
              </td>
              <td
                style="text-align: center; font-weight: bold; font-size: small"
              >
                Nghỉ L
              </td>
            </tr>
            <tr
              v-for="(item, index) in chamcong"
              :key="index + 'hfsajdhfkdsafh'"
              :class="{ highlighted: item === highlightedRow }"
              @click="[highlightRow(item), detail(item)]"
            >
              <td style="font-size: smaller">{{ item.mapx }}</td>
              <td style="font-size: smaller">{{ item.tenpx }}</td>
              <td style="font-size: smaller">{{ item.mato }}</td>
              <td style="font-size: smaller">{{ item.tento }}</td>
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
            </tr>
          </table>
        </div>

        <div class="">
          <!-- Toggle class  -->
          <div :class="{ 'is-active': isActive }" class="modal">
            <div class="modal-background"></div>
            <div class="modal-content modal-card">
              <header
                style="
                  background-color: #3e8ed0;
                  border-top-left-radius: 8px;
                  border-top-right-radius: 8px;
                "
              >
                <div class="columns">
                  <div class="column is-9">
                    <p
                      style="
                        font-size: small;
                        font-weight: bold;
                        color: white;
                        padding: 15px;
                      "
                    >
                      Phân xưởng: {{ tenpx }} |
                      <template v-if="tento != ''">
                        Tổ:
                        {{ tento }}
                      </template>
                    </p>
                  </div>

                  <div class="column" style="text-align: right">
                    <a @click="isActive = false">
                      <span
                        style="color: red; padding: 20px"
                        class="icon is-small"
                      >
                        <i class="fas fa-power-off"></i>
                      </span>
                    </a>
                  </div>
                </div>
              </header>
              <section class="modal-card-body">
                <table
                  class="table is-responsive is-bordered is-narrow is-fullwidth"
                >
                  <tr style="background-color: beige">
                    <td
                      style="
                        font-size: small;
                        font-weight: bold;
                        text-align: center;
                        width: 5%;
                      "
                    >
                      STT
                    </td>
                    <td
                      style="
                        font-size: small;
                        font-weight: bold;
                        text-align: center;
                        width: 30%;
                      "
                    >
                      Nội dung
                    </td>
                    <td
                      style="
                        font-size: small;
                        font-weight: bold;
                        text-align: center;
                      "
                    >
                      Công nhân / Nhân viên
                    </td>
                  </tr>
                  <tr
                    v-for="(item, index) in detailData"
                    :key="index + 'lkkoko'"
                  >
                    <td style="font-size: small">{{ index + 1 }}</td>
                    <td style="font-size: small">{{ item.chamcong }}</td>
                    <td style="font-size: small">{{ item.tencn }}</td>
                  </tr>
                </table>
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
    };
  },

  mounted() {
    this.getPhanxuong();
  },

  methods: {
    // hàm highlight để đánh dấu row nào được chọn
    highlightRow(row) {
      this.highlightedRow = row;
    },

    async getPhanxuong() {
      this.phanxuong = await this.$axios.$get(`/api/phongban/allphanxuong`);
    },

    async baocaoquanso() {
      // console.log(this.ngaychamcong);
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
      //   console.log(data);
      this.tento = data.tento;
      this.tenpx = data.tenpx;
      this.isActive = true;
      if (data.mato === "") {
        this.detailData = await this.$axios.$get(
          `/api/congnhan/detailquansowithdonvi?ngaychamcong=${this.ngaychamcong}&mapx=${data.mapx}`
        );
      } else {
        this.detailData = await this.$axios.$get(
          `/api/congnhan/detailquansowithdonvito?ngaychamcong=${this.ngaychamcong}&mato=${data.mato}`
        );
      }
      console.log(this.detailData);
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
