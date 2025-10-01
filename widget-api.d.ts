/* widget-typings are auto-generated. Do not update them directly. See developer-docs/ for instructions. */
/**
 * @pageId widget
 */
interface WidgetAPI {
  /**
   * Used to register your widget. **This is the main entry point to widgets.**
   *
   * This function expects a widget function that describes the widget and returns a Figma element
   * (eg. one of the components AutoLayout, Frame, Text etc).
   *
   * @remarks
   *
   * The provided function will be called any time a widget is inserted and anytime the widget’s state is updated.
   *
   * :::caution
   *
   * The `widget.register` function should only be called once when the `manifest.main` file runs.
   *
   * :::
   *
   * ### Usage Example
   *
   * ```tsx title="First widget"
   * const { widget } = figma
   * const { Text } = widget
   *
   * function MyFirstWidget() {
   *   return <Text>Hello Widget</Text>
   * }
   *
   * widget.register(MyFirstWidget)
   * ```
   */
  register(component: FunctionalWidget<any>): void
  h(...args: any[]): FigmaDeclarativeNode
  /**
   * The `useWidgetId` hook gives you a way to reference the active widget node in event handlers like `onClick`. It returns a node `id` which can be used to retrieve and identify the active WidgetNode via the plugin API (eg. `figma.getNodeById`).
   *
   * @remarks
   *
   * :::caution
   *
   * Note that `figma.getNodeById` shouldn’t be called when rendering a widget (this will throw an error). Instead, this should be used inside event handlers where using the plugin API is allowed. See the [Rendering Code](/docs/widgets/how-widgets-run#rendering-code) for more details.
   *
   * :::
   *
   * ### Usage Example
   *
   * ```tsx title="useWidgetId example"
   * const { widget } = figma
   * const { Text, useWidgetId } = widget
   *
   * function UseWidgetIdExample() {
   *   const widgetId = useWidgetId()
   *
   *   return (
   *     <Text
   *       onClick={() => {
   *         const widgetNode = figma.getNodeById(widgetId) as WidgetNode;
   *         const clonedWidget = widgetNode.clone();
   *
   *         // Position the cloned widget beside this widget
   *         widgetNode.parent!.appendChild(clonedWidget);
   *         clonedWidget.x = widgetNode.x + widgetNode.width + 50;
   *         clonedWidget.y = widgetNode.y;
   *       }}
   *     >
   *       Make a copy
   *     </Text>
   *   )
   * }
   *
   * widget.register(UseWidgetIdExample)
   * ```
   */
  /** @deprecated Use useWidgetNodeId instead. */
  useWidgetId(): string
  useWidgetNodeId(): string
  /**
   * The `useSyncedState` hook lets you declare that your widget relies on some state. You give `useSyncedState` a storage key and a default value and it returns the current value stored and a function to update the value.
   *
   * @param
   *
   * | Parameter      | Description |
   * | -------------  | ----------- |
   * | `name`         | A storage "key" to store this syncedState. It is important that this is unique across multiple `useSyncedState` calls in a single widget. |
   * | `defaultValue` | The default value to return if no existing value is found. Values have to be JSON serializable. You can also pass a function that returns a defaultValue, this is useful if `defaultValue` is expensive to compute or if it is a plugin api method that isn't allowed during widget rendering. |
   *
   *
   * @remarks
   *
   * :::info
   *
   * If you're familiar with React, `useSyncedState` is very similar to `React.useState`. The main difference being that we require you to explicitly "key" your state values to explicitly manage the namespace of your widget state. This is important for widgets because syncedState lives across different clients who might be running different versions of your widget.
   *
   * :::
   *
   * Whenever a state value is updated, the corresponding widget is re-rendered to reflect the latest "state" of the widget.
   *
   * Updating state values is not allowed when rendering the widget. See [State Updating Code](/docs/widgets/how-widgets-run#state-updating-code) for more information.
   *
   * ### Usage Example
   *
   * ```tsx title="useSyncedState example"
   * const { widget } = figma
   * const { Text, useSyncedState } = widget
   *
   * function SyncedStateExample() {
   *   const [count, setCount] = useSyncedState("count", 0)
   *   return (
   *     <Text
   *       onClick={() => {
   *         // Update the count
   *         setCount(count + 1)
   *       }}
   *     >
   *       The count is: {count}
   *     </Text>
   *   )
   * }
   *
   * widget.register(SyncedStateExample)
   * ```
   *
   * ### Lazy initial state
   *
   * This is useful if your initial state is expensive or is a plugin api method that isn't allowed during widget rendering (eg. figma.activeUsers). Instead of specifying a value directly, you can specify a function that will only be called if a value doesn’t already exist.
   *
   * ```tsx title="Lazy initial state"
   * function Widget() {
   *   const [expensiveState, setExpensiveState] = useSyncedState("expensiveState", () => {
   *     return expensiveStateComputation()
   *   })
   *
   *   const [activeUsers, setActiveUsers] = useSyncedState("activeUsers", () => figma.activeUsers)
   *   ...
   * }
   * ```
   *
   * ### Functional updates
   *
   * This is useful if your new state is computed using the previous state. Instead of setting the state directly with a value, you can pass a function that will be called with the current state value and set to the return value of the function.
   *
   * ```tsx title="Functional updates"
   * function Widget() {
   *   const [count, setCount] = useSyncedState("count", 0)
   *   return (
   *     <Text onClick={() => setCount(prevCount => prevCount + 1)}>
   *      {count}
   *     </Text>
   *   )
   * }
   * ```
   *
   * Besides `useSyncedState`, another way to store data on a widget is `useSyncedMap`. These have different characteristics and use cases. See [Widget State & Multiplayer](/docs/widgets/widget-state-and-multiplayer) for more information on when you should use one over the other.
   */
  useSyncedState<T>(
    name: string,
    defaultValue: T | (() => T),
  ): [T, (newValue: T | ((currValue: T) => T)) => void]
  /**
   * The `useSyncedMap` hook works similarly to `useSyncedState`, but each value within the map is updated last-writer-wins, instead of the entire map being overwritten last-writer-wins.
   *
   * @param
   *
   * | Parameter      | Description |
   * | -------------  | ----------- |
   * | `name`         | A storage name assigned to this syncedMap. If your widgets uses multiple synced maps, it is important that this is unique across the multiple `useSyncedMap calls. |
   *
   * @remarks
   *
   * The main use case of `useSyncedMap` is to support multiple clients updating widget data concurrently. When this happens, the synced map will merge the changes in the order they are received by the server, adding / updating / removing keys. In comparison, a similar value in `useSyncedState` will be clobbered by the last client.
   *
   * The return value of `useSyncedMap` is a `Map` like JavaScript object that implements methods like `get`, `set`, `delete`, `keys()` etc.
   *
   * :::info
   *
   * Besides `useSyncedMap`, another way to store data on a widget is `useSyncedState`. These have different characteristics and use cases. See [Widget State & Multiplayer](/docs/widgets/widget-state-and-multiplayer) for more information on when you should use one over the other.
   *
   * :::
   *
   * ### Usage Example
   *
   * ```tsx title="useSyncedMap example"
   * const { widget } = figma
   * const { useSyncedMap, Rectangle } = widget
   *
   * function SyncedMapExample() {
   *   const voteMap = useSyncedMap<number>("sessionIdToVotes")
   *
   *   return (
   *     <Rectangle
   *       onClick={() => {
   *         const sessionId = figma.activeUsers[0].sessionId
   *         if (!voteMap.get(sessionId)) {
   *           voteMap.set(sessionId, 1)
   *         }
   *       }}
   *     />
   *   )
   * }
   *
   * widget.register(SyncedMapExample)
   * ```
   */
  useSyncedMap<T>(name: string): SyncedMap<T>
  /**
   * The `usePropertyMenu` hook lets you specify the property menu to show when the widget is selected (See image below).
   *
   * @param
   *
   * | Parameter      | Description |
   * | -------------  | ----------- |
   * | `items`        | A list of `WidgetPropertyMenuItem`s to render when the widget is clicked |
   * | `onChange`     | The function to call when a menu item is clicked. This function is called with an object containing the `propertyName` of the item that was clicked on. |
   *
   * @remarks
   *
   * When building your widget, the property menu is a way to provide a menu for your widget. When a user clicks on the property menu, the associated callback is triggered.
   *
   * ![PropertyMenuExample](https://static.figma.com/uploads/e6970d5f4851a4875387f0ec8f41c35a9f7c538c)
   *
   *
   * ### Usage Example
   *
   *```tsx title="usePropertyMenu example"
   * const { widget } = figma
   * const { useSyncedState, usePropertyMenu, AutoLayout, Text } = widget
   *
   *function PropertyMenuWidget() {
   *   const [color, setColor] = useSyncedState("theme", "#e06666")
   *   const [fruit, setFruit] = useSyncedState("fruit", "mango")
   *   const fruitOptions = [{option: "mango", label: "Mango"}, {option: "apple", label: "Apple"}]
   *   usePropertyMenu(
   *     [
   *      {
   *         itemType: 'action',
   *         tooltip: 'Action',
   *         propertyName: 'action',
   *       },
   *       {
   *         itemType: 'separator',
   *       },
   *       {
   *         itemType: 'color-selector',
   *         propertyName: 'colors',
   *         tooltip: 'WidgetJSX.Color selector',
   *         selectedOption: color,
   *         options: [{option: "#e06666", tooltip: "Red"}, {option: "#ffe599", tooltip: "Yellow"} ],
   *       },
   *       {
   *         itemType: 'dropdown',
   *         propertyName: 'fruits',
   *         tooltip: 'Fruit selector',
   *         selectedOption: fruit,
   *         options: fruitOptions,
   *       },
   *       {
   *         itemType: 'link',
   *         propertyName: 'fruitLink',
   *         tooltip: 'Learn about fruit!',
   *         icon: null,
   *         href: 'https://en.wikipedia.org/wiki/Fruit',
   *       },
   *     ],
   *     ({propertyName, propertyValue}) => {
   *       if (propertyName === "colors") {
   *         setColor(propertyValue)
   *       } else if (propertyName === "fruits") {
   *         setFruit(propertyValue)
   *       } else if (propertyName === "action") {
   *         console.log(propertyName)
   *       }
   *     },
   *   )
   *   return (
   *     <AutoLayout
   *       verticalAlignItems={'center'}
   *       padding={16}
   *     >
   *       <Text fontSize={32} width={200} horizontalAlignText={'center'} fill={color}>
   *         {fruitOptions.find(f => f.option === fruit).label}
   *       </Text>
   *     </AutoLayout>
   *   )
   * }
   *
   * widget.register(PropertyMenuWidget)
   *```
   */
  usePropertyMenu(
    items: WidgetPropertyMenuItem[],
    onChange: (event: WidgetPropertyEvent) => void | Promise<void>,
  ): void
  /**
   * The `useEffect` hook can be useful for running code that should run anytime the state of a widget changes or a widget is interacted with. You can use it to do data fetching when a component mounts (by using it with `waitForTask` ) or keeping state in sync between an iframe and the widget.
   *
   * @param
   *
   * | Parameter    | Description |
   * | ------------ | ----------- |
   * |`effect`      |  A function that is executed whenever a widget's state is updated. If a function is returned by this function, the returned function will be called prior to running effects again. |
   *
   * :::info
   *
   * Note: Because of [How Widgets Run](/docs/widgets/how-widgets-run), this function should handle being called multiple times with the same state.
   *
   * :::
   *
   * @remarks
   *
   * There are three main use cases of `useEffect`:
   *
   * **Initializing network or plugin API-dependent widget state**
   *
   * [Rendering code](/docs/widgets/how-widgets-run#rendering-code) is synchronous and should only depend on widget state - if you wish to initialize widget state using information from the network (eg. HTTP requests in an iframe) or using information about the file (eg. using `figma.currentPage.selection`) - you can do this in `useEffect`. After the widget has rendered for the first time, any callback to `useEffect` is executed. Code in the function passed to `useEffect` is able to update widget state and perform asynchronous tasks (when paired with `waitForTask`).
   *
   * **Setting up event handlers**
   *
   * You might have multiple calls to `figma.showUI` in various event handler (eg. `onClick` on various nodes or via `usePropertyMenu` actions) and want to consolidate message handling in one place. `useEffect` is a great place for this. Effects are guaranteed to have run before any event handler code is executed and after a widget re-renders (eg. in response to state changes).
   *
   * ```tsx title="useEffect with figma.ui.onmessage"
   * const { widget } = figma
   * const { Text, useEffect, waitForTask } = widget
   *
   * function EventHandlerExample() {
   *   useEffect(() => {
   *     waitForTask(new Promise(resolve => {
   *       figma.ui.onmessage = (msg) => {
   *         console.log(msg)
   *         resolve()
   *       }
   *     }))
   *   })
   *
   *   return <Text>Event handler example</Text>
   * }
   *
   * widget.register(EventHandlerExample)
   * ```
   *
   * :::info
   *  Note: `useEffect` is called **every time** a widget's state is changed. This means that if you are setting up an event listener using [`figma.on`](/docs/plugins/api/properties/figma-on/) (or [`figma.ui.on`](/docs/plugins/api/properties/figma-ui-on)), you need to make sure to remove the listener using the corresponding `off` function in the function returned by your `useEffect` callback. Not removing an event listener can lead to unexpected behavior where your code responds to an event multiple times.
   * :::
   *
   * Here's an example of how to use `useEffect` to set up an event handler and
   * clean it up when the widget is unmounted. In this example, we're using
   * figma.on("selectionchange") to render the number of selected nodes as part
   * of the widget.
   *
   * ```tsx title="useEffect with figma.on('selectionchange')"
   * const { widget } = figma
   * const { Text, useEffect, waitForTask, useSyncedState } = widget
   *
   * function EventHandlerExample() {
   *   const [numNodes, setNumNodes] = useSyncedState('count', () => {
   *     return figma.currentPage.selection.length
   *   })
   *   useEffect(() => {
   *     let resolvePromise;
   *     const onSelectionChange = () => {
   *       setNumNodes(figma.currentPage.selection.length)
   *       resolvePromise?.()
   *     }
   *     waitForTask(new Promise(resolve => {
   *       resolvePromise = resolve;
   *       figma.on('selectionchange', onSelectionChange)
   *     }))
   *     return () => {
   *       figma.off('selectionchange', onSelectionChange)
   *     }
   *   })
   *
   *   return <Text>Number of selected nodes: {numNodes}</Text>
   * }
   *
   * widget.register(EventHandlerExample)
   * ```
   *
   * **Consolidating state updating side-effects**
   *
   * Because `useEffect` callbacks are run whenever a widget state changes - they are good candidates for performing any side-effects. This is especially useful if you have multiple functions in your widget that might update a widget's state and you want to consistently trigger the same side-effects based the final widget's state.
   *
   * ## Usage Example
   *
   * ```tsx title="useEffect example"
   * const { widget } = figma
   * const { Text, useEffect } = widget
   *
   * function UseEffectExample() {
   *   useEffect(() => {
   *     console.log("useEffect callback called")
   *   })
   *
   *   return <Text>useEffect example</Text>
   * }
   *
   * widget.register(UseEffectExample)
   * ```
   */
  useEffect(effect: () => (() => void) | void): void
  /**
   * :::info
   *
   * This API is only available in FigJam
   *
   * :::
   *
   * `useStickable` is a hook that makes your widget stick to other nodes when dragged over them. This behavior is similar to how stamp nodes work in Figma.
   *
   * @param
   * | Parameter             | Description |
   * | --------------------- | ----------- |
   * |`onStuckStatusChanged` |  An optional callback that is called whenever a widget is stuck or removed from a node. It takes a **[`WidgetStuckEvent`](/docs/widgets/api/type-WidgetStuckEvent)** as an argument. |
   *
   *
   * @remarks
   *
   * ### Basic Usage
   *
   * ```tsx title="useStickable without callback"
   * const { useStickable, Rectangle } = figma.widget;
   * function Widget() {
   *   // This widget sticks to other nodes now!
   *   useStickable();
   *   return <Rectangle width={100} height={100} fill="#F00" />;
   * }
   * figma.widget.register(Widget);
   * ```
   *
   * ![Gif of widget sticking to a sticky note](/img/widgets/stick.gif)
   *
   *
   * ### Example
   *
   * This example changes the color of the widget depending on what type of node it is stuck to.
   *
   * ```tsx title="useStickable with callback"
   * const { useStickable, Rectangle, useWidgetId, useSyncedState } = figma.widget;
   * function Widget() {
   *   const widgetId = useWidgetId();
   *   const [color, setColor] = useSyncedState("color", "#000");
   *
   *   // This widget sticks to other nodes now!
   *   useStickable(() => {
   *     const widget = figma.getNodeById(widgetId);
   *     const { stuckTo } = widget;
   *     if (!stuckTo) {
   *       // Set the color to black if the widget isn't stuck to anything.
   *       setColor("#000");
   *       return;
   *     }
   *
   *     switch (stuckTo.type) {
   *       case "STICKY":
   *         // Make the widget red if we are attacked to a sticky
   *         setColor("#F00");
   *         return;
   *       case "SHAPE_WITH_TEXT":
   *         // Make the widget green if we are attached to a shape with text
   *         setColor("#0F0");
   *         return;
   *       default:
   *         // If we are attached to anything else make the widget blue
   *         setColor("#00F");
   *         return;
   *     }
   *   });
   *
   *   return <Rectangle width={100} height={100} fill={color} />;
   * }
   * figma.widget.register(Widget);
   * ```
   *
   * ### Other Rules
   *
   * - In FigJam a node is either a stickable or a stickable host, but never both.
   * - You cannot call `useStickable` and `useStickableHost` in the same render of a widget; it can only be one or the other.
   * - By default all widgets are stickable hosts and can let stamps and other stickables stick to them.
   */
  useStickable(onStuckStatusChanged?: (e: WidgetStuckEvent) => void | Promise<void>): void
  /**
   * :::info
   *
   * This API is only available in FigJam
   *
   * :::
   *
   * `useStickableHost` lets your widget run a callback when a stickable is added or removed to your widget. By default all widgets are already stickable hosts so you don't have to call this if you just want stamps to stick to your widget.
   *
   * @param
   *
   * | Parameter             | Description |
   * | --------------------- | ----------- |
   * |`onAttachedStickablesChanged` |  An optional callback that is called whenever stickables are added or removed from this widget. It takes a **[`WidgetAttachedStickablesChangedEvent`](/docs/widgets/api/type-WidgetAttachedStickablesChangedEvent)** as an argument. |
   *
   * @remarks
   *
   * ### Example
   *
   * This widget is a rectangle that you can stamps in and it will display how many of each stamp type are present on the widget.
   *
   * ```jsx title="Stamp Vote with useStickableHost"
   * function StampVote() {
   *   const [votes, setVotes] = useSyncedState("votes", {});
   *   const widgetID = useWidgetId();
   *
   *   useStickableHost(() => {
   *     const widget = figma.getNodeById(widgetID);
   *     if (!widget) {
   *       return;
   *     }
   *     const newVotes: { [key: string]: number } = {};
   *     const { stuckNodes } = widget;
   *     for (const node of stuckNodes) {
   *       if (!node || node.type !== "STAMP") {
   *         continue;
   *       }
   *
   *       newVotes[node.name] = newVotes[node.name] || 0;
   *       newVotes[node.name] += 1;
   *     }
   *
   *     setVotes(newVotes);
   *   });
   *
   *   return (
   *     <AutoLayout
   *       fill={"#FFFFFF"}
   *       stroke={"#E6E6E6"}
   *       padding={16}
   *       direction="vertical"
   *       width={300}
   *       height={300}
   *       verticalAlignItems="end"
   *     >
   *       {Object.keys(votes).map((name) => (
   *         <Text>
   *           {name}: {votes[name]}
   *         </Text>
   *       ))}
   *     </AutoLayout>
   *   );
   * }
   * ```
   *
   * ### Other Rules
   *
   * - In FigJam a node is either a stickable or a stickable host, but never both.
   * - You cannot call `useStickable` and `useStickableHost` in the same render of a widget; it can only be one or the other.
   * - By default all widgets are stickable hosts and can let stamps and other stickables stick to them.
   * - Calling `useStickableHost` doesn't let non stickables attach to your widget.
   */
  useStickableHost(
    onAttachmentsChanged?: (e: WidgetAttachedStickablesChangedEvent) => void | Promise<void>,
  ): void
  /**
   * The `waitForTask` function is useful for doing asynchronous work (eg. data fetching) in `useEffect`. It takes a promise and keeps the widget alive until the promise is resolved (or if there’s an explicit call to `figma.closePlugin`).
   *
   * @param
   *
   * | Parameter      | Description |
   * | -------------  | ----------- |
   * | `task`         | The widget will only be terminated when the given task is resolved |
   *
   * @remarks
   *
   * One of the main use cases of `waitForTask` is doing data fetching when a widget is inserted onto the canvas. When paired with `useEffect`, you can make a network request via an iframe and persist the response in a widget state. The `waitForTask` call will prevent the widget from being terminated until the given promise has resolved.
   *
   * ### Usage Example:
   *
   * ```tsx title="waitForTask example"
   * const { widget } = figma
   * const { Text, useEffect, waitForTask, useSyncedState } = widget
   *
   * function WaitForTaskExample() {
   *   const [textContent, setTextContent] = useSyncedState("text", "Initial")
   *
   *   useEffect(() => {
   *     waitForTask(new Promise(resolve => {
   *       // Simulate async work
   *       setTimeout(() => {
   *         if (textContent !== "Final") {
   *           setTextContent("Final")
   *         }
   *         // Resolve the task
   *         resolve()
   *       }, 1000)
   *     }))
   *   })
   *
   *   return <Text>{textContent}</Text>
   * }
   *
   * widget.register(WaitForTaskExample)
   * ```
   */
  waitForTask(task: Promise<any>): void
  /**
   * :::info
   *
   * This API is only available in FigJam
   *
   * :::
   *  The `colorMapToOptions` takes in a [ColorPalette](/docs/plugins/api/ColorPalette), a map from color names to values, and returns `WidgetPropertyMenuColorSelectorOption[]`. This helper function enables developers to use `figma.constants.colors.*`, official FigJam color palettes, in the `PropertyMenu`.
   *
   *
   * @remarks
   *
   *
   * ### Usage Example:
   *
   * ```tsx title="colorMapToOptions example"
   * const { widget } = figma
   * const { colorMapToOptions, useSyncedState, usePropertyMenu, Text } = widget
   *
   * function colorPaletteExample() {
   *   const [color, setColor] = useSyncedState("theme", figma.constants.colors.figJamBase.black)
   *   usePropertyMenu(
   *     [
   *       {
   *         itemType: 'color-selector',
   *         propertyName: 'colors',
   *         tooltip: 'WidgetJSX.Color selector',
   *         selectedOption: color,
   *         options: [
   *           ...figma.widget.colorMapToOptions(figma.constants.colors.figJamBase)
   *           {option: '#f5427b', tooltip: 'Hot Pink'}
   *         ],
   *       },
   *     ],
   *     ({propertyName, propertyValue}) => {
   *       if (propertyName === "colors") {
   *         setColor(propertyValue)
   *       }
   *     },
   *   )
   *   return (
   *     <Text fill={color}>
   *       String(color)
   *     </Text>
   *   )
   * }
   *
   * widget.register(colorPaletteExample)
   * ```
   */
  colorMapToOptions(colorPalette: {
    [key: string]: string
  }): WidgetPropertyMenuColorSelectorOption[]
  AutoLayout: AutoLayout
  Frame: Frame
  Image: ImageComponent
  Rectangle: Rectangle
  Ellipse: Ellipse
  Text: TextComponent
  Input: Input
  SVG: SVG
  Line: Line
  Fragment: Fragment
  Span: Span
}
/**
 * @pageId type-WidgetClickEvent
 */
