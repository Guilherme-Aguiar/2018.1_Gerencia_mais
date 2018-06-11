import React, { Component } from 'react';
import '../css/bootstrap.css';
import '../css/DoctorForm.css';

var date = new Date().toISOString();
export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      doctor:'0',
      subtitle: '0',
      load_subtitle: [],
      start: date ,
      time_start:'',
      end: date,
      is_valid : false,
      time_end:'',
      description:'',
      hospital:'',
      all_subtitle: [],
      creator: '1',
      rule: null,
      calendar:'1',
      all_doctors: [],
    }
     this.onChange = this.onChange.bind(this);
     this.OnChangeTwo = this.OnChangeTwo.bind(this);
  }

  async componentDidMount2() {
      try {

        const res = await fetch('https://gicsaude.herokuapp.com/subtitle/api-subtitle/');
        const all_subtitle = await res.json();
        console.log(res);
        this.setState({all_subtitle});
      } catch (e) {
        console.log(e);
      }
    }

    async componentDidMount3() {
        try {

          const res = await fetch('https://gicsaude.herokuapp.com/subtitle/api-subtitle/'+this.state.subtitle+'/');
          const load_subtitle = await res.json();
          console.log(res);
          this.setState({load_subtitle});
        } catch (e) {
          console.log(e);
        }
      }

  async componentDidMount() {
      try {

        const res = await fetch('https://gicsaude.herokuapp.com/doctor/api-doctor/');
        const all_doctors = await res.json();
        console.log(res);
        this.setState({all_doctors});
      } catch (e) {
        console.log(e);
      }
      await this.componentDidMount2();
    }


  onChange(e) {
    const title = e.target.title;
    const valuee = e.target.value === 'checkbox' ? e.target.checked : e.target.value;
    this.setState({[title] : valuee});
}

  OnChangeTwo(e){
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
  async handleChangeTwo(e){
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
  }

  handleSubmit = e => {
    this.state.start=this.state.start + "T" + this.state.time_start + "Z";
    // this.state.start = this.state.start + "T" + this.state.time_start + "Z";
    this.state.end=this.state.end + "T" + this.state.time_end + "Z";
    // this.state.end = this.state.end + "T" + this.state.time_end + "Z";
    this.setState({"is_valid":true})
    // this.state.is_valid = true;
    e.preventDefault();
    const {start, end, hospital, subtitle, creator, rule, calendar, doctor} = this.state;
    const lead = {start, end, hospital, subtitle,creator, rule, calendar,doctor} ;
    const temp = JSON.stringify(lead)
    const conf = {
      method: "POST",
      body: temp,
      headers: new Headers({ "Content-Type": "application/json" })
    };
    fetch('https://gicsaude.herokuapp.com/schedule/api-event/', conf).then(response => console.log(response));
    this.setState({'is_valid':true});
}
  render(){
    return(
      <div>
        <div className="top-space space-bottom space-top change-color">
          <div className="form-style-5">
            <form>
              <h3>Cadastro de horário de médicos</h3>
              <fieldset>

                <legend><span className="number">1</span> Médicos </legend>
                <select className="custom-select my-1 mr-sm-2" id="inlineFormCustomSelectPref" onChange={this.handleChange.bind(this)} value={this.state.doctor} title="doctor">
                <option defaultValue={0} value={0}>Escolha um médico...</option>
                {this.state.all_doctors.map(item =>(
                <option value={item.id}> {item.name} - {item.registration}</option>


            ))}
              </select>
              <legend><span className="number">2</span> Legenda </legend>
              <select className="custom-select my-1 mr-sm-2" id="inlineFormCustomSelectPref" onChange={this.handleChangeTwo.bind(this)} value={this.state.subtitle}>
              <option defaultValue={0} value={0}>Escolha uma Legenda...</option>
              {this.state.all_subtitle.map(item =>(
              <option value={item.id}> {item.code} - {item.begin} - {item.finish} - {item.description} </option>



          ))}
            </select>

              <legend><span className="number">3</span>Hospital</legend>
              <input id="hospitalID" type="text" title="hospital" value={this.state.hospital} onChange = {this.onChange} placeholder="Digite o Hospital"/>

              <legend><span className="number">4</span>Data de Entrada</legend>
              <input id="edID" type="date" title="start" value = {this.state.start} onChange={this.onChange} placeholder="" required pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"/>

              <legend><span className="number">5</span>Data de Saída</legend>
              <input id="edID" type="date" title="end" value = {this.state.end} onChange={this.onChange} placeholder="" required pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"/>
              </fieldset>
            <input type="submit" value="Concluido" onClick={this.handleSubmit}/>

          </form>
            </div>
        </div>
      </div>


    );

  }
}
