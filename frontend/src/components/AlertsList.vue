<template>
    <div>
        Alerts
        <table>
            <tr>
                <th>Device Name</th>
                <th>Alert ID</th>
                <th>Reviewed</th>
                <th>Who Reviewed</th>
            </tr>
            <tr>
                <td>Device 1</td>
                <td>000001</td>
                <td>Pending</td>
                <td>Pending</td>
            </tr>
            <tr>
                <td>Device 2</td>
                <td>000002</td>
                <td>Reviewed</td>
                <td>M.Grant (or Emp ID)</td>
            </tr>
        </table>
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>
    table {
        font-family: arial, sans-serif;
        border-collapse: collapse;
        width: 100%;
    }

    td, th {
        border: 1px solid #dddddd;
        text-align: left;
        padding: 8px;
    }

    tr:nth-child(even) {
        background-color: #dddddd;
    }
</style>