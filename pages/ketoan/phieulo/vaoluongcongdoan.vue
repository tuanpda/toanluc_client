<template>
    <div class="columns">
        <div class="column">
            <br />
            <div class="box" style="margin-left: 20px; margin-right: 20px">
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
                        <!-- <tr style="background-color: #faf0f5;">
                            <td>
                                <div class="control has-icons-left">
                                    <div class="select is-small is-fullwidth">
                                        <select @change="getWithPX($event)">
                                            <option selected>-- Phân xưởng --</option>
                                            <option v-for="item in phanxuongsl" :value="item.mapx">
                                                {{ item.mapx }} -- {{ item.tenpx }}
                                            </option>
                                        </select>
                                    </div>
                                    <span class="icon is-small is-left">
                                        <i style="color: #48c78e" class="fas fa-kaaba"></i>
                                    </span>
                                </div>
                            </td>
                            <td>
                                <div class="control has-icons-left">
                                    <div class="select is-small is-fullwidth">
                                        <select @change="getWithTo($event)">
                                            <option selected>-- Tổ --</option>
                                            <option v-for="item in tonhomsl" :value="item.mapx">
                                                {{ item.mato }} -- {{ item.tento }}
                                            </option>
                                        </select>
                                    </div>
                                    <span class="icon is-small is-left">
                                        <i style="color: #48c78e" class="fas fa-kaaba"></i>
                                    </span>
                                </div>
                            </td>
                            <td>
                                <div class="select is-small is-fullwidth">
                                    <select id="" @change="onChange_Thang($event)">
                                        <option selected>-- Chọn tháng --</option>
                                        <option value="01">Tháng 1</option>
                                        <option value="02">Tháng 2</option>
                                        <option value="03">Tháng 3</option>
                                        <option value="04">Tháng 4</option>
                                        <option value="05">Tháng 5</option>
                                        <option value="06">Tháng 6</option>
                                        <option value="07">Tháng 7</option>
                                        <option value="08">Tháng 8</option>
                                        <option value="09">Tháng 9</option>
                                        <option value="10">Tháng 10</option>
                                        <option value="11">Tháng 11</option>
                                        <option value="12">Tháng 12</option>
                                    </select>
                                </div>
                            </td>
                            <td>
                                <div class="select is-small is-fullwidth">
                                    <select id="" @change="onChange_Nam($event)">
                                        <option selected>-- Chọn năm --</option>
                                        <option value="2022">Tháng 2022</option>
                                        <option value="2023">Tháng 2023</option>
                                        <option value="2024">Tháng 2024</option>
                                        <option value="2025">Tháng 2025</option>
                                        <option value="2026">Tháng 2026</option>
                                        <option value="2027">Tháng 2027</option>
                                        <option value="2028">Tháng 2028</option>
                                        <option value="2029">Tháng 2029</option>
                                        <option value="2030">Tháng 2030</option>
                                        <option value="2031">Tháng 2031</option>
                                        <option value="2032">Tháng 2032</option>
                                        <option value="2033">Tháng 2033</option>
                                    </select>
                                </div>
                            </td>
                            <td>
                                <button @click="getSolieuLSX" class="button is-small is-success is-fullwidth">Xem thông
                                    tin</button>
                            </td>
                            <td>
                                <button @click="getSolieuLSX_ALl_cht"
                                    class="button is-small is-danger is-fullwidth">Refresh</button>
                            </td>
                        </tr> -->
                        <!-- tìm theo điều kiện multi -->
                        <tr style="background-color: #eff5fb;">
                            <td style="width: 12%; font-size: small; font-weight: bold;">
                                <div class="icon-text">
                                    <input type="checkbox" v-model="showLuachon">
                                    <span style="color: #296fa8;">Lọc nhiều tiêu chí</span>
                                </div>
                            </td>
                            <td style="width: 15%">
                                <div class="select is-small is-fullwidth">
                                    <select id="" @change="onChange_status_chot($event)">
                                        <option selected>-- Trạng thái lô sản xuất --</option>
                                        <option value="HT">Hoàn thành</option>
                                        <option value="SX">Sản Xuất</option>
                                        <option value="DK">Đăng ký</option>
                                    </select>
                                </div>
                            </td>

                            <td colspan="5" style="font-size: small; font-weight: bold; text-align: right;"><span>Có: <span
                                        style="color: red;">{{
                                            sllosx.length }}</span> bản
                                    ghi</span></td>
                        </tr>
                        <tr v-if="showLuachon == true" style="background-color: #feecf0;">
                            <td style="width: 12%; font-size: small; font-weight: bold;">
                                <div class="icon-text">
                                    <span class="icon has-text-success">
                                        <i class="fas fa-check-square"></i>
                                    </span>
                                    <span style="color: #296fa8;">Chọn các tiêu chí lọc</span>
                                </div>
                            </td>
                            <td style="font-size: x-small;">
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
                            <!-- <td><button @click="resetOp" class="button is-small is-fullwidth"> - Refresh all phân
                                    xưởng - </button></td> -->
                            <td><input v-model="multiSearch_nhomsp" type="text" class="input is-small"
                                    placeholder="Nhóm sản phẩm"></td>
                            <td>
                                <div class="control has-icons-left">
                                    <div class="select is-small is-fullwidth">
                                        <select id="selectBox" v-model="selected">
                                            <option v-for="option in filteredOptions" :value="option.masp">
                                                {{ option.masp }}
                                            </option>
                                        </select>
                                    </div>
                                    <datalist id="options">
                                        <option v-for="option in filteredOptions" :value="option.masp"></option>
                                    </datalist>
                                    <span class="icon is-small is-left">
                                        <i style="color: #48c78e" class="fas fa-cog"></i>
                                    </span>
                                </div>
                            </td>
                            <td style="font-size: x-small;">
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
                            <td>
                                <button @click="filterData" class="button is-small is-fullwidth is-success">Lọc</button>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="table_wrapper">
                    <table class="table is-responsive is-bordered is-narrow is-fullwidth">
                        <tr style="background-color: #f4f2f8">
                            <td style="font-size: small; font-weight: bold; text-align: center;"><input type="checkbox"
                                    v-model="selectAll" /></td>
                            <td style="font-size: small; text-align: center; font-weight: 600; width: 3%">STT</td>
                            <td style="font-size: small; text-align: center; font-weight: 600; width: 10%">Mã PX
                            </td>
                            <td @click="sort('makh')"
                                style="font-size: small; text-align: center; font-weight: 600; width: 10%">KH nhà máy
                            </td>
                            <td @click="sort('makhpx')"
                                style="font-size: small; text-align: center; font-weight: 600; width: 10%">Lô KH phân
                                xưởng</td>
                            <td @click="sort('malosx')"
                                style="font-size: small; text-align: center; font-weight: 600; width: 13%">Lô sản xuất
                            </td>
                            <td @click="sort('masp')"
                                style="font-size: small; text-align: center; font-weight: 600; width: 10%">Mã SP
                            </td>
                            <!-- <td @click="sort('tensp')"
                                style="font-size: small; text-align: center; font-weight: 600; width: 17%">Tên SP
                            </td> -->
                            <td @click="sort('nhomluong')"
                                style="font-size: small; text-align: center; font-weight: 600; width: 17%">Nhóm lương
                            </td>
                            <td @click="sort('ngaybd')"
                                style="font-size: small; text-align: center; font-weight: 600; width: 5%;">Ngày bắt đầu
                            </td>
                            <td @click="sort('ngaykt')"
                                style="font-size: small; text-align: center; font-weight: 600; width: 5%;">Ngày kết thúc
                            </td>
                            <td @click="sort('soluong')"
                                style="font-size: small; text-align: center; font-weight: 600; width: 5%;">Số lượng
                            </td>
                            <td style="font-size: small; text-align: center; font-weight: 600; width: 5%;">Trạng thái
                            </td>
                            <td style="font-size: small; text-align: center; font-weight: 600; width: 5%;">Trạng thái chốt
                            </td>
                            <td style="font-size: small; text-align: center; font-weight: 600; width: 5%;">Tổng đạt
                            </td>
                            <td style="font-size: small; text-align: center; font-weight: 600; width: 5%;">Tổng hỏng
                            </td>
                            <td style="font-size: small; text-align: center; font-weight: 600; width: 5%;">Ngày hoàn
                                thành
                            </td>
                            <td style="font-size: small; text-align: center; font-weight: 600; width: 5%;">Nhập lương
                            </td>
                        </tr>
                        <tr v-for="(item, index) in sortedsllosx" :key="index + 'llllkiq'"
                            :class="{ highlight: item._id == phieulosx }">
                            <td style="text-align: center">
                                <input v-model="selected" :value="item" type="checkbox" />
                            </td>
                            <td style="font-size: small; text-align: center; background-color: #effaf5;">{{ index + 1 }}
                            </td>
                            <td style="font-size: small; background-color: #effaf5;">{{ item.mapx }}</td>
                            <td style="font-size: small; background-color: #effaf5;">{{ item.makh }}</td>
                            <td style="font-size: small; background-color: #effaf5;">{{ item.makhpx }}</td>
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
                            <td style="font-size: small; text-align: center; background-color: #effaf5;">{{
                                item.ngaykt | formatDate
                            }}</td>
                            <td style="font-size: small; text-align: center; background-color: #effaf5;">{{
                                item.soluong
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
                            <td style="font-size: small; text-align: center;">{{ item.stopday_losx | formatDate }}</td>
                            <td style="font-size: small; text-align: center;">
                                <a @click="vaoPhieuluong(item)"><span>
                                        <i style="color: #9b6dff" class="fa fa-check-square-o"></i>
                                    </span></a>

                            </td>
                        </tr>
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
                <br />
                <label class="checkbox">
                    <input type="checkbox" v-model="checkViewluong">
                    <span>Chi tiết lương tại lô sản xuất có mã: </span> <span style="color: red; font-weight: 500">{{
                        getinfoplsx.malosx
                    }}</span> <span style="font-weight: 500"> - {{ getinfoplsx.tenpx }} - {{
    getinfoplsx.mapx
}}</span> | <span style="font-weight: 500; color: blue">Mã kế hoạch: {{
    getinfoplsx.makh
}}</span> | <span style="font-weight: 500; color: green">Mã kế hoạch PX: {{
    getinfoplsx.makhpx
}}</span>
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
                            <tr v-for="(item, index) in pageOfitems_cd" :key="index + 'ppp'">
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
                        <div style="text-align: right">
                            <jw-pagination :pageSize="10" :items="allluongcongdoan" @changePage="onChangePage_CD">

                            </jw-pagination>
                        </div>
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
                            <tr v-for="(item, index) in pageOfitems_cn" :key="index + 'ppp'">
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
                        <div style="text-align: right">
                            <jw-pagination :pageSize="10" :items="allluongcongnhat" @changePage="onChangePage_CN">

                            </jw-pagination>
                        </div>
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
                                                <td style="font-size: small; font-weight: bold;">{{ getinfoplsx.makhpx }}
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
                                                <td colspan="10" style="font-weight: bold; font-size: small">
                                                    Cập nhật công đoạn lương trong lô sản xuất
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colspan="10">
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
                                                    Xóa
                                                </td>
                                            </tr>
                                            <!-- v-if="isphanxuong == 1" -->
                                            <tr v-if="iscongdoan == 1" v-for="(item, index) in items" :key="index + 'cm-a'">
                                                <td style="text-align: center; font-size: small; font-weight: bold;">
                                                    {{ index + 1 }}
                                                </td>
                                                <td style="font-size: small; font-weight: bold;">
                                                    <!-- <div class="select is-small is-fullwidth">
                                                        <select v-model="item.nguyencong" @change="
                                                            getinfoNguyencong(
                                                                $event,
                                                                $event.target.selectedIndex,
                                                                index
                                                            )
                                                        ">
                                                            <option v-for="(item, indexdmnc) in dmnguyencong"
                                                                :key="indexdmnc" :value="item.congdoan">
                                                                {{ item.congdoan }} -- {{ item.dongia }}
                                                            </option>
                                                        </select>
                                                    </div> -->
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
                                                <td><input type="date" class="input is-small" v-model="item.ngaythuchien">
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
                                                <td colspan="7" style="font-size: small;">Tổng đạt / tổng hỏng</td>
                                                <td style="font-size: small; font-weight: 600; text-align: center;"><input
                                                        v-model.trim="tongdatinlo" type="text" class="input is-small"></td>
                                                <td style="font-size: small; font-weight: 600; text-align: center;"></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td colspan="10">
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
            tonhomsl: [],
            phanxuongsl: [],
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
            pageOfitems: [],
            pageOfitems_cd: [],
            pageOfitems_cn: [],
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
            yourCondition: true,
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
            showLuachon: false,
            options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
            selectedOptions: [],
            Options_status: [],
            isOpen: false,
            isOpenst: false,
            statusArr: [{ masta: 1, tensta: "DK" }, { masta: 2, tensta: "SX" }, { masta: 3, tensta: "HT" }],
            multiSearch_masp: "",
            multiSearch_nhomsp: "",

            // xử lý select mã sản phẩm
            selected: '',
            search: '',
            maspinlosanxuat: [],

            // lọc talble
            currentSort: 'mapx',
            currentSortDir: 'asc',
            pageSize: 10,
            currentPage: 1,
            filter: '',
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
        this.get_phanxuong_solieu();
        this.getMalosx();
        this.get_kehoach();
        this.getSolieuLSX_ALl_cht()
        this.deleteRow(0);
        this.deleteRowCn(0);
        this.maspinlsx()
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
                return this.sllosx
                    ? this.selected.length == this.showlsxpx.length
                    : false;
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
        filteredsllosx() {
            return this.sllosx.filter(c => {
                if (this.filter == '') return true;
                return c.name.toLowerCase().indexOf(this.filter.toLowerCase()) >= 0;
            })
        },
        sortedsllosx() {
            return this.filteredsllosx.sort((a, b) => {
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
        },
        filteredOptions() {
            return this.maspinlosanxuat.filter(option =>
                option.masp.toLowerCase().includes(this.search.toLowerCase())
            );
        }
    },

    watch: {
        filter() {
            console.log('reset to p1 due to filter');
            this.currentPage = 1;
        }
    },

    methods: {
        onChangePage(pageOfitems) {
            this.pageOfitems = pageOfitems
        },
        onChangePage_CD(pageOfitems_cd) {
            this.pageOfitems_cd = pageOfitems_cd
        },
        onChangePage_CN(pageOfitems_cn) {
            this.pageOfitems_cn = pageOfitems_cn
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
            this.namlsx = current.getFullYear();
            this.form.createdAt = date + " " + time;
            this.form.excutedAt = date + " " + time
        },

        codeAndNameAndDesc(item) {
            return `${item.mapx} - ${item.mavt} - ${item.tenvt}`;
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

        async onChange_status_chot(e) {
            var id = e.target.value;
            var name = e.target.options[e.target.options.selectedIndex].text;
            // console.log('id ', id);
            console.log(id);

        },

        // tìm lọc số liệu lô sản xuất
        async getSolieuLSX() {
            this.sllosx = await this.$axios.$get(
                `/api/ketoan/getlosxtheoky?mapx=${this.maxuong}&nam=${this.namsl}&thang=${this.thangsl}`
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

        // Show all Lo sản xuất vào lương
        async getSolieuLSX_ALl_cht() {
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

        onChange_Thang(e) {
            var id = e.target.value;
            var name = e.target.options[e.target.options.selectedIndex].text;
            // console.log('id ', id);
            // console.log('name ',name );
            this.thangsl = id;
        },

        onChange_Nam(e) {
            var id = e.target.value;
            // var name = e.target.options[e.target.options.selectedIndex].text;
            // console.log('id ',id );
            // console.log('name ',name );
            this.namsl = id;
        },

        onChange_pageSize(e) {
            var id = e.target.value;
            // var name = e.target.options[e.target.options.selectedIndex].text;
            // console.log('id ',id );
            // console.log('name ',name );
            this.pageSize = id;
        },

        async getWithPX(e) {
            this.mato = "";
            var name = e.target.options[e.target.options.selectedIndex].text;
            // console.log(name)
            let position = name.split("--");
            let p1 = position[0].trim();
            let p2 = position[1].trim();
            this.maxuong = p1;
            this.tenxuong = p2;
            this.tonhomsl = await this.$axios.$get(
                `/api/phongban/alltoinxuong?mapx=${p1}`
            );
        },

        async getWithTo(e) {
            // console.log(this.mapx)
            var name = e.target.options[e.target.options.selectedIndex].text;
            // console.log(name)
            let position = name.split("--");
            let p1 = position[0].trim();
            let p2 = position[1].trim();
            this.mato = p1;
            this.tento = p2;
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

        // get all phân xưởng tim kiem so lieu mo
        async get_phanxuong_solieu() {
            this.phanxuongsl = await this.$axios.$get(`/api/phongban/allphanxuong`);
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
                    sohong: "",
                    ghichu: "",
                    stopday_losx: "",
                    status: 0,
                    ngaythuchien: "",
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

            // console.log(this.items)

        },

        deleteRow(index) {
            this.items.splice(index, 1);
        },

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

        async maspinlsx() {
            this.maspinlosanxuat = await this.$axios.$get('/api/lokehoach/hmsanphamlosanxuat')
        },

        // lọc nhiều tiêu chí
        async filterData() {
            // console.log(this.selectedOptions)
            // console.log(this.Options_status)
            this.isOpen = false
            this.isOpenst = false

            const mapxList = this.selectedOptions
            const masp = this.selected
            const status = this.Options_status


            // chọn lọc full
            if (this.selectedOptions.length > 0 && this.Options_status.length > 0 && this.selected != "") {
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
            else if (this.selectedOptions.length > 0 && !this.Options_status.length && this.selected == "") {
                this.lokehoachpx = await this.$axios.$get(
                    `/api/lokehoach/filteronlymapxlosanxuat`, {
                    params: {
                        mapx: mapxList,
                    },
                }
                );
            }
            // chỉ có mã px và mã sp
            else if (this.selectedOptions.length > 0 && !this.Options_status.length && this.selected != "") {
                this.lokehoachpx = await this.$axios.$get(
                    `/api/lokehoach/filteronlymapxandmasplosanxuat`, {
                    params: {
                        mapx: mapxList,
                        masp: masp
                    },
                }
                );
            }
            // chỉ có mã px và status
            else if (this.selectedOptions.length > 0 && this.Options_status.length > 0 && this.selected == "") {
                this.lokehoachpx = await this.$axios.$get(
                    `/api/lokehoach/filteronlymapxandstatuslosanxuat`, {
                    params: {
                        mapx: mapxList,
                        status: status
                    },
                }
                );
            }
            // lọc mỗi trạng thái
            else if (!this.selectedOptions.length && this.Options_status.length > 0 && this.selected == "") {
                this.lokehoachpx = await this.$axios.$get(
                    `/api/lokehoach/filteronlystatuslosanxuat`, {
                    params: {
                        status: status
                    },
                }
                );
            }

            // lọc mỗi mã sản phẩm
            else if (!this.selectedOptions.length && !this.Options_status.length && this.selected != "") {
                this.lokehoachpx = await this.$axios.$get(
                    `/api/lokehoach/filteronlymasplosanxuat`, {
                    params: {
                        masp: masp
                    },
                }
                );
            }

            // lọc sản phẩm + trạng thái
            else if (!this.selectedOptions.length && this.Options_status.length > 0 && this.selected != "") {
                this.lokehoachpx = await this.$axios.$get(
                    `/api/lokehoach/filteronlymaspandstatuslosx`, {
                    params: {
                        masp: masp,
                        status: status
                    },
                }
                );
            }

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

        // hủy từng phiếu
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

        // hủy chốt toàn bộ phiếu
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

        // Bấm vào mã lô sản xuất sẽ ra thông tin lương đã nhập
        async getInfoLosx(infoPhieulo) {
            // this.isActive = true;
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

            this.allluongcongdoan = await this.$axios.$get(
                `/api/ketoan/getallluongcongdoaninlsx?_id_losx=${infoPhieulo._id}`
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

        // thử cho cập nhật đồng thời để update newest cho tổng hỏng. dkm
        async updateImdi() {
            const tonghong = await this.$axios.$get(
                `/api/ketoan/sumtonghong?_id_losx=${this.getinfoplsx._id}`
            );

            let j = tonghong[0].tonghong
            this.tonghonginlo = j

            // console.log(this.tonghonginlo)
            let sumhong = this.tonghonginlo
            let sumdat = this.tongdatinlo
            // console.log(`mã lô: ${this.showlsxpx[i]._id} có tổng hỏng là: ${sumhong}`)
            let dt = { tonghong: sumhong, tongdat: sumdat }
            this.$axios.$patch(
                `/api/ketoan/updatetonghong?_id=${this.getinfoplsx._id}`,
                dt
            );

            // refresh table luong cong doan da thuc hien
            this.allluongcongdoan = []
            this.allluongcongnhat = []
            // console.log(this.getinfoplsx)
            if (this.mapx != '' & this.namsl != '' & this.thangsl != '') {
                // console.log('px')
                this.sllosx = await this.$axios.$get(
                    `/api/ketoan/getlosxtheoky?mapx=${this.getinfoplsx.mapx}&nam=${this.namsl}&thang=${this.thangsl}`
                );
            } else {
                // console.log('no px')
                this.sllosx = await this.$axios.$get(
                    `/api/ketoan/getallphieulocht`
                );
            }

        },

        taophieuluong() {
            if (this.items.length > 0) {
                for (let i = 0; i < this.items.length; i++) {
                    this.$axios.$post(
                        "/api/ketoan/addluongcongdoan",
                        this.items[i]
                    );
                }
            }
        },

        // create phiếu trong model popup
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
                                    this.items[i].tencn == ""
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

                        // this.$axios.$get(`/api/ketoan/getallluongcongdoaninlsx?makh=${this.form.makh.trim()}&makhpx=${this.form.makhpx.trim()}&malosx=${this.form.malosx.trim()}&mapx=${this.form.mapx.trim()}`)
                        //     .then(resp => {
                        //         // console.log(resp);
                        //         this.allluongcongdoan = resp
                        //     })
                        //     .catch(err => {
                        //         // Handle Error Here
                        //         console.error(err);
                        //     });

                        // this.$axios.$get(`/api/ketoan/getallluongcongnhatinlsx?makh=${this.form.makh.trim()}&makhpx=${this.form.makhpx.trim()}&malosx=${this.form.malosx.trim()}&mapx=${this.form.mapx.trim()}`)
                        //     .then(resp => {
                        //         // console.log(resp);
                        //         this.allluongcongnhat = resp
                        //     })
                        //     .catch(err => {
                        //         // Handle Error Here
                        //         console.error(err);
                        //     });


                        this.updateImdi()
                        // this.getSolieuLSX()

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
}

.select-options.open {
    display: block;
}
</style>
