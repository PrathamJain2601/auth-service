"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const delete_profile_controller_1 = require("./delete-profile.controller");
const get_profile_controller_1 = require("./get-profile.controller");
const update_profile_controller_1 = require("./update-profile.controller");
const user = { deleteProfile: delete_profile_controller_1.deleteProfile, getProfile: get_profile_controller_1.getProfile, updateProfile: update_profile_controller_1.updateProfile };
exports.default = user;
