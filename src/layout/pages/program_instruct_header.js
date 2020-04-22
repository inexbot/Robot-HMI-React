/* 这个函数用来接收指令名 name 和参数 para，返回指令行中的参数字符串 */

export function renderInstruct(name, para) {
  switch (name) {
    /* 运动类指令 */
    case "MOVL":
      return `${para.POS} V=${para.V}% PL=${para.PL} ACC=${para.ACC} DEC=${para.DEC}`;
    case "MOVJ":
      return `${para.POS} VJ=${para.VJ}% PL=${para.PL} ACC=${para.ACC} DEC=${para.DEC}`;
    case "MOVC":
      return `${para.POS} V=${para.V}mm/s PL=${para.PL} ACC=${para.ACC} DEC=${para.DEC}`;
    case "MOVCA":
      return `${para.POS} V=${para.V}mm/s PL=${para.PL} ACC=${para.ACC} DEC=${para.DEC}`;
    case "MOVS":
      return `${para.POS} V=${para.V}mm/s PL=${para.PL} ACC=${para.ACC} DEC=${para.DEC}`;
    /* 其它指令 */
    /* 遇到没有的指令名 */
    default:
      return `未解析的指令`;
  }
}
