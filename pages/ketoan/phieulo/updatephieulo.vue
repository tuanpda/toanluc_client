<template>
  <div class="columns">
    <div class="column">
      <br />
      <div class="box" style="margin-left: 200px; margin-right: 200px">
        <div class="columns">
          <div class="column is-11">
            <div class="control">
              <span class="icon is-small is-left">
                <i style="color: #ff55acee" class="fas fa-broom"></i>
              </span>
              <span style="color: #3850b7; font-size: 17px; font-weight: bold">Lập phiếu lô sản xuất</span>
            </div>
          </div>
          <div class="column" style="text-align: right">
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

        <div class="table_wrapper">
          <table class="table is-responsive is-bordered is-narrow is-fullwidth">
            <tr style="background-color: #fffaeb">
              <td colspan="2" style="font-weight: bold">Thông tin KẾ HOẠCH</td>
            </tr>
            <tr>
              <td style="font-weight: bold">Kế hoạch đã lập</td>
              <td style="font-weight: bold">
                Thông tin chi tiết kế hoạch tại phân xưởng
              </td>
            </tr>
            <tr>
              <td style="width: 20%">
                <div class="select is-multiple is-small is-fullwidth">
                  <select @change="infoKehoach($event)" multiple size="12">
                    <option v-for="(item, index) in kehoach" :key="index + 'jj'" :value="item.makh">
                      {{ item.makh }}
                    </option>
                  </select>
                </div>
              </td>
              <td>
                <div class="table_wrapper">
                  <table class="table is-responsive is-bordered is-narrow is-fullwidth">
                    <tr style="background-color: #ffe08a">
                      <td colspan="5" style="font-weight: bold; font-size: small">
                        Thông tin Kế hoạch
                      </td>
                    </tr>
                    <tr>
                      <td style="font-weight: bold; font-size: small; width: 40%">
                        Mô tả
                      </td>
                      <td style="
                          text-align: center;
                          font-weight: bold;
                          font-size: small;
                          width: 20.3%;
                        ">
                        Số lượng
                      </td>
                      <td style="
                          text-align: center;
                          font-weight: bold;
                          font-size: small;
                        ">
                        Thời gian bắt đầu
                      </td>
                      <td style="
                          text-align: center;
                          font-weight: bold;
                          font-size: small;
                        ">
                        Thời gian kết thúc
                      </td>
                      <td style="
                          text-align: center;
                          font-weight: bold;
                          font-size: small;
                        ">
                        Trạng thái
                      </td>
                    </tr>
                    <tr v-for="(item, index) in oneKehoach" :key="index + 'lll'">
                      <td style="font-size: small">{{ item.mota }}</td>
                      <td style="font-size: small; text-align: center">
                        {{ item.soluong }}
                      </td>
                      <td style="font-size: small; text-align: center">
                        {{ item.tgbatdau | formatDate }}
                      </td>
                      <td style="font-size: small; text-align: center">
                        {{ item.tgketthuc | formatDate }}
                      </td>
                      <td style="font-size: small; text-align: center">
                        <span v-if="item.status == false">
                          <i style="color: #ffd863" class="fa fa-circle"></i>
                        </span>
                        <span v-else><i style="color: #00947e" class="fa fa-circle"></i>
                        </span>
                      </td>
                    </tr>
                  </table>

                  <table class="table is-responsive is-bordered is-narrow is-fullwidth">
                    <tr style="background-color: #feecf0">
                      <td colspan="6" style="font-weight: bold; font-size: small">
                        Chi tiết kế hoạch từng phân xưởng
                      </td>
                    </tr>
                    <tr>
                      <td style="
                          text-align: center;
                          font-weight: bold;
                          font-size: small;
                        ">
                        STT
                      </td>
                      <td style="
                          text-align: center;
                          font-weight: bold;
                          font-size: small;
                          width: 35%;
                        ">
                        Tên phân xưởng
                      </td>
                      <td style="
                          text-align: center;
                          font-weight: bold;
                          font-size: small;
                          width: 20%;
                        ">
                        Mã kế hoạch phân xưởng
                      </td>
                      <td style="
                          text-align: center;
                          font-weight: bold;
                          font-size: small;
                          width: 15%;
                        ">
                        Ngày bắt đầu
                      </td>
                      <td style="
                          text-align: center;
                          font-weight: bold;
                          font-size: small;
                          width: 15.8%;
                        ">
                        Ngày kết thúc
                      </td>
                      <td style="
                          text-align: center;
                          font-weight: bold;
                          font-size: small;
                        ">
                        Số lượng
                      </td>
                    </tr>
                    <tr v-for="(item, index) in phanxuongtgsx" :key="index + 'kk'"
                      :class="{ highlight: item._id == phieulosx }" @click="getdataPhieulosx(item)">
                      <td style="text-align: center; font-size: small">
                        {{ index + 1 }}
                      </td>
                      <td style="font-size: small">
                        {{ item.tenpx }}
                      </td>
                      <td style="font-size: small">
                        {{ item.makhpx }}
                      </td>
                      <td style="font-size: small; text-align: center">
                        {{ item.ngaybd | formatDate }}
                      </td>
                      <td style="font-size: small; text-align: center">
                        {{ item.ngaykt | formatDate }}
                      </td>
                      <td style="font-size: small; text-align: center">
                        {{ item.soluong }}
                      </td>
                    </tr>
                  </table>

                  <div v-if="showlsxpx.length > 0">
                    <table class="table is-responsive is-bordered is-narrow is-fullwidth">
                      <tr style="background-color: #feecf0">
                        <td colspan="5" style="
                            font-weight: bold;
                            font-size: small;
                            color: red;
                          ">
                          {{ phieulosx.tenpx }}
                        </td>
                        <td colspan="2" style="
                                                    font-weight: bold;
                                                    font-size: small;
                                                    color: red;
                                                    text-align: right;
                                                  ">
                          <button @click.prevent="huychotallPhieulo(phieulosx)"
                            class="button is-danger is-fullwidth is-small is-outlined">
                            Hủy chốt toàn bộ phiếu lô
                          </button>
                        </td>
                        <td colspan="2" style="
                            font-weight: bold;
                            font-size: small;
                            color: red;
                            text-align: right;
                          ">
                          <button @click.prevent="chotallPhieulo(phieulosx)"
                            class="button is-danger is-fullwidth is-small is-outlined">
                            Chốt toàn bộ phiếu lô
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td style="font-size: small; font-weight: bold; text-align: center;"><input type="checkbox"
                            v-model="selectAll" /></td>
                        <td style="font-size: small; font-weight: bold">
                          Mã lô sản xuất
                        </td>
                        <td style="
                            font-size: small;
                            text-align: center;
                            font-weight: bold;
                          ">
                          Số lượng
                        </td>
                        <td style="
                            font-size: small;
                            text-align: center;
                            font-weight: bold;
                          ">
                          Nhóm lương
                        </td>
                        <td style="
                            font-size: small;
                            text-align: center;
                            font-weight: bold;
                          ">
                          Ngày bắt đầu
                        </td>
                        <td style="
                            font-size: small;
                            text-align: center;
                            font-weight: bold;
                          ">
                          Ngày kết thúc
                        </td>
                        <td style="
                            font-size: small;
                            text-align: center;
                            font-weight: bold;
                            width: 10%;
                          ">
                          Tổng đạt
                        </td>
                        <td style="
                            font-size: small;
                            text-align: center;
                            font-weight: bold;
                            width: 10%;
                          ">
                          Tổng hỏng
                        </td>
                        <td style="
                            font-size: small;
                            text-align: center;
                            font-weight: bold;
                          ">
                          Trạng thái
                        </td>
                      </tr>
                      <tr :class="{
                        highlight1: item._id == getinfoplsx,
                      }" v-for="(item, index) in showlsxpx" :key="index + 'qq'">
                        <td style="text-align: center">
                          <input v-model="selected" :value="item" type="checkbox" />
                        </td>
                        <td @click="getInfoLosx(item)" style="font-size: small">
                          {{ item.malosx }}
                        </td>
                        <td style="font-size: small; text-align: center">
                          {{ item.soluong }}
                        </td>
                        <td style="font-size: small; text-align: center">
                          {{ item.nhomluong }}
                        </td>
                        <td style="font-size: small; text-align: center">
                          {{ item.ngaybd }}
                        </td>
                        <td style="font-size: small; text-align: center">
                          {{ item.ngaykt }}
                        </td>
                        <td style="font-size: small; text-align: center">
                          {{ item.tongdat }}
                        </td>
                        <td style="font-size: small; text-align: center">
                          {{ item.tonghong }}
                        </td>
                        <td style="font-size: small; text-align: center">
                          <span v-if="item.status == false">
                            <i style="color: #ffd863" class="fa fa-circle"></i>
                          </span>
                          <span v-else>{{ item.stopday_losx }}
                            <i style="color: #00947e" class="fa fa-circle"></i>
                          </span>
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>
              </td>
            </tr>
          </table>
        </div>

        <!-- Modal chốt phiếu-->
        <div class="">
          <!-- Toggle class  -->
          <div :class="{ 'is-active': isActive }" class="modal">
            <div class="modal-background"></div>
            <div class="modal-content modal-card">
              <header style="
                  background-color: #3e8ed0;
                  border-top-left-radius: 8px;
                  border-top-right-radius: 8px;
                ">
                <div class="columns">
                  <div class="column is-9">
                    <p style="
                        font-size: small;
                        font-weight: bold;
                        color: white;
                        padding: 15px;
                      ">
                      <span class="icon is-small is-left">
                        <i style="color: #ffd863ff" class="fas fa-tags"></i>
                      </span>
                      Phiếu lô sản xuất: {{ getinfoplsx.malosx }}
                    </p>
                  </div>
                  <div class="column" style="text-align: right">
                    <a @click="isActive = false">
                      <span style="color: red; padding: 20px" class="icon is-small">
                        <i class="fas fa-power-off"></i>
                      </span>
                    </a>
                  </div>
                </div>
              </header>
              <section class="modal-card-body">
                <div class="columns">
                  <div class="column is-8"><span>Tổ được chỉ định: </span> <span>{{ form.tento }} </span> </div>
                  <div class="column is-2" style="text-align: right">
                    <button @click="xacnhanHuyChotphieu" class="button is-danger is-small is-fullwidth">
                      <span class="icon is-small">
                        <i class="fas fa-backspace"></i>
                      </span>
                      <span>Hủy chốt phiếu</span>
                    </button>
                  </div>
                  <div class="column" style="text-align: right">
                    <button @click="onTaophieu" class="button is-success is-small is-fullwidth">
                      <span class="icon is-small">
                        <i class="fas fa-pen-fancy"></i>
                      </span>
                      <span>Cập nhật công đoạn</span>
                    </button>
                  </div>
                </div>

                <div>
                  <label class="checkbox">
                    <input type="checkbox" v-model="checkCongdoandathuchien">
                    Xem các công đoạn đã thực hiện
                  </label>
                  <div v-if="checkCongdoandathuchien == true" class="table_wrapper table-height">
                    <table class="table is-responsive is-bordered is-narrow is-fullwidth">
                      <tr style="background-color: #feecf0">
                        <td colspan="9" style="font-weight: bold; font-size: small">
                          Công đoạn đã thực hiện
                        </td>
                      </tr>
                      <tr>
                        <td style="
                            font-size: small;
                            text-align: center;
                            font-weight: bold;
                            width: 5%;
                          ">
                          STT
                        </td>
                        <td style="
                            font-size: small;
                            text-align: center;
                            font-weight: bold;
                            width: 15%;
                          ">
                          Nguyên công
                        </td>
                        <td style="
                            font-size: small;
                            text-align: center;
                            font-weight: bold;
                            width: 7%;
                          ">
                          Đơn giá
                        </td>
                        <td style="
                            font-size: small;
                            text-align: center;
                            font-weight: bold;
                            width: 10%;
                          ">
                          PX/Tổ
                        </td>
                        <td style="
                            font-size: small;
                            text-align: center;
                            font-weight: bold;
                          ">
                          Người thực hiện
                        </td>
                        <td style="
                            font-size: small;
                            text-align: center;
                            font-weight: bold;
                            width: 7%;
                          ">
                          Số đạt
                        </td>
                        <td style="
                            font-size: small;
                            text-align: center;
                            font-weight: bold;
                            width: 7%;
                          ">
                          Số hỏng
                        </td>
                        <td style="
                            text-align: center;
                            font-size: small;
                            font-weight: bold;
                            width: 7%;
                          ">
                          Cập nhật
                        </td>
                        <td style="
                            text-align: center;
                            font-size: small;
                            font-weight: bold;
                            width: 5%;
                          ">
                          Xóa
                        </td>
                      </tr>
                      <tr v-for="(item, index) in allluongcongdoan" :key="index + 'ppp'">
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
                          <td v-if="item.to_cn" style="font-size: small; text-align: center">
                            {{ item.to_cn }}
                          </td>
                          <td v-else style="font-size: small; text-align: center">
                            {{ item.phanxuong_cn }}
                          </td>
                        </template>
                        <td style="font-size: small">{{ item.tencn }}</td>
                        <td style="font-size: small; text-align: center">
                          <input type="text" class="input is-small" v-model="item.sodat" />
                        </td>
                        <td style="font-size: small; text-align: center">
                          <input type="text" class="input is-small" v-model="item.sohong" />
                        </td>
                        <td style="text-align: center; font-size: small">
                          <a @click="
                            onUpdateCd(item._id, item.sodat, item.sohong)
                          ">
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
                    </table>
                  </div>
                  <br />
                  <label class="checkbox">
                    <input type="checkbox" v-model="checkCongnhatdathuchien">
                    Xem các công nhật đã thực hiện
                  </label>
                  <div v-if="checkCongnhatdathuchien == true" class="table_wrapper">
                    <table class="table is-responsive is-bordered is-narrow is-fullwidth">
                      <tr style="background-color: #feecf0">
                        <td colspan="8" style="font-weight: bold; font-size: small">
                          Công nhật đã thực hiện
                        </td>
                      </tr>
                      <tr>
                        <td style="
                            font-size: small;
                            text-align: center;
                            font-weight: bold;
                            width: 5%;
                          ">
                          STT
                        </td>
                        <td style="
                            font-size: small;
                            text-align: center;
                            font-weight: bold;
                            width: 15%;
                          ">
                          Tên công nhật
                        </td>
                        <td style="
                            font-size: small;
                            text-align: center;
                            font-weight: bold;
                            width: 7%;
                          ">
                          Đơn giá
                        </td>
                        <!-- <td
                          style="font-size: small; text-align: center; font-weight: bold; width: 10%;"
                        >
                          PX/Tổ
                        </td> -->
                        <td style="
                            font-size: small;
                            text-align: center;
                            font-weight: bold;
                          ">
                          Người thực hiện
                        </td>
                        <td style="
                            font-size: small;
                            text-align: center;
                            font-weight: bold;
                            width: 14%;
                          ">
                          Số giờ
                        </td>
                        <td style="
                            text-align: center;
                            font-size: small;
                            font-weight: bold;
                            width: 7%;
                          ">
                          Cập nhật
                        </td>
                        <td style="
                            text-align: center;
                            font-size: small;
                            font-weight: bold;
                            width: 5%;
                          ">
                          Xóa
                        </td>
                      </tr>
                      <tr v-for="(item, index) in allluongcongnhat" :key="index + 'ppp'">
                        <td style="font-size: small; text-align: center">
                          {{ index + 1 }}
                        </td>
                        <td style="font-size: small">
                          {{ item.tencongnhat }}
                        </td>
                        <td style="font-size: small; text-align: right">
                          {{ item.dongia | formatNumber }}
                        </td>
                        <!-- <template>
                          <td v-if="item" style="font-size: small; text-align: center;">
                            {{ item.dongia | formatNumber }}
                          </td>
                        </template> -->

                        <td style="font-size: small">
                          {{ item.nguoithuchien }}
                        </td>
                        <td style="font-size: small; text-align: center">
                          <input class="input is-small" v-model.trim="item.sogiocong" />
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
                  <br />
                  <br />

                  <div style="margin-bottom: 3px; text-align: right">
                    <table class="table is-responsive is-bordered is-narrow">
                      <tr>
                        <td style="font-size: small">
                          Tổng đạt:
                        </td>
                        <td><input v-model.trim="tongdatinlo" type="text" class="input is-small"></td>
                      </tr>
                      <tr>
                        <td style="font-size: small">Tổng hỏng: </td>
                        <td style="font-size: small; font-weight: bold;">{{ tonghonginlo }}</td>
                      </tr>
                    </table>
                  </div>

                  <div>
                    <table class="table is-responsive is-bordered is-narrow is-fullwidth">
                      <tr style="background-color: #fffaeb">
                        <td colspan="9" style="font-weight: bold; font-size: small">
                          Cập nhật công đoạn lương trong lô sản xuất
                        </td>
                      </tr>
                      <tr>
                        <td colspan="9">
                          <button @click="addCongdoan()" class="button is-small is-info">
                            Thêm công đoạn
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td style="
                            text-align: center;
                            font-size: small;
                            font-weight: bold;
                            width: 3%;
                          ">
                          STT
                        </td>
                        <td style="
                            text-align: center;
                            font-size: small;
                            font-weight: bold;
                            width: 15%;
                          ">
                          Nguyên công
                        </td>
                        <td style="
                            text-align: center;
                            font-size: small;
                            font-weight: bold;
                            width: 5%;
                          ">
                          Máy
                        </td>
                        <td style="
                            text-align: center;
                            font-size: small;
                            font-weight: bold;
                            width: 25%;
                          ">
                          Xưởng
                        </td>
                        <td style="
                            text-align: center;
                            font-size: small;
                            font-weight: bold;
                            width: 25%;
                          ">
                          Tổ
                        </td>
                        <td style="
                            text-align: center;
                            font-size: small;
                            font-weight: bold;
                            width: 13%;
                          ">
                          Người thực hiện
                        </td>
                        <td style="
                            text-align: center;
                            font-size: small;
                            font-weight: bold;
                            width: 7%;
                          ">
                          Số đạt
                        </td>
                        <td style="
                            text-align: center;
                            font-size: small;
                            font-weight: bold;
                            width: 7%;
                          ">
                          Số hỏng
                        </td>
                        <td style="
                            text-align: center;
                            font-size: small;
                            font-weight: bold;
                            width: 7%;
                          ">
                          Xóa
                        </td>
                      </tr>
                      <!-- v-if="isphanxuong == 1" -->
                      <tr v-if="iscongdoan == 1" v-for="(item, index) in items" :key="index + 'cm-a'">
                        <td style="
                            text-align: center;
                            font-size: small;
                            font-weight: bold;
                          ">
                          {{ index + 1 }}
                        </td>

                        <td>
                          <div class="select is-small is-fullwidth">
                            <select v-model="item.nguyencong" @change="
                              getinfoNguyencong(
                                $event,
                                $event.target.selectedIndex,
                                index
                              )
                            ">
                              <option v-for="(item, indexdmnc) in dmnguyencong" :key="indexdmnc" :value="item.congdoan">
                                {{ item.congdoan }} -- {{ item.dongia }}
                              </option>
                            </select>
                          </div>
                        </td>
                        <td>
                          <input type="text" v-model="item.may" class="input is-small" />
                        </td>
                        <td>
                          <div class="select is-small is-fullwidth">
                            <select v-model="item.mapxchoncn" @change="
                              showtonhom(
                                $event,
                                $event.target.selectedIndex,
                                index
                              )
                            ">
                              <option v-for="item in phanxuong" :value="item.mapx">
                                {{ item.mapx }} - {{ item.tenpx }}
                              </option>
                            </select>
                          </div>
                        </td>
                        <td>
                          <div class="select is-small is-fullwidth">
                            <select @change="
                              getWithTo(
                                $event,
                                $event.target.selectedIndex,
                                index
                              )
                            ">
                              <option v-for="item in item.nhomto" :value="item.mato">
                                {{ item.mato }} - {{ item.tento }}
                              </option>
                            </select>
                          </div>
                        </td>
                        <td>
                          <div class="select is-small is-fullwidth">
                            <select @change="
                              getTencn(
                                $event,
                                $event.target.selectedIndex,
                                index
                              )
                            " v-model="item.macn">
                              <option v-for="it in item.nhomto_cnt" :value="it.macn">
                                {{ it.tencn }}
                              </option>
                            </select>
                          </div>
                        </td>

                        <td>
                          <input type="text" v-model="item.sodat" class="input is-small" />
                        </td>
                        <td>
                          <input type="text" v-model="item.sohong" class="input is-small" />
                        </td>
                        <td style="text-align: center">
                          <button @click="deleteRow(index)" class="button is-small is-danger">
                            Xóa
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td colspan="9">
                          <button @click="addCongnhat()" class="button is-small is-info">
                            Thêm công nhật
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td style="
                            text-align: center;
                            font-size: small;
                            font-weight: bold;
                          ">
                          Công nhật
                        </td>
                        <td style="
                                                    text-align: center;
                                                    font-size: small;
                                                    font-weight: bold;
                                                  ">
                          Tên công
                        </td>
                        <td></td>

                        <td style="
                            text-align: center;
                            font-size: small;
                            font-weight: bold;
                          ">
                          Xưởng
                        </td>
                        <td style="
                            text-align: center;
                            font-size: small;
                            font-weight: bold;
                          ">
                          Tổ
                        </td>
                        <td style="
                            text-align: center;
                            font-size: small;
                            font-weight: bold;
                          ">
                          Người thực hiện
                        </td>
                        <td style="
                            text-align: center;
                            font-size: small;
                            font-weight: bold;
                          ">
                          Số giờ
                        </td>
                        <td style="
                            text-align: center;
                            font-size: small;
                            font-weight: bold;
                          ">
                          Ghi chú
                        </td>
                        <td style="
                            text-align: center;
                            font-size: small;
                            font-weight: bold;
                          ">
                          Xóa
                        </td>
                      </tr>
                      <tr v-for="(item, index) in items_cn" :key="index + 'cm-b'">
                        <td style="
                            text-align: center;
                            font-size: small;
                            font-weight: bold;
                          ">
                          {{ index + 1 }}
                        </td>
                        <td>
                          <div class="select is-small is-fullwidth">
                            <select v-model="item.macongnhat" @change="getCongnhat(
                              $event,
                              $event.target.selectedIndex,
                              index
                            )
                            ">
                              <option v-for="item in dmcongnhat" :value="item.macn">
                                {{ item.tencn }}
                              </option>
                            </select>
                          </div>
                        </td>
                        <td></td>
                        <td>
                          <div class="select is-small is-fullwidth">
                            <select v-model="item.mapxchoncn" @change="
                              showtonhom_cn(
                                $event,
                                $event.target.selectedIndex,
                                index
                              )
                            ">
                              <option v-for="item in phanxuong" :value="item.mapx">
                                {{ item.mapx }} - {{ item.tenpx }}
                              </option>
                            </select>
                          </div>
                        </td>
                        <td>
                          <div class="select is-small is-fullwidth">
                            <select @change="
                              getWithTo_cn(
                                $event,
                                $event.target.selectedIndex,
                                index
                              )
                            ">
                              <option v-for="item in item.nhomto" :value="item.mato">
                                {{ item.mato }} - {{ item.tento }}
                              </option>
                            </select>
                          </div>

                        </td>
                        <td>
                          <div class="select is-small is-fullwidth">
                            <select @change="getTencnCN($event, $event.target.selectedIndex, index)"
                              v-model="item.macn">
                              <option v-for="it in item.nhomto_cnt" :value="it.macn">
                                {{ it.tencn }}
                              </option>

                            </select>
                          </div>
                        </td>
                        <td><input v-model="item.sogiocong" type="text" class="input is-small" /></td>
                        <td></td>
                        <td style="text-align: center; font-size: small">
                          <button @click="deleteRowCn(index)" class="button is-small is-danger">
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
import { ModelListSelect } from "vue-search-select";
import "vue-search-select/dist/VueSearchSelect.css";
export default {
  middleware: "auth",
  components: {
    ModelListSelect,
  },
  data() {
    return {
      selected: [],
      lokehoach: [],
      ds_sanpham: [],
      dm_sanpham: [],
      ds_lokh: [],
      one_lokh: [],
      dmnguyencong: [],
      cong_nhan: [],
      cong_nhan_cn: [],
      dmcongnhan: [],
      phanxuong: [],
      selectedIndex: 0,
      dongia_ns: "",
      namlsx: "",
      kehoach: [],
      checkMalosx: "",
      listlsx: [],
      arrLsx: [],
      phanxuongtgsx: [],
      phanxuongkehoach: [],
      nhomluong: [],
      isExits: null,
      showlsxpx: [],
      getoneshowlosx: {},
      tonghonginlo: "",
      tongdatinlo: "",
      form: {
        makh: "",
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
      yourCondition: true,
      tonhomid: [],
      phanxuong_cn: "",
      checkCongdoandathuchien: false,
      checkCongnhatdathuchien: false,
      items: [
        {
          _id_losx: "",
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
          to_cn: "",
          nhomto_cnt: {
            maxuong: "",
            tenxuong: "",
            tento: "",
            mato: "",
            tencn: "",
            macn: "",
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
      items_cn: [
        {
          _id_losx: "",
          malosx: this.malosx,
          macongnhat: "",
          tencongnhat: "",
          macongnhan: "",
          nguoithuchien: "",
          sogiocong: "",
          dongia: "",
          ghichu: "",
          to_cn: "",
          nhomto_cnt: {
            maxuong: "",
            tenxuong: "",
            tento: "",
            mato: "",
            tencn: "",
            macn: "",
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
      items_tonghong: [{
        tonghong: "",
      }]
    };
  },

  mounted() {
    this.currentDateTime();
    this.get_phanxuong();
    this.getMalosx();
    this.get_kehoach();
    this.deleteRow(0);
    this.deleteRowCn(0);
  },

  isFormValid() {
    return !this.$v.form.$invalid;
  },

  computed: {
    isDisabled() {
      // you can  check your form is filled or not here.
      return this.yourCondition == true;
    },

    totalhong() {
      return this.allluongcongdoan.reduce((sohong) => sohong += sohong, 0)
    },

    selectAll: {
      get: function () {
        return this.showlsxpx
          ? this.selected.length == this.showlsxpx.length
          : false;
      },
      set: function (value) {
        var selected = [];

        if (value) {
          this.showlsxpx.forEach(function (nv) {
            selected.push(nv);
          });
        }

        this.selected = selected;
      },
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
      this.namlsx = current.getFullYear();
      this.form.createdAt = date + " " + time;
    },

    codeAndNameAndDesc(item) {
      return `${item.mapx} - ${item.mavt} - ${item.tenvt}`;
    },

    async showmapx(e) {
      // console.log(this.mapx)
      var name = e.target.options[e.target.options.selectedIndex].text;
      // console.log(name)
      let position = name.split("--");
      this.form.mapx = position[0].trim();
      this.form.tenpx = position[1].trim();
      this.ds_lokh = await this.$axios.$get(
        `/api/ketoan/getallmalkhpx?mapx=${this.form.mapx}`
      );
      this.getMalosx();
    },

    async loadMakh() {
      this.one_lokh = await this.$axios.$get(
        `/api/lokehoach/getonemakh?mapx=${this.form.mapx}&makh=${this.form.makh}`
      );
      // console.log(this.one_lokh)
      this.form.tenpx = this.one_lokh[0].tenpx;
      this.form.ngaybd = this.one_lokh[0].ngaybd;
      this.form.ngaykt = this.one_lokh[0].ngaykt;
      let nn = this.namlsx.toString();
      let sx_nam = nn.substring(2, 4);
      this.form.malosx = this.one_lokh[0].makh.trim() + "-" + sx_nam;
      this.form.masp = this.one_lokh[0].masp;
      this.form.tensp = this.one_lokh[0].tensp;
      this.form.soluong = this.one_lokh[0].soluong;
      this.form.nhomluong = this.one_lokh[0].nhomluong;
      // console.log(this.one_lokh[0].masp);
      // console.log(this.form.masp);
      this.checkMalosx = this.form.malosx.length;
    },

    // get all phân xưởng
    async get_phanxuong() {
      this.phanxuong = await this.$axios.$get(`/api/phongban/allphanxuong`);
    },

    // get all kế hoạch năm
    async get_kehoach() {
      this.kehoach = await this.$axios.$get(`/api/lokehoach/getkehoach`);
    },

    async getMalosx() {
      this.listlsx = await this.$axios.$get(`/api/lokehoach/getlosx`);
      // console.log(this.listlkh)
      for (let i = 0; i < this.listlsx.length; i++) {
        let mlsx = this.listlsx[i].malosx.trim();
        this.arrLsx.push(mlsx);
      }
      // console.log(this.arrLsx);
    },

    async infoKehoach(e) {
      this.allluongcongdoan = [];
      this.allluongcongnhat = [];
      let turn = 1;
      let length = this.items.length;
      while (turn <= length) {
        this.deleteRow(this.items.length - turn);
        turn += 1;
      }
      this.iscongdoan = 0;
      this.isphanxuong = 1;
      this.showlsxpx = [];
      var name = e.target.options[e.target.options.selectedIndex].text;
      let position = name.split("--");
      this.form.makh = position[0].trim();

      this.oneKehoach = await this.$axios.$get(
        `/api/lokehoach/getkehoachone?makh=${this.form.makh}`
      );

      this.phanxuongtgsx = await this.$axios.$get(
        `/api/lokehoach/allphanxuonginkh?makh=${this.form.makh}`
      );
      // console.log(this.phanxuongtgsx)
      this.phanxuongkehoach = await this.$axios.$get(
        `/api/lokehoach/allphanxuonginlkh?makh=${this.form.makh}`
      );
      // console.log(this.phanxuongkehoach)
      // this.infosanpham = await this.$axios.$get(
      //   `/api/lokehoach/getmaspinkh?makh=${this.form.makh}`
      // );
      // console.log(this.infosanpham)
      // this.form.masp = this.infosanpham[0].masp.trim();
      // this.form.tensp = this.infosanpham[0].tensp.trim();

      this.dmcongnhat = await this.$axios.$get(`/api/ketoan/alldmcongnhat`);
    },

    async addPhanxuong() {
      // this.isphanxuong = 1;
      this.items.push({
        makh: "",
        makhpx: "",
        malosx: "",
        mapx: "",
        tenpx: "",
        masp: "",
        tensp: "",
        soluong: "",
        nhomluong: "",
        soluonglsx: "",
        slthuctetaixuong: "",
        ngaybd: "",
        ngaykt: "",
        tongdat: "",
        tonghong: "",
        ghichu: "",
        createdAt: null,
        createdBy: "",
        status: 0,
      });
    },

    async addCongdoan() {
      this.iscongdoan = 1;
      this.items.push({
        _id_losx: "",
        malosx: this.malosx,
        nguyencong: "",
        may: "",
        congnhan: "",
        sodat: "",
        sohong: "",
        ghichu: "",
        dongia: this.dongia_ns,
        tencn: "",
        makh: "",
        makhpx: "",
        tensp: "",
        mapx: "",
        to_cn: "",
        mapxchoncn: "",
        stopday_losx: "",
        nhomto_cnt: [
          {
            maxuong: "",
            tenxuong: "",
            tento: "",
            mato: "",
            tencn: "",
            macn: "",
          },
        ],
        nhomto: [
          {
            maxuong: "",
            tenxuong: "",
            tento: "",
            mato: "",
          },
        ],
      });
    },

    deleteRow(index) {
      this.items.splice(index, 1);
    },

    addCongnhat() {
      this.iscongnhat = 1;
      this.items_cn.push({
        _id_losx: "",
        malosx: this.malosx,
        macongnhat: "",
        tencongnhat: "",
        macongnhan: "",
        nguoithuchien: "",
        sogiocong: "",
        ghichu: "",
        makh: "",
        makhpx: "",
        tensp: "",
        mapx: "",
        mato: "",
        to_cn: "",
        nhomto_cnt: {
          maxuong: "",
          tenxuong: "",
          tento: "",
          mato: "",
          tencn: "",
          macn: "",
        },
        nhomto: [
          {
            maxuong: "",
            tenxuong: "",
            tento: "",
            mato: "",
          },
        ],
      });
    },

    deleteRowCn(index) {
      this.items_cn.splice(index, 1);
    },

    async getInfoPX(e, selectedIndex, index) {
      var name = e.target.options[e.target.options.selectedIndex].text;
      // console.log(name)
      let position = name.split("--");
      let mapx = position[0].trim();
      this.form.tenpx = position[1].trim();
      this.getmakhpx = await this.$axios.$get(
        `/api/lokehoach/getmakhpx?makh=${this.form.makh}&mapx=${mapx}`
      );
      // console.lotg(this.getmakhpx);
      this.selectedIndex = selectedIndex;
      let nn = this.namlsx.toString();
      let sx_nam = nn.substring(2, 4);
      for (let i = 0; i < this.items.length; i++) {
        if (i == index) {
          this.items[i].makhpx = this.getmakhpx[0].makhpx.trim();
          this.items[i].malosx =
            this.getmakhpx[0].makhpx.trim() + "-" + sx_nam + "-";
          this.checkMalosx = this.items[i].malosx.length;
          // console.log(this.checkMalosx)
          this.items[i].tenpx = this.form.tenpx;
        }
      }
      // console.log(this.items)
      // lấy mã nhóm lương dựa vào mã sp và mã phân xưởng
      if (mapx == "PXD" || mapx == "AL_PXD" || mapx == "DV_PXD") {
        let phanxuong = "PXD";
        this.nhomluong = await this.$axios.$get(
          `/api/lokehoach/getnhomluongtheompx?mapx=${phanxuong}&mavt=${this.form.masp}`
        );
        // console.log(this.nhomluong[0].nhomluong);
      } else {
        this.nhomluong = await this.$axios.$get(
          `/api/lokehoach/getnhomluongtheompx?mapx=${mapx}&mavt=${this.form.masp}`
        );
        // console.log(this.nhomluong[0].nhomluong);
      }

      for (let i = 0; i < this.items.length; i++) {
        if (i == index) {
          if (this.nhomluong[0].nhomluong) {
            this.items[i].nhomluong = this.nhomluong[0].nhomluong.trim();
          } else {
            this.items[i].nhomluong = "";
          }
        }
      }
      // console.log(this.items);
    },

    async getNhomluong(e) {
      var name = e.target.options[e.target.options.selectedIndex].text;
      // console.log(name)
    },

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
            `/api/congnhan/allcongnhanto?mato=${this.tonhomid[this.selectedIndex].mato
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
            `/api/congnhan/allcongnhanto?mato=${this.tonhomid[this.selectedIndex].mato
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

    // chốt phiếu
    async chotallPhieulo(phieu) {
      // // Có n phiếu tất cả trong lô
      // // console.log(this.showlsxpx);
      // // Ghi tổng hỏng và tổng đạt vào 
      // // duyệt vòng lặp phiếu
      // for (let i = 0; i < this.showlsxpx.length; i++) {
      //   let sumhong = this.showlsxpx[i].tonghong
      //   let sumdat = this.showlsxpx[i].tongdat
      //   // console.log(`mã lô: ${this.showlsxpx[i]._id} có tổng hỏng là: ${sumhong}`)
      //   let dt = { tonghong: sumhong, tongdat: sumdat }
      //   await this.$axios.$patch(
      //     `/api/ketoan/updatetonghong?_id=${this.showlsxpx[i]._id}`,
      //     dt
      //   );
      // }

      let data_lsx;
      data_lsx = await this.$axios.$get(
        `/api/lokehoach/getlosxinluongcongnhan?makh=${phieu.makh.trim()}&makhpx=${phieu.makhpx.trim()}&mapx=${phieu.mapx.trim()}`
      );
      // console.log(data_lsx);
      for (let i = 0; i < data_lsx.length; i++) {
        let data = {
          stopday_losx: data_lsx[i].ngaykt,
          status: 1,
        };
        // cập nhật status và stopday_losx
        this.$axios.$patch(
          `/api/ketoan/capnhatstatuslosx?makh=${data_lsx[i].makh}&makhpx=${data_lsx[i].makhpx
          }&malosx=${data_lsx[i].malosx.trim()}&mapx=${data_lsx[
            i
          ].mapx.trim()}`,
          data
        );
        // console.log(data_lsx[i].ngaykt);
        this.$axios.$patch(
          `/api/ketoan/capnhatstatuslcd?makh=${phieu.makh.trim()}&makhpx=${phieu.makhpx.trim()}&mapx=${phieu.mapx.trim()}&malosx=${data_lsx[
            i
          ].malosx.trim()}`,
          data
        );
        this.$axios.$patch(
          `/api/ketoan/capnhatstatusluongcnhat?makh=${phieu.makh.trim()}&makhpx=${phieu.makhpx.trim()}&mapx=${phieu.mapx.trim()}&malosx=${data_lsx[
            i
          ].malosx.trim()}`,
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
        title: "Đã chốt toan bo phiếu lô",
      });
    },

    // hủy từng phiếu
    async xacnhanHuyChotphieu(phieu) {
      let data = {
        stopday_losx: this.form.stopday_losx,
        status: 0,
      };
      this.$axios.$patch(
        `/api/ketoan/capnhatstatuslcd?makh=${this.form.makh.trim()}&makhpx=${this.form.makhpx.trim()}&malosx=${this.form.malosx.trim()}&mapx=${this.form.mapx.trim()}`,
        data
      );
      this.$axios.$patch(
        `/api/ketoan/capnhatstatuslosx?makh=${this.form.makh.trim()}&makhpx=${this.form.makhpx.trim()}&malosx=${this.form.malosx.trim()}&mapx=${this.form.mapx.trim()}`,
        data
      );
      this.$axios.$patch(
        `/api/ketoan/capnhatstatusluongcnhat?makh=${this.form.makh.trim()}&makhpx=${this.form.makhpx.trim()}&malosx=${this.form.malosx.trim()}&mapx=${this.form.mapx.trim()}`,
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
        title: "Đã hủy chốt phiếu",
      });
    },

    // hủy chốt toàn bộ phiếu
    async huychotallPhieulo(phieu) {
      // console.log(phieu);
      let data_lsx;
      data_lsx = await this.$axios.$get(
        `/api/lokehoach/getlosxinluongcongnhan?makh=${phieu.makh.trim()}&makhpx=${phieu.makhpx.trim()}&mapx=${phieu.mapx.trim()}`
      );
      // console.log(data_lsx);
      for (let i = 0; i < data_lsx.length; i++) {
        let data = {
          stopday_losx: "",
          status: 0,
        };
        this.$axios.$patch(
          `/api/ketoan/capnhatstatuslosx?makh=${data_lsx[i].makh}&makhpx=${data_lsx[i].makhpx
          }&malosx=${data_lsx[i].malosx.trim()}&mapx=${data_lsx[
            i
          ].mapx.trim()}`,
          data
        );
        // console.log(data_lsx[i].ngaykt);
        this.$axios.$patch(
          `/api/ketoan/capnhatstatuslcd?makh=${phieu.makh.trim()}&makhpx=${phieu.makhpx.trim()}&mapx=${phieu.mapx.trim()}&malosx=${data_lsx[
            i
          ].malosx.trim()}`,
          data
        );
        this.$axios.$patch(
          `/api/ketoan/capnhatstatusluongcnhat?makh=${phieu.makh.trim()}&makhpx=${phieu.makhpx.trim()}&mapx=${phieu.mapx.trim()}&malosx=${data_lsx[
            i
          ].malosx.trim()}`,
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
        title: "Đã chốt toan bo phiếu lô",
      });
    },

    // Bấm vào mã lô sản xuất
    async getInfoLosx(infoPhieulo) {
      this.isActive = true;
      this.iscongdoan = 1;
      this.getinfoplsx = infoPhieulo;
      // console.log(this.getinfoplsx._id);
      this.form.id_losx = this.getinfoplsx._id
      this.form.nhomluong = infoPhieulo.nhomluong.trim();
      this.form.mapx = infoPhieulo.mapx.trim();
      this.form.malosx = infoPhieulo.malosx.trim();
      this.form.makh = infoPhieulo.makh.trim();
      this.form.makhpx = infoPhieulo.makhpx.trim();
      this.form.tensp = infoPhieulo.tensp.trim();
      this.form.mato = infoPhieulo.mato.trim();
      this.form.tento = infoPhieulo.tento.trim();

      this.allluongcongdoan = await this.$axios.$get(
        `/api/ketoan/getallluongcongdoaninlsx?makh=${this.form.makh}&makhpx=${this.form.makhpx}&malosx=${this.form.malosx}&mapx=${this.form.mapx}`
      );
      this.allluongcongnhat = await this.$axios.$get(
        `/api/ketoan/getallluongcongnhatinlsx?makh=${this.form.makh}&makhpx=${this.form.makhpx}&malosx=${this.form.malosx}&mapx=${this.form.mapx}`
      );

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

      let j = sumhong[0].tonghong
      this.tonghonginlo = j



    },

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
            this.tonhomid = await this.$axios.$get(
              `/api/phongban/alltoinxuong?mapx=${p1}`
            );
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
      // console.log(p1)
      this.tonhomid = await this.$axios.$get(
        `/api/phongban/alltoinxuong?mapx=${p1}`
      );
      if (this.tonhomid.length > 0) {
        for (let i = 0; i < this.items_cn.length; i++) {
          if (i == index) {
            this.items_cn[i].nhomto = [];
            this.tonhomid = await this.$axios.$get(
              `/api/phongban/alltoinxuong?mapx=${p1}`
            );
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

    async getdataPhieulosx(phieulo) {
      this.allluongcongdoan = [];
      this.allluongcongnhat = [];
      this.iscongdoan = 0;
      this.iscongnhat = 0;
      this.phieulosx = phieulo;
      // console.log(this.phieulosx.tenpx);
      this.showlsxpx = await this.$axios.$get(
        `/api/lokehoach/losanxuattaipx?makh=${this.phieulosx.makh}&makhpx=${this.phieulosx.makhpx}&mapx=${this.phieulosx.mapx}`
      );
      // ban đầu làm là do update tổng đạt hỏng từ bên ngoài
      // Soi vào từng lô để tính sum số hỏng
      // for (let i = 0; i < this.showlsxpx.length; i++) {
      //   const sumhong = await this.$axios.$get(
      //     `/api/ketoan/sumtonghong?_id_losx=${this.showlsxpx[i]._id}`
      //   );
      //   // console.log(sumhong[0].tonghong)
      //   // console.log(`Mã Lô ${i} là: ${this.showlsxpx[i]._id} -- Có tổng hỏng là: ${sumhong[0].tonghong}`)
      //   // items_tonghong
      //   this.showlsxpx[i].tonghong = sumhong[0].tonghong

      // }
      // console.log(this.showlsxpx)
    },

    // bấm chọn nguyên công
    async getinfoNguyencong(event, selectedIndex, index) {
      this.selectedIndex = selectedIndex;
      // console.log(index)
      for (let i = 0; i < this.items.length; i++) {
        if (i == index) {
          this.items[i].dongia = this.dmnguyencong[this.selectedIndex].dongia;
          this.items[i].malosx = this.form.malosx;
          this.items[i].makh = this.form.makh;
          this.items[i].makhpx = this.form.makhpx;
          this.items[i].tensp = this.form.tensp;
          this.items[i].mapx = this.form.mapx;
          this.items[i]._id_losx = this.getinfoplsx._id
        }
      }

      if (this.form.mato == "") {
        for (let i = 0; i < this.items.length; i++) {
          if (i == index) {
            this.cong_nhan = await this.$axios.$get(
              `/api/congnhan/allcongnhanpx?mapx=${this.form.mapx}`
            );
            // console.log(this.cong_nhan);
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
      } else {
        for (let i = 0; i < this.items.length; i++) {
          if (i == index) {
            this.cong_nhan = await this.$axios.$get(
              `/api/congnhan/allcongnhanto?mato=${this.form.mato}`
            );
            // console.log(this.cong_nhan);
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

    getTencn(event, selectedIndex, index) {
      // console.log(this.cong_nhan[this.selectedIndex])
      this.selectedIndex = selectedIndex;
      for (let i = 0; i < this.items.length; i++) {
        if (i == index) {
          this.items[i].congnhan =
            this.items[i].nhomto_cnt[this.selectedIndex].macn;
          this.items[i].tencn =
            this.items[i].nhomto_cnt[this.selectedIndex].tencn;
          this.items[i].phanxuong_cn =
            this.items[i].nhomto_cnt[this.selectedIndex].maxuong;
          this.items[i].to_cn =
            this.items[i].nhomto_cnt[this.selectedIndex].mato;
          this.items[i].mato = this.form.mato;
        }
      }
    },

    getTencnCN(event, selectedIndex, index) {
      // console.log(this.cong_nhan[this.selectedIndex])
      this.selectedIndex = selectedIndex;
      for (let i = 0; i < this.items_cn.length; i++) {
        if (i == index) {
          this.items_cn[i].malosx = this.malosx;
          this.items_cn[i].nguoithuchien =
            this.cong_nhan_cn[this.selectedIndex].tencn;
          this.items_cn[i].malosx = this.form.malosx;

          this.items_cn[i].macongnhan =
            this.items_cn[i].nhomto_cnt[this.selectedIndex].macn;
          this.items_cn[i].nguoithuchien =
            this.items_cn[i].nhomto_cnt[this.selectedIndex].tencn;
        }
      }
      // console.log(this.items_cn)
    },

    async getCongnhat(event, selectedIndex, index) {
      this.selectedIndex = selectedIndex;
      for (let i = 0; i < this.items_cn.length; i++) {
        if (i == index) {
          this.items_cn[i].tencongnhat =
            this.dmcongnhat[this.selectedIndex].tencn;
          this.items_cn[i].dongia = this.dmcongnhat[this.selectedIndex].dongia;
          this.items_cn[i].malosx = this.form.malosx;
          this.items_cn[i].makh = this.form.makh;
          this.items_cn[i].makhpx = this.form.makhpx;
          this.items_cn[i].tensp = this.form.tensp;
          this.items_cn[i].mapx = this.form.mapx;
          this.items_cn[i]._id_losx = this.getinfoplsx._id
        }
      }
      // console.log(this.items_cn)
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
              };
              this.items_cn[i].nhomto_cnt.push(cn);
            }
          }
        }

      }
    },

    // create phiếu
    onTaophieu() {
      // console.log(this.masp);
      Swal.fire({
        title: "Chắc chắn tạo lô sản xuất này?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Chắc chắn tạo",
      }).then((result) => {
        if (result.isConfirmed) {
          try {
            // console.log(this.getinfoplsx._id);
            let sumhong = this.tonghonginlo
            let sumdat = this.tongdatinlo
            // console.log(`mã lô: ${this.showlsxpx[i]._id} có tổng hỏng là: ${sumhong}`)
            let dt = { tonghong: sumhong, tongdat: sumdat }
            this.$axios.$patch(
              `/api/ketoan/updatetonghong?_id=${this.getinfoplsx._id}`,
              dt
            );
            if (this.items.length > 0) {
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
                    // Nếu chưa chốt đơn thì status trong luongcongnhan = 0
                    // Nếu chốt rồi thì status trong luongcongnhan = 1
                    // if (this.form.status == false) {
                    //   this.items[i].status = 0;
                    // } else {
                    //   this.items[i].status = 1;
                    // }
                    // // Nếu có ngày chốt thì sẽ ghi ngày chốt vào
                    // this.items[i].stopday_losx = this.form.stopday_losx;

                    // cập nhật lương công đoạn
                    this.$axios.$post(
                      "/api/ketoan/addluongcongdoan",
                      this.items[i]
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
                      title: "Đã thêm công đoạn lương",
                    });

                    //   window.location.reload();
                  }
                }
              }

              let turn = 1;
              let length = this.items.length;
              while (turn <= length) {
                this.deleteRow(this.items.length - turn);
                turn += 1;
              }
            }

            if (this.items_cn.length > 0) {
              for (let i = 0; i < this.items_cn.length; i++) {
                if (
                  this.items_cn[i].nguoithuchien == "" ||
                  this.items_cn[i].sogiocong == ""
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
                    title: "Không được để trống dữ liệu trên dòng nhập !!!",
                  });
                } else {
                  this.$axios.$post(
                    "/api/ketoan/addcongnhat",
                    this.items_cn[i]
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
                    title: "Cập nhật phiếu lô sản xuất",
                  });
                }
              }

              let turncn = 1;
              let lengthcn = this.items_cn.length;
              while (turncn <= lengthcn) {
                this.deleteRowCn(this.items_cn.length - turncn);
                turncn += 1;
              }
            }

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
        }
      });
    },

    async onUpdateCd(id, sodat, sohong, ghichu) {
      // console.log(sodat, sohong, id)
      let data = {
        sodat: sodat.trim(),
        sohong: sohong.trim(),
      };
      // console.log(data)
      this.$axios.$patch(`/api/ketoan/updateluongcongdoan/${id}`, data);
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

    async onUpdateCn(id, sogiocong, ghichu) {
      let data = {
        sogiocong: sogiocong.trim(),
      };
      //   console.log(data)
      this.$axios.$patch(`/api/ketoan/updateluongcongnhat/${id}`, data);
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

    onDelete(cd) {
      swal({
        title: "Bạn muốn xóa công đoạn này?",
        text: "Công đoạn sẽ không lấy lại được sau khi xóa!",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          if (cd.status == 1 && cd.stopday_losx != '') {
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
            this.$axios.$delete(`/api/lokehoach/luongcongnhan/${cd._id}`)
              .then(response => {
                const index = this.allluongcongdoan.findIndex(lcd => lcd._id === cd._id) // find the post index 
                if (~index) // if the post exists in array
                  this.allluongcongdoan.splice(index, 1) //delete the post
              });
          }

        } else {
          swal("Bạn đã hủy xóa");
        }
      });
    },

    onDeleteCn(cd) {
      swal({
        title: "Bạn muốn xóa công nhật này?",
        text: "Công nhật sẽ không lấy lại được sau khi xóa!",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          if (cd.status == 1 && cd.stopday_losx != '') {
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
            this.$axios.$delete(`/api/ketoan/congnhat/${cd._id}`)
              .then(response => {
                const index = this.allluongcongnhat.findIndex(lcd => lcd._id === cd._id) // find the post index 
                if (~index) // if the post exists in array
                  this.allluongcongnhat.splice(index, 1) //delete the post
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

.table-height {
  height: 250px;
  display: block;
  overflow: scroll;
  width: 100%;
  position: sticky;
  top: 0;
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

.highlight1 {
  background-color: #a5b9cd;
}

tr:hover {
  cursor: pointer;
  background-color: #ebfffc;
}
</style>
