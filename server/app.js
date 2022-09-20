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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const promises_1 = __importDefault(require("fs/promises"));
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, file.originalname.split(".")[0] +
            "-" +
            uniqueSuffix +
            "." +
            file.originalname.split(".")[1]);
    },
});
const upload = (0, multer_1.default)({ storage: storage });
// ENV Variables
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Express App
const app = (0, express_1.default)();
// PORT
const port = process.env.PORT;
// MIDDLEWARE
app.use((0, cors_1.default)({
    origin: ["http://localhost:5173", process.env.FRONTEND || ""],
}));
app.use(express_1.default.static("public"));
// Routes
app.get("/", (req, res) => {
    res.send("HELLO");
});
// Uplaod File
app.post("/upload", upload.single("file"), (req, res) => {
    const file = req.file;
    if (file) {
        const file_meta_data = {
            name: file.originalname,
            type: file.mimetype,
            size: file.size,
        };
        res.status(201).send(file_meta_data);
    }
    res.status(401).send();
});
app.get("/files", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const files = yield promises_1.default.readdir("./public");
    res.json({ files });
}));
app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}.`);
});
