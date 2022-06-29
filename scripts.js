const img = new Image();
img.src = "./shark.png";

img.onload = () => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0);
  const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  displayAverage(imgData);

  // console.log(getTotalRGB(imgData));
  // console.log(getAverageColor(imgData));
};

function getTotalRGB(imgData) {
  const colors = {
    r: 0,
    g: 0,
    b: 0,
    total: 0,
  };

  for (let i = 0; i < imgData.data.length; i += 4) {
    colors.r += imgData.data[i];
    colors.g += imgData.data[i + 1];
    colors.b += imgData.data[i + 2];
    colors.total += 1;
  }

  return colors;
}

function getAverageColor(imgData) {
  const data = getTotalRGB(imgData);

  const averageRed = Math.floor(data.r / data.total);
  const averageGreen = Math.floor(data.g / data.total);
  const averageBlue = Math.floor(data.b / data.total);

  return {
    r: averageRed,
    g: averageGreen,
    b: averageBlue,
  };
}

function getColorPalette(imgData) {}

function displayAverage(imgData) {
  const average = document.getElementById("average-color");
  const context = average.getContext("2d");
  const color = getAverageColor(imgData);

  console.log(context);
  context.beginPath();
  context.rect(0, 0, 256, 256);
  context.fillStyle = `rgb(${color.r}, ${color.g}, ${color.b})`;
  context.fill();
}
