// 1180 munites -> 18:20 

export function convertMinutesToHourString(minutesAmount:number) {
    const hours = Math.floor(minutesAmount / 60); //arredondando para - 
    const minutes = minutesAmount % 60; // % operador de resto da divisao

    return `${String(hours).padStart(2,'0')}:${String(minutes).padStart(2,'0')}`; // adiciona o 0 na frente no numero de houras caso o numero de horas nao tenha 2 caracteres
}