const img = new Image();
img.src = "./shark.png";

// const imgAddress = document.getElementById("link");
// img.crossOrigin = "Anonymous";

// imgAddress.onchange = () => {
//   img.src = imgAddress.value;
//   console.log(imgAddress.value);
//   const canvas = document.getElementById("canvas");
//   const ctx = canvas.getContext("2d");
//   ctx.drawImage(img, 0, 0, img.width, img.height);

//   const imgData = ctx.getImageData(0, 0, img.width, img.height);
//   displayAverage(imgData);
// };

img.onload = () => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0, img.width, img.height);
  const imgData = ctx.getImageData(0, 0, img.width, img.height);
  // console.log(getTotalRGB(imgData));
  // console.log(getAverageColor(imgData));
  // console.log(getPercentRGB(imgData));
  console.log(getIndividualPixels(ctx, imgData));

  displayAverage(imgData);
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

function getPercentRGB(imageData) {
  const data = getTotalRGB(imageData);
  const total = data.r + data.g + data.b;

  const percentRed = Math.round((data.r / total) * 100) / 100;
  const percentGreen = Math.round((data.g / total) * 100) / 100;
  const percentBlue = Math.round((data.b / total) * 100) / 100;

  return {
    r: percentRed,
    b: percentBlue,
    g: percentGreen,
  };
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

function getColorPalette(ctx, img) {

}

function getIndividualPixels(ctx, img) {
  const totalPixels = img.width * img.height;
  let count = 0;
  let pixelData;
  let pixels = [];

  for (let x = 1; x < img.width; x += 1) {
    for (let y = 1; y < img.height; y += 1) {
      pixelData = ctx.getImageData(x, y, x, y);
      const pixel = {
        "r": pixelData.data[0],
        "g": pixelData.data[1],
        "b": pixelData.data[2],
      };
      pixels.push(pixel);
    }
  }
  return pixels;
}

// ----------- display on page ------------------- //
function displayAverage(imgData) {
  const average = document.getElementById("average-color");
  const context = average.getContext("2d");
  const color = getAverageColor(imgData);

  // console.log(context);
  context.beginPath();
  context.rect(0, 0, 256, 256);
  context.fillStyle = `rgb(${color.r}, ${color.g}, ${color.b})`;
  context.fill();
}
// img.src = "./shark.png";
