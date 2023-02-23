<template>
  <div class="columns is-mobile">
    <div class="column is-10 is-offset-1">
      <br />
      <div class="box" style="margin-left:10px; margin-right:10px;">
        <div class="columns">
          <div class="column is-10">
            <div class="control">
              <span class="icon is-small is-left">
                <i style="color: #f14668" class="fa fa-calendar"></i>
              </span>
              Danh sách phiên bản lương
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

        <div>
          <table class="table is-responsive is-bordered is-narrow is-fullwidth">
            <tr>
              <td style="text-align: center; font-size: small; font-weight: bold;">
                STT
              </td>
              <td style="text-align: center; font-size: small; font-weight: bold;">
                Tên phiên bản
              </td>
              <td style="text-align: center; font-size: small; font-weight: bold;">
                Diễn giải
              </td>
              <td style="text-align: center; font-size: small; font-weight: bold;">
                Ngày tạo
              </td>
              <td style="text-align: center; font-size: small; font-weight: bold;">
                Người tạo
              </td>
              <td style="text-align: center; font-size: small; font-weight: bold;">
                Xóa phiên bản
              </td>
            </tr>
            <tr v-for="(pl, index) in phienban" :key="index + 'a'">
              <td style="text-align: center; font-size: small;">
                {{ index + 1 }}
              </td>
              <td style="text-align: center; font-size: small;">
                {{ pl.version }}
              </td>
              <td style="text-align: center; font-size: small;">
                {{ pl.ghichu }}
              </td>
              <td style="text-align: center; font-size: small;">
                {{ pl.createdAt | formatDate }}
              </td>
              <td style="text-align: center; font-size: small;">
                {{ pl.createdBy }}
              </td>
              <td style="text-align: center">
                <a @click="onDelete(pl._id)">
                  <span style="color: red" class="icon is-small">
                    <i class="fas fa-times"></i>
                  </span>
                </a>
              </td>
            </tr>
          </table>
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
  middleware: "auth-admin",
  components: {
    Multiselect,
  },
  data() {
    return {
      phanxuong: [],
      phienban: [],
      form: {
        mapx: "",
      },
    };
  },

  mounted() {
    this.getPhanxuong();
    this.getPhienbanluong();
  },

  methods: {
    async getPhanxuong() {
      this.phanxuong = await this.$axios.$get(`/api/phongban/allphanxuong`);
    },

    async getPhienbanluong() {
      this.phienban = await this.$axios.$get(`/api/nguyencong/getversion`);
      if (this.phienban.length < 0) {
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
          title: "Không tồn tại phiên bản lương nào",
        });
      }
    },

    onDelete(id) {
      swal({
        title: "Bạn muốn xóa phiên bản lương này?",
        text: "Sẽ không lấy lại được sau khi xóa!",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          this.$axios.$delete(`/api/nguyencong/version/${id}`);
          swal(
            "Xóa thành công phiên bản lương, F5 lại trang để thay đổi dữ liệu",
            {
              icon: "success",
            }
          );
        } else {
          swal("Bạn đã hủy xóa");
        }
      });
    },
  },
};
</script>

<style scoped>
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
</style>
