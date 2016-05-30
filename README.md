# Psmb.CreateNodeButton
Create nodes in Neos even without using the tree...

Sometimes you have all of your nodes stored under one node and ordered by date (e.g. news nodes).
Using the tree for adding nodes doesn't make any sense, as it gets painfully slow with a lot of nodes,
and you have to manually select the correct position for the new node, which is error-prone.
This package provides with `Psmb.CreateNodeButton:CreateNodeButton` TypoScript object, which allows you to create nodes
in a predefined position in one click of a button.

![Demo](https://raw.githubusercontent.com/psmb/Psmb.CreateNodeButton/master/demo.gif)

## TL;DR

```
composer require psmb/createnodebutton
```

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
  position = 'inside'
}
```

Credits for the idea go to [Aske Ertmann](https://twitter.com/AskeErtmann).

That's all, folks!
