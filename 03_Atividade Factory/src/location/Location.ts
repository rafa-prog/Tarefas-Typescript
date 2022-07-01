import I_Item from "./item/interface/I_Item";

export abstract class Location{
    startItem() : void{
        const item = this.createItem()
        item.start()
    }

    protected abstract createItem() : I_Item
}