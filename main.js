/*
//String
let fname='John'
const idcard='123' //ค่าคงที่

//number
let age=30
let height=150.5

fname='Tom'
idcard='456'

console.log('idcard',idcard)

console.log('name',fname)
console.log('age',age)
*/

/*
condition statement = if.else,switch
== เท่ากับ
!= ไม่เท่ากับ
> มากกว่า
>= มากกว่าเท่ากับ
< น้อยกว่า 
<= น้อยกว่าเท่ากับ
*/



/*let condition1=number1>=number2
console.log('Condition is',condition1)*/

/*
//if-else condition
if(number1>number2){
    console.log('this if')
} else if(number1==number2){
    console.log('this else-if')
}else{
    console.log('this else')
}
*/

/*Grade
>=80 A
>=70 B
>=60 C
>=50 D
*/
/*
let score=prompt('ใส่ตัวเลข')
if(score>=80){
    console.log('Grade : A')
}else if(score>=70){
    console.log('Grade : B')
}else if(score>=60){
    console.log('Grade : C')
}else if(score>=50){
    console.log('Grade : D')
}else{
    console.log('Grade : F')
}
    */

/*
&& และ
|| หรือ
! not
*/
/*
let number1 =5
let number2=10

let condition =!(number1>=3  || number2>=11)
console.log('result of condition',condition)
*/
/*
let number =20
if(number%2==0){
    console.log('You are even.')
} */

/*
//for
let counter=0
while(counter<=9){ //True
    console.log('Hi')
    counter=counter+1
}

for(let counter=0; counter<10; counter++){
    console.log('Hi')
}
    */
//array
/*
let age1=20
let age2=25
let age3=30
let ages=[20,25,30]
ages=[200,100,50]//แทนที่
console.log('age1 age2 age 3',age1,age2,age3)
console.log('array',ages)
///ต่อarray
ages.push(25)
console.log('push array',ages)
ages.pop()
console.log('pop array',ages)*/
/*
let ages=[20,20,25,30,35,45]
if(ages.includes(30)){
    console.log('มีเลข30อยู่ในarray')
}
ages.sort()
console.log(ages)

let name_list=['aa','bb','cc']
name_list.push('dd')
console.log(name_list)

name_list.pop()
console.log('pop name_list',name_list)
console.log('name_list',name_list[0])
console.log('name_list',name_list[1])
console.log('name_list',name_list[2])

for (let index=0; index<name_list.length; index++){
    console.log('name_list',name_list[index])
}*/
/*
//object
let student=[{
    age: 30,
    name:'aa',
    grade:'A'

},{
    age: 35,
    name:'bb',
    grade:'B'
}]

for(let index=0; index<student.length;index++){
console.log('Student Number',(index+1))
console.log('age',student[index].age)
console.log('name',student[index].name)
console.log('grade',student[index].grade)
}
/*
let age1=30
let name1='aa'
let grade1='A'

let age2=30
let name='bb'
let grade2='B'*/
/*
let score1=55
let score2=65
let grade=''

function calculate_grade(score){
if(score>=80){
    grade = 'A'
}else if(score>=70){
   grade = 'B'
}else if(score>=60){
    grade = 'C'
}else if(score>=50){
    grade = 'D'
}else{
    grade = 'F'
}
return grade
}
//เรียกใช้function
let grade1=calculate_grade(score1)
console.log('Grade',grade1)*/

/*
let score=[20,30,40,50]
let newScore=[]
for(let index=0; index<score.length; index++){
    console.log('score',score[index])
}
let newScore=filter((s)=>{
    if(s>=30){
        return true
    }else{
        return false
    }
})

newScore.forEach((ns)=>{
    console.log('New Score',ns)
})
score[0]=score[0]*2
score[1]=score[1]*2
score[2]=score[2]*2
score[3]=score[3]*2

score= score.map((s)=>{
    return s*2
})

score.forEach((s)=>{
    console.log('forEach Score',s)
}) */

let students=[
    {
        name:'aa',
        score:50,
        grade:'D'
    },{
        name:'bb',
        score:80,
        grade:'A'
    }
]
let student=students.find((s)=>{
    if (s.name=='aa'){
        return true
    }
})
let double_score=students.map((S)=>{
    S.score=S.score*2
    return S
})
let highSchool = students.filter((s)=>{
    if(s.school >=120){
        return true
    }
})
console.log(student)
console.log('double_score',double_score)
console.log('highScore',highSchool)
