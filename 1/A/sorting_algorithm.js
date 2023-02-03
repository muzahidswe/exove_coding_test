// Write a sorting algorithm that sorts strings based on the ASCII code of the third letter first, then second letter and then the first letter.

let words = ['BOAT', 'Locomotive', 'Poet', 'Accelerate', 'GOLF', 'ACCIDENTAL', 'Submarine'];
let words_length = words.length;

for (let i = 0; i < words_length-1; i++) {
    for (let j = 0; j < words_length-i-1; j++) {
        if (words[j][2].charCodeAt(0) > words[j+1][2].charCodeAt(0)) {
            let temp = words[j];
            words[j] = words[j+1];
            words[j+1] = temp;
        } else if (words[j][2].charCodeAt(0) == words[j+1][2].charCodeAt(0)) {
            if (words[j][1].charCodeAt(0) > words[j+1][1].charCodeAt(0)) {
                let temp = words[j];
                words[j] = words[j+1];
                words[j+1] = temp;
            } else if (words[j][1].charCodeAt(0) == words[j+1][1].charCodeAt(0)) {
                if (words[j][0].charCodeAt(0) > words[j+1][0].charCodeAt(0)) {
                    let temp = words[j];
                    words[j] = words[j+1];
                    words[j+1] = temp;
                }
            }
        }
    }
}

console.log(words);