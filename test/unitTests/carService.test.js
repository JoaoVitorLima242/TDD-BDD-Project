const { describe, it, before } = require("mocha");
const { join } = require("path");
const assert = require('assert')
const CarService = require("../../src/service/carService");

const carsDatabase = join(__dirname, "./../../database", "cars.json");
const mocks = {
  validCarCategory: require('../mocks/valid-carCategory.json'),
  validCar: require('../mocks/valid-car.json'),
  validCustomer: require('../mocks/valid-customer.json')
}

describe("CarService Suite Tests", () => {
  let carService = {};

  before(() => {
    carService = new CarService({ cars: carsDatabase });
  });

  it("given a carCategory it should return an available car", async () => {
    const result = await carService.getAvailableCar()
    const expect = {}

    assert.deepStrictEqual(result, expect)
  });
});
