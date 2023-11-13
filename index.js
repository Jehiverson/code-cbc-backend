import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

import routes from "./src/routes/index.routes.js";
import {connect} from "./src/bd/functions/connect.js";

const PORT = 4500;

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

app.use("", routes);
connect();

app.listen(PORT, () => {
console.log(`Server running on http://localhost:${PORT}`);
});