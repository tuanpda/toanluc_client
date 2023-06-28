<template>
  <div class="columns">
    <div class="column container">
      <br />
      <div class="box">
        <div class="columns">
          <div class="column">
            <div class="control">
              <span class="icon is-small is-left">
                <i style="color: #00d1b2" class="fab fa-drupal"></i>
              </span>
              <span style="color: #3850b7; font-size: 17px; font-weight: bold"
                >Chức vụ - Lương mềm công nhân</span
              >
            </div>
          </div>
        </div>

        <div class="columns">
          <div class="column is-10">
            <span>Có tất cả: </span>
            <span style="font-weight: bold">{{
              congnhan.length | formatNumber
            }}</span>
            <span>công nhân</span>
          </div>
          <!-- <div class="column" style="text-align: right">
            <button
              @click="isActive = true"
              class="button is-success is-fullwidth is-small"
            >
              <span class="icon is-small">
                <i class="fas fa-pen-fancy"></i>
              </span>
              <span>Thêm công nhân</span>
            </button>
          </div> -->
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
        <div class="columns">
          <div class="column" style="text-align: right">
            <div class="control has-icons-left">
              <div class="select is-small">
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
              <div class="select is-small">
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
        <div class="table_wrapper table-height">
          <table
            class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth"
          >
            <thead>
              <tr style="background-color: #fffaeb">
                <td
                  style="text-align: right; font-size: small; font-weight: bold"
                  colspan="12"
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
                <!-- <th style="text-align: center; font-size: small">Xóa</th> -->
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
                <!-- <th style="text-align: center; font-size: small">
                  Tên phân xưởng
                </th> -->
                <th style="text-align: center; font-size: small; width: 15%">
                  Chức vụ
                </th>
                <th style="text-align: center; font-size: small; width: 10%">
                  Lương mềm
                </th>
                <th style="text-align: center; font-size: small; width: 10%">
                  Lương cơ bản
                </th>
                <th style="text-align: center; font-size: small; width: 10%">
                  Ăn lương QLSP
                </th>
                <th style="text-align: center; font-size: small">Cập nhật</th>
                <th style="text-align: center; font-size: small">Trạng thái</th>
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
                </td> -->
                <!-- <td style="text-align: center">
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
                <!-- <td style="font-size: small">{{ px.tenpx }}</td> -->
                <td style="font-size: small">
                  <div class="select is-small is-fullwidth">
                    <select @change="getMachucvu($event)" v-model="px.chucvu">
                      <option
                        v-for="(item, index) in chucvu"
                        :value="item.chucvu"
                      >
                        {{ item.chucvu }} -- {{ item.macv }}
                      </option>
                    </select>
                  </div>
                </td>
                <td style="font-size: small">
                  <input
                    type="text"
                    class="input is-small"
                    v-model="px.luongmem"
                  />
                </td>
                <td style="font-size: small">
                  <input
                    type="text"
                    class="input is-small"
                    v-model="px.luongcb"
                  />
                </td>
                <td style="font-size: small; text-align: center">
                  <label class="checkbox">
                    <input v-model="px.anluongqlsp" type="checkbox" />
                  </label>
                </td>
                <td style="text-align: center; color: green">
                  <a @click="onUpdate(px)">
                    <span class="icon is-small">
                      <i class="far fa-check-circle"></i>
                    </span>
                  </a>
                </td>
                <td style="font-size: small; text-align: center">
                  <template v-if="px.trangthai == 1">
                    <span style="color: green; font-weight: 900">Đang làm</span>
                  </template>
                  <template v-else>
                    <span style="color: #f96854; font-weight: 900"
                      >Đã nghỉ</span
                    >
                  </template>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
export default {
  middleware: "auth",
  data() {
    return {
      congnhan: [],
      chucvu: [],
      phanxuong: [],
      tonhom: [],
      tonhomid: [],
      // Modals
      isActive: false,
      form: {
        chucvu: "",
        machucvu: "",
      },
    };
  },

  mounted() {
    this.getDmcn();
    this.currentDateTime();
    this.getPhanxuong();
    this.getDmcv();
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
    },

    async getDmcn() {
      this.congnhan = await this.$axios.$get(
        `/api/congnhan/allcongnhan2trangthai`
      );
      if (this.congnhan.length <= 0) {
        this.$toasted.show("Danh mục công nhân rỗng", {
          duration: 3000,
          theme: "bubble",
        });
      }
    },

    async getDmcv() {
      this.chucvu = await this.$axios.$get(`/api/chucvu/allchucvu`);
      if (this.chucvu.length <= 0) {
        this.$toasted.show("Danh mục chức vụ rỗng", {
          duration: 3000,
          theme: "bubble",
        });
      }
    },

    async getPhanxuong() {
      this.phanxuong = await this.$axios.$get(`/api/phongban/allphanxuong`);
    },

    async showmapx(e) {
      // console.log(this.mapx)
      var name = e.target.options[e.target.options.selectedIndex].text;
      // console.log(name)
      let position = name.split("--");
      this.form.mapx = position[0].trim();
      this.form.tenpx = position[1].trim();
      this.tonhom = await this.$axios.$get(
        `/api/phongban/alltoinxuong?mapx=${this.form.mapx}`
      );
      this.ischoosePx = true;
      if (this.tonhom.length <= 0) {
        this.form.mato = "";
        this.form.tento = "";
      }
    },

    async showmato(e) {
      // console.log(this.mapx)
      var name = e.target.options[e.target.options.selectedIndex].text;
      // console.log(name)
      let position = name.split("--");
      this.form.mato = position[0].trim();
      this.form.tento = position[1].trim();
      this.ischooseTo = true;
    },

    async getWithPX(e) {
      // console.log(this.mapx)
      var name = e.target.options[e.target.options.selectedIndex].text;
      // console.log(name)
      let position = name.split("--");
      let p1 = position[0].trim();
      this.congnhan = await this.$axios.$get(
        `/api/congnhan/allcongnhanpx2trangthai?mapx=${p1}`
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
        `/api/congnhan/allcongnhanto2trangthai?mato=${p1}`
      );
    },

    async getMachucvu(e) {
      var name = e.target.options[e.target.options.selectedIndex].text;
      // console.log(name)
      let position = name.split("--");
      let p1 = position[0].trim();
      let p2 = position[1].trim();
      this.form.chucvu = p1;
      this.form.machucvu = p2;
      // this.machucvu = p2;
      // console.log(this.form.chucvu, this.form.machucvu);
    },

    async onUpdate(congnhan) {
      // console.log(congnhan.luongmem);
      // console.log(this.form.chucvu, this.form.machucvu);
      // console.log(congnhan.anluongqlsp);
      let data_update;
      if (this.form.chucvu == "" || this.form.machucvu == "") {
        data_update = {
          chucvu: congnhan.chucvu,
          machucvu: congnhan.machucvu,
          luongmem: congnhan.luongmem,
          luongcb: congnhan.luongcb,
          anluongqlsp: congnhan.anluongqlsp,
        };
      } else {
        data_update = {
          chucvu: this.form.chucvu,
          machucvu: this.form.machucvu,
          luongmem: congnhan.luongmem,
          luongcb: congnhan.luongcb,
          anluongqlsp: congnhan.anluongqlsp,
        };
      }
      const response = await this.$axios.$patch(
        `/api/congnhan/chucvuluongmem/${congnhan._id}`,
        data_update
      );
      // console.log(response);
      if (response.success == true) {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 1000,
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
          title: "Có lỗi xảy ra",
        });
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
  width: 920px;
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
