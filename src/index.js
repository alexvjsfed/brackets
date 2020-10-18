module.exports = function check(str, bracketsConfig) {
    /*
    Каждая пара = тип скобок.
    У каждого типа есть открывающая и закрывающая.
    В строке можно найти последовательности, начинающиеся с откр и до закр.
    Эту последовательность проверить, что внутри неё всё ок.
    Всё ок, если в строке нету скобок или они правильно закрыты.
    */
    return recursCheck([str], bracketsConfig); // Рекурсивный вариант
    // Нерекурсивный вариант
    let que = [str]; // строки на проверку
    while (que.length > 0) {
        // Нахожу внутренние:
        let s = que.pop();
        let inners = findInners(s, bracketsConfig);
        if (inners === false) { // Если незакрыта открывающая скобка
            return false;
        } else { // Внешние закрыты, теперь надо проверять, что между ними
            que.push(...inners);
        }
    }
    // Если не было найдено проблемных пар, и скобок нету, значит, всё ок
    return true;
}

function findInners(str, bracketsConfig) {
    // Нахожу внешние скобки и убираю их, для каждой пары нахожу то, что находится внутри, для дальнейшей проверки.
    // Либо скобок нет в str вообще - вернет пустой массив, значит всё проверено.
    // Если есть, вернет массив, элементы которого - это то, что было внутри каждой пары скобок.
    // Если не были закрыты внешние, пусть вернёт false - значит, ошибка.
    const result = [];
    for (let i = 0; i < str.length; i++) {
        bracketLoop:
            for (const pair of bracketsConfig) {
                const [open, close] = pair;
                if (str.charAt(i) === open) { // Найдена открывающая, надо найти закрывающую
                    let n = 1; // Количество открытых скобок этого же типа
                    for (let j = i + 1; j < str.length; j++) {
                        if (str.charAt(j) === close) { // Это закрывающая
                            n--;
                        }
                        if (n === 0) { // Внешняя пара закрыта
                            result.push(str.substring(i + 1, j)) // То, что между скобками
                            i = j; // следующий за закрывающей на проверку, +1 прибавляется в i++
                            break bracketLoop;
                        }
                        if (str.charAt(j) === open) { // Это ещё одна открывающая.
                            n++;
                        }
                    }
                    // Если цикл поиска закрывающей закончился, значит либо сейчас искать новую открывающую
                    // Либо не была найдена закрывающая
                    if (n > 0)
                        return false;
                } else if (str.charAt(i) === close) {
                    // Найдена закрывающая скобка, хотя её здесь быть не должно, т.к. не было открывающей
                    return false;
                }
            }
    }
    //console.log(`${str} -> ${result}`);
    return result;
}

// Вариант с рекурсией
function recursCheck(strArr, bracketsConfig) {
    if (strArr.length === 0) {
        return true;
    } else {
        const arg = [];
        for(const str of strArr)
        {
            let inners = findInners(str, bracketsConfig);
            if(inners === false)
                return false;
            else
                arg.push(...inners);
        }
        return recursCheck(arg, bracketsConfig);
    }
}
