<template>
  <div class="column">
    <br />
    <div class="box" style="margin-left: 2px; margin-right: 2px">
      <div class="columns">
        <div class="column">
          <div class="control">
            <span class="icon is-small is-left">
              <i style="color: #ff55acee" class="fas fa-calendar-alt"></i>
            </span>
            <span style="color: #3850b7; font-size: 15px; font-weight: bold"
              >Chọn lô kế hoạch để sản xuất</span
            >
          </div>
        </div>
      </div>

      <!-- <div class="columns">
          <div class="column" style="display: flex; align-items: center">
            <label
              class="checkbox-label"
              style="display: flex; align-items: center; margin-right: 10px"
            >
              <input type="checkbox" v-model="isFilter" />
              &nbsp;
              <span style="font-weight: bold; font-size: small; color: brown"
                >Hiển thị bộ lọc</span
              >
            </label>
          </div>
        </div> -->

      <div class="box">
        <div class="columns">
          <div class="column">
            <div class="select-wrapper" style="width: 100%; font-size: small">
              <div class="select-header" @click="isOpen = !isOpen">
                {{
                  selectedOptions.length > 0
                    ? selectedOptions.join(", ")
                    : "Phân xưởng"
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
          </div>
          <div class="column">
            <div class="select-wrapper" style="width: 100%; font-size: small">
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
          </div>
          <div class="column">
            <div class="autocomplete">
              <input
                class="input is-small is-info"
                type="text"
                v-model="multiSearch_nhomtp"
                @input="onInput_nhomsp"
                placeholder="Nhóm thành phẩm"
              />
              <div class="autocomplete-items" v-if="suggestions_nhomtp.length">
                <div
                  class="autocomplete-item"
                  v-for="suggestion_nhomtp in suggestions_nhomtp"
                  @click="selectSuggestion_nhomsp(suggestion_nhomtp)"
                >
                  {{ suggestion_nhomtp }}
                </div>
              </div>
            </div>
          </div>
          <div class="column">
            <div class="autocomplete">
              <input
                class="input is-small is-danger"
                type="text"
                v-model="multiSearch_matp"
                @input="onInput_matp"
                placeholder="Mã thành phẩm"
              />
              <div class="autocomplete-items" v-if="suggestions_matp.length">
                <div
                  class="autocomplete-item"
                  v-for="suggestion_matp in suggestions_matp"
                  @click="selectSuggestion_matp(suggestion_matp)"
                >
                  {{ suggestion_matp }}
                </div>
              </div>
            </div>
          </div>
          <div class="column">
            <button
              @click="filterData"
              class="button is-small is-success is-fullwidth"
            >
              Lọc dữ liệu
            </button>
          </div>
          <div class="column">
            <input
              class="input is-danger is-small"
              type="number"
              id="itemsPerPage"
              v-model.number="itemsPerPage"
              min="1"
              max="10"
            />
          </div>
          <div class="column">
            <vue-excel-xlsx
              :data="lokehoachpx"
              :columns="columns"
              :file-name="'lokehoachphanxuong'"
              :file-type="'xlsx'"
              :sheet-name="'Lô kế hoạch phân xưởng'"
              style="width: 100%"
            >
              Download Excel
            </vue-excel-xlsx>
          </div>
        </div>

        <div class="columns">
          <div
            class="column"
            style="font-size: small; font-weight: bold; text-align: left"
          >
            <span
              >Có: <span style="color: red">{{ lokehoachpx.length }}</span> bản
              ghi</span
            >
          </div>
          <div class="column"></div>

          <!-- <div class="column">
              <button
                @click="showAllLokhpx"
                class="button is-small is-danger is-fullwidth"
              >
                Refresh
              </button>
            </div> -->
        </div>
      </div>

      <div class="table_wrapper">
        <table class="table is-responsive is-bordered is-narrow is-fullwidth">
          <tr style="background-color: linen">
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
            <td
              @click="sortTable('nhomthanhpham')"
              style="
                font-size: small;
                text-align: center;
                font-weight: 600;
                width: 4%;
              "
            >
              Nhóm TP
            </td>
            <td
              @click="sortTable('mathanhpham')"
              style="
                font-size: small;
                text-align: center;
                font-weight: 600;
                width: 4%;
              "
            >
              Mã TP
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
              @click="sortTable('maspkhpx')"
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
              @click="sortTable('tuanbdkhpx')"
              style="
                font-size: small;
                text-align: center;
                font-weight: 600;
                width: 8%;
              "
            >
              T1
            </td>
            <td
              @click="sortTable('tuanktkhpx')"
              style="
                font-size: small;
                text-align: center;
                font-weight: 600;
                width: 8%;
              "
            >
              T2
            </td>
            <td
              @click="sortTable('soluongkhpx')"
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
              @click="sortTable('ttqt')"
              style="
                font-size: small;
                text-align: center;
                font-weight: 600;
                width: 7%;
              "
            >
              TTQT
            </td>
            <td
              @click="sortTable('status')"
              style="
                font-size: small;
                text-align: center;
                font-weight: 600;
                width: 5%;
              "
            >
              Status
            </td>
            <td
              style="
                font-size: small;
                text-align: center;
                font-weight: 600;
                width: 7%;
              "
            >
              Chọn TT
            </td>
            <td
              style="
                font-size: small;
                text-align: center;
                font-weight: 600;
                width: 7%;
              "
            >
              Tuần Chạy
            </td>
            <td
              style="
                font-size: small;
                text-align: center;
                font-weight: 600;
                width: 7%;
              "
            >
              Đã ĐK
            </td>
            <td
              style="
                font-size: small;
                text-align: center;
                font-weight: 600;
                width: 7%;
              "
            >
              SL TH
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
              style="
                font-size: small;
                text-align: center;
                font-weight: 600;
                width: 7%;
              "
            >
              Ngày BDTT
            </td>
            <td
              style="
                font-size: small;
                text-align: center;
                font-weight: 600;
                width: 5%;
              "
            >
              Ngày KTTT
            </td>
            <td
              style="
                font-size: small;
                text-align: center;
                font-weight: 600;
                width: 7%;
              "
            >
              Ghi
            </td>
          </tr>
          <tr v-for="(item, index) in paginatedTable" :key="index + 'llllkiq'">
            <td style="font-size: small; text-align: center">
              {{ index + 1 }}
            </td>
            <td style="font-size: small">{{ item.malonhamay }}</td>
            <td style="font-size: small; text-align: center">
              {{ item.mapx }}
            </td>
            <td style="font-size: small; text-align: center">
              {{ item.nhomthanhpham }}
            </td>
            <td style="font-size: small; text-align: center">
              {{ item.mathanhpham }}
            </td>
            <td style="font-size: small; text-align: center">
              {{ item.nhomspkhpx }}
            </td>
            <td style="font-size: small; text-align: center">
              {{ item.maspkhpx }}
            </td>
            <td style="font-size: small; text-align: center">
              {{ item.tuanbdkhpx }}
            </td>
            <td style="font-size: small; text-align: center">
              {{ item.tuanktkhpx }}
            </td>
            <td style="font-size: small; text-align: center">
              {{ item.soluongkhpx | formatNumber }}
            </td>
            <td style="font-size: small; text-align: center">
              {{ item.ttqt }}
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
                v-else-if="item.status == 0"
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
                    background-color: gray;
                    padding-left: 7px;
                    padding-right: 7px;
                  "
                  >0</span
                >
              </td>
            </template>

            <td style="font-size: small">
              <div class="select is-small is-fullwidth">
                <select
                  id=""
                  @change="onChange_status($event, item)"
                  v-model="item.status"
                >
                  <option value="1">DK</option>
                  <option value="0">0</option>
                </select>
              </div>
            </td>
            <td style="font-size: small; text-align: center">
              <input
                v-model="item.tuanexc"
                type="number"
                class="input is-danger is-small"
              />
            </td>
            <td style="font-size: small; text-align: center">
              {{ item.tong_soluong }}
            </td>
            <td style="font-size: small; text-align: center">
              {{ item.tongso_luongnhanh }}
            </td>
            <td style="font-size: small; text-align: center">
              {{ item.tongso_dat }}
            </td>
            <td style="font-size: small; text-align: center">
              {{ item.tongso_hong }}
            </td>
            <td style="font-size: small; text-align: center">
              {{ item.ngaybdthucte | formatDate }}
            </td>
            <td style="font-size: small; text-align: center">
              <input
                @blur="updateHoanthanh($event.target.value, item)"
                :value="formattedNgayhoanthanhtt(item)"
                type="date"
                class="input is-small"
              />
            </td>
            <td>
              <a @click="onUpdate_lokhpx(item)">
                <span style="color: green" class="icon is-small">
                  <i class="far fa-check-circle"></i>
                </span>
              </a>
            </td>
          </tr>
        </table>
      </div>
      <div class="columns">
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
    </div>
    <!-- Modal progress-->
    <div class="">
      <div :class="{ 'is-active': isActive_loading }" class="modal">
        <div class="modal-background"></div>
        <div class="modal-content modal-card-predata">
          <section class="modal-card-body">
            <div>
              <span style="font-size: small; font-weight: bold; color: #00947e"
                >Đang load dữ liệu - Xin chờ đợi ....</span
              >
            </div>
            <div>
              <progress class="progress is-small is-danger" max="100">
                15%
              </progress>
            </div>
          </section>
        </div>
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
      // dữ liệu
      lokehoachpx: [],
      phanxuong: [],
      showLophanxuong: [], // khi bấm vào lô kế hoạch phân xưởng nào đó sẽ lưu thông tin lô đó vào biến này
      losanxuat: [], // lưu lô sản xuất

      search_maxuong_multi: "",
      search_tenxuong_multi: "",

      // lọc talble
      sortDirection: 1,
      sortKey: "ttqt",
      currentPage: 1,
      itemsPerPage: 10,

      // gán biến status
      status: 0,
      isActive_loading: false,
      // select custom
      selectedOptions: [],
      Options_status: [],
      isOpen: false,
      isOpenst: false,
      statusArr: [
        { masta: 1, tensta: "DK" },
        { masta: 2, tensta: "SX" },
        { masta: 3, tensta: "HT" },
        { masta: 0, tensta: "0" },
      ],
      multiSearch_masp: "",
      // lọc thay mã sp thành mã thành phẩm
      multiSearch_matp: "",
      multiSearch_nhomtp: "",

      isFilter: false,
      // suggest input nhóm sản phẩm và mã sản phẩm
      suggestions: [],
      suggestions_nhomtp: [],
      suggestions_matp: [],
      maspinlokehoach: [],
      matpinlokehoach: [],
      nhomtpinlokehoach: [],

      // hiển thị đăng ký lô sản xuất
      checkViewRegLsx: false,
      isaddlosx: 0,
      // items lô sản xuất
      items: [
        {
          kehoachnam: "",
          makh: "",
          makhpx: "",
          malosx: "",
          mapx: "",
          tenpx: "",
          mato: "",
          tento: "",
          masp: "",
          tensp: "",
          soluong: "",
          nhomluong: "",
          soluonglsx: "",
          ngaybd: "",
          ngaykt: "",
          tongdat: "",
          tonghong: "",
          ghichu: "",
          createdAt: null,
          createdBy: "",
          status: 0,
          datinhluong: 0,
          stopday_losx: "",
          nhomto: [
            {
              maxuong: "",
              tenxuong: "",
              tento: "",
              mato: "",
            },
          ],
        },
      ],
      tonhom: [], // lưu lại tổ nhóm
      nhomluong: [], // lưu nhóm lương

      // xuất execl lô nhà máy
      columns: [
        {
          label: "Kế hoạch năm",
          field: "kehoachnam",
          // dataFormat: this.trimData
        },
        {
          label: "Mã lô nhà máy",
          field: "malonhamay",
          /* dataFormat: this.priceFormat */
          // dataFormat: this.trimData
        },
        {
          label: "Số lượng lô nhà máy",
          field: "soluonglonm",
        },
        {
          label: "Tuần bắt đầu lô nhà máy",
          field: "tuanbdlonm",
          // dataFormat: this.prefixformatDate
        },
        {
          label: "Tuần kết thúc lô nhà máy",
          field: "tuanktlonm",
        },
        {
          label: "Ngày bắt đầu lô nhà máy",
          field: "ngaybdlonm",
          dataFormat: this.prefixformatDate,
        },
        {
          label: "Ngày kết thúc lô nhà máy",
          field: "ngayktlonm",
          dataFormat: this.prefixformatDate,
        },
        {
          label: "Mã thành phẩm",
          field: "mathanhpham",
          // dataFormat: this.trimData
        },

        {
          label: "Tên thành phẩm",
          field: "tenthanhpham",
          // dataFormat: this.trimData
        },
        {
          label: "Nhóm thành thẩm",
          field: "nhomthanhpham",
          // dataFormat: this.trimData
        },
        {
          label: "Mã phân xưởng",
          field: "mapx",
          // dataFormat: this.trimData
        },
        {
          label: "Tên phân xưởng",
          field: "tenpx",
          // dataFormat: this.trimData
        },
        {
          label: "Mã tổ",
          field: "mato",
          // dataFormat: this.trimData
        },
        {
          label: "Tên tổ",
          field: "tento",
          // dataFormat: this.trimData
        },
        {
          label: "Mã sản phẩm KHPX",
          field: "maspkhpx",
          // dataFormat: this.trimData
        },
        {
          label: "Tên sản phẩm KHPX",
          field: "tenspkhpx",
          // dataFormat: this.trimData
        },
        {
          label: "Nhóm SP KHPX",
          field: "nhomspkhpx",
          // dataFormat: this.trimData
        },
        {
          label: "Mã KHPX",
          field: "makhpx",
          // dataFormat: this.trimData
        },
        {
          label: "Số lượng KHPX",
          field: "soluongkhpx",
          // dataFormat: this.trimData
        },
        {
          label: "Tuần bắt đầu KHPX",
          field: "tuanbdkhpx",
          // dataFormat: this.trimData
        },
        {
          label: "Tuần kết thúc KHPX",
          field: "tuanktkhpx",
          // dataFormat: this.trimData
        },
        {
          label: "Tuần bắt đầu TT",
          field: "tuanbdthucte",
          // dataFormat: this.trimData
        },
        {
          label: "Tuần kết thúc TT",
          field: "tuanktthucte",
          // dataFormat: this.trimData
        },
        {
          label: "Ngày bắt đầu TT",
          field: "ngaybdthucte",
          dataFormat: this.prefixformatDate,
        },
        {
          label: "Ngày hoàn thành TT",
          field: "ngayhoanthanhtt",
          dataFormat: this.prefixformatDate,
        },
        {
          label: "TTQT",
          field: "ttqt",
          // dataFormat: this.trimData
        },
        {
          label: "Nhóm lương",
          field: "nhomluong",
          // dataFormat: this.trimData
        },
        {
          label: "Trạng thái",
          field: "status",
          // dataFormat: this.trimData
        },
        {
          label: "Ghi chú",
          field: "ghichu",
          // dataFormat: this.trimData
        },
        {
          label: "Ngày tạo",
          field: "createdAt",
          dataFormat: this.prefixformatDate,
        },
        {
          label: "Ngày tạo",
          field: "updatedAt",
          dataFormat: this.prefixformatDate,
        },
        {
          label: "Người tạo",
          field: "createdBy",
        },
        {
          label: "Công suất",
          field: "congsuat",
        },
        {
          label: "Số ngày",
          field: "songay",
        },
        {
          label: "Máy",
          field: "may",
        },
      ],
    };
  },

  mounted() {
    // this.showAllLokhpx();
    this.showAllPx();
    this.maspinlkh();
    this.matpinlkh();
    this.nhomtpinlkh();
  },

  computed: {
    // phân trang và sắp xếp
    sortedTable() {
      return this.lokehoachpx.sort((a, b) => {
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
    formattedNgayhoanthanhtt() {
      return function (item) {
        if (!item.ngayhoanthanhtt) return "";
        const date = new Date(item.ngayhoanthanhtt);
        const year = date.getFullYear();
        const month = ("0" + (date.getMonth() + 1)).slice(-2);
        const day = ("0" + date.getDate()).slice(-2);
        return `${year}-${month}-${day}`;
      };
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

  watch: {
    itemsPerPage() {
      this.currentPage = 1;
    },
  },

  methods: {
    // --------------------------------------------------------------------------------------
    // 1: Các hàm hỗ trợ tính toán; lọc ...
    // suggest input mã sản phẩm
    onInput() {
      if (!this.multiSearch_masp) {
        this.suggestions = [];
        return;
      }
      const MAX_SUGGESTIONS = 5; // Số lượng suggest tối đa
      this.suggestions = this.maspinlokehoach
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
    // end suggest mã sản phẩm
    // suggest input mã thành phẩm
    onInput_matp() {
      if (!this.multiSearch_matp) {
        this.suggestions_matp = [];
        return;
      }
      const MAX_SUGGESTIONS = 5; // Số lượng suggest tối đa
      this.suggestions_matp = this.matpinlokehoach
        .map((c) => c.mathanhpham)
        .filter((mathanhpham) =>
          mathanhpham
            .toLowerCase()
            .includes(this.multiSearch_matp.toLowerCase())
        )
        .map((mathanhpham) => mathanhpham.trim())
        .slice(0, MAX_SUGGESTIONS);
    },
    selectSuggestion_matp(suggestion_matp) {
      this.multiSearch_matp = suggestion_matp;
      this.suggestions_matp = [];
    },
    // end suggest mã thành phẩm
    // suggest input nhóm sản phẩm
    onInput_nhomsp() {
      if (!this.multiSearch_nhomtp) {
        this.suggestions_nhomtp = [];
        return;
      }
      const MAX_SUGGESTIONS = 10; // Số lượng suggest tối đa
      this.suggestions_nhomtp = this.nhomtpinlokehoach
        .map((c) => c.nhomthanhpham)
        .filter((nhomthanhpham) =>
          nhomthanhpham
            .toLowerCase()
            .includes(this.multiSearch_nhomtp.toLowerCase())
        )
        .map((nhomthanhpham) => nhomthanhpham.trim())
        .slice(0, MAX_SUGGESTIONS);
    },
    selectSuggestion_nhomsp(suggestion_nhomtp) {
      this.multiSearch_nhomtp = suggestion_nhomtp;
      this.suggestions_nhomtp = [];
    },
    // end suggest nhóm sản phẩm
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
    // hàm bind v-model input type date
    getDate(value) {
      if (!value) {
        return null;
      }
      return new Date(value);
    },

    // --------------------------------------------------------------------------------------
    // 2: Các hàm lấy dữ liệu từ server qua API
    // Lấy danh sách tất cả các lô kế hoạch phân xưởng sắp xếp theo phân xưởng
    async showAllLokhpx() {
      this.isActive_loading = true;
      // const res = await this.$axios.$get(
      //   `/api/lokehoach/getallkehoachphanxuong_chonlkhdesx`
      // );
      const res = await this.$axios.$get(
        `/api/lokehoach/getallkehoachphanxuong_chonlkhdesx_pagi`
      );
      // console.log(res.results);
      if (res.results.length > 0) {
        this.lokehoachpx = res.results;
        this.isActive_loading = false;
      }
      this.multiSearch_masp = "";
      this.multiSearch_matp = "";
      this.multiSearch_nhomtp = "";
      this.Options_status = [];
      this.selectedOptions = [];
      this.isOpen = false;
      this.isOpenst = false;
    },
    // lấy thông tin phân xưởng
    async showAllPx() {
      this.phanxuong = await this.$axios.$get(`/api/phongban/allphanxuong`);
    },
    // lấy mã sản phẩm và nhóm sản phẩm trong lô kế hoạch phân xưởng
    async maspinlkh() {
      this.maspinlokehoach = await this.$axios.$get(
        "/api/lokehoach/hmsanphamlokhpx"
      );
    },
    // lấy mã thành phẩm, mã sp và nhóm sản phẩm trong lô kế hoạch phân xưởng
    async matpinlkh() {
      this.matpinlokehoach = await this.$axios.$get(
        "/api/lokehoach/matpinlokhpx"
      );
    },
    async maspinlkh() {
      this.maspinlokehoach = await this.$axios.$get(
        "/api/lokehoach/hmsanphamlokhpx"
      );
    },
    async nhomtpinlkh() {
      this.nhomtpinlokehoach = await this.$axios.$get(
        "/api/lokehoach/nhomthanhphamlokhpx"
      );
      // console.log(this.nhomtpinlokehoach)
    },

    // --------------------------------------------------------------------------------------
    // 3: Các hàm chức năng
    // Đổi trạng thái cho lô kế hoạch phân xưởng (sau này yêu cầu đổi toàn bộ lô cùng mã hiệu)
    async onChange_status(e, data) {
      console.log(data.status);
    },

    async onChange_status1(e, data) {
      // console.log(data)
      // 0: chưa đk; 1: dự kiến đăng ký (DK); 2: sản xuất (SX); 3: hoàn thành (HT)
      var id = e.target.value;
      // var name = e.target.options[e.target.options.selectedIndex].text;
      // console.log('id ',id );
      // console.log('name ',name );
      // this.pageSize = id;
      let dt = id;
      // console.log(dt)
      this.status = dt;
      const previousStatus = data.status; // Lưu giá trị trước đó
      console.log(data);

      const newStatus = e.target.value;
      // console.log(data);
      // ĐOẠN NÀY LẬP LUẬN NHƯ SAU: CÓ CÁC TRH NÀY XẢY RA
      // muốn đổi trạng thái của lô kế hoạch phân xưởng cần phải đáp ứng các điều kiện như sau
      // chỉ được đổi từ đk thành sản xuất hoặc từ đk thành 0
      // muốn đổi từ sản xuất cần phải xem xét các điều kiện. vì nếu đổi từ sản xuất thành dk
      // thì phải xem các lô sản xuất đang làm đến đâu rồi. nếu như lô sản xuất mà có bất kỳ lô nào
      // đang ở trạng thái sản xuất thì lô phân xưởng đó đương nhiên là đang sx chứ k thể đổi thành đk
      // vậy cần kiểm tra số liệu của lô sản xuất có trạng thái sx hay không?
      // tìm xem có bao nhiêu lô sản xuất trong lô kế hoạch phân xưởng
      // TÓM LẠI LÀ CHỖ NÀY CHỈ CHO PHÉP ĐỔI SANG ĐĂNG KÝ. CÒN PHẦN SẢN XUẤT SẼ TỰ ĐỘNG ĐỔI KHI LÔ SẢN XUẤT ĐƯỢC
      // CHUYỂN THÀNH SX
      // tìm xem có bao nhiêu lô sản xuất trong lô kế hoạch phân xưởng

      // const losxs = await this.$axios.$get(
      //   `/api/ketoan/checklosanxuatstussx?_id_khpx=${
      //     data._id
      //   }&random=${Math.random()}`
      // );
      // console.log(losxs);
      // check xem trong toàn bộ lô sinh ra từ mã kế hoạch phân xưởng đó
      // có lô nào đang sx không? nếu có thì chuyển trạng thái lô kế hoạch phân xưởng thành sx luôn
      // const hasStatusTwo = losxs.some((item) => item.status === 2);
      // console.log(isAllStatus3); // false
      // console.log(hasStatusTwo);
      // if (hasStatusTwo == true) {
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
      //     icon: "error",
      //     title:
      //       "Lô phân xưởng này đang có Lô sản xuất thực hiện không thể chuyển về trạng thái ĐK !!!",
      //   });
      // } else {
      //   this.$axios.$patch(
      //     `/api/lokehoach/updatelokehoachpxatdangkylodesanxuat/${data._id}`,
      //     data
      //   );
      // }

      // ĐIỀU CHỈNH CHẾ ĐỘ CẬP NHẬT TRẠNG THÁI Ở LÔ KHPX NGÀY 13 THÁNG 8 NĂM 2024 (THEO YC ANH TIẾN)
      // BỎ VIỆC CHUYỂN TRẠNG THÁI TỪ ĐK SANG SX MÀ Ở ĐÂY CHỈ CHỌN ĐĂNG KÝ MÀ THÔI
      // VIỆC CHUYỂN SANG SẢN XUẤT LÀ KHI CÓ LÔ SX ĐẦU TIÊN ĐƯỢC SX THÌ CẢ LÔ KHPX SẼ THÀNH SX
      // ĐƯƠNG NHIÊN LÔ NHÀ MÁY CŨNG ĐI THEO THÀNH SX
      // TÓM LẠI: VIỆC CHUYỂN TRẠNG THÁI SẢN XUẤT CỦA LÔ KHPX VÀ LÔ NM SẼ THỰC HIỆN Ở VIỆC TẠO RA LÔ SX (MÀN HÌNH TẠO LÔ SX)
      // VIỆC CHUYỂN TỪ 0 THÀNH ĐK THÌ ĐÃ THỰC HIỆN Ở MENU ĐĂNG KÝ LÔ KHPX VÀ MENU CHỌN LÔKH ĐỂ SX RỒI
      // CHUYỂN TRẠNG THÁI TỪ 0 THÀNH 1 LUÔN CHO LÔ KHPX (tắt combox SX chỉ để DK thôi)

      // ** Vậy thì việc chuyển từ ĐK thành 0 cần được kiểm soát
      // nếu 1 lô KHPX đã có phát sinh lô SX thì không được chuyển về 0
      // if có tồn tại lô sản xuất thì không được về 0
      // if (newStatus == 0) {
      //   const resLsx = await this.$axios.get(
      //     `/api/lokehoach/howmuchlosxfromlokhpx?_id_khpx=${data._id}`
      //   );

      //   if (resLsx.data.length > 0) {
      //     // Đã phát sinh Lô sản xuất, không cho phép chuyển về 0
      //     data.status = previousStatus;

      //     const Toast = Swal.mixin({
      //       toast: true,
      //       position: "top-end",
      //       showConfirmButton: false,
      //       timer: 1000,
      //       timerProgressBar: true,
      //       didOpen: (toast) => {
      //         toast.addEventListener("mouseenter", Swal.stopTimer);
      //         toast.addEventListener("mouseleave", Swal.resumeTimer);
      //       },
      //     });
      //     Toast.fire({
      //       icon: "error",
      //       title: `Đã phát sinh Lô sản xuất không thể chuyển về trạng thái 0`,
      //     });
      //     return; // Kết thúc hàm tại đây
      //   }
      // } else {
      //   const res = await this.$axios.$patch(
      //     `/api/lokehoach/updatelokehoachpxatdangkylodesanxuat/${data._id}`,
      //     data
      //   );
      // }

      // const resLsx = await this.$axios.get(
      //   `/api/lokehoach/howmuchlosxfromlokhpx?_id_khpx=${data._id}`
      // );

      // if (resLsx.data.length <= 0) {
      //   const Toast = Swal.mixin({
      //     toast: true,
      //     position: "top-end",
      //     showConfirmButton: false,
      //     timer: 1000,
      //     timerProgressBar: true,
      //     didOpen: (toast) => {
      //       toast.addEventListener("mouseenter", Swal.stopTimer);
      //       toast.addEventListener("mouseleave", Swal.resumeTimer);
      //     },
      //   });
      //   Toast.fire({
      //     icon: "error",
      //     title: `Đã phát sinh Lô sản xuất không thể chuyển về trạng thái 0`,
      //   });
      // } else {
      //   const res = await this.$axios.$patch(
      //     `/api/lokehoach/updatelokehoachpxatdangkylodesanxuat/${data._id}`,
      //     data
      //   );
      // }
    },

    // update trạng thái hoàn thành cho lô KHPX
    async updateHoanthanh(value, data) {
      // cập nhật ngày hoàn thành thực tế và status=3
      //   console.log(data.ngayhoanthanhtt);
      try {
        if (value == "") {
          const data_update = {
            ngayhoanthanhtt: value,
            status: 0,
          };
          const res = await this.$axios.$patch(
            `api/lokehoach/updatestatusngayhoanthanhtt/${data._id}`,
            data_update
          );
          if (res.success == true) {
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
              title: `Đã cập nhật`,
            });
          }
        } else {
          const data_update = {
            ngayhoanthanhtt: value,
            status: 3,
          };
          const res = await this.$axios.$patch(
            `api/lokehoach/updatestatusngayhoanthanhtt/${data._id}`,
            data_update
          );
          if (res.success == true) {
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
              title: `Đã cập nhật`,
            });
          }
        }

        // if (
        //   !this.selectedOptions.length &&
        //   !this.Options_status.length &&
        //   this.multiSearch_nhomtp == "" &&
        //   this.multiSearch_matp == ""
        // ) {
        //   this.showAllLokhpx();
        // } else {
        //   this.filterData();
        // }
        this.filterData();
      } catch (error) {
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

    async filterData() {
      // console.log(this.selectedOptions)
      // console.log(this.Options_status)
      this.isOpen = false;
      this.isOpenst = false;
      this.isActive_loading = true;

      const mapxList = this.selectedOptions;
      // const masp = this.multiSearch_masp
      const matp = this.multiSearch_matp;
      const status = this.Options_status;
      const nhomtp = this.multiSearch_nhomtp;

      // chọn lọc full 1
      if (
        this.selectedOptions.length > 0 &&
        this.Options_status.length > 0 &&
        this.multiSearch_matp != "" &&
        this.multiSearch_nhomtp != ""
      ) {
        this.lokehoachpx = await this.$axios.$get(
          `/api/lokehoach/filterfulldkmtp`,
          {
            params: {
              mapx: mapxList, // Truyền danh sách mã phân xưởng lên server
              mathanhpham: matp,
              status: status,
              nhomthanhpham: nhomtp,
            },
          }
        );
        this.isActive_loading = false;
      }
      // chỉ có mã px 2
      else if (
        this.selectedOptions.length > 0 &&
        !this.Options_status.length &&
        this.multiSearch_matp == "" &&
        this.multiSearch_nhomtp == ""
      ) {
        this.lokehoachpx = await this.$axios.$get(
          `/api/lokehoach/filteronlymapx`,
          {
            params: {
              mapx: mapxList,
            },
          }
        );
        this.isActive_loading = false;
      }
      // chỉ có mã px và mã tp 3
      else if (
        this.selectedOptions.length > 0 &&
        !this.Options_status.length &&
        this.multiSearch_matp != "" &&
        this.multiSearch_nhomtp == ""
      ) {
        // console.log(this.selectedOptions)

        this.lokehoachpx = await this.$axios.$get(
          `/api/lokehoach/filteronlymapxandmatp`,
          {
            params: {
              mapx: mapxList,
              matp: matp,
            },
          }
        );
        this.isActive_loading = false;
      }
      // chỉ có mã px và nhomtp 4
      else if (
        this.selectedOptions.length > 0 &&
        !this.Options_status.length &&
        this.multiSearch_matp == "" &&
        this.multiSearch_nhomtp != ""
      ) {
        this.lokehoachpx = await this.$axios.$get(
          `/api/lokehoach/filteronlymapxandnhomtp`,
          {
            params: {
              mapx: mapxList,
              nhomthanhpham: nhomtp,
            },
          }
        );
        this.isActive_loading = false;
      }
      // chỉ có mã px và status 5
      else if (
        this.selectedOptions.length > 0 &&
        this.Options_status.length > 0 &&
        this.multiSearch_matp == "" &&
        this.multiSearch_nhomtp == ""
      ) {
        this.lokehoachpx = await this.$axios.$get(
          `/api/lokehoach/filteronlymapxandstatus`,
          {
            params: {
              mapx: mapxList,
              status: status,
            },
          }
        );
        this.isActive_loading = false;
      }
      // lọc mỗi trạng thái 6
      else if (
        !this.selectedOptions.length &&
        this.Options_status.length > 0 &&
        this.multiSearch_matp == "" &&
        this.multiSearch_nhomtp == ""
      ) {
        this.lokehoachpx = await this.$axios.$get(
          `/api/lokehoach/filteronlystatus`,
          {
            params: {
              status: status,
            },
          }
        );
        this.isActive_loading = false;
      }

      // lọc mỗi mã thành phẩm 7
      else if (
        !this.selectedOptions.length &&
        !this.Options_status.length &&
        this.multiSearch_matp != "" &&
        this.multiSearch_nhomtp == ""
      ) {
        this.lokehoachpx = await this.$axios.$get(
          `/api/lokehoach/filteronlymatp`,
          {
            params: {
              matp: matp,
            },
          }
        );
        this.isActive_loading = false;
      }

      // lọc thành phẩm + trạng thái 8
      else if (
        !this.selectedOptions.length &&
        this.Options_status.length > 0 &&
        this.multiSearch_matp != "" &&
        this.multiSearch_nhomtp == ""
      ) {
        this.lokehoachpx = await this.$axios.$get(
          `/api/lokehoach/filteronlymatpandstatus`,
          {
            params: {
              matp: matp,
              status: status,
            },
          }
        );
        this.isActive_loading = false;
      }

      // lọc mỗi nhóm thành phẩm 9
      else if (
        !this.selectedOptions.length &&
        !this.Options_status.length &&
        this.multiSearch_matp == "" &&
        this.multiSearch_nhomtp != ""
      ) {
        this.lokehoachpx = await this.$axios.$get(
          `/api/lokehoach/filteronlynhomtp`,
          {
            params: {
              nhomtp: nhomtp,
            },
          }
        );
        this.isActive_loading = false;
      }

      // lọc mỗi nhóm thành phẩm và mã thành phẩm 10
      else if (
        !this.selectedOptions.length &&
        !this.Options_status.length &&
        this.multiSearch_matp != "" &&
        this.multiSearch_nhomtp != ""
      ) {
        this.lokehoachpx = await this.$axios.$get(
          `/api/lokehoach/filteronlynhomtpandmatp`,
          {
            params: {
              nhomtp: nhomtp,
              matp: matp,
            },
          }
        );
        this.isActive_loading = false;
      }

      // lọc mỗi nhóm tp và trạng thái 11
      else if (
        !this.selectedOptions.length &&
        this.Options_status.length > 0 &&
        this.multiSearch_matp == "" &&
        this.multiSearch_nhomtp != ""
      ) {
        this.lokehoachpx = await this.$axios.$get(
          `/api/lokehoach/filteronlynhomtpandstatus`,
          {
            params: {
              nhomtp: nhomtp,
              status: status,
            },
          }
        );
        this.isActive_loading = false;
      }

      // lọc nhóm thành phẩm; nhóm sản phẩm và trạng thái 12
      else if (
        !this.selectedOptions.length &&
        this.Options_status.length > 0 &&
        this.multiSearch_matp != "" &&
        this.multiSearch_nhomtp != ""
      ) {
        this.lokehoachpx = await this.$axios.$get(
          `/api/lokehoach/filteronlynhomtpnhomtpstatus`,
          {
            params: {
              nhomtp: nhomtp,
              status: status,
              matp: matp,
            },
          }
        );
        this.isActive_loading = false;
      }
      // lọc xưởng, nhóm tp và status 13
      else if (
        this.selectedOptions.length > 0 &&
        this.Options_status.length > 0 &&
        this.multiSearch_matp == "" &&
        this.multiSearch_nhomtp != ""
      ) {
        this.lokehoachpx = await this.$axios.$get(
          `/api/lokehoach/filteronlypxandnhomtpandstatus`,
          {
            params: {
              nhomtp: nhomtp,
              status: status,
              mapx: mapxList,
            },
          }
        );
        this.isActive_loading = false;
      }
      // lọc xưởng, nhóm tp và mã thành phẩm 14
      else if (
        this.selectedOptions.length > 0 &&
        !this.Options_status.length &&
        this.multiSearch_matp != "" &&
        this.multiSearch_nhomtp != ""
      ) {
        this.lokehoachpx = await this.$axios.$get(
          `/api/lokehoach/filteronlypxandnhomtpmatp`,
          {
            params: {
              nhomthanhpham: nhomtp,
              mathanhpham: matp,
              mapx: mapxList,
            },
          }
        );
        this.isActive_loading = false;
      }
      // lọc xưởng, mã tp và status 15
      else if (
        this.selectedOptions.length > 0 &&
        this.Options_status.length > 0 &&
        this.multiSearch_matp != "" &&
        this.multiSearch_nhomtp == ""
      ) {
        this.lokehoachpx = await this.$axios.$get(
          `/api/lokehoach/filtermapxmatpstatus`,
          {
            params: {
              matp: matp,
              status: status,
              mapx: mapxList,
            },
          }
        );
        this.isActive_loading = false;
      }
    },

    // --------------------------------------------------------------------------------------
    // 4: Các hàm CRUD
    // update lô kế hoạch phân xưởng
    async onUpdate_lokhpx(data) {
      // console.log(data)
      const now = new Date();
      const currentYear = now.getFullYear();

      const startDate = dayjs()
        .year(currentYear)
        .month(0)
        .date((data.tuanexc - 1) * 7 + 1);
      const startDateString = startDate.locale("vi").format("YYYY/MM/DD");

      const endDate = dayjs()
        .year(currentYear)
        .month(0)
        .date(data.tuanexc * 7);
      const endDateString = endDate.locale("vi").format("YYYY/MM/DD");
      data.ngaybdexc = startDateString;
      data.ngayktexc = endDateString;
      // console.log(startDateString, endDateString)

      // Tìm tất cả các lô KHPX mà do lô nhà máy này đẻ ra thông qua _id của LNM
      // Đẩy toàn bộ trạng thái các LÔ KHPX này vào 1 mảng và lập luận như sau:
      // nếu mảng mà toàn = 0 thì log ra chữ: "0"
      // nếu mảng toàn = 3 thì log "ht"
      // nếu mảng mà có 0, 1, 2, 3 thì log ra sx.tức là nếu mảng chỉ cần còn thấy 2 là log sx.
      // nếu mảng không tìm thấy 2 hoặc 3 mà chỉ toàn 0 hoặc 1 thì log dk
      // còn tất nhiên mà toàn = 1 thì log dk
      const arr = [];
      const lokhpxs = await this.$axios.$get(
        `/api/ketoan/checklokhpxoflnm?_id_lonhamay=${data._id_lonhamay}`
      );
      for (let i = 0; i < lokhpxs.length; i++) {
        arr.push(lokhpxs[i].status);
      }
      try {
        this.$axios.$patch(
          `/api/lokehoach/updatelokehoachpxatdangkylodesanxuat/${data._id}`,
          data
        );
        // console.log(arr);
        if (arr.every((x) => x === 0)) {
          this.$axios.$patch(
            `/api/lokehoach/lonhamay/status0/${data._id_lonhamay}`
          );
        } else if (arr.every((x) => x === 3)) {
          this.$axios.$patch(
            `/api/lokehoach/lonhamay/status3/${data._id_lonhamay}`
          );
        } else if (arr.indexOf(2) !== -1 || arr.indexOf(3) !== -1) {
          this.$axios.$patch(
            `/api/lokehoach/lonhamay/status2/${data._id_lonhamay}`
          );
        } else if (arr.indexOf(2) === -1 && arr.indexOf(3) === -1) {
          if (arr.indexOf(1) !== -1) {
            this.$axios.$patch(
              `/api/lokehoach/lonhamay/status1/${data._id_lonhamay}`
            );
          } else if (arr.every((x) => x === 0)) {
            this.$axios.$patch(
              `/api/lokehoach/lonhamay/status0/${data._id_lonhamay}`
            );
          }
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
          title: "Đã ghi dữ liệu",
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
  width: 1320px;
  height: 800px;
}

.modal-card-predata {
  width: 320px;
  height: 200px;
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
  width: 200px;
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

@media (max-width: 768px) {
  .pagination button {
    margin: 5px;
  }
}
</style>
