const { z } = require("zod");
const { BadRequestError } = require("../utils/request");

exports.validateGetCars = (req, res, next) => {
  // Validate the query
  const validateQuery = z.object({
    manufacture: z.string().optional(),
    model: z.string().optional(),
  });

  const resultValidateQuery = validateQuery.safeParse(req.params);
  if (!resultValidateQuery.success) {
    // If validation fails, return error messages
    throw new BadRequestError(resultValidateQuery.error.errors);
  }

  next();
};

exports.validateGetCarById = (req, res, next) => {
  // Make a validation schema
  const validateParams = z.object({
    id: z.string(),
  });

  const result = validateParams.safeParse(req.params);
  if (!result.success) {
    // If validation fails, return error messages
    throw new BadRequestError(result.error.errors);
  }

  next();
};

exports.validateCreateCar = (req, res, next) => {

  req.body = {
    ...req.body,
    rentPerDay: Number(req.body.rentPerDay), // Convert rentPerDay to number
    capacity: Number(req.body.capacity), // Convert capacity to number
    year: Number(req.body.year), // Convert year to number
    available: req.body.available === "true", // Convert available to boolean
    options: Array.isArray(req.body.options)? req.body.options: [req.body.options], // Convert options to array
    specs: Array.isArray(req.body.specs) ? req.body.specs : [req.body.specs],
  };

  // Validation body schema
  const validateBody = z.object({
    plate: z.string(),
    manufacture: z.string(),
    model: z.string(),
    image: z.object({
        name: z.string(),
        data: z.any(),
      }).nullable().optional(),
    rentPerDay: z.number(),
    capacity: z.number(),
    description: z.string(),
    availableAt: z.string(),
    transmission: z.string(),
    available: z.boolean(),
    type: z.string(),
    year: z.number(),
    options: z.array(z.string()),
    specs: z.array(z.string()),
  });

  const result = validateBody.safeParse(req.body);
  if (!result.success) {
    // If validation fails, return error messages
    throw new BadRequestError(result.error.errors);
  }

  next();
};

exports.validateUpdateCar = (req, res, next) => {
  // zod validation
  const validateParams = z.object({
    id: z.string(),
  });

  const resultValidateParams = validateParams.safeParse(req.params);
  if (!resultValidateParams.success) {
    // If validation fails, return error messages
    throw new BadRequestError(resultValidateParams.error.errors);
  }

  // Parse req.body
  req.body = {
    ...req.body,
    rentPerDay: Number(req.body.rentPerDay), // Convert rentPerDay to number
    capacity: Number(req.body.capacity), // Convert capacity to number
    year: Number(req.body.year), // Convert year to number
    available: req.body.available === "true", // Convert available to boolean
    options: Array.isArray(req.body.options)? req.body.options: [req.body.options], // Convert options to array
    specs: Array.isArray(req.body.specs) ? req.body.specs : [req.body.specs],
  };

  // Validation body schema
  const validateBody = z.object({
    plate: z.string(),
    manufacture: z.string(),
    model: z.string(),
    image: z.object({
        name: z.string(),
        data: z.any(),
      }).nullable().optional(),
    rentPerDay: z.number(),
    capacity: z.number(),
    description: z.string(),
    availableAt: z.string(),
    transmission: z.string(),
    available: z.boolean(),
    type: z.string(),
    year: z.number(),
    options: z.array(z.string()),
    specs: z.array(z.string()),
  });

  // Validate
  const resultValidateBody = validateBody.safeParse(req.body);
  if (!resultValidateBody.success) {
    // If validation fails, return error messages
    throw new BadRequestError(resultValidateBody.error.errors);
  }

  next();
};

exports.validateDeleteCarById = (req, res, next) => {
  // Make a validation schema
  const validateParams = z.object({
    id: z.string(),
  });

  const result = validateParams.safeParse(req.params);
  if (!result.success) {
    // If validation fails, return error messages
    throw new BadRequestError(result.error.errors);
  }

  next();
};
