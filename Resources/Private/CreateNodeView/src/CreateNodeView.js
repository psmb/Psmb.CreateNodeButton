import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {$get, $transform} from 'plow-js';
import {TextInput, Button} from '@neos-project/react-ui-components';
import {connect} from 'react-redux';
import {selectors, actions} from '@neos-project/neos-ui-redux-store';
import {neos} from '@neos-project/neos-ui-decorators';

@neos(globalRegistry => ({
    i18nRegistry: globalRegistry.get('i18n')
}))
@connect($transform({
    siteNodeContextPath: $get('cr.nodes.siteNode')
}), {
    persistChanges: actions.Changes.persistChanges,
    startLoading: actions.UI.ContentCanvas.startLoading,
})
export default class CreateNodeView extends Component {

    static propTypes = {
        siteNodeContextPath: PropTypes.string.isRequired,
        options: PropTypes.shape({
            type: PropTypes.string.isRequired,
            position: PropTypes.string.isRequired,
            referenceNodePath: PropTypes.string.isRequired,
            placeholder: PropTypes.string.isRequired
        }),
        persistChanges: PropTypes.func.isRequired,
        startLoading: PropTypes.func.isRequired
    };

    state = {
        title: ''
    };

    createNode = () => {
        const title = this.state.title;
        const data = {title};
        const nodeType = this.props.options.type;
        const type = 'Neos.Neos.Ui:Create' + this.props.options.position.charAt(0).toUpperCase() + this.props.options.position.slice(1);
        const context = this.props.siteNodeContextPath.split('@')[1];
        const subject = this.props.options.referenceNodePath + '@' + context;
        this.props.persistChanges([{
            type,
            subject,
            payload: {
                nodeType,
                data
            }
        }]);
        this.setState({title: ''});
        this.props.startLoading();
    }

    render() {
        const placeholder = this.props.options.placeholder || '';
        return this.props.options.enabled ? (
            <div style={{display: 'inline-block'}}>
                <div style={{display: 'flex'}}>
                    <TextInput
                        onChange={title => this.setState({title})}
                        value={this.state.title}
                        placeholder={placeholder}
                        onEnterKey={() => this.createNode()}
                        />
                    <Button style="lighter" onClick={() => this.createNode()}>{this.props.i18nRegistry.translate('Psmb.CreateNodeButton:Main:create')}</Button>
                </div>
            </div>
        ) : null;
    }
}

export const CreateNodeContainer = neos(globalRegistry => ({
    options: globalRegistry.get('frontendConfiguration').get('Psmb.CreateNodeButton')
}))(CreateNodeView);
