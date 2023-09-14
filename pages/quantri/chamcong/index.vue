<template>
  <div class="columns">
    <div class="column container">
      <br />
      <div class="box" style="margin-left: 3px; margin-right: 3px">
        <div class="columns">
          <div class="column">
            <div class="control has-icons-left">
              <div class="select is-small is-fullwidth">
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
            </div>
          </div>
          <div class="column">
            <div class="control has-icons-left">
              <div class="select is-small is-fullwidth">
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
            </div>
          </div>
          <div class="column">
            <!-- <button
              :disabled="!isSelectsEnabled_VP"
              @click="vanphong"
              class="button is-small is-success"
            >
              Văn phòng
            </button> -->
            <div class="control has-icons-left">
              <div class="select is-small is-fullwidth">
                <select
                  @change="vanphong($event)"
                  :disabled="!isSelectsEnabled_VP"
                >
                  <option selected>-- Xem theo khối --</option>
                  <option v-for="item in khoivp" :value="item.makhoi">
                    {{ item.makhoi }} -- {{ item.tenkhoi }}
                  </option>
                </select>
              </div>
              <span class="icon is-small is-left">
                <i style="color: #48c78e" class="fas fa-kaaba"></i>
              </span>
            </div>
          </div>
        </div>

        <div v-show="isshow == true" style="margin-bottom: 10px">
          <div style="text-align: center">
            <span style="font-size: small; font-weight: bold; color: red"
              >{{ showcount }} / {{ showsuccess }}</span
            >
          </div>
          <div>
            <progress id="progress-bar" class="progress is-success"></progress>
          </div>
        </div>

        <div class="table_wrapper">
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
                    <option selected disabled>-- Chấm công --</option>
                    <option
                      v-for="item in chamcongList"
                      :value="item.machamcong"
                    >
                      {{ item.machamcong }} -- {{ item.chamcong }}
                    </option>
                  </select>
                </div>
              </td>
              <td style="width: 5%">
                <div class="select is-small">
                  <select
                    @change="changeAnca($event)"
                    :disabled="!isSelectsEnabled_Chamcong"
                  >
                    <option selected disabled>-- Ăn ca --</option>
                    <option v-for="item in tienanca" :value="item.anca">
                      {{ item.anca }} -- {{ item.tienan }}
                    </option>
                  </select>
                </div>
              </td>
              <td style="width: 7%">
                <button @click="onChamcong()" class="button is-small is-info">
                  Chấm công
                </button>
              </td>
              <td style="width: 7%">
                <button
                  @click="onDeleteChamcongDay()"
                  class="button is-small is-danger"
                  :disabled="!isDisbeButton_ngaychamcong"
                >
                  Xóa Chấm công ngày
                </button>
              </td>
              <td></td>
            </tr>
          </table>
        </div>

        <div class="table_wrapper">
          <table
            v-if="items.length > 0"
            class="table is-responsive is-bordered is-narrow is-fullwidth"
          >
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
                  width: 7%;
                "
              >
                Ăn ca
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
                <input
                  type="text"
                  v-model="cn.anca"
                  class="input is-small is-info"
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
              <!-- <td
                style="font-size: small; font-weight: bold; text-align: center"
              >
                Tên PX
              </td> -->
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
                Ăn ca
              </td>
              <!-- <td
                style="font-size: small; font-weight: bold; text-align: center"
              >
                Ăn ca
              </td> -->
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
              <td
                style="font-size: small; font-weight: bold; text-align: center"
              >
                Xóa
              </td>
            </tr>
            <tr v-for="(item, index) in showNgaychamcong" :key="index">
              <td style="font-size: small; text-align: center">
                {{ index + 1 }}
              </td>
              <td style="font-size: small; text-align: center">
                {{ item.macn }}
              </td>
              <td style="font-size: small">
                {{ item.tencn }}
              </td>
              <td style="font-size: small; text-align: center">
                {{ item.mapx }}
              </td>
              <!-- <td style="font-size: small">
                {{ item.tenpx }}
              </td> -->
              <td style="font-size: small; text-align: center">
                <!-- <input
                  type="text"
                  class="input is-small"
                  v-model="item.machamcong"
                /> -->
                {{ item.machamcong }}
              </td>
              <td style="font-size: small; text-align: center">
                <div class="select is-small is-fullwidth">
                  <select @change="chamconglai($event, item)">
                    <option selected>
                      {{ item.machamcong }} -- {{ item.chamcong }}
                    </option>
                    <option disabled>----------</option>
                    <option
                      v-for="item in chamcongList"
                      :value="item.machamcong"
                    >
                      {{ item.machamcong }} -- {{ item.chamcong }}
                    </option>
                  </select>
                </div>
              </td>
              <td style="font-size: small; text-align: center">
                <div class="select is-small is-fullwidth">
                  <select @change="chamlaianca($event, item)">
                    <option selected>
                      {{ item.anca }} -- {{ item.tienan }}
                    </option>
                    <option disabled>----------</option>
                    <option
                      v-for="(selectdata, index) in tienanca"
                      :value="selectdata.anca"
                      :key="index + 'afjl'"
                    >
                      {{ selectdata.anca }} -- {{ selectdata.tienan }}
                    </option>
                  </select>
                </div>
              </td>
              <!-- <td style="font-size: small; text-align: center">
                {{ item.anca }}
              </td> -->
              <td style="font-size: small; text-align: center">
                {{ item.ngaychamcong | formatDate }}
              </td>
              <td style="font-size: small; text-align: center">
                {{ item.tuanchamcong }}
              </td>
              <td style="font-size: small; text-align: center">
                {{ item.createdAt | formatDate }}
              </td>
              <td style="font-size: small; text-align: center">
                {{ item.createdBy }}
              </td>
              <td style="text-align: center">
                <a @click="onDelete(item)"
                  ><span> <i style="color: red" class="fas fa-times"></i> </span
                ></a>
              </td>
            </tr>
          </table>
        </div>
      </div>
      <!-- Modal 3 - chamcong -->
      <div class="">
        <!-- Toggle class  -->
        <div :class="{ 'is-active': isActive }" class="modal">
          <div class="modal-background"></div>
          <div class="modal-content modal-card-1">
            <section class="modal-card-body">
              <div class="columns">
                <div class="column">
                  <span
                    style="font-size: small; font-weight: bold; color: #48c78e"
                    >Tiến trình chấm công</span
                  >
                </div>
                <div class="column" style="text-align: right">
                  <a @click="isActive = false">
                    <span style="color: red" class="icon is-small">
                      <i class="fas fa-times"></i>
                    </span>
                  </a>
                </div>
              </div>
              <table
                class="table is-responsive is-bordered is-narrow is-fullwidth"
              >
                <tr style="background-color: antiquewhite">
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
                    "
                  >
                    Mã CN / NV
                  </td>
                  <td
                    style="
                      font-size: small;
                      font-weight: bold;
                      text-align: center;
                    "
                  >
                    Họ tên
                  </td>
                  <td
                    style="
                      font-size: small;
                      font-weight: bold;
                      text-align: center;
                    "
                  >
                    Trạng thái ghi dữ liệu chấm công
                  </td>
                </tr>
                <tr v-for="(item, index) in detail_chamcong_action">
                  <td style="font-size: small; text-align: center">
                    {{ index + 1 }}
                  </td>
                  <td style="font-size: small; text-align: center">
                    {{ item.macn }}
                  </td>
                  <td style="font-size: small">
                    {{ item.tencn }}
                  </td>
                  <template>
                    <td
                      v-if="item.status == true"
                      style="
                        font-size: small;
                        text-align: center;
                        color: green;
                        font-weight: bold;
                      "
                    >
                      Đã ghi dữ liệu chấm công thành công
                    </td>
                    <td
                      v-else
                      style="
                        font-size: small;
                        text-align: center;
                        color: red;
                        font-weight: bold;
                      "
                    >
                      Ghi dữ liệu chưa thành công. Xem lại chấm công
                    </td>
                  </template>
                </tr>
              </table>
            </section>
          </div>
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
      tienanca: [],
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

      // đếm
      showcount: 0,
      showsuccess: 0,
      isshow: false,
      isActive: false,
      detail_chamcong_action: {
        macn: "",
        tencn: "",
        status: "",
      },
      // lock button xoa ngay cham cong
      isDisbeButton_ngaychamcong: false,
      acc: "",
      idacc: null,
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
      khoivp: [
        { makhoi: "VPBP", tenkhoi: "Văn phòng bộ phận" },
        { makhoi: "VPGT1", tenkhoi: "Văn phòng gián tiếp 1" },
        { makhoi: "VPGT2", tenkhoi: "Văn phòng gián tiếp 2" },
      ],
      makhoi: "",
      tenkhoi: "",
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
          anca: "",
          tienan: "",
          thanhtien: "",
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
    this.getAnca();
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
    // anca() {
    //   return function (item) {
    //     if (!item.ngayhoanthanhtt) return "";
    //     const date = new Date(item.ngayhoanthanhtt);
    //     const year = date.getFullYear();
    //     const month = ("0" + (date.getMonth() + 1)).slice(-2);
    //     const day = ("0" + date.getDate()).slice(-2);
    //     return `${year}-${month}-${day}`;
    //   };
    // },
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
    // ăn ca
    async getAnca() {
      this.tienanca = await this.$axios.$get(`/api/ketoan/getallanca`);
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
      this.isDisbeButton_ngaychamcong = true;
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
        // console.log(this.showNgaychamcong);
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
            title: `Phân xưởng ${this.form.tenpx} đã có ${this.showNgaychamcong.length} công nhân chấm công vào ngày ${this.ngaychamcong}`,
          });
          this.isSelectsEnabled_Chamcong = true;
          let result = [];
          for (let i = 0; i < this.cong_nhan.length; i++) {
            let found = false;
            for (let j = 0; j < this.showNgaychamcong.length; j++) {
              if (this.cong_nhan[i].macn === this.showNgaychamcong[j].macn) {
                found = true;
                break;
              }
            }
            if (!found) {
              result.push(this.cong_nhan[i]);
            }
          }

          // console.log(result);
          for (let i = 0; i < result.length; i++) {
            this.items.push({
              macn: result[i].macn,
              tencn: result[i].tencn,
              mapx: result[i].mapx,
              tenpx: result[i].tenpx,
              mato: "",
              tento: "",
              sttchon: result[i].sttchon,
              machamcong: "",
              chamcong: "",
              anca: "",
              tienan: "",
              thanhtien: "",
              diengiai: "",
              ghichu: "",
              ngaychamcong: this.ngaychamcong,
              tuanchamcong: this.weekNumber,
              createdAt: this.form.createdAt,
              createdBy: this.$auth.$state.user.username,
            });
          }
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
              anca: "",
              tienan: "",
              thanhtien: "",
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
      // this.selected = [];
    },

    async changeAnca(e) {
      // console.log(e.target.options[e.target.options.selectedIndex].text);
      var name = e.target.options[e.target.options.selectedIndex].text;
      let position = name.split("--");
      const loaianca = position[0];
      const tienanca = position[1];
      // console.log(loaianca, tienanca);
      // console.log(this.selected.length);
      for (let i = 0; i < this.selected.length; i++) {
        const index = this.selected[i].index;
        // console.log(index);
        this.items[index].anca = loaianca;
        this.items[index].tienan = tienanca;
      }

      // console.log(this.items);
      this.selected = [];
    },

    async chamconglai(e, item) {
      var name = e.target.options[e.target.options.selectedIndex].text;
      let position = name.split("--");
      const machamcong = position[0].trim();
      const chamcong = position[1].trim();
      // console.log(machamcong, chamcong);

      try {
        const data = {
          machamcong: machamcong,
          chamcong: chamcong,
        };
        await this.$axios.$patch(
          `/api/congnhan/updatechamcong/${item._id}`,
          data
        );
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
          title: "Đã cập nhật",
        });
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
    },

    async chamlaianca(e, item) {
      var name = e.target.options[e.target.options.selectedIndex].text;
      let position = name.split("--");
      const anca = position[0].trim();
      const tienan = position[1].trim();
      // console.log(anca, tienan);
      try {
        const data = {
          anca: anca,
          tienan: tienan,
        };
        await this.$axios.$patch(`/api/congnhan/updateanca/${item._id}`, data);
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
          title: "Đã cập nhật",
        });
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
    },

    async getWithTo(e) {
      this.items = [];
      var name = e.target.options[e.target.options.selectedIndex].text;
      let position = name.split("--");
      this.form.mato = position[0];
      this.form.tento = position[1];
      this.cong_nhan = await this.$axios.$get(
        `/api/congnhan/allcongnhanto?mato=${this.form.mato}`
      );
      // console.log(this.cong_nhan);
      // kiểm tra xem có dữ liệu ngày chấm công trong csdl chưa
      this.showNgaychamcong = await this.$axios.$get(
        `/api/congnhan/showngaychamcongandmato?mato=${this.form.mato}&ngaychamcong=${this.ngaychamcong}`
      );
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
          title: `Tổ ${this.form.tento} đã có ${this.showNgaychamcong.length} công nhân chấm công vào ngày ${this.ngaychamcong}`,
        });
        this.isSelectsEnabled_Chamcong = true;
        let result = [];
        for (let i = 0; i < this.cong_nhan.length; i++) {
          let found = false;
          for (let j = 0; j < this.showNgaychamcong.length; j++) {
            if (this.cong_nhan[i].macn === this.showNgaychamcong[j].macn) {
              found = true;
              break;
            }
          }
          if (!found) {
            result.push(this.cong_nhan[i]);
          }
        }

        // console.log(result);
        for (let i = 0; i < result.length; i++) {
          this.items.push({
            macn: result[i].macn,
            tencn: result[i].tencn,
            mapx: result[i].mapx,
            tenpx: result[i].tenpx,
            mato: result[i].mato,
            tento: result[i].tento,
            sttchon: result[i].sttchon,
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

    async vanphong(e) {
      var name = e.target.options[e.target.options.selectedIndex].text;
      let position = name.split("--");
      this.makhoi = position[0];
      this.tenkhoi = position[1];

      // kiểm tra xem có dữ liệu ngày chấm công trong csdl chưa
      // console.log(this.makhoi);
      // console.log(this.ngaychamcong);
      this.showNgaychamcong = await this.$axios.$get(
        `/api/congnhan/showngaychamcongandmapx?mapx=${this.makhoi}&ngaychamcong=${this.ngaychamcong}`
      );
      // console.log(this.showNgaychamcong);
      this.nhanvien = await this.$axios.$get(
        `/api/nhanvien/statusnhanvien1withmakhoi?makhoi=${this.makhoi}`
      );
      // console.log(this.nhanvien);
      this.items = [];
      // console.log(this.showNgaychamcong);
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
          title: `Khối ${this.makhoi} đã có ${this.showNgaychamcong.length} nhân viên chấm công vào ngày ${this.ngaychamcong}`,
        });
        this.isSelectsEnabled_Chamcong = true;
        let result = [];
        for (let i = 0; i < this.nhanvien.length; i++) {
          let found = false;
          for (let j = 0; j < this.showNgaychamcong.length; j++) {
            if (this.nhanvien[i].manv === this.showNgaychamcong[j].macn) {
              found = true;
              break;
            }
          }
          if (!found) {
            result.push(this.nhanvien[i]);
          }
        }
        if (result.length > 0) {
          for (let i = 0; i < result.length; i++) {
            this.items.push({
              macn: this.nhanvien[i].manv,
              tencn: this.nhanvien[i].tennv,
              mapx: this.makhoi,
              tenpx: this.tenkhoi,
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
        } else {
          this.items = [];
        }
      } else {
        this.isSelectsEnabled_Chamcong = true;
        this.nhanvien = await this.$axios.$get(
          `/api/nhanvien/statusnhanvien1withmakhoi?makhoi=${this.makhoi}`
        );
        // console.log(this.nhanvien);
        this.items = [];
        for (let i = 0; i < this.nhanvien.length; i++) {
          this.items.push({
            macn: this.nhanvien[i].manv,
            tencn: this.nhanvien[i].tennv,
            mapx: this.makhoi,
            tenpx: this.tenkhoi,
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
              title: "Chưa chọn công nhân nào để xác nhận việc chấm công",
            });
            return;
          } else {
            // let isAllSelected = true;
            // for (let i = 0; i < this.selected.length; i++) {
            //   if (this.selected[i].value.machamcong === "") {
            //     isAllSelected = false;
            //     break;
            //   }
            // }
            // if (!isAllSelected) {
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
            //     title: "Xem lại việc chấm công cho từng người, còn thiếu!",
            //   });
            //   return;
            // } else {
            //   // console.log(this.ngaychamcong);
            //   // kiểm tra xem có dữ liệu ngày chấm công trong csdl chưa
            //   const getNgaychamcong = await this.$axios.$get(
            //     `/api/congnhan/getngaychamcongonsv`
            //   );
            //   // console.log(getNgaychamcong);
            //   // gọi api ghi dữ liệu chấm công vào db
            //   for (let i = 0; i < this.selected.length; i++) {
            //     const data = this.selected[i].value;
            //     await this.$axios.$post(`/api/congnhan/addchamcong`, data);
            //   }

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
            //     icon: "success",
            //     title: "Đã chấm công",
            //   });

            //   this.isSelectsEnabled = false;
            //   this.selected = [];
            // }
            // console.log(this.selected);
            let error = false;
            for (let i = 0; i < this.selected.length; i++) {
              if (this.selected[i].value.machamcong === "") {
                error = true;
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
                  title:
                    "Xem lại thiếu loại chấm công của những người được chọn",
                });
                break;
              }
            }
            if (!error) {
              // console.log("OK");
              this.detail_chamcong_action = [];
              this.showsuccess = this.selected.length;
              this.isshow = true;
              const progressBar = document.getElementById("progress-bar");
              // console.log(progressBar);
              progressBar.value = this.showcount;
              progressBar.max = this.showsuccess;

              for (let i = 0; i < this.selected.length; i++) {
                const data = this.selected[i].value;
                let res = await this.$axios.$post(
                  `/api/congnhan/addchamcong`,
                  data
                );
                this.showcount++;
                progressBar.value = this.showcount;
                // console.log(data.macn + "-" + data.tencn + "-" + res.success);
                // bắt đầu ghi lại dữ liệu post vào db
                // Tạo đối tượng mới từ dữ liệu và res.success
                const newDetailChamcongAction = {
                  macn: data.macn,
                  tencn: data.tencn,
                  status: res.success,
                };
                // Push đối tượng mới vào mảng detail_chamcong_action
                this.detail_chamcong_action.push(newDetailChamcongAction);
              }
              this.isActive = true;
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
              this.items = [];
              this.showcount = 0;
              this.showsuccess = 0;
              this.isshow = false;
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

    async capnhatcc(item) {
      const result = await Swal.fire({
        title: `Cập nhật chấm công cho công nhân ${item.macn}?`,
        showDenyButton: true,
        confirmButtonText: "Có, Cập nhật",
        denyButtonText: `Hủy cập nhật`,
      });
      if (result.isConfirmed) {
        try {
          const data = {
            machamcong: item.machamcong,
            chamcong: item.chamcong,
          };
          await this.$axios.$patch(
            `/api/congnhan/updatechamcong/${item._id}`,
            data
          );
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
            title: "Đã cập nhật",
          });
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

    async onDeleteChamcongDay() {
      this.acc = "";
      this.idacc = null;
      if (this.$auth.$state.user) {
        this.acc = this.$auth.$state.user.username;
        this.idacc = this.$auth.$state.user._id;
      }
      // console.log(this.acc);
      // console.log(this.ngaychamcong);
      // console.log(this.form.mapx);
      // console.log(this.form.mato);
      // console.log(this.acc, this.idacc);
      if (this.acc == "ngaht" && this.idacc == 2112) {
        if (this.form.mapx == "") {
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
            title: "Chưa chọn phân xưởng hoặc tổ cần xóa",
          });
        } else {
          if (this.form.mato == "") {
            // console.log(this.showNgaychamcong.length);
            // tiến hành xóa dữ liệu chấm công của xưởng
            if (this.showNgaychamcong.length > 0) {
              const result = await Swal.fire({
                title: `Bạn có muốn xóa chấm công ngày: ${this.ngaychamcong} của phân xưởng: ${this.form.mapx}?`,
                showDenyButton: true,
                confirmButtonText: "Có, Xóa",
                denyButtonText: `Hủy`,
              });
              if (result.isConfirmed) {
                const res = await this.$axios.$delete(
                  `/api/congnhan/ngaychamcongphanxuong?ngaychamcong=${this.ngaychamcong}&mapx=${this.form.mapx}`
                );
                if (res.success == true) {
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
                    title: `Xóa thành công dữ liệu ngày: ${this.ngaychamcong} của phân xưởng: ${this.form.mapx}`,
                  });
                  this.form.mato = "";
                  this.form.mapx = "";
                  this.ngaychamcong = "";
                  this.items = [];
                  this.showNgaychamcong = [];
                  this.isSelectsEnabled = false;
                  this.isSelectsEnabled_VP = false;
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
                    title: "Xóa không thành công !!!",
                  });
                }
              }
            }
          } else {
            const result = await Swal.fire({
              title: `Bạn có muốn xóa chấm công ngày: ${this.ngaychamcong} của phân xưởng: ${this.form.mato}?`,
              showDenyButton: true,
              confirmButtonText: "Có, Xóa",
              denyButtonText: `Hủy`,
            });
            if (result.isConfirmed) {
              const res = await this.$axios.$delete(
                `/api/congnhan/ngaychamcongto?ngaychamcong=${this.ngaychamcong}&mato=${this.form.mato}`
              );
              if (res.success == true) {
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
                  title: `Xóa thành công dữ liệu ngày: ${this.ngaychamcong} của tổ: ${this.form.mato}`,
                });
                this.form.mato = "";
                this.form.mapx = "";
                this.ngaychamcong = "";
                this.items = [];
                this.showNgaychamcong = [];
                this.isSelectsEnabled = false;
                this.isSelectsEnabled_VP = false;
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
                  title: "Xóa không thành công !!!",
                });
              }
            }
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
          title: "Bạn không có quyền xóa dữ liệu chấm công !!!",
        });
      }
    },

    async onDelete(cc) {
      const result = await Swal.fire({
        title: `Bạn có xóa hẳn chấm công này?`,
        showDenyButton: true,
        confirmButtonText: "Có, Xóa",
        denyButtonText: `Hủy`,
      });
      if (result.isConfirmed) {
        try {
          await this.$axios
            .$delete(`/api/congnhan/chamcongid/${cc._id}`)
            .then((response) => {
              const index = this.showNgaychamcong.findIndex(
                (p) => p._id === cc._id
              ); // find the post index
              if (~index)
                // if the post exists in array
                this.showNgaychamcong.splice(index, 1); //delete the post
            });
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
            title: "Xóa thành công",
          });
        } catch (error) {
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener("mouseenter", Swal.stopTimer);
              toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
          });
          Toast.fire({
            icon: "error",
            title: `Có lỗi xảy ra`,
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

.input.is-small {
  min-width: 70px;
}
</style>
