<template>
  <div class="columns">
    <div class="column container">
      <br />
      <div class="box" style="margin-left: 50px; margin-right: 50px">
        <div class="columns">
          <div class="column">
            <div class="control">
              <span class="icon is-small is-left">
                <i style="color: #00d1b2" class="fas fa-cocktail"></i>
              </span>
              <span style="color: #3850b7; font-size: 17px; font-weight: bold"
                >Danh mục Ăn ca</span
              >
            </div>
          </div>
        </div>

        <div class="columns">
          <div class="column is-8">
            <span>Có tất cả: </span>
            <span style="font-weight: bold">{{
              anca.length | formatNumber
            }}</span>
            <span>Loại ăn ca</span>
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
                  Loại ăn ca
                </th>
                <th style="text-align: center; font-size: smaller; width: 15%">
                  Tiền ăn
                </th>
                <th style="text-align: center; font-size: smaller">Ghi chú</th>
                <th style="text-align: center; font-size: smaller">
                  Người tạo
                </th>
                <th style="text-align: center; font-size: smaller">Ngày tạo</th>
                <th style="text-align: center; font-size: smaller; width: 5%">
                  Sửa
                </th>
                <th style="text-align: center; font-size: smaller; width: 5%">
                  Xóa
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in anca" :key="index">
                <td style="text-align: center; font-size: smaller">
                  {{ index + 1 }}
                </td>
                <td style="font-size: smaller">
                  <input
                    type="text"
                    class="input is-small"
                    v-model="item.anca"
                  />
                </td>
                <td style="font-size: smaller">
                  <input
                    type="text"
                    class="input is-small"
                    v-model="item.tienan"
                  />
                </td>
                <td style="font-size: smaller">
                  <input
                    type="text"
                    class="input is-small"
                    v-model="item.ghichu"
                  />
                </td>
                <td style="font-size: smaller; text-align: center">
                  {{ item.createdBy }}
                </td>
                <td style="font-size: smaller; text-align: center">
                  {{ item.createdAt | formatDate }}
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
                      Thêm Loại ăn ca
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
                      Loại ăn ca
                    </td>
                    <td>
                      <input
                        v-model="form.anca"
                        type="text"
                        class="input is-small"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td style="font-size: small; font-weight: bold">
                      Tiền ăn ca
                    </td>
                    <td>
                      <input
                        v-model="form.tienan"
                        type="text"
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
  middleware: "auth-admin",
  data() {
    return {
      anca: [],
      form: {
        anca: "",
        tienan: "",
        ghichu: "",
        createdAt: null,
        createdBy: this.$auth.$state.user.username,
      },
      // Modals
      isActive: false,
    };
  },

  mounted() {
    this.getAnca();
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

    async getAnca() {
      this.anca = await this.$axios.$get(`/api/ketoan/getallanca`);
    },

    async onAdd() {
      //   console.log(this.form);
      const response = await this.$axios.$post(
        `/api/ketoan/addanca`,
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

        this.getAnca();
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

        this.getAnca();
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
          this.$axios.$delete(`/api/ketoan/anca/${ac._id}`).then((response) => {
            const index = this.anca.findIndex((p) => p._id === ac._id); // find the post index
            if (~index)
              // if the post exists in array
              this.anca.splice(index, 1); //delete the post
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
