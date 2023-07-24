import { fromEvent } from "rxjs";
import { USER_WORD_ARRAY, RIGHT_WORD_ARRAY, WORDLE_GRID } from "./config";

const onKeyUp$ = fromEvent<KeyboardEvent>(document, "keyup");
const letterRows = document.getElementsByClassName("letter-row")!;
const restartBtnCollection = document.getElementsByClassName("restart-btn");

let cursorIndex = 0;
let rowIndex = 0;

const insertLetter = {
  next: (event: KeyboardEvent) =>
    keyAction(event, insertLetterAtCurrentIndex, isLetterKey),
};
const deleteLetter = {
  next: (event: KeyboardEvent) =>
    keyAction(event, deleteLetterAtCurrentIndex, isDeleteKey),
};
const checkWord = {
  next: (event: KeyboardEvent) => keyAction(event, checkUserInput, isEnterKey),
};

export function start() {
  onKeyUp$.subscribe(insertLetter);
  onKeyUp$.subscribe(deleteLetter);
  onKeyUp$.subscribe(checkWord);
}
function keyAction(
  event: KeyboardEvent,
  action: (key: string) => void,
  verifier?: (key: string) => boolean
) {
  const pressedKey = event.key.toUpperCase();
  if (!verifier?.(pressedKey) ?? false) return;
  action(pressedKey);
}
function isLetterKey(key: string) {
  const regex = /^[a-z]$/i;
  return regex.test(key);
}
function isEnterKey(key: string) {
  return key.toLowerCase() === "enter";
}
function isDeleteKey(key: string) {
  return key.toLowerCase() === "backspace";
}
function restartCursor() {
  cursorIndex = 0;
}
function moveToNextLetter() {
  if (cursorIndex === WORDLE_GRID.cols) return;
  cursorIndex++;
}
function moveToPrevLetter() {
  if (cursorIndex === 0) return;
  cursorIndex--;
}
function moveToNextRow() {
  if (rowIndex === WORDLE_GRID.rows - 1) return;
  rowIndex++;
}
function checkUserInput() {
  if (USER_WORD_ARRAY.includes(undefined)) return;
  const restartBtn = restartBtnCollection[0] as HTMLButtonElement;
  let hasWon = true;

  USER_WORD_ARRAY.forEach((letter, index) => {
    const element = getCellAtIndex(index);
    let hasGuessedLetter = RIGHT_WORD_ARRAY.includes(letter!);
    let hasGuessedPosition = letter! === RIGHT_WORD_ARRAY[index];

    if (hasGuessedPosition) element.classList.add("correct");
    else if (hasGuessedLetter) element.classList.add("wrong");

    hasWon = hasWon && hasGuessedPosition;
  });

  if (hasWon || rowIndex == WORDLE_GRID.rows - 1) restartBtn.disabled = false;
  else {
    moveToNextRow();
    restartCursor();
  }
}
function deleteLetterAtCurrentIndex() {
  const deleteIndex = cursorIndex - 1;
  if (deleteIndex < 0) return;

  const element = getCellAtIndex(deleteIndex);
  element.classList.remove("typed", "correct", "wrong");
  element.textContent = "";

  USER_WORD_ARRAY.splice(deleteIndex, 1, undefined);
  moveToPrevLetter();
}
function insertLetterAtCurrentIndex(letter: string) {
  if (cursorIndex === WORDLE_GRID.cols) return;
  if (rowIndex === WORDLE_GRID.rows) return;

  const element = getCellAtIndex(cursorIndex);
  element.classList.add("typed");
  element.textContent = letter;

  USER_WORD_ARRAY.splice(cursorIndex, 1, letter);
  moveToNextLetter();
}
function getCellAtIndex(index: number) {
  const letterRow = letterRows.item(rowIndex);
  if (!letterRow) throw new Error(`No row at index ${rowIndex}`);

  const letterCell = letterRow.children.item(index);
  if (!letterCell) throw new Error(`No cell at [${rowIndex}, ${index}]`);

  return letterCell;
}
