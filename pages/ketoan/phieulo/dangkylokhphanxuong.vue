<template>
  <div class="column">
    <br />
    <div class="box" style="margin-left: 5px; margin-right: 5px">
      <div class="columns">
        <div class="column">
          <div class="control">
            <span class="icon is-small is-left">
              <i style="color: #ff55acee" class="fas fa-broom"></i>
            </span>
            <span style="color: #3850b7; font-size: 15px; font-weight: bold"
              >Đăng ký lô kế hoạch phân xưởng</span
            >
          </div>
        </div>
      </div>

      <div>
        <table class="table is-responsive is-bordered is-narrow is-fullwidth">
          <tr style="background-color: #faf0f5">
            <td style="width: 15%">
              <div class="field has-addons">
                <div class="autocomplete">
                  <input
                    class="input is-small"
                    type="text"
                    v-model="search_nhomthanhpham"
                    @input="onInput_nhomthanhpham"
                    placeholder="Nhóm thành phẩm"
                  />
                  <div
                    class="autocomplete-items"
                    v-if="suggestions_nhomtp.length"
                  >
                    <div
                      class="autocomplete-item"
                      v-for="suggestion_ntp in suggestions_nhomtp"
                      @click="selectSuggestion_nhomthanhpham(suggestion_ntp)"
                    >
                      {{ suggestion_ntp }}
                    </div>
                  </div>
                </div>
                <p class="control">
                  <a @click="searhNhomthanhpham" class="button is-small">
                    Lọc
                  </a>
                </p>
              </div>
            </td>
            <td style="width: 15%">
              <div class="field has-addons">
                <div class="autocomplete">
                  <input
                    class="input is-small"
                    type="text"
                    v-model="search_mathanhpham"
                    @input="onInput_mathanhpham"
                    placeholder="Mã thành phẩm"
                  />
                  <div
                    class="autocomplete-items"
                    v-if="suggestions_matp.length"
                  >
                    <div
                      class="autocomplete-item"
                      v-for="suggestion_mtp in suggestions_matp"
                      @click="selectSuggestion_mathanhpham(suggestion_mtp)"
                    >
                      {{ suggestion_mtp }}
                    </div>
                  </div>
                </div>
                <p class="control">
                  <a @click="searhMathanhpham" class="button is-small"> Lọc </a>
                </p>
              </div>
            </td>
            <td style="width: 15%">
              <div class="field has-addons">
                <p class="control is-expanded">
                  <input
                    v-model="search_timekt"
                    type="date"
                    class="input is-small"
                  />
                </p>
                <p class="control">
                  <a @click="searhTimeketthuc" class="button is-small"> Lọc </a>
                </p>
              </div>
            </td>
            <td style="width: 12%; text-align: center">
              <vue-excel-xlsx
                :data="sllosx"
                :columns="columns"
                :file-name="'lonhamay'"
                :file-type="'xlsx'"
                :sheet-name="'Lô nhà máy'"
              >
                Download Excel
              </vue-excel-xlsx>
            </td>
            <td style="width: 7.3%">
              <button
                @click="getAlllonhamay"
                class="button is-small is-danger is-fullwidth"
              >
                Refresh
              </button>
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
            <td></td>
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
                width: 2%;
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
              @click="sortTable('kehoachnam')"
              style="
                font-size: small;
                text-align: center;
                font-weight: 600;
                width: 7%;
              "
            >
              Kế hoạch năm
            </td>
            <td
              @click="sortTable('malonhamay')"
              style="
                font-size: small;
                text-align: center;
                font-weight: 600;
                width: 10%;
              "
            >
              Lô nhà máy
            </td>
            <td
              @click="sortTable('nhomthanhpham')"
              style="
                font-size: small;
                text-align: center;
                font-weight: 600;
                width: 6%;
              "
            >
              Nhóm thành phẩm
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
              Mã thành phẩm
            </td>
            <td
              @click="sortTable('tenthanhpham')"
              style="
                font-size: small;
                text-align: center;
                font-weight: 600;
                width: 17%;
              "
            >
              Tên thành phẩm
            </td>
            <!-- <td @click="sort('ngaybd')"
                                style="font-size: small; text-align: center; font-weight: 600; width: 5%;">Ngày bắt đầu
                            </td>
                            <td @click="sort('ngaykt')"
                                style="font-size: small; text-align: center; font-weight: 600; width: 5%;">Ngày kết thúc
                            </td> -->
            <td
              @click="sortTable('tuanbd')"
              style="
                font-size: small;
                text-align: center;
                font-weight: 600;
                width: 5%;
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
                width: 5%;
              "
            >
              Tuần KT (T2)
            </td>
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
              PX1
            </td>
            <td
              style="
                font-size: small;
                text-align: center;
                font-weight: 600;
                width: 5%;
              "
            >
              PX2
            </td>
            <td
              style="
                font-size: small;
                text-align: center;
                font-weight: 600;
                width: 5%;
              "
            >
              PX3
            </td>
            <td
              style="
                font-size: small;
                text-align: center;
                font-weight: 600;
                width: 5%;
              "
            >
              PX4
            </td>
            <td
              style="
                font-size: small;
                text-align: center;
                font-weight: 600;
                width: 5%;
              "
            >
              PX5
            </td>
          </tr>
          <tr
            v-for="(item, index) in paginatedTable"
            :key="index + 'llllkiq'"
            :class="{ highlighted: item === highlightedRow }"
            @click="[getInfoLosx(item), highlightRow(item)]"
          >
            <td style="font-size: small; text-align: center">
              {{ index + 1 }}
            </td>
            <td style="font-size: small; text-align: center">
              {{ item._id }}
            </td>
            <td style="font-size: small">{{ item.kehoachnam }}</td>
            <td style="font-size: small; font-weight: 600; color: red">
              {{ item.malonhamay }}
            </td>
            <td style="font-size: small; text-align: center">
              {{ item.nhomthanhpham }}
            </td>
            <td style="font-size: small; text-align: center">
              {{ item.mathanhpham }}
            </td>
            <td style="font-size: small">{{ item.tenthanhpham }}</td>
            <td style="font-size: small; text-align: center">
              {{ item.tuanbd }}
            </td>
            <td style="font-size: small; text-align: center">
              {{ item.tuankt }}
            </td>
            <td style="font-size: small; text-align: center">
              {{ item.soluong }}
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
              style="
                font-size: small;
                text-align: center;
                color: red;
                font-weight: 600;
              "
            >
              {{ item.px1 }}
            </td>
            <td
              style="
                font-size: small;
                text-align: center;
                color: red;
                font-weight: 600;
              "
            >
              {{ item.px2 }}
            </td>
            <td
              style="
                font-size: small;
                text-align: center;
                color: red;
                font-weight: 600;
              "
            >
              {{ item.px3 }}
            </td>
            <td
              style="
                font-size: small;
                text-align: center;
                color: red;
                font-weight: 600;
              "
            >
              {{ item.px4 }}
            </td>
            <td
              style="
                font-size: small;
                text-align: center;
                color: red;
                font-weight: 600;
              "
            >
              {{ item.px5 }}
            </td>
          </tr>
        </table>
      </div>
      <!-- phân trang -->
      <div class="columns">
        <div class="column">
          <div class="pagination" style="text-align: center">
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
      <div v-if="checkViewluong == true">
        <div>
          <table class="table is-responsive is-bordered is-narrow is-fullwidth">
            <tr style="background-color: #feecf0">
              <td colspan="10" style="font-weight: bold; font-size: small">
                <span>Mã lô nhà máy: </span>
                <span style="color: red">{{ dataLonm.malonhamay }}</span>
                |
                <span>Ngày bắt đầu dự kiến: </span>
                <span style="color: red">{{
                  dataLonm.ngaybd | formatDate
                }}</span>
                | <span>Ngày kết thúc dự kiến: </span>
                <span style="color: red">{{
                  dataLonm.ngaykt | formatDate
                }}</span>
                | <span>Số lượng: </span>
                <span style="color: red">{{
                  dataLonm.soluong | formatNumber
                }}</span>
              </td>
              <td>
                <button
                  @click="ghidulieu"
                  class="button is-small is-success is-fullwidth"
                >
                  Ghi dữ liệu
                </button>
              </td>
              <td>
                <button
                  @click="addLokhpx"
                  class="button is-small is-info is-fullwidth"
                >
                  Đăng ký
                </button>
              </td>
            </tr>
            <tr>
              <td
                style="
                  text-align: center;
                  font-size: small;
                  font-weight: 700;
                  width: 2%;
                "
              >
                STT
              </td>
              <!-- <td style="text-align: center; font-size:small; font-weight:700; width: 15%">Mã lô nhà
                                    máy</td> -->
              <td
                style="
                  text-align: center;
                  font-size: small;
                  font-weight: 700;
                  width: 15%;
                "
              >
                Phân xưởng
              </td>
              <td
                style="
                  text-align: center;
                  font-size: small;
                  font-weight: 700;
                  width: 15%;
                "
              >
                Tổ / Nhóm
              </td>
              <td
                style="
                  text-align: center;
                  font-size: small;
                  font-weight: 700;
                  width: 8%;
                "
              >
                Mã Sản phẩm
              </td>
              <td
                style="
                  text-align: center;
                  font-size: small;
                  font-weight: 700;
                  width: 7%;
                "
              >
                Mã KHPX
              </td>
              <td
                style="
                  text-align: center;
                  font-size: small;
                  font-weight: 700;
                  width: 5%;
                "
              >
                Số lượng
              </td>
              <!-- <td style="text-align: center; font-size:small; font-weight:700; width: 7%">Thời gian
                                    bắt đầu</td>
                                <td style="text-align: center; font-size:small; font-weight:700; width: 7%">Thời gian
                                    kết thúc</td> -->
              <td
                @click="sort('tuanbd')"
                style="
                  text-align: center;
                  font-size: small;
                  font-weight: 700;
                  width: 5%;
                "
              >
                Tuần BĐ
              </td>
              <td
                @click="sort('tuankt')"
                style="
                  text-align: center;
                  font-size: small;
                  font-weight: 700;
                  width: 5%;
                "
              >
                Tuần KT
              </td>
              <td
                @click="sort('ttqt')"
                style="
                  text-align: center;
                  font-size: small;
                  font-weight: 700;
                  width: 5%;
                "
              >
                TTQT
              </td>
              <td
                style="
                  text-align: center;
                  font-size: small;
                  font-weight: 700;
                  width: 6%;
                "
              >
                Trạng thái
              </td>
              <td
                style="
                  text-align: center;
                  font-size: small;
                  font-weight: 700;
                  width: 6%;
                "
              >
                Copy/Update
              </td>
              <td
                style="
                  text-align: center;
                  font-size: small;
                  font-weight: 700;
                  width: 5%;
                "
              >
                Xóa
              </td>
            </tr>
            <!-- show ra các lô đã đăng ký -->
            <tr v-for="(item, index) in datakehoachpx" :key="index + 'ppp'">
              <td style="font-size: small; text-align: center">
                {{ index + 1 }}
              </td>
              <!-- <td style="font-size: small">
                                    {{ item.malonhamay }}
                                </td> -->
              <td style="font-size: small">
                {{ item.tenpx }}
              </td>
              <td style="font-size: small">{{ item.tento }}</td>
              <td style="font-size: small">{{ item.maspkhpx }}</td>
              <td style="font-size: small; text-align: center">
                <!-- <input type="text" class="input is-small" v-model="item.makhpx" /> -->
                <input
                  type="text"
                  class="input is-small"
                  v-model="item.makhpx"
                />
              </td>
              <td style="font-size: small; text-align: center">
                <input
                  type="number"
                  class="input is-small"
                  v-model="item.soluongkhpx"
                />
              </td>
              <td>
                <input
                  type="text"
                  class="input is-small"
                  v-model.trim="item.tuanbdkhpx"
                />
              </td>
              <td>
                <input
                  type="text"
                  class="input is-small"
                  v-model.trim="item.tuanktkhpx"
                />
              </td>
              <td style="font-size: small; text-align: center">
                <input type="text" class="input is-small" v-model="item.ttqt" />
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
                  v-else-if="item.status == 0"
                  style="font-size: small; text-align: center"
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
              <td style="text-align: center; font-size: small">
                <a @click="onUpdateKehoachpx(item)">
                  <span style="color: green" class="icon is-small">
                    <i class="far fa-check-circle"></i>
                  </span>
                </a>
              </td>
              <td style="text-align: center; font-size: small">
                <a @click="onDeleteKhpx(item)">
                  <span style="color: red" class="icon is-small">
                    <i class="fas fa-times"></i>
                  </span>
                </a>
              </td>
            </tr>
            <!-- add row đăng ký -->
            <template v-if="isphanxuong == 1">
              <tr v-for="(item, index) in items" :key="index + 'jhooplkmn'">
                <td style="font-size: small; text-align: center">
                  {{ index + 1 }}
                </td>
                <!-- <td style="font-size: small;">{{ item.malonhamay }}</td> -->
                <td>
                  <div class="control has-icons-left">
                    <div class="select is-fullwidth is-small">
                      <select
                        v-model.trim="item.mapx"
                        @change="
                          getInfoPX($event, $event.target.selectedIndex, index)
                        "
                      >
                        <option
                          v-for="(item, index) in phanxuong"
                          :key="index + 'gf'"
                          :value="item.mapx"
                        >
                          {{ item.tenpx }}
                        </option>
                      </select>
                    </div>
                    <span class="icon is-left">
                      <i style="color: #48c78e" class="fas fa-dice-d6"></i>
                    </span>
                  </div>
                </td>
                <td>
                  <div class="control has-icons-left">
                    <div class="select is-fullwidth is-small">
                      <select
                        v-model.trim="item.mato"
                        @change="
                          getInfoTonhom(
                            $event,
                            $event.target.selectedIndex,
                            index
                          )
                        "
                      >
                        <option
                          v-for="(item, index) in item.tonhom"
                          :key="index + 'tonhom'"
                          :value="item.mato"
                        >
                          {{ item.tento }}
                        </option>
                      </select>
                    </div>
                    <span class="icon is-left">
                      <i style="color: #48c78e" class="fas fa-dice-d6"></i>
                    </span>
                  </div>
                </td>
                <td style="font-size: small">
                  <div class="autocomplete">
                    <input
                      class="input is-small is-danger"
                      type="text"
                      v-model="item.get_sanpham_input"
                      @input="onInput_sanpham(index)"
                      placeholder="Chọn sản phẩm"
                    />
                    <div class="autocomplete-items">
                      <div
                        class="autocomplete-item"
                        v-for="(
                          suggestion_sp, indexsuggest
                        ) in item.suggestions_sanpham"
                        :key="indexsuggest + 'suuug'"
                        @click="
                          selectSuggestion_sanpham(
                            index,
                            suggestion_sp,
                            indexsuggest
                          )
                        "
                      >
                        {{ suggestion_sp }}
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <input
                    @change="getTensp(item)"
                    v-model.trim="item.makhpx"
                    type="text"
                    class="input is-small"
                  />
                </td>
                <td>
                  <input
                    v-model.trim="item.soluongkhpx"
                    type="text"
                    class="input is-small"
                  />
                </td>
                <td style="font-size: small">
                  <input
                    @change="getTuanbd"
                    v-model.trim="item.tuanbdkhpx"
                    type="number"
                    class="input is-small"
                  />
                </td>
                <td style="font-size: small">
                  <input
                    @change="getTuankt"
                    v-model.trim="item.tuanktkhpx"
                    type="number"
                    class="input is-small"
                  />
                </td>
                <td>
                  <div class="select is-small is-fullwidth">
                    <select v-model="item.ttqt">
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                    </select>
                  </div>
                </td>
                <td></td>
                <td>
                  <button
                    @click="copyadd(item)"
                    class="button is-small is-warning is-fullwidth"
                  >
                    Copy
                  </button>
                </td>
                <td>
                  <button
                    @click="deleteRow(index)"
                    class="button is-small is-danger is-fullwidth"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            </template>
          </table>
        </div>
      </div>
      <br />
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
import { ModelListSelect } from "vue-search-select";
import "vue-search-select/dist/VueSearchSelect.css";
import dayjs from "dayjs";
import "dayjs/locale/vi";
export default {
  middleware: "auth",
  components: {
    ModelListSelect,
  },
  data() {
    return {
      dm_sanpham: [],
      phanxuong: [],
      dm_to: [],
      tonhom: [],
      selectedIndex: 0,
      kehoach: [],
      form: {
        createdAt: "",
        createdBy: this.$auth.$state.user.username,
        updatedAt: "",
      },
      isActive_loading: false,
      isphanxuong: 0,
      phieulosx: {},
      checkViewluong: false,
      // new
      maxuong: "",
      tenxuong: "",
      mato: "",
      tento: "",
      sllosx: [],
      // lọc talble
      sortDirection: 1,
      sortKey: "tuankt",
      currentPage: 1,
      itemsPerPage: 10,

      search_timekt: null,
      // suggest
      search_nhomthanhpham: "",
      search_mathanhpham: "",
      suggestions_nhomtp: [],
      suggestions_matp: [],
      nhomtppinlonhamay: [],
      matpinlonhamay: [],

      // hightligh
      highlightedRow: null,
      items: [
        {
          _id_khnam: "",
          _id_lonhamay: "",
          kehoachnam: "",
          malonhamay: "",
          soluonglonm: "",
          tuanbdlonm: "",
          tuanktlonm: "",
          ngaybdlonm: "",
          ngayktlonm: "",
          mathanhpham: "",
          tenthanhpham: "",
          nhomthanhpham: "",
          mapx: "",
          tenpx: "",
          mato: "",
          tento: "",
          maspkhpx: "",
          tenspkhpx: "",
          nhomspkhpx: "",
          makhpx: "",
          soluongkhpx: "",
          tuanbdkhpx: "",
          tuanktkhpx: "",
          ngaybdkhpx: "",
          ngayktkhpx: "",
          tuanbdthucte: "",
          tuanktthucte: "",
          ngaybdthucte: "",
          ngayhoanthanhtt: "",
          ttqt: "",
          nhomluong: "",
          status: 0,
          tongdat: 0,
          tonghong: 0,
          ghichu: "",
          createdAt: "",
          updatedAt: "",
          createdBy: "",
          congsuat: "",
          songay: "",
          may: "",
          tonhom: [
            {
              mato: "",
              tento: "",
            },
          ],
          get_sanpham_input: "",
          suggestions_sanpham: [],
        },
      ],
      dataLonm: [],
      datakehoachpx: [],
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
          label: "Số lượng",
          field: "soluong",
        },
        {
          label: "Tuần bắt đầu",
          field: "tuanbd",
          // dataFormat: this.prefixformatDate
        },
        {
          label: "Tuần kết thúc",
          field: "tuankt",
        },
        {
          label: "Ngày bắt đầuy",
          field: "ngaybd",
          dataFormat: this.prefixformatDate,
        },
        {
          label: "Ngày kết thúc",
          field: "ngaykt",
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
          label: "Trạng thái",
          field: "status",
          // dataFormat: this.trimData
        },
        {
          label: "Ngày bắt đầu TT",
          field: "ngaybatdautt",
          dataFormat: this.prefixformatDate,
        },
        {
          label: "Ngày hoàn thành TT",
          field: "ngayhoanthanhtt",
          dataFormat: this.prefixformatDate,
        },
        {
          label: "Ghi chú",
          field: "ghichu",
        },
        {
          label: "Ngày tạo",
          field: "createdAt",
          dataFormat: this.prefixformatDate,
        },
        {
          label: "Ngày update",
          field: "updatedAt",
          dataFormat: this.prefixformatDate,
        },
        {
          label: "Người tạo",
          field: "createdBy",
        },
      ],
    };
  },

  mounted() {
    this.currentDateTime();
    this.get_phanxuong();
    this.get_kehoach();
    this.getAlllonhamay();
    this.deleteRow(0);
    this.nhomthanhphamLNM();
    this.mathanhphamLNM();
  },

  computed: {
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
  },

  watch: {
    itemsPerPage() {
      this.currentPage = 1;
    },

    datakehoachpx(newItems) {
      // Cập nhật lại bảng khi có thay đổi
      console.log("Dữ liệu đã được cập nhật!");
    },
    sllosx(newItems) {
      // this.searhNhomthanhpham()
      //     this.$axios.$get("/api/losanxuat").then(response => {
      //   this.losanxuatData = response.data
      // })
      // this.$axios.$get("/api/lokehoach/alllonhamaywithsoluonglokhpx")
    },
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
    // --------------------------------------------------------------------------------------
    // 1: Các hàm hỗ trợ tính toán; lọc ...
    // suggest sản phẩm input
    onInput_sanpham(index) {
      // console.log(index);
      // console.log(this.items);
      const item = this.items[index];
      // console.log(item);
      if (!item.get_sanpham_input) {
        item.get_sanpham_input = [];
        return;
      }
      const MAX_SUGGESTIONS = 7; // Số lượng suggest tối đa
      item.suggestions_sanpham = this.dm_sanpham
        .map((c) => c.mavt)
        .filter((mavt) =>
          mavt.toLowerCase().includes(item.get_sanpham_input.toLowerCase())
        )
        .map((mavt) => mavt.trim())
        .slice(0, MAX_SUGGESTIONS);
    },
    selectSuggestion_sanpham(index, suggestion_sp, indexsuggest) {
      this.items[index].get_sanpham_input = suggestion_sp;
      this.items[index].suggestions_sanpham = [];
    },
    // and sugget input san pham
    // suggest input nhóm thành phẩm
    onInput_nhomthanhpham() {
      if (!this.search_nhomthanhpham) {
        this.suggestions_nhomtp = [];
        return;
      }
      const MAX_SUGGESTIONS = 10; // Số lượng suggest tối đa
      this.suggestions_nhomtp = this.nhomtppinlonhamay
        .map((c) => c.nhomthanhpham)
        .filter((nhomthanhpham) =>
          nhomthanhpham
            .toLowerCase()
            .includes(this.search_nhomthanhpham.toLowerCase())
        )
        .map((nhomthanhpham) => nhomthanhpham.trim())
        .slice(0, MAX_SUGGESTIONS);
    },
    selectSuggestion_nhomthanhpham(suggestion_ntp) {
      this.search_nhomthanhpham = suggestion_ntp;
      this.suggestions_nhomtp = [];
    },
    // end suggest nhóm thành phẩm
    // hàm sug mã thành phẩm
    onInput_mathanhpham() {
      if (!this.search_mathanhpham) {
        this.suggestions_matp = [];
        return;
      }
      const MAX_SUGGESTIONS = 10; // Số lượng suggest tối đa
      this.suggestions_matp = this.matpinlonhamay
        .map((c) => c.mathanhpham)
        .filter((mathanhpham) =>
          mathanhpham
            .toLowerCase()
            .includes(this.search_mathanhpham.toLowerCase())
        )
        .map((mathanhpham) => mathanhpham.trim())
        .slice(0, MAX_SUGGESTIONS);
    },
    selectSuggestion_mathanhpham(suggestion_mtp) {
      this.search_mathanhpham = suggestion_mtp;
      this.suggestions_matp = [];
    },
    // end suggest mã thành phẩm
    // hàm highlight để đánh dấu row nào được chọn
    highlightRow(row) {
      this.highlightedRow = row;
    },
    // format trước khi xuất execl, ở đây là trim dữ liệu trước khi mang ra
    trimData(value) {
      return value.trim();
    },
    // paginati
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

    // lấy mã thành phẩm, mã sp và nhóm sản phẩm trong lô kế hoạch phân xưởng
    async nhomthanhphamLNM() {
      this.nhomtppinlonhamay = await this.$axios.$get(
        "/api/lokehoach/nhomtpinlonhamay"
      );
    },
    async mathanhphamLNM() {
      this.matpinlonhamay = await this.$axios.$get(
        "/api/lokehoach/matpinlonhamay"
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
      this.form.createdAt = date + " " + time;
      this.form.updatedAt = date + " " + time;
    },

    codeAndNameAndDesc(item) {
      return `${item.masp} - ${item.tensp}`;
    },

    getDate(value) {
      if (!value) {
        return null;
      }
      return new Date(value);
    },

    getTuanbd() {
      const now = new Date();
      const currentYear = now.getFullYear();

      // Gán kết quả tính toán vào biến result để hiển thị trên màn hình
      // console.log(`Ngày bắt đầu của tuần ${tuanbd} là ${startDateString} và ngày kết thúc là ${endDateString}`);
      for (let i = 0; i < this.items.length; i++) {
        const startDate = dayjs()
          .year(currentYear)
          .month(0)
          .date((this.items[i].tuanbdkhpx - 1) * 7 + 1);
        const startDateString = startDate.locale("vi").format("YYYY/MM/DD");
        // console.log(startDateString);

        // // Tính toán ngày kết thúc của tuần đó
        const endDate = dayjs()
          .year(currentYear)
          .month(0)
          .date(this.items[i].tuanbdkhpx * 7);
        const endDateString = endDate.locale("vi").format("YYYY/MM/DD");
        this.items[i].ngaybdkhpx = startDateString;
      }
      // console.log(this.items_khpx);
    },

    getTuankt() {
      const now = new Date();
      const currentYear = now.getFullYear();
      for (let i = 0; i < this.items.length; i++) {
        const startDate = dayjs()
          .year(currentYear)
          .month(0)
          .date((this.items[i].tuanktkhpx - 1) * 7 + 1);
        const startDateString = startDate.locale("vi").format("YYYY/MM/DD");

        // // Tính toán ngày kết thúc của tuần đó
        const endDate = dayjs()
          .year(currentYear)
          .month(0)
          .date(this.items[i].tuanktkhpx * 7);
        const endDateString = endDate.locale("vi").format("YYYY/MM/DD");
        this.items[i].ngayktkhpx = endDateString;
      }
      // console.log(this.items_khpx);
    },

    async searhNhomthanhpham() {
      this.sllosx = await this.$axios.$get(
        `/api/lokehoach/searchnhomthanhpham?nhomthanhpham=${this.search_nhomthanhpham}`
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
          title: "Không tìm thấy số liệu",
        });
      }
    },
    async searhMathanhpham() {
      this.sllosx = await this.$axios.$get(
        `/api/lokehoach/searchmathanhpham?mathanhpham=${this.search_mathanhpham}`
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
          title: "Không tìm thấy số liệu",
        });
      }
    },

    // tìm lọc số liệu lô nhà máy theo thời gian kết thúc
    async searhTimeketthuc() {
      // console.log(this.search_timekt)

      this.sllosx = await this.$axios.$get(
        `/api/lokehoach/searchtimekt?ngaykt=${this.search_timekt}`
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
          title: "Không tìm thấy số liệu",
        });
      }
    },

    // Show all lô sản xuất nhà máy
    async getAlllonhamay() {
      this.search_mathanhpham = "";
      this.search_nhomthanhpham = "";
      this.search_timekt = null;
      this.checkViewluong = false;
      this.isActive_loading = true;
      const res = await this.$axios.$get(
        `/api/lokehoach/alllonhamaywithsoluonglokhpx`
      );

      console.log(res);

      if (res.success == true) {
        this.sllosx = res.data;
        this.isActive_loading = false;
      }

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

    onChange_pageSize(e) {
      var id = e.target.value;
      // var name = e.target.options[e.target.options.selectedIndex].text;
      // console.log('id ',id );
      // console.log('name ',name );
      this.pageSize = id;
    },

    // get all phân xưởng
    async get_phanxuong() {
      this.phanxuong = await this.$axios.$get(`/api/phongban/allphanxuong`);
    },

    // get all kế hoạch năm
    async get_kehoach() {
      this.kehoach = await this.$axios.$get(`/api/lokehoach/getkehoach`);
    },

    // bấm đăng ký lô kế hoạch phân xưởng
    async addLokhpx() {
      // console.log(this.dataLonm)
      this.isphanxuong = 1;
      this.items.push({
        _id_khnam: this.dataLonm._id_khnam,
        _id_lonhamay: this.dataLonm._id,
        kehoachnam: this.dataLonm.kehoachnam,
        malonhamay: this.dataLonm.malonhamay,
        soluonglonm: this.dataLonm.soluong,
        tuanbdlonm: this.dataLonm.tuanbd,
        tuanktlonm: this.dataLonm.tuankt,
        ngaybdlonm: this.dataLonm.ngaybd,
        ngayktlonm: this.dataLonm.ngaykt,
        mathanhpham: this.dataLonm.mathanhpham,
        tenthanhpham: this.dataLonm.tenthanhpham,
        nhomthanhpham: this.dataLonm.nhomthanhpham,
        mapx: "",
        tenpx: "",
        mato: "",
        tento: "",
        maspkhpx: "",
        tenspkhpx: "",
        nhomspkhpx: "",
        makhpx: "",
        soluongkhpx: this.dataLonm.soluong,
        tuanbdkhpx: "",
        tuanktkhpx: "",
        ngaybdkhpx: "",
        ngayktkhpx: "",
        tuanbdthucte: "",
        tuanktthucte: "",
        ngaybdthucte: "",
        ngayhoanthanhtt: "",
        ttqt: "",
        nhomluong: "", // chưa lấy được
        status: "",
        tongdat: 0,
        tonghong: 0,
        ghichu: "",
        createdAt: this.form.createdAt,
        updatedAt: this.form.updatedAt,
        createdBy: this.form.createdBy,
        congsuat: "",
        songay: "",
        may: "",
        tonhom: [
          {
            mato: "",
            tento: "",
          },
        ],
        get_sanpham_input: "",
        suggestions_sanpham: [],
      });
      // console.log(this.items)
    },

    // copy dữ liệu đăng ký
    async copyadd(data) {
      // console.log(data);
      this.items.push({
        _id_khnam: data._id_khnam,
        _id_lonhamay: data._id_lonhamay,
        kehoachnam: data.kehoachnam,
        malonhamay: data.malonhamay,
        soluonglonm: data.soluonglonm,
        tuanbdlonm: data.tuanbdlonm,
        tuanktlonm: data.tuanktlonm,
        ngaybdlonm: data.ngaybdlonm,
        ngayktlonm: data.ngayktlonm,
        mathanhpham: data.mathanhpham,
        tenthanhpham: data.tenthanhpham,
        nhomthanhpham: data.nhomthanhpham,
        mapx: "",
        tenpx: "",
        mato: "",
        tento: "",
        maspkhpx: data.maspdata,
        tenspkhpx: data.tenspkhpx,
        makhpx: data.makhpx,
        soluongkhpx: data.soluongkhpx,
        tuanbdkhpx: data.tuanbdkhpx,
        tuanktkhpx: data.tuanktkhpx,
        ngaybdkhpx: data.ngaybdkhpx,
        ngayktkhpx: data.ngayktkhpx,
        tuanbdthucte: data.tuanbdthucte,
        tuanktthucte: data.tuanktthucte,
        ngaybdthucte: data.ngaybdthucte,
        ngayhoanthanhtt: data.ngayhoanthanhtt,
        ttqt: data.ttqt,
        nhomluong: data.nhomluong, // chưa lấy được
        status: data.status,
        tongdat: data.tongdat,
        tonghong: data.tonghong,
        ghichu: data.ghichu,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        createdBy: data.createdBy,
        congsuat: data.congsuat,
        songay: data.songay,
        may: data.may,
        tonhom: [
          {
            mato: data.mato,
            tento: data.tento,
          },
        ],
        get_sanpham_input: data.get_sanpham_input,
        suggestions_sanpham: [],
      });
      // console.log(this.items);
    },

    deleteRow(index) {
      this.items.splice(index, 1);
      if (this.items.length <= 0) {
        this.isphanxuong = 0;
      }
    },

    // lấy tên sản phẩm cho phân xưởng đầu tiên
    async getTensp(data) {
      // console.log(data.maspkhpx, data.mapx)
      // get tên sản phẩm
      let getsp = {};
      let tenvt;
      let mapx;
      let nhom_luong;
      let nl;
      if (data.mapx == "AL_PXD" || data.mapx == "DV_PXD") {
        mapx = "PXD";
        getsp = await this.$axios.$get(
          `/api/ketoan/gettensp?mapx=${mapx}&mavt=${data.maspkhpx}`
        );
        nl = await this.$axios.$get(
          `/api/ketoan/getnhomluong?mapx=${mapx}&mavt=${data.maspkhpx}`
        );
      } else {
        getsp = await this.$axios.$get(
          `/api/ketoan/gettensp?mapx=${data.mapx}&mavt=${data.maspkhpx}`
        );
        nl = await this.$axios.$get(
          `/api/ketoan/getnhomluong?mapx=${data.mapx}&mavt=${data.maspkhpx}`
        );
      }

      // console.log(getsp)
      if (getsp.length > 0) {
        tenvt = getsp[0].tenvt;
      }
      if (nl.length > 0) {
        nhom_luong = nl[0].nhomluong;
      }
      for (let i = 0; i < this.items.length; i++) {
        this.items[i].tenspkhpx = tenvt;
        this.items[i].nhomluong = nhom_luong;
      }
      // console.log(this.items)
    },

    // Sau khi bấm chọn select phân xưởng
    // sẽ chuyển sang suggets input
    async getInfoPX(e, selectedIndex, index) {
      this.selectedIndex = selectedIndex;
      for (let i = 0; i < this.items.length; i++) {
        if (i == index) {
          let px;
          this.items[i].mapx = this.phanxuong[this.selectedIndex].mapx;
          this.items[i].tenpx = this.phanxuong[this.selectedIndex].tenpx;
          if (
            this.items[i].mapx == "AL_PXD" ||
            this.items[i].mapx == "DV_PXD"
          ) {
            px = "PXD";
            this.dm_sanpham = await this.$axios.$get(
              `/api/sanpham/getallspwithmapxfromdmnc?mapx=${px}`
            );
          } else {
            this.dm_sanpham = await this.$axios.$get(
              `/api/sanpham/getallspwithmapxfromdmnc?mapx=${this.items[i].mapx}`
            );
          }
          // get tổ
          this.tonhom = await this.$axios.$get(
            `/api/phongban/alltoinxuong?mapx=${
              this.phanxuong[this.selectedIndex].mapx
            }`
          );
          // console.log(this.tonhom);
          this.items[i].tonhom = [];
          for (let k = 0; k < this.tonhom.length; k++) {
            let tn = {
              mato: this.tonhom[k].mato,
              tento: this.tonhom[k].tento,
            };
            this.items[i].tonhom.push(tn);
          }
          // console.log(this.items);
        }
      }
    },

    getInfoTonhom(event, selectedIndex, index) {
      // lấy mã tổ tên tổ
      const selectedOption = event.target.options[selectedIndex];
      const mato = selectedOption.value;
      const tento = selectedOption.text;
      // console.log(`mato: ${mato}, tento: ${tento}`);
      this.items[index].mato = mato;
      this.items[index].tento = tento;
      // console.log(this.items);
    },

    // Bấm vào mã lô sản xuất sẽ ra thông tin các lô kế hoạch phân xưởng
    async getInfoLosx(data) {
      this.checkViewluong = true;
      this.dataLonm = data;
      // console.log(this.dataLonm)

      this.datakehoachpx = await this.$axios.$get(
        `/api/lokehoach/showlokehoachpx?_id_lonhamay=${this.dataLonm._id}`
      );
      if (this.datakehoachpx.length <= 0) {
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

    // ghi dữ liệu đăng ký lô kế hoạch phân xưởng
    async ghidulieu() {
      // console.log(this.items)
      try {
        if (this.items.length <= 0) {
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
            title: "Chưa đăng ký gì !!!",
          });
          return;
        } else {
          for (let i = 0; i < this.items.length; i++) {
            this.items[i].maspkhpx = this.items[i].get_sanpham_input;
            // 1. Cần lấy thêm tên của Vật tư
            var mapx;
            if (
              this.items[i].mapx == "AL_PXD" ||
              this.items[i].mapx == "DV_PXD"
            ) {
              mapx = "PXD";
            } else {
              mapx = this.items[i].mapx;
            }
            const arrTenvt = await this.$axios.$get(
              `/api/lokehoach/gettenvt?mapx=${mapx}&mavt=${this.items[i].maspkhpx}`
            );
            // console.log(arrTenvt[0].tenvt);
            const tenvt = arrTenvt[0].tenvt;
            this.items[i].tenspkhpx = tenvt;
            // 2. Lấy Nhóm lương
            const arrNhomluong = await this.$axios.$get(
              `/api/ketoan/getnhomluong?mapx=${mapx}&mavt=${this.items[i].maspkhpx}`
            );
            // console.log(arrNhomluong);
            const nhomluong = arrNhomluong[0].nhomluong;
            const nhomsanpham = arrNhomluong[0].nhomsp;
            if (nhomluong != null) {
              this.items[i].nhomluong = nhomluong;
            } else {
              this.items[i].nhomluong = "Chưa có";
            }
            if (nhomsanpham != null) {
              this.items[i].nhomspkhpx = nhomsanpham;
            } else {
              this.items[i].nhomspkhpx = "Chưa có";
            }

            // ghi vào csdl
            this.$axios.$post("/api/ketoan/addphieulokhpx", this.items[i]);
          }
          this.datakehoachpx = await this.$axios.$get(
            `/api/lokehoach/showlokehoachpx?_id_lonhamay=${this.dataLonm._id}`
          );

          if (
            this.search_nhomthanhpham &&
            !this.search_mathanhpham &&
            !this.search_timekt
          ) {
            this.search_mathanhpham = "";
            this.search_timekt = null;
            this.searhNhomthanhpham();
          } else if (
            !this.search_nhomthanhpham &&
            this.search_mathanhpham &&
            !this.search_timekt
          ) {
            this.search_nhomthanhpham = "";
            this.search_timekt = null;
            this.searhMathanhpham();
          } else if (
            !this.search_nhomthanhpham &&
            !this.search_mathanhpham &&
            this.search_timekt
          ) {
            this.search_mathanhpham = "";
            this.search_nhomthanhpham = "";
            this.searhTimeketthuc();
          } else {
            this.sllosx = await this.$axios.$get(
              `/api/lokehoach/alllonhamaywithsoluonglokhpx`
            );
          }

          let turn = 1;
          let length = this.items.length;
          while (turn <= length) {
            this.deleteRow(this.items.length - turn);
            turn += 1;
          }

          this.isphanxuong = 0;
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
    async onUpdateKehoachpx(data) {
      // console.log(data.tuanbdkhpx)
      try {
        const now = new Date();
        const currentYear = now.getFullYear();
        const startDate = dayjs()
          .year(currentYear)
          .month(0)
          .date((data.tuanbdkhpx - 1) * 7 + 1);
        const startDateString = startDate.locale("vi").format("YYYY/MM/DD");
        data.ngaybdkhpx = startDateString;
        // // Tính toán ngày kết thúc của tuần đó
        const endDate = dayjs()
          .year(currentYear)
          .month(0)
          .date(data.tuanktkhpx * 7);
        const endDateString = endDate.locale("vi").format("YYYY/MM/DD");
        data.ngayktkhpx = endDateString;

        // console.log(data.ngaybdkhpx)
        // console.log(data.ngayktkhpx)

        data.updatedAt = this.form.updatedAt;
        this.$axios.$patch(
          `/api/lokehoach/updatelokehoachpx/${data._id}`,
          data
        );

        if (
          this.search_nhomthanhpham &&
          !this.search_mathanhpham &&
          !this.search_timekt
        ) {
          this.search_mathanhpham = "";
          this.search_timekt = null;
          this.searhNhomthanhpham();
        } else if (
          !this.search_nhomthanhpham &&
          this.search_mathanhpham &&
          !this.search_timekt
        ) {
          this.search_nhomthanhpham = "";
          this.search_timekt = null;
          this.searhMathanhpham();
        } else if (
          !this.search_nhomthanhpham &&
          !this.search_mathanhpham &&
          this.search_timekt
        ) {
          this.search_mathanhpham = "";
          this.search_nhomthanhpham = "";
          this.searhTimeketthuc();
        } else {
          this.sllosx = await this.$axios.$get(
            `/api/lokehoach/alllonhamaywithsoluonglokhpx`
          );
        }

        // this.$axios.$get(`/api/lokehoach/searchnhomthanhpham?nhomthanhpham=${this.search_nhomthanhpham}`)
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

    // xóa lô kế hoạch phân xưởng
    async onDeleteKhpx(pl) {
      // lấy ra _id, mã kế hoạch, mã lô nhà máy để xác định là duy nhất
      // console.log(pl)
      let arrlosanxuat;
      arrlosanxuat = await this.$axios.$get(
        `/api/lokehoach/predelete_lokehoachpx?_id=${pl._id}`
      );
      // console.log(arrlosanxuat)
      swal({
        title: "Bạn muốn xóa?",
        text: "Chỉ được xóa lô kế hoạch phân xưởng khi chưa có lô sản xuất được giao!",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          if (arrlosanxuat.length <= 0) {
            this.$axios
              .$delete(`/api/lokehoach/kehoachphanxuong/${pl._id}`)
              .then((response) => {
                const index = this.datakehoachpx.findIndex(
                  (khpx) => khpx._id === pl._id
                ); // find the post index
                if (~index)
                  // if the post exists in array
                  this.datakehoachpx.splice(index, 1); //delete the post
              });
            // this.searhNhomthanhpham();
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
              title: "Đã xóa dữ liệu kế hoạch phân xưởng",
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
                "Đã có lô sản xuất phát sinh từ lô Kế hoạch PX này, không thể xóa!!!",
            });
          }
        } else {
          swal("Bạn đã hủy xóa");
        }
      });
    },

    // async onDeleteKhpx(pl) {
    //   // lấy ra _id, mã kế hoạch, mã lô nhà máy để xác định là duy nhất
    //   // console.log(pl)
    //   let arrlosanxuat;
    //   arrlosanxuat = await this.$axios.$get(
    //     `/api/lokehoach/predelete_lokehoachpx?_id=${pl._id}`
    //   );
    //   if (arrlosanxuat.length <= 0) {
    //     this.$axios
    //       .$delete(`/api/lokehoach/kehoachphanxuong/${pl._id}`)
    //       .then((response) => {
    //         const index = this.datakehoachpx.findIndex(
    //           (khpx) => khpx._id === pl._id
    //         ); // find the post index
    //         if (~index)
    //           // if the post exists in array
    //           this.datakehoachpx.splice(index, 1); //delete the post
    //       });
    //     if (
    //       this.search_nhomthanhpham &&
    //       !this.search_mathanhpham &&
    //       !this.search_timekt
    //     ) {
    //       this.search_mathanhpham = "";
    //       this.search_timekt = null;
    //       this.searhNhomthanhpham();
    //     } else if (
    //       !this.search_nhomthanhpham &&
    //       this.search_mathanhpham &&
    //       !this.search_timekt
    //     ) {
    //       this.search_nhomthanhpham = "";
    //       this.search_timekt = null;
    //       this.searhMathanhpham();
    //     } else if (
    //       !this.search_nhomthanhpham &&
    //       !this.search_mathanhpham &&
    //       this.search_timekt
    //     ) {
    //       this.search_mathanhpham = "";
    //       this.search_nhomthanhpham = "";
    //       this.searhTimeketthuc();
    //     } else {
    //       this.sllosx = await this.$axios.$get(
    //         `/api/lokehoach/alllonhamaywithsoluonglokhpx`
    //       );
    //     }
    //   } else {
    //     const Toast = Swal.mixin({
    //       toast: true,
    //       position: "top-end",
    //       showConfirmButton: false,
    //       timer: 3000,
    //       timerProgressBar: true,
    //       didOpen: (toast) => {
    //         toast.addEventListener("mouseenter", Swal.stopTimer);
    //         toast.addEventListener("mouseleave", Swal.resumeTimer);
    //       },
    //     });
    //     Toast.fire({
    //       icon: "error",
    //       title:
    //         "Đã có lô sản xuất phát sinh từ lô Kế hoạch PX này, không thể xóa!!!",
    //     });
    //   }
    // },
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

.input.is-small {
  min-width: 100px; /* Điều chỉnh độ rộng tùy ý */
}

tr:hover {
  cursor: pointer;
  background-color: whitesmoke;
}

.highlighted {
  background-color: lightblue;
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
