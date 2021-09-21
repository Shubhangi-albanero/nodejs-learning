let arr = [1,2,3,4,5]
let filtered
filtered = arr.filter((a)=>{
    if(a%2==0){
        return a;
    }
}) //keep only even number
console.log(filtered)