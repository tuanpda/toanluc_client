<template>
  <div class="column">
    <br />
    <div class="box" style="margin-left: 5px; margin-right: 5px">
      <div class="columns">
        <div class="column">
          <div class="control">
            <span class="icon is-small is-left">
              <i style="color: #f14668" class="fas fa-clipboard-list"></i>
            </span>
            <span style="color: #3850b7; font-size: 15px; font-weight: bold"
              >Lập kế hoạch nhà máy</span
            >
          </div>
        </div>
      </div>

      <div class="table_wrapper">
        <table
          class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth"
        >
          <thead>
            <tr style="background-color: #ebfffc">
              <td style="width: 20%">
                <div class="field has-addons">
                  <p class="control is-expanded">
                    <input
                      v-model="searchnhomsp"
                      class="input is-small is-fullwidth"
                      type="text"
                      placeholder="Tìm theo nhóm thành phẩm phẩm"
                    />
                  </p>
                  <p class="control">
                    <a @click="timNhomsp" class="button is-small"> Lọc </a>
                  </p>
                </div>
              </td>
              <td style="width: 15%">
                <div class="field has-addons">
                  <p class="control is-expanded">
                    <input
                      v-model="searchmasp"
                      class="input is-small is-fullwidth"
                      type="text"
                      placeholder="Tìm theo mã thành phẩm"
                    />
                  </p>
                  <p class="control">
                    <a @click="timMasp" class="button is-small"> Lọc </a>
                  </p>
                </div>
              </td>
              <td style="width: 12%">
                <div class="field has-addons">
                  <p class="control">
                    <input
                      v-model="search_timekt"
                      type="date"
                      class="input is-small"
                    />
                  </p>
                  <p class="control">
                    <a @click="searhTimeketthuc" class="button is-small">
                      Lọc
                    </a>
                  </p>
                </div>
              </td>
              <td style="font-size: small; width: 6%">
                <input
                  class="input is-danger is-small"
                  type="number"
                  id="itemsPerPage"
                  v-model.number="itemsPerPage"
                  min="1"
                  max="10"
                />
              </td>
              <td style="width: 7%">
                <button
                  @click="resetAll"
                  class="button is-danger is-small is-fullwidth"
                >
                  <span>Refresh</span>
                </button>
              </td>
              <td style="width: 9%; text-align: center; vertical-align: middle">
                <vue-excel-xlsx
                  :data="phieulo"
                  :columns="columns"
                  :file-name="'muctieukehoachnam'"
                  :file-type="'xlsx'"
                  :sheet-name="'Mục tiêu kế hoạch năm'"
                >
                  Download Excel
                </vue-excel-xlsx>
              </td>
              <td style="width: 7%">
                <button class="button is-info is-small is-fullwidth">
                  <span>Tìm kiếm</span>
                </button>
              </td>
              <td></td>
            </tr>
          </thead>
        </table>
      </div>

      <div class="table_wrapper">
        <table
          class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth"
        >
          <thead>
            <tr style="background-color: #ebfffc">
              <th
                style="
                  text-align: center;
                  font-size: small;
                  font-weight: bold;
                  width: 3%;
                "
              >
                STT
              </th>
              <th
                style="
                  text-align: center;
                  font-size: small;
                  font-weight: bold;
                  width: 3%;
                "
              >
                _ID
              </th>
              <th
                @click="sortTable('makh')"
                style="
                  text-align: center;
                  font-size: small;
                  font-weight: bold;
                  width: 7%;
                "
              >
                Kế hoạch năm
              </th>
              <th
                @click="sortTable('mathanhpham')"
                style="
                  text-align: center;
                  font-size: small;
                  font-weight: bold;
                  width: 7%;
                "
              >
                Mã thành phẩm
              </th>
              <th
                @click="sortTable('nhomsp')"
                style="
                  text-align: center;
                  font-size: small;
                  font-weight: bold;
                  width: 5%;
                "
              >
                Nhóm thành phẩm
              </th>
              <th
                @click="sortTable('tgbatdau')"
                style="
                  text-align: center;
                  font-size: small;
                  font-weight: bold;
                  width: 5%;
                "
              >
                Ngày bắt đầu
              </th>
              <th
                @click="sortTable('tgketthuc')"
                style="
                  text-align: center;
                  font-size: small;
                  font-weight: bold;
                  width: 5%;
                "
              >
                Ngày kết thúc
              </th>
              <th
                @click="sortTable('soluong')"
                style="
                  text-align: center;
                  font-size: small;
                  font-weight: bold;
                  width: 7%;
                "
              >
                Số lượng
              </th>
              <th
                @click="sortTable('status')"
                style="
                  text-align: center;
                  font-size: small;
                  font-weight: bold;
                  width: 5%;
                "
              >
                Trạng thái
              </th>
              <th
                style="
                  text-align: center;
                  font-size: small;
                  font-weight: bold;
                  width: 5%;
                "
              >
                Ghi chú
              </th>
              <th
                style="
                  text-align: center;
                  font-size: small;
                  font-weight: bold;
                  width: 7%;
                "
              >
                Mùa vụ P1
              </th>
              <th
                style="
                  text-align: center;
                  font-size: small;
                  font-weight: bold;
                  width: 7%;
                "
              >
                Mùa vụ P2
              </th>
              <th
                style="
                  text-align: center;
                  font-size: small;
                  font-weight: bold;
                  width: 7%;
                "
              >
                Mùa vụ P3
              </th>
              <th
                style="
                  text-align: center;
                  font-size: small;
                  font-weight: bold;
                  width: 5%;
                "
              >
                Còn lại
              </th>
              <th
                style="
                  text-align: center;
                  font-size: small;
                  font-weight: bold;
                  width: 4%;
                "
              >
                Cập nhật
              </th>
              <th
                style="
                  text-align: center;
                  font-size: small;
                  font-weight: bold;
                  width: 4%;
                "
              >
                Xóa
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(pl, index) in paginatedTable"
              :key="index + 'a'"
              :class="{ highlighted: pl === highlightedRow }"
              @click="highlightRow(pl)"
            >
              <td
                style="
                  text-align: center;
                  font-size: small;
                  background-color: whitesmoke;
                "
              >
                {{ index + 1 }}
              </td>
              <td
                style="
                  text-align: center;
                  font-size: small;
                  background-color: whitesmoke;
                "
              >
                {{ pl._id }}
              </td>
              <td @click="getdatakhnhamay(pl)" style="font-size: small">
                <!-- <input type="text" class="input is-small" v-model="pl.makh"> -->
                {{ pl.makh }}
              </td>
              <td style="font-size: small; text-align: center">
                {{ pl.mathanhpham }}
              </td>
              <td style="font-size: small; text-align: center">
                {{ pl.nhomthanhpham }}
              </td>
              <td style="background-color: #fffaeb">
                <input
                  class="input is-small"
                  type="date"
                  v-bind:value="pl.tgbatdau | inputDateFilter"
                  v-on:input="pl.tgbatdau = getDate($event.target.value)"
                />
              </td>
              <td style="background-color: #fffaeb">
                <input
                  class="input is-small"
                  type="date"
                  v-bind:value="pl.tgketthuc | inputDateFilter"
                  v-on:input="pl.tgketthuc = getDate($event.target.value)"
                />
              </td>
              <td
                style="
                  text-align: center;
                  font-size: small;
                  background-color: #d2e4faff;
                "
              >
                <input
                  v-model.trim="pl.soluong"
                  type="text"
                  class="input is-small"
                />
              </td>
              <td
                style="
                  font-size: small;
                  text-align: center;
                  vertical-align: middle;
                "
              >
                <span v-if="pl.status == false">
                  <i style="color: #ffd863" class="fa fa-circle"></i>
                </span>
                <span v-else
                  ><i style="color: #00947e" class="fa fa-circle"></i>
                </span>
              </td>
              <td
                style="
                  font-size: small;
                  text-align: center;
                  vertical-align: middle;
                "
              >
                <a @click="showGhichu(pl)"
                  ><span>
                    <i style="color: #9b6dff" class="fas fa-barcode"></i> </span
                ></a>
              </td>
              <td style="background-color: #fdedf6">
                <input
                  v-model.trim="pl.soluongmuavup1"
                  type="text"
                  class="input is-small"
                />
              </td>
              <td style="background-color: #fdedf6">
                <input
                  v-model.trim="pl.soluongmuavup2"
                  type="text"
                  class="input is-small"
                />
              </td>
              <td style="background-color: #fdedf6">
                <input
                  v-model.trim="pl.soluongmuavup3"
                  type="text"
                  class="input is-small"
                />
              </td>
              <td style="text-align: right; font-size: small">
                {{
                  (parseInt(pl.soluong) -
                    (parseInt(pl.soluongmuavup1) +
                      parseInt(pl.soluongmuavup2) +
                      parseInt(pl.soluongmuavup3)))
                    | formatNumber
                }}
              </td>
              <td>
                <button
                  @click="onupdateKehoachmuavu(pl)"
                  class="button is-success is-small is-fullwidth"
                >
                  <span>Cập nhật</span>
                </button>
              </td>
              <td>
                <button
                  @click="onDeleteKehoachnam(pl)"
                  class="button is-danger is-small is-fullwidth"
                >
                  <span>Xóa</span>
                </button>
              </td>
            </tr>
            <tr style="background: #ebfffc">
              <td colspan="6" style="font-size: small; font-weight: 800">
                Total
              </td>
              <td
                style="
                  font-size: small;
                  font-weight: 800;
                  text-align: right;
                  color: red;
                "
              >
                {{ soluongTotal | formatNumber }}
              </td>
              <td colspan="2"></td>
              <td
                style="
                  font-size: small;
                  font-weight: 800;
                  text-align: right;
                  color: red;
                "
              >
                {{ muavup1Total | formatNumber }}
              </td>
              <td
                style="
                  font-size: small;
                  font-weight: 800;
                  text-align: right;
                  color: red;
                "
              >
                {{ muavup2Total | formatNumber }}
              </td>
              <td
                style="
                  font-size: small;
                  font-weight: 800;
                  text-align: right;
                  color: red;
                "
              >
                {{ muavup3Total | formatNumber }}
              </td>
              <td colspan="3"></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="columns" style="text-align: center">
        <div class="column">
          <div class="pagination">
            <button
              class="button is-small is-success"
              @click="changePage(1)"
              :disabled="currentPage === 1"
            >
              Đầu tiên
            </button>
            <button
              class="button is-small is-info"
              @click="changePage(currentPage - 1)"
              :disabled="currentPage === 1"
            >
              Trước
            </button>
            <button
              class="button is-small"
              v-for="page in pages"
              @click="changePage(page)"
              :class="{ active: page === currentPage }"
            >
              {{ page }}
            </button>
            <button
              class="button is-small is-info"
              @click="changePage(currentPage + 1)"
              :disabled="currentPage === pageCount"
            >
              Sau
            </button>
            <button
              class="button is-small is-success"
              @click="changePage(pageCount)"
              :disabled="currentPage === pageCount"
            >
              Cuối
            </button>
          </div>
        </div>
      </div>

      <div class="table_wrapper" style="margin-bottom: 10px">
        <table
          class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth"
        >
          <tr>
            <td colspan="17" style="font-size: small; font-weight: 700">
              <span
                >Kế hoạch hàng tháng theo từng mùa vụ | mã sản phẩm:
                <span style="color: red">{{ mark_kehoachnam.masp }}</span>
              </span>
            </td>
          </tr>
          <template>
            <tr>
              <td
                style="
                  text-align: center;
                  background-color: #effaf5;
                  font-size: small;
                  font-weight: bold;
                  width: 12%;
                "
              >
                Mùa vụ P1
              </td>
              <td
                style="
                  text-align: center;
                  background-color: #effaf5;
                  font-size: small;
                  font-weight: bold;
                  width: 7%;
                "
              >
                Tháng 1
              </td>
              <td
                style="
                  text-align: center;
                  background-color: #effaf5;
                  font-size: small;
                  font-weight: bold;
                  width: 7%;
                "
              >
                Tháng 2
              </td>
              <td
                style="
                  text-align: center;
                  background-color: #effaf5;
                  font-size: small;
                  font-weight: bold;
                  width: 7%;
                "
              >
                Tháng 3
              </td>
              <td
                style="
                  text-align: center;
                  background-color: #effaf5;
                  font-size: small;
                  font-weight: bold;
                  width: 7%;
                "
              >
                Tháng 4
              </td>
              <td
                style="
                  text-align: center;
                  background-color: whitesmoke;
                  font-size: small;
                  font-weight: bold;
                  width: 12%;
                "
              >
                Mùa vụ P2
              </td>
              <td
                style="
                  text-align: center;
                  background-color: whitesmoke;
                  font-size: small;
                  font-weight: bold;
                  width: 7%;
                "
              >
                Tháng 5
              </td>
              <td
                style="
                  text-align: center;
                  background-color: whitesmoke;
                  font-size: small;
                  font-weight: bold;
                  width: 7%;
                "
              >
                Tháng 6
              </td>
              <td
                style="
                  text-align: center;
                  background-color: whitesmoke;
                  font-size: small;
                  font-weight: bold;
                  width: 7%;
                "
              >
                Tháng 7
              </td>
              <td
                style="
                  text-align: center;
                  background-color: whitesmoke;
                  font-size: small;
                  font-weight: bold;
                  width: 7%;
                "
              >
                Tháng 8
              </td>
              <td
                style="
                  text-align: center;
                  background-color: #eef6f4ff;
                  font-size: small;
                  font-weight: bold;
                  width: 12%;
                "
              >
                Mùa vụ P3
              </td>
              <td
                style="
                  text-align: center;
                  background-color: #eef6f4ff;
                  font-size: small;
                  font-weight: bold;
                  width: 7%;
                "
              >
                Tháng 9
              </td>
              <td
                style="
                  text-align: center;
                  background-color: #eef6f4ff;
                  font-size: small;
                  font-weight: bold;
                  width: 7%;
                "
              >
                Tháng 10
              </td>
              <td
                style="
                  text-align: center;
                  background-color: #eef6f4ff;
                  font-size: small;
                  font-weight: bold;
                  width: 7%;
                "
              >
                Tháng 11
              </td>
              <td
                style="
                  text-align: center;
                  background-color: #eef6f4ff;
                  font-size: small;
                  font-weight: bold;
                  width: 7%;
                "
              >
                Tháng 12
              </td>
              <th
                style="
                  text-align: center;
                  font-size: small;
                  font-weight: bold;
                  width: 4%;
                "
              >
                Cập nhật
              </th>
              <th
                style="
                  text-align: center;
                  font-size: small;
                  font-weight: bold;
                  width: 4%;
                "
              >
                KH Nhà máy
              </th>
            </tr>
            <tr
              v-for="(khmv, index) in kehoachmuavu"
              :key="index + 'iuoqeqelq'"
            >
              <td
                style="
                  text-align: right;
                  font-size: small;
                  background-color: #effaf5;
                  color: #f14668;
                  font-weight: 900;
                "
              >
                {{ khmv.soluongmuavup1 | formatNumber }} |
                <span style="color: green">{{
                  soluongmuavuTotalMV1 | formatNumber
                }}</span>
              </td>
              <td style="background-color: #effaf5">
                <input
                  type="number"
                  class="input is-small"
                  v-model.trim="khmv.slthang1"
                />
              </td>
              <td
                style="
                  text-align: center;
                  font-size: small;
                  background-color: #effaf5;
                "
              >
                <input
                  type="number"
                  class="input is-small"
                  v-model.trim="khmv.slthang2"
                />
              </td>
              <td style="background-color: #effaf5">
                <input
                  type="number"
                  class="input is-small"
                  v-model.trim="khmv.slthang3"
                />
              </td>
              <td style="background-color: #effaf5">
                <input
                  type="number"
                  class="input is-small"
                  v-model.trim="khmv.slthang4"
                />
              </td>
              <td
                style="
                  text-align: right;
                  font-size: small;
                  background-color: whitesmoke;
                  color: #f14668;
                  font-weight: 900;
                "
              >
                {{ khmv.soluongmuavup2 | formatNumber }} |
                <span style="color: green">{{
                  soluongmuavuTotalMV2 | formatNumber
                }}</span>
              </td>
              <td style="background-color: whitesmoke">
                <input
                  type="number"
                  class="input is-small"
                  v-model.trim="khmv.slthang5"
                />
              </td>
              <td style="background-color: whitesmoke">
                <input
                  type="number"
                  class="input is-small"
                  v-model.trim="khmv.slthang6"
                />
              </td>
              <td style="background-color: whitesmoke">
                <input
                  type="number"
                  class="input is-small"
                  v-model.trim="khmv.slthang7"
                />
              </td>
              <td style="background-color: whitesmoke">
                <input
                  type="number"
                  class="input is-small"
                  v-model.trim="khmv.slthang8"
                />
              </td>
              <td
                style="
                  text-align: right;
                  font-size: small;
                  background-color: #eef6f4ff;
                  color: #f14668;
                  font-weight: 900;
                "
              >
                {{ khmv.soluongmuavup3 | formatNumber }}|
                <span style="color: green">{{
                  soluongmuavuTotalMV3 | formatNumber
                }}</span>
              </td>
              <td style="background-color: #eef6f4ff">
                <input
                  type="text"
                  class="input is-small"
                  v-model.trim="khmv.slthang9"
                />
              </td>
              <td style="background-color: #eef6f4ff">
                <input
                  type="number"
                  class="input is-small"
                  v-model.trim="khmv.slthang10"
                />
              </td>
              <td style="background-color: #eef6f4ff">
                <input
                  type="number"
                  class="input is-small"
                  v-model.trim="khmv.slthang11"
                />
              </td>
              <td style="background-color: #eef6f4ff">
                <input
                  type="number"
                  class="input is-small"
                  v-model.trim="khmv.slthang12"
                />
              </td>
              <td>
                <button
                  @click="onupdateKehoachmuavutheothang(khmv)"
                  class="button is-success is-small is-fullwidth"
                >
                  <span>Cập nhật</span>
                </button>
              </td>
              <td>
                <button
                  @click="giaopx(khmv)"
                  class="button is-success is-small is-fullwidth"
                >
                  <span>Tạo lô nhà máy</span>
                </button>
              </td>
            </tr>
          </template>
        </table>
      </div>

      <div class="table_wrapper">
        <table
          class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth"
        >
          <thead>
            <tr style="background-color: #ebfffc">
              <th
                style="
                  text-align: center;
                  font-size: small;
                  font-weight: bold;
                  width: 3%;
                "
              >
                STT
              </th>
              <th
                style="text-align: center; font-size: small; font-weight: bold"
              >
                _ID
              </th>
              <th
                style="text-align: center; font-size: small; font-weight: bold"
              >
                Kế hoạch năm
              </th>
              <th
                style="text-align: center; font-size: small; font-weight: bold"
              >
                Mã thành phẩm
              </th>
              <th
                style="text-align: center; font-size: small; font-weight: bold"
              >
                Tên thành phẩm
              </th>
              <th
                style="text-align: center; font-size: small; font-weight: bold"
              >
                Nhóm thành phẩm
              </th>
              <th
                style="text-align: center; font-size: small; font-weight: bold"
              >
                Mã Lô nhà máy
              </th>
              <th
                style="
                  text-align: center;
                  font-size: small;
                  font-weight: bold;
                  width: 3%;
                "
              >
                Số lượng
              </th>
              <!-- <th style="text-align: center; font-size: small; font-weight: bold; width: 7%">
                  Thời gian bắt đầu
                </th>
                <th style="text-align: center; font-size: small; font-weight: bold; width: 7%">
                  Thời gian kết thúc
                </th> -->
              <th
                style="
                  text-align: center;
                  font-size: small;
                  font-weight: bold;
                  width: 7%;
                "
              >
                Tuần BĐ (T1)
              </th>
              <th
                style="
                  text-align: center;
                  font-size: small;
                  font-weight: bold;
                  width: 7%;
                "
              >
                Tuần KT (T2)
              </th>
              <th
                style="text-align: center; font-size: small; font-weight: bold"
              >
                Trạng thái
              </th>
              <th
                style="text-align: center; font-size: small; font-weight: bold"
              >
                Change Status
              </th>
              <th
                style="
                  text-align: center;
                  font-size: small;
                  font-weight: bold;
                  width: 3%;
                "
              >
                Cập nhật
              </th>
              <th
                style="
                  text-align: center;
                  font-size: small;
                  font-weight: bold;
                  width: 3%;
                "
              >
                Xóa
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in kehoachphanxuong"
              :key="index + 'jjjhhhff'"
            >
              <td style="text-align: center; font-size: small">
                {{ index + 1 }}
              </td>
              <td style="text-align: center; font-size: small">
                {{ item._id }}
              </td>
              <td style="text-align: center; font-size: small">
                {{ item.kehoachnam }}
              </td>
              <td style="text-align: center; font-size: small">
                {{ item.mathanhpham }}
              </td>
              <td style="text-align: center; font-size: small">
                {{ item.tenthanhpham }}
              </td>
              <td style="text-align: center; font-size: small">
                {{ item.nhomthanhpham }}
              </td>
              <td style="font-size: small">
                <!-- <input type="text" class="input is-small" v-model.trim="item.makhpx"> -->
                {{ item.malonhamay }}
              </td>
              <!-- <td style="text-align: center; font-size: small;">{{ item.soluong }}</td> -->
              <td>
                <input
                  type="text"
                  class="input is-small"
                  v-model.trim="item.soluong"
                />
              </td>
              <!-- <td style="text-align: center; font-size: small;">{{ item.ngaybd | formatDate }}</td> -->
              <!-- <td><input type="date" class="input is-small" v-model="item.ngaybd"></td> -->
              <!-- <td><input class="input is-small" type="date" v-bind:value="item.ngaybd | inputDateFilter"
                    v-on:input="item.ngaybd = getDate($event.target.value)"></td>
                <td><input class="input is-small is-danger" type="date" v-bind:value="item.ngaykt | inputDateFilter"
                    v-on:input="item.ngaykt = getDate($event.target.value)"></td> -->
              <td>
                <input
                  type="text"
                  class="input is-small"
                  v-model.trim="item.tuanbd"
                />
              </td>
              <td>
                <input
                  type="text"
                  class="input is-small"
                  v-model.trim="item.tuankt"
                />
              </td>
              <template>
                <td
                  v-if="item.status == 1"
                  style="font-size: small; text-align: center"
                >
                  <span
                    style="
                      color: white;
                      font-weight: bold;
                      background-color: red;
                      padding-left: 7px;
                      padding-right: 7px;
                    "
                    >DK</span
                  >
                </td>
                <td
                  v-else-if="item.status == 2"
                  style="font-size: small; text-align: center"
                >
                  <span
                    style="
                      color: red;
                      font-weight: bold;
                      background-color: yellow;
                      padding-left: 7px;
                      padding-right: 7px;
                    "
                    >SX</span
                  >
                </td>
                <td
                  v-else-if="item.status == 3"
                  style="font-size: small; text-align: center"
                >
                  <span
                    style="
                      color: white;
                      font-weight: bold;
                      background-color: green;
                      padding-left: 7px;
                      padding-right: 7px;
                    "
                    >HT</span
                  >
                </td>
                <td v-else style="font-size: small; text-align: center"></td>
              </template>
              <td
                v-if="checkRole == 'admin' && item.status !== 0"
                style="font-size: small"
              >
                <div class="select is-small is-fullwidth">
                  <select
                    id=""
                    @change="onChange_status($event, item)"
                    v-model="item.status"
                  >
                    <option value="0">0</option>
                    <option value="1">DK</option>
                  </select>
                </div>
              </td>
              <td v-else></td>
              <td>
                <button
                  @click="onUpdateKhnm(item)"
                  class="button is-success is-small is-fullwidth"
                >
                  <span>Cập nhật</span>
                </button>
              </td>
              <td>
                <button
                  @click="onDeleteKhnm(item)"
                  class="button is-danger is-small is-fullwidth"
                >
                  <span>Xóa</span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div
        class="table_wrapper"
        v-if="check_giaopx == true"
        style="margin-top: 1px"
      >
        <table
          class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth"
        >
          <tr style="background-color: #faf0f5">
            <td colspan="6" style="font-weight: bold; font-size: small">
              Lập lô nhà máy
            </td>
            <td>
              <button
                @click="ghidulieu"
                class="button is-success is-small is-fullwidth"
              >
                <span>Ghi dữ liệu</span>
              </button>
            </td>
          </tr>
          <tr>
            <td
              style="
                width: 3%;
                font-size: small;
                font-weight: 500;
                text-align: center;
              "
            >
              STT
            </td>
            <td style="font-size: small; font-weight: 500; text-align: center">
              Mã lô nhà máy
            </td>
            <td style="font-size: small; font-weight: 500; text-align: center">
              Số lượng
            </td>
            <!-- <td style="width: 5%; font-size: small; font-weight: 500; text-align: center;">
                Thời gian bắt đầu
              </td>
              <td style="width: 5%; font-size: small; font-weight: 500; text-align: center;">
                Thời gian kết thúc
              </td> -->
            <td
              style="
                width: 5%;
                font-size: small;
                font-weight: 500;
                text-align: center;
              "
            >
              Tuần bắt đầu (T1)
            </td>
            <td
              style="
                width: 5%;
                font-size: small;
                font-weight: 500;
                text-align: center;
              "
            >
              Tuần kết thúc (T2)
            </td>
            <td
              style="
                width: 5%;
                font-size: small;
                font-weight: 500;
                text-align: center;
              "
            >
              Xóa
            </td>
            <td
              style="
                width: 5%;
                font-size: small;
                font-weight: 500;
                text-align: center;
              "
            >
              Copy
            </td>
          </tr>
          <tr v-for="(item, index) in items_khpx" :key="index + 'cm-a'">
            <td style="font-size: small; text-align: center">
              {{ index + 1 }}
            </td>
            <td>
              <input
                v-model.trim="item.malonhamay"
                type="text"
                class="input is-warning is-small"
              />
            </td>
            <td>
              <input
                v-model.trim="item.soluong"
                type="number"
                class="input is-small"
              />
            </td>
            <td>
              <!-- <input v-model.trim="item.ngaybd" type="date" class="input is-small" /> -->
              <input
                @change="getTuanbd"
                v-model.trim="item.tuanbd"
                type="number"
                class="input is-small"
              />
            </td>
            <td>
              <!-- <input v-model.trim="item.ngaykt" type="date" class="input is-small" /> -->
              <input
                @change="getTuankt"
                v-model.trim="item.tuankt"
                type="number"
                class="input is-small"
              />
            </td>
            <td style="text-align: center">
              <button
                @click="deleteRow_khpx(index)"
                class="button is-danger is-small"
              >
                Xóa
              </button>
            </td>
            <td style="text-align: center">
              <button
                @click="copyadd_khpx(item)"
                class="button is-warning is-small"
              >
                copy
              </button>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import Swal from "sweetalert2";
