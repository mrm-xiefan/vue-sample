let CONST = {
  httpTimeout: 120000,
  developHost: 'http://localhost:3000/',
  socketpath: '/socket.io/',
  defaultApp: 'app1',
  title: {
    'S001': 'ERROR',
    'S002': 'ERROR',
    'S003': 'ERROR',
    'S004': 'ERROR',
    'S005': 'ERROR',
    'S006': 'ERROR',
    'B001': 'INFORMATION',
    'B002': 'INFORMATION',
    'B003': 'INFORMATION',
    'B004': 'INFORMATION',
    'B900': 'ERROR',
    'I001': 'INFORMATION',
    'I002': 'CONFIRM'
  },
  message: {
    'S001': 'Network error!',
    'S002': 'Service error!',
    'S003': 'DB error!',
    'S004': 'S3 error!',
    'S005': 'Connection lost!',
    'S006': 'Upload error!',
    'B001': 'None data.',
    'B002': 'User name or password is incorrect.',
    'B003': 'User is already exist.',
    'B004': 'Incorrect typing.',
    'B900': 'Authencate error.',
    'I001': 'Connection recovered.',
    'I002': 'Are you sure to delete?'
  },
  type: {
    'S001': 'warn',
    'S002': 'warn',
    'S003': 'warn',
    'S004': 'warn',
    'S005': 'warn',
    'S006': 'warn',
    'B001': 'info',
    'B002': 'info',
    'B003': 'info',
    'B004': 'info',
    'B900': 'warn',
    'I001': 'info',
    'I002': 'select'
  }
}

export default CONST
