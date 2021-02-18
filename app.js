const api_key='';

const Api_Url=`https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${api_key}&page=`;
const img_path='https://image.tmdb.org/t/p/w500';
const search_url=`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=`;

var form=document.querySelector(".form");
var search=document.querySelector(".search");
var main=document.querySelector(".main");
var pageblock=document.querySelector(".pagination");
var prev=document.querySelector(".prevbtn");
var next=document.querySelector(".nextbtn");
var currentpage=0;
var totalpage="";
var btnurl="";
prev.addEventListener('click',previous);
next.addEventListener('click',nextone);

form.addEventListener('submit',onsubmit);

call(Api_Url,1);


function onsubmit(event){
    event.preventDefault();
    var searchvalue=search.value;

    if(searchvalue!==''){
        call(search_url+searchvalue);
        search.value='';
    }

    
    //need to add reload as per traversy media

}
function call(url,val){
    btnurl=url;
    fetch(url+val)
    .then(response=>response.json())
    .then(json=>{
        data(json.results);
        console.log("kk");
        currentpage=json.page;
        totalpage=json.total_pages;
       /* var prevval=currentpage-1;
        var nextval=currentpage+1;
        if(currentpage>1){
            next.removeEventListener('click',function(){call(url,nextval)});
            console.log("ll");

        prev.removeEventListener('click',function(){call(url,prevval)})
        }
        next.addEventListener('click',function(){call(url,nextval)});
        next.removeEventListener('click',function(){call(url,nextval)});
        prev.addEventListener('click',function(){call(url,prevval)});
       // pagination(json.page,json.total_pages);*/
    })
}
function data(Data){
    main.innerHTML='';
    Data.forEach(item=>{
       var{title,poster_path,vote_average,id} =item;
       var moviediv=document.createElement('div');//change to const
       moviediv.classList.add('moviewrapper');
       if(poster_path!==null){
           
       
       moviediv.innerHTML=`
       <a href="detail.html?#########rtddrrdr#%%%%%%%=${id}" target="_blank" class="link"></a>
       <img src="${img_path+poster_path}" alt="${title}" class="movieimg">
       <div class="moviedesc">
           
           <span class="rate">${vote_average}</span>
       </div>
      `;
       
       main.appendChild(moviediv);
       }
    })
}

function nextone(){
    call(btnurl,currentpage+1);

}
function previous(){

}

function pagination(){
    if(currentpage<=totalpage&&currentpage>=1){
        //var next=cuurentpage+1;
        var prev=currentpage-1;
       
    }
}
