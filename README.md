# Psmb.CreateNodeButton
Create nodes in Neos even without using the tree...

Sometimes you have all of your nodes stored under one node and ordered by date (e.g. news nodes).
Using the tree for adding nodes doesn't make any sense, as it gets painfully slow with a lot of nodes,
and you have to manually select the correct position for the new node, which is error-prone.
This package provides an inspector view (for the new Neos UI) and `Psmb.CreateNodeButton:CreateNodeButton` Fusion object
(for the old UI), which allow you to create nodes in a predefined position in one click of a button.

```
composer require psmb/createnodebutton
```

## Inspector View for the new Neos UI based on React (enabled by default in Neos 3.3 LTS+)

![Demo](https://user-images.githubusercontent.com/837032/31390152-c73dcbee-addb-11e7-88be-c893e309d854.png)

You can use the `CreateNodeMixin` which adds the view as a separate Tab. Override the node type settings as needed:

```
My.ExampleOrg:Example:
  superTypes:
    Neos.Neos:Document: true
    Psmb.CreateNodeButton:CreateNodeMixin: true
  ui:
    inspector:
      views:
        createNode:
          viewOptions:
            # Possible values are `before`, `into` and `after`
            position: 'into'
            # The type of the node to be created
            type: 'My.ExampleOrg:YourDocumentNodeType'
            # The path used as reference when creating the new node - e.g. the parent page when position is 'into'
            referenceNodePath: '/sites/your-site/node-name'
            # Text for the text input placeholder
            placeholder: 'Enter title...'
```

You can also use the create node button globally in the header of Neos (besides the Edit/Preview navigation). To make 
use of this feature, you need to enable it in you `Settings.yaml` file:

```
Neos:
  Neos:
    Ui:
      frontendConfiguration:
        'Psmb.CreateNodeButton':
          enabled: true
```

Further options are identical with those in the `CreateNodeMixin`. Refer to `Configuration/Settings.yaml` of the package
for a full reference.

## Fusion Object for the old Neos UI (enabled by default before Neos 3.3 LTS)

![Demo](https://raw.githubusercontent.com/psmb/Psmb.CreateNodeButton/master/demo.gif)

Just output this TS object somewhere on your page.
This will render a form, to create new nodes of type `Your:NodeType`, after the current node.

```
createNodeButton = Psmb.CreateNodeButton:CreateNodeButton {
  type = 'Your:NodeType'
}
```

You can modify it to create new nodes inside another page `/sites/site/news` node.

```
createNodeButton = Psmb.CreateNodeButton:CreateNodeButton {
  referenceNode = ${q(site).children('news').get(0)}
  type = 'Your:NodeType'
  position = 'into'
}
```

Possible values for the `position` are: `before`, `into` and `after`.

Note: If you use this on the site node with the default position, a new node will be created outside
the current site. You must use `into` in that case.

## Hide nodes of a certain type in the tree

As initially stated, using this package makes sense of you have a lot of nodes, slowing down the trees and making
it hard for editors to have a good user experience. Neos allows you to filter out nodes of a given type from the tree:

```
Neos:
  Neos:
    userInterface:
      navigateComponent:
        nodeTree:
          presets:
            default:
              # Allows configuring the baseNodeType used in the node tree. It is a filter, so this also
              # works: 'Neos.Neos:Document,!Acme.Com:SomeNodeTypeToIgnore'
              baseNodeType: 'Neos.Neos:Document,!My.ExampleOrg:YourDocumentNodeType'
```

Credits for the idea go to [Aske Ertmann](https://twitter.com/AskeErtmann).

That's all, folks!
