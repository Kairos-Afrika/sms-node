export const APIEndpoints = {
  BASE_URL: 'https://api.kairosafrika.com/v1',
  // SMS Endpoints
  SEND_QUICK_SMS: '/external/sms/quick',
  SEND_QUICK_SMS_STRING: '/external/sms/quick/string',
  SEND_BULK_QUICK_SMS: '/external/sms/quick/bulk',
  SEND_FLASH_SMS: '/external/sms/flash',
  SEND_FLASH_SMS_STRING: '/external/sms/flash/string',
  SEND_BULK_FLASH_SMS: '/external/sms/flash/bulk',
  SEND_BULK_SMS: '/external/sms/bulk',
  PING_SMS_STATUS: '/external/sms/logs/{sms_id}/ping/status',
  RESEND_FAILED_SMS: '/external/sms/quick/{sms_id}/resend',
  // Account Endpoints
  GET_ACCOUNT_BALANCE: '/external/account/balance',
  // Contact Endpoints
  GET_CONTACTS: '/external/account/contacts',
  CREATE_CONTACT: '/external/account/contacts',
  UPDATE_CONTACT: '/external/account/contacts/{id}',
  DELETE_CONTACT: '/external/account/contacts/{id}',
} as const;
