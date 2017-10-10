import manifest from '@neos-project/neos-ui-extensibility';
import CreateNodeView from './CreateNodeView';

manifest('Psmb.CreateNodeButton:CreateNodeView', {}, globalRegistry => {
    const viewsRegistry = globalRegistry.get('inspector').get('views');

    viewsRegistry.set('Psmb.CreateNodeButton/Views/CreateNodeView', {
        component: CreateNodeView
    });
});
