<template>
  <div class="columns">
    <div class="column">
      <br />
      <div class="box" style="margin-right:30px; margin-left:30px;">
        <div class="columns">
          <div class="column is-4">
            <div class="control">
              <span class="icon is-small is-left">
                <i style="color: #ff55acee" class="fab fa-cc-mastercard"></i>
              </span>
              <span style="color: #3850b7; font-size: 14px; font-weight: bold;">Lập lương tháng</span>
            </div>
          </div>
          <div class="column is-3"></div>
          <div class="column"></div>
        </div>

        <div class="columns">
          <div class="column" style="text-align: right">
            <div class="control has-icons-left">
              <div class="select is-small">
                <select @change="getWithPX($event)">
                  <option selected>-- Chọn phân xưởng --</option>
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
                  <option selected>-- Chọn tổ --</option>
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
        <div class="columns">
          <div class="column" style="">
            <div class="select is-small">
              <select id="" @change="onChange_Thang($event)">
                <option selected>-- Chọn tháng --</option>
                <option value="01">Tháng 1</option>
                <option value="02">Tháng 2</option>
                <option value="03">Tháng 3</option>
                <option value="04">Tháng 4</option>
                <option value="05">Tháng 5</option>
                <option value="06">Tháng 6</option>
                <option value="07">Tháng 7</option>
                <option value="08">Tháng 8</option>
                <option value="09">Tháng 9</option>
                <option value="10">Tháng 10</option>
                <option value="11">Tháng 11</option>
                <option value="12">Tháng 12</option>
              </select>
            </div>
            <div class="select is-small">
              <select id="" @change="onChange_Nam($event)">
                <option selected>-- Chọn năm --</option>
                <option value="2022">Tháng 2022</option>
                <option value="2023">Tháng 2023</option>
                <option value="2024">Tháng 2024</option>
                <option value="2025">Tháng 2025</option>
                <option value="2026">Tháng 2026</option>
                <option value="2027">Tháng 2027</option>
                <option value="2028">Tháng 2028</option>
                <option value="2029">Tháng 2029</option>
                <option value="2030">Tháng 2030</option>
                <option value="2031">Tháng 2031</option>
                <option value="2032">Tháng 2032</option>
                <option value="2033">Tháng 2033</option>
              </select>
            </div>
            <button @click="getallPhieulsx" class="button is-success is-small">
              <span class="icon is-small">
                <i class="fas fa-inbox"></i>
              </span>
              <span>Xem phiếu lô tính lương</span>
            </button>
            <button @click="getDsluong" class="button is-info is-small">
              <span class="icon is-small">
                <i class="fas fa-pen-fancy"></i>
              </span>
              <span>Lấy số liệu lương</span>
            </button>
            <button @click="onAddLuongthang" class="button is-danger is-small">
              <span class="icon is-small">
                <i class="fas fa-signature"></i>
              </span>
              <span>Chốt và lưu lương</span>
            </button>
          </div>
        </div>
        <div class="columns" style="margin-top:1px;">
          <div class="table_wrapper table-height">
            <table class="
                      table
                      is-bordered is-striped is-narrow is-hoverable is-fullwidth
                    ">
              <tr>
                <td style="font-size:small; font-weight: bold;">
                  Công ty cổ phần Toàn Lực
                </td>
              </tr>
              <tr>
                <td style="text-align: center; font-size:larger; font-weight: bold;">
                  <template v-if="mato == ''">
                    BẢNG LƯƠNG
                    <span style="text-transform: uppercase;">{{
                      this.tenxuong
                    }}</span>
                    THÁNG {{ thang }} NĂM {{ nam }}
                  </template>
                  <template v-else>
                    BẢNG LƯƠNG
                    <span style="text-transform: uppercase;">{{
                      this.tento
                    }}</span>
                    THÁNG {{ thang }} NĂM {{ nam }}
                  </template>
                </td>
              </tr>
            </table>

            <table class="
                      table
                      is-bordered is-striped is-narrow is-hoverable is-fullwidth
                    ">
              <tr style="background-color: #fffaeb;">
                <td rowspan="2" style="text-align: center; font-weight: bold; font-size:small;">
                  <input type="checkbox" v-model="selectAll" />
                </td>
                <td rowspan="2" style="text-align: center; font-size:small; font-weight: bold;">
                  STT
                </td>
                <td rowspan="2" style="text-align: center; font-size:small; font-weight: bold;">
                  Mã CN
                </td>
                <td rowspan="2" style="text-align: center; font-size:small; font-weight: bold;">
                  Tên công nhân
                </td>
                <!-- <td rowspan="2" style="text-align: center; font-size:small; font-weight: bold;">
                  CV
                </td> -->
                <!-- <td rowspan="2" style="text-align: center; font-size:small; font-weight: bold;">
                  Lương cơ bản
                </td> -->
                <td rowspan="2" style="text-align: center; font-size:small; font-weight: bold; width: 8%;">
                  Lương QLSP
                </td>
                <td rowspan="2" style="text-align: center; font-size:small; font-weight: bold; width: 6%;">
                  Lương công đoạn
                </td>
                <td rowspan="2" style="text-align: center; font-size:small; font-weight: bold;">
                  Lương phát sinh
                </td>
                <td rowspan="2" style="text-align: center; font-size:small; font-weight: bold;">
                  Tổng lương
                </td>
                <td colspan="2" style="text-align: center; font-size:small; font-weight: bold;">
                  Ăn ca
                </td>
                <td colspan="4" style="text-align: center; font-size:small; font-weight: bold;">
                  Các khoản giảm trừ
                </td>
                <td rowspan="2" style="text-align: center; font-size:small; font-weight: bold;">
                  lương nhận
                </td>
              </tr>
              <tr style="background-color: #fffaeb;">
                <td style="text-align: center; font-size:small; font-weight: bold; width: 3%">
                  Số buổi
                </td>
                <td style="text-align: center; font-size:small; font-weight: bold;">
                  Thành tiền
                </td>
                <td style="text-align: center; font-size:small; font-weight: bold;">
                  BHXH 10.5%
                </td>
                <td style="text-align: center; font-size:small; font-weight: bold;">
                  CĐ
                </td>
                <td style="text-align: center; font-size:small; font-weight: bold;">
                  Tạm ứng
                </td>
                <td style="text-align: center; font-size:small; font-weight: bold;">
                  Tổng trừ
                </td>
              </tr>
              <!-- :class="{ highlight: pl._id == phieulosx } -->
              <tr v-for="(dsl, index) in dscongnhan" :key="index + 'j'">
                <td style="text-align: center">
                  <input v-model="selected" :value="dsl" type="checkbox" />
                </td>
                <td style="text-align: center; font-size:small; font-weight: bold;">
                  {{ index + 1 }}
                </td>
                <td @click="onSumcongnhandetail(dsl.macn)" style="text-align: center; font-size:small;">
                  {{ dsl.macn }}
                </td>
                <td style="font-size:small;">{{ dsl.tencongnhan }}</td>
                <!-- <td style="font-size:small;">{{ dsl.chucnang }}</td> -->
                <!-- <td style="text-align: right; font-size:small;">
                  {{ dsl.luongcb | formatNumber }}
                </td> -->
                <td style="text-align: right; font-size:small;">
                  <input v-model.trim="dsl.luongqlsp" type="number" class="input is-small" />
                </td>
                <td style="text-align: right; font-size:small;">
                  {{ dsl.luongcd | formatNumber }}
                </td>
                <td style="text-align: right; font-size:small;">
                  {{ dsl.luongcn | formatNumber }}
                </td>
                <td style="text-align: right; font-size:small; font-weight: bold;">
                  {{
                    parseFloat(dsl.luongqlsp) +
                    dsl.luongcb +
                    dsl.luongcd +
                    dsl.luongcn
                    | formatNumber
                  }}
                </td>
                <td>
                  <input v-model.trim="dsl.antrua" type="number" class="input is-small" />
                </td>
                <td style="text-align: center; font-size:small;">
                  {{ (dsl.antrua * tienlunch) | formatNumber }}
                </td>
                <td style="text-align: right; font-size:small;">
                  {{ dsl.bhxh | formatNumber }}
                </td>
                <td style="text-align: right; font-size:small;">
                  {{ dsl.cong_doan | formatNumber }}
                </td>
                <td style="text-align: right; font-size:small;">
                  {{ dsl.tienung | formatNumber }}
                </td>
                <td style="text-align: right; font-size:small; font-weight: bold;">
                  {{
                    (dsl.bhxh +
                      dsl.tienung +
                      dsl.cong_doan +
                      dsl.antrua * tienlunch)
                    | formatNumber
                  }}
                </td>
                <td style="text-align: right; font-size:small; font-weight: bold;">
                  {{
                    (parseFloat(dsl.luongqlsp) +
                      dsl.luongcb +
                      dsl.luongcd +
                      dsl.luongcn -
                      (dsl.bhxh +
                        dsl.tienung +
                        dsl.cong_doan +
                        dsl.antrua * tienlunch))
                    | formatNumber
                  }}
                </td>
              </tr>
            </table>
          </div>
        </div>

        <!-- Modal 1 -->
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
                        <i style="color: #ffd863ff" class="fas fa-tags"></i>
                      </span>
                      Thông tin phiếu lô tính lương công đoạn
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
                <div class="columns">
                  <!-- <div class="table_wrapper">
                    <table class="table is-responsive is-bordered is-narrow is-fullwidth">
                      <tr v-for="(pl, index) in phieulo" :key="index + 'z'">
                        <td>{{( index + 1 )}}</td>
                        <td>{{}}</td>
                      </tr>
                    </table>
                  </div> -->
                  <div class="column is-4">
                    <div class="table_wrapper table-height">
                      <table class="table is-responsive is-bordered is-narrow is-fullwidth">
                        <tr style="background-color: #fffaeb;">
                          <td style="font-size: small; font-weight: bold; text-align: center;">
                            STT
                          </td>
                          <td style="font-size: small; font-weight: bold; text-align: center;">
                            Mã lô SX
                          </td>
                        </tr>
                        <tr v-for="(pl, index) in phieulo" :key="index + 'z'" @click="getdataPhieulo(pl)"
                          :class="{ highlight: pl._id == phieulosx }">
                          <td style="font-size: small; font-weight: bold; text-align: center;">
                            {{ index + 1 }}
                          </td>
                          <td style="font-size: small;">
                            {{ pl.malosx }}
                          </td>
                        </tr>
                      </table>
                    </div>
                  </div>
                  <div class="column">
                    <div class="table_wrapper table-height">
                      <table class="table is-responsive is-bordered is-narrow is-fullwidth">
                        <tr style="background-color: #fffaeb;">
                          <td colspan="4" style="font-size: small; font-weight: bold;">
                            Thông tin Lô sản xuất
                          </td>
                        </tr>
                        <tr>
                          <td style="font-size: small; text-align: center;">
                            Mã SP
                          </td>
                          <td style="font-size: small; text-align: center;">
                            Mã kế hoạch nhà máy
                          </td>
                          <td colspan="2" style="font-size: small; text-align: center;">
                            Mã kế hoạch phân xưởng
                          </td>
                        </tr>
                        <tr>
                          <td style="font-size: small; text-align: center; font-weight: 700;">
                            {{ form.masp }}
                          </td>
                          <td style="font-size: small; text-align: center; font-weight: 700;">
                            {{ form.malonhamay }}
                          </td>
                          <td colspan="2" style="font-size: small; text-align: center; font-weight: 700;">
                            {{ form.makhpx }}
                          </td>
                        </tr>
                        <tr>
                          <td style="font-size: small; text-align: center;">
                            Số lượng
                          </td>
                          <td style="font-size: small; text-align: center;">
                            Nhóm lương
                          </td>
                          <td style="font-size: small; text-align: center;">
                            Ngày bắt đầu
                          </td>
                          <td style="font-size: small; text-align: center;">
                            Ngày kết thúc
                          </td>
                        </tr>
                        <tr>
                          <td style="font-size: small; text-align: center; font-weight: 700;">
                            {{ form.soluong }}
                          </td>
                          <td style="font-size: small; text-align: center; font-weight: 700;">
                            {{ form.nhomluong }}
                          </td>
                          <td style="font-size: small; text-align: center; font-weight: 700;">
                            {{ form.ngaybd | formatDate }}
                          </td>
                          <td style="font-size: small; text-align: center; font-weight: 700;">
                            {{ form.ngaykt | formatDate }}
                          </td>
                        </tr>
                        <tr>
                          <td style="font-size: small; text-align: center;">
                            Tổng đạt
                          </td>
                          <td style="font-size: small; text-align: center;">
                            Tổng hỏng
                          </td>
                          <td colspan="2" style="font-size: small; text-align: center;">
                            Đã chốt?
                          </td>
                        </tr>
                        <tr>
                          <td style="font-size: small; text-align: center; font-weight: 700;">
                            {{ form.tongdat }}
                          </td>
                          <td style="font-size: small; text-align: center; font-weight: 700;">
                            {{ form.tonghong }}
                          </td>

                          <td colspan="2" style="font-size: small; text-align: center; font-weight: 700;">
                            <template v-if="form.status_tinhluong == false">
                              <span class="icon is-small is-left">
                                <i style="color: #ffd863" class="fa fa-circle"></i>
                              </span>
                            </template>
                            <template v-else>
                              <span class="icon is-small is-left">
                                <i style="color: #00947e" class="fa fa-circle"></i>
                              </span>
                            </template>
                          </td>
                        </tr>
                      </table>

                      <table class="table is-responsive is-bordered is-narrow is-fullwidth">
                        <tr style="background-color: #fffaeb;">
                          <td colspan="6" style="font-size: small; font-weight: bold;">
                            Thông tin công đoạn làm việc
                          </td>
                        </tr>
                        <tr>
                          <td style="font-size: small; text-align: center;">
                            STT
                          </td>
                          <td style="font-size: small; text-align: center;">
                            Công nhân
                          </td>
                          <td style="font-size: small; text-align: center;">
                            Nguyên công
                          </td>
                          <td style="font-size: small; text-align: center;">
                            Số đạt
                          </td>
                          <td style="font-size: small; text-align: center;">
                            Số hỏng
                          </td>
                          <td style="font-size: small; text-align: center;">
                            Đơn giá
                          </td>
                        </tr>
                        <tr v-for="(cd, index) in luongcongdoan" :key="index + 'g'">
                          <td style="font-size: small; text-align: center; width: 5%">
                            {{ index + 1 }}
                          </td>
                          <td style="font-size: small;">
                            {{ cd.tencn }}
                          </td>
                          <td style="font-size: small; text-align: center;">
                            {{ cd.nguyencong }}
                          </td>
                          <td style="font-size: small; text-align: center;">
                            {{ cd.sodat }}
                          </td>
                          <td style="font-size: small; text-align: center;">
                            {{ cd.sohong }}
                          </td>
                          <td style="font-size: small; text-align: center;">
                            {{ cd.dongia }}
                          </td>
                        </tr>
                      </table>

                      <table class="table is-responsive is-bordered is-narrow is-fullwidth">
                        <tr style="background-color: #fffaeb;">
                          <td colspan="6" style="font-size: small; font-weight: bold;">
                            Thông tin công nhật
                          </td>
                        </tr>
                        <tr>
                          <td style="font-size: small; text-align: center;">
                            STT
                          </td>
                          <td style="font-size: small; text-align: center;">
                            Công nhân
                          </td>
                          <td style="font-size: small; text-align: center;">
                            Tên công nhật
                          </td>
                          <td style="font-size: small; text-align: center;">
                            Số giờ
                          </td>
                          <td style="font-size: small; text-align: center;">
                            Đơn giá
                          </td>
                        </tr>
                        <tr v-for="(cd, index) in congnhat" :key="index + 'l'">
                          <td style="font-size: small; text-align: center; width: 5%">
                            {{ index + 1 }}
                          </td>
                          <td style="font-size: small;">
                            {{ cd.nguoithuchien }}
                          </td>
                          <td style="font-size: small; text-align: center;">
                            {{ cd.tencongnhat }}
                          </td>
                          <td style="font-size: small; text-align: center;">
                            {{ cd.sogiocong }}
                          </td>
                          <td style="font-size: small; text-align: center;">
                            {{ cd.dongia | formatNumber }}
                          </td>
                        </tr>
                      </table>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>

        <!-- Modal 2 -->
        <div class="">
          <!-- Toggle class  -->
          <div :class="{ 'is-active': isActive_listcd }" class="modal">
            <div class="modal-background"></div>
            <div class="modal-content modal-card">
              <header style="background-color: #3e8ed0; border-top-left-radius: 8px; border-top-right-radius: 8px;">
                <div class="columns">
                  <div class="column is-9">
                    <p style="font-size: small; font-weight: bold; color: white; padding: 15px;">
                      <span class="icon is-small is-left">
                        <i style="color: #ffd863ff" class="fas fa-tags"></i>
                      </span>
                      Thông tin phiếu lô tính lương công đoạn
                    </p>
                  </div>
                  <div class="column" style="text-align:right;">
                    <a @click="isActive_listcd = false">
                      <span style="color: red; padding: 20px;" class="icon is-small">
                        <i class="fas fa-power-off"></i>
                      </span>
                    </a>
                  </div>
                </div>
              </header>
              <section class="modal-card-body">
                <div class="table_wrapper table-height">
                  <table class="table is-responsive is-bordered is-narrow is-fullwidth">
                    <tr style="background-color: #fffaeb;">
                      <td colspan="9" style="font-size: small; font-weight: bold;">
                        Chi tiết lương công đoạn của công nhân
                      </td>
                    </tr>
                    <tr>
                      <td style="font-size: small; text-align: center; font-weight: bold;">
                        STT
                      </td>
                      <td style="font-size: small; text-align: center; font-weight: bold;">
                        Mã lô sản xuất
                      </td>
                      <td style="font-size: small; text-align: center; font-weight: bold;">
                        Tên công nhân
                      </td>
                      <td style="font-size: small; text-align: center; font-weight: bold;">
                        Nguyên công
                      </td>
                      <td style="font-size: small; text-align: center; font-weight: bold;">
                        Đơn giá
                      </td>
                      <td style="font-size: small; text-align: center; font-weight: bold;">
                        Số đạt
                      </td>
                      <td style="font-size: small; text-align: center; font-weight: bold;">
                        Số hỏng
                      </td>
                      <td style="font-size: small; text-align: center; font-weight: bold;">
                        Thành tiền
                      </td>
                      <td style="font-size: small; text-align: center; font-weight: bold;">
                        Ngày kết thúc lô sản xuất
                      </td>
                    </tr>
                    <tr v-for="(dtl, index) in detailcn" :key="index + 'd'">
                      <td style="font-size: small; text-align: center; width: 5%">
                        {{ index + 1 }}
                      </td>
                      <td style="font-size: small;">{{ dtl.malosx }}</td>
                      <td style="font-size: small;">{{ dtl.tencn }}</td>
                      <td style="font-size: small; text-align: center;">
                        {{ dtl.nguyencong }}
                      </td>
                      <td style="font-size: small; text-align: center;">
                        {{ dtl.dongia | formatNumber }}
                      </td>
                      <td style="font-size: small; text-align: center;">
                        {{ dtl.sodat }}
                      </td>
                      <td style="font-size: small; text-align: center;">
                        {{ dtl.sohong }}
                      </td>
                      <td style="font-size: small; text-align: center;">
                        {{ (parseFloat(dtl.sohong) + parseFloat(dtl.sodat)) * parseFloat(dtl.dongia) | formatNumber }}
                      </td>
                      <td style="font-size: small; text-align: center;">
                        {{ dtl.stopday_losx }}
                      </td>
                    </tr>
                  </table>
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
import createNumberMask from "text-mask-addons/dist/createNumberMask";
const currencyMask = createNumberMask({
  prefix: "",
  allowDecimal: true,
  includeThousandsSeparator: true,
  allowNegative: false,
});
export default {
  middleware: "auth",
  data() {
    return {
      selected: [],
      phanxuong: [],
      tonhomid: [],
      dscongnhan: [],
      luongcongdoan: [],
      congnhat: [],
      detailcn: [],
      nam: "",
      thang: "",
      maxuong: "",
      mato: "",
      tenxuong: "",
      tento: "",
      mask: currencyMask,
      lunch: [],
      phieulo: [],
      tienlunch: 0,
      sumtienLunch: null,
      congdoan: 50000,
      listkeythangnam: [],
      isExits: null,
      arrkeythangnam: [],
      hisform: {
        tenthaotac: null,
        createdAt: null,
        createdBy: this.$auth.$state.user.username,
        ghichu: null,
      },
      //   các số liệu tính lương
      getDayinmon: null,
      thangLapluong: null,
      namLapluong: null,
      keyThangnam: "",
      createdAt: null,
      createdBy: this.$auth.$state.user.username,
      isActive: false,
      isActive_listcd: false,
      phieulosx: {},
      form: {
        malonhamay: "",
        malosx: "",
        mapx: "",
        ngaybd: "",
        ngaykt: "",
        soluong: "",
        masp: "",
        tensp: "",
        soluonglsx: "",
        slthuctetaixuong: "",
        startday: "",
        stopday: "",
        tongdat: "",
        tonghong: "",
        status: "",
        nhomluong: "",
        makhpx: "",
      },
    };
  },

  computed: {
    selectAll: {
      get: function () {
        return this.dscongnhan
          ? this.selected.length == this.dscongnhan.length
          : false;
      },
      set: function (value) {
        var selected = [];

        if (value) {
          this.dscongnhan.forEach(function (nv) {
            selected.push(nv);
          });
        }

        this.selected = selected;
      },
    },
  },

  mounted() {
    this.currentDateTime();
    this.getDay();
    this.getLunch();
    this.getPhanxuong();
    this.getKeythangnam()
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
      this.hisform.createdAt = date + " " + time;
      this.thangLapluong = current.getMonth();
      this.namLapluong = current.getFullYear();
    },

    async getKeythangnam() {
      this.listkeythangnam = await this.$axios.$get(`/api/ketoan/getkeythangnam`);
      // console.log(this.listlkh)
      for (let i = 0; i < this.listkeythangnam.length; i++) {
        let ktn = this.listkeythangnam[i].key_thangnam.trim();
        this.arrkeythangnam.push(ktn);
      }
      // console.log(this.arrkeythangnam);
    },

    onChange_Nam(e) {
      var id = e.target.value;
      // var name = e.target.options[e.target.options.selectedIndex].text;
      // console.log('id ',id );
      // console.log('name ',name );
      this.nam = id;
      // console.log(this.nam)
      // console.log(this.tennam)
    },

    async getPhanxuong() {
      this.phanxuong = await this.$axios.$get(`/api/phongban/allphanxuong`);
    },
    async getWithPX(e) {
      this.mato = "";
      var name = e.target.options[e.target.options.selectedIndex].text;
      // console.log(name)
      let position = name.split("--");
      let p1 = position[0].trim();
      let p2 = position[1].trim();
      this.maxuong = p1;
      this.tenxuong = p2;
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
      let p2 = position[1].trim();
      this.mato = p1;
      this.tento = p2;
    },

    onChange_Thang(e) {
      var id = e.target.value;
      var name = e.target.options[e.target.options.selectedIndex].text;
      console.log('id ', id);
      // console.log('name ',name );
      this.thang = id;
      // console.log(this.nam)
      // console.log(this.tennam)
    },

    // Lấy tháng ngày và đếm số ngày trong tháng hiện tại
    get_day_of_month(year, month) {
      return new Date(year, month, 0).getDate();
    },

    getDay() {
      this.getDayinmon = this.get_day_of_month(
        this.namLapluong,
        this.thangLapluong
      );
    },

    async getallPhieulsx() {
      this.isActive = true;
      this.phieulo = await this.$axios.$get(
        `/api/ketoan/getallphieulsxtinhluongcd?nam=${this.nam}&thang=${this.thang}&mapx=${this.maxuong}`
      );
    },

    async getLunch() {
      this.lunch = await this.$axios.$get(`/api/ketoan/tienantrua`);
      // console.log(this.lunch[0].antrua)
      this.tienlunch = this.lunch[0].antrua;
    },

    async getdataPhieulo(phieulo) {
      // console.log(phieulo.malosx);
      // this.form.malosx = phieulo.malosx;
      // this.form.masp = phieulo.masp;
      // this.form.mapx = phieulo.mapx;
      // this.form.makhpx = phieulo.makhpx;
      // this.form.tensp = phieulo.tensp;
      // this.form.makh = phieulo.makh;
      // this.form.nhomluong = phieulo.nhomluong;
      // this.form.ngaybd = phieulo.ngaybd;
      // this.form.ngaykt = phieulo.ngaykt;
      // this.form.soluong = phieulo.soluong;
      // this.form.soluonglsx = phieulo.soluonglsx;
      // this.form.slthuctetaixuong = phieulo.slthuctetaixuong;
      // this.form.tongdat = phieulo.tongdat;
      // this.form.tonghong = phieulo.tonghong;
      // this.form.status = phieulo.status;
      // this.form.stopday_losx = phieulo.stopday_losx;
      this.form = {...phieulo}
      // get info công đoạn
      this.luongcongdoan = await this.$axios.$get(
        `/api/ketoan/getphieulocongdoan?malosx=${this.form.malosx}&mapx=${this.form.mapx}`
      );
      // console.log(this.luongcongdoan)
      this.congnhat = await this.$axios.$get(
        `/api/ketoan/getphieulocongnhat?malosx=${this.form.malosx}`
      );
    },

    async onReport() {
      for (let i = 0; i < this.selected.length; i++) {
        let data = {
          mapb: this.dscongnhan[0].mapx,
          tenpb: this.dscongnhan[0].tenpx,
          manv: this.selected[i].congnhan,
          hotennv: this.selected[i].tencn,
          chucvu: this.selected[i].chucnang,
          luongcb: this.selected[i].luongcb,
          luongqlsp: this.selected[i].luongqlsp,
          luongcd: this.selected[i].luongcd,
          luongps: this.selected[i].luongcn,
          tongluong:
            this.selected[i].luongcb +
            this.selected[i].luongcd +
            this.selected[i].luongcn +
            this.selected[i].luongqlsp,
          antrua: this.selected[i].antrua * this.tienlunch,
          bhxh: this.selected[i].bhxh,
          congdoan: this.congdoan,
          tamung: this.selected[i].tienung,
          tongtru:
            this.selected[i].bhxh +
            this.selected[i].tienung +
            this.selected[i].antrua * this.tienlunch,
          tongnhan:
            this.selected[i].luongcb +
            this.selected[i].luongcd +
            this.selected[i].luongcn +
            this.selected[i].luongqlsp -
            (this.selected[i].bhxh +
              this.selected[i].tienung +
              this.selected[i].antrua * this.tienlunch),
          createdAt: this.createdAt,
          createdBy: this.createdBy,
          thang: this.thangLapluong,
          nam: this.namLapluong,
          status: true,
        };
        // console.log(data);
        this.$axios.$post("/api/ketoan/themluongthang", data);
      }
    },

    async getDsluong() {
      if (this.nam == "" || this.thang == "") {
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
          title: "Yêu cầu nhập kỳ lương",
        });
      } else {
        if (this.maxuong == "") {
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
            title: "Yêu cầu chọn phân xưởng cần tính lương",
          });
        } else {
          if (this.mato == "") {
            this.dscongnhan = await this.$axios.$get(
              `/api/ketoan/getallluongcongdoanpx?nam=${this.nam}&thang=${this.thang}&mapx=${this.maxuong}`
            );
            if (this.dscongnhan.length < 0) {
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
                title: "Không có dữ liệu",
              });
            }
          } else {
            this.dscongnhan = await this.$axios.$get(
              `/api/ketoan/getallluongcongdoanto?nam=${this.nam}&thang=${this.thang}&mato=${this.mato}`
            );
            if (this.dscongnhan.length < 0) {
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
                title: "Không có dữ liệu",
              });
            }
          }
        }
      }
    },

    async onSumcongnhandetail(macn) {
      this.isActive_listcd = true;
      this.detailcn = await this.$axios.$get(
        `/api/ketoan/detailluongcongdoancn?congnhan=${macn}&nam=${this.nam}&thang=${this.thang}&mapx=${this.maxuong}`
      );
      // console.log(this.detailcn)
    },

    onAddLuongthang() {
      Swal.fire({
        title: `Bạn có chắc chắn lập lương tháng ${this.thang} / ${this.nam}?`,
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Chắc chắn",
      }).then((result) => {
        if (result.isConfirmed) {
          try {
            // console.log(this.thang);
            if (this.selected.length <= 0) {
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
                title: "Chưa lấy số liệu lương hoặc chưa tích chọn người cần vào lương !!!",
              });
            } else {
              this.keyThangnam = this.thang.trim() + this.nam.trim()
              // console.log(this.keyThangnam)
              this.isExits = this.arrkeythangnam.includes(this.keyThangnam.trim());
              console.log(this.isExits)
              if (this.isExits == false) {
                for (let i = 0; i < this.selected.length; i++) {
                  let data = {
                    mapb: this.dscongnhan[0].mapx,
                    tenpb: this.dscongnhan[0].tenpx,
                    mato: this.selected[i].mato,
                    manv: this.selected[i].macn,
                    hotennv: this.selected[i].tencongnhan,
                    chucvu: this.selected[i].chucnang,
                    luongcb: this.selected[i].luongcb,
                    luongqlsp: this.selected[i].luongqlsp,
                    luongcd: this.selected[i].luongcd,
                    luongps: this.selected[i].luongcn,
                    tongluong:
                      this.selected[i].luongcb +
                      this.selected[i].luongcd +
                      this.selected[i].luongcn +
                      parseFloat(this.selected[i].luongqlsp),
                    antrua: this.selected[i].antrua * this.tienlunch,
                    bhxh: this.selected[i].bhxh,
                    congdoan: this.selected[i].cong_doan,
                    tamung: this.selected[i].tienung,
                    tongtru:
                      this.selected[i].cong_doan +
                      this.selected[i].bhxh +
                      this.selected[i].tienung +
                      this.selected[i].antrua * this.tienlunch,
                    tongnhan:
                      (this.selected[i].luongcb +
                        this.selected[i].luongcd +
                        this.selected[i].luongcn +
                        parseFloat(this.selected[i].luongqlsp)) -
                      (this.selected[i].cong_doan + this.selected[i].bhxh +
                        this.selected[i].tienung +
                        this.selected[i].antrua * this.tienlunch),
                    createdAt: this.createdAt,
                    createdBy: this.createdBy,
                    thang: this.thang,
                    nam: this.nam,
                    key_thangnam: this.keyThangnam,
                    status: true,
                  };
                  // console.log(data);
                  this.$axios.$post("/api/ketoan/themluongthang", data);

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
                    title: "Tạo số liệu lương thành công",
                  });

                  // Sau khi xác nhận tính lương xong thì phải đánh
                  // dấu để lần sau không dùng tính lương nữa.
                  // gom toàn bộ phiếu lô dùng đã tính lương tại phân xưởng đó
                  // - Cập nhật cột đã tính lương trong bảng losanxuat thành 1 (lần sau sẽ k lấy bản ghi có trường này nếu bằng 1)
                  // - Cập nhật cột status = 1 từ bảng luongcongnhan và ghi ngày executedAt vào để biết ngày đã tính lương

                }
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
                  title: "Tháng này đã tạo lương rồi !!!",
                });
              }

            }



          } catch (error) {
            // console.log(error);
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
  width: 920px;
  height: 560px;
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
  width: 1124px;
  height: 850px;
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

.highlight {
  background-color: #eff5fb;
}

tr:hover {
  cursor: pointer;
  background-color: #ebfffc;
}
</style>
