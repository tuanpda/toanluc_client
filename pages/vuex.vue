<template>
    <div>
        <button @click="createLosanxuat">Thêm</button>
        <table>
            <thead>
                <tr>
                    <th>STT</th>
                    <th>ID</th>
                    <th>Tên</th>
                    <th>Địa chỉ</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in losanxuats" :key="index + 'llllkiq'">
                    <td>{{ index + 1 }}</td>
                    <td>{{ item._id }}</td>

                    <td>
                        <input v-model="item.malosx">
                    </td>
                    <td><input :value="item.soluonglsx" @input="updateSoluonglsx(item, $event)"></td>
                    <td>
                        <button>Xóa</button>
                    </td>
                    <td>{{ item.soluonglsx }}</td>
                </tr>
            </tbody>
        </table>

    </div>
</template>
<script>
// khai báo vuex để gọi action, getter ...
import { mapState, mapActions } from 'vuex'
import { fetchLosanxuatsAPI } from '../store/losanxuat'
export default {
    data() {
        return {
            // dùng cách này để gọi state losanxuats từ trong store
            // losanxuats: this.$store.state.losanxuats

            form: {
                _id: 5,
                malosx: 'A-NS172-2301',
                soluonglsx: 100
            }
        }
    },


    // fetch({ store }) {
    //     if (store.getters['losanxuat/hasEmptyItems']) {
    //         console.log('fetching data ....')
    //         return store.dispatch('losanxuat/fetchLosanxuat')
    //     }
    // },
    // lấy thẳng trực tiếp data từ store 
    // async asyncData() {
    //     const losanxuats = await fetchLosanxuatsAPI()
    //     return { losanxuats }
    // },

    mounted() {
        // dùng để gọi action fetchLosanxuat trong vuex

        this.$store.dispatch('losanxuat/fetchLosanxuat')
    },

    computed: {
        // dùng cách này để gọi state losanxuats từ trong store bằng computed
        losanxuats() {
            return this.$store.state.losanxuat.items
        }

        // hoặc dùng mapstate để gọi store
        // ...mapState({
        //     losanxuats: (state) => state.losanxuat.items
        // })
    },

    methods: {
        createLosanxuat() {
            this.$store.dispatch('losanxuat/createLosanxuat', this.form)
        },
        // ...mapActions(["updateLsx"]),

        updateSoluonglsx(item, e) {
            // console.log(item);
            // console.log(e.target.value);
            const soluonglsx = e.target.value
            this.$store.dispatch('losanxuat/updateLosanxuat', { soluonglsx: soluonglsx, data: item })

        },

        // async updateLosanxuat(item, e) {
        //     console.log(e.target.value)
        //     this.$store.dispatch('losanxuat/updateLosanxuat', item)
        // },
    },
} </script>