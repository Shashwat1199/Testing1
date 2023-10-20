const forms = document.querySelector(".forms"),
      pwShowHide = document.querySelectorAll(".eye-icon"),
      links = document.querySelectorAll(".link");

const myForm1 = document.querySelector('#my-form');      
myForm1.addEventListener('submit', onSubmit1);

const myForm2 = document.querySelector('#login-form');      
myForm2.addEventListener('submit', onSubmit2);

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

links.forEach(link => {
    link.addEventListener("click", e => {
       e.preventDefault(); //preventing form submit
       forms.classList.toggle("show-signup");
    })
})

function onSubmit1(e)
{
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    
    const myObj = {
        name : name,
        email : email,
        password : password
    };
    
    console.log(myObj)
    axios.post("http://localhost:3000/user/sign-up", myObj) 
    .then((response)=>{
       console.log("Gone inside ");     
      
    })
    .catch((err)=>{
        console.log("Coming in error block " +err);
    }) 
}

function onSubmit2(e)
{
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;
     
    console.log(email);
    const myObj = {
        email : email,
        password : password
    };
    
    console.log(myObj)
    axios.post("http://localhost:3000/user/sign-in", myObj) 
    .then((response)=>{
       alert(response.data.message)
       window.location.href = "../views/index.html" 
       console.log("Gone inside Login ");     
      
    })
    .catch((err)=>{
        console.log("Coming in error block " + err);
    }) 
}
