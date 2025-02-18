<script setup lang="ts">

</script>

<template>

    <h1>How to use:</h1>
    <p>Type in your JSON template, with your given key name and value type, and let the program generate the data for you.</p>
    <table>
        <thead>
            <tr>
                <th>Type</th>
                <th>Result</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>int</td>
                <td>Returns a random integer from 0 to MAX_INTEGER_VALUE</td>
            </tr>
            <tr>
                <td>float</td>
                <td>Returns a random float that is greater than 1.0</td>
            </tr>
            <tr>
                <td>String</td>
                <td>Returns a random String of characters of values 33 - 126 in the ASCII table, and it stops generating at the first '.' generated</td>
            </tr>
            <tr>
                <td>char</td>
                <td>Returns a random character of value 33 - 126 in the ASCII table</td>
            </tr>
            <tr>
                <td>bool</td>
                <td>Returns a boolean [True | False]</td>
            </tr>
            <tr>
                <td>Anything else</td>
                <td>Returns null in case the program is not able to find the correct data type</td>
            </tr>
        </tbody>
    </table>
    <h1>Future plans:</h1>
    <p>Allow users to create arrays of certain data types ex: int[10] would create an array with 10 int values.</p>
    <p>Allow users to create data within a certain range ex: int(10:100) would return an int from 10 to 100.</p>
    <p>Allow users to use both of the above examples ex: int[10](10:100) would return an int array of 10 values from 10 to 100.</p>
    <p>Make a parser for YAML and XML with a similar syntax.</p>
</template>

<style scoped>
    textarea {
        
        width: 100%;
        height: 250px;
        resize: vertical;
        background-color: var(--color-background-soft);
        border-radius: 1%;
        border-width: .7cap;
        color: var(--color-text);
        padding: 10px;
        margin-top: 10px;
        margin-bottom: 10px;
        font-size: 18px;
    }

    table, th, td, tr {
        
        border: 5px solid var(--color-border);
        padding: 10px;
        border-collapse: collapse;
        align-items: center;
        
    }

    table{
        width: 100%;
    }
    


    .readonly{
        cursor: default;
    }
    
    button{
        align-content: left;
        height: 50px;
        border-radius: 15px;
        border-color: none;
        background-color: hsla(160, 100%, 37%, 1);
        color: var(--vt-c-white-mute);
        transition-duration: 0.5s;
        cursor: pointer;
        font-size: 20px;
    }
    .spbtw{
        display: flex;
        justify-content: space-between;
    }
    button:hover{
        
        background-color: rgb(0, 100, 67);
        color: var(--vt-c-white-mute);
        
    }
</style>
