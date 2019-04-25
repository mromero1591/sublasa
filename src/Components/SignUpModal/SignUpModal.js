import React, {Component} from 'react';


class SignUpModal extends Component {
    constructor(props) {
        super(props);
    }
    componentDidUpdate(prevProps) {
        if(this.props.active !== prevProps.active) {

        }
    }
    render() {
        return(
            <div class={`modal ${this.props.active ? 'is-active is-clipped' : ''}`}>
                <div className="modal-background"></div>
                <div className="modal-card">
                    <section className="modal-card-body">
                        <div className='nav-bar-logo has-text-centered'>Sub<span>lasa</span></div>
                        <div className="section">
                            <div class="field">
                                <p class="control has-icons-left has-icons-right">
                                    <input class="input" type="email" placeholder="Email" />
                                    <span class="icon is-small is-left">
                                    <i class="fas fa-envelope"></i>
                                    </span>
                                    <span class="icon is-small is-right">
                                    <i class="fas fa-check"></i>
                                    </span>
                                </p>
                            </div>
                            <div class="field">
                                <p class="control has-icons-left">
                                    <input class="input" type="password" placeholder="Password" />
                                    <span class="icon is-small is-left">
                                    <i class="fas fa-lock"></i>
                                    </span>
                                </p>
                            </div>
                        </div>
                        <button className="button is-success">Join</button>
                        <button onClick={this.props.toggleSignUp} className="button">Cancel</button>
                    </section>
                </div>
            </div>
        )
    }
}

export default SignUpModal;