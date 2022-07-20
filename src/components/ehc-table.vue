            <!-- <ehc-table  
                v-model="members" 
                :headers="memberHeaders"
                :page="page"
                :totalItems="16740"
                :itemsPerPage="20"
                @pageChange="pageChange"
                :selectable="true"
                ></ehc-table>
                 -->


<template>

    <div class="ehc-Table">
        <table>
            <!--Headers-->
                <tr class="header">
                    <th v-for="(header, hindex) in headers" :key="hindex">{{header.label}}</th>
                </tr>
            <tr 
                :class="'body' +  ((selectable) ? ' selectable' : '')" 
                v-for="(row, rindex) in value" :key="rindex">
                <td v-for="(cell, cindex) in headers" :key="cindex">{{row[cell.key]}}</td>
            </tr>
        </table>
        <div class="pagination" v-if="page">
            <span class="my-auto py-auto">Showing {{this.page*this.itemsPerPage+1-this.itemsPerPage}} to {{this.page*this.itemsPerPage + this.itemsPerPage}} of {{totalItems}}</span>
            <v-pagination 
                class="mt-0 py-auto"
                v-model="pagiPage"
                :length="numberOfPages"
                :total-visible="7"></v-pagination>
        </div>

    </div>

</template>


<script>

export default {
    props: {
        headers: {type: Array},
        value: {type: Array},
        page: {type: Number, default: null},
        totalItems: {type: Number},
        itemsPerPage: {type: Number},
        selectable: {type: Boolean, default: false}
    },
    data() {
        return {
        }
    },
    computed: {

        numberOfPages()  {
            return this.totalItems/this.itemsPerPage
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





.ehc-Table {
    padding: 20px;
    background-color: #ffffff;
    border-radius: 10px;
    display: inline-block
}

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
    padding-right: 60px;
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
    padding-right: 60px;
    text-align: left;
    
    /* Black */
    color: #1D3557;
    opacity: 1;
}   


</style>