interface WidgetClickEvent {
  /**
   * canvasX is the x position of the mouse relative to the canvas.
   * This is the same as the absolute position that is used to position a node.
   */
  canvasX: number
  /**
   * canvasY is the y position of the mouse relative to the canvas.
   * This is the same as the absolute position that is used to position a node.
   */
  canvasY: number
  /**
   * offsetX is the X coordinate of the mouse relative to the component
   * that was clicked.
   */
  offsetX: number
  /**
   * offsetY is the Y coordinate of the mouse relative to the component
   * that was clicked.
   */
  offsetY: number
}
/**
 * @pageId type-WidgetStuckEvent
 */
interface WidgetStuckEvent {
  /**
   * This is the id of the new node that your widget is stuck to
   * or null if it is no longer stuck to anything.
   */
  newHostId: string | null
  /**
   * This is the id of the node that your widget was stuck to
   * or null if it is no longer stuck to anything.
   */
  oldHostId: string | null
}
/**
 * @pageId type-WidgetAttachedStickablesChangedEvent
 */
interface WidgetAttachedStickablesChangedEvent {
  /**
   * These are the node IDs that are newly stuck to your widget.
   */
  stuckNodeIds: string[]
  /**
   * These are the node IDs that were removed from your widget.
   * Note that these nodes could also have been deleted.
   */
  unstuckNodeIds: string[]
}
/**
 * @pageId type-SyncedMap
 */
