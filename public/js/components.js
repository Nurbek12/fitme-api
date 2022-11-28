const products_component = {
    template: `
        `,
    data: () => ({
        
    }),

    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'New Product' : 'Edit Product'
        },
    },

    watch: {
        dialog(val) {
            val || this.close()
        },
        dialogDelete(val) {
            val || this.closeDelete()
        },
    },

    created() {
        this.initialize()
    },

    methods: {
        filterText(_, search, item) {
            search = search.toString().toLocaleLowerCase();
            return Object.values(item).some(v => v && v.toString().toLocaleLowerCase().includes(search))
        },
        async initialize() {
            const { data } = await axios.post('/product/getallproducts', {});
            this.desserts = data.products;
        },

        editItem(item) {
            this.editItemId = item._id;
            this.editedIndex = this.desserts.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },

        deleteItem(item) {
            this.editItemId = item._id;
            this.editedIndex = this.desserts.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialogDelete = true
        },

        async deleteItemConfirm() {
            const { data } = await axios.delete(`/product/deleteproduct/${this.editItemId}`)
            if(data.status){
                this.desserts.splice(this.editedIndex, 1)
            }
            this.closeDelete()
        },

        close() {
            this.dialog = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
                this.editItemId = null
            })
        },

        closeDelete() {
            this.dialogDelete = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
                this.editItemId = null
            })
        },

        async save() {
            if (this.editedIndex > -1) {
                const { data } = await axios.put(`/product/editproduct/${this.editItemId}`, this.editedItem)
                if(data.status){
                    Object.assign(this.desserts[this.editedIndex], data.product)
                }
            } else {
                const {data} = await axios.post('/product/addnewproduct', this.editedItem);
                this.desserts.push(data.product)
            }
            this.close()
        },
    },
}

const users_component = {
    template: `<h1>users</h1>`,
    data: () => ({
        
    }),
}

const categories_component = {
    template: `<div>Categories</div>`,
    data: () => ({

    }),
}