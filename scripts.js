const img = new Image();
img.src = "./castle.png";
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const width = canvas.width;
const height = canvas.height;

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
  ctx.drawImage(img, 0, 0, width, height);
  const imgData = ctx.getImageData(0, 0, width, height);
  // console.log(getTotalRGB(imgData));
  // console.log(getAverageColor(imgData));
  // console.log(getPercentRGB(imgData));
  // console.log(convertToBinary(getIndividualPixels(ctx, imgData)[0]));
  // console.log(getColorPalette(imgData));

  displayAverage(imgData);
  displayPercents(imgData);
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
    g: percentGreen,
    b: percentBlue,
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

function getColorPalette(imgData) {
  const pixels = getIndividualPixels(ctx, imgData);
  let rgb;
  let list = [];

  for (let i = 0; i < pixels.length; i += 1) {
    list.push(convertToBinary(pixels[i]));
  }

  list.sort(function (a, b) {
    return b - a;
  });

  return list;
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
        r: pixelData.data[0],
        g: pixelData.data[1],
        b: pixelData.data[2],
      };
      pixels.push(pixel);
    }
  }
  return pixels;
}

function convertToBinary(rgb) {
  let binary = "";
  let value;
  let key;

  for (let i = 0; i < 3; i += 1) {
    key = Object.keys(rgb)[i];
    value = rgb[key].toString(2);
    binary += parseInt(value);
  }

  return binary;
}

// ----------- display on page ------------------- //
function displayAverage(imgData) {
  const average = document.getElementById("average-color");
  const context = average.getContext("2d");
  const color = getAverageColor(imgData);

  // console.log(context);
  context.beginPath();
  context.rect(0, 0, width, height);
  context.fillStyle = `rgb(${color.r}, ${color.g}, ${color.b})`;
  context.fill();
}

function displayPercents(imgData) {
  const rgb = getPercentRGB(imgData);
  const data = Object.values(rgb);
  console.log(rgb);

    const width = 200;
    const height = 200;
    const pieGen = d3.pie();
    const arcData = pieGen(data);


    // Make a scale to set the color
    const colorScale = d3
      .scaleQuantize()
      .domain([0, 2])
      .range(["red", "green", "blue"]);

    const arcGen = d3
      .arc() // Make an arc generator
      .innerRadius(0) // Set the inner radius
      .outerRadius(100) // Set the outer radius
      .padAngle(0.00); // Set the gap between arcs

    // Select the SVG
    const svg = d3.select("#percents");

    // Append a group (<g>) to hold the arcs
    const pieGroup = svg
      .append("g")
      // position the group in the center
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const piePath = pieGroup
      .selectAll("path") // Select all paths
      .data(arcData) // Use the arc data
      .enter()
      .append("path") // Make a path for each arc segment
      .attr("d", arcGen) // Draw the arc segement with the generator
      .attr("fill", (d, i) => colorScale(i)); // Use the color scale
}

function displaySinglePixelPercents(pixelData) {
  const data = Object.values(pixelData);

    const width = 200;
    const height = 200;
    const pieGen = d3.pie();
    const arcData = pieGen(data);


    // Make a scale to set the color
    const colorScale = d3
      .scaleQuantize()
      .domain([0, 2])
      .range(["red", "green", "blue"]);

    const arcGen = d3
      .arc() // Make an arc generator
      .innerRadius(0) // Set the inner radius
      .outerRadius(100) // Set the outer radius
      .padAngle(0.00); // Set the gap between arcs

    // Select the SVG
    const svg = d3.select("#single");

    // Append a group (<g>) to hold the arcs
    const pieGroup = svg
      .append("g")
      // position the group in the center
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const piePath = pieGroup
      .selectAll("path") // Select all paths
      .data(arcData) // Use the arc data
      .enter()
      .append("path") // Make a path for each arc segment
      .attr("d", arcGen) // Draw the arc segement with the generator
      .attr("fill", (d, i) => colorScale(i)); // Use the color scale
}

function displaySelected(rgb) {
  const selected = document.getElementById("pixel");
  const context = selected.getContext("2d");
  const red = rgb.data[0];
  const green = rgb.data[1];
  const blue = rgb.data[2];


  context.rect(0, 0, 256, 256);
  context.fillStyle = `rgb(${red}, ${green}, ${blue})`;
  context.fill();
}

function getPixel(x, y) {
  const pixelData = ctx.getImageData(x, y, x, y);
  console.log(pixelData);
  const percents = getPercentRGB(pixelData);
  displaySelected(pixelData);
  displaySinglePixelPercents(percents);
}

const getCursorPosition = (canvas, event) => {
  const x = event.offsetX
  const y = event.offsetY
  getPixel(x, y);
  // console.log(x, y)
}

canvas.addEventListener('mousedown', (e) => {
  getCursorPosition(canvas, e)
})