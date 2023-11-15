<template>
  <div class="columns">
    <div class="column container">
      <br />
      <div class="box" style="margin-left: 3px; margin-right: 3px">
        <div class="columns">
          <div class="column">
            <div class="control">
              <span class="icon is-small is-left">
                <i style="color: #00d1b2" class="fas fa-compress-alt"></i>
              </span>
              <span style="color: #3850b7; font-size: 15px; font-weight: bold"
                >Điều chuyển công nhân</span
              >
            </div>
          </div>
        </div>

        <div class="columns">
          <div class="column">
            <span>Có tất cả: </span>
            <span style="font-weight: bold">{{
              congnhan.length | formatNumber
            }}</span>
            <span>công nhân</span>
          </div>
        </div>
        <div class="columns">
          <div class="column" style="text-align: right">
            <div class="control has-icons-left">
              <div class="select is-small is-fullwidth">
                <select @change="getWithPX($event)">
                  <option selected>-- Xem theo phân xưởng --</option>
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
          <div class="column" style="text-align: right">
            <div class="control has-icons-left">
              <div class="select is-small is-fullwidth">
                <select @change="getWithTo($event)">
                  <option selected>-- Xem theo tổ --</option>
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
        </div>

        <div style="margin-bottom: 3px; text-align: right">
          <vue-excel-xlsx
            :data="congnhan"
            :columns="columns"
            :file-name="'Danh_cong_nhan'"
            :file-type="'xlsx'"
            :sheet-name="'Danh mục công nhân'"
          >
            Download Excel
          </vue-excel-xlsx>
        </div>
        <div class="table_wrapper table-height">
          <table
            class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth"
          >
            <thead>
              <tr style="background-color: #fffaeb">
                <td
                  style="text-align: right; font-size: small; font-weight: bold"
                  colspan="10"
                >
                  <a @click="getDmcn">
                    <span class="icon is-small is-left">
                      <i style="color: #f96854" class="fab fa-audible"></i>
                    </span>
                    Hiển thị tất cả
                  </a>
                </td>
              </tr>
              <tr style="background-color: #fffaeb">
                <th style="text-align: center; font-size: small">STT</th>
                <!-- <th style="text-align: center; font-size: small">Sửa</th>
                <th style="text-align: center; font-size: small">Xóa</th> -->
                <th style="text-align: center; font-size: small">
                  Mã công nhân
                </th>
                <th style="text-align: center; font-size: small">
                  Tên công nhân
                </th>
                <th style="text-align: center; font-size: small">Mã tổ</th>
                <th style="text-align: center; font-size: small">Tên tổ</th>
                <th style="text-align: center; font-size: small">
                  Mã phân xưởng
                </th>
                <th style="text-align: center; font-size: small">
                  Tên phân xưởng
                </th>
                <th style="text-align: center; font-size: small">
                  Điều chuyển
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(px, index) in congnhan" :key="index">
                <td style="text-align: center; font-size: small">
                  {{ index + 1 }}
                </td>
                <!-- <td style="text-align: center; color: green">
                  <nuxt-link :to="`/danhmuc/congnhan/${px._id}/manage`">
                    <span class="icon is-small">
                      <i class="far fa-check-circle"></i>
                    </span>
                  </nuxt-link>
                </td>
                <td style="text-align: center">
                  <a @click="onDelete(px)">
                    <span style="color: red" class="icon is-small">
                      <i class="fas fa-times"></i>
                    </span>
                  </a>
                </td> -->
                <td style="font-size: small">{{ px.macn }}</td>
                <td style="font-size: small">{{ px.tencn }}</td>
                <td style="font-size: small">{{ px.mato }}</td>
                <td style="font-size: small">{{ px.tento }}</td>
                <td style="font-size: small">{{ px.mapx }}</td>
                <td style="font-size: small">{{ px.tenpx }}</td>
                <td style="font-size: small; text-align: center">
                  <a @click="dieuChuyen(px)"
                    ><span>
                      <i
                        style="color: red"
                        class="fa fa-check-circle"
                      ></i> </span
                  ></a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Modal điều chuyển công nhân -->
        <div class="">
          <div :class="{ 'is-active': isActive_dieuchuyen }" class="modal">
            <div class="modal-background"></div>
            <div class="modal-content modal-card">
              <header
                style="
                  background-color: #3e8ed0;
                  border-top-left-radius: 8px;
                  border-top-right-radius: 8px;
                "
              >
                <div class="columns is-mobile">
                  <div class="column">
                    <p
                      style="
                        font-size: small;
                        font-weight: bold;
                        color: white;
                        padding: 15px;
                      "
                    >
                      <span class="icon is-small is-left">
                        <i
                          style="color: #ffd863ff"
                          class="fas fa-feather-alt"
                        ></i>
                      </span>
                      Điều chuyển công nhân
                    </p>
                  </div>
                </div>
              </header>
              <section class="modal-card-body">
                <div class="notification">
                  1 - Chọn phân xưởng hoặc tổ mới cho công nhân cần điều chuyển.
                  <br />
                  2 - Xem danh sách mã công nhân đã có trong xưởng/tổ muốn điều
                  công nhân đến. 3 - Sau khi bấm điều chuyển thì công nhân sẽ
                  được điều chuyển về xưởng/tổ mới, với mã công nhân vừa gõ vào.
                </div>
                <div class="columns">
                  <div class="column">
                    <div class="field">
                      <label class="label">Phân xưởng</label>
                      <div class="control has-icons-left">
                        <div class="select is-small is-fullwidth">
                          <select @change="showmapx($event)">
                            <option selected>-- Chọn phân xưởng --</option>
                            <option
                              v-for="item in phanxuong_dieuchuyen"
                              :value="item.mapx"
                            >
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
                </div>

                <div class="columns">
                  <div class="column">
                    <div class="field">
                      <label class="label">Tổ</label>
                      <div class="control has-icons-left">
                        <div class="select is-small is-fullwidth">
                          <select @change="showmato($event)">
                            <option selected>-- Chọn tổ --</option>
                            <option
                              v-for="item in tonhom_dieuchuyen"
                              :value="item.mato"
                            >
                              {{ item.mato }} -- {{ item.tento }}
                            </option>
                          </select>
                        </div>
                        <span class="icon is-small is-left">
                          <i style="color: #48c78e" class="fas fa-kaaba"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="columns">
                  <div class="column">
                    <div class="field">
                      <label class="label">{{ form.macn }}</label>
                    </div>
                  </div>

                  <div class="column">
                    <div class="field">
                      <label class="label">{{ form.tencn }}</label>
                    </div>
                  </div>
                </div>

                <div class="columns" style="margin-top: 10px">
                  <div class="column">
                    <button
                      @click="onDieuchuyen"
                      class="button is-success is-fullwidth is-small"
                    >
                      Điều chuyển
                    </button>
                  </div>
                  <div class="column">
                    <button
                      @click="isActive_dieuchuyen = false"
                      class="button is-danger is-light is-fullwidth is-small"
                    >
                      Hủy bỏ
                    </button>
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
import createNumberMask from "text-mask-addons/dist/createNumberMask";
const currencyMask = createNumberMask({
  prefix: "",
  allowDecimal: true,
  includeThousandsSeparator: true,
  allowNegative: false,
});
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
      congnhan: [],
      phanxuong: [],
      tonhom: [],
      tonhomid: [],
      tonhom_dieuchuyen: [],
      phanxuong_dieuchuyen: [],
      mask: currencyMask,
      dataMacn: [],
      form: [],
      form_dieuchuyen: [],
      maxuong: "",
      tenxuong: "",
      mato: "",
      tento: "",
      checkGhichu: false,
      hisform: {
        tenthaotac: null,
        createdAt: null,
        createdBy: this.$auth.$state.user.username,
        ghichu: null,
      },

      data_dieuchuyen: {
        macn: "",
        tencn: "",
        mapx: "",
        tenpx: "",
        mato: "",
        tento: "",
      },

      // Modals
      isActive: false,
      isActive_dieuchuyen: false,
      columns: [
        {
          label: "Id nhân viên",
          field: "_id",
        },
        {
          label: "Mã công nhân",
          field: "macn",
        },
        {
          label: "Tên công nhân",
          field: "tencn",
        },
        {
          label: "Mã phân xưởng",
          field: "mapx",
        },
        {
          label: "Tên phân xưởng",
          field: "tenpx",
        },
        {
          label: "Mã tổ",
          field: "mato",
        },
        {
          label: "Tên tổ",
          field: "tento",
        },
        {
          label: "Số điện thoại",
          field: "sdt",
        },
        {
          label: "CCCD",
          field: "cccd",
        },
        {
          label: "Ngày sinh",
          field: "ngaysinh",
          dataFormat: this.prefixformatDate,
        },
        {
          label: "Giới tính",
          field: "gioitinh",
        },
        {
          label: "Chức vụ",
          field: "chucvu",
        },
        {
          label: "Lương cơ bản",
          field: "luongcb",
        },
        {
          label: "Người liên hệ",
          field: "nguoilienhe",
        },
        {
          label: "Địa chỉ",
          field: "diachi",
        },
        {
          label: "Số tài khoản ngân hàng",
          field: "sotknh",
        },
        {
          label: "Tên ngân hàng",
          field: "tennh",
        },
        {
          label: "Lương QLSP",
          field: "luongqlsp",
        },
        {
          label: "Ghi chú",
          field: "ghichu",
        },
        {
          label: "Trạng thái",
          field: "trangthai",
        },
        {
          label: "Mã chấm công",
          field: "machamcong",
        },
        {
          label: "Số TT CN",
          field: "sttchon",
        },
        {
          label: "Tạo ngày",
          field: "createdAt",
          dataFormat: this.prefixformatDate,
        },
        {
          label: "Tạo bởi",
          field: "createdBy",
        },
        {
          label: "Cập nhật ngày",
          field: "updatedAt",
          dataFormat: this.prefixformatDate,
        },
      ],
    };
  },

  validations: {
    form: {
      macn: {
        required,
      },
      tencn: {
        required,
      },
      sdt: {
        required,
      },
      diachi: {
        required,
      },
      cccd: {
        required,
      },
      nguoilienhe: {
        required,
      },
    },
  },

  mounted() {
    this.getDmcn();
    this.currentDateTime();
    this.getPhanxuong();
    // this.getmapx();
  },

  isFormValid() {
    return !this.$v.form.$invalid;
  },

  methods: {
    onChangePage(pageOfitems) {
      this.pageOfitems = pageOfitems;
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
      this.hisform.createdAt = date + " " + time;
    },

    // format date
    prefixformatDate(value) {
      if (!value) {
        return "";
      }
      value = new Date(value);
      return (
        value.getFullYear() +
        "-" +
        ("0" + (value.getMonth() + 1)).slice(-2) +
        "-" +
        ("0" + value.getDate()).slice(-2)
      );
    },

    async getDmcn() {
      this.congnhan = await this.$axios.$get(`/api/congnhan/allcongnhan`);
      if (this.congnhan.length <= 0) {
        this.$toasted.show("Danh mục công nhân rỗng", {
          duration: 3000,
          theme: "bubble",
        });
      }
    },

    async getPhanxuong() {
      this.phanxuong = await this.$axios.$get(`/api/phongban/allphanxuong`);
    },

    // tổ xưởng filter
    async getWithPX(e) {
      // console.log(this.mapx)
      var name = e.target.options[e.target.options.selectedIndex].text;
      // console.log(name)
      let position = name.split("--");
      let p1 = position[0].trim();
      this.congnhan = await this.$axios.$get(
        `/api/congnhan/allcongnhanpx?mapx=${p1}`
      );
      this.tonhomid = await this.$axios.$get(
        `/api/phongban/alltoinxuong?mapx=${p1}`
      );
    },
    async getWithTo(e) {
      // console.log(this.mapx)
      var name = e.target.options[e.target.options.selectedIndex].text;
      // console.log(name)
      let position = name.split("--");
      let p1 = position[0].trim();
      this.congnhan = await this.$axios.$get(
        `/api/congnhan/allcongnhanto?mato=${p1}`
      );
    },

    // tổ xưởng điều chuyển
    async showmapx(e) {
      // console.log(this.mapx)
      this.tonhom_dieuchuyen = [];
      this.dataMacn = [];
      //   this.data_dieuchuyen.mapx = "";
      //   this.data_dieuchuyen.tenpx = "";
      //   this.data_dieuchuyen.mato = "";
      //   this.data_dieuchuyen.tento = "";
      var name = e.target.options[e.target.options.selectedIndex].text;
      // console.log(name)
      let position = name.split("--");
      this.maxuong = position[0].trim();
      this.tenxuong = position[1].trim();
      this.tonhom_dieuchuyen = await this.$axios.$get(
        `/api/phongban/alltoinxuong?mapx=${this.maxuong}`
      );
      // console.log(this.tonhom_dieuchuyen);

      //   this.data_dieuchuyen.mapx = position[0].trim();
      //   this.data_dieuchuyen.tenpx = position[1].trim();
      if (this.tonhom_dieuchuyen.length <= 0) {
        const dataMacn = await this.$axios.$get(
          `/api/congnhan/showmacninpx?mapx=${this.maxuong}`
        );
        this.dataMacn = dataMacn;
        this.form_dieuchuyen.mato = "";
        this.form_dieuchuyen.tento = "";
      }
    },

    async showmato(e) {
      // console.log(this.mapx)
      var name = e.target.options[e.target.options.selectedIndex].text;
      // console.log(name)
      let position = name.split("--");
      this.mato = position[0].trim();
      this.tento = position[1].trim();
      //   this.data_dieuchuyen.mato = position[0].trim();
      //   this.data_dieuchuyen.tento = position[1].trim();
      const dataMacn = await this.$axios.$get(
        `/api/congnhan/showmacninto?mato=${this.mato}`
      );
      this.dataMacn = dataMacn;
    },

    onAddCongnhan() {
      Swal.fire({
        title: "Chắc chắn thêm mới công nhân này?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Chắc chắn thêm mới",
      }).then((result) => {
        if (result.isConfirmed) {
          try {
            this.$v.form.$touch();
            // console.log(this.$auth.$state.user.username);

            this.$axios.$post("/api/congnhan/addcongnhan", this.form);

            this.getDmcn();
            this.isActive = false;

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
              title: "Thêm mới công nhân thành công",
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
      });
    },

    async dieuChuyen(item) {
      this.phanxuong_dieuchuyen = await this.$axios.$get(
        `/api/phongban/allphanxuong`
      );
      this.form_dieuchuyen = [];
      this.dataMacn = [];
      this.isActive_dieuchuyen = true;
      // console.log(item);
      //   const dataMacn = await this.$axios.$get(
      //     `/api/congnhan/showmacninpx?mapx=${item.mapx}`
      //   );
      //   // console.log(dataMacn);
      //   // const arrMacn = dataMacn.map(item => item.macn);
      //   this.dataMacn = dataMacn;
      this.form_dieuchuyen = {
        ...item,
        luongcb: item.luongcb.toString().replace(/,/g, ""),
      };
      // console.log(this.form);
      // const a = "5,6,00,000";
      // const b = "65000000";
      // console.log(a.toString().replace(/,/g, ""));
      // console.log(b.toString().replace(/,/g, ""));

      // this.form._id = item._id;
      // this.form.macn = item.macn;
      // this.form.tencn = item.tencn;
      // // this.form.mapx = item.mapx
      // // this.form.tenpx = item.tenpx
      // this.form.sdt = item.sdt;
      // this.form.diachi = item.diachi;
      // this.form.cccd = item.cccd;
      // // this.form.mato = item.mato
      // // this.form.tento = item.tento
      // this.form.chucvu = item.chucvu;
      // this.form.luongcb = item.luongcb;
      // this.form.nguoilienhe = item.nguoilienhe;
      // this.form.sotknh = item.sotknh;
      // this.form.tennh = item.tennh;
      // this.form.trangthai = 1;
      this.data_dieuchuyen.macn = this.form_dieuchuyen.macn;
      this.data_dieuchuyen.tencn = this.form_dieuchuyen.tencn;
      this.data_dieuchuyen.mapx = item.mapx;
      this.data_dieuchuyen.tenpx = item.tenpx;
      this.data_dieuchuyen.mato = item.mato;
      this.data_dieuchuyen.tento = item.tento;
    },

    async onDieuchuyen() {
      // console.log(this.form_dieuchuyen);
      // console.log(this.dataMacn);
      const arrMacn = this.dataMacn.map((item) => item.macn);
      // console.log(this.maxuong);
      if (this.maxuong == "") {
        // console.log(`${this.data_dieuchuyen.macn} đã tồn tại trong mảng.`);
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
          title: `Yêu cầu chọn phân xưởng`,
        });
      } else {
        // console.log(this.tonhom_dieuchuyen.length);
        if (this.tonhom_dieuchuyen.length <= 0) {
          // console.log(this.form_dieuchuyen.mapx);
          // console.log(this.maxuong);
          if (this.maxuong == this.form_dieuchuyen.mapx) {
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
              title: `Công nhân đang ở xưởng hiện tại. Mời bạn chọn phân xưởng khác!`,
            });
          } else {
            // nếu không cùng xưởng (khi không có tổ) thì cho chuyển xưởng
            const result = await Swal.fire({
              title: `Bạn có muốn điều chuyển công nhân: ${this.form_dieuchuyen.tencn}?`,
              showDenyButton: true,
              confirmButtonText: "Có, Điều chuyển",
              denyButtonText: `Hủy`,
            });
            if (result.isConfirmed) {
              // điều chuyển gồm các bước sau:
              // b1: ghi dữ liệu người được chọn điều chuyển sang tổ mới
              // b2: ghi dữ liệu người được chọn sang 1 bảng khác gọi là bảng dữ liệu điều chuyển
              // b2: xóa dữ liệu người được chọn ở tổ cũ
              // b3: ghi lại lịch sử ở bảng log
              // console.log(this.form);
              // b1: ghi dữ liệu ở tổ mới
              this.form_dieuchuyen.mapx = this.maxuong;
              this.form_dieuchuyen.tenpx = this.tenxuong;
              this.form_dieuchuyen.mato = this.mato;
              this.form_dieuchuyen.tento = this.tento;
              let log = "";
              if (this.mato == "") {
                this.form_dieuchuyen.ghichu = `Điều chuyển công nhân có mã: ${this.data_dieuchuyen.macn} từ phân xưởng ${this.data_dieuchuyen.mapx} sang phân xưởng ${this.form_dieuchuyen.mapx} vào ngày ${this.hisform.createdAt} bởi ${this.hisform.createdBy}`;
                log = `Điều chuyển công nhân: ${this.form_dieuchuyen.tencn}, Mã: ${this.form_dieuchuyen.macn} từ phân xưởng ${this.data_dieuchuyen.mapx} sang phân xưởng ${this.form.mapx}`;
              } else {
                this.form_dieuchuyen.ghichu = `Điều chuyển công nhân có mã: ${this.form_dieuchuyen.macn} từ tổ ${this.data_dieuchuyen.mato} thuộc phân xưởng ${this.data_dieuchuyen.mapx} sang phân xưởng ${this.form_dieuchuyen.mapx} vào tổ ${this.form_dieuchuyen.mato} vào ngày ${this.hisform.createdAt} bởi ${this.hisform.createdBy}`;
                log = `Điều chuyển công nhân: ${this.form_dieuchuyen.tencn}, Mã: ${this.form_dieuchuyen.macn} từ tổ ${this.data_dieuchuyen.mato} thuộc phân xưởng ${this.data_dieuchuyen.mapx} sang phân xưởng ${this.form_dieuchuyen.mapx} vào tổ ${this.form_dieuchuyen.mato}`;
              }
              const res = await this.$axios.$post(
                "/api/congnhan/addcongnhan",
                this.form_dieuchuyen
              );
              // console.log(res);
              // b2: ghi dữ liệu vào bảng điều chuyển
              // this.form.mapx = this.data_dieuchuyen.mapx;
              // this.form.tenpx = this.data_dieuchuyen.tenpx;
              // this.form.mato = this.data_dieuchuyen.mato;
              // this.form.tento = this.data_dieuchuyen.tento;
              await this.$axios.$post(
                "/api/congnhan/addcongnhandieuchuyen",
                this.form_dieuchuyen
              );
              // b3: xóa dữ liệu bảng cũ
              await this.$axios.$delete(
                `/api/congnhan/${this.form_dieuchuyen._id}`
              );
              // ghi lại log điều chuyển
              // const data = {
              //   trangthai: 0,
              //   ghichu: this.form.ghichu,
              // };
              // await this.$axios.$patch(
              //   `/api/congnhan/updatetrangthaicongnhan/${this.form._id}`,
              //   data
              // );
              const dataLog = {
                logname: log,
                createdAt: this.hisform.createdAt,
                createdBy: this.hisform.createdBy,
              };
              await this.$axios.$post(`/api/congnhan/addlognhansu`, dataLog);

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
                title: "Điều chuyển công nhân thành công",
              });

              this.getDmcn();
            }
          }
        } else {
          // console.log(this.mato);
          if (this.mato == "") {
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
              title: `Phân xưởng ${this.maxuong} có tổ, yêu cầu chọn tổ`,
            });
          } else if (this.mato == this.form_dieuchuyen.mato) {
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
              title: `Công nhân đang ở tổ hiện tại. Mời bạn chọn tổ khác!`,
            });
          } else {
            const result = await Swal.fire({
              title: `Bạn có muốn điều chuyển công nhân: ${this.form_dieuchuyen.tencn}?`,
              showDenyButton: true,
              confirmButtonText: "Có, Điều chuyển",
              denyButtonText: `Hủy`,
            });
            if (result.isConfirmed) {
              // điều chuyển gồm các bước sau:
              // b1: ghi dữ liệu người được chọn điều chuyển sang tổ mới
              // b2: ghi dữ liệu người được chọn sang 1 bảng khác gọi là bảng dữ liệu điều chuyển
              // b2: xóa dữ liệu người được chọn ở tổ cũ
              // b3: ghi lại lịch sử ở bảng log
              // console.log(this.form);
              // b1: ghi dữ liệu ở tổ mới
              this.form_dieuchuyen.mapx = this.maxuong;
              this.form_dieuchuyen.tenpx = this.tenxuong;
              this.form_dieuchuyen.mato = this.mato;
              this.form_dieuchuyen.tento = this.tento;
              let log = "";
              if (this.mato == "") {
                this.form_dieuchuyen.ghichu = `Điều chuyển công nhân có mã: ${this.data_dieuchuyen.macn} từ phân xưởng ${this.data_dieuchuyen.mapx} sang phân xưởng ${this.form_dieuchuyen.mapx} vào ngày ${this.hisform.createdAt} bởi ${this.hisform.createdBy}`;
                log = `Điều chuyển công nhân: ${this.form_dieuchuyen.tencn}, Mã: ${this.form_dieuchuyen.macn} từ phân xưởng ${this.data_dieuchuyen.mapx} sang phân xưởng ${this.form.mapx}`;
              } else {
                this.form_dieuchuyen.ghichu = `Điều chuyển công nhân có mã: ${this.form_dieuchuyen.macn} từ tổ ${this.data_dieuchuyen.mato} thuộc phân xưởng ${this.data_dieuchuyen.mapx} sang phân xưởng ${this.form_dieuchuyen.mapx} vào tổ ${this.form_dieuchuyen.mato} vào ngày ${this.hisform.createdAt} bởi ${this.hisform.createdBy}`;
                log = `Điều chuyển công nhân: ${this.form_dieuchuyen.tencn}, Mã: ${this.form_dieuchuyen.macn} từ tổ ${this.data_dieuchuyen.mato} thuộc phân xưởng ${this.data_dieuchuyen.mapx} sang phân xưởng ${this.form_dieuchuyen.mapx} vào tổ ${this.form_dieuchuyen.mato}`;
              }
              const res = await this.$axios.$post(
                "/api/congnhan/addcongnhan",
                this.form_dieuchuyen
              );
              // console.log(res);
              // b2: ghi dữ liệu vào bảng điều chuyển
              // this.form.mapx = this.data_dieuchuyen.mapx;
              // this.form.tenpx = this.data_dieuchuyen.tenpx;
              // this.form.mato = this.data_dieuchuyen.mato;
              // this.form.tento = this.data_dieuchuyen.tento;
              await this.$axios.$post(
                "/api/congnhan/addcongnhandieuchuyen",
                this.form_dieuchuyen
              );
              // b3: xóa dữ liệu bảng cũ
              await this.$axios.$delete(
                `/api/congnhan/${this.form_dieuchuyen._id}`
              );
              // ghi lại log điều chuyển
              // const data = {
              //   trangthai: 0,
              //   ghichu: this.form.ghichu,
              // };
              // await this.$axios.$patch(
              //   `/api/congnhan/updatetrangthaicongnhan/${this.form._id}`,
              //   data
              // );
              const dataLog = {
                logname: log,
                createdAt: this.hisform.createdAt,
                createdBy: this.hisform.createdBy,
              };
              await this.$axios.$post(`/api/congnhan/addlognhansu`, dataLog);

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
                title: "Điều chuyển công nhân thành công",
              });

              this.getDmcn();
            }
          }
        }
      }
    },

    onDelete(cn) {
      swal({
        title: "Bạn muốn xóa công nhân này?",
        text: "Sẽ không lấy lại được sau khi xóa!",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        this.$axios.$delete(`/api/congnhan/${cn._id}`).then((response) => {
          const index = this.congnhan.findIndex((p) => p._id === cn._id); // find the post index
          if (~index)
            // if the post exists in array
            this.congnhan.splice(index, 1); //delete the post
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

.table-height {
  height: 550px;
  display: block;
  overflow: scroll;
  width: 100%;
  position: sticky;
  top: 0;
}

.modal-content,
.modal-card {
  width: 720px;
}

@media (max-width: 768px) {
  .modal-card {
    width: 90%;
    max-width: 400px;
  }
}
</style>
