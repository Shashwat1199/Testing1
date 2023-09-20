const posts = [{title: 'Post One'},{title: 'Post Two'}];
let date;let n;let time;

async function Blog(){

    const createPost = new Promise( (resolve, reject) => {
        setTimeout( () => {
            posts.push({title: 'post created'});
            resolve()
        }, 1000)
    })
    
    const updateLastUserActivityTime = new Promise( (resolve, reject) => {
       
        date = new Date();
        n = date.toDateString();
        time = date.toLocaleTimeString();

   })

    const deletePost = new Promise((resolve, reject) => {
    setTimeout( () => {
        if(posts.length > 0){
            const poppedElement  = posts.pop();
            resolve(poppedElement);
        } else {
            reject("ERROR: ARRAY IS EMPTY")
        }
    }, 1000)
})

    const printPost =  new Promise((resolve, reject) => {
        posts.forEach((post) => {
            console.log(post.title)
        })
        console.log("Last Activity Time")
        console.log('Date:' + n);
        console.log('Time: ' + time);
    }) 

    await createPost;

    await updateLastUserActivityTime;

    printPost();

    await deletePost;

    printPost();

}

