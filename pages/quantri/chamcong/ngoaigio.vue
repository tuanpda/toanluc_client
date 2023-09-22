<template>
  <div class="columns">
    <div class="column container">
      <br />
      <div class="box" style="margin-left: 50px; margin-right: 50px">
        <div class="columns">
          <div class="column">
            <div class="control">
              <span class="icon is-small is-left">
                <i style="color: #00d1b2" class="far fa-clock"></i>
              </span>
              <span style="color: #3850b7; font-size: 17px; font-weight: bold"
                >Chấm công ngoài giờ</span
              >
            </div>
          </div>
        </div>

        <div class="columns">
          <div class="column is-8">
            <span>Tổng: </span>
            <span style="font-weight: bold">{{ ngoaigio.length }}</span>
            <span>row data</span>
          </div>
          <div class="column" style="text-align: right">
            <a
              href="/quantri/chamcong/importngoaig"
              class="button is-danger is-fullwidth is-small"
            >
              <span class="icon is-small">
                <i class="far fa-clock"></i>
              </span>
              <span>Import</span>
            </a>
          </div>
          <div class="column" style="text-align: right">
            <button
              @click="isActive = true"
              class="button is-success is-fullwidth is-small"
            >
              <span class="icon is-small">
                <i class="fas fa-pen-fancy"></i>
              </span>
              <span>Thêm</span>
            </button>
          </div>
          <div class="column" style="text-align: right">
            <button class="button is-info is-fullwidth is-small">
              <span class="icon is-small">
                <i class="fas fa-angle-double-left"></i>
              </span>
              <span>Thoát</span>
            </button>
          </div>
        </div>
        <div class="table_wrapper">
          <table
            class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth"
          >
            <thead>
              <tr style="background-color: #fffaeb">
                <th style="text-align: center; font-size: smaller; width: 3%">
                  STT
                </th>
                <th style="text-align: center; font-size: smaller; width: 20%">
                  Tên nhân viên
                </th>
                <th style="text-align: center; font-size: smaller; width: 10%">
                  Mức tiền
                </th>
                <th style="text-align: center; font-size: smaller; width: 7%">
                  Số giờ
                </th>
                <th style="text-align: center; font-size: smaller; width: 8%">
                  Ngày làm
                </th>
                <th style="text-align: center; font-size: smaller">Ghi chú</th>
                <th style="text-align: center; font-size: smaller; width: 5%">
                  Sửa
                </th>
                <th style="text-align: center; font-size: smaller; width: 5%">
                  Xóa
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in ngoaigio" :key="index">
                <td style="text-align: center; font-size: smaller">
                  {{ index + 1 }}
                </td>
                <td style="font-size: smaller">
                  {{ item.tennv }}
                </td>
                <td style="font-size: smaller; text-align: center">
                  {{ item.muctien | formatNumber }}
                </td>
                <td style="font-size: smaller; text-align: center">
                  {{ item.sogio }}
                </td>
                <td style="font-size: smaller; text-align: center">
                  {{ item.ngaylam | formatDate }}
                </td>
                <td style="font-size: smaller; text-align: center">
                  {{ item.ghichu }}
                </td>
                <td style="text-align: center; color: green">
                  <a @click="onUpdate(item)"
                    ><span>
                      <i
                        style="color: green"
                        class="fa fa-check-circle"
                      ></i> </span
                  ></a>
                </td>
                <td style="text-align: center">
                  <a @click="onDelete(item)">
                    <span style="color: red" class="icon is-small">
                      <i class="fas fa-times"></i>
                    </span>
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Modal Add nhân viên -->
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
                      <span class="icon is-small is-left">
                        <i
                          style="color: #ffd863ff"
                          class="fas fa-feather-alt"
                        ></i>
                      </span>
                      Thêm ngoài giờ
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
                  class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth"
                >
                  <tr>
                    <td style="font-size: small; font-weight: bold">
                      Phòng ban
                    </td>
                    <td>
                      <div class="select is-small is-fullwidth">
                        <select @change="getWithKhoi($event)">
                          <option selected>-- Xem theo khối --</option>
                          <option v-for="item in khoivp" :value="item.makhoi">
                            {{ item.makhoi }} -- {{ item.tenkhoi }}
                          </option>
                        </select>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style="font-size: small; font-weight: bold">
                      Nhân viên
                    </td>
                    <td>
                      <div class="select is-small is-fullwidth">
                        <select @change="getNhanvien($event)">
                          <option selected>-- Tên nhân viên --</option>
                          <option v-for="item in nhanvien" :value="item.manv">
                            {{ item.manv }} -- {{ item.tennv }}
                          </option>
                        </select>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style="font-size: small; font-weight: bold">
                      Định mức
                    </td>
                    <td>
                      <!-- <div class="select is-small is-fullwidth">
                        <select @change="getDinhmuc($event)">
                          <option selected>-- Định mức --</option>
                          <option
                            v-for="item in dinhmucngoaigio"
                            :value="item.muctien"
                          >
                            {{ item.noidung }} -- {{ item.muctien }}
                          </option>
                        </select>
                      </div> -->
                      <input
                        class="input is-small"
                        type="number"
                        v-model="form.muctien"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td style="font-size: small; font-weight: bold">
                      Số giờ làm
                    </td>
                    <td>
                      <input
                        v-model="form.sogio"
                        type="number"
                        class="input is-small"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td style="font-size: small; font-weight: bold">
                      Ngày chấm
                    </td>
                    <td>
                      <input
                        v-model="form.ngaylam"
                        type="date"
                        class="input is-small"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td style="font-size: small; font-weight: bold">Ghi chú</td>
                    <td>
                      <input
                        v-model="form.ghichu"
                        type="text"
                        class="input is-small"
                      />
                    </td>
                  </tr>
                </table>
                <div style="text-align: right">
                  <button @click="onAdd" class="button is-small is-success">
                    Thêm mới
                  </button>
                  <button
                    @click="isActive = false"
                    class="button is-small is-danger"
                  >
                    Hủy bỏ
                  </button>
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
export default {
  middleware: "auth-luong",
  data() {
    return {
      ngoaigio: [],
      nhanvien: [],
      dinhmucngoaigio: [],
      form: {
        mapb: "",
        tenpb: "",
        manv: "",
        tennv: "",
        muctien: "",
        sogio: "",
        ngaylam: "",
        ghichu: "",
        createdAt: null,
        createdBy: this.$auth.$state.user.username,
      },
      makhoi: "",
      tenkhoi: "",
      // Modals
      isActive: false,
      khoivp: [
        { makhoi: "VPBP", tenkhoi: "Văn phòng bộ phận" },
        { makhoi: "VPGT1", tenkhoi: "Văn phòng gián tiếp 1" },
        { makhoi: "VPGT2", tenkhoi: "Văn phòng gián tiếp 2" },
      ],
    };
  },

  mounted() {
    this.dinhmucng();
    // this.allnhanvien();
    this.getNgoaigio();
    this.currentDateTime();
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

    // chấm công ngoài giờ
    async getNgoaigio() {
      this.ngoaigio = await this.$axios.$get(`/api/ketoan/getallngoaigio`);
    },

    // async allnhanvien() {
    //   const res = await this.$axios.get("/api/nhanvien/");
    //   this.nhanvien = res.data;
    // },

    // định mức ngoài giờ
    async dinhmucng() {
      this.dinhmucngoaigio = await this.$axios.$get(
        `/api/ketoan/getdanhmucngoaigio`
      );
    },

    async getWithKhoi(e) {
      this.form.makhoi = "";
      this.form.tenkhoi = "";
      // console.log(this.mapx)
      var name = e.target.options[e.target.options.selectedIndex].text;
      // console.log(name)
      let position = name.split("--");
      let p1 = position[0].trim();
      let p2 = position[1].trim();
      this.form.mapb = p1;
      this.form.tenpb = p2;

      this.nhanvien = await this.$axios.$get(
        `/api/nhanvien/statusnhanvien1withmakhoi?makhoi=${this.form.mapb}`
      );
      // console.log(this.nhanvien);
    },

    async getNhanvien(e) {
      this.form.manv = "";
      this.form.tennv = "";
      var name = e.target.options[e.target.options.selectedIndex].text;
      // console.log(name)
      let position = name.split("--");
      let p1 = position[0].trim();
      let p2 = position[1].trim();
      // console.log(p1, p2);
      this.form.manv = p1;
      this.form.tennv = p2;
    },

    async getDinhmuc(e) {
      this.form.muctien = "";
      var name = e.target.options[e.target.options.selectedIndex].text;
      // console.log(name)
      let position = name.split("--");
      let p1 = position[0].trim();
      let p2 = position[1].trim();
      // console.log(p1, p2);
      this.form.muctien = p2;
    },

    async onAdd() {
      //   console.log(this.form);
      const response = await this.$axios.$post(
        `/api/ketoan/addchamcongngoaigio`,
        this.form
      );
      // console.log(response);
      if (response.success == true) {
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
          title: "Thêm thành công",
        });

        this.getNgoaigio();
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
    },

    async onUpdate(item) {
      const upData = {
        anca: item.anca,
        tienan: item.tienan,
        ghichu: item.ghichu,
      };
      const response = await this.$axios.$patch(
        `/api/ketoan/anca/${item._id}`,
        upData
      );
      // console.log(response);
      if (response.success == true) {
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
          title: "Cập nhật thành công",
        });

        this.getNgoaigio();
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
    },

    async onDelete(ac) {
      swal({
        title: "Bạn muốn xóa?",
        text: "Thông tin sẽ không lấy lại được sau khi xóa!",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          this.$axios
            .$delete(`/api/ketoan/chamngoaigio/${ac._id}`)
            .then((response) => {
              const index = this.ngoaigio.findIndex((p) => p._id === ac._id); // find the post index
              if (~index)
                // if the post exists in array
                this.ngoaigio.splice(index, 1); //delete the post
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
        } else {
          swal("Bạn đã hủy xóa phòng ban");
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

.table-height {
  height: 750px;
  display: block;
  overflow: scroll;
  width: 100%;
  position: sticky;
  top: 0;
}

th {
  text-align: left;
  background: #feecf0;
  position: sticky;
  top: 0px;
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
  max-width: 90px;
  max-height: 90px;
}
</style>
