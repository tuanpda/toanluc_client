<template>
  <div class="columns">
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
                >View</span
              >
            </div>
          </div>
        </div>

        <!-- view tầng 1 - kế hoạch trong 1 năm -->
        <div>
          <!-- bảng lọc -->
          <table class="table is-bordered is-striped is-narrow is-hoverable">
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

                <td style="width: 7%">
                  <button
                    @click="filterCombined"
                    class="button is-info is-small is-fullwidth"
                  >
                    <span>Lọc kết hợp</span>
                  </button>
                </td>
                <td></td>
              </tr>
            </thead>
          </table>
        </div>
        <!-- dữ liệu hiển thị -->
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
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(pl, index) in paginatedTable"
                :key="index + 'a'"
                :class="{ highlighted: pl === highlightedRow }"
                @click="
                  [
                    highlightRow(pl),
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
                <td style="font-size: small; vertical-align: middle">
                  <!-- <input type="text" class="input is-small" v-model="pl.makh"> -->
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
                :disabled="currentPage === pageCount2"
              >
                Sau
              </button>
              <button
                class="button is-small is-success"
                @click="changePage('table1', pageCount2)"
                :disabled="currentPage === pageCount2"
              >
                Cuối
              </button>
            </div>
          </div>
        </div>

        <!-- view tầng 2 - kế hoạch lô kế hoạch phân xưởng -->
        <div
          class="table_wrapper"
          style="margin-top: 10px"
          v-if="lokehoachphanxuong.length > 0"
        >
          <!-- bảng lọc -->
          <table class="table is-bordered is-striped is-narrow is-hoverable">
            <thead>
              <tr style="background-color: #ebfffc">
                <!-- <td style="width: 12%">
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
                        <a @click="filterNamkh" class="button is-small">
                          Lọc
                        </a>
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

                  <td style="width: 7%">
                    <button
                      @click="filterCombined"
                      class="button is-info is-small is-fullwidth"
                    >
                      <span>Lọc kết hợp</span>
                    </button>
                  </td> -->

                <td style="font-size: small; width: 6%">
                  <input
                    class="input is-danger is-small"
                    type="number"
                    id="itemsPerPage"
                    v-model.number="itemsPerPage2"
                    min="1"
                    max="10"
                  />
                </td>
                <td></td>
              </tr>
            </thead>
          </table>
        </div>
        <!-- dữ liệu hiển thị -->
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
                  @click="sortTable('table2', 'mapx')"
                  style="
                    text-align: center;
                    font-size: small;
                    font-weight: bold;
                    width: 7%;
                  "
                >
                  Mã phân xưởng
                  <a
                    ><i
                      style="margin-left: 10px; color: green"
                      class="fas fa-filter"
                      title="Bấm để sắp xếp"
                    ></i
                  ></a>
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
                  Ngày bắt đầu (EXC)
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
                  Ngày kết thúc (EXC)
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
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(pl, index) in paginatedTable2"
                :key="index + 'a'"
                :class="{ highlighted_lokhpx: pl === highlightedRow_lokhpx }"
                @click="
                  [
                    highlightRow_khpx(pl),
                    showLosanxuat(
                      pl._id_khnam,
                      pl._id_lonhamay,
                      pl._id,
                      pl.mapx
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
                <td
                  style="
                    font-size: small;
                    text-align: center;
                    vertical-align: middle;
                  "
                >
                  {{ pl.ngaybdthucte | formatDate }}
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
                  {{ pl.soluongkhpx | formatNumber }}
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
                <td
                  style="
                    text-align: center;
                    font-size: small;
                    vertical-align: middle;
                  "
                >
                  {{ pl.tonghong | formatNumber }}
                </td>
                <td
                  style="
                    text-align: center;
                    font-size: small;
                    vertical-align: middle;
                  "
                >
                  {{ pl.dat | formatNumber }}
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

        <!-- view tầng 3 - lô sản xuất-->
        <div
          class="table_wrapper"
          style="margin-top: 10px"
          v-if="losanxuat.length > 0"
        >
          <!-- bảng lọc -->

          <table class="table is-bordered is-striped is-narrow is-hoverable">
            <thead>
              <tr style="background-color: #ebfffc">
                <td style="width: 10%">
                  <button class="button is-small is-success">
                    Cập nhật Tổng đạt - Tổng hỏng
                  </button>
                </td>
                <td style="width: 10%">
                  <button class="button is-small is-info">
                    Cập nhật Ngày HTTT
                  </button>
                </td>
                <td style="width: 10%">
                  <button class="button is-small is-primary">
                    Cập nhật Trạng thái
                  </button>
                </td>
                <td></td>
              </tr>
            </thead>
          </table>
        </div>
        <!-- dữ liệu hiển thị -->
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
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(pl, index) in losanxuat"
                :key="index + 'a'"
                :class="{ highlighted_losx: pl === highlightedRow_losx }"
                @click="[highlightRow_losanxuat(pl)]"
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
                  {{ pl.tonghong | formatNumber }}
                </td>
                <td
                  style="
                    text-align: center;
                    font-size: small;
                    vertical-align: middle;
                  "
                >
                  {{ pl.tongdat | formatNumber }}
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
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      namkh: "",
      nhomthanhpham: "",
      mathanhpham: "",
      dataKhnhanmay: [],
      lokehoachnhamay: [],
      lokehoachphanxuong: [],
      losanxuat: [],

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
      highlightedRow_lokhpx: null,
      highlightedRow_losx: null,
    };
  },

  computed: {
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
    sortedTable2() {
      return this.lokehoachphanxuong.sort((a, b) => {
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
      }
      // Tương tự cho các bảng khác
    },

    // hàm highlight để đánh dấu row nào được chọn
    highlightRow(row) {
      this.highlightedRow = row;
    },

    highlightRow_khpx(row) {
      this.highlightedRow_lokhpx = row;
    },

    highlightRow_losanxuat(row) {
      this.highlightedRow_losx = row;
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

    // 4. Kết hợp lọc
    async filterCombined() {
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
    async showLokehoachphanxuong(idkhnam, mathanhpham, nhomthanhpham) {
      // console.log(idkhnam);
      const res = await this.$axios.get(
        `/api/lokehoach/getlokehoachphanxuongtheonamkh?_id_khnam=${idkhnam}&mathanhpham=${mathanhpham}&nhomthanhpham=${nhomthanhpham}`
      );
      // console.log(res.data);
      this.lokehoachphanxuong = res.data;
      // console.log(this.lokehoachphanxuong);
    },

    // 5. hiển thị tất cả lô kh phân xưởng
    async showLosanxuat(idkhnam, idlonhamay, idlokhpx, mapx) {
      // console.log(idkhnam);
      const res = await this.$axios.get(
        `/api/lokehoach/getlosxfromlkhpx?_id_khnam=${idkhnam}&_id_lonhamay=${idlonhamay}&_id_khpx=${idlokhpx}&mapx=${mapx}`
      );
      // console.log(res.data);
      this.losanxuat = res.data;
      // console.log(this.losanxuat);
    },
  },
};
</script>

<style scoped>
.table_wrapper {
  display: block;
  overflow: scroll;
  white-space: nowrap;
  position: sticky;
  left: 0;
}

.input.is-small {
  min-width: 50px;
}

.highlighted {
  background-color: lightblue;
}

.highlighted_lokhpx {
  background-color: #f692ce;
}

.highlighted_losx {
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
