import fs from 'node:fs'
import path from 'node:path'

function parserInput(input: string) {
  const inputParsed = input.split('\n').map(v => v.split('   ').map(v => Number.parseInt(v)));
  const tuple: [number[], number[]] = [[], []];

  for(let i = 0; i < 2; i++ ) {
    const row = [];
    for(let j = 0; j < inputParsed.length; j++) {
      row.push(inputParsed[j][i]);
    }
    tuple[i] = row
  }
  return tuple
}


(() => {
  const [list1, list2] = parserInput(fs.readFileSync(path.join(__dirname, '..', 'input/day1/input.txt'), 'utf-8'));

  console.log(part1(list1, list2))
  console.log(part2(list1, list2))

})()

function part1(list1: number[], list2: number[]) {
  list1.sort((a,b) => a - b);
  list2.sort((a,b) => a - b);

  let sum = 0
  for(let i = 0; i < list1.length; i++) {
    sum += Math.abs(list1[i] - list2[i]);
  }
  return sum
}

function part2(list1: number[], list2: number[]){
  const numberhashMap: { [key: number]: number } = {}
  let similarity = 0

  for(let i = 0; i < list1.length; i++) {
    if(list1[i] in numberhashMap) {
      const number = numberhashMap[list1[i]]
      numberhashMap[list1[i]] = number + 1
    }else {
      numberhashMap[list1[i]] = 1
    }
  }
  for(let i = 0; i < list1.length; i++) {
    if(list2[i] in numberhashMap) {
      const number = list2[i] * numberhashMap[list2[i]]
      similarity += number
    }
  }
  return similarity
}



