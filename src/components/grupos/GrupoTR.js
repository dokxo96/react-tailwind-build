/* eslint-disable no-useless-constructor */
import React, { Component } from 'react';
import Button from "@material-tailwind/react/Button";
import Checkbox from "@material-tailwind/react/Checkbox"
import axios from 'axios'
import Icon from '@material-tailwind/react/Icon';

export default class GrupoTR extends Component {

    constructor(props) {
        super(props);
        this.delete = this.delete.bind(this);
    }

    delete(id) {
        console.log(id)
       /*  axios.delete(this.props.obj._id)
             .then((res) => {
                 console.log('grupo eliminado!');
                 window.location.reload(true);
             }).catch((error) => {
                 console.log(error)
             }) */
     }

    render() {
        return (
            <tr>
             
                <td>{this.props.obj.id}</td>
                <td>{this.props.obj.descripcion}</td>
               <td> <Checkbox text="" color="lightBlue" defaultChecked={this.props.obj.active}  id="active"/></td>
               <td> <Checkbox text="" color="lightBlue" defaultChecked={this.props.obj.danone}  id="danone"/></td>
               
                
                <td>{this.props.obj.fecha_creado}</td>
                <td>
                 <Button className="mb-2" onClick={()=>{window.location.href="/edit-student/" + this.props.obj._id;}}  size="sm"  ><Icon name="edit" size="2xl" /></Button>
                
                 <Button  onClick={()=> {console.log(this.props.obj._id)}} size="sm"  color="red"> <Icon name="delete" size="2xl" /></Button>
                </td>
                   
                
            </tr>
        );
    }
}