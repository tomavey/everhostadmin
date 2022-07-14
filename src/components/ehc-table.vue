<template>
    <div class="ehcTable">
        <table>
            <!--Headers-->
            <tr>
                <th foreach="(header, hindex) in headers" :key="hindex">{{header.label}}</th>
            </tr>
            <tr foreach="(row, rindex) in value" :key="rindex">
                <td foreach="(cell, cindex) in headers">{{row[cell.key]}}</td>
            </tr>
        </table>
    </div>

</template>


<script>

export default {
    props: ['headers', 'value']
    




}


</script>
