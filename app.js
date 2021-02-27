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
var home=document.querySelector(".homebtn");
var currentpage=1;
var totalpage="";
var btnurl="";
prev.style.color=`gray`;
home.addEventListener('click',homeclick);
prev.addEventListener('click',previous);
next.addEventListener('click',nextone);

form.addEventListener('submit',onsubmit);

call(Api_Url,1);

function homeclick(){
    call(btnurl,1);
   prev.style.disabled=true;
}
function onsubmit(event){
    event.preventDefault();
    var searchvalue=search.value+"&page=";

    if(searchvalue!==''){
        call(search_url+searchvalue,1);
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
        //console.log("kk");
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
    if(currentpage>=1){
        prev.disabled=false;
        prev.style.color=`white`;
        
    }
    if(currentpage===totalpage-1){
       
    call(btnurl,currentpage+1);
    next.disabled=true;
    next.style.color=`gray`;
    return;
    }
    if(currentpage<totalpage){
        next.disabled=false;
        call(btnurl,currentpage+1);

    }

}
function previous(){
    if(currentpage>1){
        call(btnurl,currentpage-1);
        prev.disabled=false;
        next.disabled=false;
        next.style.color=`white`;

    }
    if(currentpage<=2){
        call(btnurl,currentpage-1);
        prev.disabled=true;
        prev.style.color=`gray`;


    }
    
  
}

/*function pagination(){
    if(currentpage<=totalpage&&currentpage>=1){
        //var next=cuurentpage+1;
        var prev=currentpage-1;
       
    }
}*/
