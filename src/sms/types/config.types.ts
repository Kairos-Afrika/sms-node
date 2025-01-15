/**
 * Configuration types for Kairos SMS
 */

export interface KairosSMSConfig {
  /**
   * API Key from the Kairos Afrika SMS Portal
   * @see https://kairosafrika.com
   */
  readonly apiKey: string;

  /**
   * API Secret from the Kairos Afrika SMS Portal
   * @see https://kairosafrika.com
   */
  readonly apiSecret: string;

  /**
   * API call timeout in milliseconds
   * @default 8000
   */
  readonly timeout?: number;
}
