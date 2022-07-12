/**
 * Copyright (c) 2017-present, Raphael Amorim.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

function isLGWebOS(): boolean {
  return !!(window && window.PalmSystem);
}

function isSamsungTizen(): boolean {
  return false;
}

function isSamsungOrsay(): boolean {
  return false;
}

function Plaform(checkPlatform: string): boolean {
  switch (checkPlatform) {
    case 'webos':
      return isLGWebOS();
    case 'tizen':
      return isSamsungTizen();
    case 'orsay':
      return isSamsungOrsay();
    default:
      return false;
  }
}

export default Plaform;