import dayjs from "dayjs";
import "dayjs/locale/vi";
export default {
  middleware: "auth",
  data() {
    return {
      allluongcongnhat: [],
      allluongcongdoan: [],
      phieulo: [],
      phanxuong: [],
      tenphanxuong: [],
      infoLosx: [],
      searchnhomsp: "",
      searchmasp: "",
      tonhom: [],
      form: {
        createdAt: "",
        createdBy: this.$auth.$state.user.username,
        updatedAt: "",
      },
      checkRole: this.$auth.$state.user.role,
      phieulokh: {},
      phieulosx: {},
      isActive: false,
      isActive_phieuloct: false,
      listlkh: [],
      arrLkh: [],
      one_lokhnm: {},
      nhomluong: [],
      checkadd: false,
      // check add Lô kế hoạch nhà máy
      checkadd_Lkhnm: false,
      // số lượng lô sản xuất
      sumsllosx: 0,
      // phân trang
      pageOfitems_cd: [],
      pageOfitems_cn: [],
      // đánh dấu các mã khi bấm vào từng phân xưởng để hiển thị
      // hoặc tạo ra 1 lô sản xuất
      // tránh tình trạng tạo ra lô sản xuất lệch sang xưởng khác
      // yêu cầu đánh dấu phải chính xác
      mark_Makh: "",
      mark_Makhpx: "",
      mark_Mapx: "",
      mark_Tenpx: "",
      mark_Masp: "",
      mark_Tensp: "",
      mark_Soluongkhsx: "",
      // Danh sách Kế hoạch mùa vụ
      kehoachmuavu: "",
      // danh sách kê shoach phân xưởng đã giao
      kehoachphanxuong: [],
      // Gán thông tin kế hoạch nhà máy năm để từ đó lập kế hoạch mùa vụ cho chính xác
      mark_kehoachnam: {},
      // form update losx
      form_update: {
        _id: "",
        makh: "",
        makhpx: "",
        mapx: "",
        malosx: "",
        ngaybd: "",
        ngaykt: "",
        soluong: "",
      },
      check_giaopx: false,
      // hightligh
      highlightedRow: null,

      // lokehoachphanxuong
      items_khpx: [
        {
          _id_khnam: "",
          kehoachnam: "",
          malonhamay: "",
          soluong: 0,
          sldathang: 0,
          slsanxuat: 0,
          tuanbd: "",
          tuankt: "",
          ngaybd: "",
          ngaykt: "",
          mathanhpham: "",
          tenthanhpham: "",
          nhomthanhpham: "",
          status: 0,
          ngaybatdautt: "",
          ngayhoanthanhtt: "",
          ghichu: "",
          createdAt: "",
          createdBy: "",
          updatedAt: "",
        },
      ],

      // xuất execl
      columns: [
        {
          label: "Mã phân xưởng",
          field: "mapx",
        },
        {
          label: "Kế hoạch nhà máy",
          field: "makh",
        },
        {
          label: "Kế hoạch tại phân xưởng",
          field: "makhpx",
        },
        {
          label: "Mã lô sản xuất",
          field: "malosx",
        },
        {
          label: "Nguyên công",
          field: "nguyencong",
        },
        {
          label: "Đơn giá",
          field: "dongia",
        },
        {
          label: "Phân Xưởng",
          field: "phanxuong_cn",
        },
        {
          label: "Tổ",
          field: "to_cn",
        },
        {
          label: "Người thực hiện",
          field: "tencn",
        },
        {
          label: "Số đạt",
          field: "sodat",
        },
        {
          label: "Số hỏng",
          field: "sohong",
        },
      ],
      columns1: [
        {
          label: "Tên công nhật",
          field: "tencongnhat",
        },
        {
          label: "Người thực hiện",
          field: "nguoithuchien",
        },
        {
          label: "Đơn giá",
          field: "dongia",
        },
        {
          label: "Số giờ công",
          field: "sogiocong",
        },
      ],

      // lọc talble
      // currentSort: 'nhomsp',
      // currentSortDir: 'asc',
      // pageSize: 10,
      // currentPage: 1,
      // filter: '',
      search_timekt: null,

      // lọc talble lô sản xuất đang được sản xuất
      sortDirection: 1,
      sortKey: "_id",
      currentPage: 1,
      itemsPerPage: 10,

      // lọc talble
      currentSort: "nhomthanhpham",
      currentSortDir: "asc",
      pageSize: 10,
      currentPage: 1,
      filter: "",

      // xuất execl
      columns: [
        {
          label: "Mã kế hoạch năm",
          field: "makh",
        },
        {
          label: "Mã thành phẩm",
          field: "mathanhpham",
          /* dataFormat: this.priceFormat */
        },
        {
          label: "Tên thành phẩm",
          field: "tenthanhpham",
        },
        {
          label: "Nhóm sản phẩm",
          field: "nhomthanhpham",
        },
        {
          label: "Số lượng",
          field: "soluong",
        },
        {
          label: "Thời gian bắt đầu",
          field: "tgbdatdau",
        },
        {
          label: "Thời gian kết thúc",
          field: "tgketthuc",
        },

        {
          label: "Mã khách hàng",
          field: "makhachhang",
        },
        {
          label: "Khách hàng",
          field: "khachhang",
        },
        {
          label: "Thời gian tạo",
          field: "createdAt",
        },
        {
          label: "Tạo bởi",
          field: "createdBy",
        },
        {
          label: "Trạng thái",
          field: "status",
        },
        {
          label: "Số lượng mùa vụ 1",
          field: "soluongmuavu1",
        },
        {
          label: "Số lượng mùa vụ 2",
          field: "soluongmuavu2",
        },
        {
          label: "Số lượng mùa vụ 3",
          field: "soluongmuavu3",
        },
        {
          label: "SL tháng 1",
          field: "slthang1",
        },
        {
          label: "SL tháng 2",
          field: "slthang2",
        },
        {
          label: "SL tháng 3",
          field: "slthang3",
        },
        {
          label: "SL tháng 4",
          field: "slthang4",
        },
        {
          label: "SL tháng 5",
          field: "slthang5",
        },
        {
          label: "SL tháng 6",
          field: "slthang6",
        },
        {
          label: "SL tháng 7",
          field: "slthang7",
        },
        {
          label: "SL tháng 8",
          field: "slthang8",
        },
        {
          label: "SL tháng 9",
          field: "slthang9",
        },
        {
          label: "SL tháng 10",
          field: "slthang10",
        },
        {
          label: "SL tháng 11",
          field: "slthang11",
        },
        {
          label: "SL tháng 12",
          field: "slthang12",
        },
      ],
    };
  },

  mounted() {
    this.currentDateTime();
    this.getPhanxuong();
    this.getAllPhieulo();
    this.deleteRow_khpx(0);
  },

  computed: {
    // tính Sum của số lượng
    soluongTotal: function () {
      let sum = 0;
      for (let i = 0; i < this.phieulo.length; i++) {
        sum += parseInt(this.phieulo[i].soluong);
      }

      return sum;
    },
    // tính sum của P1
    muavup1Total: function () {
      let sum = 0;
      for (let i = 0; i < this.phieulo.length; i++) {
        sum += parseInt(this.phieulo[i].soluongmuavup1);
      }

      return sum;
    },
    // tính sum của P2
    muavup2Total: function () {
      let sum = 0;
      for (let i = 0; i < this.phieulo.length; i++) {
        sum += parseInt(this.phieulo[i].soluongmuavup2);
      }

      return sum;
    },
    // tính sum của P1
    muavup3Total: function () {
      let sum = 0;
      for (let i = 0; i < this.phieulo.length; i++) {
        sum += parseInt(this.phieulo[i].soluongmuavup3);
      }

      return sum;
    },

    // tính Sum của số lượng mùa vụ. phải tính lại được theo từng vụ
    soluongmuavuTotalMV1: function () {
      let sum = 0;
      for (let i = 0; i < this.kehoachphanxuong.length; i++) {
        const date = new Date(this.kehoachphanxuong[i].ngaykt);
        // console.log(date.getMonth() + 1)
        // console.log(date.getDate());
        if (date.getMonth() + 1 <= 4) {
          // console.log(this.kehoachphanxuong[i].makhpx)
          sum += parseInt(this.kehoachphanxuong[i].soluong);
        }
      }
      return sum;
    },
    soluongmuavuTotalMV2: function () {
      let sum = 0;
      for (let i = 0; i < this.kehoachphanxuong.length; i++) {
        const date = new Date(this.kehoachphanxuong[i].ngaykt);
        // console.log(date.getMonth() + 1)
        // console.log(date.getDate());
        if (date.getMonth() + 1 >= 5 && date.getMonth() + 1 <= 8) {
          // console.log(this.kehoachphanxuong[i].makhpx)
          sum += parseInt(this.kehoachphanxuong[i].soluong);
        }
      }
      return sum;
    },
    soluongmuavuTotalMV3: function () {
      let sum = 0;
      for (let i = 0; i < this.kehoachphanxuong.length; i++) {
        const date = new Date(this.kehoachphanxuong[i].ngaykt);
        // console.log(date.getMonth() + 1)
        // console.log(date.getDate());
        if (date.getMonth() + 1 >= 9) {
          // console.log(this.kehoachphanxuong[i].makhpx)
          sum += parseInt(this.kehoachphanxuong[i].soluong);
        }
      }
      return sum;
    },

    // lọc
    filteredKehoach() {
      return this.phieulo.filter((c) => {
        if (this.filter == "") return true;
        return c.name.toLowerCase().indexOf(this.filter.toLowerCase()) >= 0;
      });
    },

    // phân trang và sắp xếp
    sortedTable() {
      return this.phieulo.sort((a, b) => {
        if (a[this.sortKey] < b[this.sortKey]) return -1 * this.sortDirection;
        if (a[this.sortKey] > b[this.sortKey]) return 1 * this.sortDirection;
        return 0;
      });
    },
    pageCount() {
      return Math.ceil(this.sortedTable.length / this.itemsPerPage);
    },
    startIndex() {
      return (this.currentPage - 1) * this.itemsPerPage;
    },
    endIndex() {
      return this.startIndex + this.itemsPerPage;
    },
    paginatedTable() {
      return this.sortedTable.slice(this.startIndex, this.endIndex);
    },
    pages() {
      const startPage = Math.max(1, this.currentPage - 2);
      const endPage = Math.min(this.pageCount, this.currentPage + 2);

      let pages = [];
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (startPage > 1) {
        pages.unshift("...");
        pages.unshift(1);
      }

      if (endPage < this.pageCount) {
        pages.push("...");
        pages.push(this.pageCount);
      }

      return pages;
    },
  },

  watch: {
    filter() {
      console.log("reset to p1 due to filter");
      this.currentPage = 1;
    },
    kehoachphanxuong(newItems) {
      // Cập nhật lại bảng khi có thay đổi
      console.log("Dữ liệu đã được cập nhật!");
    },
    itemsPerPage() {
      this.currentPage = 1;
    },
  },

  filters: {
    inputDateFilter: function (date) {
      if (!date) {
        return "";
      }
      date = new Date(date);
      return (
        date.getFullYear() +
        "-" +
        ("0" + (date.getMonth() + 1)).slice(-2) +
        "-" +
        ("0" + date.getDate()).slice(-2)
      );
    },
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
      this.form.updatedAt = date + " " + time;
    },

    // sắp xếp và phân trang
    sortTable(key) {
      if (key === this.sortKey) {
        this.sortDirection *= -1;
      } else {
        this.sortDirection = 1;
        this.sortKey = key;
      }
    },
    changePage(pageNumber) {
      if (pageNumber >= 1 && pageNumber <= this.pageCount) {
        this.currentPage = pageNumber;
      }
    },

    // hàm highlight để đánh dấu row nào được chọn
    highlightRow(row) {
      this.highlightedRow = row;
    },

    getTuanbd() {
      // console.log(tuanbd);
      const now = new Date();
      const currentYear = now.getFullYear();

      // Gán kết quả tính toán vào biến result để hiển thị trên màn hình
      // console.log(`Ngày bắt đầu của tuần ${tuanbd} là ${startDateString} và ngày kết thúc là ${endDateString}`);
      for (let i = 0; i < this.items_khpx.length; i++) {
        const startDate = dayjs()
          .year(currentYear)
          .month(0)
          .date((this.items_khpx[i].tuanbd - 1) * 7 + 1);
        const startDateString = startDate.locale("vi").format("YYYY/MM/DD");

        // // Tính toán ngày kết thúc của tuần đó
        const endDate = dayjs()
          .year(currentYear)
          .month(0)
          .date(this.items_khpx[i].tuanbd * 7);
        const endDateString = endDate.locale("vi").format("YYYY/MM/DD");
        this.items_khpx[i].ngaybd = startDateString;
      }
      // console.log(this.items_khpx);
    },
    getTuankt() {
      const now = new Date();
      const currentYear = now.getFullYear();
      for (let i = 0; i < this.items_khpx.length; i++) {
        const startDate = dayjs()
          .year(currentYear)
          .month(0)
          .date((this.items_khpx[i].tuankt - 1) * 7 + 1);
        const startDateString = startDate.locale("vi").format("YYYY/MM/DD");

        // // Tính toán ngày kết thúc của tuần đó
        const endDate = dayjs()
          .year(currentYear)
          .month(0)
          .date(this.items_khpx[i].tuankt * 7);
        const endDateString = endDate.locale("vi").format("YYYY/MM/DD");
        this.items_khpx[i].ngaykt = endDateString;
      }
      // console.log(this.items_khpx);
    },

    // tạo lô kế hoạch tại phân xưởng
    async addPhanxuong() {
      // console.log(this.mark_kehoachnam);
      this.items_khpx.push({
        _id_khnam: this.mark_kehoachnam._id,
        kehoachnam: this.mark_kehoachnam.makh,
        malonhamay: this.mark_kehoachnam.mathanhpham + "-",
        soluong: 0,
        sldathang: 0,
        slsanxuat: 0,
        tuanbd: "",
        tuankt: "",
        ngaybd: "",
        ngaykt: "",
        mathanhpham: this.mark_kehoachnam.mathanhpham,
        tenthanhpham: this.mark_kehoachnam.tenthanhpham,
        nhomthanhpham: this.mark_kehoachnam.nhomthanhpham,
        status: 0,
        ngaybatdautt: "",
        ngayhoanthanhtt: "",
        ghichu: "",
        createdAt: this.form.createdAt,
        createdBy: this.form.createdBy,
        updatedAt: this.form.updatedAt,
      });
      // console.log(this.items_khpx);
    },

    // xóa dòng giao khpx
    deleteRow_khpx(index) {
      this.items_khpx.splice(index, 1);
      if (this.items_khpx.length <= 0) {
        this.check_giaopx = false;
      }
    },

    // tìm lọc số liệu lô nhà máy theo thời gian kết thúc
    async searhTimeketthuc() {
      // console.log(this.search_timekt)
      if (this.search_timekt == "") {
        this.sllosx = await this.$axios.$get(`/api/lokehoach/alllonhamay`);
      } else {
        this.sllosx = await this.$axios.$get(
          `/api/lokehoach/searchtimektkhn?tgketthuc=${this.search_timekt}`
        );
        if (this.sllosx.length <= 0) {
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 1000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener("mouseenter", Swal.stopTimer);
              toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
          });
          Toast.fire({
            icon: "success",
            title: "Không tìm thấy số liệu với nhóm này",
          });

          this.sllosx = await this.$axios.$get(`/api/lokehoach/alllonhamay`);
        }
      }
    },

    async getPhanxuong() {
      this.phanxuong = await this.$axios.$get(`/api/phongban/allphanxuong`);
    },

    async getAllPhieulo() {
      this.searchnhomsp = "";
      this.phieulo = await this.$axios.$get(`/api/ketoan/allphieulokh`);
    },

    showGhichu(pl) {
      this.one_lokhnm = pl;
      // console.log(this.one_lokhnm)
      this.isActive = true;
    },

    // Bấm vào lô kế hoạch nhà máy để ra kế hoạch mùa vụ
    // Khi bấm vào đây sẽ load ra 3 dòng mùa vụ của 1 kế hoạch năm
    async getdatakhnhamay(ttkehoachnam) {
      this.check_giaopx = false;
      this.mark_kehoachnam = ttkehoachnam;
      // console.log(this.mark_kehoachnam)
      // this.infoLosx = []
      // this.isActive = true;
      // console.log(phieulo)
      // console.log(this.phieulokh.makh);
      // lấy thông tin số lượng theo tháng trong kế hoạch năm show ra
      this.kehoachmuavu = await this.$axios.$get(
        `/api/lokehoach/getallkhmuavu?_id=${ttkehoachnam._id}`
      );
      // console.log(this.kehoachmuavu);

      // list ds kế hoạch phân xưởng đã giao
      this.kehoachphanxuong = await this.$axios.$get(
        `/api/lokehoach/getallkehoachpx?_id_khnam=${ttkehoachnam._id}`
      );
      // nhớ phải đổi lại = id khi nhập lại dữ liệu
      // this.kehoachphanxuong = await this.$axios.$get(
      //   `/api/lokehoach/getallkehoachpx?makh=${ttkehoachnam.makh}`
      // );
    },

    // Bấm vào lô kế hoạch nhà máy để ra kế hoạch px
    async getdataPhieulo(phieulo) {
      this.infoLosx = [];
      // this.isActive = true;
      this.phieulokh = phieulo;
      // console.log(this.phieulokh.makh);
      // this.tenphanxuong = await this.$axios.$get(
      //   `/api/lokehoach/getallpxinmalkh?makh=${this.phieulokh.makh}`
      // );
    },

    // tìm lọc
    async timNhomsp() {
      this.phieulo = await this.$axios.$get(
        `/api/lokehoach/getlokhnm?nhomthanhpham=${this.searchnhomsp}`
      );
    },

    async timMasp() {
      this.phieulo = await this.$axios.$get(
        `/api/lokehoach/getlokhnmwithmasp?mathanhpham=${this.searchmasp}`
      );
    },

    async detailpl(phieuloct) {
      this.isActive_phieuloct = true;
      this.allluongcongdoan = await this.$axios.$get(
        `/api/ketoan/getallluongcongdoaninlsx?makh=${phieuloct.makh}&makhpx=${phieuloct.makhpx}&malosx=${phieuloct.malosx}&mapx=${phieuloct.mapx}`
      );
      this.allluongcongnhat = await this.$axios.$get(
        `/api/ketoan/getallluongcongnhatinlsx?makh=${phieuloct.makh}&makhpx=${phieuloct.makhpx}&malosx=${phieuloct.malosx}&mapx=${phieuloct.mapx}`
      );
    },

    async onChange_status(e, data) {
      console.log(data.status);
    },

    async ghidulieu() {
      // console.log(this.items_khpx)
      // console.log(this.mark_kehoachnam)
      for (let i = 0; i < this.items_khpx.length; i++) {
        if (
          this.items_khpx[i].malonhamay == "" ||
          this.items_khpx[i].soluong == "" ||
          this.items_khpx[i].tuanbd == "" ||
          this.items_khpx[i].tuankt == ""
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
            title: "Nhập vào đủ thông tin",
          });
          return;
        } else {
          this.$axios.$post("/api/ketoan/addphieulokh", this.items_khpx[i]);
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
            title: "Tạo thành công",
          });
        }
      }
      this.callKehoachnhamay();
      let turn = 1;
      let length = this.items_khpx.length;
      while (turn <= length) {
        this.deleteRow_khpx(this.items_khpx.length - turn);
        turn += 1;
      }
      this.check_giaopx = false;
    },

    async refresh() {
      // this.sumsllosx = 0
      // this.infoLosx = await this.$axios.$get(
      //   `/api/lokehoach/getalllsxinlkh?makh=${this.mark_Makh}&makhpx=${this.mark_Makhpx}&mapx=${this.mark_Mapx}`
      // );
      // console.log(this.infoLosx)
      const data = await this.$axios.$get(
        `/api/ketoan/sumsoluonginlsx?makh=${this.mark_Makh}&makhpx=${this.mark_Makhpx}&mapx=${this.mark_Mapx}`
      );
      // console.log(data[0].total)
      if (data.length > 0) {
        this.sumsllosx = data[0].total;
      } else {
        this.sumsllosx = 0;
      }
    },

    giaopx() {
      this.check_giaopx = true;
      this.addPhanxuong();
    },

    async copyadd_khpx(data) {
      this.items_khpx.push({
        _id_khnam: data._id_khnam,
        kehoachnam: data.kehoachnam,
        malonhamay: data.malonhamay,
        soluong: data.soluong,
        sldathang: data.sldathang,
        slsanxuat: data.slsanxuat,
        tuanbd: "",
        tuankt: "",
        ngaybd: "",
        ngaykt: "",
        mathanhpham: data.mathanhpham,
        tenthanhpham: data.tenthanhpham,
        nhomthanhpham: data.nhomthanhpham,
        status: data.status,
        ngaybatdautt: data.ngaybatdautt,
        ngayhoanthanhtt: data.ngayhoanthanhtt,
        ghichu: data.ghichu,
        createdAt: data.createdAt,
        createdBy: data.createdBy,
        updatedAt: data.updatedAt,
      });
    },

    async resetAll() {
      this.searchmasp = "";
      this.searchnhomsp = "";
      this.search_timekt = null;
      this.kehoachmuavu = [];
      this.kehoachphanxuong = [];
      this.getAllPhieulo();
    },

    async callKehoachnhamay() {
      this.kehoachphanxuong = await this.$axios.$get(
        `/api/lokehoach/getallkehoachpx?_id_khnam=${this.mark_kehoachnam._id}`
      );
    },

    async onUpdateKhnm(data) {
      try {
        const now = new Date();
        const currentYear = now.getFullYear();
        const startDate = dayjs()
          .year(currentYear)
          .month(0)
          .date((data.tuanbd - 1) * 7 + 1);
        const startDateString = startDate.locale("vi").format("YYYY/MM/DD");
        data.ngaybd = startDateString;
        // // Tính toán ngày kết thúc của tuần đó
        const endDate = dayjs()
          .year(currentYear)
          .month(0)
          .date(data.tuankt * 7);
        const endDateString = endDate.locale("vi").format("YYYY/MM/DD");
        data.ngaykt = endDateString;
        this.$axios.$patch(`/api/lokehoach/${data._id}`, data);
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
          title: "Đã cập nhật",
        });
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
    },

    // update kế hoạch nhà máy năm trong đó có lưu số liệu lô mùa vụ
    onupdateKehoachmuavu(data) {
      // console.log(data.soluongmuavup3.trim())
      // console.log(data.soluongmuavup3.length)
      let p1;
      let p2;
      let p3;
      let sum;

      if (data.soluongmuavup1.trim() == "") {
        p1 = 0;
      } else {
        p1 = parseInt(data.soluongmuavup1.trim());
      }

      if (data.soluongmuavup2.trim() == "") {
        p2 = 0;
      } else {
        p2 = parseInt(data.soluongmuavup2.trim());
      }

      if (data.soluongmuavup3.trim() == "") {
        p3 = 0;
      } else {
        p3 = parseInt(data.soluongmuavup3.trim());
      }

      sum = p1 + p2 + p3;
      let slkhnam = parseInt(data.soluong.trim());
      // console.log(sum)
      if (slkhnam >= sum) {
        this.$axios.$patch(`/api/lokehoach/kehoach/${data._id}`, data);
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
          title: "Đã cập nhật",
        });
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
          title: `Số lượng các mùa vụ đã vượt số lượng kế hoạch năm là: ${
            slkhnam - sum
          }, xem lại số lượng`,
        });
      }
    },

    // update kế hoạch nhà máy theo số lượng tháng
    onupdateKehoachmuavutheothang(data) {
      // console.log(data.soluongmuavup3.trim())
      // console.log(data.soluongmuavup3.length)
      let m1;
      let m2;
      let m3;
      let m4;
      let sumv1;

      let m5;
      let m6;
      let m7;
      let m8;
      let sumv2;

      let m9;
      let m10;
      let m11;
      let m12;
      let sumv3;

      if (data.slthang1.trim() == "") {
        m1 = 0;
      } else {
        m1 = parseInt(data.slthang1.trim());
      }

      if (data.slthang2.trim() == "") {
        m2 = 0;
      } else {
        m2 = parseInt(data.slthang2.trim());
      }

      if (data.slthang3.trim() == "") {
        m3 = 0;
      } else {
        m3 = parseInt(data.slthang3.trim());
      }

      if (data.slthang4.trim() == "") {
        m4 = 0;
      } else {
        m4 = parseInt(data.slthang4.trim());
      }

      // vụ 2
      if (data.slthang5.trim() == "") {
        m5 = 0;
      } else {
        m5 = parseInt(data.slthang5.trim());
      }

      if (data.slthang6.trim() == "") {
        m6 = 0;
      } else {
        m6 = parseInt(data.slthang6.trim());
      }

      if (data.slthang7.trim() == "") {
        m7 = 0;
      } else {
        m7 = parseInt(data.slthang7.trim());
      }

      if (data.slthang8.trim() == "") {
        m8 = 0;
      } else {
        m8 = parseInt(data.slthang8.trim());
      }

      // vụ 3
      if (data.slthang9.trim() == "") {
        m9 = 0;
      } else {
        m9 = parseInt(data.slthang9.trim());
      }

      if (data.slthang10.trim() == "") {
        m10 = 0;
      } else {
        m10 = parseInt(data.slthang10.trim());
      }

      if (data.slthang11.trim() == "") {
        m11 = 0;
      } else {
        m11 = parseInt(data.slthang11.trim());
      }

      if (data.slthang12.trim() == "") {
        m12 = 0;
      } else {
        m12 = parseInt(data.slthang12.trim());
      }

      sumv1 = m1 + m2 + m3 + m4;
      sumv2 = m5 + m6 + m7 + m8;
      sumv3 = m9 + m10 + m11 + m12;

      let slkhp1 = parseInt(data.soluongmuavup1.trim());
      let slkhp2 = parseInt(data.soluongmuavup2.trim());
      let slkhp3 = parseInt(data.soluongmuavup3.trim());
      // console.log(sum)
      if (slkhp1 >= sumv1 && slkhp2 >= sumv2 && slkhp3 >= sumv3) {
        this.$axios.$patch(`/api/lokehoach/kehoach/${data._id}`, data);
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
          title: "Đã cập nhật",
        });
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
          title: `Xem lại số lượng hàng tháng đã vượt kế hoạch trong mùa vụ`,
        });
      }
    },

    // xóa 1 mã kế hoạch năm
    async onDeleteKehoachnam(data) {
      let arrLokehoach;
      arrLokehoach = await this.$axios.$get(
        `/api/lokehoach/predelete_muctieunam?_id=${data._id}`
      );
      // console.log(arrLokehoach);
      swal({
        title: "Bạn muốn kế hoạch nhà máy năm?",
        text: "Chỉ xóa được kế hoạch năm mà chưa phát sinh lô nhà máy",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          // console.log(arrLokehoach)
          if (arrLokehoach.length <= 0) {
            this.$axios
              .$delete(`/api/lokehoach/kehoachnam/${data._id}`)
              .then((response) => {
                const index = this.phieulo.findIndex(
                  (khnm) => khnm._id === data._id
                ); // find the post index
                if (~index)
                  // if the post exists in array
                  this.phieulo.splice(index, 1); //delete the post
              });
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
              title:
                "Đã có lô nhà máy phát sinh từ kế hoạch năm này, không thể xóa!!!",
            });
          }
        } else {
          swal("Bạn đã hủy xóa");
        }
      });
    },

    // Xóa lô nhà máy
    async onDeleteKhnm(pl) {
      // lấy ra _id, mã kế hoạch, mã lô nhà máy để xác định là duy nhất
      // console.log(pl)
      let arrLokehoachphanxuong;
      arrLokehoachphanxuong = await this.$axios.$get(
        `/api/lokehoach/predelete_lonhamay?_id=${pl._id}`
      );
      // console.log(arrLokehoachphanxuong);

      // nếu không tồn tại lô sản xuất thì status phải bằng 0
      let trangthai = pl.status;
      // console.log(trangthai);

      swal({
        title: "Bạn muốn xóa?",
        text: "Chỉ được xóa lô nhà máy chưa phát sinh lô kế hoạch phân xưởng!",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          if (arrLokehoachphanxuong.length > 0) {
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
                "Đã có lô kế hoạch phân xưởng phát sinh từ lô nhà máy này, không thể xóa!!!",
            });
          } else if (trangthai !== 0) {
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
              title: "Lô nhà máy chưa ở trạng thái = 0, không thể xóa!!!",
            });
          } else {
            this.$axios
              .$delete(`/api/lokehoach/kehoachnhamay/${pl._id}`)
              .then((response) => {
                const index = this.kehoachphanxuong.findIndex(
                  (khnm) => khnm._id === pl._id
                ); // find the post index
                if (~index)
                  // if the post exists in array
                  this.kehoachphanxuong.splice(index, 1); //delete the post
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
              title: "Đã xóa dữ liệu lô nhà máy",
            });
          }
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

.input.is-small {
  min-width: 50px;
}

.highlighted {
  background-color: lightblue;
}

.table-height {
  height: 450px;
  display: block;
  overflow: scroll;
  width: 100%;
  position: sticky;
  top: 0;
}

.modal-content,
.modal-card {
  width: 650px;
  height: 300px;
}

.pagination {
  display: flex;
  justify-content: right;
  margin-top: 5px;
  padding-bottom: 10px;
}

.pagination button {
  margin: 0 5px;
  padding: 5px 10px;
  border: none;
  background-color: #ccc;
  color: #fff;
  cursor: pointer;
}

.pagination button.active {
  background-color: #cb4b10;
}

@media (max-width: 768px) {
  .pagination button {
    margin: 5px;
  }
}

@media (max-width: 768px) {
  .modal-card {
    width: 90%;
    max-width: 400px;
  }
}
</style>
