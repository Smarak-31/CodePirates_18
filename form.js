window.onload= () =>{
    if(sessionStorage.user){
        user=JSON.parse(sessionStorage.user);
        if(user.email){
            location.replace('/');
        }
    }
}



//form
let formBtn=document.querySelector('.submit-btn');
let loader =document.querySelector('.loader');

formBtn.addEventListener('click',()=>{
    let fullname=document.querySelector('#name')|| null;
    let email=document.querySelector('#email');
    let password=document.querySelector('#password');
    let number=document.querySelector('#number')|| null;
    let tac= document.querySelector('#tc');
    // form validation
    if (fullname.length<3){
        res.json({'alert':'name must be 3 letters long'});
    }else if(!email.length){
        res.json({'alert':'enter ur email'});
    }else if (password.length<8){
        res.json({'alert':'password must be 8 letters long'});
    }else if (!Number(number)||number.length<10){
        res.json({'alert':'invalid number ,please  enter valid number'});
    }else if(!tac.checked){
        res.json({'alert':'you must agree  to our terms and conditions'});
    }else{
        //submit form
        loader.style.display='block';
        sendData('/signup',{
            name: fullname.value,
            email:email.value,
            number:number.value,
            tac:tac.checked 
        })
    }
})