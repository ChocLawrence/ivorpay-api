import * as express from "express";
import * as bodyParser from "body-parser";
import * as morgan from "morgan";
import { Request, Response } from "express";
import { Routes } from "./routes";
import { validationResult } from "express-validator";
import * as cors from "cors";

function handleError(err, req, res, next) {
  res.status(err.statusCode || 500).send({ message: err.message });
}


// create express app
const app = express();
app.use(morgan("tiny")); // 'combined' in prod
app.use(cors());
app.use(bodyParser.json());

// register express routes from defined application routes
Routes.forEach((route) => {
  (app as any)[route.method](
    route.route,
    ...route.validation,
    async (req: Request, res: Response, next: Function) => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        const result = await new (route.controller as any)()[route.action](
          req,
          res,
          next
        );
        res.json(result);
      } catch (err) {
        next(err);
      }
    }
  );
});

// setup express app here
// ...
app.use(handleError);

export default app;

