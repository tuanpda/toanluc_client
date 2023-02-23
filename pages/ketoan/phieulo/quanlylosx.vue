<template>
  <div class="columns">
    <div class="column">
      <br />
      <div class="box" style="margin-left:20px; margin-right:20px;">
        <div class="columns">
          <div class="column">
            <div class="control">
              <span class="icon is-small is-left">
                <i style="color: #f14668" class="fa fa-newspaper-o"></i>
              </span>
              <span style="color: #3850b7; font-size: 14px; font-weight: bold;">Lập kế hoạch nhà máy</span>
            </div>
          </div>
          <div class="column" style="text-align: right">
            <nuxt-link :to="`/`">
              <button class="button is-info is-small">
                <span class="icon is-small">
                  <i class="fas fa-angle-double-left"></i>
                </span>
                <span>Thoát</span>
              </button>
            </nuxt-link>
          </div>
        </div>
        <div class="columns">
          <div class="column">
            <table class="table is-responsive is-bordered is-narrow is-fullwidth">
              <tr style="background-color: #ebfffc">
                <td><input @change="timNhomsp" v-model="searchnhomsp" type="text" class="input is-small"
                    placeholder="Nhập Nhóm sản phẩm" />
                </td>
                <td><input @change="timMasp" v-model="searchmasp" type="text" class="input is-small"
                    placeholder="Nhập mã thành phẩm" />
                </td>
                <td style="width: 10%"><button @click="resetAll" class="button is-danger is-small is-fullwidth">
                    <span>Refresh</span>
                  </button></td>
                <td><input class="input is-small" type="date"></td>
                <td><input class="input is-small" type="date"></td>
                <td style="width: 9%; text-align: center;">
                  <vue-excel-xlsx :data="phieulo" :columns="columns" :file-name="'muctieukehoachnam'"
                    :file-type="'xlsx'" :sheet-name="'Mục tiêu kế hoạch năm'">
                    Download Excel
                  </vue-excel-xlsx>
                </td>
                <td style="width: 10%"><button class="button is-info is-small is-fullwidth">
                    <span>Tìm kiếm</span>
                  </button></td>
              </tr>
            </table>
          </div>
        </div>

        <div class="table_wrapper">
          <table class="table is-bordered is-narrow is-fullwidth">
            <thead>
              <tr style="background-color: #ebfffc">
                <th style="text-align: center; font-size: small; font-weight: bold; width: 3%;">
                  STT
                </th>
                <th @click="sort('makh')" style="text-align: center; font-size: small; font-weight: bold; width: 7%;">
                  Kế hoạch năm
                </th>
                <th @click="sort('masp')" style="text-align: center; font-size: small; font-weight: bold; width: 7%;">
                  Mã thành phẩm
                </th>
                <th @click="sort('nhomsp')" style="text-align: center; font-size: small; font-weight: bold; width: 5%;">
                  Nhóm sản phẩm
                </th>
                <th @click="sort('tgbatdau')"
                  style="text-align: center; font-size: small; font-weight: bold; width: 5%;">
                  Ngày bắt đầu
                </th>
                <th @click="sort('tgketthuc')"
                  style="text-align: center; font-size: small; font-weight: bold; width: 5%;">
                  Ngày kết thúc
                </th>
                <th @click="sort('soluong')"
                  style="text-align: center; font-size: small; font-weight: bold; width: 7%;">
                  Số lượng
                </th>
                <th @click="sort('status')" style="text-align: center; font-size: small; font-weight: bold; width: 5%;">
                  Trạng thái
                </th>
                <th style="text-align: center; font-size: small; font-weight: bold; width: 5%;">
                  Ghi chú
                </th>
                <th style="text-align: center; font-size: small; font-weight: bold; width: 7%;">
                  Mùa vụ P1
                </th>
                <th style="text-align: center; font-size: small; font-weight: bold; width: 7%;">
                  Mùa vụ P2
                </th>
                <th style="text-align: center; font-size: small; font-weight: bold; width: 7%;">
                  Mùa vụ P3
                </th>
                <th style="text-align: center; font-size: small; font-weight: bold; width: 5%;">
                  Còn lại
                </th>
                <th style="text-align: center; font-size: small; font-weight: bold; width: 4%;">
                  Cập nhật
                </th>
                <th style="text-align: center; font-size: small; font-weight: bold; width: 4%;">
                  Xóa
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(pl, index) in sortedKehoach" :key="index + 'a'">
                <td style="text-align: center; font-size: small; background-color: whitesmoke;">
                  {{ index + 1 }}
                </td>
                <td @click="getdatakhnhamay(pl)" style="font-size: small; background-color: #fffaeb;">
                  <!-- <input type="text" class="input is-small" v-model="pl.makh"> -->
                  {{ pl.makh }}
                </td>
                <td style="font-size: small;">
                  {{ pl.masp }}
                </td>
                <td style="font-size: small;">
                  {{ pl.nhomsp }}
                </td>
                <td style="background-color: #fffaeb;"><input class="input is-small" type="date"
                    v-bind:value="pl.tgbatdau | inputDateFilter"
                    v-on:input="pl.tgbatdau = getDate($event.target.value)">
                </td>
                <td style="background-color: #fffaeb;"><input class="input is-small" type="date"
                    v-bind:value="pl.tgketthuc | inputDateFilter"
                    v-on:input="pl.tgketthuc = getDate($event.target.value)">
                </td>
                <td style="text-align: center; font-size: small; background-color: #d2e4faff;">
                  <input v-model.trim="pl.soluong" type="text" class="input is-small">
                </td>
                <td style="font-size: small; text-align: center;">
                  <span v-if="pl.status == false">
                    <i style="color: #ffd863" class="fa fa-circle"></i>
                  </span>
                  <span v-else><i style="color: #00947e" class="fa fa-circle"></i>
                  </span>
                </td>
                <td style="font-size: small; text-align: center;">
                  <a @click="showGhichu(pl)"><span>
                      <i style="color: #9b6dff" class="fas fa-barcode"></i>
                    </span></a>
                </td>
                <td style="background-color: #fdedf6"><input v-model.trim="pl.soluongmuavup1" type="text"
                    class="input is-small"></td>
                <td style="background-color: #fdedf6"><input v-model.trim="pl.soluongmuavup2" type="text"
                    class="input is-small"></td>
                <td style="background-color: #fdedf6"><input v-model.trim="pl.soluongmuavup3" type="text"
                    class="input is-small"></td>
                <td style="text-align: right; font-size: small;">
                  {{ parseInt(pl.soluong) - (parseInt(pl.soluongmuavup1) + parseInt(pl.soluongmuavup2) +
                  parseInt(pl.soluongmuavup3)) | formatNumber}}
                </td>
                <td>
                  <button @click="onupdateKehoachmuavu(pl)" class="button is-success is-small is-fullwidth">
                    <span>Cập nhật</span>
                  </button>
                </td>
                <td>
                  <button @click="onDeleteKehoachnam(pl)" class="button is-danger is-small is-fullwidth">
                    <span>Xóa</span>
                  </button>
                </td>
              </tr>
              <tr style="background: #ebfffc">
                <td colspan="6" style="font-size: small; font-weight:800">Total</td>
                <td style="font-size: small; font-weight:800; text-align: right; color: red;">
                  {{
                  soluongTotal | formatNumber }}</td>
                <td colspan="2"></td>
                <td style="font-size: small; font-weight:800; text-align: right; color: red;">
                  {{
                  muavup1Total | formatNumber }}</td>
                <td style="font-size: small; font-weight:800; text-align: right; color: red;">
                  {{
                  muavup2Total | formatNumber }}</td>
                <td style="font-size: small; font-weight:800; text-align: right; color: red;">
                  {{
                  muavup3Total | formatNumber }}</td>
                <td colspan="3"></td>
              </tr>
            </tbody>


          </table>
          <table class="table is-responsive is-bordered is-narrow is-fullwidth">
            <tr>
              <td style="font-size: small; width: 12%;">
                <div class="select is-small is-fullwidth">
                  <select id="" @change="onChange_pageSize($event)">
                    <option selected>-- Số dòng hiển thị --</option>
                    <option value="5">5 dòng dữ liệu</option>
                    <option value="10">10 dòng dữ liệu</option>
                    <option value="15">15 dòng dữ liệu</option>
                    <option value="20">20 dòng dữ liệu</option>
                    <option value="30">30 dòng dữ liệu</option>
                    <option value="40">40 dòng dữ liệu</option>
                    <option value="50">50 dòng dữ liệu</option>
                  </select>
                </div>
              </td>
              <td style="font-size: small; width: 6%;">Đang Sort theo: {{ currentSort }}</td>
              <td style="font-size: small; width: 6%;">Thứ tự: {{ currentSortDir }} (asc: Tăng - desc:
                Giảm)</td>
              <td style="font-size: small;">Đang ở trang: {{ currentPage }}</td>
              <td style="text-align: right;">
                <a @click="prevPage"><span class="icon is-small">
                    <i class="fas fa-angle-double-left"></i>
                  </span></a>
                {{ currentPage }}
                <a @click="nextPage"><span class="icon is-small">
                    <i class="fas fa-angle-double-right"></i>
                  </span></a>
              </td>
            </tr>
          </table>
        </div>

        <!-- Kế hoạch mùa vụ -->
        <div class="table_wrapper" style="margin-top: 1px;">
          <table class="table is-responsive is-bordered is-narrow is-fullwidth">
            <tr>
              <td colspan="17" style="font-size:small; font-weight: 700">
                <span>Kế hoạch hàng tháng theo từng mùa vụ | mã sản phẩm: <span style="color: red;">{{
                  mark_kehoachnam.masp
                }}</span> </span>
              </td>
              <!-- <td colspan="2">
                <button @click="addKehoachmuavu" class="button is-success is-small is-fullwidth">
                  <span>Lập kế hoạch mùa vụ</span>
                </button>
              </td>
              <td colspan="2">
                <button @click="onUpdateKHMV" class="button is-success is-small is-fullwidth">
                  <span>Cập nhật</span>
                </button>
              </td> -->
            </tr>
            <!-- Nếu bấm nút thêm mùa vụ -->
            <template>
              <tr>
                <td
                  style="text-align: center; background-color: #effaf5; font-size: small; font-weight: bold; width: 12%;">
                  Mùa vụ P1
                </td>
                <td
                  style="text-align: center; background-color: #effaf5; font-size: small; font-weight: bold; width: 7%;">
                  Tháng 1
                </td>
                <td
                  style="text-align: center; background-color: #effaf5; font-size: small; font-weight: bold; width: 7%;">
                  Tháng 2
                </td>
                <td
                  style="text-align: center; background-color: #effaf5; font-size: small; font-weight: bold; width: 7%;">
                  Tháng 3
                </td>
                <td
                  style="text-align: center; background-color: #effaf5; font-size: small; font-weight: bold; width: 7%;">
                  Tháng 4
                </td>
                <td
                  style="text-align: center; background-color: whitesmoke; font-size: small; font-weight: bold; width: 12%;">
                  Mùa vụ P2
                </td>
                <td
                  style="text-align: center; background-color: whitesmoke; font-size: small; font-weight: bold; width: 7%;">
                  Tháng 5
                </td>
                <td
                  style="text-align: center; background-color: whitesmoke; font-size: small; font-weight: bold; width: 7%;">
                  Tháng 6
                </td>
                <td
                  style="text-align: center; background-color: whitesmoke; font-size: small; font-weight: bold; width: 7%;">
                  Tháng 7
                </td>
                <td
                  style="text-align: center; background-color: whitesmoke; font-size: small; font-weight: bold; width: 7%;">
                  Tháng 8
                </td>
                <td
                  style="text-align: center; background-color: #eef6f4ff; font-size: small; font-weight: bold; width: 12%;">
                  Mùa vụ P3
                </td>
                <td
                  style="text-align: center; background-color: #eef6f4ff; font-size: small; font-weight: bold; width: 7%;">
                  Tháng 9
                </td>
                <td
                  style="text-align: center; background-color: #eef6f4ff; font-size: small; font-weight: bold; width: 7%;">
                  Tháng 10
                </td>
                <td
                  style="text-align: center; background-color: #eef6f4ff; font-size: small; font-weight: bold; width: 7%;">
                  Tháng 11
                </td>
                <td
                  style="text-align: center; background-color: #eef6f4ff; font-size: small; font-weight: bold; width: 7%;">
                  Tháng 12
                </td>
                <th style="text-align: center; font-size: small; font-weight: bold; width: 4%;">
                  Cập nhật
                </th>
                <th style="text-align: center; font-size: small; font-weight: bold; width: 4%;">
                  KH Nhà máy
                </th>
              </tr>
              <tr v-for="(khmv, index) in kehoachmuavu" :key="index + 'iuoqeqelq'">
                <td
                  style="text-align: right; font-size: small; background-color: #effaf5; color: #f14668; font-weight: 900;">
                  {{
                    khmv.soluongmuavup1 | formatNumber
                  }} | <span style="color: green">{{ soluongmuavuTotalMV1 | formatNumber }}</span>
                </td>
                <td style="background-color: #effaf5;"><input type="text" class="input is-small"
                    v-model.trim="khmv.slthang1"></td>
                <td style="text-align: center; font-size: small; background-color: #effaf5;"><input type="text"
                    class="input is-small" v-model.trim="khmv.slthang2"></td>
                <td style="background-color: #effaf5;"><input type="text" class="input is-small"
                    v-model.trim="khmv.slthang3"></td>
                <td style="background-color: #effaf5;">
                  <input type="text" class="input is-small" v-model.trim="khmv.slthang4">
                </td>
                <td
                  style="text-align: right; font-size: small; background-color: whitesmoke; color: #f14668; font-weight: 900;">
                  {{ khmv.soluongmuavup2 | formatNumber }} | <span style="color: green">{{ soluongmuavuTotalMV2 |
                  formatNumber }}</span></td>
                <td style="background-color: whitesmoke;"><input type="text" class="input is-small"
                    v-model.trim="khmv.slthang5"></td>
                <td style="background-color: whitesmoke;">
                  <input type="text" class="input is-small" v-model.trim="khmv.slthang6">
                </td>
                <td style="background-color: whitesmoke;">
                  <input type="text" class="input is-small" v-model.trim="khmv.slthang7">
                </td>
                <td style="background-color: whitesmoke;">
                  <input type="text" class="input is-small" v-model.trim="khmv.slthang8">
                </td>
                <td
                  style="text-align: right; font-size: small; background-color: #eef6f4ff; color: #f14668; font-weight: 900;">
                  {{ khmv.soluongmuavup3 | formatNumber }}| <span style="color: green">{{ soluongmuavuTotalMV3 |
                  formatNumber }}</span></td>
                <td style="background-color: #eef6f4ff;"><input type="text" class="input is-small"
                    v-model.trim="khmv.slthang9">
                </td>
                <td style="background-color: #eef6f4ff;">
                  <input type="text" class="input is-small" v-model.trim="khmv.slthang10">
                </td>
                <td style="background-color: #eef6f4ff;">
                  <input type="text" class="input is-small" v-model.trim="khmv.slthang11">
                </td>
                <td style="background-color: #eef6f4ff;">
                  <input type="text" class="input is-small" v-model.trim="khmv.slthang12">
                </td>
                <td>
                  <button @click="onupdateKehoachmuavutheothang(khmv)" class="button is-success is-small is-fullwidth">
                    <span>Cập nhật</span>
                  </button>
                </td>
                <td>
                  <button @click="giaopx(khmv)" class="button is-success is-small is-fullwidth">
                    <span>Tạo lô nhà máy</span>
                  </button>
                </td>
              </tr>
            </template>
          </table>
        </div>
        <br />

        <div class="table_wrapper">
          <table class="table is-bordered is-narrow is-fullwidth">
            <thead>
              <tr style="background-color: #ebfffc">
                <th style="text-align: center; font-size: small; font-weight: bold; width: 3%;">
                  STT
                </th>
                <th style="text-align: center; font-size: small; font-weight: bold;">
                  Kế hoạch
                </th>
                <th style="text-align: center; font-size: small; font-weight: bold;">
                  Mã thành phẩm
                </th>
                <th style="text-align: center; font-size: small; font-weight: bold;">
                  Mã Lô nhà máy
                </th>
                <th style="text-align: center; font-size: small; font-weight: bold; width: 3%;">
                  Số lượng
                </th>
                <th style="text-align: center; font-size: small; font-weight: bold; width: 7%">
                  Thời gian bắt đầu
                </th>
                <th style="text-align: center; font-size: small; font-weight: bold; width: 7%">
                  Thời gian kết thúc
                </th>
                <th style="text-align: center; font-size: small; font-weight: bold;">
                  Trạng thái
                </th>
                <th style="text-align: center; font-size: small; font-weight: bold; width: 3%;">
                  Cập nhật
                </th>
                <th style="text-align: center; font-size: small; font-weight: bold; width: 3%;">
                  Xóa
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in kehoachphanxuong" :key="index + 'jjjhhhff'">
                <td style="text-align: center; font-size: small;">{{ index + 1 }}</td>
                <td style="text-align: center; font-size: small;">{{ item.makh }}</td>
                <td style="text-align: center; font-size: small;">{{ item.masp }}</td>
                <!-- <td style="font-size: small;">{{ item.makhpx }}</td> -->
                <td style="font-size: small;">
                  <!-- <input type="text" class="input is-small" v-model.trim="item.makhpx"> -->
                  {{ item.makhpx }}
                </td>
                <!-- <td style="text-align: center; font-size: small;">{{ item.soluong }}</td> -->
                <td><input type="text" class="input is-small" v-model.trim="item.soluong"></td>
                <!-- <td style="text-align: center; font-size: small;">{{ item.ngaybd | formatDate }}</td> -->
                <!-- <td><input type="date" class="input is-small" v-model="item.ngaybd"></td> -->
                <td><input class="input is-small" type="date" v-bind:value="item.ngaybd | inputDateFilter"
                    v-on:input="item.ngaybd = getDate($event.target.value)"></td>
                <!-- <td style="text-align: center; font-size: small;">{{ item.ngaykt | formatDate }}</td> -->
                <td><input class="input is-small is-danger" type="date" v-bind:value="item.ngaykt | inputDateFilter"
                    v-on:input="item.ngaykt = getDate($event.target.value)"></td>
                <td style="font-size: small; text-align: center;">
                  <span v-if="item.status == false">
                    <i style="color: #ffd863" class="fa fa-circle"></i>
                  </span>
                  <span v-else><i style="color: #00947e" class="fa fa-circle"></i>
                  </span>
                </td>
                <td>
                  <button @click="onUpdateKhnm(item)" class="button is-success is-small is-fullwidth">
                    <span>Cập nhật</span>
                  </button>
                </td>
                <td>
                  <button @click="onDeleteKhnm(item)" class="button is-danger is-small is-fullwidth">
                    <span>Xóa</span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Kế hoạch tại từng phân xưởng -->
        <div v-if="check_giaopx == true" class="table_wrapper" style="margin-top: 1px;">
          <table class="table is-responsive is-bordered is-narrow is-fullwidth">
            <tr style="background-color: #faf0f5">
              <td colspan="6" style="font-weight: bold; font-size: small">
                Lập lô nhà máy
              </td>
              <td>
                <button @click="ghidulieu" class="button is-success is-small is-fullwidth">
                  <span>Ghi dữ liệu</span>
                </button>
              </td>
            </tr>
            <tr>
              <td style="width: 3%; font-size: small; font-weight: 500; text-align: center; ">
                STT
              </td>
              <td style="font-size: small; font-weight: 500; text-align: center; ">
                Mã lô nhà máy
              </td>
              <td style="font-size: small; font-weight: 500; text-align: center;">
                Số lượng
              </td>
              <td style="width: 5%; font-size: small; font-weight: 500; text-align: center;">
                Thời gian bắt đầu
              </td>
              <td style="width: 5%; font-size: small; font-weight: 500; text-align: center;">
                Thời gian kết thúc
              </td>
              <td style="width: 5%; font-size: small; font-weight: 500; text-align: center;">
                Xóa
              </td>
              <td style="width: 5%; font-size: small; font-weight: 500; text-align: center;">
                Copy
              </td>
            </tr>
            <tr v-for="(item, index) in items_khpx" :key="index + 'cm-a'">
              <td style="font-size: small; text-align:center">
                {{ index + 1 }}
              </td>
              <td>
                <input v-model.trim="item.makhpx" type="text" class="input is-warning is-small" />
              </td>
              <td>
                <input v-model.trim="item.soluong" type="text" class="input is-small" />
              </td>
              <td>
                <input v-model.trim="item.ngaybd" type="date" class="input is-small" />
              </td>
              <td>
                <input v-model.trim="item.ngaykt" type="date" class="input is-small" />
              </td>
              <td style="text-align: center">
                <button @click="deleteRow_khpx(index)" class="button is-danger is-small">
                  Xóa
                </button>
              </td>
              <td style="text-align: center">
                <button @click="copyadd_khpx(item)" class="button is-warning is-small">
                  copy
                </button>
              </td>
            </tr>
          </table>
        </div>

        <!-- Modal ghi chu -->
        <div class="">
          <!-- Toggle class  -->
          <div :class="{ 'is-active': isActive }" class="modal">
            <div class="modal-background"></div>
            <div class="modal-content modal-card">
              <header style="background-color: #3e8ed0; border-top-left-radius: 8px; border-top-right-radius: 8px;">
                <div class="columns">
                  <div class="column is-9">
                    <p style="font-size: small; font-weight: bold; color: white; padding: 15px;">
                      <span class="icon is-small is-left">
                        <i style="color: #ffd863ff" class="fas fa-tags"></i>
                      </span>
                      Thông tin về Kế hoạch nhà máy mã: {{ one_lokhnm.makh }}
                    </p>
                  </div>
                  <div class="column" style="text-align:right;">
                    <a @click="isActive = false">
                      <span style="color: red; padding: 20px;" class="icon is-small">
                        <i class="fas fa-power-off"></i>
                      </span>
                    </a>
                  </div>
                </div>
              </header>
              <section class="modal-card-body">
                <div>
                  <div class="field">
                    <div class="control">
                      <textarea rows="20" cols="120" v-model="one_lokhnm.ghichu" class="textarea"
                        placeholder="Normal textarea"></textarea>
                    </div>
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
      searchmasp: '',
      tonhom: [],
      form: {
        createdAt: null,
        createdBy: this.$auth.$state.user.username,
      },
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
      // Các var cho việc thêm lô sản xuất tại xưởng
      items: [
        {
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
          soluongkhsx: "",
          ngaybd: "",
          ngaykt: "",
          tongdat: "",
          tonghong: "",
          ghichu: "",
          createdAt: null,
          createdBy: "",
          status: 0,
          stopday_losx: "",
          nhomto: [
            {
              tento: "",
              mato: "",
            },
          ],
        },
      ],

      // lokehoachphanxuong
      items_khpx: [
        {
          mapx: "",
          tenpx: "",
          makh: "",
          soluong: "",
          ngaybd: "",
          ngaykt: "",
          soluong: "",
          masp: "",
          tensp: "",
          createdAt: "",
          nhomsp: "",
        },
      ],

      // tạo kế hoạch mùa vụ
      // items này để lập kế hoạch nhà máy
      items_khmv: [
        {
          makh: "",
          makhmv: "",
          mota: "",
          masp: "",
          tensp: "",
          nhomsp: "",
          soluong: "",
          soluongmuavu: "",
          tgbatdau: "",
          tgketthuc: "",
          ghichu: "",
          status: 0,
        },
      ],

      // tạo lô kế hoạch phân xưởng
      items_cre_lokhpx: [
        {
          mapx: "",
          tenpx: "",
          makh: "",
          soluong: "",
          ngaybd: "",
          ngaykt: "",
          soluong: "",
          masp: "",
          tensp: "",
          createdAt: "",
          sanpham: [
            {
              masp: "",
              tensp: "",
            },
          ],
        },
      ],
      // xuất execl
      columns: [
        {
          label: "Mã phân xưởng",
          field: "mapx"
        },
        {
          label: "Kế hoạch nhà máy",
          field: "makh"
        },
        {
          label: "Kế hoạch tại phân xưởng",
          field: "makhpx"
        },
        {
          label: "Mã lô sản xuất",
          field: "malosx"
        },
        {
          label: "Nguyên công",
          field: "nguyencong"
        },
        {
          label: "Đơn giá",
          field: "dongia"
        },
        {
          label: "Phân Xưởng",
          field: "phanxuong_cn"
        },
        {
          label: "Tổ",
          field: "to_cn"
        },
        {
          label: "Người thực hiện",
          field: "tencn"
        },
        {
          label: "Số đạt",
          field: "sodat"
        },
        {
          label: "Số hỏng",
          field: "sohong"
        },
      ],
      columns1: [
        {
          label: "Tên công nhật",
          field: "tencongnhat"
        },
        {
          label: "Người thực hiện",
          field: "nguoithuchien"
        },
        {
          label: "Đơn giá",
          field: "dongia"
        },
        {
          label: "Số giờ công",
          field: "sogiocong"
        },
      ],

      // lọc talble
      currentSort: 'nhomsp',
      currentSortDir: 'asc',
      pageSize: 10,
      currentPage: 1,
      filter: '',

      // xuất execl
      columns: [
        {
          label: "Mã kế hoạch năm",
          field: "makh",
        },
        {
          label: "Mã sản phẩm",
          field: "masp",
          /* dataFormat: this.priceFormat */
        },
        {
          label: "Tên sản phẩm",
          field: "tensp",
        },
        {
          label: "Nhóm sản phẩm",
          field: "nhomsp",
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
    // this.getmalokh()
    this.deleteRow(0);
    this.deleteRow_khmv(0)
    this.deleteRow_khpx(0)
  },

  computed: {
    // tính Sum của số lượng 
    soluongTotal: function () {
      let sum = 0;
      for (let i = 0; i < this.phieulo.length; i++) {
        sum += parseInt(this.phieulo[i].soluong)
      }

      return sum;
    },
    // tính sum của P1
    muavup1Total: function () {
      let sum = 0;
      for (let i = 0; i < this.phieulo.length; i++) {
        sum += parseInt(this.phieulo[i].soluongmuavup1)
      }

      return sum;
    },
    // tính sum của P2
    muavup2Total: function () {
      let sum = 0;
      for (let i = 0; i < this.phieulo.length; i++) {
        sum += parseInt(this.phieulo[i].soluongmuavup2)
      }

      return sum;
    },
    // tính sum của P1
    muavup3Total: function () {
      let sum = 0;
      for (let i = 0; i < this.phieulo.length; i++) {
        sum += parseInt(this.phieulo[i].soluongmuavup3)
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
          sum += parseInt(this.kehoachphanxuong[i].soluong)
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
          sum += parseInt(this.kehoachphanxuong[i].soluong)
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
          sum += parseInt(this.kehoachphanxuong[i].soluong)
        }

      }
      return sum;
    },

    // lọc 
    filteredKehoach() {
      return this.phieulo.filter(c => {
        if (this.filter == '') return true;
        return c.name.toLowerCase().indexOf(this.filter.toLowerCase()) >= 0;
      })
    },
    sortedKehoach() {
      return this.filteredKehoach.sort((a, b) => {
        let modifier = 1;
        if (this.currentSortDir === 'desc') modifier = -1;
        if (a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
        if (a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
        return 0;
      }).filter((row, index) => {
        let start = (this.currentPage - 1) * this.pageSize;
        let end = this.currentPage * this.pageSize;
        if (index >= start && index < end) return true;
      });
    }
  },

  watch: {
    filter() {
      console.log('reset to p1 due to filter');
      this.currentPage = 1;
    }
  },

  filters: {
    inputDateFilter: function (date) {
      if (!date) {
        return '';
      }
      date = new Date(date);
      return date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
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
    },

    // chọn trang hiển thị
    onChange_pageSize(e) {
      var id = e.target.value;
      // var name = e.target.options[e.target.options.selectedIndex].text;
      // console.log('id ',id );
      // console.log('name ',name );
      this.pageSize = id;
    },

    // search in table
    sort: function (s) {
      //if s == current sort, reverse
      if (s === this.currentSort) {
        this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc';
      }
      this.currentSort = s;
    },

    nextPage: function () {
      if ((this.currentPage * this.pageSize) < this.filteredsllosx.length) this.currentPage++;
    },
    prevPage: function () {
      if (this.currentPage > 1) this.currentPage--;
    },

    getDate(value) {
      if (!value) {
        return null;
      }
      return new Date(value);
    },

    // tạo lô kế hoạch tại phân xưởng
    async addPhanxuong() {
      this.items_khpx.push({
        makh: "",
        mapx: "",
        tenpx: "",
        makhpx: "",
        soluong: "",
        ngaybd: "",
        ngaykt: "",
        soluong: "",
        masp: "",
        tensp: "",
        createdAt: this.form.createdAt,
      });
    },

    // bấm tạo kế hoạch mùa vụ
    async addKehoachmuavu() {
      this.items_khmv.push({
        makh: this.mark_kehoachnam.makh,
        makhmv: "",
        mota: this.mark_kehoachnam.mota,
        masp: this.mark_kehoachnam.masp,
        tensp: this.mark_kehoachnam.tensp,
        nhomsp: this.mark_kehoachnam.nhomsp,
        soluong: this.mark_kehoachnam.soluong,
        soluongmuavu: "",
        tgbatdau: this.mark_kehoachnam.tgbatdau,
        tgketthuc: this.mark_kehoachnam.tgketthuc,
        ghichu: this.mark_kehoachnam.ghichu,
        status: 0,
        createdAt: this.form.createdAt,
        createdBy: this.$auth.$state.user.username,
      });
    },

    // bấm nút thêm lô sản xuất
    async addLosx() {
      // this.isphanxuong = 1;
      if (this.mark_Makh == '') {
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
          title: "Chọn phân xưởng trước khi tạo phiếu lô!",
        });
      } else {
        this.checkadd = true
        console.log(this.mark_Mapx)
        // 1. Tìm nhóm lương tại đây luôn
        if (this.mark_Mapx.trim() == "AL_PXD" || this.mark_Mapx.trim() == "PXD" || this.mark_Mapx.trim() == "DV_PXD") {
          let phanxuong = "PXD";
          this.nhomluong = await this.$axios.$get(
            `/api/lokehoach/getnhomluongtheompx?mapx=${phanxuong}&mavt=${this.mark_Masp}`
          );
          // console.log(this.nhomluong);
        } else {
          this.nhomluong = await this.$axios.$get(
            `/api/lokehoach/getnhomluongtheompx?mapx=${this.mark_Mapx}&mavt=${this.mark_Masp}`
          );
          // console.log(this.nhomluong);
        }

        let nl
        if (this.nhomluong.length <= 0) {
          nl = "không có"
        } else {
          nl = this.nhomluong[0].nhomluong.trim()
          // console.log(this.nhomluong[0].nhomluong.trim())
        }
        // console.log(nl)

        // 2. Xem xưởng này có tổ hay là không???
        // 2.1. Từ mã phân xưởng thì soi xem xưởng vừa được chọn có tổ không?
        this.tonhom = await this.$axios.$get(
          `/api/phongban/alltoinxuong?mapx=${this.mark_Mapx}`
        );
        // console.log(this.tonhom)
        this.items.push({
          makh: this.mark_Makh.trim(),
          makhpx: this.mark_Makhpx.trim(),
          malosx: this.mark_Makhpx.trim() + '-',
          mapx: this.mark_Mapx.trim(),
          tenpx: this.mark_Tenpx.trim(),
          mato: "",
          tento: "",
          masp: this.mark_Masp.trim(),
          tensp: this.mark_Tensp.trim(),
          soluong: "",
          nhomluong: nl,
          soluonglsx: "",
          soluongkhsx: this.mark_Soluongkhsx.trim(),
          ngaybd: "",
          ngaykt: "",
          tongdat: "",
          tonghong: "",
          ghichu: "",
          createdAt: null,
          createdBy: "",
          status: 0,
          stopday_losx: "",
          nhomto: this.tonhom
        });
        // console.log(this.items)
      }

    },

    // copy
    copy(data) {
      this.items.push({
        makh: data.makh,
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
        tongdat: "",
        tonghong: "",
        ghichu: "",
        status: 0,
        stopday_losx: "",
        nhomto: [{
          mato: data.mato,
          tento: data.tento
        }]
      });
    },

    // copy mã mùa vụ
    async copyadd_khmv(data) {
      this.items_khmv.push({
        makh: this.mark_kehoachnam.makh,
        makhmv: data.makhmv,
        mota: this.mark_kehoachnam.mota,
        masp: this.mark_kehoachnam.masp,
        tensp: this.mark_kehoachnam.tensp,
        nhomsp: this.mark_kehoachnam.nhomsp,
        soluong: this.mark_kehoachnam.soluong,
        soluongmuavu: data.soluongmuavu,
        tgbatdau: this.mark_kehoachnam.tgbatdau,
        tgketthuc: this.mark_kehoachnam.tgketthuc,
        ghichu: this.mark_kehoachnam.ghichu,
        status: 0,
        createdAt: this.form.createdAt,
        createdBy: this.$auth.$state.user.username,
      });
    },

    // xóa dòng items 
    deleteRow(index) {
      this.items.splice(index, 1);
    },

    // xóa dòng giao khpx
    deleteRow_khpx(index) {
      this.items_khpx.splice(index, 1);
      if (this.items_khpx.length <= 0) {
        this.check_giaopx = false
      }
    },

    deleteRow_khmv(index) {
      this.items_khmv.splice(index, 1);
    },

    async getInfoPX(event, selectedIndex, index) {
      this.selectedIndex = selectedIndex;
      // for (let i = 0; i < this.items.length; i++) {
      //   // console.log(this.form.makh)
      //   this.items[i].makh = this.form.makh
      //   if (i == index) {
      //     let px;
      //     this.items[i].mapx = this.phanxuong[this.selectedIndex].mapx;
      //     this.items[i].tenpx = this.phanxuong[this.selectedIndex].tenpx;
      //     if (
      //       this.items[i].mapx == "AL_PXD" ||
      //       this.items[i].mapx == "DV_PXD"
      //     ) {
      //       px = "PXD";
      //       this.dm_sanpham = await this.$axios.$get(
      //         `/api/sanpham/getallspwithmapxfromdmnc?mapx=${px}`
      //       );
      //     } else {
      //       this.dm_sanpham = await this.$axios.$get(
      //         `/api/sanpham/getallspwithmapxfromdmnc?mapx=${this.items[i].mapx}`
      //       );
      //     }
      //     // console.log(this.dm_sanpham);
      //     this.items[i].sanpham = [];

      //     for (let k = 0; k < this.dm_sanpham.length; k++) {
      //       let cn = {
      //         masp: this.dm_sanpham[k].mavt,
      //         tensp: this.dm_sanpham[k].tenvt,
      //       };
      //       this.items[i].sanpham.push(cn);
      //       // console.log(cn)
      //     }
      //   }
      // }
    },

    async getWithTo(e, selectedIndex, index) {
      // console.log(this.mapx)
      var name = e.target.options[e.target.options.selectedIndex].text;
      // console.log(name)
      let position = name.split("--");
      let p1 = position[0].trim();

      // this.cong_nhan = await this.$axios.$get(
      //   `/api/congnhan/allcongnhanto?mato=${p1}`
      // );

      this.selectedIndex = selectedIndex;
      // console.log(index)
      for (let i = 0; i < this.items.length; i++) {
        if (i == index) {
          this.items[i].mato = this.tonhom[this.selectedIndex].mato.trim();
          this.items[i].tento = this.tonhom[this.selectedIndex].tento.trim();
          // console.log(this.tonhomid[this.selectedIndex].mato);
          // select * from congnhan where mato=mato
          // gán vào ds công nhân
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
      this.one_lokhnm = pl
      // console.log(this.one_lokhnm)
      this.isActive = true
    },

    // Bấm vào lô kế hoạch nhà máy để ra kế hoạch mùa vụ
    // Khi bấm vào đây sẽ load ra 3 dòng mùa vụ của 1 kế hoạch năm
    async getdatakhnhamay(ttkehoachnam) {
      this.check_giaopx = false
      this.mark_kehoachnam = ttkehoachnam
      // console.log(this.mark_kehoachnam)
      // this.infoLosx = []
      // this.isActive = true;
      // console.log(phieulo)
      // console.log(this.phieulokh.makh);
      this.kehoachmuavu = await this.$axios.$get(
        `/api/lokehoach/getallkhmuavu?makh=${ttkehoachnam.makh}`
      );
      // console.log(this.kehoachmuavu);

      // list ds kế hoạch phân xưởng đã giao
      this.kehoachphanxuong = await this.$axios.$get(
        `/api/lokehoach/getallkehoachpx?makh=${ttkehoachnam.makh}`
      );

    },

    // Bấm vào lô kế hoạch nhà máy để ra kế hoạch px
    async getdataPhieulo(phieulo) {
      this.infoLosx = []
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
        `/api/lokehoach/getlokhnm?nhomsp=${this.searchnhomsp}`
      );
    },

    async timMasp() {
      this.phieulo = await this.$axios.$get(
        `/api/lokehoach/getlokhnmwithmasp?masp=${this.searchmasp}`
      );
    },

    async detailpl(phieuloct) {
      this.isActive_phieuloct = true
      this.allluongcongdoan = await this.$axios.$get(
        `/api/ketoan/getallluongcongdoaninlsx?makh=${phieuloct.makh}&makhpx=${phieuloct.makhpx}&malosx=${phieuloct.malosx}&mapx=${phieuloct.mapx}`
      );
      this.allluongcongnhat = await this.$axios.$get(
        `/api/ketoan/getallluongcongnhatinlsx?makh=${phieuloct.makh}&makhpx=${phieuloct.makhpx}&malosx=${phieuloct.malosx}&mapx=${phieuloct.mapx}`
      );
    },

    async ghidulieu() {
      // console.log(this.items_khpx)
      for (let i = 0; i < this.items_khpx.length; i++) {
        this.items_khpx[i].makh = this.mark_kehoachnam.makh.trim()
        this.items_khpx[i].tensp = this.mark_kehoachnam.tensp.trim()
        this.items_khpx[i].masp = this.mark_kehoachnam.masp.trim()
        this.items_khpx[i].nhomsp = this.mark_kehoachnam.nhomsp.trim()
        this.$axios.$post(
          "/api/ketoan/addphieulokh",
          this.items_khpx[i]
        );
      }
      this.kehoachphanxuong = await this.$axios.$get(
        `/api/lokehoach/getallkehoachpx?makh=${this.mark_kehoachnam.makh}`
      );
      let turn = 1;
      let length = this.items_khpx.length;
      while (turn <= length) {
        this.deleteRow_khpx(this.items_khpx.length - turn);
        turn += 1;
      }
      this.check_giaopx = false
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
        this.sumsllosx = data[0].total
      } else {
        this.sumsllosx = 0
      }

    },

    giaopx() {
      this.check_giaopx = true;
      this.addPhanxuong()
    },

    async copyadd_khpx(data) {

      this.items_khpx.push({
        makh: data.makh,
        mapx: data.mapx,
        tenpx: data.tenpx,
        makhpx: data.makhpx,
        soluong: data.soluong,
        ngaybd: data.ngaybd,
        ngaykt: data.ngaykt,
        masp: data.masp,
        // tensp: tenvt,
        createdAt: this.form.createdAt,
      });
      // console.log(this.items)
    },

    async getInfoPhieulsx(plsx) {
      this.checkadd = false
      this.items = []
      this.mark_Makh = ""
      this.mark_Makhpx = ""
      this.mark_Mapx = ""
      this.mark_Tenpx = ""
      this.mark_Masp = ""
      this.mark_Tensp = ""
      this.mark_Soluongkhsx = ""
      this.phieulosx = plsx;
      // console.log(this.phieulosx);
      // Đoạn này đánh dấu rõ rằng: Mã kế hoạch nhà máy + Mã kế hoạch nhà máy và mã phân xưởng.
      // Đánh dấu
      this.mark_Makh = this.phieulosx.makh
      this.mark_Makhpx = this.phieulosx.makhpx
      this.mark_Mapx = this.phieulosx.mapx
      this.mark_Tenpx = this.phieulosx.tenpx
      this.mark_Masp = this.phieulosx.masp
      this.mark_Tensp = this.phieulosx.tensp
      this.mark_Soluongkhsx = this.phieulosx.soluong
      // show lên để check
      // console.log(this.mark_Makh)
      // console.log(this.mark_Makhpx)
      // console.log(this.mark_Mapx)
      // Lấy toàn bộ phiếu lô sản xuất trong 1 phân xưởng nào đó
      // Dựa trên tiêu chí bộ mã gồm 3 cái trên
      // Mã KH nhà máy (Cái này là duy nhất) + Mã kế hoạch tại PX + Mã PX
      this.infoLosx = await this.$axios.$get(
        `/api/lokehoach/getalllsxinlkh?makh=${this.phieulosx.makh}&makhpx=${this.phieulosx.makhpx}&mapx=${this.phieulosx.mapx}`
      );
      // lấy tổng số đã sản xuất hiện tại
      this.sumsllosx = 0
      const data = await this.$axios.$get(
        `/api/ketoan/sumsoluonginlsx?makh=${this.phieulosx.makh}&makhpx=${this.phieulosx.makhpx}&mapx=${this.phieulosx.mapx}`
      );
      // console.log(data[0].total)

      if (data.length > 0) {
        this.sumsllosx = data[0].total
      } else {
        this.sumsllosx = 0
      }
    },

    async resetAll() {
      this.searchmasp = ''
      this.searchnhomsp = ''
      this.kehoachmuavu = []
      this.kehoachphanxuong = []
      this.getAllPhieulo()
    },

    // tạo kế hoạch mùa vụ
    async onUpdateKHMV() {
      for (let i = 0; i < this.items_khmv.length; i++) {
        this.$axios.$post("/api/ketoan/lapkehoachmuavu", this.items_khmv[i]);
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
        title: "Tạo thành công",
      });
    },

    // create phiếu
    onTaophieu() {
      // console.log(this.masp);
      Swal.fire({
        title: "Chắc chắn tạo lô sản xuất?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Chắc chắn tạo",
      }).then((result) => {
        if (result.isConfirmed) {
          try {
            // console.log(this.form.createdAt)
            // console.log(this.items)
            for (let i = 0; i < this.items.length; i++) {
              this.items[i].createdAt = this.form.createdAt;
              this.items[i].createdBy = this.form.createdBy;

              if (
                this.items[i].malosx == "" ||
                this.items[i].soluong == "" ||
                this.items[i].ngaybd == ""
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
                  title: "Yêu cầu nhập đủ thông tin !!!",
                });
              } else {
                if (this.items[i].malosx.length == this.checkMalosx) {
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
                    title: "Tạo mã Lô sản xuất",
                  });
                } else {
                  this.$axios.$post("/api/ketoan/addphieulosx", this.items[i]);

                  this.$axios.$get(`/api/lokehoach/getalllsxinlkh?makh=${this.mark_Makh.trim()}&makhpx=${this.mark_Makhpx.trim()}&mapx=${this.mark_Mapx.trim()}`)
                    .then(resp => {
                      // console.log(resp);
                      this.infoLosx = resp
                    })
                    .catch(err => {
                      // Handle Error Here
                      console.error(err);
                    });

                  this.$axios.$get(`/api/ketoan/sumsoluonginlsx?makh=${this.mark_Makh.trim()}&makhpx=${this.mark_Makhpx.trim()}&mapx=${this.mark_Mapx.trim()}`)
                    .then(resp => {
                      console.log(resp);
                      // this.infoLosx = resp
                      this.sumsllosx = resp[0].total
                      console.log(this.sumsllosx)
                    })
                    .catch(err => {
                      // Handle Error Here
                      console.error(err);
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
                    title: "Tạo phiếu lô sản xuất thành công",
                  });
                }
              }
            }

            this.infoLosx = []
            this.checkadd = false

            let turn = 1;
            let length = this.items.length;
            while (turn <= length) {
              this.deleteRow(this.items.length - turn);
              turn += 1;
            }

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
    },

    async update_one_lsx(phieulo) {
      // console.log(this.form_update)
      let data = {
        malosx: phieulo.malosx.trim(),
        ngaybd: phieulo.ngaybd.trim(),
        ngaykt: phieulo.ngaykt.trim(),
        soluong: phieulo.soluong.trim()
      };
      this.$axios.$patch(
        `/api/ketoan/updatettlsx/${phieulo._id}`, data
      );

      this.refresh()

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
    },

    onUpdate() {
      // console.log(this.masp);
      Swal.fire({
        title: "Chắc chắn cập nhật?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Chắc chắn",
      }).then((result) => {
        if (result.isConfirmed) {
          try {
            if (this.form.tgbatdau == "") {
              this.form.tgbatdau = this.phieulokh.tgbatdau;
              // console.log(this.form.ngaybd)
            } else {
              this.form.tgbatdau = this.form.tgbatdau;
              // console.log(this.form.ngaybd)
            }
            if (this.form.tgketthuc == "") {
              this.form.tgketthuc = this.phieulokh.tgketthuc;
            } else {
              this.form.tgketthuc = this.form.tgketthuc;
            }
            if (this.form.soluong == "") {
              this.form.soluong = this.phieulokh.soluong;
            } else {
              this.form.soluong = this.form.soluong;
            }
            if (this.form.status == "") {
              this.form.status = this.phieulokh.status;
            } else {
              this.form.status = this.form.status;
            }
            this.$axios.$patch(
              `/api/lokehoach/phieulo/${this.phieulokh.makh}`,
              this.form
            );
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
    },

    async callKehoachnhamay() {
      this.kehoachphanxuong = await this.$axios.$get(
        `/api/lokehoach/getallkehoachpx?makh=${this.mark_kehoachnam.makh}`
      );
    },

    async onUpdateKhnm(data) {
      try {
        this.$axios.$patch(
          `/api/lokehoach/${data._id}`,
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

    // update kế hoạch nhà máy năm trong đó có lưu số liệu lô mùa vụ
    onupdateKehoachmuavu(data) {
      // console.log(data.soluongmuavup3.trim())
      // console.log(data.soluongmuavup3.length)
      let p1
      let p2
      let p3
      let sum

      if (data.soluongmuavup1.trim() == '') {
        p1 = 0
      } else {
        p1 = parseInt(data.soluongmuavup1.trim())
      }

      if (data.soluongmuavup2.trim() == '') {
        p2 = 0
      } else {
        p2 = parseInt(data.soluongmuavup2.trim())
      }

      if (data.soluongmuavup3.trim() == '') {
        p3 = 0
      } else {
        p3 = parseInt(data.soluongmuavup3.trim())
      }

      sum = p1 + p2 + p3
      let slkhnam = parseInt(data.soluong.trim())
      // console.log(sum)
      if (slkhnam >= sum) {
        this.$axios.$patch(
          `/api/lokehoach/kehoach/${data._id}`,
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
          title: `Số lượng các mùa vụ đã vượt số lượng kế hoạch năm là: ${slkhnam - sum}, xem lại số lượng`,
        });
      }

    },

    // update kế hoạch nhà máy theo số lượng tháng
    onupdateKehoachmuavutheothang(data) {
      // console.log(data.soluongmuavup3.trim())
      // console.log(data.soluongmuavup3.length)
      let m1
      let m2
      let m3
      let m4
      let sumv1

      let m5
      let m6
      let m7
      let m8
      let sumv2

      let m9
      let m10
      let m11
      let m12
      let sumv3

      if (data.slthang1.trim() == '') {
        m1 = 0
      } else {
        m1 = parseInt(data.slthang1.trim())
      }

      if (data.slthang2.trim() == '') {
        m2 = 0
      } else {
        m2 = parseInt(data.slthang2.trim())
      }

      if (data.slthang3.trim() == '') {
        m3 = 0
      } else {
        m3 = parseInt(data.slthang3.trim())
      }

      if (data.slthang4.trim() == '') {
        m4 = 0
      } else {
        m4 = parseInt(data.slthang4.trim())
      }

      // vụ 2
      if (data.slthang5.trim() == '') {
        m5 = 0
      } else {
        m5 = parseInt(data.slthang5.trim())
      }

      if (data.slthang6.trim() == '') {
        m6 = 0
      } else {
        m6 = parseInt(data.slthang6.trim())
      }

      if (data.slthang7.trim() == '') {
        m7 = 0
      } else {
        m7 = parseInt(data.slthang7.trim())
      }

      if (data.slthang8.trim() == '') {
        m8 = 0
      } else {
        m8 = parseInt(data.slthang8.trim())
      }

      // vụ 3
      if (data.slthang9.trim() == '') {
        m9 = 0
      } else {
        m9 = parseInt(data.slthang9.trim())
      }

      if (data.slthang10.trim() == '') {
        m10 = 0
      } else {
        m10 = parseInt(data.slthang10.trim())
      }

      if (data.slthang11.trim() == '') {
        m11 = 0
      } else {
        m11 = parseInt(data.slthang11.trim())
      }

      if (data.slthang12.trim() == '') {
        m12 = 0
      } else {
        m12 = parseInt(data.slthang12.trim())
      }

      sumv1 = m1 + m2 + m3 + m4
      sumv2 = m5 + m6 + m7 + m8
      sumv3 = m9 + m10 + m11 + m12

      let slkhp1 = parseInt(data.soluongmuavup1.trim())
      let slkhp2 = parseInt(data.soluongmuavup2.trim())
      let slkhp3 = parseInt(data.soluongmuavup3.trim())
      // console.log(sum)
      if (slkhp1 >= sumv1 && slkhp2 >= sumv2 && slkhp3 >= sumv3) {
        this.$axios.$patch(
          `/api/lokehoach/kehoach/${data._id}`,
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
      let arrLokehoach
      arrLokehoach = await this.$axios.$get(`/api/lokehoach/predelete_muctieunam?makh=${data.makh}`);
      swal({
        title: "Bạn muốn kế hoạch nhà máy năm?",
        text: "Chỉ xóa được kế hoạch năm mà chưa phát sinh lô nhà máy",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          // console.log(arrLokehoach)
          if (arrLokehoach.length <= 0) {
            this.$axios.$delete(`/api/lokehoach/kehoachnam/${data._id}`)
              .then(response => {
                const index = this.phieulo.findIndex(khnm => khnm._id === data._id) // find the post index 
                if (~index) // if the post exists in array
                  this.phieulo.splice(index, 1) //delete the post
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
              title: "Đã có lô nhà máy phát sinh từ kế hoạch năm này, không thể xóa!!!",
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
      let arrLokehoachphanxuong
      arrLokehoachphanxuong = await this.$axios.$get(`/api/lokehoach/predelete_lonhamay?kehoachnam=${pl.makh}&makh=${pl.makhpx}`);
      // console.log(arrLokehoachphanxuong)
      swal({
        title: "Bạn muốn xóa?",
        text: "Chỉ được xóa lô nhà máy chưa phát sinh lô kế hoạch phân xưởng!",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          if (arrLokehoachphanxuong.length <= 0) {
            this.$axios.$delete(`/api/lokehoach/kehoachnhamay/${pl._id}`)
              .then(response => {
                const index = this.kehoachphanxuong.findIndex(khnm => khnm._id === pl._id) // find the post index 
                if (~index) // if the post exists in array
                  this.kehoachphanxuong.splice(index, 1) //delete the post
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
              title: "Đã có lô kế hoạch phân xưởng phát sinh từ lô nhà máy này, không thể xóa!!!",
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
  width: 850px;
  height: 600px;
}
</style>
