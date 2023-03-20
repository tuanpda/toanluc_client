<template>
    <div>
        <table>
            <thead>
                <tr>
                    <th>stt</th>
                    <th>nguyencong</th>
                    <th>dongia</th>
                    <th>sodat</th>
                    <th>sohong</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in items" :key="index">
                    <td>{{ index + 1 }}</td>
                    <td>{{ item.nguyencong }}</td>
                    <td>{{ item.dongia }}</td>
                    <td>{{ item.sodat }}</td>
                    <td>{{ item.sohong }}</td>
                </tr>
                <tr v-for="(group, nguyencong) in groups" :key="nguyencong">
                    <td colspan="2">{{ nguyencong }}</td>
                    <td>{{ group.dongia }}</td>
                    <td>{{ group.sodat }}</td>
                    <td>{{ group.sohong }}</td>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <td colspan="2">sum</td>
                    <td>{{ totals.dongia }}</td>
                    <td>{{ totals.sodat }}</td>
                    <td>{{ totals.sohong }}</td>
                </tr>
            </tfoot>
        </table>
    </div>
</template>

<script>
export default {
    data() {
        return {
            items: [
                { nguyencong: "duc", dongia: 340, sodat: 100, sohong: 2 },
                { nguyencong: "duc", dongia: 340, sodat: 100, sohong: 2 },
                { nguyencong: "duc", dongia: 340, sodat: 100, sohong: 2 },
                { nguyencong: "kiem", dongia: 100, sodat: 100, sohong: 2 },
            ],
            groups: {},
            totals: {},
        };
    },
    mounted() {
        this.calculateTotals();
    },
    methods: {
        calculateTotals() {
            const groups = {};
            this.items.forEach(item => {
                if (!groups[item.nguyencong]) {
                    groups[item.nguyencong] = {
                        dongia: item.dongia,
                        sodat: item.sodat,
                        sohong: item.sohong
                    };
                } else {
                    groups[item.nguyencong].dongia += item.dongia;
                    groups[item.nguyencong].sodat += item.sodat;
                    groups[item.nguyencong].sohong += item.sohong;
                }
            });

            const totals = {
                dongia: 0,
                sodat: 0,
                sohong: 0,
            };
            this.items.forEach(item => {
                totals.dongia += item.dongia;
                totals.sodat += item.sodat;
                totals.sohong += item.sohong;
            });

            this.groups = groups;
            this.totals = totals;
        },
    },
};
</script>