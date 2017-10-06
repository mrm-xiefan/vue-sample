let CONST = {
  httpTimeout: 120000,
  developLocal: 'http://localhost:3000/',
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
    'B900': 'ERROR'
  },
  message: {
    'S001': 'Network Error!',
    'S002': 'Service Error!',
    'S003': 'DB Error!',
    'S004': 'Authenticate Error!',
    'S005': 'Socket Error!',
    'S006': 'Upload Error!',
    'S007': 'S3 Error!',
    'B001': 'Business Error.',
    'B002': 'None Data.',
    'B900': 'Authencate Error!'
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
    'B900': 'warn'
  }
}

export default CONST
