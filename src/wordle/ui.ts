import { WORDLE_GRID } from "./config";

const app = document.querySelector("#app");

const CLASSNAMES = {
  container: "letters-container",
  row: "letter-row",
  cell: "letter",
};

export function generateUI() {
  verifyAppContainer();
  generateGrid();
  generateRestartButton();
}

function verifyAppContainer() {
  if (!app) throw new Error(`There's no app container in the document`);
  return app;
}
function generateGrid() {
  const container = document.createElement("div");
  container.classList.add(CLASSNAMES.container);

  for (let i = 0; i < WORDLE_GRID.rows; i++) {
    const row = document.createElement("div");
    row.classList.add(CLASSNAMES.row);

    for (let j = 0; j < WORDLE_GRID.cols; j++) {
      const cell = document.createElement("div");
      cell.classList.add(CLASSNAMES.cell);
      row.appendChild(cell);
    }
    container.appendChild(row);
  }
  let app = verifyAppContainer();
  app.appendChild(container);
}
function generateRestartButton() {
  const button = document.createElement("button");
  button.disabled = true;
  button.classList.add("restart-btn");
  button.textContent = "Restart";
  button.addEventListener("click", () => location.reload());

  let app = verifyAppContainer();
  app.appendChild(button);
}
