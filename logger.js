var logger = /** @class */ (function () {
    function logger(name, configuration) {
        this.name = name;
        this.configuration = configuration;
    }
    logger.prototype.log = function (level, strings) {
        console.log(level, strings);
    };
    logger.prototype.info = function (strings) {
        console.log("\x1b[32m%s\x1b[0m", strings);
    };
    logger.prototype.warning = function (strings) {
        console.log("\x1b[33m%s\x1b[0m", strings);
    };
    logger.prototype.error = function (strings) {
        console.log("\x1b[31m%s\x1b[0m", strings);
    };
    return logger;
}());
