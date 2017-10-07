let CONST = {
  httpTimeout: 120000,
  developHost: 'http://localhost:3000/',
  socketpath: '/socket.io/',
  title: {
    'S001': 'ERROR',
    'S002': 'ERROR',
    'S003': 'ERROR',
    'S004': 'ERROR',
    'S005': 'ERROR',
    'S006': 'ERROR',
    'S007': 'ERROR',
    'B001': 'INFORMATION',
    'B002': 'INFORMATION',
    'B010': 'CONFIRM',
    'B900': 'ERROR',
    'I001': 'INFORMATION'
  },
  message: {
    'S001': 'Network Error!',
    'S002': 'Service Error!',
    'S003': 'DB Error!',
    'S004': 'Authenticate Error!',
    'S005': 'Connection Error!',
    'S006': 'Upload Error!',
    'S007': 'S3 Error!',
    'B001': 'Business Error.',
    'B002': 'None Data.',
    'B010': 'Are you sure to delete?',
    'B900': 'Authencate Error!',
    'I001': 'Connection Recovered.'
  },
  type: {
    'S001': 'warn',
    'S002': 'warn',
    'S003': 'warn',
    'S004': 'warn',
    'S005': 'warn',
    'S006': 'warn',
    'S007': 'warn',
    'B001': 'info',
    'B002': 'info',
    'B010': 'select',
    'B900': 'warn',
    'I001': 'info'
  },
}

export default CONST
