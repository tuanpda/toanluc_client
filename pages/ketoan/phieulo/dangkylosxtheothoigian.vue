<template>
    <div id="app" style="margin-left: 10px; margin-right: 10px;">
        <table class="table is-responsive is-bordered is-narrow is-fullwidth">
            <tr style="background-color: azure;">
                <td style="width: 23.1%;" colspan="3 ">
                    <div class="control has-icons-left">
                        <div class="select is-small is-fullwidth">
                            <select @change="getWithPX($event)">
                                <option selected>-- Phân xưởng --</option>
                                <option v-for="item in phanxuong" :value="item.mapx">
                                    {{ item.mapx }} -- {{ item.tenpx }}
                                </option>
                            </select>
                        </div>
                        <span class="icon is-small is-left">
                            <i style="color: #48c78e" class="fas fa-kaaba"></i>
                        </span>
                    </div>
                </td>
                <td style="width: 6%; font-size: small; font-weight: 700;">Chọn ngày</td>
                <td style="width: 10%; font-size: small; font-weight: 600;"><input type="date" class="input is-small"
                        @change="timelinereg" v-model="chonngay"></td>
                <td></td>
                <td style="width: 5%">
                    <button @click="showallproduct" class="button is-small is-danger is-fullwidth">Refresh</button>
                </td>
            </tr>
        </table>
        <table class="table is-responsive is-bordered is-narrow is-fullwidth">
            <!-- <tr style="background-color: antiquewhite;">
                <td style="font-size: small; text-align: center;">
                    <input type="checkbox" v-model="openAll">
                </td>
                <td style="font-size: small; text-align: center;">
                    <input type="checkbox" v-model="closeAll">
                </td>
            </tr> -->
            <!-- <tr style="background-color: azure;">
                <td style="width: 15%;" colspan="3 ">
                    <div class="control has-icons-left">
                        <div class="select is-small is-fullwidth">
                            <select @change="getWithPX($event)">
                                <option selected>-- Phân xưởng --</option>
                                <option v-for="item in phanxuong" :value="item.mapx">
                                    {{ item.mapx }} -- {{ item.tenpx }}
                                </option>
                            </select>
                        </div>
                        <span class="icon is-small is-left">
                            <i style="color: #48c78e" class="fas fa-kaaba"></i>
                        </span>
                    </div>
                </td>
                <td><input type="text" class="input is-small"></td>
                <td style="width: 5%">
                    <button @click="showallproduct" class="button is-small is-danger is-fullwidth">Refresh</button>
                </td>
            </tr> -->
            <tr style="background-color: antiquewhite;">
                <!-- <td style=" width: 2%;"></td> -->
                <!-- <td style="font-size: small; text-align: center; width: 3%;">ID</td> -->
                <td style="font-size: small; text-align: center; width: 10%;">Mã sản phẩm</td>
                <td style="font-size: small; text-align: center; width: 7%;">Mã PX</td>
                <td style="font-size: small; text-align: center; width: 7%;">Nhóm SP</td>
                <td style="font-size: small; text-align: center; width: 4%;">Thêm</td>
                <td style="font-size: small; text-align: center; width: 5%;">Cập nhật</td>
                <th style="background-color: #f3fdec; font-size: small;" v-for="day in days" :key="day + 'wqeq'">
                    {{ day | formatDate }}
                </th>

            </tr>
            <template v-for="(row, index) in allproduct">
                <tr @click="watchParent(index, row)" :class="{ opened: opened.includes(row.id) }">
                    <!-- <td @click="watchParent(index, row)" :class="{ opened: opened.includes(row.id) }">
                        <div
                            style=" display: flex; gap: 10px; justify-content:space-around; align-items: center; width: 100%; height: 100%; margin-top: 5px; cursor: pointer;">
                            <span class="icon is-small is-left" style="color: #55acee">
                                <i v-if="!getParent(index)" c lass="	far fa-arrow-alt-circle-down"></i>
                                <i v-if="!!getParent(index)" class="far fa-arrow-alt-circle-left"></i>
                            </span>
                        </div>
                    </td> -->
                    <!-- <td style="font-size: small; text-align: center;">{{ row.id }}</td> -->
                    <td style="font-size: small;">{{ row.maspkhpx }}</td>
                    <td style="font-size: small; text-align: center;">{{ row.mapx }}</td>
                    <td style="font-size: small; text-align: center;">{{ row.nhomsp }}</td>
                    <td></td>
                    <td></td>
                    <td style="f ont-size: small;" v-for="day in days" :key="day">

                    </td>
                </tr>
                <!-- open row -->
                <tr style="display: none" :style="{
                    'display': !!getParent(index) ? 'table-row' :
                        'none'
                }">
                    <td colspan="17" style="padding: 0px 0px; background: #209cee0f;">
                        <table class="table is-responsive is-bordered is-narrow is-fullwidth">
                            <tr style="background: aliceblue;">
                                <!-- <td style=" width: 2%;"></td> -->
                                <!-- <td style="text-align: center; font-size:small; font-weight: 600; width: 3%; color: red;">
                                    STT
                                </td> -->
                                <td style="font-size:small; font-weight: 600; width: 9.5%; color: red; text-align: right;">
                                    Kế hoạch PX</td>
                                <td
                                    style="text-align: center; font-size:small; font-weight: 600; width: 6.84%; color: red;">
                                    Số
                                    lượng
                                </td>
                                <td style="text-align: center; font-size:small; font-weight: 600; width: 6.7%; color: red;">

                                </td>
                                <td style="text-align: center; font-size:small; font-weight: 600; width: 3.9%; color: red;">

                                </td>
                                <td
                                    style="text-align: center; font-size:small; font-weight: 600; width: 4.85%; color: red;">

                                </td>

                                <td style="font-size: small;" v-for="day in days" :key="day + 'sadsad'">

                                </td>
                            </tr>
                            <template v-if="!!(getParent(index) || []).dataChildren">
                                <template v-for="(item, indexRow) in (getParent(index).dataChildren || []) ">
                                    <tr style="background: #f3fdec;" @click="watchChildren(index, indexRow, row, item)">
                                        <!-- <td @click="watchChildren(index, indexRow, row, item)">
                                            <div
                                                style=" cursor: pointer;display: flex; gap: 10px; justify-content:space-around; align-items: center; width: 100%; height: 100%; margin-top: 5px;">
                                                <span style="color: #55acee">
                                                    <i v-if="!getChildren(index, indexRow)"
                                                        class="	far fa-arrow-alt-circle-down"></i>
                                                    <i v-if="!!getChildren(index, indexRow)"
                                                        class="	far fa-arrow-alt-circle-left"></i>
                                                </span>
                                            </div>
                                        </td> -->
                                        <!-- <td style="font-size: small; text-align: center">
                                            {{ indexRow + 1 }}
                                        </td> -->
                                        <td style="font-size: small; text-align: right;"> {{ item.makhpx }}
                                        </td>
                                        <td style="font-size: small; text-align: center">
                                            {{ item.soluongkhpx }}
                                        </td>
                                        <td></td>
                                        <td></td>
                                        <td></td>


                                        <td style="font-size: small;" v-for="day in days" :key="day + 'pop'">

                                        </td>
                                    </tr>
                                    <!-- open row children -->
                                    <tr style="display: none" :style="{
                                        'display': !!getChildren(index, indexRow) ? 'table-row' :
                                            'none'
                                    }">
                                        <td colspan="17" style="padding: 0px 0px; background: #209cee0f;">
                                            <table class="table is-responsive is-bordered is-narrow is-fullwidth">
                                                <tr style="background-color: whitesmoke">
                                                    <!-- <td
                                                        style="text-align: center; font-size:small; font-weight: 600; width: 3%; color: tan;">
                                                        STT
                                                    </td> -->
                                                    <td
                                                        style="font-size:small; font-weight: 600; width: 9.45%; text-align: right;">
                                                        Mã lô sản xuất
                                                    </td>
                                                    <td
                                                        style="text-align: center; font-size:small; font-weight: 600; width: 6.85%;">
                                                        Số lượng</td>
                                                    <td style="width: 6.75%; font-size: small; font-weight: 600;">
                                                        Trạng thái</td>
                                                    <td style="width: 3.9%; font-size: small; font-weight: 600;">

                                                    </td>
                                                    <td style="width: 4.8%; font-size: small; font-weight: 600;">
                                                    </td>
                                                    <td style="font-size: small;" v-for="day in days" :key="day + 'jfksd'">

                                                    </td>
                                                    <!-- <td
                                                        style="text-align: center; font-size:small; font-weight: 600; width: 20%; color: tan;">
                                                        soluonglsx
                                                    </td>
                                                    <td
                                                        style="text-align: center; font-size:small; font-weight: 600; width: 20%; color: tan;">
                                                        Ngày bắt đầu
                                                    </td>
                                                    <td
                                                        style="text-align: center; font-size:small; font-weight: 600; width: 20%; color: tan;">
                                                        Ngày kết thúc
                                                    </td> -->
                                                </tr>
                                                <template v-if="!!getChildren(index, indexRow) || [].dataChildren">
                                                    <template
                                                        v-if="(getChildren(index, indexRow).dataChildren || []).length > 0"
                                                        v-for="(itemChildren, indexChildren) in (getChildren(index, indexRow).dataChildren || []) ">
                                                        <tr>
                                                            <!-- <td style="font-size: small; text-align: center">
                                                                {{ indexChildren + 1 }}
                                                            </td> -->
                                                            <td style="font-size: small; text-align: right;">
                                                                {{ itemChildren.malosx }}
                                                            </td>
                                                            <td style="font-size: small; text-align: center;"> {{
                                                                itemChildren.soluongkhsx }}
                                                            </td>
                                                            <template>
                                                                <td v-if="itemChildren.status == 1"
                                                                    style="font-size: small; text-align: center; "><span
                                                                        style="color: white; font-weight: bold; background-color: red; padding-left: 7px; padding-right: 7px;">DK</span>
                                                                </td>
                                                                <td v-else-if="itemChildren.status == 2"
                                                                    style="font-size: small; text-align: center;">
                                                                    <span
                                                                        style="color: red; font-weight: bold; background-color: yellow; padding-left: 7px; padding-right: 7px;">SX</span>
                                                                </td>
                                                                <td v-else-if="itemChildren.status == 3"
                                                                    style="font-size: small; text-align: center;">
                                                                    <span
                                                                        style="color: white; font-weight: bold; background-color: green; padding-left: 7px; padding-right: 7px;">HT</span>
                                                                </td>
                                                                <td v-else style="font-size: small; text-align: center;">
                                                                </td>
                                                            </template>
                                                            <td style="text-align: center;"><a><span>
                                                                        <i style="color: #9b6dff"
                                                                            class="fas fa-clipboard-check"></i>
                                                                    </span></a></td>
                                                            <td style="text-align: center;"><a><span>
                                                                        <i style="color: #9b6dff"
                                                                            class="fa fa-check-square-o"></i>
                                                                    </span></a></td>
                                                            <td style="background-color: #f3fdec; font-size: small;"
                                                                v-for="day in days" :key="day">
                                                                <input type="text" class="input is-small">
                                                            </td>
                                                            <!-- <td style="font-size: small; text-align: center">
                                                                {{ itemChildren.soluonglsx }}
                                                            </td>
                                                            <td style="font-size: small; text-align: center">
                                                                {{ itemChildren.ngaybd | formatDate }}
                                                            </td>
                                                            <td style="font-size: small; text-align: center">
                                                                {{ itemChildren.ngaykt | formatDate }}
                                                            </td> -->

                                                        </tr>
                                                    </template>
                                                </template>
                                            </table>
                                        </td>
                                    </tr>
                                </template>
                            </template>
                        </table>
                    </td>
                </tr>
            </template>
        </table>
    </div>
