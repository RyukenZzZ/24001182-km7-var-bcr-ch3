const fs = require("fs");
const cars = require("../../data/cars.json");
const { v4: uuidv4 } = require('uuid');


exports.getCars = (manufacture, model) => {
    const searchedCar = cars.filter((car) => {
        // Do filter logic here
        let result = true;
        if (manufacture) {
            const isFoundManufacture = car.manufacture
                .toLowerCase()
                .includes(manufacture.toLowerCase());
            result = result && isFoundManufacture;
        }
        if (model) {
            const isFoundModel = car.model
                .toLowerCase()
                .includes(model.toLowerCase());
            result = result && isFoundModel;
        }
       
        return result;
    });
    return searchedCar;
};

exports.getCarById = (id) => {
    // find car by id
    const car = cars.find((car) => car.id == id);
    return car;
};

exports.createCar = (data) => {
    const newCar = {
        id: uuidv4(),
        ...data,
    };

    cars.push(newCar);

    // Save the latest data to json
    fs.writeFileSync(
        "./data/cars.json",
        JSON.stringify(cars, null, 4),
        "utf-8"
    );

    return newCar;
};

exports.updateCar = (id, data) => {
    // Find the existing car data
    const car = cars.find((car) => car.id === Number(id));
    if (!car) {
        // Make a error class
        throw new NotFoundError("car is Not Found!");
    }

    // Update the data
    Object.assign(car, data);

    // Update the json data
    fs.writeFileSync(
        "./data/cars.json",
        JSON.stringify(cars, null, 4),
        "utf-8"
    );

    return car;
};

exports.deleteCarById = (id) => {
    // Find index
    const carIndex = cars.findIndex((car) => car.id == id);

    if (carIndex < 0) {
        // If no index found
        return null;
    }

    const deletedCar = cars.splice(carIndex, 1);

    // Update the json
    fs.writeFileSync(
        "./data/cars.json",
        JSON.stringify(cars, null, 4),
        "utf-8"
    );
    return deletedCar;
};