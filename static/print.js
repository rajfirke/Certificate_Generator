  const canvas = document.getElementById("canvas");
  const fileInput = document.getElementById("certificate-image");
  const ctx = canvas.getContext("2d");
//validate form cha
function validateForm() {
  const form = document.querySelector("form");
  if (form.checkValidity()) {
    return true; 
  } else {
    form.reportValidity();
    return false; 
  } 
}

  /////////////////////////////////////////////////////////////////////////////////BUTTON ACTIVE ONLY////////////
  document.addEventListener('DOMContentLoaded', function() {
    var fileInput = document.getElementById('certificate-image');
    var button = document.getElementById('btn-select-coordinates');

    fileInput.addEventListener('change', function() {
        if (fileInput.value) {
            button.disabled = false;
            console.log("hi buye")
        } else {
            button.disabled = true;
        }
    });
  });

/////////////////////////////////////////////////////////////////////////////////


  // Listen for changes in the file input
  fileInput.addEventListener("change", function (e) {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = function (event) {
      const img = new Image();

      img.onload = function () {
        // Set the canvas size to match the image size
        const widthToHeight = img.width / img.height;

        const MAX_ALLOWED_WIDTH = 600;

        if (img.width > MAX_ALLOWED_WIDTH) {
          canvas.width = MAX_ALLOWED_WIDTH;
          canvas.height = MAX_ALLOWED_WIDTH / widthToHeight;
          canvas.dataset._resizeFactor = MAX_ALLOWED_WIDTH / img.width;
        } else {
          canvas.width = img.width;
          canvas.height = img.height;
        }
        canvas.dataset._image = event.target.result;

        // Draw the image on the canvas
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      };
      img.src = event.target.result;
    };

    reader.readAsDataURL(file);
  });

  document
    .getElementById("btn-select-coordinates")
    .addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(".overlay").classList.remove("hidden");
      canvas.addEventListener("mousemove", handleMouseMove);
      // console.log("Button clicked, but form submission is prevented!");
    });

  document.getElementById("btn-overlay-close").addEventListener("click", (e) => {
    document.querySelector(".overlay").classList.add("hidden");
  });

  function handleMouseMove(e) {
    const container = document.querySelector(".overlay");
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    canvas.dataset._x = x;
    canvas.dataset._y = y;

    const originalImage = new Image();
    originalImage.src = canvas.dataset._image;

    ctx.drawImage(originalImage, 0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "red";
    ctx.lineWidth = 3;

    ctx.beginPath(); // Start a new path
    ctx.moveTo(x - 15, y); // Move the pen to (30, 50)
    ctx.lineTo(x + 15, y); // Draw a line to (150, 100)
    ctx.stroke(); // Render the path

    ctx.beginPath(); // Start a new path
    ctx.moveTo(x, y - 15); // Move the pen to (30, 50)
    ctx.lineTo(x, y + 15); // Draw a line to (150, 100)
    ctx.stroke(); // Render the path
  }

  canvas.addEventListener("click", (e) => {
    canvas.removeEventListener("mousemove", handleMouseMove);
  });

  document
    .getElementById("btn-confirm-coordinates")
    .addEventListener("click", (e) => {
      e.preventDefault(); // Prevent form submission
      document.querySelector(".overlay").classList.add("hidden");

      var xi = canvas.dataset._x / (canvas.dataset._resizeFactor || 1);
      var yi = canvas.dataset._y / (canvas.dataset._resizeFactor || 1);

      document.getElementById("x-coordinate").value = xi;
      document.getElementById("y-coordinate").value = yi;
    });



  
  
