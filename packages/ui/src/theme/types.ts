import {} from 'styled-components/cssprop';

export type ColorMode = 'light' | 'dark';

export type ColorNameWithNoHue = 'transparent' | 'current' | 'black' | 'white';

export type ColorNameWithHue =
  | 'whiteAlpha'
  | 'blackAlpha'
  | 'gray'
  | 'red'
  | 'orange'
  | 'yellow'
  | 'green'
  | 'teal'
  | 'blue'
  | 'cyan'
  | 'purple'
  | 'pink';

export type ColorHue = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

export type ColorName = ColorNameWithHue | ColorNameWithNoHue;

export type ColorKey = ColorNameWithNoHue | `${ColorNameWithHue}.${ColorHue}`;

export type FontWeightKey =
  | 'light'
  | 'normal'
  | 'hairline'
  | 'thin'
  | 'medium'
  | 'semiBold'
  | 'bold'
  | 'extraBold'
  | 'black';

export type FontSizeKey =
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl'
  | '5xl'
  | '6xl'
  | '7xl'
  | '8xl'
  | '9xl';

export type SpaceKey =
  | 0
  | 1
  | 10
  | 1.5
  | 0.5
  | 2
  | 2.5
  | 3
  | 3.5
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 12
  | 14
  | 16
  | 20
  | 24
  | 28
  | 32
  | 36
  | 40
  | 44
  | 48
  | 52
  | 56
  | 60
  | 64
  | 72
  | 80
  | 96;

export type RadiusKey =
  | 'none'
  | 'sm'
  | 'base'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | 'full';

export type SizeKeyFirstLevel =
  | 'max'
  | 'min'
  | 'full'
  | '3xs'
  | '2xs'
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl'
  | '5xl'
  | '6xl'
  | '7xl'
  | '8xl'
  | SpaceKey;

export type ContainerSizeKey = 'sm' | 'md' | 'lg' | 'xl';

export type SizeKey = SizeKeyFirstLevel | `container.${ContainerSizeKey}`;

export type ShadowKey =
  | 'none'
  | 'xs'
  | 'sm'
  | 'base'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | 'outline'
  | 'inner'
  | 'dark-lg';

export type BreakpointKey = 'sm' | 'md' | 'lg' | 'xl';

export type BorderKey = 'none' | 1 | 2 | 4 | 8;

export type ZIndexKey =
  | 'auto'
  | 'hide'
  | 'base'
  | 'docked'
  | 'dropdown'
  | 'sticky'
  | 'banner'
  | 'overlay'
  | 'modal'
  | 'popover'
  | 'skipLink'
  | 'toast'
  | 'tooltip';

export type LineHeightKey =
  | 'normal'
  | 'none'
  | 'shorter'
  | 'short'
  | 'base'
  | 'tall'
  | 'taller'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10';

export type LetterSpacingKey =
  | 'normal'
  | 'tighter'
  | 'tight'
  | 'wide'
  | 'wider'
  | 'widest';

export type FontKey = 'body' | 'mono';

export type TransitionPropertyKey =
  | 'common'
  | 'colors'
  | 'dimensions'
  | 'position'
  | 'background';

export type TransitionTimingFnKey = 'easeIn' | 'easeOut' | 'easeInOut';

export type TransitionDurationKey =
  | 'ultraFast'
  | 'faster'
  | 'fast'
  | 'normal'
  | 'slow'
  | 'slower'
  | 'ultraSlow';

export type ThemeFoundationType = {
  breakpoints: Record<BreakpointKey, string>;
  borders: Record<BorderKey, string>;
  fontWeights: Record<FontWeightKey, number>;
  fontSizes: Record<FontSizeKey, string>;
  fonts: Record<FontKey, string>;
  letterSpacings: Record<LetterSpacingKey, string>;
  lineHeights: Record<LineHeightKey, string | number>;
  shadows: Record<ShadowKey, string>;
  space: Record<SpaceKey, string>;
  sizes: {
    [key in SizeKeyFirstLevel]: string;
  } & {
    container: Record<ContainerSizeKey, string>;
  };
  zIndices: Record<ZIndexKey, string | number>;
  radius: Record<RadiusKey, string>;
  colors: {
    [key in ColorNameWithNoHue]: string;
  } & {
    [key in ColorNameWithHue]: Record<ColorHue, string>;
  };
  transitions: {
    property: Record<TransitionPropertyKey, string>;
    timingFn: Record<TransitionTimingFnKey, string>;
    duration: Record<TransitionDurationKey, string>;
  };
};

export type ThemeType = {
  mode: ColorMode;
} & ThemeFoundationType;
