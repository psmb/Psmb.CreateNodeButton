# Psmb.CreateNodeButton
Create nodes in Neos even without using the tree...

Sometimes you have all of your nodes stored under one node and ordered by date (e.g. news nodes).
Using the tree for adding nodes doesn't make any sense, as it gets painfully slow with a lot of nodes,
and you have to manually select the correct position for the new node, which is error-prone.
This package provides an inspector view (for the new UI) and `Psmb.CreateNodeButton:CreateNodeButton` Fusion object, which allow you to create nodes
in a predefined position in one click of a button.


## Inspector View for the new ReactJS UI

![Demo](https://user-images.githubusercontent.com/837032/31390152-c73dcbee-addb-11e7-88be-c893e309d854.png)

```
composer require psmb/createnodebutton
```

Configure your custom view to create nodes like this:

```
ui:
  inspector:
    tabs:
      createNode:
        label: i18n
        position: 100
        icon: plus-circle
    groups:
      createNode:
        label: i18n
        tab: createNode
    views:
      createNode:
        label: i18n
        group: createNode
        view: Psmb.CreateNodeButton/Views/CreateNodeView
        viewOptions:
          # Possible values are `before`, `into` and `after`
          position: 'into'
          type: 'Set.Your:DocumentNodeType'
          referenceNodePath: '/sites/site/to-set'
```

## Fusion Object for the Old UI

![Demo](https://raw.githubusercontent.com/psmb/Psmb.CreateNodeButton/master/demo.gif)

Just output this TS object somewhere on your page.
This would render a form, which would create new nodes of type `Your:NodeType`,
after the current node.

```
createNodeButton = Psmb.CreateNodeButton:CreateNodeButton {
  type = 'Your:NodeType'
}
```

Like this you can modify it to create new nodes inside the `/sites/site/news` node.

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

Credits for the idea go to [Aske Ertmann](https://twitter.com/AskeErtmann).

That's all, folks!
