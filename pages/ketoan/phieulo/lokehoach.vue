<template>
  <div class="columns">
    <div class="column">
      <br />
      <div class="box" style="margin-left: 20px; margin-right: 20px">
        <div class="columns">
          <div class="column is-9">
            <div class="control">
              <span class="icon is-small is-left">
                <i style="color: #ff55acee" class="fas fa-broom"></i>
              </span>
              <span style="color: #3850b7; font-size: 16px; font-weight: bold">Lập phiếu lô kế hoạch</span>
            </div>
          </div>
          <div class="column" style="text-align: right">
            <button @click="onTaophieu" class="button is-success is-fullwidth is-small">
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
            <div class="column">
              <table class="table is-responsive is-bordered is-narrow is-fullwidth">
                <tr style="background-color: #fffaeb">
                  <td colspan="5" style="text-align: center; font-weight: bold; font-size: small;">
                    Thông tin Phiếu lô kế hoạch
                  </td>
                </tr>
                <tr>
                  <td colspan="2">
                    <div class="control has-icons-left">
                      <input @change="showMalosx" type="text" class="input" placeholder="Mô tả sản phẩm"
                        v-model="form.mota" />
                      <span class="icon is-left">
                        <i style="color: #48c78e" class="fas fa-biohazard"></i>
                      </span>
                    </div>
                  </td>
                  <td colspan="2">
                    <div style="height: 20px">
                      <model-list-select :list="ds_sanpham" v-model="show_mota_sp" option-value="mavt"
                        :custom-text="format" placeholder="Thông tin về sản phẩm">
                      </model-list-select>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="text-align: center; font-weight: bold; font-size: small;">
                    Mã KẾ HOẠCH Nhà máy
                  </td>
                  <td style="text-align: center; font-weight: bold; font-size: small;">
                    Thời gian bắt Đầu
                  </td>
                  <td style="text-align: center; font-weight: bold; font-size: small;">
                    Thời gian kết thúc
                  </td>
                  <td style="text-align: center; font-weight: bold; font-size: small;">
                    Số lượng kế hoạch
                  </td>
                </tr>
                <tr>
                  <td>
                    <input v-model.trim="form.makh" class="input is-fullwidth is-danger is-small" type="text" />
                  </td>
                  <td>
                    <input v-model.trim="form.tgbatdau" type="date" class="input is-small" />
                  </td>
                  <td>
                    <input v-model.trim="form.tgketthuc" type="date" class="input is-small" />
                  </td>
                  <td>
                    <input v-model.trim="form.soluong" type="text" class="input is-small" />
                  </td>
                </tr>

                <tr>
                  <td colspan="4">
                    <div style="margin-bottom: 10px">
                      <label class="checkbox">
                        <input type="checkbox" v-model="checkGhichu" />
                        <span style="font-weight: bold">Ghi chú </span>
                      </label>
                    </div>
                    <div v-if="checkGhichu == true" class="field" style="margin-top: 10px">
                      <div class="control">
                        <textarea v-model.trim="form.ghichu" class="textarea is-small"
                          placeholder="Ghi chú thêm ..."></textarea>
                      </div>
                    </div>
                  </td>
                </tr>
              </table>
            </div>
            <div class="column is-3">
              <div class="ttl" style="border: 1px solid green; height: 224px">
                <div style="
                    text-align: center;
                    padding-top: 60px;
                    font-weight: bold;
                    font-size: 20px;
                    color: #00d1b2;
                  ">
                  <span>Lập Phiếu</span>
                </div>
                <div style="
                    text-align: center;
                    font-weight: bold;
                    font-size: 30px;
                    color: #3e8ed0;
                  ">
                  <span>Lô Kế Hoạch</span>
                </div>
              </div>
            </div>
          </div>

          <div v-if="giaopx == 1">
            <button @click="addPhanxuong()" class="button is-small is-info">
              Giao phân xưởng sản xuất
            </button>
          </div>

          <div v-if="isphanxuong == 1">
            <table class="table is-responsive is-bordered is-narrow is-fullwidth">
              <tr style="background-color: #faf0f5">
                <td colspan="9" style="font-weight: bold; font-size: small">
                  Chọn giao các phân xưởng tham gia sản xuất
                </td>
              </tr>
              <tr>
                <td style="
                    width: 3%;
                    font-size: small;
                    font-weight: 500;
                    text-align: center;
                  ">
                  STT
                </td>
                <td style="
                    width: 15%;
                    font-size: small;
                    font-weight: 500;
                    text-align: center;
                  ">
                  Phân xưởng
                </td>
                <td style="
                    width: 30%;
                    font-size: small;
                    font-weight: 500;
                    text-align: center;
                  ">
                  Sản phẩm
                </td>
                <td style="
                    width: 10%;
                    font-size: small;
                    font-weight: 500;
                    text-align: center;
                  ">
                  Mã kế hoạch PX
                </td>
                <td style="
                    width: 6%;
                    font-size: small;
                    font-weight: 500;
                    text-align: center;
                  ">
                  Số lượng
                </td>
                <td style="
                    width: 3%;
                    font-size: small;
                    font-weight: 500;
                    text-align: center;
                  ">
                  Thời gian bắt đầu
                </td>
                <td style="
                    width: 3%;
                    font-size: small;
                    font-weight: 500;
                    text-align: center;
                  ">
                  Thời gian kết thúc
                </td>
                <td style="
                    width: 5%;
                    font-size: small;
                    font-weight: 500;
                    text-align: center;
                  ">
                  Xóa
                </td>
                <td style="
                                    width: 5%;
                                    font-size: small;
                                    font-weight: 500;
                                    text-align: center;
                                  ">
                  Copy
                </td>
              </tr>
              <tr v-if="isphanxuong == 1" v-for="(item, index) in items" :key="index + 'cm-a'">
                <td style="font-size: small; text-align:center">
                  {{ index + 1 }}
                </td>

                <td>
                  <div class="control has-icons-left">
                    <div class="select is-fullwidth is-small">
                      <select v-model.trim="item.mapx" @change="
                        getInfoPX($event, $event.target.selectedIndex, index)
                      ">
                        <option v-for="(item, index) in phanxuong" :key="index + 'gf'" :value="item.mapx">
                          {{ item.tenpx }}
                        </option>
                      </select>
                    </div>
                    <span class="icon is-left">
                      <i style="color: #48c78e" class="fas fa-dice-d6"></i>
                    </span>
                  </div>
                </td>
                <td style="font-size: small;">
                  <model-list-select :list="item.sanpham" v-model="item.masp" option-value="masp"
                    :custom-text="codeAndNameAndDesc" placeholder="Chọn sản phẩm">
                  </model-list-select>
                </td>
                <!-- <td style="font-size: small;">
                  <input type="text" class="input is-small" v-model.trim="item.masp">
                </td> -->
                <td>
                  <input v-model.trim="item.makhpx" type="text" class="input is-warning is-small" />
                </td>
                <td>
                  <input v-model.trim="item.soluong" type="text" class="input is-small" />
                </td>
                <td>
                  <input v-model.trim="item.ngaybd" type="date" class="input is-small" />
                </td>
                <td>
                  <input v-model.trim="item.ngaykt" type="date" class="input is-small" />
                </td>
                <td style="text-align: center">
                  <button @click="deleteRow(index)" class="button is-danger is-small">
                    Xóa
                  </button>
                </td>
                <td style="text-align: center">
                  <button @click="copyadd(item)" class="button is-warning is-small">
                    copy
                  </button>
                </td>
              </tr>
            </table>
          </div>
        </div>
        <br />
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import _ from "lodash";
import {
  ModelSelect,
  ModelListSelect,
  MultiSelect,
  ListSelect,
  BasicSelect,
} from "vue-search-select";
import "vue-search-select/dist/VueSearchSelect.css";
export default {
  middleware: "auth",
  components: {
    ModelSelect,
    ModelListSelect,
    MultiSelect,
    ListSelect,
    BasicSelect,
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
      dongia_ns: "",
      namlsx: "",
      kehoach: [],
      checkMakh: "",
      checkMalosx: "",
      listlkh: [],
      arrLkh: [],
      isExits: null,
      show_mota_sp: "",
      form: {
        makh: "",
        mota: "",
        masp: "",
        tensp: "",
        soluong: "",
        tgbatdau: "",
        tgketthuc: "",
        tgktthucte: "",
        ghichu: "",
        createdAt: null,
        createdBy: this.$auth.$state.user.username,
        status: 0,
      },
      isphanxuong: 0,
      selectedIndex: 0,
      giaopx: 0,
      checkGhichu: false,
      items: [
        {
          mapx: "",
          tenpx: "",
          makh: "",
          soluong: "",
          ngaybd: "",
          ngaykt: "",
          soluong: "",
          masp: "",
          tensp: "",
          createdAt: "",
          sanpham: [
            {
              masp: "",
              tensp: "",
            },
          ],
        },
      ],

      stringItem: "",
      searchText: "", // If value is falsy, reset searchText & searchItem
    };
  },

  mounted() {
    this.currentDateTime();
    this.get_phanxuong();
    this.getMakehoach();
    this.deleteRow(0);
    this.get_dmsp();
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
    codeAndNameAndDesc(item) {
      return `${item.masp} - ${item.tensp}`;
    },

    format(item) {
      return `${item.mapx} - ${item.mavt} - ${item.tenvt}`;
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
      this.namlsx = current.getFullYear();
      this.form.createdAt = date + " " + time;
    },

    async showMalosx(e) {
      this.giaopx = 1;
      // var name = e.target.options[e.target.options.selectedIndex].text;
      // let position = name.split("--");
      // this.form.masp = position[0].trim();
      // this.form.tensp = position[1].trim();
      let nn = this.namlsx.toString();
      let sx_nam = nn.substring(2, 4);
      // console.log(this.form.makh.length)
      this.checkMakh = this.form.makh.length;
      // console.log(this.checkMakh)

      // get nhóm lương
      // this.nhomluong = await this.$axios.$get(
      //   `/api/phongban/getnhomluong?masp=${this.form.masp}`
      // );
      // this.form.nhomluong = this.nhomluong[0].nhomluong;

      // show select nguyencong dongia
      // this.dmnguyencong = await this.$axios.$get(
      //   `/api/phongban/getnguyencong?khsp=${this.form.nhomluong}`
      // );

      var today = new Date();
      var dd = String(today.getDate()).padStart(2, "0");
      var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      var yyyy = today.getFullYear();

      today = dd + "/" + mm + "/" + yyyy;
      this.form.ngaygiaophieu = today;
      // console.log(this.selectedPhanxuong);
    },

    // get all phân xưởng
    async get_phanxuong() {
      this.phanxuong = await this.$axios.$get(`/api/phongban/allphanxuong`);
    },

    async get_dmsp() {
      this.ds_sanpham = await this.$axios.$get(
        `/api/sanpham/getallspfromdmnc`
      );
    },

    async getMakehoach() {
      this.listlkh = await this.$axios.$get(`/api/lokehoach/malokh`);
      // console.log(this.listlkh)
      for (let i = 0; i < this.listlkh.length; i++) {
        let mkk = this.listlkh[i].makh.trim();
        this.arrLkh.push(mkk);
      }
      // console.log(this.arrLkh);
    },

    deleteRow(index) {
      this.items.splice(index, 1);
    },

    async addPhanxuong() {
      this.isphanxuong = 1;
      this.items.push({
        makh: "",
        mapx: "",
        tenpx: "",
        makhpx: "",
        soluong: "",
        ngaybd: "",
        ngaykt: "",
        soluong: "",
        masp: "",
        tensp: "",
        createdAt: this.form.createdAt,
        sanpham: [
          {
            masp: "",
            tensp: "",
          },
        ],
      });
    },

    async copyadd(data) {
      // tìm cách lấy tên vật tư do k có @change
      let mapx
      let tenvt
      if (data.mapx == 'AL_PXD' || data.mapx == 'DV_PXD') {
        mapx = 'PXD'
      } else {
        mapx = data.mapx
      }
      let getsp = {}
      getsp = await this.$axios.$get(
        `/api/ketoan/gettensp?mapx=${mapx}&mavt=${data.masp}`
      );
      tenvt = getsp[0].tenvt
      // console.log(getsp[0].tenvt)
      // this.items.push(data);
      this.items.push({
        makh: data.makh,
        mapx: data.mapx,
        tenpx: data.tenpx,
        makhpx: data.makhpx,
        soluong: data.soluong,
        ngaybd: data.ngaybd,
        ngaykt: data.ngaykt,
        masp: data.masp,
        tensp: tenvt,
        createdAt: this.form.createdAt,
        sanpham: [
          {
            masp: data.masp,
            tensp: tenvt,
          },
        ],
      });
      // console.log(this.items)
    },

    async getInfoPX(event, selectedIndex, index) {
      this.selectedIndex = selectedIndex;
      for (let i = 0; i < this.items.length; i++) {
        // console.log(this.form.makh)
        this.items[i].makh = this.form.makh
        if (i == index) {
          let px;
          this.items[i].mapx = this.phanxuong[this.selectedIndex].mapx;
          this.items[i].tenpx = this.phanxuong[this.selectedIndex].tenpx;
          if (
            this.items[i].mapx == "AL_PXD" ||
            this.items[i].mapx == "DV_PXD"
          ) {
            px = "PXD";
            this.dm_sanpham = await this.$axios.$get(
              `/api/sanpham/getallspwithmapxfromdmnc?mapx=${px}`
            );
          } else {
            this.dm_sanpham = await this.$axios.$get(
              `/api/sanpham/getallspwithmapxfromdmnc?mapx=${this.items[i].mapx}`
            );
          }
          // console.log(this.dm_sanpham);
          this.items[i].sanpham = [];

          for (let k = 0; k < this.dm_sanpham.length; k++) {
            let cn = {
              masp: this.dm_sanpham[k].mavt,
              tensp: this.dm_sanpham[k].tenvt,
            };
            this.items[i].sanpham.push(cn);
            // console.log(cn)
          }
        }
      }
    },

    // create phiếu
    async onTaophieu() {
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
            // console.log(this.items);
            if (
              this.form.makh == "" ||
              this.form.tgbatdau == "" ||
              this.form.tgketthuc == "" ||
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
                title: "Yêu cầu nhập đủ thông tin kế hoạch !!!",
              });
            } else {
              // console.log(this.form.makh);
              // console.log(this.arrLkh);
              this.isExits = this.arrLkh.includes(this.form.makh.trim());
              // console.log(this.isExits);
              if (this.isExits == false) {
                if (this.form.makh.length == "") {
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
                    title: "Yêu cầu gõ vào mã kế hoạch nhà máy",
                  });
                } else {
                  // add kế hoạch cho từng phân xưởng vào bảng lô kế hoạch
                  // console.log(this.items)
                  for (let i = 0; i < this.items.length; i++) {
                    if (
                      this.items[i].mapx == "" ||
                      this.items[i].soluong == "" ||
                      this.items[i].ngaybd == "" ||
                      this.items[i].ngaykt == ""
                    ) {
                      const Toast = Swal.mixin({
                        toast: true,
                        position: "top-end",
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                          toast.addEventListener("mouseenter", Swal.stopTimer);
                          toast.addEventListener(
                            "mouseleave",
                            Swal.resumeTimer
                          );
                        },
                      });
                      Toast.fire({
                        icon: "error",
                        title: "Nhập đủ dữ liệu kế hoạch giao cho phân xưởng",
                      });
                    } else {
                      // console.log(this.items[i].mapx)
                      // console.log(this.items[i].masp)
                      let mapx
                      let tensp
                      if (this.items[i].mapx == 'AL_PXD' || this.items[i].mapx == 'DV_PXD') {
                        mapx = 'PXD'
                      } else {
                        mapx = this.items[i].mapx
                      }

                      this.$axios.$get(`/api/ketoan/gettensp?mapx=${mapx}&mavt=${this.items[i].masp}`)
                        .then(resp => {
                          // console.log(resp);
                          // tensp = resp[0].tenvt
                          this.items[i].tensp = resp[0].tenvt
                          this.$axios.$post(
                            "/api/ketoan/addphieulokh",
                            this.items[i]
                          );
                        })
                        .catch(err => {
                          // Handle Error Here
                          console.error(err);
                        });
                    }
                  }

                  // add kế hoạch vào bảng kế hoạch
                  this.$axios.$post("/api/lokehoach/addkehoach", this.form);

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
                    title: "Tạo KẾ HOẠCH thành công",
                  });

                  // window.location.reload();
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
                  title: "Mã KẾ HOẠCH này đã tồn tại",
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

    // async onTaophieu() {
    //   try {
    //     // console.log(this.items);
    //     if (
    //       this.form.makh == "" ||
    //       this.form.tgbatdau == "" ||
    //       this.form.tgketthuc == "" ||
    //       this.form.soluong == ""
    //     ) {
    //       // console.log(this.checkMakh)
    //       const Toast = Swal.mixin({
    //         toast: true,
    //         position: "top-end",
    //         showConfirmButton: false,
    //         timer: 3000,
    //         timerProgressBar: true,
    //         didOpen: (toast) => {
    //           toast.addEventListener("mouseenter", Swal.stopTimer);
    //           toast.addEventListener("mouseleave", Swal.resumeTimer);
    //         },
    //       });
    //       Toast.fire({
    //         icon: "error",
    //         title: "Yêu cầu nhập đủ thông tin kế hoạch !!!",
    //       });
    //     } else {
    //       // console.log(this.form.makh);
    //       // console.log(this.arrLkh);
    //       this.isExits = this.arrLkh.includes(this.form.makh.trim());
    //       // console.log(this.isExits);
    //       if (this.isExits == false) {
    //         if (this.form.makh.length == "") {
    //           const Toast = Swal.mixin({
    //             toast: true,
    //             position: "top-end",
    //             showConfirmButton: false,
    //             timer: 3000,
    //             timerProgressBar: true,
    //             didOpen: (toast) => {
    //               toast.addEventListener("mouseenter", Swal.stopTimer);
    //               toast.addEventListener("mouseleave", Swal.resumeTimer);
    //             },
    //           });
    //           Toast.fire({
    //             icon: "error",
    //             title: "Yêu cầu gõ vào mã kế hoạch nhà máy",
    //           });
    //         } else {
    //           // add kế hoạch cho từng phân xưởng vào bảng lô kế hoạch
    //           // console.log(this.items)
    //           for (let i = 0; i < this.items.length; i++) {
    //             if (
    //               this.items[i].mapx == "" ||
    //               this.items[i].soluong == "" ||
    //               this.items[i].ngaybd == "" ||
    //               this.items[i].ngaykt == ""
    //             ) {
    //               const Toast = Swal.mixin({
    //                 toast: true,
    //                 position: "top-end",
    //                 showConfirmButton: false,
    //                 timer: 3000,
    //                 timerProgressBar: true,
    //                 didOpen: (toast) => {
    //                   toast.addEventListener("mouseenter", Swal.stopTimer);
    //                   toast.addEventListener(
    //                     "mouseleave",
    //                     Swal.resumeTimer
    //                   );
    //                 },
    //               });
    //               Toast.fire({
    //                 icon: "error",
    //                 title: "Nhập đủ dữ liệu kế hoạch giao cho phân xưởng",
    //               });
    //             } else {
    //               // console.log(this.items[i].mapx)
    //               // console.log(this.items[i].masp)
    //               let mapx
    //               let tensp
    //               if (this.items[i].mapx == 'AL_PXD' || this.items[i].mapx == 'DV_PXD') {
    //                 mapx = 'PXD'
    //               } else {
    //                 mapx = this.items[i].mapx
    //               }

    //               this.$axios.$get(`/api/ketoan/gettensp?mapx=${mapx}&mavt=${this.items[i].masp}`)
    //                 .then(resp => {
    //                   // console.log(resp);
    //                   // tensp = resp[0].tenvt
    //                   this.items[i].tensp = resp[0].tenvt
    //                   this.$axios.$post(
    //                     "/api/ketoan/addphieulokh",
    //                     this.items[i]
    //                   );
    //                 })
    //                 .catch(err => {
    //                   // Handle Error Here
    //                   console.error(err);
    //                 });


    //               // // gán tên sp
    //               // tensp = getsp[0].tenvt
    //               // console.log(tensp)
    //               // this.items[0].tensp = tensp


    //             }
    //           }

    //           // add kế hoạch vào bảng kế hoạch
    //           this.$axios.$post("/api/lokehoach/addkehoach", this.form);

    //           const Toast = Swal.mixin({
    //             toast: true,
    //             position: "top-end",
    //             showConfirmButton: false,
    //             timer: 3000,
    //             timerProgressBar: true,
    //             didOpen: (toast) => {
    //               toast.addEventListener("mouseenter", Swal.stopTimer);
    //               toast.addEventListener("mouseleave", Swal.resumeTimer);
    //             },
    //           });
    //           Toast.fire({
    //             icon: "success",
    //             title: "Tạo KẾ HOẠCH thành công",
    //           });

    //           // window.location.reload();
    //         }
    //       } else {
    //         const Toast = Swal.mixin({
    //           toast: true,
    //           position: "top-end",
    //           showConfirmButton: false,
    //           timer: 3000,
    //           timerProgressBar: true,
    //           didOpen: (toast) => {
    //             toast.addEventListener("mouseenter", Swal.stopTimer);
    //             toast.addEventListener("mouseleave", Swal.resumeTimer);
    //           },
    //         });
    //         Toast.fire({
    //           icon: "error",
    //           title: "Mã KẾ HOẠCH này đã tồn tại",
    //         });
    //       }
    //     }
    //   } catch (error) {
    //     console.log(error);
    //     const Toast = Swal.mixin({
    //       toast: true,
    //       position: "top-end",
    //       showConfirmButton: false,
    //       timer: 3000,
    //       timerProgressBar: true,
    //       didOpen: (toast) => {
    //         toast.addEventListener("mouseenter", Swal.stopTimer);
    //         toast.addEventListener("mouseleave", Swal.resumeTimer);
    //       },
    //     });
    //     Toast.fire({
    //       icon: "error",
    //       title: "Có lỗi xảy ra !!!",
    //     });
    //   }
    // }



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

.ttl {}
</style>
