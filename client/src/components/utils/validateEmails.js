const emailReg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
export default (emails) => {
  const invalidEmails = emails
    .split(',')
    .map((email) => email.trim())
    .filter((email) => emailReg.test(email) === false)
  if (invalidEmails.length) {
    return `these emails are invalid ${invalidEmails}`
  }
  return null
}
