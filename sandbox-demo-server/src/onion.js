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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var Onion = /** @class */ (function () {
    function Onion(middlewares) {
        if (middlewares === void 0) { middlewares = []; }
        this.middlewares = [];
        this.middlewares = middlewares;
    }
    Onion.prototype.use = function (middleware) {
        this.middlewares.push(middleware);
    };
    Onion.prototype.execute = function (context) {
        // 将上下文和中间件嵌入到上一级的中间件中,并将上下文保存到每一个中间件中
        var fn = compose(this.middlewares);
        return fn(context);
    };
    return Onion;
}());
exports["default"] = Onion;
// function compose(middlewares: Array<Middleware>) {
//   if (!Array.isArray(middlewares)) {
//     throw new Error('中间件是数组形式');
//   }
//   for (let i = 0; i < (middlewares as Middleware[]).length; i++) {
//     if (typeof middlewares[i] !== 'function') {
//       throw new Error('中间件的每一项是函数形式');
//     }
//   }
//   return (context: any) => {
//     let index = 0;
//     function dispatch(fn: Middleware | undefined) {
//       if (!fn) {
//         return Promise.resolve();
//       }
//       // 这个将下一个中间件赋给当前中间件的next参数
//       const next = () => dispatch(middlewares[++index]);
//       return Promise.resolve(fn(context, next));
//     }
//     return dispatch(middlewares[index]);
//   }
// }
function compose(middlewares) {
    if (!Array.isArray(middlewares)) {
        throw new Error('中间件须是数组形式');
    }
    for (var i = 0; i < middlewares.length; i++) {
        if (typeof middlewares[i] !== 'function') {
            throw new Error('中间件的每一项须是函数');
        }
    }
    return function (context) {
        var index = 0;
        function dispatch(fn) {
            if (!fn) {
                return Promise.resolve();
            }
            var next = function () { return dispatch(middlewares[++index]); };
            return Promise.resolve(fn(context, next));
        }
        return dispatch(middlewares[0]);
    };
}
var onion = new Onion();
onion.use(function (context, next) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("第一层");
                return [4 /*yield*/, next()];
            case 1:
                _a.sent();
                console.log("第一层结束");
                return [2 /*return*/];
        }
    });
}); });
onion.use(function (context, next) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("第二层");
                return [4 /*yield*/, next()];
            case 1:
                _a.sent();
                console.log("第二层结束");
                return [2 /*return*/];
        }
    });
}); });
onion.execute(1);
