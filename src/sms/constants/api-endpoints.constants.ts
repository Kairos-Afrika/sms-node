export const APIEndpoints = {
  BASE_URL: `https://api.kairosafrika.com/v1`,
  SEND_QUICK_SMS: `/external/sms/quick`,
  SEND_QUICK_MULTIPLE_MSISDN: `/external/sms/quick/multiple`,
  SEND_BULK_SMS: `/external/sms/bulk`,
  PING_SMS_STATUS: `/external/sms/logs/{sms_id}/ping/status`,
  RESEND_FAILED_SMS: `/external/sms/quick/{sms_id}/resend`,
  GET_ACCOUNT_BALANCE: `/external/account/balance`,
};
