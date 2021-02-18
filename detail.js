const img_path='https://image.tmdb.org/t/p/w';
const api='';
var poster=document.querySelector(".poster");
var title=document.querySelector(".title");
var genre=document.querySelector(".genre");
var releasedate=document.querySelector(".releasedate");

var cont2=document.querySelector(".container-2");
var castdiv=document.querySelector(".castdiv");
var overview=document.querySelector(".overview");
var similarmovie=document.querySelector(".similarmovie");
var reviewdiv=document.querySelector(".review");
var btn=document.querySelector(".button");
var voteavg=document.querySelector(".rating");
var branding=document.querySelector(".production");

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
       var results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

var id = getParameterByName('#########rtddrrdr#%%%%%%%');
const search_url=`https://api.themoviedb.org/3/movie/${id}?api_key=${api}`;

//const external_url=`https://api.themoviedb.org/3/movie/${id}/external_ids?api_key=${api}`;

console.log(search_url);
call(search_url);

function call(search_url){
    fetch(search_url)
    .then(response=>response.json())
    .then(json=>{
        settitle(json.title);
        setposter(img_path+'500'+json.poster_path);
        setgenre(json.genres);
        setdate(json.release_date);
        setrating(json.vote_average);
        setbrand(json.production_companies);
        setvideo();
        setoverview(json.overview);
    })
    .catch(errorhandle)
       
}
similar();
function similar(){
    const similar_url=`https://api.themoviedb.org/3/movie/${id}/similar?api_key=${api}&language=en-US&page=1`;
    fetch(similar_url)
    .then(response=>response.json())
    .then(json=>{
        var data=json.results;
        for(var i=0;i<6;i++){
            const {id,poster_path,title}=data[i];
            var div=document.createElement('div');
            div.classList.add('similardiv');
            div.innerHTML=`<a href="detail.html?#########rtddrrdr#%%%%%%%=${id}" target="_blank" class="link"></a><img src='${img_path}200${poster_path}' class='similarimg'>`;
            similarmovie.appendChild(div);
        }
    })
}

function settitle(gettitle){
 title.innerHTML=gettitle;
}
function setposter(getposter){
    
    poster.innerHTML=`<img src='${getposter}' class="posterimg">`;
}
function setgenre(setgenre){
    setgenre.forEach(item=>{
       const {name}=item;
       var div=document.createElement('div');
       div.classList.add('genrediv');
       div.innerHTML=`${name}`;
       genre.appendChild(div);

    })
}
function setdate(date){
    var str=date.substr(0,4)
    releasedate.innerHTML=`${str}`;
}
function setvideo(){
    const video_url=`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${api}&language=en-US`
    fetch(video_url)
    .then(response=>response.json())
    .then(json=>{
       // console.log(json);
        (json.results).forEach(item=>{
            var {key}=item;
            var div=document.createElement('div');
            div.innerHTML=`<iframe class='iframe' height="200" width="400"
            src='https://www.youtube.com/embed/${key}'>`;
            cont2.appendChild(div);
        })
        overflow();
        function overflow(){
            console.log(cont2.scrollWidth);
            if(cont2.scrollWidth>cont2.clientWidth){
                console.log(true);
                btn.style.display=`block`;

            }
        }
         
    })
  
}
function setoverview(over){
    overview.innerHTML=`<div class="overviewheader">Overview</div>${over}`;

}

function setrating(rate){
    voteavg.innerHTML=`<span class="votespan">❤️ ${rate}</span>`;
}
function setbrand(brand){
    brand.forEach(item=>{
        if(item.logo_path!=null){
        var div=document.createElement('div');
        div.classList.add('productiondiv');
        div.innerHTML=`<img src='${img_path}200${item.logo_path}' alt="">`;
        branding.appendChild(div);
        }
    })
}
//externalid(external_url);
/*
function externalid(external_url){
    fetch(external_url)
    .then(response=>response.json())
    .then(json=>{
        console.log(json);
        person(json.imdb_id);
    })
    .catch(errorhandle)
       
}

function person(imdbid){
    person_url=`https://api.themoviedb.org/3/find/${imdbid}?api_key=${api}&language=en-US&external_source=imdb_id`;
    fetch(person_url)
    .then(response=>response.json())
    .then(json=>{
        console.log(json);
        
    })
    .catch(errorhandle)
        
}*/
cast();
function cast(){
    const cast_url=`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${api}`;
    fetch(cast_url)
    .then(response=>response.json())
    .then(json=>{
       // console.log(json);
        (json.cast).forEach(item=>{
            var {name,profile_path,character}=item;
            if(character.includes('uncredited')){
                profile_path=null;

            }
            if(profile_path!=null){
            var div=document.createElement('div');
            div.classList.add('cast');
            div.innerHTML=`<img src='${img_path}200${profile_path}'  class='casting'><div class='castdesc'><div class='castname'>${name}<br><span class="character">As ${character}</span></div>`;
            castdiv.appendChild(div);
            }
        })
    })
}


review();
function review(){
    const review_url=`https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${api}`;
    fetch(review_url)
    .then(response=>response.json())
    .then(json=>{
        (json.results).forEach(item=>{
            const {author,author_details,content,created_at}=item;
            var profile=author_details.avatar_path;
            if(author_details.rating==null){
                var rating="";
            }
            else{
            var rating="⭐️"+author_details.rating;
            }
            var div=document.createElement('div');
            div.classList.add('reviewpack');
            div.innerHTML=`
            <div class="image">
            <img src='${img_path}200${profile}' alt="" class='avatar'>
            ${author}
            <br>
            ${rating}
            </div>
            <div class="customborder"></div>
            <div class="revcontent">
            
            ${content}
            
            </div>
            `;
            reviewdiv.appendChild(div);
        })
    })
}

var btn2=document.querySelector(".button2");
var pos=0;
var prev=0;
cont2.scrollLeft=0;
btn.addEventListener('click',()=>{
   
    pos+=200;
   cont2.scrollLeft=pos;
   console.log("right"+prev)
   if(prev!=cont2.scrollLeft){
       btn.style.display=`none`;
       btn2.style.display=`block`;
   }
   else{
   prev=pos;
   }
  /* if(prev==cont2.scrollLeft){
    console.log("truee");
   }
   prev=cont2.scrollLeft;*/
   console.log("right pos"+pos+"cont"+cont2.scrollLeft);
  
})
btn2.addEventListener('click',()=>{
   
    pos-=200;
   cont2.scrollLeft=pos;
   if(pos==0){
       btn2.style.display=`none`;
       btn.style.display=`block`;
       prev=0;
       console.log(prev);
   }
  
  /* if(prev==cont2.scrollLeft){
    console.log("truee");
   }
   prev=cont2.scrollLeft;*/
   console.log("left pos"+pos+"cont"+cont2.scrollLeft);
  
})

function errorhandle(){
    console.log('error');
}




