/**
 * Copyright (c) 2018-present, Raphael Amorim.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

// Defaults for Render
export const ViewDefaults = {
  size: 200, // 200x200
  lineHeight: 24,
};

// ReactApe Internal Constants
export const _SectionBlockSize: number = 80; // 80x80

// DevTools configuration
export const DevToolsConfig = {
  bundleType: process.env.NODE_ENV === 'production' ? 0 : 1,
  version: '0.1.0',
  rendererPackageName: 'ReactApe',
}