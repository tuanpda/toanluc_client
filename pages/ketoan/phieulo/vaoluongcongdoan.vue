<template>
  <div class="columns">
    <div class="column">
      <br />
      <div class="box" style="margin-left: 3px; margin-right: 3px">
        <div class="columns">
          <div class="column is">
            <div class="control">
              <span class="icon is-small is-left">
                <i style="color: #ff55acee" class="fas fa-broom"></i>
              </span>
              <span style="color: #3850b7; font-size: 15px; font-weight: bold"
                >Vào lương công đoạn</span
              >
            </div>
          </div>
        </div>

        <div class="columns">
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
        </div>

        <div class="box" v-if="isFilter == true">
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
            </div>
            <div class="column">
              <input
                v-model="search_ngayhttt"
                type="date"
                class="input is-small"
              />
            </div>
            <div class="column">
              <button
                @click="filterData"
                class="button is-small is-fullwidth is-success"
              >
                Lọc
              </button>
            </div>
          </div>
          <div class="columns">
            <div class="column"></div>
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
              <button
                @click="getSolieuLSX_ALl_cht"
                class="button is-small is-fullwidth is-danger"
              >
                Refresh
              </button>
            </div>
            <div class="column">
              <input
                v-model="search_maphieu_id"
                type="number"
                class="input is-small"
                placeholder="Mã phiếu"
              />
            </div>
            <div class="column">
              <button
                @click="searchPhieu()"
                class="button is-small is-info is-fullwidth"
              >
                Tìm
              </button>
            </div>
          </div>
        </div>

        <div v-if="showConponent" class="table_wrapper">
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
                  width: 5%;
                "
              >
                Mã phiếu
              </td>
              <td
                @click="sortTable('_id')"
                style="
                  font-size: small;
                  text-align: center;
                  font-weight: 600;
                  width: 10%;
                "
              >
                Mã PX
              </td>
              <td
                @click="sortTable('makh')"
                style="
                  font-size: small;
                  text-align: center;
                  font-weight: 600;
                  width: 10%;
                "
              >
                KH nhà máy
              </td>
              <td
                @click="sortTable('makhpx')"
                style="
                  font-size: small;
                  text-align: center;
                  font-weight: 600;
                  width: 10%;
                "
              >
                Lô KHPX
              </td>
              <td
                @click="sortTable('malosx')"
                style="
                  font-size: small;
                  text-align: center;
                  font-weight: 600;
                  width: 13%;
                "
              >
                Lô sản xuất
              </td>
              <td
                @click="sortTable('masp')"
                style="
                  font-size: small;
                  text-align: center;
                  font-weight: 600;
                  width: 10%;
                "
              >
                Mã SP
              </td>
              <td
                @click="sortTable('nhomluong')"
                style="
                  font-size: small;
                  text-align: center;
                  font-weight: 600;
                  width: 17%;
                "
              >
                Nhóm lương
              </td>
              <td
                @click="sortTable('ngaybd')"
                style="
                  font-size: small;
                  text-align: center;
                  font-weight: 600;
                  width: 5%;
                "
              >
                Ngày bắt đầu
              </td>
              <!-- <td style="font-size: small; text-align: center; font-weight: 600; width: 5%;">Ngày kết thúc
                            </td> -->
              <td
                style="
                  font-size: small;
                  text-align: center;
                  font-weight: 600;
                  width: 5%;
                "
              >
                Số lượng
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
                Chốt?
              </td>
              <td
                style="
                  font-size: small;
                  text-align: center;
                  font-weight: 600;
                  width: 5%;
                "
              >
                Tổng đạt
              </td>
              <td
                style="
                  font-size: small;
                  text-align: center;
                  font-weight: 600;
                  width: 5%;
                "
              >
                Tổng hỏng
              </td>
              <!-- <td @click="sortTable('ngaybatdautt')"
                                style="font-size: small; text-align: center; font-weight: 600; width: 5%;">Ngày BĐTT
                            </td> -->
              <td
                @click="sortTable('ngayhoanthanhtt')"
                style="
                  font-size: small;
                  text-align: center;
                  font-weight: 600;
                  width: 3%;
                "
              >
                Ngày HTTT
              </td>
              <td
                style="
                  font-size: small;
                  text-align: center;
                  font-weight: 600;
                  width: 5%;
                "
              >
                SL nhanh
              </td>
              <td
                style="
                  font-size: small;
                  text-align: center;
                  font-weight: 600;
                  width: 5%;
                "
              >
                Lương
              </td>
            </tr>
            <tr
              v-for="(item, index) in paginatedTable"
              :key="index + 'llllkiq'"
              :class="{ highlighted: item === highlightedRow }"
              @click="highlightRow(item)"
            >
              <td style="text-align: center">
                <input v-model="selected" :value="item" type="checkbox" />
              </td>
              <td style="font-size: small; text-align: center">
                {{ index + 1 }}
              </td>
              <td
                style="
                  font-size: small;
                  text-align: center;
                  color: red;
                  font-weight: 700;
                "
              >
                {{ item._id }}
              </td>
              <td style="font-size: small">
                {{ item.mapx }}
              </td>
              <td style="font-size: small">
                {{ item.malonhamay }}
              </td>
              <td style="font-size: small; text-align: center">
                {{ item.makhpx }}
              </td>
              <td
                @click="getInfoLosx(item)"
                style="
                  font-size: small;
                  background-color: #fffaeb;
                  font-weight: 600;
                "
              >
                {{ item.malosx }}
              </td>
              <td style="font-size: small">
                {{ item.masp }}
              </td>
              <td style="font-size: small; text-align: center">
                {{ item.nhomluong }}
              </td>
              <td style="font-size: small; text-align: center">
                {{ item.ngaybd | formatDate }}
              </td>
              <td style="font-size: small; text-align: center">
                {{ item.soluonglsx }}
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
                      vertical-align: middle;
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
                      vertical-align: middle;
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
                      vertical-align: middle;
                    "
                    >HT</span
                  >
                </td>
                <td v-else style="font-size: small; text-align: center">
                  <span
                    style="
                      color: white;
                      font-weight: bold;
                      background-color: grey;
                      padding-left: 7px;
                      padding-right: 7px;
                      vertical-align: middle;
                    "
                    >0</span
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
                <span v-if="item.status_tinhluong == false">
                  <i style="color: #ffd863" class="fa fa-circle"></i>
                </span>
                <span v-else>
                  <i style="color: #00947e" class="fa fa-circle"></i>
                </span>
              </td>
              <td style="font-size: small; text-align: center">
                {{ item.tongdat }}
              </td>
              <td style="font-size: small; text-align: center">
                {{ item.tonghong }}
              </td>
              <!-- <td style="font-size: small; text-align: center;">{{ item.stopday_losx | formatDate }}</td> -->
              <!-- <td style="font-size: small; text-align: center;">{{ item.ngaybatdautt | formatDate }}</td> -->
              <td style="font-size: small; text-align: center">
                <!-- {{ item.ngayhoanthanhtt | formatDate }} -->
                <!-- <input
                  @blur="updateNgayhoanttt(item)"
                  class="input is-small"
                  type="date"
                  v-bind:value="item.ngayhoanthanhtt | inputDateFilter"
                  v-on:input="item.ngayhoanthanhtt = getDate($event.target.value)"
                /> -->
                <template v-if="item.ngayhoanthanhtt != null">
                  <input
                    class="input is-small is-success"
                    type="date"
                    :value="formattedNgayhoanthanhtt(item)"
                    @blur="updateNgayhoanttt($event.target.value, item)"
                  />
                </template>
                <template v-else>
                  <input
                    class="input is-small is-danger"
                    type="date"
                    :value="formattedNgayhoanthanhtt(item)"
                    @blur="updateNgayhoanttt($event.target.value, item)"
                  />
                </template>
              </td>
              <td style="font-size: small; text-align: center">
                <template v-if="item.soluongkhsx != 0">
                  <input
                    @change="updateStatus(item)"
                    type="text"
                    class="input is-small is-success"
                    v-model="item.soluongkhsx"
                  />
                </template>
                <template v-else>
                  <input
                    @change="updateStatus(item)"
                    type="text"
                    class="input is-small is-danger"
                    v-model="item.soluongkhsx"
                  />
                </template>
              </td>
              <td style="font-size: small; text-align: center">
                <a @click="vaoPhieuluong(item)"
                  ><span>
                    <i
                      style="color: #9b6dff"
                      class="fa fa-check-circle"
                    ></i> </span
                ></a>
              </td>
            </tr>
          </table>
        </div>
        <!-- phân trang -->
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

        <br />

        <label class="checkbox">
          <!-- <input type="checkbox" v-model="checkViewluong"> -->
          <span style="font-size: small">Chi tiết lương tại lô sản xuất: </span>
          <span style="color: red; font-weight: 500; font-size: small">{{
            getinfoplsx.malosx
          }}</span>
          <span style="font-weight: 500; font-size: small">
            - {{ getinfoplsx.tenpx }} - {{ getinfoplsx.mapx }}</span
          >
          |
          <span style="font-weight: 500; color: blue; font-size: small"
            >Mã lô nhà máy: {{ getinfoplsx.malonhamay }}</span
          >
          |
          <span style="font-weight: 500; color: green; font-size: small"
            >Mã kế hoạch PX: {{ getinfoplsx.makhpx }}</span
          >
          <br />
          <span style="font-size: small"
            >Ngày bắt đầu thực tế:
            <span style="font-weight: bold">{{
              getinfoplsx.ngaybd | formatDate
            }}</span></span
          >
          -
          <span style="font-size: small"
            >Ngày kết thúc thực tế:
            <span style="font-weight: bold">{{
              getinfoplsx.ngayhoanthanhtt | formatDate
            }}</span></span
          >
        </label>
        <div v-show="checkViewluong == true" style="margin-top: 5px">
          <div class="table_wrapper">
            <table
              class="table is-responsive is-bordered is-narrow is-fullwidth"
            >
              <tr style="background-color: #feecf0">
                <td colspan="9" style="font-weight: bold; font-size: small">
                  Công đoạn đã thực hiện
                </td>
                <td style="width: 9%; text-align: center">
                  <vue-excel-xlsx
                    :data="allluongcongdoan"
                    :columns="columns"
                    :file-name="'Lương công đoạn'"
                    :file-type="'xlsx'"
                    :sheet-name="'Lương công đoạn'"
                  >
                    Download Excel
                  </vue-excel-xlsx>
                </td>
              </tr>
              <tr>
                <td
                  style="
                    font-size: small;
                    text-align: center;
                    font-weight: bold;
                    width: 5%;
                  "
                >
                  STT
                </td>
                <td
                  style="
                    font-size: small;
                    text-align: center;
                    font-weight: bold;
                    width: 5%;
                  "
                >
                  Nguyên công
                </td>
                <td
                  style="
                    font-size: small;
                    text-align: center;
                    font-weight: bold;
                    width: 7%;
                  "
                >
                  Đơn giá
                </td>

                <td
                  style="
                    font-size: small;
                    text-align: center;
                    font-weight: bold;
                    width: 10%;
                  "
                >
                  PX / tổ
                </td>
                <td
                  style="
                    font-size: small;
                    text-align: center;
                    font-weight: bold;
                  "
                >
                  Người thực hiện
                </td>
                <td
                  style="
                    font-size: small;
                    text-align: center;
                    font-weight: bold;
                    width: 7%;
                  "
                >
                  Ngày thực hiện
                </td>
                <td
                  style="
                    font-size: small;
                    text-align: center;
                    font-weight: bold;
                    width: 7%;
                  "
                >
                  Số đạt
                </td>
                <td
                  style="
                    font-size: small;
                    text-align: center;
                    font-weight: bold;
                    width: 7%;
                  "
                >
                  Số hỏng
                </td>
                <td
                  style="
                    font-size: small;
                    text-align: center;
                    font-weight: bold;
                    width: 7%;
                  "
                >
                  Cập nhật
                </td>
                <td
                  style="
                    font-size: small;
                    text-align: center;
                    font-weight: bold;
                    width: 5%;
                  "
                >
                  Xóa
                </td>
              </tr>
              <tr
                v-for="(item, index) in allluongcongdoan"
                :key="index + 'ppp'"
              >
                <td style="font-size: small; text-align: center">
                  {{ index + 1 }}
                </td>
                <td style="font-size: small">
                  {{ item.nguyencong }}
                </td>
                <td style="font-size: small; text-align: right">
                  {{ item.dongia | formatNumber }}
                </td>
                <template>
                  <td
                    v-if="item.to_cn"
                    style="font-size: small; text-align: center"
                  >
                    {{ item.to_cn }}
                  </td>
                  <td v-else style="font-size: small; text-align: center">
                    {{ item.phanxuong_cn }}
                  </td>
                </template>
                <td style="font-size: small">{{ item.tencn }}</td>
                <td style="font-size: small; text-align: center">
                  {{ item.ngaythuchien | formatDate }}
                </td>
                <td style="font-size: small; text-align: center">
                  <input
                    type="number"
                    class="input is-small"
                    v-model="item.sodat"
                  />
                </td>
                <td style="font-size: small; text-align: center">
                  <input
                    type="number"
                    class="input is-small"
                    v-model="item.sohong"
                  />
                </td>
                <td style="text-align: center; font-size: small">
                  <a @click="onUpdateCd(item)">
                    <span style="color: green" class="icon is-small">
                      <i class="far fa-check-circle"></i>
                    </span>
                  </a>
                </td>
                <td style="text-align: center; font-size: small">
                  <a @click="onDelete(item)">
                    <span style="color: red" class="icon is-small">
                      <i class="fas fa-times"></i>
                    </span>
                  </a>
                </td>
              </tr>
              <tr style="background-color: #f4f2f8">
                <td colspan="6" style="font-size: small; font-weight: 700">
                  Tổng đạt / Tổng hỏng
                </td>
                <td style="text-align: right; font-size: small">
                  {{ getinfoplsx.tongdat }}
                </td>
                <td style="text-align: right; font-size: small">
                  {{ getinfoplsx.tonghong }}
                </td>
                <td colspan="2"></td>
              </tr>
              <tr>
                <td
                  colspan="10"
                  style="
                    font-size: small;
                    font-weight: 700;
                    background-color: #effaf5;
                  "
                >
                  Tổng cộng
                </td>
              </tr>
              <tr v-for="(group, nguyencong) in groups" :key="nguyencong">
                <td style="text-align: center; font-size: small"></td>
                <td style="font-size: small">{{ nguyencong }}</td>
                <td style="text-align: right; font-size: small">
                  {{ group.dongia | formatNumber }}
                </td>
                <td></td>
                <td></td>
                <td></td>
                <td style="text-align: right; font-size: small">
                  {{ group.sodat | formatNumber }}
                </td>
                <td style="text-align: right; font-size: small">
                  {{ group.sohong | formatNumber }}
                </td>
                <td
                  colspan="2"
                  style="
                    text-align: right;
                    font-size: small;
                    color: red;
                    font-weight: 600;
                  "
                ></td>
              </tr>
            </table>
          </div>
          <br />
          <!-- công nhật -->
          <div class="table_wrapper">
            <table
              class="table is-responsive is-bordered is-narrow is-fullwidth"
            >
              <tr style="background-color: #feecf0">
                <td colspan="7" style="font-weight: bold; font-size: small">
                  Công nhật đã thực hiện
                </td>
                <td>
                  <vue-excel-xlsx
                    :data="allluongcongnhat"
                    :columns="columns_cn"
                    :file-name="'Lương công nhật'"
                    :file-type="'xlsx'"
                    :sheet-name="'Lương công nhật'"
                  >
                    Download Excel
                  </vue-excel-xlsx>
                </td>
              </tr>
              <tr>
                <td
                  style="
                    font-size: small;
                    text-align: center;
                    font-weight: bold;
                    width: 5%;
                  "
                >
                  STT
                </td>
                <td
                  style="
                    font-size: small;
                    text-align: center;
                    font-weight: bold;
                    width: 15%;
                  "
                >
                  Tên công nhật
                </td>
                <td
                  style="
                    font-size: small;
                    text-align: center;
                    font-weight: bold;
                    width: 7%;
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
                  Người thực hiện
                </td>
                <td
                  style="
                    font-size: small;
                    text-align: center;
                    font-weight: bold;
                    width: 10%;
                  "
                >
                  Ngày thực hiện
                </td>
                <td
                  style="
                    font-size: small;
                    text-align: center;
                    font-weight: bold;
                    width: 7%;
                  "
                >
                  Số giờ
                </td>
                <td
                  style="
                    font-size: small;
                    text-align: center;
                    font-weight: bold;
                    width: 7%;
                  "
                >
                  Cập nhật
                </td>
                <td
                  style="
                    font-size: small;
                    text-align: center;
                    font-weight: bold;
                    width: 5%;
                  "
                >
                  Xóa
                </td>
              </tr>
              <tr
                v-for="(item, index) in allluongcongnhat"
                :key="index + 'ppp'"
              >
                <td style="font-size: small; text-align: center">
                  {{ index + 1 }}
                </td>
                <td style="font-size: small">
                  {{ item.tencongnhat }}
                </td>
                <td style="font-size: small; text-align: right">
                  {{ item.dongia | formatNumber }}
                </td>

                <td style="font-size: small">
                  {{ item.nguoithuchien }}
                </td>
                <td style="font-size: small; text-align: center">
                  {{ item.ngaythuchien | formatDate }}
                </td>
                <td style="font-size: small; text-align: center">
                  <input
                    type="number"
                    class="input is-small"
                    v-model.trim="item.sogiocong"
                  />
                </td>
                <td style="text-align: center; font-size: small">
                  <a @click="onUpdateCn(item._id, item.sogiocong)">
                    <span style="color: green" class="icon is-small">
                      <i class="far fa-check-circle"></i>
                    </span>
                  </a>
                </td>
                <td style="text-align: center; font-size: small">
                  <a @click="onDeleteCn(item)">
                    <span style="color: red" class="icon is-small">
                      <i class="fas fa-times"></i>
                    </span>
                  </a>
                </td>
              </tr>
            </table>
          </div>
        </div>
        <br />
        <!-- Modal chốt phiếu-->
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
                      MÃ PHIẾU:
                      <span style="font-weight: 700">{{
                        getinfoplsx._id
                      }}</span>
                      | Mã lô: {{ getinfoplsx.malosx }}
                    </p>
                  </div>
                </div>
              </header>
              <section class="modal-card-body">
                <div class="columns">
                  <div class="column is-8">
                    <template v-if="form.tento">
                      <span style="font-size: small; font-weight: 700"
                        >Tổ được chỉ định:
                      </span>
                      <span
                        style="font-size: small; font-weight: bold; color: red"
                        >{{ form.tento }}
                      </span>
                    </template>
                  </div>
                  <div class="column">
                    <button
                      @click="onTaophieu"
                      class="button is-success is-small is-fullwidth"
                    >
                      <span class="icon is-small">
                        <i class="fas fa-pen-fancy"></i>
                      </span>
                      <span>Cập nhật công đoạn</span>
                    </button>
                  </div>
                  <div class="column">
                    <button
                      @click="isActive = false"
                      class="button is-danger is-fullwidth is-small"
                    >
                      <span>Đóng</span>
                    </button>
                  </div>
                </div>

                <div>
                  <!-- hiển thị thông tin về lô sản xuất -->
                  <div
                    class="table_wrapper"
                    style="margin-bottom: 3px; text-align: right"
                  >
                    <table
                      class="table is-responsive is-bordered is-narrow is-fullwidth"
                    >
                      <tr style="background-color: #feecf0">
                        <td
                          style="
                            font-size: small;
                            width: 15%;
                            text-align: center;
                            font-weight: 500;
                            color: green;
                          "
                        >
                          Mã kế hoạch nhà máy
                        </td>
                        <td
                          style="
                            font-size: small;
                            width: 15%;
                            text-align: center;
                            font-weight: 500;
                            color: green;
                          "
                        >
                          Mã lô kế hoạch
                        </td>
                        <td
                          style="
                            font-size: small;
                            width: 10%;
                            text-align: center;
                            font-weight: 500;
                            color: green;
                          "
                        >
                          Ngày bắt đầu
                        </td>
                        <td
                          style="
                            font-size: small;
                            width: 10%;
                            text-align: center;
                            font-weight: 500;
                            color: green;
                          "
                        >
                          Ngày kết thúc
                        </td>
                        <td
                          style="
                            font-size: small;
                            width: 10%;
                            text-align: center;
                            font-weight: 500;
                            color: green;
                          "
                        >
                          Số lượng của kế hoạch
                        </td>
                        <td
                          style="
                            font-size: small;
                            width: 10%;
                            text-align: center;
                            font-weight: 500;
                            color: green;
                          "
                        >
                          Mã sản phẩm
                        </td>
                      </tr>
                      <tr>
                        <td style="font-size: small; font-weight: bold">
                          {{ getinfoplsx.malonhamay }}
                        </td>
                        <td
                          style="
                            font-size: small;
                            font-weight: bold;
                            text-align: center;
                          "
                        >
                          {{ getinfoplsx.makhpx }}
                        </td>
                        <td
                          style="
                            font-size: small;
                            font-weight: bold;
                            text-align: center;
                          "
                        >
                          {{ getinfoplsx.ngaybd | formatDate }}
                        </td>
                        <td
                          style="
                            font-size: small;
                            font-weight: bold;
                            text-align: center;
                          "
                        >
                          {{ getinfoplsx.ngaykt | formatDate }}
                        </td>
                        <td
                          style="
                            font-size: small;
                            font-weight: bold;
                            text-align: center;
                          "
                        >
                          {{ getinfoplsx.soluong | formatNumber }}
                        </td>
                        <td
                          style="
                            font-size: small;
                            font-weight: bold;
                            text-align: center;
                          "
                        >
                          {{ getinfoplsx.masp }}
                        </td>
                      </tr>
                      <tr style="background-color: #feecf0">
                        <td
                          style="
                            font-size: small;
                            width: 15%;
                            text-align: center;
                            font-weight: 500;
                            color: green;
                          "
                        >
                          Mã Lô sản xuất
                        </td>
                        <td
                          style="
                            font-size: small;
                            width: 15%;
                            text-align: center;
                            font-weight: 500;
                            color: green;
                          "
                        >
                          Số lượng lô sản xuất
                        </td>
                        <td
                          style="
                            font-size: small;
                            width: 10%;
                            text-align: center;
                            font-weight: 500;
                            color: green;
                          "
                        >
                          Ngày sản xuất
                        </td>
                        <td
                          style="
                            font-size: small;
                            width: 10%;
                            text-align: center;
                            font-weight: 500;
                            color: green;
                          "
                        >
                          Ngày hoàn thành
                        </td>
                        <td
                          style="
                            font-size: small;
                            width: 10%;
                            text-align: center;
                            font-weight: 500;
                            color: green;
                          "
                        >
                          Mã Phân xưởng
                        </td>
                        <td
                          style="
                            font-size: small;
                            width: 10%;
                            text-align: center;
                            font-weight: 500;
                            color: green;
                          "
                        >
                          Mã Tổ
                        </td>
                      </tr>
                      <tr>
                        <td style="font-size: small; font-weight: bold">
                          {{ getinfoplsx.malosx }}
                        </td>
                        <td
                          style="
                            font-size: small;
                            font-weight: bold;
                            text-align: center;
                          "
                        >
                          {{ getinfoplsx.soluonglsx | formatNumber }}
                        </td>
                        <td style="font-size: small; text-align: center">
                          <input
                            class="input is-small"
                            type="date"
                            v-bind:value="getinfoplsx.ngaybd | inputDateFilter"
                            v-on:input="
                              getinfoplsx.ngaybd = getDate($event.target.value)
                            "
                          />
                        </td>
                        <td
                          style="
                            font-size: small;
                            font-weight: bold;
                            text-align: center;
                          "
                        >
                          <input
                            v-model="ngayhoanthanh"
                            type="date"
                            class="input is-small"
                          />
                        </td>
                        <td
                          style="
                            font-size: small;
                            font-weight: bold;
                            text-align: center;
                          "
                        >
                          {{ getinfoplsx.mapx }}
                        </td>
                        <td
                          style="
                            font-size: small;
                            font-weight: bold;
                            text-align: center;
                          "
                        >
                          {{ getinfoplsx.mato }}
                        </td>
                      </tr>
                    </table>
                  </div>

                  <div class="table_wrapper">
                    <table
                      class="table is-responsive is-bordered is-narrow is-fullwidth"
                    >
                      <tr style="background-color: #fffaeb">
                        <td
                          colspan="11"
                          style="font-weight: bold; font-size: small"
                        >
                          Thêm công đoạn làm việc trong lô sản xuất
                        </td>
                      </tr>
                      <tr>
                        <td colspan="11">
                          <button
                            @click="addCongdoan()"
                            class="button is-small is-info"
                          >
                            Thêm công đoạn
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td
                          style="
                            text-align: center;
                            font-size: small;
                            font-weight: bold;
                            width: 3%;
                          "
                        >
                          STT
                        </td>
                        <td
                          style="
                            text-align: center;
                            font-size: small;
                            font-weight: bold;
                            width: 15%;
                          "
                        >
                          Nguyên công
                        </td>
                        <td
                          style="
                            text-align: center;
                            font-size: small;
                            font-weight: bold;
                            width: 5%;
                          "
                        >
                          Máy
                        </td>
                        <td
                          style="
                            text-align: center;
                            font-size: small;
                            font-weight: bold;
                            width: 13%;
                          "
                        >
                          Xưởng
                        </td>
                        <td
                          style="
                            text-align: center;
                            font-size: small;
                            font-weight: bold;
                            width: 13%;
                          "
                        >
                          Tổ
                        </td>
                        <td
                          style="
                            text-align: center;
                            font-size: small;
                            font-weight: bold;
                            width: 15%;
                          "
                        >
                          Người thực hiện
                        </td>
                        <td
                          style="
                            text-align: center;
                            font-size: small;
                            font-weight: bold;
                            width: 7%;
                          "
                        >
                          Ngày thực hiện
                        </td>
                        <td
                          style="
                            text-align: center;
                            font-size: small;
                            font-weight: bold;
                            width: 7%;
                          "
                        >
                          Số đạt
                        </td>
                        <td
                          style="
                            text-align: center;
                            font-size: small;
                            font-weight: bold;
                            width: 7%;
                          "
                        >
                          Số hỏng
                        </td>
                        <td
                          style="
                            text-align: center;
                            font-size: small;
                            font-weight: bold;
                            width: 7%;
                          "
                        >
                          Copy
                        </td>
                        <td
                          style="
                            text-align: center;
                            font-size: small;
                            font-weight: bold;
                            width: 7%;
                          "
                        >
                          Xóa
                        </td>
                      </tr>
                      <!-- v-if="isphanxuong == 1" -->
                      <tr
                        v-if="iscongdoan == 1"
                        v-for="(item, index) in items"
                        :key="index + 'cm-a'"
                        ref="rows"
                      >
                        <td
                          style="
                            text-align: center;
                            font-size: small;
                            font-weight: bold;
                          "
                        >
                          {{ index + 1 }}
                        </td>
                        <td style="font-size: small; font-weight: bold">
                          {{ item.nguyencong }}
                        </td>
                        <td>
                          <input
                            type="text"
                            v-model="item.may"
                            class="input is-small"
                          />
                        </td>
                        <td>
                          <div class="select is-small is-fullwidth">
                            <select
                              v-model="item.mapxchoncn"
                              @change="
                                showtonhom(
                                  $event,
                                  $event.target.selectedIndex,
                                  index
                                )
                              "
                            >
                              <option
                                v-for="item in phanxuong"
                                :value="item.mapx"
                              >
                                {{ item.mapx }} - {{ item.tenpx }}
                              </option>
                            </select>
                          </div>
                        </td>
                        <td>
                          <div class="select is-small is-fullwidth">
                            <select
                              @change="
                                getWithTo(
                                  $event,
                                  $event.target.selectedIndex,
                                  index
                                )
                              "
                            >
                              <option
                                v-for="item in item.nhomto"
                                :value="item.mato"
                              >
                                {{ item.mato }} - {{ item.tento }}
                              </option>
                            </select>
                          </div>
                        </td>
                        <td>
                          <div class="select is-small is-fullwidth">
                            <select
                              @change="
                                getTencn(
                                  $event,
                                  $event.target.selectedIndex,
                                  index
                                )
                              "
                              @keydown="locOption($event)"
                              v-model="item.macn"
                            >
                              <option
                                v-for="(it, index) in item.nhomto_cnt"
                                :value="it.macn"
                                :key="index"
                              >
                                {{ it.sttchon }} - {{ it.tencn }}
                              </option>
                            </select>
                          </div>
                          <!-- <div>
                            <input
                              @change="
                                getTencn(
                                  $event,
                                  $event.target.selectedIndex,
                                  index
                                )
                              "
                              v-model="item.congnhan"
                              class="input is-small"
                              type="text"
                              id="myInput"
                              list="congnhan"
                            />
                            <datalist id="congnhan">
                              <option
                                v-for="it in item.nhomto_cnt"
                                :value="it.tencn"
                              ></option>
                            </datalist>
                          </div> -->
                        </td>
                        <td>
                          <input
                            class="input is-small"
                            type="date"
                            v-bind:value="item.ngaythuchien | inputDateFilter"
                            v-on:input="
                              item.ngaythuchien = getDate($event.target.value)
                            "
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            v-model="item.sodat"
                            class="input is-small"
                            @keydown.arrow-down="moveToNextRow(index, $event)"
                            @keydown.arrow-up="moveToPreviousRow(index, $event)"
                            @keydown.arrow-right="moveToNextColumn(index)"
                            @keydown.arrow-left="moveToPreviousColumn(index)"
                            @keydown.enter.prevent="
                              moveToNextRow(index, $event)
                            "
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            v-model="item.sohong"
                            class="input is-small"
                            @keydown.arrow-down="moveToNextRow(index, $event)"
                            @keydown.arrow-up="moveToPreviousRow(index, $event)"
                            @keydown.arrow-right="moveToNextColumn(index)"
                            @keydown.arrow-left="moveToPreviousColumn(index)"
                            @keydown.enter.prevent="
                              moveToNextRow(index, $event)
                            "
                          />
                        </td>

                        <td style="text-align: center">
                          <button
                            @click="copyCongdoan(item, index)"
                            class="button is-small is-danger"
                          >
                            Copy
                          </button>
                        </td>
                        <td style="text-align: center">
                          <button
                            @click="deleteRow(index)"
                            class="button is-small is-danger"
                          >
                            Xóa
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td colspan="7" style="font-size: small">
                          Tổng đạt / tổng hỏng
                        </td>
                        <td
                          style="
                            font-size: small;
                            font-weight: 600;
                            text-align: center;
                          "
                        >
                          <input
                            v-model.trim="tongdatinlo"
                            type="number"
                            class="input is-small"
                          />
                        </td>
                        <td
                          style="
                            font-size: small;
                            font-weight: 600;
                            text-align: center;
                          "
                        >
                          {{ tonghonginlo }}
                        </td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td colspan="11">
                          <button
                            @click="addCongnhat()"
                            class="button is-small is-info"
                          >
                            Thêm công nhật
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td
                          style="
                            text-align: center;
                            font-size: small;
                            font-weight: bold;
                          "
                        >
                          Công nhật
                        </td>
                        <td
                          style="
                            text-align: center;
                            font-size: small;
                            font-weight: bold;
                          "
                        >
                          Tên công
                        </td>
                        <td></td>

                        <td
                          style="
                            text-align: center;
                            font-size: small;
                            font-weight: bold;
                          "
                        >
                          Xưởng
                        </td>
                        <td
                          style="
                            text-align: center;
                            font-size: small;
                            font-weight: bold;
                          "
                        >
                          Tổ
                        </td>
                        <td
                          style="
                            text-align: center;
                            font-size: small;
                            font-weight: bold;
                          "
                        >
                          Người thực hiện
                        </td>
                        <td
                          style="
                            text-align: center;
                            font-size: small;
                            font-weight: bold;
                          "
                        >
                          Ngày thực hiện
                        </td>
                        <td
                          style="
                            text-align: center;
                            font-size: small;
                            font-weight: bold;
                          "
                        >
                          Số giờ
                        </td>
                        <td
                          style="
                            text-align: center;
                            font-size: small;
                            font-weight: bold;
                          "
                        >
                          Ghi chú
                        </td>
                        <td
                          style="
                            text-align: center;
                            font-size: small;
                            font-weight: bold;
                          "
                        >
                          Copy
                        </td>
                        <td
                          style="
                            text-align: center;
                            font-size: small;
                            font-weight: bold;
                          "
                        >
                          Xóa
                        </td>
                      </tr>
                      <tr
                        v-for="(item, index) in items_cn"
                        :key="index + 'cm-b'"
                      >
                        <td
                          style="
                            text-align: center;
                            font-size: small;
                            font-weight: bold;
                          "
                        >
                          {{ index + 1 }}
                        </td>
                        <td>
                          <div class="select is-small is-fullwidth">
                            <select
                              v-model="item.macongnhat"
                              @change="
                                getCongnhat(
                                  $event,
                                  $event.target.selectedIndex,
                                  index
                                )
                              "
                            >
                              <option
                                v-for="item in dmcongnhat"
                                :value="item.macn"
                              >
                                {{ item.tencn }}
                              </option>
                            </select>
                          </div>
                        </td>
                        <td></td>
                        <td>
                          <div class="select is-small is-fullwidth">
                            <select
                              v-model="item.mapxchoncn"
                              @change="
                                showtonhom_cn(
                                  $event,
                                  $event.target.selectedIndex,
                                  index
                                )
                              "
                            >
                              <option
                                v-for="item in phanxuong"
                                :value="item.mapx"
                              >
                                {{ item.mapx }} - {{ item.tenpx }}
                              </option>
                            </select>
                          </div>
                        </td>
                        <td>
                          <div class="select is-small is-fullwidth">
                            <select
                              @change="
                                getWithTo_cn(
                                  $event,
                                  $event.target.selectedIndex,
                                  index
                                )
                              "
                            >
                              <option
                                v-for="item in item.nhomto"
                                :value="item.mato"
                              >
                                {{ item.mato }} - {{ item.tento }}
                              </option>
                            </select>
                          </div>
                        </td>
                        <td>
                          <div class="select is-small is-fullwidth">
                            <select
                              @change="
                                getTencnCN(
                                  $event,
                                  $event.target.selectedIndex,
                                  index
                                )
                              "
                              @keydown="locOption($event)"
                              v-model="item.macn"
                            >
                              <option
                                v-for="(it, index) in item.nhomto_cnt"
                                :value="it.macn"
                                :key="index"
                              >
                                {{ it.sttchon }} - {{ it.tencn }}
                              </option>
                            </select>
                          </div>
                        </td>
                        <td>
                          <input
                            class="input is-small"
                            type="date"
                            v-bind:value="item.ngaythuchien | inputDateFilter"
                            v-on:input="
                              item.ngaythuchien = getDate($event.target.value)
                            "
                          />
                        </td>
                        <td>
                          <input
                            v-model="item.sogiocong"
                            type="number"
                            class="input is-small"
                          />
                        </td>
                        <td>
                          <textarea
                            class="textarea is-small"
                            v-model="item.ghichu"
                            name=""
                            id=""
                            rows="1"
                          ></textarea>
                        </td>
                        <td style="text-align: center; font-size: small">
                          <button
                            @click="copyCongnhat(item, index)"
                            class="button is-small is-danger"
                          >
                            Copy
                          </button>
                        </td>
                        <td style="text-align: center; font-size: small">
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
import { mapState } from "vuex";
export default {
  middleware: "auth",
  data() {
    return {
      selected: [],
      dmnguyencong: [],
      cong_nhan: [],
      cong_nhan_cn: [],
      phanxuong: [],
      selectedIndex: 0,
      dongia_ns: "",
      nhomluong: [],
      isExits: null,
      showlsxpx: [],
      isFilter: false,
      tonghonginlo: 0,
      tongdatinlo: "",
      form: {
        malonhamay: "",
        makhpx: "",
        tenpx: "",
        mapx: "",
        masp: "",
        tensp: "",
        createdAt: null,
        createdBy: this.$auth.$state.user.username,
        nhomluong: "",
        malosx: "",
        status: false,
        stopday_losx: "",
        tongdat: "",
        tonghong: "",
        mato: "",
        tento: "",
        id_losx: "",
        excutedAt: "",
      },
      px: "",
      isphanxuong: 0,
      iscongdoan: 0,
      iscongnhat: 0,
      getmakhpx: [],
      infosanpham: [],
      phieulosx: {},
      getinfoplsx: {},
      oneKehoach: [],
      dmcongnhat: [],
      allluongcongdoan: [],
      allluongcongnhat: [],
      isActive: false,
      tonhomid: [],
      phanxuong_cn: "",
      checkCongdoandathuchien: false,
      checkCongnhatdathuchien: false,
      checkViewluong: false,
      // new
      thangsl: "",
      namsl: "",
      maxuong: "",
      tenxuong: "",
      mato: "",
      tento: "",
      sllosx: [],
      templateLosx: [],
      // check nhiều phân xưởng
      options: ["Option 1", "Option 2", "Option 3", "Option 4"],
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
      multiSearch_nhomsp: "",
      // hightligh
      highlightedRow: null,
      tempData: [], // dữ liệu sau khi lọc
      filterOptions: 0,

      // input suggest
      suggestions: [],
      suggestions_nhomsp: [],
      maspinlosanxuat: [],

      // lọc talble lô sản xuất đang được sản xuất
      sortDirection: 1,
      sortKey: "_id",
      currentPage: 1,
      itemsPerPage: 10,

      // lọc talble
      currentSort: "mapx",
      currentSortDir: "asc",
      pageSize: 10,
      currentPage: 1,
      filter: "",

      // tìm theo mã id và
      search_maphieu_id: "",
      search_ngayhttt: "",

      // nhóm nguyên công trong chi tiết lương
      groups: {},
      totals: {},
      showConponent: true,

      ngayhoanthanh: "",
      items: [
        {
          _id_losx: "",
          kehoachnam: "",
          malonhamay: "",
          makhpx: "",
          malosx: this.malosx,
          mapx: "",
          mapxchoncn: "",
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
          stopday_losx: "",
          status: 0,
          to_cn: "",
          ngaythuchien: "",
          nhomto_cnt: {
            maxuong: "",
            tenxuong: "",
            tento: "",
            mato: "",
            tencn: "",
            macn: "",
            sttchon: "",
          },
          nhomto: [
            {
              maxuong: "",
              tenxuong: "",
              tento: "",
              mato: "",
            },
          ],
          selectedIndex: 0,
        },
      ],
      items_cn: [
        {
          _id_losx: "",
          kehoachnam: "",
          malonhamay: "",
          makhpx: "",
          malosx: this.malosx,
          macongnhat: "",
          tencongnhat: "",
          macongnhan: "",
          nguoithuchien: "",
          sogiocong: "",
          dongia: "",
          ghichu: "",
          to_cn: "",
          status: 0,
          ngaythuchien: "",
          nhomto_cnt: {
            maxuong: "",
            tenxuong: "",
            tento: "",
            mato: "",
            tencn: "",
            macn: "",
            sttchon: "",
          },
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
      items_tonghong: [
        {
          tonghong: "",
        },
      ],

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
    };
  },

  mounted() {
    this.currentDateTime();
    this.get_phanxuong();
    this.getSolieuLSX_ALl_cht();
    this.deleteRow(0);
    this.deleteRowCn(0);
    this.maspinlsx();
    // this.$store.dispatch('losanxuat/fetchLosanxuat')
  },

  isFormValid() {
    return !this.$v.form.$invalid;
  },

  computed: {
    // Load dữ liệu lương công đoạn từ VUEX
    // load dữ liệu lô sản xuất có status = 2
    // ...mapState({
    //     losanxuats: state => state.losanxuat.items,
    // }),
    // load dữ liệu lương công đoạn
    // luongcongdoans() {
    //     return this.$store.state.quanlyluong.luongcongdoans
    // },
    // luongcongnhats() {
    //     return this.$store.state.quanlyluong.luongcongnhats
    // },
    // tính tổng hỏng
    totalhong() {
      return this.allluongcongdoan.reduce((sohong) => (sohong += sohong), 0);
    },
    // chọn hết
    selectAll: {
      get: function () {
        return this.sllosx ? this.selected.length == this.sllosx.length : false;
      },
      set: function (value) {
        var selected = [];

        if (value) {
          this.sllosx.forEach(function (nv) {
            selected.push(nv);
          });
        }

        this.selected = selected;
      },
    },
    // phân trang và sắp xếp
    sortedTable() {
      return this.sllosx.sort((a, b) => {
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

  watch: {
    itemsPerPage() {
      this.currentPage = 1;
    },
    sllosx(newValue, oldValue) {
      // Cập nhật lại bảng khi có thay đổi
      this.sllosx = newValue;
    },
    allluongcongdoan: {
      handler() {
        this.calculateTotals();
      },
      deep: true,
    },
    // templateLosx(newValue, oldValue) {
    //   // Nếu giá trị biến filteredData thay đổi, cập nhật lại dữ liệu trên bảng số 1
    //   this.sllosx = newValue;
    // },
  },

  // dùng để bind dữ liệu ngày tháng vào input mang kiểu date (type="date" trong thẻ input)
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
    // cập nhật mato và tento do lỗi đăng ký losx k copy mato tento từ lokhoachphanxuong xuống
    async hh() {
      const response = await this.$axios.get("/api/lokehoach/laydanhsachmlnm");
      // console.log(response.data);
      // dữ liệu malonhamay có trong lô sản xuất
      const dataMalnm = response.data;
      const arrLnm = dataMalnm.map((item) => item.malonhamay);
      for (let i = 0; i < arrLnm.length; i++) {
        // console.log(arrLnm[i]);
        const rr = await this.$axios.get(
          `/api/lokehoach/laydsmatotento?malonhamay=${arrLnm[i]}`
        );
        // console.log(rr.data);
        const dt = {
          mato: rr.data[0].mato,
          tento: rr.data[0].tento,
        };
        // console.log(dt);
        const rrr = await this.$axios.patch(
          `/api/lokehoach/updatemato/${arrLnm[i]}`,
          dt
        );
        console.log(rrr);
      }
    },
    // --------------------------------------------------------------------------------------
    // 1: Các hàm hỗ trợ tính toán; lọc ...
    // hàm lấy ngày giờ hiện tại
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
      this.form.excutedAt = date + " " + time;
    },
    // hàm bind v-model input type date
    getDate(value) {
      if (!value) {
        return null;
      }
      return new Date(value);
    },
    // hàm highlight để đánh dấu row nào được chọn
    highlightRow(row) {
      this.highlightedRow = row;
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
    calculateTotals() {
      const groups = {};
      // console.log(this.luongcongdoans);
      this.allluongcongdoan.forEach((item) => {
        const dongia = parseFloat(item.dongia);
        const sodat = parseInt(item.sodat);
        const sohong = parseInt(item.sohong);

        if (!groups[item.nguyencong]) {
          groups[item.nguyencong] = {
            dongia: dongia,
            sodat: sodat,
            sohong: sohong,
          };
        } else {
          groups[item.nguyencong].dongia = dongia;
          groups[item.nguyencong].sodat += sodat;
          groups[item.nguyencong].sohong += sohong;
        }
      });

      const totals = {
        dongia: 0,
        sodat: 0,
        sohong: 0,
        tongtien: 0,
      };
      this.items.forEach((item) => {
        const dongia = parseFloat(item.dongia);
        const sodat = parseInt(item.sodat);
        const sohong = parseInt(item.sohong);

        totals.dongia += dongia;
        totals.sodat += sodat;
        totals.sohong += sohong;
        totals.tongtien += (sodat + sohong) * dongia;
      });

      this.groups = groups;
      this.totals = totals;
    },

    // hàm xử lý việc điều hướng qua lại giữa các input
    moveToNextRow(index, e) {
      const currentRowInputs =
        e.target.parentNode.parentNode.getElementsByTagName("input");
      const currentInputIndex = Array.prototype.indexOf.call(
        currentRowInputs,
        e.target
      );
      const nextRow = this.$refs.rows[index + 1];
      if (nextRow) {
        const nextRowInputs = nextRow.getElementsByTagName("input");
        // if (nextRowInputs.length > 0) {
        //   nextRowInputs[0].focus();
        // }
        if (nextRowInputs.length > currentInputIndex) {
          nextRowInputs[currentInputIndex].focus();
        }
      }
    },
    moveToPreviousRow(index, e) {
      const currentRowInputs =
        e.target.parentNode.parentNode.getElementsByTagName("input");
      const currentInputIndex = Array.prototype.indexOf.call(
        currentRowInputs,
        e.target
      );

      const previousRow = this.$refs.rows[index - 1];
      if (previousRow) {
        const previousRowInputs = previousRow.getElementsByTagName("input");
        if (previousRowInputs.length > currentInputIndex) {
          previousRowInputs[currentInputIndex].focus();
        }
      }
    },
    moveToNextColumn(index) {
      const currentRowInputs =
        this.$refs.rows[index].getElementsByTagName("input");
      const currentInput = document.activeElement;
      const currentIndex = Array.prototype.indexOf.call(
        currentRowInputs,
        currentInput
      );
      if (currentIndex < currentRowInputs.length - 1) {
        currentRowInputs[currentIndex + 1].focus();
      }
    },
    moveToPreviousColumn(index) {
      const currentRowInputs =
        this.$refs.rows[index].getElementsByTagName("input");
      const currentInput = document.activeElement;
      const currentIndex = Array.prototype.indexOf.call(
        currentRowInputs,
        currentInput
      );
      if (currentIndex > 0) {
        currentRowInputs[currentIndex - 1].focus();
      }
    },

    // async fetchLosanxuats() {
    //     const response = await this.$axios.$get('/api/losanxuats')
    //     return response.data
    // },
    // --------------------------------------------------------------------------------------
    // 2: Các hàm lấy dữ liệu từ server qua API
    // form load sẽ lấy ra dữ liệu của các lô sản xuất - nằm ở trạng thái sản xuất
    async getSolieuLSX_ALl_cht() {
      this.multiSearch_masp = "";
      this.multiSearch_nhomsp = "";
      this.search_maphieu_id = "";
      this.search_ngayhttt = "";
      this.Options_status = [];
      this.isOpen = false;
      this.isOpenst = false;
      this.selectedOptions = [];
      this.sllosx = await this.$axios.$get(`/api/ketoan/getallphieulocht`);
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
          title: "Không tìm thấy số liệu",
        });
      }
    },
    // get all phân xưởng
    async get_phanxuong() {
      this.phanxuong = await this.$axios.$get(`/api/phongban/allphanxuong`);
    },
    // lấy tất cả mã sản phẩm có trong lô sản xuất
    async maspinlsx() {
      this.maspinlosanxuat = await this.$axios.$get(
        "/api/lokehoach/hmsanphamlosanxuat"
      );
    },

    // --------------------------------------------------------------------------------------
    // 2: Các Hàm chức năng
    // Các hàm xử lý thêm, xóa, copy các công đoạn sản xuất hoặc công nhật của công nhân
    // Sự kiện bấm nút thêm các công đoạn sản xuất
    async addCongdoan() {
      // console.log(this.getinfoplsx)
      let arrayCongdoan;
      let px;

      if (
        this.getinfoplsx.mapx.trim() == "AL_PXD" ||
        this.getinfoplsx.mapx.trim() == "DV_PXD"
      ) {
        px = "PXD";
        arrayCongdoan = await this.$axios.$get(
          `/api/ketoan/getnguyencong?khsp=${this.getinfoplsx.nhomluong}&px=${px}`
        );
      } else {
        arrayCongdoan = await this.$axios.$get(
          `/api/ketoan/getnguyencong?khsp=${this.getinfoplsx.nhomluong}&px=${this.getinfoplsx.mapx}`
        );
      }

      if (this.getinfoplsx.mapx && !this.getinfoplsx.mato) {
        this.cong_nhan = await this.$axios.$get(
          `/api/congnhan/allcongnhanpx?mapx=${this.getinfoplsx.mapx}`
        );
      } else {
        this.cong_nhan = await this.$axios.$get(
          `/api/congnhan/allcongnhanto?mato=${this.getinfoplsx.mato}`
        );
      }

      // console.log(this.cong_nhan);

      for (let i = 0; i < arrayCongdoan.length; i++) {
        this.iscongdoan = 1;
        this.items.push({
          _id_losx: this.getinfoplsx._id,
          kehoachnam: this.getinfoplsx.kehoachnam,
          malonhamay: this.getinfoplsx.malonhamay,
          makhpx: this.getinfoplsx.makhpx,
          malosx: this.getinfoplsx.malosx,
          mapx: this.getinfoplsx.mapx,
          mato: this.getinfoplsx.mato,
          masp: this.getinfoplsx.masp,
          tensp: this.getinfoplsx.tensp,
          nguyencong: arrayCongdoan[i].congdoan,
          dongia: arrayCongdoan[i].dongia,
          may: "",
          mapxchoncn: "",
          to_cn: "",
          congnhan: "",
          tencn: "",
          sodat: "",
          sohong: 0,
          ghichu: "",
          stopday_losx: "",
          status: 0,
          ngaythuchien: this.getinfoplsx.ngaybd,
          nhomto_cnt: [],
          nhomto: [],
          selectedIndex: i,
        });
        // console.log(this.items);
      }
      for (let i = 0; i < this.items.length; i++) {
        // console.log(this.cong_nhan)
        for (let k = 0; k < this.cong_nhan.length; k++) {
          let cn = {
            maxuong: this.cong_nhan[k].mapx,
            tenxuong: this.cong_nhan[k].tenpx,
            tento: this.cong_nhan[k].tento,
            mato: this.cong_nhan[k].mato,
            tencn: this.cong_nhan[k].tencn,
            macn: this.cong_nhan[k].macn,
            sttchon: this.cong_nhan[k].sttchon,
          };
          this.items[i].nhomto_cnt.push(cn);
          // console.log(this.items[i].nhomto_cnt)
        }
      }
    },
    // Sự kiện bấm nút thêm công nhật của công nhân
    async addCongnhat() {
      if (this.getinfoplsx.mapx && !this.getinfoplsx.mato) {
        this.cong_nhan = await this.$axios.$get(
          `/api/congnhan/allcongnhanpx?mapx=${this.getinfoplsx.mapx}`
        );
      } else {
        this.cong_nhan = await this.$axios.$get(
          `/api/congnhan/allcongnhanto?mato=${this.getinfoplsx.mato}`
        );
      }
      this.dmcongnhat = await this.$axios.$get(`/api/ketoan/alldmcongnhat`);
      this.iscongnhat = 1;

      this.items_cn.push({
        _id_losx: this.getinfoplsx._id,
        kehoachnam: this.getinfoplsx.kehoachnam,
        malonhamay: this.getinfoplsx.malonhamay,
        makhpx: this.getinfoplsx.makhpx,
        malosx: this.malosx,
        macongnhat: "",
        tencongnhat: "",
        macongnhan: "",
        nguoithuchien: "",
        sogiocong: "",
        ghichu: "",
        masp: this.getinfoplsx.masp,
        tensp: this.getinfoplsx.tensp,
        mapx: "",
        mato: "",
        to_cn: "",
        stopday_losx: "",
        status: 0,
        ngaythuchien: this.getinfoplsx.ngaybd,
        nhomto_cnt: [],
        nhomto: [],
      });
      for (let i = 0; i < this.items_cn.length; i++) {
        // console.log(this.cong_nhan)
        for (let k = 0; k < this.cong_nhan.length; k++) {
          let cn = {
            maxuong: this.cong_nhan[k].mapx,
            tenxuong: this.cong_nhan[k].tenpx,
            tento: this.cong_nhan[k].tento,
            mato: this.cong_nhan[k].mato,
            tencn: this.cong_nhan[k].tencn,
            macn: this.cong_nhan[k].macn,
            sttchon: this.cong_nhan[k].sttchon,
          };
          this.items_cn[i].nhomto_cnt.push(cn);
          // console.log(this.items[i].nhomto_cnt)
        }
      }

      // console.log(this.items_cn);
    },
    // search phiếu
    async searchPhieu() {
      if (this.search_maphieu_id != "" && this.search_ngayhttt == "") {
        this.tempData = [];
        this.sllosx = [];
        this.sllosx = await this.$axios.$get(
          `/api/lokehoach/searchwithid?_id=${this.search_maphieu_id}`
        );
      } else if (this.search_maphieu_id == "" && this.search_ngayhttt != "") {
        this.tempData = [];
        this.sllosx = [];
        this.sllosx = await this.$axios.$get(
          `/api/lokehoach/searchwithngayhttt?ngayhoanthanhtt=${this.search_ngayhttt}`
        );
      } else {
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
          icon: "error",
          title: "Chỉ chọn tìm bằng mã phiếu hoặc là ngày hoàn thành",
        });
      }
    },

    // Copy công đoạn sản xuất
    async copyCongdoan(data, index) {
      let arrayCongdoan;
      let px;

      if (data.mapx.trim() == "AL_PXD" || data.mapx.trim() == "DV_PXD") {
        px = "PXD";
        arrayCongdoan = await this.$axios.$get(
          `/api/ketoan/getnguyencong?khsp=${data.nhomluong}&px=${px}`
        );
      } else {
        arrayCongdoan = await this.$axios.$get(
          `/api/ketoan/getnguyencong?khsp=${data.nhomluong}&px=${data.mapx}`
        );
      }

      if (data.mapx && !data.mato) {
        this.cong_nhan = await this.$axios.$get(
          `/api/congnhan/allcongnhanpx?mapx=${data.mapx}`
        );
      } else {
        this.cong_nhan = await this.$axios.$get(
          `/api/congnhan/allcongnhanto?mato=${data.mato}`
        );
      }

      //   const copydta = {
      //     _id_losx: this.items[index]._id_losx,
      //     kehoachnam: this.items[index].kehoachnam,
      //     malonhamay: this.items[index].malonhamay,
      //     makhpx: this.items[index].makhpx,
      //     malosx: this.items[index].malosx,
      //     mapx: this.items[index].mapx,
      //     mato: this.items[index].mato,
      //     masp: this.items[index].masp,
      //     tensp: this.items[index].tensp,
      //     nguyencong: this.items[index].nguyencong,
      //     dongia: this.items[index].dongia,
      //     may: "",
      //     mapxchoncn: "",
      //     to_cn: "",
      //     congnhan: "",
      //     tencn: "",
      //     sodat: this.items[index].sodat,
      //     sohong: this.items[index].sohong,
      //     ghichu: "",
      //     stopday_losx: "",
      //     status: 0,
      //     ngaythuchien: this.items[index].ngaythuchien,
      //     nhomto_cnt: [
      //       {
      //         maxuong: "",
      //         tenxuong: "",
      //         tento: "",
      //         mato: "",
      //         tencn: "",
      //         macn: "",
      //       },
      //     ],
      //     nhomto: [
      //       {
      //         maxuong: "",
      //         tenxuong: "",
      //         tento: "",
      //         mato: "",
      //       },
      //     ],
      //     selectedIndex: this.items[index].selectedIndex
      //   };
      const copydta = { ...data };
      this.items.splice(index + 1, 0, copydta);

      //   for (let i = 0; i < this.items.length; i++) {
      //     // console.log(this.cong_nhan)
      //     for (let k = 0; k < this.cong_nhan.length; k++) {
      //       let cn = {
      //         maxuong: this.cong_nhan[k].mapx,
      //         tenxuong: this.cong_nhan[k].tenpx,
      //         tento: this.cong_nhan[k].tento,
      //         mato: this.cong_nhan[k].mato,
      //         tencn: this.cong_nhan[k].tencn,
      //         macn: this.cong_nhan[k].macn,
      //       };
      //       this.items[i].nhomto_cnt.push(cn);
      //       // console.log(this.items[i].nhomto_cnt)
      //     }
      //   }
    },
    // Copy công nhật
    copyCongnhat(data, index) {
      data = { ...this.items_cn[index] };
      this.items_cn.splice(index + 1, 0, data);
      // console.log(this.items)
    },
    // Delete 1 row công đoạn
    deleteRow(index) {
      this.items.splice(index, 1);
    },
    // Delete 1 row công nhật
    deleteRowCn(index) {
      this.items_cn.splice(index, 1);
    },
    // Các hàm xử lý sự kiện thay đổi hộp select
    // Bấm vào chọn tổ
    async getWithTo(e, selectedIndex, index) {
      this.selectedIndex = selectedIndex;
      // console.log(index)
      for (let i = 0; i < this.items.length; i++) {
        if (i == index) {
          // console.log(this.tonhomid[this.selectedIndex]);
          this.items[i].mato = this.tonhomid[this.selectedIndex].mato;
          // console.log(this.tonhomid[this.selectedIndex].mato);
          // select * from congnhan where mato=mato
          // gán vào ds công nhân
          this.cong_nhan = await this.$axios.$get(
            `/api/congnhan/allcongnhanto?mato=${
              this.tonhomid[this.selectedIndex].mato
            }`
          );
          this.items[i].nhomto_cnt = [];

          for (let k = 0; k < this.cong_nhan.length; k++) {
            let cn = {
              maxuong: this.cong_nhan[k].mapx,
              tenxuong: this.cong_nhan[k].tenpx,
              tento: this.cong_nhan[k].tento,
              mato: this.cong_nhan[k].mato,
              tencn: this.cong_nhan[k].tencn,
              macn: this.cong_nhan[k].macn,
            };
            this.items[i].nhomto_cnt.push(cn);
            // console.log(cn)
          }
        }
      }
    },
    async getWithTo_cn(e, selectedIndex, index) {
      this.selectedIndex = selectedIndex;
      // console.log(index)
      for (let i = 0; i < this.items_cn.length; i++) {
        if (i == index) {
          // console.log(this.tonhomid[this.selectedIndex]);
          this.items_cn[i].mato = this.tonhomid[this.selectedIndex].mato;
          // console.log(this.tonhomid[this.selectedIndex].mato);
          // select * from congnhan where mato=mato
          // gán vào ds công nhân
          this.cong_nhan = await this.$axios.$get(
            `/api/congnhan/allcongnhanto?mato=${
              this.tonhomid[this.selectedIndex].mato
            }`
          );
          this.items_cn[i].nhomto_cnt = [];

          for (let k = 0; k < this.cong_nhan.length; k++) {
            let cn = {
              maxuong: this.cong_nhan[k].mapx,
              tenxuong: this.cong_nhan[k].tenpx,
              tento: this.cong_nhan[k].tento,
              mato: this.cong_nhan[k].mato,
              tencn: this.cong_nhan[k].tencn,
              macn: this.cong_nhan[k].macn,
            };
            this.items_cn[i].nhomto_cnt.push(cn);
            // console.log(cn)
          }
        }
      }
    },
    // Show tổ nhóm
    async showtonhom(e, selectedIndex, index) {
      var name = e.target.options[e.target.options.selectedIndex].text;
      // console.log(name)
      let position = name.split("-");
      let p1 = position[0].trim();
      // console.log(p1)
      this.tonhomid = await this.$axios.$get(
        `/api/phongban/alltoinxuong?mapx=${p1}`
      );
      if (this.tonhomid.length > 0) {
        for (let i = 0; i < this.items.length; i++) {
          if (i == index) {
            this.items[i].nhomto = [];
            // this.tonhomid = await this.$axios.$get(
            //   `/api/phongban/alltoinxuong?mapx=${p1}`
            // );
            for (let k = 0; k < this.tonhomid.length; k++) {
              let cn = {
                maxuong: this.tonhomid[k].mapx,
                tenxuong: this.tonhomid[k].tenpx,
                tento: this.tonhomid[k].tento,
                mato: this.tonhomid[k].mato,
              };
              this.items[i].nhomto.push(cn);
              // console.log(cn)
            }
          }
        }
      } else {
        for (let i = 0; i < this.items.length; i++) {
          if (i == index) {
            this.items[i].nhomto = [];
            this.cong_nhan = await this.$axios.$get(
              `/api/congnhan/allcongnhanpx?mapx=${p1}`
            );
            this.items[i].nhomto_cnt = [];
            for (let k = 0; k < this.cong_nhan.length; k++) {
              let cn = {
                maxuong: this.cong_nhan[k].mapx,
                tenxuong: this.cong_nhan[k].tenpx,
                tento: this.cong_nhan[k].tento,
                mato: this.cong_nhan[k].mato,
                tencn: this.cong_nhan[k].tencn,
                macn: this.cong_nhan[k].macn,
              };
              this.items[i].nhomto_cnt.push(cn);
              // console.log(cn)
            }
          }
        }
      }
    },
    async showtonhom_cn(e, selectedIndex, index) {
      var name = e.target.options[e.target.options.selectedIndex].text;
      // console.log(name)
      let position = name.split("-");
      let p1 = position[0].trim();
      // console.log(p1);
      this.tonhomid = await this.$axios.$get(
        `/api/phongban/alltoinxuong?mapx=${p1}`
      );
      // console.log(this.tonhomid);
      if (this.tonhomid.length > 0) {
        for (let i = 0; i < this.items_cn.length; i++) {
          if (i == index) {
            this.items_cn[i].nhomto = [];
            // this.tonhomid = await this.$axios.$get(
            //   `/api/phongban/alltoinxuong?mapx=${p1}`
            // );
            for (let k = 0; k < this.tonhomid.length; k++) {
              let cn = {
                maxuong: this.tonhomid[k].mapx,
                tenxuong: this.tonhomid[k].tenpx,
                tento: this.tonhomid[k].tento,
                mato: this.tonhomid[k].mato,
              };
              this.items_cn[i].nhomto.push(cn);
              // console.log(cn)
            }
          }
        }
      } else {
        for (let i = 0; i < this.items_cn.length; i++) {
          if (i == index) {
            this.items_cn[i].nhomto = [];
            this.cong_nhan = await this.$axios.$get(
              `/api/congnhan/allcongnhanpx?mapx=${p1}`
            );
            console.log(this.cong_nhan);
            this.items_cn[i].nhomto_cnt = [];
            for (let k = 0; k < this.cong_nhan.length; k++) {
              let cn = {
                maxuong: this.cong_nhan[k].mapx,
                tenxuong: this.cong_nhan[k].tenpx,
                tento: this.cong_nhan[k].tento,
                mato: this.cong_nhan[k].mato,
                tencn: this.cong_nhan[k].tencn,
                macn: this.cong_nhan[k].macn,
              };
              this.items_cn[i].nhomto_cnt.push(cn);
              // console.log(cn)
            }
          }
        }
      }
    },
    // Lấy tên công nhân
    getTencn(event, selectedIndex, index) {
      // console.log(event);
      // console.log(selectedIndex, index);
      // console.log(this.items);
      for (let i = 0; i < this.items.length; i++) {
        if (i == index) {
          this.items[i].congnhan = this.items[i].nhomto_cnt[selectedIndex].macn;
          // console.log(this.items[i].nhomto_cnt[selectedIndex].macn);
          this.items[i].tencn = this.items[i].nhomto_cnt[selectedIndex].tencn;
          this.items[i].phanxuong_cn =
            this.items[i].nhomto_cnt[selectedIndex].maxuong;
          this.items[i].to_cn = this.items[i].nhomto_cnt[selectedIndex].mato;
        }
      }
    },

    getTencnCN(event, selectedIndex, index) {
      this.selectedIndex = selectedIndex;
      for (let i = 0; i < this.items_cn.length; i++) {
        if (i == index) {
          this.items_cn[i].malosx = this.malosx;
          // this.items_cn[i].nguoithuchien =
          //   this.cong_nhan_cn[this.selectedIndex].tencn;
          this.items_cn[i].malosx = this.form.malosx;

          this.items_cn[i].macongnhan =
            this.items_cn[i].nhomto_cnt[this.selectedIndex].macn;
          this.items_cn[i].nguoithuchien =
            this.items_cn[i].nhomto_cnt[this.selectedIndex].tencn;
        }
      }
      // console.log(this.items_cn);
    },

    locOption(event) {
      var select = event.target;
      var options = select.options;
      var key = event.key;
      var index = parseInt(key, 10) - 1;
      if (isNaN(index) || index < 0 || index >= options.length) {
        return;
      }
      var option = options[index];
      select.selectedIndex = index;
      select.dispatchEvent(new Event("change"));
      event.preventDefault();
    },

    // lấy công nhật
    async getCongnhat(event, selectedIndex, index) {
      this.selectedIndex = selectedIndex;
      for (let i = 0; i < this.items_cn.length; i++) {
        if (i == index) {
          this.items_cn[i].tencongnhat =
            this.dmcongnhat[this.selectedIndex].tencn;
          this.items_cn[i].dongia = this.dmcongnhat[this.selectedIndex].dongia;
          this.items_cn[i].malosx = this.getinfoplsx.malosx;
          this.items_cn[i].malonhamay = this.getinfoplsx.malonhamay;
          this.items_cn[i].makhpx = this.getinfoplsx.makhpx;
          this.items_cn[i].tensp = this.getinfoplsx.tensp;
          this.items_cn[i].mapx = this.getinfoplsx.mapx;
          this.items_cn[i]._id_losx = this.getinfoplsx._id;
        }
      }
      // console.log(this.items_cn);
      if (this.form.mato == "") {
        for (let i = 0; i < this.items_cn.length; i++) {
          if (i == index) {
            this.cong_nhan_cn = await this.$axios.$get(
              `/api/congnhan/allcongnhanpx?mapx=${this.form.mapx}`
            );
            // console.log(this.cong_nhan);
            this.items_cn[i].nhomto_cnt = [];

            for (let k = 0; k < this.cong_nhan_cn.length; k++) {
              let cn = {
                maxuong: this.cong_nhan_cn[k].mapx,
                tenxuong: this.cong_nhan_cn[k].tenpx,
                tento: this.cong_nhan_cn[k].tento,
                mato: this.cong_nhan_cn[k].mato,
                tencn: this.cong_nhan_cn[k].tencn,
                macn: this.cong_nhan_cn[k].macn,
                sttchon: this.cong_nhan_cn[k].sttchon,
              };
              this.items_cn[i].nhomto_cnt.push(cn);
              // console.log(cn)
            }
            // console.log(this.items_cn[i].nhomto_cnt)
          }
        }
      } else {
        for (let i = 0; i < this.items_cn.length; i++) {
          if (i == index) {
            // console.log(this.form.mato);
            this.cong_nhan_cn = await this.$axios.$get(
              `/api/congnhan/allcongnhanto?mato=${this.form.mato}`
            );
            // console.log(this.cong_nhan_cn);
            this.items_cn[i].nhomto_cnt = [];

            for (let k = 0; k < this.cong_nhan_cn.length; k++) {
              let cn = {
                maxuong: this.cong_nhan_cn[k].mapx,
                tenxuong: this.cong_nhan_cn[k].tenpx,
                tento: this.cong_nhan_cn[k].tento,
                mato: this.cong_nhan_cn[k].mato,
                tencn: this.cong_nhan_cn[k].tencn,
                macn: this.cong_nhan_cn[k].macn,
                sttchon: this.cong_nhan_cn[k].sttchon,
              };
              this.items_cn[i].nhomto_cnt.push(cn);
            }
          }
        }
      }
    },
    // Các Hàm xử lý sự kiện bấm nút ra thông tin
    // Bấm vào mã lô sản xuất sẽ ra thông tin lương đã nhập
    async getInfoLosx(infoPhieulo) {
      this.checkViewluong = true;
      this.allluongcongdoan = await this.$axios.$get(
        `/api/ketoan/getallluongcongdoaninlsx?_id_losx=${infoPhieulo._id}`
      );
      this.allluongcongnhat = await this.$axios.$get(
        `/api/ketoan/getallluongcongnhatinlsx?_id_losx=${infoPhieulo._id}`
      );
      // this.isActive = true;
      this.calculateTotals();
      // console.log(this.groups)
      this.iscongdoan = 1;
      this.getinfoplsx = infoPhieulo;
      // console.log(this.getinfoplsx);
      // this.form.id_losx = this.getinfoplsx._id;
      // this.form.nhomluong = infoPhieulo.nhomluong;
      // this.form.mapx = infoPhieulo.mapx;
      // this.form.malosx = infoPhieulo.malosx;
      // this.form.malonhamay = infoPhieulo.malonhamay;
      // this.form.makhpx = infoPhieulo.makhpx;
      // this.form.tensp = infoPhieulo.tensp;
      // this.form.mato = infoPhieulo.mato;
      // this.form.tento = infoPhieulo.tento;
      this.form = { ...infoPhieulo };

      // lấy mã nhóm lương dựa vào mã sp và mã phân xưởng
      if (
        this.form.mapx == "PXD" ||
        this.form.mapx == "AL_PXD" ||
        this.form.mapx == "DV_PXD"
      ) {
        let phanxuong = "PXD";
        this.dmnguyencong = await this.$axios.$get(
          `/api/ketoan/getnguyencong?khsp=${this.form.nhomluong}&px=${phanxuong}`
        );
      } else {
        this.dmnguyencong = await this.$axios.$get(
          `/api/ketoan/getnguyencong?khsp=${this.form.nhomluong}&px=${this.form.mapx}`
        );
        // console.log(this.dmnguyencong)
      }
    },
    // Bấm vào nhập lương sẽ ra popup nhập lương
    async vaoPhieuluong(infoPhieulo) {
      this.isActive = true;
      // console.log(infoPhieulo)
      this.items = [];
      this.iscongdoan = 1;
      this.getinfoplsx = infoPhieulo;
      // console.log(this.getinfoplsx);
      this.form.id_losx = this.getinfoplsx._id;
      this.form.nhomluong = infoPhieulo.nhomluong;
      this.form.mapx = infoPhieulo.mapx;
      this.form.malosx = infoPhieulo.malosx;
      this.form.makh = infoPhieulo.makh;
      this.form.makhpx = infoPhieulo.makhpx;
      this.form.tensp = infoPhieulo.tensp;
      this.form.mato = infoPhieulo.mato;
      this.form.tento = infoPhieulo.tento;

      // this.allluongcongdoan = await this.$axios.$get(
      //     `/api/ketoan/getallluongcongdoaninlsx?makh=${this.form.makh}&makhpx=${this.form.makhpx}&malosx=${this.form.malosx}&mapx=${this.form.mapx}`
      // );
      // this.allluongcongnhat = await this.$axios.$get(
      //     `/api/ketoan/getallluongcongnhatinlsx?makh=${this.form.makh}&makhpx=${this.form.makhpx}&malosx=${this.form.malosx}&mapx=${this.form.mapx}`
      // );

      // lấy mã nhóm lương dựa vào mã sp và mã phân xưởng
      if (
        this.form.mapx == "PXD" ||
        this.form.mapx == "AL_PXD" ||
        this.form.mapx == "DV_PXD"
      ) {
        let phanxuong = "PXD";
        this.dmnguyencong = await this.$axios.$get(
          `/api/ketoan/getnguyencong?khsp=${this.form.nhomluong}&px=${phanxuong}`
        );
      } else {
        this.dmnguyencong = await this.$axios.$get(
          `/api/ketoan/getnguyencong?khsp=${this.form.nhomluong}&px=${this.form.mapx}`
        );
        // console.log(this.dmnguyencong)
      }

      // tính tổng hỏng

      const sumhong = await this.$axios.$get(
        `/api/ketoan/sumtonghong?_id_losx=${this.getinfoplsx._id}`
      );

      let j = sumhong[0].tonghong;
      this.tonghonginlo = j;
    },
    // Hàm cập nhật nhanh khi gõ số lượng hoàn thành vào sẽ đổi trạng thái Lô sản xuất
    async updateStatus(data) {
      // yêu cầu là khi sửa số lượng cập nhật nhanh thì nếu > 0 thì update mỗi soluongkhsx
      // còn nếu <=0 thì soluongkhsx = 0 và ngayhoanthanhtt == null và status == 2
      try {
        if (parseFloat(data.soluongkhsx) <= 0) {
          // data.status = 3;
          // yêu cầu từ anh tiến là vẫn để sản xuất nên sửa lại
          data.ngayhoanthanhtt = null;
          data.status = 2;
        }
        this.$axios.$patch(
          `/api/lokehoach/losanxuat/soluongcnnandststus/${data._id}`,
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

    // cập nhật ngày hoàn thành thực tế
    async updateNgayhoanttt(value, item) {
      // yêu cầu là nếu cập nhật ngày hoàn thành tt thì thay đổi status=3
      // và nếu muốn ngày này bằng null thì thay đổi số lượng cập nhật nhanh thành 0
      try {
        // console.log(value);
        // cập nhật ngày hoàn thành thực tế
        const data = { ngayhoanthanhtt: value, status: 3 };
        // const response = await this.$axios.$patch(
        //   `/api/lokehoach/losanxuat/updatengayhttt/${item._id}`,
        //   data
        // );
        // anh tiến yêu cầu khi cập nhật ngày hoàn thành thực tế thì chuyển lô thành trạng thái HT 2284
        const response = await this.$axios.$patch(
          `/api/lokehoach/losanxuat/statusandngayhttt/${item._id}`,
          data
        );
        // console.log(response);
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
          !this.Options_status.length &&
          this.multiSearch_masp == "" &&
          this.search_ngayhttt == ""
        ) {
          this.getSolieuLSX_ALl_cht();
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
    // Hàm xử lý chốt phiếu
    // Chốt phiếu
    async chotPhieulo() {
      // Quy trình khi chốt phiếu lô sản xuất
      // 1. Chốt các mã lô sản xuất đã được chọn
      // 1.1. Chạy vòng lặp các selected đã chọn
      // Với mỗi select phiếu lô đã chọn thì cập nhật status = 1 và ngày chốt phiếu đó cho những lô sản xuất đó
      // 2. Chốt các lương công đoạn, công nhật trong nội tại từng lô đó
      // với status = 0 và ngày chốt

      // console.log(this.selected.length)

      const listPhieulo = [];
      for (let i = 0; i < this.selected.length; i++) {
        listPhieulo.push(this.selected[i].malosx);
      }
      // console.log(listPhieulo)
      var message = `${listPhieulo.join(", ")}`;
      Swal.fire(message, "success");

      if (this.selected.length < 1) {
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
          title: "Không có phiếu nào được tích chọn",
        });
        return;
      } else {
        Swal.fire({
          title: `Bạn chắc chắn chốt các phiếu lô sản xuất: ${message}?`,
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Chắc chắn",
          customClass: {
            title: "custom-swal",
          },
        }).then((result) => {
          if (result.isConfirmed) {
            try {
              for (let i = 0; i < this.selected.length; i++) {
                let data = {
                  stopday_losx: this.selected[i].ngaykt,
                  status: 1,
                };
                let data_losanxuat = {
                  status: 3,
                  stopday_losx: this.selected[i].ngaykt,
                  status_tinhluong: 1,
                };
                // cập nhật status và stopday_losx cho từng lô sản xuất ứng với từng lô sản xuất theo kế hoạch trong xưởng đó
                // status đổi thành số 3 là hoàn thành
                this.$axios.$patch(
                  `/api/ketoan/capnhatstatuslosx/${this.selected[i]._id}`,
                  data_losanxuat
                );
                // cập nhật status và stopday_losx cho từng lương công đoạn có trong mỗi lô sản xuất ứng với kế hoạch tại xưởng

                this.$axios.$patch(
                  `/api/ketoan/capnhatstatuslcd/${this.selected[i]._id}`,
                  data
                );
                // cập nhật status và stopday_losx cho từng lương công nhật có trong mỗi lô sản xuất ứng với kế hoạch tại xưởng
                // kiểm tra có công nhật trong lô hay không?
                var check_congdoan = [];
                this.$axios
                  .$get(
                    `/api/ketoan/checkcongnhat?_id_losx=${this.selected[i]._id}`
                  )
                  .then((resp) => {
                    // console.log(resp);
                    check_congdoan = resp;
                    // console.log(check_congdoan);
                  })
                  .catch((err) => {
                    // Handle Error Here
                    console.error(err);
                  });
                if (check_congdoan.length > 0) {
                  this.$axios.$patch(
                    `/api/ketoan/capnhatstatusluongcnhat/${this.selected[i]._id}`,
                    data
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
                title: "Đã chốt thành công",
              });

              this.getSolieuLSX_ALl_cht();
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
      }
    },
    // Hủy từng phiếu
    async xacnhanHuyChotphieu() {
      let data = {
        stopday_losx: this.form.stopday_losx,
        status: 0,
      };
      let data_lsx = {
        status: 2,
        stopday_losx: this.form.stopday_losx,
        status_tinhluong: 0,
      };
      // console.log(this.getinfoplsx)
      // cập nhật lại status lô sản xuất theo _id của lô sản xuất
      this.$axios.$patch(
        `/api/ketoan/capnhatstatuslosx/${this.getinfoplsx._id}`,
        data_lsx
      );
      // cập nhật lại status của các đoạn lương công đoạn, công nhật ứng với lô sản xuất đó thông qua _id_losx
      this.$axios.$patch(
        `/api/ketoan/capnhatstatuslcd/${this.getinfoplsx._id}`,
        data
      );
      // cập nhật status và stopday_losx cho từng lương công nhật có trong mỗi lô sản xuất ứng với kế hoạch tại xưởng
      // kiểm tra có công nhật trong lô hay không?
      var check_congdoan = [];
      this.$axios
        .$get(`/api/ketoan/checkcongnhat?_id_losx=${this.selected[i]._id}`)
        .then((resp) => {
          // console.log(resp);
          check_congdoan = resp;
          // console.log(check_congdoan);
        })
        .catch((err) => {
          // Handle Error Here
          console.error(err);
        });
      if (check_congdoan.length > 0) {
        this.$axios.$patch(
          `/api/ketoan/capnhatstatusluongcnhat/${this.selected[i]._id}`,
          data
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
        title: "Đã hủy chốt phiếu",
      });

      this.getSolieuLSX_ALl_cht();
    },
    // Hủy chốt toàn bộ phiếu
    async huychotallPhieulo() {
      // console.log(this.selected)
      for (let i = 0; i < this.selected.length; i++) {
        let data = {
          stopday_losx: "",
          status: 0,
        };
        let data_losx = {
          status: 2,
          stopday_losx: "",
          status_tinhluong: 0,
        };
        // cập nhật status và stopday_losx cho từng lô sản xuất ứng với _id
        this.$axios.$patch(
          `/api/ketoan/capnhatstatuslosx/${this.selected[i]._id}`,
          data_losx
        );
        // cập nhật status và stopday_losx cho từng lương công đoạn có trong mỗi lô sản xuất ứng với kế hoạch tại xưởng
        this.$axios.$patch(
          `/api/ketoan/capnhatstatuslcd/${this.selected[i]._id}`,
          data
        );
        // cập nhật status và stopday_losx cho từng lương công nhật có trong mỗi lô sản xuất ứng với kế hoạch tại xưởng
        // cập nhật status và stopday_losx cho từng lương công nhật có trong mỗi lô sản xuất ứng với kế hoạch tại xưởng
        // kiểm tra có công nhật trong lô hay không?
        var check_congdoan = [];
        this.$axios
          .$get(`/api/ketoan/checkcongnhat?_id_losx=${this.selected[i]._id}`)
          .then((resp) => {
            // console.log(resp);
            check_congdoan = resp;
            // console.log(check_congdoan);
          })
          .catch((err) => {
            // Handle Error Here
            console.error(err);
          });
        if (check_congdoan.length > 0) {
          this.$axios.$patch(
            `/api/ketoan/capnhatstatusluongcnhat/${this.selected[i]._id}`,
            data
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
        title: "Đã hủy chốt toàn bộ phiếu đã chọn",
      });

      this.getSolieuLSX_ALl_cht();
    },

    // Hàm lọc dữ liệu
    // Lọc nhiều tiêu chí
    async filterData() {
      this.allluongcongdoan = [];
      this.allluongcongnhat = [];
      // console.log(this.selectedOptions)
      // console.log(this.Options_status)
      // console.log(this.search_ngayhttt);
      this.isOpen = false;
      this.isOpenst = false;

      const mapxList = this.selectedOptions;
      const masp = this.multiSearch_masp;
      const status = this.Options_status;
      const ngayhoanthanh = this.search_ngayhttt;

      // chọn lọc full 1
      if (
        this.selectedOptions.length > 0 &&
        this.Options_status.length > 0 &&
        this.multiSearch_masp != "" &&
        this.search_ngayhttt != ""
      ) {
        this.tempData = [];
        this.filterOptions = 8;
        this.tempData = await this.$axios.$get(
          `/api/lokehoach/filterfulldklosanxuatwithngayhttt`,
          {
            params: {
              mapx: mapxList, // Truyền danh sách mã phân xưởng lên server
              masp: masp,
              status: status,
              ngayhoanthanh: ngayhoanthanh,
            },
          }
        );
        // console.log(this.tempData);
        this.sllosx = this.tempData;
      }
      // mã px mã sản phẩm ngày hoàn thành
      else if (
        this.selectedOptions.length > 0 &&
        !this.Options_status.length &&
        this.multiSearch_masp != "" &&
        this.search_ngayhttt != ""
      ) {
        this.tempData = [];
        this.filterOptions = 8;
        this.tempData = await this.$axios.$get(
          `/api/lokehoach/mapxmaspngayhoanthanhlsx`,
          {
            params: {
              mapx: mapxList, // Truyền danh sách mã phân xưởng lên server
              masp: masp,
              ngayhoanthanh: ngayhoanthanh,
            },
          }
        );
        // console.log(this.tempData);
        this.sllosx = this.tempData;
      }
      // mã px trạng thái ngày hoàn thành
      else if (
        this.selectedOptions.length > 0 &&
        this.Options_status.length > 0 &&
        this.multiSearch_masp == "" &&
        this.search_ngayhttt != ""
      ) {
        this.tempData = [];
        this.filterOptions = 8;
        this.tempData = await this.$axios.$get(
          `/api/lokehoach/mapxstatusngayhoanthanhlsx`,
          {
            params: {
              mapx: mapxList, // Truyền danh sách mã phân xưởng lên server
              status: status,
              ngayhoanthanh: ngayhoanthanh,
            },
          }
        );
        // console.log(this.tempData);
        this.sllosx = this.tempData;
      }
      // sản phẩm trạng thái ngày hoàn thành
      else if (
        !this.selectedOptions.length &&
        this.Options_status.length > 0 &&
        this.multiSearch_masp != "" &&
        this.search_ngayhttt != ""
      ) {
        this.tempData = [];
        this.filterOptions = 8;
        this.tempData = await this.$axios.$get(
          `/api/lokehoach/maspstatusngayhoanthanhlsx`,
          {
            params: {
              masp: masp, // Truyền danh sách mã phân xưởng lên server
              status: status,
              ngayhoanthanh: ngayhoanthanh,
            },
          }
        );
        // console.log(this.tempData);
        this.sllosx = this.tempData;
      }
      // phân xưởng ngày hoàn thành
      else if (
        this.selectedOptions.length > 0 &&
        !this.Options_status.length &&
        this.multiSearch_masp == "" &&
        this.search_ngayhttt != ""
      ) {
        this.tempData = [];
        this.filterOptions = 8;
        this.tempData = await this.$axios.$get(
          `/api/lokehoach/filterphanxuongandngayhttt`,
          {
            params: {
              mapx: mapxList, // Truyền danh sách mã phân xưởng lên server
              ngayhoanthanh: ngayhoanthanh,
            },
          }
        );
        // console.log(this.tempData);
        this.sllosx = this.tempData;
      }
      // mã sp ngày hoàn thành
      else if (
        !this.selectedOptions.length &&
        !this.Options_status.length &&
        this.multiSearch_masp != "" &&
        this.search_ngayhttt != ""
      ) {
        this.tempData = [];
        this.filterOptions = 8;
        this.tempData = await this.$axios.$get(
          `/api/lokehoach/maspngayhoanthanhlsx`,
          {
            params: {
              masp: masp, // Truyền danh sách mã phân xưởng lên server
              ngayhoanthanh: ngayhoanthanh,
            },
          }
        );
        // console.log(this.tempData);
        this.sllosx = this.tempData;
      }
      // status ngày hoàn thành
      else if (
        !this.selectedOptions.length &&
        this.Options_status.length > 0 &&
        this.multiSearch_masp == "" &&
        this.search_ngayhttt != ""
      ) {
        this.tempData = [];
        this.filterOptions = 8;
        this.tempData = await this.$axios.$get(
          `/api/lokehoach/statusngayhoanthanhlsx`,
          {
            params: {
              status: status, // Truyền danh sách mã phân xưởng lên server
              ngayhoanthanh: ngayhoanthanh,
            },
          }
        );
        // console.log(this.tempData);
        this.sllosx = this.tempData;
      } else if (
        this.selectedOptions.length > 0 &&
        this.Options_status.length > 0 &&
        this.multiSearch_masp != ""
      ) {
        this.tempData = [];
        this.filterOptions = 1;
        this.tempData = await this.$axios.$get(
          `/api/lokehoach/filterfulldklosanxuat`,
          {
            params: {
              mapx: mapxList, // Truyền danh sách mã phân xưởng lên server
              masp: masp,
              status: status,
            },
          }
        );
        // console.log(this.tempData);
        this.sllosx = this.tempData;
      }
      // chỉ có mã px 2
      else if (
        this.selectedOptions.length > 0 &&
        !this.Options_status.length &&
        this.multiSearch_masp == ""
      ) {
        this.tempData = [];
        this.filterOptions = 2;
        this.tempData = [];
        this.sllosx = [];
        this.tempData = await this.$axios.$get(
          `/api/lokehoach/filteronlymapxlosanxuat`,
          {
            params: {
              mapx: mapxList,
            },
          }
        );
        this.sllosx = this.tempData;
      }
      // chỉ có mã px và mã sp 3
      else if (
        this.selectedOptions.length > 0 &&
        !this.Options_status.length &&
        this.multiSearch_masp != ""
      ) {
        this.tempData = [];
        this.filterOptions = 3;
        this.tempData = await this.$axios.$get(
          `/api/lokehoach/filteronlymapxandmasplosanxuat`,
          {
            params: {
              mapx: mapxList,
              masp: masp,
            },
          }
        );
        this.sllosx = this.tempData;
      }
      // chỉ có mã px và status 4
      else if (
        this.selectedOptions.length > 0 &&
        this.Options_status.length > 0 &&
        this.multiSearch_masp == ""
      ) {
        this.tempData = [];
        this.filterOptions = 4;
        this.tempData = await this.$axios.$get(
          `/api/lokehoach/filteronlymapxandstatuslosanxuat`,
          {
            params: {
              mapx: mapxList,
              status: status,
            },
          }
        );
        this.sllosx = this.tempData;
      }
      // lọc mỗi trạng thái 5
      else if (
        !this.selectedOptions.length &&
        this.Options_status.length > 0 &&
        this.multiSearch_masp == ""
      ) {
        this.tempData = [];
        this.filterOptions = 5;
        this.tempData = await this.$axios.$get(
          `/api/lokehoach/filteronlystatuslosanxuat`,
          {
            params: {
              status: status,
            },
          }
        );
        this.sllosx = this.tempData;
      }

      // lọc mỗi mã sản phẩm 6
      else if (
        !this.selectedOptions.length &&
        !this.Options_status.length &&
        this.multiSearch_masp != ""
      ) {
        this.tempData = [];
        this.filterOptions = 6;
        this.tempData = await this.$axios.$get(
          `/api/lokehoach/filteronlymasplosanxuat`,
          {
            params: {
              masp: masp,
            },
          }
        );
        this.sllosx = this.tempData;
      }

      // lọc sản phẩm + trạng thái 7
      else if (
        !this.selectedOptions.length &&
        this.Options_status.length > 0 &&
        this.multiSearch_masp != ""
      ) {
        this.tempData = [];
        this.filterOptions = 7;
        this.tempData = await this.$axios.$get(
          `/api/lokehoach/filteronlymaspandstatuslosx`,
          {
            params: {
              masp: masp,
              status: status,
            },
          }
        );
        this.sllosx = this.tempData;
      }
      // lọc thêm ngày hoàn thành
      else if (
        !this.selectedOptions.length &&
        !this.Options_status.length &&
        this.multiSearch_masp == "" &&
        this.search_ngayhttt != ""
      ) {
        this.tempData = [];
        this.tempData = await this.$axios.$get(
          `/api/lokehoach/onlyngayhoanthanh`,
          {
            params: {
              ngayhoanthanh: ngayhoanthanh,
            },
          }
        );
        // console.log(this.tempData);
        this.sllosx = this.tempData;
      }
    },

    async filterData1(filterOption) {
      const mapxList = this.selectedOptions;
      const masp = this.multiSearch_masp;
      const status = this.Options_status;

      switch (filterOption) {
        case 1:
          if (
            this.selectedOptions.length > 0 &&
            this.Options_status.length > 0 &&
            this.multiSearch_masp != ""
          ) {
            this.tempData = await this.$axios.$get(
              `/api/lokehoach/filterfulldklosanxuat`,
              {
                params: {
                  mapx: mapxList,
                  masp: masp,
                  status: status,
                },
              }
            );
            this.sllosx = this.tempData;
          }
          break;
        case 2:
          if (
            this.selectedOptions.length > 0 &&
            !this.Options_status.length &&
            this.multiSearch_masp == ""
          ) {
            this.tempData = await this.$axios.$get(
              `/api/lokehoach/filteronlymapxlosanxuat`,
              {
                params: {
                  mapx: mapxList,
                },
              }
            );
            this.sllosx = this.tempData;
          }
          break;
        case 3:
          if (
            this.selectedOptions.length > 0 &&
            !this.Options_status.length &&
            this.multiSearch_masp != ""
          ) {
            this.tempData = await this.$axios.$get(
              `/api/lokehoach/filteronlymapxandmasplosanxuat`,
              {
                params: {
                  mapx: mapxList,
                  masp: masp,
                },
              }
            );
            this.sllosx = this.tempData;
          }
          break;
        case 4:
          if (
            this.selectedOptions.length > 0 &&
            this.Options_status.length > 0 &&
            this.multiSearch_masp == ""
          ) {
            this.tempData = await this.$axios.$get(
              `/api/lokehoach/filteronlymapxandstatuslosanxuat`,
              {
                params: {
                  mapx: mapxList,
                  status: status,
                },
              }
            );
            this.sllosx = this.tempData;
          }
          break;
        case 5:
          if (
            !this.selectedOptions.length &&
            this.Options_status.length > 0 &&
            this.multiSearch_masp == ""
          ) {
            this.tempData = await this.$axios.$get(
              `/api/lokehoach/filteronlystatuslosanxuat`,
              {
                params: {
                  status: status,
                },
              }
            );
            this.sllosx = this.tempData;
          }
        case 6:
          if (
            !this.selectedOptions.length &&
            !this.Options_status.length &&
            this.multiSearch_masp != ""
          ) {
            this.tempData = await this.$axios.$get(
              `/api/lokehoach/filteronlymasplosanxuat`,
              {
                params: {
                  masp: masp,
                },
              }
            );
            this.sllosx = this.tempData;
          }
          break;
        case 7:
          if (
            !this.selectedOptions.length &&
            this.Options_status.length > 0 &&
            this.multiSearch_masp != ""
          ) {
            this.tempData = await this.$axios.$get(
              `/api/lokehoach/filteronlymaspandstatuslosx`,
              {
                params: {
                  masp: masp,
                  status: status,
                },
              }
            );
            this.sllosx = this.tempData;
          }
          break;
        // Thêm các case khác tương ứng với các lựa chọn bộ lọc khác
        default:
          // Nếu không có lựa chọn nào phù hợp
          break;
      }
    },

    // --------------------------------------------------------------------------------------
    // 4: Các hàm CRUD
    // Hàm tạo ra Phiếu lô sản xuất trong Modal
    async onTaophieu() {
      // console.log(this.getinfoplsx);
      if (this.ngayhoanthanh == "" || this.tongdatinlo == "") {
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
          icon: "error",
          title: "Ngày hoàn thành hoặc tổng đạt không được bỏ trống !!!",
        });
        return;
      }
      try {
        let tonhongitem = this.items.reduce((total, item) => {
          const sohong = parseInt(item.sohong);
          if (!isNaN(sohong)) {
            return total + sohong;
          } else {
            return total;
          }
        }, 0);

        this.items = this.items.filter(
          (item) => item.congnhan != "" && item.sodat != ""
        );
        // console.log(this.items);
        if (this.items.length > 0) {
          for (let i = 0; i < this.items.length; i++) {
            this.items[i].createdAt = this.form.createdAt;
            this.items[i].createdBy = this.form.createdBy;
            // cập nhật lương công đoạn
            await this.$axios.$post(
              "/api/ketoan/addluongcongdoan",
              this.items[i]
            );
          }
          const Toast = Swal.mixin({
            toast: true,
            position: "bottom-end",
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
            title: "Đã thêm công đoạn lương",
          });
          //   console.log(this.items);
          // tinh tong hong cu

          // console.log(this.tonghonginlo)
          // console.log(tonhongitem)
          // console.log(tonghong + this.tonghonginlo)
          const th = this.tonghonginlo + tonhongitem;
          // console.log(th)
          // phải tìm ra lô sản xuất để cập nhật số hỏng và số đạt
          // va ngay hoan thanh
          const dataUpdate = {
            tongdat: this.tongdatinlo,
            tonghong: th,
            ngayhoanthanhtt: this.ngayhoanthanh,
          };
          await this.$axios.$patch(
            `/api/ketoan/updatetonghong?_id=${this.getinfoplsx._id}`,
            dataUpdate
          );
          this.tempData = [];
          // this.getSolieuLSX_ALl_cht();
          if (this.filterOptions == 1) {
            await this.filterData1(1);
            // console.log(this.tempData);
            // console.log(this.sllosx);
          } else if (this.filterOptions == 2) {
            await this.filterData1(2);
            // console.log(this.tempData);
            // console.log(this.sllosx);
          } else if (this.filterOptions == 3) {
            await this.filterData1(3);
          } else if (this.filterOptions == 4) {
            await this.filterData1(4);
          } else if (this.filterOptions == 5) {
            await this.filterData1(5);
          } else if (this.filterOptions == 6) {
            await this.filterData1(6);
          } else if (this.filterOptions == 7) {
            await this.filterData1(7);
          } else {
            this.sllosx = await this.$axios.$get(
              `/api/ketoan/getallphieulocht`
            );
          }
          this.allluongcongdoan = await this.$axios.$get(
            `/api/ketoan/getallluongcongdoaninlsx?_id_losx=${this.getinfoplsx._id}`
          );
          this.calculateTotals();
          let turn = 1;
          let length = this.items.length;
          while (turn <= length) {
            this.deleteRow(this.items.length - turn);
            turn += 1;
          }
        }

        this.items_cn = this.items_cn.filter(
          (item) => item.nguoithuchien != "" && item.sogiocong != ""
        );

        if (this.items_cn.length > 0) {
          for (let i = 0; i < this.items_cn.length; i++) {
            this.items_cn[i].createdAt = this.form.createdAt;
            this.items_cn[i].createdBy = this.form.createdBy;
            await this.$axios.$post(
              "/api/ketoan/addcongnhat",
              this.items_cn[i]
            );
          }
        }

        let turncn = 1;
        let lengthcn = this.items_cn.length;
        while (turncn <= lengthcn) {
          this.deleteRowCn(this.items_cn.length - turncn);
          turncn += 1;
        }
        this.allluongcongnhat = await this.$axios.$get(
          `/api/ketoan/getallluongcongnhatinlsx?_id_losx=${this.getinfoplsx._id}`
        );
        // this.getSolieuLSX_ALl_cht();
      } catch (error) {
        console.log(error);
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
          icon: "error",
          title: "Có lỗi xảy ra !!!",
        });
      }
      this.filterData();
    },
    // Hàm update số đạt lương công đoạn
    async onUpdateCd(item) {
      // console.log(item);
      try {
        await this.$axios.$patch(
          `/api/ketoan/updatesodatsohonglcd/${item._id}`,
          item
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
          title: "Updated",
        });
        this.calculateTotals();
        // cap nhat lai so lieu trong losanxuat
        // tinh lai tong so hong trong toan bo cong doanluong cua losanxuat
        // dua vao _id_losx
        const dataLcd = await this.$axios.$get(
          `/api/ketoan/getallluongcongdoaninlsx?_id_losx=${item._id_losx}`
        );
        // console.log(dataLcd)
        const tonghong = dataLcd.reduce((total, item) => {
          const sohong = parseInt(item.sohong);
          if (!isNaN(sohong)) {
            return total + sohong;
          } else {
            return total;
          }
        }, 0);
        const tongdat = dataLcd.reduce((total, item) => {
          const sodat = parseInt(item.sodat);
          if (!isNaN(sodat)) {
            return total + sodat;
          } else {
            return total;
          }
        }, 0);
        // console.log(tonghong)
        // cap nhat lai tong hong trong losx
        const dataUpdate = { tonghong: tonghong, tongdat: tongdat };
        await this.$axios.$patch(
          `/api/ketoan/updateonlytonghong?_id=${item._id_losx}`,
          dataUpdate
        );
        this.sllosx = await this.$axios.$get(`/api/ketoan/getallphieulocht`);
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
          title: "Có lỗi xảy ra",
        });
      }
      this.filterData();

      //   this.getSolieuLSX_ALl_cht();
      // if (this.templateLosx.length > 0) {
      //   this.sllosx = this.templateLosx;
      // } else {
      //   this.sllosx = await this.$axios.$get(`/api/ketoan/getallphieulocht`);
      // }
      // ở đây phải lọc lại mới có dữ liệu mới nhất. cần phải cập nhật lại tempData
      // if (this.filterOptions == 1) {
      //   await this.filterData1(1);
      //   // console.log(this.tempData);
      //   // console.log(this.sllosx);
      // } else if (this.filterOptions == 2) {
      //   await this.filterData1(2);
      //   // console.log(this.tempData);
      //   // console.log(this.sllosx);
      // } else if (this.filterOptions == 3) {
      //   await this.filterData1(3);
      // } else if (this.filterOptions == 4) {
      //   await this.filterData1(4);
      // } else if (this.filterOptions == 5) {
      //   await this.filterData1(5);
      // } else if (this.filterOptions == 6) {
      //   await this.filterData1(6);
      // } else if (this.filterOptions == 7) {
      //   await this.filterData1(7);
      // } else {
      //   this.sllosx = await this.$axios.$get(`/api/ketoan/getallphieulocht`);
      // }
    },
    // Hàm update lương công nhật
    async onUpdateCn(id, sogiocong, ghichu) {
      let data = {
        sogiocong: sogiocong.trim(),
      };
      //   console.log(data)
      await this.$axios.$patch(`/api/ketoan/updateluongcongnhat/${id}`, data);
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
        title: "Cập nhật thành công",
      });
    },

    // Hàm xóa lương công đoạn
    async onDelete(cd) {
      const confirmed = confirm("Bạn có chắc chắn muốn xóa dữ liệu không?");
      if (confirmed) {
        try {
          if (cd.status == 1 && cd.stopday_losx != "") {
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
              title: "Lô sản xuất đã được chốt, muốn xóa phải hủy chốt!!!",
            });
          } else {
            console.log(this.tempData);
            // xóa công đoạn khỏi bảng
            await this.$axios
              .$delete(`/api/lokehoach/luongcongnhan/${cd._id}`)
              .then((response) => {
                const index = this.allluongcongdoan.findIndex(
                  (lcd) => lcd._id === cd._id
                ); // find the post index
                if (~index)
                  // if the post exists in array
                  this.allluongcongdoan.splice(index, 1); //delete the post
              });
            // this.sllosx = await this.$axios.$get(
            //   `/api/ketoan/getallphieulocht`
            // );
            const datalcd = await this.$axios.$get(
              `/api/ketoan/getallluongcongdoaninlsx?_id_losx=${cd._id_losx}`
            );
            // console.log(datalcd);
            const tongdat = 0;
            if (datalcd.length > 0) {
              const tonghong = datalcd.reduce((total, item) => {
                const sohong = parseInt(item.sohong);
                if (!isNaN(sohong)) {
                  return total + sohong;
                } else {
                  return total;
                }
              }, 0);
              // console.log(tonghong);
              const dataUpdate = { tonghong: tonghong };
              await this.$axios.$patch(
                `/api/ketoan/updateonlytonghong?_id=${cd._id_losx}`,
                dataUpdate
              );
              this.calculateTotals();
            } else {
              const tonghongff = 0;
              const dataUpdateth = { tonghong: tonghongff };
              await this.$axios.$patch(
                `/api/ketoan/updateonlytonghong?_id=${cd._id_losx}`,
                dataUpdateth
              );
              const dataUpdate = { tongdat: tongdat };
              await this.$axios.$patch(
                `/api/ketoan/updateonlytongdat?_id=${cd._id_losx}`,
                dataUpdate
              );
              this.calculateTotals();
            }

            const tonghongff = 0;
            const dataUpdateth = { tonghong: tonghongff };
            await this.$axios.$patch(
              `/api/ketoan/updateonlytonghong?_id=${cd._id_losx}`,
              dataUpdateth
            );
            const dataUpdate = { tongdat: tongdat };
            await this.$axios.$patch(
              `/api/ketoan/updateonlytongdat?_id=${cd._id_losx}`,
              dataUpdate
            );
            this.calculateTotals();
            this.tempData = [];
            // if (this.filterOptions == 1) {
            //   this.filterData1(1);
            //   // console.log(this.tempData);
            //   // console.log(this.sllosx);
            // } else if (this.filterOptions == 2) {
            //   this.filterData1(2);
            //   // console.log(this.tempData);
            //   // console.log(this.sllosx);
            // } else if (this.filterOptions == 3) {
            //   this.filterData1(3);
            // } else if (this.filterOptions == 4) {
            //   this.filterData1(4);
            // } else if (this.filterOptions == 5) {
            //   this.filterData1(5);
            // } else if (this.filterOptions == 6) {
            //   this.filterData1(6);
            // } else if (this.filterOptions == 7) {
            //   this.filterData1(7);
            // } else {
            //   this.sllosx = await this.$axios.$get(
            //     `/api/ketoan/getallphieulocht`
            //   );
            // }
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
    },
    // Hàm xóa lương công nhật
    onDeleteCn(cd) {
      swal({
        title: "Bạn muốn xóa công nhật này?",
        text: "Công nhật sẽ không lấy lại được sau khi xóa!",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          if (cd.status == 1 && cd.stopday_losx != "") {
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
              title: "Lô đã được chốt, muốn xóa phải hủy chốt!!!",
            });
          } else {
            // xóa công đoạn khỏi bảng
            this.$axios
              .$delete(`/api/ketoan/congnhat/${cd._id}`)
              .then((response) => {
                const index = this.allluongcongnhat.findIndex(
                  (lcd) => lcd._id === cd._id
                ); // find the post index
                if (~index)
                  // if the post exists in array
                  this.allluongcongnhat.splice(index, 1); //delete the post
              });

            // this.getinfoplsx
          }
        } else {
          swal("Bạn đã hủy xóa");
        }
      });
    },

    // async cc() {
    //   // lấy danh sách _id_losx có trong công nhật
    //   const arrId = await this.$axios.get(`api/report/getidlsx`);
    //   // console.log(arrId.data);
    //   for (let i = 0; i < arrId.data.length; i++) {
    //     // console.log(arrId.data[i]);
    //     const id = arrId.data[i]
    //     const idlsx = id._id_losx
    //     // console.log(idlsx);
    //     // tìm malonhamay
    //     const malonhamay = await this.$axios.get(`api/report/getmalonhamay?_id=${idlsx}`);
    //     // update
    //     const response = await this.$axios.patch(`api/report/updatemalonhamaycongnhat/${idlsx}`, malonhamay.data[0])
    //     console.log(response.data.success);
    //   }

    //   // tìm mã lô nhà máy
    //   // const _id=3186
    //   // const malonhamay = await this.$axios.get(`api/report/getmalonhamay?_id=${_id}`);
    //   // console.log(malonhamay.data[0]);

    //   // // cập nhật
    //   // const response = await this.$axios.patch(`api/report/updatemalonhamaycongnhat/3186`, malonhamay.data[0])
    //   // console.log(response);
    // },
  },
};
</script>

<style scoped>
.custom-swal {
  font-size: 6px;
  font-family: Arial, sans-serif;
}

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
  height: 400px;
  display: block;
  overflow: scroll;
  width: 100%;
  position: sticky;
  top: 0;
}

.modal-content,
.modal-card {
  width: 1420px;
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

.highlighted {
  background-color: lightblue;
}

datalist {
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  position: absolute;
  z-index: 1;
}

option {
  padding: 5px;
  cursor: pointer;
}

option:hover {
  background-color: #ccc;
}

@media (max-width: 768px) {
  .pagination button {
    margin: 5px;
  }

  .modal-card {
    width: 90%;
    max-width: 400px;
  }
}

@media (max-width: 1200px) {
  .modal-card {
    width: 90%;
    max-width: 1100px;
  }
}

.input.is-small {
  min-width: 60px; /* Điều chỉnh độ rộng tùy ý */
}

.select.is-small {
  min-width: 150px; /* Điều chỉnh độ rộng tùy ý */
}

.textarea.is-small {
  min-width: 150px; /* Điều chỉnh độ rộng tùy ý */
}
</style>
