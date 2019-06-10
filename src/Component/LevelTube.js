import React  from 'react'
import '../css/LevelTube.css'
const ProgressBar=(props)=>{
    const {percent} = props;
    const style ={width:percent+"%"};
    return (
        <div className="w3-progress-container w3-round-xlarge">
            <div className="w3-progressbar w3-round-xlarge" style={style}>{''}</div>
        </div>
    )
}
export default ProgressBar