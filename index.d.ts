// Figma Widget API version 1, update 1

declare global {
  // Extend the global widget api
  interface PluginAPI {
    widget: WidgetAPI
  }

  ///////////////////////////////////////////////////////////////////////////////
  // JSX
  namespace JSX {
    /**
     * You shouldn't need to use this type since you never see these attributes
     * inside your component or have to validate them.
     */
    interface IntrinsicAttributes {
      key?: string | number | undefined
    }

    interface ElementChildrenAttribute {
      children: {}
    }
  }

  ///////////////////////////////////////////////////////////////////////////////
  // Widget

  interface WidgetAPI {
    register(component: FunctionalWidget<any>): void
    h(...args: any[]): FigmaDeclarativeNode

    // Hooks
    useWidgetId(): string
    useSyncedState<T = any>(
      name: string,
      defaultValue: T | (() => T),
    ): [T, (newValue: T | ((currValue: T) => T)) => void]
    useSyncedMap<T = any>(name: string): SyncedMap<T>
    usePropertyMenu(
      items: WidgetPropertyMenuItem[],
      onChange: (event: WidgetPropertyEvent) => void | Promise<void>,
    ): void

    useEffect(effect: () => (() => void) | void): void

    useStickable(onStuckStatusChanged?: (e: WidgetStuckEvent) => void | Promise<void>): void
    useStickableHost(
      onAttachmentsChanged?: (e: WidgetAttachedStickablesChangedEvent) => void | Promise<void>,
    ): void

    waitForTask(promise: Promise<any>): void

    // Components
    AutoLayout: AutoLayout
    Frame: Frame
    Image: ImageComponent
    Rectangle: Rectangle
    Ellipse: Ellipse
    Text: TextComponent
    SVG: SVG
    Input: InputComponent
    Line: Line
    Fragment: Fragment
  }

  interface WidgetStuckEvent {
    // This is the id of the new node that your widget is stuck to
    // or null if it is no longer stuck to anything
    newHostId: string | null
    // This is the id of the node that your widget was stuck to or null if it isn't stuck to anything
    oldHostId: string | null
  }

  interface WidgetAttachedStickablesChangedEvent {
    stuckNodeIds: string[]
    unstuckNodeIds: string[]
  }

  type SyncedMap<T = any> = {
    /** @deprecated use size instead */
    readonly length: number

    readonly size: number
    has(key: string): boolean
    get(key: string): T | undefined
    set(key: string, value: T): void
    delete(key: string): void
    keys(): string[]
    values(): T[]
    entries(): [string, T][]
  }

  type Fragment = FunctionalWidget<FragmentProps>

  type AutoLayout = FunctionalWidget<AutoLayoutProps>
  type Frame = FunctionalWidget<FrameProps>

  type Rectangle = FunctionalWidget<RectangleProps>

  type ImageComponent = FunctionalWidget<ImageProps>

  type Ellipse = FunctionalWidget<EllipseProps>
  type Line = FunctionalWidget<LineProps>

  type TextComponent = FunctionalWidget<TextProps>

  type InputComponent = FunctionalWidget<InputProps>

  type SVG = FunctionalWidget<SVGProps>

  type FigmaDeclarativeNode = Object | any[] | string | null | undefined | false
  type FunctionalWidget<T> = (props: T) => FigmaDeclarativeNode

  type PropertyMenuItemType = 'action' | 'separator' | 'color-selector' | 'dropdown'

  type HexCode = string
  interface PropertyMenuItem {
    tooltip: string
    propertyName: string
    itemType: PropertyMenuItemType
  }

  interface WidgetPropertyMenuActionItem extends PropertyMenuItem {
    itemType: 'action'
    icon?: string
  }

  interface WidgetPropertyMenuSeparatorItem {
    itemType: 'separator'
  }

  interface WidgetPropertyMenuColorSelectorOption {
    tooltip: string
    option: HexCode
  }

  interface WidgetPropertyMenuColorItem extends PropertyMenuItem {
    itemType: 'color-selector'
    options: WidgetPropertyMenuColorSelectorOption[]
    selectedOption: string
  }

  interface WidgetPropertyMenuDropdownOption {
    option: string
    label: string
  }

  interface WidgetPropertyMenuDropdownItem extends PropertyMenuItem {
    itemType: 'dropdown'
    options: WidgetPropertyMenuDropdownOption[]
    selectedOption: string
  }

  type WidgetPropertyMenuItem =
    | WidgetPropertyMenuActionItem
    | WidgetPropertyMenuSeparatorItem
    | WidgetPropertyMenuColorItem
    | WidgetPropertyMenuDropdownItem

  type WidgetPropertyMenu = WidgetPropertyMenuItem[]
  type WidgetPropertyEvent = {
    propertyName: string
    propertyValue?: string | undefined
  }

  type WidgetClickEvent = {
    // canvasX and canvasY are the coordinates of the click relative to the canvas
    // this is the same as the absolute position that is used to position a node
    canvasX: number
    canvasY: number

    // offsetX and offsetY are the coordinates of the click relative to the component
    // that was clicked
    offsetX: number
    offsetY: number
  }

  interface TextProps extends BaseProps, WidgetJSX.TextProps {
    font?: { family: string; style: string }
    children?: string | number | (string | number)[]
  }

  interface TextEditEvent {
    characters: string
  }
  interface PlaceholderProps extends WidgetJSX.BlendProps, Omit<WidgetJSX.TextStyleProps, 'href'> {}
  interface InputProps extends Omit<TextProps, 'children' | 'width'> {
    placeholder?: string
    onTextEditEnd: (e: TextEditEvent) => void
    value: string | null
    placeholderProps?: PlaceholderProps
    inputFrameProps?: Omit<AutoLayoutProps, 'width'>
    width?: WidgetJSX.Size
    inputBehavior?: 'wrap' | 'truncate' | 'multiline'
  }

  interface FragmentProps extends HasChildrenProps {
    key?: BaseProps['key']
  }

  interface FrameProps extends BaseProps, WidgetJSX.FrameProps, HasChildrenProps {}

  interface AutoLayoutProps extends BaseProps, WidgetJSX.AutoLayoutProps, HasChildrenProps {}

  interface EllipseProps extends BaseProps, WidgetJSX.EllipseProps {}

  interface RectangleProps extends BaseProps, WidgetJSX.RectangleProps {}

  interface ImageProps extends BaseProps, WidgetJSX.ImageProps {}

  interface LineProps extends BaseProps, Omit<WidgetJSX.LineProps, 'direction' | 'length'> {
    length?: WidgetJSX.LineProps['length']
  }

  interface SVGProps extends BaseProps, Partial<WidgetJSX.FrameProps> {
    src: string
  }

  interface BaseProps extends WidgetJSX.BaseProps {
    // We have a custom onClick api that returns a promise
    onClick?: (event: WidgetClickEvent) => Promise<any> | void
    key?: string | number
    tooltip?: string
  }

  interface HasChildrenProps {
    children?: FigmaDeclarativeNode | FigmaDeclarativeNode[]
  }
  namespace WidgetJSX {
    export interface Vector {
      x: number
      y: number
    }

    export interface Color {
      r: number
      g: number
      b: number
      a: number
    }

    export type AlignItems = 'center' | 'start' | 'end' | 'baseline'
    export type BlendMode =
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

    export type PaintType =
      | 'image'
      | 'solid'
      | 'gradient-linear'
      | 'gradient-radial'
      | 'gradient-angular'
      | 'gradient-diamond'

    export interface PaintProps {
      type: PaintType
      blendMode?: BlendMode
      visible?: boolean
      opacity?: number
    }

    export interface SolidPaint extends PaintProps {
      type: 'solid'
      color: Color | HexCode
    }

    export interface ColorStop {
      position: number
      color: Color
    }

    export interface GradientPaint extends PaintProps {
      type: 'gradient-linear' | 'gradient-radial' | 'gradient-angular' | 'gradient-diamond'
      gradientHandlePositions: [Vector, Vector, Vector]
      gradientStops: ColorStop[]
    }

    export type Transform = [[number, number, number], [number, number, number]]

    export interface ImagePaint extends PaintProps {
      type: 'image'
      src: string
      imageSize?: { width: number; height: number }
      scaleMode?: ScaleMode
      imageTransform?: Transform
      scalingFactor?: number
      rotation?: number
      imageRef?: string
    }

    export type Paint = SolidPaint | GradientPaint | ImagePaint

    export interface DropShadowEffect {
      type: 'drop-shadow'
      color: HexCode | Color
      offset: Vector
      blur: number
      blendMode?: BlendMode
      spread?: number
      visible?: boolean
      showShadowBehindNode?: boolean
    }

    export interface InnerShadowEffect {
      type: 'inner-shadow'
      color: HexCode | Color
      offset: Vector
      blur: number
      blendMode?: BlendMode
      spread?: number
      visible?: boolean
    }

    export type ShadowEffect = DropShadowEffect | InnerShadowEffect

    export interface BlurEffect {
      type: 'layer-blur' | 'background-blur'
      blur: number
      visible?: boolean
    }

    export type Effect = ShadowEffect | BlurEffect

    export type Size = number | 'fill-parent'
    export type AutolayoutSize = Size | 'hug-contents'
    export type StrokeAlign = 'inside' | 'outside' | 'center'
    export type StrokeCap = 'none' | 'round' | 'square' | 'arrow-lines' | 'arrow-equilateral'
    export type ScaleMode = 'fill' | 'fit' | 'tile' | 'crop'
    export type Overflow = 'visible' | 'hidden' | 'scroll'

    export interface TopConstraint {
      type: 'top'
      offset: number
    }

    export interface BottomConstraint {
      type: 'bottom'
      offset: number
    }

    export interface TopBottomConstraint {
      type: 'top-bottom'
      topOffset: number
      bottomOffset: number
    }

    export interface LeftConstraint {
      type: 'left'
      offset: number
    }

    export interface RightConstraint {
      type: 'right'
      offset: number
    }

    export interface LeftRightConstraint {
      type: 'left-right'
      leftOffset: number
      rightOffset: number
    }

    export interface CenterConstraint {
      type: 'center'
      offset: number
    }

    export interface HorizontalScaleConstraint {
      type: 'horizontal-scale'
      leftOffsetPercent: number
      rightOffsetPercent: number
    }

    export interface VerticalScaleConstraint {
      type: 'vertical-scale'
      topOffsetPercent: number
      bottomOffsetPercent: number
    }

    type VerticalConstraint =
      | TopConstraint
      | BottomConstraint
      | TopBottomConstraint
      | CenterConstraint
      | VerticalScaleConstraint
    type HorizontalConstraint =
      | LeftConstraint
      | RightConstraint
      | LeftRightConstraint
      | CenterConstraint
      | HorizontalScaleConstraint

    export type CornerRadius =
      | number
      | {
          topLeft?: number
          topRight?: number
          bottomLeft?: number
          bottomRight?: number
        }

    export type Path = {
      path: string
      windingRule: 'evenodd' | 'nonzero'
    }

    export type FullPadding = {
      top?: number
      left?: number
      bottom?: number
      right?: number
    }
    export type VerticalHorizontalPadding = {
      vertical?: number
      horizontal?: number
    }
    export type Padding = number | FullPadding | VerticalHorizontalPadding

    export type FontWeightNumerical = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900
    export type FontWeightString =
      | 'thin'
      | 'extra-light'
      | 'light'
      | 'normal'
      | 'medium'
      | 'semi-bold'
      | 'bold'
      | 'extra-bold'
      | 'black'
    export type FontWeight = FontWeightNumerical | FontWeightString

    export type ArcData = {
      readonly startingAngle: number
      readonly endingAngle: number
      readonly innerRadius: number
    }

    interface HoverStyle {
      fill?: HexCode | Color | Paint | (SolidPaint | GradientPaint)[]
      stroke?: HexCode | Color | SolidPaint | GradientPaint | (SolidPaint | GradientPaint)[]
      opacity?: number
    }

    ///
    /// MIXINS
    ///
    export interface BaseProps extends BlendProps, ConstraintProps {
      name?: string
      hidden?: boolean
      hoverStyle?: HoverStyle
      positioning?: 'auto' | 'absolute'
    }

    export interface GeometryProps {
      fill?: HexCode | Color | Paint | (SolidPaint | GradientPaint)[]
      stroke?: HexCode | Color | SolidPaint | GradientPaint | (SolidPaint | GradientPaint)[]
      strokeWidth?: number
      strokeAlign?: StrokeAlign
      strokeDashPattern?: number[]
    }

    export interface PathProps {
      fillPath?: Path[]
      strokePath?: Path[]
    }

    export interface SizeProps {
      width?: Size
      height?: Size
    }

    export interface AutoLayoutSizeProps {
      width?: AutolayoutSize
      height?: AutolayoutSize
    }

    export interface CornerProps {
      cornerRadius?: CornerRadius
    }

    export interface BlendProps {
      blendMode?: BlendMode
      opacity?: number
      effect?: Effect | Effect[]
    }

    export interface TransformProps {
      rotation?: number
      // TODO: Add this back when we actually implement this
      // flipVertical?: boolean
    }

    export interface ConstraintProps {
      x?: number | HorizontalConstraint
      y?: number | VerticalConstraint
    }

    export interface LayoutProps {
      spacing?: number | 'auto'
      padding?: Padding
      direction?: 'horizontal' | 'vertical'
      horizontalAlignItems?: Omit<AlignItems, 'baseline'>
      verticalAlignItems?: AlignItems
    }

    export interface TextStyleProps {
      fontFamily?: string
      letterSpacing?: number | string
      textDecoration?: 'none' | 'strikethrough' | 'underline'
      fontSize?: number
      italic?: boolean
      textCase?: 'upper' | 'lower' | 'title' | 'original' | 'small-caps' | 'small-caps-forced'
      fontWeight?: FontWeight
      fontPostScriptName?: string
      href?: string
      fill?: HexCode | Color | Paint | (SolidPaint | GradientPaint)[]
    }

    ///
    /// COMPONENTS
    ///

    export interface FrameProps
      extends BaseProps,
        GeometryProps,
        Required<SizeProps>,
        TransformProps,
        CornerProps {
      overflow?: Overflow
    }

    export interface AutoLayoutProps
      extends Omit<FrameProps, 'width' | 'height'>,
        LayoutProps,
        AutoLayoutSizeProps {}

    export interface EllipseProps extends BaseProps, GeometryProps, TransformProps, SizeProps {
      arcData?: ArcData
    }

    export interface ImageProps extends Omit<RectangleProps, 'fill'> {
      src: string | ImagePaint
    }

    export interface LineProps extends BaseProps, TransformProps {
      stroke?: HexCode | Color | SolidPaint | SolidPaint[]
      strokeWidth?: number
      strokeDashPattern?: number[]
      strokeCap?: StrokeCap
      length: number | 'fill-parent'
      direction?: 'horizontal' | 'vertical'
    }

    export interface RectangleProps
      extends BaseProps,
        GeometryProps,
        Required<SizeProps>,
        TransformProps,
        CornerProps {}

    export interface SVGProps
      extends BaseProps,
        GeometryProps,
        SizeProps,
        TransformProps,
        PathProps {}

    export interface ParagraphProps {
      spacing: number
    }

    export interface SpanProps extends TextStyleProps {}

    export interface TextProps
      extends BaseProps,
        AutoLayoutSizeProps,
        TransformProps,
        Omit<GeometryProps, 'fill'>,
        TextStyleProps {
      paragraphIndent?: number
      paragraphSpacing?: number
      horizontalAlignText?: 'left' | 'right' | 'center' | 'justified'
      verticalAlignText?: 'top' | 'center' | 'bottom'
      lineHeight?: number | string | 'auto'
    }

    export type ComponentProps = AutoLayoutProps | FrameProps
  }
} // declare global

export {}
