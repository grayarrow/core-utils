import { IDashboardScreenSetting, IGridTileConfig } from './tp-items.js'

export class DashboardScreenSetting implements IDashboardScreenSetting {
  id = ''

  constructor(public name = '', public tiles: IGridTileConfig[] = []) {}
}
