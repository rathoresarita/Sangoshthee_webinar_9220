import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch ,useSelector} from 'react-redux';
import { IReduxState } from '../../../app/types';
import { isLocalParticipantModerator } from '../../../base/participants/functions';

import Icon from '../../../base/icons/components/Icon';
import { IconCloseLarge } from '../../../base/icons/svg';
import { toggleChat } from '../../actions.web';

interface IProps {

    /**
     * An optional class name.
     */
    className: string;

    /**
     * Whether the polls feature is enabled or not.
     */
    isPollsEnabled: boolean;

   
    /**
     * Function to be called when pressing the close button.
     */
    onCancel: Function;
}

/**
 * Custom header of the {@code ChatDialog}.
 *
 * @returns {React$Element<any>}
 */
function ChatHeader({ className, isPollsEnabled}: IProps) {

    const isModerator = useSelector(isLocalParticipantModerator);
  
    const webinarEnabled = useSelector((state: IReduxState) => state['features/base/conference'].webinarEnabled)
    // _isModerator=isModerator

    // _webinarEnabled = Boolean(webinarEnabled)


    const dispatch = useDispatch();
    const { t } = useTranslation();

    const onCancel = useCallback(() => {
        dispatch(toggleChat());
    }, []);

    const onKeyPressHandler = useCallback(e => {
        if (onCancel && (e.key === ' ' || e.key === 'Enter')) {
            e.preventDefault();
            onCancel();
        }
    }, []);

    return (
        <div
            className = { className || 'chat-dialog-header' }>
            <span
                aria-level = { 1 }
                role = 'heading'>
                { t(  !isModerator && webinarEnabled?'chat.title': (isPollsEnabled? 'chat.titleWithPolls' : 'chat.title')) }
            </span>
            <Icon
                ariaLabel = { t('toolbar.closeChat') }
                onClick = { onCancel }
                onKeyPress = { onKeyPressHandler }
                role = 'button'
                src = { IconCloseLarge }
                tabIndex = { 0 } />
        </div>
    );
}

export default ChatHeader;
