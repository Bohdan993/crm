import SidebarPopupInterface from '../SidebarPopupInterface'


export default class TypeManufacturyPopup extends SidebarPopupInterface {
  constructor(type) {
    super(type)
  }

  update(data, index, items, context) {
    super.update(data, index, items, context)
    this.filter(data.id, 'production', 'typeManufacturyFilter')
  }


  filter(id, str, storageKey) {
    super.filter(id, str, storageKey)
  }
}