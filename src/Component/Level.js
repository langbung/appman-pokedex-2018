import React from 'react';
import LevelImage from '../cute.png';
import '../css/Level.css';

const Level=(props)=>{
    const {level} = props;
    let levelIcon = [];
    for (let i = 1; i <= level; i++){
        levelIcon.push(
            <img key={'levelID' + i} src={LevelImage} alt={'level'}/>
        );
    }
    return(
        <div>
            {levelIcon}
        </div>
    );

}
export default Level;

