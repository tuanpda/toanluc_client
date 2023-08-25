<template>
  <div class="columns">
    <div class="column container">
      <br />
      <div class="box" style="margin-left: 3px; margin-right: 3px">
        <div class="columns">
          <div class="column">
            <div class="control">
              <span class="icon is-small is-left">
                <i style="color: #00d1b2" class="fab fa-drupal"></i>
              </span>
              <span style="color: #3850b7; font-size: 15px; font-weight: bold"
                >Danh mục Công nhân</span
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
                <th style="text-align: center; font-size: small">Trạng thái</th>
                <th style="text-align: center; font-size: small">Sửa</th>
                <!-- <th style="text-align: center; font-size: small">Xóa</th> -->
              </tr>
            </thead>
            <tbody>
              <tr v-for="(px, index) in congnhan" :key="index">
                <td style="text-align: center; font-size: small">
                  {{ index + 1 }}
                </td>
                <td style="font-size: small">{{ px.macn }}</td>
                <td style="font-size: small">{{ px.tencn }}</td>
                <td style="font-size: small">{{ px.mato }}</td>
                <td style="font-size: small">{{ px.tento }}</td>
                <td style="font-size: small">{{ px.mapx }}</td>
                <td style="font-size: small">{{ px.tenpx }}</td>
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
                <td style="text-align: center; color: green">
                  <!-- <nuxt-link :to="`/danhmuc/congnhan/${px._id}/manage`">
                    <span class="icon is-small">
                      <i class="far fa-check-circle"></i>
                    </span>
                  </nuxt-link> -->
                  <a @click="updateNhanvien(px)">
                    <span class="icon is-small">
                      <i class="far fa-check-circle"></i>
                    </span>
                  </a>
                </td>
                <!-- <td style="text-align: center">
                  <a @click="onDelete(px)">
                    <span style="color: red" class="icon is-small">
                      <i class="fas fa-times"></i>
                    </span>
                  </a>
                </td> -->
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Modal Add nhân viên -->
        <div class="">
          <div :class="{ 'is-active': isActive }" class="modal">
            <div class="modal-background"></div>
            <div class="modal-content modal-card">
              <section class="modal-card-body">
                <div class="columns">
                  <div class="column">
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
                  </div>
                  <div class="column">
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
                  </div>
                </div>

                <div class="columns">
                  <div class="column">
                    <div class="control has-icons-left">
                      <div class="select is-small is-fullwidth">
                        <select @change="showmapx($event)">
                          <option selected>-- Chọn phân xưởng --</option>
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
                  </div>
                </div>

                <div class="columns">
                  <div class="column">
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
                  </div>
                  <div class="column">
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
                  </div>
                </div>

                <div class="columns">
                  <div class="column">
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
                  </div>
                  <div class="column">
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
                  </div>
                </div>

                <div class="columns">
                  <div class="column">
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
                  </div>
                  <div class="column">
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
                      <div v-if="$v.form.nguoilienhe.$error" class="form-error">
                        <span
                          v-if="!$v.form.nguoilienhe.required"
                          class="help is-danger"
                          >Yêu cầu nhập người liên hệ khi cần gấp</span
                        >
                      </div>
                    </div>
                  </div>
                </div>

                <div class="columns">
                  <div class="column">
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
                  </div>
                  <div class="column">
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
                  </div>
                </div>

                <div class="columns">
                  <div class="column">
                    <label class="label">Chủ tài khoản</label>
                    <div class="control">
                      <input
                        v-model.trim="form.chutaikhoan"
                        class="input is-small"
                        type="text"
                        placeholder="Nhập tên ngân hàng"
                      />
                    </div>
                  </div>
                  <div class="column">
                    <div class="field">
                      <div style="margin-bottom: 10px">
                        <label class="checkbox">
                          <input type="checkbox" v-model.trim="checkGhichu" />
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
                  </div>
                </div>

                <div class="columns" style="margin-top: 10px">
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

        <!-- Modal sửa nhân viên -->
        <div class="">
          <div :class="{ 'is-active': isActive_fix }" class="modal">
            <div class="modal-background"></div>
            <div class="modal-content modal-card">
              <section class="modal-card-body">
                <div v-if="form_update != null">
                  <div class="columns">
                    <div class="column">
                      <div class="field">
                        <label class="label">Mã công nhân</label>
                        <div class="control">
                          <input
                            v-model.trim="form_update.macn"
                            class="input is-small"
                            type="text"
                            disabled
                          />
                        </div>
                      </div>
                    </div>
                    <div class="column">
                      <div class="field">
                        <label class="label">Tên công nhân</label>
                        <div class="control">
                          <input
                            v-model.trim="form_update.tencn"
                            class="input is-small"
                            type="text"
                            placeholder="Nhập tên công nhân"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="columns">
                    <div class="column">
                      <template v-if="form_update.trangthai == true">
                        <span
                          style="
                            font-weight: bold;
                            font-size: small;
                            color: green;
                          "
                          >Đang làm</span
                        >
                      </template>
                      <template v-else>
                        <span
                          style="
                            font-weight: bold;
                            font-size: small;
                            color: red;
                          "
                          >Đã nghỉ</span
                        >
                      </template>
                      &nbsp;
                      <label class="switch" style="vertical-align: middle">
                        <input
                          v-model="form_update.trangthai"
                          type="checkbox"
                        />
                        <span class="slider"></span>
                      </label>
                    </div>
                    <div class="column"></div>
                  </div>

                  <div class="columns">
                    <div class="column">
                      <div class="field">
                        <label class="label">Số điện thoại</label>
                        <div class="control">
                          <input
                            v-model="form_update.sdt"
                            class="input is-small"
                            type="text"
                            placeholder="Nhập tên số điện thoại"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="column">
                      <div class="field">
                        <label class="label">Địa chỉ</label>
                        <div class="control">
                          <input
                            v-model="form_update.diachi"
                            class="input is-small"
                            type="text"
                            placeholder="Nhập địa chỉ"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="columns">
                    <div class="column">
                      <div class="field">
                        <label class="label">Căn cước công dân</label>
                        <div class="control">
                          <input
                            v-model="form_update.cccd"
                            class="input is-small"
                            type="text"
                            placeholder="Nhập CCCD"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="column">
                      <div class="field">
                        <label class="label">Chức vụ</label>
                        <div class="control">
                          <input
                            v-model="form_update.chucvu"
                            class="input is-small"
                            type="text"
                            placeholder="Nhập chức vụ"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="columns">
                    <div class="column">
                      <div class="field">
                        <label class="label">Lương cơ bản</label>
                        <div class="control">
                          <input
                            v-model="form_update.luongcb"
                            class="input is-small"
                            type="text"
                            disabled
                            v-mask="mask"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="column">
                      <div class="field">
                        <label class="label">Người liên hệ khẩn cấp</label>
                        <div class="control">
                          <input
                            v-model="form_update.nguoilienhe"
                            class="input is-small"
                            type="text"
                            placeholder="Nhập thông tin người liên hệ khi cần"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="columns">
                    <div class="column">
                      <div class="field">
                        <label class="label">Số tài khoản</label>
                        <div class="control">
                          <input
                            v-model="form_update.sotknh"
                            class="input is-small"
                            type="text"
                            placeholder="Nhập thông tin số tài khoản (nếu có)"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="column">
                      <div class="field">
                        <label class="label">Tên ngân hàng</label>
                        <div class="control">
                          <input
                            v-model="form_update.tennh"
                            class="input is-small"
                            type="text"
                            placeholder="Nhập tên ngân hàng"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="columns">
                    <div class="column">
                      <label class="label">Chủ tài khoản</label>
                      <div class="control">
                        <input
                          v-model.trim="form_update.chutaikhoan"
                          class="input is-small"
                          type="text"
                          placeholder="Nhập tên ngân hàng"
                        />
                      </div>
                    </div>
                    <div class="column">
                      <div class="field">
                        <label class="checkbox">
                          <input type="checkbox" v-model="checkGhichu" />
                          <span style="font-weight: bold">Ghi chú </span>
                        </label>
                      </div>
                      <div
                        v-if="checkGhichu == true"
                        class="field"
                        style="margin-top: 10px"
                      >
                        <div class="control">
                          <textarea
                            v-model="form_update.ghichu"
                            class="textarea is-small"
                            placeholder="Ghi chú thêm ..."
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="columns" style="margin-top: 10px">
                    <div class="column">
                      <button
                        @click.prevent="onUpdate"
                        class="button is-success is-fullwidth is-small"
                      >
                        Ghi nhận
                      </button>
                    </div>
                    <div class="column">
                      <button
                        @click="isActive_fix = false"
                        class="button is-danger is-light is-fullwidth is-small"
                      >
                        Hủy bỏ
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
      ischoosePx: false,
      ischooseTo: false,
      fitered: [],
      maxuong: "",
      mato: "",
      form: {
        macn: "",
        tencn: "",
        mapx: "",
        tenpx: "",
        sdt: "",
        diachi: "",
        cccd: "",
        mato: "",
        tento: "",
        chucvu: "",
        chucnang: "",
        luongcb: 0,
        nguoilienhe: "",
        sotknh: "",
        chutaikhoan: "",
        tennh: "",
        trangthai: 1,
        ghichu: "",
        luongmem: 0,
        anluongqlsp: 0,
        luongqlsp: 0,
        tyleqlsp: 0,
        ngayhotro: 0,
        tienhotro: 0,
        antrua: 0,
        congdoan: 50000,
        createdAt: "",
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
      isActive_fix: false,
      form_update: null,

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
      this.form.createdAt = date + " " + time;
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
      this.mato = "";
      var name = e.target.options[e.target.options.selectedIndex].text;
      // console.log(name)
      let position = name.split("--");
      let p1 = position[0].trim();
      this.maxuong = p1;
      this.congnhan = await this.$axios.$get(
        `/api/congnhan/allcongnhanpx2trangthai?mapx=${p1}`
      );
      // console.log(this.fitered);
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
      this.mato = p1;
      this.congnhan = await this.$axios.$get(
        `/api/congnhan/allcongnhanto2trangthai?mato=${p1}`
      );
    },

    async updateNhanvien(nhanvien) {
      // console.log(nhanvien);
      this.isActive_fix = true;
      this.form_update = { ...nhanvien };
      // console.log(this.form_update.macn);
    },

    async onAddCongnhan() {
      const result = await Swal.fire({
        title: `Bạn có muốn thêm mới công nhân: ${this.form.tencn}?`,
        showDenyButton: true,
        confirmButtonText: "Có, Thêm mới",
        denyButtonText: `Hủy`,
      });
      if (result.isConfirmed) {
        try {
          this.$v.form.$touch();
          // console.log(this.$auth.$state.user.username);
          // tìm mã công nhân trong bảng công nhân
          const allmacn = await this.$axios.get("/api/congnhan/showallmacn");
          const dscn = allmacn.data;
          const arrayMacn = dscn.map((item) => item.macn);
          // console.log(arrayMacn);
          if (arrayMacn.includes(this.form.macn)) {
            const Toast = Swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 2000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener("mouseenter", Swal.stopTimer);
                toast.addEventListener("mouseleave", Swal.resumeTimer);
              },
            });
            Toast.fire({
              icon: "error",
              title: `Mã công nhân: ${this.form.macn} đã tồn tại trong dữ liệu, nhập vào mã mới`,
            });
          } else {
            // console.log(this.form);
            if (this.form.mapx === "") {
              const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener("mouseenter", Swal.stopTimer);
                  toast.addEventListener("mouseleave", Swal.resumeTimer);
                },
              });
              Toast.fire({
                icon: "error",
                title: `Hãy lựa chọn phân xưởng`,
              });
            } else {
              const tonhom = await this.$axios.$get(
                `/api/phongban/alltoinxuong?mapx=${this.form.mapx}`
              );
              if (tonhom.length > 0 && this.form.mato === "") {
                const Toast = Swal.mixin({
                  toast: true,
                  position: "top-end",
                  showConfirmButton: false,
                  timer: 2000,
                  timerProgressBar: true,
                  didOpen: (toast) => {
                    toast.addEventListener("mouseenter", Swal.stopTimer);
                    toast.addEventListener("mouseleave", Swal.resumeTimer);
                  },
                });
                Toast.fire({
                  icon: "error",
                  title: `Phân xưởng ${this.form.mapx} có tổ, hãy lựa chọn tổ cho công nhân`,
                });
              } else {
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
              }
            }
          }
        } catch (error) {
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener("mouseenter", Swal.stopTimer);
              toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
          });
          Toast.fire({
            icon: "error",
            title: `Có lỗi xảy ra`,
          });
        }
      }
    },

    async onUpdate() {
      const result = await Swal.fire({
        title: `Bạn chắc chắn cập nhật thông tin`,
        showDenyButton: true,
        confirmButtonText: "Chắc chắn",
        denyButtonText: `Hủy`,
      });
      if (result.isConfirmed) {
        try {
          const res = await this.$axios.$patch(
            `/api/congnhan/${this.form_update._id}`,
            this.form_update,
            {}
          );
          // save log
          const log = `Cập nhật thông tin cho công nhân: ${this.form_update.tencn}, Mã: ${this.form_update.macn}, Trạng thái: ${this.form.form_update}`;
          const dataLog = {
            logname: log,
            createdAt: this.form.updatedAt,
            createdBy: this.hisform.createdBy,
          };
          this.$axios.$post(`/api/congnhan/addlognhansu`, dataLog);

          // console.log(res);
          if (res.success == true) {
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

            if (this.maxuong != "" && this.mato == "") {
              this.congnhan = await this.$axios.$get(
                `/api/congnhan/allcongnhanpx2trangthai?mapx=${this.maxuong}`
              );
              this.congnhan = this.congnhan;
              // console.log(this.congnhan);
            } else if (this.maxuong != "" && this.mato != "") {
              this.congnhan = await this.$axios.$get(
                `/api/congnhan/allcongnhanto2trangthai?mato=${this.mato}`
              );
              this.congnhan = this.congnhan;
            } else {
              this.getDmcn();
            }
          }
        } catch (error) {
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener("mouseenter", Swal.stopTimer);
              toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
          });
          Toast.fire({
            icon: "error",
            title: `Có lỗi xảy ra`,
          });
        }
      }
    },

    async onDelete() {
      const result = await Swal.fire({
        title: `Bạn chắc chắn xóa`,
        showDenyButton: true,
        confirmButtonText: "Chắc chắn",
        denyButtonText: `Hủy`,
      });
      if (result.isConfirmed) {
        try {
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
        } catch (error) {
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener("mouseenter", Swal.stopTimer);
              toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
          });
          Toast.fire({
            icon: "error",
            title: `Có lỗi xảy ra`,
          });
        }
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

@media (max-width: 768px) {
  .modal-card {
    width: 90%;
    max-width: 400px;
  }
}

.switch {
  position: relative;
  display: inline-block;
  width: 40px;
  height: 15px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #f14668;
  -webkit-transition: 0.4s;
  transition: 0.4s;
  border-radius: 34px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 7px;
  width: 7px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: green;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196f3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}
</style>
