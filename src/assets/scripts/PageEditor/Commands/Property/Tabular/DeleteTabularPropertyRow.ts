import { PageCommand } from "../../PageCommand";
import { AtomicProperty, TabularProperty } from "@/assets/scripts/Page";

export class DeleteTabularPropertyRow extends PageCommand {

    /**
     * The tabular property to modify.
     */
    private _property: TabularProperty;

    /**
     * The row to remove.
     */
    private _row: [string, AtomicProperty[]];
    
    /**
     * The row's index.
     */
    private _index: number;

    
    /**
     * Deletes a row from a tabular property.
     * @param property
     *  The tabular property.
     * @param id
     *  The row's id.
     */
    constructor(property: TabularProperty, id: string) {
        super(property.rootInstance);
        if(property.getRowIndex(id) === -1) {
            throw new Error(`Table row '${ id }' does not exist in '${ property.id }'.`);
        }
        this._property = property;
        this._row = property.getRow(id)!;
        this._index = property.getRowIndex(id)!;
    }
    

    /**
     * Executes the page command.
     * @returns
     *  True if the command should be recorded, false otherwise.
     */
    public execute(): boolean {
        this._property.deleteRow(this._index);
        return true;
    }

    /**
     * Undoes the page command.
     */
    public undo() {
        this._property.insertRow(this._row, this._index);
    }

}
