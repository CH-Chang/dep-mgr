/* eslint-disable lodash/prefer-constant */

const getAddMessage = async (changeset, options) =>
  `docs(changeset): ${changeset.summary}`

const getVersionMessage = async (releasePlan, options) =>
  'chore: version packages'

module.exports = {
  getAddMessage,
  getVersionMessage
}
