import React from 'react';
import Dialog, { DialogTitle, DialogContent, DialogContentText } from 'material-ui/Dialog';
import StatsInfo from './StatsInfo'

class ModDialog extends React.Component {


  render() {
    const { onClose, entry, open } = this.props;
    return (
      <Dialog onClose={onClose} open={open} >
        <DialogTitle id="mod-dialog-title"> {entry === null ? "title" : entry['title']} </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <StatsInfo entry={entry} />
          </DialogContentText>
        </DialogContent>
      </Dialog>);

  }
}

export default ModDialog;