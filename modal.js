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
            <div id="modal">
                <header>
                    <h1>Modal header</h1>
                </header>
                <section id="main">
                    <slot></slot>
                </section>
                <section id='actions'>
                    <button>Ok</button>
                    <button>Cancel</button>
                </section>
            </div>
        `
    }
}

customElements.define('components-modal', Modal)