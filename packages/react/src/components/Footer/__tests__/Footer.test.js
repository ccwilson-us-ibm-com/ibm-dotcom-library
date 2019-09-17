/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import { TranslationAPI } from '@carbon/ibmdotcom-services';
import Footer from '../Footer';

import FOOTER_MENU_MOCK_DATA from './data/footer-menu';
import LEGAL_NAV_MOCK_DATA from './data/footer-legal';

const MOCK_DATA = {
  footerMenu: FOOTER_MENU_MOCK_DATA,
  footerThin: LEGAL_NAV_MOCK_DATA,
};

jest.mock('@carbon/ibmdotcom-services', () => ({
  TranslationAPI: {
    getTranslation: jest.fn(() => Promise.resolve(MOCK_DATA)),
  },
}));

describe('<Footer />', () => {
  let container;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
    container = null;
  });

  // it('renders only the logo if data fails to load', async () => {
  //
  //   await act(async () => {
  //     await ReactDOM.render(<Footer />, container);
  //   });
  //
  //   const footer = container.querySelector('.bx--footer');
  //
  //   expect(TranslationAPI.getTranslation).toHaveBeenCalledTimes(1);
  //   expect(footer.querySelectorAll('.bx--footer-nav-group')).toHaveLength(MOCK_DATA.footerMenu.length);
  //   expect(footer.querySelectorAll('.bx--footer-nav-group')).toHaveLength(MOCK_DATA.footerMenu.length);
  //   expect(footer.querySelectorAll('.bx--legal-nav__list-item')).toHaveLength(MOCK_DATA.footerThin.length);
  // });

  it('renders with everything as expected', async () => {
    await act(async () => {
      await ReactDOM.render(<Footer />, container);
    });

    const footer = container.querySelector('.bx--footer');

    expect(TranslationAPI.getTranslation).toHaveBeenCalledTimes(1);
    // expect(footer).toHaveLength(1);
    expect(footer.querySelectorAll('.bx--footer-logo')).toHaveLength(1);
    expect(footer.querySelectorAll('.bx--footer-nav-group')).toHaveLength(
      MOCK_DATA.footerMenu.length
    );
    expect(footer.querySelectorAll('.bx--footer-nav-group')).toHaveLength(
      MOCK_DATA.footerMenu.length
    );
    expect(footer.querySelectorAll('.bx--legal-nav__list-item')).toHaveLength(
      MOCK_DATA.footerThin.length
    );
  });
});
