const gridContainer = document.getElementById('grid');
const rangeInput = document.getElementById('rangeInput');
const rangeValue = document.getElementById('rangeValue');
const penColor = document.getElementById('pen-color');
const canvasColor = document.getElementById('canvas-color');
const colorMode = document.getElementById('color-mode');
const rainbowMode = document.getElementById('rainbow-mode');
const eraser = document.getElementById('eraser');
const clearBtn = document.getElementById('clear');
const toggleBtn = document.getElementById('toggle-grid');
let n = 16;

function createGrid() {
    gridContainer.innerHTML = '';
    gridContainer.style.gridTemplateColumns = `repeat(${n}, 1fr)`;
    gridContainer.style.gridTemplateRows = `repeat(${n}, 1fr)`;
    let isDrawing= false;
    let isErasing=false;
    for (let i = 0; i < n * n; i++) {
      const cell = document.createElement('div');
      cell.classList.add('grid-cell');
      gridContainer.appendChild(cell);
      cell.style.border = '0.5px solid white;';
    
      colorMode.addEventListener('click',function(){
        cell.addEventListener('mousedown', startDrawing);
        cell.addEventListener('touchstart', startDrawing);
        cell.addEventListener('mouseover', function() {
            if (isDrawing) {
        const selectedColor = penColor.value;
        this.style.backgroundColor = selectedColor;
            }});

      });
      rainbowMode.addEventListener('click',function(){
        cell.addEventListener('mousedown', startDrawing);
        cell.addEventListener('touchstart', startDrawing);
        cell.addEventListener('mouseover', function() {
            if (isDrawing) {
              const rainbowArray=["violet","indigo","blue","green","yellow","orange","red"]
              const randomIndex=Math.floor(Math.random() * rainbowArray.length);
        const selectedColor = rainbowArray[randomIndex];
        this.style.backgroundColor = selectedColor;
            }});

      });
      eraser.addEventListener('click',function(){
        cell.addEventListener('mousedown', startDrawing);
        cell.addEventListener('touchstart', startDrawing);
        cell.addEventListener('mouseover', function() {
            if (isDrawing) {
        const selectedColor = 'lightgray';
        this.style.backgroundColor = selectedColor;
            }});

      });


      
            canvasColor.addEventListener('input',function(){
            const defaultCanvas = canvasColor.value;
        cell.style.backgroundColor=defaultCanvas;
            });
          clearBtn.addEventListener('click',function(){
            const clearColor = 'lightgray';
        cell.style.backgroundColor = clearColor;
          });

          toggleBtn.addEventListener('click',function(){
            if(cell.style.borderColor == 'white'){
              cell.style.border ='0px';
            }
            else {
              cell.style.border= '0.5px solid white';
            }
          }
          );

      }

    function startDrawing() {
    isDrawing = true;
    
    }
  
  document.addEventListener('mouseup', () => isDrawing = false);
  document.addEventListener('touchend', () => isDrawing = false);
}
function updateGrid(){
    n = parseInt(rangeInput.value);
    rangeValue.textContent = `${n} x ${n}`;
    createGrid();
}

rangeInput.addEventListener('input', updateGrid);
updateGrid();
