<template>
    <div>
        <h1>Clienti Attivi</h1>
        <div class="input-group mb-3">
            <input @keydown="resetPage" class="form-control" placeholder="cerca in tabella..." v-model="search">
            <div class="input-group-append">
                <button @click="search = ''" class="btn btn-outline-secondary" type="button">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </div>
        </div>
        <div class="table-responsive">
            <table class="table table-striped table-hover">
                <thead class="bg-dark text-white">
                    <tr>
                        <th v-for="(header, i) in columnHeaders" :key="i" @click="sort(header)">
                            {{ header }}
                            <span v-if="header === currentSortCol">
                                <i :class="[currnetSortDir === 'asc' ? 'fas fa-arrow-up' : 'fas fa-arrow-down']">
                                </i>
                            </span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="customer in paginatedCustomers" :key="customer.codiceCliente">
                        <td>
                            <button class="btn-primary btn-sm" @click="viewDivisions(customer)">{{
                                customer.codiceCliente
                            }}</button>
                        </td>
                        <td>{{ customer.ragioneSociale }}</td>
                        <td>{{ customer.provincia }}</td>
                        <td>{{ customer.indirizzo }}</td>
                    </tr>
                    <tr v-if="paginatedCustomers.length === 0">
                        <td colspan="4">
                            <div class="alert alert-warning">
                                <strong>Attenzione!</strong> Nessun cliente trovato
                            </div>
                        </td>
                    </tr>
                </tbody>
                <tfoot>
                    <div>
                        <button class="btn-sm btn-dark" :disabled="pageNumber === 0"
                            :style="pageNumber === 0 ? { opacity: 0.5 } : ''" @click="prevPage">
                            <i class="fas fa-backward"></i>
                        </button>

                        <span style="font-weight:bold;">{{ pageNumber + 1 }}/{{ pageCount }}</span>

                        <button class="btn-sm btn-dark" :disabled="pageNumber + 1 === pageCount"
                            :style="pageNumber + 1 === pageCount ? { opacity: 0.5 } : ''" @click="nextPage">
                            <i class="fas fa-forward"></i>
                        </button>
                    </div>
                </tfoot>
            </table>
        </div>
    </div>
</template>

<script>
export default {
    name: "customer-list",
    data() {
        return {
            pageNumber: 0,
            search: "",
            columnHeaders: [
                "codiceCliente",
                "ragioneSociale",
                "provincia",
                "indirizzo"
            ],
            currnetSortDir: "asc",
            currentSortCol: "codiceCliente"
        };
    },
    props: {
        customers: {
            type: Array,
            required: true
        }
    },
    methods: {
        viewDivisions(customer) {
            this.$router.push(`/clienti/${customer.codiceCliente}`);
        },
        resetPage() {
            this.pageNumber = 0;
        },
        nextPage() {
            this.pageNumber++;
        },
        prevPage() {
            this.pageNumber--;
        },
        sort(col) {
            this.pageNumber = 0;

            if (this.currentSortCol === col) {
                this.currentSortDir = this.currentSortDir === "asc" ? "desc" : "asc";
            } else {
                this.currentSortCol = col;
            }
            this.customers.sort(this.sortBy(col, this.currentSortDir));
        },
        sortBy(property, order) {
            this.currnetSortDir = order;
            return function (a, b) {
                const varA =
                    typeof a[property] === "string"
                        ? a[property].toUpperCase()
                        : a[property];
                const varB =
                    typeof b[property] === "string"
                        ? b[property].toUpperCase()
                        : b[property];

                let comparison = 0;
                if (varA > varB) comparison = 1;
                else if (varA < varB) comparison = -1;
                return order === "desc" ? comparison * -1 : comparison;
            };
        }
    },
    computed: {
        pageCount() {
            return Math.ceil(this.filteredCustomers.length / 10);
        },
        paginatedCustomers() {
            const start = this.pageNumber * 10;
            const end = start + 10;
            return this.filteredCustomers.slice(start, end);
        },
        filteredCustomers() {
            return this.customers.filter(c => {
                if (
                    c["codiceCliente"].toLowerCase().indexOf(this.search.toLowerCase()) >
                    -1 ||
                    c["ragioneSociale"].toLowerCase().indexOf(this.search.toLowerCase()) >
                    -1 ||
                    c["provincia"].toLowerCase().indexOf(this.search.toLowerCase()) >
                    -1 ||
                    c["indirizzo"].toLowerCase().indexOf(this.search.toLowerCase()) > -1
                )
                    return c;
            });
        }
    }
};
</script>

<style lang="scss" scoped>
th {
    cursor: pointer;

    &:hover {
        text-decoration: underline;
    }
}

.form-control:focus {
    box-shadow: inset 0 -1px 0 #ddd;
    border-bottom: solid 1px #6c757d;
    transition: all .2s;
}
</style>