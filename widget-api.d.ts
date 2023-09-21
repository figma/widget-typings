/* widget-typings are auto-generated. Do not update them directly. See plugin-docs/ for instructions. */
interface WidgetAPI {
  register(component: FunctionalWidget<any>): void
  h(...args: any[]): FigmaDeclarativeNode
  /** @deprecated Use useWidgetNodeId instead. */
  useWidgetId(): string
  useWidgetNodeId(): string
  useSyncedState<T>(
    name: string,
    defaultValue: T | (() => T),
  ): [T, (newValue: T | ((currValue: T) => T)) => void]
  useSyncedMap<T>(name: string): SyncedMap<T>
  usePropertyMenu(
    items: WidgetPropertyMenuItem[],
    onChange: (event: WidgetPropertyEvent) => void | Promise<void>,
  ): void
  useEffect(effect: () => (() => void) | void): void
  useStickable(onStuckStatusChanged?: (e: WidgetStuckEvent) => void | Promise<void>): void
  useStickableHost(
    onAttachmentsChanged?: (e: WidgetAttachedStickablesChangedEvent) => void | Promise<void>,
  ): void
  waitForTask(task: Promise<any>): void
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
interface WidgetClickEvent {
  canvasX: number
  canvasY: number
  offsetX: number
  offsetY: number
}
interface WidgetStuckEvent {
  newHostId: string | null
  oldHostId: string | null
}
interface WidgetAttachedStickablesChangedEvent {
  stuckNodeIds: string[]
  unstuckNodeIds: string[]
}
interface SyncedMap<T> {
  /** @deprecated Use size instead. */
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
declare type AutoLayout = FunctionalWidget<AutoLayoutProps>
declare type Frame = FunctionalWidget<FrameProps>
declare type Rectangle = FunctionalWidget<RectangleProps>
declare type ImageComponent = FunctionalWidget<ImageProps>
declare type Ellipse = FunctionalWidget<EllipseProps>
declare type Line = FunctionalWidget<LineProps>
declare type TextComponent = FunctionalWidget<TextProps>
declare type Input = FunctionalWidget<InputProps>
declare type SVG = FunctionalWidget<SVGProps>
declare type Fragment = FunctionalWidget<FragmentProps>
declare type Span = (props: WidgetJSX.SpanProps) => FigmaVirtualNode<'span'>
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
declare type FunctionalWidget<T> = (props: T) => FigmaDeclarativeNode
declare type PropertyMenuItemType =
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
interface WidgetPropertyMenuActionItem extends PropertyMenuItem {
  itemType: 'action'
  tooltip: string
  propertyName: string
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
  tooltip: string
  propertyName: string
  options: WidgetPropertyMenuColorSelectorOption[]
  selectedOption: string
}
interface WidgetPropertyMenuDropdownOption {
  option: string
  label: string
}
interface WidgetPropertyMenuDropdownItem extends PropertyMenuItem {
  itemType: 'dropdown'
  tooltip: string
  propertyName: string
  options: WidgetPropertyMenuDropdownOption[]
  selectedOption: string
}
interface WidgetPropertyMenuToggleItem extends PropertyMenuItem {
  itemType: 'toggle'
  tooltip: string
  propertyName: string
  isToggled: boolean
  icon?: string
}
interface WidgetPropertyMenuLinkItem extends PropertyMenuItem {
  itemType: 'link'
  tooltip: string
  propertyName: string
  href: string
  icon?: string | null
}
declare type WidgetPropertyMenuItem =
  | WidgetPropertyMenuActionItem
  | WidgetPropertyMenuSeparatorItem
  | WidgetPropertyMenuColorItem
  | WidgetPropertyMenuDropdownItem
  | WidgetPropertyMenuToggleItem
  | WidgetPropertyMenuLinkItem
declare type WidgetPropertyMenu = WidgetPropertyMenuItem[]
interface WidgetPropertyEvent {
  propertyName: string
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
interface TextEditEvent {
  characters: string
}
interface PlaceholderProps extends WidgetJSX.BlendProps, Omit<WidgetJSX.TextStyleProps, 'href'> {}
interface InputProps extends Omit<TextProps, 'children' | 'width'> {
  onTextEditEnd: (event: TextEditEvent) => void
  value: string | null
  placeholder?: string
  placeholderProps?: PlaceholderProps
  inputFrameProps?: Omit<AutoLayoutProps, 'width'>
  width?: WidgetJSX.Size
  inputBehavior?: 'wrap' | 'truncate' | 'multiline'
}
interface FragmentProps extends HasChildrenProps {
  key?: BaseProps['key']
}
interface FrameProps extends BaseProps, WidgetJSX.WidgetJSXFrameProps, HasChildrenProps {}
interface AutoLayoutProps extends BaseProps, WidgetJSX.WidgetJSXAutoLayoutProps, HasChildrenProps {}
interface EllipseProps extends BaseProps, WidgetJSX.WidgetJSXEllipseProps {}
interface RectangleProps extends BaseProps, WidgetJSX.WidgetJSXRectangleProps {}
interface ImageProps extends BaseProps, WidgetJSX.WidgetJSXImageProps {}
interface LineProps extends BaseProps, WidgetJSX.WidgetJSXLineProps {
  length?: WidgetJSX.Size
  strokeCap?: WidgetJSX.StrokeCap
}
interface SVGProps extends BaseProps, Partial<WidgetJSX.WidgetJSXFrameProps> {
  src: string
}
interface BaseProps extends WidgetJSX.WidgetJSXBaseProps {
  onClick?: (event: WidgetClickEvent) => Promise<any> | void
  key?: string | number
  hoverStyle?: WidgetJSX.HoverStyle
  tooltip?: string
  positioning?: 'auto' | 'absolute'
}
interface HasChildrenProps {
  children?: FigmaDeclarativeNode | FigmaDeclarativeNode[]
}
declare type HexCode = string
declare namespace WidgetJSX {
  interface Vector {
    x: number
    y: number
  }
  interface Color {
    r: number
    g: number
    b: number
    a: number
  }
  type ArcData = {
    readonly startingAngle: number
    readonly endingAngle: number
    readonly innerRadius: number
  }
  type AlignItems = 'center' | 'start' | 'end' | 'baseline'
  type BlendMode =
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
  type PaintType =
    | 'image'
    | 'solid'
    | 'gradient-linear'
    | 'gradient-radial'
    | 'gradient-angular'
    | 'gradient-diamond'
  interface PaintProps {
    type: PaintType
    blendMode?: BlendMode
    visible?: boolean
    opacity?: number
  }
  interface SolidPaint extends PaintProps {
    type: 'solid'
    color: Color | HexCode
  }
  interface ColorStop {
    position: number
    color: Color
  }
  interface GradientPaint extends PaintProps {
    type: 'gradient-linear' | 'gradient-radial' | 'gradient-angular' | 'gradient-diamond'
    gradientHandlePositions: [Vector, Vector, Vector]
    gradientStops: ColorStop[]
  }
  type Transform = [[number, number, number], [number, number, number]]
  interface ImagePaint extends PaintProps {
    type: 'image'
    src: string
    imageSize?: {
      width: number
      height: number
    }
    scaleMode?: ScaleMode
    imageTransform?: Transform
    scalingFactor?: number
    rotation?: number
    imageRef?: string
  }
  type Paint = SolidPaint | GradientPaint | ImagePaint
  type ShadowEffect = DropShadowEffect | InnerShadowEffect
  interface DropShadowEffect {
    type: 'drop-shadow'
    color: HexCode | Color
    offset: Vector
    blur: number
    blendMode?: BlendMode
    spread?: number
    visible?: boolean
    showShadowBehindNode?: boolean
  }
  interface InnerShadowEffect {
    type: 'inner-shadow'
    color: HexCode | Color
    offset: Vector
    blur: number
    blendMode?: BlendMode
    spread?: number
    visible?: boolean
  }
  interface BlurEffect {
    type: 'layer-blur' | 'background-blur'
    blur: number
    visible?: boolean
  }
  type Effect = DropShadowEffect | InnerShadowEffect | BlurEffect
  type Size = number | 'fill-parent'
  type AutolayoutSize = Size | 'hug-contents'
  type StrokeAlign = 'inside' | 'outside' | 'center'
  type StrokeCap = 'none' | 'round' | 'square' | 'arrow-lines' | 'arrow-equilateral'
  type ScaleMode = 'fill' | 'fit' | 'tile' | 'crop'
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
  type CornerRadius =
    | number
    | {
        topLeft?: number
        topRight?: number
        bottomLeft?: number
        bottomRight?: number
      }
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
  type Padding = number | FullPadding | VerticalHorizontalPadding
  type FontWeightNumerical = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900
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
  type FontWeight = FontWeightNumerical | FontWeightString
  interface HoverStyle {
    fill?: HexCode | Color | Paint | (SolidPaint | GradientPaint)[]
    stroke?: HexCode | Color | SolidPaint | GradientPaint | (SolidPaint | GradientPaint)[]
    opacity?: number
  }
  interface WidgetJSXBaseProps extends BlendProps, ConstraintProps {
    name?: string
    hidden?: boolean
  }
  interface GeometryProps {
    fill?: HexCode | Color | Paint | (SolidPaint | GradientPaint)[]
    stroke?: HexCode | Color | SolidPaint | GradientPaint | (SolidPaint | GradientPaint)[]
    strokeWidth?: number
    strokeAlign?: StrokeAlign
    strokeDashPattern?: number[]
  }
  interface PathProps {
    fillPath?: Path[]
    strokePath?: Path[]
  }
  interface SizePropsRequired extends SizeConstraintProps {
    width: Size
    height: Size
  }
  interface SizeProps extends SizeConstraintProps {
    width?: Size
    height?: Size
  }
  interface SizeConstraintProps {
    minWidth?: number
    maxWidth?: number
    minHeight?: number
    maxHeight?: number
  }
  interface AutoLayoutSizeProps {
    width?: AutolayoutSize
    height?: AutolayoutSize
  }
  interface CornerProps {
    cornerRadius?: CornerRadius
  }
  interface BlendProps {
    blendMode?: BlendMode
    opacity?: number
    effect?: Effect | Effect[]
  }
  interface TransformProps {
    rotation?: number
  }
  interface ConstraintProps {
    x?: number | HorizontalConstraint
    y?: number | VerticalConstraint
  }
  interface LayoutGap {
    horizontal?: number | 'auto'
    vertical?: number | 'auto'
  }
  interface LayoutProps {
    spacing?: number | 'auto' | LayoutGap
    padding?: Padding
    direction?: 'horizontal' | 'vertical'
    horizontalAlignItems?: Omit<AlignItems, 'baseline'>
    verticalAlignItems?: AlignItems
    wrap?: boolean
  }
  interface TextStyleProps extends NoHrefTextStyleProps {
    href?: string
  }
  interface NoHrefTextStyleProps {
    fontFamily?: string
    letterSpacing?: number | string
    textDecoration?: 'none' | 'strikethrough' | 'underline'
    fontSize?: number
    italic?: boolean
    textCase?: 'upper' | 'lower' | 'title' | 'original' | 'small-caps' | 'small-caps-forced'
    fontWeight?: FontWeight
    fontPostScriptName?: string
    fill?: HexCode | Color | Paint | (SolidPaint | GradientPaint)[]
  }
  interface WidgetJSXFrameProps
    extends BaseProps,
      GeometryProps,
      SizePropsRequired,
      TransformProps,
      CornerProps {
    overflow?: Overflow
  }
  interface WidgetJSXAutoLayoutProps
    extends Omit<FrameProps, 'width' | 'height'>,
      LayoutProps,
      AutoLayoutSizeProps {}
  interface WidgetJSXEllipseProps extends BaseProps, GeometryProps, TransformProps, SizeProps {
    arcData?: ArcData
  }
  interface WidgetJSXImageProps extends Omit<RectangleProps, 'fill'> {
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
    paragraphIndent?: number
    paragraphSpacing?: number
    horizontalAlignText?: 'left' | 'right' | 'center' | 'justified'
    verticalAlignText?: 'top' | 'center' | 'bottom'
    lineHeight?: number | string | 'auto'
    truncate?: boolean | number
  }
  type ComponentProps = AutoLayoutProps | FrameProps
}
