<template>
  <div class="columns">
    <div class="column container">
      <br />
      <div class="box" style="margin-left: 3px; margin-right: 3px">
        <div class="columns">
          <div class="column">
            <div class="control">
              <span class="icon is-small is-left">
                <i style="color: #00d1b2" class="fab fa-slack-hash"></i>
              </span>
              <span style="color: #3850b7; font-size: 15px; font-weight: bold"
                >Danh mục đơn giá công</span
              >
            </div>
          </div>
        </div>

        <div class="columns">
          <div class="column is-6">
            <span>Có tất cả: </span>
            <span style="font-weight: bold">{{
              dongiacong.length | formatNumber
            }}</span>
            <span>danh mục đơn giá công</span>
          </div>

          <div class="column is-4" style="text-align: right">
            <input
              type="text"
              class="input is-small"
              v-model="search"
              placeholder="Gõ tìm theo nhóm lương"
            />
          </div>
          <div class="column" style="text-align: right">
            <button
              @click="openModel()"
              class="button is-success is-fullwidth is-small"
            >
              <span class="icon is-small">
                <i class="fas fa-feather"></i>
              </span>
              <span>Thêm</span>
            </button>
          </div>
        </div>
        <div class="columns">
          <div class="column">
            <div class="control has-icons-left">
              <div class="select is-small is-fullwidth">
                <select @change="showDmnc($event)">
                  <option selected>-- Xem theo phân xưởng --</option>
                  <option v-for="item in phanxuong" :value="item.mapx">
                    {{ item.mapx }} -- {{ item.tenpx }}
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div style="margin-bottom: 3px; text-align: right">
          <vue-excel-xlsx
            :data="dongiacong"
            :columns="columns"
            :file-name="'Danh_muc_don_gia_cong'"
            :file-type="'xlsx'"
            :sheet-name="'Danh mục đơn giá công'"
          >
            Download Excel
          </vue-excel-xlsx>
        </div>
        <div class="table_wrapper table-height">
          <table
            class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth"
          >
            <thead>
              <tr>
                <th style="text-align: center; font-size: small">STT</th>
                <th style="text-align: center; font-size: small">Mã PX</th>
                <th style="text-align: center; font-size: small">Công đoạn</th>
                <th style="text-align: center; font-size: small">KHSP</th>
                <th style="text-align: center; font-size: small">Đơn giá</th>
                <th style="text-align: center; font-size: small">Ghi chú</th>
                <th style="text-align: center; font-size: small">Cập nhật</th>
                <th style="text-align: center; font-size: small">Xóa</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(nc, index) in filteredItems" :key="index">
                <td style="text-align: center; font-size: small">
                  {{ index + 1 }}
                </td>
                <td style="text-align: center; font-size: small">
                  {{ nc.PX }}
                </td>
                <td style="font-size: small">
                  {{ nc.congdoan }}
                </td>
                <td style="font-size: small">
                  {{ nc.khsp }}
                </td>
                <td style="text-align: right; font-size: small">
                  {{ nc.dongia | formatNumber }}
                </td>
                <td style="font-size: small">
                  {{ nc.ghichu }}
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
                        <i style="color: #ffd863ff" class="fab fa-codepen"></i>
                      </span>
                      Cập nhật đơn giá công
                    </p>
                  </div>
                </div>
              </header>
              <section class="modal-card-body">
                <div class="columns">
                  <div class="column">
                    <div class="field">
                      <label class="label">Phân xưởng</label>
                      <div class="control">
                        <input
                          type="text"
                          v-model="one_dongiacong.PX"
                          class="input is-small"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="column">
                    <div class="field">
                      <label class="label">Công đoạn</label>
                      <div class="control">
                        <input
                          type="text"
                          v-model="one_dongiacong.congdoan"
                          class="input is-small"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div class="columns">
                  <div class="column">
                    <div class="field">
                      <label class="label">KHSP</label>
                      <div class="control">
                        <input
                          type="text"
                          v-model="one_dongiacong.khsp"
                          class="input is-small"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="column">
                    <div class="field">
                      <label class="label">Đơn giá</label>
                      <div class="control">
                        <input
                          type="text"
                          v-model="one_dongiacong.dongia"
                          class="input is-small"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="columns">
                  <div class="column">
                    <div class="field">
                      <div class="control">
                        <textarea
                          class="textarea is-small"
                          v-model="one_dongiacong.ghichu"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="columns">
                  <div class="column">
                    <button
                      @click="onUpdate(one_dongiacong._id)"
                      class="button is-success is-fullwidth is-small"
                    >
                      <span>Cập nhật thông tin</span>
                    </button>
                  </div>
                  <div class="column">
                    <button
                      @click="isActive = false"
                      class="button is-danger is-fullwidth is-small"
                    >
                      <span>Hủy bỏ</span>
                    </button>
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
                        <i style="color: #ffd863ff" class="fab fa-codepen"></i>
                      </span>
                      Thêm mới đơn giá công
                    </p>
                  </div>
                </div>
              </header>
              <section class="modal-card-body">
                <div>
                  <div class="columns">
                    <div class="column">
                      <div class="field">
                        <label class="label">Phân xưởng</label>
                        <div class="control has-icons-left">
                          <div class="select is-small is-fullwidth">
                            <select @change="getWithPX($event)">
                              <option selected>-- Chọn phân xưởng --</option>
                              <option
                                v-for="item in phanxuong"
                                :value="item.mapx"
                              >
                                {{ item.mapx }} - {{ item.tenpx }}
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
                        <label class="label">Công đoạn</label>
                        <input
                          type="text"
                          v-model="form.congdoan"
                          class="input is-small"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="columns">
                    <div class="column">
                      <div class="field">
                        <label class="label">KHSP</label>
                        <input
                          type="text"
                          v-model="form.khsp"
                          class="input is-small"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="columns">
                    <div class="column">
                      <div class="field">
                        <label class="label">Đơn giá</label>
                        <input
                          type="text"
                          v-model="form.dongia"
                          class="input is-small"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="columns">
                    <div class="column">
                      <div class="field">
                        <div class="control">
                          <textarea
                            class="textarea is-small"
                            v-model="form.ghichu"
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="columns">
                    <div class="column">
                      <button
                        @click="onAddNc()"
                        class="button is-success is-fullwidth is-small"
                      >
                        <span class="icon is-small">
                          <i class="fas fa-file-signature"></i>
                        </span>
                        <span>Thêm mới</span>
                      </button>
                    </div>
                    <div class="column">
                      <button
                        @click="isActive_cre = false"
                        class="button is-danger is-fullwidth is-small"
                      >
                        <span>Hủy bỏ</span>
                      </button>
                    </div>
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
      dongiacong: [],
      phanxuong: [],
      tableName: [],
      phienbanluong: "",
      createdAt: null,
      createdBy: this.$auth.$state.user.username,
      form: {
        PX: "",
        congdoan: "",
        khsp: "",
        dongia: "",
        ghichu: "",
      },
      search: "",
      isActive: false,
      isActive_cre: false,
      one_dongiacong: {},
      columns: [
        {
          label: "Id",
          field: "_id",
          // dataFormat: this.trimData
        },
        {
          label: "Phân xưởng",
          field: "PX",
          /* dataFormat: this.priceFormat */
          // dataFormat: this.trimData
        },
        {
          label: "STT công đoạn",
          field: "sttcd",
          /* dataFormat: this.priceFormat */
          // dataFormat: this.trimData
        },
        {
          label: "Công đoạn",
          field: "congdoan",
          /* dataFormat: this.priceFormat */
          // dataFormat: this.trimData
        },
        {
          label: "KHSP",
          field: "khsp",
          /* dataFormat: this.priceFormat */
          // dataFormat: this.trimData
        },
        {
          label: "Đơn giá",
          field: "dongia",
          /* dataFormat: this.priceFormat */
          // dataFormat: this.trimData
        },
        {
          label: "Ghi chú",
          field: "ghichu",
        },
        // {
        //   label: "Tạo ngày",
        //   field: "createdAt",
        //   dataFormat: this.prefixformatDate,
        // },
        // {
        //   label: "Tạo bởi",
        //   field: "createdBy",
        // },
        // {
        //   label: "Cập nhật ngày",
        //   field: "updatedAt",
        //   dataFormat: this.prefixformatDate,
        // },
      ],
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

  watch: {
    filteredItems(newVal, oldVal) {
      // Perform any necessary updates here
    },
  },

  computed: {
    filteredItems() {
      return this.dongiacong.filter((item) => {
        return item.khsp.toLowerCase().indexOf(this.search.toLowerCase()) > -1;
      });
    },
  },

  mounted() {
    this.getDongiacong();
    this.currentDateTime();
    this.getPhanxuong();
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

    async getPhanxuong() {
      this.phanxuong = await this.$axios.$get(`/api/phongban/allphanxuong`);
    },

    async getWithPX(e) {
      var name = e.target.options[e.target.options.selectedIndex].text;
      // console.log(name)
      let position = name.split("-");
      let p1 = position[0].trim();
      // console.log(p1)
      if (p1 == "AL_PXD" || p1 == "DV_PXD" || p1 == "PXD") {
        this.form.PX = "PXD";
        // alert('PXD')
      } else {
        this.form.PX = p1;
      }
    },

    async getDongiacong() {
      this.dongiacong = await this.$axios.$get(
        `/api/nguyencong/getalldongiacong`
      );
      if (this.dongiacong.length <= 0) {
        this.$toasted.show("Danh mục đơn giá công rỗng", {
          duration: 3000,
          theme: "bubble",
        });
      }
    },

    async showDmnc(e) {
      var name = e.target.options[e.target.options.selectedIndex].text;
      // console.log(name)
      let position = name.split("--");
      let p1 = position[0].trim();
      let mapx;
      if (p1 == "AL_PXD" || p1 == "DV_PXD") {
        mapx = "pxd";
      } else {
        mapx = p1;
      }

      this.dongiacong = await this.$axios.$get(
        `/api/nguyencong/getalldongiacongwithpx?PX=${mapx}`
      );
      if (this.dongiacong.length <= 0) {
        this.$toasted.show("Danh mục đơn giá công rỗng", {
          duration: 3000,
          theme: "bubble",
        });
      }
    },

    async getDN(dongiacong) {
      this.isActive = true;
      this.one_dongiacong = dongiacong;
      // console.log(this.one_nguyencong)
    },

    openModel() {
      this.isActive_cre = true;
    },

    async onUpdate(id) {
      Swal.fire({
        title: "Chắc chắn cập nhật đơn giá công này?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Chắc chắn cập nhật",
      }).then((result) => {
        if (result.isConfirmed) {
          try {
            this.$axios.$patch(
              `/api/nguyencong/dongiacong/${id}`,
              this.one_dongiacong,
              {}
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
        }
      });
    },

    async onAddNc() {
      try {
        this.$axios.$post("/api/nguyencong/adddongiacong", this.form);

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
        this.dongiacong = await this.$axios.$get(
          `/api/nguyencong/getalldongiacong`
        );
        this.isActive_cre = false;
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
          this.$axios
            .$delete(`/api/nguyencong/dongiacong/${nc._id}`)
            .then((response) => {
              // const index = this.filteredItems.findIndex(it => it._id === nc._id) // find the post index
              // if (~index) // if the post exists in array
              //     this.filteredItems.splice(index, 1) //delete the post
              const index = this.dongiacong.findIndex((n) => n._id === nc._id); // find the post index
              if (~index)
                // if the post exists in array
                // console.log(index);
                // console.log(this.filteredItems);
                this.dongiacong.splice(index, 1); //delete the post
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

@media (max-width: 768px) {
  .modal-card {
    width: 90%;
    max-width: 400px;
  }
}
</style>
