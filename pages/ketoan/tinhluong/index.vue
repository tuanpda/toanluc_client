<template>
  <div class="columns">
    <div class="column container">
      <br />
      <div class="box" style="margin-left: 3px; margin-right: 3px">
        <div class="columns">
          <div class="column">
            <div class="control">
              <span class="icon is-small is-left">
                <i style="color: #00d1b2" class="fas fa-calculator"></i>
              </span>
              <span style="color: #3850b7; font-size: 15px; font-weight: bold"
                >Lập danh sách lương</span
              >
            </div>
          </div>
        </div>

        <div class="box">
          <div class="columns">
            <div class="column">
              <div class="select is-small is-fullwidth">
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
            </div>
            <div class="column">
              <div class="select is-small is-fullwidth">
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
            </div>
            <div class="column" style="text-align: right">
              <div class="control has-icons-left">
                <div class="select is-small is-fullwidth">
                  <select @change="getWithKhoi($event)">
                    <option selected>-- Xem theo khối --</option>
                    <option v-for="item in khoivp" :value="item.makhoi">
                      {{ item.makhoi }} -- {{ item.tenkhoi }}
                    </option>
                  </select>
                </div>
                <span class="icon is-small is-left">
                  <i style="color: #48c78e" class="fas fa-kaaba"></i>
                </span>
              </div>
            </div>
            <div class="column" style="text-align: right">
              <button
                :disabled="!isSaveSale"
                @click="onReport"
                class="button is-danger is-small"
              >
                <span class="icon is-small">
                  <i class="fas fa-signature"></i>
                </span>
                <span>Chốt và lưu lương</span>
              </button>
            </div>
          </div>
        </div>

        <!-- bảng tính lương cho khối văn phòng -->
        <div v-if="isKhoiVP == true" class="table_wrapper">
          <table
            class="table is-responsive is-bordered is-striped is-narrow is-hoverable is-fullwidth"
          >
            <tr style="background-color: #fffaeb">
              <td
                rowspan="2"
                style="text-align: center; font-weight: bold; font-size: small"
              >
                Chọn <br />
                <input type="checkbox" v-model="selectAll" />
              </td>
              <td
                rowspan="2"
                style="text-align: center; font-weight: bold; font-size: small"
              >
                STT
              </td>
              <td
                rowspan="2"
                style="text-align: center; font-weight: bold; font-size: small"
              >
                Họ tên
              </td>
              <td
                rowspan="2"
                style="text-align: center; font-weight: bold; font-size: small"
              >
                Phòng
              </td>

              <td
                rowspan="2"
                style="text-align: center; font-weight: bold; font-size: small"
              >
                Ngày công
              </td>
              <td
                rowspan="2"
                style="text-align: center; font-weight: bold; font-size: small"
              >
                Lương tháng
              </td>
              <td
                rowspan="2"
                style="text-align: center; font-weight: bold; font-size: small"
              >
                Lương trách <br />
                nhiệm
              </td>
              <td
                colspan="2"
                style="text-align: center; font-weight: bold; font-size: small"
              >
                Thưởng doanh thu
              </td>
              <td
                rowspan="2"
                style="text-align: center; font-weight: bold; font-size: small"
              >
                Phạt
              </td>
              <td
                rowspan="2"
                style="text-align: center; font-weight: bold; font-size: small"
              >
                Số giờ <br />
                ngoài giờ
              </td>
              <td
                rowspan="2"
                style="text-align: center; font-weight: bold; font-size: small"
              >
                Số giờ <br />
                ngoài giờ <br />
                Chủ nhật
              </td>
              <td
                rowspan="2"
                style="text-align: center; font-weight: bold; font-size: small"
              >
                Lương ngoài giờ
                <br />
                / Chủ nhật
              </td>
              <td
                rowspan="2"
                style="text-align: center; font-weight: bold; font-size: small"
              >
                Hỗ trợ
              </td>
              <td
                rowspan="2"
                style="text-align: center; font-weight: bold; font-size: small"
              >
                Tổng lương
              </td>
              <td
                rowspan="2"
                style="text-align: center; font-weight: bold; font-size: small"
              >
                Lương BHXH
              </td>
              <td
                colspan="3"
                style="text-align: center; font-weight: bold; font-size: small"
              >
                Các khoản khấu trừ
              </td>
              <td
                rowspan="2"
                style="text-align: center; font-weight: bold; font-size: small"
              >
                Lương nhận
              </td>
            </tr>
            <tr style="background-color: #fffaeb">
              <td
                style="
                  text-align: center;
                  font-weight: bold;
                  font-size: small;
                  background-color: #fffaeb;
                "
              >
                Điều chỉnh
              </td>
              <td
                style="text-align: center; font-weight: bold; font-size: small"
              >
                Thưởng
              </td>

              <td
                style="
                  text-align: center;
                  font-weight: bold;
                  font-size: small;
                  background-color: #fffaeb;
                "
              >
                BHXH
              </td>
              <td
                style="text-align: center; font-weight: bold; font-size: small"
              >
                Công đoàn
              </td>
              <td
                style="text-align: center; font-weight: bold; font-size: small"
              >
                Tổng KT
              </td>
            </tr>
            <tr v-for="(nv, index) in dsnhanvien" :key="index">
              <td style="text-align: center">
                <input v-model="selected" :value="nv" type="checkbox" />
              </td>
              <td style="text-align: center; font-size: small">
                {{ index + 1 }}
              </td>
              <td style="font-size: small">{{ nv.tennv }}</td>
              <td style="font-size: small">
                {{ nv.tenphong }}
              </td>
              <td style="text-align: center; font-size: small">
                {{ nv.sum_ngay_lam }}
              </td>
              <td style="text-align: center; font-size: small">
                {{ nv.luongngay | formatNumber }}
              </td>
              <td style="text-align: center; font-size: small">
                {{ nv.luongtrachnhiem | formatNumber }}
              </td>
              <td style="text-align: center; font-size: small">
                <input
                  v-model="nv.dt_dieuchinh"
                  type="number"
                  class="input is-small"
                />
              </td>
              <td style="text-align: center; font-size: small">
                <input
                  v-model="nv.dt_thuong"
                  type="number"
                  class="input is-small"
                />
              </td>
              <td style="text-align: center; font-size: small">
                <input
                  v-model="nv.dt_phat"
                  type="number"
                  class="input is-small"
                />
              </td>
              <td style="text-align: center; font-size: small">
                <input
                  v-model="nv.sogiongoaigio"
                  type="number"
                  class="input is-small"
                />
              </td>
              <td style="text-align: center; font-size: small">
                <input
                  v-model="nv.sogiongoaigiochunhat"
                  type="number"
                  class="input is-small"
                />
              </td>
              <td style="text-align: center; font-size: small">
                {{
                  (Math.round(
                    ((parseFloat(nv.luongngay) / 26 / 8) *
                      parseInt(nv.sogiongoaigio) *
                      1.5 +
                      (parseFloat(nv.luongngay) / 26) *
                        parseInt(nv.sogiongoaigiochunhat) *
                        2) /
                      1000
                  ) *
                    1000)
                    | formatNumber
                }}
              </td>

              <td>
                <input
                  v-model="nv.thuong"
                  type="number"
                  class="input is-small"
                />
              </td>
              <td
                style="
                  text-align: center;
                  font-size: small;
                  font-weight: bold;
                  color: #f14668;
                "
              >
                {{
                  (Math.round(
                    (parseFloat(nv.luongtrachnhiem) +
                      (parseFloat(nv.luongngay) +
                        parseFloat(nv.dt_dieuchinh) +
                        parseFloat(nv.dt_thuong) +
                        parseFloat(nv.thuong) +
                        ((parseFloat(nv.luongngay) / 26 / 8) *
                          parseInt(nv.sogiongoaigio) *
                          1.5 +
                          (parseFloat(nv.luongngay) / 26) *
                            parseInt(nv.sogiongoaigiochunhat) *
                            2) -
                        parseFloat(nv.dt_phat))) /
                      1000
                  ) *
                    1000)
                    | formatNumber
                }}
              </td>
              <td style="text-align: center; font-size: small">
                {{ nv.mucluong | formatNumber }}
              </td>
              <td style="text-align: center; font-size: small">
                {{ nv.bhxh | formatNumber }}
              </td>

              <td style="text-align: center; font-size: small">
                <input
                  type="text"
                  class="input is-small"
                  v-model="nv.congdoan"
                />
              </td>
              <td style="text-align: center; font-size: small">
                {{
                  (parseFloat(nv.bhxh) + parseFloat(nv.congdoan)) | formatNumber
                }}
              </td>
              <template>
                <td
                  style="
                    text-align: right;
                    font-size: small;
                    font-weight: bold;
                    color: #f14668;
                  "
                >
                  {{
                    (Math.round(
                      (parseFloat(nv.luongtrachnhiem) +
                        (parseFloat(nv.luongngay) +
                          parseFloat(nv.dt_dieuchinh) +
                          parseFloat(nv.dt_thuong) +
                          parseFloat(nv.thuong) +
                          ((parseFloat(nv.luongngay) / 26 / 8) *
                            parseInt(nv.sogiongoaigio) *
                            1.5 +
                            (parseFloat(nv.luongngay) / 26) *
                              parseInt(nv.sogiongoaigiochunhat) *
                              2) -
                          parseFloat(nv.dt_phat)) -
                        (parseFloat(nv.bhxh) + parseFloat(nv.congdoan))) /
                        1000
                    ) *
                      1000)
                      | formatNumber
                  }}
                </td>
              </template>
            </tr>
            <tr>
              <td colspan="4"></td>
              <td
                style="
                  color: red;
                  font-size: small;
                  font-weight: bold;
                  text-align: center;
                "
              >
                {{ subRow_ngaylam | formatNumber }}
              </td>
              <td
                style="
                  color: red;
                  font-size: small;
                  font-weight: bold;
                  text-align: center;
                  background-color: white;
                "
              >
                {{ subRow_luongthang | formatNumber }}
              </td>
              <td
                style="
                  color: red;
                  font-size: small;
                  font-weight: bold;
                  text-align: center;
                "
              >
                {{ subRow_luongtrachnhiem | formatNumber }}
              </td>
              <td
                style="
                  color: red;
                  font-size: small;
                  font-weight: bold;
                  text-align: center;
                "
              >
                {{ subRow_dt_dieuchinh | formatNumber }}
              </td>
              <td
                style="
                  color: red;
                  font-size: small;
                  font-weight: bold;
                  text-align: center;
                "
              >
                {{ subRow_dt_thuong | formatNumber }}
              </td>
              <td
                style="
                  color: red;
                  font-size: small;
                  font-weight: bold;
                  text-align: center;
                "
              >
                {{ subRow_phat | formatNumber }}
              </td>
              <td
                style="
                  color: red;
                  font-size: small;
                  font-weight: bold;
                  text-align: center;
                "
              >
                {{ subRow_sogiongoaigio }}
              </td>
              <td
                style="
                  color: red;
                  font-size: small;
                  font-weight: bold;
                  text-align: center;
                "
              >
                {{ subRow_sogiongoaigiochunhat }}
              </td>
              <td
                style="
                  color: red;
                  font-size: small;
                  font-weight: bold;
                  text-align: center;
                "
              >
                {{ subRow_tongtienngoaigio | formatNumber }}
              </td>
              <td
                style="
                  color: red;
                  font-size: small;
                  font-weight: bold;
                  text-align: center;
                "
              >
                {{ subRow_thuong | formatNumber }}
              </td>
              <td
                style="
                  color: red;
                  font-size: small;
                  font-weight: bold;
                  text-align: center;
                "
              >
                {{ subRow_tongluong | formatNumber }}
              </td>
              <td
                style="
                  color: red;
                  font-size: small;
                  font-weight: bold;
                  text-align: center;
                "
              >
                {{ subRow_mucluong | formatNumber }}
              </td>
              <td
                style="
                  color: red;
                  font-size: small;
                  font-weight: bold;
                  text-align: center;
                "
              >
                {{ subRow_bhxh | formatNumber }}
              </td>
              <td
                style="
                  color: red;
                  font-size: small;
                  font-weight: bold;
                  text-align: center;
                "
              >
                {{ subRow_congdoan | formatNumber }}
              </td>
              <td
                style="
                  color: red;
                  font-size: small;
                  font-weight: bold;
                  text-align: center;
                "
              >
                {{ subRow_tongtru | formatNumber }}
              </td>
              <td
                style="
                  color: red;
                  font-size: small;
                  font-weight: bold;
                  text-align: right;
                "
              >
                {{ subRow_luongnhan | formatNumber }}
              </td>
            </tr>
          </table>
        </div>

        <!-- bảng tính lương cho khối gián tiếp -->
        <div v-else class="table_wrapper">
          <table
            class="table is-responsive is-bordered is-striped is-narrow is-hoverable is-fullwidth"
          >
            <tr style="background-color: #fffaeb">
              <td
                rowspan="2"
                style="text-align: center; font-weight: bold; font-size: small"
              >
                Chọn <br />
                <input type="checkbox" v-model="selectAll" />
              </td>
              <td
                rowspan="2"
                style="text-align: center; font-weight: bold; font-size: small"
              >
                STT
              </td>
              <td
                rowspan="2"
                style="text-align: center; font-weight: bold; font-size: small"
              >
                Họ tên
              </td>
              <td
                rowspan="2"
                style="text-align: center; font-weight: bold; font-size: small"
              >
                Phòng
              </td>

              <td
                rowspan="2"
                style="text-align: center; font-weight: bold; font-size: small"
              >
                Ngày công
              </td>
              <td
                rowspan="2"
                style="text-align: center; font-weight: bold; font-size: small"
              >
                Lương tháng
              </td>
              <td
                rowspan="2"
                style="text-align: center; font-weight: bold; font-size: small"
              >
                Lương trách <br />
                nhiệm
              </td>
              <td
                colspan="2"
                style="text-align: center; font-weight: bold; font-size: small"
              >
                Thưởng doanh thu
              </td>
              <td
                rowspan="2"
                style="text-align: center; font-weight: bold; font-size: small"
              >
                Phạt
              </td>
              <td
                rowspan="2"
                style="text-align: center; font-weight: bold; font-size: small"
              >
                Số giờ <br />
                ngoài giờ
              </td>
              <td
                rowspan="2"
                style="text-align: center; font-weight: bold; font-size: small"
              >
                Số giờ <br />
                ngoài giờ <br />
                Chủ nhật
              </td>
              <td
                rowspan="2"
                style="text-align: center; font-weight: bold; font-size: small"
              >
                Lương ngoài giờ
                <br />
                / Chủ nhật
              </td>
              <td
                rowspan="2"
                style="text-align: center; font-weight: bold; font-size: small"
              >
                Hỗ trợ
              </td>
              <td
                rowspan="2"
                style="text-align: center; font-weight: bold; font-size: small"
              >
                Tổng lương
              </td>
              <td
                rowspan="2"
                style="text-align: center; font-weight: bold; font-size: small"
              >
                Lương BHXH
              </td>
              <td
                colspan="3"
                style="text-align: center; font-weight: bold; font-size: small"
              >
                Các khoản khấu trừ
              </td>
              <td
                rowspan="2"
                style="text-align: center; font-weight: bold; font-size: small"
              >
                Lương nhận
              </td>
            </tr>
            <tr style="background-color: #fffaeb">
              <td
                style="
                  text-align: center;
                  font-weight: bold;
                  font-size: small;
                  background-color: #fffaeb;
                "
              >
                Điều chỉnh
              </td>
              <td
                style="text-align: center; font-weight: bold; font-size: small"
              >
                Thưởng
              </td>

              <td
                style="
                  text-align: center;
                  font-weight: bold;
                  font-size: small;
                  background-color: #fffaeb;
                "
              >
                BHXH
              </td>
              <td
                style="text-align: center; font-weight: bold; font-size: small"
              >
                Công đoàn
              </td>
              <td
                style="text-align: center; font-weight: bold; font-size: small"
              >
                Tổng KT
              </td>
            </tr>
            <tr v-for="(nv, index) in dsnhanvien" :key="index">
              <td style="text-align: center">
                <input v-model="selected" :value="nv" type="checkbox" />
              </td>
              <td style="text-align: center; font-size: small">
                {{ index + 1 }}
              </td>
              <td style="font-size: small">{{ nv.tennv }}</td>
              <td style="font-size: small">
                {{ nv.tenphong }}
              </td>
              <td style="text-align: center; font-size: small">
                {{ nv.sum_ngay_lam }}
              </td>
              <template v-if="parseFloat(nv.sum_ngay_lam) >= 26">
                <td style="text-align: center; font-size: small">
                  {{ (parseFloat(nv.luongngay) * 26) | formatNumber }}
                </td>
              </template>
              <template v-else>
                <td style="text-align: center; font-size: small">
                  {{
                    (parseFloat(nv.luongngay) * parseInt(nv.sum_ngay_lam))
                      | formatNumber
                  }}
                </td>
              </template>
              <td style="text-align: center; font-size: small">
                {{ nv.luongtrachnhiem | formatNumber }}
              </td>
              <td style="text-align: center; font-size: small">
                <input
                  v-model="nv.dt_dieuchinh"
                  type="number"
                  class="input is-small"
                />
              </td>
              <td style="text-align: center; font-size: small">
                <input
                  v-model="nv.dt_thuong"
                  type="number"
                  class="input is-small"
                />
              </td>
              <td style="text-align: center; font-size: small">
                <input
                  v-model="nv.dt_phat"
                  type="number"
                  class="input is-small"
                />
              </td>
              <td style="text-align: center; font-size: small">
                <input
                  v-model="nv.sogiongoaigio"
                  type="number"
                  class="input is-small"
                />
              </td>
              <td style="text-align: center; font-size: small">
                <input
                  v-model="nv.sogiongoaigiochunhat"
                  type="number"
                  class="input is-small"
                />
              </td>
              <td style="text-align: center; font-size: small">
                {{
                  ((parseFloat(nv.luongngay) / 8) *
                    parseInt(nv.sogiongoaigio) *
                    1.5 +
                    parseFloat(nv.luongngay) *
                      parseInt(nv.sogiongoaigiochunhat) *
                      2)
                    | formatNumber
                }}
              </td>
              <td>
                <input
                  v-model="nv.thuong"
                  type="number"
                  class="input is-small"
                />
              </td>

              <!-- tổng lương nếu ngày công >= 26 -->
              <template v-if="parseFloat(nv.sum_ngay_lam) >= 26">
                <td
                  style="
                    text-align: center;
                    font-size: small;
                    font-weight: bold;
                    color: #f14668;
                  "
                >
                  {{
                    (parseFloat(nv.luongtrachnhiem) +
                      parseFloat(nv.luongngay) * 26 +
                      parseFloat(nv.dt_dieuchinh) +
                      parseFloat(nv.dt_thuong) +
                      parseFloat(nv.thuong) +
                      ((parseFloat(nv.luongngay) / 8) *
                        parseInt(nv.sogiongoaigio) *
                        1.5 +
                        parseFloat(nv.luongngay) *
                          parseInt(nv.sogiongoaigiochunhat) *
                          2) -
                      parseFloat(nv.dt_phat))
                      | formatNumber
                  }}
                </td>
              </template>
              <!-- tổng lương nếu ngày công < 26 -->
              <template v-else>
                <td
                  style="
                    text-align: center;
                    font-size: small;
                    font-weight: bold;
                    color: #f14668;
                  "
                >
                  {{
                    (parseFloat(nv.luongtrachnhiem) +
                      parseFloat(nv.luongngay) * parseInt(nv.sum_ngay_lam) +
                      parseFloat(nv.dt_dieuchinh) +
                      parseFloat(nv.dt_thuong) +
                      parseFloat(nv.thuong) +
                      ((parseFloat(nv.luongngay) / 8) *
                        parseInt(nv.sogiongoaigio) *
                        1.5 +
                        parseFloat(nv.luongngay) *
                          parseInt(nv.sogiongoaigiochunhat) *
                          2) -
                      parseFloat(nv.dt_phat))
                      | formatNumber
                  }}
                </td>
              </template>

              <td style="text-align: center; font-size: small">
                {{ nv.mucluong | formatNumber }}
              </td>
              <td style="text-align: center; font-size: small">
                {{ nv.bhxh | formatNumber }}
              </td>

              <td style="text-align: center; font-size: small">
                <input
                  type="text"
                  class="input is-small"
                  v-model="nv.congdoan"
                />
              </td>
              <td style="text-align: center; font-size: small">
                {{
                  (parseFloat(nv.bhxh) + parseFloat(nv.congdoan)) | formatNumber
                }}
              </td>

              <!-- tổng nhận nếu ngày công >= 26 -->
              <template v-if="parseFloat(nv.sum_ngay_lam) >= 26">
                <td
                  style="
                    text-align: right;
                    font-size: small;
                    font-weight: bold;
                    color: #f14668;
                  "
                >
                  {{
                    (parseFloat(nv.luongtrachnhiem) +
                      parseFloat(nv.luongngay) * 26 +
                      parseFloat(nv.dt_dieuchinh) +
                      parseFloat(nv.dt_thuong) +
                      parseFloat(nv.thuong) +
                      ((parseFloat(nv.luongngay) / 8) *
                        parseInt(nv.sogiongoaigio) *
                        1.5 +
                        parseFloat(nv.luongngay) *
                          parseInt(nv.sogiongoaigiochunhat) *
                          2) -
                      parseFloat(nv.dt_phat) -
                      (parseFloat(nv.bhxh) + parseFloat(nv.congdoan)))
                      | formatNumber
                  }}
                </td>
              </template>
              <!-- tổng nhận nếu ngày công < 26 -->
              <template v-else>
                <td
                  style="
                    text-align: right;
                    font-size: small;
                    font-weight: bold;
                    color: #f14668;
                  "
                >
                  {{
                    (parseFloat(nv.luongtrachnhiem) +
                      parseFloat(nv.luongngay) * parseInt(nv.sum_ngay_lam) +
                      parseFloat(nv.dt_dieuchinh) +
                      parseFloat(nv.dt_thuong) +
                      parseFloat(nv.thuong) +
                      ((parseFloat(nv.luongngay) / 8) *
                        parseInt(nv.sogiongoaigio) *
                        1.5 +
                        parseFloat(nv.luongngay) *
                          parseInt(nv.sogiongoaigiochunhat) *
                          2) -
                      parseFloat(nv.dt_phat) -
                      (parseFloat(nv.bhxh) + parseFloat(nv.congdoan)))
                      | formatNumber
                  }}
                </td>
              </template>
            </tr>
            <tr>
              <td colspan="4"></td>
              <td
                style="
                  color: red;
                  font-size: small;
                  font-weight: bold;
                  text-align: center;
                "
              >
                {{ subRow_ngaylam | formatNumber }}
              </td>
              <td
                style="
                  color: red;
                  font-size: small;
                  font-weight: bold;
                  text-align: center;
                  background-color: white;
                "
              >
                {{ subRow_luongthang_khoigiantiep | formatNumber }}
              </td>
              <td
                style="
                  color: red;
                  font-size: small;
                  font-weight: bold;
                  text-align: center;
                "
              >
                {{ subRow_luongtrachnhiem | formatNumber }}
              </td>
              <td
                style="
                  color: red;
                  font-size: small;
                  font-weight: bold;
                  text-align: center;
                "
              >
                {{ subRow_dt_dieuchinh | formatNumber }}
              </td>
              <td
                style="
                  color: red;
                  font-size: small;
                  font-weight: bold;
                  text-align: center;
                "
              >
                {{ subRow_dt_thuong | formatNumber }}
              </td>
              <td
                style="
                  color: red;
                  font-size: small;
                  font-weight: bold;
                  text-align: center;
                "
              >
                {{ subRow_phat | formatNumber }}
              </td>
              <td
                style="
                  color: red;
                  font-size: small;
                  font-weight: bold;
                  text-align: center;
                "
              >
                {{ subRow_sogiongoaigio }}
              </td>
              <td
                style="
                  color: red;
                  font-size: small;
                  font-weight: bold;
                  text-align: center;
                "
              >
                {{ subRow_sogiongoaigiochunhat }}
              </td>
              <td
                style="
                  color: red;
                  font-size: small;
                  font-weight: bold;
                  text-align: center;
                "
              >
                {{ subRow_tongtienngoaigio_khoigiantiep | formatNumber }}
              </td>
              <td
                style="
                  color: red;
                  font-size: small;
                  font-weight: bold;
                  text-align: center;
                "
              >
                {{ subRow_thuong | formatNumber }}
              </td>
              <td
                style="
                  color: red;
                  font-size: small;
                  font-weight: bold;
                  text-align: center;
                "
              >
                {{ subRow_tongluong_vpgiantiep | formatNumber }}
              </td>
              <td
                style="
                  color: red;
                  font-size: small;
                  font-weight: bold;
                  text-align: center;
                "
              >
                {{ subRow_mucluong | formatNumber }}
              </td>
              <td
                style="
                  color: red;
                  font-size: small;
                  font-weight: bold;
                  text-align: center;
                "
              >
                {{ subRow_bhxh | formatNumber }}
              </td>
              <td
                style="
                  color: red;
                  font-size: small;
                  font-weight: bold;
                  text-align: center;
                "
              >
                {{ subRow_congdoan | formatNumber }}
              </td>
              <td
                style="
                  color: red;
                  font-size: small;
                  font-weight: bold;
                  text-align: center;
                "
              >
                {{ subRow_tongtru | formatNumber }}
              </td>
              <td
                style="
                  color: red;
                  font-size: small;
                  font-weight: bold;
                  text-align: right;
                "
              >
                {{ subRow_luongnhan_vpgiantiep | formatNumber }}
              </td>
            </tr>
          </table>
        </div>
      </div>
      <!-- Modal 3 - detail chấm công ngoài giờ-->
      <div class="">
        <!-- Toggle class  -->
        <div :class="{ 'is-active': isActive }" class="modal">
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
                    Thông tin chấm công ngoài giờ
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
                class="table is-responsive is-bordered is-narrow is-fullwidth"
              >
                <tr style="background-color: #fffaeb">
                  <td
                    style="
                      font-size: small;
                      font-weight: bold;
                      text-align: center;
                      width: 3%;
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
                    Tên nhân viên
                  </td>
                  <td
                    style="
                      font-size: small;
                      font-weight: bold;
                      text-align: center;
                      width: 7%;
                    "
                  >
                    Mức tiền
                  </td>
                  <td
                    style="
                      font-size: small;
                      font-weight: bold;
                      text-align: center;
                      width: 7%;
                    "
                  >
                    Số giờ
                  </td>
                  <td
                    style="
                      font-size: small;
                      font-weight: bold;
                      text-align: center;
                      width: 7%;
                    "
                  >
                    Ngày chấm
                  </td>
                </tr>
                <tr v-for="(it, index) in dataDetailChamngoaigio">
                  <td style="font-size: small; text-align: center">
                    {{ index + 1 }}
                  </td>
                  <td style="font-size: small; text-align: center">
                    {{ it.tennv }}
                  </td>
                  <td style="font-size: small; text-align: center">
                    {{ it.muctien | formatNumber }}
                  </td>
                  <td style="font-size: small; text-align: center">
                    {{ it.sogio }}
                  </td>
                  <td style="font-size: small; text-align: center">
                    {{ it.ngaylam | formatDate }}
                  </td>
                </tr>
              </table>
            </section>
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
      dataDetailChamngoaigio: [],
      dsnhanvien: [],
      qtl: [],
      get_qtl: {},
      form: {},
      mask: currencyMask,
      hisform: {
        tenthaotac: null,
        createdAt: null,
        createdBy: this.$auth.$state.user.username,
        ghichu: null,
      },
      thuong: null,
      keyThangnam: "",
      isExits: null,
      isKhoiVP: false,
      isSaveSale: false,
      //   các tiêu chí hệ số lương
      form: {
        luong_ttv: null,
        luong_max_bhxh_bhyt: null,
        luong_max_bhtn: null,
        songay_tinhluong: null,
        sogio_tinhluong: null,
        tl_lamthem_thuong_bn: null,
        tl_lamthem_nghi_bn: null,
        tl_lamthem_le_bn: null,
        tl_lamthem_thuong_bd: null,
        tl_lamthem_nghi_bd: null,
        tl_lamthem_le_bd: null,
        tl_dong_bhxh_ct: null,
        tl_dong_bhyt_ct: null,
        tl_dong_bhtn_ct: null,
        tl_dong_cd_ct: null,
        tl_dong_bhxh_cn: null,
        tl_dong_bhyt_cn: null,
        tl_dong_bhtn_cn: null,
        tl_dong_cd_cn: null,
        thue_tncn_gtcn: null,
        thue_tncn_gtnt: null,
      },
      tongtiennhan: null,
      selected: [],
      //   các số liệu tính lương
      getDayinmon: null,
      thangLapluong: null,
      namLapluong: null,
      createdAt: null,
      createdBy: this.$auth.$state.user.username,
      // Modals
      isActive: false,

      khoivp: [
        { makhoi: "VPBP", tenkhoi: "Văn phòng bộ phận" },
        { makhoi: "VPGT1", tenkhoi: "Văn phòng gián tiếp 1" },
        { makhoi: "VPGT2", tenkhoi: "Văn phòng gián tiếp 2" },
      ],
      mapb: "",
      makhoi: "",
    };
  },

  computed: {
    selectAll: {
      get: function () {
        return this.dsnhanvien
          ? this.selected.length == this.dsnhanvien.length
          : false;
      },
      set: function (value) {
        var selected = [];

        if (value) {
          this.dsnhanvien.forEach(function (nv) {
            selected.push(nv);
          });
        }

        this.selected = selected;
      },
    },

    // sum ngày công làm việc
    subRow_ngaylam() {
      return this.dsnhanvien.reduce(
        (total, item) => total + parseFloat(item.sum_ngay_lam),
        0
      );
    },

    // sum lương tháng
    // dành cho khối văn phòng. sẽ lấy lương tháng cứng
    subRow_luongthang() {
      return this.dsnhanvien.reduce(
        (total, item) => total + parseFloat(item.luongngay),
        0
      );
    },
    // dành cho khối gián tiếp với điều kiện ngày công > 26
    subRow_luongthang_khoigiantiep() {
      return this.dsnhanvien.reduce((total, item) => {
        if (item.sum_ngay_lam >= 26) {
          return total + parseFloat(item.luongngay * 26);
        } else {
          return total + parseFloat(item.luongngay * item.sum_ngay_lam);
        }
      }, 0);
    },

    // sum lương trách nhiệm
    subRow_luongtrachnhiem() {
      return this.dsnhanvien.reduce(
        (total, item) => total + parseFloat(item.luongtrachnhiem),
        0
      );
    },

    // sum doanh thu điều chỉnh
    subRow_dt_dieuchinh() {
      return this.dsnhanvien.reduce(
        (total, item) => total + parseFloat(item.dt_dieuchinh),
        0
      );
    },

    // sum doanh thu thưởng
    subRow_dt_thuong() {
      return this.dsnhanvien.reduce(
        (total, item) => total + parseFloat(item.dt_thuong),
        0
      );
    },

    // sum phat
    subRow_phat() {
      return this.dsnhanvien.reduce(
        (total, item) => total + parseFloat(item.dt_phat),
        0
      );
    },

    // sum giờ ngoài giờ
    subRow_sogiongoaigio() {
      return this.dsnhanvien.reduce(
        (total, item) => total + parseFloat(item.sogiongoaigio),
        0
      );
    },

    // sum giờ ngoài giờ chủ nhật
    subRow_sogiongoaigiochunhat() {
      return this.dsnhanvien.reduce(
        (total, item) => total + parseFloat(item.sogiongoaigiochunhat),
        0
      );
    },

    // sum tổng tiền ngoài giờ khối văn phòng
    subRow_tongtienngoaigio() {
      return this.dsnhanvien.reduce(
        (total, item) =>
          total +
          ((parseFloat(item.luongngay) / 26 / 8) *
            parseInt(item.sogiongoaigio) *
            1.5 +
            (parseFloat(item.luongngay) / 26) *
              parseInt(item.sogiongoaigiochunhat) *
              2),
        0
      );
    },
    // sum tổng tiền ngoài giờ khối gián tiếp
    subRow_tongtienngoaigio_khoigiantiep() {
      return this.dsnhanvien.reduce((total, item) => {
        return (
          total +
          ((parseFloat(item.luongngay) / 8) *
            parseInt(item.sogiongoaigio) *
            1.5 +
            parseFloat(item.luongngay) *
              parseInt(item.sogiongoaigiochunhat) *
              2)
        );
      }, 0);
    },

    // sum thưởng
    subRow_thuong() {
      return this.dsnhanvien.reduce(
        (total, item) => total + parseFloat(item.thuong),
        0
      );
    },

    // sum tổng lương nhận cho khối văn phòng
    subRow_tongluong() {
      return this.dsnhanvien.reduce(
        (total, item) =>
          total +
          (parseFloat(item.luongtrachnhiem) +
            parseFloat(item.luongngay) +
            parseFloat(item.dt_dieuchinh) +
            parseFloat(item.dt_thuong) +
            parseFloat(item.thuong) +
            ((parseFloat(item.luongngay) / 26 / 8) *
              parseInt(item.sogiongoaigio) *
              1.5 +
              (parseFloat(item.luongngay) / 26) *
                parseInt(item.sogiongoaigiochunhat) *
                2) -
            parseFloat(item.dt_phat)),
        0
      );
    },
    // sum tổng lương cho khối văn phòng gián tiếp
    subRow_tongluong_vpgiantiep() {
      return this.dsnhanvien.reduce((total, item) => {
        if (item.sum_ngay_lam >= 26) {
          return (
            total +
            parseFloat(item.luongtrachnhiem) +
            parseFloat(item.luongngay) * 26 +
            parseFloat(item.dt_dieuchinh) +
            parseFloat(item.dt_thuong) +
            parseFloat(item.thuong) +
            ((parseFloat(item.luongngay) / 8) *
              parseInt(item.sogiongoaigio) *
              1.5 +
              parseFloat(item.luongngay) *
                parseInt(item.sogiongoaigiochunhat) *
                2) -
            parseFloat(item.dt_phat)
          );
        } else {
          return (
            total +
            parseFloat(item.luongtrachnhiem) +
            parseFloat(item.luongngay) * item.sum_ngay_lam +
            parseFloat(item.dt_dieuchinh) +
            parseFloat(item.dt_thuong) +
            parseFloat(item.thuong) +
            ((parseFloat(item.luongngay) / 8) *
              parseInt(item.sogiongoaigio) *
              1.5 +
              parseFloat(item.luongngay) *
                parseInt(item.sogiongoaigiochunhat) *
                2) -
            parseFloat(item.dt_phat)
          );
        }
      }, 0);
    },

    // sum lương cơ bản đóng BHXH
    subRow_mucluong() {
      return this.dsnhanvien.reduce(
        (total, item) => total + parseFloat(item.mucluong),
        0
      );
    },

    // sum bhxh
    subRow_bhxh() {
      return this.dsnhanvien.reduce(
        (total, item) => total + parseFloat(item.bhxh),
        0
      );
    },

    // sum cong doan
    subRow_congdoan() {
      return this.dsnhanvien.reduce(
        (total, item) => total + parseFloat(item.congdoan),
        0
      );
    },

    // sum tong tru
    subRow_tongtru() {
      return this.dsnhanvien.reduce(
        (total, item) =>
          total + (parseFloat(item.bhxh) + parseFloat(item.congdoan)),
        0
      );
    },

    // sum luong nhan cho khối văn phòng
    subRow_luongnhan() {
      return this.dsnhanvien.reduce(
        (total, item) =>
          total +
          (parseFloat(item.luongtrachnhiem) +
            parseFloat(item.luongngay) +
            parseFloat(item.dt_dieuchinh) +
            parseFloat(item.dt_thuong) +
            parseFloat(item.thuong) +
            ((parseFloat(item.luongngay) / 26 / 8) *
              parseInt(item.sogiongoaigio) *
              1.5 +
              (parseFloat(item.luongngay) / 26) *
                parseInt(item.sogiongoaigiochunhat) *
                2) -
            parseFloat(item.dt_phat)) -
          (parseFloat(item.bhxh) + parseFloat(item.congdoan)),
        0
      );
    },

    // sum luong nhan cho khối văn phòng gián tiếp
    subRow_luongnhan_vpgiantiep() {
      return this.dsnhanvien.reduce((total, item) => {
        if (item.sum_ngay_lam >= 26) {
          return (
            total +
            (parseFloat(item.luongtrachnhiem) +
              parseFloat(item.luongngay * 26) +
              parseFloat(item.dt_dieuchinh) +
              parseFloat(item.dt_thuong) +
              parseFloat(item.thuong) +
              ((parseFloat(item.luongngay) / 8) *
                parseInt(item.sogiongoaigio) *
                1.5 +
                parseFloat(item.luongngay) *
                  parseInt(item.sogiongoaigiochunhat) *
                  2) -
              parseFloat(item.dt_phat)) -
            (parseFloat(item.bhxh) + parseFloat(item.congdoan))
          );
        } else {
          return (
            total +
            (parseFloat(item.luongtrachnhiem) +
              parseFloat(item.luongngay * item.sum_ngay_lam) +
              parseFloat(item.dt_dieuchinh) +
              parseFloat(item.dt_thuong) +
              parseFloat(item.thuong) +
              ((parseFloat(item.luongngay) / 8) *
                parseInt(item.sogiongoaigio) *
                1.5 +
                parseFloat(item.luongngay) *
                  parseInt(item.sogiongoaigiochunhat) *
                  2) -
              parseFloat(item.dt_phat)) -
            (parseFloat(item.bhxh) + parseFloat(item.congdoan))
          );
        }
      }, 0);
    },
  },

  mounted() {
    this.getDsnv();
    this.currentDateTime();
    this.getDay();
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
    },

    onChange_Thang(e) {
      var id = e.target.value;
      var name = e.target.options[e.target.options.selectedIndex].text;
      // console.log('id ', id);
      // console.log('name ',name );
      this.thangLapluong = id;
      // console.log(this.nam)
      // console.log(this.tennam)
    },

    async onChange_Nam(e) {
      var id = e.target.value;
      // var name = e.target.options[e.target.options.selectedIndex].text;
      // console.log('id ',id );
      // console.log('name ',name );
      this.namLapluong = id;
      // console.log(this.nam)
      // console.log(this.tennam)
      // console.log(this.thangLapluong);
      // this.dsnhanvien = await this.$axios.$get(`/api/ketoan/loadluongchamcong`);

      // console.log(this.dsnhanvien);
    },

    async getWithKhoi(e) {
      this.selected = [];
      this.isKhoiVP == false;
      if (this.thangLapluong == "" || this.namLapluong == "") {
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
          title: "Yêu cầu chọn kỳ lương cần làm  !",
        });
      } else {
        this.makhoi = "";
        this.dsnhanvien = [];
        // console.log(this.mapx)
        var name = e.target.options[e.target.options.selectedIndex].text;
        // console.log(name)
        let position = name.split("--");
        let p1 = position[0].trim();
        this.makhoi = p1;
        // console.log(this.makhoi);
        if (this.makhoi == "VPBP") {
          this.isKhoiVP = true;
        } else {
          this.isKhoiVP = false;
        }
        this.keyThangnam = this.thangLapluong.trim() + this.namLapluong.trim();
        // console.log(this.keyThangnam);
        const arrkeythangnam = [];
        const listkeythangnam = await this.$axios.$get(
          `/api/ketoan/getkeythangnamwithdatavanphong?key_thangnam=${this.keyThangnam}`
        );
        // console.log(listkeythangnam);
        for (let i = 0; i < listkeythangnam.length; i++) {
          let ktn = listkeythangnam[i].keyfind.trim();
          arrkeythangnam.push(ktn);
        }
        // console.log(arrkeythangnam);

        this.dsnhanvien = await this.$axios.$get(
          `/api/ketoan/loadluongchamcong?month=${this.thangLapluong}&year=${this.namLapluong}&makhoi=${this.makhoi}`
        );
        // console.log(this.dsnhanvien);
        const result = [];
        for (let i = 0; i < this.dsnhanvien.length; i++) {
          let _key =
            this.dsnhanvien[i].makhoi +
            "-" +
            this.dsnhanvien[i].manv +
            "-" +
            this.dsnhanvien[i].tennv +
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
            result.push(this.dsnhanvien[i]);
          }
        }

        this.dsnhanvien = result;
        // console.log(result);
        if (this.dsnhanvien.length > 0) {
          this.isSaveSale = true;
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
            title: "Toàn bộ nhân viên đã được tạo lương tháng này rồi  !",
          });
        }
      }
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

    async detailChamngoaigio(item) {
      this.isActive = true;
      this.dataDetailChamngoaigio = await this.$axios.$get(
        `/api/ketoan/detailchamngoaigio?manv=${item.manv}&nam=${this.namLapluong}&thang=${this.thangLapluong}`
      );
    },

    async getDsnv() {
      // this.dsnhanvien = await this.$axios.$get(`/api/ketoan/nhanvienbangluong`);
    },

    async onReport() {
      const result = await Swal.fire({
        title: `Bạn chắc chắn tạo lương tại kỳ: ${this.thangLapluong}/${this.namLapluong}`,
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
            // const arrkeythangnam = [];
            // const listkeythangnam = await this.$axios.$get(
            //   `/api/ketoan/getkeythangnamvanphong`
            // );
            // // console.log(listkeythangnam);
            // for (let i = 0; i < listkeythangnam.length; i++) {
            //   let ktn = listkeythangnam[i].key_thangnam.trim();
            //   arrkeythangnam.push(ktn);
            // }
            // // console.log(arrkeythangnam);
            // this.keyThangnam =
            //   this.thangLapluong.trim() + this.namLapluong.trim();

            // // console.log(this.keyThangnam);
            // this.isExits = arrkeythangnam.includes(this.keyThangnam.trim());
            // console.log(this.isExits);

            // console.log(this.selected);
            if (this.isKhoiVP == true) {
              for (let i = 0; i < this.selected.length; i++) {
                // console.log(this.selected[i]);
                let data = {
                  makhoi: this.selected[i].makhoi,
                  mapb: this.selected[i].mapb,
                  tenpb: this.selected[i].tenphong,
                  manv: this.selected[i].manv,
                  hotennv: this.selected[i].tennv,
                  chucvu: "",
                  mucluong: this.selected[i].mucluong,
                  luongngay: this.selected[i].luongngay,
                  luongtrachnhiem: this.selected[i].luongtrachnhiem,
                  bacluong: this.selected[i].bacluong,
                  ngaycong: this.selected[i].sum_ngay_lam,
                  luongthang: parseFloat(this.selected[i].luongngay),
                  dieuchinhdt: this.selected[i].dt_dieuchinh,
                  thuongdt: this.selected[i].dt_thuong,
                  phat: this.selected[i].dt_phat,
                  luongngoaigio:
                    (parseFloat(this.selected[i].luongngay) / 26 / 8) *
                      parseInt(this.selected[i].sogiongoaigio) *
                      1.5 +
                    (parseFloat(this.selected[i].luongngay) / 26) *
                      parseInt(this.selected[i].sogiongoaigiochunhat) *
                      2,
                  sogiongoaigio: this.selected[i].sogiongoaigio,
                  sogiongoaigiochunhat: this.selected[i].sogiongoaigiochunhat,
                  hotro: this.selected[i].thuong,
                  tongluong:
                    parseFloat(this.selected[i].luongtrachnhiem) +
                    ((parseFloat(this.selected[i].luongngay) / 26) *
                      parseInt(this.selected[i].sum_ngay_lam) +
                      parseFloat(this.selected[i].dt_dieuchinh) +
                      parseFloat(this.selected[i].dt_thuong) +
                      parseFloat(this.selected[i].thuong) +
                      ((parseFloat(this.selected[i].luongngay) / 26 / 8) *
                        parseInt(this.selected[i].sogiongoaigio) *
                        1.5 +
                        (parseFloat(this.selected[i].luongngay) / 26) *
                          parseInt(this.selected[i].sogiongoaigiochunhat) *
                          2) -
                      parseFloat(this.selected[i].dt_phat)),
                  bhxh: this.selected[i].bhxh,
                  congdoan: this.selected[i].congdoan,
                  tongkt:
                    parseFloat(this.selected[i].bhxh) +
                    parseFloat(this.selected[i].congdoan),
                  luongnhan:
                    parseFloat(this.selected[i].luongtrachnhiem) +
                    ((parseFloat(this.selected[i].luongngay) / 26) *
                      parseFloat(this.selected[i].sum_ngay_lam) +
                      parseFloat(this.selected[i].dt_dieuchinh) +
                      parseFloat(this.selected[i].dt_thuong) +
                      parseFloat(this.selected[i].thuong) +
                      ((parseFloat(this.selected[i].luongngay) / 26 / 8) *
                        parseInt(this.selected[i].sogiongoaigio) *
                        1.5 +
                        (parseFloat(this.selected[i].luongngay) / 26) *
                          parseInt(this.selected[i].sogiongoaigiochunhat) *
                          2) -
                      parseFloat(this.selected[i].dt_phat)) -
                    (parseFloat(this.selected[i].bhxh) +
                      parseFloat(this.selected[i].congdoan)),
                  createdAt: this.createdAt,
                  createdBy: this.createdBy,
                  thang: this.thangLapluong,
                  nam: this.namLapluong,
                  key_thangnam: this.keyThangnam,
                  status: true,
                  chutaikhoan: this.selected[i].chutaikhoan,
                  stk: this.selected[i].sotknh,
                  tennganhang: this.selected[i].tennh,
                  nhanl1: 0,
                  nhanl2: 0,
                  nhanl3: 0,
                };
                // console.log(data);
                const res = this.$axios.$post(
                  "/api/ketoan/themluongthangvanphong",
                  data
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
                  title: "Tạo số liệu lương thành công",
                });
              }
            } else {
              for (let i = 0; i < this.selected.length; i++) {
                // console.log(this.selected[i]);
                let luongthang = 0;
                if (this.selected[i].sum_ngay_lam >= 26) {
                  luongthang = this.selected[i].luongngay * 26;
                } else {
                  luongthang =
                    this.selected[i].luongngay * this.selected[i].sum_ngay_lam;
                }
                console.log(luongthang + "-" + this.selected[i].tennv);
                let data = {
                  makhoi: this.selected[i].makhoi,
                  mapb: this.selected[i].mapb,
                  tenpb: this.selected[i].tenphong,
                  manv: this.selected[i].manv,
                  hotennv: this.selected[i].tennv,
                  chucvu: "",
                  mucluong: this.selected[i].mucluong,
                  luongngaycong: this.selected[i].luongngay,
                  luongtrachnhiem: this.selected[i].luongtrachnhiem,
                  bacluong: this.selected[i].bacluong,
                  ngaycong: this.selected[i].sum_ngay_lam,
                  luongthang: luongthang,
                  dieuchinhdt: this.selected[i].dt_dieuchinh,
                  thuongdt: this.selected[i].dt_thuong,
                  phat: this.selected[i].dt_phat,
                  luongngoaigio:
                    (parseFloat(this.selected[i].luongngay) / 8) *
                      parseInt(this.selected[i].sogiongoaigio) *
                      1.5 +
                    parseFloat(this.selected[i].luongngay) *
                      parseInt(this.selected[i].sogiongoaigiochunhat) *
                      2,
                  sogiongoaigio: this.selected[i].sogiongoaigio,
                  sogiongoaigiochunhat: this.selected[i].sogiongoaigiochunhat,
                  hotro: this.selected[i].thuong,
                  tongluong:
                    parseFloat(this.selected[i].luongtrachnhiem) +
                    luongthang +
                    parseFloat(this.selected[i].dt_dieuchinh) +
                    parseFloat(this.selected[i].dt_thuong) +
                    parseFloat(this.selected[i].thuong) +
                    ((parseFloat(this.selected[i].luongngay) / 8) *
                      parseInt(this.selected[i].sogiongoaigio) *
                      1.5 +
                      parseFloat(this.selected[i].luongngay) *
                        parseInt(this.selected[i].sogiongoaigiochunhat) *
                        2) -
                    parseFloat(this.selected[i].dt_phat),
                  bhxh: this.selected[i].bhxh,
                  congdoan: this.selected[i].congdoan,
                  tongkt:
                    parseFloat(this.selected[i].bhxh) +
                    parseFloat(this.selected[i].congdoan),
                  luongnhan:
                    parseFloat(this.selected[i].luongtrachnhiem) +
                    luongthang +
                    parseFloat(this.selected[i].dt_dieuchinh) +
                    parseFloat(this.selected[i].dt_thuong) +
                    parseFloat(this.selected[i].thuong) +
                    ((parseFloat(this.selected[i].luongngay) / 8) *
                      parseInt(this.selected[i].sogiongoaigio) *
                      1.5 +
                      parseFloat(this.selected[i].luongngay) *
                        parseInt(this.selected[i].sogiongoaigiochunhat) *
                        2) -
                    parseFloat(this.selected[i].dt_phat) -
                    (parseFloat(this.selected[i].bhxh) +
                      parseFloat(this.selected[i].congdoan)),
                  createdAt: this.createdAt,
                  createdBy: this.createdBy,
                  thang: this.thangLapluong,
                  nam: this.namLapluong,
                  key_thangnam: this.keyThangnam,
                  status: true,
                  chutaikhoan: this.selected[i].chutaikhoan,
                  stk: this.selected[i].sotknh,
                  tennganhang: this.selected[i].tennh,
                  nhanl1: 0,
                  nhanl2: 0,
                  nhanl3: 0,
                };
                // console.log(data);
                const res = this.$axios.$post(
                  "/api/ketoan/themluongthangvanphong",
                  data
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
                  title: "Tạo số liệu lương thành công",
                });
                this.isSaveSale = false;
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
  },
};
</script>

<style scoped>
.table_wrapper {
  display: block;
  overflow-x: auto;
  white-space: nowrap;
  position: sticky;
  left: 0;
  /* background-color: whitesmoke; */
}

.table_wrapper td:first-child {
  position: sticky;
  left: 0;
  background-color: #fff;
}
.table_wrapper td:first-child,
.table_wrapper th:first-child {
  position: sticky;
  left: 0;
  z-index: 1;
  /* background-color: white; */
}
.table_wrapper td:nth-child(2),
.table_wrapper th:nth-child(2) {
  position: sticky;
  left: 43px;
  z-index: 1;
  /* background-color: white; */
}
.table_wrapper td:nth-child(3),
.table_wrapper th:nth-child(3) {
  position: sticky;
  left: 43px;
  z-index: 1;
  background-color: whitesmoke;
}

.input {
  min-width: 90px;
}
</style>
