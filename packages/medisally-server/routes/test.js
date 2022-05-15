const arrToObj = require("./arrToObj");

const array = [
  {
    id: 1,
    name: "한율",
    age: 30,
  },
  {
    id: 5,
    name: "바보",
    age: 20,
  },
];

const object = arrToObj(array);

console.log(object);