</template>
 
<script>
import moment from 'moment';
export default {
    data() {
        return {
            opened: [],
            openedLsx: [],
            allproduct: [],
            groupmakhpx: {},
            grouplosx: {},
            subData: [],
            subDataLosx: [],
            loading: false,
            openAll: false,
            closeAll: false,
            phanxuong: [],
            arrParent: [],
            arrChildren: [],

            // thời gian
            chonngay: "",
            start: '',
            end: '',


        }
    },

    computed: {
        days() {
            const start = moment(this.start);
            const end = moment(this.end);
            const days = [];

            for (let date = start; date <= end; date = date.clone().add(1, 'days')) {
                days.push(date);
            }

            return days;
        }
    },

    mounted() {
        this.showallproduct()
        this.showAllPx()
        this.setnowDate()
    },

    methods: {
        // chọn ngày
        timelinereg() {
            // console.log(this.chonngay)
            this.start = this.chonngay
            const current = new Date();
            const future = new Date(current.getTime() + 12 * 24 * 60 * 60 * 1000);
            const date =
                current.getFullYear() +
                "-" +
                (current.getMonth() + 1) +
                "-" +
                current.getDate();

            const dateFuture =
                future.getFullYear() +
                "-" +
                (future.getMonth() + 1) +
                "-" +
                future.getDate();

            this.start = date;
            this.end = dateFuture
        },

        // now date
        setnowDate() {
            const current = new Date();
            const future = new Date(current.getTime() + 12 * 24 * 60 * 60 * 1000);
            const date =
                current.getFullYear() +
                "-" +
                (current.getMonth() + 1) +
                "-" +
                current.getDate();
            const dateFuture =
                future.getFullYear() +
                "-" +
                (future.getMonth() + 1) +
                "-" +
                future.getDate();

            this.start = date;
            this.end = dateFuture
        },

        async watchParent(index, data) {
            const indexValue = this.arrParent.findIndex(el => el?.key === index)
            if (indexValue > -1) {
                this.arrParent.splice(indexValue, 1)
                console.log('this.arrChildren', this.arrChildren)
                const indexTemp = this.arrChildren.filter(el => el.keyParent === index)
                console.log('indexTemp', indexTemp)
                if ((indexTemp.length || []) > 0) {
                    indexTemp.forEach(element => {
                        const indexValue = this.arrChildren.findIndex(el => el.keyParent === element.keyParent && el.keyChildren === element.keyChildren)
                        if (indexValue > -1) {
                            this.arrChildren.splice(indexValue, 1)
                            return
                        }
                    });
                }
                return
            }
            const { maspkhpx, mapx } = data
            const dataChildren = await this.$axios.$get(
                `api/lokehoach/pivotmakhpx?maspkhpx=${maspkhpx}&mapx=${mapx}`
            );
            this.arrParent.push({
                key: index,
                dataParent: data,
                dataChildren: dataChildren,
            })
        },
        async watchChildren(indexParent, indexChildren, dataParent, data) {
            const indexValue = this.arrChildren.findIndex(el => el.keyParent === indexParent && el.keyChildren === indexChildren)
            if (indexValue > -1) {
                this.arrChildren.splice(indexValue, 1)
                return
            }
            const { maspkhpx, mapx } = dataParent
            const { makhpx } = data
            const dataChildren = await this.$axios.$get(
                `/api/lokehoach/pivotlosx?masp=${maspkhpx}&mapx=${mapx}&makhpx=${makhpx}`
            );
            this.arrChildren.push({
                keyParent: indexParent,
                keyChildren: indexChildren,
                dataChildren: dataChildren,
            })
        },
        getParent(index) {
            return this.arrParent.find(el => el.key === index)
        },
        getChildren(indexParent, indexChildren) {
            if (!this.getParent(indexParent)) return null
            return this.arrChildren.find(el => el.keyParent === indexParent && el.keyChildren === indexChildren)
        },
        // Toàn bộ mã sản phẩm load khi form được load ra.
        async showallproduct() {
            this.allproduct = await this.$axios.$get(
                `/api/lokehoach/pivotproduct`
            );
        },

        // Lọc theo mã phân xưởng
        // async showallprodutc() {
        //     this.allproduct = await this.$axios.$get(
        //         `/api/lokehoach/pivotproductmapx?mapx=${}`
        //     );
        // },

        // get all phân xưởng 
        async showAllPx() {
            this.phanxuong = await this.$axios.$get(`/api/phongban/allphanxuong`);
        },

        // bấm vào chọn phân xưởng khi lọc khi lọc
        async getWithPX(e) {
            var name = e.target.options[e.target.options.selectedIndex].text;
            // console.log(name)
            let position = name.split("--");
            let p1 = position[0].trim();
            let p2 = position[1].trim();
            this.allproduct = await this.$axios.$get(
                `/api/lokehoach/pivotproductmapx?mapx=${p1}`
            );
        },

        async toggleAndshow(index, id, maspkhpx, mapx) {
            // id ở đây là id của cột id trong bảng all sản phẩm
            // console.log(id)
            // gọi api theo maspkhpx
            // kiểm tra xem mảng groupmakhpx với mã trên có tồn tại không? nếu không sẽ gọi api đó ra
            // if (!this.groupmakhpx[maspkhpx, mapx]) {
            const data = await this.$axios.$get(`/api/lokehoach/pivotmakhpx?maspkhpx=${maspkhpx}&mapx=${mapx}`);
            // console.log(data)
            this.groupmakhpx[maspkhpx, mapx] = data;
            // alert(data[0].makhpx, data[1].makhpx) 
            // }
            // gán dữ liệu nhận dc từ api đẩy vào mảng phụ subData theo chỉ mục index
            this.subData[index] = this.groupmakhpx[maspkhpx, mapx];
            // console.log(this.subData[index])
            // kiểm tra xem chỉ mục của id sẩn phẩm trong bảng sản phẩm ở vị trí bao nhiêu?
            const indexRow = this.opened.indexOf(id);
            // console.log(indexRow)
            // nếu index > -1 tức là đã có vị trí trong mảng thì sẽ tiến hành xóa nó khỏi vị trí đó
            // sau đó đóng sub-row
            if (indexRow > -1) {
                this.opened.splice(indexRow, 1)
                // console.log(this.opened)
            }
            // ngược lại chưa có thì đẩy id vào mảng openned và mở sub-row
            else {
                this.opened.push(id)
                // console.log(this.opened)
            }
            console.log(this.subDataLosx)
        },

        async toggleShowLosx(index, id, masp, mapx, makhpx) {
            // giờ phải lập luận kiểu khác để tonggle hiện ra
            // console.log(index + '-' + id + '-' + masp + '-' + mapx + '-' + makhpx)
            const data = await this.$axios.$get(`/api/lokehoach/pivotlosx?masp=${masp}&mapx=${mapx}&makhpx=${makhpx}`);
            console.log(id)
            this.grouplosx[masp, mapx, makhpx] = data;
            console.log(this.grouplosx)
            // gán dữ liệu nhận dc từ api đẩy vào mảng phụ subData theo chỉ mục index
            this.subDataLosx[index] = this.grouplosx[masp, mapx, makhpx];
            var tmptrbugcontent = ``;
            for (var i = 0; i < data.length; i++) {
                tmptrbugcontent += i + `<br/>`;
            }
            // $("#tmptrbug").html(tmptrbugcontent);
            // console.log(this.subDataLosx)
            // console.log(this.subDataLosx[index])
            // kiểm tra xem chỉ mục của id sẩn phẩm trong bảng sản phẩm ở vị trí bao nhiêu?
            const indexRowLsx = this.openedLsx.indexOf(id);
            if (indexRowLsx > -1) {
                // console.log(this.openedLsx)
                this.openedLsx.splice(indexRowLsx, 1)
                // alert(`xóa id ${id} ra khỏi mảng`) 
                console.log(this.openedLsx)
            }
            // ngược lại chưa có thì đẩy id vào mảng openned và mở sub-row
            else {
                this.openedLsx.push(id)
                // console.log(this.opened)
                // alert(`push ${id} vao mag`)
                console.log(this.openedLsx)
            }
            // console.log(this.openedLsx)
        }
    },
}
</script>

<style scoped>
table {
    width: 100%;
    border: 1px solid #ccc;
    border-collapse: collapse;
}



/* td {
    padding: 2px;
    border: 1px solid #ccc;
} */

.opened {
    background-color: aliceblue;
}


td {
    padding: 2px;
    border: 1px solid #ccc;
}
</style>




