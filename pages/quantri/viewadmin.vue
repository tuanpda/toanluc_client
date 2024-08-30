<template>
  <div class="box" style="margin: 10px">
    <!-- lv1 kế hoạch năm -->
    <div>
      <!-- Biểu tượng loading -->
      <div v-if="isLoading" class="loading-overlay">
        <div class="loading-content">
          <div class="loading-spinner"></div>
          <span class="loading-text">Đợi trong giây lát ...</span>
        </div>
      </div>

      <!-- bảng lọc -->
      <table class="table is-bordered is-narrow is-hoverable">
        <thead>
          <tr style="background-color: #ebfffc">
            <td style="width: 12%">
              <div class="field has-addons">
                <p class="control">
                  <input
                    v-model="namkh"
                    type="text"
                    class="input is-small"
                    placeholder="Năm"
                  />
                </p>
                <p class="control">
                  <a @click="filterNamkh" class="button is-small"> Lọc </a>
                </p>
              </div>
            </td>
            <td style="width: 20%">
              <div class="field has-addons">
                <p class="control is-expanded">
                  <input
                    v-model="nhomthanhpham"
                    class="input is-small is-fullwidth"
                    type="text"
                    placeholder="Nhóm thành phẩm phẩm"
                  />
                </p>
                <p class="control">
                  <a @click="filterNhomthanhpham" class="button is-small">
                    Lọc
                  </a>
                </p>
              </div>
            </td>
            <td style="width: 15%">
              <div class="field has-addons">
                <p class="control is-expanded">
                  <input
                    v-model="mathanhpham"
                    class="input is-small is-fullwidth"
                    type="text"
                    placeholder="Mã thành phẩm"
                  />
                </p>
                <p class="control">
                  <a @click="filterMathanhpham" class="button is-small">
                    Lọc
                  </a>
                </p>
              </div>
            </td>
            <td style="width: 15%">
              <div class="field has-addons">
                <p class="control is-expanded">
                  <input
                    v-model="makh"
                    class="input is-small is-fullwidth"
                    type="text"
                    placeholder="Mã kế hoạch"
                  />
                </p>
                <p class="control">
                  <a @click="filterMakehoach" class="button is-small"> Lọc </a>
                </p>
              </div>
            </td>

            <td style="width: 7%">
              <button
                @click="filterCombined"
                class="button is-info is-small is-fullwidth"
              >
                <span>Lọc kết hợp</span>
              </button>
            </td>

            <td style="width: 7%">
              <button
                @click="viewKehoach"
                class="button is-success is-small is-fullwidth"
              >
                <span>View kế hoạch đã thực hiện</span>
              </button>
            </td>

            <td></td>
          </tr>
        </thead>
      </table>
      <!-- dữ liệu -->
      <div class="table_wrapper">
        <table class="table is-bordered is-narrow is-hoverable">
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
                @click="sortTable('table1', 'makh')"
                style="
                  text-align: center;
                  font-size: small;
                  font-weight: bold;
                  width: 7%;
                "
              >
                Kế hoạch năm
                <a
                  ><i
                    style="margin-left: 10px; color: green"
                    class="fas fa-filter"
                    title="Bấm để sắp xếp"
                  ></i
                ></a>
              </th>
              <th
                @click="sortTable('table1', 'mathanhpham')"
                style="
                  text-align: center;
                  font-size: small;
                  font-weight: bold;
                  width: 7%;
                "
              >
                Mã thành phẩm
                <a
                  ><i
                    style="margin-left: 10px; color: green"
                    class="fas fa-filter"
                    title="Bấm để sắp xếp"
                  ></i
                ></a>
              </th>
              <th
                @click="sortTable('table1', 'nhomthanhpham')"
                style="
                  text-align: center;
                  font-size: small;
                  font-weight: bold;
                  width: 5%;
                "
              >
                Nhóm thành phẩm
                <a
                  ><i
                    style="margin-left: 10px; color: green"
                    class="fas fa-filter"
                    title="Bấm để sắp xếp"
                  ></i
                ></a>
              </th>
              <th
                @click="sortTable('table1', 'tgbatdau')"
                style="
                  text-align: center;
                  font-size: small;
                  font-weight: bold;
                  width: 5%;
                "
              >
                Ngày bắt đầu
                <a
                  ><i
                    style="margin-left: 10px; color: green"
                    class="fas fa-filter"
                    title="Bấm để sắp xếp"
                  ></i
                ></a>
              </th>
              <th
                @click="sortTable('table1', 'tgketthuc')"
                style="
                  text-align: center;
                  font-size: small;
                  font-weight: bold;
                  width: 5%;
                "
              >
                Ngày kết thúc
                <a
                  ><i
                    style="margin-left: 10px; color: green"
                    class="fas fa-filter"
                    title="Bấm để sắp xếp"
                  ></i
                ></a>
              </th>
              <th
                @click="sortTable('table1', 'soluong')"
                style="
                  text-align: center;
                  font-size: small;
                  font-weight: bold;
                  width: 7%;
                "
              >
                Số lượng
                <a
                  ><i
                    style="margin-left: 10px; color: green"
                    class="fas fa-filter"
                    title="Bấm để sắp xếp"
                  ></i
                ></a>
              </th>
              <th
                @click="sortTable('table1', 'status')"
                style="
                  text-align: center;
                  font-size: small;
                  font-weight: bold;
                  width: 5%;
                "
              >
                Trạng thái
                <a
                  ><i
                    style="margin-left: 10px; color: green"
                    class="fas fa-filter"
                    title="Bấm để sắp xếp"
                  ></i
                ></a>
              </th>
              <th
                @click="sortTable('table1', 'status')"
                style="
                  text-align: center;
                  font-size: small;
                  font-weight: bold;
                  width: 5%;
                "
              >
                Chi tiết
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(pl, index) in paginatedTable"
              :key="index + 'a'"
              :class="{ highlighted: pl._id === highlightedRow }"
              @click="
                [
                  highlightRow(pl._id),
                  showLokenhamay(pl._id, pl.mathanhpham, pl.nhomthanhpham),
                ]
              "
            >
              <td
                style="
                  text-align: center;
                  font-size: small;
                  vertical-align: middle;
                "
              >
                {{ index + 1 }}
              </td>
              <td
                style="
                  text-align: center;
                  font-size: small;
                  vertical-align: middle;
                "
              >
                {{ pl._id }}
              </td>
              <td style="font-size: small; vertical-align: middle">
                {{ pl.makh }}
              </td>
              <td
                style="
                  font-size: small;
                  text-align: center;
                  vertical-align: middle;
                "
              >
                {{ pl.mathanhpham }}
              </td>
              <td
                style="
                  font-size: small;
                  text-align: center;
                  vertical-align: middle;
                "
              >
                {{ pl.nhomthanhpham }}
              </td>
              <td
                style="
                  font-size: small;
                  text-align: center;
                  vertical-align: middle;
                "
              >
                <!-- <input
                    class="input is-small"
                    type="date"
                    v-bind:value="pl.tgbatdau | inputDateFilter"
                    v-on:input="pl.tgbatdau = getDate($event.target.value)"
                  /> -->
                {{ pl.tgbatdau | formatDate }}
              </td>
              <td
                style="
                  font-size: small;
                  text-align: center;
                  vertical-align: middle;
                "
              >
                <!-- <input
                    class="input is-small"
                    type="date"
                    v-bind:value="pl.tgketthuc | inputDateFilter"
                    v-on:input="pl.tgketthuc = getDate($event.target.value)"
                  /> -->
                {{ pl.tgketthuc | formatDate }}
              </td>
              <td
                style="
                  text-align: center;
                  font-size: small;
                  vertical-align: middle;
                "
              >
                {{ pl.soluong | formatNumber }}
              </td>
              <template>
                <td
                  v-if="pl.status == 1"
                  style="
                    font-size: small;
                    text-align: center;
                    vertical-align: middle;
                  "
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
                  v-else-if="pl.status == 2"
                  style="
                    font-size: small;
                    text-align: center;
                    vertical-align: middle;
                  "
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
                  v-else-if="pl.status == 3"
                  style="
                    font-size: small;
                    text-align: center;
                    vertical-align: middle;
                  "
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
                style="
                  font-size: small;
                  text-align: center;
                  vertical-align: middle;
                "
              >
                <span v-if="pl.status == false">
                  <a @click="detail(pl)"
                    ><i style="color: #f97583" class="fas fa-chart-pie"></i
                  ></a>
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- phân trang -->
      <div
        v-if="dataKhnhanmay.length > 5"
        class="columns"
        style="text-align: center; margin-top: 3px"
      >
        <div class="column">
          <div class="pagination">
            <span
              style="
                font-size: small;
                font-weight: 700;
                color: #00947e;
                margin-right: 20px;
              "
              >Tổng có {{ dataKhnhanmay.length }} kế hoạch năm</span
            >
            <input
              class="input is-small is-danger"
              type="number"
              placeholder="Page"
              style="width: 60px; display: inline-block; margin-right: 5px"
              id="itemsPerPage"
              v-model.number="itemsPerPage"
              min="1"
              max="10"
            />
            <button
              class="button is-small is-success"
              @click="changePage('table1', 1)"
              :disabled="currentPage === 1"
            >
              Đầu tiên
            </button>
            <button
              class="button is-small is-info"
              @click="changePage('table1', currentPage - 1)"
              :disabled="currentPage === 1"
            >
              Trước
            </button>
            <button
              class="button is-small"
              v-for="page in pages"
              @click="changePage('table1', page)"
              :class="{ active: page === currentPage }"
            >
              {{ page }}
            </button>
            <button
              class="button is-small is-info"
              @click="changePage('table1', currentPage + 1)"
              :disabled="currentPage === pageCount"
            >
              Sau
            </button>
            <button
              class="button is-small is-success"
              @click="changePage('table1', pageCount)"
              :disabled="currentPage === pageCount"
            >
              Cuối
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- lv2 kế hoạch nhà máy -->
    <div v-if="lokehoachnhamay.length > 0" style="margin-top: 5px">
      <!-- bảng lọc -->
      <!-- <table class="table is-bordered is-striped is-narrow is-hoverable">
        <thead>
          <tr style="background-color: #ebfffc">
            <td></td>
          </tr>
        </thead>
      </table> -->

      <!-- dữ liệu -->
      <div class="table_wrapper">
        <table class="table is-bordered is-narrow is-hoverable">
          <thead>
            <tr style="background-color: #fffff0">
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
                style="
                  text-align: center;
                  font-size: small;
                  font-weight: bold;
                  width: 3%;
                "
              >
                _ID_KHNAM
              </th>
              <th
                @click="sortTable('table3', 'malonhamay')"
                style="
                  text-align: center;
                  font-size: small;
                  font-weight: bold;
                  width: 7%;
                "
              >
                Mã lô nhà máy
                <a
                  ><i
                    style="margin-left: 10px; color: green"
                    class="fas fa-filter"
                    title="Bấm để sắp xếp"
                  ></i
                ></a>
                <br />
                <input
                  class="input is-small is-info"
                  type="text"
                  v-model="filterMalonhamayLv2"
                  placeholder="Nhập mã lô nhà máy"
                  style="margin-top: 5px; width: 100%"
                />
              </th>

              <th
                @click="sortTable('table3', 'soluong')"
                style="
                  text-align: center;
                  font-size: small;
                  font-weight: bold;
                  width: 5%;
                "
              >
                Số lượng
                <a
                  ><i
                    style="margin-left: 10px; color: green"
                    class="fas fa-filter"
                    title="Bấm để sắp xếp"
                  ></i
                ></a>
              </th>
              <th
                @click="sortTable('table3', 'tuanbd')"
                style="
                  text-align: center;
                  font-size: small;
                  font-weight: bold;
                  width: 5%;
                "
              >
                Tuần
                <a
                  ><i
                    style="margin-left: 10px; color: green"
                    class="fas fa-filter"
                    title="Bấm để sắp xếp"
                  ></i
                ></a>
                <br />
                bắt đầu
              </th>
              <th
                @click="sortTable('table3', 'tuankt')"
                style="
                  text-align: center;
                  font-size: small;
                  font-weight: bold;
                  width: 5%;
                "
              >
                Tuần
                <a
                  ><i
                    style="margin-left: 10px; color: green"
                    class="fas fa-filter"
                    title="Bấm để sắp xếp"
                  ></i
                ></a>
                <br />
                kết thúc
              </th>
              <th
                @click="sortTable('table3', 'ngaybd')"
                style="
                  text-align: center;
                  font-size: small;
                  font-weight: bold;
                  width: 5%;
                "
              >
                Ngày
                <a
                  ><i
                    style="margin-left: 10px; color: green"
                    class="fas fa-filter"
                    title="Bấm để sắp xếp"
                  ></i
                ></a>
                <br />
                bắt đầu
              </th>
              <th
                @click="sortTable('table3', 'ngaykt')"
                style="
                  text-align: center;
                  font-size: small;
                  font-weight: bold;
                  width: 5%;
                "
              >
                Ngày
                <a
                  ><i
                    style="margin-left: 10px; color: green"
                    class="fas fa-filter"
                    title="Bấm để sắp xếp"
                  ></i
                ></a>
                <br />
                kết thúc
              </th>
              <th
                @click="sortTable('table3', 'mathanhpham')"
                style="
                  text-align: center;
                  font-size: small;
                  font-weight: bold;
                  width: 5%;
                "
              >
                Mã thành phẩm
                <a
                  ><i
                    style="margin-left: 10px; color: green"
                    class="fas fa-filter"
                    title="Bấm để sắp xếp"
                  ></i
                ></a>
              </th>
              <th
                @click="sortTable('table3', 'tenthanhpham')"
                style="
                  text-align: center;
                  font-size: small;
                  font-weight: bold;
                  width: 5%;
                "
              >
                Tên thành phẩm
                <a
                  ><i
                    style="margin-left: 10px; color: green"
                    class="fas fa-filter"
                    title="Bấm để sắp xếp"
                  ></i
                ></a>
              </th>
              <th
                @click="sortTable('table3', 'nhomthanhpham')"
                style="
                  text-align: center;
                  font-size: small;
                  font-weight: bold;
                  width: 5%;
                "
              >
                Nhóm
                <a
                  ><i
                    style="margin-left: 10px; color: green"
                    class="fas fa-filter"
                    title="Bấm để sắp xếp"
                  ></i
                ></a>
                <br />
                thành phẩm
              </th>
              <th
                @click="sortTable('table3', 'status')"
                style="
                  text-align: center;
                  font-size: small;
                  font-weight: bold;
                  width: 5%;
                "
              >
                Trạng thái
                <a
                  ><i
                    style="margin-left: 10px; color: green"
                    class="fas fa-filter"
                    title="Bấm để sắp xếp"
                  ></i
                ></a>
              </th>
              <th
                @click="sortTable('table3', 'tonghong')"
                style="
                  text-align: center;
                  font-size: small;
                  font-weight: bold;
                  width: 5%;
                "
              >
                Tổng hỏng
                <a
                  ><i
                    style="margin-left: 10px; color: green"
                    class="fas fa-filter"
                    title="Bấm để sắp xếp"
                  ></i
                ></a>
              </th>
              <th
                @click="sortTable('table3', 'tongdat')"
                style="
                  text-align: center;
                  font-size: small;
                  font-weight: bold;
                  width: 5%;
                "
              >
                Tổng đạt
                <a
                  ><i
                    style="margin-left: 10px; color: green"
                    class="fas fa-filter"
                    title="Bấm để sắp xếp"
                  ></i
                ></a>
              </th>
              <th
                @click="sortTable('table3', 'ngaybatdautt')"
                style="
                  text-align: center;
                  font-size: small;
                  font-weight: bold;
                  width: 5%;
                "
              >
                Ngày bắt đầu TT
                <a
                  ><i
                    style="margin-left: 10px; color: green"
                    class="fas fa-filter"
                    title="Bấm để sắp xếp"
                  ></i
                ></a>
              </th>
              <th
                @click="sortTable('table3', 'ngayhoanthanhtt')"
                style="
                  text-align: center;
                  font-size: small;
                  font-weight: bold;
                  width: 5%;
                "
              >
                Ngày hoàn thành TT
                <a
                  ><i
                    style="margin-left: 10px; color: green"
                    class="fas fa-filter"
                    title="Bấm để sắp xếp"
                  ></i
                ></a>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(pl, index) in paginatedTable3"
              :key="index + 'a'"
              :class="{
                highlighted_lonhamay: pl._id === highlightedRow_lonhamay,
              }"
              @click="
                [
                  highlightRow_lonhamay(pl._id),
                  showLokehoachphanxuong(
                    pl._id,
                    pl.mathanhpham,
                    pl.nhomthanhpham
                  ),
                ]
              "
            >
              <td
                style="
                  text-align: center;
                  font-size: small;
                  vertical-align: middle;
                "
              >
                {{ index + 1 }}
              </td>
              <td
                style="
                  text-align: center;
                  font-size: small;
                  vertical-align: middle;
                "
              >
                {{ pl._id }}
              </td>
              <td
                style="
                  text-align: center;
                  font-size: small;
                  vertical-align: middle;
                "
              >
                {{ pl._id_khnam }}
              </td>
              <td style="font-size: small; vertical-align: middle">
                {{ pl.malonhamay }}
              </td>
              <td
                style="
                  font-size: small;
                  text-align: center;
                  vertical-align: middle;
                "
              >
                {{ pl.soluong | formatNumber }}
              </td>
              <td
                style="
                  font-size: small;
                  text-align: center;
                  vertical-align: middle;
                "
              >
                {{ pl.tuanbd }}
              </td>
              <td
                style="
                  font-size: small;
                  text-align: center;
                  vertical-align: middle;
                "
              >
                {{ pl.tuankt }}
              </td>
              <td
                style="
                  font-size: small;
                  text-align: center;
                  vertical-align: middle;
                "
              >
                {{ pl.ngaybd | formatDate }}
              </td>
              <td
                style="
                  font-size: small;
                  text-align: center;
                  vertical-align: middle;
                "
              >
                {{ pl.ngaykt | formatDate }}
              </td>
              <td
                style="
                  font-size: small;
                  text-align: center;
                  vertical-align: middle;
                "
              >
                {{ pl.mathanhpham }}
              </td>
              <td
                style="
                  font-size: small;
                  text-align: center;
                  vertical-align: middle;
                "
              >
                {{ pl.tenthanhpham }}
              </td>
              <td
                style="
                  font-size: small;
                  text-align: center;
                  vertical-align: middle;
                "
              >
                {{ pl.nhomthanhpham }}
              </td>
              <template>
                <td
                  v-if="pl.status == 1"
                  style="
                    font-size: small;
                    text-align: center;
                    vertical-align: middle;
                  "
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
                  v-else-if="pl.status == 2"
                  style="
                    font-size: small;
                    text-align: center;
                    vertical-align: middle;
                  "
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
                  v-else-if="pl.status == 3"
                  style="
                    font-size: small;
                    text-align: center;
                    vertical-align: middle;
                  "
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
                style="
                  font-size: small;
                  text-align: center;
                  vertical-align: middle;
                "
              >
                {{ pl.tonghong }}
              </td>
              <td
                style="
                  font-size: small;
                  text-align: center;
                  vertical-align: middle;
                "
              >
                {{ pl.tongdat }}
              </td>

              <td style="font-size: small; text-align: center">
                <input
                  :value="dateToYYYYMMDD(pl.ngaybatdautt)"
                  type="date"
                  class="input is-small"
                  @blur="updateNgaybdtt($event.target.value, pl)"
                />
              </td>
              <td style="font-size: small; text-align: center">
                <input
                  :value="dateToYYYYMMDD(pl.ngayhoanthanhtt)"
                  type="date"
                  class="input is-small"
                  @blur="updateNgayhoanthanhtt($event.target.value, pl)"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- phân trang -->
      <div
        v-if="lokehoachnhamay.length > 5"
        class="columns"
        style="text-align: center; margin-top: 3px"
      >
        <div class="column">
          <div class="pagination">
            <span
              style="
                font-size: small;
                font-weight: 700;
                color: #00947e;
                margin-right: 20px;
              "
              >Tổng có {{ lokehoachnhamay.length }} lô kế hoạch nhà máy</span
            >
            <input
              class="input is-small is-danger"
              type="number"
              placeholder="Page"
              style="width: 60px; display: inline-block; margin-right: 5px"
              id="itemsPerPage"
              v-model.number="itemsPerPage3"
              min="1"
              max="10"
            />
            <button
              class="button is-small is-success"
              @click="changePage('table3', 1)"
              :disabled="currentPage3 === 1"
            >
              Đầu tiên
            </button>
            <button
              class="button is-small is-info"
              @click="changePage('table3', currentPage3 - 1)"
              :disabled="currentPage3 === 1"
            >
              Trước
            </button>
            <button
              class="button is-small"
              v-for="page in pages3"
              @click="changePage('table3', page)"
              :class="{ active: page === currentPage3 }"
            >
              {{ page }}
            </button>
            <button
              class="button is-small is-info"
              @click="changePage('table3', currentPage3 + 1)"
              :disabled="currentPage3 === pageCount3"
            >
              Sau
            </button>
            <button
              class="button is-small is-success"
              @click="changePage('table3', pageCount3)"
              :disabled="currentPage3 === pageCount3"
            >
              Cuối
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- lv3 kế hoạch phân xưởng -->
    <div v-if="lokehoachphanxuong.length > 0" style="margin-top: 5px">
      <!-- bảng lọc -->
      <!-- <table class="table is-bordered is-striped is-narrow is-hoverable">
        <thead>
          <tr style="background-color: #ebfffc">
            <td></td>
          </tr>
        </thead>
      </table> -->

      <!-- dữ liệu -->
      <div class="table_wrapper">
        <table class="table is-bordered is-narrow is-hoverable">
          <thead>
            <tr style="background-color: #edf3ff">
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
                style="
                  text-align: center;
                  font-size: small;
                  font-weight: bold;
                  width: 3%;
                "
              >
                _ID_LNM
              </th>
              <th
                @click="sortTable('table2', 'mapx')"
                style="
                  text-align: center;
                  font-size: small;
                  font-weight: bold;
                  width: 7%;
                "
              >
                Phân xưởng
                <a
                  ><i
                    style="margin-left: 10px; color: green"
                    class="fas fa-filter"
                    title="Bấm để sắp xếp"
                  ></i
                ></a>
                <br />
                <input
                  class="input is-small is-info"
                  type="text"
                  v-model="filterMapx"
                  placeholder="Nhập mã PX"
                  style="margin-top: 5px; width: 100%"
                />
              </th>
              <th
                @click="sortTable('table2', 'maspkhpx')"
                style="
                  text-align: center;
                  font-size: small;
                  font-weight: bold;
                  width: 7%;
                "
              >
                Mã sản phẩm
                <a
                  ><i
                    style="margin-left: 10px; color: green"
                    class="fas fa-filter"
                    title="Bấm để sắp xếp"
                  ></i
                ></a>
              </th>
              <th
                @click="sortTable('table2', 'malonhamay')"
                style="
                  text-align: center;
                  font-size: small;
                  font-weight: bold;
                  width: 5%;
                "
              >
                Mã lô nhà máy
                <a
                  ><i
                    style="margin-left: 10px; color: green"
                    class="fas fa-filter"
                    title="Bấm để sắp xếp"
                  ></i
                ></a>
                <br />
                <input
                  class="input is-small is-info"
                  type="text"
                  v-model="filterMalonhamay"
                  placeholder="Nhập mã lô nhà máy"
                  style="margin-top: 5px; width: 100%"
                />
              </th>
              <th
                @click="sortTable('table2', 'ngaybdexc')"
                style="
                  text-align: center;
                  font-size: small;
                  font-weight: bold;
                  width: 5%;
                "
              >
                Ngày bắt đầu <br />
                (EXC)
                <a
                  ><i
                    style="margin-left: 10px; color: green"
                    class="fas fa-filter"
                    title="Bấm để sắp xếp"
                  ></i
                ></a>
              </th>
              <th
                @click="sortTable('table2', 'ngayktexc')"
                style="
                  text-align: center;
                  font-size: small;
                  font-weight: bold;
                  width: 5%;
                "
              >
                Ngày kết thúc <br />
                (EXC)
                <a
                  ><i
                    style="margin-left: 10px; color: green"
                    class="fas fa-filter"
                    title="Bấm để sắp xếp"
                  ></i
                ></a>
              </th>
              <th
                @click="sortTable('table2', 'ngaybdthucte')"
                style="
                  text-align: center;
                  font-size: small;
                  font-weight: bold;
                  width: 5%;
                "
              >
                Ngày BDTT
                <a
                  ><i
                    style="margin-left: 10px; color: green"
                    class="fas fa-filter"
                    title="Bấm để sắp xếp"
                  ></i
                ></a>
              </th>
              <th
                @click="sortTable('table2', 'ngayhoanthanhtt')"
                style="
                  text-align: center;
                  font-size: small;
                  font-weight: bold;
                  width: 5%;
                "
              >
                Ngày HTTT
                <a
                  ><i
                    style="margin-left: 10px; color: green"
                    class="fas fa-filter"
                    title="Bấm để sắp xếp"
                  ></i
                ></a>
              </th>
              <th
                @click="sortTable('table2', 'soluong')"
                style="
                  text-align: center;
                  font-size: small;
                  font-weight: bold;
                  width: 5%;
                "
              >
                Số lượng
                <a
                  ><i
                    style="margin-left: 10px; color: green"
                    class="fas fa-filter"
                    title="Bấm để sắp xếp"
                  ></i
                ></a>
              </th>
              <th
                @click="sortTable('table2', 'status')"
                style="
                  text-align: center;
                  font-size: small;
                  font-weight: bold;
                  width: 5%;
                "
              >
                Trạng thái
                <a
                  ><i
                    style="margin-left: 10px; color: green"
                    class="fas fa-filter"
                    title="Bấm để sắp xếp"
                  ></i
                ></a>
              </th>
              <th
                @click="sortTable('table2', 'tonghong')"
                style="
                  text-align: center;
                  font-size: small;
                  font-weight: bold;
                  width: 7%;
                "
              >
                Tổng hỏng
                <a
                  ><i
                    style="margin-left: 10px; color: green"
                    class="fas fa-filter"
                    title="Bấm để sắp xếp"
                  ></i
                ></a>
              </th>
              <th
                @click="sortTable('table2', 'tongdat')"
                style="
                  text-align: center;
                  font-size: small;
                  font-weight: bold;
                  width: 7%;
                "
              >
                Tổng đạt
                <a
                  ><i
                    style="margin-left: 10px; color: green"
                    class="fas fa-filter"
                    title="Bấm để sắp xếp"
                  ></i
                ></a>
              </th>
              <th
                style="text-align: center; font-size: small; font-weight: bold"
              >
                Cập nhật <br />
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(pl, index) in paginatedTable2"
              :key="index + 'a'"
              :class="{ highlighted_lokhpx: pl._id === highlightedRow_lokhpx }"
              @click="
                [
                  highlightRow_khpx(pl._id),
                  showLosanxuat(pl._id_khnam, pl._id_lonhamay, pl._id, pl.mapx),
                ]
              "
            >
              <td
                style="
                  text-align: center;
                  font-size: small;
                  vertical-align: middle;
                "
              >
                {{ index + 1 }}
              </td>
              <td
                style="
                  text-align: center;
                  font-size: small;
                  vertical-align: middle;
                "
              >
                {{ pl._id }}
              </td>
              <td
                style="
                  text-align: center;
                  font-size: small;
                  vertical-align: middle;
                "
              >
                {{ pl._id_lonhamay }}
              </td>
              <td style="font-size: small; vertical-align: middle">
                {{ pl.mapx }}
              </td>
              <td
                style="
                  font-size: small;
                  text-align: center;
                  vertical-align: middle;
                "
              >
                {{ pl.maspkhpx }}
              </td>
              <td
                style="
                  font-size: small;
                  text-align: center;
                  vertical-align: middle;
                "
              >
                {{ pl.malonhamay }}
              </td>
              <td
                style="
                  font-size: small;
                  text-align: center;
                  vertical-align: middle;
                "
              >
                {{ pl.ngaybdexc | formatDate }}
              </td>
              <td
                style="
                  font-size: small;
                  text-align: center;
                  vertical-align: middle;
                "
              >
                {{ pl.ngayktexc | formatDate }}
              </td>
              <td style="font-size: small; text-align: center">
                <input
                  :value="dateToYYYYMMDD(pl.ngaybdthucte)"
                  type="date"
                  class="input is-small"
                  @blur="updateNgaybdtt($event.target.value, pl)"
                />
              </td>
              <td style="font-size: small; text-align: center">
                <input
                  :value="dateToYYYYMMDD(pl.ngayhoanthanhtt)"
                  type="date"
                  class="input is-small"
                  @blur="updateNgayhoanthanhtt($event.target.value, pl)"
                />
              </td>
              <td
                style="
                  font-size: small;
                  text-align: center;
                  vertical-align: middle;
                "
              >
                {{ pl.soluongkhpx | formatNumber }}
              </td>
              <template>
                <td
                  v-if="pl.status == 1"
                  style="
                    font-size: small;
                    text-align: center;
                    vertical-align: middle;
                  "
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
                  v-else-if="pl.status == 2"
                  style="
                    font-size: small;
                    text-align: center;
                    vertical-align: middle;
                  "
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
                  v-else-if="pl.status == 3"
                  style="
                    font-size: small;
                    text-align: center;
                    vertical-align: middle;
                  "
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
                style="
                  text-align: center;
                  font-size: small;
                  vertical-align: middle;
                "
              >
                <input
                  v-model="pl.tonghong"
                  type="number"
                  class="input is-small is-success"
                  @blur="updateTonghong(pl)"
                />
              </td>
              <td
                style="
                  text-align: center;
                  font-size: small;
                  vertical-align: middle;
                "
              >
                <input
                  v-model="pl.tongdat"
                  type="number"
                  class="input is-small is-success"
                  @blur="updateTongdat(pl)"
                />
              </td>
              <td style="font-size: small; vertical-align: middle">
                <div class="select is-small is-fullwidth">
                  <select
                    id=""
                    v-model="pl.status"
                    @change="onChange_status($event, pl)"
                  >
                    <option value="3">HT</option>
                    <option value="2">SX</option>
                    <option value="1">DK</option>
                    <option value="0">0</option>
                  </select>
                </div>
              </td>
            </tr>
            <tr>
              <td colspan="12"></td>

              <td
                style="
                  text-align: center;
                  font-size: small;
                  vertical-align: middle;
                  font-weight: bold;
                  color: #00947e;
                "
              >
                {{ sumTonghongLoKHPX }}
              </td>
              <td
                style="
                  text-align: center;
                  font-size: small;
                  vertical-align: middle;
                  font-weight: bold;
                  color: #00947e;
                "
              >
                {{ sumTongdatLoKHPX }}
              </td>
              <td colspan="3">
                <button
                  @click="updateSodathongtoLokehoachnhamay"
                  class="button is-small is-danger is-fullwidth"
                >
                  Cập nhật vào lô nhà máy
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- phân trang -->
      <div
        v-if="lokehoachphanxuong.length > 5"
        class="columns"
        style="text-align: center; margin-top: 3px"
      >
        <div class="column">
          <div class="pagination">
            <span
              style="
                font-size: small;
                font-weight: 700;
                color: #00947e;
                margin-right: 20px;
              "
              >Tổng có {{ lokehoachphanxuong.length }} lô kế hoạch phân
              xưởng</span
            >
            <input
              class="input is-small is-danger"
              type="number"
              placeholder="Page"
              style="width: 60px; display: inline-block; margin-right: 5px"
              id="itemsPerPage"
              v-model.number="itemsPerPage2"
              min="1"
              max="10"
            />
            <button
              class="button is-small is-success"
              @click="changePage('table2', 1)"
              :disabled="currentPage2 === 1"
            >
              Đầu tiên
            </button>
            <button
              class="button is-small is-info"
              @click="changePage('table2', currentPage2 - 1)"
              :disabled="currentPage2 === 1"
            >
              Trước
            </button>
            <button
              class="button is-small"
              v-for="page in pages2"
              @click="changePage('table2', page)"
              :class="{ active: page === currentPage2 }"
            >
              {{ page }}
            </button>
            <button
              class="button is-small is-info"
              @click="changePage('table2', currentPage2 + 1)"
              :disabled="currentPage2 === pageCount2"
            >
              Sau
            </button>
            <button
              class="button is-small is-success"
              @click="changePage('table2', pageCount2)"
              :disabled="currentPage2 === pageCount2"
            >
              Cuối
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- lv4 lô sản xuất -->
    <div style="margin-top: 10px" v-if="losanxuat.length > 0">
      <!-- dữ liệu hiển thị -->
      <div class="table_wrapper">
        <table class="table is-bordered is-narrow is-hoverable">
          <thead>
            <tr style="background-color: #fff5ee">
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
                style="
                  text-align: center;
                  font-size: small;
                  font-weight: bold;
                  width: 3%;
                "
              >
                _ID_KHPX
              </th>
              <th
                @click="sortTable('malosx')"
                style="
                  text-align: center;
                  font-size: small;
                  font-weight: bold;
                  width: 7%;
                "
              >
                Mã lô sản xuất
                <a
                  ><i
                    style="margin-left: 10px; color: green"
                    class="fas fa-filter"
                    title="Bấm để sắp xếp"
                  ></i
                ></a>
              </th>
              <th
                @click="sortTable('masp')"
                style="
                  text-align: center;
                  font-size: small;
                  font-weight: bold;
                  width: 7%;
                "
              >
                Mã sản phẩm
                <a
                  ><i
                    style="margin-left: 10px; color: green"
                    class="fas fa-filter"
                    title="Bấm để sắp xếp"
                  ></i
                ></a>
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
                <a
                  ><i
                    style="margin-left: 10px; color: green"
                    class="fas fa-filter"
                    title="Bấm để sắp xếp"
                  ></i
                ></a>
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
                Tính lương?
              </th>
              <th
                @click="sortTable('ngaybd')"
                style="
                  text-align: center;
                  font-size: small;
                  font-weight: bold;
                  width: 5%;
                "
              >
                Ngày bắt đầu
                <a
                  ><i
                    style="margin-left: 10px; color: green"
                    class="fas fa-filter"
                    title="Bấm để sắp xếp"
                  ></i
                ></a>
              </th>
              <th
                @click="sortTable('ngaykt')"
                style="
                  text-align: center;
                  font-size: small;
                  font-weight: bold;
                  width: 5%;
                "
              >
                Ngày kết thúc
                <a
                  ><i
                    style="margin-left: 10px; color: green"
                    class="fas fa-filter"
                    title="Bấm để sắp xếp"
                  ></i
                ></a>
              </th>
              <th
                @click="sortTable('soluonglsx')"
                style="
                  text-align: center;
                  font-size: small;
                  font-weight: bold;
                  width: 7%;
                "
              >
                Số lượng LSX
                <a
                  ><i
                    style="margin-left: 10px; color: green"
                    class="fas fa-filter"
                    title="Bấm để sắp xếp"
                  ></i
                ></a>
              </th>
              <th
                @click="sortTable('soluongkhsx')"
                style="
                  text-align: center;
                  font-size: small;
                  font-weight: bold;
                  width: 7%;
                "
              >
                Số lượng KHSX
                <a
                  ><i
                    style="margin-left: 10px; color: green"
                    class="fas fa-filter"
                    title="Bấm để sắp xếp"
                  ></i
                ></a>
              </th>
              <th
                @click="sortTable('tonghong')"
                style="
                  text-align: center;
                  font-size: small;
                  font-weight: bold;
                  width: 7%;
                "
              >
                Tổng hỏng
                <a
                  ><i
                    style="margin-left: 10px; color: green"
                    class="fas fa-filter"
                    title="Bấm để sắp xếp"
                  ></i
                ></a>
              </th>
              <th
                @click="sortTable('tongdat')"
                style="
                  text-align: center;
                  font-size: small;
                  font-weight: bold;
                  width: 7%;
                "
              >
                Tổng đạt
                <a
                  ><i
                    style="margin-left: 10px; color: green"
                    class="fas fa-filter"
                    title="Bấm để sắp xếp"
                  ></i
                ></a>
              </th>
              <td
                style="text-align: center; font-weight: bold; font-size: small"
              >
                Tính <br />
                tổng đạt <input type="checkbox" v-model="selectAll" />
              </td>
              <th
                @click="sortTable('slhtghinhan')"
                style="
                  text-align: center;
                  font-size: small;
                  font-weight: bold;
                  width: 7%;
                "
              >
                Số lượng HT <br />
                đã ghi nhận
                <a
                  ><i
                    style="margin-left: 10px; color: green"
                    class="fas fa-filter"
                    title="Bấm để sắp xếp"
                  ></i
                ></a>
              </th>
              <th
                @click="sortTable('ngayhoanthanhtt')"
                style="
                  text-align: center;
                  font-size: small;
                  font-weight: bold;
                  width: 7%;
                "
              >
                Ngày HTTT
                <a
                  ><i
                    style="margin-left: 10px; color: green"
                    class="fas fa-filter"
                    title="Bấm để sắp xếp"
                  ></i
                ></a>
              </th>
              <th
                style="text-align: center; font-size: small; font-weight: bold"
              >
                Xử lý Lô SX
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(pl, index) in losanxuat"
              :key="index + 'a'"
              :class="{ highlighted_losx: pl._id === highlightedRow_losx }"
              @click="[highlightRow_losanxuat(pl._id)]"
            >
              <td
                style="
                  text-align: center;
                  font-size: small;
                  vertical-align: middle;
                "
              >
                {{ index + 1 }}
              </td>
              <td
                style="
                  text-align: center;
                  font-size: small;
                  vertical-align: middle;
                "
              >
                {{ pl._id }}
              </td>
              <td style="text-align: center; font-size: small">
                {{ pl._id_khpx }}
              </td>
              <td style="font-size: small; vertical-align: middle">
                {{ pl.malosx }}
              </td>
              <td
                style="
                  font-size: small;
                  text-align: center;
                  vertical-align: middle;
                "
              >
                {{ pl.masp }}
              </td>
              <template>
                <td
                  v-if="pl.status == 1"
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
                  v-else-if="pl.status == 2"
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
                  v-else-if="pl.status == 3"
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
              <template>
                <td
                  v-if="pl.status_tinhluong == 1"
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
                    >R</span
                  >
                </td>

                <td v-else style="font-size: small; text-align: center">
                  <span
                    style="
                      color: white;
                      font-weight: bold;
                      background-color: red;
                      padding-left: 7px;
                      padding-right: 7px;
                    "
                    >C</span
                  >
                </td>
              </template>
              <td
                style="
                  font-size: small;
                  text-align: center;
                  vertical-align: middle;
                "
              >
                {{ pl.ngaybd | formatDate }}
              </td>
              <td
                style="
                  font-size: small;
                  text-align: center;
                  vertical-align: middle;
                "
              >
                {{ pl.ngaykt | formatDate }}
              </td>
              <td
                style="
                  text-align: center;
                  font-size: small;
                  vertical-align: middle;
                "
              >
                {{ pl.soluonglsx | formatNumber }}
              </td>
              <td
                style="
                  text-align: center;
                  font-size: small;
                  vertical-align: middle;
                "
              >
                {{ pl.soluongkhsx | formatNumber }}
              </td>
              <td
                style="
                  text-align: center;
                  font-size: small;
                  vertical-align: middle;
                "
              >
                <span
                  v-if="pl.tonghong === null || pl.tonghong === ''"
                  style="
                    color: red;
                    font-weight: bold;
                    background-color: yellow;
                    padding-left: 7px;
                    padding-right: 7px;
                  "
                  >Chưa nhập</span
                >
                <span v-else>{{ pl.tonghong | formatNumber }}</span>
              </td>
              <td
                style="
                  text-align: center;
                  font-size: small;
                  vertical-align: middle;
                "
              >
                <span
                  v-if="pl.tongdat === null || pl.tongdat === ''"
                  style="
                    color: red;
                    font-weight: bold;
                    background-color: yellow;
                    padding-left: 7px;
                    padding-right: 7px;
                  "
                  >Chưa nhập</span
                >
                <span v-else>{{ pl.tongdat | formatNumber }}</span>
              </td>
              <td style="text-align: center">
                <input v-model="selected" :value="pl" type="checkbox" />
              </td>
              <td
                style="
                  font-size: small;
                  text-align: center;
                  vertical-align: middle;
                "
              >
                <template v-if="pl.slhtghinhan === pl.tongdat">
                  {{ pl.slhtghinhan | formatNumber }}
                </template>
                <template v-else>
                  <span style="background-color: #ffd863">Không ghi nhận</span>
                </template>
              </td>
              <td
                style="
                  font-size: small;
                  text-align: center;
                  vertical-align: middle;
                "
              >
                {{ pl.ngayhoanthanhtt | formatDate }}
              </td>
              <td
                style="
                  font-size: small;
                  text-align: center;
                  vertical-align: middle;
                "
              >
                <span>
                  <a @click="modelProcessLsx(pl)"
                    ><i style="color: red" class="fas fa-award"></i
                  ></a>
                </span>
              </td>
            </tr>
            <tr>
              <th
                style="
                  text-align: left;
                  color: #3e8ed0;
                  font-weight: bold;
                  font-size: small;
                "
                colspan="9"
              >
                Tổng đạt - Tổng hỏng
              </th>
              <td
                style="
                  text-align: center;
                  font-size: small;
                  vertical-align: middle;
                  font-weight: bold;
                  color: #00947e;
                "
              >
                {{ sumTongsoluonglosanxuat }}
              </td>
              <td
                style="
                  text-align: center;
                  font-size: small;
                  vertical-align: middle;
                  font-weight: bold;
                  color: #00947e;
                "
              >
                {{ sumTongsoluongkhpx }}
              </td>
              <th style="font-size: small; color: #f97583; text-align: center">
                {{ sumTonghong | formatNumber }}
              </th>
              <th style="font-size: small; color: #f97583; text-align: center">
                {{ sumTongdat | formatNumber }}
              </th>
              <th colspan="4">
                <button
                  @click="updateSodathongtoLokehoachpx()"
                  class="button is-small is-danger is-fullwidth"
                >
                  Cập nhật vào lô kế hoạch phân xưởng
                </button>
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- modal detail -->
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
            <div class="columns is-mobile">
              <div class="column">
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
                  Details
                </p>
              </div>
              <div
                class="column"
                style="text-align: right; margin-top: 12px; margin-right: 20px"
              >
                <button
                  @click="isActive = false"
                  class="button is-small is-danger"
                >
                  Đóng
                </button>
              </div>
            </div>
          </header>
          <section class="modal-card-body">
            <div class="columns">
              <!-- details -->
              <!-- lô nhà máy -->
              <div class="column is-3">
                <div class="table_wrapper">
                  <table class="table is-bordered is-narrow is-hoverable">
                    <thead>
                      <tr style="background-color: #d9eee1">
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
                          Status
                        </th>
                        <th
                          style="
                            text-align: center;
                            font-size: small;
                            font-weight: bold;
                          "
                        >
                          Mã Lô nhà máy
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(item, index) in details.lonhamayData"
                        :key="index"
                        :class="{
                          highlighted_details_lonm:
                            item === highlightedRow_details_lnm,
                        }"
                        @click="
                          [
                            highlightRow_details_lonhamay(item),
                            detailsLokhpx(item),
                          ]
                        "
                      >
                        <td style="text-align: center; font-size: small">
                          {{ index + 1 }}
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
                          <td
                            v-else
                            style="font-size: small; text-align: center"
                          ></td>
                        </template>
                        <td style="font-size: small">
                          {{ item.malonhamay }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <!-- lô kế hoạch phân xưởng -->
              <div
                v-if="details.lokehoachphanxuongData.length > 0"
                class="column is-3"
              >
                <div class="table_wrapper">
                  <table class="table is-bordered is-narrow is-hoverable">
                    <thead>
                      <tr style="background-color: #edf3ff">
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
                          style="
                            text-align: center;
                            font-size: small;
                            font-weight: bold;
                            width: 3%;
                          "
                        >
                          Status
                        </th>
                        <th
                          style="
                            text-align: center;
                            font-size: small;
                            font-weight: bold;
                          "
                        >
                          KHPX
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(item, index) in details.lokehoachphanxuongData"
                        :key="index"
                        :class="{
                          highlighted_details_lokhpx:
                            item === highlightedRow_details_lkhpx,
                        }"
                        @click="
                          [
                            highlightRow_details_lokehoachpx(item),
                            detailsLosx(item),
                          ]
                        "
                      >
                        <td style="text-align: center; font-size: small">
                          {{ index + 1 }}
                        </td>
                        <td style="text-align: center; font-size: small">
                          {{ item._id }}
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
                          <td
                            v-else
                            style="font-size: small; text-align: center"
                          ></td>
                        </template>
                        <td style="text-align: center; font-size: small">
                          {{ item.makhpx }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <!-- lô sản xuất -->
              <div v-if="details.losanxuatData.length > 0" class="column is-3">
                <div class="table_wrapper">
                  <table class="table is-bordered is-narrow is-hoverable">
                    <thead>
                      <tr style="background-color: #e1e4e8">
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
                          style="
                            text-align: center;
                            font-size: small;
                            font-weight: bold;
                            width: 3%;
                          "
                        >
                          Status
                        </th>
                        <th
                          style="
                            text-align: center;
                            font-size: small;
                            font-weight: bold;
                          "
                        >
                          Lô sản xuất
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(item, index) in details.losanxuatData"
                        :key="index"
                        @click="
                          [
                            highlightRow_details_losanxuat(item),
                            showCongdoan(item),
                          ]
                        "
                        :class="{
                          highlighted_details_losx:
                            item === highlightedRow_details_lsx,
                        }"
                      >
                        <td style="text-align: center; font-size: small">
                          {{ index + 1 }}
                        </td>
                        <td style="text-align: center; font-size: small">
                          {{ item._id }}
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
                          <td
                            v-else
                            style="font-size: small; text-align: center"
                          ></td>
                        </template>
                        <td style="text-align: center; font-size: small">
                          {{ item.malosx }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <!-- lương công đoạn + công nhật -->
              <div class="column">
                <div
                  v-if="details.luongcongdoan.length > 0"
                  class="table_wrapper"
                >
                  <table class="table is-bordered is-narrow is-hoverable">
                    <thead>
                      <tr style="background-color: #fff5ee">
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
                          "
                        >
                          Tên công nhân
                        </th>
                        <th
                          style="
                            text-align: center;
                            font-size: small;
                            font-weight: bold;
                          "
                        >
                          Nguyên công
                        </th>
                        <th
                          style="
                            text-align: center;
                            font-size: small;
                            font-weight: bold;
                          "
                        >
                          Đơn giá
                        </th>
                        <th
                          style="
                            text-align: center;
                            font-size: small;
                            font-weight: bold;
                          "
                        >
                          Số đạt
                        </th>
                        <th
                          style="
                            text-align: center;
                            font-size: small;
                            font-weight: bold;
                          "
                        >
                          Số hỏng
                        </th>
                        <th
                          style="
                            text-align: center;
                            font-size: small;
                            font-weight: bold;
                          "
                        >
                          Ngày thực hiện
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(item, index) in details.luongcongdoan"
                        :key="index"
                      >
                        <td style="text-align: center; font-size: small">
                          {{ index + 1 }}
                        </td>
                        <td style="font-size: small">
                          {{ item.tencn }}
                        </td>
                        <td style="text-align: center; font-size: small">
                          {{ item.nguyencong }}
                        </td>
                        <td style="text-align: center; font-size: small">
                          {{ item.dongia }}
                        </td>
                        <td style="text-align: center; font-size: small">
                          {{ item.sodat }}
                        </td>
                        <td style="text-align: center; font-size: small">
                          {{ item.sohong }}
                        </td>
                        <td style="text-align: center; font-size: small">
                          {{ item.ngaythuchien | formatDate }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div
                  v-if="details.luongcongnhat.length > 0"
                  class="table_wrapper"
                  style="margin-top: 10px"
                >
                  <table class="table is-bordered is-narrow is-hoverable">
                    <thead>
                      <tr style="background-color: #f5fffa">
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
                          "
                        >
                          Tên công nhân
                        </th>
                        <th
                          style="
                            text-align: center;
                            font-size: small;
                            font-weight: bold;
                          "
                        >
                          Tên công
                        </th>
                        <th
                          style="
                            text-align: center;
                            font-size: small;
                            font-weight: bold;
                          "
                        >
                          Ghi chú
                        </th>
                        <th
                          style="
                            text-align: center;
                            font-size: small;
                            font-weight: bold;
                          "
                        >
                          Số giờ công
                        </th>
                        <th
                          style="
                            text-align: center;
                            font-size: small;
                            font-weight: bold;
                          "
                        >
                          Đơn giá
                        </th>
                        <th
                          style="
                            text-align: center;
                            font-size: small;
                            font-weight: bold;
                          "
                        >
                          Ngày thực hiện
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(item, index) in details.luongcongnhat"
                        :key="index"
                      >
                        <td style="text-align: center; font-size: small">
                          {{ index + 1 }}
                        </td>
                        <td style="font-size: small">
                          {{ item.nguoithuchien }}
                        </td>
                        <td style="text-align: center; font-size: small">
                          {{ item.tencongnhat }}
                        </td>
                        <td style="text-align: center; font-size: small">
                          {{ item.ghichu }}
                        </td>
                        <td style="text-align: center; font-size: small">
                          {{ item.sogiocong }}
                        </td>
                        <td style="text-align: center; font-size: small">
                          {{ item.dongia }}
                        </td>
                        <td style="text-align: center; font-size: small">
                          {{ item.ngaythuchien | formatDate }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <hr />
            <div class="columns">
              <div
                class="column is-4"
                style="font-size: small; font-weight: 700"
              >
                <span style="color: red"
                  >I. Thông tin tổng thể về kế hoạch</span
                >
                <li>
                  Có
                  <span style="font-weight: bold; color: #00947e">{{
                    report.lokehoachCount
                  }}</span>
                  lô nhà máy được tạo
                </li>
                <li>
                  Có
                  <span style="font-weight: bold; color: #00947e">{{
                    report.lokehoachphanxuongCount
                  }}</span>
                  lô kế hoạch phân xưởng được tạo
                </li>
                <li
                  v-if="
                    report.distinctMapxLokehoachphanxuong &&
                    report.distinctMapxLokehoachphanxuong.length > 0
                  "
                  @click="toggleShowLokehoachphanxuong"
                  title="Bấm vào để xem các phân xưởng"
                >
                  Có
                  <span style="font-weight: bold; color: #00947e">{{
                    report.distinctMapxLokehoachphanxuong.length
                  }}</span>
                  phân xưởng tham gia sản xuất, gia công
                  <ul v-if="showhideKhpx">
                    <li
                      v-for="(
                        item, index
                      ) in report.distinctMapxLokehoachphanxuong"
                      :key="index"
                    >
                      {{ index + 1 }}: {{ item.mapx }}
                    </li>
                  </ul>
                </li>
                <li>
                  Có
                  <span style="font-weight: bold; color: #00947e"
                    >{{ report.losanxuatCount }} </span
                  >lô sản xuất được tạo
                </li>
                <li
                  v-if="
                    report.distinctMapxLosanxuat &&
                    report.distinctMapxLosanxuat.length > 0
                  "
                  @click="toggleShowLosanxuat"
                  title="Bấm vào để xem các phân xưởng"
                >
                  Có
                  <span style="font-weight: bold; color: #00947e"
                    >{{ report.distinctMapxLosanxuat.length }} </span
                  >phân xưởng tham gia trong các lô sản xuất trên
                  <ul v-if="showhideLsx">
                    <li
                      v-for="(item, index) in report.distinctMapxLosanxuat"
                      :key="index"
                    >
                      {{ index + 1 }}: {{ item.mapx }}
                    </li>
                  </ul>
                </li>
              </div>
              <div class="column" style="font-size: small; font-weight: 700">
                <span style="color: red"
                  >II. Thông tin chi tiết về các lô sản xuất</span
                >
                <li>
                  Ngày bắt đầu của lô sản xuất đầu tiên:
                  <span style="font-weight: bold; color: #00947e">{{
                    report.minNgaybd | formatDate
                  }}</span>
                </li>
                <li>
                  Ngày hoàn thành thực tế (cuối cùng) đến thời điểm hiện tại:
                  <span style="font-weight: bold; color: #00947e">{{
                    report.maxNgayhoanthanhtt | formatDate
                  }}</span>
                </li>
                <li>
                  Tổng số lô sản xuất đã hoàn thành (status=3):
                  <span style="font-weight: bold; color: #00947e">{{
                    report.completedLosanxuatCount
                  }}</span>
                </li>
                <li
                  v-if="
                    report.completedLosanxuatDetails &&
                    report.completedLosanxuatDetails.length > 0
                  "
                  @click="togglePxdalamcaclosxhoanthanh"
                  title="Bấm vào để xem các phân xưởng"
                >
                  Có
                  <span style="font-weight: bold; color: #00947e"
                    >{{ report.completedLosanxuatDetails.length }} </span
                  >phân xưởng tham gia trong các lô sản xuất trên
                  <ul v-if="showhideLsxHoanthanhTaicacpx">
                    <li
                      v-for="(item, index) in report.completedLosanxuatDetails"
                      :key="index"
                    >
                      {{ item.mapx }}: {{ item.luot }}
                    </li>
                  </ul>
                </li>
                <li>
                  Tổng số lô sản xuất đang sản xuất (status=2):
                  <span style="font-weight: bold; color: #00947e">{{
                    report.inProductionLosanxuatCount
                  }}</span>
                </li>
                <li>
                  Tổng số lô sản xuất đang đăng ký(status=1):
                  <span style="font-weight: bold; color: #00947e">{{
                    report.registeredLosanxuatCount
                  }}</span>
                </li>
                <li>
                  Tổng số lô sản xuất đang ở trạng thái 0(status#3,2,1):
                  <span style="font-weight: bold; color: #00947e">{{
                    report.otherStatusLosanxuatCount
                  }}</span>
                </li>
                <li>
                  Tổng số lô sản xuất đã được tính lương:
                  <span style="font-weight: bold; color: #00947e">{{
                    report.calculatedSalaryLosanxuatCount
                  }}</span>
                </li>
                <li>
                  Tổng số lô sản xuất đã hoàn thành và đã được tính lương:
                  <span style="font-weight: bold; color: #00947e">{{
                    report.completedCalculatedSalaryLosanxuatCount
                  }}</span>
                </li>
                <li>
                  Tổng số lô sản xuất đã hoàn thành nhưng chưa được tính lương:
                  <span style="font-weight: bold; color: #00947e">{{
                    report.completedNotCalculatedSalaryLosanxuatCount
                  }}</span>
                </li>
                <li>
                  Tổng số lô sản xuất chưa hoàn thành nhưng được tính lương:
                  <span style="font-weight: bold; color: #00947e">{{
                    report.notCompletedCalculatedSalaryLosanxuatCount
                  }}</span>
                </li>
                <li>
                  Tổng số lô chưa được tính lương:
                  <span style="font-weight: bold; color: #00947e">{{
                    report.notCalculatedSalaryLosanxuatDetails
                  }}</span>
                </li>
              </div>
              <div class="column" style="font-size: small; font-weight: 700">
                <span style="color: red">III. Thông tin về chi phí</span>
                <li>
                  Tổng chi phí đã bỏ ra cho kế hoạch này là:
                  <span style="font-weight: bold; color: #00947e"
                    >{{
                      (reportChiphi.tongluongcongdoan +
                        reportChiphi.tongcongnhat)
                        | formatNumber
                    }}
                  </span>
                </li>
                <li>
                  Tổng số công đoạn Đạt:
                  <span style="font-weight: bold; color: #00947e">{{
                    reportChiphi.tongDat | formatNumber
                  }}</span>
                </li>
                <li>
                  Tổng số công đoạn Hỏng:
                  <span style="font-weight: bold; color: #00947e">{{
                    reportChiphi.tongHong | formatNumber
                  }}</span>
                </li>
                <li>
                  Tổng số công đoạn đã thực hiện:
                  <span style="font-weight: bold; color: #00947e">{{
                    reportChiphi.luongcongnhanCount
                  }}</span>
                </li>
                <li>
                  Tổng tiền lương công đoạn:
                  <span style="font-weight: bold; color: #00947e">{{
                    reportChiphi.tongluongcongdoan | formatNumber
                  }}</span>
                </li>
                <li>
                  Tổng chi phí Đạt:
                  <span style="font-weight: bold; color: #00947e">{{
                    reportChiphi.tongluongsodat | formatNumber
                  }}</span>
                </li>
                <li>
                  Tổng chi phí Hỏng:
                  <span style="font-weight: bold; color: #00947e">{{
                    reportChiphi.tongluongsohong | formatNumber
                  }}</span>
                </li>
                <li>
                  Tổng số công nhật đã làm:
                  <span style="font-weight: bold; color: #00947e">{{
                    reportChiphi.congnhatCount
                  }}</span>
                </li>
                <li>
                  Tổng tiền lương công nhật:
                  <span style="font-weight: bold; color: #00947e">{{
                    reportChiphi.tongcongnhat | formatNumber
                  }}</span>
                </li>
              </div>
            </div>
            <hr />
            <div class="columns">
              <div class="column is-3">
                <div class="table_wrapper">
                  <table class="table is-bordered is-narrow is-hoverable">
                    <thead>
                      <tr style="background-color: #fff5ee">
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
                          "
                        >
                          Phân xưởng
                        </th>
                        <th
                          style="
                            text-align: center;
                            font-size: small;
                            font-weight: bold;
                          "
                        >
                          Tổng tiền công đoạn
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(
                          item, index
                        ) in dataBieudoChiphiPx.tongluongcongdoan"
                        :key="index"
                      >
                        <td style="text-align: center; font-size: small">
                          {{ index + 1 }}
                        </td>
                        <td style="font-size: small">
                          {{ item.mapx }}
                        </td>
                        <td
                          style="
                            text-align: right;
                            font-size: small;
                            color: red;
                          "
                        >
                          {{ item.tongluongcongdoan | formatNumber }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="column is-3">
                <div class="table_wrapper">
                  <table class="table is-bordered is-narrow is-hoverable">
                    <thead>
                      <tr style="background-color: #fff5ee">
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
                          "
                        >
                          Phân xưởng
                        </th>
                        <th
                          style="
                            text-align: center;
                            font-size: small;
                            font-weight: bold;
                          "
                        >
                          Tổng tiền đạt
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(
                          item, index
                        ) in dataBieudoChiphiPx.tongluongsodat"
                        :key="index"
                      >
                        <td style="text-align: center; font-size: small">
                          {{ index + 1 }}
                        </td>
                        <td style="font-size: small">
                          {{ item.mapx }}
                        </td>
                        <td
                          style="
                            text-align: right;
                            font-size: small;
                            color: red;
                          "
                        >
                          {{ item.tongluongsodat | formatNumber }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="column is-3">
                <div class="table_wrapper">
                  <table class="table is-bordered is-narrow is-hoverable">
                    <thead>
                      <tr style="background-color: #fff5ee">
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
                          "
                        >
                          Phân xưởng
                        </th>
                        <th
                          style="
                            text-align: center;
                            font-size: small;
                            font-weight: bold;
                          "
                        >
                          Tổng tiền hỏng
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(
                          item, index
                        ) in dataBieudoChiphiPx.tongluongsohong"
                        :key="index"
                      >
                        <td style="text-align: center; font-size: small">
                          {{ index + 1 }}
                        </td>
                        <td style="font-size: small">
                          {{ item.mapx }}
                        </td>
                        <td
                          style="
                            text-align: right;
                            font-size: small;
                            color: red;
                          "
                        >
                          {{ item.tongluongsohong | formatNumber }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="column is-3">
                <div class="table_wrapper">
                  <table class="table is-bordered is-narrow is-hoverable">
                    <thead>
                      <tr style="background-color: #fff5ee">
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
                          "
                        >
                          Phân xưởng
                        </th>
                        <th
                          style="
                            text-align: center;
                            font-size: small;
                            font-weight: bold;
                          "
                        >
                          Tổng số đạt
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(item, index) in dataBieudoChiphiPx.tongsodat"
                        :key="index"
                      >
                        <td style="text-align: center; font-size: small">
                          {{ index + 1 }}
                        </td>
                        <td style="font-size: small">
                          {{ item.mapx }}
                        </td>
                        <td
                          style="
                            text-align: right;
                            font-size: small;
                            color: red;
                          "
                        >
                          {{ item.tongsodat | formatNumber }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div class="columns">
              <div class="column is-3">
                <div class="table_wrapper">
                  <table class="table is-bordered is-narrow is-hoverable">
                    <thead>
                      <tr style="background-color: #fff5ee">
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
                          "
                        >
                          Phân xưởng
                        </th>
                        <th
                          style="
                            text-align: center;
                            font-size: small;
                            font-weight: bold;
                          "
                        >
                          Tổng số hỏng
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(item, index) in dataBieudoChiphiPx.tongsohong"
                        :key="index"
                      >
                        <td style="text-align: center; font-size: small">
                          {{ index + 1 }}
                        </td>
                        <td style="font-size: small">
                          {{ item.mapx }}
                        </td>
                        <td
                          style="
                            text-align: right;
                            font-size: small;
                            color: red;
                          "
                        >
                          {{ item.tongsohong | formatNumber }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="column is-3">
                <div class="table_wrapper">
                  <table class="table is-bordered is-narrow is-hoverable">
                    <thead>
                      <tr style="background-color: #fff5ee">
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
                          "
                        >
                          Phân xưởng
                        </th>
                        <th
                          style="
                            text-align: center;
                            font-size: small;
                            font-weight: bold;
                          "
                        >
                          Số công nhật
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(
                          item, index
                        ) in dataBieudoChiphiPx.congnhatCount"
                        :key="index"
                      >
                        <td style="text-align: center; font-size: small">
                          {{ index + 1 }}
                        </td>
                        <td style="font-size: small">
                          {{ item.mapx }}
                        </td>
                        <td
                          style="
                            text-align: right;
                            font-size: small;
                            color: red;
                          "
                        >
                          {{ item.tongcongnhat | formatNumber }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="column is-3">
                <div class="table_wrapper">
                  <table class="table is-bordered is-narrow is-hoverable">
                    <thead>
                      <tr style="background-color: #fff5ee">
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
                          "
                        >
                          Phân xưởng
                        </th>
                        <th
                          style="
                            text-align: center;
                            font-size: small;
                            font-weight: bold;
                          "
                        >
                          Tổng tiền công nhật
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(
                          item, index
                        ) in dataBieudoChiphiPx.tongtiencongnhat"
                        :key="index"
                      >
                        <td style="text-align: center; font-size: small">
                          {{ index + 1 }}
                        </td>
                        <td style="font-size: small">
                          {{ item.mapx }}
                        </td>
                        <td
                          style="
                            text-align: right;
                            font-size: small;
                            color: red;
                          "
                        >
                          {{ item.tongtiencongnhat | formatNumber }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>

    <!-- modal xử lý lô sản xuất -->
    <div class="">
      <!-- Toggle class  -->
      <div :class="{ 'is-active': isActive_xlsx }" class="modal">
        <div class="modal-background"></div>
        <div class="modal-content modal-card-lsx">
          <header
            style="
              background-color: #3e8ed0;
              border-top-left-radius: 8px;
              border-top-right-radius: 8px;
            "
          >
            <div class="columns">
              <div class="column">
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
                  Xử lý Lô sản xuất
                </p>
              </div>
              <div
                class="column"
                style="text-align: right; margin-top: 12px; margin-right: 20px"
              >
                <button
                  @click="isActive_xlsx = false"
                  class="button is-small is-danger"
                >
                  Đóng
                </button>
              </div>
            </div>
          </header>
          <section class="modal-card-body">
            <div>
              <span style="color: red; font-weight: 700; font-size: small"
                >I. Thông tin chi tiết về công đoạn và công nhật đã thực hiện
              </span>
              <div
                v-if="xulylsx_luongcongdoan.length > 0"
                class="table_wrapper"
                style="margin-top: 10px"
              >
                <table class="table is-bordered is-narrow is-hoverable">
                  <thead>
                    <tr style="background-color: #fff5ee">
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
                        "
                      >
                        Tên công nhân
                      </th>
                      <th
                        style="
                          text-align: center;
                          font-size: small;
                          font-weight: bold;
                        "
                      >
                        Nguyên công
                      </th>
                      <th
                        style="
                          text-align: center;
                          font-size: small;
                          font-weight: bold;
                        "
                      >
                        Đơn giá
                      </th>
                      <th
                        style="
                          text-align: center;
                          font-size: small;
                          font-weight: bold;
                        "
                      >
                        Số đạt
                      </th>
                      <th
                        style="
                          text-align: center;
                          font-size: small;
                          font-weight: bold;
                        "
                      >
                        Số hỏng
                      </th>
                      <th
                        style="
                          text-align: center;
                          font-size: small;
                          font-weight: bold;
                        "
                      >
                        Ngày thực hiện
                      </th>
                      <th
                        style="
                          text-align: center;
                          font-size: small;
                          font-weight: bold;
                        "
                      >
                        Trạng thái
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(item, index) in xulylsx_luongcongdoan"
                      :key="index"
                    >
                      <td style="text-align: center; font-size: small">
                        {{ index + 1 }}
                      </td>
                      <td style="font-size: small">
                        {{ item.tencn }}
                      </td>
                      <td style="text-align: center; font-size: small">
                        {{ item.nguyencong }}
                      </td>
                      <td style="text-align: center; font-size: small">
                        {{ item.dongia }}
                      </td>
                      <td style="text-align: center; font-size: small">
                        {{ item.sodat }}
                      </td>
                      <td style="text-align: center; font-size: small">
                        {{ item.sohong }}
                      </td>
                      <td style="text-align: center; font-size: small">
                        {{ item.ngaythuchien | formatDate }}
                      </td>
                      <td
                        style="
                          font-size: small;
                          text-align: center;
                          vertical-align: middle;
                        "
                      >
                        <span v-if="item.status == false">
                          <i style="color: #ffd863" class="fa fa-circle"></i>
                        </span>
                        <span v-else
                          ><i style="color: #00947e" class="fa fa-circle"></i>
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div
                v-if="xulylsx_luongcongnhat.length > 0"
                class="table_wrapper"
                style="margin-top: 10px"
              >
                <table class="table is-bordered is-narrow is-hoverable">
                  <thead>
                    <tr style="background-color: #f5fffa">
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
                        "
                      >
                        Tên công nhân
                      </th>
                      <th
                        style="
                          text-align: center;
                          font-size: small;
                          font-weight: bold;
                        "
                      >
                        Tên công
                      </th>
                      <th
                        style="
                          text-align: center;
                          font-size: small;
                          font-weight: bold;
                        "
                      >
                        Ghi chú
                      </th>
                      <th
                        style="
                          text-align: center;
                          font-size: small;
                          font-weight: bold;
                        "
                      >
                        Số giờ công
                      </th>
                      <th
                        style="
                          text-align: center;
                          font-size: small;
                          font-weight: bold;
                        "
                      >
                        Đơn giá
                      </th>
                      <th
                        style="
                          text-align: center;
                          font-size: small;
                          font-weight: bold;
                        "
                      >
                        Ngày thực hiện
                      </th>
                      <th
                        style="
                          text-align: center;
                          font-size: small;
                          font-weight: bold;
                        "
                      >
                        Trạng thái
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(item, index) in xulylsx_luongcongnhat"
                      :key="index"
                    >
                      <td style="text-align: center; font-size: small">
                        {{ index + 1 }}
                      </td>
                      <td style="font-size: small">
                        {{ item.nguoithuchien }}
                      </td>
                      <td style="text-align: center; font-size: small">
                        {{ item.tencongnhat }}
                      </td>
                      <td style="text-align: center; font-size: small">
                        {{ item.ghichu }}
                      </td>
                      <td style="text-align: center; font-size: small">
                        {{ item.sogiocong }}
                      </td>
                      <td style="text-align: center; font-size: small">
                        {{ item.dongia }}
                      </td>
                      <td style="text-align: center; font-size: small">
                        {{ item.ngaythuchien | formatDate }}
                      </td>
                      <td
                        style="
                          font-size: small;
                          text-align: center;
                          vertical-align: middle;
                        "
                      >
                        <span v-if="item.status == false">
                          <i style="color: #ffd863" class="fa fa-circle"></i>
                        </span>
                        <span v-else
                          ><i style="color: #00947e" class="fa fa-circle"></i>
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div style="margin-top: 10px">
              <div class="columns">
                <div class="column is-4">
                  <span style="color: red; font-weight: 700; font-size: small"
                    >II. Chi tiết chi phí
                  </span>
                  <div
                    style="font-weight: 600; font-size: small; margin-top: 10px"
                  >
                    <li>
                      Chi phí đạt:
                      <span style="color: #00947e">{{
                        chiphitrenmotloSX.chiPhiDat | formatNumber
                      }}</span>
                    </li>
                    <li>
                      Chi phí hỏng:
                      <span style="color: #00947e">{{
                        chiphitrenmotloSX.chiPhiHong | formatNumber
                      }}</span>
                    </li>
                    <li>
                      Tổng Chi phí đạt và hỏng:
                      <span style="color: #00947e">{{
                        chiphitrenmotloSX.tongChiPhiCongdoan | formatNumber
                      }}</span>
                    </li>
                    <li>
                      Chi phí công nhật:
                      <span style="color: #00947e">{{
                        chiphitrenmotloSX.tongChiPhiCongnhat | formatNumber
                      }}</span>
                    </li>
                    <li>
                      Tổng chi phí trên lô sản xuất:
                      <span style="color: #00947e">{{
                        (chiphitrenmotloSX.tongChiPhiCongdoan +
                          chiphitrenmotloSX.tongChiPhiCongnhat)
                          | formatNumber
                      }}</span>
                    </li>
                  </div>
                </div>
                <div class="column">
                  <span style="color: red; font-weight: 700; font-size: small"
                    >III. Thông tin tổng quan
                  </span>
                  <div
                    style="font-weight: 600; font-size: small; margin-top: 10px"
                  >
                    <template v-if="chitietLosanxuat.status_tinhluong == 1">
                      <li>Lô đã được tính lương</li>
                    </template>
                    <template v-else>
                      <li>Lô chưa được tính lương</li>
                    </template>
                    <button
                      @click="deleteLosanxuat"
                      class="button is-small is-danger"
                    >
                      Xoá lô sản xuất
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>

    <!-- modal view lô kh năm -->
    <div class="">
      <!-- Toggle class  -->
      <div :class="{ 'is-active': isActive_viewkhnam }" class="modal">
        <div class="modal-background"></div>
        <div class="modal-content modal-card-viewkhnam">
          <header
            style="
              background-color: #3e8ed0;
              border-top-left-radius: 8px;
              border-top-right-radius: 8px;
            "
          >
            <div class="columns">
              <div class="column">
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
                  View Kế hoạch năm
                </p>
              </div>
              <div
                class="column"
                style="text-align: right; margin-top: 12px; margin-right: 20px"
              >
                <button
                  @click="isActive_viewkhnam = false"
                  class="button is-small is-danger"
                >
                  Đóng
                </button>
              </div>
            </div>
          </header>
          <section class="modal-card-body">
            <div>
              <div>
                <span style="color: red; font-weight: 700; font-size: small"
                  >I. View chi phí tiền công đoạn từng kế hoạch năm đạt ra
                </span>
              </div>
              <div class="columns">
                <div class="column">
                  <div
                    class="table_wrapper table-height"
                    style="margin-top: 10px"
                  >
                    <table class="table is-bordered is-narrow is-hoverable">
                      <thead>
                        <tr style="background-color: #fff5ee">
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
                            "
                          >
                            Kế hoạch năm
                          </th>
                          <th
                            style="
                              text-align: center;
                              font-size: small;
                              font-weight: bold;
                            "
                          >
                            Tổng lương công đoạn
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="(
                            item, index
                          ) in dataBieudoChiphiPx.luongcongdoantungkehoachnam"
                          :key="index"
                        >
                          <td style="text-align: center; font-size: small">
                            {{ index + 1 }}
                          </td>
                          <td style="font-size: small">
                            {{ item.kehoachnam }}
                          </td>
                          <td style="text-align: right; font-size: small">
                            {{ item.tongluongcongdoan | formatNumber }}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div class="column is-9">
                  <canvas id="myChartCd" style="width: 100%"></canvas>
                </div>
              </div>

              <div style="margin-top: 10px">
                <span style="color: red; font-weight: 700; font-size: small"
                  >I. View chi phí tiền công nhật từng kế hoạch năm đạt ra
                </span>
              </div>
              <div class="columns">
                <div class="column">
                  <div
                    class="table_wrapper table-height"
                    style="margin-top: 10px"
                  >
                    <table class="table is-bordered is-narrow is-hoverable">
                      <thead>
                        <tr style="background-color: #f5fffa">
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
                            "
                          >
                            Kế hoạch năm
                          </th>
                          <th
                            style="
                              text-align: center;
                              font-size: small;
                              font-weight: bold;
                            "
                          >
                            Tổng lương công nhật
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="(
                            item, index
                          ) in dataBieudoChiphiPx.luongcongnhattungkehoachnam"
                          :key="index"
                        >
                          <td style="text-align: center; font-size: small">
                            {{ index + 1 }}
                          </td>
                          <td style="font-size: small">
                            {{ item.kehoachnam }}
                          </td>
                          <td style="text-align: right; font-size: small">
                            {{ item.tongluongcongnhat | formatNumber }}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div class="column is-9">
                  <canvas id="myChartCn" style="width: 100%"></canvas>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { all, log } from "async";
import Swal from "sweetalert2";
export default {
  data() {
    return {
      selected: [],
      // search
      namkh: "",
      nhomthanhpham: "",
      mathanhpham: "",
      makh: "",

      // filter
      // bảng lô nhà máy
      filterMalonhamayLv2: "",
      // bảng lô kế hoạch phân xưởng
      filterMapx: "", // Thêm biến này để giữ giá trị input
      filterMalonhamay: "",

      // data
      dataKhnhanmay: [],
      datalonhamay: [],
      lokehoachnhamay: [],
      lokehoachphanxuong: [],
      losanxuat: [],
      chitietLosanxuat: {},
      xulylsx_luongcongdoan: [],
      xulylsx_luongcongnhat: [],
      chiphitrenmotloSX: {},
      dataBieudoChiphiPx: {},

      // modal
      isActive: false,
      isActive_xlsx: false,
      isActive_viewkhnam: false,

      // loading
      isLoading: false,

      // phân trang cho bảng thứ nhất
      sortDirection: 1,
      sortKey: "_id",
      itemsPerPage: 5,
      pageSize: 10,
      currentPage: 1,

      // phân trang cho bảng thứ hai
      sortDirection2: 1,
      sortKey2: "_id",
      itemsPerPage2: 10,
      pageSize2: 10,
      currentPage2: 1,

      // phân trang cho bảng thứ ba
      sortDirection3: 1,
      sortKey3: "_id",
      itemsPerPage3: 5,
      pageSize3: 10,
      currentPage3: 1,

      // hightligh
      highlightedRow: null,
      highlightedRow_lonhamay: null,
      highlightedRow_lokhpx: null,
      highlightedRow_losx: null,
      highlightedRow_details_lnm: null,
      highlightedRow_details_lkhpx: null,
      highlightedRow_details_lsx: null,

      // details
      details: {
        lonhamayData: [],
        lokehoachphanxuongData: [],
        losanxuatData: [],
        luongcongdoan: [],
        luongcongnhat: [],
      },

      // report
      report: {},
      reportChiphi: {},
      showhideKhpx: false,
      showhideLsx: false,
      showhideLsxHoanthanhTaicacpx: false,

      // biểu đồ
      dataChartCongdoan: [],
      dataChartCongnhat: [],
      xValues: [],
      yValues: [],
      barColors: [],
      xValuesCn: [],
      yValuesCn: [],
      barColorsCn: [],
    };
  },

  computed: {
    selectAll: {
      get: function () {
        return this.losanxuat
          ? this.selected.length == this.losanxuat.length
          : false;
      },
      set: function (value) {
        var selected = [];

        if (value) {
          this.losanxuat.forEach(function (nv) {
            selected.push(nv);
          });
        }

        this.selected = selected;
      },
    },

    // phân trang và sắp xếp cho bảng 1
    sortedTable() {
      return this.dataKhnhanmay.sort((a, b) => {
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

    // phân trang và sắp xếp cho bảng 2
    filteredTable2() {
      let filteredData = this.lokehoachphanxuong;

      if (this.filterMapx.trim() !== "") {
        filteredData = filteredData.filter((item) =>
          item.mapx.includes(this.filterMapx.trim())
        );
      }

      if (this.filterMalonhamay.trim() !== "") {
        filteredData = filteredData.filter((item) =>
          item.malonhamay.includes(this.filterMalonhamay.trim())
        );
      }

      return filteredData;
    },

    sortedTable2() {
      return this.filteredTable2.sort((a, b) => {
        if (a[this.sortKey2] < b[this.sortKey2])
          return -1 * this.sortDirection2;
        if (a[this.sortKey2] > b[this.sortKey2]) return 1 * this.sortDirection2;
        return 0;
      });
    },
    pageCount2() {
      return Math.ceil(this.sortedTable2.length / this.itemsPerPage2);
    },
    startIndex2() {
      return (this.currentPage2 - 1) * this.itemsPerPage2;
    },
    endIndex2() {
      return this.startIndex2 + this.itemsPerPage2;
    },
    paginatedTable2() {
      return this.sortedTable2.slice(this.startIndex2, this.endIndex2);
    },
    pages2() {
      const startPage = Math.max(1, this.currentPage2 - 2);
      const endPage = Math.min(this.pageCount2, this.currentPage2 + 2);

      let pages = [];
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (startPage > 1) {
        pages.unshift("...");
        pages.unshift(1);
      }

      if (endPage < this.pageCount2) {
        pages.push("...");
        pages.push(this.pageCount2);
      }

      return pages;
    },

    // phân trang và sắp xếp cho bảng 3 bảng lô kế hoạch nhà máy
    filteredTable3() {
      if (this.filterMalonhamayLv2.trim() === "") {
        return this.lokehoachnhamay;
      } else {
        return this.lokehoachnhamay.filter((item) =>
          item.malonhamay.includes(this.filterMalonhamayLv2.trim())
        );
      }
    },

    sortedTable3() {
      return this.filteredTable3.sort((a, b) => {
        if (a[this.sortKey3] < b[this.sortKey3])
          return -1 * this.sortDirection3;
        if (a[this.sortKey3] > b[this.sortKey3]) return 1 * this.sortDirection3;
        return 0;
      });
    },
    pageCount3() {
      return Math.ceil(this.sortedTable3.length / this.itemsPerPage3);
    },
    startIndex3() {
      return (this.currentPage3 - 1) * this.itemsPerPage3;
    },
    endIndex3() {
      return this.startIndex3 + this.itemsPerPage3;
    },
    paginatedTable3() {
      return this.sortedTable3.slice(this.startIndex3, this.endIndex3);
    },
    pages3() {
      const startPage = Math.max(1, this.currentPage3 - 2);
      const endPage = Math.min(this.pageCount3, this.currentPage3 + 2);

      let pages = [];
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (startPage > 1) {
        pages.unshift("...");
        pages.unshift(1);
      }

      if (endPage < this.pageCount3) {
        pages.push("...");
        pages.push(this.pageCount3);
      }

      return pages;
    },

    // tổng đạt hỏng trong lsx
    sumTongdat() {
      return this.losanxuat.reduce((total, lsx) => {
        const value = parseInt(lsx.tongdat, 10);
        return total + (isNaN(value) ? 0 : value);
      }, 0);
    },
    sumTonghong() {
      return this.losanxuat.reduce((total, lsx) => {
        const value = parseInt(lsx.tonghong, 10);
        return total + (isNaN(value) ? 0 : value);
      }, 0);
    },

    // tổng đạt hỏng trong lô khpx
    sumTongdatLoKHPX() {
      return this.lokehoachphanxuong.reduce((total, lkhpx) => {
        const value = parseInt(lkhpx.tongdat, 10);
        return total + (isNaN(value) ? 0 : value);
      }, 0);
    },
    sumTonghongLoKHPX() {
      return this.lokehoachphanxuong.reduce((total, lkhpx) => {
        const value = parseInt(lkhpx.tonghong, 10);
        return total + (isNaN(value) ? 0 : value);
      }, 0);
    },

    // tổng số lượng lô sx và lô khpx
    sumTongsoluonglosanxuat() {
      return this.losanxuat.reduce((total, lsx) => {
        const value = parseInt(lsx.soluonglsx, 10);
        return total + (isNaN(value) ? 0 : value);
      }, 0);
    },
    sumTongsoluongkhpx() {
      return this.losanxuat.reduce((total, lsx) => {
        const value = parseInt(lsx.soluongkhsx, 10);
        return total + (isNaN(value) ? 0 : value);
      }, 0);
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
    // sắp xếp và phân trang
    sortTable(table, key) {
      if (table === "table1") {
        if (this.sortKey === key) {
          this.sortDirection *= -1;
        } else {
          this.sortKey = key;
          this.sortDirection = 1;
        }
      } else if (table === "table2") {
        if (this.sortKey2 === key) {
          this.sortDirection2 *= -1;
        } else {
          this.sortKey2 = key;
          this.sortDirection2 = 1;
        }
      } else if (table === "table3") {
        if (this.sortKey3 === key) {
          this.sortDirection3 *= -1;
        } else {
          this.sortKey3 = key;
          this.sortDirection3 = 1;
        }
      }
      // Tương tự cho các bảng khác
    },

    changePage(table, pageNumber) {
      if (table === "table1") {
        if (pageNumber >= 1 && pageNumber <= this.pageCount) {
          this.currentPage = pageNumber;
        }
      } else if (table === "table2") {
        if (pageNumber >= 1 && pageNumber <= this.pageCount2) {
          this.currentPage2 = pageNumber;
        }
      } else if (table === "table3") {
        if (pageNumber >= 1 && pageNumber <= this.pageCount3) {
          this.currentPage3 = pageNumber;
        }
      }
    },

    // hàm highlight để đánh dấu row nào được chọn
    highlightRow(row) {
      this.highlightedRow = row;
    },

    highlightRow_lonhamay(row) {
      this.highlightedRow_lonhamay = row;
    },

    highlightRow_khpx(row) {
      this.highlightedRow_lokhpx = row;
    },

    highlightRow_losanxuat(row) {
      this.highlightedRow_losx = row;
    },

    highlightRow_details_lonhamay(row) {
      this.highlightedRow_details_lnm = row;
    },

    highlightRow_details_lokehoachpx(row) {
      this.highlightedRow_details_lkhpx = row;
    },

    highlightRow_details_losanxuat(row) {
      this.highlightedRow_details_lsx = row;
    },

    // Phần Lọc dữ liệu
    // 1. Bấm lọc theo năm
    async filterNamkh() {
      const res = await this.$axios.get(
        `/api/lokehoach/getdatakehoachnamlonhamay?tgbatdau=${this.namkh}`
      );
      // console.log(res.data);
      this.dataKhnhanmay = res.data;
    },

    // 2. Bấm lọc theo nhóm thành phẩm
    async filterNhomthanhpham() {
      const res = await this.$axios.get(
        `/api/lokehoach/getdatakehoachnamlonhamaywithnhomthanhpham?nhomthanhpham=${this.nhomthanhpham}`
      );
      // console.log(res.data);
      this.dataKhnhanmay = res.data;
    },

    // 3. Bấm lọc theo mã thành phẩm
    async filterMathanhpham() {
      const res = await this.$axios.get(
        `/api/lokehoach/getdatakehoachnamlonhamaywithmathanhpham?mathanhpham=${this.mathanhpham}`
      );
      // console.log(res.data);
      this.dataKhnhanmay = res.data;
    },

    async filterMakehoach() {
      const res = await this.$axios.get(
        `/api/lokehoach/getdatakehoachnamlonhamaywithmakehoach?makh=${this.makh}`
      );
      // console.log(res.data);
      this.dataKhnhanmay = res.data;
    },

    // 4. Kết hợp lọc
    async filterCombined() {
      this.lokehoachnhamay = [];
      this.lokehoachphanxuong = [];
      this.losanxuat = [];
      let baseUrl = "/api/lokehoach/getdatakehoachnamlonhamaycombined";
      let params = [];

      if (this.namkh) {
        params.push(`tgbatdau=${this.namkh}`);
      }
      if (this.nhomthanhpham) {
        params.push(`nhomthanhpham=${this.nhomthanhpham}`);
      }
      if (this.mathanhpham) {
        params.push(`mathanhpham=${this.mathanhpham}`);
      }
      if (this.makh) {
        params.push(`makh=${this.makh}`);
      }

      let queryString = params.length ? `?${params.join("&")}` : "";
      const url = baseUrl + queryString;

      try {
        const res = await this.$axios.get(url);
        this.dataKhnhanmay = res.data;
        // console.log(this.dataKhnhanmay);
      } catch (error) {
        console.error("Error fetching combined filter data:", error);
      }
    },

    // 5. hiển thị tất cả lô kh phân xưởng
    async showLokenhamay(idkhnam, mathanhpham, nhomthanhpham) {
      // console.log(idkhnam);
      this.lokehoachphanxuong = [];
      this.losanxuat = [];
      const res = await this.$axios.get(
        `/api/lokehoach/getlonhamayinkhnam?_id_khnam=${idkhnam}&mathanhpham=${mathanhpham}&nhomthanhpham=${nhomthanhpham}`
      );
      // console.log(res.data);
      this.lokehoachnhamay = res.data;
      // console.log(this.lokehoachnhamay);
    },

    async showLokehoachphanxuong(_id_lonhamay, mathanhpham, nhomthanhpham) {
      this.losanxuat = [];
      const res = await this.$axios.get(
        `/api/lokehoach/getlokehoachphanxuongtheonamkh?_id_lonhamay=${_id_lonhamay}&mathanhpham=${mathanhpham}&nhomthanhpham=${nhomthanhpham}`
      );
      // console.log(res);
      this.lokehoachphanxuong = res.data;
      // console.log(this.lokehoachphanxuong);
    },

    async showLokehoachphanxuongAfterUpdatefromLSX(
      _id_lonhamay,
      mathanhpham,
      nhomthanhpham
    ) {
      const res = await this.$axios.get(
        `/api/lokehoach/getlokehoachphanxuongtheonamkh?_id_lonhamay=${_id_lonhamay}&mathanhpham=${mathanhpham}&nhomthanhpham=${nhomthanhpham}`
      );
      // console.log(res);
      this.lokehoachphanxuong = res.data;
      // console.log(this.lokehoachphanxuong);
    },

    async showLokenhamayAfterUpdatefromLoKHPX(
      idkhnam,
      mathanhpham,
      nhomthanhpham
    ) {
      // console.log(idkhnam);
      const res = await this.$axios.get(
        `/api/lokehoach/getlonhamayinkhnam?_id_khnam=${idkhnam}&mathanhpham=${mathanhpham}&nhomthanhpham=${nhomthanhpham}`
      );
      // console.log(res.data);
      this.lokehoachnhamay = res.data;
      // console.log(this.lokehoachnhamay);
    },

    // 5. hiển thị tất cả lô sản xuất phân xưởng
    async showLosanxuat(idkhnam, idlonhamay, idlokhpx, mapx) {
      // console.log(idkhnam);
      const res = await this.$axios.get(
        `/api/lokehoach/getlosxfromlkhpx?_id_khnam=${idkhnam}&_id_lonhamay=${idlonhamay}&_id_khpx=${idlokhpx}&mapx=${mapx}`
      );
      // console.log(res.data);
      this.losanxuat = res.data;
      // console.log(this.losanxuat);
    },
    // 6. detail
    async detail(identity) {
      this.dataBieudoChiphiPx = {};
      this.chiphitrenmotloSX = {};
      this.xulylsx_luongcongdoan = [];
      this.xulylsx_luongcongnhat = [];
      this.chitietLosanxuat = {};
      this.report = {};
      this.reportChiphi = {};
      this.reportShow(identity._id);
      this.reportShowChiphi(identity.makh);
      this.details.lonhamayData = [];
      this.details.lokehoachphanxuongData = [];
      this.details.losanxuatData = [];
      this.details.luongcongdoan = [];
      this.details.luongcongnhat = [];
      this.isActive = true;
      // console.log(identity);
      const resLonhamay = await this.$axios.get(
        `/api/lokehoach/getlonhamayinkhnam?_id_khnam=${identity._id}&mathanhpham=${identity.mathanhpham}&nhomthanhpham=${identity.nhomthanhpham}`
      );
      // console.log(resLonhamay.data);
      this.details.lonhamayData = resLonhamay.data;

      const resBieudochiphitungpx = await this.$axios.get(
        `/api/lokehoach/reportChiphiTongtienWithPhanXuong?makh=${identity.makh}`
      );
      // console.log(resBieudochiphitungpx);
      this.dataBieudoChiphiPx = resBieudochiphitungpx.data;
    },

    // 7. details for lô kế hoạch phân xưởng
    async detailsLokhpx(data) {
      this.details.lokehoachphanxuongData = [];
      this.details.losanxuatData = [];
      this.details.luongcongdoan = [];
      this.details.luongcongnhat = [];
      // console.log(data);
      const resLokhpx = await this.$axios.get(
        `/api/lokehoach/getlokehoachphanxuongtheonamkhwithforlonhamay?_id_khnam=${data._id_khnam}&mathanhpham=${data.mathanhpham}&nhomthanhpham=${data.nhomthanhpham}&_id_lonhamay=${data._id}`
      );
      this.details.lokehoachphanxuongData = resLokhpx.data;
    },

    // 8. details for lo sản xuất
    async detailsLosx(data) {
      const resLosx = await this.$axios.get(
        `/api/lokehoach/getlosxfromlkhpx?_id_khnam=${data._id_khnam}&_id_lonhamay=${data._id_lonhamay}&_id_khpx=${data._id}&mapx=${data.mapx}`
      );
      this.details.losanxuatData = resLosx.data;
    },

    // 9. show lương công đoạn công nhật showCongdoan
    async showCongdoan(data) {
      const resLcd = await this.$axios.get(
        `/api/lokehoach/getshowcongdoaninlsx?_id_losx=${data._id}`
      );
      this.details.luongcongdoan = resLcd.data;

      const resLcn = await this.$axios.get(
        `/api/lokehoach/getshowcongnhatinlsx?_id_losx=${data._id}`
      );
      this.details.luongcongnhat = resLcn.data;
    },

    // 10. report
    async reportShow(id) {
      const res = await this.$axios.get(
        `/api/lokehoach/reportChiphi?_id_khnam=${id}`
      );
      // console.log(res.data);
      this.report = res.data;
      // console.log(this.report);
    },

    // 11. report chi phí
    async reportShowChiphi(makh) {
      const res = await this.$axios.get(
        `/api/lokehoach/reportChiphiTongtien?kehoachnam=${makh}`
      );
      // console.log(res.data);
      this.reportChiphi = res.data;
      // console.log(this.reportChiphi);
    },

    // 12. show hide phân xưởng
    toggleShowLokehoachphanxuong() {
      this.showhideKhpx = !this.showhideKhpx;
    },
    toggleShowLosanxuat() {
      this.showhideLsx = !this.showhideLsx;
    },
    togglePxdalamcaclosxhoanthanh() {
      this.showhideLsxHoanthanhTaicacpx = !this.showhideLsxHoanthanhTaicacpx;
    },

    // 13. Các chức năng cập nhật tiến lên
    // 13.1. Cập nhật trạng thái
    async onChange_status(e, data) {
      // console.log(data);
      var status = e.target.value;
      // console.log(id);
      // gọi api update
      const resUpdate = await this.$axios.get(
        `/api/lokehoach/updateStatusLokhpxLastupdate?status=${status}&_id=${data._id}`
      );
      // console.log(resUpdate);
    },
    // 13.2. Cập nhật ngày bắt đầu thực tế
    dateToYYYYMMDD(d) {
      // console.log(d);
      if (!d) return "";

      // Chuyển đổi d thành đối tượng Date nếu nó là chuỗi
      const date = typeof d === "string" ? new Date(d) : d;

      // Kiểm tra nếu date không hợp lệ
      if (isNaN(date.getTime())) {
        throw new Error("Invalid date");
      }

      return new Date(date.getTime() - date.getTimezoneOffset() * 60 * 1000)
        .toISOString()
        .split("T")[0];
    },

    async updateNgaybdtt(value, data) {
      // console.log(value);
      const resUpdate = await this.$axios.get(
        `/api/lokehoach/updateNgaybdttLokhpxLastupdate?ngaybdthucte=${value}&_id=${data._id}`
      );
      // console.log(resUpdate);
      // Cập nhật giá trị ngày trong dữ liệu Vue
      data.ngaybdthucte = new Date(
        Date.UTC(...value.split("-").map((num, i) => (i === 1 ? num - 1 : num)))
      ).toISOString();
    },

    // 13.3. Cập nhật ngày hoàn thành thực tế
    async updateNgayhoanthanhtt(value, data) {
      // console.log(value);
      const resUpdate = await this.$axios.get(
        `/api/lokehoach/updateNgayhoanthanhttLokhpxLastupdate?ngayhoanthanhtt=${value}&_id=${data._id}`
      );
      // console.log(resUpdate);
      // Cập nhật giá trị ngày trong dữ liệu Vue
      data.ngayhoanthanhtt = new Date(
        Date.UTC(...value.split("-").map((num, i) => (i === 1 ? num - 1 : num)))
      ).toISOString();
    },

    // 13.4. Cập nhật tổng đạt tổng hỏng
    async updateTonghong(data) {
      // console.log(data.tonghong, data._id);
      const resUpdate = await this.$axios.get(
        `/api/lokehoach/updateTonghongLokhpxLastupdate?tonghong=${data.tonghong}&_id=${data._id}`
      );
    },
    async updateTongdat(data) {
      const resUpdate = await this.$axios.get(
        `/api/lokehoach/updateTongdatLokhpxLastupdate?tongdat=${data.tongdat}&_id=${data._id}`
      );
    },

    // 14. Xử lý lô sản xuất
    async modelProcessLsx(data) {
      this.chitietLosanxuat = data;
      this.chiphitrenmotloSX = {};
      this.xulylsx_luongcongdoan = [];
      this.xulylsx_luongcongnhat = [];
      const resLcd = await this.$axios.get(
        `/api/lokehoach/showLuongcongdoanoflosx?_id_losx=${data._id}`
      );
      // console.log(resLcd);
      this.xulylsx_luongcongdoan = resLcd.data;
      const resLcn = await this.$axios.get(
        `/api/lokehoach/showLuongcongnhatoflosx?_id_losx=${data._id}`
      );
      this.xulylsx_luongcongnhat = resLcn.data;

      const resCplsx = await this.$axios.get(
        `/api/lokehoach/reportChiphiTrenmotlosx?_id_losx=${data._id}`
      );
      // console.log(resCplsx);
      this.chiphitrenmotloSX = resCplsx.data;
      this.isActive_xlsx = true;
    },

    // 15. view ke hoach nam
    async viewKehoach() {
      const res = await this.$axios.get(
        `/api/lokehoach/reportTrencackehoachnam`
      );

      // console.log(res);
      this.dataBieudoChiphiPx = res.data;
      this.dataChartCongdoan =
        this.dataBieudoChiphiPx.luongcongdoantungkehoachnam;
      this.xValues = this.dataChartCongdoan.map((item) => item.kehoachnam);
      this.yValues = this.dataChartCongdoan.map(
        (item) => item.tongluongcongdoan
      );
      this.dataChartCongnhat =
        this.dataBieudoChiphiPx.luongcongnhattungkehoachnam;
      this.xValuesCn = this.dataChartCongnhat.map((item) => item.kehoachnam);
      this.yValuesCn = this.dataChartCongnhat.map(
        (item) => item.tongluongcongnhat
      );
      // console.log(this.yValues);
      this.barColors = this.dataChartCongdoan.map(() => this.getRandomColor());
      this.barColorsCn = this.dataChartCongnhat.map(() =>
        this.getRandomColor()
      );
      // console.log(this.xValues);
      // console.log(this.yValues);
      this.renderChartCD();
      this.renderChartCN();

      this.isActive_viewkhnam = true;
    },

    // 16. biểu đồ
    getRandomColor() {
      const letters = "0123456789ABCDEF";
      let color = "#";
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    },

    renderChartCD() {
      const ctx = document.getElementById("myChartCd").getContext("2d");
      new Chart(ctx, {
        type: "bar",
        data: {
          labels: this.xValues,
          datasets: [
            {
              backgroundColor: this.barColors,
              data: this.yValues,
            },
          ],
        },
        options: {
          legend: { display: false },
          title: {
            display: true,
            text: "Biểu đồ cột Chi phí kế hoạch năm lương công đoạn",
          },
        },
      });
    },

    renderChartCN() {
      const ctx = document.getElementById("myChartCn").getContext("2d");
      new Chart(ctx, {
        type: "bar",
        data: {
          labels: this.xValuesCn,
          datasets: [
            {
              backgroundColor: this.barColorsCn,
              data: this.yValuesCn,
            },
          ],
        },
        options: {
          legend: { display: false },
          title: {
            display: true,
            text: "Biểu đồ cột Chi phí kế hoạch năm lương công nhật",
          },
        },
      });
    },

    formatDate(date) {
      const d = new Date(date);
      let day = d.getDate();
      let month = d.getMonth() + 1; // Months are zero based
      const year = d.getFullYear();

      if (day < 10) {
        day = "0" + day;
      }
      if (month < 10) {
        month = "0" + month;
      }

      return `${day}/${month}/${year}`;
    },

    // cập nhật tổng hỏng đạt, ngày bd, kt thực tế, trạng thái vào lô KHPX từ bảng lô sản xuất
    async updateSodathongtoLokehoachpx() {
      // console.log(this.lokehoachphanxuong);
      // console.log(this.lokehoachphanxuong[0]._id_lonhamay);
      // console.log(this.lokehoachphanxuong[0].mathanhpham);
      // console.log(this.lokehoachphanxuong[0].nhomthanhpham);

      // console.log(this.selected);
      // Tính tổng cột "tổng hỏng"
      if (this.selected.length > 0) {
        try {
          const difference = this.losanxuat.filter(
            (itemLSX) =>
              !this.selected.some((itemSEL) => itemSEL._id === itemLSX._id)
          );
          // console.log(difference);
          const dulieuKhongduocchon = difference.map((item) => ({
            id: item._id,
            tongdat: item.tongdat,
          }));
          // console.log(ids);

          const idlokehoach = this.selected[0]._id_khpx;
          const totalHong = this.losanxuat.reduce((total, item) => {
            return total + (parseFloat(item.tonghong) || 0); // kiểm tra nếu item.tongHong là undefined hoặc null
          }, 0);

          // Tính tổng cột "tổng đạt"
          const totalDat = this.selected.reduce((total, item) => {
            return total + (parseFloat(item.tongdat) || 0); // kiểm tra nếu item.tongDat là undefined hoặc null
          }, 0);

          // Lấy ra ngaybdthucte nhỏ nhất
          const minNgayBdThucTe = this.selected.reduce((min, item) => {
            const date = new Date(item.ngaybd);
            return date < min ? date : min;
          }, new Date(this.selected[0].ngaybd));

          // Lấy ra ngayhoanthanhtt lớn nhất
          const maxNgayHoanThanhTt = this.selected.reduce((max, item) => {
            const date = new Date(item.ngayhoanthanhtt);
            return date > max ? date : max;
          }, new Date(this.selected[0].ngayhoanthanhtt));

          // Log kết quả
          // console.log(
          //   "Ngày bắt đầu thực tế nhỏ nhất:",
          //   minNgayBdThucTe.toISOString().split("T")[0]
          // );
          // console.log(
          //   "Ngày hoàn thành thực tế lớn nhất:",
          //   maxNgayHoanThanhTt.toISOString().split("T")[0]
          // );
          // console.log("Tổng hỏng:", totalHong);
          // console.log("Tổng đạt:", totalDat);

          const lokehoachpxUpdateInfo = {
            idkhnam: idlokehoach,
            ngaybatdautt: this.formatDate(minNgayBdThucTe),
            ngayketthuctt: this.formatDate(maxNgayHoanThanhTt),
            tonghong: totalHong,
            tongdat: totalDat,
            status: 3,
          };

          const lokehoachpxUpdateToDB = {
            idkhnam: idlokehoach,
            ngaybatdautt: minNgayBdThucTe,
            ngayketthuctt: maxNgayHoanThanhTt,
            tonghong: totalHong,
            tongdat: totalDat,
            status: 3,
          };

          const htmlContent = `
            <div>
              <div style="font-size: small; color: red; text-align: left; font-weight: bold;">Xác nhận cập nhật Lô Kế hoạch phân xưởng có mã số: ${idlokehoach}</div>
              <div style="font-size: small; text-align: left; font-weight: bold;"><li>Cập nhật ngày bắt đầu thực tế: ${lokehoachpxUpdateInfo.ngaybatdautt}</li></div>
              <div style="font-size: small; text-align: left; font-weight: bold;"><li>Cập nhật ngày kết thúc thực tế: ${lokehoachpxUpdateInfo.ngayketthuctt}</li></div>
              <div style="font-size: small; text-align: left; font-weight: bold;"><li>Cập nhật tổng hỏng: ${lokehoachpxUpdateInfo.tonghong}</li></div>
              <div style="font-size: small; text-align: left; font-weight: bold;"><li>Cập nhật tổng đạt: ${lokehoachpxUpdateInfo.tongdat}</li></div>
            </div>
          `;

          const result = await Swal.fire({
            html: htmlContent,
            showDenyButton: true,
            confirmButtonText: "Chắc chắn",
            denyButtonText: `Hủy`,
          });
          if (result.isConfirmed) {
            this.isLoading = true;
            // 1. cập nhật thông tin lô kế hoạch nhà máy
            const res = await this.$axios.post(
              `/api/lokehoach/updateLokehoachphanxuongalllsx`,
              lokehoachpxUpdateToDB
            );
            // 2. cập nhật từng lô sản xuất để lấy tổng đạt ghi nhận
            // 2.1. cập nhật this.selected sldatghinhan = tongdat
            for (let i = 0; i < this.selected.length; i++) {
              // console.log(this.selected[i]._id, this.selected[i].tongdat);
              const resDuocchon = await this.$axios.get(
                `/api/lokehoach/soluongdatghinhanloduocchon?_id=${this.selected[i]._id}&slhtghinhan=${this.selected[i].tongdat}`
              );
            }
            // 2.2. cập nhật mảng ids sldatghinhan = 0
            for (let i = 0; i < dulieuKhongduocchon.length; i++) {
              const resKhongduocchon = await this.$axios.get(
                `/api/lokehoach/soluongdatghinhanlokhongduocchon?_id=${dulieuKhongduocchon[i].id}`
              );
            }
            if (res.status == 200) {
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
                title: `Đã cập nhật Lô kế hoạch phân xưởng: ${idlokehoach}`,
              });
              this.isLoading = false;

              // tái hiển thị lô kế hoạch phân xưởng
              const idlnm = this.lokehoachphanxuong[0]._id_lonhamay;
              const mtp = this.lokehoachphanxuong[0].mathanhpham;
              const ntp = this.lokehoachphanxuong[0].nhomthanhpham;
              this.showLokehoachphanxuongAfterUpdatefromLSX(idlnm, mtp, ntp);
              // console.log(this.lokehoachphanxuong);
              // console.log(this.selected[0]._id_khpx);
              this.highlightRow_khpx(this.selected[0]._id_khpx);
            }
          }
        } catch (error) {
          console.log(error);
          this.isLoading = false;
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
          title: "Bạn chưa tích chọn tổng đạt của Lô sản xuất nào",
        });
      }
    },

    // cập nhật tổng hỏng đạt, ngày bd, kt thực tế, trạng thái vào lô KHPX từ bảng lô sản xuất
    async updateSodathongtoLokehoachnhamay1111() {
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
        title: "Chờ phê duyệt hoạt động!",
      });
    },
    async updateSodathongtoLokehoachnhamay() {
      // console.log(this.lokehoachphanxuong);
      // console.log(this.lokehoachphanxuong[0]._id_lonhamay);
      // console.log(this.lokehoachphanxuong[0].mathanhpham);
      // console.log(this.lokehoachphanxuong[0].nhomthanhpham);

      // console.log(this.lokehoachphanxuong);
      const idlokehoachnhamay = this.lokehoachphanxuong[0]._id_lonhamay;
      // Kiểm tra xem tất cả các status của lô kế hoạch phân xưởng có giá trị là 3 hay không?
      // kiểm tra xem tất cả các status của lô kế hoạch sản xuất có giá trị là 3 hay không?
      // đảm bảo cả 2 điều kiện mới được chạy
      // lấy ra toàn bộ lô sản xuất của kh nhà máy này
      const resAlllosxinkhnm = await this.$axios.get(
        `/api/lokehoach/getalllsxinlokhnhamay?_id_lonhamay=${idlokehoachnhamay}`
      );
      // console.log(idlokehoachnhamay);
      // console.log(resAlllosxinkhnm);
      const alllosx = resAlllosxinkhnm.data;
      const allStatusAreThree_lokhpx = this.lokehoachphanxuong.every(
        (item) => item.status === 3
      );
      const allStatusAreThree_losanxuat = alllosx.every(
        (item) => item.status === 3
      );

      if (allStatusAreThree_lokhpx & allStatusAreThree_losanxuat) {
        const totalHong = this.lokehoachphanxuong.reduce((total, item) => {
          return total + (parseFloat(item.tonghong) || 0); // kiểm tra nếu item.tongHong là undefined hoặc null
        }, 0);

        // Tính tổng cột "tổng đạt"
        const totalDat = this.lokehoachphanxuong.reduce((total, item) => {
          return total + (parseFloat(item.tongdat) || 0); // kiểm tra nếu item.tongDat là undefined hoặc null
        }, 0);

        // Lấy ra ngaybdthucte nhỏ nhất
        const minNgayBdThucTe = this.lokehoachphanxuong.reduce((min, item) => {
          const date = new Date(item.ngaybdthucte);
          return date < min ? date : min;
        }, new Date(this.lokehoachphanxuong[0].ngaybdthucte));

        // Lấy ra ngayhoanthanhtt lớn nhất
        const maxNgayHoanThanhTt = this.lokehoachphanxuong.reduce(
          (max, item) => {
            const date = new Date(item.ngayhoanthanhtt);
            return date > max ? date : max;
          },
          new Date(this.lokehoachphanxuong[0].ngayhoanthanhtt)
        );

        const lokehoachnhamayUpdateInfo = {
          idlokehoachnhamay: idlokehoachnhamay,
          ngaybatdautt: this.formatDate(minNgayBdThucTe),
          ngayketthuctt: this.formatDate(maxNgayHoanThanhTt),
          tonghong: totalHong,
          tongdat: totalDat,
          status: 3,
        };

        const lokehoachnhamayUpdateToDB = {
          idlokehoachnhamay: idlokehoachnhamay,
          ngaybatdautt: minNgayBdThucTe,
          ngayketthuctt: maxNgayHoanThanhTt,
          // tonghong: totalHong,
          // tongdat: totalDat,
          status: 3,
        };

        const htmlContent = `
            <div>
              <div style="font-size: small; color: red; text-align: left; font-weight: bold;">Xác nhận cập nhật Lô Kế hoạch nhà máy có mã số: ${idlokehoachnhamay}</div>
               <div style="font-size: small; text-align: left; font-weight: bold;"><li>Cập nhật ngày bắt đầu thực tế: ${lokehoachnhamayUpdateInfo.ngaybatdautt}</li></div>
               <div style="font-size: small; text-align: left; font-weight: bold;"><li>Cập nhật ngày kết thúc thực tế: ${lokehoachnhamayUpdateInfo.ngayketthuctt}</li></div>
              <div style="font-size: small; text-align: left; font-weight: bold;"><li>Cập nhật tổng hỏng: ${lokehoachnhamayUpdateInfo.tonghong}</li></div>
              <div style="font-size: small; text-align: left; font-weight: bold;"><li>Cập nhật tổng đạt: ${lokehoachnhamayUpdateInfo.tongdat}</li></div>
            </div>
          `;

        const result = await Swal.fire({
          html: htmlContent,
          showDenyButton: true,
          confirmButtonText: "Chắc chắn",
          denyButtonText: `Hủy`,
        });
        if (result.isConfirmed) {
          this.isLoading = true;
          // 1. cập nhật thông tin lô kế hoạch nhà máy
          const res = await this.$axios.post(
            `/api/lokehoach/updateLokehoachnhamay`,
            lokehoachnhamayUpdateToDB
          );

          if (res.status == 200) {
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
              title: `Đã cập nhật Lô kế hoạch nhà máy: ${idlokehoachnhamay}`,
            });

            this.isLoading = false;

            // tái hiển thị lô kế hoạch nhà máy
            const idkhnam = this.lokehoachphanxuong[0]._id_khnam;
            const mtp = this.lokehoachphanxuong[0].mathanhpham;
            const ntp = this.lokehoachphanxuong[0].nhomthanhpham;
            this.showLokenhamayAfterUpdatefromLoKHPX(idkhnam, mtp, ntp);
            // kế hoạch năm nhóm tp mã tp
            // console.log(this.lokehoachphanxuong);
            // console.log(this.selected[0]._id_khpx);
            this.highlightRow_lonhamay(this.lokehoachphanxuong[0]._id_lonhamay);
          }
        }
      } else if (!allStatusAreThree_lokhpx) {
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
          title: "Tất cả các lô KHPX phải hoàn thành mới được cập nhật",
        });
      } else if (!allStatusAreThree_losanxuat) {
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
          title: "Tất cả các lô sản xuất phải hoàn thành mới được cập nhật",
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
          title: "Tất cả các lô KHPX và Lô sản xuất đều chưa hoàn thành hết",
        });
      }
    },

    async deleteLosanxuat() {
      console.log(this.chitietLosanxuat);
    },
  },
};
</script>

<style scoped>
.table_wrapper {
  overflow-x: auto;
  display: block;
  white-space: nowrap;
  position: sticky;
}

.input.is-small {
  min-width: 50px;
}

.highlighted {
  background-color: lightblue;
}

.highlighted_lonhamay {
  background-color: #e6e6fa;
}

.highlighted_lokhpx {
  background-color: #f692ce;
}

.highlighted_losx {
  background-color: #ffea7f;
}

.highlighted_details_lonm {
  background-color: lightblue;
}

.highlighted_details_lokhpx {
  background-color: #f692ce;
}

.highlighted_details_losx {
  background-color: #ffea7f;
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
  width: 1320px;
  height: 100%;
}

.modal-card-lsx {
  width: 940px;
  height: 100%;
}

.modal-card-viewkhnam {
  width: 1024px;
  height: 100%;
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

ul {
  padding-left: 20px;
}
li {
  cursor: pointer;
}
li.clickable {
  cursor: pointer;
  color: blue;
}
li.clickable span {
  font-style: italic;
  color: grey;
  margin-left: 5px;
}

.infoDataUpdate {
  font-size: small;
  color: #cb4b10;
  text-align: left;
}

/* css for loading */
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.5);
  /* Mờ nền */
  z-index: 9999;
  /* Đặt vị trí cao hơn */
  display: flex;
  align-items: center;
  justify-content: center;
}

/* CSS của nội dung loading */
.loading-content {
  text-align: center;
}

/* CSS của biểu tượng loading */
.loading-spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  /* Màu đường viền của spinner */
  border-top: 4px solid red;
  /* Màu của đường viền phía trên */
  border-radius: 50%;
  /* Hình dạng của spinner */
  width: 30px;
  /* Chiều rộng của spinner */
  height: 30px;
  /* Chiều cao của spinner */
  animation: spin 1s linear infinite;
  /* Animation cho spinner */
  margin-bottom: 10px;
}

/* Animation cho spinner */
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* CSS của đoạn văn bản loading */
.loading-text {
  font-size: 17px;
  font-weight: bold;
  /* Cỡ chữ */
  color: #4b0082;
  /* Màu chữ */
}
</style>
