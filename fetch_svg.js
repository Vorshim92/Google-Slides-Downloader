let view = document.querySelector(".punch-viewer-content");
let intervalId;
let currentPageNumber = parseInt(document.body.querySelector(".goog-inline-block .docs-material-menu-button-flat-default-caption").innerText);
let numDiapositive = parseInt(document.querySelector(".goog-inline-block.docs-material-menu-button-flat-default-caption[aria-setsize]").getAttribute("aria-setsize"));
function downloadSVG() {
  let svgContainer = document.querySelector(".punch-viewer-svgpage-svgcontainer");
  let svg = svgContainer.querySelector("svg");
  let svgString = new XMLSerializer().serializeToString(svg);
  let blob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
  let url = window.URL.createObjectURL(blob);
  let a = document.createElement("a");
  a.href = url;
  a.download = "Diapositiva 0" + currentPageNumber + ".svg";
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
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
intervalId = setInterval(autoSlide, 300);
