import React from 'react';  
import './App.css';  

class Alert extends React.Component { 
  
  componentDidUpdate(){
    setTimeout(() => this.setState({message:''}), 3000);
  }
  
  render() {  
return (  
<div className='alert overlay'>  
<div className='alert_inner'>
    <h4>
      <font color='red'>
{this.props.text}  
</font>
</h4>
</div>  
</div>  
);  
}  
}  

export default Alert;