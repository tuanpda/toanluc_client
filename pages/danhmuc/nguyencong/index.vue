<template>
  <div class="columns">
    <div class="column container">
      <br />
      <div class="box" style="margin-left:10px; margin-right:10px;">
        <div class="columns">
          <div class="column">
            <div class="control">
              <span class="icon is-small is-left">
                <i class="fas fa-anchor"></i>
              </span>
              Danh mục nguyên công
            </div>
          </div>
        </div>

        <div class="columns">
          <div class="column is-6">
            <span>Có tất cả: </span>
            <span style="font-weight: bold">{{
              nguyencong.length | formatNumber
            }}</span>
            <span>danh mục nguyên công</span>
          </div>

          <div class="column is-4" style="text-align: right">
            <input type="text" class="input is-small" v-model="search" placeholder="Gõ tìm theo tên của sản phẩm">
          </div>
          <div class="column is-1" style="text-align: right">
            <button @click="openModel()" class="button is-success is-fullwidth is-small">
              <span class="icon is-small">
                <i class="fas fa-feather"></i>
              </span>
              <span>Thêm</span>
            </button>
          </div>
          <div class="column is-1" style="text-align: right">
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
          <table class="
                            table
                            is-bordered is-striped is-narrow is-hoverable is-fullwidth
                          ">
            <thead>
              <tr>
                <th style="text-align: center; font-size: small;">STT</th>
                <th style="text-align: center; font-size: small;">Mã PX</th>
                <th style="text-align: center; font-size: small;">Mã vật tư</th>
                <th style="text-align: center; font-size: small;">Tên vật tư</th>
                <th style="text-align: center; font-size: small;">Nhóm SP</th>
                <th style="text-align: center; font-size: small;">Nhóm lương</th>
                <th style="text-align: center; font-size: small;">Diễn giải</th>
                <th style="text-align: center; font-size: small;">Cập nhật</th>
                <th style="text-align: center; font-size: small;">Xóa</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(nc, index) in filteredItems" :key="index">
                <td style="text-align: center; font-size: small;">
                  {{ index + 1 }}
                </td>
                <td style="text-align: center; font-size: small;">
                  {{ nc.mapx }}
                </td>
                <td style="font-size: small;">
                  {{ nc.mavt }}
                </td>
                <td style="font-size: small;">
                  {{ nc.tenvt }}
                </td>
                <td style="text-align: center; font-size: small;">
                  {{ nc.nhomsp }}
                </td>
                <td style="text-align: center; font-size: small;">
                  {{ nc.nhomluong }}
                </td>
                <td style="font-size: small;">
                  {{ nc.diengiai }}
                </td>
                <td style="text-align: center; font-size: small">
                  <a @click="getDN(nc)">
                    <span style="color: green" class="icon is-small">
                      <i class="far fa-check-circle"></i>
                    </span>
                  </a>
                </td>
                <td style="text-align: center; font-size: small">
                  <a @click="onDelete(nc)">
                    <span style="color: red" class="icon is-small">
                      <i class="fas fa-times"></i>
                    </span>
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- Modal update-->
        <div class="">
          <!-- Toggle class  -->
          <div :class="{ 'is-active': isActive }" class="modal">
            <div class="modal-background"></div>
            <div class="modal-content modal-card">
              <header style="background-color: #3e8ed0; border-top-left-radius: 8px; border-top-right-radius: 8px;">
                <div class="columns">
                  <div class="column is-9">
                    <p style="font-size: small; font-weight: bold; color: white; padding: 15px;">
                      <span class="icon is-small is-left">
                        <i style="color: #ffd863ff" class="fab fa-codepen"></i>
                      </span>
                      Cập nhật thông tin nguyên công cho vật tư: {{ one_nguyencong.mavt }}
                    </p>
                  </div>
                  <div class="column" style="text-align:right;">
                    <a @click="isActive = false">
                      <span style="color: red; padding: 20px;" class="icon is-small">
                        <i class="fas fa-power-off"></i>
                      </span>
                    </a>
                  </div>
                </div>
              </header>
              <section class="modal-card-body">
                <div>
                  <div class="table_wrapper">
                    <table class="table is-responsive is-bordered is-narrow is-fullwidth">
                      <tr>
                        <td style="font-size: small;">
                          Mã phân xưởng
                        </td>
                        <td>
                          <input type="text" v-model="one_nguyencong.mapx" class="input is-small">
                        </td>
                      </tr>
                      <tr>
                        <td style="font-size: small;">
                          Mã vật tư
                        </td>
                        <td>
                          <input type="text" v-model="one_nguyencong.mavt" class="input is-small">
                        </td>
                      </tr>
                      <tr>
                        <td style="font-size: small;">
                          Tên vật tư
                        </td>
                        <td>
                          <input type="text" v-model="one_nguyencong.tenvt" class="input is-small">
                        </td>
                      </tr>
                      <tr>
                        <td style="font-size: small;">
                          Nhóm lương
                        </td>
                        <td>
                          <input type="text" v-model="one_nguyencong.nhomluong" class="input is-small is-danger">
                        </td>
                      </tr>
                      <tr>
                        <td style="font-size: small;">
                          Nhóm sản phẩm
                        </td>
                        <td>
                          <input type="text" v-model="one_nguyencong.nhomsp" class="input is-small">
                        </td>
                      </tr>
                      <tr>
                        <td colspan="2">
                          <div class="field">
                            <div class="control">
                              <textarea class="textarea is-small" v-model="one_nguyencong.diengiai"></textarea>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td colspan="2">
                          <button @click="onUpdate(one_nguyencong._id)" class="button is-success is-fullwidth is-small">
                            <span class="icon is-small">
                              <i class="fab fa-jsfiddle"></i>
                            </span>
                            <span>Cập nhật thông tin</span>
                          </button>
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>

        <!-- Modal create-->
        <div class="">
          <!-- Toggle class  -->
          <div :class="{ 'is-active': isActive_cre }" class="modal">
            <div class="modal-background"></div>
            <div class="modal-content modal-card">
              <header style="background-color: #3e8ed0; border-top-left-radius: 8px; border-top-right-radius: 8px;">
                <div class="columns">
                  <div class="column is-9">
                    <p style="font-size: small; font-weight: bold; color: white; padding: 15px;">
                      <span class="icon is-small is-left">
                        <i style="color: #ffd863ff" class="fab fa-codepen"></i>
                      </span>
                      Thêm mới nguyên công
                    </p>
                  </div>
                  <div class="column" style="text-align:right;">
                    <a @click="isActive_cre = false">
                      <span style="color: red; padding: 20px;" class="icon is-small">
                        <i class="fas fa-power-off"></i>
                      </span>
                    </a>
                  </div>
                </div>
              </header>
              <section class="modal-card-body">
                <div>
                  <div class="table_wrapper">
                    <table class="table is-responsive is-bordered is-narrow is-fullwidth">
                      <tr>
                        <td style="font-size: small;">
                          Mã phân xưởng
                        </td>
                        <td>
                          <div class="control has-icons-left">
                            <div class="select is-small is-fullwidth">
                              <select @change="getWithPX($event)">
                                <option selected>-- Chọn phân xưởng --</option>
                                <option v-for="item in phanxuong" :value="item.mapx">
                                  {{ item.mapx }} - {{ item.tenpx }}
                                </option>
                              </select>
                            </div>
                            <span class="icon is-small is-left">
                              <i style="color: #48c78e" class="fas fa-kaaba"></i>
                            </span>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td style="font-size: small;">
                          Mã vật tư
                        </td>
                        <td>
                          <input type="text" v-model="form.mavt" class="input is-small">
                        </td>
                      </tr>
                      <tr>
                        <td style="font-size: small;">
                          Tên vật tư
                        </td>
                        <td>
                          <input type="text" v-model="form.tenvt" class="input is-small">
                        </td>
                      </tr>
                      <tr>
                        <td style="font-size: small;">
                          Nhóm lương
                        </td>
                        <td>
                          <input type="text" v-model="form.nhomluong" class="input is-small is-danger">
                        </td>
                      </tr>
                      <tr>
                        <td style="font-size: small;">
                          Nhóm sản phẩm
                        </td>
                        <td>
                          <input type="text" v-model="form.nhomsp" class="input is-small">
                        </td>
                      </tr>
                      <tr>
                        <td colspan="2">
                          <div class="field">
                            <div class="control">
                              <textarea class="textarea is-small" v-model="form.diengiai"></textarea>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td colspan="2">
                          <button @click="onAddNc()" class="button is-success is-fullwidth is-small">
                            <span class="icon is-small">
                              <i class="fas fa-file-signature"></i>
                            </span>
                            <span>Thêm mới nguyên công</span>
                          </button>
                        </td>
                      </tr>
                    </table>
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

