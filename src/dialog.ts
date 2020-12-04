export class DialogButton {
    onClick: (sender: DialogButton) => void;

    constructor(public caption: string) {}

    render(): HTMLElement {
        let element = document.createElement("button");
        element.className = "acd-dialog-button";
        element.innerText = this.caption;
        element.onclick = (e) => {
            this.clicked();
        }

        return element;
    }

    clicked() {
        if (this.onClick) {
            this.onClick(this);
        }
    }
}

export abstract class Dialog {
    private _overlayElement: HTMLElement;
    private _isOpen: boolean = false;

    protected abstract renderContent(): HTMLElement;

    onClose: (sender: Dialog) => void = null;

    readonly closeButton: DialogButton;

    title: string;
    width: string;
    height: string;

    constructor() {
        this.closeButton = new DialogButton("Close");
        this.closeButton.onClick = (sender) => {
            this.close();
        }
    }

    open() {
        if (!this._isOpen) {
            this._overlayElement = document.createElement("div");
            this._overlayElement.className = "acd-dialog-overlay";

            let dialogFrameElement = document.createElement("div");
            dialogFrameElement.className = "acd-dialog-frame";
            dialogFrameElement.style.width = this.width;
            dialogFrameElement.style.height = this.height;
            dialogFrameElement.style.justifyContent = "space-between";

            let titleBarElement = document.createElement("div");
            titleBarElement.style.display = "flex";
            titleBarElement.style.alignItems = "center";
            titleBarElement.style.flex = "0 0 auto";
            titleBarElement.style.marginBottom = "10px";

            let titleElement = document.createElement("div");
            titleElement.className = "acd-dialog-title";
            titleElement.innerText = this.title;
            titleElement.style.flex = "1 1 auto";

            let xButton = document.createElement("button");
            xButton.className = "acd-icon acd-dialog-titleBar-button acd-icon-remove";
            xButton.style.flex = "0 0 auto";
            xButton.title = "Close";
            xButton.onclick = (e) => { this.close(); }

            titleBarElement.append(titleElement, xButton);

            let contentElement = this.renderContent();
            contentElement.style.flex = "1 1 auto";

            let buttonBarElement = document.createElement("div");
            buttonBarElement.className = "acd-dialog-buttonBar";
            buttonBarElement.style.flex = "0 0 auto";
            buttonBarElement.appendChild(this.closeButton.render());

            dialogFrameElement.appendChild(titleBarElement);
            dialogFrameElement.appendChild(contentElement);
            dialogFrameElement.appendChild(buttonBarElement);

            this._overlayElement.appendChild(dialogFrameElement);

            document.body.appendChild(this._overlayElement);

            this._isOpen = true;
        }
    }

    close() {
        if (this._isOpen) {
            document.body.removeChild(this._overlayElement);

            this._isOpen = false;

            if (this.onClose) {
                this.onClose(this);
            }
        }
    }
}
