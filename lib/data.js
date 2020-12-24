"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldDefinition = exports.ObjectData = exports.ArrayData = exports.ValueTypeData = exports.DataType = void 0;
var DataType = /** @class */ (function () {
    function DataType(owner) {
        this.owner = owner;
    }
    DataType.parse = function (parent, data) {
        switch (data.valueType) {
            case "String":
                return new ValueTypeData(parent, "Sample data", data.sampleValue);
            case "Number":
                return new ValueTypeData(parent, 123, data.sampleValue);
            case "Boolean":
                return new ValueTypeData(parent, true, data.sampleValue);
            case "Array":
                return ArrayData.parse(parent, data);
            case "Object":
                return ObjectData.parse(parent, data);
        }
    };
    DataType.deriveFrom = function (parent, value) {
        if (typeof value === "string") {
            return new ValueTypeData(parent, "Sample data", value);
        }
        else if (typeof value === "boolean") {
            return new ValueTypeData(parent, true, value);
        }
        else if (typeof value === "number") {
            return new ValueTypeData(parent, 123, value);
        }
        else if (typeof value === "object") {
            if (Array.isArray(value)) {
                return ArrayData.deriveFrom(parent, value);
            }
            else {
                return ObjectData.deriveFrom(parent, value);
            }
        }
        else {
            throw new Error("Unsupported data type: " + typeof value);
        }
    };
    DataType.prototype.getChildFields = function () {
        return null;
    };
    DataType.prototype.qualifyFieldName = function (fieldName, fieldIsLeaf) {
        return fieldName;
    };
    Object.defineProperty(DataType.prototype, "isCollection", {
        get: function () {
            return false;
        },
        enumerable: false,
        configurable: true
    });
    return DataType;
}());
exports.DataType = DataType;
var ValueTypeData = /** @class */ (function (_super) {
    __extends(ValueTypeData, _super);
    function ValueTypeData(owner, defaultSampleValue, sampleValue) {
        var _this = _super.call(this, owner) || this;
        _this.owner = owner;
        _this.defaultSampleValue = defaultSampleValue;
        _this._sampleValue = sampleValue;
        return _this;
    }
    ValueTypeData.prototype.generateSampleData = function () {
        return this.sampleValue ? this.sampleValue : this.defaultSampleValue;
    };
    Object.defineProperty(ValueTypeData.prototype, "sampleValue", {
        get: function () {
            return this._sampleValue;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ValueTypeData.prototype, "valueType", {
        get: function () {
            switch (typeof this.defaultSampleValue) {
                case "string":
                    return "String";
                case "number":
                    return "Number";
                case "boolean":
                    return "Boolean";
            }
        },
        enumerable: false,
        configurable: true
    });
    return ValueTypeData;
}(DataType));
exports.ValueTypeData = ValueTypeData;
var ArrayData = /** @class */ (function (_super) {
    __extends(ArrayData, _super);
    function ArrayData(owner) {
        var _this = _super.call(this, owner) || this;
        _this.owner = owner;
        _this.dataType = undefined;
        return _this;
    }
    ArrayData.parse = function (parent, data) {
        var result = new ArrayData(parent);
        result.dataType = DataType.parse(parent, data.itemType);
        return result;
    };
    ArrayData.deriveFrom = function (parent, input) {
        if (!Array.isArray(input)) {
            throw new Error("Input is not an array.");
        }
        var result = new ArrayData(parent);
        if (input.length > 0) {
            result.dataType = DataType.deriveFrom(parent, input[0]);
        }
        return result;
    };
    ArrayData.prototype.generateSampleData = function () {
        var result = [];
        for (var i = 1; i <= 3; i++) {
            result.push(this.dataType.generateSampleData());
        }
        return result;
    };
    ArrayData.prototype.getChildFields = function () {
        return this.dataType.getChildFields();
    };
    ArrayData.prototype.qualifyFieldName = function (fieldName, fieldIsLeaf) {
        if (!fieldIsLeaf) {
            return fieldName + "[0]";
        }
        else {
            return _super.prototype.qualifyFieldName.call(this, fieldName, fieldIsLeaf);
        }
    };
    Object.defineProperty(ArrayData.prototype, "isCollection", {
        get: function () {
            return true;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ArrayData.prototype, "valueType", {
        get: function () {
            return "Array";
        },
        enumerable: false,
        configurable: true
    });
    return ArrayData;
}(DataType));
exports.ArrayData = ArrayData;
var ObjectData = /** @class */ (function (_super) {
    __extends(ObjectData, _super);
    function ObjectData(owner) {
        var _this = _super.call(this, owner) || this;
        _this.owner = owner;
        _this.fields = [];
        return _this;
    }
    ObjectData.parse = function (parent, data) {
        var result = new ObjectData(parent);
        for (var _i = 0, _a = data.fields; _i < _a.length; _i++) {
            var field = _a[_i];
            var fieldDefinition = new FieldDefinition(parent);
            fieldDefinition.name = field.name;
            fieldDefinition.displayName = field.displayName;
            fieldDefinition.dataType = DataType.parse(fieldDefinition, field);
            result.fields.push(fieldDefinition);
        }
        return result;
    };
    ObjectData.deriveFrom = function (parent, input) {
        var result = new ObjectData(parent);
        if (input !== null) {
            for (var _i = 0, _a = Object.keys(input); _i < _a.length; _i++) {
                var key = _a[_i];
                var field = new FieldDefinition(parent);
                field.dataType = DataType.deriveFrom(field, input[key]);
                field.name = key;
                result.fields.push(field);
            }
        }
        return result;
    };
    ObjectData.prototype.generateSampleData = function () {
        var result = {};
        for (var _i = 0, _a = this.fields; _i < _a.length; _i++) {
            var field = _a[_i];
            result[field.name] = field.dataType.generateSampleData();
        }
        return result;
    };
    ObjectData.prototype.getChildFields = function () {
        return this.fields;
    };
    Object.defineProperty(ObjectData.prototype, "valueType", {
        get: function () {
            return "Object";
        },
        enumerable: false,
        configurable: true
    });
    return ObjectData;
}(DataType));
exports.ObjectData = ObjectData;
var FieldDefinition = /** @class */ (function () {
    function FieldDefinition(parent) {
        this.parent = parent;
    }
    FieldDefinition.parse = function (data) {
        var field = new FieldDefinition(null);
        field.name = "$root";
        field.dataType = DataType.parse(field, data);
        return field;
    };
    FieldDefinition.deriveFrom = function (input) {
        var field = new FieldDefinition(null);
        field.name = "$root";
        field.dataType = DataType.deriveFrom(field, input);
        return field;
    };
    FieldDefinition.prototype.asExpression = function () {
        return "${" + this.getPath() + "}";
    };
    FieldDefinition.prototype.getPath = function (asLeaf) {
        if (asLeaf === void 0) { asLeaf = true; }
        var result = this.qualifiedName(asLeaf);
        var currentField = this.parent;
        while (currentField) {
            result = currentField.qualifiedName(false) + "." + result;
            currentField = currentField.parent;
        }
        console.log('simikha====>', result);
        return result;
    };
    FieldDefinition.prototype.qualifiedName = function (asLeaf) {
        return this.dataType.qualifyFieldName(this.name, asLeaf);
    };
    Object.defineProperty(FieldDefinition.prototype, "displayName", {
        get: function () {
            return this._displayName ? this._displayName : this.name;
        },
        set: function (value) {
            this._displayName = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FieldDefinition.prototype, "children", {
        get: function () {
            return this.dataType.getChildFields();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FieldDefinition.prototype, "isCollection", {
        get: function () {
            return this.dataType.isCollection;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FieldDefinition.prototype, "valueType", {
        get: function () {
            return this.dataType.valueType;
        },
        enumerable: false,
        configurable: true
    });
    return FieldDefinition;
}());
exports.FieldDefinition = FieldDefinition;
//# sourceMappingURL=data.js.map