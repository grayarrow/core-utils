import { IName, ISlug, I_Id } from './interfaces.mjs'
import { INameValue } from './name-value.mjs'
import { ITickerSearch } from './ticker-info.mjs'
import { Concrete } from './types.mjs'

export type PolitiscaleName = 'climate' | 'freeSpeech' | 'religion'

export type IPolitiscale = INameValue<number, PolitiscaleName>

export interface IHasPolitiscales {
  scales?: IPolitiscale[]
}

export interface ICity extends I_Id, IName, Concrete<IHasPolitiscales>, ISlug {
  city: string
  description: string
  sourceUrl: string
  city_img: string
}

export interface ITickerSearchWithScales extends ITickerSearch, IHasPolitiscales {}