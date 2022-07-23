            <!-- <ehc-table  
                :items="members" 
                :headers="memberHeaders"
                @click:row="rowClick"
                :page="page"
                :totalItems="16740"
                :itemsPerPage="20"
                @pageChange="pageChange"
                :selectable="true"
                pagination="manual"  --could  'manual' or 'auto'
                ></ehc-table>
                 -->


<template>

    <div class="ehc-Table">
        <table>
            <!--Headers-->
            <tr class="header">
                <template v-for="(header, hindex) in headers">
                    <th :key="hindex" :class="(header.sortable) ? 'sortable' : ''" @click="toggleSort(header.value)">{{header.text}}</th>  
                </template>

            </tr>
            <tr class="loading" v-if="loading">
                <td :colspan="headers.length">
                    <v-progress-linear
                        height="30"
                        indeterminate
                        color="#edd4f0"
                    ></v-progress-linear>
                </td>
            </tr>
            <tr @click="$emit('click:row', row)" :class="'body' +  ((selectable) ? ' selectable' : '')"
                v-for="(row, rindex) in displayItems" :key="rindex">
                <td v-for="(cell, cindex) in headers" :key="cindex">{{row[cell.value]}}</td>
            </tr>
        </table>
        <div class="pagination" v-if="pagination === 'manual'">
            <span class="my-auto py-auto">Showing {{this.page*this.itemsPerPage+1-this.itemsPerPage}} to
                {{this.page*this.itemsPerPage + this.itemsPerPage}} of {{totalItems ? totalItems : 'unknown'}}</span>
            <v-pagination class="mt-0 py-auto" v-model="pagiPage" :length="(numberOfPages)" :total-visible="5">
            </v-pagination>
        </div>
        <div class="pagination" v-if="pagination === 'auto'">
            <span class="my-auto py-auto">Showing {{this.pageNumber*this.itemsPerPage+1-this.itemsPerPage}} to
                {{this.pageNumber*this.itemsPerPage}} of {{filteredItems.length }}</span>
            <v-pagination class="mt-0 py-auto" v-model="pageNumber"
                :length="Math.ceil(filteredItems.length / itemsPerPage)" :total-visible="7">
            </v-pagination>
        </div>


    </div>

</template>


<script>

export default {
    props: {
        headers: {type: Array},
        items: {type: Array},
        page: {type: Number, default: null},
        totalItems: {type: Number, default: null},
        itemsPerPage: {type: Number, default: null},
        selectable: {type: Boolean, default: false },
        pagination: { type: String, default: null },
        search: { type: String, default: '' },
        loading: {type: Boolean, default: false}
    },
    data() {
        return {
            pageNumber: 1,
            filteredItems: [],
            sortedItems: [],
            displayItems: [],
            sortDirection: null,
            sortKey: null,
        }
    },
    methods: {
        toggleSort(key) {
            const Dir = this.sortDirection

            if (Dir === 'asc') {
                this.sortDirection = 'desc'
            } else if (Dir == 'desc') {
                this.sortDirection = null
            } else {
                this.sortDirection = 'asc'
            }
            this.sortKey = key
            this.sortedItems = this.sortItems(this.filteredItems)
        },
        sortItems(passedArray) {
            const direction = this.sortDirection
            const key = this.sortKey
            const array = [
                ...passedArray
            ]

            if (key == null || direction == null) {
                console.log('no sort')
                return array
            } else {
                console.log("sortItem", key, direction)
                // https://www.sitepoint.com/sort-an-array-of-objects-in-javascript/
                function compare(a, b) {

                    // check if the key exists
                    if (!(key in a)) { a[key] = '' }
                    if (!(key in b)) { b[key] = '' }
                    // Use toUpperCase() to ignore character casing
                    // console.log("a b", a, b)
                    const bandA = a[key].toUpperCase();
                    const bandB = b[key].toUpperCase();

                    let comparison = 0;
                    if (bandA > bandB) {
                        comparison = 1;
                    } else if (bandA < bandB) {
                        comparison = -1;
                    }
                    if (direction === 'asc') {
                        return comparison;
                    } else {
                        return comparison * -1;
                    }
                }
                
                let sortedArray = array.sort(compare);

                return sortedArray;
            }
        },
        filterItems(items, search) {
            
            if (search != '' && search != null) {
                let filtered = items.filter(item => {
                    let searchable = ""
                    // TODO: verify this doesn't need to be async or something
                    Object.keys(item).forEach(key => { //combines all keys in object into one string to search
                        searchable = searchable + " "  +  item[key]
                    })

                    return searchable.includes(search) 
                })
                return filtered
            } else {
                return items
            }
        },
        paginateItems(array) {
            if (this.pagination != 'auto') {return array}
                const pageSize = this.itemsPerPage
                const pageNumber = this.pageNumber

            return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
        }
    },
    mounted() {
        this.filteredItems = this.filterItems(this.search)
    },
    watch: {
        
        page(val) {
            this.pageNumber = val
        },
        pageNumber(val) {
            if (this.page != val) { this.$emit('pageChange', val) }
            this.displayItems = this.paginateItems(this.sortedItems)
        },


        // items =filterItems> filteredITems =sortItems=> sortedItems =paginateItems=> displayItems
        items(val) {
            console.log("items", val)
            this.filteredItems = this.filterItems(val, this.search)
        },
        filteredItems(val) {
            console.log("filteredItems", val)
            this.sortedItems = this.sortItems(val)
        },
        sortedItems(val) {
            console.log("sortedItems", val)
            this.displayItems = this.paginateItems(val)
        },
        displayItems(val) {
            console.log("displayItems", val)
        },


        search(val) {
            this.pageNumber = 1
            this.filteredItems = this.filterItems(this.items, val)
        },


        
    },
    computed: {
        paginationLength() {
            return 
        },
        numberOfPages() {
            // if (this.pagination == 'auto') {
            //     return this.items.length/this.itemsPerPage
            // }
            return this.totalItems ? this.totalItems/this.itemsPerPage : 0
        },  
        pagiPage: {
            get() {
                return this.page
            },
            set(val) {
                console.log("pageChange", val)
                this.$emit("pageChange", val)
            }
        }
    }
}


