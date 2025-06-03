document.getElementById("fullscreenBtn").addEventListener("click", () => {
  const img = document.getElementById("myImage");

  if (img.requestFullscreen) {
    img.requestFullscreen();
  } 
});