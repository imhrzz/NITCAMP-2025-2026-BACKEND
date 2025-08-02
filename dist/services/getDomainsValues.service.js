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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDomainsValues = void 0;
const domains_model_1 = __importDefault(require("../models/domains.model"));
const getDomainsValues = (domain_name, code) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const domain = yield domains_model_1.default.findOne({ where: { domain_name: domain_name, code: code } });
        if (domain === null) {
            return "";
        }
        const domainJson = domain.toJSON();
        return domainJson.value;
    }
    catch (error) {
        throw error;
    }
});
exports.getDomainsValues = getDomainsValues;
