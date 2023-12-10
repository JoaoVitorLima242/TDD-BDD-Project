const faker = require("faker");
const { join } = require("path");
const { writeFile } = require("fs/promises");

const Car = require("../src/entities/car");
const CarCategory = require("../src/entities/carCategory");
const Customer = require("../src/entities/customer");

const seederBaseFolder = join(__dirname, "../", "database");
const ITEMS_AMOUNT = 2;

const carCategory = new CarCategory({
  id: faker.random.uuid(),
  name: faker.vehicle.type(),
  carIds: [],
  price: faker.finance.amount(20, 100),
});

const cars = [];

for (let index = 0; index < ITEMS_AMOUNT; index++) {
  const car = new Car({
    id: faker.random.uuid(),
    name: faker.vehicle.model(),
    gasAvailable: true,
    available: true,
    releaseYear: faker.date.past().getFullYear(),
  });
  carCategory.carIds.push(car.id);
  cars.push(car);
}

const write = (filename, data) => writeFile(join(seederBaseFolder, filename), JSON.stringify(data));

;(async () => {
    await write('cars.json', cars)
    await write('carCategories.json', [carCategory])
})();
