<template>
  <div class="columns">
    <div class="column container">
      <br />
      <div class="box" style="margin-left: 10px; margin-right: 10px">
        <div class="columns">
          <div class="column">
            <div class="control">
              <span class="icon is-small is-left">
                <i style="color: #00d1b2" class="fas fa-anchor"></i>
              </span>
              <span style="color: #3850b7; font-size: 17px; font-weight: bold;">Danh mục sản phẩm</span>
            </div>
          </div>
        </div>

        <div class="columns">
          <div class="column is-6">
            <span>Có tất cả: </span>
            <span style="font-weight: bold">{{
              nguyencong.length | formatNumber
            }}</span>
            <span>danh mục</span>
          </div>

          <div class="column is-4" style="text-align: right">
            <input
              type="text"
              class="input is-small"
              v-model="search"
              placeholder="Gõ tìm theo tên của sản phẩm"
            />
          </div>
          <div class="column is-1" style="text-align: right">
            <button
              @click="openModel()"
              class="button is-success is-fullwidth is-small"
            >
              <span class="icon is-small">
                <i class="fas fa-feather"></i>
              </span>
              <span>Thêm</span>
            </button>
          </div>
          <div class="column is-1" style="text-align: right">
            <nuxt-link :to="`/`">
              <button class="button is-info is-fullwidth is-small">
                <span class="icon is-small">
                  <i class="fas fa-angle-double-left"></i>
                </span>
                <span>Thoát</span>
              </button>
            </nuxt-link>
          </div>
        </div>
        <div style="margin-bottom: 3px;">
          <vue-excel-xlsx
            :data="nguyencong"
            :columns="columns"
            :file-name="'Danh_muc_san_pham'"
            :file-type="'xlsx'"
            :sheet-name="'Danh mục sản phẩm'"
          >
            Download Excel
          </vue-excel-xlsx>
        </div>
        <div class="table_wrapper table-height">
          <div>
            <table
              class="table is-responsive is-bordered is-narrow is-fullwidth"
            >
              <tr style="background-color: #feecf0">
                <!-- <td style="font-size: small; width: 20%">
                  <div class="control has-icons-left">
                    <div class="select is-small is-fullwidth">
                      <select>
                        <option selected>-- Chọn phân xưởng --</option>
                        <option v-for="item in phanxuong" :value="item.mapx">
                          {{ item.mapx }} - {{ item.tenpx }}
                        </option>
                      </select>
                    </div>
                    <span class="icon is-small is-left">
                      <i style="color: #48c78e" class="fas fa-kaaba"></i>
                    </span>
                  </div>
                </td> -->
                <td style="width: 12.65%">
                  <div class="autocomplete">
                    <input
                      class="input is-small is-danger"
                      type="text"
                      v-model="search_nhomsp"
                      @input="onInput"
                      placeholder="Nhóm sản phẩm"
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
                <td style="width: 12.65%">
                  <div class="autocomplete">
                    <input
                      class="input is-small is-danger"
                      type="text"
                      v-model="search_masp"
                      @input="onInput_masp"
                      placeholder="Mã sản phẩm"
                    />
                    <div
                      class="autocomplete-items"
                      v-if="suggestions_masp.length"
                    >
                      <div
                        class="autocomplete-item"
                        v-for="suggestion in suggestions_masp"
                        @click="selectSuggestion_masp(suggestion)"
                      >
                        {{ suggestion }}
                      </div>
                    </div>
                  </div>
                </td>
                <td style="width: 7.7%">
                  <button
                    @click="searhData"
                    class="button is-small is-fullwidth is-success"
                  >
                    Lọc
                  </button>
                </td>
                <td style="width: 7.7%">
                  <button @click="getNguyencong" class="button is-small is-danger is-fullwidth">
                    Refresh
                  </button>
                </td>
                <!-- <td style="width: 10.15%; text-align: center">
                  <vue-excel-xlsx
                    :data="lokehoachsx"
                    :columns="columns"
                    :file-name="'losanxuat'"
                    :file-type="'xlsx'"
                    :sheet-name="'Lô sản xuất'"
                  >
                    Download Excel
                  </vue-excel-xlsx>
                </td> -->
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
                <td></td>
              </tr>
            </table>
          </div>
          <table
            class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth"
          >
            <thead>
              <tr>
                <th style="text-align: center; font-size: small">STT</th>
                <th
                  style="text-align: center; font-size: small"
                  @click="sortTable('mapx')"
                >
                  Mã PX
                </th>
                <th
                  style="text-align: center; font-size: small"
                  @click="sortTable('mavt')"
                >
                  Mã sản phẩm
                </th>
                <th
                  style="text-align: center; font-size: small"
                  @click="sortTable('tenvt')"
                >
                  Tên sản phẩm
                </th>
                <th
                  style="text-align: center; font-size: small"
                  @click="sortTable('nhomsp')"
                >
                  Nhóm SP
                </th>
                <th
                  style="text-align: center; font-size: small"
                  @click="sortTable('nhomluong')"
                >
                  Nhóm lương
                </th>
                <th style="text-align: center; font-size: small">Diễn giải</th>
                <th style="text-align: center; font-size: small">Cập nhật</th>
                <th style="text-align: center; font-size: small">Xóa</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(nc, index) in paginatedTable" :key="index">
                <td style="text-align: center; font-size: small">
                  {{ index + 1 }}
                </td>
                <td style="text-align: center; font-size: small">
                  {{ nc.mapx }}
                </td>
                <td style="font-size: small">
                  {{ nc.mavt }}
                </td>
                <td style="font-size: small">
                  {{ nc.tenvt }}
                </td>
                <td style="text-align: center; font-size: small">
                  {{ nc.nhomsp }}
                </td>
                <td style="text-align: center; font-size: small">
                  {{ nc.nhomluong }}
                </td>
                <td style="font-size: small">
                  {{ nc.diengiai }}
                </td>
                <td style="text-align: center; font-size: small">
                  <a @click="getDN(nc)">
                    <span style="color: green" class="icon is-small">
                      <i class="far fa-check-circle"></i>
                    </span>
                  </a>
                </td>
                <td style="text-align: center; font-size: small">
                  <a @click="onDelete(nc)">
                    <span style="color: red" class="icon is-small">
                      <i class="fas fa-times"></i>
                    </span>
                  </a>
                </td>
              </tr>
            </tbody>
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
        <!-- Modal update-->
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
                        <i style="color: #ffd863ff" class="fab fa-codepen"></i>
                      </span>
                      Cập nhật thông tin sản phẩm:
                      {{ one_nguyencong.mavt }}
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
                <div>
                  <div class="table_wrapper">
                    <table
                      class="table is-responsive is-bordered is-narrow is-fullwidth"
                    >
                      <tr>
                        <td style="font-size: small">Mã phân xưởng</td>
                        <td>
                          <input
                            type="text"
                            v-model="one_nguyencong.mapx"
                            class="input is-small"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td style="font-size: small">Mã vật tư</td>
                        <td>
                          <input
                            type="text"
                            v-model="one_nguyencong.mavt"
                            class="input is-small"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td style="font-size: small">Tên vật tư</td>
                        <td>
                          <input
                            type="text"
                            v-model="one_nguyencong.tenvt"
                            class="input is-small"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td style="font-size: small">Nhóm lương</td>
                        <td>
                          <input
                            type="text"
                            v-model="one_nguyencong.nhomluong"
                            class="input is-small is-danger"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td style="font-size: small">Nhóm sản phẩm</td>
                        <td>
                          <input
                            type="text"
                            v-model="one_nguyencong.nhomsp"
                            class="input is-small"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td colspan="2">
                          <div class="field">
                            <div class="control">
                              <textarea
                                class="textarea is-small"
                                v-model="one_nguyencong.diengiai"
                              ></textarea>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td colspan="2">
                          <button
                            @click="onUpdate(one_nguyencong._id)"
                            class="button is-success is-fullwidth is-small"
                          >
                            <span class="icon is-small">
                              <i class="fab fa-jsfiddle"></i>
                            </span>
                            <span>Cập nhật thông tin</span>
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

        <!-- Modal create-->
        <div class="">
          <!-- Toggle class  -->
          <div :class="{ 'is-active': isActive_cre }" class="modal">
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
                        <i style="color: #ffd863ff" class="fab fa-codepen"></i>
                      </span>
                      Thêm mới nguyên công
                    </p>
                  </div>
                  <div class="column" style="text-align: right">
                    <a @click="isActive_cre = false">
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
                <div>
                  <div class="table_wrapper">
                    <table
                      class="table is-responsive is-bordered is-narrow is-fullwidth"
                    >
                      <tr>
                        <td style="font-size: small">Mã phân xưởng</td>
                        <td>
                          <div class="control has-icons-left">
                            <div class="select is-small is-fullwidth">
                              <select @change="getWithPX($event)">
                                <option selected>-- Chọn phân xưởng --</option>
                                <option
                                  v-for="item in phanxuong"
                                  :value="item.mapx"
                                >
                                  {{ item.mapx }} - {{ item.tenpx }}
                                </option>
                              </select>
                            </div>
                            <span class="icon is-small is-left">
                              <i
                                style="color: #48c78e"
                                class="fas fa-kaaba"
                              ></i>
                            </span>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td style="font-size: small">Mã vật tư</td>
                        <td>
                          <input
                            type="text"
                            v-model="form.mavt"
                            class="input is-small"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td style="font-size: small">Tên vật tư</td>
                        <td>
                          <input
                            type="text"
                            v-model="form.tenvt"
                            class="input is-small"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td style="font-size: small">Nhóm lương</td>
                        <td>
                          <input
                            type="text"
                            v-model="form.nhomluong"
                            class="input is-small is-danger"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td style="font-size: small">Nhóm sản phẩm</td>
                        <td>
                          <input
                            type="text"
                            v-model="form.nhomsp"
                            class="input is-small"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td colspan="2">
                          <div class="field">
                            <div class="control">
                              <textarea
                                class="textarea is-small"
                                v-model="form.diengiai"
                              ></textarea>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td colspan="2">
                          <button
                            @click="onAddNc()"
                            class="button is-success is-fullwidth is-small"
                          >
                            <span class="icon is-small">
                              <i class="fas fa-file-signature"></i>
                            </span>
                            <span>Thêm mới nguyên công</span>
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

