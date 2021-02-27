import React, {Component} from 'react';
import {AppContext} from './Context';
class UsersList extends Component{
    static contextType = AppContext;   
    
    state = {
        dados:[]
    }
    
    fetchUsers = () => {
        fetch('http://vendebelem.com/givago/php/fetch-data.php')
        .then(response => {
            response.json().then(function(data) {
                if(data.success === 1){
                    this.setState({
                        dados:data.dados.reverse()
                        // dados:data.dados
                    });
                } 
                else{
                    this.context.post_show(false);
                }               
            }.bind(this));
        })
        .catch(error => {
            console.log(error);
        });
    }

    componentDidMount(){
        this.fetchUsers();
    }

    
    editMode = (id) => {
        let dados = this.state.dados.map(user => {
            if(user.id === id){
                user.isEditing = true;
                return user;
            }
            user.isEditing = false;
            return user;
            
        });

        this.setState({
            dados
        });
       
    }

    cancleEdit = (id) => {
        let dados = this.state.dados.map(user => {
            if(user.id === id){
                user.isEditing = false;
                return user;
            }
            return user
            
        });
        this.setState({
            dados
        });
    }

    componentDidUpdate(){
        let newUser = this.context.new_user;
        if(newUser){ 
            this.setState({
                dados:[
                    newUser,
                    ...this.state.dados
                    
                ]
            });          
            this.context.new_user = false;
        }        
    }

    render(){

        let allUsers = this.state.dados.map(({id,frente,tras,distancia,tempo, hora, isEditing}, index) => {
            
            return ( 
                <tr key={id}>
                    <td>{frente}</td>
                    <td>{tras}</td>
                    <td>{distancia}</td>
                    <td>{tempo}</td>
                    <td>{hora}</td>
                </tr>
            );
        });

        return(
            <>
            {allUsers}
            </>
        );
        
    }
}

export default UsersList;