interface SyncedMap<T> {
  /**
   * @deprecated Use size instead.
   */
  /** @deprecated Use size instead. */
  readonly length: number
  /**
   * Returns the number of keys in this map.
   */
  readonly size: number
  /**
   * Returns whether the given key exists.
   */
  has(key: string): boolean
  /**
   * Returns the value of the given key if one exists.
   */
  get(key: string): T | undefined
  /**
   * Persist the given key/value pair on the map.
   *
   * :::info
   *
   * Note: value has to be JSON-serializable.
   *
   * :::
   */
  set(key: string, value: T): void
  /**
   * Removes the given key and its value from the map if it exists.
   */
  delete(key: string): void
  /**
   * Returns an array of keys in the map.
   */
  keys(): string[]
  /**
   * Returns an array of values in the map.
   */
  values(): T[]
  /**
   * Returns an array of [key, value] tuples in the map.
   */
  entries(): [string, T][]
}
/**
 * @pageId component-AutoLayout
 */
type AutoLayout = FunctionalWidget<AutoLayoutProps>
/**
 * @pageId component-Frame
 */
type Frame = FunctionalWidget<FrameProps>
/**
 * @pageId component-Rectangle
 */
type Rectangle = FunctionalWidget<RectangleProps>
/**
 * @pageId component-Image
 */
