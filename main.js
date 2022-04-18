const getEle = (selector)=>{
    return document.querySelector(selector);
}
const checkEmpty = (element) => {
    if(element){
        const value = element.value;
        console.log(value)
        if(value.trim() == ""){
            element.style.background = "rgb(255 244 156)"
            element.focus();
            return true;
        }else{
            element.style.background = "white"
        }
    }
    return false;
}
const checkChecked = (selector, elementParent) => {
    const arrayOptions = document.getElementsByName(selector);
    for(let item of arrayOptions){
        if(item.checked){
            elementParent.style.background = "white"
            return false;
        }
    }
    elementParent.style.background = "rgb(255 244 156)";
    return true;
}
const checkLength = (element, cb)=>{
    if(cb(element.value.trim())){
        element.style.background = "rgb(255 244 156)"
        element.focus();
        return true;
    }
    element.style.background = "white"
    return false
}
let timeOut;
const showMessage = (value, duration)=>{
    const message = getEle(".message");
    if(message){
        message.innerHTML = value;
        message.classList.add("active");
    }
    if(timeOut){
       clearInterval(timeOut);
    }
    timeOut = setTimeout(()=>{
        message.innerHTML = "";
        message.classList.remove("active");
    }, duration)
}
const handleSubmit = (e)=>{
    e.preventDefault();
    const id = getEle("#code");
    const fullName = getEle("#fullName");
    const province = getEle("#province");
    const interests = getEle("#interests_form");
    const gender = getEle("#gender_form");
    if(checkEmpty(id)){
        showMessage("Mã sinh viên không được bỏ trống", 3000);
    }else if(checkLength(id, (value) => { return value.length !== 7})){
        showMessage("Mã sinh viên phải nhập 7 kí tự", 3000);
    }else if(checkEmpty(fullName)){
        showMessage("Họ và tên không được bỏ trống", 3000);
    }else if(checkLength(fullName, (value) => { return value.length < 6 || value.length > 30})){
        showMessage("Họ và tên phải từ 6 đến 30 kí tự", 3000);
    }else if(checkChecked("gender", gender)){
        showMessage("Vui lòng chọn giới tính", 3000)
    }else if(checkChecked("interests", interests)){
        showMessage("Vui lòng chọn ít nhất 1 sở thích", 3000)
    }else if(checkEmpty(province)){
        showMessage("Vui lòng chọn tỉnh", 3000);
    }else{
        location.href = "/dangkythanhcong.html"
    }
}
getEle(".form").addEventListener("submit", handleSubmit)