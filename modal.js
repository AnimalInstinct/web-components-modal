class Modal extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({mode: 'open'})
        this.shadowRoot.innerHTML = `
            <style>
                @import "modal.css";
            </style>
            <button>Open modal</button>
            <div id="backdrop"></div>
            <div id="modal"></div>
        `
    }
}

customElements.define('components-modal', Modal)