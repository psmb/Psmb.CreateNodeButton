import manifest from '@neos-project/neos-ui-extensibility';
import CreateNodeView, {CreateNodeContainer} from './CreateNodeView';

manifest('Psmb.CreateNodeButton:CreateNodeView', {}, globalRegistry => {
    const containerRegistry = globalRegistry.get('containers');
    containerRegistry.set('PrimaryToolbar/Left/CreateNode', CreateNodeContainer, 'after PrimaryToolbar/Left/EditModePanelToggler');

    const viewsRegistry = globalRegistry.get('inspector').get('views');
    viewsRegistry.set('Psmb.CreateNodeButton/Views/CreateNodeView', {
        component: CreateNodeView
    });
});
