// const question = document.getElementById('question');
// const choice = Array.from(document.getElementsByClassName('choice-text'));

// let currentQuestion = {};
// let acceptingAnswers = true;
// let score = 0;
// let questoinCounter = 0;
// let availableQuestion = [];

// let questions = [
//   {
//     question: 'Inside which HTML element do we put the JavaScript??',
//     choice1: '<script>',
//     choice2: '<javascript>',
//     choice3: '<js>',
//     choice4: '<scripting>',
//     answer: 1,
//   },
//   {
//     question:
//       "What is the correct syntax for referring to an external script called 'xxx.js'?",
//     choice1: "<script href='xxx.js'>",
//     choice2: "<script name='xxx.js'>",
//     choice3: "<script src='xxx.js'>",
//     choice4: "<script file='xxx.js'>",
//     answer: 3,
//   },
//   {
//     question: " How do you write 'Hello World' in an alert box?",
//     choice1: "msgBox('Hello World');",
//     choice2: "alertBox('Hello World');",
//     choice3: "msg('Hello World');",
//     choice4: "alert('Hello World');",
//     answer: 4,
//   },
// ];

// /// Constants
// const correct_bouns = 10;
// const max_question = 3;

// startGame = () => {
//   // make sure it starts at 0
//   questoinCounter = 0;
//   score = 0;
//   // copy questoins
//   availableQuestion = [...questions];
//   console.log('This is the available question...', availableQuestion);
// };

// getNewQuestion = () => {
//   questoinCounter++;
//   // grap just one question..
//   const questionInex = Math.floor(Math.random() * availableQuestion.length);

//   // take the question we get above from the radom func and put it to the currentQuestion
//   currentQuestion = availableQuestion[questionInex];
// };

const uploadBox = document.querySelector('.upload-box'),
  previewIMG = uploadBox.querySelector('img'),
  fileInput = uploadBox.querySelector('input'),
  widthInput = document.querySelector('.width input'),
  heightInput = document.querySelector('.height input'),
  ratioInput = document.querySelector('.ratio input'),
  qualityInput = document.querySelector('.quality input'),
  downloadBtn = document.querySelector('.download-btn');

let ogImageRatio;

const loadFile = (e) => {
  const file = e.target.files[0]; // getting first user selected file.(user selected image details )
  if (!file) return; // return if the user did not select any file
  previewIMG.src = URL.createObjectURL(file); // passing selected file url to preview img src, URL.createObjectURL() creates a url of the passed object.
  previewIMG.addEventListener('load', () => {
    // once the img upload
    widthInput.value = previewIMG.naturalWidth; // naturalWidth property returns the original width of an image.
    heightInput.value = previewIMG.naturalHeight; // naturalHeight property returns the original height of an image.
    ogImageRatio = previewIMG.naturalWidth / previewIMG.naturalHeight;
    document.querySelector('.wrapper').classList.add('active');
  });
};

widthInput.addEventListener('keyup', () => {
  // getting height according to the ratio checkbox status
  const height = ratioInput.checked
    ? widthInput.value / ogImageRatio
    : heightInput.value;
  heightInput.value = Math.floor(height);
});

heightInput.addEventListener('keyup', () => {
  // getting width according to the ratio checkbox status
  const width = ratioInput.checked
    ? heightInput.value * ogImageRatio
    : widthInput.value;
  widthInput.value = Math.floor(width); // math.floor() rounds the number down to the nearest integer
});

const resizeAndDownload = () => {
  const canvas = document.createElement('canvas');
  const a = document.createElement('a');
  const ctx = canvas.getContext('2d');

  // if quality checkbox is checked, pass 0.7 to imgQuality else pass 1.0
  // 1.0 is 100% quality where 0.7 is 70% of total. you can pass from 0.1 - 1.0
  const imgQuality = qualityInput.checked ? 0.7 : 1.0;

  // setting canvas height & width according to the input values
  canvas.width = widthInput.value;
  canvas.height = heightInput.value;

  // drowing user selected image onto the canvas
  ctx.drawImage(previewIMG, 0, 0, canvas.width, canvas.height); // drawImage(image, x-cordinate, y-cordinate, width, height)

  // passing canvas data to url as href value of <a></a> element
  a.href = canvas.toDataURL('image/jpeg', imgQuality);
  // passing current time as downloaded value
  a.download = new Date().getTime();
  // clicking <a></a> element so the file downloaded
  a.click();
};
downloadBtn.addEventListener('click', resizeAndDownload);
fileInput.addEventListener('change', loadFile);
// by click on upload box please trigger the fileInput
uploadBox.addEventListener('click', () => fileInput.click());
