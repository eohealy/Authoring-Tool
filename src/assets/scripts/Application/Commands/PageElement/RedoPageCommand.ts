import { AppCommand } from "../AppCommand";
import { PageEditor } from "@/assets/scripts/PageEditor";
import { ApplicationStore } from "@/store/StoreTypes";

export class RedoPageCommand extends AppCommand {

    /**
     * The page to apply the redo operation to.
     */
    private _editor: PageEditor;


    /**
     * Redoes the last undone page command.
     * @param context
     *  The application context.
     * @param id
     *  The id of the page to apply the redo operation to.
     */
    constructor(context: ApplicationStore, id: string) {
        super();
        let editor = context.editors.get(id);
        if(editor) {
            this._editor = editor;
        } else {
            throw new Error(`Editor '${ id }' not found.`);
        }
    }


    /**
     * Executes the command.
     */
    public execute(): void {
        this._editor.redo();
    }

}
