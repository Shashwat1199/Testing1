const forms = document.querySelector(".forms"),
    pwShowHide = document.querySelectorAll(".eye-icon")

const myForm3 = document.querySelector('#forgot-pass');  

    myForm3.addEventListener('submit', onSubmit3);
    
    pwShowHide.forEach(eyeIcon => {
        eyeIcon.addEventListener("click", () => {
            let pwFields = eyeIcon.parentElement.parentElement.querySelectorAll(".password");
            
            pwFields.forEach(password => {
                if(password.type === "password"){
                    password.type = "text";
                    eyeIcon.classList.replace("bx-hide", "bx-show");
                    return;
                }
                password.type = "password";
                eyeIcon.classList.replace("bx-show", "bx-hide");
            })
            
        })
    })      
      
    async function onSubmit3(e)
    {
        e.preventDefault();

        const email = e.target.email.value;
        const myObj = {
        email : email
        }
        
        axios.post("http://localhost:3000/password/forgot-password", myObj)
        .then((response)=>{
            console.log("Look this!! " + response)
            if(response.status === 202){
                console.log("Look this!! " + response)
                document.body.innerHTML += '<div style="color:red;">Mail Successfuly sent <div>'
            } else {
                throw new Error('Something went wrong!!!')
            }
        })
        .catch(err => {
            console.log("Look this " + err)
            document.body.innerHTML += `<div style="color:red;">${err} <div>`;
        })
    }

// function forgotpassword(e) {
//     e.preventDefault();
//     console.log(e.target.name);
//     const form = new FormData(e.target);

//     const userDetails = {
//         email: form.get("email"),

//     }
//     console.log(userDetails)
//     axios.post('http://localhost:3000/password/forgot-password',userDetails).then(response => {
//         if(response.status === 202){
//             document.body.innerHTML += '<div style="color:red;">Mail Successfuly sent <div>'
//         } else {
//             throw new Error('Something went wrong!!!')
//         }
//     }).catch(err => {
//         document.body.innerHTML += `<div style="color:red;">${err} <div>`;
//     })
// }