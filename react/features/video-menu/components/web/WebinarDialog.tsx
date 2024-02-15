import React from 'react';

import { translate } from '../../../base/i18n/functions';
import { connect } from 'react-redux';
import Dialog from '../../../base/ui/components/web/Dialog';
//import Switch from '../../../base/ui/components/web/Switch';
import  AbstractWebinarDialog, { type Props, abstractMapStateToProps }
    from '../AbstractWebinarDialog';

/**
 * A React Component with the contents for a dialog that asks for confirmation
 * from the user before muting all remote participants.
 *
 * @augments 
 */
class WebinarDialog extends AbstractWebinarDialog<Props> {
    

    /**
     * Implements React's {@link Component#render()}.
     *
     * @inheritdoc
     * @returns {ReactElement}
     */
    render() {
        return (
            <Dialog
                ok = {{ translationKey: 'dialog.webinarEnabled' }}
                onSubmit = { this._onSubmit }
                title = { this.props.title }>
                        <div className = 'webinar-dialog'>
                    { this.state.content }
                    
                       
                    
                </div>
                
            </Dialog>
        );
    }
}

export default translate(connect(abstractMapStateToProps)(WebinarDialog));
