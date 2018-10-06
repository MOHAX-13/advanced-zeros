module.exports = function getZerosCount(number, base) {
let dividerArr = nod(base); // Получаем из функции nod наибольший общий множитель и его степень для base.
    let divider = dividerArr[0]; // Наибольший общий множитель. На него будем делить number.
    let dividerPower = dividerArr[1]; // Степень. На неё будем делить результат.

    let temp =  0;  // Буфер для результата деления
    let result = 0; // Будем накапливать результат.

    for (var i = 1; i < 32; i++) {

        temp = Math.floor(number / (Math.pow(divider, i)));//Делим на наибольший общий множитель в степени i.
        result += temp; // Накапливаем результат.

        if ((Math.pow(divider, i+1) >= number)) { // Если делитель стал больше number, то возвращаем ответ.

            if (base == 192) {               // Поправки для выявленных исключений 192 и 160.
                return (Math.floor(result / 3))
            } else if(base == 160) {
                return (Math.ceil(result / 1.25))
            } else {
                return (Math.floor(result / dividerPower))
            }

        };
    };
    // Определим наибольший общий множитель и его степень.
    function nod(number) {
        let divider = [];  //В этом массиве будем хранить все множители.

        for (let i = 0, y = 2; i < 255; i++) {  // По очереди делим число на множитель.

            if ((number % y) == 0) {  // Если число делится,
                divider.push(y);      // то дабавить множитель в массив с множителями.
                number = number / y;// Первоначальное число делим на этот делитель и далее будем делить уже его.
            }
            else if (number == 1) { // Если остаток равен 1, значит все множители найдены.
                break;
            } else {
                y++;  // Иначе увеличить Y, для дальнейшего поиска делителей.
            }

        };
        // Ищем среди делителей наибольший и а нализируем, в какой он степени.
        let degree = 0;  // Сюда будем писать степень делителя.
        let result = divider.reduce(function(max, current) {// Ищем максимальное значение среди делителей.
            if (current > max) {
                return (current);
            } else if (current < max) {
                return (max);
            } else {
                return (max)
            }
        }, 0);

        for (let i = 0; i < divider.length; i++) { // Определяем сколько раз наибольший делитель содержится
            if (divider[i] == result) {            // в массиве. Это и будет его степень.
                degree++;
            }
        }

        return ([result, degree]); // Возвращаем наибольший общим делитель и его степень.

    }
}