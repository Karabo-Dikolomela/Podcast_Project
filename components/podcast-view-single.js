import { html, css, LitElement } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js'
import { store, connect } from '../store.js'

class Component extends LitElement {
    static get properties() {
        return {
            single: { state: true },
        };
    }

    constructor() {
        super()

        this.disconnectStore = connect((state) => {
            if (this.single === state.single) return
            this.single = state.single
        })
    }

    disconnectedCallback() { this.disconnectStore() }

    static styles = css`
        h1 {
            color: purple;
        }
        img {
            width: 100px;
            height: 100px;
        }
        button {
            border-radius: 4px;
        }
    `;

    render() {
        /**
         * @type {import('../types').show}
         * @type {import('../types').episode}
         */
        const show = this.single
        const episode = this.episode

        if (!show) {
            return html`<div></div>`
        }

        const backHandler = () => store.loadList()

        const seasons = show.seasons.map(({ episodes, title }) => {
            return html`
    
                    <strong>${title}</strong>
                    ${episodes.map(({ id, episode, file, title: innerTitle }) => {
                        return html`
                            <div>
                                <h3> Episodes: ${episode} </h3>
                                <div>${innerTitle}</div>
                                
                                <audio controls>
                                    <source src="https://file-examples.com/storage/fe8c7eef0c6364f6c9504cc/2017/11/file_example_MP3_700KB.mp3" type="audio/mp3">
                                </audio>
                                <button><span>&#11088;</span></button>
                                <button><span>&#128078;</span></button>
                            </div>
                        `
                    })}
            `
        })

        return html`
            <button @click="${backHandler}">👈 BACK</button>
            <h1>${show.title || ''}</h1>
            <img src="${show.image}">          
            ${seasons}        
        `
    }
}

customElements.define('podcast-view-single', Component)
