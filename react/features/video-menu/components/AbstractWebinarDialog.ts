import { WithTranslation } from 'react-i18next';

import { IReduxState } from '../../app/types';
import { enableWebinar} from '../../participants-pane/actions.web';
import {requestEnableAudioandVideoModerationforWebinar} from '../../av-moderation/actions'
// import {
   
   
//   //  requestEnableAudioandVideoModerationforWebinar
// } from '../../av-moderation/actions';

import { setTileView } from '../../video-layout/actions.any';

import AbstractWebinarConfirmation, {
    type Props as AbstractProps
} from './AbstractWebinarConfirmation';

/**
 * The type of the React {@code Component} props of
 * {@link AbstractMuteEveryoneDialog}.
 */
export type Props = AbstractProps & WithTranslation & {
    content: string;
    isAudioModerationEnabled: boolean;
    title: string;
};

interface IState {
    audioModerationEnabled: boolean;
    content: string;
}

/**
 *
 * An abstract Component with the contents for a dialog that asks for confirmation
 * from the user before muting all remote participants.
 *
 * @augments AbstractMuteRemoteParticipantDialog
 */
export default class AbstractWebinarDialog<P extends Props> extends
    AbstractWebinarConfirmation<P, IState> {
    
    /**
     * Initializes a new {@code AbstractMuteRemoteParticipantDialog} instance.
     *
     * @param {Object} props - The read-only properties with which the new
     * instance is to be initialized.
     */
    constructor(props: P) {
        super(props);

        this.state = {
            audioModerationEnabled: props.isAudioModerationEnabled,
            content:  'All participants videos and audio are blocked by the host, but Panelist Members can enable their own video and microphone',
            
        };


        // Bind event handlers so they are only bound once per instance.
        this._onSubmit = this._onSubmit.bind(this);
        
    }

   
    /**
      * Toggles advanced moderation switch.
      *
      * @returns {void}
      */
   

    /**
     * Callback to be invoked when the value of this dialog is submitted.
     *
     * @returns {boolean}
     */
    _onSubmit() {
        const {
            dispatch,
          
           
             
          
        } = this.props;
        console.log('submitt')
       dispatch(enableWebinar());

        
        // dispatch(enableNotifications())

       dispatch(setTileView(false))
        
        
       //dispatch(requestDisableAudioandVideoModerationforWebinar())
       dispatch(requestEnableAudioandVideoModerationforWebinar())
      // dispatch(muteAllParticipants(exclude, MEDIA_TYPE.AUDIO));
        // if (this.state.audioModerationEnabled) {
        //     dispatch(requestEnableAudioModeration());
        // } else if (this.state.audioModerationEnabled !== undefined) {
        //     dispatch(requestDisableAudioModeration());
        // }
        

        return true;
    }
}

/**
 * Maps (parts of) the Redux state to the associated {@code AbstractMuteEveryoneDialog}'s props.
 *
 * @param {IReduxState} state - The redux state.
 * @param {Object} ownProps - The properties explicitly passed to the component.
 * @returns {Props}
 */
export function abstractMapStateToProps(state: IReduxState, ownProps: Props) {
    const { t,content } = ownProps;

    const webinarEnabled = state['features/base/conference'].webinarEnabled;
    console.log('webiinar',webinarEnabled)
 
    

   return {
    content,
 webinarEnabled,
    title: t('dialog.WebinarTitle')
   }

   
}