const createElem = col => {
  const elem = document.createElement('div');
  elem.classList.add('board');
  elem.style.display = 'inline-block';
  elem.style.marginLeft = '10px';
  elem.style.height = '10px';
  elem.style.width = '10px';
  elem.style['background-color'] = col === 0 ? 'silver' : (col === 1 ? 'cornflowerblue' : 'red');
  elem.style['border-radius'] = '90%';
  return elem;
}
const paint = game => {
  document.body.innerHTML = '';
  game.forEach(row => {
    const rowContainer = document.createElement('div');
    row.forEach(col => rowContainer.appendChild(createElem(col)));
    document.body.appendChild(rowContainer);
  });
};

snakeGame(
  handler => document.addEventListener("keydown", e => handler(e.code)),
  ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"],
  paint
);