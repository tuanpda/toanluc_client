<template>
  <div class="columns">
    <div class="column container">
      <br />
      <div class="box" style="margin-left:10px; margin-right:10px;">
        <div class="columns">
          <div class="column is-5">
            <div class="control">
              <span class="icon is-small is-left">
                <i style="color: #f14668" class="fab fa-audible"></i>
              </span>
              Cập nhật phiếu lô sản xuất
            </div>
          </div>
          <div class="column" style="text-align: right">
            <input
              v-model="malosx"
              type="text"
              class="input is-small"
              placeholder="Nhập vào mã lô sản xuất"
            />
          </div>
          <div class="column" style="text-align: right">
            <button
              @click="get_phieulo()"
              class="button is-warning is-fullwidth is-small"
            >
              <span class="icon is-small">
                <i class="far fa-clipboard"></i>
              </span>
              <span>Xem phiếu</span>
            </button>
          </div>
          <div class="column" style="text-align: right">
            <button
              @click="onAddLuongcongnhan"
              class="button is-success is-fullwidth is-small"
            >
              <span class="icon is-small">
                <i class="fas fa-pen-fancy"></i>
              </span>
              <span>Cập nhật phiếu lô</span>
            </button>
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

        <div class="table_wrapper">
          <table class="table is-responsive is-bordered is-narrow is-fullwidth">
            <tr style="background-color: #fffaeb;">
              <td>
                <div class="control has-icons-left">
                  <div class="select is-small">
                    <select @change="showMalokehoach($event)">
                      <option selected disabled>-- Chọn phân xưởng --</option>
                      <option v-for="item in phanxuong" :value="item.mapx">
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
                  <div class="select is-small">
                    <select @change="loadInfoLosx($event)">
                      <option value="abc" selected
                        >-- Chọn mã lô sản xuất --</option
                      >
                      <option v-for="item in ds_lokh" :value="item.malosx">
                        {{ item.malosx }}
                      </option>
                    </select>
                  </div>
                  <span class="icon is-small is-left">
                    <i style="color: #48c78e" class="fa fa-clipboard"></i>
                  </span>
                </div>
              </td>
            </tr>
          </table>
        </div>
        <div class="table_wrapper">
          <table class="table is-responsive is-bordered is-narrow is-fullwidth">
            <tr>
              <td
                colspan="6"
                style="font-size: small; font-weight: bold; background-color: #eff1fa;"
              >
                LÔ KẾ HOẠCH
              </td>
            </tr>
            <tr>
              <td rowspan="5" style="width: 10%; text-align: center;">
                <label style="font-weight: bold; color: #f14668;">{{
                  form.mapx
                }}</label>
                <br />
                <span
                  style="text-align: center; font-size: small; font-weight: bold;"
                  >{{ form.tenpx }}</span
                >
              </td>
              <td
                style="text-align: center; font-size: small; font-weight: bold;"
              >
                Mã lô KH
              </td>
              <td
                style="text-align: center; font-size: small; font-weight: bold;"
              >
                Ngày bắt đầu
              </td>
              <td
                style="text-align: center; font-size: small; font-weight: bold;"
              >
                Ngày kết thúc
              </td>
              <td
                style="text-align: center; font-size: small; font-weight: bold;"
              >
                SL đặt hàng
              </td>
              <td
                style="text-align: center; font-size: small; font-weight: bold;"
              >
                SL sản xuất
              </td>
            </tr>
            <tr></tr>
            <tr>
              <td style="text-align: center;">
                <label style="font-size: small;">{{ form.makh }}</label>
              </td>
              <td style="text-align: center;">
                <label style="font-size: small;">{{
                  form.ngaybd | formatDate
                }}</label>
              </td>
              <td style="text-align: center;">
                <label style="font-size: small;">{{
                  form.ngaykt | formatDate
                }}</label>
              </td>
              <td style="text-align: center;">
                <label style="font-size: small;">{{
                  form.sldathang | formatNumber
                }}</label>
              </td>
              <td style="text-align: center;">
                <label style="font-size: small;">{{
                  form.slsanxuat | formatNumber
                }}</label>
              </td>
            </tr>
            <tr>
              <td
                style="text-align: center; font-size: small; font-weight: bold;"
              >
                Mã sản phẩm
              </td>
              <td
                colspan="2"
                style="text-align: center; font-size: small; font-weight: bold;"
              >
                Tên sản phẩm
              </td>
              <td
                style="text-align: center; font-size: small; font-weight: bold;"
              >
                Số lượng
              </td>
              <td
                style="text-align: center; font-size: small; font-weight: bold;"
              >
                Nhóm lương
              </td>
            </tr>
            <tr>
              <td style="font-size: small; text-align: center;">
                {{ form.masp }}
              </td>
              <td colspan="2" style="font-size: small;">{{ form.tensp }}</td>
              <td style="font-size: small; text-align: center;">
                {{ form.soluong | formatNumber }}
              </td>
              <td style="font-size: small; text-align: center;">
                {{ form.nhomluong }}
              </td>
            </tr>
            <tr>
              <td
                colspan="6"
                style="font-size: small; font-weight: bold; background-color: #eff1fa;"
              >
                <div class="columns">
                  <div class="column">
                    <template v-if="get_lo.length > 0">
                      <span
                        v-if="form.status == false"
                        class="icon is-small is-left"
                      >
                        <i style="color: #ffd863" class="fa fa-circle"></i>
                      </span>
                      <span v-else class="icon is-small is-left">
                        <i style="color: #00947e" class="fa fa-circle"></i>
                      </span>
                    </template>
                    LÔ SẢN XUẤT
                  </div>
                  <div class="column is-2">
                    <label class="checkbox">
                      <input type="checkbox" v-model="form.status" />
                      Chốt phiếu
                    </label>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td
                rowspan="4"
                style="text-align: center; font-size: small; font-weight: bold; color: #ea4aaa;"
              >
                {{ form.malosx }}
              </td>
              <td
                style="text-align: center; font-size: small; font-weight: bold;"
              >
                SL sản xuất
              </td>
              <td
                style="text-align: center; font-size: small; font-weight: bold"
              >
                SL thực tế sx
              </td>
              <td
                style="text-align: center; font-size: small; font-weight: bold;"
              >
                Thời gian bắt đầu
              </td>
              <td
                style="text-align: center; font-size: small; font-weight: bold;"
              >
                Thời gian kết thúc
              </td>
              <td
                style="text-align: center; font-size: small; font-weight: bold;"
              >
                Ngày tạo
              </td>
            </tr>
            <tr>
              <td style="text-align: center; font-size: small;">
                {{ form.soluonglsx }}
              </td>
              <td style="text-align: center; font-size: small;">
                <input
                  v-model.trim="form.slthuctetaixuong"
                  type="text"
                  placeholder="SL thực tế"
                  class="input is-small"
                />
              </td>
              <td style="text-align: center; font-size: small;">
                {{ form.startday | formatDate }}
              </td>
              <td style="text-align: center; font-size: small;">
                <input
                  v-model="form.stopday"
                  type="date"
                  class="input is-small"
                />
              </td>

              <td style="text-align: center; font-size: small;">
                {{ form.createdAt | formatDate }}
              </td>
            </tr>
            <tr>
              <td
                style="text-align: center; font-size: small; font-weight: bold;"
              >
                Tổng đạt
              </td>
              <td
                style="text-align: center; font-size: small; font-weight: bold;"
              >
                Tổng hỏng
              </td>
              <td
                colspan="3"
                style="font-size: small; font-weight: bold; color: red"
              >
                Ghi chú
                <label class="checkbox">
                  <input type="checkbox" v-model="checkGhichu" />
                </label>
              </td>
            </tr>
            <tr>
              <td>
                <input
                  v-model.trim="form.tongdat"
                  type="text"
                  class="input is-small"
                />
              </td>
              <td>
                <input
                  v-model.trim="form.tonghong"
                  type="text"
                  class="input is-small"
                />
              </td>
              <td colspan="3">
                <div v-if="checkGhichu == true" class="field">
                  <div class="control">
                    <textarea
                      v-model.trim="form.ghichu"
                      class="textarea is-small"
                      placeholder="Ghi chú diễn giải thêm"
                    ></textarea>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td
                colspan="6"
                style="font-size: small; font-weight: bold; background-color: #eff1fa;"
              >
                Danh sách chấm lương công đoạn của lô sản xuất
              </td>
            </tr>
          </table>
        </div>
        <div class="table_wrapper">
          <table class="table is-responsive is-bordered is-narrow is-fullwidth">
            <tr>
              <td
                style="text-align: center; font-size: small; font-weight: bold;"
              >
                STT
              </td>
              <td
                style="text-align: center; font-size: small; font-weight: bold;"
              >
                Nguyên công
              </td>
              <td
                style="text-align: center; font-size: small; font-weight: bold;"
              >
                Máy
              </td>
              <td
                style="text-align: center; font-size: small; font-weight: bold;"
              >
                Người thực hiện
              </td>
              <td
                style="text-align: center; font-size: small; font-weight: bold;"
              >
                Số đạt
              </td>
              <td
                style="text-align: center; font-size: small; font-weight: bold;"
              >
                Số hỏng
              </td>
              <td
                style="text-align: center; font-size: small; font-weight: bold;"
              >
                Ghi chú
              </td>
              <td
                style="text-align: center; font-size: small; font-weight: bold;"
              >
                Cập nhật
              </td>
              <td
                style="text-align: center; font-size: small; font-weight: bold;"
              >
                Xóa
              </td>
            </tr>

            <tr v-for="(cd, indexcd) in congdoan" :key="indexcd">
              <td style="text-align: center; font-size: small;">
                {{ indexcd + 1 }}
              </td>
              <td style="text-align: center; font-size: small;">
                {{ cd.nguyencong }}
              </td>
              <td style="text-align: center; font-size: small;">
                {{ cd.may }}
              </td>
              <td style="font-size: small;">
                {{ cd.tencn }}
              </td>
              <td style="text-align: center; font-size: small; width: 7%">
                <input class="input is-small" v-model.trim="cd.sodat" />
              </td>
              <td style="text-align: center; font-size: small; width: 7%">
                <input class="input is-small" v-model.trim="cd.sohong" />
              </td>
              <td style="text-align: center; font-size: small;">
                <input class="input is-small" v-model.trim="cd.ghichu" />
              </td>
              <td style="text-align: center; font-size: small;">
                <a @click="onUpdateCd(cd._id, cd.sodat, cd.sohong, cd.ghichu)">
                  <span style="color: green" class="icon is-small">
                    <i class="far fa-check-circle"></i>
                  </span>
                </a>
              </td>
              <td style="text-align: center; font-size: small;">
                <a @click="onDelete(cd._id)">
                  <span style="color: red" class="icon is-small">
                    <i class="fas fa-times"></i>
                  </span>
                </a>
              </td>
            </tr>

            <tr>
              <td colspan="9" style="font-size: small; font-weight: bold;">
                <div class="columns">
                  <div class="column is-2">
                    <button
                      @click="addCongdoan()"
                      class="button is-small is-info"
                    >
                      Thêm công đoạn
                    </button>
                  </div>
                  <div class="column is-3">
                    <label class="checkbox">
                      <input type="checkbox" v-model="checkVersion" />
                      Thay đổi phiên bản lương
                    </label>
                  </div>
                  <div class="column">
                    <div v-if="checkVersion == true" class="select is-small">
                      <select
                        v-model="version"
                        @change="
                          chooseVersion($event, $event.target.selectedIndex)
                        "
                      >
                        <option
                          v-for="(item, index) in dmvision"
                          :key="index + 'ss'"
                          :value="item.version"
                        >
                          {{ item.version }}
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
              </td>
            </tr>

            <tr
              v-if="iscongdoan == 1"
              v-for="(item, index) in items"
              :key="index + 'cm-a'"
            >
              <td
                style="text-align: center; font-size: small; font-weight: bold;"
              >
                {{ index + 1 }}
              </td>
              <td>
                <div class="select is-small is-fullwidth">
                  <select
                    v-model="item.nguyencong"
                    @change="
                      getDongia($event, $event.target.selectedIndex, index)
                    "
                  >
                    <option
                      v-for="(item, indexdmnc) in dmnguyencong"
                      :key="indexdmnc"
                      :value="item.nc"
                    >
                      {{ item.nc }} -- {{ item.diengiai }} -- {{ item.dongia }}
                    </option>
                  </select>
                </div>
              </td>
              <td>
                <input type="text" v-model="item.may" class="input is-small" />
              </td>
              <td>
                <div class="select is-small is-fullwidth">
                  <select
                    v-model="item.congnhan"
                    @change="
                      getTencn($event, $event.target.selectedIndex, index)
                    "
                  >
                    <option v-for="item in cong_nhan" :value="item.macn">
                      {{ item.tencn }}
                    </option>
                  </select>
                </div>
              </td>
              <td>
                <input
                  type="text"
                  v-model="item.sodat"
                  class="input is-small"
                />
              </td>
              <td>
                <input
                  type="text"
                  v-model="item.sohong"
                  class="input is-small"
                />
              </td>
              <td><input type="text" class="input is-small" /></td>
              <td style="text-align:center;">
                <button
                  @click="AddItem(index)"
                  class="button is-small is-success"
                >
                  Thêm
                </button>
              </td>
              <td style="text-align:center;">
                <button
                  @click="deleteRow(index)"
                  class="button is-small is-danger"
                >
                  Xóa
                </button>
              </td>
            </tr>
            <tr>
              <td
                style="text-align: center; font-size: small; font-weight: bold;"
              >
                Công nhật
              </td>
              <td></td>
              <td
                style="text-align: center; font-size: small; font-weight: bold;"
              >
                Tên công
              </td>
              <td
                style="text-align: center; font-size: small; font-weight: bold;"
              >
                Người thực hiện
              </td>
              <td
                style="text-align: center; font-size: small; font-weight: bold;"
              >
                Số giờ
              </td>
              <td></td>
              <td
                style="text-align: center; font-size: small; font-weight: bold;"
              >
                Ghi chú
              </td>
              <td
                style="text-align: center; font-size: small; font-weight: bold;"
              >
                Cập nhật
              </td>
              <td
                style="text-align: center; font-size: small; font-weight: bold;"
              >
                Xóa
              </td>
            </tr>
            <tr
              v-if="congnhat.length > 0"
              v-for="(cn, index) in congnhat"
              :key="index + 'z'"
            >
              <td style="text-align: center; font-size: small">
                {{ index + 1 }}
              </td>
              <td></td>
              <td style="font-size: small;">{{ cn.tencongnhat }}</td>
              <td style="font-size: small;">{{ cn.nguoithuchien }}</td>
              <td style="text-align: center; font-size: small">
                <input class="input is-small" v-model.trim="cn.sogiocong" />
              </td>
              <td></td>
              <td><input class="input is-small" v-model.trim="cn.ghichu" /></td>
              <td style="text-align: center; font-size: small;">
                <a @click="onUpdateCn(cn._id, cn.sogiocong, cn.ghichu)">
                  <span style="color: green" class="icon is-small">
                    <i class="far fa-check-circle"></i>
                  </span>
                </a>
              </td>
              <td style="text-align: center; font-size: small;">
                <a @click="onDeleteCn(cn._id)">
                  <span style="color: red" class="icon is-small">
                    <i class="fas fa-times"></i>
                  </span>
                </a>
              </td>
            </tr>
            <tr>
              <td colspan="9">
                <button @click="addCongnhat()" class="button is-small is-info">
                  Thêm công nhật
                </button>
              </td>
            </tr>
            <tr
              v-if="iscongnhat == 1"
              v-for="(item, index) in items_cn"
              :key="index + 'cm-b'"
            >
              <td
                style="text-align: center; font-size: small; font-weight: bold;"
              >
                {{ index + 1 }}
              </td>
              <td></td>
              <td>
                <div class="select is-small is-fullwidth">
                  <select
                    v-model="item.macongnhat"
                    @change="
                      getCongnhat($event, $event.target.selectedIndex, index)
                    "
                  >
                    <option v-for="item in dmcongnhat" :value="item.macn">
                      {{ item.tencn }}
                    </option>
                  </select>
                </div>
              </td>
              <td>
                <div class="select is-small is-fullwidth">
                  <select
                    v-model="item.macongnhan"
                    @change="
                      getTencnCN($event, $event.target.selectedIndex, index)
                    "
                  >
                    <option v-for="item in cong_nhan" :value="item.macn">
                      {{ item.tencn }}
                    </option>
                  </select>
                </div>
              </td>
              <td>
                <input
                  v-model="item.sogiocong"
                  type="text"
                  class="input is-small"
                />
              </td>
              <td></td>
              <td></td>
              <td style="text-align: center; font-size: small;">
                <button
                  @click="AddItemCN(index)"
                  class="button is-small is-success"
                >
                  Thêm
                </button>
              </td>
              <td style="text-align: center; font-size: small;">
                <button
                  @click="deleteRowCn(index)"
                  class="button is-small is-danger"
                >
                  Xóa
                </button>
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
  middleware: "auth",
  components: {
    Multiselect,
  },
  data() {
    return {
      ds_lokh: [],
      get_lo: [],
      phanxuong: [],
      dmnguyencong: [],
      dmvision: [],
      cong_nhan: [],
      congdoan: [],
      dmcongnhat: [],
      congnhat: [],
      malosx: "",
      namlsx: "",
      makehoach: "",

      selectedIndex: 0,
      dongia_ns: "abc",
      malokh: null,
      checkChotphieu: false,

      iscongdoan: 0,
      iscongnhat: 0,
      version: "",
      tableName: [],

      mapx: "",
      tenpx: "",
      malosx: "",
      checkVersion: false,
      checkGhichu: false,
      form: {
        mapx: "",
        tenpx: "",
        makh: "",
        ngaybd: "",
        ngaykt: "",
        sldathang: "",
        slsanxuat: "",
        masp: "",
        tensp: "",
        soluong: "",
        nhomluong: "",
        malosx: "",
        soluonglsx: "",
        slthuctetaixuong: "",
        startday: "",
        stopday: "",
        ghichu: "",
        createdAt: "",
        createBy: this.$auth.$state.user.username,
        status: 0,
        tongdat: "",
        tonghong: "",
      },
      items: [
        {
          malosx: "",
          nguyencong: "",
          may: 0,
          congnhan: "",
          sodat: "",
          sohong: "",
          ghichu: "",
          masp: "",
          dongia: this.dongia_ns,
          tencn: "",
        },
      ],
      items_cn: [
        {
          malosx: this.malosx,
          macongnhat: "",
          tencongnhat: "",
          macongnhan: "",
          nguoithuchien: "",
          sogiocong: "",
          dongia: "",
          ghichu: "",
        },
      ],
    };
  },

  mounted() {
    this.currentDateTime();
    this.getPhanxuong();
    this.deleteRow(0);
    this.deleteRowCn(0);
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
      this.namlsx = current.getFullYear();
      this.form.createdAt = current.getFullYear();
    },

    AddItem(index) {
      if (
        this.items[index].nguyencong == "" ||
        this.items[index].congnhan == ""
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
          title: "Nhập đủ thông tin trên dòng trước khi thêm dòng mới !!!",
        });
      } else {
        this.items.push({
          malosx: this.malosx,
          nguyencong: "",
          may: "",
          congnhan: "",
          sodat: "",
          sohong: "",
          ghichu: "",
          dongia: this.dongia_ns,
          tencn: "",
        });
      }
    },

    AddItemCN(index) {
      // console.log(index);
      if (
        this.items_cn[index].macongnhan == "" ||
        this.items_cn[index].tencongnhat == "" ||
        this.items_cn[index].macongnhan == "" ||
        this.items_cn[index].nguoithuchien == "" ||
        this.items_cn[index].sogiocong == ""
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
          title: "Nhập đủ thông tin trên dòng trước khi thêm dòng mới !!!",
        });
      } else {
        this.items_cn.push({
          malosx: this.malosx,
          macongnhat: "",
          tencongnhat: "",
          macongnhan: "",
          nguoithuchien: "",
          sogiocong: "",
          ghichu: "",
        });
      }
      ``;
    },

    async addCongdoan() {
      this.iscongdoan = 1;
      // if (this.checkVersion == false) {
      //   this.dmnguyencong = await this.$axios.$get(
      //     `/api/phongban/getnguyencong?khsp=${this.form.nhomluong}`
      //   );
      // }
      this.items.push({
        malosx: this.malosx,
        nguyencong: "",
        may: "",
        congnhan: "",
        sodat: "",
        sohong: "",
        ghichu: "",
        dongia: this.dongia_ns,
        tencn: "",
      });
    },

    addCongnhat() {
      this.items_cn.push({
        malosx: "",
        macongnhat: "",
        tencongnhat: "",
        macongnhan: "",
        nguoithuchien: "",
        sogiocong: "",
        ghichu: "",
      });
    },

    deleteRow(index) {
      this.items.splice(index, 1);
    },

    deleteRowCn(index) {
      this.items_cn.splice(index, 1);
    },

    async getPhanxuong() {
      this.phanxuong = await this.$axios.$get(`/api/phongban/allphanxuong`);
    },

    // change click vào select phân xưởng
    async showMalokehoach(e) {
      // console.log(this.mapx)
      var name = e.target.options[e.target.options.selectedIndex].text;
      // console.log(name)
      let position = name.split("--");
      this.mapx = position[0].trim();
      this.tenpx = position[1].trim();
      this.ds_lokh = await this.$axios.$get(
        `/api/ketoan/getallmalsxpx?mapx=${this.mapx}`
      );
      this.cong_nhan = await this.$axios.$get(
        `/api/congnhan/allcongnhanpx?mapx=${this.mapx}`
      );
    },

    // change click vào select mã lô sản xuất
    async loadInfoLosx(e) {
      // console.log(this.mapx)
      var name = e.target.options[e.target.options.selectedIndex].text;
      // console.log(name)
      let position = name;
      this.malosx = name;
      // console.log(this.malosx)
      this.get_lo = await this.$axios.$get(
        `/api/ketoan/getonemalosx?malosx=${this.malosx}`
      );
      if (this.get_lo.length > 0) {
        // console.log(this.get_lo)
        this.form.mapx = this.get_lo[0].mapx;
        this.form.tenpx = this.get_lo[0].tenpx;
        this.form.makh = this.get_lo[0].makh;
        this.form.ngaybd = this.get_lo[0].ngaybd;
        this.form.ngaykt = this.get_lo[0].ngaykt;
        this.form.sldathang = this.get_lo[0].sldathang;
        this.form.slsanxuat = this.get_lo[0].slsanxuat;
        this.form.masp = this.get_lo[0].masp;
        this.form.tensp = this.get_lo[0].tensp;
        this.form.soluong = this.get_lo[0].soluong;
        this.form.nhomluong = this.get_lo[0].nhomluong;
        this.form.malosx = this.get_lo[0].malosx;
        this.form.soluonglsx = this.get_lo[0].soluonglsx;
        this.form.slthuctetaixuong = this.get_lo[0].slthuctetaixuong;
        this.form.startday = this.get_lo[0].startday;
        this.form.stopday = this.get_lo[0].stopday;
        this.form.ghichu = this.get_lo[0].ghichu;
        this.form.createdAt = this.get_lo[0].createdAt;
        this.form.createdBy = this.get_lo[0].createdBy;
        this.form.status = this.get_lo[0].status;
        this.form.tongdat = this.get_lo[0].tongdat;
        this.form.tonghong = this.get_lo[0].tonghong;
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
          icon: "warning",
          title: "Không tìm thấy dữ liệu",
        });
      }
      this.congdoan = await this.$axios.$get(
        `/api/ketoan/getphieulocongdoan?malosx=${this.malosx}`
      );
      this.dmcongnhat = await this.$axios.$get(`/api/ketoan/alldmcongnhat`);
      this.congnhat = await this.$axios.$get(
        `/api/ketoan/getphieulocongnhat?malosx=${this.form.malosx}`
      );
      this.dmvision = await this.$axios.$get(`/api/nguyencong/getversion`);
    },

    getDongia(event, selectedIndex, index) {
      this.selectedIndex = selectedIndex;
      // console.log(index)
      for (let i = 0; i < this.items.length; i++) {
        if (i == index) {
          this.items[i].dongia = this.dmnguyencong[this.selectedIndex].dongia;
          this.items[i].malosx = this.malosx;
        }
      }
    },

    getTencn(event, selectedIndex, index) {
      this.selectedIndex = selectedIndex;
      for (let i = 0; i < this.items.length; i++) {
        if (i == index) {
          this.items[i].tencn = this.cong_nhan[this.selectedIndex].tencn;
        }
      }
    },

    getTencnCN(event, selectedIndex, index) {
      this.selectedIndex = selectedIndex;
      for (let i = 0; i < this.items_cn.length; i++) {
        if (i == index) {
          this.items_cn[i].malosx = this.malosx;
          this.items_cn[i].nguoithuchien = this.cong_nhan[
            this.selectedIndex
          ].tencn;
        }
      }
      // console.log(this.items_cn)
    },

    getCongnhat(event, selectedIndex, index) {
      this.selectedIndex = selectedIndex;
      for (let i = 0; i < this.items_cn.length; i++) {
        if (i == index) {
          this.items_cn[i].tencongnhat = this.dmcongnhat[
            this.selectedIndex
          ].tencn;
          this.items_cn[i].dongia = this.dmcongnhat[this.selectedIndex].dongia;
        }
      }
      // console.log(this.items_cn)
    },

    // chọn phiên bản lương
    async chooseVersion(event, selectedIndex) {
      this.tableName.push({
        tbl: this.version,
      });
      this.dmnguyencong = await this.$axios.$post(
        `/api/nguyencong/chonphienban?khsp=${this.form.nhomluong}`,
        this.tableName
      );
      // console.log(this.dmnguyencong);
    },

    async get_phieulo() {
      this.get_lo = await this.$axios.$get(
        `/api/ketoan/getonemalosx?malosx=${this.malosx}`
      );
      // console.log(this.get_lo);
      if (this.get_lo.length > 0) {
        this.form.mapx = this.get_lo[0].mapx;
        this.form.tenpx = this.get_lo[0].tenpx;
        this.form.makh = this.get_lo[0].makh;
        this.form.ngaybd = this.get_lo[0].ngaybd;
        this.form.ngaykt = this.get_lo[0].ngaykt;
        this.form.sldathang = this.get_lo[0].sldathang;
        this.form.slsanxuat = this.get_lo[0].slsanxuat;
        this.form.masp = this.get_lo[0].masp;
        this.form.tensp = this.get_lo[0].tensp;
        this.form.soluong = this.get_lo[0].soluong;
        this.form.nhomluong = this.get_lo[0].nhomluong;
        this.form.malosx = this.get_lo[0].malosx;
        this.form.soluonglsx = this.get_lo[0].soluonglsx;
        this.form.slthuctetaixuong = this.get_lo[0].slthuctetaixuong;
        this.form.startday = this.get_lo[0].startday;
        this.form.stopday = this.get_lo[0].stopday;
        this.form.ghichu = this.get_lo[0].ghichu;
        this.form.createdAt = this.get_lo[0].createdAt;
        this.form.createdBy = this.get_lo[0].createdBy;
        this.form.status = this.get_lo[0].status;
        this.form.tongdat = this.get_lo[0].tongdat;
        this.form.tonghong = this.get_lo[0].tonghong;
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
          icon: "success",
          title: "Không tìm thấy phiếu lô",
        });
      }
      this.congdoan = await this.$axios.$get(
        `/api/ketoan/getphieulocongdoan?malosx=${this.malosx}`
      );
      this.dmcongnhat = await this.$axios.$get(`/api/ketoan/alldmcongnhat`);
      this.congnhat = await this.$axios.$get(
        `/api/ketoan/getphieulocongnhat?malosx=${this.form.malosx}`
      );
      this.dmvision = await this.$axios.$get(`/api/nguyencong/getversion`);
    },

    onAddLuongcongnhan() {
      Swal.fire({
        title: "Chắc chắn cập nhật thông tin lô sản xuất này?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Chắc chắn",
      }).then((result) => {
        if (result.isConfirmed) {
          try {
            // cập nhật thông tin lô sản xuất
            // this.$axios.$patch(
            //   `/api/ketoan/updatelsx/${this.get_lo[0]._id}`,
            //   this.form
            // );
            // console.log(this.items)
            // 1. Thêm 1 công đoạn
            for (let i = 0; i < this.items.length; i++) {
              if (
                this.items[i].nguyencong == "" ||
                this.items[i].congnhan == ""
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
                  title: "Không được để trống dữ liệu trên dòng nhập !!!",
                });
              }
              // else {
              //   // Nếu chưa chốt đơn thì status trong luongcongnhan = 0
              //   // Nếu chốt rồi thì status trong luongcongnhan = 1
              //   if (this.form.status == false) {
              //     this.items[i].status = 0;
              //   } else {
              //     this.items[i].status = 1;
              //   }
              //   // Nếu có ngày chốt thì sẽ ghi ngày chốt vào
              //   this.items[i].stopday_losx = this.form.stopday;
              //   this.$axios.$post(
              //     "/api/ketoan/addluongcongdoan",
              //     this.items[i]
              //   );
              //   const Toast = Swal.mixin({
              //     toast: true,
              //     position: "top-end",
              //     showConfirmButton: false,
              //     timer: 3000,
              //     timerProgressBar: true,
              //     didOpen: (toast) => {
              //       toast.addEventListener("mouseenter", Swal.stopTimer);
              //       toast.addEventListener("mouseleave", Swal.resumeTimer);
              //     },
              //   });
              //   Toast.fire({
              //     icon: "success",
              //     title: "Cập nhật phiếu lô sản xuất",
              //   });
              // }
            }

            let turn = 1;
            let length = this.items.length;
            while (turn <= length) {
              this.deleteRow(this.items.length - turn);
              turn += 1;
            }

            // 2. Cập nhật status các công đoạn trong phiếu
            // console.log(this.congdoan);
            // for (let i = 0; i < this.congdoan.length; i++) {
            //   if (this.form.status == false) {
            //     this.congdoan[i].status = 0;
            //   } else {
            //     this.congdoan[i].status = 1;
            //   }
            //   this.congdoan[i].stopday_losx = this.form.stopday;
            //   this.$axios.$patch(
            //     `/api/ketoan/updatestatusluongcongdoan/${this.congdoan[i]._id}`,
            //     this.congdoan[i]
            //   );
            //   // console.log(this.congdoan[i])
            // }

            for (let i = 0; i < this.items_cn.length; i++) {
              if (
                this.items_cn[i].macongnhan == "" ||
                this.items_cn[i].tencongnhat == "" ||
                this.items_cn[i].macongnhan == "" ||
                this.items_cn[i].nguoithuchien == "" ||
                this.items_cn[i].sogiocong == ""
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
                  title: "Không được để trống dữ liệu trên dòng nhập !!!",
                });
              } else {
                this.$axios.$post("/api/ketoan/addcongnhat", this.items_cn[i]);
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
                  title: "Cập nhật phiếu lô sản xuất",
                });
              }
            }

            let turncn = 1;
            let lengthcn = this.items_cn.length;
            while (turncn <= lengthcn) {
              this.deleteRowCn(this.items_cn.length - turncn);
              turncn += 1;
            }

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
              title: "Cập nhật lô sản xuất thành công",
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

    async onUpdateCd(id, sodat, sohong, ghichu) {
      // console.log(sodat, sohong, id)
      let data = {
        sodat: sodat.trim(),
        sohong: sohong.trim(),
        ghichu: ghichu.trim(),
      };
      // console.log(data)
      this.$axios.$patch(`/api/ketoan/updateluongcongdoan/${id}`, data);
    },

    async onUpdateCn(id, sogiocong, ghichu) {
      // console.log(sodat, sohong, id)
      let data = {
        sogiocong: sogiocong.trim(),
        ghichu: ghichu.trim(),
      };
      // console.log(data)
      this.$axios.$patch(`/api/ketoan/updateluongcongnhat/${id}`, data);
    },

    onDelete(id) {
      swal({
        title: "Bạn muốn xóa công này?",
        text: "Công này sẽ không lấy lại được sau khi xóa!",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          this.$axios.$delete(`/api/lokehoach/luongcongnhan/${id}`);
          swal("Xóa thành công, F5 lại trang để thay đổi dữ liệu", {
            icon: "success",
          });
        } else {
          swal("Bạn đã hủy xóa");
        }
      });
    },

    onDeleteCn(id) {
      swal({
        title: "Bạn muốn xóa công nhật này?",
        text: "Công nhật này sẽ không lấy lại được sau khi xóa!",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          this.$axios.$delete(`/api/ketoan/congnhat/${id}`);
          swal("Xóa thành công, F5 lại trang để thay đổi dữ liệu", {
            icon: "success",
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
