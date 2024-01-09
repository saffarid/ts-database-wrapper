
export interface IDictionary<T>{
  [key:string]: T
}

export interface IForeignKey {
  foreignColumn: string,
  foreignTable: string,
}

export interface IColumn {
  columnName: string,
  type: string,
  isPrimaryKey: boolean,
  isUnique: boolean,
  isNotNull: boolean,
  check?: string,
  isForeign?: IForeignKey

  descCreate: () => string
}

export interface ITable {
  tableName: string,
  columns: IColumn[]
  default?: { [key: string]: any }[]
}

export interface IDbDesc {
  tables: { [tableName: string]: ITable }
}

export interface IDbConnection {
  open: () => Promise<void>,
  close: () => Promise<void>,
  create: (table: ITable) => Promise<void>
  insert: (tableName: string,
           obj: { [key: string]: any }) => Promise<void>,
  delete: (table: string,
           data: { [key: string]: any }) => Promise<void>,
  read: (tableName: string, where?: IDictionary<any>) => Promise<[{ [key: string]: any }]>,
  readOne: (tableName: string, where: { [key: string]: (string | number) }) => Promise<{ [key: string]: any }>,
  update: (tableName: string,
           obj: { [key: string]: any }) => Promise<void>
}

export interface IArg {
  dbPath: string
}