<template>
  <div class="columns">
    <div class="column container">
      <br />
      <div class="box" style="margin-left: 3px; margin-right: 3px">
        <div class="columns">
          <div class="column">
            <div class="control">
              <span class="icon is-small is-left">
                <i style="color: #00d1b2" class="fas fa-barcode"></i>
              </span>
              <span style="color: #3850b7; font-size: 15px; font-weight: bold"
                >Gán số thứ tự công nhân</span
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
          <div class="column" style="text-align: right">
            <button
              @click="isActive = true"
              class="button is-success is-fullwidth is-small"
            >
              <span class="icon is-small">
                <i class="fas fa-pen-fancy"></i>
              </span>
              <span>Thêm công nhân</span>
            </button>
          </div>
        </div>
        <div class="columns">
          <div class="column">
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
          <div class="column">
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
        <div class="table_wrapper table-height">
          <table
            class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth"
          >
            <thead>
              <!-- <tr style="background-color: #fffaeb;">
                <td style="text-align: right; font-size: small; font-weight: bold;" colspan="9">
                  <a @click="getDmcn">
                    <span class="icon is-small is-left">
                      <i style="color: #f96854" class="fab fa-audible"></i>
                    </span>
                    Hiển thị tất cả
                  </a>
                </td>
              </tr> -->
              <tr style="background-color: #fffaeb">
                <th style="text-align: center; font-size: small">STT</th>
                <!-- <th style="text-align: center; font-size: small;">Sửa</th> -->
                <!-- <th style="text-align: center; font-size: small;">Xóa</th> -->
                <th style="text-align: center; font-size: small">
                  Mã công nhân
                </th>
                <th style="text-align: center; font-size: small; width: 5%">
                  Gán STT
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
              </tr>
            </thead>
            <tbody>
              <tr v-for="(px, index) in congnhan" :key="index" ref="rows">
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
                <td style="font-size: small">
                  <input
                    @change="onUpdate(px)"
                    type="text"
                    class="input is-small"
                    v-model="px.sttchon"
                    @keydown.arrow-down="moveToNextRow(index, $event)"
                    @keydown.arrow-up="moveToPreviousRow(index, $event)"
                    @keydown.enter.prevent="moveToNextRow(index, $event)"
                  />
                </td>
                <td style="font-size: small">{{ px.tencn }}</td>
                <td style="font-size: small">{{ px.mato }}</td>
                <td style="font-size: small">{{ px.tento }}</td>
                <td style="font-size: small">{{ px.mapx }}</td>
                <td style="font-size: small">{{ px.tenpx }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Modal Add nhân viên -->
        <div class="">
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
                      Thêm Công nhân
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
                <div class="table_wrapper">
                  <table
                    class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth"
                  >
                    <tr style="background-color: #fffaeb">
                      <td
                        colspan="2"
                        style="
                          text-align: right;
                          font-size: small;
                          font-weight: bold;
                        "
                      >
                        Nhập thông tin
                      </td>
                    </tr>
                    <tr>
                      <td style="width: 50%">
                        <div class="field">
                          <label class="label">Mã công nhân</label>
                          <div class="control">
                            <input
                              v-model.trim="form.macn"
                              @blur="$v.form.macn.$touch()"
                              class="input is-small"
                              type="text"
                              placeholder="Nhập mã công nhân"
                            />
                          </div>
                          <div v-if="$v.form.macn.$error" class="form-error">
                            <span
                              v-if="!$v.form.macn.required"
                              class="help is-danger"
                              >Yêu cầu nhập mã công nhân</span
                            >
                          </div>
                        </div>
                      </td>
                      <td>
                        <div class="field">
                          <label class="label">Tên công nhân</label>
                          <div class="control">
                            <input
                              v-model.trim="form.tencn"
                              @blur="$v.form.tencn.$touch()"
                              class="input is-small"
                              type="text"
                              placeholder="Nhập tên công nhân"
                            />
                          </div>
                          <div v-if="$v.form.tencn.$error" class="form-error">
                            <span
                              v-if="!$v.form.tencn.required"
                              class="help is-danger"
                              >Yêu cầu nhập tên công nhân</span
                            >
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div class="control has-icons-left">
                          <div class="select is-small is-fullwidth">
                            <select @change="showmapx($event)">
                              <option selected>-- Chọn phân xưởng --</option>
                              <option
                                v-for="item in phanxuong"
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
                      </td>
                      <td>
                        <div class="control has-icons-left">
                          <div class="select is-small is-fullwidth">
                            <select @change="showmato($event)">
                              <option selected>-- Chọn tổ --</option>
                              <option v-for="item in tonhom" :value="item.mato">
                                {{ item.mato }} -- {{ item.tento }}
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
                      <td>
                        <div class="field">
                          <label class="label">Số điện thoại</label>
                          <div class="control">
                            <input
                              v-model.trim="form.sdt"
                              @blur="$v.form.sdt.$touch()"
                              class="input is-small"
                              type="text"
                              placeholder="Nhập số điện thoại"
                            />
                          </div>
                          <div v-if="$v.form.sdt.$error" class="form-error">
                            <span
                              v-if="!$v.form.sdt.required"
                              class="help is-danger"
                              >Yêu cầu nhập số điện thoại</span
                            >
                          </div>
                        </div>
                      </td>
                      <td>
                        <div class="field">
                          <label class="label">Địa chỉ</label>
                          <div class="control">
                            <input
                              v-model.trim="form.diachi"
                              @blur="$v.form.diachi.$touch()"
                              class="input is-small"
                              type="text"
                              placeholder="Nhập địa chỉ"
                            />
                          </div>
                          <div v-if="$v.form.diachi.$error" class="form-error">
                            <span
                              v-if="!$v.form.diachi.required"
                              class="help is-danger"
                              >Yêu cầu nhập địa chỉ</span
                            >
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div class="field">
                          <label class="label">Căn cước công dân</label>
                          <div class="control">
                            <input
                              v-model.trim="form.cccd"
                              @blur="$v.form.cccd.$touch()"
                              class="input is-small"
                              type="text"
                              placeholder="Nhập căn cước công nhân"
                            />
                          </div>
                          <div v-if="$v.form.cccd.$error" class="form-error">
                            <span
                              v-if="!$v.form.cccd.required"
                              class="help is-danger"
                              >Yêu cầu nhập căn cước công dân</span
                            >
                          </div>
                        </div>
                      </td>
                      <td>
                        <div class="field">
                          <label class="label">Chức vụ</label>
                          <div class="control">
                            <input
                              v-model.trim="form.chucvu"
                              class="input is-small"
                              type="text"
                              placeholder="Nhập chức vụ"
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div class="field">
                          <label class="label">Lương cơ bản</label>
                          <div class="control">
                            <input
                              v-model.trim="form.luongcb"
                              class="input is-small"
                              type="text"
                              v-mask="mask"
                            />
                          </div>
                        </div>
                      </td>
                      <td>
                        <div class="field">
                          <label class="label">Người liên hệ khẩn cấp</label>
                          <div class="control">
                            <input
                              v-model.trim="form.nguoilienhe"
                              @blur="$v.form.nguoilienhe.$touch()"
                              class="input is-small"
                              type="text"
                              placeholder="Nhập thông tin người liên hệ khi cần"
                            />
                          </div>
                          <div
                            v-if="$v.form.nguoilienhe.$error"
                            class="form-error"
                          >
                            <span
                              v-if="!$v.form.nguoilienhe.required"
                              class="help is-danger"
                              >Yêu cầu nhập người liên hệ khi cần gấp</span
                            >
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div class="field">
                          <label class="label">Số tài khoản</label>
                          <div class="control">
                            <input
                              v-model.trim="form.sotknh"
                              class="input is-small"
                              type="text"
                              placeholder="Nhập thông tin số tài khoản (nếu có)"
                            />
                          </div>
                        </div>
                      </td>
                      <td>
                        <div class="field">
                          <label class="label">Tên ngân hàng</label>
                          <div class="control">
                            <input
                              v-model.trim="form.tennh"
                              class="input is-small"
                              type="text"
                              placeholder="Nhập tên ngân hàng"
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td colspan="2">
                        <div class="field">
                          <div style="margin-bottom: 10px">
                            <label class="checkbox">
                              <input
                                type="checkbox"
                                v-model.trim="checkGhichu"
                              />
                              <span style="font-weight: bold">Ghi chú </span>
                            </label>
                          </div>
                        </div>
                        <div
                          v-if="checkGhichu == true"
                          class="field"
                          style="margin-top: 10px"
                        >
                          <div class="control">
                            <textarea
                              v-model="form.ghichu"
                              class="textarea is-small"
                              placeholder="Ghi chú thêm ..."
                            ></textarea>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </table>
                </div>

                <div class="columns">
                  <div class="column">
                    <button
                      :disabled="$v.form.$invalid"
                      @click.prevent="onAddCongnhan"
                      class="button is-success is-fullwidth is-small"
                    >
                      Ghi nhận
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
      mask: currencyMask,
      form: {
        macn: null,
        tencn: null,
        mapx: null,
        tenpx: null,
        sdt: null,
        diachi: null,
        cccd: null,
        mato: null,
        tento: null,
        chucvu: null,
        chucnang: null,
        luongcb: null,
        nguoilienhe: null,
        sotknh: null,
        tennh: null,
        ghichu: null,
        createdAt: null,
        createdBy: this.$auth.$state.user.username,
        // updatedAt: new Date().toISOString().substr(0, 10),
      },
      checkGhichu: false,
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
    // this.getDmcn();
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
      this.form.createdAt = date + " " + time;
      this.hisform.createdAt = date + " " + time;
    },

    // async getDmcn() {
    //   this.congnhan = await this.$axios.$get(`/api/congnhan/allcongnhan`);
    //   if (this.congnhan.length <= 0) {
    //     this.$toasted.show("Danh mục công nhân rỗng", {
    //       duration: 3000,
    //       theme: "bubble",
    //     });
    //   }
    // },

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
    },

    async showmato(e) {
      // console.log(this.mapx)
      var name = e.target.options[e.target.options.selectedIndex].text;
      // console.log(name)
      let position = name.split("--");
      this.form.mato = position[0].trim();
      this.form.tento = position[1].trim();
    },

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

    moveToNextRow(index, e) {
      const currentRowInputs =
        e.target.parentNode.parentNode.getElementsByTagName("input");
      const currentInputIndex = Array.prototype.indexOf.call(
        currentRowInputs,
        e.target
      );
      const nextRow = this.$refs.rows[index + 1];
      if (nextRow) {
        const nextRowInputs = nextRow.getElementsByTagName("input");
        // if (nextRowInputs.length > 0) {
        //   nextRowInputs[0].focus();
        // }
        if (nextRowInputs.length > currentInputIndex) {
          nextRowInputs[currentInputIndex].focus();
        }
      }
    },
    moveToPreviousRow(index, e) {
      const currentRowInputs =
        e.target.parentNode.parentNode.getElementsByTagName("input");
      const currentInputIndex = Array.prototype.indexOf.call(
        currentRowInputs,
        e.target
      );

      const previousRow = this.$refs.rows[index - 1];
      if (previousRow) {
        const previousRowInputs = previousRow.getElementsByTagName("input");
        if (previousRowInputs.length > currentInputIndex) {
          previousRowInputs[currentInputIndex].focus();
        }
      }
    },

    async onUpdate(cn) {
      // console.log(cn);
      // console.log(cn.sttchon);
      const data = {
        sttchon: cn.sttchon,
      };
      await this.$axios.$patch(
        `/api/lokehoach/congnhan/sttchon/${cn._id}`,
        data
      );
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

            // this.getDmcn()
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
  height: 350px;
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
