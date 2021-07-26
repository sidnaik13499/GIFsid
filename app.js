if (window.location.protocol.indexOf('https') == 0){
  var el = document.createElement('meta')
  el.setAttribute('http-equiv', 'Content-Security-Policy')
  el.setAttribute('content', 'upgrade-insecure-requests')
  document.head.append(el)
}

function fetchGiphy(){
    var apiKey = "hhKSYOIPega6fQJYkfMBogdncYdxelCi";
    var inp = document.getElementById("search-g").value;
    var url = "http://api.giphy.com/v1/gifs/search?q="+inp+"&api_key="+apiKey+"&limit=10";

    var xhr = new XMLHttpRequest();

    xhr.open('GET',url);
    
    xhr.onload = () => {
    
        //console.log(xhr.responseText);

        var giphyData = JSON.parse(xhr.responseText);

        if(giphyData.data.length==0){
            for(let i=0;i<10;i++){
                var imgId = "gif-img"+i;
                var imgG = document.getElementById(imgId);
                document.getElementById(imgId).style.width = "0px";
                document.getElementById(imgId).style.height = "0px";
                imgG.src = "";
                imgG.alt =  "";
                var capId = "gif-cap"+i;
                document.getElementById(capId).textContent = "";
            }
            document.getElementById("err").textContent= "No GIFS Found";
            document.getElementById("search-g").value="";
        }else{
            document.getElementById("err").textContent= "";
            console.log(giphyData.data);
            console.log(giphyData.pagination);
            console.log(giphyData.meta);
            // var gipUrl = giphyData.data[0].embed_url;
            // document.getElementById("giphy-img").src =  gipUrl ;
        
            for(let i=0;i<10;i++){
                var imgSrc = giphyData.data[i].images.downsized.url;
                var imgId = "gif-img"+i;
                document.getElementById(imgId).style.width = "28rem";
                document.getElementById(imgId).style.height = "25rem";
                var imgG = document.getElementById(imgId);
                imgG.src = imgSrc;
                imgG.alt =  giphyData.data[i].title;
                var capId = "gif-cap"+i;
                document.getElementById(capId).textContent = giphyData.data[i].title;
                document.getElementById("search-g").value="";
            }
        }         

    }

    xhr.send();
}