type ImageComponent = FunctionalWidget<ImageProps>
/**
 * @pageId component-Ellipse
 */
type Ellipse = FunctionalWidget<EllipseProps>
/**
 * @pageId component-Line
 */
type Line = FunctionalWidget<LineProps>
/**
 * @pageId component-Text
 */
type TextComponent = FunctionalWidget<TextProps>
/**
 * @pageId component-Input
 */
type Input = FunctionalWidget<InputProps>
/**
 * @pageId component-SVG
 */
type SVG = FunctionalWidget<SVGProps>
/**
 * @pageId component-Fragment
 */
type Fragment = FunctionalWidget<FragmentProps>
/**
 * @pageId component-Span
 */
type Span = (props: WidgetJSX.SpanProps) => FigmaVirtualNode<'span'>
declare type FigmaVirtualNode<T> = {
  __type: T
}
declare type FigmaDeclarativeChildren<T> =
  | FigmaVirtualNode<T>
  | FigmaDeclarativeChildren<T>[]
  | string
  | null
  | undefined
  | false
declare type FigmaDeclarativeNode = FigmaDeclarativeChildren<any>
/**
 * @pageId N/A
 */
type FunctionalWidget<T> = (props: T) => FigmaDeclarativeNode
/**
 * @pageId type-PropertyMenu
 */
type PropertyMenuItemType =
  | 'action'
  | 'separator'
  | 'color-selector'
  | 'dropdown'
  | 'toggle'
  | 'link'
interface PropertyMenuItem {
  tooltip: string
  propertyName: string
  itemType: PropertyMenuItemType
}
/**
 * @pageId type-PropertyMenu
 */
interface WidgetPropertyMenuActionItem extends PropertyMenuItem {
  /**
   * Specifies the action item type.
   */
  itemType: 'action'
  /**
   * The tooltip of the button.
   *
   * Used as the button label if an icon is not specified.
   */
  tooltip: string
  /**
   *  Identifies the menu item. This is used to indicate which item was clicked in the callback.
   */
  propertyName: string
  /**
   * If specified, it will be used to render the button; otherwise, we'll fallback to the tooltip as the button label.
   *
   * :::info
   *
   * The provided svg should contain the following attribute to be valid: xmlns="http://www.w3.org/2000/svg"
   *
   * :::
   */
  icon?: string
}
/**
 * @pageId type-PropertyMenu
 */
interface WidgetPropertyMenuSeparatorItem {
  /**
   * Specifies the separator item type.
   */
  itemType: 'separator'
}
/**
 * @pageId N/A
 */
interface WidgetPropertyMenuColorSelectorOption {
  /**
   * The tooltip of the selector option.
   */
  tooltip: string
  /**
   * A selector option. If selected, will correspond to the `propertyValue` passed to the property menu callback.
   *
   */
  option: HexCode
}
/**
 * @pageId type-PropertyMenu
 */
