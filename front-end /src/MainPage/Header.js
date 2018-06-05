import React, { Component } from 'react'
import React, { Component } from 'react'
import { Popup, Button, Header, Image, Modal } from 'semantic-ui-react'

class AccountModals extends Component{
    state = {open: false}

    closeConfigShow = (closeOnEscape, closeOnRootNodeClick) => () => {
    this.setState({ closeOnEscape, closeOnRootNodeClick, open: true })
  }
    close = () => this.setState({ open: false })

  render() {
    const { open, closeOnEscape, closeOnRootNodeClick } = this.state

    return (
      <div>
         <Popup trigger={<Button onClick={this.show(false)}>None</Button>}>
         <Popup.Header>Heads up!</Popup.Header>
         <Popup.Content>
           By default, a Modal closes when escape is pressed or when the dimmer is
           clicked. Setting the dimmer to "None" (dimmer={'{'}false{'}'}) means that there is no
           dimmer to click so clicking outside won't close the Modal. To close on
           outside click when there's no dimmer, you can pass the "closeOnDocumentClick" prop.
         </Popup.Content>
       </Popup>

        <Modal
          open={open}
          closeOnEscape={closeOnEscape}
          closeOnRootNodeClick={closeOnRootNodeClick}
          onClose={this.close}
        >
          <Modal.Header>
            Delete Your Account
          </Modal.Header>
          <Modal.Content>
            <p>Are you sure you want to delete your account</p>
          </Modal.Content>
          <Modal.Actions>
            <Button negative>No</Button>
            <Button positive labelPosition='right' icon='checkmark' content='Yes' />
          </Modal.Actions>
        </Modal>
      </div>
    )
  }
}
}