</script>

<style>

.ehc-Table .loading td {
    padding-top:2px;
    padding-bottom: 2px;
    padding-left: 0px;
    padding-right: 0px;
    
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    border-top-right-radius: 5px;
}

.ehc-Table .sortable{
    cursor: pointer;
}

.ehc-Table .sortable:hover {
    color: #1d3557;
}



.ehc-Table .pagination {
    margin-top: 20px;
    
    color: #536D91;
    overflow: hidden;
}

.ehc-Table .pagination span {
    float: left;
    padding-top: 12px;
    padding-bottom: 12px;
}
.ehc-Table .pagination nav {
    float: right;
}





/* .ehc-Table {
    padding: 20px;
    background-color: #ffffff;
    border-radius: 10px;
    display: inline-block
} */

.ehc-Table tr.header {
        /* Rectangle 23 */
    background-color: #eef0f4;
}

.ehc-Table th:first-child, .ehc-Table td:first-child {
    border-top-left-radius: 5px; 
    border-bottom-left-radius: 5px;
}
.ehc-Table th:last-child, .ehc-Table td:last-child {
    border-bottom-right-radius: 5px; 
    border-top-right-radius: 5px; 
}



.ehc-Table table {
  border-collapse: collapse;
}

.ehc-Table tr { border: none; }
.ehc-Table td, .ehc-Table th{
  border-right: solid 2px #dfe3ea; 
}
.ehc-Table td:last-child, .ehc-Table th:last-child{
  border-right:  0px; 
}


.ehc-Table th {
    font-family: 'Sailec';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 120%;
    /* identical to box height, or 17px */

    padding-top: 11px;
    padding-bottom: 12px;
    padding-left: 10px;
    padding-right: 10px;
    text-align: left;
    
    /* Black */
    color: #5c6d86;
    opacity: 1;
}   

.ehc-Table tr.selectable:hover, .ehc-Table tr.selectable:hover td  {
    background-color: #edd4f0 !important; 
    border-right: solid 2px white ;
}


.ehc-Table tr.header:nth-child(odd) {
    background-color: #eef0f4;
}

.ehc-Table tr.body:nth-child(odd) {
    background-color: #f3f5f7;
}

.ehc-Table td {
    font-family: 'Sailec';
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 120%;
    /* identical to box height, or 17px */

    padding-top: 15px;
    padding-bottom: 15px;
    padding-left: 10px;
    padding-right: 10px;
    text-align: left;
    
    /* Black */
    color: #1D3557;
    opacity: 1;
}   


</style>
