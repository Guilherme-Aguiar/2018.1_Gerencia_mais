import React from 'react';
import '../css/bootstrap.css';
import '../css/Modal.css';
import FormUpdate from '../components/FormUpdate';
import {
  Modal,
  Button
} from 'react-bootstrap';

export default class ModalComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: true,
      doctor: [],
      doctor_events_list: [],
      current_doctor_id: '',
      is_visible: false
    };
    this.changeSchedule = this.changeSchedule.bind(this);
    this.onSetVisible = this.onSetVisible.bind(this);
  }

  toggleStatus = () => {
    this.setState({
      status: !this.state.status
    });
  }

  parseISOLocal(s) {
    let b = s.split(/\D/);
    console.log(b);
    return new Date(b[0], b[1] - 1, b[2], b[3], b[4], b[5]);
  }

  async componentDidMount4() {
    try {
      const name = 'http://localhost:8000/doctor/api-doctor/list-doctor/category/?name=' + this.props.currentdoctor;
      console.log(name);
      const res = await fetch(name);
      console.log(res);
      const doctor = await res.json();
      console.log(doctor);
      this.setState({doctor});
    } catch (e) {
      console.log(e);
    }
  }

  async componentDidMount5() {
    var date = new Date(this.props.currentstart);
    var newStart = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    var resultStart = newStart.toISOString();
    date = new Date(this.props.currentend);
    var newEnd = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    var resultEnd = newEnd.toISOString();
    try {
      const name = 'http://localhost:8000/schedule/api-event/list-doctor/?doctor=' + this.state.current_doctor_id + '&start=' + resultStart + '&end=' + resultEnd;
      console.log(name);
      const res = await fetch(name);
      console.log(res);
      const doctor_events_list = await res.json();
      console.log(doctor_events_list);
      this.setState({doctor_events_list});
    } catch (e) {
      console.log(e);
    }
  }

  async changeSchedule(e) {
    console.log("entrou changeSchedule");
    await this.componentDidMount4();
    this.setState({current_doctor_id: this.state.doctor[0].id});
    await this.componentDidMount5();
    this.setState({is_visible: !this.state.is_visible});
  }

  onSetVisible(e){

    this.setState({is_visible: false});
  }

  render() {
    let form;
    if (this.state.is_visible) {
      form = (<FormUpdate eventid={this.state.doctor_events_list[0].id}></FormUpdate>);
    } else {
      form = (<div>
        <h5 className='beautiful_text'>Inicio</h5>
        <p className='beautiful_text'>{this.props.currentstart}</p>
        <h5 className='beautiful_text'>Fim</h5>
        <p className='beautiful_text'>{this.props.currentend}</p>
      </div>);
    }
    return (<Modal className="height-modal modal" {...this.props} bsSize="large" aria-labelledby="contained-modal-title-lg">
      <Modal.Header className="">
        <h2 className="modal-header-title">{this.props.currentdoctor}</h2>
      </Modal.Header>
      <Modal.Body className="modal-content">
        <div>
          <Button onClick={this.changeSchedule} bsStyle="primary">Alterar evento</Button>
          <br></br>
          <br></br>
          <br></br>
          {form}
          <a onClick={this.props.onHide}><Button onClick={this.onSetVisible} bsStyle="danger">Close</Button></a>
          <br></br>
        </div>
      </Modal.Body>
    </Modal>);
  }
}