import {
  required,
  email,
  minLength,
  url,
  sameAs,
} from "vuelidate/lib/validators";
export default {
  middleware: "auth",
  data() {
    return {
      nguyencong: [],
      phanxuong: [],
      tableName: [],
      phienbanluong: "",
      createdAt: null,
      createdBy: this.$auth.$state.user.username,
      form: {
        mapx: "",
        mavt: "",
        tenvt: "",
        nhomsp: "",
        diengiai: "",
        nhomluong: "",
      },
      search: "",
      isActive: false,
      isActive_cre: false,
      one_nguyencong: {},

      // lọc talble
      sortDirection: 1,
      sortKey: "mavt",
      currentPage: 1,
      itemsPerPage: 10,

      // check nhiều phân xưởng
      selectedOptions: [],
      Options_status: [],
      isOpen: false,
      isOpenst: false,
      nhomspinnc: [],
      maspinnc: [],

      // tìm kiếm
      search_nhomsp: "",
      suggestions: [],
      search_masp: "",
      suggestions_masp: [],

      columns: [
        {
          label: "Id",
          field: "_id",
          // dataFormat: this.trimData
        },
        {
          label: "Phân xưởng",
          field: "mapx",
          /* dataFormat: this.priceFormat */
          // dataFormat: this.trimData
        },
        {
          label: "Mã sản phẩm",
          field: "mavt",
          /* dataFormat: this.priceFormat */
          // dataFormat: this.trimData
        },
        {
          label: "Tên vật tư",
          field: "tenvt",
          /* dataFormat: this.priceFormat */
          // dataFormat: this.trimData
        },
        {
          label: "Nhóm sản phẩm",
          field: "nhomsp",
          /* dataFormat: this.priceFormat */
          // dataFormat: this.trimData
        },
        {
          label: "Nhóm lương",
          field: "nhomluong",
          /* dataFormat: this.priceFormat */
          // dataFormat: this.trimData
        },
        {
          label: "Ghi chú",
          field: "diengiai",
        },
        // {
        //   label: "Tạo ngày",
        //   field: "createdAt",
        //   dataFormat: this.prefixformatDate,
        // },
        // {
        //   label: "Tạo bởi",
        //   field: "createdBy",
        // },
        // {
        //   label: "Cập nhật ngày",
        //   field: "updatedAt",
        //   dataFormat: this.prefixformatDate,
        // },
      ],
    };
  },

  validations: {
    form: {
      masp: {
        required,
      },
      tensp: {
        required,
      },
    },
  },

  computed: {
    filteredItems() {
      return this.nguyencong.filter((item) => {
        return item.tenvt.toLowerCase().indexOf(this.search.toLowerCase()) > -1;
      });
    },

    // phân trang và sắp xếp
    sortedTable() {
      return this.nguyencong.sort((a, b) => {
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
    filteredItems(newVal, oldVal) {
      // Perform any necessary updates here
    },
    nguyencong(newVal, oldVal) {},
  },

  mounted() {
    this.getNguyencong();
    this.currentDateTime();
    this.getPhanxuong();
    this.masanphaminnic();
    this.nhomspinnic();
  },

  isFormValid() {
    return !this.$v.form.$invalid;
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
      this.form.createdAt = date + " " + time;
    },

    // suggest input nhóm sản phẩm
    onInput() {
      if (!this.search_nhomsp) {
        this.suggestions = [];
        return;
      }
      const MAX_SUGGESTIONS = 5; // Số lượng suggest tối đa
      this.suggestions = this.nhomspinnc
        .map((c) => c.nhomsp)
        .filter((nhomsp) =>
          nhomsp.toLowerCase().includes(this.search_nhomsp.toLowerCase())
        )
        .map((nhomsp) => nhomsp.trim())
        .slice(0, MAX_SUGGESTIONS);
    },
    selectSuggestion(suggestion) {
      this.search_nhomsp = suggestion;
      this.suggestions = [];
    },

    onInput_masp() {
      if (!this.search_masp) {
        this.suggestions_masp = [];
        return;
      }
      const MAX_SUGGESTIONS = 5; // Số lượng suggest tối đa
      this.suggestions_masp = this.maspinnc
        .map((c) => c.mavt)
        .filter((mavt) =>
          mavt.toLowerCase().includes(this.search_masp.toLowerCase())
        )
        .map((mavt) => mavt.trim())
        .slice(0, MAX_SUGGESTIONS);
    },
    selectSuggestion_masp(suggestion) {
      this.search_masp = suggestion;
      this.suggestions_masp = [];
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

    async searhData() {
      // console.log(this.suggestions);

      // console.log(this.nguyencong);
      if (this.search_nhomsp != "" && this.search_masp == "") {
        this.nguyencong = await this.$axios.$get(
          `/api/lokehoach/searchnhomspinnc?nhomsp=${this.search_nhomsp}`
        );
      } else if (this.search_nhomsp == "" && this.search_masp != "") {
        this.nguyencong = await this.$axios.$get(
          `/api/lokehoach/searchMaspinnc?mavt=${this.search_masp}`
        );
      }
    },

    async getPhanxuong() {
      this.phanxuong = await this.$axios.$get(`/api/phongban/allphanxuong`);
    },

    async getWithPX(e) {
      var name = e.target.options[e.target.options.selectedIndex].text;
      // console.log(name)
      let position = name.split("-");
      let p1 = position[0].trim();
      // console.log(p1)
      if (p1 == "AL_PXD" || p1 == "DV_PXD" || p1 == "PXD") {
        this.form.mapx = "PXD";
        // alert('PXD')
      } else {
        this.form.mapx = p1;
      }
    },

    async getNguyencong() {
      this.search_masp = ''
      this.search_nhomsp = ''
      this.nguyencong = await this.$axios.$get(
        `/api/nguyencong/getallnguyencong`
      );
      if (this.nguyencong.length <= 0) {
        this.$toasted.show("Danh mục nguyên công rỗng", {
          duration: 3000,
          theme: "bubble",
        });
      }
    },

    // lấy nhóm sản phẩm trong nc
    async nhomspinnic() {
      this.nhomspinnc = await this.$axios.$get("/api/lokehoach/nhomspindmnc");
      // console.log(this.nhomspinnc)
    },

    // lấy mã sản phẩm trong nc
    async masanphaminnic() {
      this.maspinnc = await this.$axios.$get("/api/lokehoach/maspindmnc");
      // console.log(this.maspinnc)
    },

    async getDN(nguyencong) {
      this.isActive = true;
      this.one_nguyencong = nguyencong;
      // console.log(this.one_nguyencong)
    },

    openModel() {
      this.isActive_cre = true;
    },

    async onUpdate(id) {
      try {
        this.$axios.$patch(`/api/nguyencong/nc/${id}`, this.one_nguyencong, {});
        this.nguyencong = await this.$axios.$get(
          `/api/nguyencong/getallnguyencong`
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
          title: "Cập nhật thông tin thành công",
        });

        this.isActive = false;
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

    async onAddNc() {
      try {
        this.$axios.$post("/api/nguyencong/addnguyencong", this.form);
        this.nguyencong = await this.$axios.$get(
          `/api/nguyencong/getallnguyencong`
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
          title: "Thêm mới thành công",
        });

        this.isActive_cre = false;
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

    onDelete(nc) {
      swal({
        title: "Bạn muốn xóa nguyên công này?",
        text: "Không lấy lại được sau khi xóa!",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          // xóa công đoạn khỏi bảng
          this.$axios.$delete(`/api/nguyencong/${nc._id}`).then((response) => {
            const index = this.nguyencong.findIndex((n) => n._id === nc._id);
            if (~index)
              // if the post exists in array
              this.nguyencong.splice(index, 1); //delete the post
          });
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
  /* display: block;
  overflow-x: auto; */
  white-space: nowrap;
}

.table_wrapper {
  /* position: sticky;
  left: 0; */
  background-color: whitesmoke;
}

/* .table-height {
  height: 350px;
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
} */

.modal-content,
.modal-card {
  width: 620px;
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
