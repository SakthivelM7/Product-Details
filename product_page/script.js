
var apiUrl = 'https://cdn.shopify.com/s/files/1/0564/3685/0790/files/singleProduct.json';

var title;
var colorNameValue;
var sizeName;

async function fetchData() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data.product["options"]);
        title = data.product['title'];
        renderName(data.product['vendor'], data.product['title'], data.product['price'], data.product['compare_at_price'], data.product['description'],);
        renderImages(data.product['images']);
        renderListImages(data.product['images']);
        colorBox(data.product["options"][0]['values']);
        sizeBox(data.product["options"][1]['values']);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function renderName(vendor, title, discountPrice, price, description) {
    const vendorText = document.getElementById('vendor');
    vendorText.textContent = vendor;

    const titleText = document.getElementById('title');
    titleText.textContent = title;

    const discountPriceText = document.getElementById('discount-price');
    discountPriceText.textContent = discountPrice;

    const priceText = document.getElementById('price');
    priceText.textContent = price;

    const removeTag = description.replace(/<\/?p[^>]*>/g, '');
    const descriptionText = document.getElementById('description');
    descriptionText.textContent = removeTag;
}

function renderImages(imageData) {
    const singleImageDiv = document.querySelector('.product-image');
    const imagesDiv = document.createElement('div');
    imagesDiv.classList.add('image');
    if (imageData[0]['src'] && imageData[0]['src'].trim() !== "") {
        // Check if image is available
        loadImage(imageData[0]['src'], function () {
            imagesDiv.style.background = `url(${imageData[0]['src']}) 50% / cover no-repeat`;
        }, function () {
            // If image is not available, set default image
            imagesDiv.style.background = `url('https://buffer.com/library/content/images/2023/10/free-images.jpg') 50% / cover no-repeat`;
        });
    } else {
        // If URL is not available, set default image
        imagesDiv.style.background = `url('https://buffer.com/library/content/images/2023/10/free-images.jpg') 50% / cover no-repeat`;
    }

    singleImageDiv.appendChild(imagesDiv);


}

function renderListImages(imageData) {
    const imageListDiv = document.querySelector('.thumnail-image');
    imageData.forEach((image, index) => {
        const imagesDiv = document.createElement('div');
        imagesDiv.classList.add('image-list');
        if (image.src && image.src.trim() !== "") {
            // Check if image is available
            loadImage(image.src, function () {
                imagesDiv.style.background = `url(${image.src}) 50% / cover no-repeat`;
            }, function () {
                // If image is not available, set default image
                imagesDiv.style.background = `url('https://buffer.com/library/content/images/2023/10/free-images.jpg') 50% / cover no-repeat`;
            });
        } else {
            // If URL is not available, set default image
            imagesDiv.style.background = `url('https://buffer.com/library/content/images/2023/10/free-images.jpg') 50% / cover no-repeat`;
        }

        imageListDiv.appendChild(imagesDiv);

    });

}

function colorBox(colorData) {
    const colorContainer = document.getElementById('color-container');
    colorData.forEach(colorObj => {
        const colorName = Object.keys(colorObj)[0];
        const colorValue = colorObj[colorName];
        const colorBox = document.createElement('div');
        colorBox.className = 'color-box';
        colorBox.style.backgroundColor = colorValue;
        colorBox.addEventListener('click', function () {
            clickColor(colorName, colorBox);
        });
        colorContainer.appendChild(colorBox);
    });
}

function clickColor(colorName, colorBox) {
    // Remove tick mark from previously clicked color box (if any)
    const previouslyClicked = document.querySelector('.tick-mark');
    if (previouslyClicked) {
        previouslyClicked.classList.remove('tick-mark');
    }

    colorBox.classList.add('tick-mark');
    colorNameValue = colorName;
    console.log(colorName);
    console.log(title);

}

function sizeBox(sizeBox) {

    var container = document.getElementById("frame-23");
    // Loop through the sizes in the API response
    sizeBox.forEach(function (size) {
        // Create the <div class="frame-1"> element
        var frameDiv = document.createElement("div");
        frameDiv.className = "frame-21";

        // Create the <div class="group"> element
        var groupDiv = document.createElement("div");
        groupDiv.className = "group-10";

        // Create the <div class="one"> element
        var oneDiv = document.createElement("div");
        oneDiv.className = "rectangle-94";

        // Create the <div class="two"> element
        var twoDiv = document.createElement("div");
        twoDiv.className = "rectangle-104";



        frameDiv.addEventListener("click", function() {
            // Remove "active" class from all oneDiv elements
            var allOneDivs = document.querySelectorAll('.rectangle-94');
            allOneDivs.forEach(function(div) {
                div.classList.remove("active");
            });
    
            // Add "active" class to the clicked oneDiv
            oneDiv.classList.add("active");
            console.log(size);
            sizeName = size;
        });

        // Create the <div class="size"> element with the size text
        var sizeDiv = document.createElement("div");
        sizeDiv.className = "small";
        sizeDiv.textContent = size;

        // Append the oneDiv, twoDiv, and sizeDiv to the groupDiv
        groupDiv.appendChild(oneDiv);
        groupDiv.appendChild(twoDiv);

        // Append the groupDiv and sizeDiv to the frameDiv
        frameDiv.appendChild(groupDiv);
        frameDiv.appendChild(sizeDiv);

        // Append the frameDiv to the container element
        container.appendChild(frameDiv);
    });

}

function addToCart(){
    
const addButton = document.getElementById('addButton');
// Get reference to the container div

const container = document.getElementById('popup');

// Add click event listener to the add button
addButton.addEventListener('click', function() {
  // Create a new div element
  container.innerHTML = '';
  const newDiv = document.createElement('div');
  // Set content for the new div
 
  // Add a class to the new div to make it active
  if(colorNameValue === undefined && sizeName === undefined){
    newDiv.textContent = 'select the color and size';
  }else{
    newDiv.textContent = `${title} with Color ${colorNameValue} and Size ${sizeName} added to cart`;
  }
  newDiv.classList.add('frame-261');


  // Append the new div to the container
  container.appendChild(newDiv);
});

}

function loadImage(url, onLoad, onError) {
    const img = new Image();
    img.src = url;
    img.onload = onLoad;
    img.onerror = onError;
}


fetchData();
addToCart();