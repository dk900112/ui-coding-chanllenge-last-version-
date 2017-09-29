import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import editName from '../actions/edit_name';
import editAddress from '../actions/edit_address';
import editFavTeams from '../actions/edit_favteams';

import EditNameModal from './EditNameModal';
import EditAddressModal from './EditAddressModal';
import EditFavTeamsModal from './EditFavTeamsModal';

import { NONE_MODAL, EDIT_NAME_MODAL, EDIT_ADDRESS_MODAL, EDIT_FAVTEAMS_MODAL } from './ModalTypes';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openModal: NONE_MODAL,
      name: props.name,
      oldName: props.name,
      address: props.address,
      oldAddress: props.address,
      favTeams: props.favTeams,
    }
    this.editNameBtnCap = 'Add Name';
    this.editAddressBtnCap = 'Add Address';
    this.editFavTeamsBtnCap = 'Add Teams';

    this.oldFavTeams = props.favTeams;

    this.renderName = this.renderName.bind(this);
    this.handleEditName = this.handleEditName.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSaveEditName = this.handleSaveEditName.bind(this);
    this.handleCloseEditName = this.handleCloseEditName.bind(this);

    this.renderAddress = this.renderAddress.bind(this);
    this.handleEditAddress = this.handleEditAddress.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handleSaveEditAddress = this.handleSaveEditAddress.bind(this);
    this.handleCloseEditAddress = this.handleCloseEditAddress.bind(this);

    this.renderFavTeams = this.renderFavTeams.bind(this);
    this.handleEditFavTeams = this.handleEditFavTeams.bind(this);
    this.handleAddFavTeam = this.handleAddFavTeam.bind(this);

    this.handleFavTeamsChange = this.handleFavTeamsChange.bind(this);
    this.handleSaveEditFavTeams = this.handleSaveEditFavTeams.bind(this);
    this.handleCloseEditFavTeams = this.handleCloseEditFavTeams.bind(this);
  }

  renderName() {
    return (
      <div className="card">
      <div className="card-header">Name</div>
      <br/>
      <div className="flex-box">
      <h2>{this.state.name}</h2>

      <button className="btn"
      onClick={this.handleEditName}>
      {this.editNameBtnCap}
      </button>
      </div>
      </div>
      );
  }
  renderAddress() {
    return (
      <div className="card">
      <div className="card-header">Address</div>
      <br/>
      <div className="flex-box">
      <p className="address">
      <h2>{this.state.address}</h2>
      </p>
      <button className="btn"
      onClick={this.handleEditAddress}>
      {this.editAddressBtnCap}
      </button>
      </div>
      </div>
      );
    }

    renderFavTeams() {
      return (
      <div className="card">
      <div className="card-header">Favourite Teams</div>
      <br/>
      <div className="flex-box">
      <h2>
      <p className="address">
      {this.state.favTeams.join('\n')}
      </p></h2>
      <button className="btn"
      onClick={this.handleEditFavTeams}>
      {this.editFavTeamsBtnCap}
      </button>
      </div>
      </div>
      );
    }

    handleEditName(e) {
      this.setState({
        openModal: EDIT_NAME_MODAL,
        oldName: this.state.name,
      })    
    }

    handleCloseEditName(e) {
      this.setState({
        openModal: NONE_MODAL,
        name: this.state.oldName,
      });
      this.props.editName(this.state.oldName);
    }

    handleSaveEditName(e) {
      this.setState({
        openModal: NONE_MODAL,
      });
      if (this.state.name !=="") {
        this.editNameBtnCap = "Edit Name";
      } else {
        this.editNameBtnCap = "Add Name";

      }
    }

    handleNameChange(e) {
      this.setState({
        name: e.target.value,
      });
      this.props.editName(e.target.value);
    }


    handleEditAddress(e) {
      this.setState({
        openModal: EDIT_ADDRESS_MODAL,
        oldAddress: this.state.address,
      })    
    }
    handleAddressChange(e) {
     this.setState({
      address: e.target.value,
    });
    this.props.editAddress(e.target.value);
  }
  handleSaveEditAddress(e) {
    this.setState({
      openModal: NONE_MODAL,
    });
    if (this.state.address !== "") {
      this.editAddressBtnCap = "Edit Address";
    } else {
      this.editAddressBtnCap = "Add Address";

    }
  }
  handleCloseEditAddress(e) {
    this.setState({
      openModal: NONE_MODAL,
      address: this.state.oldAddress,
    });
    this.props.editAddress(this.state.oldAddress);
  }
  handleEditFavTeams(e) {
    this.setState({
      openModal: EDIT_FAVTEAMS_MODAL,

    });    
    this.oldFavTeams = this.state.favTeams.slice();
  }
  handleFavTeamsChange(idx, e) {
   var favTeams = this.state.favTeams;

   favTeams[idx] = e.target.value;

   this.setState({favTeams: favTeams});

   this.props.editFavTeams(favTeams);
 }
 handleSaveEditFavTeams(e) {
  this.setState({
    openModal: NONE_MODAL,
  });
  if (this.state.favTeams.length > 0) {
    this.editAddressBtnCap = "Edit Teams";
  }
}
handleAddFavTeam(e) {
  var favTeams = this.state.favTeams.slice();
  favTeams.push("");
  this.setState({favTeams: favTeams});
  this.props.editFavTeams(this.state.favTeams);

}
handleCloseEditFavTeams(e) {
  this.setState({
    openModal: NONE_MODAL,
    favTeams: this.oldFavTeams,
  });
  this.props.editFavTeams(this.oldFavTeams);
}

render() {
  return (
  <div>

  <div className="page-header">
  Sports Magazine
  </div>

  {this.renderName()}
  {this.renderAddress()}
  {this.renderFavTeams()}


  <EditNameModal
  open={this.state.openModal}
  name={this.state.name}
  onNameChange={this.handleNameChange}
  saveName={this.handleSaveEditName}
  close={this.handleCloseEditName}/>

  <EditAddressModal
  open={this.state.openModal}
  address={this.state.address}
  onAddressChange={this.handleAddressChange}
  saveAddress={this.handleSaveEditAddress}
  close={this.handleCloseEditAddress}/>


  <EditFavTeamsModal
  open={this.state.openModal}
  favTeams={this.state.favTeams}
  onFavTeamsChange={this.handleFavTeamsChange}
  saveFavTeams={this.handleSaveEditFavTeams}
  addFavTeam={this.handleAddFavTeam}
  close={this.handleCloseEditFavTeams}/>

  </div>
  );
}
}

//connects root reducer to props
function mapStateToProps(state) {
  return {
    name: '',
    address: '',
    favTeams: [''],
  }
}

//connects redux actions to props
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    editName: editName,
    editAddress: editAddress,
    editFavTeams: editFavTeams,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
