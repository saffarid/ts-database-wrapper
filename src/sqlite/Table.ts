import {IColumn, ITable} from "./../interfaces/interfaces";

export class Table implements ITable{
    readonly columns: IColumn[];
    readonly tableName: string;

    constructor(tableName: string, columns: IColumn[]) {
        this.tableName = tableName
        this.columns = columns
    }
}