interface WidgetPropertyMenuColorItem extends PropertyMenuItem {
  /**
   * Specifies the color selector item type.
   */
  itemType: 'color-selector'
  /**
   * The tooltip of the selector.
   */
  tooltip: string
  /**
   * Identifies the menu item. This is used to indicate which item was clicked in the callback.
   */
  propertyName: string
  /**
   * Array of color options to display to the user when selected. This array cannot be empty.
   */
  options: WidgetPropertyMenuColorSelectorOption[]
  /**
   * The currently selected color. This option string should match one of the `option` values specified in `options`.
   */
  selectedOption: string
}
/**
 * @pageId N/A
 */
interface WidgetPropertyMenuDropdownOption {
  /**
   * Value of the dropdown option. If selected, will correspond to `propertyValue` pass to the property menu callback.
   */
  option: string
  /**
   * The display label for the option.
   */
  label: string
}
/**
 * @pageId type-PropertyMenu
 */
interface WidgetPropertyMenuDropdownItem extends PropertyMenuItem {
  /**
   * Specifies the dropdown item type.
   */
  itemType: 'dropdown'
  /**
   * The tooltip of the dropdown component.
   */
  tooltip: string
  /**
   *  Identifies the menu item. This is used to indicate which item was clicked in the callback.
   */
  propertyName: string
  /**
   * An array of options. This array cannot be empty.
   */
  options: WidgetPropertyMenuDropdownOption[]
  /**
   * The currently selected option. This option string should match one of the `option` values specified in `options
   */
  selectedOption: string
}
interface WidgetPropertyMenuToggleItem extends PropertyMenuItem {
  /**
   * Specifies the toggle item type.
   */
  itemType: 'toggle'
  /**
   * The tooltip of the button.
   *
   * Used as the button label if an icon is not specified.
   */
  tooltip: string
  /**
   *  Identifies the menu item. This is used to indicate which item was clicked in the callback.
   */
  propertyName: string
  /**
   * The state of the toggle.
   */
  isToggled: boolean
  /**
   * If specified, it will be used to render the button; otherwise, we'll fallback to the tooltip as the button label.
   *
   * :::info
   *
   * The provided svg should contain the following attribute to be valid: xmlns="http://www.w3.org/2000/svg"
   *
   * :::
   */
  icon?: string
}
/**
 * @pageId type-PropertyMenu
 */
interface WidgetPropertyMenuLinkItem extends PropertyMenuItem {
  /**
   * Specifies the link item type.
   */
  itemType: 'link'
  /**
   * The tooltip of the link component.
   */
  tooltip: string
  /**
   *  Identifies the menu item.
   */
  propertyName: string
  /**
   * The URL that opens when a user clicks the link item.
   */
  href: string
  /**
   * If specified, it will be used to render the button; otherwise, we'll fallback to a default icon that looks like the image below:
   *
   * ![DefaultLinkIcon](https://static.figma.com/uploads/357ced3a754c95d44940b0067906f4b13ce5bc15)
   *
   *
   * In order to render the tooltip as the button's text, pass `null` as the value of `icon`.
   *
   * :::info
   *
   * The provided svg should contain the following attribute to be valid: xmlns="http://www.w3.org/2000/svg"
   *
   * :::
   */
  icon?: string | null
}
/**
 * @pageId type-PropertyMenu
 */
type WidgetPropertyMenuItem =
  | WidgetPropertyMenuActionItem
  | WidgetPropertyMenuSeparatorItem
  | WidgetPropertyMenuColorItem
  | WidgetPropertyMenuDropdownItem
  | WidgetPropertyMenuToggleItem
  | WidgetPropertyMenuLinkItem
/**
 * @pageId type-PropertyMenu
 */
type WidgetPropertyMenu = WidgetPropertyMenuItem[]
/**
 * @pageId type-PropertyMenu
 */
interface WidgetPropertyEvent {
  /**
   * The propertyName of the item that was clicked.
   */
  propertyName: string
  /**
   * The propertyValue of the item that was selected. This value will be a string value for `"dropdown"` and `"color-selector"` item types.
   */
  propertyValue?: string | undefined
}
interface TextChildren {
  children?:
    | FigmaVirtualNode<'span'>
    | string
    | number
    | (FigmaVirtualNode<'span'> | string | number)[]
}
interface TextProps extends BaseProps, WidgetJSX.WidgetJSXTextProps, TextChildren {
  font?: {
    family: string
    style: string
  }
}
/**
 * @pageId type-TextEditEvent
 */
interface TextEditEvent {
  /**
   * The text that was edited in the input component.
   */
  characters: string
}
/**
 * @pageId type-PlaceholderProps
 */
interface PlaceholderProps extends WidgetJSX.BlendProps, Omit<WidgetJSX.TextStyleProps, 'href'> {}
interface InputProps extends Omit<TextProps, 'children' | 'width'> {
  /**
   * A method that is called when a user exits text edit mode (similar to [`onBlur`](https://reactjs.org/docs/events.html#onblur) in React).
   *
   * The `event` is an object containing the characters in the editable text field. i.e.
   * `{ characters: "someText" }`
   *
   * The `onTextEditEnd` event can always be triggered via clicking out of the element, hitting `Escape`, or `Cmd + Enter`. See [`inputBehavior`](#inputbehavior) for other ways to trigger `onTextEditEnd` and blur the input.
   */
  onTextEditEnd: (event: TextEditEvent) => void
  /**
   * The value of the editable text. Typically, this value will be a synced variable that will be set in the `onTextEditEnd` callback.
   */
  value: string | null
  /**
   * Placeholder text that shows whenever `value` is `null` or an empty string.
   */
  placeholder?: string
  /**
   * Props to customize the text placeholder. Use this prop if you want the placeholder to render differently compared to the editable text.
   *
   * All relevant props on the Input component will automatically be are applied to both the editable text and the placeholder. Any additional props specified here will then be applied only to the placeholder.
   */
  placeholderProps?: PlaceholderProps
  /**
   * Props to customize the Autolayout frame that parents the editable text and placeholder.
   */
  inputFrameProps?: Omit<AutoLayoutProps, 'width'>
  /**
   * The width of the editable text. The text will wrap around if the user types beyond the width. Defaults to `200`.
   */
  width?: WidgetJSX.Size
  /**
   * Allows you to specify some interactions and resizing behavior of the Input component.
   *
   * | value | description |
   * | -- | -- |
   * |`"wrap"` (default) | Typing `Enter` blurs the input and triggers `onTextEditEnd`. On overflow, the text will wrap to the next line and the height of the input will autoresize. |
   * | `"truncate"` | Typing `Enter` blurs the input and triggers `onTextEditEnd`. On overflow, the text will truncate. |
   * | `"multiline"`| Typing `Enter` will create a new line. On overflow, the text will wrap to the next line and the height of the input will resize automatically. |
   */
  inputBehavior?: 'wrap' | 'truncate' | 'multiline'
}
interface FragmentProps extends HasChildrenProps {
  key?: BaseProps['key']
}
interface FrameProps extends BaseProps, WidgetJSX.WidgetJSXFrameProps, HasChildrenProps {}
/**
 * @pageId component-AutoLayout
 **/
