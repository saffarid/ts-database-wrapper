import {IDbDesc, ITable} from "./../interfaces/interfaces";

export class DbDesc implements IDbDesc{
    readonly tables: { [tableName: string]: ITable };

    constructor(tables: { [tableName: string]: ITable }) {
        this.tables = tables
    }

}