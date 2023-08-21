<template>
  <div class="columns">
    <div class="column">
      <br />
      <div class="box" style="margin-left: 3px; margin-right: 3px">
        <div class="columns">
          <div class="column is-4">
            <div class="control">
              <span class="icon is-small is-left">
                <i style="color: #ff55acee" class="fab fa-cc-mastercard"></i>
              </span>
              <span style="color: #3850b7; font-size: 15px; font-weight: bold"
                >Lập lương tháng</span
              >
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
        <div class="columns" style="margin-top: 1px">
          <div class="table_wrapper table-height">
            <table
              class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth"
            >
              <tr>
                <td style="font-size: small; font-weight: bold">
                  Công ty cổ phần Toàn Lực
                </td>
                <td style="width: 7%; text-align: center">
                  <vue-excel-xlsx
                    :data="dscongnhan_download"
                    :columns="columns_luong"
                    :file-name="'Lương thang'"
                    :file-type="'xlsx'"
                    :sheet-name="'Lương thang'"
                  >
                    Download
                  </vue-excel-xlsx>
                </td>
              </tr>
              <tr>
                <td
                  :colspan="2"
                  style="
                    text-align: center;
                    font-size: larger;
                    font-weight: bold;
                  "
                >
                  <template v-if="mato == ''">
                    BẢNG LƯƠNG
                    <span style="text-transform: uppercase">{{
                      this.tenxuong
                    }}</span>
                    THÁNG {{ thang }} NĂM {{ nam }}
                  </template>
                  <template v-else>
                    BẢNG LƯƠNG
                    <span style="text-transform: uppercase">{{
                      this.tento
                    }}</span>
                    THÁNG {{ thang }} NĂM {{ nam }}
                  </template>
                </td>
              </tr>
            </table>

            <table
              class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth"
            >
              <tr style="background-color: #fffaeb">
                <td
                  rowspan="2"
                  style="
                    text-align: center;
                    font-weight: bold;
                    font-size: small;
                  "
                >
                  <input type="checkbox" v-model="selectAll" />
                </td>
                <td
                  rowspan="2"
                  style="
                    text-align: center;
                    font-size: small;
                    font-weight: bold;
                  "
                >
                  STT
                </td>
                <td
                  rowspan="2"
                  style="
                    text-align: center;
                    font-size: small;
                    font-weight: bold;
                  "
                >
                  Mã CN
                </td>
                <td
                  rowspan="2"
                  style="
                    text-align: center;
                    font-size: small;
                    font-weight: bold;
                  "
                >
                  Tên công nhân
                </td>
                <td
                  rowspan="2"
                  style="
                    text-align: center;
                    font-size: small;
                    font-weight: bold;
                  "
                >
                  Ngày công
                </td>
                <td
                  rowspan="2"
                  style="
                    text-align: center;
                    font-size: small;
                    font-weight: bold;
                  "
                >
                  Lương TB
                </td>
                <!-- <td rowspan="2" style="text-align: center; font-size:small; font-weight: bold;">
                  CV
                </td> -->
                <!-- <td rowspan="2" style="text-align: center; font-size:small; font-weight: bold;">
                  Lương cơ bản
                </td> -->
                <td
                  rowspan="2"
                  style="
                    text-align: center;
                    font-size: small;
                    font-weight: bold;
                    width: 7%;
                  "
                >
                  Lương QLSP
                </td>
                <td
                  rowspan="2"
                  style="
                    text-align: center;
                    font-size: small;
                    font-weight: bold;
                    width: 6%;
                  "
                >
                  Lương công <br />
                  đoạn
                </td>
                <td
                  rowspan="2"
                  style="
                    text-align: center;
                    font-size: small;
                    font-weight: bold;
                  "
                >
                  Lương phát <br />
                  sinh
                </td>
                <td
                  colspan="2"
                  style="
                    text-align: center;
                    font-size: small;
                    font-weight: bold;
                  "
                >
                  Hỗ trợ
                </td>
                <td
                  rowspan="2"
                  style="
                    text-align: center;
                    font-size: small;
                    font-weight: bold;
                  "
                >
                  Tổng lương
                </td>
                <td
                  rowspan="2"
                  style="
                    text-align: center;
                    font-size: small;
                    font-weight: bold;
                  "
                >
                  Ăn ca
                </td>
                <td
                  rowspan="2"
                  style="
                    text-align: center;
                    font-size: small;
                    font-weight: bold;
                  "
                >
                  Lương CB
                </td>
                <td
                  colspan="4"
                  style="
                    text-align: center;
                    font-size: small;
                    font-weight: bold;
                  "
                >
                  Các khoản giảm trừ
                </td>
                <td
                  rowspan="2"
                  style="
                    text-align: center;
                    font-size: small;
                    font-weight: bold;
                  "
                >
                  lương nhận
                </td>
              </tr>
              <tr style="background-color: #fffaeb">
                <!-- <td
                  style="
                    text-align: center;
                    font-size: small;
                    font-weight: bold;
                    width: 3%;
                  "
                >
                  Ngày làm
                </td>
                <td
                  style="
                    text-align: center;
                    font-size: small;
                    font-weight: bold;
                  "
                >
                  Thành tiền
                </td> -->
                <td
                  style="
                    text-align: center;
                    font-size: small;
                    font-weight: bold;
                    width: 3%;
                  "
                >
                  Số ngày
                </td>
                <td
                  style="
                    text-align: center;
                    font-size: small;
                    font-weight: bold;
                  "
                >
                  Thành tiền
                </td>
                <td
                  style="
                    text-align: center;
                    font-size: small;
                    font-weight: bold;
                  "
                >
                  BHXH
                </td>
                <td
                  style="
                    text-align: center;
                    font-size: small;
                    font-weight: bold;
                  "
                >
                  Công đoàn
                </td>
                <td
                  style="
                    text-align: center;
                    font-size: small;
                    font-weight: bold;
                    width: 8%;
                  "
                >
                  &nbsp; Tiền Phạt &nbsp;
                </td>
                <td
                  style="
                    text-align: center;
                    font-size: small;
                    font-weight: bold;
                    width: 8%;
                  "
                >
                  Tổng trừ
                </td>
              </tr>
              <!-- :class="{ highlight: pl._id == phieulosx } -->
              <tr v-for="(dsl, index) in dscongnhan" :key="index + 'j'">
                <td style="text-align: center">
                  <input v-model="selected" :value="dsl" type="checkbox" />
                </td>
                <td
                  style="
                    text-align: center;
                    font-size: small;
                    font-weight: bold;
                  "
                >
                  {{ index + 1 }}
                </td>
                <td
                  @click="onSumcongnhandetail(dsl.macn)"
                  style="
                    text-align: center;
                    font-size: small;
                    background-color: aliceblue;
                  "
                >
                  {{ dsl.macn }}
                </td>
                <td style="font-size: small">{{ dsl.tencongnhan }}</td>
                <td style="text-align: center; font-size: small">
                  {{ dsl.songaylam }}
                </td>
                <td
                  style="text-align: right; font-size: small; font-weight: bold"
                >
                  {{
                    ((parseFloat(dsl.luongqlsp) +
                      dsl.luongcd +
                      dsl.luongcn +
                      parseFloat(dsl.ngayhotro) * parseFloat(dsl.luongmem)) /
                      dsl.songaylam)
                      | formatNumber
                  }}
                </td>
                <!-- <td style="font-size:small;">{{ dsl.chucnang }}</td> -->
                <!-- <td style="text-align: right; font-size:small;">
                  {{ dsl.luongcb | formatNumber }}
                </td> -->
                <td style="text-align: right; font-size: small">
                  <!-- <input
                    v-model.trim="dsl.luongqlsp"
                    type="number"
                    class="input is-small"
                  /> -->
                  {{ dsl.luongqlsp | formatNumber }}
                </td>
                <td style="text-align: right; font-size: small">
                  {{ dsl.luongcd | formatNumber }}
                </td>
                <td style="text-align: right; font-size: small">
                  {{ dsl.luongcn | formatNumber }}
                </td>
                <!-- ngày hỗ trợ -->
                <td style="text-align: center; font-size: small">
                  <input
                    v-model.trim="dsl.ngayhotro"
                    type="number"
                    class="input is-small"
                  />
                </td>
                <!-- tổng hỗ trợ -->
                <td style="text-align: center; font-size: small">
                  {{
                    (parseFloat(dsl.ngayhotro) * parseFloat(dsl.luongmem))
                      | formatNumber
                  }}
                </td>
                <!-- tổng lương -->
                <td
                  style="
                    text-align: right;
                    font-size: small;
                    font-weight: bold;
                    color: red;
                  "
                >
                  {{
                    (parseFloat(dsl.luongqlsp) +
                      dsl.luongcd +
                      dsl.luongcn +
                      parseFloat(dsl.ngayhotro) * parseFloat(dsl.luongmem))
                      | formatNumber
                  }}
                </td>
                <!-- ăn ca -->
                <td
                  @click="detailAnca(dsl)"
                  style="
                    text-align: center;
                    font-size: small;
                    background-color: honeydew;
                  "
                >
                  {{ dsl.thanhtien | formatNumber }}
                </td>
                <td style="text-align: right; font-size: small">
                  {{ dsl.luongcb | formatNumber }}
                </td>
                <td style="text-align: right; font-size: small">
                  {{ dsl.bhxh | formatNumber }}
                </td>
                <td style="text-align: right; font-size: small">
                  <input
                    type="number"
                    class="input is-small"
                    v-model="dsl.congdoan"
                  />
                </td>
                <!-- cột này là cột phạt. nhưng dùng cột ăn trưa trong csdl -->
                <td style="text-align: center; font-size: small">
                  <input
                    type="number"
                    class="input is-small"
                    v-model="dsl.antrua"
                  />
                </td>
                <!-- tổng trừ -->
                <td
                  style="text-align: right; font-size: small; font-weight: bold"
                >
                  {{
                    (dsl.bhxh +
                      parseFloat(dsl.congdoan) +
                      parseFloat(dsl.antrua))
                      | formatNumber
                  }}
                </td>
                <!-- tổng nhận -->
                <td
                  style="
                    text-align: right;
                    font-size: small;
                    font-weight: bold;
                    color: red;
                  "
                >
                  {{
                    (parseFloat(dsl.luongqlsp) +
                      dsl.luongcd +
                      dsl.luongcn +
                      dsl.thanhtien +
                      parseFloat(dsl.ngayhotro) * parseFloat(dsl.luongmem) -
                      (dsl.bhxh +
                        parseFloat(dsl.congdoan) +
                        parseFloat(dsl.antrua)))
                      | formatNumber
                  }}
                </td>
              </tr>
              <tr>
                <td colspan="4"></td>
                <td
                  style="
                    font-size: small;
                    font-weight: bold;
                    color: #00947e;
                    text-align: center;
                  "
                >
                  {{ subRow_songaylam | formatNumber }}
                </td>
                <td
                  style="
                    font-size: small;
                    font-weight: bold;
                    color: #00947e;
                    text-align: right;
                  "
                >
                  {{ subRow_tongluongtb | formatNumber }}
                </td>
                <td
                  style="
                    font-size: small;
                    font-weight: bold;
                    color: #00947e;
                    text-align: right;
                  "
                >
                  {{ subRow_qlsp | formatNumber }}
                </td>
                <td
                  style="
                    font-size: small;
                    font-weight: bold;
                    color: #00947e;
                    text-align: right;
                  "
                >
                  {{ subRow_luongcd | formatNumber }}
                </td>
                <td
                  style="
                    font-size: small;
                    font-weight: bold;
                    color: #00947e;
                    text-align: right;
                  "
                >
                  {{ subRow_luongcn | formatNumber }}
                </td>
                <td
                  style="
                    font-size: small;
                    font-weight: bold;
                    color: #00947e;
                    text-align: center;
                  "
                >
                  {{ subRow_ngayhotro | formatNumber }}
                </td>
                <td
                  style="
                    font-size: small;
                    font-weight: bold;
                    color: #00947e;
                    text-align: center;
                  "
                >
                  {{ subRow_tienhotro | formatNumber }}
                </td>
                <td
                  style="
                    font-size: small;
                    font-weight: bold;
                    color: #00947e;
                    text-align: right;
                  "
                >
                  {{ subRow_tongluong | formatNumber }}
                </td>
                <td
                  style="
                    font-size: small;
                    font-weight: bold;
                    color: #00947e;
                    text-align: center;
                  "
                >
                  {{ subRow_thanhtienca | formatNumber }}
                </td>
                <td
                  style="
                    font-size: small;
                    font-weight: bold;
                    color: #00947e;
                    text-align: right;
                  "
                >
                  {{ subRow_luongcb | formatNumber }}
                </td>
                <td
                  style="
                    font-size: small;
                    font-weight: bold;
                    color: #00947e;
                    text-align: right;
                  "
                >
                  {{ subRow_bhxh | formatNumber }}
                </td>
                <td
                  style="
                    font-size: small;
                    font-weight: bold;
                    color: #00947e;
                    text-align: right;
                  "
                >
                  {{ subRow_congdoan | formatNumber }}
                </td>
                <td
                  style="
                    font-size: small;
                    font-weight: bold;
                    color: #00947e;
                    text-align: right;
                  "
                >
                  {{ subRow_phat | formatNumber }}
                </td>
                <td
                  style="
                    font-size: small;
                    font-weight: bold;
                    color: #00947e;
                    text-align: right;
                  "
                >
                  {{ subRow_tongtru | formatNumber }}
                </td>
                <td
                  style="
                    font-size: small;
                    font-weight: bold;
                    color: #00947e;
                    text-align: right;
                  "
                >
                  {{ subRow_tongnhan | formatNumber }}
                </td>
              </tr>
            </table>
          </div>
        </div>
        <div class="columns" style="margin-top: 1px">
          <!-- Lương quản lý sản phẩm -->
          <div class="table_wrapper">
            <table
              class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth"
            >
              <tr style="background-color: antiquewhite">
                <td
                  style="text-align: left; font-size: small; font-weight: bold"
                >
                  Quản lý
                </td>
                <td
                  style="
                    text-align: center;
                    font-size: small;
                    font-weight: bold;
                    width: 20%;
                  "
                >
                  Tỷ lệ (%)
                </td>
                <td
                  style="
                    text-align: center;
                    font-size: small;
                    font-weight: bold;
                  "
                >
                  Tổng lương công đoạn
                </td>
              </tr>
              <tr>
                <td>--</td>
                <td></td>
                <td
                  style="text-align: right; font-size: small; font-weight: bold"
                >
                  {{ tongLuongCongDoan | formatNumber }}
                </td>
              </tr>
              <tr>
                <td
                  style="text-align: left; font-size: small; font-weight: bold"
                >
                  Tổng lương quản lý
                </td>
                <td
                  style="
                    text-align: center;
                    font-size: small;
                    font-weight: bold;
                  "
                >
                  <input
                    type="number"
                    class="input is-small"
                    v-model="tyletongluongql"
                  />
                </td>
                <td
                  style="text-align: right; font-size: small; font-weight: bold"
                >
                  {{ tongLuongQuanLy | formatNumber }}
                </td>
              </tr>
              <tr
                v-for="(item, index) in dscongnhan"
                :key="index + 'kkl'"
                v-if="item.anluongqlsp == true"
              >
                <td
                  style="text-align: left; font-size: small; font-weight: bold"
                >
                  {{ item.tencongnhan }}
                </td>
                <td
                  style="
                    text-align: center;
                    font-size: small;
                    font-weight: bold;
                  "
                >
                  <input
                    @change="countLuongqlsp(item)"
                    type="number"
                    class="input is-small"
                    v-model="item.tyleqlsp"
                  />
                </td>
                <td
                  style="text-align: right; font-size: small; font-weight: bold"
                >
                  {{
                    (parseFloat(item.tyleqlsp) * tongLuongQuanLy) | formatNumber
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
                      Thông tin phiếu lô tính lương công đoạn
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
                <div class="columns">
                  <div class="column">
                    <table
                      class="table is-responsive is-bordered is-narrow is-fullwidth"
                    >
                      <tr>
                        <td style="width: 20%">
                          <vue-excel-xlsx
                            :data="dataAllCongdoan"
                            :columns="columns"
                            :file-name="
                              'Lương công đoạn ' +
                              maxuong +
                              ' ' +
                              thang +
                              '_' +
                              nam
                            "
                            :file-type="'xlsx'"
                            :sheet-name="'Lương công đoạn'"
                          >
                            Download Lương công đoạn
                          </vue-excel-xlsx>
                        </td>
                        <td style="width: 20%">
                          <vue-excel-xlsx
                            :data="dataAllCongnhat"
                            :columns="columns_cn"
                            :file-name="
                              'Lương công nhật ' +
                              maxuong +
                              ' ' +
                              thang +
                              '_' +
                              nam
                            "
                            :file-type="'xlsx'"
                            :sheet-name="'Lương công nhật'"
                          >
                            Download Lương công nhật
                          </vue-excel-xlsx>
                        </td>
                        <td></td>
                      </tr>
                    </table>
                  </div>
                </div>
                <div class="columns">
                  <div class="column is-4">
                    <div class="table_wrapper table-height">
                      <table
                        class="table is-responsive is-bordered is-narrow is-fullwidth"
                      >
                        <tr style="background-color: #fffaeb">
                          <td
                            style="
                              font-size: small;
                              font-weight: bold;
                              text-align: center;
                            "
                          >
                            STT
                          </td>
                          <td
                            style="
                              font-size: small;
                              font-weight: bold;
                              text-align: center;
                            "
                          >
                            Mã lô SX
                          </td>
                        </tr>
                        <tr
                          v-for="(pl, index) in phieulo"
                          :key="index + 'z'"
                          @click="getdataPhieulo(pl)"
                          :class="{ highlight: pl._id == phieulosx }"
                        >
                          <td
                            style="
                              font-size: small;
                              font-weight: bold;
                              text-align: center;
                            "
                          >
                            {{ index + 1 }}
                          </td>
                          <td style="font-size: small">
                            {{ pl.malosx }}
                          </td>
                        </tr>
                      </table>
                    </div>
                  </div>
                  <div class="column">
                    <div class="table_wrapper table-height">
                      <table
                        class="table is-responsive is-bordered is-narrow is-fullwidth"
                      >
                        <tr style="background-color: #fffaeb">
                          <td
                            colspan="4"
                            style="font-size: small; font-weight: bold"
                          >
                            Thông tin Lô sản xuất
                          </td>
                        </tr>
                        <tr>
                          <td style="font-size: small; text-align: center">
                            Mã phiếu
                          </td>
                          <td style="font-size: small; text-align: center">
                            Ngày tháng chốt
                          </td>
                        </tr>
                        <tr>
                          <td
                            style="
                              font-size: small;
                              text-align: center;
                              font-weight: bold;
                              color: #00947e;
                            "
                          >
                            {{ form._id }}
                          </td>
                          <td
                            style="
                              font-size: small;
                              text-align: center;
                              font-weight: bold;
                              color: red;
                            "
                          >
                            {{ form.stopday_losx | formatDate }}
                          </td>
                        </tr>
                        <tr>
                          <td style="font-size: small; text-align: center">
                            Mã SP
                          </td>
                          <td style="font-size: small; text-align: center">
                            Mã kế hoạch nhà máy
                          </td>
                          <td
                            colspan="2"
                            style="font-size: small; text-align: center"
                          >
                            Mã kế hoạch phân xưởng
                          </td>
                        </tr>
                        <tr>
                          <td
                            style="
                              font-size: small;
                              text-align: center;
                              font-weight: 700;
                            "
                          >
                            {{ form.masp }}
                          </td>
                          <td
                            style="
                              font-size: small;
                              text-align: center;
                              font-weight: 700;
                            "
                          >
                            {{ form.malonhamay }}
                          </td>
                          <td
                            colspan="2"
                            style="
                              font-size: small;
                              text-align: center;
                              font-weight: 700;
                            "
                          >
                            {{ form.makhpx }}
                          </td>
                        </tr>
                        <tr>
                          <td style="font-size: small; text-align: center">
                            Số lượng
                          </td>
                          <td style="font-size: small; text-align: center">
                            Nhóm lương
                          </td>
                          <td style="font-size: small; text-align: center">
                            Ngày bắt đầu
                          </td>
                          <td style="font-size: small; text-align: center">
                            Ngày kết thúc
                          </td>
                        </tr>
                        <tr>
                          <td
                            style="
                              font-size: small;
                              text-align: center;
                              font-weight: 700;
                            "
                          >
                            {{ form.soluong }}
                          </td>
                          <td
                            style="
                              font-size: small;
                              text-align: center;
                              font-weight: 700;
                            "
                          >
                            {{ form.nhomluong }}
                          </td>
                          <td
                            style="
                              font-size: small;
                              text-align: center;
                              font-weight: 700;
                            "
                          >
                            {{ form.ngaybd | formatDate }}
                          </td>
                          <td
                            style="
                              font-size: small;
                              text-align: center;
                              font-weight: 700;
                            "
                          >
                            {{ form.ngaykt | formatDate }}
                          </td>
                        </tr>
                        <tr>
                          <td style="font-size: small; text-align: center">
                            Tổng đạt
                          </td>
                          <td style="font-size: small; text-align: center">
                            Tổng hỏng
                          </td>
                          <td
                            colspan="2"
                            style="font-size: small; text-align: center"
                          >
                            Đã chốt?
                          </td>
                        </tr>
                        <tr>
                          <td
                            style="
                              font-size: small;
                              text-align: center;
                              font-weight: 700;
                            "
                          >
                            {{ form.tongdat }}
                          </td>
                          <td
                            style="
                              font-size: small;
                              text-align: center;
                              font-weight: 700;
                            "
                          >
                            {{ form.tonghong }}
                          </td>

                          <td
                            colspan="2"
                            style="
                              font-size: small;
                              text-align: center;
                              font-weight: 700;
                            "
                          >
                            <template v-if="form.status_tinhluong == false">
                              <span class="icon is-small is-left">
                                <i
                                  style="color: #ffd863"
                                  class="fa fa-circle"
                                ></i>
                              </span>
                            </template>
                            <template v-else>
                              <span class="icon is-small is-left">
                                <i
                                  style="color: #00947e"
                                  class="fa fa-circle"
                                ></i>
                              </span>
                            </template>
                          </td>
                        </tr>
                      </table>

                      <table
                        class="table is-responsive is-bordered is-narrow is-fullwidth"
                      >
                        <tr style="background-color: #fffaeb">
                          <td
                            colspan="6"
                            style="font-size: small; font-weight: bold"
                          >
                            Thông tin công đoạn làm việc
                          </td>
                        </tr>
                        <tr>
                          <td style="font-size: small; text-align: center">
                            STT
                          </td>
                          <td style="font-size: small; text-align: center">
                            Công nhân
                          </td>
                          <td style="font-size: small; text-align: center">
                            Nguyên công
                          </td>
                          <td style="font-size: small; text-align: center">
                            Số đạt
                          </td>
                          <td style="font-size: small; text-align: center">
                            Số hỏng
                          </td>
                          <td style="font-size: small; text-align: center">
                            Đơn giá
                          </td>
                        </tr>
                        <tr
                          v-for="(cd, index) in luongcongdoan"
                          :key="index + 'g'"
                        >
                          <td
                            style="
                              font-size: small;
                              text-align: center;
                              width: 5%;
                            "
                          >
                            {{ index + 1 }}
                          </td>
                          <td style="font-size: small">
                            {{ cd.tencn }}
                          </td>
                          <td style="font-size: small; text-align: center">
                            {{ cd.nguyencong }}
                          </td>
                          <td style="font-size: small; text-align: center">
                            {{ cd.sodat }}
                          </td>
                          <td style="font-size: small; text-align: center">
                            {{ cd.sohong }}
                          </td>
                          <td style="font-size: small; text-align: center">
                            {{ cd.dongia }}
                          </td>
                        </tr>
                      </table>

                      <table
                        class="table is-responsive is-bordered is-narrow is-fullwidth"
                      >
                        <tr style="background-color: #fffaeb">
                          <td
                            colspan="6"
                            style="font-size: small; font-weight: bold"
                          >
                            Thông tin công nhật
                          </td>
                        </tr>
                        <tr>
                          <td style="font-size: small; text-align: center">
                            STT
                          </td>
                          <td style="font-size: small; text-align: center">
                            Công nhân
                          </td>
                          <td style="font-size: small; text-align: center">
                            Tên công nhật
                          </td>
                          <td style="font-size: small; text-align: center">
                            Số giờ
                          </td>
                          <td style="font-size: small; text-align: center">
                            Đơn giá
                          </td>
                        </tr>
                        <tr v-for="(cd, index) in congnhat" :key="index + 'l'">
                          <td
                            style="
                              font-size: small;
                              text-align: center;
                              width: 5%;
                            "
                          >
                            {{ index + 1 }}
                          </td>
                          <td style="font-size: small">
                            {{ cd.nguoithuchien }}
                          </td>
                          <td style="font-size: small; text-align: center">
                            {{ cd.tencongnhat }}
                          </td>
                          <td style="font-size: small; text-align: center">
                            {{ cd.sogiocong }}
                          </td>
                          <td style="font-size: small; text-align: center">
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
                      Thông tin phiếu lô tính lương công đoạn
                    </p>
                  </div>
                  <div class="column" style="text-align: right">
                    <a @click="isActive_listcd = false">
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
                  <!-- công đoạn -->
                  <table
                    class="table is-responsive is-bordered is-narrow is-fullwidth"
                  >
                    <tr style="background-color: #fffaeb">
                      <td
                        colspan="11"
                        style="font-size: small; font-weight: bold"
                      >
                        Chi tiết lương công đoạn
                      </td>
                    </tr>
                    <tr>
                      <td
                        style="
                          font-size: small;
                          text-align: center;
                          font-weight: bold;
                        "
                      >
                        STT
                      </td>
                      <td
                        style="
                          font-size: small;
                          font-weight: bold;
                          text-align: center;
                        "
                      >
                        Mã phiếu
                      </td>
                      <td
                        style="
                          font-size: small;
                          font-weight: bold;
                          text-align: center;
                        "
                      >
                        Phân xưởng
                      </td>
                      <td
                        style="
                          font-size: small;
                          text-align: center;
                          font-weight: bold;
                        "
                      >
                        Mã lô sản xuất
                      </td>
                      <td
                        style="
                          font-size: small;
                          text-align: center;
                          font-weight: bold;
                        "
                      >
                        Tên công nhân
                      </td>
                      <td
                        style="
                          font-size: small;
                          text-align: center;
                          font-weight: bold;
                        "
                      >
                        Nguyên công
                      </td>
                      <td
                        style="
                          font-size: small;
                          text-align: center;
                          font-weight: bold;
                        "
                      >
                        Đơn giá
                      </td>
                      <td
                        style="
                          font-size: small;
                          text-align: center;
                          font-weight: bold;
                        "
                      >
                        Số đạt
                      </td>
                      <td
                        style="
                          font-size: small;
                          text-align: center;
                          font-weight: bold;
                        "
                      >
                        Số hỏng
                      </td>
                      <td
                        style="
                          font-size: small;
                          text-align: center;
                          font-weight: bold;
                        "
                      >
                        Thành tiền
                      </td>
                      <td
                        style="
                          font-size: small;
                          text-align: center;
                          font-weight: bold;
                        "
                      >
                        Ngày kết thúc lô sản xuất
                      </td>
                    </tr>
                    <tr v-for="(dtl, index) in detailcn" :key="index + 'd'">
                      <td
                        style="font-size: small; text-align: center; width: 5%"
                      >
                        {{ index + 1 }}
                      </td>
                      <td
                        style="font-size: small; text-align: center; width: 5%"
                      >
                        {{ dtl._id_losx }}
                      </td>
                      <td
                        style="font-size: small; text-align: center; width: 5%"
                      >
                        {{ dtl.mapx }}
                      </td>
                      <td style="font-size: small">{{ dtl.malosx }}</td>
                      <td style="font-size: small">{{ dtl.tencn }}</td>
                      <td style="font-size: small; text-align: center">
                        {{ dtl.nguyencong }}
                      </td>
                      <td style="font-size: small; text-align: center">
                        {{ dtl.dongia | formatNumber }}
                      </td>
                      <td style="font-size: small; text-align: center">
                        {{ dtl.sodat }}
                      </td>
                      <td style="font-size: small; text-align: center">
                        {{ dtl.sohong }}
                      </td>
                      <td style="font-size: small; text-align: right">
                        {{
                          ((parseFloat(dtl.sohong) + parseFloat(dtl.sodat)) *
                            parseFloat(dtl.dongia))
                            | formatNumber
                        }}
                      </td>
                      <td style="font-size: small; text-align: center">
                        {{ dtl.stopday_losx | formatDate }}
                      </td>
                    </tr>
                    <tr>
                      <td colspan="9"></td>
                      <td
                        style="
                          font-size: small;
                          text-align: right;
                          font-weight: bold;
                          color: red;
                        "
                      >
                        {{ tongThanhtienLCD | formatNumber }}
                      </td>
                      <td></td>
                    </tr>
                  </table>
                  <!-- công nhật -->
                  <table
                    class="table is-responsive is-bordered is-narrow is-fullwidth"
                  >
                    <tr style="background-color: #fffaeb">
                      <td
                        colspan="10"
                        style="font-size: small; font-weight: bold"
                      >
                        Chi tiết lương công nhật
                      </td>
                    </tr>
                    <tr>
                      <td
                        style="
                          font-size: small;
                          text-align: center;
                          font-weight: bold;
                        "
                      >
                        STT
                      </td>
                      <td
                        style="
                          font-size: small;
                          font-weight: bold;
                          text-align: center;
                        "
                      >
                        Mã phiếu
                      </td>
                      <td
                        style="
                          font-size: small;
                          font-weight: bold;
                          text-align: center;
                        "
                      >
                        Phân xưởng
                      </td>
                      <td
                        style="
                          font-size: small;
                          text-align: center;
                          font-weight: bold;
                        "
                      >
                        Mã lô sản xuất
                      </td>
                      <td
                        style="
                          font-size: small;
                          text-align: center;
                          font-weight: bold;
                        "
                      >
                        Tên công nhân
                      </td>
                      <td
                        style="
                          font-size: small;
                          text-align: center;
                          font-weight: bold;
                        "
                      >
                        Công nhật
                      </td>
                      <td
                        style="
                          font-size: small;
                          text-align: center;
                          font-weight: bold;
                        "
                      >
                        Đơn giá
                      </td>
                      <td
                        style="
                          font-size: small;
                          text-align: center;
                          font-weight: bold;
                        "
                      >
                        Số giờ công
                      </td>
                      <td
                        style="
                          font-size: small;
                          text-align: center;
                          font-weight: bold;
                        "
                      >
                        Thành tiền
                      </td>
                      <td
                        style="
                          font-size: small;
                          text-align: center;
                          font-weight: bold;
                        "
                      >
                        Ngày kết thúc lô sản xuất
                      </td>
                    </tr>
                    <tr
                      v-for="(dtl, index) in detailcongnhat"
                      :key="index + 'd'"
                    >
                      <td
                        style="font-size: small; text-align: center; width: 5%"
                      >
                        {{ index + 1 }}
                      </td>
                      <td
                        style="font-size: small; text-align: center; width: 5%"
                      >
                        {{ dtl._id_losx }}
                      </td>
                      <td
                        style="font-size: small; text-align: center; width: 5%"
                      >
                        {{ dtl.mapx }}
                      </td>
                      <td style="font-size: small">{{ dtl.malosx }}</td>
                      <td style="font-size: small">{{ dtl.nguoithuchien }}</td>
                      <td style="font-size: small">
                        {{ dtl.tencongnhat }}
                      </td>
                      <td style="font-size: small; text-align: center">
                        {{ dtl.dongia | formatNumber }}
                      </td>
                      <td style="font-size: small; text-align: center">
                        {{ dtl.sogiocong }}
                      </td>
                      <td style="font-size: small; text-align: right">
                        {{
                          (parseFloat(dtl.sogiocong) * parseFloat(dtl.dongia))
                            | formatNumber
                        }}
                      </td>
                      <td style="font-size: small; text-align: center">
                        {{ dtl.stopday_losx | formatDate }}
                      </td>
                    </tr>
                    <tr>
                      <td colspan="8"></td>
                      <td
                        style="
                          font-size: small;
                          text-align: right;
                          font-weight: bold;
                          color: red;
                        "
                      >
                        {{ tongThanhtienLCnhat | formatNumber }}
                      </td>
                      <td></td>
                    </tr>
                  </table>
                </div>
              </section>
            </div>
          </div>
        </div>

        <!-- Modal 3 - loadluong -->
        <div class="">
          <!-- Toggle class  -->
          <div :class="{ 'is-active': isActive_load_luong }" class="modal">
            <div class="modal-background"></div>
            <div class="modal-content modal-card-1">
              <section class="modal-card-body">
                <span>Đang tổng hợp số liệu</span>
                <progress class="progress is-danger" max="100">30%</progress>
              </section>
            </div>
          </div>
        </div>

        <!-- Modal 4 - detailAnca -->
        <div class="">
          <!-- Toggle class  -->
          <div :class="{ 'is-active': isActive_anCa }" class="modal">
            <div class="modal-background"></div>
            <div class="modal-content modal-card-1">
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
                      Thông tin ăn ca
                    </p>
                  </div>
                  <div class="column" style="text-align: right">
                    <a @click="isActive_anCa = false">
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
                  class="table is-responsive is-bordered is-narrow is-fullwidth"
                >
                  <tr style="background-color: #fffaeb">
                    <td
                      style="
                        font-size: small;
                        font-weight: bold;
                        text-align: center;
                        width: 5%;
                      "
                    >
                      STT
                    </td>
                    <td
                      style="
                        font-size: small;
                        font-weight: bold;
                        text-align: center;
                        width: 15%;
                      "
                    >
                      Công nhân
                    </td>
                    <td
                      style="
                        font-size: small;
                        font-weight: bold;
                        text-align: center;
                        width: 15%;
                      "
                    >
                      Ngày chấm công
                    </td>
                    <td
                      style="
                        font-size: small;
                        font-weight: bold;
                        text-align: center;
                        width: 7%;
                      "
                    >
                      Tuần
                    </td>
                    <td
                      style="
                        font-size: small;
                        font-weight: bold;
                        text-align: center;
                        width: 10%;
                      "
                    >
                      Mã chấm công
                    </td>
                    <td
                      style="
                        font-size: small;
                        font-weight: bold;
                        text-align: center;
                        width: 15%;
                      "
                    >
                      chamcong
                    </td>
                    <td
                      style="
                        font-size: small;
                        font-weight: bold;
                        text-align: center;
                        width: 10%;
                      "
                    >
                      anca
                    </td>
                    <td
                      style="
                        font-size: small;
                        font-weight: bold;
                        text-align: center;
                        width: 10%;
                      "
                    >
                      tienan
                    </td>
                    <td></td>
                  </tr>
                  <tr v-for="(it, index) in dataDetailAnca">
                    <td style="font-size: small; text-align: center">
                      {{ index + 1 }}
                    </td>
                    <td style="font-size: small; text-align: center">
                      {{ it.tencn }}
                    </td>
                    <td style="font-size: small; text-align: center">
                      {{ it.ngaychamcong | formatDate }}
                    </td>
                    <td style="font-size: small; text-align: center">
                      {{ it.tuanchamcong }}
                    </td>
                    <td style="font-size: small; text-align: center">
                      {{ it.machamcong }}
                    </td>
                    <td style="font-size: small; text-align: center">
                      {{ it.chamcong }}
                    </td>
                    <td style="font-size: small; text-align: center">
                      {{ it.anca }}
                    </td>
                    <td style="font-size: small; text-align: right">
                      {{ it.tienan | formatNumber }}
                    </td>
                    <td></td>
                  </tr>
                  <tr>
                    <td colspan="7" style="font-size: small; font-weight: bold">
                      Tổng
                    </td>
                    <td
                      style="
                        font-size: small;
                        font-weight: bold;
                        color: red;
                        text-align: right;
                      "
                    >
                      {{ tongAnca | formatNumber }}
                    </td>
                    <td></td>
                  </tr>
                </table>
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
  middleware: "auth-luong",
  data() {
    return {
      selected: [],
      phanxuong: [],
      tonhomid: [],
      dscongnhan: [],
      data_download: [],
      luongcongdoan: [],
      congnhat: [],
      detailcn: [],
      detailcongnhat: [],
      dataAllCongdoan: [],
      dataAllCongnhat: [],
      dataDetailAnca: [],
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
      isActive_load_luong: false,
      isActive_anCa: false,
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
        _id: "",
        stopday_losx: "",
      },
      // tỷ lệ lương quản lý
      tyletongluongql: 0,
      // tylequanly1: 0,
      columns: [
        {
          label: "Id Lô sản xuất",
          field: "_id_losx",
          // dataFormat: this.trimData
        },
        {
          label: "Kế hoạch năm",
          field: "kehoachnam",
          /* dataFormat: this.priceFormat */
          // dataFormat: this.trimData
        },
        {
          label: "Mã kế hoạch PX",
          field: "makhpx",
          /* dataFormat: this.priceFormat */
          // dataFormat: this.trimData
        },
        {
          label: "Mã lô sản xuất",
          field: "malosx",
        },
        {
          label: "Mã phân xưởng",
          field: "mapx",
          // dataFormat: this.prefixformatDate
        },
        {
          label: "Mã tổ",
          field: "mato",
        },
        {
          label: "Mã sản phẩm",
          field: "masp",
          // dataFormat: this.prefixformatDate
        },
        {
          label: "Tên sản phẩm",
          field: "tensp",
          // dataFormat: this.prefixformatDate
        },
        {
          label: "Nguyên công",
          field: "nguyencong",
          // dataFormat: this.trimData
        },

        {
          label: "Đơn giá",
          field: "dongia",
          // dataFormat: this.trimData
        },
        {
          label: "Máy",
          field: "may",
          // dataFormat: this.trimData
        },
        {
          label: "Phân xưởng của công nhân",
          field: "phanxuong_cn",
          // dataFormat: this.trimData
        },
        {
          label: "Tổ của công nhân",
          field: "to_cn",
          // dataFormat: this.prefixformatDate
        },
        {
          label: "Mã Công nhân",
          field: "congnhan",
          // dataFormat: this.prefixformatDate
        },
        {
          label: "Tên công nhan",
          field: "tencn",
        },
        {
          label: "Số đạt",
          field: "sodat",
          // dataFormat: this.prefixformatDate
        },
        {
          label: "Số hỏng",
          field: "sohong",
          // dataFormat: this.prefixformatDate
        },
        {
          label: "Ngày thực hiện",
          field: "ngaythuchien",
          dataFormat: this.prefixformatDate,
        },
      ],
      columns_cn: [
        {
          label: "Id Lô sản xuất",
          field: "_id_losx",
          // dataFormat: this.trimData
        },
        {
          label: "Kế hoạch năm",
          field: "kehoachnam",
          /* dataFormat: this.priceFormat */
          // dataFormat: this.trimData
        },
        {
          label: "Mã lô nhà máy",
          field: "malonhamay",
          /* dataFormat: this.priceFormat */
          // dataFormat: this.trimData
        },
        {
          label: "Mã kế hoạch PX",
          field: "makhpx",
          /* dataFormat: this.priceFormat */
          // dataFormat: this.trimData
        },
        {
          label: "Mã lô sản xuất",
          field: "malosx",
        },
        {
          label: "Mã phân xưởng",
          field: "mapx",
          // dataFormat: this.prefixformatDate
        },
        // {
        //   label: "Mã tổ",
        //   field: "mato",
        // },
        {
          label: "Mã sản phẩm",
          field: "masp",
          // dataFormat: this.prefixformatDate
        },
        {
          label: "Tên sản phẩm",
          field: "tensp",
          // dataFormat: this.prefixformatDate
        },
        {
          label: "Mã công",
          field: "macongnhat",
          // dataFormat: this.trimData
        },

        {
          label: "Tên công",
          field: "tencongnhat",
          // dataFormat: this.trimData
        },
        {
          label: "Mã công nhân",
          field: "macongnhan",
          // dataFormat: this.trimData
        },
        {
          label: "Người thực hiện",
          field: "nguoithuchien",
          // dataFormat: this.trimData
        },
        {
          label: "Số giờ công",
          field: "sogiocong",
          // dataFormat: this.prefixformatDate
        },
        {
          label: "Đơn giá",
          field: "dongia",
          // dataFormat: this.prefixformatDate
        },
        {
          label: "Phân xưởng công nhân",
          field: "phanxuong_cn",
        },
        {
          label: "Tổ công nhân",
          field: "to_cn",
          // dataFormat: this.prefixformatDate
        },
        {
          label: "Ngày thực hiện",
          field: "ngaythuchien",
          dataFormat: this.prefixformatDate,
        },
        {
          label: "Ngày hoàn thành",
          field: "ngayhoanthanh",
          dataFormat: this.prefixformatDate,
        },
        {
          label: "Ghi chú",
          field: "ghichu",
          // dataFormat: this.prefixformatDate
        },
      ],
      columns_luong: [
        {
          label: "Mã CN",
          field: "macn",
        },
        {
          label: "Tên CN",
          field: "tencn",
        },
        {
          label: "Ngày công",
          field: "songaylam",
        },
        {
          label: "Lương trung bình",
          field: "luongtb",
        },
        {
          label: "Lương QLSP",
          field: "luongqlsp",
        },
        {
          label: "Lương công đoạn",
          field: "luongcd",
        },
        {
          label: "Lương công nhật",
          field: "luongcn",
        },
        {
          label: "Số ngày hỗ trợ",
          field: "ngayhotro",
        },
        {
          label: "Thành tiền hỗ trợ",
          field: "thanhtienhotro",
        },
        {
          label: "Tổng lương",
          field: "tongluong",
        },
        {
          label: "Ăn ca",
          field: "anca",
        },
        {
          label: "Lương CB",
          field: "luongcb",
        },
        {
          label: "BHXH",
          field: "bhxh",
        },
        {
          label: "Công đoàn",
          field: "congdoan",
        },
        {
          label: "Tiền phạt",
          field: "antrua",
        },
        {
          label: "Tổng trừ",
          field: "tongtru",
        },
        {
          label: "Tổng nhận",
          field: "tongnhan",
        },
      ],
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

    tongLuongCongDoan() {
      // console.log(this.dscongnhan);
      const tong = this.dscongnhan.reduce(
        (accumulator, currentValue) => accumulator + currentValue.luongcd,
        0
      );
      return tong.toFixed(2);
    },
    tongLuongQuanLy() {
      const tong = this.tongLuongCongDoan * this.tyletongluongql;
      return tong.toFixed(2);
    },
    // luongQuanLy1() {
    //   const tong = this.tongLuongQuanLy * this.tylequanly1;
    //   return tong.toFixed(2);
    // },

    // tổng thành tiền lương công đoạn
    tongThanhtienLCD() {
      return this.detailcn.reduce(
        (total, item) =>
          total +
          (parseFloat(item.sohong) + parseFloat(item.sodat)) *
            parseFloat(item.dongia),
        0
      );
    },
    // tổng thành tiền công nhật
    tongThanhtienLCnhat() {
      return this.detailcongnhat.reduce(
        (total, item) =>
          total + parseFloat(item.sogiocong) * parseFloat(item.dongia),
        0
      );
    },

    // tổng thành tiền ăn ca
    tongAnca() {
      let sum = 0;
      for (let i = 0; i < this.dataDetailAnca.length; i++) {
        if (this.dataDetailAnca[i].tienan != "") {
          // console.log(parseInt(this.dataDetailAnca[i].tienan));
          sum += parseInt(this.dataDetailAnca[i].tienan);
        }
      }
      return sum;
    },

    // làm hàng tổng
    // tổng lương qlsp
    subRow_qlsp() {
      return this.dscongnhan.reduce(
        (total, item) => total + parseFloat(item.luongqlsp),
        0
      );
    },
    // tổng lương công đoạn
    subRow_luongcd() {
      return this.dscongnhan.reduce((total, item) => total + item.luongcd, 0);
    },
    // sum cong nhật
    subRow_luongcn() {
      return this.dscongnhan.reduce((total, item) => total + item.luongcn, 0);
    },
    // sum số ngày làm
    subRow_songaylam() {
      return this.dscongnhan.reduce((total, item) => total + item.songaylam, 0);
    },
    // sum thành tiền ca
    subRow_thanhtienca() {
      return this.dscongnhan.reduce((total, item) => total + item.thanhtien, 0);
    },
    // sum ngày hỗ trợ
    subRow_ngayhotro() {
      return this.dscongnhan.reduce(
        (total, item) => total + parseFloat(item.ngayhotro),
        0
      );
    },
    // sum tiền hỗ trợ
    subRow_tienhotro() {
      return this.dscongnhan.reduce(
        (total, item) =>
          total + parseFloat(item.ngayhotro) * parseFloat(item.luongmem),
        0
      );
    },
    // sum tổng lương
    subRow_tongluong() {
      return this.dscongnhan.reduce(
        (total, item) =>
          total +
          (parseFloat(item.luongqlsp) +
            item.luongcd +
            item.luongcn +
            parseFloat(item.ngayhotro) * parseFloat(item.luongmem)),
        0
      );
    },
    // sum tổng lương trung bình
    subRow_tongluongtb() {
      return this.dscongnhan.reduce(
        (total, item) =>
          total +
          (parseFloat(item.luongqlsp) +
            item.luongcd +
            item.luongcn +
            parseFloat(item.ngayhotro) * parseFloat(item.luongmem)) /
            item.songaylam,
        0
      );
    },
    // sum lương cb
    subRow_luongcb() {
      return this.dscongnhan.reduce((total, item) => total + item.luongcb, 0);
    },
    // sum bhxh
    subRow_bhxh() {
      return this.dscongnhan.reduce((total, item) => total + item.bhxh, 0);
    },
    // sum phat
    subRow_phat() {
      return this.dscongnhan.reduce(
        (total, item) => total + parseFloat(item.antrua),
        0
      );
    },
    // sum cđ
    subRow_congdoan() {
      return this.dscongnhan.reduce(
        (total, item) => total + parseFloat(item.congdoan),
        0
      );
    },
    // sum tổng trừ
    subRow_tongtru() {
      return this.dscongnhan.reduce(
        (total, item) =>
          total +
          (item.bhxh + parseFloat(item.congdoan) + parseFloat(item.antrua)),
        0
      );
    },
    // sum tổng lương nhận
    subRow_tongnhan() {
      return this.dscongnhan.reduce(
        (total, item) =>
          total +
          (parseFloat(item.luongqlsp) +
            item.luongcd +
            item.luongcn +
            parseFloat(item.ngayhotro) * parseFloat(item.luongmem) +
            item.thanhtien -
            (item.bhxh + parseFloat(item.congdoan) + parseFloat(item.antrua))),
        0
      );
    },

    dscongnhan_download() {
      return this.dscongnhan.map((row) => {
        return {
          macn: row.macn,
          tencn: row.tencongnhan,
          songaylam: row.songaylam,
          luongtb: Math.round(
            (parseFloat(row.luongqlsp) +
              parseFloat(row.luongcd) +
              parseFloat(row.luongcn) +
              parseFloat(row.ngayhotro) * parseFloat(row.luongmem)) /
              row.songaylam
          ),
          luongqlsp: Math.round(row.luongqlsp),
          luongcd: row.luongcd,
          luongcn: row.luongcn,
          ngayhotro: row.ngayhotro,
          thanhtienhotro: Math.round(
            parseFloat(row.ngayhotro) * parseFloat(row.luongmem)
          ),
          tongluong: Math.round(
            parseFloat(row.luongqlsp) +
              row.luongcd +
              row.luongcn +
              parseFloat(row.ngayhotro) * parseFloat(row.luongmem)
          ),
          anca: row.thanhtien,
          luongcb: row.luongcb,
          bhxh: row.bhxh,
          congdoan: row.congdoan,
          antrua: row.antrua,
          tongtru: Math.round(
            row.bhxh + parseFloat(row.congdoan) + parseFloat(row.antrua)
          ),
          tongnhan: Math.round(
            parseFloat(row.luongqlsp) +
              row.luongcd +
              row.luongcn +
              row.thanhtien +
              parseFloat(row.ngayhotro) * parseFloat(row.luongmem) -
              (row.bhxh + parseFloat(row.congdoan) + parseFloat(row.antrua))
          ),
        };
      });
    },
  },

  mounted() {
    this.currentDateTime();
    this.getDay();
    this.getLunch();
    this.getPhanxuong();
  },

  methods: {
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
      this.maxuong = "";
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
      console.log(this.maxuong);
      console.log(this.mato);
    },
    async getWithTo(e) {
      // console.log(this.mapx)
      this.mato = "";
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
      // console.log('id ', id);
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
      this.dataAllCongdoan = await this.$axios.$get(
        `/api/ketoan/detailallluongcongdoaninmonth?nam=${this.nam}&thang=${this.thang}&mapx=${this.maxuong}`
      );
      this.dataAllCongnhat = await this.$axios.$get(
        `/api/ketoan/detailallluongcongnhatinmonth?nam=${this.nam}&thang=${this.thang}&mapx=${this.maxuong}`
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
      this.form = { ...phieulo };
      // get info công đoạn
      // bỏ cái này
      // this.luongcongdoan = await this.$axios.$get(
      //   `/api/ketoan/getphieulocongdoan?malosx=${this.form.malosx}&mapx=${this.form.mapx}`
      // );
      this.luongcongdoan = await this.$axios.$get(
        `/api/ketoan/getphieulocongdoan?_id_losx=${phieulo._id}`
      );
      // console.log(this.luongcongdoan)
      this.congnhat = await this.$axios.$get(
        `/api/ketoan/getphieulocongnhat?_id_losx=${phieulo._id}`
      );
    },

    // async caculateluong() {
    //   this.data_download = this.dscongnhan;
    //   console.log(this.data_download);
    // },

    async countLuongqlsp(data) {
      // console.log(data);
      const luongqlsp = parseFloat(data.tyleqlsp) * this.tongLuongQuanLy;
      // console.log(luongqlsp);
      for (let i = 0; i < this.dscongnhan.length; i++) {
        if (this.dscongnhan[i].macn === data.macn) {
          this.dscongnhan[i].luongqlsp = luongqlsp;
        }
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
          this.dscongnhan = [];
          // tìm xem những người đã có key_thangnam trong csdl ở bảng luongthang?
          // nếu có rồi thì không cho hiện ra nữa.
          this.keyThangnam =
            this.thang.trim() +
            this.nam.trim() +
            "-" +
            this.maxuong +
            "-" +
            this.mato;
          const arrkeythangnam = [];
          const listkeythangnam = await this.$axios.$get(
            `/api/ketoan/getkeythangnamwithdata?key_thangnam=${this.keyThangnam}`
          );
          // console.log(this.listkeythangnam);
          for (let i = 0; i < listkeythangnam.length; i++) {
            let ktn = listkeythangnam[i].keyfind.trim();
            arrkeythangnam.push(ktn);
          }
          // console.log(arrkeythangnam)

          if (this.mato == "") {
            this.isActive_load_luong = true;
            const res = await this.$axios.$get(
              `/api/ketoan/getallluongcongdoanpx?nam=${this.nam}&thang=${this.thang}&mapx=${this.maxuong}`
            );
            this.dscongnhan = res.data;
            const result = [];
            for (let i = 0; i < this.dscongnhan.length; i++) {
              let _key =
                this.dscongnhan[i].macn +
                "-" +
                this.dscongnhan[i].tencongnhan +
                "-" +
                this.keyThangnam;
              let found = false;
              // console.log(_key);
              for (let j = 0; j < arrkeythangnam.length; j++) {
                if (_key === arrkeythangnam[j]) {
                  found = true;
                  break;
                }
              }
              if (!found) {
                result.push(this.dscongnhan[i]);
              }
            }

            // console.log(result);
            this.dscongnhan = result;
            // gọi hàm tính toán lại dữ liệu lương
            if (res.success == true) {
              this.isActive_load_luong = false;
            }
            if (this.dscongnhan.length <= 0) {
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
                title: "Đã chốt hết dữ liệu lương rồi",
              });
            }
          } else {
            this.isActive_load_luong = true;
            const res = await this.$axios.$get(
              `/api/ketoan/getallluongcongdoanto?nam=${this.nam}&thang=${this.thang}&mato=${this.mato}`
            );
            // console.log(res);
            this.dscongnhan = res.data;
            const result = [];
            for (let i = 0; i < this.dscongnhan.length; i++) {
              let _key =
                this.dscongnhan[i].macn +
                "-" +
                this.dscongnhan[i].tencongnhan +
                "-" +
                this.keyThangnam;
              let found = false;
              // console.log(_key);
              for (let j = 0; j < arrkeythangnam.length; j++) {
                if (_key === arrkeythangnam[j]) {
                  found = true;
                  break;
                }
              }
              if (!found) {
                result.push(this.dscongnhan[i]);
              }
            }

            // console.log(result);
            this.dscongnhan = result;

            if (res.success == true) {
              this.isActive_load_luong = false;
            }
            if (this.dscongnhan.length <= 0) {
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
                title: "Đã chốt hết dữ liệu lương rồi",
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
      this.detailcongnhat = await this.$axios.$get(
        `/api/ketoan/detailluongcongnhatcn?macongnhan=${macn}&nam=${this.nam}&thang=${this.thang}&mapx=${this.maxuong}`
      );
      // console.log(this.detailcongnhat);
    },

    async detailAnca(item) {
      this.isActive_anCa = true;
      this.dataDetailAnca = await this.$axios.$get(
        `/api/ketoan/detailanca?congnhan=${item.macn}&nam=${this.nam}&thang=${this.thang}&mapx=${this.maxuong}`
      );
    },

    async onAddLuongthang() {
      const result = await Swal.fire({
        title: `Bạn chắc chắn tạo lương tại kỳ: ${this.thang}/${this.nam}`,
        showDenyButton: true,
        confirmButtonText: "Chắc chắn",
        denyButtonText: `Hủy`,
      });
      if (result.isConfirmed) {
        try {
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
              title:
                "Chưa lấy số liệu lương hoặc chưa tích chọn người cần vào lương !!!",
            });
          } else {
            // check key thang nam chốt lương trong CSDL
            // khai báo mảng chứa key
            // console.log(this.selected[0].ngayhotro);
            // console.log(parseFloat(this.selected[0].ngayhotro) * 354000);
            // const arrkeythangnam = [];
            // const listkeythangnam = await this.$axios.$get(
            //   `/api/ketoan/getkeythangnam`
            // );
            // for (let i = 0; i < listkeythangnam.length; i++) {
            //   let ktn = listkeythangnam[i].key_thangnam.trim();
            //   arrkeythangnam.push(ktn);
            // }
            this.keyThangnam = "";
            this.keyThangnam =
              this.thang.trim() +
              this.nam.trim() +
              "-" +
              this.maxuong +
              "-" +
              this.mato;

            console.log(this.keyThangnam);

            for (let i = 0; i < this.selected.length; i++) {
              let data = {
                mapb: this.dscongnhan[0].mapx,
                tenpb: this.dscongnhan[0].tenpx,
                mato: this.selected[i].mato,
                manv: this.selected[i].macn,
                hotennv: this.selected[i].tencongnhan,
                chucvu: this.selected[i].chucvu,
                luongcb: this.selected[i].luongcb,
                luongmem: this.selected[i].luongmem,
                luongqlsp: this.selected[i].luongqlsp,
                luongcd: this.selected[i].luongcd,
                luongps: this.selected[i].luongcn,
                tongluong:
                  parseFloat(this.selected[i].luongqlsp) +
                  this.selected[i].luongcd +
                  this.selected[i].luongcn +
                  parseFloat(this.selected[i].ngayhotro) *
                    parseFloat(this.selected[i].luongmem),
                antrua: this.selected[i].thanhtien,
                songaycong: this.selected[i].songaylam,
                ngayhotro: parseFloat(this.selected[i].ngayhotro),
                tienhotro:
                  parseFloat(this.selected[i].ngayhotro) *
                  parseFloat(this.selected[i].luongmem),
                bhxh: this.selected[i].bhxh,
                congdoan: this.selected[i].congdoan,
                tamung: this.selected[i].tienung,
                tongtru:
                  parseFloat(this.selected[i].congdoan) +
                  this.selected[i].bhxh +
                  parseFloat(this.selected[i].antrua),
                tongnhan:
                  parseFloat(this.selected[i].luongqlsp) +
                  this.selected[i].luongcd +
                  this.selected[i].luongcn +
                  this.selected[i].thanhtien +
                  parseFloat(this.selected[i].ngayhotro) *
                    parseFloat(this.selected[i].luongmem) -
                  (this.selected[i].bhxh +
                    parseFloat(this.selected[i].congdoan) +
                    parseFloat(this.selected[i].antrua)),
                tienphat: this.selected[i].antrua,
                createdAt: this.createdAt,
                createdBy: this.createdBy,
                thang: this.thang,
                nam: this.nam,
                key_thangnam: this.keyThangnam,
                status: true,
                stk: this.selected[i].stk,
                tennganhang: this.selected[i].tennh,
                nhanl1: 0,
                nhanl2: 0,
                nhanl3: 0,
                nhanl4: 0,
                nhanl5: 0,
                nhanl6: 0,
                sttchon: this.selected[i].sttchon,
              };
              // console.log(data);
              const res = this.$axios.$post("/api/ketoan/themluongthang", data);

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

.modal-card-1 {
  width: 50px;
  height: 10px;
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
