export function getRandInt(min=0, max = 2147483647, arraySize = -1){
    return Math.round(Math.random() * (max-min)+ min)
}

export function getRandFloat(min=0, max = 2147483647){
    return Math.random() * (max-min)+ min
}

export function getRandBool(){
    return Math.round(Math.random() ) == 1 ? true : false
}

export function getRandChar(min=33, max = 126){
    return String.fromCharCode( Math.round(Math.random() * (max-min)+ min))
}

export function getRandString(){
    let str = ""
    let ch = ''
    while (ch != '.'){
        ch = getRandChar()
        str += ch
    }
    return str
}




