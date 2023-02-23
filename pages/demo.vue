


<template>
    <div id="app">

        <input type="search" v-model="filter">
        <input type="text" v-model="pageSize">
        <table class="table is-responsive is-bordered is-narrow is-fullwidth">

            <tr>
                <th @click="sort('mapx')">Mã phân xưởng</th>
                <th @click="sort('makh')">Mã kế hoạch</th>
                <th @click="sort('malosx')">Mã lô sản xuất</th>
                <th @click="sort('masp')">Mã sản phẩm</th>
            </tr>

            <tr v-for="cat in sortedsllosx">
                <td>{{ cat.mapx }}</td>
                <td>{{ cat.makh }}</td>
                <td>{{ cat.malosx }}</td>
                <td>{{ cat.masp }}</td>
            </tr>

        </table>
        <p style="text-align: right">
            <button class="button is-info is-small" @click="prevPage">Previous</button>
            <button class="button is-info is-small" @click="nextPage">Next</button>
        </p>

        debug: sort={{ currentSort }}, dir={{ currentSortDir }}, page={{ currentPage }}
    </div>
</template>

<script>
export default {
    data() {
        return {
            sllosx: [],
            currentSort: 'mapx',
            currentSortDir: 'asc',
            pageSize: 5,
            currentPage: 1,
            filter: ''
        }
    },
    mounted() {
        this.getSolieuLSX_ALl_cht()

    },
    // created: function () {
    //     fetch('http://localhost:8080/api/ketoan/getallphieulocht')
    //         .then(res => res.json())
    //         .then(res => {
    //             this.sllosx = res;
    //         })
    // },
    methods: {
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

        async getSolieuLSX_ALl_cht() {
            this.sllosx = await this.$axios.$get(
                `/api/ketoan/getallphieulocht`
            );
        },

    },
    watch: {
        filter() {
            console.log('reset to p1 due to filter');
            this.currentPage = 1;
        }
    },
    computed: {
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
        }
    }
}
</script>

<style scoped lang="css">
td,
th {
    padding: 5px;
}

th {
    cursor: pointer;
}
</style>
