"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_controller_1 = __importDefault(require("../controllers/user/index.controller"));
const router = (0, express_1.Router)();
router.get("/get", index_controller_1.default.getProfile);
router.put("/update", index_controller_1.default.updateProfile);
router.delete("/delete", index_controller_1.default.deleteProfile);
exports.default = router;
