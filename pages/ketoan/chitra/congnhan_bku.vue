<template>
  <div class="columns">
    <div class="column">
      <br />
      <div class="box" style="margin-left: 10px; margin-right: 10px">
        <div class="columns">
          <div class="column">
            <div class="control">
              <span class="icon is-small is-left">
                <i style="color: #ff55acee" class="fas fa-dolly"></i>
              </span>
              <span style="color: #3850b7; font-size: 14px; font-weight: bold"
                >Quản lý Chi trả</span
              >
            </div>
          </div>
        </div>

        <div class="columns">
          <div class="column is-8"></div>
          <div class="column" style="text-align: right">
            <button
              @click="isActive = true"
              class="button is-success is-fullwidth is-small"
            >
              Lập phiếu ứng tiền
            </button>
          </div>
          <div class="column" style="text-align: right">
            <nuxt-link :to="`/`">
              <button class="button is-info is-fullwidth is-small">
                Thoát
              </button>
            </nuxt-link>
          </div>
        </div>
        <div class="table_wrapper">
          <table
            class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth"
          >
            <thead>
              <tr>
                <th
                  style="
                    text-align: center;
                    font-size: small;
                    font-weight: bold;
                  "
                >
                  STT
                </th>
                <th
                  style="
                    text-align: center;
                    font-size: small;
                    font-weight: bold;
                  "
                >
                  Sửa
                </th>
                <th
                  style="
                    text-align: center;
                    font-size: small;
                    font-weight: bold;
                  "
                >
                  Xóa
                </th>
                <th
                  style="
                    text-align: center;
                    font-size: small;
                    font-weight: bold;
                  "
                >
                  Người ứng
                </th>
                <th
                  style="
                    text-align: center;
                    font-size: small;
                    font-weight: bold;
                  "
                >
                  Tiền ứng
                </th>
                <th
                  style="
                    text-align: center;
                    font-size: small;
                    font-weight: bold;
                  "
                >
                  Ngày ứng
                </th>
                <th
                  style="
                    text-align: center;
                    font-size: small;
                    font-weight: bold;
                  "
                >
                  Nội dung
                </th>
                <th
                  style="
                    text-align: center;
                    font-size: small;
                    font-weight: bold;
                  "
                >
                  Phòng ban
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(ut, index) in data_ung" :key="index">
                <td style="text-align: center; font-size: small">
                  {{ index + 1 }}
                </td>
                <td
                  style="
                    text-align: center;
                    font-size: small;
                    font-weight: bold;
                    color: green;
                  "
                >
                  <nuxt-link :to="`/ketoan/tamung/${ut._id}/manage`">
                    <span class="icon is-small">
                      <i class="far fa-check-circle"></i>
                    </span>
                  </nuxt-link>
                </td>
                <td style="text-align: center; font-size: small">
                  <a
                    @click="
                      onDelete(
                        ut._id,
                        ut.nguoiung,
                        ut.ngayung,
                        ut.tienung,
                        ut.phongban,
                        ut.createdBy,
                        ut.createdAt
                      )
                    "
                  >
                    <span style="color: red" class="icon is-small">
                      <i class="fas fa-times"></i>
                    </span>
                  </a>
                </td>
                <td style="font-size: small">{{ ut.nguoiung }}</td>
                <td style="font-size: small; text-align: right">
                  {{ ut.tienung }}
                </td>
                <td style="text-align: center; font-size: small">
                  {{ ut.ngayung | formatDate }}
                </td>
                <td style="font-size: small">{{ ut.noidung }}</td>
                <td style="font-size: small">{{ ut.phongban }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Modal -->
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
                        <i style="color: #ffd863ff" class="fas fa-tags"></i>
                      </span>
                      Tạo phiếu ứng tiền
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
                <div>
                  <div class="table_wrapper">
                    <table
                      class="table is-responsive is-bordered is-narrow is-fullwidth"
                    >
                      <tr style="background-color: #fef2ec">
                        <td
                          colspan="2"
                          style="
                            text-align: left;
                            font-size: small;
                            font-weight: bold;
                            color: #485fc7;
                          "
                        >
                          <div class="control">
                            <label class="radio">
                              <input
                                type="radio"
                                v-model="isNhanvienorCongnhan"
                                value="vanphong"
                                name="answer"
                              />
                              Văn phòng
                            </label>
                            <label class="radio">
                              <input
                                type="radio"
                                v-model="isNhanvienorCongnhan"
                                value="phanxuong"
                                name="answer"
                              />
                              Phân xưởng
                            </label>
                          </div>
                        </td>
                      </tr>
                      <template v-if="isNhanvienorCongnhan == phanxuong">
                        <tr>
                          <td style="font-size: small; font-weight: bold">
                            Phân xưởng
                          </td>
                          <td>
                            <div class="control has-icons-left">
                              <div class="select is-small is-fullwidth">
                                <select @change="showmapx($event)">
                                  <option selected>
                                    -- Chọn phân xưởng --
                                  </option>
                                  <option
                                    v-for="item in phanxuong"
                                    :value="item.tenpx"
                                  >
                                    {{ item.mapx }} -- {{ item.tenpx }}
                                  </option>
                                </select>
                              </div>
                              <span class="icon is-small is-left">
                                <i
                                  style="color: #48c78e"
                                  class="fas fa-kaaba"
                                ></i>
                              </span>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td style="font-size: small; font-weight: bold">
                            Tên người ứng
                          </td>
                          <td>
                            <div class="control has-icons-left">
                              <div class="select is-small is-fullwidth">
                                <select
                                  @change="calung($event)"
                                  v-model="form.manv"
                                >
                                  <option selected>-- Chọn công nhân --</option>
                                  <option
                                    v-for="item in ds_congnhan"
                                    :value="item.macn"
                                  >
                                    {{ item.tencn }}
                                  </option>
                                </select>
                              </div>
                              <span class="icon is-small is-left">
                                <i
                                  style="color: #48c78e"
                                  class="far fa-address-card"
                                ></i>
                              </span>
                            </div>
                          </td>
                        </tr>
                      </template>

                      <tr>
                        <td style="font-size: small; font-weight: bold">
                          Tiền ứng
                        </td>
                        <td>
                          <input
                            @blur="$v.form.tienung.$touch()"
                            v-model="form.tienung"
                            class="input is-small"
                            type="text"
                            v-mask="mask"
                            placeholder="Nhập tiền ứng"
                          />
                          <div v-if="$v.form.tienung.$error" class="form-error">
                            <span
                              v-if="!$v.form.tienung.required"
                              class="help is-danger"
                              >Yêu cầu nhập tiền ứng</span
                            >
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td style="font-size: small; font-weight: bold">
                          Ngày ứng tiền
                        </td>
                        <td>
                          <input
                            v-model="form.ngayung"
                            class="input is-small"
                            type="date"
                          />
                          <div v-if="$v.form.ngayung.$error" class="form-error">
                            <span
                              v-if="!$v.form.ngayung.required"
                              class="help is-danger"
                              >Yêu cầu nhập ngày ứng tiền</span
                            >
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td colspan="2">
                          <div class="control">
                            <label class="radio">
                              <input
                                type="radio"
                                v-model="form.typeung"
                                value="ungluong"
                                name="answer"
                              />
                              <span style="font-size: small; font-weight: bold"
                                >Ứng tiền lương</span
                              >
                            </label>
                            <label class="radio">
                              <input
                                type="radio"
                                v-model="form.typeung"
                                value="ungkhac"
                                name="answer"
                              />
                              <span style="font-size: small; font-weight: bold"
                                >Ứng tiền khác</span
                              >
                            </label>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td style="font-size: small; font-weight: bold">
                          Ghi chú/ Diễn giải thêm
                        </td>
                        <td>
                          <textarea
                            v-model="form.noidung"
                            @blur="$v.form.noidung.$touch()"
                            class="textarea is-small"
                            placeholder="Nhập vào lý do ứng tiền"
                          ></textarea>
                          <div v-if="$v.form.noidung.$error" class="form-error">
                            <span
                              v-if="!$v.form.noidung.required"
                              class="help is-danger"
                              >Yêu cầu nhập nội dung ứng tiền</span
                            >
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <button
                            @click.prevent="onTaophieuung()"
                            :disabled="$v.form.$invalid"
                            class="button is-success is-fullwidth is-small"
                          >
                            Xác nhận lập phiếu ứng
                          </button>
                        </td>
                        <td>
                          <button
                            @click="isActive = false"
                            class="button is-danger is-light is-fullwidth is-small"
                          >
                            Hủy bỏ
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

        <!-- Modal Add nhân viên -->
        <div class="">
          <!-- Toggle class  -->
          <div :class="{ 'is-active1': isActive }" class="modal">
            <div class="modal-background"></div>
            <div class="modal-content modal-card">
              <header class="modal-card-head" style="background-color: #ebfffc">
                <p
                  class="modal-card-title"
                  style="font-size: 15px; font-weight: bold; color: red"
                >
                  Lập phiếu ứng tiền
                </p>
                <!-- close modal -->
                <button
                  @click="isActive = false"
                  class="delete"
                  aria-label="close"
                ></button>
              </header>
              <section class="modal-card-body">
                <table
                  class="table is-responsive is-bordered is-narrow is-fullwidth"
                >
                  <tr class="is-selected">
                    <th colspan="2">Phiếu ứng</th>
                  </tr>
                  <tr>
                    <td>Người ứng tiền</td>
                    <td>
                      <multiselect
                        v-model="dm_nhanvien"
                        :options="ds_congnhan"
                        :custom-label="nameWithNhanvien"
                        placeholder="Chọn người ứng"
                        label="maphong"
                        track-by="maphong"
                        style="font-size: 12px; width: 100%"
                      >
                      </multiselect>
                    </td>
                  </tr>
                  <tr>
                    <td>Số tiền ứng</td>
                    <td>
                      <input
                        @blur="$v.form.tienung.$touch()"
                        v-model="form.tienung"
                        class="input is-small"
                        type="text"
                        v-mask="mask"
                        placeholder="Nhập tiền ứng"
                      />
                      <div v-if="$v.form.tienung.$error" class="form-error">
                        <span
                          v-if="!$v.form.tienung.required"
                          class="help is-danger"
                          >Yêu cầu nhập tiền ứng</span
                        >
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>Ngày ứng tiền</td>
                    <td>
                      <input
                        v-model="form.ngayung"
                        class="input is-small"
                        type="date"
                      />
                      <div v-if="$v.form.ngayung.$error" class="form-error">
                        <span
                          v-if="!$v.form.ngayung.required"
                          class="help is-danger"
                          >Yêu cầu nhập ngày ứng tiền</span
                        >
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <div class="control">
                      <label class="radio">
                        <input
                          type="radio"
                          v-model="form.typeung"
                          value="ungluong"
                          name="answer"
                        />
                        Ứng tiền lương
                      </label>
                      <label class="radio">
                        <input
                          type="radio"
                          v-model="form.typeung"
                          value="ungkhac"
                          name="answer"
                        />
                        Ứng tiền khác
                      </label>
                    </div>
                  </tr>
                  <tr>
                    <td>Ghi chú/ Diễn giải thêm</td>
                    <td>
                      <textarea
                        v-model="form.noidung"
                        @blur="$v.form.noidung.$touch()"
                        class="textarea is-small"
                        placeholder="Nhập vào lý do ứng tiền"
                      ></textarea>
                      <div v-if="$v.form.noidung.$error" class="form-error">
                        <span
                          v-if="!$v.form.noidung.required"
                          class="help is-danger"
                          >Yêu cầu nhập nội dung ứng tiền</span
                        >
                      </div>
                    </td>
                  </tr>
                </table>

                <div class="columns">
                  <div class="column">
                    <button
                      @click.prevent="[getinfonv(), onTaophieuung()]"
                      :disabled="$v.form.$invalid"
                      class="button is-success is-fullwidth is-small"
                    >
                      Xác nhận lập phiếu ứng
                    </button>
                  </div>
                  <div class="column">
                    <button
                      @click="isActive = false"
                      class="button is-danger is-light is-fullwidth is-small"
                    >
                      Hủy bỏ
                    </button>
                  </div>
                </div>
              </section>
              <footer class="modal-card-foot">
                <!-- close modal -->
                <button
                  @click="isActive = false"
                  class="button is-outlined is-info is-small"
                >
                  Đóng
                </button>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import createNumberMask from "text-mask-addons/dist/createNumberMask";
const currencyMask = createNumberMask({
  prefix: "",
  allowDecimal: true,
  includeThousandsSeparator: true,
  allowNegative: false,
});
import Swal from "sweetalert2";
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.min.css";
import { required } from "vuelidate/lib/validators";
export default {
  middleware: "auth",
  components: {
    Multiselect,
  },
  data() {
    return {
      ds_congnhan: [],
      phanxuong: [],
      dm_nhanvien: [],
      mask: currencyMask,
      data_ung: [],
      isNhanvienorCongnhan: null,
      form: {
        nguoiung: null,
        tienung: null,
        ngayung: null,
        noidung: null,
        phongban: null,
        mapb: null,
        createdAt: null,
        createdBy: this.$auth.$state.user.username,
        manv: null,
        typeung: null,
        hoanung: 0,
        // updatedAt: new Date().toISOString().substr(0, 10),
      },
      hisform: {
        tenthaotac: null,
        createdAt: null,
        createdBy: this.$auth.$state.user.username,
        ghichu: null,
      },

      // Modals
      isActive: false,
    };
  },

  validations: {
    form: {
      tienung: {
        required,
      },
      ngayung: {
        required,
      },
      noidung: {
        required,
      },
    },
  },

  mounted() {
    this.currentDateTime();
    this.getUngtien();
    this.getPhanxuong();
  },

  isFormValid() {
    return !this.$v.form.$invalid;
  },

  methods: {
    nameWithNhanvien({ _id, tennv }) {
      return `${tennv}`;
    },

    async getPhanxuong() {
      this.phanxuong = await this.$axios.$get(`/api/phongban/allphanxuong`);
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
      this.form.createdAt = date + " " + time;
      this.hisform.createdAt = date + " " + time;
    },

    // get all tienung
    async getUngtien() {
      this.data_ung = await this.$axios.$get(`/api/ketoan/allungtien`);
    },

    calung(e) {
      var name = e.target.options[e.target.options.selectedIndex].text;
      this.form.nguoiung = name;
      // console.log(name)
    },

    async showmapx(e) {
      var name = e.target.options[e.target.options.selectedIndex].text;
      let position = name.split("--");
      // console.log(position)
      this.form.mapb = position[0].trim();
      this.form.phongban = position[1].trim();
      // console.log(position[0].trim())
      // console.log(position[1].trim())
      // console.log(this.form)
      this.ds_congnhan = await this.$axios.$get(
        `/api/congnhan/allcongnhanpx?mapx=${this.form.mapb}`
      );
    },

    onTaophieuung() {
      Swal.fire({
        title: "Chắc chắn tạo phiếu ứng tiền?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Chắc chắn tạo",
      }).then((result) => {
        if (result.isConfirmed) {
          try {
            this.$v.form.$touch();
            // console.log(this.$auth.$state.user.username);

            this.form.tiengung = this.form.tienung.replace(/[,]/g, "");
            this.$axios.$post("/api/ketoan/taophieuung", this.form);

            // save log
            this.hisform.tenthaotac = `Lập mới phiếu ứng, tên người ứng: ${this.form.nguoiung}`;
            this.hisform.ghichu = `Lập mới phiếu ứng`;
            this.$axios.$post(`/api/logsystem/record-action`, this.hisform);

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
              title: "Thêm mới phiếu ứng thành công",
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

    onDelete(id, nguoiung, ngayung, tienung, phongban, createdBy, createdAt) {
      swal({
        title: "Bạn muốn xóa phiếu ứng này?",
        text: "Phiếu ứng này sẽ được lưu lịch sử xóa sau khi xác nhận!",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          this.$axios.$delete(`/api/ketoan/tienung/${id}`);
          swal("Xóa thành công, F5 lại trang để thay đổi dữ liệu", {
            icon: "success",
          });
          this.hisform.tenthaotac = `Xóa phiếu ứng tiền, mã phiếu là: ${id}`;
          this.hisform.ghichu = `Nội dung trên phiếu ứng: ${nguoiung}, ${ngayung}, ${tienung.trim()}, ${phongban}, ${createdBy}, ${createdAt}`;
          this.$axios.$post(`/api/ketoan/record-action`, this.hisform);
        } else {
          swal("Bạn đã hủy xóa phiếu ứng");
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
