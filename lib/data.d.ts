export declare type ValueType = "String" | "Boolean" | "Number" | "Array" | "Object";
export interface IStringData {
    valueType: "String";
    sampleValue?: string;
}
export interface INumberData {
    valueType: "Number";
    sampleValue?: number;
}
export interface IBooleanData {
    valueType: "Boolean";
    sampleValue?: boolean;
}
export interface IArrayData {
    valueType: "Array";
    itemType: IData;
}
export interface IObjectData {
    valueType: "Object";
    fields: IField[];
}
export declare type IData = IStringData | IBooleanData | INumberData | IArrayData | IObjectData;
export interface IDataField {
    name: string;
    displayName: string;
}
export interface IStringField extends IDataField, IStringData {
}
export interface INumberField extends IDataField, INumberData {
}
export interface IBooleanField extends IDataField, IBooleanData {
}
export interface IObjectField extends IDataField, IObjectData {
}
export interface IArrayField extends IDataField, IArrayData {
}
export declare type IField = IStringField | INumberField | IBooleanField | IObjectField | IArrayField;
export declare abstract class DataType {
    readonly owner: FieldDefinition;
    static parse(parent: FieldDefinition, data: IData): DataType;
    static deriveFrom(parent: FieldDefinition, value: any): DataType;
    constructor(owner: FieldDefinition);
    abstract generateSampleData(): any;
    getChildFields(): FieldDefinition[];
    qualifyFieldName(fieldName: string, fieldIsLeaf: boolean): string;
    abstract get valueType(): ValueType;
    get isCollection(): boolean;
}
export declare class ValueTypeData<T extends string | number | boolean> extends DataType {
    readonly owner: FieldDefinition;
    readonly defaultSampleValue: T;
    private _sampleValue;
    constructor(owner: FieldDefinition, defaultSampleValue: T, sampleValue?: T);
    generateSampleData(): T;
    get sampleValue(): T;
    get valueType(): ValueType;
}
export declare class ArrayData extends DataType {
    readonly owner: FieldDefinition;
    static parse(parent: FieldDefinition, data: IArrayData): ArrayData;
    static deriveFrom(parent: FieldDefinition, input: object): ArrayData;
    dataType: DataType;
    constructor(owner: FieldDefinition);
    generateSampleData(): any;
    getChildFields(): FieldDefinition[];
    qualifyFieldName(fieldName: string, fieldIsLeaf: boolean): string;
    get isCollection(): boolean;
    get valueType(): ValueType;
}
export declare class ObjectData extends DataType {
    readonly owner: FieldDefinition;
    static parse(parent: FieldDefinition, data: IObjectData): ObjectData;
    static deriveFrom(parent: FieldDefinition, input: object): ObjectData;
    readonly fields: FieldDefinition[];
    constructor(owner: FieldDefinition);
    generateSampleData(): any;
    getChildFields(): FieldDefinition[];
    get valueType(): ValueType;
}
export declare class FieldDefinition {
    readonly parent: FieldDefinition;
    static parse(data: IData): FieldDefinition;
    static deriveFrom(input: any): FieldDefinition;
    private _displayName;
    name: string;
    dataType: DataType;
    constructor(parent: FieldDefinition);
    asExpression(): string;
    getPath(asLeaf?: boolean): string;
    qualifiedName(asLeaf: boolean): string;
    get displayName(): string;
    set displayName(value: string);
    get children(): FieldDefinition[];
    get isCollection(): boolean;
    get valueType(): string;
}
