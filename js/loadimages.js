const FolderPath = 'images/'; 
const Extensions = ['.png', '.jpeg', '.jpg'];

const SelectBox = document.getElementById('selectbox');
const LoadButton = document.getElementById("loadbutton");
const Gallery = document.getElementById("gallery");

const ImagesToLoad = 4;

const ScreenWidth = window.innerWidth;
const ScreenHeight = window.innerHeight;

const ImageWidth = 200;
const ImageHeight = 150;

const ImagesCount = {
    "Animals": 42,
    "Food": 54,
    "Furniture": 12,
    "Shapes": 10,
    "Vehicles": 17
};

const DisplayedImages = [];

const Boxes = [];

function checkOverlap(newBox, existingBox) {
  return (
    newBox.left < existingBox.right &&
    newBox.right > existingBox.left &&
    newBox.top < existingBox.bottom &&
    newBox.bottom > existingBox.top
  );
}

function randomPosition(Attempts) {
    
    var RandomX = Math.floor(Math.random() * (ScreenWidth - ImageWidth));
    var RandomY = Math.floor(Math.random() * ((ScreenHeight - 150) - ImageHeight)) + 50;

    var Box = {
        left: RandomX,
        right: RandomX + ImageWidth,
        top: RandomY,
        bottom: RandomY + ImageHeight
    };

    var Overlapping = false;
    for (let i = 0; i < Boxes.length; i++) {
        if (checkOverlap(Box, Boxes[i])) {
            Overlapping = true;
            break;
        }
    }

    if (Overlapping == false || Attempts >= 100) {
        Boxes.push(Box);
        return Box;
    } else {
        return randomPosition(Attempts + 1);
    }
}

function removeImages() {
    DisplayedImages.forEach(Image => {
        Image.remove();
    });
    DisplayedImages.length = 0;
    Boxes.length = 0;
}

function loadImage(Category) {
    var ImageNumber = Math.floor(Math.random() * (ImagesCount[Category] - 1)) + 1;
    var ImagePath = `images/${Category}/image${ImageNumber}.png`;
    console.log(ImagePath);
    var Image = document.createElement('img');
    DisplayedImages.push(Image);
    Image.src = ImagePath;

    Image.classList.add("random-image");
    var PositionBox = randomPosition(0);
    Image.style.left = `${PositionBox.left}px`;
    Image.style.top = `${PositionBox.top}px`;
    //Image.style.left = `${Math.floor(Math.random() * (ScreenWidth - 200))}px`;
    //Image.style.top = `${Math.floor(Math.random() * (ScreenHeight - 200)) + 50}px`;
    //console.log(Math.floor(Math.random() * (ScreenWidth - ImageSize)));

    Gallery.appendChild(Image);
}

function loadImages() {
    removeImages();
    var Category = SelectBox.value;
    if (Category == "All") {
        let Categories = Object.keys(ImagesCount);
        let CategoryCount = Categories.length;
        for (let i = 1; i <= ImagesToLoad; i++) {
            let RandomCategory = Categories[Math.floor(Math.random() * CategoryCount)];
            loadImage(RandomCategory);
        }
    }
    else {
        for (let i = 1; i <= ImagesToLoad; i++) {
            loadImage(Category);
        }
    }
}

LoadButton.addEventListener("click", loadImages)
