<!-- <template>
    <div>
        <table>
            <thead>
                <tr>
                    <th></th>
                    <th v-for="(date, index) in days" :key="index">{{ date | formatDate }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(row, rowIndex) in rows" :key="rowIndex">
                    <td>{{ row.label }}</td>
                    <td v-for="(date, index) in days" :key="index">{{ row.dates[index] | formatDate }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import moment from 'moment';

export default {
    data() {
        return {
            start: '2023-03-01',
            end: '2023-03-14',
            rows: [
                { label: 'Row 1', dates: [] },
                { label: 'Row 2', dates: [] },
                { label: 'Row 3', dates: [] }
            ]
        };
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
        this.rows.forEach(row => {
            const dates = [];

            for (let date = moment(this.start); date <= moment(this.end); date = date.clone().add(1, 'days')) {
                dates.push(date);
            }
            row.dates = dates;
        });
    }
};
</script> -->



<template>
    <div>
        <table>
            <thead>
                <tr>
                    <th></th>
                    <th v-for="(date, index) in days" :key="index">{{ date | formatDate }}</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Ngày</td>
                    <td v-for="(date, index) in days" :key="index">{{ date | formatDate }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import moment from 'moment';

export default {
    data() {
        return {
            start: '2023-03-01',
            end: '2023-03-14',
        };
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
    }
};
</script>





