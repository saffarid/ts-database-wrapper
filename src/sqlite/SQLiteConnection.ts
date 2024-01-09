import sqlite3 from 'sqlite3'
import {Database, open} from 'sqlite'

import {IDbConnection, IDictionary, ITable, IArg} from '../interfaces/interfaces'

export class SQLiteConnection implements IDbConnection {

  private static instance: SQLiteConnection

  private dbPath: string
  private db: Database | undefined

  constructor(
    config: IArg
  ) {
    this.dbPath = config.dbPath
  }

  private getValueWithType = (value: any) => typeof value == 'string' ? `'${value}'` : value

  open = async () => {
    if (this.db == undefined) {
      this.db = await open({
        filename: this.dbPath,
        driver: sqlite3.Database,
      })
    }
  }

  close = async () => {
    try {
      await this.db!.close()
      this.db = undefined
    } catch (e) {
      // console.log(e)
    }
  }

  insert = async (
    tableName: string,
    obj: { [key: string]: any }
  ): Promise<void> => {
    const request = `insert into '${tableName}' (${Object.keys(obj).join()}) values (${Object.values(obj).map(value => this.getValueWithType(value)).join()})`;
    // console.log(request)
    await this.db!.exec(request)
  }

  delete = async (tableName: string,
                  obj: { [key: string]: any }) => {
    const request = `delete from \`${tableName}\` where id = '${obj['id']}'`
    await this.db!.exec(request)
    // console.log(request)
  }

  read = async (tableName: string, where?: IDictionary<any>): Promise<[{}]> => {
    let request = `select * from \`${tableName}\``
    if (where) {
      const _where = `where ${Object.keys(where!)
                                    .map(key => `${key}=${this.getValueWithType(where![key])}`)
                                    .join(' and ')}`
      request = `${request} ${_where}`
    }
    return await this.db!.all(request)
  }

  readOne = async (tableName: string, where: { [key: string]: (string | number) }) => {
    const request = `select * from \`${tableName}\` where ${Object.keys(where).map(key => `${key}=${this.getValueWithType(where[key])}`).join(' and ')}`
    return await this.db!.get(request)
  }

  update = async (tableName: string,
                  obj: { [key: string]: any },
                  compositePrimaryKey?: string[] | []
  ): Promise<void> => {
    const _obj = {...obj}
    delete _obj.id
    const request = `update \`${tableName}\` set ${Object.keys(_obj)
        .map(key => `${key}=${this.getValueWithType(obj[key])}`)
        .join()} where id = '${obj['id']}'`;
    await this.db!.exec(request)
    // console.log(request)
  }

  create = async (table: ITable) => {
    const request = `create table if not exists \`${table.tableName}\` (${table.columns.map(value => value.descCreate()).join()})`
    await this.db!.exec(request)
    // console.log(request)
  }

}