import {
  required,
  email,
  minLength,
  url,
  sameAs,
} from "vuelidate/lib/validators";
export default {
  middleware: "auth",
  data() {
    return {
      nguyencong: [],
      phanxuong: [],
      tableName: [],
      phienbanluong: "",
      createdAt: null,
      createdBy: this.$auth.$state.user.username,
      form: {
        mapx: "",
        mavt: "",
        tenvt: "",
        nhomsp: "",
        diengiai: "",
        nhomluong: ""
      },
      search: "",
      isActive: false,
      isActive_cre: false,
      one_nguyencong: {},
    };
  },

  validations: {
    form: {
      masp: {
        required,
      },
      tensp: {
        required,
      },
    },
  },

  computed: {
    filteredItems() {
      return this.nguyencong.filter(item => {
        return item.tenvt.toLowerCase().indexOf(this.search.toLowerCase()) > -1
      })
    }
  },

  watch: {
    filteredItems(newVal, oldVal) {
      // Perform any necessary updates here
    },
    nguyencong(newVal, oldVal) {

    },
  },

  mounted() {
    this.getNguyencong();
    this.currentDateTime();
    this.getPhanxuong()
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
      this.createdAt = date + " " + time;
      this.form.createdAt = date + " " + time;
    },

    async getPhanxuong() {
      this.phanxuong = await this.$axios.$get(`/api/phongban/allphanxuong`);
    },

    async getWithPX(e) {
      var name = e.target.options[e.target.options.selectedIndex].text;
      // console.log(name)
      let position = name.split("-");
      let p1 = position[0].trim();
      // console.log(p1)
      if (p1 == 'AL_PXD' || p1 == 'DV_PXD' || p1 == 'PXD') {
        this.form.mapx = 'PXD';
        // alert('PXD')
      } else {
        this.form.mapx = p1
      }
    },

    async getNguyencong() {
      this.nguyencong = await this.$axios.$get(
        `/api/nguyencong/getallnguyencong`
      );
      if (this.nguyencong.length <= 0) {
        this.$toasted.show("Danh mục nguyên công rỗng", {
          duration: 3000,
          theme: "bubble",
        });
      }
    },

    async getDN(nguyencong) {
      this.isActive = true;
      this.one_nguyencong = nguyencong
      // console.log(this.one_nguyencong)
    },

    openModel() {
      this.isActive_cre = true
    },

    async onUpdate() {
      try {
        this.$axios.$patch(
          `/api/nguyencong/nc/${id}`,
          this.one_nguyencong,
          {}
        );
        this.nguyencong = await this.$axios.$get(
          `/api/nguyencong/getallnguyencong`
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
          title: "Cập nhật thông tin thành công",
        });

        this.isActive = false;
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

    async onAddNc() {
      try {
        this.$axios.$post("/api/nguyencong/addnguyencong", this.form);
        this.nguyencong = await this.$axios.$get(
          `/api/nguyencong/getallnguyencong`
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
          title: "Thêm mới thành công",
        });

        this.isActive_cre = false
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

    onDelete(nc) {
      swal({
        title: "Bạn muốn xóa nguyên công này?",
        text: "Không lấy lại được sau khi xóa!",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          // xóa công đoạn khỏi bảng
          this.$axios.$delete(`/api/nguyencong/${nc._id}`)
            .then(response => {
              const index = this.nguyencong.findIndex(n => n._id === nc._id)
              if (~index) // if the post exists in array
                this.nguyencong.splice(index, 1) //delete the post
            });
        } else {
          swal("Bạn đã hủy xóa");
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
  height: 350px;
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
  width: 620px;
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
