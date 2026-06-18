// 2-2 Access Value, nested object, Optional chaining, Dot notation vs bracket notation
const student = {
    name: 'Rafid',
    1: 50,
   'home-address': 'kochu khet',
    marks: 90
}

// dot notation
const studentName = student.name;
// bracket notation
const studentName2 = student['name']



console.log(student['home-address'])

for(const key in student){
    const value = student[key]
}

const propName = 'marks'
console.log(student[propName]) 
const student = {
    name: 'Rafid',
    1: 50,
    family: {
        title: 'bhuyiah',
        // mother: {
        //     name: 'noor jahan',
        //     age: 45
        // }
    },
   'home-address': 'kochu khet',
    marks: 90
}

// console.log(student.family.title)
console.log(student.family.mother?.age)