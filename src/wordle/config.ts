export const WORDLE_GRID = {
  rows: 6,
  cols: 5,
};

const RIGHT_WORD = "ANDES";
export const RIGHT_WORD_ARRAY = RIGHT_WORD.split("");

export const USER_WORD_ARRAY: (undefined | string)[] = new Array(
  RIGHT_WORD.length
).fill(undefined);
