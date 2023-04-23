import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

import { expressjwt as expressJWT } from "express-jwt";
import { getToken, secretKey } from "./token/token.js";

import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";

import clientRoutes from "./routes/client.js";
import generalRoutes from "./routes/general.js";
import managementRoutes from "./routes/management.js";
import salesRoutes from "./routes/sales.js";
import loginRoutes from "./routes/login.js";
import registerRoutes from "./routes/register.js";

// data imports
import User from "./models/User.js";
import Product from "./models/Product.js";
import ProductStat from "./models/ProductStat.js";
import Transaction from "./models/Transaction.js";
import OverallStat from "./models/OverallStat.js";
import AffiliateStat from "./models/AffiliateStat.js";
import {
    dataUser,
    dataProduct,
    dataProductStat,
    dataTransaction,
    dataOverallStat,
    dataAffiliateStat,
} from "./data/index.js";

/* Configuration */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use((req, res, next) => {
    const token = req.headers["authorization"];
    if (token === undefined) {
        return next();
    } else
        getToken(token)
            .then((data) => {
                req.data = data;
                return next();
            })
            .catch((err) => {
                return next();
            });
});

app.use(
    expressJWT({ secret: secretKey, algorithms: ["HS256"] }).unless({
        path: ["/login/query", "/register/signin"],
    })
); //加密方式SHA256在express-jwt的命名

/* Routes */
app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes);
app.use("/login", loginRoutes);
app.use("/register", registerRoutes);

app.use((err, req, res, next) => {
    if (err.status == 401) {
        return res.status(401).json({ message: "token invalid!" });
    }
});

/* Mongoose setup */
const PORT = process.env.PORT || 9000;
mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        app.listen(PORT, () => console.log("Server Port: ", PORT));

        // /* Only add data one time */
        // AffiliateStat.insertMany(dataAffiliateStat);
        // OverallStat.insertMany(dataOverallStat);
        // Product.insertMany(dataProduct);
        // ProductStat.insertMany(dataProductStat);
        // Transaction.insertMany(dataTransaction);
        // User.insertMany(dataUser);
    })
    .catch((error) => console.log(`${error} did not connect`));
