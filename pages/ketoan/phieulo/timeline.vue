<template>
    <div class="table_wrapper">
        <table class="table is-responsive is-bordered is-narrow is-fullwidth">
            <thead>
                <tr class="">
                    <th class="headcol headcol1">Lô KHPX</th>
                    <th class="headcol headcol2">Ngày đầu tuần</th>
                    <th class="headcol headcol3">Ngày cuối tuần</th>
                    <th class="headcol headcol4">tuần</th>
                    <!-- <th v-for="week in numberOfWeeks" :key="week">
                            Tuần {{ week }}
                            <br>
                            {{ getWeekStartDate(week) }} - {{ getWeekEndDate(week) }}
                        </th> -->
                </tr>
            </thead>
            <tbody>
                <tr class="" v-for="dt in lokehoachpx" :key="dt.id">
                    <td class="headcol headcol1" style="font-size: small;">{{ dt.malosx }}</td>
                    <td class="headcol headcol2" style="font-size: small;">{{ dt.ngaydautuan }}</td>
                    <td class="headcol headcol3" style="font-size: small;">{{ dt.ngaycuoituan }}</td>
                    <td class="headcol headcol4" style="font-size: small;">{{ dt.tuan }}</td>

                    <!-- <td v-for="week in numberOfWeeks" :key="week">

                            <template v-if="week == dt.tuan">
                                LÔ SX
                            </template>

                        </td> -->
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    name: 'YearTimeline',
    data() {
        return {
            year: 2023,
            numberOfWeeks: 52,
            months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            lokehoachpx: []
        };
    },
    mounted() {
        this.showAllLokhpx()
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

        async showAllLokhpx() {
            this.lokehoachpx = await this.$axios.$get(
                `/api/lokehoach/gettest`
            );
            this.search_timestart = ""
            this.search_timeend = ""
        },
    }
};
</script>

<style scoped>
/* th,
td {
    border: 1px solid black;
}

th {
    height: 100px;
}

td {
    min-height: 19px;
} */

table {
    border-collapse: collapse;
}

.headcol {
    position: absolute;
    width: 300px;
    top: auto;
}

.headcol1 {
    left: 8px;
}

.headcol2 {
    left: 58px;
}

.headcol3 {
    left: 108px;
}

.headcol4 {
    left: 158px;
}

.table_wrapper {
    overflow-x: scroll;
    margin-left: 200px;
    overflow-y: visible;
    padding: 0;
}
</style>
