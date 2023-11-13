import {Router as expressRouter} from "express";

import {quiz as AllQuizRoutes} from "./quiz/index.routes.js";

const routes = expressRouter();

routes.use("/quiz/v1", AllQuizRoutes);

export default routes;

