<template>
  <div class="columns">
    <div class="column">
      <br />
      <div class="box" style="margin-left: 100px; margin-right: 100px">
        <div class="columns">
          <div class="column is-11">
            <div class="control">
              <span class="icon is-small is-left">
                <i style="color: #ff55acee" class="fas fa-broom"></i>
              </span>
              <span style="color: #3850b7; font-size: 17px; font-weight: bold">Lập phiếu lô sản xuất</span>
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

        <div class="table_wrapper table-height">
          <table class="table is-responsive is-bordered is-narrow is-fullwidth">
            <tr style="background-color: #fffaeb">
              <td colspan="2" style="font-weight: bold">Thông tin KẾ HOẠCH</td>
            </tr>
            <tr>
              <td style="font-weight: bold">Kế hoạch đã lập</td>
              <td style="font-weight: bold">
                Thông tin chi tiết kế hoạch tại phân xưởng
              </td>
            </tr>
            <tr>
              <td style="width: 20%">
                <div class="select is-multiple is-small is-fullwidth">
                  <select @change="infoKehoach($event)" multiple size="12">
                    <option v-for="(item, index) in kehoach" :key="index + 'jj'" :value="item.makh">
                      {{ item.makh }}
                    </option>
                  </select>
                </div>
              </td>
              <td>
                <div class="table_wrapper table-height">
                  <table class="table is-responsive is-bordered is-narrow is-fullwidth">
                    <tr style="background-color: #ffe08a">
                      <td colspan="5" style="font-weight: bold; font-size: small">
                        Thông tin Kế hoạch
                      </td>
                    </tr>
                    <tr>
                      <td style="font-weight: bold; font-size: small; width: 40%">
                        Mô tả
                      </td>
                      <td style="
                          text-align: center;
                          font-weight: bold;
                          font-size: small;
                          width: 20.3%;
                        ">
                        Số lượng
                      </td>
                      <td style="
                          text-align: center;
                          font-weight: bold;
                          font-size: small;
                        ">
                        Thời gian bắt đầu
                      </td>
                      <td style="
                          text-align: center;
                          font-weight: bold;
                          font-size: small;
                        ">
                        Thời gian kết thúc
                      </td>
                      <td style="
                          text-align: center;
                          font-weight: bold;
                          font-size: small;
                        ">
                        Trạng thái
                      </td>
                    </tr>
                    <tr v-for="(item, index) in oneKehoach" :key="index + 'lll'">
                      <td style="font-size: small">
                        {{ item.mota }}
                      </td>
                      <td style="font-size: small; text-align: center">
                        {{ item.soluong }}
                      </td>
                      <td style="font-size: small; text-align: center">
                        {{ item.tgbatdau | formatDate }}
                      </td>
                      <td style="font-size: small; text-align: center">
                        {{ item.tgketthuc | formatDate }}
                      </td>
                      <td style="font-size: small; text-align: center">
                        <span v-if="item.status == false">
                          <i style="color: #ffd863" class="fa fa-circle"></i>
                        </span>
                        <span v-else><i style="color: #00947e" class="fa fa-circle"></i>
                        </span>
                      </td>
                    </tr>
                  </table>

                  <table class="table is-responsive is-bordered is-narrow is-fullwidth">
                    <tr style="background-color: #feecf0">
                      <td colspan="6" style="font-weight: bold; font-size: small">
                        Chi tiết kế hoạch từng phân xưởng
                      </td>
                    </tr>
                    <tr>
                      <td style="
                          text-align: center;
                          font-weight: bold;
                          font-size: small;
                        ">
                        STT
                      </td>
                      <td style="
                          text-align: center;
                          font-weight: bold;
                          font-size: small;
                          width: 35%;
                        ">
                        Tên phân xưởng
                      </td>
                      <td style="
                          text-align: center;
                          font-weight: bold;
                          font-size: small;
                          width: 20%;
                        ">
                        Mã kế hoạch phân xưởng
                      </td>
                      <td style="
                          text-align: center;
                          font-weight: bold;
                          font-size: small;
                          width: 15%;
                        ">
                        Ngày bắt đầu
                      </td>
                      <td style="
                          text-align: center;
                          font-weight: bold;
                          font-size: small;
                          width: 15.8%;
                        ">
                        Ngày kết thúc
                      </td>
                      <td style="
                          text-align: center;
                          font-weight: bold;
                          font-size: small;
                        ">
                        Số lượng
                      </td>
                    </tr>
                    <tr v-for="(item, index) in phanxuongtgsx" :key="index + 'kk'"
                      :class="{ highlight: item._id == phieulosx }" @click="getdataPhieulosx(item)">
                      <td style="text-align: center; font-size: small">
                        {{ index + 1 }}
                      </td>
                      <td style="font-size: small">
                        {{ item.tenpx }}
                      </td>
                      <td style="font-size: small">
                        {{ item.makhpx }}
                      </td>
                      <td style="font-size: small; text-align: center">
                        {{ item.ngaybd | formatDate }}
                      </td>
                      <td style="font-size: small; text-align: center">
                        {{ item.ngaykt | formatDate }}
                      </td>
                      <td style="font-size: small; text-align: center">
                        {{ item.soluong }}
                      </td>
                    </tr>
                  </table>

                  <div style="
                      padding-left: 6px;
                      font-size: small;
                      font-weight: bold;
                      background-color: #feecf0;
                      padding-top: 2px;
                      padding-bottom: 2px;
                    ">
                    Các lô sản xuất đã tạo
                  </div>
                  <div class="table-height-losx">
                    <table class="table is-responsive is-bordered is-narrow is-fullwidth">
                      <tr>
                        <td style="
                            font-size: small;
                            text-align: center;
                            font-weight: bold;
                            width: 4.8%;
                          ">
                          STT
                        </td>
                        <td style="
                            font-size: small;
                            text-align: center;
                            font-weight: bold;
                          ">
                          Mã lô sản xuất
                        </td>
                        <td style="
                            font-size: small;
                            text-align: center;
                            font-weight: bold;
                            width: 11%;
                          ">
                          Số lượng
                        </td>
                        <td style="
                            font-size: small;
                            text-align: center;
                            font-weight: bold;
                          ">
                          Ngày bắt đầu
                        </td>
                        <td style="
                            font-size: small;
                            text-align: center;
                            font-weight: bold;
                          ">
                          Ngày kết thúc
                        </td>
                        <td style="
                            font-size: small;
                            text-align: center;
                            font-weight: bold;
                          ">
                          Trạng thái
                        </td>
                      </tr>
                      <tr v-for="(item, index) in showlsxpx" :key="index + 'ffff'">
                        <td style="font-size: small; text-align: center">
                          {{ index + 1 }}
                        </td>
                        <td style="font-size: small">{{ item.malosx }}</td>
                        <td style="font-size: small; text-align: center">
                          {{ item.soluong }}
                        </td>
                        <td style="font-size: small; text-align: center">
                          {{ item.ngaybd }}
                        </td>
                        <td style="font-size: small; text-align: center">
                          {{ item.ngaykt }}
                        </td>
                        <td style="font-size: small; text-align: center">
                          <span v-if="item.status == false">
                            <i style="color: #ffd863" class="fa fa-circle"></i>
                          </span>
                          <span v-else><i style="color: #00947e" class="fa fa-circle"></i>
                          </span>
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>
              </td>
            </tr>
          </table>
          <div class="columns">
            <div class="column is-10"></div>
            <div class="column" style="text-align: right">
              <button @click="onTaophieu" class="button is-success is-fullwidth is-small">
                <span class="icon is-small">
                  <i class="fas fa-pen-fancy"></i>
                </span>
                <span>Ghi Dữ liệu</span>
              </button>
            </div>
          </div>

          <div v-if="isphanxuong == 1">
            <table class="table is-responsive is-bordered is-narrow is-fullwidth">
              <tr style="background-color: #fffaeb">
                <td colspan="9" style="font-weight: bold; font-size: small">
                  Bạn đang lập phiếu lô sản xuất tại: <span style="color: red;">{{ this.phieulosx.tenpx }}</span> |
                  <span>Mã kế
                    hoạch phân xưởng: <span style="color: red">{{ this.phieulosx.makhpx }}</span> </span>
                </td>
              </tr>
              <tr v-if="isphanxuong == 1">
                <td colspan="9">
                  <button @click="addPhanxuong()" class="button is-small is-info">
                    Tạo lô sản xuất
                  </button>
                </td>
              </tr>
              <tr>
                <td style="
                    text-align: center;
                    font-size: small;
                    font-weight: bold;
                  ">
                  STT
                </td>
                <td style="
                    text-align: center;
                    font-size: small;
                    font-weight: bold;
                  ">
                  Phân xưởng
                </td>
                <td style="
                    text-align: center;
                    font-size: small;
                    font-weight: bold;
                  ">
                  Tổ
                </td>
                <td style="
                    text-align: center;
                    font-size: small;
                    font-weight: bold;
                  ">
                  Nhóm lương
                </td>
                <td style="
                    text-align: center;
                    font-size: small;
                    font-weight: bold;
                  ">
                  Mã lô sản xuất
                </td>
                <td style="
                    text-align: center;
                    font-size: small;
                    font-weight: bold;
                  ">
                  Số lượng
                </td>
                <td style="
                    text-align: center;
                    font-size: small;
                    font-weight: bold;
                  ">
                  Thời gian bắt đầu
                </td>
                <td style="
                    text-align: center;
                    font-size: small;
                    font-weight: bold;
                  ">
                  Thời gian kết thúc
                </td>
                <td style="
                    text-align: center;
                    font-size: small;
                    font-weight: bold;
                  ">
                  Xóa
                </td>
              </tr>
              <!-- v-if="isphanxuong == 1" -->
              <tr v-for="(item, index) in items" :key="index + 'cm-a'">
                <td style="
                    text-align: center;
                    font-size: small;
                    font-weight: bold;
                  ">
                  {{ index + 1 }}
                </td>
                <td>
                  <div class="control has-icons-left">
                    <div class="select is-fullwidth is-small">
                      <select v-model.trim="item.mapx" @change="
                        getInfoPX($event, $event.target.selectedIndex, index)
                      ">
                        <option v-for="(item, index) in phanxuongkehoach" :key="index + 'gf'" :value="item.mapx">
                          {{ item.mapx }} - {{ item.tenpx }}
                        </option>
                      </select>
                    </div>
                    <span class="icon is-left is-small">
                      <i style="color: #48c78e" class="fas fa-dice-d6"></i>
                    </span>
                  </div>
                </td>
                <td>
                  <div class="select is-small is-fullwidth">
                    <select @change="
                      getWithTo($event, $event.target.selectedIndex, index)
                    ">
                      <option v-for="item in item.nhomto" :value="item.mato">
                        {{ item.mato }}-{{ item.tento }}
                      </option>
                    </select>
                  </div>
                </td>
                <td style="text-align: center; font-weight: bold; color: green">
                  {{ item.nhomluong }}
                </td>
                <td>
                  <input v-model.trim="item.malosx" type="text" class="input is-warning is-small" />
                </td>
                <td>
                  <input v-model.trim="item.soluong" type="text" class="input is-small" />
                </td>
                <td>
                  <input v-model.trim="item.ngaybd" type="text" class="input is-small" placeholder="dd/mm/yyyy" />
                </td>
                <td>
                  <input v-model.trim="item.ngaykt" type="text" class="input is-small" placeholder="dd/mm/yyyy" />
                </td>
                <td style="text-align: center">
                  <button @click="deleteRow(index)" class="button is-danger is-small">
                    Xóa
                  </button>
                </td>
              </tr>
            </table>
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
      lokehoach: [],
      ds_sanpham: [],
      dm_sanpham: [],
      ds_lokh: [],
      one_lokh: [],
      dmnguyencong: [],
      cong_nhan: [],
      dmcongnhan: [],
      phanxuong: [],
      selectedIndex: 0,
      dongia_ns: "",
      namlsx: "",
      kehoach: [],
      checkMalosx: "",
      listlsx: [],
      arrLsx: [],
      phanxuongtgsx: [],
      phanxuongkehoach: [],
      nhomluong: [],
      isExits: null,
      showlsxpx: [],
      tonhomid: [],
      form: {
        makh: "",
        makhpx: "",
        tenpx: "",
        masp: "",
        tensp: "",
        createdAt: null,
        createdBy: this.$auth.$state.user.username,
        sumsllosx: "",
      },
      isphanxuong: 0,
      getmakhpx: [],
      infosanpham: [],
      phieulosx: {},
      oneKehoach: [],
      items: [
        {
          mapx: "",
          tenpx: "",
          makh: "",
          soluong: "",
          ngaybd: "",
          ngaykt: "",
          soluong: "",
          nhomluong: "",
          mato: "",
          tento: "",
          stopday_losx: "",
          nhomto: [
            {
              maxuong: "",
              tenxuong: "",
              tento: "",
              mato: "",
            },
          ],
        },
      ],
    };
  },

  mounted() {
    this.currentDateTime();
    this.get_phanxuong();
    this.getMalosx();
    this.get_kehoach();
    this.deleteRow(0);
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

    async showmapx(e) {
      // console.log(this.mapx)
      var name = e.target.options[e.target.options.selectedIndex].text;
      // console.log(name)
      let position = name.split("--");
      this.form.mapx = position[0].trim();
      this.form.tenpx = position[1].trim();
      this.ds_lokh = await this.$axios.$get(
        `/api/ketoan/getallmalkhpx?mapx=${this.form.mapx}`
      );
      this.getMalosx();
    },

    async loadMakh() {
      this.one_lokh = await this.$axios.$get(
        `/api/lokehoach/getonemakh?mapx=${this.form.mapx}&makh=${this.form.makh}`
      );
      // console.log(this.one_lokh)
      this.form.tenpx = this.one_lokh[0].tenpx;
      this.form.ngaybd = this.one_lokh[0].ngaybd;
      this.form.ngaykt = this.one_lokh[0].ngaykt;
      let nn = this.namlsx.toString();
      let sx_nam = nn.substring(2, 4);
      this.form.malosx = this.one_lokh[0].makh.trim() + "-" + sx_nam;
      this.form.masp = this.one_lokh[0].masp;
      this.form.tensp = this.one_lokh[0].tensp;
      this.form.soluong = this.one_lokh[0].soluong;
      this.form.nhomluong = this.one_lokh[0].nhomluong;
      // console.log(this.one_lokh[0].masp);
      // console.log(this.form.masp);
      this.checkMalosx = this.form.malosx.length;
    },

    // get all phân xưởng
    async get_phanxuong() {
      this.phanxuong = await this.$axios.$get(`/api/phongban/allphanxuong`);
    },

    // get all kế hoạch năm
    async get_kehoach() {
      this.kehoach = await this.$axios.$get(`/api/lokehoach/getkehoach`);
    },

    async getMalosx() {
      this.listlsx = await this.$axios.$get(`/api/lokehoach/getlosx`);
      // console.log(this.listlkh)
      for (let i = 0; i < this.listlsx.length; i++) {
        let mlsx = this.listlsx[i].malosx.trim();
        this.arrLsx.push(mlsx);
      }
      // console.log(this.arrLsx);
    },

    async infoKehoach(e) {
      let turn = 1;
      let length = this.items.length;
      while (turn <= length) {
        this.deleteRow(this.items.length - turn);
        turn += 1;
      }
      this.showlsxpx = [];
      this.isphanxuong = 0;

      var name = e.target.options[e.target.options.selectedIndex].text;
      let position = name.split("--");
      this.form.makh = position[0].trim();

      this.oneKehoach = await this.$axios.$get(
        `/api/lokehoach/getkehoachone?makh=${this.form.makh}`
      );

      this.phanxuongtgsx = await this.$axios.$get(
        `/api/lokehoach/allphanxuonginkh?makh=${this.form.makh}`
      );
      // console.log(this.phanxuongtgsx);
    },

    async addPhanxuong() {
      // this.isphanxuong = 1;
      this.items.push({
        makh: "",
        makhpx: "",
        malosx: "",
        mapx: "",
        tenpx: "",
        mato: "",
        tento: "",
        masp: "",
        tensp: "",
        soluong: "",
        nhomluong: "",
        soluonglsx: "",
        ngaybd: "",
        ngaykt: "",
        tongdat: "",
        tonghong: "",
        ghichu: "",
        createdAt: null,
        createdBy: "",
        status: 0,
        datinhluong: 0,
        stopday_losx: "",
        nhomto: [
          {
            maxuong: "",
            tenxuong: "",
            tento: "",
            mato: "",
          },
        ],
      });
    },

    deleteRow(index) {
      this.items.splice(index, 1);
    },

    async getInfoPX(e, selectedIndex, index) {
      var name = e.target.options[e.target.options.selectedIndex].text;
      // console.log(name)
      let position = name.split("-");
      let mapx = position[0].trim();
      this.form.tenpx = position[1].trim();
      this.getmakhpx = await this.$axios.$get(
        `/api/lokehoach/getmakhpx?makh=${this.form.makh}&mapx=${mapx}`
      );
      // console.log(this.form.masp);
      this.selectedIndex = selectedIndex;
      let nn = this.namlsx.toString();
      let sx_nam = nn.substring(2, 4);
      for (let i = 0; i < this.items.length; i++) {
        if (i == index) {
          this.items[i].makhpx = this.getmakhpx[0].makhpx.trim();
          this.items[i].malosx = this.getmakhpx[0].makhpx.trim() + "-";
          this.checkMalosx = this.items[i].malosx.length;
          // console.log(this.checkMalosx)
          this.items[i].tenpx = this.form.tenpx;
        }
      }
      // console.log(this.items)
      // lấy mã nhóm lương dựa vào mã sp và mã phân xưởng
      if (mapx == "PXD" || mapx == "AL_PXD" || mapx == "DV_PXD") {
        let phanxuong = "PXD";
        this.nhomluong = await this.$axios.$get(
          `/api/lokehoach/getnhomluongtheompx?mapx=${phanxuong}&mavt=${this.form.masp}`
        );
        // console.log(this.nhomluong[0].nhomluong);
      } else {
        this.nhomluong = await this.$axios.$get(
          `/api/lokehoach/getnhomluongtheompx?mapx=${mapx}&mavt=${this.form.masp}`
        );
        // console.log(this.nhomluong[0].nhomluong);
      }

      console.log(this.nhomluong)

      for (let i = 0; i < this.items.length; i++) {
        if (i == index) {
          if (this.nhomluong[0].nhomluong != '') {
            this.items[i].nhomluong = this.nhomluong[0].nhomluong.trim();
          } else {
            this.items[i].nhomluong = "Không có";
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
              title: "Sản phẩm không có nhóm lương tại phân xưởng này",
            });
          }
        }
      }
      // console.log(this.items);
      this.tonhomid = await this.$axios.$get(
        `/api/phongban/alltoinxuong?mapx=${mapx}`
      );
      // console.log(this.tonhomid)
      if (this.tonhomid.length > 0) {
        for (let i = 0; i < this.items.length; i++) {
          if (i == index) {
            this.items[i].nhomto = [];

            for (let k = 0; k < this.tonhomid.length; k++) {
              let cn = {
                maxuong: this.tonhomid[k].mapx.trim(),
                tenxuong: this.tonhomid[k].tenpx.trim(),
                tento: this.tonhomid[k].tento.trim(),
                mato: this.tonhomid[k].mato.trim(),
              };
              this.items[i].nhomto.push(cn);
              // console.log(cn)
            }
          }
        }
      }
    },

    // Bấm vào chọn tổ
    async getWithTo(e, selectedIndex, index) {
      // console.log(this.mapx)
      var name = e.target.options[e.target.options.selectedIndex].text;
      // console.log(name)
      let position = name.split("--");
      let p1 = position[0].trim();

      // this.cong_nhan = await this.$axios.$get(
      //   `/api/congnhan/allcongnhanto?mato=${p1}`
      // );

      this.selectedIndex = selectedIndex;
      // console.log(index)
      for (let i = 0; i < this.items.length; i++) {
        if (i == index) {
          this.items[i].mato = this.tonhomid[this.selectedIndex].mato;
          this.items[i].tento = this.tonhomid[this.selectedIndex].tento;
          // console.log(this.tonhomid[this.selectedIndex].mato);
          // select * from congnhan where mato=mato
          // gán vào ds công nhân
        }
      }
    },

    async getdataPhieulosx(phieulo) {
      // khi chuyển sang phân xưởng khác thì xóa toàn bộ items
      this.items = []
      this.isphanxuong = 1;
      this.phieulosx = phieulo;
      // console.log(this.phieulosx);
      // Lấy tên phân xưởng cần tạo phiếu lô
      this.phanxuongkehoach = await this.$axios.$get(
        `/api/lokehoach/phanxuonglsx?makh=${this.form.makh}&makhpx=${this.phieulosx.makhpx}&mapx=${this.phieulosx.mapx}`
      );
      this.showlsxpx = await this.$axios.$get(
        `/api/lokehoach/losanxuattaipx?makh=${this.phieulosx.makh}&makhpx=${this.phieulosx.makhpx}&mapx=${this.phieulosx.mapx}`
      );
      this.form.tensp = this.phieulosx.tensp;
      this.form.masp = this.phieulosx.masp;
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
            for (let i = 0; i < this.items.length; i++) {
              this.items[i].makh = this.form.makh;
              this.items[i].masp = this.form.masp;
              this.items[i].tensp = this.form.tensp;
              this.items[i].createdAt = this.form.createdAt;
              this.items[i].createdBy = this.form.createdBy;

              if (
                this.items[i].malosx == "" ||
                this.items[i].soluong == "" ||
                this.items[i].ngaybd == ""
              ) {
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
                if (this.items[i].malosx.length == this.checkMalosx) {
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
                    title: "Tạo mã Lô sản xuất",
                  });
                } else {
                  this.$axios.$post("/api/ketoan/addphieulosx", this.items[i]);

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
                    title: "Tạo phiếu lô sản xuất thành công",
                  });

                  // window.location.reload();
                }
              }
            }

            let turn = 1;
            let length = this.items.length;
            while (turn <= length) {
              this.deleteRow(this.items.length - turn);
              turn += 1;
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
}

.table_wrapper {
  position: sticky;
  left: 0;
  background-color: whitesmoke;
}

.table-height-losx {
  height: 180;
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

.highlight {
  background-color: #eff5fb;
}

tr:hover {
  cursor: pointer;
  background-color: #ebfffc;
}
</style>
