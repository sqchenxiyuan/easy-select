const SELECT_CANCEL = 'SELECT_CANCEL'

function isCancel (err) {
  return err === SELECT_CANCEL
}

export {
  SELECT_CANCEL,
  isCancel
}
