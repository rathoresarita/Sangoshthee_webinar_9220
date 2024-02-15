import { IReduxState } from '../app/types';
import { getParticipantById,getModeratorById } from '../base/participants/functions';

/**
 * Selector for the participant currently displaying on the large video.
 *
 * @param {Object} state - The redux state.
 * @returns {Object}
 */
export function getLargeVideoParticipant(state: IReduxState) {
    const { participantId } = state['features/large-video'];

    return getParticipantById(state, participantId ?? '');
}

export function getLargeModeratorVideo(state: IReduxState) {

    
    // const  participantId = getDominantSpeakerOrLastModeratorId(state)
    const { participantId } = state['features/large-video'];
 
     console.log('participantId LAST MODERATOR',participantId )
 
     return getModeratorById(state, participantId ?? '');
 }