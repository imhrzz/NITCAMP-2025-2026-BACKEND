"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.menteeInitailInfo = exports.menteeExtraInfo = void 0;
const getDomainsValues_service_1 = require("./getDomainsValues.service");
const menteeExtraInfo = (email) => {
    const roll = email.toLocaleLowerCase().split("_")[1].split("@")[0];
    const extraInfo = {
        rollNo: roll,
        yearOfAdd: parseInt("20" + roll.substring(1, 3)),
        degree_code: roll[0],
        branch_code: roll.slice(-2)
    };
    return extraInfo;
};
exports.menteeExtraInfo = menteeExtraInfo;
const menteeInitailInfo = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const extraInfo = (0, exports.menteeExtraInfo)(email);
    const branch = yield (0, getDomainsValues_service_1.getDomainsValues)("department", extraInfo.branch_code);
    const degree = yield (0, getDomainsValues_service_1.getDomainsValues)("degree", extraInfo.degree_code);
    return {
        roll_no: extraInfo.rollNo,
        year_of_admission: extraInfo.yearOfAdd,
        degree: degree,
        branch: branch
    };
});
exports.menteeInitailInfo = menteeInitailInfo;
