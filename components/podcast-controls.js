import {
  html,
  LitElement,
  css,
} from "https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js";
import { store, connect } from "../store.js";

class Component extends LitElement {
  static get properties() {
    return {
      sorting: {},
      search: {},
    };
  }

  constructor() {
    super();

    this.disconnectStore = connect((state) => {
      if (this.sorting !== state.sorting) {
        this.sorting = state.sorting;
      }
      if (this.search !== state.search) {
        this.search = state.search;
      }
    });
  }

  disconnectedCallback() {
    this.disconnectStore();
  }

  static styles = css`
    * {
      box-sizing: border-box;
    }

    .body-bg {
      background-color: #FF6EC7;
      border-radius: 20px;
    }

    div {
      display: flex;
      justify-content: space-between;
      flex-grow: 1;
      margin: 0.5%;
      color: whitesmoke;
    }
    p{
        margin-bottom: 0;
    }
    #white{
        color: white;
    }
  `;

  render() {
    const changeHandler = (event) => {
      store.changeSorting(event.target.value);
    };

    const inputHandler = (event) => {
      store.changeSearch(event.target.value);
    };

    return html`
      <div>
        <div>
          <label>
            <span><p>Search</p></span>
                <input class= "body-bg" @input="${inputHandler}" value="${this.search}" />
            </i>
          </label>
        </div>
        <div>
          <label>
            <p>Sorting</p>
            <select class= "body-bg" @change="${changeHandler}">
              <option value="a-z" .selected="${this.sorting === "a-z"}">
                A - Z
              </option>
              <option value="z-a" .selected="${this.sorting === "z-a"}">
                Z - A
              </option>
              <option
                value="oldest-latest"
                .selected="${this.sorting === "oldest-latest"}"
              >
                Oldest - Latest
              </option>
              <option
                value="latest-oldest"
                .selected="${this.sorting === "latest-oldest"}"
              >
                Latest - Oldest
              </option>
            </select>
          </label>
        </div>
      </div>
    `;
  }
}

customElements.define("podcast-controls", Component);
