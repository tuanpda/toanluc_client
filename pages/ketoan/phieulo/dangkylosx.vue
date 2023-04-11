<template>
  <div class="columns">
    <div class="column">
      <br />
      <div class="box" style="margin-left: 20px; margin-right: 20px">
        <div class="columns">
          <div class="column is-11">
            <div class="control">
              <span class="icon is-small is-left">
                <i style="color: #ff55acee" class="fas fa-cubes"></i>
              </span>
              <span style="color: #3850b7; font-size: 17px; font-weight: bold"
                >Tạo Lô sản xuất</span
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
              <td style="font-size: small; width: 16.1%; text-align: center">
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
              <!-- <td style="width: 13.45%;">
                                <div class="autocomplete">
                                    <input class="input is-small is-info" type="text" v-model="multiSearch_nhomsp"
                                        @input="onInput_nhomsp" placeholder="Chọn nhóm sản phẩm">
                                    <div class="autocomplete-items" v-if="suggestions_nhomsp.length">
                                        <div class="autocomplete-item" v-for="suggestion_nhomsp in suggestions_nhomsp"
                                            @click="selectSuggestion_nhomsp(suggestion_nhomsp)">
                                            {{ suggestion_nhomsp }}
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td style="width: 15.1%;">
                                <div class="autocomplete">
                                    <input class="input is-small is-danger" type="text" v-model="multiSearch_masp"
                                        @input="onInput" placeholder="Chọn sản phẩm">
                                    <div class="autocomplete-items" v-if="suggestions.length">
                                        <div class="autocomplete-item" v-for="suggestion in suggestions"
                                            @click="selectSuggestion(suggestion)">
                                            {{ suggestion }}
                                        </div>
                                    </div>
                                </div>
                            </td> -->
              <td style="width: 10.5%">
                <div class="autocomplete">
                  <input
                    class="input is-small is-info"
                    type="text"
                    v-model="multiSearch_nhomtp"
                    @input="onInput_nhomsp"
                    placeholder="Nhóm thành phẩm"
                  />
                  <div
                    class="autocomplete-items"
                    v-if="suggestions_nhomtp.length"
                  >
                    <div
                      class="autocomplete-item"
                      v-for="suggestion_nhomtp in suggestions_nhomtp"
                      @click="selectSuggestion_nhomsp(suggestion_nhomtp)"
                    >
                      {{ suggestion_nhomtp }}
                    </div>
                  </div>
                </div>
              </td>
              <td style="width: 10.5%">
                <div class="autocomplete">
                  <input
                    class="input is-small is-danger"
                    type="text"
                    v-model="multiSearch_matp"
                    @input="onInput_matp"
                    placeholder="Mã thành phẩm"
                  />
                  <div
                    class="autocomplete-items"
                    v-if="suggestions_matp.length"
                  >
                    <div
                      class="autocomplete-item"
                      v-for="suggestion_matp in suggestions_matp"
                      @click="selectSuggestion_matp(suggestion_matp)"
                    >
                      {{ suggestion_matp }}
                    </div>
                  </div>
                </div>
              </td>
              <td style="font-size: small; width: 15%">
                <div class="select-wrapper">
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
              <td style="width: 6%">
                <button
                  @click="filterData"
                  class="button is-small is-fullwidth is-success"
                >
                  Lọc
                </button>
              </td>
              <td style="width: 6.1%">
                <button
                  @click="showAllLokhpx"
                  class="button is-small is-danger is-fullwidth"
                >
                  Refresh
                </button>
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
              <td
                colspan="2"
                style="font-size: small; font-weight: bold; text-align: right"
              >
                <span
                  >Có:
                  <span style="color: red">{{ lokehoachpx.length }}</span> bản
                  ghi</span
                >
              </td>
              <!-- <td></td> -->
            </tr>
          </table>
        </div>
        <div class="table_wrapper">
          <table class="table is-responsive is-bordered is-narrow is-fullwidth">
            <tr style="background-color: #f4f2f8">
              <td
                style="
                  font-size: small;
                  text-align: center;
                  font-weight: 600;
                  width: 3%;
                "
              >
                --
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
              <!-- <td @click="sortTable('makhpx')"
                                style="font-size: small; text-align: center; font-weight: 600; width: 4%">Mã kế hoạch
                                PX
                            </td> -->
              <!-- <td @click="sortTable('ttqt')"
                                style="font-size: small; text-align: center; font-weight: 600; width: 4%">
                                TTQT
                            </td> -->
              <td
                @click="sortTable('nhomthanhpham')"
                style="
                  font-size: small;
                  text-align: center;
                  font-weight: 600;
                  width: 7%;
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
                  width: 7%;
                "
              >
                Mã TP
              </td>
              <td
                @click="sortTable('nhomspkhpx')"
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
              <!-- <td @click="sortTable('ngaybdkhpx')"
                                style="font-size: small; text-align: center; font-weight: 600; width: 9%;">Ngày bắt đầu
                            </td>
                            <td @click="sortTable('ngayktkhpx')"
                                style="font-size: small; text-align: center; font-weight: 600; width: 9%;">Ngày kết thúc
                            </td> -->
              <td
                @click="sortTable('tuanbd')"
                style="
                  font-size: small;
                  text-align: center;
                  font-weight: 600;
                  width: 9%;
                "
              >
                Tuần BĐ (T1)
              </td>
              <td
                @click="sortTable('tuankt')"
                style="
                  font-size: small;
                  text-align: center;
                  font-weight: 600;
                  width: 9%;
                "
              >
                Tuần KT (T2)
              </td>
              <td
                @click="sortTable('tuanexc')"
                style="
                  font-size: small;
                  text-align: center;
                  font-weight: 600;
                  width: 9%;
                "
              >
                Tuần chạy
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

              <!-- <td @click="sort('soluongkhpx')"
                                style="font-size: small; text-align: center; font-weight: 600; width: 7%;">Chọn Trạng thái
                            </td> -->
              <td
                style="
                  font-size: small;
                  text-align: center;
                  font-weight: 600;
                  width: 7%;
                "
              >
                SL đã ĐK
              </td>
              <td
                style="
                  font-size: small;
                  text-align: center;
                  font-weight: 600;
                  width: 7%;
                "
              >
                SL thực hiện
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
                  width: 7%;
                "
              >
                Ngày KTTT
              </td>
            </tr>
            <!-- <template v-for="(item, index) in paginatedTable.filter(el => el.status !== 3)"> -->
            <template v-for="(item, index) in showData">
              <tr @click="watchDetail(index, item)">
                <td>
                  <div
                    style="
                      display: flex;
                      gap: 10px;
                      justify-content: space-around;
                      align-items: center;
                      width: 100%;
                      height: 100%;
                      margin-top: 5px;
                    "
                  >
                    <span
                      @click="watchDetail(index, item)"
                      class="icon is-small is-left"
                      style="color: #55acee"
                    >
                      <i
                        v-if="
                          arrRowWatchDetail.findIndex(
                            (el) => el.key === index
                          ) < 0
                        "
                        class="far fa-arrow-alt-circle-down"
                      ></i>
                      <i
                        v-if="
                          arrRowWatchDetail.length > 0 &&
                          arrRowWatchDetail.findIndex(
                            (el) => el.key === index
                          ) > -1
                        "
                        class="far fa-arrow-alt-circle-left"
                      ></i>
                    </span>
                  </div>
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
                <!-- <td style="font-size: small; background-color: #effaf5; text-align: center;">{{
                                    item.makhpx
                                }}
                                </td>
                                <td style="font-size: small; background-color: #effaf5; text-align: center;">{{ item.ttqt }} 
                                </td> -->
                <td
                  style="
                    font-size: small;
                    background-color: #effaf5;
                    text-align: center;
                  "
                >
                  {{ item.nhomthanhpham }}
                </td>
                <td
                  style="
                    font-size: small;
                    background-color: #effaf5;
                    text-align: center;
                  "
                >
                  {{ item.mathanhpham }}
                </td>
                <td
                  style="
                    font-size: small;
                    background-color: #effaf5;
                    text-align: center;
                  "
                >
                  {{ item.nhomspkhpx }}
                </td>
                <td
                  style="
                    font-size: small;
                    background-color: #effaf5;
                    text-align: center;
                  "
                >
                  {{ item.maspkhpx }}
                </td>
                <!-- <td style="font-size: small; background-color: #effaf5; text-align: center;">{{
                                    item.ngaybdkhpx | formatDate
                                }}</td>
                                <td style="font-size: small; text-align: center; background-color: #fffaeb;">{{
                                    item.ngayktkhpx | formatDate
                                }}</td> -->
                <td
                  style="
                    font-size: small;
                    text-align: center;
                    background-color: #effaf5;
                  "
                >
                  {{ item.tuanbdkhpx }}
                </td>
                <td
                  style="
                    font-size: small;
                    text-align: center;
                    background-color: #effaf5;
                  "
                >
                  {{ item.tuanktkhpx }}
                </td>
                <td
                  style="
                    font-size: small;
                    text-align: center;
                    background-color: #effaf5;
                  "
                >
                  {{ item.tuanexc }}
                </td>
                <td
                  style="
                    font-size: small;
                    text-align: center;
                    background-color: #effaf5;
                  "
                >
                  {{ item.soluongkhpx | formatNumber }}
                </td>
                <template>
                  <td
                    v-if="item.status == 0"
                    style="
                      font-size: small;
                      text-align: center;
                      background-color: whitesmoke;
                    "
                  >
                    0
                  </td>
                  <td
                    v-else-if="item.status == 1"
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
                  <td v-else style="font-size: small; text-align: center">
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
                </template>
                <td
                  style="
                    font-size: small;
                    text-align: center;
                    background-color: #effaf5;
                  "
                >
                  {{ item.tong_soluong }}
                </td>
                <td
                  style="
                    font-size: small;
                    text-align: center;
                    background-color: #effaf5;
                  "
                >
                  {{ item.tongso_luongnhanh }}
                </td>
                <td
                  style="
                    font-size: small;
                    text-align: center;
                    background-color: #effaf5;
                  "
                >
                  {{ item.ngaybdthucte | formatDate }}
                </td>
                <td
                  style="
                    font-size: small;
                    text-align: center;
                    background-color: #effaf5;
                  "
                ></td>
              </tr>
              <!-- open row -->
              <tr
                style="display: none"
                :style="{
                  display:
                    arrRowWatchDetail.length > 0 &&
                    arrRowWatchDetail.findIndex((el) => el.key === index) > -1
                      ? 'table-row'
                      : 'none',
                }"
              >
                <td
                  colspan="19"
                  style="padding: 10px 46px; background: #209cee0f"
                >
                  <table
                    class="table is-responsive is-bordered is-narrow is-fullwidth"
                  >
                    <tr style="background-color: #f4f2f8">
                      <td
                        style="
                          text-align: center;
                          font-size: small;
                          font-weight: 600;
                          width: 3.53%;
                          color: red;
                        "
                      >
                        STT
                      </td>
                      <td
                        style="
                          text-align: center;
                          font-size: small;
                          font-weight: 600;
                          width: 20%;
                          color: red;
                        "
                      >
                        Tổ / nhóm
                      </td>
                      <td
                        style="
                          text-align: center;
                          font-size: small;
                          font-weight: 600;
                          width: 16.7%;
                          color: red;
                        "
                      >
                        Mã Lô sản xuất
                      </td>
                      <td
                        style="
                          text-align: center;
                          font-size: small;
                          font-weight: 600;
                          width: 8.2%;
                          color: red;
                        "
                      >
                        Số lượng
                      </td>
                      <td
                        style="
                          text-align: center;
                          font-size: small;
                          font-weight: 600;
                          width: 8%;
                          color: red;
                        "
                      >
                        Ngày BĐ
                      </td>
                      <td
                        style="
                          text-align: center;
                          font-size: small;
                          font-weight: 600;
                          width: 5%;
                          color: red;
                        "
                      >
                        Ngày KT
                      </td>
                      <td
                        style="
                          text-align: center;
                          font-size: small;
                          font-weight: 600;
                          width: 5%;
                          color: red;
                        "
                      >
                        Trạng thái
                      </td>
                      <td
                        style="
                          text-align: center;
                          font-size: small;
                          font-weight: 600;
                          width: 4%;
                          color: red;
                        "
                      >
                        Cập nhật
                      </td>
                      <td
                        style="
                          text-align: center;
                          font-size: small;
                          font-weight: 600;
                          width: 4.1%;
                          color: red;
                        "
                      >
                        Xóa
                      </td>
                      <td
                        style="
                          text-align: center;
                          font-size: small;
                          font-weight: 600;
                          width: 4.1%;
                          color: red;
                        "
                      >
                        Copy
                      </td>
                      <td
                        style="
                          text-align: center;
                          font-size: small;
                          font-weight: 600;
                          width: 4.1%;
                          color: red;
                        "
                      >
                        <button
                          @click="addLosanxuat(item, index)"
                          class="button is-small is-danger"
                        >
                          Đăng ký
                        </button>
                      </td>
                      <td
                        style="
                          text-align: center;
                          font-size: small;
                          font-weight: 600;
                          width: 4.1%;
                          color: red;
                        "
                      >
                        <button
                          @click="ghidulieu(item)"
                          class="button is-small is-success"
                        >
                          Ghi dữ liệu
                        </button>
                      </td>
                      <!-- <td></td> -->
                    </tr>
                    <template
                      v-if="
                        arrRowWatchDetail.length > 0 &&
                        arrRowWatchDetail.findIndex((el) => el.key === index) >
                          -1
                      "
                    >
                      <template
                        v-for="(item, indexRow) in arrRowWatchDetail.find(
                          (el) => el.key === index
                        ).dataChildren || []"
                      >
                        <tr>
                          <td style="font-size: small; text-align: center">
                            {{ indexRow + 1 }}
                          </td>
                          <td style="font-size: small">
                            {{ item.tento }}
                          </td>
                          <td
                            style="
                              font-size: small;
                              text-align: center;
                              font-weight: 600;
                            "
                          >
                            <input
                              type="text"
                              v-model="item.malosx"
                              class="input is-small"
                            />
                          </td>
                          <td style="font-size: small; text-align: center">
                            <input
                              type="number"
                              v-model="item.soluonglsx"
                              class="input is-small"
                            />
                          </td>
                          <td style="font-size: small; text-align: center">
                            <input
                              class="input is-small"
                              type="date"
                              v-bind:value="item.ngaybd | inputDateFilter"
                              v-on:input="
                                item.ngaybd = getDate($event.target.value)
                              "
                            />
                          </td>
                          <td style="font-size: small; text-align: center">
                            <input
                              class="input is-small"
                              type="date"
                              v-bind:value="item.ngaykt | inputDateFilter"
                              v-on:input="
                                item.ngaykt = getDate($event.target.value)
                              "
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
                            <td
                              v-else
                              style="font-size: small; text-align: center"
                            ></td>
                          </template>
                          <td style="font-size: small; text-align: center">
                            <a @click="onUpdate(item)">
                              <span style="color: green" class="icon is-small">
                                <i class="far fa-check-circle"></i>
                              </span>
                            </a>
                          </td>
                          <td style="font-size: small; text-align: center">
                            <a @click="onDeleteLsx(item)">
                              <span style="color: red" class="icon is-small">
                                <i class="fas fa-times"></i>
                              </span>
                            </a>
                          </td>
                          <td style="font-size: small; text-align: center">
                            <a @click="copyadd(item)">
                              <span
                                style="color: blueviolet"
                                class="icon is-small"
                              >
                                <i class="fas fa-check-double"></i>
                              </span>
                            </a>
                          </td>
                          <td colspan="2"></td>
                        </tr>
                      </template>
                    </template>

                    <tr v-for="(item, index) in items" :key="index + 'kjkji'">
                      <td style="font-size: small; text-align: center">
                        {{ index + 1 }}
                      </td>
                      <!-- <td style="font-size: small;">
                                                <div class="select is-small is-fullwidth">
                                                    <select @change="
                                                        getWithTo($event, $event.target.selectedIndex, index)
                                                    ">
                                                        <option value="" selected>-- Chọn tổ --</option>
                                                        <option v-for="item in tonhom" :value="item.mato">
                                                            {{ item.mato }} -- {{ item.tento }}
                                                        </option>
                                                    </select>
                                                </div>
                                            </td> BỎ tổ nhóm vì đã chọn khi lập LKHPX-->
                      <td style=""></td>
                      <td style="font-weight: 700">
                        <input
                          v-model.trim="item.malosx"
                          type="text"
                          class="input is-small is-danger"
                        />
                      </td>
                      <td>
                        <input
                          v-model.trim="item.soluonglsx"
                          type="text"
                          class="input is-small"
                        />
                      </td>
                      <td>
                        <input
                          class="input is-small"
                          type="date"
                          v-bind:value="item.ngaybd | inputDateFilter"
                          v-on:input="
                            item.ngaybd = getDate($event.target.value)
                          "
                        />
                      </td>
                      <td>
                        <input
                          class="input is-small"
                          type="date"
                          v-bind:value="item.ngaykt | inputDateFilter"
                          v-on:input="
                            item.ngaykt = getDate($event.target.value)
                          "
                        />
                      </td>

                      <td></td>
                      <td></td>
                      <td style="font-size: small; text-align: center">
                        <a @click="deleteRow(index)">
                          <span style="color: red" class="icon is-small">
                            <i class="fas fa-times"></i>
                          </span>
                        </a>
                      </td>
                      <td></td>
                      <td colspan="2"></td>
                    </tr>
                  </table>
                </td>
              </tr>
            </template>
          </table>
          <!-- end table -->
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
export default {
  middleware: "auth",
  data() {
    return {
      arrRowWatchDetail: [],
      dataLokehoachpx: [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
      ],
      dataChildren: [],
      // dữ liệu
      lokehoachpx: [], // dữ liệu gốc ban đầu
      // tìm cách xử lý bộ lọc dữ liệu
      tempData: [], // dữ liệu sau khi lọc
      filterOptions: 0,

      phanxuong: [],
      showLophanxuong: [], // khi bấm vào lô kế hoạch phân xưởng nào đó sẽ lưu thông tin lô đó vào biến này
      losanxuat: [], // lưu lô sản xuất

      // gán biến status
      status: 0,

      // check nhiều phân xưởng
      showLuachon: false,
      options: ["Option 1", "Option 2", "Option 3", "Option 4"],
      selectedOptions: [],
      Options_status: [],
      isOpen: false,
      isOpenst: false,
      statusArr: [
        { masta: 1, tensta: "DK" },
        { masta: 2, tensta: "SX" },
        { masta: 3, tensta: "HT" },
      ],
      multiSearch_masp: "",
      multiSearch_nhomsp: "",
      multiSearch_matp: "",
      multiSearch_nhomtp: "",

      // input suggest
      suggestions: [],
      // suggestions_nhomsp: [],
      suggestions_nhomtp: [],
      suggestions_matp: [],
      maspinlokehoach: [],
      nhomspinlokehoach: [],
      nhomtpinlokehoach: [],
      matpinlokehoach: [],

      // xử lý select mã sản phẩm
      // không sử dụng nữa mà sử dụng suggest input
      selected: "",
      search: "",

      // lọc talble
      sortDirection: 1,
      sortKey: "ttqt",
      currentPage: 1,
      itemsPerPage: 10,

      // tổng của số lượng lô khpx
      sumSoluonglkhpx: 0,
      sumItemssl: 0,
      sumAll: 0,

      // hiển thị đăng ký lô sản xuất
      checkViewRegLsx: false,
      isaddlosx: 0,

      // số lượng vượt kế hoạch phân xưởng
      soluonghanmuckhpx: 0,

      form: {
        createdAt: null,
        createdBy: this.$auth.$state.user.username,
      },
      // items lô sản xuất
      items: [
        {
          kehoachnam: "",
          malonhamay: "",
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
          soluongkhsx: "",
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
        },
      ],
      tonhom: [], // lưu lại tổ nhóm
      nhomluong: [], // lưu nhóm lương
      showData: [],
      sortedData: [],
    };
  },

  async mounted() {
    this.currentDateTime();
    await this.showAllLokhpx();
    await this.showAllPx();
    this.deleteRow(0);
    await this.maspinlkh();
    await this.nhomtpinlkh();
    await this.matpinlkh();
  },

  computed: {
    
    pageCount() {
      return Math.ceil(this.sortedData.length / this.itemsPerPage);
    },
    startIndex() {
      return (this.currentPage - 1) * this.itemsPerPage;
    },
    endIndex() {
      return this.startIndex + this.itemsPerPage;
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
    itemsPerPage() {
      this.currentPage = 1;
    },
    // dataChildren: {
    //   immediate: true, // thực hiện truy vấn ngay từ khi component được khởi tạo
    //   handler: function (newValue, oldValue) {
    //     // thực hiện truy vấn tiếp theo khi giá trị của this.dataChildren thay đổi
    //     console.log(newValue); // hiển thị dữ liệu mới nhất
    //     // thực hiện truy vấn tiếp theo tại đây
    //   },
    // },
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
    paginatedTable() {
      this.showData = this.sortedData.slice(this.startIndex, this.endIndex);
    },
    // phân trang và sắp xếp
    sortedTable() {
      this.sortedData = this.lokehoachpx.sort((a, b) => {
        if (a[this.sortKey] < b[this.sortKey]) return -1 * this.sortDirection;
        if (a[this.sortKey] > b[this.sortKey]) return 1 * this.sortDirection;
        return 0;
      });
      this.paginatedTable();
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
    // suggest input nhóm sản phẩm
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
    // lấy ngày tháng, giờ để ghi vào csdl
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
    // lấy mã sản phẩm và nhóm sản phẩm trong lô kế hoạch phân xưởng
    async maspinlkh() {
      this.maspinlokehoach = await this.$axios.$get(
        "/api/lokehoach/hmsanphamlokhpx"
      );
      // console.log(this.maspinlokehoach)
    },
    async matpinlkh() {
      this.matpinlokehoach = await this.$axios.$get(
        "/api/lokehoach/matpinlokhpx"
      );
    },
    async nhomtpinlkh() {
      this.nhomtpinlokehoach = await this.$axios.$get(
        "/api/lokehoach/nhomthanhphamlokhpx"
      );
      // console.log(this.nhomtpinlokehoach)
    },
    // lấy toàn phân xưởng
    async showAllPx() {
      this.phanxuong = await this.$axios.$get(`/api/phongban/allphanxuong`);
    },
    // lấy danh sách tất cả các lô kế hoạch phân xưởng sắp xếp theo phân xưởng
    async showAllLokhpx() {
      this.lokehoachpx = await this.$axios.$get(
        `/api/lokehoach/getallkehoachphanxuongwithout0`
      );
      this.multiSearch_masp = "";
      this.multiSearch_nhomsp = "";
      this.multiSearch_nhomtp = "";
      this.multiSearch_matp = "";
      this.Options_status = [];
      this.isOpen = false;
      this.isOpenst = false;
      this.selectedOptions = [];
      this.sortedTable();
    },

    // --------------------------------------------------------------------------------------
    // 3: Các hàm chức năng
    // Hàm bấm vào lô kế hoạch phân xưởng sẽ expand ra dữ liệu lô sản xuất
    async watchDetail(value, data) {
      this.dataLokehoachpx = data;
      const indexValue = this.arrRowWatchDetail.findIndex(
        (el) => el?.key === value
      );
      if (indexValue > -1) {
        this.arrRowWatchDetail.splice(indexValue, 1);
        return;
      }
      // console.log(data);
      // hiển thị trạng thái đang tải dữ liệu
      this.dataChildren = await this.$axios.$get(
        `/api/lokehoach/getalllsxinkhpx?_id_khpx=${data._id}`
      );

      // console.log(this.dataChildren)

      const grWorkTemp = await this.$axios.$get(
        `/api/phongban/alltoinxuong?mapx=${data.mapx}`
      );

      const grWork =
        grWorkTemp.length > 0
          ? grWorkTemp.map((el) => ({
              label: `${el.mato} - ${el.tento}`,
              value: el.mato,
              dataCur: el,
            }))
          : [];

      // console.log(data.tenspkhpx)
      const malosx = `${data.maspkhpx.trim()}-${data.makhpx.trim()}-0`;
      // console.log(malosx)

      this.arrRowWatchDetail.push({
        key: value,
        dataParent: data,
        dataChildren: this.dataChildren,
        grWork: grWork,
        input: {
          inputMaTo: "",
          inputMaLo: malosx,
          inputSoLuong: 0,
          inputDateOpen: "",
          inputDateEnd: "",
        },
      });
      // console.log('stop')
    },

    // đang tạm bỏ
    async addRowChildren(valueIndex) {
      const dataTemp = this.arrRowWatchDetail.find(
        (el) => el.key === valueIndex
      );
      const grWotkTemp = dataTemp.grWork.find(
        (el) => el.value === dataTemp.input.inputMaTo
      );
      // console.log(dataTemp)
      const newData = {
        ...dataTemp.dataParent,
        malosx: dataTemp.input.inputMaLo,
        soluonglsx: dataTemp.input.inputSoLuong,
        ngaybd: dataTemp.input.inputDateOpen,
        ngaykt: dataTemp.input.inputDateEnd,
        nhomto: [
          {
            maxuong: grWotkTemp?.dataCur?.mapx || "",
            tenpx: grWotkTemp?.dataCur?.mapx || "",
            tento: grWotkTemp?.dataCur?.tento || "",
            mato: grWotkTemp?.dataCur?.mato || "",
          },
        ],
      };
      const { _id, ...res } = newData;
      // console.log(res)

      let formData;
      if (grWotkTemp) {
        // console.log(grWotkTemp.value)

        formData = {
          kehoachnam: res.kehoachnam,
          makh: res.makh,
          makhpx: res.makhpx,
          malosx: dataTemp.input.inputMaLo,
          mapx: res.mapx,
          tenpx: res.tenpx,
          mato: grWotkTemp.value,
          tento: grWotkTemp.label,
          masp: res.maspkhpx,
          tensp: res.tenspkhpx,
          soluong: res.soluongkhpx,
          nhomluong: res.nhomluong,
          soluonglsx: dataTemp.input.inputSoLuong,
          soluongkhsx: "",
          ngaybd: dataTemp.input.inputDateOpen,
          ngaykt: dataTemp.input.inputDateEnd,
          createdAt: this.form.createdAt,
          createdBy: this.form.createdBy,
          status: 1,
          status_tinhluong: 0,
          datinhluong: 0,
          stopday_losx: "",
          tongdat: 0,
          tonghong: 0,
          ghichu: "",
        };
      } else {
        formData = {
          kehoachnam: res.kehoachnam,
          makh: res.makh,
          makhpx: res.makhpx,
          malosx: dataTemp.input.inputMaLo,
          mapx: res.mapx,
          tenpx: res.tenpx,
          mato: "",
          tento: "",
          masp: res.maspkhpx,
          tensp: res.tenspkhpx,
          soluong: res.soluongkhpx,
          nhomluong: res.nhomluong,
          soluonglsx: dataTemp.input.inputSoLuong,
          soluongkhsx: "",
          ngaybd: dataTemp.input.inputDateOpen,
          ngaykt: dataTemp.input.inputDateEnd,
          createdAt: this.form.createdAt,
          createdBy: this.form.createdBy,
          status: 1,
          status_tinhluong: 0,
          datinhluong: 0,
          stopday_losx: "",
          tongdat: 0,
          tonghong: 0,
          ghichu: "",
        };
      }

      this.$axios.$post("/api/ketoan/addphieulosx", formData).then(async () => {
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
          title: "Tạo phiếu lô sản xuất thành công",
        });
        this.dataChildren = await this.$axios.$get(
          `/api/lokehoach/getalllsxinkhpx?makh=${dataTemp?.dataParent?.makh}&makhpx=${dataTemp?.dataParent?.makhpx}&mapx=${dataTemp?.dataParent?.mapx}`
        );
        const dataNew = {
          ...dataTemp,
          dataChildren: this.dataChildren,
          input: {
            inputMaTo: "",
            inputMaLo: "",
            inputSoLuong: "",
            inputDateOpen: null,
            inputDateEnd: null,
          },
        };
        let index = this.arrRowWatchDetail.findIndex(
          (el) => el.key === valueIndex
        );

        if (index !== -1) {
          this.arrRowWatchDetail.splice(index, 1, dataNew);
        }
      });
    },

    // --------------------------------------------------------------------------------------
    // Hàm lọc theo nhiều tiêu chí để cắt bớt độ dài dữ liệu
    // async filterData() {
    //     // console.log(this.selectedOptions)
    //     // console.log(this.multiSearch_masp)
    //     this.isOpen = false
    //     this.isOpenst = false

    //     const mapxList = this.selectedOptions
    //     const masp = this.multiSearch_masp
    //     const status = this.Options_status
    //     const nhomsp = this.multiSearch_nhomsp

    //     // chọn lọc  4 tiêu chí
    //     if (this.selectedOptions.length > 0 && this.Options_status.length > 0 && this.multiSearch_masp != "" && this.multiSearch_nhomsp != '') {
    //         this.lokehoachpx = await this.$axios.$get(
    //             `/api/lokehoach/filterfulldk`, {
    //             params: {
    //                 mapx: mapxList, // Truyền danh sách mã phân xưởng lên server
    //                 masp: masp,
    //                 status: status,
    //                 nhomsp: nhomsp
    //             },
    //         }
    //         );
    //     }
    //     // chỉ có mã px
    //     else if (this.selectedOptions.length > 0 && !this.Options_status.length && this.multiSearch_masp == "" && this.multiSearch_nhomsp == '') {
    //         this.lokehoachpx = await this.$axios.$get(
    //             `/api/lokehoach/filteronlymapx`, {
    //             params: {
    //                 mapx: mapxList,
    //             },
    //         }
    //         );
    //     }
    //     // chỉ có mã px và mã sp
    //     else if (this.selectedOptions.length > 0 && !this.Options_status.length && this.multiSearch_masp != "" && this.multiSearch_nhomsp == '') {
    //         this.lokehoachpx = await this.$axios.$get(
    //             `/api/lokehoach/filteronlymapxandmasp`, {
    //             params: {
    //                 mapx: mapxList,
    //                 masp: masp
    //             },
    //         }
    //         );
    //     }
    //     // chỉ có mã px và nhomsp
    //     else if (this.selectedOptions.length > 0 && !this.Options_status.length && this.multiSearch_masp == "" && this.multiSearch_nhomsp != '') {
    //         this.lokehoachpx = await this.$axios.$get(
    //             `/api/lokehoach/filteronlymapxandnhomsp`, {
    //             params: {
    //                 mapx: mapxList,
    //                 nhomsp: nhomsp
    //             },
    //         }
    //         );
    //     }
    //     // chỉ có mã px và status
    //     else if (this.selectedOptions.length > 0 && this.Options_status.length > 0 && this.multiSearch_masp == "" && this.multiSearch_nhomsp == '') {
    //         this.lokehoachpx = await this.$axios.$get(
    //             `/api/lokehoach/filteronlymapxandstatus`, {
    //             params: {
    //                 mapx: mapxList,
    //                 status: status
    //             },
    //         }
    //         );
    //     }
    //     // lọc mỗi trạng thái
    //     else if (!this.selectedOptions.length && this.Options_status.length > 0 && this.multiSearch_masp == "" && this.multiSearch_nhomsp == '') {
    //         this.lokehoachpx = await this.$axios.$get(
    //             `/api/lokehoach/filteronlystatus`, {
    //             params: {
    //                 status: status
    //             },
    //         }
    //         );
    //     }

    //     // lọc mỗi mã sản phẩm
    //     else if (!this.selectedOptions.length && !this.Options_status.length && this.multiSearch_masp != "" && this.multiSearch_nhomsp == '') {
    //         this.lokehoachpx = await this.$axios.$get(
    //             `/api/lokehoach/filteronlymasp`, {
    //             params: {
    //                 masp: masp
    //             },
    //         }
    //         );
    //     }

    //     // lọc sản phẩm + trạng thái
    //     else if (!this.selectedOptions.length && this.Options_status.length > 0 && this.multiSearch_masp != "" && this.multiSearch_nhomsp == '') {
    //         this.lokehoachpx = await this.$axios.$get(
    //             `/api/lokehoach/filteronlymaspandstatus`, {
    //             params: {
    //                 masp: masp,
    //                 status: status
    //             },
    //         }
    //         );
    //     }

    //     // lọc mỗi nhóm px
    //     else if (!this.selectedOptions.length && !this.Options_status.length && this.multiSearch_masp == "" && this.multiSearch_nhomsp != '') {
    //         this.lokehoachpx = await this.$axios.$get(
    //             `/api/lokehoach/filteronlynhomsp`, {
    //             params: {
    //                 nhomsp: nhomsp,
    //             },
    //         }
    //         );
    //     }

    //     // lọc mỗi nhóm sp và sản phẩm
    //     else if (!this.selectedOptions.length && !this.Options_status.length && this.multiSearch_masp != "" && this.multiSearch_nhomsp != '') {
    //         this.lokehoachpx = await this.$axios.$get(
    //             `/api/lokehoach/filteronlynhomspandmasp`, {
    //             params: {
    //                 nhomsp: nhomsp,
    //                 masp: masp
    //             },
    //         }
    //         );
    //     }

    //     // lọc mỗi nhóm sp và trạng thái
    //     else if (!this.selectedOptions.length && this.Options_status.length > 0 && this.multiSearch_masp == "" && this.multiSearch_nhomsp != '') {
    //         this.lokehoachpx = await this.$axios.$get(
    //             `/api/lokehoach/filteronlynhomspandstatus`, {
    //             params: {
    //                 nhomsp: nhomsp,
    //                 status: status
    //             },
    //         }
    //         );
    //     }

    //     // lọc xưởng, nhóm sp và status
    //     else if (this.selectedOptions.length > 0 && this.Options_status.length > 0 && this.multiSearch_masp == "" && this.multiSearch_nhomsp != '') {
    //         this.lokehoachpx = await this.$axios.$get(
    //             `/api/lokehoach/filteronlypxandnhomspandstatus`, {
    //             params: {
    //                 nhomsp: nhomsp,
    //                 status: status,
    //                 mapx: mapxList,
    //             },
    //         }
    //         );
    //     }

    //     // lọc xưởng, mã sp và status
    //     else if (this.selectedOptions.length > 0 && this.Options_status.length > 0 && this.multiSearch_masp != "" && this.multiSearch_nhomsp == '') {
    //         this.lokehoachpx = await this.$axios.$get(
    //             `/api/lokehoach/filteronlypxandmaspandstatus`, {
    //             params: {
    //                 masp: masp,
    //                 status: status,
    //                 mapx: mapxList,
    //             },
    //         }
    //         );
    //     }

    // },
    async filterData() {
      // console.log(this.selectedOptions)
      // console.log(this.Options_status)
      this.isOpen = false;
      this.isOpenst = false;

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
              matp: matp,
              status: status,
              nhomtp: nhomtp,
            },
          }
        );
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
      }
      // chỉ có mã px và mã tp 3
      else if (
        this.selectedOptions.length > 0 &&
        !this.Options_status.length &&
        this.multiSearch_matp != "" &&
        this.multiSearch_nhomtp == ""
      ) {
        console.log(this.selectedOptions);

        this.lokehoachpx = await this.$axios.$get(
          `/api/lokehoach/filteronlymapxandmatp`,
          {
            params: {
              mapx: mapxList,
              matp: matp,
            },
          }
        );
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
              nhomtp: nhomtp,
            },
          }
        );
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
      }

      // lọc mỗi nhóm thành phẩm cần phải đặt tên cho mỗi bộ lọc để sau gọi lại 9
      else if (
        !this.selectedOptions.length &&
        !this.Options_status.length &&
        this.multiSearch_matp == "" &&
        this.multiSearch_nhomtp != ""
      ) {
        this.filterOptions = 9;
        // this.lokehoachpx = await this.$axios.$get(
        //   `/api/lokehoach/filteronlynhomtp`,
        //   {
        //     params: {
        //       nhomtp: nhomtp,
        //     },
        //   }
        // );
        this.tempData = await this.$axios.$get(
          `/api/lokehoach/filteronlynhomtp`,
          {
            params: {
              nhomtp: nhomtp,
            },
          }
        );
        this.lokehoachpx = this.tempData;
      }

      // lọc mỗi nhóm thành phẩm và mã thành phẩm
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
      }

      // lọc mỗi nhóm tp và trạng thái
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
      }

      // lọc nhóm thành phẩm; nhóm sản phẩm và trạng thái
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
      }
      // lọc xưởng, nhóm tp và status
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
      }
      // lọc xưởng, nhóm tp và mã thành phẩm
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
              nhomtp: nhomtp,
              matp: matp,
              mapx: mapxList,
            },
          }
        );
      }
    },

    async filterData1(filterOption) {
      const mapxList = this.selectedOptions;
      // const masp = this.multiSearch_masp
      const matp = this.multiSearch_matp;
      const status = this.Options_status;
      const nhomtp = this.multiSearch_nhomtp;

      switch (filterOption) {
        case 1:
          if (
            !this.selectedOptions.length &&
            !this.Options_status.length &&
            this.multiSearch_matp == "" &&
            this.multiSearch_nhomtp != ""
          ) {
            this.tempData = await this.$axios.$get(
              `/api/lokehoach/filteronlynhomtp`,
              {
                params: {
                  nhomtp: nhomtp,
                },
              }
            );
            this.lokehoachpx = this.tempData;
          }
          break;
        case 2:
          // Gọi lại bộ lọc khác
          // ...
          break;
        // Thêm các case khác tương ứng với các lựa chọn bộ lọc khác
        default:
          // Nếu không có lựa chọn nào phù hợp
          break;
      }
    },

    // --------------------------------------------------------------------------------------
    // Các hàm xử lý this.items - kiểm soát việc thêm bớt các lô sản xuất mới
    // xóa items
    deleteRow(index) {
      this.items.splice(index, 1);
    },
    // copy dữ liệu của lô hiện hành
    copyadd(data) {
      // for (let i = 0; i < this.items.length; i++) {
      //     this.sumSoluonglkhpx += this.items[i].soluongkhpx
      // }
      // for (let item of this.items) {
      //     this.sumSoluonglkhpx += parseInt(item.soluonglsx, 10);
      // }
      // console.log(this.sumSoluonglkhpx)
      // gán số lượng lô sản xuất cho biến so sánh

      // this.sumSoluonglkhpx là số lượng của tổng lô sản xuất mà kế hoạch này đã sản xuất, ví dụ 1200 cho 2 lô 1 lô 600 cái
      // bây h bấm copy thêm (thì số lượng chỉ mới nằm ở items), vậy phải tổng cả 2 cái lại rồi so xem với soluong của lô kh phân xưởng

      this.items.push({
        _id_khnam: data._id_khnam,
        _id_lonhamay: data._id_lonhamay,
        _id_khpx: data._id_khpx,
        kehoachnam: data.kehoachnam,
        malonhamay: data.malonhamay,
        makhpx: data.makhpx,
        malosx: data.malosx,
        mapx: data.mapx,
        tenpx: data.tenpx,
        mato: data.mato,
        tento: data.tento,
        masp: data.masp,
        tensp: data.tensp,
        soluong: data.soluong,
        nhomluong: data.nhomluong,
        soluonglsx: data.soluonglsx,
        soluongkhsx: data.soluongkhsx,
        ngaybd: data.ngaybd,
        ngaykt: data.ngaykt,
        tongdat: data.tongdat,
        tonghong: data.tonghong,
        ghichu: data.ghichu,
        createdAt: null,
        createdBy: "",
        status: 1,
        status_tinhluong: 0,
        datinhluong: 0,
        stopday_losx: "",
        nhomsp: data.nhomsp,
      });
      // console.log(this.items);
    },

    // bấm đăng ký lô sản xuất
    async addLosanxuat(dataAdd, value) {
      // console.log(value)
      // dựa vào số lượng lô kế hoạch phân xưởng để tính toán ra số lô cần sản xuất
      // ví dụ 2500 cái thì chia 6 ngày làm việc tính ra số lô cần làm và tự động render ra các lô luôn
      // console.log(dataAdd.soluongkhpx)
      // Chia lấy phần nguyên
      // let number_lsx = Math.floor(dataAdd.soluongkhpx / 6);
      // console.log(number_lsx)
      this.isaddlosx = 1;
      this.items.push({
        _id_khnam: dataAdd._id_khnam,
        _id_lonhamay: dataAdd._id_lonhamay,
        _id_khpx: dataAdd._id,
        kehoachnam: dataAdd.kehoachnam,
        malonhamay: dataAdd.malonhamay,
        makhpx: dataAdd.makhpx,
        malosx:
          dataAdd.maspkhpx.trim() + "-" + dataAdd.makhpx.trim() + "-" + "01",
        mapx: dataAdd.mapx,
        tenpx: dataAdd.tenpx,
        mato: "",
        tento: "",
        masp: dataAdd.maspkhpx,
        tensp: dataAdd.tenspkhpx,
        soluong: dataAdd.soluongkhpx,
        nhomluong: dataAdd.nhomluong,
        soluonglsx: "",
        soluongkhsx: 0,
        ngaybd: dataAdd.ngaybdexc,
        ngaykt: dataAdd.ngayktexc,
        tongdat: "",
        tonghong: "",
        ghichu: "",
        createdAt: this.form.createdAt,
        createdBy: this.form.createdBy,
        status: 1,
        status_tinhluong: 0,
        datinhluong: 0,
        stopday_losx: "",
        updatedAt: "",
        nhomsp: dataAdd.nhomspkhpx,
      });
      // console.log(this.items)
    },

    // Bấm vào chọn tổ
    async getWithTo(e, selectedIndex, index) {
      // if (this.showLophanxuong.mapx == 'PXGC')
      var name = e.target.options[e.target.options.selectedIndex].text;
      // console.log(name)
      let position = name.split("--");
      let p1 = position[0].trim();
      let p2 = position[1].trim();
      // console.log(p1, p2)
      // this.selectedIndex = selectedIndex;
      // console.log(p1)
      for (let i = 0; i < this.items.length; i++) {
        if (i == index) {
          this.items[i].mato = p1;
          this.items[i].tento = p2;
        }
      }
      // console.log(this.items)
    },

    // --------------------------------------------------------------------------------------
    // 4: Các hàm CRUD
    // Create
    async ghidulieu(datalkh) {
      // console.log(datalkh)
      // tính toán lại số lượng lô trước khi ghi thêm dữ liệu
      // 1. tính số lượng những lô đã đăng ký hoặc đang sx
      // nếu đã có lô được dk hoặc sx
      if (this.$children) {
        this.sumSoluonglkhpx = 0;
        for (let item of this.dataChildren) {
          this.sumSoluonglkhpx += parseInt(item.soluonglsx, 10);
        }
        // console.log('Tổng lô sản xuất đã làm: ' + this.sumSoluonglkhpx)
        // 2. tính tổng số lượng những lô trong items chuẩn bị được thêm
        this.sumItemssl = 0;
        for (let item of this.items) {
          this.sumItemssl += parseInt(item.soluonglsx, 10);
        }
        // console.log('Tổng lô sản xuất cb thêm: ' + this.sumItemssl)
        this.sumAll = this.sumSoluonglkhpx + this.sumItemssl;
        // console.log('Tổng toàn bộ: ' + this.sumAll)
        // console.log(datalkh)
        const slvuot = parseInt(datalkh.soluongkhpx) - this.sumAll;
        // console.log(slvuot)

        let isDuplicate = false;
        const allItems = [...this.items, ...this.dataChildren]; // Tạo mảng mới chứa cả items và dataChildren
        for (let i = 0; i < allItems.length; i++) {
          for (let j = i + 1; j < allItems.length; j++) {
            if (allItems[i].malosx === allItems[j].malosx) {
              // console.log(`Tên khách hàng "${allItems[i].malosx}" bị trùng!`);
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
                title: `Có mã lô sản xuất "${allItems[i].malosx}" bị trùng, xem lại!`,
              });
              isDuplicate = true;
              break;
            }
          }
          if (isDuplicate) {
            break;
          }
        }
        if (!isDuplicate) {
          try {
            // console.log(this.items);
            for (let i = 0; i < this.items.length; i++) {
              // console.log('this.items[i]', this.items[i]);
              if (this.items[i].soluonglsx == "") {
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
                  title: "Chưa nhập số lượng !!!",
                });
                return;
              } else {
                // this.soluonghanmuckhpx = slvuot
                await this.$axios.$post(
                  "/api/ketoan/addphieulosx",
                  this.items[i]
                );
                this.lokehoachpx = await this.$axios.$get(
                  `/api/lokehoach/getallkehoachphanxuongwithout0`
                );
                // ở đây phải lọc lại mới có dữ liệu mới nhất. cần phải cập nhật lại tempData
                if (this.filterOptions == 9) {
                  // ở đây phải đẩy dữ liệu vào this.tempData
                  this.tempData = await this.filterData1(1);
                }

                // this.dataChildren.push(this.items[i]);
                // console.log(this.dataChildren);
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
              title: `Tạo phiếu lô sản xuất thành công. số lượng còn lại: ${slvuot}`,
            });

            this.dataChildren.push(...this.items);
            // console.log(this.items);
            let turn = 1;
            let length = this.items.length;
            while (turn <= length) {
              this.deleteRow(this.items.length - turn);
              turn += 1;
            }
            
            this.dataChildren = await this.$axios.$get(
                  `/api/lokehoach/getalllsxinkhpx?_id_khpx=${datalkh._id}`
                );
          } catch (error) {
            console.log(error);
          }
        }
      }
      // nếu chưa có lô nào được dk or sx
      else {
        this.sumItemssl = 0;
        for (let item of this.items) {
          this.sumItemssl += parseInt(item.soluonglsx, 10);
        }

        let isDuplicate = false;
        for (let i = 0; i < this.items.length; i++) {
          for (let j = i + 1; j < this.items.length; j++) {
            if (this.items[i].malosx === this.items[j].malosx) {
              // console.log(`Tên khách hàng "${this.items[i].malosx}" bị trùng!`);
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
                title: `Có mã lô sản xuất "${this.items[i].malosx}" bị trùng, xem lại!`,
              });
              isDuplicate = true;
              break;
            }
          }
          if (isDuplicate) {
            break;
          }
        }
        if (!isDuplicate) {
          try {
            for (let i = 0; i < this.items.length; i++) {
              // console.log('this.items[i]', this.items[i]);
              if (this.items[i].soluonglsx == "") {
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
                  title: "Chưa nhập số lượng !!!",
                });
                return;
              } else {
                this.$axios.$post("/api/ketoan/addphieulosx", this.items[i]);
                this.lokehoachpx = await this.$axios.$get(
                  `/api/lokehoach/getallkehoachphanxuongwithout0`
                );
                // ở đây phải lọc lại mới có dữ liệu mới nhất. cần phải cập nhật lại tempData
                if (this.filterOptions == 9) {
                  this.tempData = await this.filterData1(1);
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
                  title: `Tạo phiếu lô sản xuất thành công. Số lượng còn lại: ${slvuot}`,
                });
                // this.dataChildren.push(this.items[i]);
              }
            }

            // this.dataChildren.push(...this.items);
            let turn = 1;
            let length = this.items.length;
            while (turn <= length) {
              this.deleteRow(this.items.length - turn);
              turn += 1;
            }
          } catch (error) {
            console.log(error);
          }
        }
      }
    },

    // update lô sản xuất
    async onUpdate(data) {
      // console.log(data._id);
      try {
        await this.$axios.$patch(`/api/lokehoach/losanxuat/${data._id}`, data);

        // Sắp xếp lại bảng theo ngày kết thúc ngay lập tức
        this.dataChildren.sort(
          (a, b) => new Date(a.ngaykt) - new Date(b.ngaykt)
        );

        this.lokehoachpx = await this.$axios.$get(
          `/api/lokehoach/getallkehoachphanxuongwithout0`
        );
        // ở đây phải lọc lại mới có dữ liệu mới nhất. cần phải cập nhật lại tempData
        if (this.filterOptions == 9) {
          this.tempData = await this.filterData1(1);
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
        this.sortedTable();
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

    // update lô kế hoạch phân xưởng
    async onUpdate_lokhpx(data) {
      // console.log(data)
      try {
        // data.status = this.status
        this.$axios.$patch(
          `/api/lokehoach/updatelokehoachpxatdangkylodesanxuat/${data._id}`,
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

    // xóa lô sản xuất
    // async onDeleteLsx(pl) {
    //     swal({
    //         title: "Bạn muốn xóa?",
    //         text: "Chỉ xóa được những lô chưa được sản xuất!",
    //         buttons: true,
    //         dangerMode: true,
    //     }).then((willDelete) => {
    //         if (willDelete) {
    //             if (pl.status == 1 && pl.status_tinhluong == false && pl.datinhluong == false) {
    //                 this.$axios.$delete(`/api/lokehoach/losx/${pl._id}`)
    //                     .then(response => {
    //                         const index = this.dataChildren.findIndex(lsx => lsx._id === pl._id) // find the post index
    //                         if (~index) // if the post exists in array
    //                             this.dataChildren.splice(index, 1) //delete the post
    //                     });
    //                     this.lokehoachpx = await this.$axios.$get(
    //             `/api/lokehoach/getallkehoachphanxuongwithout0`
    //         );
    //             } else {
    //                 const Toast = Swal.mixin({
    //                     toast: true,
    //                     position: "top-end",
    //                     showConfirmButton: false,
    //                     timer: 3000,
    //                     timerProgressBar: true,
    //                     didOpen: (toast) => {
    //                         toast.addEventListener("mouseenter", Swal.stopTimer);
    //                         toast.addEventListener("mouseleave", Swal.resumeTimer);
    //                     },
    //                 });
    //                 Toast.fire({
    //                     icon: "error",
    //                     title: "Lô đã được đưa vào sản xuất, không thể xóa!!!",
    //                 });
    //             }

    //         } else {
    //             swal("Bạn đã hủy xóa");
    //         }
    //     });
    // },

    async onDeleteLsx(pl) {
      if (
        pl.status == 1 &&
        pl.status_tinhluong == false &&
        pl.datinhluong == false
      ) {
        await this.$axios
          .$delete(`/api/lokehoach/losx/${pl._id}`)
          .then((response) => {
            const index = this.dataChildren.findIndex(
              (lsx) => lsx._id === pl._id
            ); // find the post index
            if (~index)
              // if the post exists in array
              this.dataChildren.splice(index, 1); //delete the post
          });
        this.lokehoachpx = await this.$axios.$get(
          `/api/lokehoach/getallkehoachphanxuongwithout0`
        );
        this.sortedTable();
        // ở đây phải lọc lại mới có dữ liệu mới nhất. cần phải cập nhật lại tempData
        if (this.filterOptions == 9) {
          this.tempData = await this.filterData1(1);
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
          title: "Lô đã được đưa vào sản xuất, không thể xóa!!!",
        });
      }
    },
  },
};
</script>

<style scoped>
.table_wrapper {
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
  width: 200px;
  /* height: 38px; */
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
