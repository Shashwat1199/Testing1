const posts = [{title: 'Post One'},{title: 'Post Two'}];
let date;let n;let time;
function updateLastUserActivityTime (){

    return new Promise( (resolve, reject) => {
        date = new Date();

        n = date.toDateString();

        time = date.toLocaleTimeString();
           
   }) 
}
function deletePost(){
    return new Promise((resolve, reject) => {
        setTimeout( () => {
            if(posts.length > 0){
                const poppedElement  = posts.pop();
                resolve(poppedElement);
            } else {
                reject("ERROR: ARRAY IS EMPTY")
            }
        }, 1000)
    })
}

function printPost() {
         
    return new Promise((resolve, reject) => {
        posts.forEach((post) => {
            console.log(post.title)
        })
        console.log("Last Activity Time")
        console.log('Date:' + n);
        console.log('Time: ' + time);
    })  
}


function createPost() {
    return new Promise( (resolve, reject) => {
        setTimeout( () => {
            posts.push({title: 'post created'});
            updateLastUserActivityTime();
            resolve()
        }, 1000)
    }) 
}


const promise1 = createPost();
const promise2 = updateLastUserActivityTime();
Promise.all([promise1,promise2]).then(()=>{
    printPost();
})
.then(()=>{
   deletePost();
   printPost();
}) 
