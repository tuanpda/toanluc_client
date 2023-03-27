<template>
    <div class="columns">
        <div class="column">
            <br />
            <div class="box" style="margin-left: 5px; margin-right: 5px">
                <div class="columns">
                    <div class="column is-8">
                        <div class="control">
                            <span class="icon is-small is-left">
                                <i style="color: #ff55acee" class="fas fa-broom"></i>
                            </span>
                            <span style="color: #3850b7; font-size: 17px; font-weight: bold">Vào lương công đoạn</span>
                        </div>
                    </div>
                    <div class="column" style="text-align: right">
                        <button @click="huychotallPhieulo" class="button is-warning is-fullwidth is-small">
                            <span class="icon is-small">
                                <i class="fas fa-cart-arrow-down"></i>
                            </span>
                            <span>Hủy chốt phiếu đã chọn</span>
                        </button>
                    </div>
                    <div class="column" style="text-align: right">
                        <button @click="chotPhieulo" class="button is-danger is-fullwidth is-small">
                            <span class="icon is-small">
                                <i class="fas fa-key"></i>
                            </span>
                            <span>Chốt phiếu đã chọn</span>
                        </button>
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
                        <tr style="background-color: #feecf0;">
                            <td style="font-size: small; width: 15%;">
                                <div class="select-wrapper">
                                    <div class="select-header" @click="isOpen = !isOpen">
                                        {{ selectedOptions.length > 0 ? selectedOptions.join(', ') : 'Chọn Phân xưởng' }}
                                        <span class="arrow" :class="{ 'open': isOpen }"></span>
                                    </div>
                                    <div class="select-options" :class="{ 'open': isOpen }">
                                        <label v-for="option in phanxuong">
                                            <input type="checkbox" :value="option.mapx" v-model="selectedOptions">
                                            {{ option.mapx }} &nbsp;
                                        </label>
                                    </div>
                                </div>

                            </td>
                            <td style="width: 15%;">
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
                            </td>
                            <td style="font-size: small; width: 15%;">
                                <div class="select-wrapper">
                                    <div class="select-header" @click="isOpenst = !isOpenst">
                                        {{ Options_status.length > 0 ? Options_status.join(', ') : 'Trạng thái' }}
                                        <span class="arrow" :class="{ 'open': isOpenst }"></span>
                                    </div>
                                    <div class="select-options" :class="{ 'open': isOpenst }">
                                        <label v-for="option in statusArr">
                                            <input type="checkbox" :value="option.masta" v-model="Options_status">
                                            {{ option.tensta }} &nbsp;
                                        </label>
                                    </div>
                                </div>
                            </td>
                            <td style="width: 7%;">
                                <button @click="filterData" class="button is-small is-fullwidth is-success">Lọc</button>
                            </td>
                            <td style="width: 7%;">
                                <button @click="getSolieuLSX_ALl_cht"
                                    class="button is-small is-fullwidth is-danger">Refresh</button>
                            </td>
                            <td style="font-size: small; width: 5.5%; font-weight: 600;">
                                Số dòng
                            </td>
                            <td style="font-size: small; width: 7.6%;">
                                <input class="input is-danger is-small" type="number" id="itemsPerPage"
                                    v-model.number="itemsPerPage" min="1" max="10" />
                            </td>
                            <td></td>
                        </tr>
                    </table>
                </div>
                <div class="table_wrapper">
                    <table class="table is-responsive is-bordered is-narrow is-fullwidth">
                        <tr style="background-color: #f4f2f8">
                            <td style="font-size: small; font-weight: bold; text-align: center;"><input type="checkbox"
                                    v-model="selectAll" /></td>
                            <td style="font-size: small; text-align: center; font-weight: 600; width: 3%">STT</td>
                            <td @click="sortTable('mapx')"
                                style="font-size: small; text-align: center; font-weight: 600; width: 10%">Mã PX
                            </td>
                            <td @click="sortTable('makh')"
                                style="font-size: small; text-align: center; font-weight: 600; width: 10%">KH nhà máy
                            </td>
                            <td @click="sortTable('makhpx')"
                                style="font-size: small; text-align: center; font-weight: 600; width: 10%">Lô KHPX</td>
                            <td @click="sortTable('malosx')"
                                style="font-size: small; text-align: center; font-weight: 600; width: 13%">Lô sản xuất
                            </td>
                            <td @click="sortTable('masp')"
                                style="font-size: small; text-align: center; font-weight: 600; width: 10%">Mã SP
                            </td>
                            <td @click="sortTable('nhomluong')"
                                style="font-size: small; text-align: center; font-weight: 600; width: 17%">Nhóm lương
                            </td>
                            <td @click="sortTable('ngaybd')"
                                style="font-size: small; text-align: center; font-weight: 600; width: 5%;">Ngày bắt đầu
                            </td>
                            <!-- <td style="font-size: small; text-align: center; font-weight: 600; width: 5%;">Ngày kết thúc
                            </td> -->
                            <td style="font-size: small; text-align: center; font-weight: 600; width: 5%;">Số lượng
                            </td>
                            <td @click="sortTable('status')"
                                style="font-size: small; text-align: center; font-weight: 600; width: 5%;">Trạng thái
                            </td>
                            <td style="font-size: small; text-align: center; font-weight: 600; width: 5%;">Chốt?
                            </td>
                            <td style="font-size: small; text-align: center; font-weight: 600; width: 5%;">Tổng đạt
                            </td>
                            <td style="font-size: small; text-align: center; font-weight: 600; width: 5%;">Tổng hỏng
                            </td>
                            <td @click="sortTable('ngaybatdautt')"
                                style="font-size: small; text-align: center; font-weight: 600; width: 5%;">Ngày BĐTT
                            </td>
                            <td @click="sortTable('ngayhoanthanhtt')"
                                style="font-size: small; text-align: center; font-weight: 600; width: 5%;">Ngày HTTT
                            </td>
                            <td style="font-size: small; text-align: center; font-weight: 600; width: 5%;">SL nhanh
                            </td>
                            <td style="font-size: small; text-align: center; font-weight: 600; width: 5%;">Nhập lương
                            </td>
                        </tr>
                        <tr v-for="(item, index) in paginatedTable" :key="index + 'llllkiq'"
                            :class="{ highlight: item._id == phieulosx }">
                            <td style="text-align: center">
                                <input v-model="selected" :value="item" type="checkbox" />
                            </td>
                            <td style="font-size: small; text-align: center; background-color: #effaf5;">{{ index + 1 }}
                            </td>
                            <td style="font-size: small; background-color: #effaf5;">{{ item.mapx }}</td>
                            <td style="font-size: small; background-color: #effaf5;">{{ item.makh }}</td>
                            <td style="font-size: small; background-color: #effaf5; text-align: center;">{{ item.makhpx }}
                            </td>
                            <td @click="getInfoLosx(item)"
                                style="font-size: small; background-color: #fffaeb; font-weight: 600;">
                                {{
                                    item.malosx
                                }}</td>
                            <td style="font-size: small; background-color: #effaf5;">{{ item.masp }}</td>
                            <!-- <td style="font-size: small; background-color: #effaf5;">{{ item.tensp }}</td> -->
                            <td style="font-size: small; background-color: #effaf5; text-align: center;">{{
                                item.nhomluong
                            }}</td>
                            <td style="font-size: small; text-align: center; background-color: #effaf5;">{{
                                item.ngaybd | formatDate
                            }}</td>
                            <!-- <td style="font-size: small; text-align: center; background-color: #effaf5;">{{
                                item.ngaykt | formatDate
                            }}</td> -->
                            <td style="font-size: small; text-align: center; background-color: #effaf5;">{{
                                item.soluonglsx
                            }}</td>
                            <template>
                                <td v-if="item.status == 1" style="font-size: small; text-align: center; "><span
                                        style="color: white; font-weight: bold; background-color: red; padding-left: 7px; padding-right: 7px;">DK</span>
                                </td>
                                <td v-else-if="item.status == 2" style="font-size: small; text-align: center;">
                                    <span
                                        style="color: red; font-weight: bold; background-color: yellow; padding-left: 7px; padding-right: 7px;">SX</span>
                                </td>
                                <td v-else-if="item.status == 3" style="font-size: small; text-align: center;">
                                    <span
                                        style="color: white; font-weight: bold; background-color: green; padding-left: 7px; padding-right: 7px;">HT</span>
                                </td>
                                <td v-else style="font-size: small; text-align: center;">
                                </td>
                            </template>
                            <td style="font-size: small; text-align: center">
                                <span v-if="item.status_tinhluong == false">
                                    <i style="color: #ffd863" class="fa fa-circle"></i>
                                </span>
                                <span v-else>
                                    <i style="color: #00947e" class="fa fa-circle"></i>
                                </span>
                            </td>
                            <td style="font-size: small; text-align: center;">{{ item.tongdat }}</td>
                            <td style="font-size: small; text-align: center;">{{ item.tonghong }}</td>
                            <!-- <td style="font-size: small; text-align: center;">{{ item.stopday_losx | formatDate }}</td> -->
                            <td style="font-size: small; text-align: center;">{{ item.ngaybatdautt | formatDate }}</td>
                            <td style="font-size: small; text-align: center;">{{ item.ngayhoanthanhtt | formatDate }}</td>
                            <td style="font-size: small; text-align: center;"><input @change="updateStatus(item)"
                                    type="text" class="input is-small is-danger" v-model="item.soluongkhsx"></td>
                            <td style="font-size: small; text-align: center;">
                                <a @click="vaoPhieuluong(item)"><span>
                                        <i style="color: #9b6dff" class="fa fa-check-square-o"></i>
                                    </span></a>

                            </td>
                        </tr>
                    </table>
                    <div class="pagination"> <button class="button is-small is-success" @click="changePage(1)"
                            :disabled="currentPage === 1">Đầu tiên</button>
                        <button class="button is-small is-info" @click="changePage(currentPage - 1)"
                            :disabled="currentPage === 1">Trước</button> <button class="button is-small"
                            v-for="page in pages" @click="changePage(page)" :class="{ active: page === currentPage }"> {{
                                page }}
                        </button> <button class="button is-small is-info" @click="changePage(currentPage + 1)"
                            :disabled="currentPage === pageCount">Sau</button>
                        <button class="button is-small is-success" @click="changePage(pageCount)"
                            :disabled="currentPage === pageCount">Cuối</button>
                    </div>
                </div>
                <br />
                <label class="checkbox">
                    <input type="checkbox" v-model="checkViewluong">
                    <span>Chi tiết lương tại lô sản xuất có mã: </span> <span style="color: red; font-weight: 500">{{
                        getinfoplsx.malosx }}</span> <span style="font-weight: 500"> - {{ getinfoplsx.tenpx }} - {{
        getinfoplsx.mapx }}</span> | <span style="font-weight: 500; color: blue">Mã kế hoạch: {{
        getinfoplsx.makh }}</span> | <span style="font-weight: 500; color: green">Mã kế hoạch PX: {{
        getinfoplsx.makhpx }}</span>
                </label>
                <div v-if="checkViewluong == true">
                    <div class="table_wrapper">
                        <table class="table is-responsive is-bordered is-narrow is-fullwidth">
                            <tr style="background-color: #feecf0">
                                <td colspan="9" style="font-weight: bold; font-size: small">
                                    Công đoạn đã thực hiện
                                </td>
                            </tr>
                            <tr>
                                <td style="font-size: small; text-align: center; font-weight: bold; width: 5%;">
                                    STT
                                </td>
                                <td style="font-size: small; text-align: center; font-weight: bold; width: 5%;">Nguyên công
                                </td>
                                <td style="font-size: small; text-align: center; font-weight: bold; width: 7%;">Đơn giá</td>
                                <td style="font-size: small; text-align: center; font-weight: bold; width: 10%;">PX / tổ
                                </td>
                                <td style="font-size: small; text-align: center; font-weight: bold;">Người thực hiện</td>
                                <td style="font-size: small; text-align: center; font-weight: bold; width: 7%;">Số đạt</td>
                                <td style="font-size: small; text-align: center; font-weight: bold; width: 7%;">Số hỏng</td>
                                <td style="font-size: small; text-align: center; font-weight: bold; width: 7%;">Cập nhật
                                </td>
                                <td style="font-size: small; text-align: center; font-weight: bold; width: 5%;">Xóa</td>
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
                                        onUpdateCd(item)
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
                            <tr>
                                <td colspan="9" style="font-size: small; font-weight: 700; background-color: #effaf5;">Tổng
                                    cộng</td>
                            </tr>
                            <tr v-for="(group, nguyencong) in groups" :key="nguyencong">
                                <td style="text-align: center; font-size: small"></td>
                                <td style="font-size: small">{{ nguyencong }}</td>
                                <td style="text-align: right; font-size: small">{{ group.dongia | formatNumber }}</td>
                                <td></td>
                                <td></td>
                                <td style="text-align: right; font-size: small">{{ group.sodat | formatNumber }}</td>
                                <td style="text-align: right; font-size: small">{{ group.sohong | formatNumber }}</td>
                                <td colspan="2" style="text-align: right; font-size: small; color: red; font-weight: 600;">

                                </td>
                            </tr>
                        </table>
                    </div>
                    <br />
                    <!-- công nhật -->
                    <div class="table_wrapper">
                        <table class="table is-responsive is-bordered is-narrow is-fullwidth">
                            <tr style="background-color: #feecf0">
                                <td colspan="8" style="font-weight: bold; font-size: small">
                                    Công nhật đã thực hiện
                                </td>
                            </tr>
                            <tr>
                                <td style="font-size: small; text-align: center; font-weight: bold; width: 5%;">STT</td>
                                <td style="font-size: small; text-align: center; font-weight: bold; width: 15%;">Tên công
                                    nhật</td>
                                <td style="font-size: small; text-align: center; font-weight: bold; width: 7%;">Đơn giá</td>
                                <td style="font-size: small; text-align: center; font-weight: bold;">Người thực hiện</td>
                                <td style="font-size: small; text-align: center; font-weight: bold; width: 14%;">Số giờ</td>
                                <td style="font-size: small; text-align: center; font-weight: bold; width: 7%;">Cập nhật
                                </td>
                                <td style="font-size: small; text-align: center; font-weight: bold; width: 5%;">Xóa</td>
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
                </div>
                <br />
                <!-- Modal chốt phiếu-->
                <div class="">
                    <!-- Toggle class  -->
                    <div :class="{ 'is-active': isActive }" class="modal">
                        <div class="modal-background"></div>
                        <div class="modal-content modal-card">
                            <header
                                style="background-color: #3e8ed0; border-top-left-radius: 8px; border-top-right-radius: 8px; ">
                                <div class="columns">
                                    <div class="column is-9">
                                        <p style="font-size: small; font-weight: bold; color: white; padding: 15px;">
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
                                    <div class="column is-8">
                                        <template v-if="form.tento">
                                            <span>Tổ được chỉ định: </span> <span>{{
                                                form.tento
                                            }}
                                            </span>
                                        </template>

                                    </div>
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
                                    <!-- hiển thị thông tin về lô sản xuất -->
                                    <div style="margin-bottom: 3px; text-align: right">
                                        <table class="table is-responsive is-bordered is-narrow is-fullwidth">
                                            <tr style="background-color: #feecf0;">
                                                <td
                                                    style="font-size: small; width: 15%; text-align: center; font-weight: 500; color: green;">
                                                    Mã kế hoạch nhà máy
                                                </td>
                                                <td
                                                    style="font-size: small; width: 15%; text-align: center; font-weight: 500; color: green;">
                                                    Mã lô kế hoạch
                                                </td>
                                                <td
                                                    style="font-size: small; width: 10%; text-align: center; font-weight: 500; color: green;">
                                                    Ngày bắt đầu
                                                </td>
                                                <td
                                                    style="font-size: small; width: 10%; text-align: center; font-weight: 500; color: green;">
                                                    Ngày kết thúc
                                                </td>
                                                <td
                                                    style="font-size: small; width: 10%; text-align: center; font-weight: 500; color: green;">
                                                    Số lượng của kế hoạch
                                                </td>
                                                <td
                                                    style="font-size: small; width: 10%; text-align: center; font-weight: 500; color: green;">
                                                    Mã sản phẩm
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="font-size: small; font-weight: bold;">{{ getinfoplsx.makh }}
                                                </td>
                                                <td style="font-size: small; font-weight: bold; text-align: center;">{{
                                                    getinfoplsx.makhpx }}
                                                </td>
                                                <td style="font-size: small; font-weight: bold; text-align: center;">{{
                                                    getinfoplsx.ngaybd |
                                                    formatDate }}</td>
                                                <td style="font-size: small; font-weight: bold; text-align: center;">{{
                                                    getinfoplsx.ngaykt |
                                                    formatDate }}</td>
                                                <td style="font-size: small; font-weight: bold; text-align: center;">{{
                                                    getinfoplsx.soluong |
                                                    formatNumber }}</td>
                                                <td style="font-size: small; font-weight: bold; text-align: center;">{{
                                                    getinfoplsx.masp }}</td>
                                            </tr>
                                            <tr style="background-color: #feecf0;">
                                                <td
                                                    style="font-size: small; width: 15%; text-align: center; font-weight: 500; color: green;">
                                                    Mã Lô sản xuất
                                                </td>
                                                <td
                                                    style="font-size: small; width: 15%; text-align: center; font-weight: 500; color: green;">
                                                    Số lượng lô sản xuất
                                                </td>
                                                <td
                                                    style="font-size: small; width: 10%; text-align: center; font-weight: 500; color: green;">
                                                    Ngày sản xuất
                                                </td>
                                                <td
                                                    style="font-size: small; width: 10%; text-align: center; font-weight: 500; color: green;">
                                                    Ngày hoàn thành
                                                </td>
                                                <td
                                                    style="font-size: small; width: 10%; text-align: center; font-weight: 500; color: green;">
                                                    Mã Phân xưởng
                                                </td>
                                                <td
                                                    style="font-size: small; width: 10%; text-align: center; font-weight: 500; color: green;">
                                                    Mã Tổ
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="font-size: small; font-weight: bold;">{{ getinfoplsx.malosx }}
                                                </td>
                                                <td style="font-size: small; font-weight: bold; text-align: center;">{{
                                                    getinfoplsx.soluonglsx |
                                                    formatNumber }}
                                                </td>
                                                <td style="font-size: small; font-weight: bold; text-align: center;"><input
                                                        type="date" class="input is-small"></td>
                                                <td style="font-size: small; font-weight: bold; text-align: center;"><input
                                                        type="date" class="input is-small"></td>
                                                <td style="font-size: small; font-weight: bold; text-align: center;">{{
                                                    getinfoplsx.mapx }}
                                                </td>
                                                <td style="font-size: small; font-weight: bold; text-align: center;">{{
                                                    getinfoplsx.mato }}
                                                </td>
                                            </tr>
                                        </table>
                                    </div>

                                    <!-- <div style="margin-bottom: 3px; text-align: right">
                                                <table class="table is-responsive is-bordered is-narrow">
                                                    <tr>
                                                        <td style="font-size: small">
                                                            Tổng đạt:
                                                        </td>
                                                        <td><input v-model.trim="tongdatinlo" type="text" class="input is-small">
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style="font-size: small">Tổng hỏng: </td>
                                                        <td style="font-size: small; font-weight: bold;">{{ tonghonginlo }}</td>
                                                    </tr>
                                                </table>
                                            </div> -->

                                    <div>
                                        <table class="table is-responsive is-bordered is-narrow is-fullwidth">
                                            <tr style="background-color: #fffaeb">
                                                <td colspan="11" style="font-weight: bold; font-size: small">
                                                    Cập nhật công đoạn lương trong lô sản xuất
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colspan="11">
                                                    <button @click="addCongdoan()" class="button is-small is-info">
                                                        Thêm công đoạn
                                                    </button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td
                                                    style="text-align: center; font-size: small; font-weight: bold; width: 3%;">
                                                    STT
                                                </td>
                                                <td
                                                    style="text-align: center; font-size: small; font-weight: bold; width: 15%;">
                                                    Nguyên công
                                                </td>
                                                <td
                                                    style="text-align: center; font-size: small; font-weight: bold; width: 5%;">
                                                    Máy
                                                </td>
                                                <td
                                                    style="text-align: center; font-size: small; font-weight: bold; width: 20%;">
                                                    Xưởng
                                                </td>
                                                <td
                                                    style="text-align: center; font-size: small; font-weight: bold; width: 20%;">
                                                    Tổ
                                                </td>
                                                <td
                                                    style="text-align: center; font-size: small; font-weight: bold; width: 13%;">
                                                    Người thực hiện
                                                </td>
                                                <td
                                                    style="text-align: center; font-size: small; font-weight: bold; width: 7%;">
                                                    Ngày thực hiện
                                                </td>
                                                <td
                                                    style="text-align: center; font-size: small; font-weight: bold; width: 7%;">
                                                    Số đạt
                                                </td>
                                                <td
                                                    style="text-align: center; font-size: small; font-weight: bold; width: 7%;">
                                                    Số hỏng
                                                </td>
                                                <td
                                                    style="text-align: center; font-size: small; font-weight: bold; width: 7%;">
                                                    Copy
                                                </td>
                                                <td
                                                    style="text-align: center; font-size: small; font-weight: bold; width: 7%;">
                                                    Xóa
                                                </td>
                                            </tr>
                                            <!-- v-if="isphanxuong == 1" -->
                                            <tr v-if="iscongdoan == 1" v-for="(item, index) in items" :key="index + 'cm-a'">
                                                <td style="text-align: center; font-size: small; font-weight: bold;">
                                                    {{ index + 1 }}
                                                </td>
                                                <td style="font-size: small; font-weight: bold;">
                                                    {{ item.nguyencong }}
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
                                                <!-- <td><input type="date" class="input is-small" v-model="item.ngaythuchien">
                                                </td> -->
                                                <td><input class="input is-small" type="date"
                                                        v-bind:value="item.ngaythuchien | inputDateFilter"
                                                        v-on:input="item.ngaythuchien = getDate($event.target.value)"></td>
                                                <td>
                                                    <input type="text" v-model="item.sodat" class="input is-small" />
                                                </td>
                                                <td>
                                                    <input type="text" v-model="item.sohong" class="input is-small" />
                                                </td>

                                                <td style="text-align: center">
                                                    <button @click="copyCongdoan(item, index)"
                                                        class="button is-small is-danger">
                                                        Copy
                                                    </button>
                                                </td>
                                                <td style="text-align: center">
                                                    <button @click="deleteRow(index)" class="button is-small is-danger">
                                                        Xóa
                                                    </button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colspan="7" style="font-size: small;">Tổng đạt / tổng hỏng</td>
                                                <td style="font-size: small; font-weight: 600; text-align: center;"><input
                                                        v-model.trim="tongdatinlo" type="text" class="input is-small"></td>
                                                <td style="font-size: small; font-weight: 600; text-align: center;">
                                                    {{ tonghonginlo }}</td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td colspan="11">
                                                    <button @click="addCongnhat()" class="button is-small is-info">
                                                        Thêm công nhật
                                                    </button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="text-align: center; font-size: small; font-weight: bold;">
                                                    Công nhật
                                                </td>
                                                <td style="text-align: center; font-size: small; font-weight: bold;">
                                                    Tên công
                                                </td>
                                                <td></td>

                                                <td style="text-align: center; font-size: small; font-weight: bold;">
                                                    Xưởng
                                                </td>
                                                <td style="text-align: center; font-size: small; font-weight: bold;">
                                                    Tổ
                                                </td>
                                                <td style="text-align: center; font-size: small; font-weight: bold;">
                                                    Người thực hiện
                                                </td>
                                                <td style="text-align: center; font-size: small; font-weight: bold;">
                                                    Ngày thực hiện
                                                </td>
                                                <td style="text-align: center; font-size: small; font-weight: bold;">
                                                    Số giờ
                                                </td>
                                                <td style="text-align: center; font-size: small;font-weight: bold;">
                                                    Ghi chú
                                                </td>
                                                <td style="text-align: center;font-size: small;font-weight: bold;">
                                                    Copy
                                                </td>
                                                <td style="text-align: center;font-size: small;font-weight: bold;">
                                                    Xóa
                                                </td>
                                            </tr>
                                            <tr v-for="(item, index) in items_cn" :key="index + 'cm-b'">
                                                <td style="text-align: center;font-size: small;font-weight: bold;">
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
                                                        <select
                                                            @change="getTencnCN($event, $event.target.selectedIndex, index)"
                                                            v-model="item.macn">
                                                            <option v-for="it in item.nhomto_cnt" :value="it.macn">
                                                                {{ it.tencn }}
                                                            </option>

                                                        </select>
                                                    </div>
                                                </td>
                                                <td><input type="date" class="input is-small" v-model="item.ngaythuchien">
                                                </td>
                                                <td><input v-model="item.sogiocong" type="text" class="input is-small" />
                                                </td>
                                                <td></td>
                                                <td style="text-align: center; font-size: small">
                                                    <button @click="copyCongnhat(item, index)"
                                                        class="button is-small is-danger">
                                                        Copy
                                                    </button>
                                                </td>
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
                excutedAt: ""
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

            // check nhiều phân xưởng
            options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
            selectedOptions: [],
            Options_status: [],
            isOpen: false,
            isOpenst: false,
            statusArr: [{ masta: 1, tensta: "DK" }, { masta: 2, tensta: "SX" }, { masta: 3, tensta: "HT" }],
            multiSearch_masp: "",
            multiSearch_nhomsp: "",

            // input suggest
            suggestions: [],
            suggestions_nhomsp: [],
            maspinlosanxuat: [],

            // lọc talble lô sản xuất đang được sản xuất
            sortDirection: 1,
            sortKey: "malosx",
            currentPage: 1,
            itemsPerPage: 10,

            // lọc talble
            currentSort: 'mapx',
            currentSortDir: 'asc',
            pageSize: 10,
            currentPage: 1,
            filter: '',

            // nhóm nguyên công trong chi tiết lương
            groups: {},
            totals: {},

            items: [
                {
                    _id_losx: "",
                    kehoachnam: "",
                    makh: "",
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
                    kehoachnam: "",
                    makh: "",
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
        this.getSolieuLSX_ALl_cht()
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
            return this.allluongcongdoan.reduce((sohong) => sohong += sohong, 0)
        },
        // chọn hết 
        selectAll: {
            get: function () {
                return this.losanxuats
                    ? this.selected.length == this.showlsxpx.length
                    : false;
            },
            set: function (value) {
                var selected = [];

                if (value) {
                    this.losanxuats.forEach(function (nv) {
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
    },

    watch: {
        itemsPerPage() {
            this.currentPage = 1;
        },
        allluongcongdoan(newItems) {
            // Cập nhật lại bảng khi có thay đổi
            console.log('Dữ liệu đã được cập nhật!');
        },
    },

    // dùng để bind dữ liệu ngày tháng vào input mang kiểu date (type="date" trong thẻ input)
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
            this.form.excutedAt = date + " " + time
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
                .filter((masp) => masp.toLowerCase().includes(this.multiSearch_masp.toLowerCase()))
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
            this.allluongcongdoan.forEach(item => {
                const dongia = parseFloat(item.dongia);
                const sodat = parseInt(item.sodat);
                const sohong = parseInt(item.sohong);

                if (!groups[item.nguyencong]) {
                    groups[item.nguyencong] = {
                        dongia: dongia,
                        sodat: sodat,
                        sohong: sohong
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
                tongtien: 0
            };
            this.items.forEach(item => {
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

        // hàm lấy thẳng dữ liệu trực tiếp từ store 
        async asyncDataLosx() {
            const losanxuats = await fetchLosanxuat()
            return { losanxuats }
        },
        // async fetchLosanxuats() {
        //     const response = await this.$axios.$get('/api/losanxuats')
        //     return response.data
        // },
        // --------------------------------------------------------------------------------------
        // 2: Các hàm lấy dữ liệu từ server qua API
        // form load sẽ lấy ra dữ liệu của các lô sản xuất - nằm ở trạng thái sản xuất
        async getSolieuLSX_ALl_cht() {
            this.multiSearch_masp = ""
            this.multiSearch_nhomsp = ""
            this.Options_status = []
            this.isOpen = false
            this.isOpenst = false
            this.selectedOptions = []
            this.sllosx = await this.$axios.$get(
                `/api/ketoan/getallphieulocht`
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
        // get all phân xưởng
        async get_phanxuong() {
            this.phanxuong = await this.$axios.$get(`/api/phongban/allphanxuong`);
        },
        // lấy tất cả mã sản phẩm có trong lô sản xuất
        async maspinlsx() {
            this.maspinlosanxuat = await this.$axios.$get('/api/lokehoach/hmsanphamlosanxuat')
        },

        // --------------------------------------------------------------------------------------
        // 2: Các Hàm chức năng
        // Các hàm xử lý thêm, xóa, copy các công đoạn sản xuất hoặc công nhật của công nhân
        // Sự kiện bấm nút thêm các công đoạn sản xuất
        async addCongdoan() {
            // console.log(this.getinfoplsx) 
            let arrayCongdoan
            let px

            if (this.getinfoplsx.mapx.trim() == 'AL_PXD' || this.getinfoplsx.mapx.trim() == 'DV_PXD') {
                px = 'PXD'
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

            for (let i = 0; i < arrayCongdoan.length; i++) {
                this.iscongdoan = 1;
                this.items.push({
                    _id_losx: this.getinfoplsx._id,
                    kehoachnam: this.getinfoplsx.kehoachnam,
                    makh: this.getinfoplsx.makh,
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
                // console.log(this.items)
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
                    };
                    this.items[i].nhomto_cnt.push(cn);
                    // console.log(this.items[i].nhomto_cnt)
                }


            }
        },
        // Sự kiện bấm nút thêm công nhật của công nhân
        async addCongnhat() {
            this.dmcongnhat = await this.$axios.$get(`/api/ketoan/alldmcongnhat`);
            this.iscongnhat = 1;
            this.items_cn.push({
                _id_losx: this.getinfoplsx._id,
                kehoachnam: this.getinfoplsx.kehoachnam,
                makh: this.getinfoplsx.makh,
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
                ngaythuchien: "",
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
        // Copy công đoạn sản xuất
        copyCongdoan(data, index) {
            // console.log(index)
            // this.items.push({
            //     _id_losx: data._id_losx,
            //     kehoachnam: data.kehoachnam,
            //     makh: data.makh,
            //     makhpx: data.makhpx,
            //     malosx: data.malosx,
            //     mapx: data.mapx,
            //     mapxchoncn: "",
            //     malosx: data.malosx,
            //     nguyencong: data.nguyencong,
            //     may: 0,
            //     congnhan: data.congnhan,
            //     sodat: data.sodat,
            //     sohong: data.sohong,
            //     ghichu: data.ghichu,
            //     masp: data.masp,
            //     dongia: data.dongia,
            //     tencn: data.tencn,
            //     stopday_losx: data.stopday_losx,
            //     status: data.status,
            //     to_cn: data.to_cn,
            //     ngaythuchien: data.ngaythuchien,
            // });
            data = { ...this.items[index] };
            this.items.splice(index + 1, 0, data);
            // console.log(this.items)
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
        // Lấy tên công nhân
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
        // lấy công nhật
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
        // Các Hàm xử lý sự kiện bấm nút ra thông tin
        // Bấm vào mã lô sản xuất sẽ ra thông tin lương đã nhập
        async getInfoLosx(infoPhieulo) {
            // gọi lương công đoạn từ store
            // this.$store.dispatch('quanlyluong/fetchLuongcd', infoPhieulo._id)
            // // gọi lương công nhật từ store
            // this.$store.dispatch('quanlyluong/fetchLuongcn', infoPhieulo._id)

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
            this.form.id_losx = this.getinfoplsx._id
            this.form.nhomluong = infoPhieulo.nhomluong.trim();
            this.form.mapx = infoPhieulo.mapx.trim();
            this.form.malosx = infoPhieulo.malosx.trim();
            this.form.makh = infoPhieulo.makh.trim();
            this.form.makhpx = infoPhieulo.makhpx.trim();
            this.form.tensp = infoPhieulo.tensp.trim();
            this.form.mato = infoPhieulo.mato.trim();
            this.form.tento = infoPhieulo.tento.trim();

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
        // Bấm vào nhập lương sẽ ra popup nhập lương
        async vaoPhieuluong(infoPhieulo) {
            this.isActive = true;
            // console.log(infoPhieulo)
            this.items = []
            this.iscongdoan = 1;
            this.getinfoplsx = infoPhieulo;
            // console.log(this.getinfoplsx);
            this.form.id_losx = this.getinfoplsx._id
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

            let j = sumhong[0].tonghong
            this.tonghonginlo = j
        },
        // Hàm cập nhật nhanh khi gõ số lượng hoàn thành vào sẽ đổi trạng thái Lô sản xuất
        async updateStatus(data) {
            try {
                if (parseFloat(data.soluongkhsx) > 0) {
                    data.status = 3
                } else {
                    data.status = 2
                }
                this.$axios.$patch(
                    `/api/lokehoach/losanxuat/status/${data._id}`,
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

            const listPhieulo = []
            for (let i = 0; i < this.selected.length; i++) {
                listPhieulo.push(this.selected[i].malosx)
            }
            // console.log(listPhieulo)
            var message = `${listPhieulo.join(", ")}`;
            Swal.fire(
                message,
                'success'
            )

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
                        title: "custom-swal"
                    }
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
                                var check_congdoan = []
                                this.$axios.$get(`/api/ketoan/checkcongnhat?_id_losx=${this.selected[i]._id}`)
                                    .then(resp => {
                                        // console.log(resp);
                                        check_congdoan = resp
                                        // console.log(check_congdoan);
                                    })
                                    .catch(err => {
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

                            this.getSolieuLSX_ALl_cht()

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
            var check_congdoan = []
            this.$axios.$get(`/api/ketoan/checkcongnhat?_id_losx=${this.selected[i]._id}`)
                .then(resp => {
                    // console.log(resp);
                    check_congdoan = resp
                    // console.log(check_congdoan);
                })
                .catch(err => {
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

            this.getSolieuLSX_ALl_cht()
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
                var check_congdoan = []
                this.$axios.$get(`/api/ketoan/checkcongnhat?_id_losx=${this.selected[i]._id}`)
                    .then(resp => {
                        // console.log(resp);
                        check_congdoan = resp
                        // console.log(check_congdoan);
                    })
                    .catch(err => {
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

            this.getSolieuLSX_ALl_cht()

        },

        // Hàm lọc dữ liệu
        // Lọc nhiều tiêu chí
        async filterData() {
            // console.log(this.selectedOptions)
            // console.log(this.Options_status)
            this.isOpen = false
            this.isOpenst = false

            const mapxList = this.selectedOptions
            const masp = this.multiSearch_masp
            const status = this.Options_status


            // chọn lọc full
            if (this.selectedOptions.length > 0 && this.Options_status.length > 0 && this.multiSearch_masp != "") {
                this.sllosx = await this.$axios.$get(
                    `/api/lokehoach/filterfulldklosanxuat`, {
                    params: {
                        mapx: mapxList, // Truyền danh sách mã phân xưởng lên server
                        masp: masp,
                        status: status,
                    },
                }
                );
            }
            // chỉ có mã px
            else if (this.selectedOptions.length > 0 && !this.Options_status.length && this.multiSearch_masp == "") {
                this.sllosx = await this.$axios.$get(
                    `/api/lokehoach/filteronlymapxlosanxuat`, {
                    params: {
                        mapx: mapxList,
                    },
                }
                );
            }
            // chỉ có mã px và mã sp
            else if (this.selectedOptions.length > 0 && !this.Options_status.length && this.multiSearch_masp != "") {
                this.sllosx = await this.$axios.$get(
                    `/api/lokehoach/filteronlymapxandmasplosanxuat`, {
                    params: {
                        mapx: mapxList,
                        masp: masp
                    },
                }
                );
            }
            // chỉ có mã px và status
            else if (this.selectedOptions.length > 0 && this.Options_status.length > 0 && this.multiSearch_masp == "") {
                this.sllosx = await this.$axios.$get(
                    `/api/lokehoach/filteronlymapxandstatuslosanxuat`, {
                    params: {
                        mapx: mapxList,
                        status: status
                    },
                }
                );
            }
            // lọc mỗi trạng thái
            else if (!this.selectedOptions.length && this.Options_status.length > 0 && this.multiSearch_masp == "") {
                this.sllosx = await this.$axios.$get(
                    `/api/lokehoach/filteronlystatuslosanxuat`, {
                    params: {
                        status: status
                    },
                }
                );
            }

            // lọc mỗi mã sản phẩm
            else if (!this.selectedOptions.length && !this.Options_status.length && this.multiSearch_masp != "") {
                this.sllosx = await this.$axios.$get(
                    `/api/lokehoach/filteronlymasplosanxuat`, {
                    params: {
                        masp: masp
                    },
                }
                );
            }

            // lọc sản phẩm + trạng thái
            else if (!this.selectedOptions.length && this.Options_status.length > 0 && this.multiSearch_masp != "") {
                this.sllosx = await this.$axios.$get(
                    `/api/lokehoach/filteronlymaspandstatuslosx`, {
                    params: {
                        masp: masp,
                        status: status
                    },
                }
                );
            }

        },

        // --------------------------------------------------------------------------------------
        // 4: Các hàm CRUD
        // Hàm tạo ra Phiếu lô sản xuất trong Modal
        onTaophieu() {
            // console.log(this.masp);
            Swal.fire({
                title: "Cập nhật các công đoạn đã vào lương?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Chắc chắn",
            }).then((result) => {
                if (result.isConfirmed) {
                    try {
                        // console.log(this.getinfoplsx._id);
                        if (this.items.length > 0) {
                            for (let i = 0; i < this.items.length; i++) {
                                if (
                                    this.items[i].ngaythuchien == "" ||
                                    this.items[i].tencn == "" ||
                                    this.items[i].sodat == ""
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
                                    return;
                                } else {
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

                        this.getSolieuLSX_ALl_cht()

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
        // Hàm update số đạt lương công đoạn
        async onUpdateCd(item) {
            // console.log(item);
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
            this.calculateTotals()
        },
        // Hàm update lương công nhật
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
        // Hàm xóa lương công đoạn
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
                            title: "Lô sản xuất đã được chốt, muốn xóa phải hủy chốt!!!",
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
        // Hàm xóa lương công nhật
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
.custom-swal {
    font-size: 6px;
    font-family: Arial, sans-serif;
}

.table_wrapper {
    /* display: block;
    overflow-x: auto; */
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
    content: '';
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
