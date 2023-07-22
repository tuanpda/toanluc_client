<template>
  <div class="columns">
    <div class="column">
      <br />
      <div class="box" style="margin-left: 5px; margin-right: 5px">
        <div class="columns">
          <div class="column is-11">
            <div class="control">
              <span class="icon is-small is-left">
                <i style="color: #ff55acee" class="far fa-calendar-alt"></i>
              </span>
              <span style="color: #3850b7; font-size: 17px; font-weight: bold"
                >Danh sách lô sản xuất</span
              >
            </div>
          </div>
          <div class="column" style="text-align: right">
            <button class="button is-info is-fullwidth is-small">
              <span class="icon is-small">
                <i class="fas fa-angle-double-left"></i>
              </span>
              <span>Thoát</span>
            </button>
          </div>
        </div>

        <div>
          <table class="table is-responsive is-bordered is-narrow is-fullwidth">
            <tr style="background-color: #feecf0">
              <td style="font-size: small; width: 13%">
                <div class="select-wrapper">
                  <div class="select-header" @click="isOpen = !isOpen">
                    {{
                      selectedOptions.length > 0
                        ? selectedOptions.join(", ")
                        : "Chọn Phân xưởng"
                    }}
                    <span class="arrow" :class="{ open: isOpen }"></span>
                  </div>
                  <div class="select-options" :class="{ open: isOpen }">
                    <label v-for="option in phanxuong">
                      <input
                        type="checkbox"
                        :value="option.mapx"
                        v-model="selectedOptions"
                      />
                      {{ option.mapx }} &nbsp;
                    </label>
                  </div>
                </div>
              </td>
              <td style="font-size: small; width: 13%">
                <div class="select-wrapper-to">
                  <div class="select-header" @click="isOpento = !isOpento">
                    {{
                      selectedOptions_to.length > 0
                        ? selectedOptions_to.join(", ")
                        : "Chọn Tổ"
                    }}
                    <span class="arrow" :class="{ open: isOpento }"></span>
                  </div>
                  <div class="select-options" :class="{ open: isOpento }">
                    <label v-for="option in tonhom">
                      <input
                        type="checkbox"
                        :value="option.mato"
                        v-model="selectedOptions_to"
                      />
                      {{ option.mato }} &nbsp;
                    </label>
                  </div>
                </div>
              </td>
              <td style="width: 10%">
                <div class="autocomplete">
                  <input
                    class="input is-small is-success"
                    type="text"
                    v-model="multiSearch_nhomsp"
                    @input="onInput_nhomsp"
                    placeholder="Nhóm sản phẩm"
                  />
                  <div
                    class="autocomplete-items"
                    v-if="suggestions_nhomsp.length"
                  >
                    <div
                      class="autocomplete-item"
                      v-for="suggestion_nhomsp in suggestions_nhomsp"
                      @click="selectSuggestion_nhomsp(suggestion_nhomsp)"
                    >
                      {{ suggestion_nhomsp }}
                    </div>
                  </div>
                </div>
              </td>
              <td style="width: 10%">
                <div class="autocomplete">
                  <input
                    class="input is-small is-danger"
                    type="text"
                    v-model="multiSearch_masp"
                    @input="onInput"
                    placeholder="Chọn sản phẩm"
                  />
                  <div class="autocomplete-items" v-if="suggestions.length">
                    <div
                      class="autocomplete-item"
                      v-for="suggestion in suggestions"
                      @click="selectSuggestion(suggestion)"
                    >
                      {{ suggestion }}
                    </div>
                  </div>
                </div>
              </td>
              <td style="font-size: small; width: 10%">
                <div class="select-wrapper-status">
                  <div class="select-header" @click="isOpenst = !isOpenst">
                    {{
                      Options_status.length > 0
                        ? Options_status.join(", ")
                        : "Trạng thái"
                    }}
                    <span class="arrow" :class="{ open: isOpenst }"></span>
                  </div>
                  <div class="select-options" :class="{ open: isOpenst }">
                    <label v-for="option in statusArr">
                      <input
                        type="checkbox"
                        :value="option.masta"
                        v-model="Options_status"
                      />
                      {{ option.tensta }} &nbsp;
                    </label>
                  </div>
                </div>
              </td>
              <td style="font-size: small; width: 7%">
                <input
                  type="date"
                  v-model="searchNgaybd"
                  class="input is-small"
                />
              </td>
              <td style="width: 5%">
                <button
                  @click="filterData"
                  class="button is-small is-fullwidth is-success"
                >
                  Lọc
                </button>
              </td>
              <td style="width: 5%">
                <button
                  @click="showAllLokhsx"
                  class="button is-small is-danger is-fullwidth"
                >
                  Refresh
                </button>
              </td>
              <!-- <td style="width: 7.7%">
                                <button @click="printphieu" class="button is-small is-info is-fullwidth">In phiếu
                                    lô</button>
                            </td> -->
              <td style="width: 7%">
                <button
                  @click="exportExcel"
                  class="button is-small is-info is-fullwidth"
                >
                  Xuất phiếu
                </button>
              </td>
              <td style="width: 10.15%; text-align: center">
                <vue-excel-xlsx
                  :data="lokehoachsx"
                  :columns="columns"
                  :file-name="filename_exel"
                  :file-type="'xlsx'"
                  :sheet-name="filename_exel"
                >
                  Download Excel
                </vue-excel-xlsx>
              </td>
              <td style="font-size: small; width: 5.5%; font-weight: 600">
                Số dòng
              </td>
              <td style="font-size: small; width: 7.6%">
                <input
                  class="input is-danger is-small"
                  type="number"
                  id="itemsPerPage"
                  v-model.number="itemsPerPage"
                  min="1"
                  max="10"
                />
              </td>
              <!-- <td></td> -->
            </tr>
          </table>
        </div>
        <div class="table_wrapper">
          <table class="table is-responsive is-bordered is-narrow is-fullwidth">
            <tr style="background-color: #f4f2f8">
              <td
                style="font-size: small; font-weight: bold; text-align: center"
              >
                <input type="checkbox" v-model="selectAll" />
              </td>
              <td
                style="
                  font-size: small;
                  text-align: center;
                  font-weight: 600;
                  width: 3%;
                "
              >
                STT
              </td>
              <td
                style="
                  font-size: small;
                  text-align: center;
                  font-weight: 600;
                  width: 3%;
                "
              >
                ID
              </td>
              <td
                @click="sortTable('malonhamay')"
                style="
                  font-size: small;
                  text-align: center;
                  font-weight: 600;
                  width: 5%;
                "
              >
                Mã lô nhà máy
              </td>
              <td
                @click="sortTable('mapx')"
                style="
                  font-size: small;
                  text-align: center;
                  font-weight: 600;
                  width: 5%;
                "
              >
                Mã PX
              </td>
              <!-- <td
                @click="sortTable('makhpx')"
                style="
                  font-size: small;
                  text-align: center;
                  font-weight: 600;
                  width: 4%;
                "
              >
                Mã KHPX
              </td> -->
              <td
                @click="sortTable('malosx')"
                style="
                  font-size: small;
                  text-align: center;
                  font-weight: 600;
                  width: 7%;
                "
              >
                Mã lô sản xuất
              </td>
              <td
                style="
                  font-size: small;
                  text-align: center;
                  font-weight: 600;
                  width: 2%;
                "
              >
                In
              </td>
              <td
                @click="sortTable('nhomsp')"
                style="
                  font-size: small;
                  text-align: center;
                  font-weight: 600;
                  width: 7%;
                "
              >
                Nhóm SP
              </td>
              <td
                @click="sortTable('masp')"
                style="
                  font-size: small;
                  text-align: center;
                  font-weight: 600;
                  width: 7%;
                "
              >
                Mã sản phẩm
              </td>
              <td
                @click="sortTable('ngaybd')"
                style="
                  font-size: small;
                  text-align: center;
                  font-weight: 600;
                  width: 8%;
                "
              >
                Ngày bắt đầu
              </td>
              <td
                @click="sortTable('ngaykt')"
                style="
                  font-size: small;
                  text-align: center;
                  font-weight: 600;
                  width: 8%;
                "
              >
                Ngày kết thúc
              </td>
              <td
                @click="sortTable('soluonglsx')"
                style="
                  font-size: small;
                  text-align: center;
                  font-weight: 600;
                  width: 7%;
                "
              >
                Số lượng
              </td>
              <td
                @click="sortTable('soluongkhsx')"
                style="
                  font-size: small;
                  text-align: center;
                  font-weight: 600;
                  width: 7%;
                "
              >
                SL nhanh
              </td>
              <td
                style="
                  font-size: small;
                  text-align: center;
                  font-weight: 600;
                  width: 7%;
                "
              >
                Tổng đạt
              </td>
              <td
                style="
                  font-size: small;
                  text-align: center;
                  font-weight: 600;
                  width: 7%;
                "
              >
                Tổng hỏng
              </td>
              <td
                @click="sortTable('status')"
                style="
                  font-size: small;
                  text-align: center;
                  font-weight: 600;
                  width: 7%;
                "
              >
                Trạng thái
              </td>
              <td
                style="
                  font-size: small;
                  text-align: center;
                  font-weight: 600;
                  width: 5%;
                "
              >
                Chọn TT
              </td>
              <!-- <td style="font-size: small; text-align: center; font-weight: 600; width: 7%;">Số lượng HT
                            </td> -->
              <td
                style="font-size: small; text-align: center; font-weight: 600"
              >
                Cập nhật
              </td>
              <!-- <td></td> -->
            </tr>
            <tr
              v-for="(item, index) in paginatedTable"
              :key="index + 'llllkiq'"
            >
              <td style="text-align: center; width: 1%">
                <input v-model="selected_print" :value="item" type="checkbox" />
              </td>
              <td
                style="
                  font-size: small;
                  text-align: center;
                  background-color: #effaf5;
                "
              >
                {{ index + 1 }}
              </td>
              <td
                style="
                  font-size: small;
                  text-align: center;
                  color: red;
                  font-weight: 800;
                "
              >
                {{ item._id }}
              </td>
              <td style="font-size: small">{{ item.malonhamay }}</td>
              <td
                style="
                  font-size: small;
                  background-color: #effaf5;
                  text-align: center;
                "
              >
                {{ item.mapx }}
              </td>
              <!-- <td
                style="
                  font-size: small;
                  background-color: #effaf5;
                  text-align: center;
                "
              >
                {{ item.makhpx }}
              </td> -->
              <td
                style="
                  font-size: small;
                  background-color: #eff5fb;
                  text-align: center;
                  font-weight: 600;
                "
              >
                {{ item.malosx }}
              </td>
              <td
                style="
                  font-size: small;
                  background-color: #eff5fb;
                  text-align: center;
                  font-weight: 600;
                "
              >
                <a @click="printphieu(item)"
                  ><span class="icon is-small">
                    <i style="color: red" class="far fa-file-pdf"></i> </span
                ></a>
              </td>
              <td
                style="
                  font-size: small;
                  background-color: #effaf5;
                  text-align: center;
                "
              >
                {{ item.nhomsp }}
              </td>
              <td
                style="
                  font-size: small;
                  background-color: #effaf5;
                  text-align: center;
                "
              >
                {{ item.masp }}
              </td>
              <!-- <td style="font-size: small; background-color: #effaf5; text-align: center;">{{
                                item.ngaybdkhpx | formatDate
                            }} -->
              <td style="background-color: #fffaeb">
                <!-- <input
                  class="input is-small"
                  type="date"
                  v-bind:value="item.ngaybd | inputDateFilter"
                  v-on:input="item.ngaybd = getDate($event.target.value)"
                /> -->
                <input
                  class="input is-small"
                  type="date"
                  :value="formattedNgaybd(item)"
                  @blur="updateNgaybd($event.target.value, item)"
                />
              </td>
              <!-- <td style="font-size: small; text-align: center; background-color: #fffaeb;">{{
                                item.ngayktkhpx | formatDate
                            }}</td> -->
              <!-- <td style="background-color: #fffaeb">
                <input
                  class="input is-small"
                  type="date"
                  v-bind:value="item.ngaykt | inputDateFilter"
                  v-on:input="item.ngaykt = getDate($event.target.value)"
                />
              </td> -->
              <td
                style="
                  font-size: small;
                  text-align: center;
                  background-color: #fffaeb;
                "
              >
                <input
                  class="input is-small"
                  type="date"
                  :value="formattedNgaykt(item)"
                  @blur="updateNgaykt($event.target.value, item)"
                />
              </td>
              <td
                style="
                  font-size: small;
                  text-align: center;
                  background-color: #effaf5;
                "
              >
                {{ item.soluonglsx | formatNumber }}
              </td>
              <td
                style="
                  font-size: small;
                  text-align: center;
                  background-color: #effaf5;
                "
              >
                {{ item.soluongkhsx | formatNumber }}
              </td>
              <td
                style="
                  font-size: small;
                  text-align: center;
                  background-color: #effaf5;
                "
              >
                {{ item.tongdat | formatNumber }}
              </td>
              <td
                style="
                  font-size: small;
                  text-align: center;
                  background-color: #effaf5;
                "
              >
                {{ item.tonghong | formatNumber }}
              </td>
              <template>
                <td
                  v-if="item.status == 1"
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
                  v-else-if="item.status == 2"
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
                  v-else-if="item.status == 3"
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
                <td
                  v-else
                  style="
                    font-size: small;
                    text-align: center;
                    vertical-align: middle;
                  "
                ></td>
              </template>

              <td style="font-size: small">
                <div
                  v-if="item.status != 3"
                  class="select is-small is-fullwidth"
                >
                  <select
                    id=""
                    @change="onChange_status($event, item)"
                    v-model="item.status"
                  >
                    <!-- <option value="3">HT</option> -->
                    <option value="2">SX</option>
                    <option value="1">DK</option>
                    <option value="0">0</option>
                  </select>
                </div>
              </td>
              <!-- <td><input class="input is-small" type="text" v-model="item.soluongkhsx"></td> -->
              <td style="width: 5%">
                <button
                  @click="onUpdateLosx(item)"
                  class="button is-small is-success is-fullwidth"
                >
                  Cập nhật
                </button>
              </td>
              <!-- <td></td> -->
            </tr>
          </table>
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
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "~/assets/font/OpenSans-Light-normal";
import "~/assets/font/OpenSans-SemiBold-normal";
import XLSX from "xlsx";
export default {
  middleware: "auth",
  data() {
    return {
      // in ấn lô sx
      selected_print: [],
      // dữ liệu
      lokehoachsx: [],
      phanxuong: [],
      tonhom: [],

      // các biến tìm kiếm
      search_maxuong: "",
      search_tenxuong: "",
      search_timestart: "",
      search_timeend: "",

      // gán biến status
      status: 0,

      // lọc talble
      sortDirection: 1,
      sortKey: "ttqt",
      currentPage: 1,
      itemsPerPage: 10,

      // check nhiều phân xưởng
      selectedOptions: [],
      selectedOptions_to: [],
      Options_status: [],
      searchNgaybd: "",
      isOpen: false,
      isOpento: false,
      isOpenst: false,
      statusArr: [
        { masta: 1, tensta: "DK" },
        { masta: 2, tensta: "SX" },
        { masta: 3, tensta: "HT" },
      ],
      multiSearch_masp: "",
      multiSearch_nhomsp: "",

      // input suggest
      suggestions: [],
      suggestions_nhomsp: [],
      maspinlosanxuat: [],
      nhomspinlosanxuat: [],

      reportData: [
        // ['Tháng', 'Doanh thu', 'Lợi nhuận'],
        ["1", 1000000, 500000],
        ["2", 1500000, 700000],
        ["3", 2000000, 900000],
      ],

      filename_exel: "",
      // xuất execl
      columns: [
        {
          label: "Kế hoạch năm",
          field: "kehoachnam",
        },
        {
          label: "Mã lô nhà máy",
          field: "malonhamay",
          dataFormat: this.trimData,
        },
        {
          label: "Mã kế hoạch phân xưởng",
          field: "makhpx",
          dataFormat: this.trimData,
        },
        {
          label: "Mã lô sản xuất",
          field: "malosx",
          dataFormat: this.trimData,
        },
        {
          label: "Mã phân xưởng",
          field: "mapx",
          dataFormat: this.trimData,
          /* dataFormat: this.priceFormat */
        },
        {
          label: "Tên phân xưởng",
          field: "tenpx",
          dataFormat: this.trimData,
        },
        {
          label: "Mã tổ",
          field: "mato",
          dataFormat: this.trimData,
        },
        {
          label: "Tên tổ",
          field: "tento",
          dataFormat: this.trimData,
        },
        {
          label: "Mã sản phẩm",
          field: "masp",
          dataFormat: this.trimData,
        },
        {
          label: "Tên sản phẩm",
          field: "tensp",
          dataFormat: this.trimData,
        },
        {
          label: "Số lượng",
          field: "soluonglsx",
          dataFormat: this.trimData,
        },
        {
          label: "SL cập nhật nhanh",
          field: "soluongkhsx",
        },
        {
          label: "Ngày bắt đầu",
          field: "ngaybd",
          dataFormat: this.prefixformatDate,
        },
        {
          label: "Ngày kết thúc",
          field: "ngaykt",
          dataFormat: this.prefixformatDate,
        },
        {
          label: "Ngày bắt đầu thực tế",
          field: "ngaybatdautt",
          dataFormat: this.prefixformatDate,
        },
        {
          label: "Ngày hoàn thành thực tế",
          field: "ngayhoanthanhtt",
          dataFormat: this.prefixformatDate,
        },
        {
          label: "Tổng đạt",
          field: "tongdat",
        },
        {
          label: "Tổng hỏng",
          field: "tonghong",
        },
        {
          label: "Nhóm lương",
          field: "nhomluong",
        },
        {
          label: "Đã tính lương",
          field: "datinhluong",
        },
        {
          label: "Trạng thái",
          field: "status",
        },
      ],
    };
  },

  mounted() {
    this.showAllLokhsx();
    this.showAllPx();
    this.showAllTo();
    this.maspinlsx();
    this.nhomspinlsx();
    this.currentDateTime();
  },

  computed: {
    selectAll: {
      get: function () {
        return this.lokehoachsx
          ? this.selected_print.length == this.lokehoachsx.length
          : false;
      },
      set: function (value) {
        var selected_print = [];

        if (value) {
          this.lokehoachsx.forEach(function (nv) {
            selected_print.push(nv);
          });
        }

        this.selected_print = selected_print;
      },
    },

    // phân trang và sắp xếp
    sortedTable() {
      return this.lokehoachsx.sort((a, b) => {
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

    formattedNgaybd() {
      return function (item) {
        if (!item.ngaybd) return "";
        const date = new Date(item.ngaybd);
        const year = date.getFullYear();
        const month = ("0" + (date.getMonth() + 1)).slice(-2);
        const day = ("0" + date.getDate()).slice(-2);
        return `${year}-${month}-${day}`;
      };
    },

    formattedNgaykt() {
      return function (item) {
        if (!item.ngaykt) return "";
        const date = new Date(item.ngaykt);
        const year = date.getFullYear();
        const month = ("0" + (date.getMonth() + 1)).slice(-2);
        const day = ("0" + date.getDate()).slice(-2);
        return `${year}-${month}-${day}`;
      };
    },
  },

  watch: {
    itemsPerPage() {
      this.currentPage = 1;
    },
    lokehoachsx(newItems) {
      // Cập nhật lại bảng khi có thay đổi
      console.log("Dữ liệu đã được cập nhật!");
    },
  },

  // bind v-model input type date
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
      this.filename_exel = date;
    },
    // --------------------------------------------------------------------------------------
    // 1: Các hàm hỗ trợ tính toán; lọc ...
    // suggest input mã sản phẩm
    onInput() {
      if (!this.multiSearch_masp) {
        this.suggestions = [];
        return;
      }
      const MAX_SUGGESTIONS = 5; // Số lượng suggest tối đa
      this.suggestions = this.maspinlosanxuat
        .map((c) => c.masp)
        .filter((masp) =>
          masp.toLowerCase().includes(this.multiSearch_masp.toLowerCase())
        )
        .map((masp) => masp.trim())
        .slice(0, MAX_SUGGESTIONS);
    },
    selectSuggestion(suggestion) {
      this.multiSearch_masp = suggestion;
      this.suggestions = [];
    },
    // suggest input nhóm sản phẩm
    onInput_nhomsp() {
      if (!this.multiSearch_nhomsp) {
        this.suggestions_nhomsp = [];
        return;
      }
      const MAX_SUGGESTIONS = 5; // Số lượng suggest tối đa
      this.suggestions_nhomsp = this.nhomspinlosanxuat
        .map((c) => c.nhomsp)
        .filter((nhomsp) =>
          nhomsp.toLowerCase().includes(this.multiSearch_nhomsp.toLowerCase())
        )
        .map((nhomsp) => nhomsp.trim())
        .slice(0, MAX_SUGGESTIONS);
    },
    selectSuggestion_nhomsp(suggestion_nhomsp) {
      this.multiSearch_nhomsp = suggestion_nhomsp;
      this.suggestions_nhomsp = [];
    },
    // end suggest mã sản phẩm
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
    // format trước khi xuất execl, ở đây là trim dữ liệu trước khi mang ra
    trimData(value) {
      return value.trim();
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
    // các hàm phục vụ tính toán
    // hàm bind v-model input type date
    getDate(value) {
      if (!value) {
        return null;
      }
      return new Date(value);
    },
    // hàm cập nhật ngày bắt đầu; kết thúc
    async updateNgaybd(value, item) {
      // console.log(value);
      // console.log(item);
      const ngaybdktData = {
        ngaybd: value,
        ngaykt: item.ngaykt,
      };
      await this.$axios.$patch(
        `/api/ketoan/updatengaybdngayktlosx/${item._id}`,
        ngaybdktData
      );
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
        title: `Cập nhật ngày HTTT của lô sx ${item._id}`,
      });
      if (
        !this.selectedOptions.length &&
        this.multiSearch_masp == "" &&
        this.multiSearch_nhomsp == "" &&
        !this.Options_status.length &&
        !this.selectedOptions_to.length
      ) {
        this.showAllLokhsx();
      } else {
        this.filterData();
      }
    },
    async updateNgaykt(value, item) {
      const ngaybdktData = {
        ngaybd: item.ngaybd,
        ngaykt: value,
      };
      await this.$axios.$patch(
        `/api/ketoan/updatengaybdngayktlosx/${item._id}`,
        ngaybdktData
      );
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
        title: `Cập nhật ngày HTTT của lô sx ${item._id}`,
      });
      if (
        !this.selectedOptions.length &&
        this.multiSearch_masp == "" &&
        this.multiSearch_nhomsp == "" &&
        !this.Options_status.length &&
        !this.selectedOptions_to.length
      ) {
        this.showAllLokhsx();
      } else {
        this.filterData();
      }
    },
    // xuất execl
    exportExcel() {
      const filename_phanxuong = this.selected_print[0].mapx;
      const selectedColumns = this.selected_print.map((item) => {
        const formattedDate = new Date(item.ngaybd).toLocaleDateString("en-GB");
        return {
          masp: item.masp.trim(),
          soluonglsx: item.soluonglsx.trim(),
          malosx: item.malosx,
          makhpx: item.makhpx,
          malonhamay: item.malonhamay,
          _id: item._id,
          ngaybd: formattedDate,
          nhomsp: item.nhomsp,
          soluongkhsx: item.soluongkhsx,
        };
      });
      const columnNames = [
        { header: "Số phiếu", key: "_id" },
        { header: "Sản phẩm", key: "masp" },
        { header: "Nhóm sản phẩm", key: "nhomsp" },
        { header: "Lô nhà máy", key: "malonhamay" },
        { header: "Lô kế hoạch PX", key: "makhpx" },
        { header: "Lô sản xuất", key: "malosx" },
        { header: "Số lượng KH", key: "soluonglsx" },
        { header: "Ngày", key: "ngaybd" },
        { header: "SL nhanh", key: "soluongkhsx" },
        { header: "Số lượng hoàn thành", key: "" },
        { header: "Báo cáo hoàn thành", key: "" },
        { header: "Ghi chú", key: "" },
      ];
      const data = selectedColumns.map((item) => {
        const row = {};
        columnNames.forEach((column) => {
          row[column.header] = item[column.key];
        });
        return row;
      });

      const filenameyc = filename_phanxuong + "_" + this.filename_exel;
      const worksheet = XLSX.utils.json_to_sheet(data);
      // const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
      const workbook = {
        Sheets: { [filenameyc]: worksheet },
        SheetNames: [filenameyc],
      };
      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
      const fileName = `${filenameyc}`;
      const blob = new Blob([excelBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },

    // --------------------------------------------------------------------------------------
    // 2: Các hàm lấy dữ liệu từ server qua API
    // lấy danh sách tất cả các lô sản xuất
    async showAllLokhsx() {
      this.lokehoachsx = await this.$axios.$get(`/api/ketoan/getallphieulo`);
      this.multiSearch_masp = "";
      this.multiSearch_nhomsp = "";
      this.Options_status = [];
      this.isOpen = false;
      this.isOpenst = false;
      this.selectedOptions = [];
    },
    // lấy danh sách phân xưởng
    async showAllPx() {
      this.phanxuong = await this.$axios.$get(`/api/phongban/allphanxuong`);
    },
    // lấy danh sách tổ nhóm
    async showAllTo() {
      this.tonhom = await this.$axios.$get(`/api/phongban/allto`);
    },
    // lấy mã sản phẩm trong lô sản xuất
    async maspinlsx() {
      this.maspinlosanxuat = await this.$axios.$get(
        "/api/lokehoach/hmsanphamlosx"
      );
      // console.log(this.maspinlosanxuat)
    },
    // lấy nhóm sản phẩm trong lô sản xuất
    async nhomspinlsx() {
      this.nhomspinlosanxuat = await this.$axios.$get(
        "/api/lokehoach/nhomspinlosanxuat"
      );
      // console.log(this.maspinlosanxuat)
    },
    // Chế độ lọc multi
    async filterData() {
      // console.log(this.selectedOptions)
      // console.log(this.Options_status)
      // console.log(this.selected)
      this.isOpen = false;
      this.isOpenst = false;
      this.isOpento = false;

      const mapxList = this.selectedOptions;
      const masp = this.multiSearch_masp;
      const nhomsp = this.multiSearch_nhomsp;
      const status = this.Options_status;
      const matoList = this.selectedOptions_to;
      // const ngaybd

      // thêm lọc theo mã tổ
      if (
        this.selectedOptions.length > 0 &&
        this.selectedOptions_to.length > 0 &&
        this.Options_status.length > 0 &&
        this.multiSearch_masp != "" &&
        this.multiSearch_nhomsp != ""
      ) {
        this.lokehoachsx = await this.$axios.$get(
          `/api/lokehoach/filterfulldklosanxuatthemto`,
          {
            params: {
              mapx: mapxList, // Truyền danh sách mã phân xưởng lên server
              masp: masp,
              status: status,
              nhomsp: nhomsp,
              mato: matoList,
            },
          }
        );
        // console.log(this.lokehoachsx)
      }

      // chọn lọc full
      else if (
        this.selectedOptions.length > 0 &&
        this.Options_status.length > 0 &&
        this.multiSearch_masp != "" &&
        this.multiSearch_nhomsp != ""
      ) {
        this.lokehoachsx = await this.$axios.$get(
          `/api/lokehoach/filterfulldklosanxuat`,
          {
            params: {
              mapx: mapxList, // Truyền danh sách mã phân xưởng lên server
              masp: masp,
              status: status,
              nhomsp: nhomsp,
            },
          }
        );
        // console.log(this.lokehoachsx)
      }

      // ma xuong ma to nhom ssp
      else if (
        this.selectedOptions.length > 0 &&
        this.selectedOptions_to.length > 0 &&
        !this.Options_status.length &&
        this.multiSearch_masp == "" &&
        this.multiSearch_nhomsp != ""
      ) {
        this.lokehoachsx = await this.$axios.$get(
          `/api/lokehoach/filtermatomaxuongnhomspdklosanxuatthemto`,
          {
            params: {
              mapx: mapxList, // Truyền danh sách mã phân xưởng lên server
              // masp: masp,
              // status: status,
              nhomsp: nhomsp,
              mato: matoList,
            },
          }
        );
        // console.log(this.lokehoachsx)
      }

      // ma xuong ma to ma sp
      else if (
        this.selectedOptions.length > 0 &&
        this.selectedOptions_to.length > 0 &&
        !this.Options_status.length &&
        this.multiSearch_masp != "" &&
        this.multiSearch_nhomsp == ""
      ) {
        this.lokehoachsx = await this.$axios.$get(
          `/api/lokehoach/filtermatomaxuongmaspdklosanxuatthemto`,
          {
            params: {
              mapx: mapxList, // Truyền danh sách mã phân xưởng lên server
              masp: masp,
              // status: status,
              // nhomsp: nhomsp,
              mato: matoList,
            },
          }
        );
        // console.log(this.lokehoachsx)
      }

      // chỉ mã tổ & mã xưởng
      else if (
        this.selectedOptions.length > 0 &&
        this.selectedOptions_to.length > 0 &&
        !this.Options_status.length &&
        this.multiSearch_masp == "" &&
        this.multiSearch_nhomsp == ""
      ) {
        this.lokehoachsx = await this.$axios.$get(
          `/api/lokehoach/filtermatomaxuongdklosanxuatthemto`,
          {
            params: {
              mapx: mapxList, // Truyền danh sách mã phân xưởng lên server
              mato: matoList,
            },
          }
        );
        // console.log(this.lokehoachsx)
      }

      // chỉ có mã px
      else if (
        this.selectedOptions.length > 0 &&
        !this.Options_status.length &&
        this.multiSearch_masp == "" &&
        this.multiSearch_nhomsp == ""
      ) {
        this.lokehoachsx = await this.$axios.$get(
          `/api/lokehoach/filteronlymapxlosanxuat`,
          {
            params: {
              mapx: mapxList,
            },
          }
        );
      }
      // chỉ có mã px và mã sp
      else if (
        this.selectedOptions.length > 0 &&
        !this.Options_status.length &&
        this.multiSearch_masp != "" &&
        this.multiSearch_nhomsp == ""
      ) {
        this.lokehoachsx = await this.$axios.$get(
          `/api/lokehoach/filteronlymapxandmasplosanxuat`,
          {
            params: {
              mapx: mapxList,
              masp: masp,
            },
          }
        );
      }
      // chỉ có mã px và nhóm sp
      else if (
        this.selectedOptions.length > 0 &&
        !this.Options_status.length &&
        this.multiSearch_masp == "" &&
        this.multiSearch_nhomsp != ""
      ) {
        this.lokehoachsx = await this.$axios.$get(
          `/api/lokehoach/filteronlymapxandnhomsplosanxuat`,
          {
            params: {
              mapx: mapxList,
              nhomsp: nhomsp,
            },
          }
        );
      }
      // chỉ có mã px và status
      else if (
        this.selectedOptions.length > 0 &&
        this.Options_status.length > 0 &&
        this.multiSearch_masp == "" &&
        this.multiSearch_nhomsp == ""
      ) {
        this.lokehoachsx = await this.$axios.$get(
          `/api/lokehoach/filteronlymapxandstatuslosanxuat`,
          {
            params: {
              mapx: mapxList,
              status: status,
            },
          }
        );
      }
      // chỉ có mã px và status và nhóm sp
      else if (
        this.selectedOptions.length > 0 &&
        this.Options_status.length > 0 &&
        this.multiSearch_masp == "" &&
        this.multiSearch_nhomsp != ""
      ) {
        this.lokehoachsx = await this.$axios.$get(
          `/api/lokehoach/filteronlymapxandstatusnhomsplosanxuat`,
          {
            params: {
              mapx: mapxList,
              status: status,
              nhomsp: nhomsp,
            },
          }
        );
      }
      // chỉ có mã px và status và sp
      else if (
        this.selectedOptions.length > 0 &&
        this.Options_status.length > 0 &&
        this.multiSearch_masp != "" &&
        this.multiSearch_nhomsp == ""
      ) {
        this.lokehoachsx = await this.$axios.$get(
          `/api/lokehoach/filteronlymapxandstatusmasplosanxuat`,
          {
            params: {
              mapx: mapxList,
              status: status,
              masp: masp,
            },
          }
        );
      }
      // lọc mỗi trạng thái
      else if (
        !this.selectedOptions.length &&
        this.Options_status.length > 0 &&
        this.multiSearch_masp == "" &&
        this.multiSearch_nhomsp == ""
      ) {
        this.lokehoachsx = await this.$axios.$get(
          `/api/lokehoach/filteronlystatuslosanxuat`,
          {
            params: {
              status: status,
            },
          }
        );
      }

      // lọc mỗi mã sản phẩm
      else if (
        !this.selectedOptions.length &&
        !this.Options_status.length &&
        this.multiSearch_masp != "" &&
        this.multiSearch_nhomsp == ""
      ) {
        this.lokehoachsx = await this.$axios.$get(
          `/api/lokehoach/filteronlymasplosanxuat`,
          {
            params: {
              masp: masp,
            },
          }
        );
      }

      // lọc mã sp + status
      else if (
        !this.selectedOptions.length &&
        this.Options_status.length > 0 &&
        this.multiSearch_masp != "" &&
        this.multiSearch_nhomsp == ""
      ) {
        this.lokehoachsx = await this.$axios.$get(
          `/api/lokehoach/filteronlymaspandstatuslosx`,
          {
            params: {
              masp: masp,
              status: status,
            },
          }
        );
      }

      // lọc nhóm sp + status
      else if (
        !this.selectedOptions.length &&
        this.Options_status.length > 0 &&
        this.multiSearch_masp == "" &&
        this.multiSearch_nhomsp != ""
      ) {
        this.lokehoachsx = await this.$axios.$get(
          `/api/lokehoach/filteronlynhomspandstatuslosx`,
          {
            params: {
              nhomsp: nhomsp,
              status: status,
            },
          }
        );
      }

      // lọc nhóm sp + status + sanp
      else if (
        !this.selectedOptions.length &&
        this.Options_status.length > 0 &&
        this.multiSearch_masp != "" &&
        this.multiSearch_nhomsp != ""
      ) {
        this.lokehoachsx = await this.$axios.$get(
          `/api/lokehoach/filteronlynhomspandstatuslosxmasp`,
          {
            params: {
              nhomsp: nhomsp,
              status: status,
              masp: masp,
            },
          }
        );
      }

      // lọc mã phân xưởng; nhóm sp; mã sp
      else if (
        this.selectedOptions.length > 0 &&
        !this.Options_status.length &&
        this.multiSearch_masp != "" &&
        this.multiSearch_nhomsp != ""
      ) {
        this.lokehoachsx = await this.$axios.$get(
          `/api/lokehoach/filtermapxnhomspmasp`,
          {
            params: {
              nhomsp: nhomsp,
              mapx: mapxList,
              masp: masp,
            },
          }
        );
      }

      // lọc nhóm sp
      else if (
        !this.selectedOptions.length &&
        !this.Options_status.length &&
        this.multiSearch_masp == "" &&
        this.multiSearch_nhomsp != ""
      ) {
        this.lokehoachsx = await this.$axios.$get(
          `/api/lokehoach/filteronlynhomsp`,
          {
            params: {
              nhomsp: nhomsp,
            },
          }
        );
      }

      // lọc nhóm sp; mã sp
      else if (
        !this.selectedOptions.length &&
        !this.Options_status.length &&
        this.multiSearch_masp != "" &&
        this.multiSearch_nhomsp != ""
      ) {
        this.lokehoachsx = await this.$axios.$get(
          `/api/lokehoach/filternhomspmasp`,
          {
            params: {
              nhomsp: nhomsp,
              masp: masp,
            },
          }
        );
      }
    },

    // --------------------------------------------------------------------------------------
    // 3: Các hàm chức năng
    // thay đổi status
    async onChange_status(e, item) {
      // 0: chưa đk; 1: dự kiến đăng ký (DK); 2: sản xuất (SX); 3: hoàn thành (HT)
      var id = e.target.value;
      // var name = e.target.options[e.target.options.selectedIndex].text;
      // console.log('id ',id );
      // console.log('name ',name );
      // this.pageSize = id;
      let dt = id;
      // console.log(dt)
      this.status = dt;
      // console.log(item);
      // ĐOẠN NÀY LẬP LUẬN NHƯ SAU: CÓ CÁC TRH NÀY XẢY RA
      // 1: NẾU LÔ NÀO MÀ ĐÃ CÓ PHÁT SINH NHẬP LƯƠNG THÌ KHÔNG ĐƯỢC CHO TRỞ THÀNH TRẠNG THÁI ĐK
      // CHỈ CÓ THỂ THÀNH TRTH HT MÀ THÔI
      // 2: KHI MỘT LÔ CHƯA CÓ NHẬP LƯƠNG VÀ STATUS PHẢI KHÔNG BẰNG 3 THÌ MỚI ĐƯỢC CHO TRỞ VỀ THÀNH ĐK
      // ĐỂ LÀM ĐƯỢC ĐIỀU ĐÓ THÌ PHẢI SO SÁNH VỚI DB TRƯỚC KHI CHẤP NHẬN CHO ĐỔI TRẠNG THÁI LÔ SẢN XUẤT
      // TÌM XEM _ID CỦA LÔ SẢN XUẤT NÀY CÓ TRONG BẢNG LUONGCONGNHAN HAY KHÔNG?
      // TỰU CHUNG LẠI LÀ CÓ 2 ĐIỀU KIỆN: 1 LÀ NẾU _ID ĐÃ TỒN TẠI TRONG LUONGCONGDOAN; 2 LÀ STATUS ĐỔI THÀNH 3
      // LÀ KHÔNG ĐƯỢC ĐỔI TRẠNG THÁI NỮA
      // TIẾP ĐẾN LÀ NẾU ĐỔI 1 LÔ SANG SẢN XUẤT THÌ TÌM XEM LOKEHOACH CHA LÀ LÔ NÀO?
      // NẾU BẤT KỲ LÔ SẢN XUẤT NÀO LÀ SX THÌ LÔ KẾ HOẠCH PHÂN XƯỞNG CHA PHẢI THÀNH SX
      const exits = await this.$axios.$get(
        `/api/ketoan/getallluongcongdoaninlsx?_id_losx=${item._id}`
      );
      // console.log(exits)
      // console.log(data);

      if (exits.length > 0) {
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
            "Đã phát sinh vào lương không thể đổi thành trạng thái Đăng Ký hoặc 0",
        });
      } else {
        this.$axios.$patch(`/api/lokehoach/losanxuat/status/${item._id}`, item);
      }
    },

    // in PDF
    async printphieu(phieu) {
      // console.log(phieu)
      const doc = new jsPDF({
        orientation: "p",
        format: "a5",
      });
      let phanxuong;
      if (phieu.mapx == "AL_PXD" || phieu.mapx == "DV_PXD") {
        phanxuong = "DUC";
      } else if (phieu.mapx == "PXGC") {
        phanxuong = "GCC";
      } else if (phieu.mapx == "PXVSBMTL") {
        phanxuong = "VSBM";
      } else if (phieu.mapx == "PXS") {
        phanxuong = "SON";
      } else if (phieu.mapx == "PXLR") {
        phanxuong = "LAPRAP";
      }

      const moment = require("moment");
      const formattedDate = moment(phieu.ngaybd).format("DD/MM/YYYY");

      // công đoạn
      let arrayCongdoan;
      let px;

      if (phieu.mapx.trim() == "AL_PXD" || phieu.mapx.trim() == "DV_PXD") {
        px = "PXD";
        arrayCongdoan = await this.$axios.$get(
          `/api/ketoan/getnguyencong?khsp=${phieu.nhomluong}&px=${px}`
        );
      } else {
        arrayCongdoan = await this.$axios.$get(
          `/api/ketoan/getnguyencong?khsp=${phieu.nhomluong}&px=${phieu.mapx}`
        );
      }

      doc.rect(2, 5, 50, 8);
      doc.addFont("OpenSans-SemiBold-normal.ttf", "OpenSans-SemiBold", "bold");
      doc.setFont("OpenSans-SemiBold", "bold");
      doc.setFontSize(12);
      doc.text(`${phanxuong}`, 10, 10, {
        align: "center",
        fontWeight: "bold",
      });
      doc.text(`${formattedDate}`, 30, 10, {
        align: "center",
        fontWeight: "bold",
      });

      doc.rect(2 + 50, 5, 93, 8);
      doc.addFont("OpenSans-SemiBold-normal.ttf", "OpenSans-SemiBold", "bold");
      doc.setFont("OpenSans-SemiBold", "bold");
      doc.setFontSize(12);
      doc.text("PHIẾU LÔ SẢN XUẤT PHÂN XƯỞNG", 2 + 40 + 50, 5 + 6, {
        align: "center",
        fontWeight: "bold",
      });
      // logo
      doc.rect(2, 5 + 8, 20, 16);
      doc.addImage(require("~/assets/image/re_logo.png"), "PNG", 3, 14, 18, 14);
      // mã kế hoạch
      doc.rect(2 + 20, 5 + 8, 50, 16);
      doc.addFont("OpenSans-SemiBold-normal.ttf", "OpenSans-SemiBold", "bold");
      doc.setFont("OpenSans-SemiBold", "bold");
      doc.setFontSize(9);
      doc.text("Mã kế hoạch", 2 + 20 + 24, 20 + 2, {
        align: "center",
        fontWeight: "bold",
      });
      // ngày bắt đầu
      doc.rect(2 + 20 + 50, 5 + 8, 20, 16);
      doc.addFont("OpenSans-SemiBold-normal.ttf", "OpenSans-SemiBold", "bold");
      doc.setFont("OpenSans-SemiBold", "bold");
      doc.setFontSize(7);
      doc.text("Ngày bắt đầu", 2 + 20 + 60, 20 + 2, {
        align: "center",
      });
      // ngày kết thúc
      doc.rect(2 + 20 + 50 + 20, 5 + 8, 20, 16);
      doc.addFont("OpenSans-SemiBold-normal.ttf", "OpenSans-SemiBold", "bold");
      doc.setFont("OpenSans-SemiBold", "bold");
      doc.setFontSize(7);
      doc.text("Ngày kết thúc", 2 + 20 + 80, 20 + 2, {
        align: "center",
      });
      // số lượng đặt hàng
      doc.rect(2 + 20 + 50 + 20 + 20, 5 + 8, 17, 16);
      doc.addFont("OpenSans-SemiBold-normal.ttf", "OpenSans-SemiBold", "bold");
      doc.setFont("OpenSans-SemiBold", "bold");
      doc.setFontSize(7);
      doc.text("SL đặt hàng", 2 + 20 + 99, 20 + 2, {
        align: "center",
      });
      // số lượng sản xuất
      doc.rect(2 + 20 + 50 + 20 + 20 + 17, 5 + 8, 16, 16);
      doc.addFont("OpenSans-SemiBold-normal.ttf", "OpenSans-SemiBold", "bold");
      doc.setFont("OpenSans-SemiBold", "bold");
      doc.setFontSize(7);
      doc.text("SL sản xuất", 2 + 20 + 115, 20 + 2, {
        align: "center",
      });

      // hàng thứ 3
      doc.rect(2, 5 + 24, 20, 10);
      doc.addFont("OpenSans-SemiBold-normal.ttf", "OpenSans-SemiBold", "bold");
      doc.setFont("OpenSans-SemiBold", "bold");
      doc.setFontSize(9);
      doc.text("TOÀN LỰC", 12, 30 + 3, {
        align: "center",
        fontWeight: "bold",
      });
      doc.text("JSC", 12, 33 + 4, {
        align: "center",
        fontWeight: "bold",
      });
      doc.rect(2 + 20, 5 + 24, 50, 10);
      doc.addFont("OpenSans-SemiBold-normal.ttf", "OpenSans-SemiBold", "bold");
      doc.setFont("OpenSans-SemiBold", "bold");
      doc.setFontSize(10);
      doc.text(`${phieu.masp + "-" + phieu.makhpx}`, 46, 32 + 3, {
        align: "center",
        fontWeight: "bold",
      });
      // ngày bắt đầu
      // doc.rect(2 + 20 + 50, 5 + 24, 20, 10);
      // doc.addFont("OpenSans-SemiBold-normal.ttf", "OpenSans-SemiBold", "bold");
      // doc.setFont("OpenSans-SemiBold", "bold");
      // doc.setFontSize(7);
      // doc.text("Ngày bắt đầu", 2 + 20 + 60, 20 + 2, {
      //   align: "center",
      // });
      // ngày kết thúc
      // doc.rect(2 + 20 + 50 + 20, 5 + 24, 20, 10);
      // doc.addFont("OpenSans-SemiBold-normal.ttf", "OpenSans-SemiBold", "bold");
      // doc.setFont("OpenSans-SemiBold", "bold");
      // doc.setFontSize(7);
      // doc.text("Ngày kết thúc", 2 + 20 + 80, 20 + 2, {
      //   align: "center",
      // });
      // số lượng đặt hàng
      doc.rect(2 + 20 + 50 + 20 + 20, 5 + 24, 17, 10);
      doc.addFont("OpenSans-SemiBold-normal.ttf", "OpenSans-SemiBold", "bold");
      doc.setFont("OpenSans-SemiBold", "bold");
      doc.setFontSize(10);
      doc.text(`${phieu.soluong}`, 120, 35, {
        align: "center",
      });
      // số lượng sản xuất
      doc.rect(2 + 20 + 50 + 20 + 20 + 17, 5 + 24, 16, 10);
      // doc.addFont("OpenSans-SemiBold-normal.ttf", "OpenSans-SemiBold", "bold");
      // doc.setFont("OpenSans-SemiBold", "bold");
      // doc.setFontSize(7);
      // doc.text("SL sản xuất", 2 + 20 + 115, 20 + 2, {
      //   align: "center",
      // });

      // hàng thứ 4
      doc.rect(2, 5 + 34, 40, 16);
      doc.addFont("OpenSans-SemiBold-normal.ttf", "OpenSans-SemiBold", "bold");
      doc.setFont("OpenSans-SemiBold", "bold");
      doc.setFontSize(11);
      doc.text("Thẻ lưu trình", 2 + 20, 46, {
        align: "center",
      });
      doc.text("Công nghệ", 2 + 20, 51, {
        align: "center",
      });
      // mã sản phẩm mã bản vẽ
      doc.rect(2 + 40, 5 + 34, 70, 8);
      doc.addFont("OpenSans-SemiBold-normal.ttf", "OpenSans-SemiBold", "bold");
      doc.setFont("OpenSans-SemiBold", "bold");
      doc.setFontSize(9);
      doc.text("Mã sản phẩm / Mã bản vẽ", 2 + 40 + 32, 20 + 24, {
        align: "center",
      });
      doc.rect(2 + 40, 5 + 42, 70, 8);
      // phiên bản vẽ
      doc.rect(2 + 20 + 50 + 20 + 20, 5 + 34, 17, 8);
      doc.addFont("OpenSans-SemiBold-normal.ttf", "OpenSans-SemiBold", "bold");
      doc.setFont("OpenSans-SemiBold", "bold");
      doc.setFontSize(6);
      doc.text("Phiên bản", 2 + 40 + 78, 20 + 22, {
        align: "center",
      });
      doc.text("Bản vẽ", 2 + 40 + 78, 20 + 25, {
        align: "center",
      });
      doc.rect(2 + 20 + 50 + 20 + 20, 5 + 42, 17, 8);
      // ô tích phiên bản
      doc.rect(2 + 20 + 50 + 20 + 20 + 20, 5 + 35, 3, 2);
      doc.rect(2 + 20 + 50 + 20 + 20 + 20, 5 + 38, 3, 2);

      // dữ liệu mã sản phẩm
      doc.rect(2 + 20 + 50 + 20 + 37, 5 + 34, 16, 8);
      doc.addFont("OpenSans-SemiBold-normal.ttf", "OpenSans-SemiBold", "bold");
      doc.setFont("OpenSans-SemiBold", "bold");
      doc.setFontSize(13);
      doc.text(`${phieu.masp}`, 78, 53, {
        align: "center",
      });
      doc.rect(2 + 20 + 50 + 20 + 37, 5 + 42, 16, 8);

      // row 5
      doc.rect(2, 55, 70, 8);
      doc.addFont("OpenSans-SemiBold-normal.ttf", "OpenSans-SemiBold", "bold");
      doc.setFont("OpenSans-SemiBold", "bold");
      doc.setFontSize(9);
      doc.text("Danh mục sản phẩm", 37, 60, {
        align: "center",
      });
      doc.rect(2 + 70, 55, 40, 8);
      doc.addFont("OpenSans-SemiBold-normal.ttf", "OpenSans-SemiBold", "bold");
      doc.setFont("OpenSans-SemiBold", "bold");
      doc.setFontSize(8);
      doc.text("Vật liệu/Quy cách", 92, 60, {
        align: "center",
      });
      doc.rect(2 + 110, 55, 33, 8);
      doc.addFont("OpenSans-SemiBold-normal.ttf", "OpenSans-SemiBold", "bold");
      doc.setFont("OpenSans-SemiBold", "bold");
      doc.setFontSize(8);
      doc.text("Số lô vật liệu/Đầu vào", 129, 60, {
        align: "center",
      });

      // row 6
      doc.rect(2, 55 + 8, 70, 8);
      doc.addFont("OpenSans-SemiBold-normal.ttf", "OpenSans-SemiBold", "bold");
      doc.setFont("OpenSans-SemiBold", "bold");
      doc.setFontSize(10);
      doc.text("Lô:", 6, 68, {
        align: "center",
      });
      doc.text(`${phieu.malosx}`, 30, 68, {
        align: "center",
      });
      doc.setFontSize(8);
      doc.text(`${phieu._id}`, 60, 68, {
        align: "center",
      });
      doc.rect(2 + 70, 55 + 8, 40, 16);
      doc.rect(2 + 110, 55 + 8, 33, 16);

      // row 7
      doc.rect(2, 55 + 16, 70, 8);
      doc.addFont("OpenSans-SemiBold-normal.ttf", "OpenSans-SemiBold", "bold");
      doc.setFont("OpenSans-SemiBold", "bold");
      doc.setFontSize(10);
      doc.text("Số lượng: ", 12, 76, {
        align: "center",
      });
      doc.text(`${phieu.soluonglsx}`, 26, 76, {
        align: "center",
      });

      // row 8
      doc.rect(2, 55 + 16 + 8, 70, 16);
      doc.addFont("OpenSans-SemiBold-normal.ttf", "OpenSans-SemiBold", "bold");
      doc.setFont("OpenSans-SemiBold", "bold");
      doc.setFontSize(10);
      doc.text("Phân xưởng:", 14, 88, {
        align: "center",
      });
      doc.text(`${phanxuong}`, 34, 88, {
        align: "center",
      });
      doc.rect(2 + 70, 70 + 9, 73, 8);
      doc.addFont("OpenSans-SemiBold-normal.ttf", "OpenSans-SemiBold", "bold");
      doc.setFont("OpenSans-SemiBold", "bold");
      doc.setFontSize(8);
      doc.text(`Ngày sản xuất: `, 84, 84, {
        align: "center",
      });
      doc.rect(2 + 70, 79 + 8, 73, 8);
      doc.addFont("OpenSans-SemiBold-normal.ttf", "OpenSans-SemiBold", "bold");
      doc.setFont("OpenSans-SemiBold", "bold");
      doc.setFontSize(8);
      doc.text(`Ngày hoàn thành: `, 86, 92, {
        align: "center",
      });

      // table data
      let yPoint = 95; // tọa độ y
      let textyPoint = 100; // tọa độ chữ
      const lengthPrint = 12; // độ dài của bảng dữ liệu in ra
      const heightRow = 8; // độ cao của dòng
      doc.rect(2, yPoint, 8, heightRow); // 2: toạn độ x; 105: tọa độ y; 8: độ rộng; 10: độ cao
      doc.addFont("OpenSans-SemiBold-normal.ttf", "OpenSans-SemiBold", "bold");
      doc.setFont("OpenSans-SemiBold", "bold");
      doc.setFontSize(9);
      doc.text("STT", 6, textyPoint, {
        align: "center",
      });
      doc.rect(2 + 8, yPoint, 10, heightRow);
      doc.addFont("OpenSans-SemiBold-normal.ttf", "OpenSans-SemiBold", "bold");
      doc.setFont("OpenSans-SemiBold", "bold");
      doc.setFontSize(9);
      doc.text("Máy", 15, textyPoint, {
        align: "center",
      });
      doc.rect(2 + 18, yPoint, 20, heightRow);
      doc.addFont("OpenSans-SemiBold-normal.ttf", "OpenSans-SemiBold", "bold");
      doc.setFont("OpenSans-SemiBold", "bold");
      doc.setFontSize(9);
      doc.text("Công đoạn", 30, textyPoint, {
        align: "center",
      });
      doc.rect(2 + 38, yPoint, 32, heightRow);
      doc.addFont("OpenSans-SemiBold-normal.ttf", "OpenSans-SemiBold", "bold");
      doc.setFont("OpenSans-SemiBold", "bold");
      doc.setFontSize(9);
      doc.text("Người thực hiện", 55, textyPoint, {
        align: "center",
      });
      doc.rect(2 + 70, yPoint, 20, heightRow);
      doc.addFont("OpenSans-SemiBold-normal.ttf", "OpenSans-SemiBold", "bold");
      doc.setFont("OpenSans-SemiBold", "bold");
      doc.setFontSize(9);
      doc.text("Số đạt", 82, textyPoint, {
        align: "center",
      });
      doc.rect(2 + 90, yPoint, 20, heightRow);
      doc.addFont("OpenSans-SemiBold-normal.ttf", "OpenSans-SemiBold", "bold");
      doc.setFont("OpenSans-SemiBold", "bold");
      doc.setFontSize(9);
      doc.text("Số hỏng", 101, textyPoint, {
        align: "center",
      });
      doc.rect(2 + 110, yPoint, 33, heightRow);
      doc.addFont("OpenSans-SemiBold-normal.ttf", "OpenSans-SemiBold", "bold");
      doc.setFont("OpenSans-SemiBold", "bold");
      doc.setFontSize(9);
      doc.text("Ghi chú", 128, textyPoint, {
        align: "center",
      });

      // + 8 ở tọa độ y là thêm được 1 dòng nếu dùng vòng lặp
      // vậy đặt biến là tọa độ y
      // lặp cái mảng arrCongdoan
      // console.log(arrayCongdoan); // in ra 14 dòng bất kể chiều dài mảng
      for (let i = 0; i < lengthPrint; i++) {
        textyPoint = textyPoint + 8;
        yPoint = yPoint + 8;
        if (i < arrayCongdoan.length) {
          // Vẽ các rect có dữ liệu chữ
          doc.rect(2, yPoint, 8, heightRow);
          doc.addFont(
            "OpenSans-SemiBold-normal.ttf",
            "OpenSans-SemiBold",
            "bold"
          );
          doc.setFont("OpenSans-SemiBold", "bold");
          doc.setFontSize(7);
          doc.text(`${i + 1}`, 6, textyPoint, { align: "center" });
          doc.rect(2 + 8, yPoint, 10, heightRow);
          doc.rect(2 + 18, yPoint, 20, heightRow);
          doc.addFont(
            "OpenSans-SemiBold-normal.ttf",
            "OpenSans-SemiBold",
            "bold"
          );
          doc.setFont("OpenSans-SemiBold", "bold");
          doc.setFontSize(9);
          doc.text(`${arrayCongdoan[i].congdoan}`, 30, textyPoint, {
            align: "center",
          });
          doc.rect(2 + 38, yPoint, 32, heightRow);
          doc.rect(2 + 70, yPoint, 20, heightRow);
          doc.rect(2 + 90, yPoint, 20, heightRow);
          if (i > 0) {
            doc.rect(2 + 110, yPoint, 33, heightRow);
            doc.setDrawColor(255, 255, 255);
            doc.line(2 + 110, yPoint, 2 + 110 + 33, yPoint);
            doc.setDrawColor(0, 0, 0);
          } else {
            doc.rect(2 + 110, yPoint, 33, heightRow);
          }
        } else {
          // Vẽ các rect trống không có dữ liệu chữ
          doc.rect(2, yPoint, 8, heightRow);
          doc.addFont(
            "OpenSans-SemiBold-normal.ttf",
            "OpenSans-SemiBold",
            "bold"
          );
          doc.setFont("OpenSans-SemiBold", "bold");
          doc.setFontSize(7);
          doc.text(`${i + 1}`, 6, textyPoint, { align: "center" });
          doc.rect(2 + 8, yPoint, 10, heightRow);
          doc.rect(2 + 18, yPoint, 20, heightRow);
          doc.rect(2 + 38, yPoint, 32, heightRow);
          doc.rect(2 + 70, yPoint, 20, heightRow);
          doc.rect(2 + 90, yPoint, 20, heightRow);
          doc.rect(2 + 110, yPoint, 33, heightRow);
          doc.setDrawColor(255, 255, 255);
          doc.line(2 + 110, yPoint, 2 + 110 + 33, yPoint);
          doc.setDrawColor(0, 0, 0);
        }
      }

      // vẽ rect cuối cùng của phiếu lô
      doc.rect(2, 199, 143, 9);
      doc.addFont("OpenSans-SemiBold-normal.ttf", "OpenSans-SemiBold", "bold");
      doc.setFont("OpenSans-SemiBold", "bold");
      doc.setFontSize(8);
      doc.text("Tổ trưởng", 30, 202, { align: "center" });
      doc.text("QC", 75, 202, { align: "center" });
      doc.text("KHSX", 110, 202, { align: "center" });

      // Lưu file PDF trên một tab mới
      doc.output("dataurlnewwindow");
      // doc.save("a4.pdf");
    },

    // --------------------------------------------------------------------------------------
    // 4: Các hàm CRUD
    // update status, ngay bd, ngay kt của 1 lô sản xuất
    async onUpdateLosx(data) {
      // console.log(data)
      try {
        // Đầu tiên là cập nhật ngày bắt đầu và ngày kết thúc cho cái lô sản xuất được thay đổi
        // const ngaybdktData = {
        //   ngaybd: data.ngaybd,
        //   ngaykt: data.ngaykt,
        // };
        // await this.$axios.$patch(
        //   `/api/ketoan/updatengaybdngayktlosx/${data._id}`,
        //   ngaybdktData
        // );

        // tìm xem có bao nhiêu lô sản xuất trong lô kế hoạch phân xưởng
        const losxs = await this.$axios.$get(
          `/api/ketoan/checklosanxuatstussx?_id_khpx=${
            data._id_khpx
          }&random=${Math.random()}`
        );
        // tìm xem có bao nhiêu lô sản xuất trong lô kế hoạch phân xưởng tt bang sx
        const checkdate = await this.$axios.$get(
          `/api/ketoan/checklosanxuatstussxtrangthai2?_id_khpx=${data._id_khpx}`
        );

        // console.log(losxs);
        // tìm ngày bắt đầu bé nhất và ngày kết thúc lớn nhất các trong lô sản xuất
        // luu y chi so trong nhung lo co trang thai la sx ma thoi. bo qua dk
        if (checkdate.length > 0) {
          const ngaybdMin = checkdate.reduce(
            (min, item) => (item.ngaybd < min ? item.ngaybd : min),
            checkdate[0].ngaybd
          );
          const ngayktMax = checkdate.reduce(
            (max, item) => (item.ngaykt > max ? item.ngaykt : max),
            checkdate[0].ngaykt
          );
          // console.log(ngaybdMin)
          // alert(ngaybdMin)
          // console.log(ngayktMax)
          // update ngaybdtt trong khpx tai _id tu data._id_khpx
          const dataUpdate = { ngaybdthucte: ngaybdMin };
          // console.log(dataUpdate)
          // ở đây là cập nhật cái ngày thực tế của lô kế hoạch phân xưởng
          // sau khi tính toán so sánh các ngày trong lô sản xuất
          await this.$axios.$patch(
            `/api/ketoan/updatelokehoachngaybdtt/${data._id_khpx}`,
            dataUpdate
          );
        }

        // cập nhật luôn ngày bắt đầu thực tế cho lokehoachphanxuong bằng ngày bé nhất
        // nếu có bất kỳ phần tử nào là bé nhất và cập nhật ngày kết thúc thực tế = ngày lớn nhất
        // nếu tất cả các lô là HT
        // check xem trong toàn bộ lô sinh ra từ mã kế hoạch phân xưởng đó
        // có lô nào đang sx không? nếu có thì chuyển trạng thái lô kế hoạch phân xưởng thành sx luôn
        const hasStatusTwo = losxs.some((item) => item.status === 2);
        const isAllStatus3 = losxs.every((item) => item.status === 3);
        // console.log(isAllStatus3); // false
        // console.log(hasStatusTwo);
        if (hasStatusTwo == true) {
          this.$axios.$patch(
            `/api/lokehoach/lokehoach/status2/${data._id_khpx}`
          );
        } else {
          this.$axios.$patch(
            `/api/lokehoach/lokehoach/status1/${data._id_khpx}`
          );
        }
        if (isAllStatus3 == true) {
          this.$axios.$patch(
            `/api/lokehoach/lokehoach/status3/${data._id_khpx}`
          );
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
          title: "Đã cập nhật",
        });

        if (
          !this.selectedOptions.length &&
          this.multiSearch_masp == "" &&
          this.multiSearch_nhomsp == "" &&
          !this.Options_status.length &&
          !this.selectedOptions_to.length
        ) {
          this.showAllLokhsx();
        } else {
          this.filterData();
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
    },
  },
};
</script>

