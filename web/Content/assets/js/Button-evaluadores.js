
const uploadButton1 = document.querySelector('.browse-btn-1');
const uploadButton2 = document.querySelector('.browse-btn-2');
//const uploadButton3 = document.querySelector('.browse-btn-3');
const fileInfo1 = document.querySelector('.file-info1');
const fileInfo2 = document.querySelector('.file-info2');
//const fileInfo3 = document.querySelector('.file-info3');
const realInput1 = document.getElementById('eDocumento1');
const realInput2 = document.getElementById('eDocumento2');
//const realInput3 = document.getElementById('eDocumento3');


uploadButton1.addEventListener('click', (e) => {
    realInput1.click();
});
uploadButton2.addEventListener('click', (e) => {
    realInput2.click();
});
//uploadButton3.addEventListener('click', (e) => {
//    realInput3.click();
//});


realInput1.addEventListener('change', () => {
    const name = realInput1.value.split(/\\|\//).pop();
    const truncated = name.length > 20
        ? name.substr(name.length - 20)
        : name;

    fileInfo1.innerHTML = truncated;
});
realInput2.addEventListener('change', () => {
    const name = realInput2.value.split(/\\|\//).pop();
    const truncated = name.length > 20
        ? name.substr(name.length - 20)
        : name;

    fileInfo2.innerHTML = truncated;
});
//realInput3.addEventListener('change', () => {
//    const name = realInput3.value.split(/\\|\//).pop();
//    const truncated = name.length > 20
//        ? name.substr(name.length - 20)
//        : name;

//    fileInfo3.innerHTML = truncated;
//});


//FIN PERFIL INSTITUCION
