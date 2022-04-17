import { IKairosSMSOptions } from '../types/interfaces';
import {Api} from "../api";

class Balance {
  /**
   * API call x-access-token and x-access-secret configurations here
   * @private
   */
  private readonly options;
  constructor(options: IKairosSMSOptions) {
    this.options = options;
  }

  balance() {
      return Api(this.options)
          .get()
  }
}

export { Balance };
