import { GenericObject } from "@urbandhobi/@types";

interface GroupByObjectColumn {
  columnToGroupBy: string | number;
  itemKey: string | number;
}

export class Iterator {
  static forEach = async <T = any>(
    data: T[],
    callback: (item: T, index: number, array: T[]) => void,
  ) => {
    for (let i = 0; i < data.length; i++) {
      await new Promise((resolve, reject) => {
        setTimeout(async () => {
          try {
            await callback(data[i], i, data);
            resolve(null);
          }
          catch (err) {
            reject(err);
          }
        }, 10);
      });
    }
  }

  static map =  async <T, Result=any>(
    data: T[],
    callback: (item: T, index: number, array: T[]) => Promise<Result> | Result
  ): Promise<Result[]> =>  {
    const result: Result[] = [];
    for (let i = 0; i < data.length; i++) {
      const res = await new Promise<Result>((resolve, reject) => {
        setTimeout(async () => {
          try {
            resolve(await callback(data[i], i, data));
          }
          catch (err) {
            reject(err);
          }
        }, 10);
      });
      result.push(res);
    }
    return result;
  }

  static group = async <T>(
    data: Array<T>,
    column: (item: T, index: number, array: T[]) => Promise<string | number> | string | number,
  ) => {
    const obj: GenericObject<Array<T>> = {};
    await Iterator.forEach(data, async (item, index, array) => {
      const key = await column(item, index, array);
      if (!obj[key]) {
        obj[key] = [item];
      }
      else {
        obj[key].push(item);
      }
    });
    return obj;
  }

  static groupby = async <T>(
    data: Array<T>,
    column: (item: T, index: number, array: T[]) => Promise<string | number> | string | number,
  ) => {
    const obj: GenericObject<T> = {};
    await Iterator.forEach(data, async (item, index, array) => {
      const key = await column(item, index, array);
      obj[key] = item;
    });
    return obj;
  }

  // static groupByObject = async <T>(
  //   data: Array<T>,
  //   column: (item: T, index: number, array: T[]) => Promise<GroupByObjectColumn> | GroupByObjectColumn
  // ) => {
  //   const obj: GenericObject<GenericObject<T>> = {};
  //   await Iterator.forEach(data, async (item, index, array) => {
  //     const key = await column(item, index, array);
  //     if (!obj[key.columnToGroupBy]) {
  //       obj[key.columnToGroupBy] = {[key.itemKey]: item};
  //     }
  //     else {
  //       obj[key.columnToGroupBy][key.itemKey] = item;
  //     }
  //   });
  //   return obj;
  // }

  // static groupByArray = async <T>(
  //   data: Array<T>,
  //   column: (item: T, index: number, array: T[]) => Promise<string | number> | string | number,
  // ) => {
  //   const obj: GenericObject<Array<T>> = {};
  //   await Iterator.forEach(data, async (item, index, array) => {
  //     const key = await column(item, index, array);
  //     if (!obj[key]) {
  //       obj[key] = [item];
  //     }
  //     else {
  //       obj[key].push(item);
  //     }
  //   });
  //   return obj;
  // }
}
