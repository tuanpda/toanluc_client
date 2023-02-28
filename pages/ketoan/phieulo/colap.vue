<template>
    <div id="app" style="margin-left: 10px; margin-right: 10px;">
        <table class="table is-responsive is-bordered is-narrow is-fullwidth">
            <tr style="background-color: antiquewhite;">
                <td style="font-size: small; text-align: center;">ID</td>
                <td style="font-size: small; text-align: center;">Mã sản phẩm</td>
            </tr>
            <template v-for="(row, index) in allproduct">
                <tr @click="[toggle(row.id), showgroupmakhpx(index, row.maspkhpx)]"
                    :class="{ opened: opened.includes(row.id) }">
                    <td style="font-size: small; width: 3%; text-align: center;">{{ row.id }}</td>
                    <td style="font-size: small; width: 10%;">{{ row.maspkhpx }}</td>
                    <td></td>
                </tr>
                <tr v-if="opened.includes(row.id)" v-for="(dt, index) in groupmakhpx">
                    <td style="font-size: small;" colspan="2"> {{ dt.makhpx }}</td>
                </tr>
            </template>
        </table>
    </div>
</template>

<script>
export default {
    data() {
        return {
            opened: [],
            allproduct: [],
            groupmakhpx: [],
        }
    },

    mounted() {
        this.showallprodutc()
    },

    methods: {
        toggle(id) {
            const index = this.opened.indexOf(id);
            console.log(index)
            if (index > -1) {
                this.opened.splice(index, 1)
                console.log('close')
            } else {
                this.opened.push(id)
                console.log('open')
            }
        },

        // Toàn bộ mã sản phẩm load khi form được load ra.
        async showallprodutc() {
            this.allproduct = await this.$axios.$get(
                `/api/lokehoach/pivotproduct`
            );

            // demo data
            // this.allproduct = [
            //     { id: 1, maspkhpx: "A-BDN81" },
            //     { id: 2, maspkhpx: "A-BDNSI" },
            //     { id: 3, maspkhpx: "A-BDNSIV2" },
            //     { id: 4, maspkhpx: "A-NS110" },
            //     { id: 5, maspkhpx: "A-NS152" },
            //     { id: 6, maspkhpx: "A-NS172" }
            // ]
        },

        // Phần lô kế hoạch phân xưởng sẽ được load ra sau khi bấm vào 1 sản phẩm bất kỳ nào đó
        // đoạn api trên sẽ được gọi nếu bấm vào mã sản phẩm, có biến là mã sản phẩm.
        async showgroupmakhpx(maspkhpx) {
            // console.log(index)
            this.groupmakhpx = await this.$axios.$get(
                `/api/lokehoach/pivotmakhpx?maspkhpx=${maspkhpx}`
            );

            // demo data
            // this.groupmakhpx = [
            //     { id: 1, makhpx: "2301" },
            //     { id: 2, makhpx: "2302" },
            //     { id: 3, makhpx: "2303" },
            // ]
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