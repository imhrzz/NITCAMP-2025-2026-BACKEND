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
exports.getDomainsController = void 0;
const domains_model_1 = __importDefault(require("../models/domains.model"));
const getDomainsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const domain_name = req.params.domain_name;
    console.log("Domain name:", domain_name);
    if (!domain_name) {
        console.log("Domain name not found");
        res.status(500).json({ error: "Internal Server Error" });
        return;
    }
    try {
        const domain = yield domains_model_1.default.findAll({ where: { domain_name: domain_name }, attributes: ["code", "value"] });
        if (domain.length === 0) {
            console.log(`Nothing found in ${domain_name} table sending an empty array`);
            res.status(200).json({ message: "Success", domain: [] });
            return;
        }
        console.log(`Domains data sent successfully for ${domain_name}`);
        res.status(200).json({ message: "Success", domain });
        return;
    }
    catch (error) {
        console.log(`Error in fetching domains table values for ${domain_name}:`, error);
        res.status(500).json({ error: "Internal Server Error" });
        return;
    }
});
exports.getDomainsController = getDomainsController;
