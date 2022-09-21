let div = document.getElementsByClassName("companyCard_phone__Number");
for(let i=0; i<div.length; i++)
{
    div[i].style.display = 'none';
}

let btn = document.getElementsByClassName("companyCard_phone__btn");
for(let i=0; i<btn.length; i++)
{
    btn[i].addEventListener('click', function(){ this.previousElementSibling.style.display = 'block'});
}