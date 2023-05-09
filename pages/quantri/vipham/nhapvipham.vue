<template>
  <div class="columns is-mobile">
    <div class="column is-6 is-offset-3">
      <div class="box" style="margin-top: 10px">
        <div
          style="
            background-color: aliceblue;
            border: 1px solid green;
            padding: 15px;
          "
        >
          <div style="text-align: center; margin-top: 10px">
            <span style="font-size: large; font-weight: bold"
              >HỒ SƠ XỬ LÝ VI PHẠM KỶ LUẬT CÔNG TY</span
            >
          </div>
          <div class="columns" style="margin-top: 3px">
            <div class="column is-5"></div>
            <div class="column">
              <input
                v-model="form.ngayxuphat"
                type="date"
                class="input is-small is-danger"
              />
            </div>
            <div class="column is-5"></div>
          </div>

          <table class="table is-responsive is-fullwidth is-borderless">
            <tr>
              <td
                style="
                  width: 20%;
                  font-size: small;
                  font-weight: bold;
                  vertical-align: middle;
                  text-align: right;
                "
              >
                Số quyết định
              </td>
              <td>
                <input
                  v-model="form.soqd"
                  type="text"
                  class="input is-small"
                  style="width: 41.5%"
                />
              </td>
            </tr>
            <tr>
              <td
                style="
                  width: 20%;
                  font-size: small;
                  font-weight: bold;
                  vertical-align: middle;
                  text-align: right;
                "
              >
                Phân xưởng
              </td>
              <td>
                <div class="select is-small">
                  <select @change="getPhanxuong($event)">
                    <option selected>-- Chọn phân xưởng --</option>
                    <option v-for="item in phanxuong" :value="item.mapx">
                      {{ item.mapx }} -- {{ item.tenpx }}
                    </option>
                  </select>
                </div>
              </td>
            </tr>
            <tr>
              <td
                style="
                  width: 20%;
                  font-size: small;
                  font-weight: bold;
                  vertical-align: middle;
                  text-align: right;
                "
              >
                Tổ nhóm
              </td>
              <td>
                <div class="select is-small">
                  <select @change="getTo($event)">
                    <option selected>-- Chọn tổ --</option>
                    <option v-for="item in tonhomid" :value="item.mato">
                      {{ item.mato }} -- {{ item.tento }}
                    </option>
                  </select>
                </div>
              </td>
            </tr>
            <tr>
              <td
                style="
                  width: 20%;
                  font-size: small;
                  font-weight: bold;
                  vertical-align: middle;
                  text-align: right;
                "
              >
                Công nhân
              </td>
              <td>
                <div class="select is-small">
                  <select @change="getCongnhan($event)">
                    <option selected>-- Công nhân --</option>
                    <option v-for="item in cong_nhan" :value="item">
                      {{ item.macn }} -- {{ item.tencn }}
                    </option>
                  </select>
                </div>
              </td>
            </tr>
            <tr>
              <td
                style="
                  width: 20%;
                  font-size: small;
                  font-weight: bold;
                  text-align: right;
                "
              >
                Nội dung vi phạm
              </td>
              <td>
                <textarea
                  v-model="form.noidung"
                  class="textarea is-small"
                  placeholder="Gõ nội dung vi phạm"
                ></textarea>
              </td>
            </tr>
            <tr>
              <td
                style="
                  width: 20%;
                  font-size: small;
                  font-weight: bold;
                  vertical-align: middle;
                  text-align: right;
                "
              >
                Loại vi phạm
              </td>
              <td>
                <div class="select is-small">
                  <select @click="loaiVipham($event)">
                    <option selected>-- Loại vi phạm --</option>
                    <option v-for="item in loaivipham" :value="item.maloai">
                      {{ item.maloai }} -- {{ item.tenloai }}
                    </option>
                  </select>
                </div>
              </td>
            </tr>
            <tr>
              <td
                style="
                  width: 20%;
                  font-size: small;
                  font-weight: bold;
                  vertical-align: middle;
                  text-align: right;
                "
              >
                Mức độ vi phạm
              </td>
              <td>
                <div class="select is-small">
                  <select @click="mucdoVipham($event)">
                    <option selected>-- Mức độ vi phạm --</option>
                    <option v-for="item in mucdovipham" :value="item.maloai">
                      {{ item.maloai }} -- {{ item.mdvp }}
                    </option>
                  </select>
                </div>
              </td>
            </tr>
            <tr>
              <td
                style="
                  width: 20%;
                  font-size: small;
                  font-weight: bold;
                  vertical-align: middle;
                  text-align: right;
                "
              >
                Mức độ kỷ luật
              </td>
              <td>
                <div class="select is-small">
                  <select @click="mucdoKyluat($event)">
                    <option selected>-- Mức độ kỷ luật --</option>
                    <option v-for="item in mucdokyluat" :value="item.maloai">
                      {{ item.maloai }} -- {{ item.mdkl }}
                    </option>
                  </select>
                </div>
              </td>
            </tr>
            <tr>
              <td
                style="
                  width: 20%;
                  font-size: small;
                  font-weight: bold;
                  vertical-align: middle;
                  text-align: right;
                "
              >
                Người kiểm tra
              </td>
              <td>
                <input
                  v-model="form.nguoikiemtra"
                  type="text"
                  class="input is-small"
                  style="width: 41.5%"
                />
              </td>
            </tr>
            <tr>
              <td
                style="
                  width: 20%;
                  font-size: small;
                  font-weight: bold;
                  text-align: right;
                "
              >
                Ghi chú
              </td>
              <td>
                <textarea
                  v-model="form.ghichu"
                  class="textarea is-small"
                  placeholder="ghi chú ..."
                ></textarea>
              </td>
            </tr>
          </table>

          <div
            style="margin-top: 30px; display: flex; justify-content: flex-end"
          >
            <div class="field is-grouped">
              <div class="control">
                <button @click="lapBienban" class="button is-small is-success">
                  Lập biên bản
                </button>
              </div>
              <div class="control">
                <button class="button is-small is-warning">Hủy bỏ</button>
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
import moment from "moment";
export default {
  middleware: "auth",
  data() {
    return {
      phanxuong: [],
      cong_nhan: [],
      tonhomid: [],
      nhanvien: [],
      loaivipham: [
        { maloai: "AT", tenloai: "An toàn" },
        { maloai: "SX", tenloai: "Sản xuất" },
        { maloai: "5S", tenloai: "Sắp xếp, vệ sinh" },
        { maloai: "TG", tenloai: "Thời gian" },
        { maloai: "NQ", tenloai: "Nội quy" },
      ],
      mucdovipham: [
        { maloai: "1", mdvp: "Nhẹ" },
        { maloai: "2", mdvp: "Vừa" },
        { maloai: "3", mdvp: "Lớn" },
        { maloai: "4", mdvp: "Nghiêm trọng" },
      ],
      mucdokyluat: [
        { maloai: "1", mdkl: "Nhắc nhở" },
        { maloai: "2", mdkl: "Văn bản mức 1" },
        { maloai: "3", mdkl: "Văn bản mức 2" },
        { maloai: "4", mdkl: "Thôi việc" },
      ],
      form: {
        ngayxuphat: "",
        soqd: "",
        mapx: "",
        tenpx: "",
        mato: "",
        tento: "",
        macn: "",
        tencn: "",
        chucvu: "",
        sdt: "",
        diachi: "",
        cccd: "",
        noidung: "",
        maloaivp: "",
        loaivp: "",
        mamucdovp: "",
        mucdovp: "",
        mamucdokl: "",
        mucdokl: "",
        nguoikiemtra: "",
        ghichu: "",
        createdAt: "",
        createdBy: this.$auth.$state.user.username,
      },
    };
  },

  mounted() {
    this.get_phanxuong();
    this.currentDateTime();
  },

  computed: {},

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

    async get_phanxuong() {
      this.phanxuong = await this.$axios.$get(`/api/phongban/allphanxuong`);
    },

    async getPhanxuong(e) {
      var name = e.target.options[e.target.options.selectedIndex].text;
      let position = name.split("--");
      const mapx = position[0];
      const tenpx = position[1];
      this.tonhomid = await this.$axios.$get(
        `/api/phongban/alltoinxuong?mapx=${mapx}`
      );
      if (this.tonhomid.length <= 0) {
        this.cong_nhan = await this.$axios.$get(
          `/api/congnhan/allcongnhanpx?mapx=${mapx}`
        );
        this.form.mapx = mapx;
        this.form.tenpx = tenpx;
      } else {
        this.form.mapx = mapx;
        this.form.tenpx = tenpx;
      }
    },

    async getTo(e) {
      var name = e.target.options[e.target.options.selectedIndex].text;
      let position = name.split("--");
      const mato = position[0];
      const tento = position[1];
      this.cong_nhan = await this.$axios.$get(
        `/api/congnhan/allcongnhanto?mato=${mato}`
      );
      this.form.mato = mato;
      this.form.tento = tento;
    },

    async getCongnhan(e) {
      var name = e.target.options[e.target.options.selectedIndex].text;
      let position = name.split("--");
      const macn = position[0].trim();
      const tencn = position[1].trim();
      // console.log(macn);
      const selectedCongNhan = this.cong_nhan.find(
        (item) => item.macn === macn
      );
      this.form.macn = macn;
      this.form.tencn = tencn;
      this.form.chucvu = selectedCongNhan.chucvu;
      this.form.sdt = selectedCongNhan.sdt;
      this.form.diachi = selectedCongNhan.diachi;
      this.form.cccd = selectedCongNhan.cccd;
      // console.log(this.form);
    },

    async loaiVipham(e) {
      var name = e.target.options[e.target.options.selectedIndex].text;
      let position = name.split("--");
      const maloaivp = position[0].trim();
      const loaivp = position[1].trim();
      this.form.maloaivp = maloaivp;
      this.form.loaivp = loaivp;
    },

    async mucdoVipham(e) {
      var name = e.target.options[e.target.options.selectedIndex].text;
      let position = name.split("--");
      const mamucdovp = position[0].trim();
      const mucdovp = position[1].trim();
      this.form.mamucdovp = mamucdovp;
      this.form.mucdovp = mucdovp;
    },

    async mucdoKyluat(e) {
      var name = e.target.options[e.target.options.selectedIndex].text;
      let position = name.split("--");
      const mamucdokl = position[0].trim();
      const mucdokl = position[1].trim();
      this.form.mamucdokl = mamucdokl;
      this.form.mucdokl = mucdokl;
    },

    async lapBienban() {
      // console.log(this.form);
      const result = await Swal.fire({
        title: `Xác nhận Lập biên bản?`,
        showDenyButton: true,
        confirmButtonText: "Có, Xác nhận",
        denyButtonText: `Hủy xác nhận`,
      });
      if (result.isConfirmed) {
        try {
          if (
            this.form.ngayxuphat == "" ||
            this.form.soqd == "" ||
            this.form.mapx == "" ||
            this.form.tenpx == "" ||
            this.form.macn == "" ||
            this.form.tencn == "" ||
            this.form.chucvu == "" ||
            this.form.sdt == "" ||
            this.form.diachi == "" ||
            this.form.cccd == "" ||
            this.form.noidung == "" ||
            this.form.maloaivp == "" ||
            this.form.loaivp == "" ||
            this.form.mamucdovp == "" ||
            this.form.mucdovp == "" ||
            this.form.mamucdokl == "" ||
            this.form.mucdokl == "" ||
            this.form.nguoikiemtra == ""
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
              title: "Yêu cầu nhập đủ thông tin",
            });
            return;
          } else {
            const reponse = await this.$axios.$post(
              `/api/congnhan/lapbienbanvipham`,
              this.form
            );
            // console.log(reponse);
            if (reponse.success == true) {
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
                title: "Đã lập biên bản vi phạm",
              });
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
                title: "Có lỗi xảy ra !!!",
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
    },
  },
};
</script>

<style scoped></style>
