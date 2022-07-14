<template>
    <div class="ehcTable">
        <table>
            <!--Headers-->
            <tr>
                <th v-for="(header, hindex) in headers" :key="hindex">{{header.label}}</th>
            </tr>
            <tr v-for="(row, rindex) in value" :key="rindex">
                <td v-for="(cell, cindex) in headers" :key="cindex">{{row[cell.key]}}</td>
            </tr>
        </table>
    </div>

</template>


<script>

export default {
    props: ['headers', 'value']
    




}


</script>
