class SelectCancel extends Error {
  public constructor () {
    super('CANCLE_SELECT_FILE')
  }
}

function isCancel (err: any): boolean {
  return (err instanceof SelectCancel)
}

export {
  SelectCancel,
  isCancel
}
