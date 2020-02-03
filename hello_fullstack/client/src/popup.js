import React from 'react';  
import './App.css';  

class Popup extends React.Component {  
  render() {  
return (  
<div className='popup overlay'>  
<div className='popup_inner'>
    <h4>
      <font color='red'>
{this.props.text}  
</font>
</h4>
<button className="btn btn-primary popupclose" onClick={this.props.closePopup}>Close</button>  
</div>  
</div>  
);  
}  
}  

export default Popup;