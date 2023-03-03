<template>
    <div id="app" style="margin-left: 10px; margin-right: 10px;">
        <table class="table is-responsive is-bordered is-narrow is-fullwidth">
            <!-- <tr style="background-color: antiquewhite;">
                <td style="font-size: small; text-align: center;">
                    <input type="checkbox" v-model="openAll">
                </td>
                <td style="font-size: small; text-align: center;">
                    <input type="checkbox" v-model="closeAll">
                </td>
            </tr> -->
            <tr style="background-color: azure;">
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
                <td></td>
            </tr>
            <tr style="background-color: antiquewhite;">
                <td style="font-size: small; text-align: center; width: 3%;">ID</td>
                <td style="font-size: small; text-align: center; width: 10%;">Mã sản phẩm</td>
                <td style="font-size: small; text-align: center; width: 7%;">Mã PX</td>
                <td style="font-size: small; text-align: center; width: 7%;">Nhóm SP</td>
                <td></td>
            </tr>
            <template v-for="(row, index) in allproduct">
                <tr @click="toggleAndshow(index, row.id, row.maspkhpx, row.mapx)"
                    :class="{ opened: opened.includes(row.id) }">
                    <td style="font-size: small; text-align: center;">{{ row.id }}</td>
                    <td style="font-size: small;">{{ row.maspkhpx }}</td>
                    <td style="font-size: small; text-align: center;">{{ row.mapx }}</td>
                    <td style="font-size: small; text-align: center;">{{ row.nhomsp }}</td>
                    <td></td>
                </tr>
                <!-- v-if tức là chỉ hiện ra khi mảng openned có phần tử (ví dụ 1) trùng với row.id (tức là id trong bảng allproduct) -->
                <template v-for="(dt, index) in subData[index]">
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


                </template>

            </template>
        </table>
    </div>
</template>
 
<script>
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
        }
    },

    mounted() {
        this.showallproduct()
        this.showAllPx()
    },

    methods: {
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
}

td {
    padding: 2px;
    border: 1px solid #ccc;
}

.opened {
    background-color: aliceblue;
}
</style>




