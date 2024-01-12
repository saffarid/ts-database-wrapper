import {IColumn, IForeignKey} from "./../interfaces/interfaces";

export class Column implements IColumn {
    readonly columnName: string;
    readonly isPrimaryKey: boolean;
    readonly type: string;
    readonly isNotNull: boolean;
    readonly isUnique: boolean;
    readonly isForeign?: IForeignKey

    constructor(columnName: string, type: string, isPrimaryKey: boolean, isNotNull: boolean, isUnique: boolean, isForeign?: IForeignKey) {
        this.columnName = columnName
        this.isPrimaryKey = isPrimaryKey
        this.type = type
        this.isUnique = isUnique
        this.isNotNull = isNotNull
        this.isForeign = isForeign
    }

    descCreate = () => {
        if (this.isPrimaryKey){
            if (this.type == "TEXT") return `${this.columnName} ${this.type} primary key`
            else return `${this.columnName} ${this.type} primary key autoincrement`
        }
        return `${this.columnName} ${this.type}${this.isNotNull?' not null':''}${this.isUnique?' unique':''}`
    }

}