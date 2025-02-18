<script setup lang="ts">
import { ref, computed } from "vue";
import parseJson, {JSONError} from 'parse-json';


const text = ref("")
const GeneratedData = ref("")
const generationError = ref("")
const copyTxt = ref("Copy to clipboard")

function getRandInt(){
    return Math.round(Math.random() * (2147483647))
}

function getRandFloat(){
    return Math.random() * (2147483647)
}

function getRandBool(){
    return Math.round(Math.random() ) == 1 ? true : false
}

function getRandChar(){
    return String.fromCharCode( Math.round(Math.random() * (126-33)+33))
}

function getRandString(){
    let str = ""
    let ch = ''
    while (ch != '.'){
        ch = getRandChar()
        str += ch
    }
    return str
}



function jsonGenerator(input:string){
    if(input.length == 0){
        input = '{"key1":"int", "key2":"String","key3":"bool","key4":"float","key5":"char", "key6":"default|unknown datatype"}'
    }
    
    
    //console.log(input)
    let parse;
    try {
	    parse = parseJson(input);
    } catch (error) {
	    if (error instanceof JSONError) {
		    error.fileName = 'Moker.vue';
	    }
        console.log(error);
        GeneratedData.value ="";
        generationError.value=""+error;
        return;
    
    }
    console.log(parse)
    const keys = Object.keys(parse)
    console.log(keys)
    const generated: {[key:string ] : any} = {};
    for (let i = 0; i < keys.length; i++){
        var val = parse[keys[i]];
        var arrSize = -1
        var min = NaN
        var max = NaN
        console.log(val)
        const firstSB = val.indexOf("[")
        const secondSB = val.indexOf("]")

        
        if (firstSB >= 0 || secondSB >= 0){
            try {
                if(firstSB < 0){
                    throw new Error("Missing \"[\" when defining an array, on key "+keys[i]+".");
                }
                else if(secondSB < 0){
                    throw new Error("Missing \"]\" when defining an array, on key "+keys[i]+".");
                }
                else if(firstSB > secondSB ){
                    throw new Error("Cloasing \"]\" going first when \"[\" should be first, on key "+keys[i]+".");
                }
                
                arrSize = parseInt(val.substring(firstSB+1, secondSB))

                if(isNaN(arrSize)){
                    throw new Error("The array size provided is not a number, on key "+keys[i]+".");
                }
                console.log(arrSize + "\t arrSize")
                var temp = val.substring(0, firstSB)
                val = temp + val.substring(secondSB+1)

            }
            catch(error){
                console.log(error);
                GeneratedData.value ="";
                generationError.value=""+error;
                return;
            }
        }

        const firstP = val.indexOf("(")
        const secondP = val.indexOf(")")
        console.log(val)
        if (firstP >= 0 || secondP >= 0){
            try {
                if(firstP < 0){
                    throw new Error("Missing \"(\" when defining an array, on key "+keys[i]+".");
                }
                else if(secondP < 0){
                    throw new Error("Missing \")\" when defining an array, on key "+keys[i]+".");
                }
                else if(firstP > secondP ){
                    throw new Error("Cloasing \")\" going first when \"(\" should be first, on key "+keys[i]+".");
                }
                
                
                var minNmax = val.substring(firstP+1, secondP)
                const comma = minNmax.indexOf(",")
                if(comma < 0){

                    min =  parseInt(minNmax)

                }else{
                    min =  parseInt(minNmax.substring(0, comma))
                    max =  parseInt(minNmax.substring(comma+1))

                    if(isNaN(max)){
                        throw new Error("The maximun value provided is not a number, on key "+keys[i]+".");
                    }   
                }
                
                console.log(minNmax + "\t minNmax")
                console.log(max+ "\t min")
                console.log(min+ "\t min")
                


                if(isNaN(min)){
                    throw new Error("The minimun value provided is not a number, on key "+keys[i]+".");
                }
                
                var temp = val.substring(0, firstP)
                val = temp + val.substring(secondP+1)
                
            }
            catch(error){
                console.log(error);
                GeneratedData.value ="";
                generationError.value=""+error;
                return;
            }
            
        }
        

        switch (val) {
            case "int":
                console.log(getRandInt())
                generated[keys[i]] = getRandInt()
                
                break;
            case "String":
                generated[keys[i]] = getRandString()
                break;

            case "bool":
                generated[keys[i]] = getRandBool()
                break;

            case "float":
                generated[keys[i]] = getRandFloat()
                break;

            case "char":
                generated[keys[i]] = getRandChar()
                break;
        
            default:
                generated[keys[i]] =null
                console.log("unknown")
                break;
        }
    }
    

    
    
    console.log(generated)
    console.log(JSON.stringify(generated, null, 2))
    generationError.value="";
    GeneratedData.value = JSON.stringify(generated, null, 2)
}
//{"awdwd":"a", "b":"int", "c": "float", "d": "bool", "e":"char","f":"String"}


function copy(){
    navigator.clipboard.writeText(GeneratedData.value);
    copyTxt.value = "Copied"
    setTimeout(reset, 1000);
}

async function reset() {
    
    copyTxt.value = "Copy to clipboard"
}
</script>

<template>
    
    
    
    <label for="input">Insert your JSON schema to generate your data</label>
    <br>
    <textarea id="input" v-model="text"  placeholder='Example:
{
    "key1":"int",
    "key2":"String",
    "key3":"bool",
    "key4":"float",
    "key5":"char",
    "key6":"default|unknown datatype"
}'>
    </textarea>
    <p>{{ generationError }}</p>
    <div class="spbtw">
    <button @click="jsonGenerator(text)">Generate data</button>
    <button @click="copy()">{{ copyTxt }}</button>
    </div>
    <textarea class="readonly" v-model="GeneratedData" readonly ></textarea>
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
