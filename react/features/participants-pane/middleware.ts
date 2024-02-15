import { AnyAction } from 'redux';

import MiddlewareRegistry from '../base/redux/MiddlewareRegistry';

import { PARTICIPANTS_PANE_CLOSE, PARTICIPANTS_PANE_OPEN,ENABLE_WEBINAR } from './actionTypes';
import { CONFERENCE_JOIN_IN_PROGRESS,  } from '../base/conference/actionTypes';
import { IStore } from '../app/types';
import { setStartWebinar } from '../base/conference/actions';
import { close as closeParticipantPane   } from './actions.any';
import { hideNotification, showNotification } from '../notifications/actions';
import { NOTIFICATION_TIMEOUT_TYPE } from '../notifications/constants';




import { batch } from 'react-redux';
import { setTileView } from '../video-layout/actions.any';


import {
    WEBINAR_COMMAND,
    IWebinarCommandAttributes,
    
        NOTIFY_ALL_COMMAND,
        INotifyAllCommandAttributes,
        TILE_VIEW_COMMAND,
        ITileViewCommandAttributes,
        IParticipantPaneCloseCommandAttributes,
        PARTICIPANTS_PANE_CLOSE_COMMAND
   
    
} from './constants'

/**
 * Middleware which intercepts participants pane actions.
 *
 * @param {IStore} store - The redux store.
 * @returns {Function}
 */
MiddlewareRegistry.register((store: IStore) => (next: Function) => (action: any) => {
    const { dispatch, getState } = store;
    const notificationAttributes = {
        titleKey: 'Webinar Enabled',
      //  descriptionKey: 'Moderator can  turn on their cameras and unmute their mic',
        concatText: true,
        maxLines: 2
    };
    switch (action.type) {
    case PARTICIPANTS_PANE_OPEN:
        if (typeof APP !== 'undefined') {
            APP.API.notifyParticipantsPaneToggled(true);
        }
        break;
    case PARTICIPANTS_PANE_CLOSE:
        if (typeof APP !== 'undefined') {
            APP.API.notifyParticipantsPaneToggled(false);
        }
        break;
    
    case CONFERENCE_JOIN_IN_PROGRESS: {
        const { conference } = action;

        conference.addCommandListener(
            WEBINAR_COMMAND, ({ attributes }: { attributes: IWebinarCommandAttributes; }, id: any) => {
                _onWebinarCommand(attributes, id, store);
            })
            conference.addCommandListener(
                NOTIFY_ALL_COMMAND,
                ({ attributes }: { attributes: INotifyAllCommandAttributes }, id: any) => {
                    // Assuming _onNotifyAllCommand handles the notification
                    _onNotifyAllCommand(attributes, store);
                }
            );
            
            
            
            conference.addCommandListener(
               TILE_VIEW_COMMAND,
                ({ attributes }: { attributes:ITileViewCommandAttributes }, id: any) => {
                    // Assuming _onNotifyAllCommand handles the notification
                    _onTileViewCommand(attributes, store);
                }
            );

            conference.addCommandListener(
                PARTICIPANTS_PANE_CLOSE_COMMAND,
                ({ attributes }: { attributes:IParticipantPaneCloseCommandAttributes }, id: any) => {
                    // Assuming _onNotifyAllCommand handles the notification
                    dispatch(closeParticipantPane())
                }
            );
            
        break;
        
    }

    case ENABLE_WEBINAR: const state = getState();
    const { conference } = state['features/base/conference'];
    const { enabled } = action;
    //if(conference && isLocalParticipantModerator(state) ){

    if(conference ){

        conference.sendCommand(WEBINAR_COMMAND, { attributes: { webinarEnabled: Boolean(enabled) } });

                    }
  
    
    if(conference ){
        conference.sendCommandOnce(NOTIFY_ALL_COMMAND, { attributes: notificationAttributes });

    }



    if(conference ){
        conference.sendCommandOnce(TILE_VIEW_COMMAND, { attributes:{tileViewEnabled:  Boolean(enabled) }});

    }

    if(conference ){
        conference.sendCommandOnce(PARTICIPANTS_PANE_CLOSE_COMMAND, { attributes:{participantPaneClose:  Boolean(false) }});

    }

   
   

}
    

    return next(action);
});

function _onWebinarCommand(attributes: IWebinarCommandAttributes = {}, id: string, store: IStore) {
    const state = store.getState();

    // // We require to know who issued the command because (1) only a
    // // moderator is allowed to send commands and (2) a command MUST be
    // // issued by a defined commander.
    // if (typeof id === 'undefined') {
    //     return;
    // }

    // const participantSendingCommand = getParticipantById(state, id);

    // // The Command(s) API will send us our own commands and we don't want
    // // to act upon them.
    // if (participantSendingCommand?.local) {
    //     return;
    // }

            store.dispatch(setStartWebinar(true));
            
    
    }

function _onNotifyAllCommand(attributes: INotifyAllCommandAttributes = {},store:IStore) {
    // Extract notification attributes from the command
   console.log('notifyAllCommand')

    // You may need to loop through all participants and dispatch notifications
   
    
        // Use the new object with type INotificationProps
       
        store.dispatch(showNotification(attributes, NOTIFICATION_TIMEOUT_TYPE.MEDIUM));
        
}

function _onTileViewCommand(attributes: ITileViewCommandAttributes = {},store:IStore) {
    // Extract notification attributes from the command
   console.log('notifyAllCommand')

    // You may need to loop through all participants and dispatch notifications
   
    
        // Use the new object with type INotificationProps
       
        store.dispatch(setTileView(false));
        
}

