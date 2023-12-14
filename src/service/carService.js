const BaseRepository = require("../repository/base/baseRepository");
const Tax = require("../entities/tax");

class CarService {
  constructor({ cars }) {
    this.carRepository = new BaseRepository({ file: cars });

    this.currencyFormat = new Intl.NumberFormat("pt-br", {
      style: "currency",
      currency: "BRL",
    });

    this.taxesBasedOnAge = Tax.taxesBasedOnAge;
  }

  async getAvailableCar(carCategory) {
    const carId = this.chooseRandomCar(carCategory);

    const car = await this.carRepository.find(carId);

    return car;
  }

  chooseRandomCar(carCategory) {
    const randomCarIndex = this.getRandomPositionFromArray(carCategory.carIds);
    const carId = carCategory.carIds[randomCarIndex];

    return carId;
  }

  getRandomPositionFromArray(list) {
    const listLength = list.length;

    return Math.floor(Math.random() * listLength);
  }

  calculateFinalPrice(customer, carCategory, numberPerDays) {
    const { age } = customer;
    const price = carCategory.price;
    const { then: tax } = this.taxesBasedOnAge.find(
      (tax) => age >= tax.from && age <= tax.to
    );
    const finalPrice = ((tax * price) * numberPerDays) 

    return this.currencyFormat.format(finalPrice)
  }
}

module.exports = CarService;