interface AutoLayoutProps extends BaseProps, WidgetJSX.WidgetJSXAutoLayoutProps, HasChildrenProps {}
interface EllipseProps extends BaseProps, WidgetJSX.WidgetJSXEllipseProps {}
interface RectangleProps extends BaseProps, WidgetJSX.WidgetJSXRectangleProps {}
interface ImageProps extends BaseProps, WidgetJSX.WidgetJSXImageProps {}
interface LineProps extends BaseProps, WidgetJSX.WidgetJSXLineProps {
  /**
   * The length of the line.
   */
  length?: WidgetJSX.Size
  /**
   * The decoration applied to the line endpoints.
   */
  strokeCap?: WidgetJSX.StrokeCap
}
interface SVGProps extends BaseProps, Partial<WidgetJSX.WidgetJSXFrameProps> {
  /**
   * A svg string of the form `<svg .... />`
   */
  src: string
}
/**
 * @pageId components
 */
interface BaseProps extends WidgetJSX.WidgetJSXBaseProps {
  /**
   * Attach a click handler on the given node. If the given function is async or returns a promise, the widget is only terminated when the async function has completed and the promise has been resolved.
   * The click handler is also passed a [`WidgetClickEvent`](/docs/widgets/api/type-WidgetClickEvent) object that contains additional information about the click.
   *
   * See also: [Handling User Events](/docs/widgets/handling-user-events).
   */
  onClick?: (event: WidgetClickEvent) => Promise<any> | void
  /**
   * The key of the component.
   */
  key?: string | number
  /**
   * The style to be applied when the mouse is hovering over the component.
   */
  hoverStyle?: WidgetJSX.HoverStyle
  /**
   * The tooltip that is shown to the user when hovering over the component.
   */
  tooltip?: string
  /**
   * This value is ignored unless the node is a direct child of an AutoLayout frame.
   *
   * | value  | description |
   * | -- | -- |
   * | 'auto' | Layout this node according to auto-layout rules. |
   * | 'absolute' | Take this node out of the auto-layout flow, while still nesting it inside the auto-layout frame. This allows explicitly setting `x`, `y`, `width`, and `height`. |
   */
  positioning?: 'auto' | 'absolute'
}
interface HasChildrenProps {
  /**
   * The child nodes of the component.
   */
  children?: FigmaDeclarativeNode | FigmaDeclarativeNode[]
}
/**
 * @pageId N/A
 */
type HexCode = string
/**
 * @pageId N/A
 */
