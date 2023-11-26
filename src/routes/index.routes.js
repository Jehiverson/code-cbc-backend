import {Router as expressRouter} from "express";

import {quiz as AllQuizRoutes} from "./quiz/index.routes.js";
import {settings as AllSettingsRoutes} from "./settings/index.routes.js";
const routes = expressRouter();

routes.use("/quiz/v1", AllQuizRoutes);
routes.use("/settings/v1", AllSettingsRoutes);

export default routes;

