import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch,useSelector } from 'react-redux';
import { IReduxState } from '../../../app/types';

import { getRemoteModeratorsCount } from '../../../base/participants/functions';
import { createToolbarEvent } from '../../../analytics/AnalyticsEvents';
import { sendAnalytics } from '../../../analytics/functions';
import { leaveConference } from '../../../base/conference/actions';
import { BUTTON_TYPES } from '../../../base/ui/constants.web';

import { HangupContextMenuItem } from './HangupContextMenuItem';

/**
 * The type of the React {@code Component} props of {@link LeaveConferenceButton}.
 */
interface IProps {

    /**
     * Key to use for toolbarButtonClicked event.
     */
    buttonKey: string;

    /**
     * Notify mode for `toolbarButtonClicked` event -
     * whether to only notify or to also prevent button click routine.
     */
    notifyMode?: string;
}


/**
 * Button to leave the conference.
 *
 * @param {Object} props - Component's props.
 * @returns {JSX.Element} - The leave conference button.
 */
export const LeaveConferenceButton = (props: IProps) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const getModeratorCount=useSelector(getRemoteModeratorsCount)
  
    const webinarEnabled = useSelector((state: IReduxState) => state['features/base/conference'].webinarEnabled)

    const onLeaveConference = useCallback(() => {
        sendAnalytics(createToolbarEvent('hangup'));
        dispatch(leaveConference());
    }, [ dispatch ]);

    // return (
    //     <HangupContextMenuItem
    //         accessibilityLabel = { t('toolbar.accessibilityLabel.leaveConference') }
    //         buttonKey = { props.buttonKey }
    //         buttonType = { BUTTON_TYPES.SECONDARY }
    //         label = { t('toolbar.leaveConference') }
    //         notifyMode = { props.notifyMode }
    //         onClick = { onLeaveConference } />
    // );


    if(!webinarEnabled ){
        return (
            
            <HangupContextMenuItem
                accessibilityLabel = { t('toolbar.accessibilityLabel.leaveConference') }
                buttonKey = { props.buttonKey }
                buttonType = { BUTTON_TYPES.SECONDARY }
                label = { t('toolbar.leaveConference') }
                notifyMode = { props.notifyMode }
                onClick = { onLeaveConference } />
        );
        }
        if(webinarEnabled && getModeratorCount>0){
            return (
                
                <HangupContextMenuItem
                    accessibilityLabel = { t('toolbar.accessibilityLabel.leaveConference') }
                    buttonKey = { props.buttonKey }
                    buttonType = { BUTTON_TYPES.SECONDARY }
                    label = { t('toolbar.leaveConference') }
                    notifyMode = { props.notifyMode }
                    onClick = { onLeaveConference } />
            );
            }else{
                return null
            }


};



