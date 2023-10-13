const registrationBlock = document.querySelector(".registration"); // поле ввода ника
const authorizationBlock = document.querySelector(".authorization"); // поле ввода пароля
const matrixBlock = document.querySelector(".matrix")
const registerButton = document.querySelector(".register"); 
const loginButton = document.querySelector(".login"); 
const buttons = document.querySelector(".buttons"); // поле кнопочек

console.log(registerButton)
console.log(loginButton)


const registrationBlockNickname = document.createElement("input");  // создаем див
registrationBlockNickname.classList.add("reginput"); 
registrationBlockNickname.setAttribute('type', 'text')
registrationBlockNickname.setAttribute('id', '1')
registrationBlockNickname.setAttribute('name', 'Nickname')
registrationBlockNickname.setAttribute('placeholder', 'Nickname')
// registrationBlockNickname.setAttribute('value', '')
// let nicknameForSend = document.querySelector('registrationBlockNickname').value;


const registrationBlockPassword = document.createElement("input");  // создаем див
registrationBlockPassword.classList.add("reginput"); 
registrationBlockPassword.setAttribute('type', 'text')
registrationBlockPassword.setAttribute('id', '2')
registrationBlockPassword.setAttribute('name', 'Password')
registrationBlockPassword.setAttribute('placeholder', 'Password')
// let passwordForSend = document.querySelector('registrationBlockPassword').value;

const registrationBlockEmail = document.createElement("input");  // создаем див
registrationBlockEmail.classList.add("reginput"); 
registrationBlockEmail.setAttribute('type', 'text')
registrationBlockEmail.setAttribute('id', '3')
registrationBlockEmail.setAttribute('name', 'Email')
registrationBlockEmail.setAttribute('placeholder', 'Email')
// let emailForSend = document.querySelector('registrationBlockEmail').value;

//кнопка отправки регистрации
const registrationBlockButton = document.createElement("button"); 
registrationBlockButton.classList.add("sendbutton");
registrationBlockButton.setAttribute('type', 'submit')
registrationBlockButton.innerText = 'Send'

//кнопка выхода из матрицы
const matrixBlockButton = document.createElement("button"); 
matrixBlockButton.classList.add("sendbutton");
matrixBlockButton.setAttribute('type', 'submit')
matrixBlockButton.innerText = 'Покинуть матрицу'

// всплывающее окно
const alertSystem = document.createElement("div"); 
alertSystem.classList.add("alertSystem");


// тут новый юзер для отправки
const newUser = {
    "user": {
        "username": "string",
        "email": "string",
        "password": "string"
    }
}
// тут старый юзер для отправки
const oldUser = {
    "user": {
        "email": "string",
        "password": "string"
    }
}

console.log(newUser)

registrationBlockButton.addEventListener("click", function() {   /// собираем инфу из инпутов регистрации
    let nicknameForSend = document.getElementById('1').value
    let emailForSend = document.getElementById('3').value
    let passwordForSend = document.getElementById('2').value

    if (nicknameForSend === "" || emailForSend === "" || passwordForSend === "" ) {   /// посылаем если халтурят
        registrationError(`"Пожалуйста, заполните все поля"`);
    } else {
        newUser.user["username"] = nicknameForSend
        newUser.user.password = passwordForSend
        newUser.user.email = emailForSend
        // console.log(newUser)
        setTimeout(function() {
            sendData(newUser); // сработает после записи данных
        }, 0);
    }
    
})

//кнопка отправки авторизации
const authorizationBlockButton = document.createElement("button"); 
authorizationBlockButton.classList.add("sendbutton"); 
authorizationBlockButton.setAttribute('type', 'submit')
authorizationBlockButton.innerText = 'Send'



registerButton.addEventListener('click', () => {  // блок регистрации
    authorizationBlock.style.display = 'none'
    registrationBlock.style.display = 'block'

    registrationBlock.append(registrationBlockNickname)
    registrationBlock.append(registrationBlockEmail)
    registrationBlock.append(registrationBlockPassword)
    registrationBlock.append(registrationBlockButton)

})

