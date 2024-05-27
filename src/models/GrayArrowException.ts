import { AxiosResponse } from 'axios'
import { hasData } from '../services/general'

export class GrayArrowException<Tobj = string> extends Error {
  functionNameSource: string
  obj?: Tobj
  responseCode?: number

  constructor(m: string, functionNameSource: string, obj?: Tobj) {
    super(m)

    this.functionNameSource = hasData(functionNameSource)
      ? functionNameSource
      : 'GrayArrowException'
    this.obj = obj

    Object.setPrototypeOf(this, new.target.prototype)
  }
}

export class GrayArrowExceptionHttp<Tobj = AxiosResponse> extends GrayArrowException<Tobj> {
  constructor(m: string, functionNameSource: string, response?: Tobj) {
    super(m, hasData(functionNameSource) ? functionNameSource : 'GrayArrowHttpError', response)

    Object.setPrototypeOf(this, new.target.prototype)
  }
}
