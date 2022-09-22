class Modal extends HTMLElement {
    constructor() {
        super()
        this.isOpen = false;
        this.attachShadow({mode: 'open'})
        this.shadowRoot.innerHTML = `
            <style>
                @import "modal.css";
            </style>
            <div id="backdrop"></div>
            <div id="modal">
                <header>
                    <slot name="title"></slot>
                </header>
                <section id="main">
                    <slot></slot>
                </section>
                <section id='actions'>
                    <button id="confirm-btn">Agree</button>
                    <button id="reject-btn">Disagree</button>
                </section>
            </div>
        `
        // Accessing slots JS objects
        const slots = this.shadowRoot.querySelectorAll('slot');
        slots.forEach(slot => {
            slot.addEventListener('slotchange', function(e){
                console.log(slot ,' contains::', slot.assignedNodes());
            })
        });

        // Modal actions
        const confirmButton = this.shadowRoot.querySelector('#confirm-btn')
        confirmButton.addEventListener('click', this._confirm.bind(this))

        const rejectButton = this.shadowRoot.querySelector('#reject-btn')
        rejectButton.addEventListener('click', this._reject.bind(this))

        // Modal inner listener for custom event
        rejectButton.addEventListener('rejected', function() {
            console.log('Modal::constructor::rejectButton::rejected listener::rejected');
        })
        
        confirmButton.addEventListener('confirmed', function() {
            console.log('Modal::constructor::rejectButton::rejected listener::confirmed');
        })

    }

    connectedCallback() {
        console.log('Modal::Component mounted');
    }

    disconnectedCallback() {
        console.log('Modal::Component unmounted');
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log('Modal::AttributeChangedCallback::', name, 'attribute has been changed from ', oldValue, 'to', newValue);
        if (name = 'opened') {
            if (this.hasAttribute('opened')) {
                this.isOpen = true;
            } else {
                this.isOpen = false;
            }
        }
        console.log('Modal::AttributeChangedCallback:set isOpen to:', this.isOpen);
    }

    static get observedAttributes() {
        return ['opened']
    }

    open() {
        if (!this.isOpen) {
            console.log('Modal::open():: set attribute opened');
            this.setAttribute('opened', '');
        } else {
            console.log('Modal::already opened');
        }
    }

    close() {
        if (this.hasAttribute('opened')) {
            this.removeAttribute('opened');
            this.isOpen = false;
        }    
    }

    // Custom event with bubbling
    _confirm(event) {
        console.log('Modal::Confirmed::dispatching "confirmed" event');
        this.close()
        const confirmEvent = new Event('confirmed', { bubbles: true, composed: true });
        event.target.dispatchEvent(confirmEvent)
    }

    // Custom event weithout bubbling
    _reject(event) {
        console.log('Modal::Rejected::dispatching "rejected" event');
        this.close()
        const confirmEvent = new Event('rejected');
        this.dispatchEvent(confirmEvent)
    }
}

customElements.define('components-modal', Modal)