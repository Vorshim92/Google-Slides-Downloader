I created this script for some embedded Google Slides links that were not given the ability to be downloaded directly and therefore are private, but can only be viewed through an iframe.
It will automatically scroll through each slide and download a .png version of that slide.

Here is the Bookmarklet on a single line to be added as a URL for the bookmark to launch it directly from there.

```
javascript:(function(){let view=document.querySelector(".punch-viewer-content"),intervalId,currentPageNumber=parseInt(document.body.querySelector(".goog-inline-block .docs-material-menu-button-flat-default-caption").innerText),numDiapositive=parseInt(document.querySelector(".goog-inline-block.docs-material-menu-button-flat-default-caption[aria-setsize]").getAttribute("aria-setsize"));function downloadSVG(){let svgContainer=document.querySelector(".punch-viewer-svgpage-svgcontainer"),svg=svgContainer.querySelector("svg"),elementsImage=svg.querySelectorAll("image");elementsImage.forEach(function(e){let xlinkHref=e.getAttribute("xlink:href");fetch(xlinkHref).then((response)=>response.blob()).then((blob)=>{let reader=new FileReader();reader.onload=function(){let base64data=reader.result.split(",")[1];e.setAttribute("href","data:image/png;base64,"+base64data);};reader.readAsDataURL(blob);});});setTimeout(()=>{let svgString=new XMLSerializer().serializeToString(svg),blobbe=new Blob([svgString],{type:"image/svg+xml;charset=utf-8"}),url=window.URL.createObjectURL(blobbe),image=new Image();image.onload=function(){let canvas=document.createElement("canvas");canvas.width=svg.width.baseVal.value;canvas.height=svg.height.baseVal.value;let ctx=canvas.getContext("2d");ctx.drawImage(image,0,0,canvas.width,canvas.height);let a=document.createElement("a");a.download="Diapositiva 0"+currentPageNumber+".png";a.href=canvas.toDataURL("image/png");a.click();};image.src=url;},500);}function autoSlide(){view.click();setTimeout(function(){let nextPageNumber=parseInt(document.body.querySelector(".goog-inline-block .docs-material-menu-button-flat-default-caption").innerText);if(nextPageNumber===numDiapositive){clearInterval(intervalId);currentPageNumber=nextPageNumber;downloadSVG();return;}else{currentPageNumber=nextPageNumber;downloadSVG();}},100);}downloadSVG();intervalId=setInterval(autoSlide,1000);}())
```

I suggest also to add this bookmarklet to extract the Google Slides URL from the iframe, use this and only then use the first Bookmarklet

```
javascript:var n = document.querySelectorAll('iframe[src*=docs\\.google]')[0],    k = document.createElement("a");k.setAttribute("href",n.getAttribute("src"));k.setAttribute("target","_blank");k.setAttribute("style","display:block");k.innerText = "Open Google Slides";n.parentElement.insertBefore(k,n);
```
