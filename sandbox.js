function* generate () {
    let score = 0;
    while(score<100) {
        yield score++;
    }
}


function* generate () {
    let score = 0;
    while(score<100) {
        yield score++;
    }
}

// function* generate () {
//     let count = 0
//     for (let i = 1; i< 100; i++) {
//         count += i
//         console.log(i);
//         yield i;
//     }
//     log
// }

const res = generate();

console.log(res.next());
console.log(res.next());
console.log(res.next());
console.log(res.next());
console.log(res.next());
console.log(res.next());
console.log(res.next());
console.log(res.next());
console.log(res.next());
