const CANCEL_SELECT = 'CANCEL_SELECT'

function buildCancel () {
  return CANCEL_SELECT
}

function isCancel (err) {
  return err === CANCEL_SELECT
}

export {
  buildCancel,
  isCancel
}
