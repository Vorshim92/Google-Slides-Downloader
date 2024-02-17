let view = document.querySelector(".punch-viewer-content");
let intervalId;
let currentPageNumber = parseInt(document.body.querySelector(".goog-inline-block .docs-material-menu-button-flat-default-caption").innerText);
let numDiapositive = parseInt(document.querySelector(".goog-inline-block.docs-material-menu-button-flat-default-caption[aria-setsize]").getAttribute("aria-setsize"));

function downloadSVG() {
  let svgContainer = document.querySelector(".punch-viewer-svgpage-svgcontainer");
  let svg = svgContainer.querySelector("svg");
  let elementsImage = svg.querySelectorAll("image");
  elementsImage.forEach(function (element) {
    let xlinkHref = element.getAttribute("xlink:href");
    fetch(xlinkHref)
      .then((response) => response.blob())
      .then((blob) => {
        let reader = new FileReader();
        reader.onload = function () {
          let base64data = reader.result.split(",")[1];
          element.setAttribute("href", "data:image/png;base64," + base64data);
        };
        reader.readAsDataURL(blob);
      });
  });
  setTimeout(() => {
    let svgString = new XMLSerializer().serializeToString(svg);
    let blobbe = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
    let url = window.URL.createObjectURL(blobbe);

    let image = new Image();
    image.onload = function () {
      let canvas = document.createElement("canvas");
      canvas.width = svg.width.baseVal.value;
      canvas.height = svg.height.baseVal.value;
      let ctx = canvas.getContext("2d");
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      let a = document.createElement("a");
      a.download = "Diapositiva 0" + currentPageNumber + ".png";
      a.href = canvas.toDataURL("image/png");
      a.click();
    };
    image.src = url;
  }, 500);
}

function autoSlide() {
  view.click();
  setTimeout(function () {
    let nextPageNumber = parseInt(document.body.querySelector(".goog-inline-block .docs-material-menu-button-flat-default-caption").innerText);
    if (nextPageNumber === numDiapositive) {
      clearInterval(intervalId);
      currentPageNumber = nextPageNumber;
      downloadSVG();
      return;
    } else {
      currentPageNumber = nextPageNumber;
      downloadSVG();
    }
  }, 100);
}

downloadSVG();
intervalId = setInterval(autoSlide, 1000);
