export const isRequired = (value) => {
  if (value === undefined || value === null) return false
  return value.toString().trim().length > 0
}

export const validateFullName = (value) => {
  if (!isRequired(value)) return "Full Name is required"
  if (value.trim().length < 3) return "Full Name must be at least 3 characters"
  return ""
}

export const validateProjectName = (value) => {
  if (!isRequired(value)) return "Project Name is required"
  if (value.trim().length < 3) return "Project Name must be at least 3 characters"
  return ""
}

export const validateDescription = (value) => {
  if (!isRequired(value)) return "Description is required"
  if (value.trim().length < 3) return "Description must be at least 3 characters"
  return ""
}

export const validateEmail = (value) => {
  if (!isRequired(value)) return "Email is required"

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(value)) return "Invalid email format"

  return ""
}

export const validateMobile = (value) => {
  if (!isRequired(value)) return "Mobile number is required"

  const mobileRegex = /^[0-9]{10}$/
  if (!mobileRegex.test(value)) return "Mobile number must be 10 digits"

  return ""
}
