<template>
  <div class="columns is-mobile">
    <div class="column is-10 is-offset-1">
      <div class="box" style="margin-top: 10px">
        <div class="columns">
          <div class="column">
            <div class="control has-icons-left">
              <div class="select is-small">
                <select
                  @change="loadCongnhan($event)"
                  :disabled="!isSelectsEnabled"
                >
                  <option selected>-- Chọn phân xưởng --</option>
                  <option v-for="item in phanxuong" :value="item.mapx">
                    {{ item.mapx }} -- {{ item.tenpx }}
                  </option>
                </select>
              </div>
              <span class="icon is-small is-left">
                <i style="color: #48c78e" class="fas fa-kaaba"></i>
              </span>
              <div class="select is-small">
                <select
                  @change="getWithTo($event)"
                  :disabled="!isSelectsEnabled"
                >
                  <option selected>-- Chọn tổ --</option>
                  <option v-for="item in tonhomid" :value="item.mapx">
                    {{ item.mato }} -- {{ item.tento }}
                  </option>
                </select>
              </div>
              <span class="icon is-small is-left">
                <i style="color: #48c78e" class="fas fa-kaaba"></i>
              </span>
              <div class="select is-small">
                <select
                  @change="vanphong($event)"
                  :disabled="!isSelectsEnabled_VP"
                >
                  <option selected>-- Văn phòng --</option>
                  <option value="vanphong">Nhân viên văn phòng</option>
                </select>
              </div>
              <span class="icon is-small is-left">
                <i style="color: #48c78e" class="fas fa-kaaba"></i>
              </span>
            </div>
          </div>
        </div>
        <div class="table_wrapper table-height">
          <table class="table is-responsive is-bordered is-narrow is-fullwidth">
            <tr style="background-color: aliceblue">
              <td style="width: 5%">
                <input
                  type="date"
                  v-model="ngaychamcong"
                  class="input is-small is-danger"
                  @blur="lockChoosee"
                />
              </td>
              <td style="width: 5%">
                <span style="font-size: small; font-weight: bold"
                  >Tuần: {{ weekNumber }}</span
                >
              </td>
              <td style="width: 5%">
                <div class="select is-small">
                  <select
                    @change="chamcong($event)"
                    :disabled="!isSelectsEnabled_Chamcong"
                  >
                    <option selected>-- Chấm công --</option>
                    <option
                      v-for="item in chamcongList"
                      :value="item.machamcong"
                    >
                      {{ item.machamcong }} -- {{ item.chamcong }}
                    </option>
                  </select>
                </div>
              </td>
              <td style="width: 7%">
                <button @click="onChamcong()" class="button is-small is-info">
                  Chấm công
                </button>
              </td>
              <td></td>
            </tr>
          </table>
          <table class="table is-responsive is-bordered is-narrow is-fullwidth">
            <tr style="background-color: antiquewhite">
              <td
                style="
                  font-size: small;
                  font-weight: bold;
                  text-align: center;
                  width: 2%;
                "
              >
                <input type="checkbox" v-model="selectAll" />
              </td>
              <td
                style="
                  font-size: small;
                  font-weight: bold;
                  text-align: center;
                  width: 3%;
                "
              >
                STT
              </td>
              <td
                style="
                  font-size: small;
                  font-weight: bold;
                  text-align: center;
                  width: 5%;
                "
              >
                Mã CN
              </td>
              <td
                style="
                  font-size: small;
                  font-weight: bold;
                  text-align: center;
                  width: 13%;
                "
              >
                Tên CN
              </td>
              <td
                style="
                  font-size: small;
                  font-weight: bold;
                  text-align: center;
                  width: 5%;
                "
              >
                STT CN
              </td>
              <td
                style="
                  font-size: small;
                  font-weight: bold;
                  text-align: center;
                  width: 7%;
                "
              >
                Mã CC
              </td>
              <td
                style="
                  font-size: small;
                  font-weight: bold;
                  text-align: center;
                  width: 20%;
                "
              >
                Diễn giải
              </td>
              <td
                style="
                  font-size: small;
                  font-weight: bold;
                  text-align: center;
                  width: 20%;
                "
              >
                Ghi chú
              </td>
              <td></td>
            </tr>
            <tr v-for="(cn, index) in items" :key="index + 'jhjl'">
              <td style="text-align: center">
                <input
                  v-model="selected"
                  :value="{ index: index, value: cn }"
                  type="checkbox"
                />
              </td>
              <td style="font-size: small; text-align: center">
                {{ index + 1 }}
              </td>
              <td style="font-size: small">{{ cn.macn }}</td>
              <td style="font-size: small">{{ cn.tencn }}</td>
              <td style="font-size: small; text-align: center">
                {{ cn.sttchon }}
              </td>
              <td style="font-size: small; text-align: center">
                <!-- <div class="select is-small">
                  <select @change="chamcong($event, cn, index)">
                    <option selected>-- Chấm công --</option>
                    <option
                      v-for="item in cn.listChamcong"
                      :value="item.machamcong"
                    >
                      {{ item.machamcong }} -- {{ item.chamcong }}
                    </option>
                  </select>
                </div> -->
                <input
                  type="text"
                  v-model="cn.machamcong"
                  class="input is-small is-danger"
                  disabled
                />
              </td>
              <td style="font-size: small; text-align: center">
                <input type="text" class="input is-small" />
              </td>
              <td style="font-size: small; text-align: center">
                <input type="text" class="input is-small" />
              </td>
              <td></td>
            </tr>
          </table>
          <table
            v-if="showNgaychamcong.length > 0"
            class="table is-responsive is-bordered is-narrow is-fullwidth"
          >
            <tr style="background-color: floralwhite">
              <td
                style="font-size: small; font-weight: bold; text-align: center"
              >
                STT
              </td>
              <td
                style="font-size: small; font-weight: bold; text-align: center"
              >
                Mã CN
              </td>
              <td
                style="font-size: small; font-weight: bold; text-align: center"
              >
                Tên CN
              </td>
              <td
                style="font-size: small; font-weight: bold; text-align: center"
              >
                Mã PX
              </td>
              <td
                style="font-size: small; font-weight: bold; text-align: center"
              >
                Tên PX
              </td>
              <td
                style="font-size: small; font-weight: bold; text-align: center"
              >
                Mã chấm công
              </td>
              <td
                style="font-size: small; font-weight: bold; text-align: center"
              >
                Chấm công
              </td>
              <td
                style="font-size: small; font-weight: bold; text-align: center"
              >
                Ngày chấm công
              </td>
              <td
                style="font-size: small; font-weight: bold; text-align: center"
              >
                Tuần
              </td>
              <td
                style="font-size: small; font-weight: bold; text-align: center"
              >
                Ngày tạo
              </td>
              <td
                style="font-size: small; font-weight: bold; text-align: center"
              >
                User tạo
              </td>
            </tr>
            <tr v-for="(item, index) in showNgaychamcong" :key="index">
              <td
                style="font-size: small; text-align: center"
              >
                {{ index + 1 }}
              </td>
              <td
                style="font-size: small; text-align: center"
              >
                {{ item.macn }}
              </td>
              <td style="font-size: small;">
                {{ item.tencn }}
              </td>
              <td
                style="font-size: small; text-align: center"
              >
                {{ item.mapx }}
              </td>
              <td style="font-size: small;">
                {{ item.tenpx }}
              </td>
              <td
                style="font-size: small; text-align: center"
              >
                <input type="text" class="input is-small" v-model="item.machamcong">
              </td>
              <td
                style="font-size: small; text-align: center"
              >
              <input type="text" class="input is-small" v-model="item.chamcong">
              </td>
              <td
                style="font-size: small; text-align: center"
              >
                {{ item.ngaychamcong | formatDate }}
              </td>
              <td
                style="font-size: small; text-align: center"
              >
                {{ item.tuanchamcong }}
              </td>
              <td
                style="font-size: small; text-align: center"
              >
                {{ item.createdAt | formatDate }}
              </td>
              <td
                style="font-size: small; text-align: center"
              >
                {{ item.createdBy }}
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import moment from "moment";
export default {
  middleware: "auth",
  data() {
    return {
      phanxuong: [],
      cong_nhan: [],
      tonhomid: [],
      nhanvien: [],
      currentDate: "",
      ngaychamcong: "",
      weekNumber: 0,
      selected: [],
      isSelectsEnabled: false,
      isSelectsEnabled_VP: false,
      isSelectsEnabled_Chamcong: false,
      showNgaychamcong: [],
      form: {
        mapx: "",
        tenpx: "",
        mato: "",
        tento: "",
        createdAt: "",
      },
      chamcongList: [
        { machamcong: "1", chamcong: "Ca 1" },
        { machamcong: "2", chamcong: "Ca 2" },
        { machamcong: "3", chamcong: "Ca 3" },
        { machamcong: "M", chamcong: "Nghỉ Ốm" },
        { machamcong: "P", chamcong: "Nghỉ phép" },
        { machamcong: "K", chamcong: "Nghỉ không phép" },
        { machamcong: "X", chamcong: "Nghỉ kế hoạch" },
        { machamcong: "L", chamcong: "Nghỉ lễ, cuối tuần" },
      ],
      items: [
        {
          macn: "",
          tencn: "",
          mapx: "",
          tenpx: "",
          mato: "",
          tento: "",
          sttchon: "",
          machamcong: "",
          chamcong: "",
          listChamcong: [{ machamcong: "", chamcong: "" }],
          diengiai: "",
          ghichu: "",
          ngaychamcong: this.ngaychamcong,
          tuanchamcong: this.weekNumber,
          createdAt: "",
          createdBy: this.$auth.$state.user.username,
        },
      ],
    };
  },

  mounted() {
    this.get_phanxuong();
    this.currentDateTime();
    this.deleteRow(0);
    this.updateWeekNumber();
    this.currentDate = new Date().toISOString().slice(0, 10);
    this.weekNumber = moment(this.currentDate).isoWeek();
  },

  computed: {
    // chọn hết
    selectAll: {
      get: function () {
        return this.selected.length === this.items.length;
      },
      set: function (value) {
        if (value) {
          this.selected = this.items.map((cn, index) => ({ index, value: cn }));
        } else {
          this.selected = [];
        }
      },
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
      this.form.createdAt = date + " " + time;
    },

    deleteRow(index) {
      this.items.splice(index, 1);
    },

    updateWeekNumber() {
      this.weekNumber = moment(this.currentDate).isoWeek();
    },

    // get all phân xưởng
    async get_phanxuong() {
      this.phanxuong = await this.$axios.$get(`/api/phongban/allphanxuong`);
    },

    getWeek(date) {
      const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
      const daysSinceFirstDay = (date - firstDayOfYear) / 86400000;
      const daysUntilFirstThursday = 4 - (firstDayOfYear.getDay() || 7);
      const weekNumber =
        Math.floor((daysSinceFirstDay + daysUntilFirstThursday) / 7) + 1;
      return weekNumber;
    },

    // yêu cầu chọn ngày chấm công trước
    async lockChoosee() {
      this.isSelectsEnabled = true;
      this.isSelectsEnabled_VP = true;
      // console.log(this.ngaychamcong);
      const date = new Date(this.ngaychamcong);
      const weekNumber = this.getWeek(date);
      this.weekNumber = weekNumber;

      // kiểm tra xem có dữ liệu ngày chấm công trong csdl chưa
      // const getNgaychamcong = await this.$axios.$get(
      //   `/api/congnhan/getngaychamcongonsv`
      // );
      // const exits = getNgaychamcong.find(
      //   (item) => item.ngaychamcong.substring(0, 10) === this.ngaychamcong
      // );

      // if (exits) {
      //   const Toast = Swal.mixin({
      //     toast: true,
      //     position: "top-end",
      //     showConfirmButton: false,
      //     timer: 3000,
      //     timerProgressBar: true,
      //     didOpen: (toast) => {
      //       toast.addEventListener("mouseenter", Swal.stopTimer);
      //       toast.addEventListener("mouseleave", Swal.resumeTimer);
      //     },
      //   });
      //   Toast.fire({
      //     icon: "error",
      //     title: "Ngày này đã được chấm công rồi. Liên hệ người quản trị",
      //   });
      // } else {
      //   this.isSelectsEnabled = true;
      //   this.isSelectsEnabled_VP = true;
      //   // console.log(this.ngaychamcong);
      //   const date = new Date(this.ngaychamcong);
      //   const weekNumber = this.getWeek(date);
      //   this.weekNumber = weekNumber;
      // }
    },

    async loadCongnhan(e) {
      this.isSelectsEnabled_VP = false;
      var name = e.target.options[e.target.options.selectedIndex].text;
      let position = name.split("--");
      this.form.mapx = position[0].trim();
      this.form.tenpx = position[1].trim();
      this.cong_nhan = await this.$axios.$get(
        `/api/congnhan/allcongnhanpx?mapx=${this.form.mapx}`
      );
      this.tonhomid = await this.$axios.$get(
        `/api/phongban/alltoinxuong?mapx=${this.form.mapx}`
      );
      // console.log(this.cong_nhan);
      this.items = [];
      if (this.tonhomid.length <= 0) {
        // kiểm tra xem có dữ liệu ngày chấm công trong csdl chưa
        this.showNgaychamcong = await this.$axios.$get(
          `/api/congnhan/showngaychamcongandmapx?mapx=${this.form.mapx}&ngaychamcong=${this.ngaychamcong}`
        );
        // console.log(getNgaychamcong);
        if (this.showNgaychamcong.length > 0) {
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
            title: `Phân xưởng ${this.form.tenpx} đã được chấm công vào ngày ${this.ngaychamcong} rồi!!!`,
          });
        } else {
          this.isSelectsEnabled_Chamcong = true;
          for (let i = 0; i < this.cong_nhan.length; i++) {
            this.items.push({
              macn: this.cong_nhan[i].macn,
              tencn: this.cong_nhan[i].tencn,
              mapx: this.cong_nhan[i].mapx,
              tenpx: this.cong_nhan[i].tenpx,
              mato: "",
              tento: "",
              sttchon: this.cong_nhan[i].sttchon,
              machamcong: "",
              chamcong: "",
              diengiai: "",
              ghichu: "",
              ngaychamcong: this.ngaychamcong,
              tuanchamcong: this.weekNumber,
              createdAt: this.form.createdAt,
              createdBy: this.$auth.$state.user.username,
            });
          }
        }
      } else {
        this.items = [];
      }
      // console.log(this.items);
    },

    async chamcong(e) {
      var name = e.target.options[e.target.options.selectedIndex].text;
      let position = name.split("--");
      const machamcong = position[0];
      const chamcong = position[1];
      // console.log(machamcong, chamcong);
      // console.log(this.selected.length);
      for (let i = 0; i < this.selected.length; i++) {
        const index = this.selected[i].index;
        this.items[index].machamcong = machamcong;
        this.items[index].chamcong = chamcong;
      }

      // console.log(this.items);
      this.selected = [];
    },

    async getWithTo(e) {
      var name = e.target.options[e.target.options.selectedIndex].text;
      let position = name.split("--");
      this.mato = position[0];
      this.tento = position[1];
      this.cong_nhan = await this.$axios.$get(
        `/api/congnhan/allcongnhanto?mato=${this.mato}`
      );
      // console.log(this.cong_nhan);
      const getNgaychamcong = await this.$axios.$get(
        `/api/congnhan/showngaychamcongandmapx?mapx=${this.form.mapx}&ngaychamcong=${this.ngaychamcong}`
      );
      if (getNgaychamcong.length > 0) {
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
          title: `Tổ ${this.form.tento} đã được chấm công vào ngày ${this.ngaychamcong} rồi!!!`,
        });
      } else {
        this.isSelectsEnabled_Chamcong = true;
        this.items = [];
        for (let i = 0; i < this.cong_nhan.length; i++) {
          this.items.push({
            macn: this.cong_nhan[i].macn,
            tencn: this.cong_nhan[i].tencn,
            mapx: this.cong_nhan[i].mapx,
            tenpx: this.cong_nhan[i].tenpx,
            mato: this.cong_nhan[i].mato,
            tento: this.cong_nhan[i].tento,
            sttchon: this.cong_nhan[i].sttchon,
            machamcong: "",
            chamcong: "",
            diengiai: "",
            ghichu: "",
            ngaychamcong: this.ngaychamcong,
            tuanchamcong: this.weekNumber,
            createdAt: this.form.createdAt,
            createdBy: this.$auth.$state.user.username,
          });
        }
      }

      // console.log(this.items);
    },

    async vanphong() {
      this.isSelectsEnabled = false;
      this.nhanvien = await this.$axios.$get(`/api/nhanvien/`);
      // console.log(this.nhanvien);
      this.items = [];
      for (let i = 0; i < this.nhanvien.length; i++) {
        this.items.push({
          macn: this.nhanvien[i].manv,
          tencn: this.nhanvien[i].tennv,
          mapx: "HCVP",
          tenpx: "Hành chính",
          mato: "",
          tento: "",
          sttchon: "",
          machamcong: "",
          chamcong: "",
          diengiai: "",
          ghichu: "",
          ngaychamcong: this.ngaychamcong,
          tuanchamcong: this.weekNumber,
          createdAt: this.form.createdAt,
          createdBy: this.$auth.$state.user.username,
        });
      }
    },

    async onChamcong() {
      const result = await Swal.fire({
        title: `Xác nhận chấm công?`,
        showDenyButton: true,
        confirmButtonText: "Có, Xác nhận",
        denyButtonText: `Hủy xác nhận`,
      });
      if (result.isConfirmed) {
        try {
          // console.log(this.selected);
          if (this.selected.length <= 0) {
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
              title: "Chưa chọn tất cả công nhân để xác nhận việc chấm công",
            });
            return;
          } else {
            let isAllSelected = true;
            for (let i = 0; i < this.selected.length; i++) {
              if (this.selected[i].value.machamcong === "") {
                isAllSelected = false;
                break;
              }
            }
            if (!isAllSelected) {
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
                title: "Xem lại việc chấm công cho từng người, còn thiếu!",
              });
              return;
            } else {
              // console.log(this.ngaychamcong);
              // kiểm tra xem có dữ liệu ngày chấm công trong csdl chưa
              const getNgaychamcong = await this.$axios.$get(
                `/api/congnhan/getngaychamcongonsv`
              );
              // console.log(getNgaychamcong);
              // gọi api ghi dữ liệu chấm công vào db
              for (let i = 0; i < this.selected.length; i++) {
                const data = this.selected[i].value;
                await this.$axios.$post(`/api/congnhan/addchamcong`, data);
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
                title: "Đã chấm công",
              });

              this.isSelectsEnabled = false;
              this.selected = [];
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
  width: 720px;
}

#preview {
  display: flex;
  justify-content: center;
  align-items: center;
}
#preview img {
  max-width: 200px;
  max-height: 200px;
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