loginButton.addEventListener('click', () => { // блок авторизации
    registrationBlock.style.display = 'none'
    authorizationBlock.style.display = 'block'

    authorizationBlock.append(registrationBlockEmail)
    authorizationBlock.append(registrationBlockPassword)
    authorizationBlock.append(authorizationBlockButton)
})


matrixBlockButton.addEventListener('click', () => { // блок выхода
    buttons.style.display = 'block'
    matrixBlock.style.display = 'none'
    localStorage.setItem('email', '')
        localStorage.setItem('password', '')
    // matrixBlock.append(matrixBlockButton)

})


authorizationBlockButton.addEventListener("click", function() {   /// собираем инфу из инпутов авторизации
    let emailForSend = document.getElementById('3').value
    let passwordForSend = document.getElementById('2').value

    localStorage.setItem('email', emailForSend)
    localStorage.setItem('password', passwordForSend)

    if (emailForSend === "" || passwordForSend === "" ) {   /// посылаем если халтурят
        registrationError(`"Пожалуйста, заполните все поля"`);
    } else {
        oldUser.user.email = emailForSend
        oldUser.user.password = passwordForSend
        console.log(oldUser)
        setTimeout(function() {
            sendOldData(oldUser); // сработает после записи данных
        }, 0);
    }
})




let test = JSON.stringify(newUser)


function registrationError (text) {
    alertSystem.innerHTML =  `${text} `;
    registrationBlock.append(alertSystem)
    alertSystem.style.display = 'flex'
    alertSystem.addEventListener('click', function (event) {
        alertSystem.style.display = 'none'
    })
}

function authorizationError (text) {
    alertSystem.innerHTML =  `${text} `;
    authorizationBlock.append(alertSystem)
    alertSystem.style.display = 'flex'
    alertSystem.addEventListener('click', function (event) {
        alertSystem.style.display = 'none'
    })
}

function authorizationComplete (text) {
    alertSystem.innerHTML =  `${text} `;
    authorizationBlock.append(alertSystem)
    alertSystem.style.display = 'flex'
    alertSystem.addEventListener('click', function (event) {
        alertSystem.style.display = 'none'
        buttons.style.display = 'none'
        authorizationBlock.style.display = 'none'
        matrixBlock.style.display = 'block'
        matrixBlock.append(matrixBlockButton)
    })
    
}


registrationBlockButton.addEventListener('click', function (event) {
    console.log('Отправка!')
})




// Регистрация
async function sendData(newUser) {
    try {
    const response = await fetch('https://blog.kata.academy/api/users', {
        method: 'POST',
        headers: { 
            "Content-type": "application/json; charset=UTF-8" 
        },
        body: JSON.stringify(newUser),
    })

    const otvet = await response.json();
    console.log(otvet)
    if (response.ok) {
    registrationError(`Регистрация прошла успешно`);

    } else if (otvet.errors.username == "can't be blank" ) {
        console.log(`work`)
        registrationError(`Логин написан некорректно`);
    } else if (otvet.errors.username == "is already taken." ) {
        console.log(`work`)
        registrationError(`Логин уже занят`);
    } else if (otvet.errors.email == "is already taken." ) {
        console.log(`work`)
        registrationError(`"Эта почта уже используется"`);
    } else if (otvet.errors.email == "is invalid" ) {
        console.log(`work`)
        registrationError(`"Почта указана некорректно"`);
    }
} catch (error) {
    console.log("Error", error)
    registrationError(`Регистрация прошла неуспешно`);
}
}



// Авторизация
async function sendOldData(oldUser) {
    try {
    const response = await fetch('https://blog.kata.academy/api/users/login', {
        method: 'POST',
        headers: { 
            "Content-type": "application/json; charset=UTF-8" 
        },
        body: JSON.stringify(oldUser),
    })

    const otvet = await response.json();
    console.log(otvet)
    if (response.ok) {

        authorizationComplete(`Добро пожаловать в матрицу, Нео`);
    } else if (otvet.errors["email or password"] == "is invalid" ) {
        console.log(`work`)
        authorizationError(`Некорректные данные`);
    } 
} catch (error) {
    console.log("Error", error)
    authorizationError(`Регистрация прошла неуспешно`);
}
}



const currentUser = {
}


const requestURL = new URL("https://blog.kata.academy/api/users") // 






