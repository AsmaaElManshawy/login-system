// done
const homePage = document.querySelector("#home");
const loginPage = document.querySelector("#login");
const siginUpPage = document.querySelector("#signup");
const passwordInput = document.querySelector("#signup #userPassword");
const emailInput = document.querySelector("#signup #userEmail");
const lPasswordInput = document.querySelector("#checkPassword");
const lEmailInput = document.querySelector("#checkEmail");
const nameInput = document.querySelector("#userName");
const  message = document.querySelector(".user-name");
const signanc = document.querySelector("#ancoursignin");
const loganc = document.querySelector("#ancourlogin");
const logout = document.querySelector("#logout");
const form = document.querySelector("form");
const btnLogin = document.querySelector(".loginbtn");
const btnSignUp = document.querySelector(".signupbtn");

let accountList;

if(localStorage.getItem("users") == null ){
    accountList = [];
} else {
    accountList = JSON.parse(localStorage.getItem("users"));
}

form.addEventListener("submit",function(e){
    e.preventDefault();
});

btnLogin.addEventListener( "click", function(){
    login();
} );

btnSignUp.addEventListener( "click", function(){
    addAccount();
} );

signanc.addEventListener("click", function(){
    goTOLogin();
});

loganc.addEventListener("click",function(){
    loginPage.classList.add("d-none");
    siginUpPage.classList.remove("d-none");
    clear();
});

logout.addEventListener("click",function(){
    loginPage.classList.remove("d-none");
    homePage.classList.add("d-none");
});

// login
function login() {
    if ( lPasswordInput.classList.contains("is-valid") && lEmailInput.classList.contains("is-valid")) {
        checkLogin();
    } else {
        btnLogin.previousElementSibling.innerHTML = "incorrect email or password <br> Please enter a valid data";
        btnLogin.previousElementSibling.classList.remove("d-none");
    }
}

function checkLogin(){
    if(accountList.length > 0){
        for (let i = 0 ; i < accountList.length ; i++ ) {
            if (accountList[i].email == lEmailInput.value) {
                if (accountList[i].password == lPasswordInput.value) {  
                    
                    home(accountList[i].name);
                    clear();
                    return "exists";
                    
                } else {
                    btnLogin.previousElementSibling.innerHTML = "incorrect password"
                    btnLogin.previousElementSibling.classList.remove("d-none");
                    return "does not exists";
                    
                }
            }
        }
        btnLogin.previousElementSibling.innerHTML = "incorrect email ";
        btnLogin.previousElementSibling.classList.remove("d-none");
    } else{
        btnLogin.previousElementSibling.innerHTML = "Ther is no user you have to signup ";
        btnLogin.previousElementSibling.classList.remove("d-none");
    }
}

function home(name) {
    loginPage.classList.add("d-none");
    homePage.classList.remove("d-none");
    message.innerHTML = `Welcome ${name}`;
}
// signup
function addAccount(){

    if ( passwordInput.classList.contains("is-valid") && 
    emailInput.classList.contains("is-valid") && 
    nameInput.classList.contains("is-valid")) {
        let cheek = checkExists();
        if(cheek == "does not exists"){
            let account = {
                name: nameInput.value ,
                email: emailInput.value ,
                password: passwordInput.value ,
            };
            accountList.push(account);
            localStorage.setItem("users" , JSON.stringify(accountList));
            goTOLogin();
        }
    } else { 
        btnSignUp.previousElementSibling.innerHTML = `All inputs is required <br> Please enter a valid data`;
        btnSignUp.previousElementSibling.classList.remove("d-none");
    }
}

function checkExists(){
    if(accountList.length > 0){
        for (let i = 0 ; i < accountList.length ; i++ ) {
            if (accountList[i].email == emailInput.value  || accountList[i].name == nameInput.value ) {
                btnSignUp.previousElementSibling.innerHTML = `Account already exists <br>
                <span class="text-warning">
                ${accountList[i].name} <br> ${accountList[i].email} <br>
                </span>`;
                btnSignUp.previousElementSibling.classList.remove("d-none");
                return "exists";
            }
        }
        return "does not exists";
    } else {
        return "does not exists";
    }
}

function goTOLogin(){
    siginUpPage.classList.add("d-none");
    loginPage.classList.remove("d-none");
    clear();
}
// validation and clear
function vaildateInputs(element) {
    const regex = {
        userName : /^(\w{3,}[ ]*)+$/gm,
        userEmail : /^\w{6,}@(gmail|hotmail|outlook|yahoo)\.com$/gm,
        userPassword :  /^[A-Za-z0-9]{8,20}$/gm,
        checkEmail : /^\w{6,}@(gmail|hotmail|outlook|yahoo)\.com$/gm,
        checkPassword :  /^[A-Za-z0-9]{8,20}$/gm,
    };
    if (regex[element.id].test(element.value) == true) {
        element.classList.add("is-valid");
        element.classList.remove("is-invalid");
        element.nextElementSibling.classList.add("d-none");
    } else {
        element.classList.add("is-invalid");
        element.classList.remove("is-valid");
        element.nextElementSibling.classList.remove("d-none");
    }
}

function clear(){
    nameInput.value = null;
    passwordInput.value = null;
    emailInput.value = null;
    lEmailInput.value = null;
    lPasswordInput.value = null;
    removeClass();
}

function removeClass() {

    let allInput = [nameInput , passwordInput , emailInput , lPasswordInput , lEmailInput]

    for (const input of allInput) {
        if (input.nextElementSibling.classList.contains("d-none")){
            input.classList.remove("is-valid");
        } else {
            input.nextElementSibling.classList.add("d-none");
            input.classList.remove("is-invalid");
        }
    }
}