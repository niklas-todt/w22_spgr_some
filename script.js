// Global Variables

const input = document.getElementById('input-file'),
      upload = document.getElementById("uploadButton"),
      downloadBtn = document.getElementById("downloadButton"),
      download = document.getElementById("download"),
      downloadFrame = document.getElementById("downloadFrame"),
      uploadFrame = document.getElementById("uploadFrame"),
      canvas = document.getElementById('preview'),
      ph = document.getElementById('placeholder'),
      context = canvas.getContext('2d'),
      reader = new FileReader(),
      img = new Image();
      dLink = document.getElementById('downloadLink'),
      inputStorage = document.getElementById('inputStorage'),
      image = document.getElementById('filter'),
      selectLang = document.getElementById('lang'),
      downloadBtn.disabled = true;

//Onload LANG Handling

selectLang.onload = function() {
  if (navigator.language.toLowerCase().includes('it')) {
    selectLang.value = 'it';
  } else if (navigator.language.toLowerCase() == 'rm') {
    selectLang.value = 'rm';
  } else {
    selectLang.value = 'de';
  }
};

//DragAndDrop

document.body.addEventListener('dragover', (event) => {
  event.stopPropagation();
  event.preventDefault();
  alert('Bitte lade das Foto über HOCHLADEN hoch.');
});

uploadFrame.addEventListener('click', function() {
      upload.click();
});

selectLang.addEventListener('change', function() {
  if (selectLang.options[selectLang.selectedIndex].value === 'it') {
    image.src = 'assets/filter-it.png';
  } else if (selectLang.options[selectLang.selectedIndex].value === 'rm') {
    image.src = 'assets/filter-rm.svg';
  } else {
    image.src = 'assets/filter-de.png';
  };
  if (!downloadBtn.disabled) {
    context.drawImage(image, 0, 0, 1080, 1080);
  };
});

input.addEventListener('change', async function () {
    await drawImageFromInput();
    prepareDownloadLink();
});

  function drawImageFromInput() {
    context.clearRect(0, 0, 1080, 1080);

    if (input.files.length === 0) {
      context.drawImage(ph, 0, 0, 1080, 1080);
      if (typeof callback === 'function') callback();
    } else {
      const img = new Image();
      img.addEventListener('load', function () {
        size = Math.min(img.height, img.width);
        x1 = 0;
        y1 = 0;
        if (img.height < img.width) {
          //breit
          x1 = img.width / 2 - size / 2;
        } else if (img.height > img.width) {
          //hoch
          y1 = img.height / 2 - size / 2;
        }
        context.drawImage(img, x1, y1, size, size, 0, 0, 1080, 1080);
        context.drawImage(image, 0, 0, 1080, 1080);
        prepareDownloadLink();

        if (typeof callback === 'function') callback();
      });
      img.src = URL.createObjectURL(input.files[0]);
    }
  }

function prepareDownloadLink() {
  downloadBtn.disabled = false;
  download.href = canvas.toDataURL("image/png");
}

placeholder.onload = drawImageFromInput;
