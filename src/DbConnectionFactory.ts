import { IDbConnection, IArg } from './interfaces/interfaces'
import { SQLiteConnection } from './sqlite/SQLiteConnection'

export class DbConnectionFactory {

  private static instance: DbConnectionFactory

  private factory: { [key: string]: (config: IArg) => IDbConnection }

  constructor() {
    this.factory = {
      'sqlite': (config: IArg) => new SQLiteConnection(config),
    }
  }

  public getConnection = (key: string, config: IArg) => {
    return this.factory[key](config)
  }

}