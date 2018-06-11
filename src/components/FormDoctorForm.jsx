import React, { Component } from 'react';

import '../css/bootstrap.css';
import '../css/DoctorForm.css';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

import SideBar from '../components/SideBar';


var date = new Date().toISOString();

export default class FormDoctorForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      doctor:'0',
      subtitle: '0',
      is_valid : false,
      load_subtitle: [],
      start: date ,
      time_start:'',
      end: date,
      time_end:'',
      description:'',
      hospital:'',
      creator: '1',
      all_subtitle: [],
      rule: null,
      calendar:'1',
      all_doctors: [],
    }
     this.onChange = this.onChange.bind(this);
     this.onChange2 = this.onChange2.bind(this);
  }

  async componentDidMount2() {
      try {

        const res = await fetch('http://localhost:8000/subtitle/api-subtitle/');
        const all_subtitle = await res.json();
        console.log(all_subtitle);
        this.setState({all_subtitle});
      } catch (e) {
        console.log(e);
      }
    }

    async componentDidMount3() {
        try {

          const res = await fetch('http://localhost:8000/subtitle/api-subtitle/'+this.state.subtitle+'/');
          const load_subtitle = await res.json();
          console.log(load_subtitle);
          this.setState({load_subtitle});
        } catch (e) {
          console.log(e);
        }
      }

  async componentDidMount() {
      try {

        const res = await fetch('http://localhost:8000/doctor/api-doctor/');
        const all_doctors = await res.json();
        console.log(all_doctors);
        this.setState({all_doctors});
      } catch (e) {
        console.log(e);
      }
      await this.componentDidMount2();
    }


  onChange(e) {
    const title = e.target.title;
    const value = e.target.value === 'checkbox' ? e.target.checked : e.target.value;
    this.setState({[title] : value});
}

  onChange2(e){
    const title = e.target.title;
    this.setState(
      {[title]: e.target.checked}
    )
  }

  handleChange(e){
    this.setState({
      doctor: e.target.value
    })
  }
  async handleChange2(e){
     await this.setState({
      subtitle: e.target.value
    });
    await this.componentDidMount3();
    await this.setState({
      time_start: this.state.load_subtitle.begin
    });
    await this.setState({
      time_end: this.state.load_subtitle.finish
    })
    console.log(this.state.time_start,this.state.time_end);
  }

   handleSubmit = e => {
    this.state.start = this.props.currentdate + this.state.time_start + "Z";
    this.state.end = this.props.currentdate + this.state.time_end + "Z";
    this.setState({"is_valid":true})
    // this.state.is_valid = true;
    console.log(this.state.start + " " + this.state.end);
    e.preventDefault();
    const {start, end, hospital, subtitle, creator, rule, calendar, doctor} = this.state;
    console.log({start, end, hospital, subtitle,creator, rule, calendar, doctor} );
    const lead = {start, end, hospital, subtitle,creator, rule, calendar,doctor} ;
    const temp = JSON.stringify(lead)
    console.log(temp);
    const conf = {
      method: "POST",
      body: temp,
      headers: new Headers({ "Content-Type": "application/json" })
    };
    fetch('http://localhost:8000/schedule/api-event/', conf).then(response => console.log(response));
    this.setState({'is_valid':true});
}
  render(){
    return(
      <div>
        <div className="top-space space-top">
          <div className="form-style-5">
            <form>
              <h3>Cadastro de horário de médicos</h3>
              <fieldset>

                <legend><span className="number">1</span> Médicos </legend>
                <select class="custom-select my-1 mr-sm-2" id="inlineFormCustomSelectPref" onChange={this.handleChange.bind(this)} value={this.state.doctor} title="doctor">
                <option selected>Escolha um médico...</option>
                {this.state.all_doctors.map(item =>(
                <option value={item.id}> {item.name} - {item.registration}</option>


            ))}
              </select>
              <legend><span className="number">2</span> Legenda </legend>
              <select class="custom-select my-1 mr-sm-2" id="inlineFormCustomSelectPref" onChange={this.handleChange2.bind(this)} value={this.state.subtitle}>
              <option selected>Escolha uma Legenda...</option>
              {this.state.all_subtitle.map(item =>(
              <option value={item.id}> {item.code} - {item.begin} - {item.finish} - {item.description} </option>



          ))}
            </select>

              <legend><span className="number">3</span>Hospital</legend>
              <input id="hospitalID" type="text" title="hospital" value={this.state.hospital} onChange = {this.onChange} placeholder="Digite o Hospital"/>


              </fieldset>
            <input type="submit" value="Concluido" onClick={this.handleSubmit}/>

          </form>
            </div>
        </div>
      </div>


    );

  }
}
