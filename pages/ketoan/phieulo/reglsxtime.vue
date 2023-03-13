<template>
    <div class="table_wrapper" style="margin-right: 10px;" ref="wrapper">
        <table class="table is-responsive is-bordered is-narrow is-fullwidth" ref="table">
            <thead>
                <tr class="">
                    <th style="background-color: aliceblue; font-size: small; text-align: center;" class="headcol headcol0">
                        Mã sản phẩm
                    </th>
                    <th style="background-color: aliceblue; font-size: small; text-align: center;" class="headcol headcol1">
                        Mã PX
                    </th>
                    <th style="background-color: aliceblue; font-size: small; text-align: center;" class="headcol headcol2">
                        Nhóm SP
                    </th>
                    <th style="background-color: #f3fdec; font-size: small;" v-for="week in numberOfWeeks" :key="week">
                        Tuần {{ week }}
                        <br>
                        {{ getWeekStartDate(week) }} - {{ getWeekEndDate(week) }}
                    </th>
                </tr>
            </thead>
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
                    <td style="font-size: small;" class="headcol headcol0">{{ row.maspkhpx }}</td>
                    <td style="font-size: small; text-align: center;" class="headcol headcol1">{{ row.mapx }}</td>
                    <td style="font-size: small; text-align: center;" class="headcol headcol2">{{ row.nhomsp }}</td>
                    <td style="f ont-size: small;" v-for="day in days" :key="day">

                    </td>
                </tr>
                <!-- open row -->
                <tr style="display: none" :style="{
                    'display': !!getParent(index) ? 'table-row' :
                        'none'
                }">
                    <td class="headcol headcol0" colspan="17" style="padding: 0px 0px; background: #209cee0f;">
                        <table class="table is-responsive is-bordered is-narrow is-fullwidth">
                            <tr style="background: aliceblue;">
                                <!-- <td style=" width: 2%;"></td> -->
                                <!-- <td style="text-align: center; font-size:small; font-weight: 600; width: 3%; color: red;">
                                    STT
                                </td> -->
                                <td style="font-size:small; font-weight: 600; width: 8.2%; color: red; text-align: right;">
                                    Kế hoạch PX</td>
                                <td
                                    style="text-align: center; font-size:small; font-weight: 600; width: 6.35%; color: red;">
                                    Số
                                    lượng
                                </td>
                                <td
                                    style="text-align: center; font-size:small; font-weight: 600; width: 5.82%; color: red; text-align: right;">
                                </td>

                                <td style="font-size: small;" v-for="day in days" :key="day">

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
                                        <td style="font-size: small;" v-for="day in days" :key="day">

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
                                                        style="font-size:small; font-weight: 600; width: 8.15%; text-align: right;">
                                                        Mã lô sản xuất
                                                    </td>
                                                    <td
                                                        style="text-align: center; font-size:small; font-weight: 600; width: 6.4%;">
                                                        Số lượng</td>
                                                    <td style="width: 5.8%; font-size: small; font-weight: 600;">
                                                        Trạng thái</td>
                                                    <td style="font-size: small;" v-for="day in days" :key="day">

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
                <!-- v-if tức là chỉ hiện ra khi mảng openned có phần tử (ví dụ 1) trùng với row.id (tức là id trong bảng allproduct) -->
                <!-- <template v-for="(dt, index) in subData[index]">
                    <tr v-if="opened.includes(row.id) && openAll == false">
                        <td colspan=""></td>
                        <td style="font-size: small; text-align: center;"
                            @click="toggleShowLosx(index, dt.id, row.maspkhpx, dt.mapx, dt.makhpx)"> {{ dt.makhpx }} | {{
                                dt.soluongkhpx }}</td>
                        <td></td>
                    </tr>
                    <template v-if="openedLsx.includes(dt.id)" v-for="item in subDataLosx[index]">
                        <tr>
                            <td colspan=""></td>
                            <td style="font-size: small; text-align: center;"> {{ item.malosx }}</td>
                            <td></td>
                        </tr>
                    </template>


                </template> -->

            </template>
        </table>
    </div>
</template>

<script>
import moment from 'moment';
export default {
    name: 'YearTimeline',
    data() {
        return {
            year: 2023,
            numberOfWeeks: 52,
            months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],

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
            start: '2023-03-01',
            end: '2023-03-14',
        };
    },
    mounted() {
        this.showallproduct()
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
    methods: {
        getWeekStartDate(week) {
            const d = new Date(this.year, 0, 1);
            const dayOffset = d.getDay();
            const diff = (week - 1) * 7 - dayOffset;
            return new Date(this.year, 0, 1 + diff).toLocaleDateString();
        },
        getWeekEndDate(week) {
            const d = new Date(this.year, 0, 1);
            const dayOffset = d.getDay();
            const diff = (week - 1) * 7 - dayOffset;
            return new Date(this.year, 0, 1 + diff + 7).toLocaleDateString();
        },
        getWeeksInMonth(month) {
            const weeks = [];
            const d = new Date(this.year, month - 1, 1);
            const firstWeek = this.getWeekNumber(d);
            for (let i = firstWeek; i < firstWeek + 5; i++) {
                weeks.push(i);
            }
            return weeks;
        },
        getWeekNumber(date) {
            const onejan = new Date(date.getFullYear(), 0, 1);
            return Math.ceil(((date - onejan) / 86400000 + onejan.getDay() + 1) / 7);
        },

        // Toàn bộ mã sản phẩm load khi form được load ra.
        async showallproduct() {
            this.allproduct = await this.$axios.$get(
                `/api/lokehoach/pivotproduct`
            );
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
    }
};
</script>
<style scoped>
th,
td {
    /* border: solid black; */
}

th {
    height: 90px;
}

td {
    min-height: 19px;
    height: 33px;
}

table {
    border-collapse: collapse;
}

.headcol {
    position: absolute;
    width: 70px;
    top: auto;
}

.headcol0 {
    left: 10px;
    width: 180px;
}

.headcol1 {
    left: 189.5px;
    width: 120px;
}

.headcol2 {
    left: 309px;
    width: 120px;
}

.headcol3 {
    left: 590px;
}

.headcol4 {
    left: 520px;
}

.headcol5 {
    left: 660px;
}

.headcol6 {
    left: 420px;
    width: 100px;
}

.table_wrapper {
    overflow-x: scroll;
    margin-left: 732px;
    overflow-y: visible;
    padding: 0;
}
</style>
