module.exports = { contents: "\"use strict\";\nvar __extends = (this && this.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar dexie_1 = __importDefault(require(\"dexie\"));\nvar StickeryDatabase = /** @class */ (function (_super) {\n    __extends(StickeryDatabase, _super);\n    function StickeryDatabase() {\n        var _this = _super.call(this, 'Stickery') || this;\n        _this.version(1).stores({\n            images: '++id, name, type, data'\n        });\n        _this.images = _this.table('images'); // Just informing Typescript what Dexie has already done...\n        return _this;\n    }\n    return StickeryDatabase;\n}(dexie_1.default));\nexports.stickeryDB = new StickeryDatabase();\n",
dependencies: ["dexie"],
sourceMap: {},
headerContent: undefined,
mtime: 1580742707176,
devLibsRequired : undefined,
ac : undefined,
_ : {}
}
