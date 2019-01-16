const snakeGame = (keypressHandler, keys, render) => {
  const empty = 0;
  const snake = 1;
  const food = 2;
  const setDir = (x, y) => {dirX = x; dirY = y;};
  const handlers = {
    [keys[0]]: [() => setDir(-1, 0)],
    [keys[1]]: [() => setDir(1, 0)],
    [keys[2]]: [() => setDir(0, -1)],
    [keys[3]]: [() => setDir(0, 1)]
  }
  keypressHandler((key) => handlers[key].forEach(action => action()));

  const boardHeight = 20;
  const boardWidth = 20;
  const board = Array(boardHeight).fill(empty).map(e => Array(boardWidth).fill(empty));
  let currentX = boardHeight / 2;
  let currentY = boardWidth / 2;
  let dirX = 0;
  let dirY = 1;

  const node = (x, y, next) => ({x, y, next});
  const getRandom = max => Math.floor(Math.random() * (max - 0))
  const newFood = () => node(getRandom(boardHeight),getRandom(boardWidth));
  let head = node(3, 2, node(4, 2, node(5, 2, node(6, 2, node(7, 2)))));
  let foodNode = newFood();
  let interval;
  const updateCurrentPosition = () => {
    currentX += dirX;
    currentY += dirY;
  }
  const iterateSnake = (nodeUpdate, terminationAction, startingNode) => {
    let n = startingNode || head;
      while(true) {
        if(!n.next.next) {
          terminationAction(n);
          break;
        }
        nodeUpdate(n);
        n = n.next;
      }
  }

  const wrap = () => iterateSnake(n => {
    if(n.x < 0) n.x = boardHeight - 1;
    if(n.x > boardHeight - 1) n.x = 0;
    if(n.y < 0) n.y = boardWidth - 1;
    if(n.y > boardWidth - 1) n.y = 0;
  }, _ => {});
  const checkForGameOver = () => iterateSnake(
      n => { if(head.x === n.x && head.y === n.y) { clearInterval(interval); } }, 
      _ => {}, 
      head.next);
  const removeTail = () => iterateSnake(_ => {}, n => n.next = undefined);
  const checkForFood = () => head.x === foodNode.x && head.y === foodNode.y ? foodNode = newFood() : removeTail();
  const updateSnake = () => {
    head = node(head.x + dirX, head.y + dirY, Object.assign({}, head));
    checkForGameOver();
    checkForFood();
    wrap();
  }
  const addSnakeToTheBoard = () => {
    let n = head;
    while(n) {
        board[n.x][n.y] = snake;
        n = n.next;
    }
  }
  const clearBoard = () => board.forEach((r, i) => r.forEach((_, j) => board[i][j] = empty));

  interval = setInterval(() => {
    updateCurrentPosition();
    updateSnake();
    clearBoard();
    addSnakeToTheBoard();
    board[foodNode.x][foodNode.y] = food;
    render(board);
  }, 200);
}

module.exports = snakeGame;