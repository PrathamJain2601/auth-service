"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const rabbitmq_config_js_1 = require("./config/rabbitmq.config.js");
dotenv_1.default.config();
const app = (0, express_1.default)();
(0, rabbitmq_config_js_1.startConsumer)();
const PORT = process.env.PORT || 8000;
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
;
app.use((0, cors_1.default)({
    origin: "your-frontend-domain", // Make sure this matches your front-end URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
app.get("/", (req, res) => {
    res.send("server is running");
});
const auth_routes_js_1 = __importDefault(require("./routes/auth.routes.js"));
app.use("/auth", auth_routes_js_1.default);
const otp_routes_js_1 = __importDefault(require("./routes/otp.routes.js"));
app.use("/otp", otp_routes_js_1.default);
const user_routes_js_1 = __importDefault(require("./routes/user.routes.js"));
app.use("/user", user_routes_js_1.default);
app.listen(PORT, () => {
    console.log(`server running on port ${process.env.PORT}`);
});
