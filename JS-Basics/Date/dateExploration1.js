const date = new Date("1991-03-24T00:00:00.000Z");

const dataArray = [
  new Date(),
  new Date(0),
  new Date("03/24/1991"),
  new Date("1991-03-24T00:00:00.000Z"),
  new Date("1991-03-24T00:00:00.000Z").toLocaleDateString(),
  new Intl.DateTimeFormat().format(date),
  new Intl.DateTimeFormat("fr-Fr").format(date) //this seems to works in browser but note in node...
];

dataArray.forEach(date => console.log(date));