declare namespace WidgetJSX {
  interface Vector {
    x: number
    y: number
  }
  /**
   * @pageId type-Color
   */
  interface Color {
    r: number
    g: number
    b: number
    a: number
  }
  /**
   * @pageId type-ArcData
   */
  type ArcData = {
    readonly startingAngle: number
    readonly endingAngle: number
    readonly innerRadius: number
  }
  /**
   * @pageId type-AlignItems
   */
  type AlignItems = 'center' | 'start' | 'end' | 'baseline'
  /**
   * @pageId type-BlendMode
   */
  type BlendMode =
    | 'pass-through'
    | 'normal'
    | 'multiply'
    | 'screen'
    | 'overlay'
    | 'darken'
    | 'lighten'
    | 'color-dodge'
    | 'color-burn'
    | 'hard-light'
    | 'soft-light'
    | 'difference'
    | 'exclusion'
    | 'hue'
    | 'saturation'
    | 'color'
    | 'luminosity'
  /**
   * @pageId type-Paint
   */
  type PaintType =
    | 'image'
    | 'solid'
    | 'gradient-linear'
    | 'gradient-radial'
    | 'gradient-angular'
    | 'gradient-diamond'
  /**
   * @pageId type-PaintType
   */
  interface PaintProps {
    /**
     * One of: 'image' | 'solid' | 'gradient-linear' | 'gradient-radial' | 'gradient-angular' | 'gradient-diamond'.
     */
    type: PaintType
    /**
     * Determines how the color of this paint blends with the colors underneath it. Defaults to "NORMAL".
     */
    blendMode?: BlendMode
    /**
     * Whether the paint is visible. Defaults to true.
     */
    visible?: boolean
    /**
     * The opacity of the paint. Must be a value between 0 and 1. Defaults to 1.
     */
    opacity?: number
  }
  /**
   * @pageId type-SolidPaint
   */
  interface SolidPaint extends PaintProps {
    /**
     * The type of the solid paint.
     */
    type: 'solid'
    /**
     * The solid color of the paint.
     */
    color: Color | HexCode
  }
  /**
   * @pageId N/A
   */
  interface ColorStop {
    position: number
    color: Color
  }
  /**
   * @pageId type-GradientPaint
   */
  interface GradientPaint extends PaintProps {
    /**
     * The type of gradient paint.
     */
    type: 'gradient-linear' | 'gradient-radial' | 'gradient-angular' | 'gradient-diamond'
    /**
     * The positioning of the gradient within the layer.
     *
     * This field contains three vectors, each of which are a position in normalized object space (normalized object space is if the top left corner of the bounding box of the object is (0, 0) and the bottom right is (1,1)).
     * 1. The first position corresponds to the start of the gradient (value 0 for the purposes of calculating gradient stops)
     * 2. The second position is the end of the gradient (value 1)
     * 3. The third position determines the width of the gradient.
     */
    gradientHandlePositions: [Vector, Vector, Vector]
    /**
     * Array of colors and their position within the gradient.
     */
    gradientStops: ColorStop[]
  }
  /**
   * @pageId type-Transform
   */
  type Transform = [[number, number, number], [number, number, number]]
  /**
   * @pageId type-ImagePaint
   */
  interface ImagePaint extends PaintProps {
    /**
     * The string literal "image".
     */
    type: 'image'
    /**
     * An Image URL or DataURI encoding the image.
     */
    src: string
    /**
     * The size of the image.
     */
    imageSize?: {
      width: number
      height: number
    }
    /**
     * How the image is positioned and scaled within the layer.
     */
    scaleMode?: ScaleMode
    /**
     * Applicable only for `scaleMode == "crop"`. Determines how the image is positioned (thus, cropped) within the layer.
     */
    imageTransform?: Transform
    /**
     * Applicable only for `scaleMode == "tile"` (automatic for other modes). Determines the scaling (thus, repetition) of the image within the layer.
     */
    scalingFactor?: number
    /**
     * Applicable only for `scaleMode == "tile" | "fill" | "fit"` (automatic for `scaleMode == "CROP"`). Determines the rotation of the image within the layer. Must be in increments of +90.
     */
    rotation?: number
    imageRef?: string
  }
  /**
   * @pageId type-Paint
   */
  type Paint = SolidPaint | GradientPaint | ImagePaint
  type ShadowEffect = DropShadowEffect | InnerShadowEffect
  /**
   * @pageId type-Effect
   */
  interface DropShadowEffect {
    /**
     * The type of the shadow.
     */
    type: 'drop-shadow'
    /**
     * The color of the shadow, including its opacity.
     */
    color: HexCode | Color
    /**
     * The offset of the shadow relative to its object. Use this property to simulate the direction of the light.
     */
    offset: Vector
    /**
     * The blur radius of the shadow. Must be >= 0. A lower radius creates a sharper shadow.
     */
    blur: number
    /**
     * Determines how the color of this shadow blends with the colors underneath it.
     */
    blendMode?: BlendMode
    /**
     * The distance by which to expand (or contract) the shadow. For drop shadows, a positive spread value creates a shadow larger than the node, whereas a negative value creates a shadow smaller than the node. For inner shadows, a positive `spread` value contracts the shadow. Additionally, `spread` values are only accepted on rectangles, ellipses, frames, components, and instances with visible fill paints and `clipsContent` enabled. When left unspecified, the default value is 0.
     */
    spread?: number
    /**
     * Whether this shadow is visible.
     */
    visible?: boolean
    /**
     * Whether the drop shadow should show behind translucent or transparent pixels within the node's geometry. Defaults to `true`.
     */
    showShadowBehindNode?: boolean
  }
  interface InnerShadowEffect {
    /**
     * The type of the shadow.
     */
    type: 'inner-shadow'
    /**
     * The color of the shadow, including its opacity.
     */
    color: HexCode | Color
    /**
     * The offset of the shadow relative to its object. Use this property to simulate the direction of the light.
     */
    offset: Vector
    /**
     * The blur radius of the shadow. Must be >= 0. A lower radius creates a sharper shadow.
     */
    blur: number
    /**
     * Determines how the color of this shadow blends with the colors underneath it.
     */
    blendMode?: BlendMode
    /**
     * The distance by which to expand (or contract) the shadow. For drop shadows, a positive spread value creates a shadow larger than the node, whereas a negative value creates a shadow smaller than the node. For inner shadows, a positive `spread` value contracts the shadow. Additionally, `spread` values are only accepted on rectangles, ellipses, frames, components, and instances with visible fill paints and `clipsContent` enabled. When left unspecified, the default value is 0.
     */
    spread?: number
    /**
     * Whether this shadow is visible.
     */
    visible?: boolean
  }
  /**
   * @pageId type-Effect
   */
  interface BlurEffect {
    /**
     * The type of the blur.
     */
    type: 'layer-blur' | 'background-blur'
    /**
     * The blur radius of the shadow. Must be >= 0. A lower radius creates a sharper shadow.
     */
    blur: number
    /**
     * Whether this shadow is visible.
     */
    visible?: boolean
  }
  /**
   * @pageId type-Effect
   */
  type Effect = DropShadowEffect | InnerShadowEffect | BlurEffect
  /**
   * @pageId type-Size
   */
  type Size = number | 'fill-parent'
  /**
   * @pageId type-Size
   */
  type AutolayoutSize = Size | 'hug-contents'
  /**
   * @pageId type-StrokeAlign
   */
  type StrokeAlign = 'inside' | 'outside' | 'center'
  /**
   * @pageId type-StrokeCap
   */
  type StrokeCap = 'none' | 'round' | 'square' | 'arrow-lines' | 'arrow-equilateral'
  /**
   * @pageId N/A
   */
  type ScaleMode = 'fill' | 'fit' | 'tile' | 'crop'
  /**
   * @pageId N/A
   */
  type Overflow = 'visible' | 'hidden' | 'scroll'
  interface TopConstraint {
    type: 'top'
    offset: number
  }
  interface BottomConstraint {
    type: 'bottom'
    offset: number
  }
  interface TopBottomConstraint {
    type: 'top-bottom'
    topOffset: number
    bottomOffset: number
  }
  interface LeftConstraint {
    type: 'left'
    offset: number
  }
  interface RightConstraint {
    type: 'right'
    offset: number
  }
  interface LeftRightConstraint {
    type: 'left-right'
    leftOffset: number
    rightOffset: number
  }
  interface CenterConstraint {
    type: 'center'
    offset: number
  }
  interface HorizontalScaleConstraint {
    type: 'horizontal-scale'
    leftOffsetPercent: number
    rightOffsetPercent: number
  }
  interface VerticalScaleConstraint {
    type: 'vertical-scale'
    topOffsetPercent: number
    bottomOffsetPercent: number
  }
  /**
   * @pageId type-Constraint
   */
  type VerticalConstraint =
    | TopConstraint
    | BottomConstraint
    | TopBottomConstraint
    | CenterConstraint
    | VerticalScaleConstraint
  /**
   * @pageId type-Constraint
   */
  type HorizontalConstraint =
    | LeftConstraint
    | RightConstraint
    | LeftRightConstraint
    | CenterConstraint
    | HorizontalScaleConstraint
  /**
   * @pageId type-CornerRadius
   */
  type CornerRadius =
    | number
    | {
        topLeft?: number
        topRight?: number
        bottomLeft?: number
        bottomRight?: number
      }
  /**
   * @pageId type-Path
   */
  type Path = {
    path: string
    windingRule: 'evenodd' | 'nonzero'
  }
  type FullPadding = {
    top?: number
    left?: number
    bottom?: number
    right?: number
  }
  type VerticalHorizontalPadding = {
    vertical?: number
    horizontal?: number
  }
  /**
   * @pageId type-Padding
   */
  type Padding = number | FullPadding | VerticalHorizontalPadding
  /**
   * @pageId type-FontWeight
   */
  type FontWeightNumerical = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900
  /**
   * @pageId type-FontWeight
   */
  type FontWeightString =
    | 'thin'
    | 'extra-light'
    | 'light'
    | 'normal'
    | 'medium'
    | 'semi-bold'
    | 'bold'
    | 'extra-bold'
    | 'black'
  /**
   * @pageId type-FontWeight
   */
  type FontWeight = FontWeightNumerical | FontWeightString
  /**
   * @pageId type-HoverStyle
   */
  interface HoverStyle {
    fill?: HexCode | Color | Paint | (SolidPaint | GradientPaint)[]
    stroke?: HexCode | Color | SolidPaint | GradientPaint | (SolidPaint | GradientPaint)[]
    opacity?: number
  }
  /**
   * @pageId interface-BaseProps
   */
  interface WidgetJSXBaseProps extends BlendProps, ConstraintProps {
    /**
     * The name of the component. This is useful to specify a data-layer attribute to make things more debuggable when you inspect the sublayers of your widget.
     */
    name?: string
    /**
     * Toggles whether to show the component.
     */
    hidden?: boolean
  }
  interface GeometryProps {
    /**
     * The paints used to fill the area of the node
     */
    fill?: HexCode | Color | Paint | (SolidPaint | GradientPaint)[]
    /**
     * The paints used to fill the area of the node's stroke.
     */
    stroke?: HexCode | Color | SolidPaint | GradientPaint | (SolidPaint | GradientPaint)[]
    /**
     * The thickness of the stroke, in pixels. This value must be non-negative and can be fractional.
     */
    strokeWidth?: number
    /**
     * The alignment of the stroke with respect to the boundaries of the node.
     *
     * Center-aligned stroke means the center of the stroke falls exactly on the geometry. Inside-aligned stroke shifts the stroke so it lies completely inside the shape, and outside-aligned stroke is vice versa.
     *
     * :::info
     *
     * Inside and outside stroke are actually implemented by doubling the stroke weight and masking the stroke by the fill. This means inside-aligned stroke will never draw strokes outside the fill and outside-aligned stroke will never draw strokes inside the fill.
     *
     * :::
     */
    strokeAlign?: StrokeAlign
    /**
     * The alternating stroke dash and gap lengths, in pixels. An empty array gives a solid stroke and a single value will be applied to both the dash and gap length.
     */
    strokeDashPattern?: number[]
  }
  interface PathProps {
    fillPath?: Path[]
    strokePath?: Path[]
  }
  interface SizePropsRequired extends SizeConstraintProps {
    /**
     * The width of the component. This is required.
     */
    width: Size
    /**
     * The height of the component. This is required.
     */
    height: Size
  }
  interface SizeProps extends SizeConstraintProps {
    /**
     * The width of the component.
     */
    width?: Size
    /**
     * The height of the component.
     */
    height?: Size
  }
  interface SizeConstraintProps {
    /**
     * The minWidth of this component. Only affects AutoLayout and its children.
     */
    minWidth?: number
    /**
     * The maxWidth of this component. Only affects AutoLayout and its children.
     */
    maxWidth?: number
    /**
     * The minHeight of this component. Only affects AutoLayout and its children.
     */
    minHeight?: number
    /**
     * The maxHeight of this component. Only affects AutoLayout and its children.
     */
    maxHeight?: number
  }
  interface AutoLayoutSizeProps {
    /**
     * The width of the component.
     */
    width?: AutolayoutSize
    /**
     * The height of the component.
     */
    height?: AutolayoutSize
  }
  interface CornerProps {
    /**
     * The number of pixels to round the corners of the object by.
     *
     * This value must be non-negative and can be fractional. If an edge length is less than twice the corner radius, the corner radius for each vertex of the edge will be clamped to half the edge length.
     *
     * :::info
     *
     * Rectangle nodes can also have different corner radii on each of the four corners.
     *
     * :::
     */
    cornerRadius?: CornerRadius
  }
  /**
   * @pageId interface-BlendProps
   */
  interface BlendProps {
    /**
     * The blendMode of the component.
     */
    blendMode?: BlendMode
    /**
     * The opacity of the component.
     */
    opacity?: number
    /**
     * The effect of the component.
     */
    effect?: Effect | Effect[]
  }
  interface TransformProps {
    /**
     * The rotation of the node in degrees. Expects values from -180 to 180.
     *
     * The rotation is with respect to the top-left of the object. Therefore, it is independent from the position of the object.
     */
    rotation?: number
  }
  interface ConstraintProps {
    /**
     * The x position of the node.
     *
     * This value is ignored if the node is a child of an AutoLayout frame and has positioning set to 'auto'.
     */
    x?: number | HorizontalConstraint
    /**
     * The y position of the node.
     *
     * This value is ignored if the node is a child of an AutoLayout frame and has positioning set to 'auto'.
     */
    y?: number | VerticalConstraint
  }
  /**
   * @pageId type-LayoutGap
   */
  interface LayoutGap {
    /**
     * The horizontal gap between auto-layout children.
     *
     * `"auto"` is the same as `justify-content: space-between` in css.
     */
    horizontal?: number | 'auto'
    /**
     * The vertical gap between auto-layout children.
     *
     * `"auto"` is the same as `align-content: space-between` in css.
     */
    vertical?: number | 'auto'
  }
  interface LayoutProps {
    /**
     * Determines distance between children of this AutoLayout frame. A single number value or 'auto'
     * controls both horizontal and vertical gap.
     *
     * "auto" spacing is the same as `justify-content: space-between` in css.
     */
    spacing?: number | 'auto' | LayoutGap
    /**
     * Determines the padding between the border of the AutoLayout frame and its children.
     */
    padding?: Padding
    /**
     * Determines the auto-layout direction of this frame
     */
    direction?: 'horizontal' | 'vertical'
    /**
     * Determines how the children in this AutoLayout frame should be aligned in the horizontal direction.
     */
    horizontalAlignItems?: Omit<AlignItems, 'baseline'>
    /**
     * Determines how the children in this AutoLayout frame should be aligned in the vertical direction.
     */
    verticalAlignItems?: AlignItems
    /**
     * Determines whether children that overflow the bounds of this frame will wrap to a new line.
     * Only applicable when `direction` is set to `"horizontal"`.
     */
    wrap?: boolean
  }
  interface TextStyleProps extends NoHrefTextStyleProps {
    /**
     * If specified, turns the text node into a link that navigates to the specified `href` on click.
     */
    href?: string
  }
  interface NoHrefTextStyleProps {
    /**
     * The font family (e.g. "Inter"). The supported fonts are all the fonts in the [Google Fonts](https://fonts.google.com/) library.
     */
    fontFamily?: string
    /**
     * The spacing between the individual characters.
     */
    letterSpacing?: number | string
    /**
     * Whether the text is underlined or has a strikethrough.
     */
    textDecoration?: 'none' | 'strikethrough' | 'underline'
    /**
     * The size of the font. Has minimum value of 1.
     */
    fontSize?: number
    /**
     * Whether or not to italicize the text content.
     */
    italic?: boolean
    /**
     * Overrides the case of the raw characters in the text node.
     */
    textCase?: 'upper' | 'lower' | 'title' | 'original' | 'small-caps' | 'small-caps-forced'
    /**
     * The font weight eg. 400, 500 or 'medium', 'bold'.
     */
    fontWeight?: FontWeight
    fontPostScriptName?: string
    /**
     * The paints used to fill in the text.
     */
    fill?: HexCode | Color | Paint | (SolidPaint | GradientPaint)[]
  }
  interface WidgetJSXFrameProps
    extends BaseProps,
      GeometryProps,
      SizePropsRequired,
      TransformProps,
      CornerProps {
    /**
     * The overflow of the component - 'visible' | 'hidden' | 'scroll'
     *
     * Specify `hidden` to clip the contents of the frame. `visible` and `scroll` both
     * behave the same way and will allow the contents of the frame to overflow.
     */
    overflow?: Overflow
  }
  interface WidgetJSXAutoLayoutProps
    extends Omit<FrameProps, 'width' | 'height'>,
      LayoutProps,
      AutoLayoutSizeProps {}
  interface WidgetJSXEllipseProps extends BaseProps, GeometryProps, TransformProps, SizeProps {
    /**
     * The "arc" properties of the Ellipse.
     */
    arcData?: ArcData
  }
  interface WidgetJSXImageProps extends Omit<RectangleProps, 'fill'> {
    /**
     * A string representing Image URL/DataURI or an ImagePaint.
     */
    src: string | ImagePaint
  }
  interface WidgetJSXLineProps
    extends BaseProps,
      TransformProps,
      Pick<GeometryProps, 'stroke' | 'strokeWidth' | 'strokeDashPattern'> {}
  interface WidgetJSXRectangleProps
    extends BaseProps,
      GeometryProps,
      SizePropsRequired,
      TransformProps,
      CornerProps {}
  interface WidgetJSXSVGProps
    extends BaseProps,
      GeometryProps,
      SizeProps,
      TransformProps,
      PathProps {}
  interface ParagraphProps {
    spacing: number
  }
  interface SpanProps extends TextStyleProps, TextChildren {}
  interface WidgetJSXTextProps
    extends BaseProps,
      AutoLayoutSizeProps,
      TransformProps,
      Omit<GeometryProps, 'fill'>,
      TextStyleProps {
    /**
     * The indentation of paragraphs (offset of the first line from the left).
     */
    paragraphIndent?: number
    /**
     * The vertical distance between paragraphs.
     */
    paragraphSpacing?: number
    /**
     * The horizontal alignment of the text with respect to the Text node.
     */
    horizontalAlignText?: 'left' | 'right' | 'center' | 'justified'
    /**
     * The vertical alignment of the text with respect to the Text node.
     */
    verticalAlignText?: 'top' | 'center' | 'bottom'
    /**
     * The spacing between the lines in a paragraph of text.
     */
    lineHeight?: number | string | 'auto'
    /**
     * Whether the text should truncate if it overflows the size of the node. Set to a number to
     * truncate after a specific number of lines.
     */
    truncate?: boolean | number
  }
  type ComponentProps = AutoLayoutProps | FrameProps
}