<style scoped>
.table_wrapper {
  /* display: block; */
  /* overflow-x: auto; */
  white-space: nowrap;
}

.table_wrapper {
  position: sticky;
  left: 0;
  background-color: whitesmoke;
}

.modal-content,
.modal-card {
  width: 1320px;
  height: 800px;
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
  background-color: #fffaeb;
}

.select-wrapper {
  position: relative;
  width: 170px;
}

.select-wrapper-status {
  position: relative;
  width: 200px;
}

.select-wrapper-to {
  position: relative;
  width: 150px;
}

.select-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  background-color: #f2f2f2;
  border: 1px solid #ddd;
  cursor: pointer;
  height: 29px;
  text-align: center;
  color: #cb4b10;
  font-weight: 700;
}

.arrow {
  border-style: solid;
  border-width: 0.15em 0.15em 0 0;
  content: "";
  display: inline-block;
  height: 0.45em;
  left: 0.25em;
  position: relative;
  top: 0.25em;
  transform: rotate(-45deg);
  vertical-align: top;
  width: 0.45em;
}

.arrow.open {
  transform: rotate(135deg);
}

.select-options {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: #fff;
  border: 1px solid #ddd;
  z-index: 1;
  padding-top: 5px;
  padding-left: 5px;
  padding-bottom: 5px;
  text-align: left;
}

.select-options.open {
  display: block;
}

.pagination {
  display: flex;
  justify-content: center;
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

.autocomplete {
  position: relative;
}

.autocomplete-items {
  position: absolute;
  background-color: white;
  border: 1px solid #d4d4d4;
  border-bottom: none;
  border-top: none;
  z-index: 99;
  top: 100%;
  left: 0;
  right: 0;
}

.autocomplete-item {
  padding: 4px;
  cursor: pointer;
  border-bottom: 1px solid #d4d4d4;
  font-size: small;
}

.autocomplete-item:hover {
  background-color: #fffaeb;
}
</style>
