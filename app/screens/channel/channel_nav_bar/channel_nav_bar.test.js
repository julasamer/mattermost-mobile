// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';
import {shallow} from 'enzyme';

import Preferences from 'mattermost-redux/constants/preferences';

import {DeviceTypes} from 'app/constants';

import ChannelNavBar from './channel_nav_bar';

jest.mock('react-intl');

describe('ChannelNavBar', () => {
    const formatMessage = jest.fn();
    const baseProps = {
        isLandscape: false,
        openMainSidebar: jest.fn(),
        openSettingsSidebar: jest.fn(),
        onPress: jest.fn(),
        theme: Preferences.THEMES.default,
    };

    test('should match, full snapshot', () => {
        const wrapper = shallow(
            <ChannelNavBar {...baseProps}/>,
            {context: {intl: {formatMessage}}},
        );

        expect(wrapper.getElement()).toMatchSnapshot();
    });

    test('should not set the permanentSidebar state if not Tablet', () => {
        const wrapper = shallow(
            <ChannelNavBar {...baseProps}/>,
            {context: {intl: {formatMessage}}},
        );

        wrapper.instance().handlePermanentSidebar();
        expect(wrapper.state('permanentSidebar')).toBeUndefined();
    });

    test('should set the permanentSidebar state if Tablet', async () => {
        const wrapper = shallow(
            <ChannelNavBar {...baseProps}/>,
            {context: {intl: {formatMessage}}},
        );

        DeviceTypes.IS_TABLET = true;

        await wrapper.instance().handlePermanentSidebar();

        expect(wrapper.state('permanentSidebar')).toBeDefined();
    });
});
